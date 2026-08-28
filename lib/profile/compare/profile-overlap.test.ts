import { describe, expect, it } from "vitest";

import { computeOverlap, instrumentNames, repertoireGenres } from "./profile-overlap";
import { EMPTY_PROFILE, type MusicProfile } from "../profile-schema";
import { EMPTY_INSTRUMENT } from "../instrument/instrument-schema";
import { EMPTY_REPERTOIRE } from "../repertoire/repertoire-schema";

function profileWith(instruments: MusicProfile["instruments"]): MusicProfile {
  return { ...EMPTY_PROFILE, instruments };
}

describe("computeOverlap", () => {
  it("splits values into shared, onlyA and onlyB", () => {
    const result = computeOverlap(["Piano", "Bass"], ["Bass", "Drums"]);

    expect(result.shared).toEqual(["Bass"]);
    expect(result.onlyA).toEqual(["Piano"]);
    expect(result.onlyB).toEqual(["Drums"]);
  });

  it("matches case- and whitespace-insensitively", () => {
    const result = computeOverlap(["piano "], [" Piano"]);

    expect(result.shared).toEqual(["piano"]);
    expect(result.onlyA).toEqual([]);
    expect(result.onlyB).toEqual([]);
  });

  it("dedupes repeated values within a side", () => {
    const result = computeOverlap(["Piano", "piano", "Bass"], []);

    expect(result.onlyA).toEqual(["Bass", "Piano"]);
  });

  it("handles empty input on both sides", () => {
    const result = computeOverlap([], []);

    expect(result).toEqual({ shared: [], onlyA: [], onlyB: [] });
  });
});

describe("instrumentNames", () => {
  it("collects instrument names from a profile", () => {
    const profile = profileWith([
      { ...EMPTY_INSTRUMENT, instrument: "Piano" },
      { ...EMPTY_INSTRUMENT, instrument: "Bass" },
    ]);

    expect(instrumentNames(profile)).toEqual(["Piano", "Bass"]);
  });
});

describe("repertoireGenres", () => {
  it("flattens genres across all instruments", () => {
    const profile = profileWith([
      {
        ...EMPTY_INSTRUMENT,
        instrument: "Piano",
        repertoire: [
          { ...EMPTY_REPERTOIRE, genre: "Jazz" },
          { ...EMPTY_REPERTOIRE, genre: "Funk" },
        ],
      },
      {
        ...EMPTY_INSTRUMENT,
        instrument: "Bass",
        repertoire: [{ ...EMPTY_REPERTOIRE, genre: "Funk" }],
      },
    ]);

    expect(repertoireGenres(profile)).toEqual(["Jazz", "Funk", "Funk"]);
  });
});
