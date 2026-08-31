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
  externalLink: z.url().optional(),
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


// Deliberately maxes out every achievement, including the completionist
// capstone - it's the demo profile, so it should show the whole system off.
export const SAMPLE_PROFILE: MusicProfile = {
  name: "The Amazing Virtuoso",
  instruments: [
    { instrument: "Piano",
      playedSince: "2026-08-01",
      skillLevel: "Expert",
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
        {
          genre: 'Jazz',
          artist: 'Bill Evans Trio',
          title: 'Waltz For Debby',
        },
        {
          genre: 'Classical',
          artist: 'Chopin',
          title: 'Nocturne Op. 9 No. 2',
        },
      ]
    },
    { instrument: "Bass",
      playedSince: "2026-08-01",
      skillLevel: "Advanced",
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
        },
        {
          genre: 'Funk',
          artist: 'Stevie Wonder',
          title: 'Higher Ground'
        },
        {
          genre: 'Jazz',
          artist: 'Weather Report',
          title: 'Birdland'
        },
      ]
    },
    { instrument: "Guitar",
      playedSince: "2026-08-01",
      skillLevel: "Advanced Intermediate",
      repertoire: [
        {
          genre: 'Rock',
          artist: 'Fleetwood Mac',
          title: 'The Chain'
        },
        {
          genre: 'Rock',
          artist: 'Eagles',
          title: 'Hotel California'
        },
        {
          genre: 'Blues',
          artist: 'B.B. King',
          title: 'The Thrill Is Gone'
        },
        {
          genre: 'Soul',
          artist: 'Al Green',
          title: 'Let\'s Stay Together'
        },
      ]
    },
    { instrument: "Drums",
      playedSince: "2026-08-01",
      skillLevel: "Intermediate",
      repertoire: [
        {
          genre: 'Funk',
          artist: 'Tower of Power',
          title: 'What Is Hip?'
        },
        {
          genre: 'Rock',
          artist: 'Led Zeppelin',
          title: 'Fool In The Rain'
        },
        {
          genre: 'Jazz',
          artist: 'Art Blakey',
          title: 'Moanin\''
        },
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
    {
      title: "Grade 8 Bass",
      institution: "Rockschool",
      grade: "Distinction",
      year: "2023",
    },
    {
      title: "BA Music Performance",
      institution: "Royal Northern College of Music",
      grade: "First Class",
      year: "2022",
    },
    {
      title: "Grade 7 Guitar",
      institution: "ABRSM",
      grade: "Merit",
      year: "2021",
    },
    {
      title: "Session Drumming Diploma",
      institution: "Drum Tech",
      year: "2020",
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
  externalLink: "https://jordanalec.co.uk",
}
