import { z } from "zod";

import { instrumentSchema } from './instrument/instrument-schema';
import { profileThemes, profileThemeSchema } from './theme/theme-schema';
import { qualificationSchema, QUALIFICATION_MAX_ITEMS } from './qualification/qualification-schema';
import { highlightSchema, HIGHLIGHT_MAX_ITEMS } from './highlight/highlight-schema';
import { bandSchema, BAND_MAX_ITEMS } from './band/band-schema';

export const NAME_MAX_LENGTH = 100;


export const musicProfileSchema = z.object({
  name: z.string().max(NAME_MAX_LENGTH),
  instruments: z.array(instrumentSchema),
  theme: profileThemeSchema,
  // Below are all optional, so links issued before they existed still decode.
  qualifications: z.array(qualificationSchema).max(QUALIFICATION_MAX_ITEMS).optional(),
  highlights: z.array(highlightSchema).max(HIGHLIGHT_MAX_ITEMS).optional(),
  bands: z.array(bandSchema).max(BAND_MAX_ITEMS).optional(),
  lookingForBand: z.boolean().optional(),
});

export type MusicProfile = z.infer<typeof musicProfileSchema>;

export const EMPTY_PROFILE: MusicProfile = {
  name: "",
  instruments: [],
  theme: profileThemes[0],
  qualifications: [],
  highlights: [],
  bands: [],
  lookingForBand: false,
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
          title: 'If I Were A Bell',
          link: 'https://youtu.be/36wafFjFdYs?si=WdrveMUgnZfJ1lzM'
        },
        {
          genre: 'Jazz',
          artist: 'Miles Davis Quintet',
          title: 'It Could Happen To You',
          link: 'https://youtu.be/pvqyK2j_6b4?si=lt9dncmi3qPaOduB'
        },
      ]
    },
    { instrument: "Bass",
      playedSince: "2026-08-01",
      skillLevel: "Beginner",
      repertoire: [
        {
          genre: 'Funk',
          artist: 'Jamiroquai',
          title: 'Manifest Destiny'
        },
        {
          genre: 'Funk',
          artist: 'Jamiroquai',
          title: 'Runaway'
        }
      ]
    },
  ],
  theme: "studio",
  qualifications: [
    {
      title: "Grade 8 Piano",
      institution: "ABRSM",
      grade: "Distinction",
      year: "2024",
    },
  ],
  highlights: [
    "Supported a UK jazz festival headline set, 2023",
    "Session bassist on two independent EP releases",
  ],
  bands: [
    { name: "The Midnight Set", from: "2023-01-01", position: "Bass" },
    { name: "Backline", from: "2018-01-01", to: "2021-06-01", position: "Piano" },
  ],
  lookingForBand: true,
}
