import { describe, expect, it } from "vitest";

import { skillLevelSchema, skillLevels } from "./skill-schema";

describe("skillLevelSchema", () => {
  it.each(skillLevels)("accepts %s", (level) => {
    expect(skillLevelSchema.safeParse(level).success).toBe(true);
  });

  it("rejects a level not in skillLevels", () => {
    const result = skillLevelSchema.safeParse("Virtuoso");

    expect(result.success).toBe(false);
  });
});
