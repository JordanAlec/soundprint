import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Your musical profile, in one link." })).toBeVisible();
});

test("FAQ page loads", async ({ page }) => {
  await page.goto("/faq");
  await expect(page.getByRole("heading", { name: "FAQs" })).toBeVisible();
});

test("sample profile loads and decodes from the home page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Sample profile/ }).click();

  await expect(page).toHaveURL(/\/profile\//);
  await expect(page.getByText("Decode failed")).toHaveCount(0);
  await expect(page.getByText("Jordan Alec", { exact: true })).toBeVisible();
});

test("create page loads", async ({ page }) => {
  await page.goto("/create");
  await expect(page.getByRole("heading", { name: "Create" })).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
});

test("create a profile with every field, generate a link, and it decodes", async ({ page }) => {
  await page.goto("/create");

  await page.getByLabel("Name").fill("Test Musician");

  await page.getByRole("button", { name: "Add instrument" }).click();
  await page.locator("#instrument-0").fill("Guitar");
  await page.locator("#played-since-0").fill("2020-01-01");
  await page.locator("#skill-level-0").selectOption("Advanced");

  await page.getByRole("button", { name: "Add song" }).click();
  await page.locator("#repertoire-0-0-title").fill("Test Song");
  await page.locator("#repertoire-0-0-artist").fill("Test Artist");
  await page.locator("#repertoire-0-0-genre").fill("Rock");
  await page.locator("#repertoire-0-0-link").fill("https://example.com/song");

  await page.getByRole("button", { name: "Add band" }).click();
  await page.locator("#band-0-name").fill("Test Band");
  await page.locator("#band-0-position").fill("Guitar");
  await page.locator("#band-0-from").fill("2021-01-01");

  await page.getByLabel("I'm looking for a band").check();

  await page.getByRole("button", { name: "Add qualification" }).click();
  await page.locator("#qualification-0-title").fill("Grade 8 Guitar");
  await page.locator("#qualification-0-institution").fill("ABRSM");
  await page.locator("#qualification-0-grade").fill("Distinction");
  await page.locator("#qualification-0-year").fill("2024");

  await page.getByRole("button", { name: "Add highlight" }).click();
  await page.locator("#highlight-0").fill("Played a sold-out local show.");

  await page.getByRole("button", { name: "Neon Mixtape" }).click();

  await page.getByRole("button", { name: "Generate shareable link" }).click();
  await expect(page.getByText("Your shareable link")).toBeVisible();

  await page.getByRole("link", { name: "View profile" }).click();

  await expect(page).toHaveURL(/\/profile\//);
  await expect(page.getByText("Decode failed")).toHaveCount(0);
  await expect(page.getByText("Test Musician", { exact: true })).toBeVisible();
  await expect(page.getByText("Guitar").first()).toBeVisible();
  await expect(page.getByText("Test Band")).toBeVisible();
  await expect(page.getByText("Looking for a band")).toBeVisible();
  await expect(page.getByText("Grade 8 Guitar")).toBeVisible();
  await expect(page.getByText("Played a sold-out local show.")).toBeVisible();
});
