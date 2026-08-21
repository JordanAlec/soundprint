import { z } from "zod";

export const musicProfileSchema = z.object({
  name: z.string(),
});

export type MusicProfile = z.infer<typeof musicProfileSchema>;

export const EMPTY_PROFILE: MusicProfile = {
  name: "",
};
