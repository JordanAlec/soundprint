import { describe, expect, it } from "vitest";

import { profileThemeSchema, profileThemes } from "./theme-schema";

describe("profileThemeSchema", () => {
  it.each(profileThemes)("accepts %s", (theme) => {
    expect(profileThemeSchema.safeParse(theme).success).toBe(true);
  });

  it("rejects a theme not in profileThemes", () => {
    const result = profileThemeSchema.safeParse("retro");

    expect(result.success).toBe(false);
  });
});
