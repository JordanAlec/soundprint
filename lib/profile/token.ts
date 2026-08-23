// Uses atob/btoa (not Buffer) since encode runs client-side and decode
// runs server-side — both are available in each.

import { musicProfileSchema, type MusicProfile } from "./profile-schema";

export type DecodeResult =
  | { ok: true; data: MusicProfile }
  | { ok: false; error: string };

// Compacts musicProfileSchema into positional tuples (no key names, enums as
// indices) by walking the zod schema itself, so new/removed fields need no
// change here. Lossy domain compaction (e.g. date truncation) isn't derivable
// from structure — tag the field with `.meta({ wireCompact: "<name>" })` and
// register it once in NAMED_TRANSFORMS.
//
// Reordering existing fields reshuffles tuple positions and corrupts
// already-issued tokens — append, don't reorder.

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

// Exported for tests, so this can be checked against schemas it's never seen.
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

    case "optional":
    case "nullable": {
      const inner = codecFor(def.innerType!);
      return {
        encode: (value) => (value === undefined || value === null ? value : inner.encode(value)),
        decode: (value) => (value === undefined || value === null ? value : inner.decode(value)),
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

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeProfileToken(data: MusicProfile): string {
  return toBase64Url(JSON.stringify(toWire(data)));
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

export function decodeProfileToken(token: string): DecodeResult {
  let json: string;
  try {
    json = fromBase64Url(token);
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
