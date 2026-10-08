import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import pkg from "./package.json" with { type: "json" };
import { writeEsmDeclarations } from "../../tools/dual-declarations.mjs";
import {
  coreImportsPlugin,
  rewriteCoreDeclarations,
} from "../../tools/core-imports.mjs";
import { WEB_COMPONENTS_DIST } from "../../tools/paths.mjs";
import { minifyTemplatesPlugin } from "./scripts/minify-templates.mjs";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// Built into `dist/web-components/` of the published `minerva-design`
// package (`minerva-design/web-components` and its per-element entries).
//
// Dependencies (lit, dompurify, jsonc-parser) and the optional peers
// (monaco-editor, for the code-editor entry) are resolved by the consumer,
// never bundled. @minerva/core and @minerva/dom stay external too: their imports
// are rewritten to the copies in `dist/core/` / `dist/dom/` shared with the React entries
// (tools/core-imports.mjs).
const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

/**
 * Package entries: the all-in-one `index` (registers every element) and one
 * define entry per element (`src/elements/<name>.ts`, published as
 * `minerva-design/web-components/<name>`). Modules are preserved so importing
 * one element never pulls the others.
 */
const elementEntries = Object.fromEntries(
  readdirSync(here("./src/elements"))
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
    .map((file) => [
      `elements/${file.replace(/\.ts$/, "")}`,
      here(`./src/elements/${file}`),
    ]),
);

/**
 * Shared styles: the component stylesheets of @minerva/react (SCSS
 * modules) are compiled into each element's shadow root with their class
 * names unchanged (`generateScopedName: "[local]"`), so both libraries
 * render from one source (same look, same `--<component>-*` variables).
 */
const reactStyles = here("../react/src/");

export default defineConfig({
  plugins: [
    // whitespace of the css / html templates (build only)
    minifyTemplatesPlugin(),
    coreImportsPlugin({ outDir: WEB_COMPONENTS_DIST }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      exclude: ["src/**/*.test.ts"],
      // explicit `.js` specifiers so `moduleResolution: node16` resolves them
      afterBuild: (emittedFiles) => {
        writeEsmDeclarations(emittedFiles);
        rewriteCoreDeclarations(WEB_COMPONENTS_DIST);
      },
    }),
  ],
  resolve: {
    alias: [{ find: /^@react-styles\//, replacement: reactStyles }],
  },
  css: {
    modules: { generateScopedName: "[local]" },
  },
  build: {
    emptyOutDir: true,
    outDir: WEB_COMPONENTS_DIST,
    sourcemap: true,
    target: "es2022",
    lib: {
      entry: { index: here("./src/index.ts"), ...elementEntries },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        // React stylesheets become `styles/<Component>/<file>.css.js`
        // (no `?inline` query in published file names)
        entryFileNames: (chunk) =>
          `${chunk.name
            .replace(/^react\/src\/components\//, "styles/")
            .replace(/^react\/src\//, "styles/")
            .replace(/(\.module)?\.scss\?inline$/, ".css")}.js`,
      },
    },
  },
  test: {
    name: "web-components",
    // happy-dom, except the two HtmlPreview files (html-preview.test.ts,
    // sanitizer-environment.test.ts): they run under jsdom (file docblock)
    // because the real DOMPurify needs a spec-compliant DOM.
    environment: "happy-dom",
    include: [
      "src/**/*.test.ts",
      "tests/ssr/**/*.test.ts",
      "tests/meta/**/*.test.ts",
      "tests/e2e/**/*.test.ts",
      "tests/runtime/**/*.test.ts",
      "tests/styling-hooks/**/*.test.ts",
    ],
    alias: [
      {
        find: /^@minerva\/core\/styling-hooks$/,
        replacement: here("../core/src/styling-hooks/index.ts"),
      },
      {
        find: /^@minerva\/core$/,
        replacement: here("../core/src/index.ts"),
      },
      {
        find: /^@minerva\/dom$/,
        replacement: here("../dom/src/index.ts"),
      },
    ],
    setupFiles: ["./tests/setup/setup.ts"],
    css: {
      include: [/\.scss/],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
