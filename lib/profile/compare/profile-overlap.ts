import type { MusicProfile } from "../profile-schema";

export interface Overlap {
  shared: string[];
  onlyA: string[];
  onlyB: string[];
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function dedupeSorted(values: string[]): string[] {
  const seen = new Map<string, string>();
  for (const value of values) {
    const key = normalize(value);
    if (key && !seen.has(key)) {
      seen.set(key, value.trim());
    }
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
}

export function computeOverlap(valuesA: string[], valuesB: string[]): Overlap {
  const a = dedupeSorted(valuesA);
  const b = dedupeSorted(valuesB);
  const bKeys = new Set(b.map(normalize));
  const aKeys = new Set(a.map(normalize));

  return {
    shared: a.filter((value) => bKeys.has(normalize(value))),
    onlyA: a.filter((value) => !bKeys.has(normalize(value))),
    onlyB: b.filter((value) => !aKeys.has(normalize(value))),
  };
}

export function instrumentNames(profile: MusicProfile): string[] {
  return profile.instruments.map((instrument) => instrument.instrument);
}

export function repertoireGenres(profile: MusicProfile): string[] {
  return profile.instruments.flatMap((instrument) =>
    instrument.repertoire.map((entry) => entry.genre),
  );
}
