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


export const SAMPLE_PROFILE: MusicProfile = {
  name: "Jordan Alec",
  instruments: [
    { instrument: "Piano",
      playedSince: "2026-08-01",
      skillLevel: "Beginner",
      repertoire: [
        {
          genre: 'Jazz',
          artist: 'Miles Davis Quintet',
          title: 'If I Were A Bell'
        }
      ]
    },
    { instrument: "Bass",
      playedSince: "2026-08-01",
      skillLevel: "Beginner",
      repertoire: [
        {
          genre: 'Jazz',
          artist: 'Cannonball Adderley',
          title: 'Autumn Leaves'
        }
      ]
    },
  ],
  theme: "studio",
}
