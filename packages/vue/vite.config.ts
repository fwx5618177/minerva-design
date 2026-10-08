import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };
import { writeEsmDeclarations } from "../../tools/dual-declarations.mjs";
import {
  coreImportsPlugin,
  rewriteCoreDeclarations,
} from "../../tools/core-imports.mjs";
import { REACT_DIST, VUE_DIST } from "../../tools/paths.mjs";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// Built into `dist/vue/` of the published `minerva-design` package
// (`minerva-design/vue` and `minerva-design/vue/monaco`), ESM only (the Vue 3
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
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

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
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      exclude: ["src/**/*.test.ts", "src/test-utils/**"],
      afterBuild: (emittedFiles) => {
        writeEsmDeclarations(emittedFiles);
        rewriteCoreDeclarations(VUE_DIST);
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
      entry: { index: here("./src/index.ts"), monaco: here("./src/monaco.ts") },
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
    ],
    setupFiles: ["./tests/setup.ts"],
    css: {
      include: [/\.scss/],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
