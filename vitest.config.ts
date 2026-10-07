import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Each project configures its own environment:
    // - unit: packages/*/vite.config.ts
    // - e2e: tests/e2e/vitest.config.ts (user flows across components)
    projects: [
      "packages/core",
      "packages/lib-core",
      "packages/lib-web-components",
      "packages/sample",
      "tests/e2e",
    ],
    coverage: {
      provider: "v8",
      // Library sources only (the docs site is not measured)
      include: [
        "**/core/src/**/*.ts",
        "**/lib-core/src/**/*.{ts,tsx}",
        "**/lib-web-components/src/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/types.ts",
        "**/*-types.ts",
        "**/*.d.ts",
        // barrel files (lib-web-components keeps real code in Button/index.ts)
        "**/lib-core/src/**/index.{ts,tsx}",
        "**/packages/core/src/index.ts",
        "**/lib-web-components/src/index.ts",
        "**/test-utils/**",
      ],
      reporter: ["text-summary", "html", "lcov"],
      // `pnpm test:coverage` fails below these (current: ~94/92/97/96)
      thresholds: {
        statements: 92,
        branches: 89,
        functions: 95,
        lines: 93,
      },
    },
  },
});
