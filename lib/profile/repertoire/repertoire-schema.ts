import { z } from "zod";


export const REPERTOIRE_FIELD_MAX_LENGTH = 50;

// Capped on purpose - a short highlight, not a full setlist.
export const REPERTOIRE_MAX_ITEMS = 5;

export const repertoireSchema = z.object({
  genre: z.string().max(REPERTOIRE_FIELD_MAX_LENGTH),
  artist: z.string().max(REPERTOIRE_FIELD_MAX_LENGTH),
  title: z.string().max(REPERTOIRE_FIELD_MAX_LENGTH),
  link: z.url().optional(),
});

export type Repertoire = z.infer<typeof repertoireSchema>;

export const EMPTY_REPERTOIRE: Repertoire = {
  genre: "",
  artist: "",
  title: "",
};