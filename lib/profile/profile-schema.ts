import { z } from "zod";

import { instrumentSchema } from './instrument/instrument-schema';
import { profileThemes, profileThemeSchema } from './theme/theme-schema';

export const NAME_MAX_LENGTH = 100;


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
