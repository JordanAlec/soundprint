import type { BadgeTier, CapstoneTier } from "./badge-schema";

export interface MedalPalette {
  light: string; // gradient highlight / bevel
  dark: string; // gradient shadow / rim stroke
  ink: string; // center glyph, contrasts against the medal face
}

// Independent of profile theme - tiers need to read the same regardless of
// which theme (studio/sunburst/neon) a profile is using.
export const BADGE_TIER_PALETTE: Record<BadgeTier, MedalPalette> = {
  bronze: { light: "#e0a568", dark: "#8a5220", ink: "#2b1a08" },
  silver: { light: "#eef1f4", dark: "#9aa2ac", ink: "#20242b" },
  gold: { light: "#f5d883", dark: "#b3821f", ink: "#2b2108" },
};

// One shared color for all unlocked (non-tiered) achievements, distinct from
// the metal tiers so they don't imply a rank that doesn't exist.
export const BADGE_UNLOCKED_PALETTE: MedalPalette = { light: "#8fb0d1", dark: "#3f5f82", ink: "#f3f6fa" };

// Diamond - brighter and colder than gold, so it reads as beyond the metal
// tiers rather than another rung on them.
export const BADGE_CAPSTONE_PALETTE: MedalPalette = { light: "#eafeff", dark: "#5fd0e0", ink: "#0b2e35" };

const ALL_TIER_PALETTE: Record<BadgeTier | CapstoneTier, MedalPalette> = {
  ...BADGE_TIER_PALETTE,
  diamond: BADGE_CAPSTONE_PALETTE,
};

export function paletteForTier(tier?: BadgeTier | CapstoneTier): MedalPalette {
  return tier ? ALL_TIER_PALETTE[tier] : BADGE_UNLOCKED_PALETTE;
}

const TIER_GLYPH: Record<BadgeTier | CapstoneTier, string> = {
  bronze: "★",
  silver: "★",
  gold: "★",
  diamond: "◆",
};

export function glyphForTier(tier?: BadgeTier | CapstoneTier): string {
  return tier ? TIER_GLYPH[tier] : "★";
}
