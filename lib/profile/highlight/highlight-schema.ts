import { z } from "zod";

export const HIGHLIGHT_MAX_LENGTH = 150;

// Capped on purpose - a few highlights, not a full biography.
export const HIGHLIGHT_MAX_ITEMS = 5;

export const highlightSchema = z.string().max(HIGHLIGHT_MAX_LENGTH);

export type Highlight = z.infer<typeof highlightSchema>;
