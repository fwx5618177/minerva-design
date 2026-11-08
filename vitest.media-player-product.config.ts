import { defineConfig } from "vitest/config";

// The installed-tarball browser lane has its own config so source coverage can
// use repository-relative include globs without a --project filter. Vitest 5
// rebases coverage globs to package roots whenever --project is present.
export default defineConfig({
  test: {
    name: "media-player-product",
    environment: "node",
    include: ["packages/media-player/test/product/**/*.test.ts"],
    exclude: [],
    testTimeout: 180000,
    hookTimeout: 180000,
  },
});
