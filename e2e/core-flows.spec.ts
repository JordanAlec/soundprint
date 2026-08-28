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

test("forum signature banner is hidden by default and toggles open", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Sample profile/ }).click();
  await expect(page).toHaveURL(/\/profile\//);

  const showButton = page.getByRole("button", { name: "Show forum signature" });
  await expect(showButton).toBeVisible();
  await expect(page.getByAltText(/forum signature/)).toHaveCount(0);

  await showButton.click();

  await expect(page.getByRole("button", { name: "Hide forum signature" })).toBeVisible();
  await expect(page.getByAltText(/forum signature/)).toBeVisible();
  await expect(page.getByText("BBCode", { exact: true })).toBeVisible();
  await expect(page.getByText("HTML", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Hide forum signature" }).click();
  await expect(page.getByAltText(/forum signature/)).toHaveCount(0);
});

test("compare page loads two profiles side by side", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Sample profile/ }).click();
  await expect(page).toHaveURL(/\/profile\//);
  const profileUrl = page.url();

  await page.goto("/compare");
  await expect(page.getByRole("heading", { name: "Compare" })).toBeVisible();

  await page.getByLabel("Profile A").fill(profileUrl);
  await page.getByRole("button", { name: "Load" }).first().click();

  await page.getByLabel("Profile B").fill(profileUrl);
  await page.getByRole("button", { name: "Load" }).nth(1).click();

  await expect(page.getByText("That's the same profile pasted twice", { exact: false })).toBeVisible();
});

test("compare page shows a summary and both profiles for two different links", async ({ page }) => {
  await page.goto("/create");
  await page.getByLabel("Name").fill("Musician One");
  await page.getByRole("button", { name: "Add instrument" }).click();
  await page.locator("#instrument-0").fill("Piano");
  await page.locator("#played-since-0").fill("2020-01-01");
  await page.getByRole("button", { name: "Generate shareable link" }).click();
  await page.getByRole("link", { name: "View profile" }).click();
  await expect(page).toHaveURL(/\/profile\//);
  const profileOneUrl = page.url();

  await page.goto("/create");
  await page.getByLabel("Name").fill("Musician Two");
  await page.getByRole("button", { name: "Add instrument" }).click();
  await page.locator("#instrument-0").fill("Piano");
  await page.locator("#played-since-0").fill("2020-01-01");
  await page.getByRole("button", { name: "Generate shareable link" }).click();
  await page.getByRole("link", { name: "View profile" }).click();
  await expect(page).toHaveURL(/\/profile\//);
  const profileTwoUrl = page.url();

  await page.goto("/compare");
  await page.getByLabel("Profile A").fill(profileOneUrl);
  await page.getByRole("button", { name: "Load" }).first().click();
  await page.getByLabel("Profile B").fill(profileTwoUrl);
  await page.getByRole("button", { name: "Load" }).nth(1).click();

  await expect(page.getByText("Musician One", { exact: true })).toBeVisible();
  await expect(page.getByText("Musician Two", { exact: true })).toBeVisible();
  await expect(page.getByText("Shared", { exact: true })).toBeVisible();
  await expect(page.getByText("Piano", { exact: true }).first()).toBeVisible();
});

test("achievements page loads", async ({ page }) => {
  await page.goto("/achievements");
  await expect(page.getByRole("heading", { name: "Achievements" })).toBeVisible();
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
