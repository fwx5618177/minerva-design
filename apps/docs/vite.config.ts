import { defineConfig } from "vitest/config";
import type { Alias } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import tsconfig from "./tsconfig.json" with { type: "json" };
import {
  bundleBudgetPlugin,
  docsMetaPlugin,
} from "./scripts/build-plugins.mjs";
import { angularExamplesPlugin } from "./src/docs/angular/vitePlugin.ts";
import { wcFrameworksPlugin } from "./src/docs/frameworks/vitePlugin.ts";

// App path aliases are defined once, in tsconfig.json "paths".
// The minerva-design entries there only point tsc at workspace sources for
// type-checking; at runtime Vite resolves the built package (the workspace
// link to packages/minerva-design) instead, exactly like an application.
// `react` / `react-native` there are type-only too: the native sources
// (packages/native) are typed with React Native's types and the site's
// single @types/react.
const TYPE_ONLY_PATHS = new Set(["react", "react/*", "react-native"]);
const alias: Alias[] = Object.entries(tsconfig.compilerOptions.paths)
  .filter(
    ([key]) => !key.startsWith("minerva-design") && !TYPE_ONLY_PATHS.has(key),
  )
  .map(([key, [target]]) => ({
    find: new RegExp(`^${key.replace("*", "")}`),
    replacement: fileURLToPath(
      new URL(target.replace("*", ""), import.meta.url),
    ),
  }));

const src = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// React Native previews: minerva-design/native imported from its sources and
// rendered through react-native-web (`react-native` is the docs shim:
// react-native-web with a Modal that stays inside the phone frame). Only the
// "React Native" tabs load them (lazy chunks).
const nativeAlias: Alias[] = [
  {
    find: /^react-native$/,
    replacement: src("./src/docs/native/react-native.ts"),
  },
  {
    find: /^minerva-design\/native$/,
    replacement: src("../../packages/native/src/index.ts"),
  },
];

// Unit tests import the workspace packages from source (no build needed),
// exactly like tests/e2e does. Exact-match aliases: sub-entries first.
const testAlias: Alias[] = [
  {
    find: /^minerva-design\/charts\/core$/,
    replacement: src("../../packages/charts/src/core.ts"),
  },
  {
    find: /^minerva-design\/charts$/,
    replacement: src("../../packages/charts/src/index.ts"),
  },
  {
    find: /^minerva-design\/icons\/core$/,
    replacement: src("../../packages/icons/src/core.ts"),
  },
  {
    find: /^minerva-design\/icons$/,
    replacement: src("../../packages/icons/src/index.ts"),
  },
  {
    find: /^minerva-design\/vue\/monaco$/,
    replacement: src("../../packages/vue/src/monaco.ts"),
  },
  {
    find: /^minerva-design\/theme-utils$/,
    replacement: src("../../packages/react/src/theme-utils.ts"),
  },
  {
    find: /^minerva-design\/style\.css$/,
    replacement: src("../../packages/core/src/theme/tokens.css"),
  },
  {
    find: /^minerva-design$/,
    replacement: src("../../packages/react/src/index.ts"),
  },
  {
    find: /^minerva-design\/vue\/charts$/,
    replacement: src("../../packages/vue/src/charts.ts"),
  },
  {
    find: /^minerva-design\/vue$/,
    replacement: src("../../packages/vue/src/index.ts"),
  },
  // the chart entries of the web components (chart, trading-chart,
  // order-book, chart-3d, graph)
  {
    find: /^minerva-design\/web-components\/(chart|trading-chart|order-book|chart-3d|graph)$/,
    replacement: src("../../packages/web-components/src/elements/$1.ts"),
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
    replacement: src("../../packages/core/src/theme/tokens.css"),
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

// `DOCS_SOURCE_CHARTS=1 pnpm dev`: the chart entries from their sources, so
// chart work can be previewed without building the package
const sourceChartsAlias: Alias[] = process.env.DOCS_SOURCE_CHARTS
  ? testAlias.slice(0, 2)
  : [];

// `DOCS_SOURCE_FRAMEWORKS=1` (with DOCS_SOURCE_CHARTS=1): minerva-design/vue
// and the web components from their sources too, to preview the chart
// wrappers without a build (their other components are not styled by the
// built stylesheet in this mode: chart previews only)
const sourceFrameworksAlias: Alias[] = process.env.DOCS_SOURCE_FRAMEWORKS
  ? [
      "minerva-design/web-components/chart",
      "minerva-design/web-components",
      "minerva-design/vue/charts",
      "minerva-design/vue",
      "@react-styles/",
      "@minerva/core",
      "@minerva/dom",
    ].map((specifier) =>
      testAlias.find(({ find }) => (find as RegExp).test(specifier))!,
    )
  : [];

export default defineConfig({
  base: "/minerva-design/",
  plugins: [
    ...(process.env.VITEST ? [] : [angularExamplesPlugin()]),
    react(),
    // the native Vue demos (pages/<id>/vue/*.vue) and, in tests, the Vue
    // renderer's single-file components
    vue(),
    docsMetaPlugin(),
    wcFrameworksPlugin(),
    bundleBudgetPlugin(),
  ],
  resolve: {
    alias: process.env.VITEST
      ? [...nativeAlias, ...testAlias, ...alias]
      : [
          ...nativeAlias,
          ...sourceChartsAlias,
          ...sourceFrameworksAlias,
          ...alias,
        ],
    // one React for the site and the native sources (packages/native pins
    // the Expo SDK's React for its own tests)
    dedupe: ["react", "react-dom"],
  },
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
              name: "angular-preview",
              test: /(?:@angular[\\/]|minerva-design[\\/]dist[\\/]angular[\\/])/,
              maxSize: 350 * 1024,
            },
            {
              // Shared UI translations have their own budget; page strings
              // remain lazy-loaded with the page that needs them.
              name: "locale-common",
              test: /i18n[\\/]locales[\\/][^\\/]+[\\/]common\.json$/,
              maxSize: 200 * 1024,
            },
            {
              name: "native-preview",
              test: /(?:react-native-web|packages[\\/]native[\\/]src)/,
              maxSize: 200 * 1024,
            },
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
