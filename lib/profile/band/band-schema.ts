import { z } from "zod";

import { todayIsoDate } from "@/utils/date-utils";

export const BAND_FIELD_MAX_LENGTH = 100;

// Capped on purpose - a few bands, not a full history.
export const BAND_MAX_ITEMS = 5;

export const bandSchema = z
  .object({
    name: z.string().max(BAND_FIELD_MAX_LENGTH),
    // wireCompact tag: token.ts truncates this to year-month on encode and
    // pads it back to day 01 on decode instead of storing the full ISO date.
    from: z.iso
      .date()
      .meta({ wireCompact: "yearMonthDate" })
      .refine((value) => value <= todayIsoDate(), "Start date can't be in the future."),
    // Absent means still an active member.
    to: z.iso
      .date()
      .meta({ wireCompact: "yearMonthDate" })
      .refine((value) => value <= todayIsoDate(), "End date can't be in the future.")
      .optional(),
    position: z.string().max(BAND_FIELD_MAX_LENGTH).optional(),
  })
  .refine((band) => !band.to || band.to >= band.from, {
    message: "End date can't be before the start date.",
    path: ["to"],
  });

export type Band = z.infer<typeof bandSchema>;

export const EMPTY_BAND: Band = {
  name: "",
  from: "",
  to: undefined,
  position: undefined,
};
