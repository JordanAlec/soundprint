import type { MusicProfile } from "../profile-schema";
import type { SkillLevel } from "../skill/skill-schema";

export const badgeTiers = ["bronze", "silver", "gold"] as const;
export type BadgeTier = (typeof badgeTiers)[number];

// The capstone's tier - above gold, but not one of the per-category
// thresholds, so it's kept out of `badgeTiers`/`BadgeTier` rather than
// forcing every Record<BadgeTier, ...> in this file to define one.
export const capstoneTier = "diamond" as const;
export type CapstoneTier = typeof capstoneTier;

export const tieredBadgeCategories = [
  "instrumentCount",
  "skillTier",
  "qualificationCount",
  "repertoireCount",
] as const;
export type TieredBadgeCategory = (typeof tieredBadgeCategories)[number];

export const unlockedBadgeCategories = ["bandMember", "showcase", "allRounder", "linkedUp"] as const;
export type UnlockedBadgeCategory = (typeof unlockedBadgeCategories)[number];

// Single one-off category carrying the diamond tier - see CAPSTONE_DEFINITION for the unlock condition.
export const capstoneBadgeCategory = "completionist" as const;
export type CapstoneBadgeCategory = typeof capstoneBadgeCategory;

export interface TierDefinition {
  tier: BadgeTier;
  name: string;
  description: string;
}

export interface UnlockedDefinition {
  category: UnlockedBadgeCategory;
  name: string;
  description: string;
}

export interface CapstoneDefinition {
  category: CapstoneBadgeCategory;
  tier: CapstoneTier;
  name: string;
  description: string;
}

export type Badge =
  | { category: TieredBadgeCategory; tier: BadgeTier }
  | { category: UnlockedBadgeCategory; kind: "unlocked" }
  | { category: CapstoneBadgeCategory; tier: CapstoneTier };

export const INSTRUMENT_COUNT_THRESHOLDS: Record<BadgeTier, number> = { bronze: 2, silver: 3, gold: 4 };
export const QUALIFICATION_COUNT_THRESHOLDS: Record<BadgeTier, number> = { bronze: 1, silver: 3, gold: 5 };
export const REPERTOIRE_COUNT_THRESHOLDS: Record<BadgeTier, number> = { bronze: 3, silver: 8, gold: 15 };

// Beginner/Early Intermediate award nothing. Advanced folds into silver
// alongside Advanced Intermediate so gold stays reserved for Expert.
const SKILL_TIER_BY_LEVEL: Partial<Record<SkillLevel, BadgeTier>> = {
  Intermediate: "bronze",
  "Advanced Intermediate": "silver",
  Advanced: "silver",
  Expert: "gold",
};

// Exhaustive catalogue - every tier of every category, earned or not. Source
// for the achievements page.
export const BADGE_DEFINITIONS: Record<TieredBadgeCategory, TierDefinition[]> = {
  instrumentCount: [
    { tier: "bronze", name: "Dual Threat", description: "Play 2 instruments." },
    { tier: "silver", name: "Multi-Instrumentalist", description: "Play 3 instruments." },
    { tier: "gold", name: "One-Person Band", description: "Play 4 instruments." },
  ],
  skillTier: [
    { tier: "bronze", name: "On The Rise", description: "Reach Intermediate skill on any instrument." },
    { tier: "silver", name: "Well Practiced", description: "Reach Advanced Intermediate (or Advanced) skill on any instrument." },
    { tier: "gold", name: "Virtuoso", description: "Reach Expert skill on any instrument." },
  ],
  qualificationCount: [
    { tier: "bronze", name: "Certified", description: "Log 1 qualification." },
    { tier: "silver", name: "Well Schooled", description: "Log 3 qualifications." },
    { tier: "gold", name: "Highly Qualified", description: "Log 5 qualifications." },
  ],
  repertoireCount: [
    { tier: "bronze", name: "Setlist Starter", description: "Log 3 repertoire entries across your instruments." },
    { tier: "silver", name: "Deep Cuts", description: "Log 8 repertoire entries across your instruments." },
    { tier: "gold", name: "Walking Jukebox", description: "Log 15 repertoire entries across your instruments." },
  ],
};

export const TIERED_CATEGORY_LABELS: Record<TieredBadgeCategory, string> = {
  instrumentCount: "Instrument count",
  skillTier: "Skill level",
  qualificationCount: "Qualifications",
  repertoireCount: "Repertoire breadth",
};

export const UNLOCKED_DEFINITIONS: UnlockedDefinition[] = [
  { category: "bandMember", name: "Band Member", description: "List at least one band." },
  { category: "showcase", name: "Showcase", description: "Link a recording to at least one repertoire entry." },
  {
    category: "allRounder",
    name: "All-Rounder",
    description: "Fill in instruments, qualifications, highlights and bands.",
  },
  { category: "linkedUp", name: "Linked Up", description: "Add an external profile link." },
];

// The end goal - only earned once every tiered category has gold and every
// unlocked achievement above is earned too.
export const CAPSTONE_DEFINITION: CapstoneDefinition = {
  category: capstoneBadgeCategory,
  tier: capstoneTier,
  name: "Completionist",
  description: "Earn gold in every tiered category and every other achievement.",
};

export interface AchievementEntry {
  name: string;
  description: string;
  tier?: BadgeTier | CapstoneTier;
}

export interface AchievementGroup {
  heading: string;
  entries: AchievementEntry[];
}

// Groups BADGE_DEFINITIONS/UNLOCKED_DEFINITIONS for display. Not tied to any profile.
export function achievementGroups(): AchievementGroup[] {
  const tieredGroups = tieredBadgeCategories.map((category) => ({
    heading: TIERED_CATEGORY_LABELS[category],
    entries: BADGE_DEFINITIONS[category].map((definition) => ({
      name: definition.name,
      description: definition.description,
      tier: definition.tier,
    })),
  }));

  const unlockedGroup: AchievementGroup = {
    heading: "Other achievements",
    entries: UNLOCKED_DEFINITIONS.map((definition) => ({
      name: definition.name,
      description: definition.description,
    })),
  };

  const capstoneGroup: AchievementGroup = {
    heading: "The end goal",
    entries: [
      {
        name: CAPSTONE_DEFINITION.name,
        description: CAPSTONE_DEFINITION.description,
        tier: CAPSTONE_DEFINITION.tier,
      },
    ],
  };

  return [...tieredGroups, unlockedGroup, capstoneGroup];
}

function highestTier(value: number, thresholds: Record<BadgeTier, number>): BadgeTier | undefined {
  if (value >= thresholds.gold) return "gold";
  if (value >= thresholds.silver) return "silver";
  if (value >= thresholds.bronze) return "bronze";
  return undefined;
}

const SKILL_TIER_RANK: Record<BadgeTier, number> = { bronze: 0, silver: 1, gold: 2 };

function highestSkillTier(profile: MusicProfile): BadgeTier | undefined {
  let best: BadgeTier | undefined;
  for (const instrument of profile.instruments) {
    const tier = SKILL_TIER_BY_LEVEL[instrument.skillLevel];
    if (tier && (!best || SKILL_TIER_RANK[tier] > SKILL_TIER_RANK[best])) {
      best = tier;
    }
  }
  return best;
}

// Pure derivation, no persistence - recomputed on every decode.
export function computeBadges(profile: MusicProfile): Badge[] {
  const badges: Badge[] = [];

  const instrumentTier = highestTier(profile.instruments.length, INSTRUMENT_COUNT_THRESHOLDS);
  if (instrumentTier) badges.push({ category: "instrumentCount", tier: instrumentTier });

  const skillTier = highestSkillTier(profile);
  if (skillTier) badges.push({ category: "skillTier", tier: skillTier });

  const qualificationTier = highestTier(profile.qualifications?.length ?? 0, QUALIFICATION_COUNT_THRESHOLDS);
  if (qualificationTier) badges.push({ category: "qualificationCount", tier: qualificationTier });

  const repertoireCount = profile.instruments.reduce((sum, instrument) => sum + instrument.repertoire.length, 0);
  const repertoireTier = highestTier(repertoireCount, REPERTOIRE_COUNT_THRESHOLDS);
  if (repertoireTier) badges.push({ category: "repertoireCount", tier: repertoireTier });

  if ((profile.bands?.length ?? 0) >= 1) {
    badges.push({ category: "bandMember", kind: "unlocked" });
  }

  const hasLinkedRepertoire = profile.instruments.some((instrument) =>
    instrument.repertoire.some((entry) => Boolean(entry.link)),
  );
  if (hasLinkedRepertoire) {
    badges.push({ category: "showcase", kind: "unlocked" });
  }

  const isAllRounder =
    profile.instruments.length >= 1 &&
    (profile.qualifications?.length ?? 0) >= 1 &&
    (profile.highlights?.length ?? 0) >= 1 &&
    (profile.bands?.length ?? 0) >= 1;
  if (isAllRounder) {
    badges.push({ category: "allRounder", kind: "unlocked" });
  }

  if (profile.externalLink) {
    badges.push({ category: "linkedUp", kind: "unlocked" });
  }

  const hasGoldInEveryTier = tieredBadgeCategories.every((category) =>
    badges.some((badge) => "tier" in badge && badge.category === category && badge.tier === "gold"),
  );
  const hasEveryUnlocked = unlockedBadgeCategories.every((category) =>
    badges.some((badge) => "kind" in badge && badge.kind === "unlocked" && badge.category === category),
  );
  if (hasGoldInEveryTier && hasEveryUnlocked) {
    badges.push({ category: capstoneBadgeCategory, tier: capstoneTier });
  }

  return badges;
}
