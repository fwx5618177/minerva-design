import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// End-to-end user flows: realistic mini-apps composed from the public package
// entries, driven only through user-event (happy-dom, no browser).
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Import the packages exactly like a consumer does ("@minerva/lib-core"),
    // served from source so no build is needed and coverage maps to src/.
    alias: {
      "@minerva/lib-core": src("../../packages/lib-core/src/index.ts"),
      "@minerva/lib-web-components": src(
        "../../packages/lib-web-components/src/index.ts",
      ),
    },
  },
  test: {
    name: "e2e",
    root: src("."),
    environment: "happy-dom",
    include: ["**/*.test.tsx"],
    setupFiles: ["./setup.ts"],
    css: {
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
