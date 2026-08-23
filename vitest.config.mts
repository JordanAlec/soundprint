import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    // e2e/ holds Playwright specs, not Vitest ones - Vitest's default
    // include pattern also matches *.spec.ts, so exclude it explicitly.
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});
