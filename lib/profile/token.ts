// Uses atob/btoa and CompressionStream (not Buffer/zlib) since encode runs
// client-side and decode runs server-side — both are available in each.

import { musicProfileSchema, type MusicProfile } from "./profile-schema";

export type DecodeResult =
  | { ok: true; data: MusicProfile }
  | { ok: false; error: string };

// Compacts musicProfileSchema into positional tuples (no key names, enums as
// indices) by walking the zod schema itself, so new/removed fields need no
// change here. Lossy domain compaction (e.g. date truncation) isn't derivable
// from structure, so tag the field with `.meta({ wireCompact: "<name>" })`
// and register it once in NAMED_TRANSFORMS.
//
// Reordering existing fields reshuffles tuple positions and corrupts
// already-issued tokens. Append, don't reorder.

type Codec = {
  encode: (value: unknown) => unknown;
  decode: (value: unknown) => unknown;
};

// The subset of zod's introspection surface this file reads.
export type IntrospectableSchema = {
  meta(): { wireCompact?: string } | undefined;
  def: {
    type: string;
    element?: IntrospectableSchema;
    innerType?: IntrospectableSchema;
  };
  shape?: Record<string, IntrospectableSchema>;
  options?: unknown[];
};

const NAMED_TRANSFORMS: Record<string, Codec> = {
  yearMonthDate: {
    encode: (value) => (value as string).slice(0, 7),
    decode: (value) => `${value as string}-01`,
  },
};

// Exported for direct testing.
export function codecFor(schema: IntrospectableSchema): Codec {
  const meta = schema.meta();
  if (meta?.wireCompact) {
    const transform = NAMED_TRANSFORMS[meta.wireCompact];
    if (!transform) {
      throw new Error(`no wire transform registered for "${meta.wireCompact}"`);
    }
    return transform;
  }

  const def = schema.def;

  switch (def.type) {
    case "object": {
      const shape = schema.shape ?? {};
      const keys = Object.keys(shape);
      const fieldCodecs = keys.map((key) => codecFor(shape[key]));

      return {
        encode: (value) => {
          const obj = value as Record<string, unknown>;
          return keys.map((key, i) => fieldCodecs[i].encode(obj[key]));
        },
        decode: (value) => {
          const tuple = value as unknown[];
          const obj: Record<string, unknown> = {};
          keys.forEach((key, i) => {
            obj[key] = fieldCodecs[i].decode(tuple[i]);
          });
          return obj;
        },
      };
    }

    case "array": {
      const elementCodec = codecFor(def.element!);
      return {
        encode: (value) => (value as unknown[]).map((item) => elementCodec.encode(item)),
        decode: (value) => (value as unknown[]).map((item) => elementCodec.decode(item)),
      };
    }

    case "enum": {
      const options = schema.options ?? [];
      return {
        encode: (value) => options.indexOf(value),
        decode: (value) => options[value as number],
      };
    }

    case "optional": {
      // JSON.stringify silently turns an `undefined` array element into
      // `null`, so an absent optional value always comes back off the wire
      // as `null`. Decode treats the two as the same "absent" state.
      const inner = codecFor(def.innerType!);
      return {
        encode: (value) => (value === undefined ? undefined : inner.encode(value)),
        decode: (value) => (value === undefined || value === null ? undefined : inner.decode(value)),
      };
    }

    case "nullable": {
      const inner = codecFor(def.innerType!);
      return {
        encode: (value) => (value === null ? null : inner.encode(value)),
        decode: (value) => (value === null ? null : inner.decode(value)),
      };
    }

    default:
      return { encode: (value) => value, decode: (value) => value };
  }
}

const profileCodec = codecFor(musicProfileSchema as unknown as IntrospectableSchema);

function toWire(data: MusicProfile): unknown {
  return profileCodec.encode(data);
}

function fromWire(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return profileCodec.decode(value);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

// gzip shrinks the JSON payload before it hits base64 (which itself expands
// bytes by ~33%) - the wire format stays plain JSON, only the bytes on the
// wire are compressed.
async function gzip(text: string): Promise<Uint8Array> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function gunzip(bytes: Uint8Array): Promise<string> {
  // TS's Uint8Array<ArrayBufferLike> vs BlobPart's Uint8Array<ArrayBuffer>
  // is a lib.dom typing mismatch, not a real runtime concern here.
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(new DecompressionStream("gzip"));
  const buffer = await new Response(stream).arrayBuffer();
  return new TextDecoder().decode(buffer);
}

export async function encodeProfileToken(data: MusicProfile): Promise<string> {
  const compressed = await gzip(JSON.stringify(toWire(data)));
  return bytesToBase64Url(compressed);
}

export function extractProfileToken(input: string): string {
  const trimmed = input.trim();
  const marker = "/profile/";
  const index = trimmed.lastIndexOf(marker);

  if (index === -1) {
    return trimmed;
  }

  return trimmed.slice(index + marker.length);
}

export async function decodeProfileToken(token: string): Promise<DecodeResult> {
  let json: string;
  try {
    json = await gunzip(base64UrlToBytes(token));
  } catch {
    return { ok: false, error: "This link isn't a valid SoundPrint token." };
  }

  let profile: unknown;
  try {
    profile = fromWire(JSON.parse(json));
  } catch {
    return { ok: false, error: "This link's data is corrupted or incomplete." };
  }

  const parsed = musicProfileSchema.safeParse(profile);
  if (!parsed.success) {
    return { ok: false, error: "This link's data is corrupted or incomplete." };
  }

  return { ok: true, data: parsed.data };
}
