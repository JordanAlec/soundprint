import { z } from "zod";

export function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const skillLevels = [
  "Beginner",
  "Early Intermediate",
  "Intermediate",
  "Advanced Intermediate",
  "Advanced",
  "Expert",
] as const;

export const skillLevelSchema = z.enum(skillLevels);

export type SkillLevel = z.infer<typeof skillLevelSchema>;

export const profileThemes = ["studio", "sunburst", "neon"] as const;

export const profileThemeSchema = z.enum(profileThemes);

export type ProfileTheme = z.infer<typeof profileThemeSchema>;

export const NAME_MAX_LENGTH = 100;
export const INSTRUMENT_MAX_LENGTH = 50;

export const instrumentSchema = z.object({
  instrument: z.string().max(INSTRUMENT_MAX_LENGTH),
  playedSince: z.iso
    .date()
    .refine((value) => value <= todayIsoDate(), "Played since can't be in the future."),
  skillLevel: skillLevelSchema,
});

export type Instrument = z.infer<typeof instrumentSchema>;

export const EMPTY_INSTRUMENT: Instrument = {
  instrument: "",
  playedSince: "",
  skillLevel: skillLevels[0],
};

export const musicProfileSchema = z.object({
  name: z.string().max(NAME_MAX_LENGTH),
  instruments: z.array(instrumentSchema),
  theme: profileThemeSchema,
});

export type MusicProfile = z.infer<typeof musicProfileSchema>;

export const EMPTY_PROFILE: MusicProfile = {
  name: "",
  instruments: [],
  theme: profileThemes[0],
};
