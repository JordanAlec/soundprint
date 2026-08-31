import { describe, expect, it } from "vitest";

import { computeBadges } from "./badge-schema";
import { EMPTY_PROFILE, type MusicProfile } from "../profile-schema";
import { EMPTY_INSTRUMENT, type Instrument } from "../instrument/instrument-schema";
import { EMPTY_REPERTOIRE, type Repertoire } from "../repertoire/repertoire-schema";
import { EMPTY_QUALIFICATION } from "../qualification/qualification-schema";
import { EMPTY_BAND } from "../band/band-schema";
import type { SkillLevel } from "../skill/skill-schema";

function instrument(overrides: Partial<Instrument> = {}): Instrument {
  return { ...EMPTY_INSTRUMENT, instrument: "Piano", playedSince: "2020-01-01", ...overrides };
}

function instrumentsOf(count: number): Instrument[] {
  return Array.from({ length: count }, (_, i) => instrument({ instrument: `Instrument ${i}` }));
}

function repertoireOf(count: number, overrides: Partial<Repertoire> = {}): Repertoire[] {
  return Array.from({ length: count }, (_, i) => ({
    ...EMPTY_REPERTOIRE,
    genre: "Jazz",
    artist: `Artist ${i}`,
    title: `Title ${i}`,
    ...overrides,
  }));
}

function findTier(badges: ReturnType<typeof computeBadges>, category: string) {
  return badges.find((badge) => badge.category === category);
}

describe("computeBadges", () => {
  it("returns no badges for an empty profile", () => {
    expect(computeBadges(EMPTY_PROFILE)).toEqual([]);
  });

  describe("instrumentCount", () => {
    it("awards nothing below the bronze threshold", () => {
      const profile: MusicProfile = { ...EMPTY_PROFILE, instruments: instrumentsOf(1) };
      expect(findTier(computeBadges(profile), "instrumentCount")).toBeUndefined();
    });

    it.each([
      [2, "bronze"],
      [3, "silver"],
      [4, "gold"],
      [5, "gold"],
    ] as const)("awards %s instruments as %s", (count, tier) => {
      const profile: MusicProfile = { ...EMPTY_PROFILE, instruments: instrumentsOf(count) };
      expect(findTier(computeBadges(profile), "instrumentCount")).toEqual({
        category: "instrumentCount",
        tier,
      });
    });
  });

  describe("skillTier", () => {
    it.each([
      ["Beginner", undefined],
      ["Early Intermediate", undefined],
      ["Intermediate", "bronze"],
      ["Advanced Intermediate", "silver"],
      ["Advanced", "silver"],
      ["Expert", "gold"],
    ] as [SkillLevel, string | undefined][])("maps skill level %s to %s", (skillLevel, tier) => {
      const profile: MusicProfile = {
        ...EMPTY_PROFILE,
        instruments: [instrument({ skillLevel })],
      };
      expect(findTier(computeBadges(profile), "skillTier")).toEqual(
        tier ? { category: "skillTier", tier } : undefined,
      );
    });

    it("takes the highest skill level across multiple instruments", () => {
      const profile: MusicProfile = {
        ...EMPTY_PROFILE,
        instruments: [
          instrument({ instrument: "Piano", skillLevel: "Beginner" }),
          instrument({ instrument: "Bass", skillLevel: "Expert" }),
        ],
      };
      expect(findTier(computeBadges(profile), "skillTier")).toEqual({ category: "skillTier", tier: "gold" });
    });
  });

  describe("qualificationCount", () => {
    it.each([
      [0, undefined],
      [1, "bronze"],
      [3, "silver"],
      [5, "gold"],
    ] as const)("awards %s qualifications as %s", (count, tier) => {
      const profile: MusicProfile = {
        ...EMPTY_PROFILE,
        qualifications: Array.from({ length: count }, () => ({ ...EMPTY_QUALIFICATION })),
      };
      expect(findTier(computeBadges(profile), "qualificationCount")).toEqual(
        tier ? { category: "qualificationCount", tier } : undefined,
      );
    });
  });

  describe("repertoireCount", () => {
    it("sums repertoire across all instruments without deduplicating", () => {
      const profile: MusicProfile = {
        ...EMPTY_PROFILE,
        instruments: [
          instrument({ instrument: "Piano", repertoire: repertoireOf(2, { artist: "Same", title: "Same" }) }),
          instrument({ instrument: "Bass", repertoire: repertoireOf(2, { artist: "Same", title: "Same" }) }),
        ],
      };
      // 4 entries share one (artist, title) pair - deduped that's 1, below
      // bronze (3). Asserting "bronze" proves duplicates are counted, not collapsed.
      expect(findTier(computeBadges(profile), "repertoireCount")).toEqual({
        category: "repertoireCount",
        tier: "bronze",
      });

      const goldProfile: MusicProfile = {
        ...EMPTY_PROFILE,
        instruments: [
          instrument({ instrument: "Piano", repertoire: repertoireOf(5) }),
          instrument({ instrument: "Bass", repertoire: repertoireOf(5) }),
          instrument({ instrument: "Guitar", repertoire: repertoireOf(5) }),
        ],
      };
      expect(findTier(computeBadges(goldProfile), "repertoireCount")).toEqual({
        category: "repertoireCount",
        tier: "gold",
      });
    });
  });

  describe("bandMember", () => {
    it("is not earned with no bands", () => {
      expect(findTier(computeBadges(EMPTY_PROFILE), "bandMember")).toBeUndefined();
    });

    it("is earned with at least one band, regardless of count", () => {
      const profile: MusicProfile = { ...EMPTY_PROFILE, bands: [{ ...EMPTY_BAND, from: "2020-01-01" }] };
      expect(findTier(computeBadges(profile), "bandMember")).toEqual({ category: "bandMember", kind: "unlocked" });
    });
  });

  describe("showcase", () => {
    it("is not earned when no repertoire entries have a link", () => {
      const profile: MusicProfile = {
        ...EMPTY_PROFILE,
        instruments: [instrument({ repertoire: repertoireOf(2) })],
      };
      expect(findTier(computeBadges(profile), "showcase")).toBeUndefined();
    });

    it("is earned when any repertoire entry across any instrument has a link", () => {
      const profile: MusicProfile = {
        ...EMPTY_PROFILE,
        instruments: [
          instrument({ instrument: "Piano", repertoire: repertoireOf(1) }),
          instrument({
            instrument: "Bass",
            repertoire: [{ ...EMPTY_REPERTOIRE, genre: "Funk", artist: "A", title: "B", link: "https://example.com" }],
          }),
        ],
      };
      expect(findTier(computeBadges(profile), "showcase")).toEqual({ category: "showcase", kind: "unlocked" });
    });
  });

  describe("allRounder", () => {
    it("requires instruments, qualifications, highlights and bands all present", () => {
      const base: MusicProfile = {
        ...EMPTY_PROFILE,
        instruments: instrumentsOf(1),
        qualifications: [{ ...EMPTY_QUALIFICATION }],
        highlights: ["Played a festival"],
        bands: [{ ...EMPTY_BAND, from: "2020-01-01" }],
      };
      expect(findTier(computeBadges(base), "allRounder")).toEqual({ category: "allRounder", kind: "unlocked" });

      const missingHighlights: MusicProfile = { ...base, highlights: [] };
      expect(findTier(computeBadges(missingHighlights), "allRounder")).toBeUndefined();
    });
  });

  describe("linkedUp", () => {
    it("is not earned with no externalLink", () => {
      expect(findTier(computeBadges(EMPTY_PROFILE), "linkedUp")).toBeUndefined();
    });

    it("is earned when externalLink is set", () => {
      const profile: MusicProfile = { ...EMPTY_PROFILE, externalLink: "https://example.com" };
      expect(findTier(computeBadges(profile), "linkedUp")).toEqual({ category: "linkedUp", kind: "unlocked" });
    });
  });

  describe("completionist", () => {
    function completeProfile(overrides: Partial<MusicProfile> = {}): MusicProfile {
      return {
        ...EMPTY_PROFILE,
        instruments: [
          instrument({
            instrument: "Piano",
            skillLevel: "Expert",
            repertoire: repertoireOf(8, { link: "https://example.com" }),
          }),
          instrument({ instrument: "Bass", repertoire: repertoireOf(7) }),
          instrument({ instrument: "Guitar", repertoire: [] }),
          instrument({ instrument: "Drums", repertoire: [] }),
        ],
        qualifications: Array.from({ length: 5 }, () => ({ ...EMPTY_QUALIFICATION })),
        highlights: ["Played a festival"],
        bands: [{ ...EMPTY_BAND, from: "2020-01-01" }],
        externalLink: "https://example.com",
        ...overrides,
      };
    }

    it("is earned once every tiered category is gold and every unlocked achievement is earned", () => {
      expect(findTier(computeBadges(completeProfile()), "completionist")).toEqual({
        category: "completionist",
        tier: "diamond",
      });
    });

    it("is not earned when one tiered category falls short of gold", () => {
      const profile = completeProfile({ qualifications: [{ ...EMPTY_QUALIFICATION }] });
      expect(findTier(computeBadges(profile), "completionist")).toBeUndefined();
    });

    it("is not earned when one unlocked achievement is missing", () => {
      const profile = completeProfile({ externalLink: undefined });
      expect(findTier(computeBadges(profile), "completionist")).toBeUndefined();
    });
  });

  it("returns multiple badges at once for a well-rounded profile", () => {
    const profile: MusicProfile = {
      ...EMPTY_PROFILE,
      instruments: instrumentsOf(4).map((inst) => ({ ...inst, skillLevel: "Expert" })),
      qualifications: Array.from({ length: 5 }, () => ({ ...EMPTY_QUALIFICATION })),
      highlights: ["Played a festival"],
      bands: [{ ...EMPTY_BAND, from: "2020-01-01" }],
    };

    const badges = computeBadges(profile);
    expect(badges).toEqual(
      expect.arrayContaining([
        { category: "instrumentCount", tier: "gold" },
        { category: "skillTier", tier: "gold" },
        { category: "qualificationCount", tier: "gold" },
        { category: "bandMember", kind: "unlocked" },
        { category: "allRounder", kind: "unlocked" },
      ]),
    );
  });
});
