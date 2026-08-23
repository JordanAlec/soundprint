import { describe, expect, it } from "vitest";

import { instrumentSchema, EMPTY_INSTRUMENT } from "./instrument-schema";
import { REPERTOIRE_MAX_ITEMS } from "../repertoire/repertoire-schema";

function repertoireOf(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    genre: "Jazz",
    artist: `Artist ${i}`,
    title: `Track ${i}`,
  }));
}

describe("instrumentSchema repertoire cap", () => {
  it("accepts up to REPERTOIRE_MAX_ITEMS entries", () => {
    const result = instrumentSchema.safeParse({
      ...EMPTY_INSTRUMENT,
      instrument: "Piano",
      playedSince: "2020-01-01",
      repertoire: repertoireOf(REPERTOIRE_MAX_ITEMS),
    });

    expect(result.success).toBe(true);
  });

  it("rejects more than REPERTOIRE_MAX_ITEMS entries", () => {
    const result = instrumentSchema.safeParse({
      ...EMPTY_INSTRUMENT,
      instrument: "Piano",
      playedSince: "2020-01-01",
      repertoire: repertoireOf(REPERTOIRE_MAX_ITEMS + 1),
    });

    expect(result.success).toBe(false);
  });
});
