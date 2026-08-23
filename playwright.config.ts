import { defineConfig, devices } from "@playwright/test";

// Point at a deployed environment (e.g. prod) instead of local dev:
//   PLAYWRIGHT_BASE_URL=https://jordanalec-soundprint.vercel.app npm run test:e2e
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const isRemote = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Reuses an already-running `next dev` locally (Next locks the project to
  // one dev server, so a second instance on another port won't start) and
  // starts a fresh one in CI, where nothing is running yet. Skipped entirely
  // when PLAYWRIGHT_BASE_URL points at a remote deployment.
  webServer: isRemote
    ? undefined
    : {
        command: "npx next dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
