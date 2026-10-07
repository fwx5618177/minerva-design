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
    // Exact-match aliases: sub-entries first.
    alias: [
      {
        find: /^@minerva\/lib-core\/theme-utils$/,
        replacement: src("../../packages/lib-core/src/theme-utils.ts"),
      },
      {
        find: /^@minerva\/lib-core\/monaco$/,
        replacement: src("../../packages/lib-core/src/monaco.ts"),
      },
      {
        find: /^@minerva\/lib-core$/,
        replacement: src("../../packages/lib-core/src/index.ts"),
      },
      {
        find: /^@minerva\/core\/tokens\.css$/,
        replacement: src("../../packages/core/src/theme/tokens.scss"),
      },
      {
        find: /^@minerva\/core$/,
        replacement: src("../../packages/core/src/index.ts"),
      },
      {
        find: /^@minerva\/lib-web-components$/,
        replacement: src("../../packages/lib-web-components/src/index.ts"),
      },
    ],
  },
  test: {
    name: "e2e",
    root: src("."),
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        settings: {
          enableJavaScriptEvaluation: false,
          disableJavaScriptFileLoading: true,
          disableCSSFileLoading: true,
          disableIframePageLoading: true,
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
    include: ["**/*.test.tsx"],
    setupFiles: ["./setup.ts"],
    css: {
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
