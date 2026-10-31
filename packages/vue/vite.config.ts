import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
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
  REACT_DIST,
  VUE_DIST,
} from "../../tools/paths.mjs";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// Built into `dist/vue/` of the published `minerva-design` package
// (`minerva-design/vue`, `minerva-design/vue/monaco`,
// `minerva-design/vue/charts` and `minerva-design/vue/icons`), ESM only (the Vue 3
// ecosystem: Vite, Nuxt, vue/server-renderer all load ESM).
//
// Dependencies (vue, dompurify, jsonc-parser, the optional monaco-editor)
// are resolved by the consumer. @minerva/core / @minerva/dom stay external
// and are rewritten to the copies in dist/core/ and dist/dom/ shared with the
// other renderers (tools/core-imports.mjs).
const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  "@vue",
];
/**
 * Engines built by the other workspace packages, imported by their published
 * specifier: they stay external and are rewritten to the one built copy
 * (shared with the other renderers)
 * - the chart components: `minerva-design/charts/core` -> `dist/charts/core.js`
 * - the icon components: `minerva-design/icons/core` -> `dist/icons/core.js`,
 *   and `minerva-design/icons/surface` (internal, not a published entry: the
 *   canvas renderers of `Icon`, loaded with the first canvas icon) ->
 *   `dist/icons/engine/surface.js`
 */
const LINKED: Record<string, { dist: string; file: string }> = {
  "minerva-design/charts/core": { dist: CHARTS_DIST, file: "core" },
  "minerva-design/icons/core": { dist: ICONS_DIST, file: "core" },
  "minerva-design/icons/surface": { dist: ICONS_DIST, file: "engine/surface" },
};
const isExternal = (id: string) =>
  id in LINKED ||
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const LINKED_IMPORT =
  /(["'])(minerva-design\/(?:charts\/core|icons\/core|icons\/surface))\1/g;
/**
 * vite-plugin-dts resolves the `paths` of tsconfig.build.json relative to the
 * sources (`../../minerva-design/dist/charts/core.d.ts`), which is wrong
 * once emitted: back to the bare specifier, rewritten after the build
 */
const LINKED_DECLARATION =
  /(["'])(?:\.\.\/)+minerva-design\/dist\/(charts\/core|icons\/core|icons\/engine\/surface)(?:\.d\.ts)?\1/g;
const bareLinked = (emittedFiles: Map<string, string>) => {
  for (const [file, content] of emittedFiles) {
    if (file.endsWith(".d.ts"))
      emittedFiles.set(
        file,
        content.replace(
          LINKED_DECLARATION,
          (_match, quote: string, path: string) =>
            `${quote}minerva-design/${path.replace("engine/", "")}${quote}`,
        ),
      );
  }
  return emittedFiles;
};
const linkedSpecifier = (fromFile: string, specifier: string) => {
  const { dist, file } = LINKED[specifier]!;
  const path = relative(dirname(fromFile), join(dist, `${file}.js`))
    .split(sep)
    .join("/");
  return path.startsWith(".") ? path : `./${path}`;
};
const rewriteLinked = (code: string, fromFile: string) =>
  code.replace(
    LINKED_IMPORT,
    (_match, quote: string, specifier: string) =>
      `${quote}${linkedSpecifier(fromFile, specifier)}${quote}`,
  );
const linkedImportsPlugin = (): Plugin => ({
  name: "minerva-linked-engine-imports",
  apply: "build",
  renderChunk(code, chunk) {
    const next = rewriteLinked(code, join(VUE_DIST, chunk.fileName));
    return next === code ? null : { code: next, map: null };
  },
});
/** The same for the emitted declarations (vite-plugin-dts keeps the specifier) */
const rewriteLinkedDeclarations = (dir: string) => {
  for (const entry of readdirSync(dir, {
    withFileTypes: true,
    recursive: true,
  })) {
    if (!entry.isFile() || !/\.d\.c?ts$/.test(entry.name)) continue;
    const file = join(entry.parentPath, entry.name);
    const code = readFileSync(file, "utf8");
    const next = rewriteLinked(code, file);
    if (next !== code) writeFileSync(file, next);
  }
};

/**
 * Shared styles: the Vue components import the SCSS modules of the React
 * renderer (`@react-styles/components/Button/button.module.scss`). The build
 * does not compile them again: each import becomes the class-name map that
 * the React build already emitted next to its components
 * (`dist/react/components/Button/button.module.scss.js`), so both renderers
 * use the very same hashed class names, styled by the one
 * `minerva-design/style.css`.
 */
const REACT_STYLE = /^@react-styles\/(.+\.module\.scss)$/;
const reactStylesPlugin = (): Plugin => ({
  name: "minerva-react-styles",
  enforce: "pre",
  apply: "build",
  resolveId(id) {
    if (REACT_STYLE.test(id)) return { id, external: true };
    return null;
  },
  renderChunk(code, chunk) {
    if (!code.includes("@react-styles/")) return null;
    const from = dirname(join(VUE_DIST, chunk.fileName));
    return {
      code: code.replace(
        /(["'])@react-styles\/(.+?\.module\.scss)\1/g,
        (_match, quote: string, path: string) => {
          const target = relative(from, join(REACT_DIST, `${path}.js`))
            .split(sep)
            .join("/");
          return `${quote}${target.startsWith(".") ? target : `./${target}`}${quote}`;
        },
      ),
      map: null,
    };
  },
});

export default defineConfig({
  plugins: [
    reactStylesPlugin(),
    vue(),
    coreImportsPlugin({ outDir: VUE_DIST }),
    linkedImportsPlugin(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      exclude: ["src/**/*.test.ts", "src/test-utils/**"],
      afterBuild: (emittedFiles) => {
        writeEsmDeclarations(bareLinked(emittedFiles));
        rewriteCoreDeclarations(VUE_DIST);
        rewriteLinkedDeclarations(VUE_DIST);
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: VUE_DIST,
    sourcemap: true,
    target: "es2022",
    cssCodeSplit: false,
    lib: {
      entry: {
        index: here("./src/index.ts"),
        monaco: here("./src/monaco.ts"),
        charts: here("./src/charts.ts"),
        icons: here("./src/icons.ts"),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        // `Button.vue?vue&type=script&setup=true&lang` -> a plain file name
        entryFileNames: (chunk) => `${chunk.name.replace(/[?&=]/g, "_")}.js`,
      },
    },
  },
  test: {
    name: "vue",
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
    include: ["src/**/*.test.ts", "spike/**/*.test.ts", "tests/**/*.test.ts"],
    alias: [
      { find: /^@react-styles\//, replacement: here("../react/src/") },
      {
        find: /^@minerva\/core\/tokens\.css$/,
        replacement: here("../core/src/theme/tokens.css"),
      },
      {
        find: /^@minerva\/core\/styling-hooks$/,
        replacement: here("../core/src/styling-hooks/index.ts"),
      },
      {
        find: /^@minerva\/core\/contracts$/,
        replacement: here("../core/src/contracts/index.ts"),
      },
      { find: /^@minerva\/core$/, replacement: here("../core/src/index.ts") },
      { find: /^@minerva\/dom$/, replacement: here("../dom/src/index.ts") },
      {
        find: /^minerva-design\/charts\/core$/,
        replacement: here("../charts/src/core.ts"),
      },
      {
        find: /^minerva-design\/icons\/core$/,
        replacement: here("../icons/src/core.ts"),
      },
      {
        find: /^minerva-design\/icons\/surface$/,
        replacement: here("../icons/src/engine/surface.ts"),
      },
    ],
    setupFiles: ["./tests/setup.ts"],
    css: {
      include: [/\.scss/],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
