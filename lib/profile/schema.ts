export interface MusicProfile {
  name: string;
}

export const EMPTY_PROFILE: MusicProfile = {
  name: "",
};

export function isMusicProfile(value: unknown): value is MusicProfile {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as MusicProfile).name === "string"
  );
}
