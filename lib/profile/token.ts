// Uses atob/btoa (not Buffer) since encode runs client-side and decode
// runs server-side — both are available in each.

import { skillLevels } from './skill/skill-schema';
import { profileThemes } from './theme/theme-schema';

import { musicProfileSchema, type MusicProfile } from "./profile-schema";

export type DecodeResult =
  | { ok: true; data: MusicProfile }
  | { ok: false; error: string };

// playedSince is truncated to year-month here and padded back to day 01 in fromWire.
type WireInstrument = [instrument: string, playedSince: string, skillLevel: number];
type WireProfile = [name: string, instruments: WireInstrument[], theme: number];

function toWire(data: MusicProfile): WireProfile {
  return [
    data.name,
    data.instruments.map((instrument) => [
      instrument.instrument,
      instrument.playedSince.slice(0, 7),
      skillLevels.indexOf(instrument.skillLevel),
    ]),
    profileThemes.indexOf(data.theme),
  ];
}

function fromWire(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  const [name, instruments, themeIndex] = value as WireProfile;
  return {
    name,
    instruments: (instruments ?? []).map(([instrument, yearMonth, skillIndex]) => ({
      instrument,
      playedSince: `${yearMonth}-01`,
      skillLevel: skillLevels[skillIndex],
    })),
    theme: profileThemes[themeIndex],
  };
}

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeProfileToken(data: MusicProfile): string {
  return toBase64Url(JSON.stringify(toWire(data)));
}

export function extractProfileToken(input: string): string {
  const trimmed = input.trim();
  const marker = "/profile/";
  const index = trimmed.lastIndexOf(marker);

  if (index === -1) {
    return trimmed;
  }

  return trimmed.slice(index + marker.length);
}

export function decodeProfileToken(token: string): DecodeResult {
  let json: string;
  try {
    json = fromBase64Url(token);
  } catch {
    return { ok: false, error: "This link isn't a valid SoundPrint token." };
  }

  let profile: unknown;
  try {
    profile = fromWire(JSON.parse(json));
  } catch {
    return { ok: false, error: "This link's data is corrupted or incomplete." };
  }

  const parsed = musicProfileSchema.safeParse(profile);
  if (!parsed.success) {
    return { ok: false, error: "This link's data is corrupted or incomplete." };
  }

  return { ok: true, data: parsed.data };
}
