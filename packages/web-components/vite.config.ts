import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };
import { writeEsmDeclarations } from "../../tools/dual-declarations.mjs";
import {
  coreImportsPlugin,
  rewriteCoreDeclarations,
} from "../../tools/core-imports.mjs";
import {
  CHARTS_DIST,
  ICONS_DIST,
  WEB_COMPONENTS_DIST,
} from "../../tools/paths.mjs";
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
/**
 * Engines of the optional entries, imported by their public specifier
 * `minerva-design/<name>/core`: the chart elements (`chart`, `trading-chart`,
 * `order-book`, `chart-3d`, `graph`) import `minerva-design/charts/core`,
 * the icon elements (`icon`) `minerva-design/icons/core`. They stay external
 * and are rewritten to the one copy built by the charts / icons workspace
 * packages (`dist/<name>/core.js`, shared with minerva-design/charts,
 * minerva-design/icons and the other renderers).
 */
const ENGINE_DIST: Record<string, string> = {
  charts: CHARTS_DIST,
  icons: ICONS_DIST,
};
const ENGINE_NAMES = Object.keys(ENGINE_DIST).join("|");
const isEngine = (id: string) =>
  Object.keys(ENGINE_DIST).some((name) => id === `minerva-design/${name}/core`);
const isExternal = (id: string) =>
  isEngine(id) ||
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const ENGINE_IMPORT = new RegExp(
  `(["'])minerva-design/(${ENGINE_NAMES})/core\\1`,
  "g",
);
/** Engine imports of `fromFile` rewritten to relative paths into `dist/<name>/` */
const rewriteEngineImports = (code: string, fromFile: string) =>
  code.replace(ENGINE_IMPORT, (_, quote: string, name: string) => {
    const path = relative(dirname(fromFile), join(ENGINE_DIST[name], "core.js"))
      .split(sep)
      .join("/");
    return `${quote}${path.startsWith(".") ? path : `./${path}`}${quote}`;
  });
/**
 * vite-plugin-dts resolves the `paths` of tsconfig.build.json relative to the
 * sources (`../../../minerva-design/dist/charts/core.d.ts`), which is wrong
 * once emitted: back to the bare specifier, rewritten after the build
 */
const ENGINE_DECLARATION = new RegExp(
  `(["'])(?:\\.\\./)+minerva-design/dist/(${ENGINE_NAMES})/core(?:\\.d\\.ts)?\\1`,
  "g",
);
const bareEngines = (emittedFiles: Map<string, string>) => {
  for (const [file, content] of emittedFiles) {
    if (file.endsWith(".d.ts"))
      emittedFiles.set(
        file,
        content.replace(ENGINE_DECLARATION, "$1minerva-design/$2/core$1"),
      );
  }
  return emittedFiles;
};
const enginesPlugin = (): Plugin => ({
  name: "minerva-engine-imports",
  renderChunk(code, chunk) {
    const next = rewriteEngineImports(
      code,
      join(WEB_COMPONENTS_DIST, chunk.fileName),
    );
    return next === code ? null : { code: next, map: null };
  },
});
/** The same for the emitted declarations (vite-plugin-dts keeps the specifier) */
const rewriteEngineDeclarations = (dir: string) => {
  for (const entry of readdirSync(dir, {
    withFileTypes: true,
    recursive: true,
  })) {
    if (!entry.isFile() || !/\.d\.c?ts$/.test(entry.name)) continue;
    const file = join(entry.parentPath, entry.name);
    const code = readFileSync(file, "utf8");
    const next = rewriteEngineImports(code, file);
    if (next !== code) writeFileSync(file, next);
  }
};

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
    enginesPlugin(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      exclude: ["src/**/*.test.ts"],
      // explicit `.js` specifiers so `moduleResolution: node16` resolves them
      afterBuild: (emittedFiles) => {
        writeEsmDeclarations(bareEngines(emittedFiles));
        rewriteCoreDeclarations(WEB_COMPONENTS_DIST);
        rewriteEngineDeclarations(WEB_COMPONENTS_DIST);
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
      {
        find: /^minerva-design\/charts\/core$/,
        replacement: here("../charts/src/core.ts"),
      },
      {
        find: /^minerva-design\/icons\/core$/,
        replacement: here("../icons/src/core.ts"),
      },
    ],
    setupFiles: ["./tests/setup/setup.ts"],
    css: {
      include: [/\.scss/],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
