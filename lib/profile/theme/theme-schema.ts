import { z } from "zod";

export const profileThemes = ["studio", "sunburst", "neon"] as const;

export const profileThemeSchema = z.enum(profileThemes);

export type ProfileTheme = z.infer<typeof profileThemeSchema>;