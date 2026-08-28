import type { MusicProfile } from "@/lib/profile/profile-schema";
import type { ProfileTheme } from "@/lib/profile/theme/theme-schema";
import { computeBadges, type BadgeTier } from "@/lib/profile/badge/badge-schema";

export interface OgPalette {
  canvas: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accent2: string;
  accentInk: string;
}

// Satori can't read CSS custom properties, so these are literal copies of
// the theme palettes in globals.css. Keep in sync if a theme's colors change.
export const THEME_PALETTE: Record<ProfileTheme, OgPalette> = {
  studio: {
    canvas: "#17181a",
    ink: "#ece9e2",
    inkMuted: "#9c9890",
    accent: "#e0a340",
    accent2: "#4fb0a8",
    accentInk: "#17181a",
  },
  sunburst: {
    canvas: "#f5efe1",
    ink: "#2b2117",
    inkMuted: "#7a6f5c",
    accent: "#c1522a",
    accent2: "#7a8f4a",
    accentInk: "#fdf6ec",
  },
  neon: {
    canvas: "#0b0f2e",
    ink: "#eef0ff",
    inkMuted: "#9099d6",
    accent: "#ff3ea5",
    accent2: "#28e0ff",
    accentInk: "#0b0f2e",
  },
};

// Full badge icons are unreadable at this size, so collapse to "GOLD x2   SILVER x1".
export function badgeRollup(profile: MusicProfile): string {
  const tierCounts: Record<BadgeTier, number> = { gold: 0, silver: 0, bronze: 0 };
  for (const badge of computeBadges(profile)) {
    if ("tier" in badge) {
      tierCounts[badge.tier] += 1;
    }
  }
  return (["gold", "silver", "bronze"] as const)
    .filter((tier) => tierCounts[tier] > 0)
    .map((tier) => `${tier.toUpperCase()} x${tierCounts[tier]}`)
    .join("   ");
}

// `transparent` is transparent black, not a transparent version of the
// source color - fading to it produces a gray band. Fade to this instead.
export function hexToTransparent(hex: string, alpha = 0): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// djb2 hash.
function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

const MIN_BAR_HEIGHT = 0.18;

// Same seed always produces the same bars - each profile gets a stable "print".
export function waveformBars(seed: string, count: number): number[] {
  const bars: number[] = [];
  let state = hashString(seed || "soundprint");
  for (let i = 0; i < count; i++) {
    // xorshift32.
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    const raw = (state % 1000) / 1000;
    bars.push(MIN_BAR_HEIGHT + raw * (1 - MIN_BAR_HEIGHT));
  }
  return bars;
}

export interface OgContent {
  name: string;
  palette: OgPalette;
  instrumentList: string;
  rollup: string;
  lookingForBand: boolean;
  bars: number[];
}

export function deriveOgContent(profile: MusicProfile, seed: string, barCount: number): OgContent {
  return {
    name: profile.name || "Untitled profile",
    palette: THEME_PALETTE[profile.theme],
    instrumentList: profile.instruments.map((instrument) => instrument.instrument).join(", "),
    rollup: badgeRollup(profile),
    lookingForBand: profile.lookingForBand ?? false,
    bars: waveformBars(seed, barCount),
  };
}
