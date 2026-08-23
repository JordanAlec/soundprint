import { describe, expect, it } from "vitest";

import { repertoireSchema, EMPTY_REPERTOIRE, REPERTOIRE_FIELD_MAX_LENGTH } from "./repertoire-schema";

describe("repertoireSchema", () => {
  it("accepts an item with no link", () => {
    const result = repertoireSchema.safeParse({
      ...EMPTY_REPERTOIRE,
      genre: "Jazz",
      artist: "Miles Davis Quintet",
      title: "If I Were A Bell",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a valid link", () => {
    const result = repertoireSchema.safeParse({
      ...EMPTY_REPERTOIRE,
      genre: "Jazz",
      artist: "Miles Davis Quintet",
      title: "If I Were A Bell",
      link: "https://youtu.be/36wafFjFdYs",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid link", () => {
    const result = repertoireSchema.safeParse({
      ...EMPTY_REPERTOIRE,
      genre: "Jazz",
      artist: "Miles Davis Quintet",
      title: "If I Were A Bell",
      link: "not-a-url",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a title longer than REPERTOIRE_FIELD_MAX_LENGTH", () => {
    const result = repertoireSchema.safeParse({
      ...EMPTY_REPERTOIRE,
      genre: "Jazz",
      artist: "Miles Davis Quintet",
      title: "a".repeat(REPERTOIRE_FIELD_MAX_LENGTH + 1),
    });

    expect(result.success).toBe(false);
  });
});
