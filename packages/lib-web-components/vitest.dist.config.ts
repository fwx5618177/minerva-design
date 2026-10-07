import { defineConfig } from "vitest/config";

// Checks of the built package (run after `pnpm build`):
//   pnpm --filter @minerva/lib-web-components test:dist
export default defineConfig({
  test: {
    name: "lib-web-components-dist",
    environment: "node",
    include: ["tests/dist/**/*.test.ts"],
    testTimeout: 60_000,
  },
});
