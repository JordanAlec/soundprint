import { z } from "zod";

import { todayIsoDate } from "@/utils/date-utils";
import { skillLevels, skillLevelSchema } from '../skill/skill-schema';
import { repertoireSchema, REPERTOIRE_MAX_ITEMS } from "../repertoire/repertoire-schema";

export const INSTRUMENT_MAX_LENGTH = 50;

export const instrumentSchema = z.object({
  instrument: z.string().max(INSTRUMENT_MAX_LENGTH),
  // wireCompact tag: token.ts truncates this to year-month on encode and pads
  // it back to day 01 on decode instead of storing the full ISO date.
  playedSince: z.iso
    .date()
    .meta({ wireCompact: "yearMonthDate" })
    .refine((value) => value <= todayIsoDate(), "Played since can't be in the future."),
  skillLevel: skillLevelSchema,
  repertoire: z.array(repertoireSchema).max(REPERTOIRE_MAX_ITEMS)
});

export type Instrument = z.infer<typeof instrumentSchema>;

export const EMPTY_INSTRUMENT: Instrument = {
  instrument: "",
  playedSince: "",
  skillLevel: skillLevels[0],
  repertoire: []
};
