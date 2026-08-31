import { describe, expect, it } from "vitest";

import { THEME_PALETTE, badgeRollup, waveformBars, hexToTransparent, deriveOgContent } from "./og-visual";
import { EMPTY_PROFILE, SAMPLE_PROFILE, type MusicProfile } from "../profile-schema";
import { EMPTY_INSTRUMENT, type Instrument } from "../instrument/instrument-schema";
import { profileThemes } from "../theme/theme-schema";

function instrumentsOf(count: number): Instrument[] {
  return Array.from({ length: count }, (_, i) => ({
    ...EMPTY_INSTRUMENT,
    instrument: `Instrument ${i}`,
    playedSince: "2020-01-01",
    skillLevel: "Expert",
  }));
}

describe("THEME_PALETTE", () => {
  it("defines a palette for every profile theme", () => {
    for (const theme of profileThemes) {
      expect(THEME_PALETTE[theme]).toBeDefined();
    }
  });
});

describe("badgeRollup", () => {
  it("returns an empty string for a profile with no tiered badges", () => {
    expect(badgeRollup(EMPTY_PROFILE)).toBe("");
  });

  it("formats tier counts highest-first", () => {
    const profile: MusicProfile = { ...EMPTY_PROFILE, instruments: instrumentsOf(4) };
    // 4 instruments -> gold instrumentCount; Expert skill -> gold skillTier.
    expect(badgeRollup(profile)).toBe("GOLD x2");
  });

  it("lists diamond ahead of gold when the completionist capstone is earned", () => {
    // SAMPLE_PROFILE is deliberately built to earn every achievement.
    expect(badgeRollup(SAMPLE_PROFILE)).toBe("DIAMOND x1   GOLD x4");
  });
});

describe("hexToTransparent", () => {
  it("converts a hex color to rgba with the given alpha", () => {
    expect(hexToTransparent("#f5efe1")).toBe("rgba(245, 239, 225, 0)");
    expect(hexToTransparent("#17181a", 1)).toBe("rgba(23, 24, 26, 1)");
  });
});

describe("waveformBars", () => {
  it("returns the requested number of bars", () => {
    expect(waveformBars("abc", 10)).toHaveLength(10);
  });

  it("is deterministic for the same seed", () => {
    expect(waveformBars("some-token", 20)).toEqual(waveformBars("some-token", 20));
  });

  it("differs across seeds", () => {
    expect(waveformBars("token-a", 20)).not.toEqual(waveformBars("token-b", 20));
  });

  it("keeps every bar within the 0.18-1.0 range", () => {
    for (const height of waveformBars("range-check", 100)) {
      expect(height).toBeGreaterThanOrEqual(0.18);
      expect(height).toBeLessThanOrEqual(1);
    }
  });

  it("falls back to a default seed for an empty string", () => {
    expect(waveformBars("", 5)).toEqual(waveformBars("soundprint", 5));
  });
});

describe("deriveOgContent", () => {
  it("defaults an empty name to a placeholder", () => {
    expect(deriveOgContent(EMPTY_PROFILE, "seed", 5).name).toBe("Untitled profile");
  });

  it("defaults a missing lookingForBand to false", () => {
    const profile: MusicProfile = { ...EMPTY_PROFILE, lookingForBand: undefined };
    expect(deriveOgContent(profile, "seed", 5).lookingForBand).toBe(false);
  });

  it("joins instrument names in profile order", () => {
    const profile: MusicProfile = { ...EMPTY_PROFILE, instruments: instrumentsOf(2) };
    expect(deriveOgContent(profile, "seed", 5).instrumentList).toBe("Instrument 0, Instrument 1");
  });

  it("resolves the palette for the profile's theme", () => {
    const profile: MusicProfile = { ...EMPTY_PROFILE, theme: "neon" };
    expect(deriveOgContent(profile, "seed", 5).palette).toBe(THEME_PALETTE.neon);
  });

  it("generates the requested number of bars", () => {
    expect(deriveOgContent(EMPTY_PROFILE, "seed", 7).bars).toHaveLength(7);
  });
});
