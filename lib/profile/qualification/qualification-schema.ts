import { z } from "zod";

export const QUALIFICATION_FIELD_MAX_LENGTH = 100;

// Capped on purpose - a few highlights, not a full CV.
export const QUALIFICATION_MAX_ITEMS = 5;

export const qualificationSchema = z.object({
  title: z.string().max(QUALIFICATION_FIELD_MAX_LENGTH),
  institution: z.string().max(QUALIFICATION_FIELD_MAX_LENGTH),
  grade: z.string().max(QUALIFICATION_FIELD_MAX_LENGTH).optional(),
  year: z.string().max(4).optional(),
});

export type Qualification = z.infer<typeof qualificationSchema>;

export const EMPTY_QUALIFICATION: Qualification = {
  title: "",
  institution: "",
};
