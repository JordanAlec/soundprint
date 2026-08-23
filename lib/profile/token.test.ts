import { describe, expect, it } from "vitest";
import { z } from "zod";

import {
  codecFor,
  decodeProfileToken,
  encodeProfileToken,
  extractProfileToken,
  type IntrospectableSchema,
} from "./token";
import { EMPTY_PROFILE, SAMPLE_PROFILE } from "./profile-schema";

describe("encodeProfileToken / decodeProfileToken", () => {
  it("round-trips SAMPLE_PROFILE", async () => {
    const token = await encodeProfileToken(SAMPLE_PROFILE);
    const result = await decodeProfileToken(token);

    expect(result).toEqual({ ok: true, data: SAMPLE_PROFILE });
  });

  it("round-trips EMPTY_PROFILE", async () => {
    const token = await encodeProfileToken(EMPTY_PROFILE);
    const result = await decodeProfileToken(token);

    expect(result).toEqual({ ok: true, data: EMPTY_PROFILE });
  });

  it("is smaller than a full-key JSON encoding", async () => {
    const token = await encodeProfileToken(SAMPLE_PROFILE);
    const fullKeyToken = Buffer.from(JSON.stringify(SAMPLE_PROFILE), "utf8").toString("base64url");

    expect(token.length).toBeLessThan(fullKeyToken.length);
  });

  it("rejects invalid base64url/JSON", async () => {
    const result = await decodeProfileToken("not-a-real-token!!!");

    expect(result.ok).toBe(false);
  });

  it("rejects a schema-invalid token", async () => {
    // skillLevel index 99 is out of range -> decodes to undefined -> fails validation.
    const badWire = ["Jordan", [["Piano", "2026-08", 99, []]], 0];
    const token = await gzipToBase64Url(JSON.stringify(badWire));

    const result = await decodeProfileToken(token);

    expect(result).toEqual({
      ok: false,
      error: "This link's data is corrupted or incomplete.",
    });
  });

  it("rejects an empty string", async () => {
    const result = await decodeProfileToken("");

    expect(result.ok).toBe(false);
  });

  it("normalizes playedSince to day 01", async () => {
    const profile = { ...SAMPLE_PROFILE, instruments: [
      { ...SAMPLE_PROFILE.instruments[0], playedSince: "2026-08-15" },
    ] };

    const result = await decodeProfileToken(await encodeProfileToken(profile));

    expect(result.ok && result.data.instruments[0].playedSince).toBe("2026-08-01");
  });

  it("never rejects on a truncated wire tuple", async () => {
    const token = await gzipToBase64Url(JSON.stringify(["Jordan"]));

    await expect(decodeProfileToken(token)).resolves.toMatchObject({ ok: false });
  });
});

describe("extractProfileToken", () => {
  it("pulls the token out of a full profile URL", () => {
    expect(extractProfileToken("https://soundprint.app/profile/abc123")).toBe("abc123");
  });

  it("returns input unchanged without a /profile/ marker", () => {
    expect(extractProfileToken("abc123")).toBe("abc123");
  });

  it("trims whitespace", () => {
    expect(extractProfileToken("  abc123  ")).toBe("abc123");
  });

  it("uses the last /profile/ occurrence", () => {
    expect(extractProfileToken("https://example.com/profile/old/profile/new")).toBe("new");
  });
});

describe("codecFor", () => {
  it("compacts an object to a positional tuple", () => {
    const schema = z.object({ a: z.string(), b: z.number() });
    const codec = codecFor(schema as unknown as IntrospectableSchema);

    const wire = codec.encode({ a: "x", b: 1 });

    expect(wire).toEqual(["x", 1]);
    expect(codec.decode(wire)).toEqual({ a: "x", b: 1 });
  });

  it("indexes enums", () => {
    const schema = z.enum(["low", "medium", "high"]);
    const codec = codecFor(schema as unknown as IntrospectableSchema);

    expect(codec.encode("medium")).toBe(1);
    expect(codec.decode(1)).toBe("medium");
  });

  // Goes through a real JSON round-trip, not encode()/decode() directly,
  // since that's what actually collapses undefined to null.
  it("recovers an absent optional field", () => {
    const schema = z.object({ a: z.string().optional(), b: z.string() });
    const codec = codecFor(schema as unknown as IntrospectableSchema);

    const wire = JSON.parse(JSON.stringify(codec.encode({ a: undefined, b: "x" })));

    expect(codec.decode(wire)).toEqual({ a: undefined, b: "x" });
  });

  it("keeps null on a nullable field", () => {
    const schema = z.object({ a: z.string().nullable() });
    const codec = codecFor(schema as unknown as IntrospectableSchema);

    const wire = JSON.parse(JSON.stringify(codec.encode({ a: null })));

    expect(codec.decode(wire)).toEqual({ a: null });
  });

  it("handles a nested schema it's never seen, unmodified", () => {
    const tagSchema = z.object({ label: z.string() });
    const milestoneSchema = z.object({
      year: z.number(),
      note: z.string(),
      tags: z.array(tagSchema),
    });
    const instrumentLikeSchema = z.object({
      instrument: z.string(),
      skillLevel: z.enum(["Beginner", "Advanced"]),
      milestones: z.array(milestoneSchema),
    });

    const codec = codecFor(instrumentLikeSchema as unknown as IntrospectableSchema);

    const value = {
      instrument: "Piano",
      skillLevel: "Advanced",
      milestones: [
        { year: 2024, note: "First gig", tags: [{ label: "jazz" }, { label: "live" }] },
      ],
    };

    const wire = codec.encode(value);

    expect(JSON.stringify(wire)).not.toContain("instrument");
    expect(JSON.stringify(wire)).not.toContain("label");
    expect(wire).toEqual(["Piano", 1, [[2024, "First gig", [["jazz"], ["live"]]]]]);

    expect(codec.decode(wire)).toEqual(value);
  });

  it("throws on an unregistered wireCompact tag", () => {
    const schema = z.string().meta({ wireCompact: "doesNotExist" });

    expect(() => codecFor(schema as unknown as IntrospectableSchema)).toThrow(
      /no wire transform registered for "doesNotExist"/,
    );
  });
});

// Mirrors token.ts's own gzip + base64url step, so a hand-crafted wire
// tuple here still decodes.
async function gzipToBase64Url(text: string): Promise<string> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("gzip"));
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer());

  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
