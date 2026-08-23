import { describe, expect, it } from "vitest";

import { bandSchema, EMPTY_BAND, BAND_MAX_ITEMS } from "./band-schema";
import { musicProfileSchema, EMPTY_PROFILE } from "../profile-schema";

function bandsOf(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    name: `Band ${i}`,
    from: "2020-01-01",
  }));
}

describe("bandSchema", () => {
  it("accepts a band with no end date (still active)", () => {
    const result = bandSchema.safeParse({
      ...EMPTY_BAND,
      name: "The Midnight Set",
      from: "2020-01-01",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a band with a start and end date", () => {
    const result = bandSchema.safeParse({
      name: "Backline",
      from: "2018-01-01",
      to: "2021-06-01",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a position", () => {
    const result = bandSchema.safeParse({
      name: "Backline",
      from: "2018-01-01",
      position: "Lead guitar",
    });

    expect(result.success).toBe(true);
  });

  it("accepts no position", () => {
    const result = bandSchema.safeParse({
      name: "Backline",
      from: "2018-01-01",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a missing name", () => {
    const result = bandSchema.safeParse({ from: "2020-01-01" });

    expect(result.success).toBe(false);
  });

  it("rejects a missing start date", () => {
    const result = bandSchema.safeParse({ name: "Backline" });

    expect(result.success).toBe(false);
  });

  it("rejects an end date before the start date", () => {
    const result = bandSchema.safeParse({
      name: "Backline",
      from: "2021-06-01",
      to: "2018-01-01",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a start date in the future", () => {
    const result = bandSchema.safeParse({
      name: "Backline",
      from: "2099-01-01",
    });

    expect(result.success).toBe(false);
  });
});

describe("musicProfileSchema bands", () => {
  it("is entirely optional, matching EMPTY_PROFILE", () => {
    const result = musicProfileSchema.safeParse({
      name: "",
      instruments: [],
      theme: EMPTY_PROFILE.theme,
    });

    expect(result.success).toBe(true);
  });

  it("accepts up to BAND_MAX_ITEMS entries", () => {
    const result = musicProfileSchema.safeParse({
      ...EMPTY_PROFILE,
      bands: bandsOf(BAND_MAX_ITEMS),
    });

    expect(result.success).toBe(true);
  });

  it("rejects more than BAND_MAX_ITEMS entries", () => {
    const result = musicProfileSchema.safeParse({
      ...EMPTY_PROFILE,
      bands: bandsOf(BAND_MAX_ITEMS + 1),
    });

    expect(result.success).toBe(false);
  });
});

describe("musicProfileSchema lookingForBand", () => {
  it("accepts true and false", () => {
    expect(musicProfileSchema.safeParse({ ...EMPTY_PROFILE, lookingForBand: true }).success).toBe(true);
    expect(musicProfileSchema.safeParse({ ...EMPTY_PROFILE, lookingForBand: false }).success).toBe(true);
  });

  it("rejects a non-boolean value", () => {
    const result = musicProfileSchema.safeParse({ ...EMPTY_PROFILE, lookingForBand: "yes" });

    expect(result.success).toBe(false);
  });
});
