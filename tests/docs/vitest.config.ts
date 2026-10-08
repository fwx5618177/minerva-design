import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Repository-level checks that read files only (no DOM, no build needed):
// README / demo code compiles, internal links resolve, the published
// packages' metadata is complete and the browser support matrix is current.
export default defineConfig({
  test: {
    name: "docs",
    root: fileURLToPath(new URL(".", import.meta.url)),
    environment: "node",
    include: ["**/*.test.ts"],
    // the README type-check builds a TypeScript program over the sources
    testTimeout: 120_000,
  },
});
