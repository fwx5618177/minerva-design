import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// Cross-platform contract suites (see README.md): written once against the
// Driver API, run by the React DOM and Web Components drivers on the
// sources (happy-dom), like tests/e2e. Exact-match aliases: sub-entries first.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^minerva-design$/,
        replacement: src("../../packages/react/src/index.ts"),
      },
      {
        find: /^minerva-design\/web-components$/,
        replacement: src("../../packages/web-components/src/index.ts"),
      },
      {
        find: /^@minerva\/core\/tokens\.css$/,
        replacement: src("../../packages/core/src/theme/tokens.css"),
      },
      {
        find: /^@minerva\/core\/styling-hooks$/,
        replacement: src("../../packages/core/src/styling-hooks/index.ts"),
      },
      {
        find: /^@minerva\/core\/contracts$/,
        replacement: src("../../packages/core/src/contracts/index.ts"),
      },
      {
        find: /^@minerva\/core$/,
        replacement: src("../../packages/core/src/index.ts"),
      },
      {
        find: /^@minerva\/dom$/,
        replacement: src("../../packages/dom/src/index.ts"),
      },
      // React stylesheets compiled into the Web Components' shadow roots
      {
        find: /^@react-styles\//,
        replacement: src("../../packages/react/src/"),
      },
    ],
  },
  test: {
    name: "contracts",
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
    include: ["**/*.test.{ts,tsx}"],
    setupFiles: [
      "../../packages/web-components/tests/setup/setup.ts",
      "./setup.ts",
    ],
    css: {
      // React CSS modules and the Web Components' `?inline` stylesheets,
      // with their class names unchanged (both renderers share them)
      include: [/\.scss/],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
