import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// End-to-end user flows: realistic mini-apps composed from the public package
// entries, driven only through user-event (happy-dom, no browser).
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Import the packages exactly like a consumer does ("minerva-design"),
    // served from source so no build is needed and coverage maps to src/.
    // Exact-match aliases: sub-entries first.
    alias: [
      {
        find: /^minerva-design\/theme-utils$/,
        replacement: src("../../packages/react/src/theme-utils.ts"),
      },
      {
        find: /^minerva-design\/monaco$/,
        replacement: src("../../packages/react/src/monaco.ts"),
      },
      {
        find: /^minerva-design$/,
        replacement: src("../../packages/react/src/index.ts"),
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
        find: /^minerva-design\/web-components$/,
        replacement: src("../../packages/web-components/src/index.ts"),
      },
      // React stylesheets compiled into the Web Components' shadow roots
      {
        find: /^@react-styles\//,
        replacement: src("../../packages/react/src/"),
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
      // only the stylesheets compiled into Web Components (`?inline`)
      include: [/\.scss\?inline$/],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
