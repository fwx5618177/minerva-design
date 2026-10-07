import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Each package configures its own environment in its vite.config.ts
    projects: [
      "packages/lib-core",
      "packages/lib-web-components",
      "packages/sample",
    ],
    coverage: {
      provider: "v8",
      include: ["packages/lib-*/src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/types.ts",
        "**/*.d.ts",
        "**/index.ts",
        "**/index.tsx",
        "**/test-utils/**",
      ],
      reporter: ["text-summary", "html", "lcov"],
    },
  },
});
