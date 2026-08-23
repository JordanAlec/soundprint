import { z } from "zod";


export const REPERTOIRE_FIELD_MAX_LENGTH = 50;

export const repertoireSchema = z.object({
  genre: z.string().max(REPERTOIRE_FIELD_MAX_LENGTH),
  artist: z.string().max(REPERTOIRE_FIELD_MAX_LENGTH),
  title: z.string().max(REPERTOIRE_FIELD_MAX_LENGTH),
});

export type Repertoire = z.infer<typeof repertoireSchema>;