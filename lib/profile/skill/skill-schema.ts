import { z } from "zod";

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