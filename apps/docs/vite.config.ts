import { defineConfig } from "vitest/config";
import type { Alias } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import tsconfig from "./tsconfig.json" with { type: "json" };
import {
  bundleBudgetPlugin,
  docsMetaPlugin,
} from "./scripts/build-plugins.mjs";
import { wcFrameworksPlugin } from "./src/docs/frameworks/vitePlugin.ts";

// App path aliases are defined once, in tsconfig.json "paths".
// The minerva-design entries there only point tsc at workspace sources for
// type-checking; at runtime Vite resolves the built package (the workspace
// link to packages/minerva-design) instead, exactly like an application.
const alias: Alias[] = Object.entries(tsconfig.compilerOptions.paths)
  .filter(([key]) => !key.startsWith("minerva-design"))
  .map(([key, [target]]) => ({
    find: new RegExp(`^${key.replace("*", "")}`),
    replacement: fileURLToPath(
      new URL(target.replace("*", ""), import.meta.url),
    ),
  }));

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// Unit tests import the workspace packages from source (no build needed),
// exactly like tests/e2e does. Exact-match aliases: sub-entries first.
const testAlias: Alias[] = [
  {
    find: /^minerva-design\/theme-utils$/,
    replacement: src("../../packages/react/src/theme-utils.ts"),
  },
  {
    find: /^minerva-design\/style\.css$/,
    replacement: src("../../packages/core/src/theme/tokens.scss"),
  },
  {
    find: /^minerva-design$/,
    replacement: src("../../packages/react/src/index.ts"),
  },
  {
    find: /^minerva-design\/web-components$/,
    replacement: src("../../packages/web-components/src/index.ts"),
  },
  {
    find: /^@react-styles\//,
    replacement: src("../../packages/react/src/"),
  },
  {
    find: /^minerva-design\/tokens\.css$/,
    replacement: src("../../packages/core/src/theme/tokens.scss"),
  },
  {
    find: /^minerva-design\/styling-hooks$/,
    replacement: src("../../packages/core/src/styling-hooks/index.ts"),
  },
  {
    find: /^minerva-design\/core$/,
    replacement: src("../../packages/dom/src/core-web.ts"),
  },
  {
    find: /^@minerva\/core$/,
    replacement: src("../../packages/core/src/index.ts"),
  },
  {
    find: /^@minerva\/dom$/,
    replacement: src("../../packages/dom/src/index.ts"),
  },
];

export default defineConfig({
  base: "/minerva-design/",
  plugins: [
    react(),
    docsMetaPlugin(),
    wcFrameworksPlugin(),
    bundleBudgetPlugin(),
  ],
  resolve: { alias: process.env.VITEST ? [...testAlias, ...alias] : alias },
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
  build: {
    // Each docs page is its own chunk; keep vendor code in a stable chunk
    rolldownOptions: {
      output: {
        // Split chunks (the Monaco engine below) must still evaluate their
        // modules in import order, across chunk boundaries.
        strictExecutionOrder: true,
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|@remix-run)[\\/]/,
            },
            {
              // Every Minerva custom element (lazy-loaded by the "Web
              // Components" tabs): split into cacheable chunks below 500 kB.
              name: "minerva-web-components",
              test: /minerva-design[\\/]dist[\\/]web-components[\\/]/,
              maxSize: 400 * 1024,
            },
            {
              // The Monaco engine (lazy-loaded by the Monaco demo only) is
              // ~2 MB: split it into cacheable chunks below the 500 kB limit.
              name: "monaco-engine",
              test: /node_modules[\\/]monaco-editor[\\/]/,
              maxSize: 450 * 1024,
            },
          ],
        },
      },
    },
  },
  test: {
    name: "docs-app",
    // Node by default (docs consistency checks); component tests opt into
    // happy-dom with a `// @vitest-environment happy-dom` docblock.
    environment: "node",
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
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    css: {
      include: [],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
