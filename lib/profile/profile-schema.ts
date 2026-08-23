import { z } from "zod";

import { instrumentSchema } from './instrument/instrument-schema';
import { profileThemes, profileThemeSchema } from './theme/theme-schema';
import { qualificationSchema, QUALIFICATION_MAX_ITEMS } from './qualification/qualification-schema';

export const NAME_MAX_LENGTH = 100;


export const musicProfileSchema = z.object({
  name: z.string().max(NAME_MAX_LENGTH),
  instruments: z.array(instrumentSchema),
  theme: profileThemeSchema,
  // Optional so links issued before this field existed still decode.
  qualifications: z.array(qualificationSchema).max(QUALIFICATION_MAX_ITEMS).optional(),
});

export type MusicProfile = z.infer<typeof musicProfileSchema>;

export const EMPTY_PROFILE: MusicProfile = {
  name: "",
  instruments: [],
  theme: profileThemes[0],
  qualifications: [],
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
}
