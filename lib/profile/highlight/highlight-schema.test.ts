import { describe, expect, it } from "vitest";

import { highlightSchema, HIGHLIGHT_MAX_LENGTH, HIGHLIGHT_MAX_ITEMS } from "./highlight-schema";
import { musicProfileSchema, EMPTY_PROFILE } from "../profile-schema";

function highlightsOf(count: number) {
  return Array.from({ length: count }, (_, i) => `Highlight ${i}`);
}

describe("highlightSchema", () => {
  it("accepts free text up to HIGHLIGHT_MAX_LENGTH", () => {
    const result = highlightSchema.safeParse("a".repeat(HIGHLIGHT_MAX_LENGTH));

    expect(result.success).toBe(true);
  });

  it("rejects text longer than HIGHLIGHT_MAX_LENGTH", () => {
    const result = highlightSchema.safeParse("a".repeat(HIGHLIGHT_MAX_LENGTH + 1));

    expect(result.success).toBe(false);
  });
});

describe("musicProfileSchema highlights", () => {
  it("is entirely optional, matching EMPTY_PROFILE", () => {
    const result = musicProfileSchema.safeParse({
      name: "",
      instruments: [],
      theme: EMPTY_PROFILE.theme,
    });

    expect(result.success).toBe(true);
  });

  it("accepts up to HIGHLIGHT_MAX_ITEMS entries", () => {
    const result = musicProfileSchema.safeParse({
      ...EMPTY_PROFILE,
      highlights: highlightsOf(HIGHLIGHT_MAX_ITEMS),
    });

    expect(result.success).toBe(true);
  });

  it("rejects more than HIGHLIGHT_MAX_ITEMS entries", () => {
    const result = musicProfileSchema.safeParse({
      ...EMPTY_PROFILE,
      highlights: highlightsOf(HIGHLIGHT_MAX_ITEMS + 1),
    });

    expect(result.success).toBe(false);
  });
});
