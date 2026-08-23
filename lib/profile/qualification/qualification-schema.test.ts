import { describe, expect, it } from "vitest";

import { qualificationSchema, EMPTY_QUALIFICATION, QUALIFICATION_MAX_ITEMS } from "./qualification-schema";
import { musicProfileSchema, EMPTY_PROFILE } from "../profile-schema";

function qualificationsOf(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    title: `Qualification ${i}`,
    institution: `Institution ${i}`,
  }));
}

describe("qualificationSchema", () => {
  it("accepts a title and institution with no grade or year", () => {
    const result = qualificationSchema.safeParse({
      ...EMPTY_QUALIFICATION,
      title: "Grade 8 Piano",
      institution: "ABRSM",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a grade and year when provided", () => {
    const result = qualificationSchema.safeParse({
      title: "BMus Music Performance",
      institution: "Royal Academy of Music",
      grade: "First Class Honours",
      year: "2022",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a missing title", () => {
    const result = qualificationSchema.safeParse({
      institution: "ABRSM",
    });

    expect(result.success).toBe(false);
  });
});

describe("musicProfileSchema qualifications", () => {
  it("is entirely optional, matching EMPTY_PROFILE", () => {
    const result = musicProfileSchema.safeParse({
      name: "",
      instruments: [],
      theme: EMPTY_PROFILE.theme,
    });

    expect(result.success).toBe(true);
  });

  it("accepts up to QUALIFICATION_MAX_ITEMS entries", () => {
    const result = musicProfileSchema.safeParse({
      ...EMPTY_PROFILE,
      qualifications: qualificationsOf(QUALIFICATION_MAX_ITEMS),
    });

    expect(result.success).toBe(true);
  });

  it("rejects more than QUALIFICATION_MAX_ITEMS entries", () => {
    const result = musicProfileSchema.safeParse({
      ...EMPTY_PROFILE,
      qualifications: qualificationsOf(QUALIFICATION_MAX_ITEMS + 1),
    });

    expect(result.success).toBe(false);
  });
});
