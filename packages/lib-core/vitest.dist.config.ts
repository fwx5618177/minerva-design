import { defineConfig } from "vitest/config";

// Smoke tests for the built package (run after `pnpm build`):
//   pnpm --filter @minerva/lib-core test:dist
export default defineConfig({
  test: {
    name: "lib-core-dist",
    environment: "node",
    include: ["tests/package/**/*.test.ts"],
  },
});
