import { defineConfig } from "vitest/config";

// Checks of the assembled, published package (run after `pnpm build`):
//   pnpm test:dist   (= pnpm --filter minerva-design test:dist)
// Not part of the root `vitest` projects: they need the build output.
export default defineConfig({
  test: {
    name: "minerva-design-dist",
    environment: "node",
    include: ["tests/*.test.ts"],
    testTimeout: 60_000,
    // the tarball test installs and builds a fixture project
    hookTimeout: 600_000,
  },
});
