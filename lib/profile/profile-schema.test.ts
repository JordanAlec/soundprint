import { describe, expect, it } from "vitest";

import { musicProfileSchema, EMPTY_PROFILE, SAMPLE_PROFILE, NAME_MAX_LENGTH } from "./profile-schema";

describe("musicProfileSchema", () => {
  it("accepts EMPTY_PROFILE and SAMPLE_PROFILE", () => {
    expect(musicProfileSchema.safeParse(EMPTY_PROFILE).success).toBe(true);
    expect(musicProfileSchema.safeParse(SAMPLE_PROFILE).success).toBe(true);
  });

  it("rejects a name longer than NAME_MAX_LENGTH", () => {
    const result = musicProfileSchema.safeParse({
      ...EMPTY_PROFILE,
      name: "a".repeat(NAME_MAX_LENGTH + 1),
    });

    expect(result.success).toBe(false);
  });

  it("rejects a missing instruments array", () => {
    const withoutInstruments: Record<string, unknown> = { ...EMPTY_PROFILE };
    delete withoutInstruments.instruments;

    const result = musicProfileSchema.safeParse(withoutInstruments);

    expect(result.success).toBe(false);
  });
});
