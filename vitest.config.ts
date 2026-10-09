import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Each project configures its own environment:
    // - unit: packages/*/vite.config.ts, apps/docs/vite.config.ts
    // - e2e: tests/e2e/vitest.config.ts (user flows across components)
    // - contracts: tests/contracts/vitest.config.ts (cross-platform suites),
    //   tests/contracts/vitest.native.config.ts (React Native driver)
    // - native: packages/native/vitest*.config.ts, tests/e2e-native
    projects: [
      "packages/core",
      "packages/dom",
      "packages/react",
      "packages/web-components",
      "apps/docs",
      "tests/e2e",
      "tests/e2e-native",
      "tests/contracts",
      "tests/contracts/vitest.native.config.ts",
      "tests/docs",
      // native Vue 3 renderer (minerva-design/vue)
      // React Native (minerva-design/native): RNTL and react-native-web lanes
      "packages/native/vitest.config.ts",
      "packages/native/vitest.web.config.ts",
      // Native framework renderers and mini-program host regression suites
      "packages/vue",
      "packages/angular",
      "packages/taro",
      "packages/weapp",
      "packages/uni",
    ],
    coverage: {
      provider: "v8",
      // Coverage thresholds measure core, DOM, React, Web Components and Vue.
      // All projects above still run; native/Angular/mini host tests are not
      // included in this percentage, nor is the documentation application.
      include: [
        "packages/core/src/**/*.ts",
        "packages/dom/src/**/*.ts",
        "packages/react/src/**/*.{ts,tsx}",
        "packages/web-components/src/**/*.{ts,tsx}",
        "packages/vue/src/**/*.{ts,vue}",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/types.ts",
        "**/*-types.ts",
        "**/*.d.ts",
        // barrel files
        "**/react/src/**/index.{ts,tsx}",
        "**/packages/core/src/index.ts",
        "**/packages/dom/src/index.ts",
        "**/packages/dom/src/core-web.ts",
        "**/web-components/src/index.ts",
        "**/web-components/src/controllers/index.ts",
        "**/packages/vue/src/index.ts",
        "**/packages/vue/src/groups/**",
        "**/packages/vue/src/components/*/index.ts",
        // generated Volar typings (no runtime code)
        "**/packages/vue/src/global.ts",
        // generated from the React icons (no logic)
        "**/web-components/src/internal/icons.ts",
        "**/packages/vue/src/internal/icons.ts",
        "**/test-utils/**",
      ],
      reporter: ["text-summary", "html", "lcov"],
      // `pnpm test:coverage` fails below these thresholds.
      thresholds: {
        statements: 92,
        branches: 89,
        functions: 95,
        lines: 93,
      },
    },
  },
});
