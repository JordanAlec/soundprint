import { z } from "zod";

import { todayIsoDate } from "@/utils/date-utils";
import { skillLevels, skillLevelSchema } from '../skill/skill-schema';

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