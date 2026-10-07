import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };

// Everything the package depends on is resolved by the consumer, never bundled.
// Matches bare ids and subpaths (e.g. react/jsx-runtime, react-icons/fa).
const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const src = (path: string) =>
  fileURLToPath(new URL(`./src/${path}`, import.meta.url));

/**
 * Package entries. Client entries get a `"use client"` banner so React Server
 * Components can import them; the theme-utils entry is server-safe (pure
 * functions / constants used by root layouts) and must NOT carry it.
 */
const entries = {
  index: src("index.ts"),
  "theme-utils": src("theme-utils.ts"),
  monaco: src("monaco.ts"),
};
const CLIENT_ENTRIES = new Set(["index", "monaco"]);

/**
 * Stand-alone stylesheet published next to `style.css`:
 * `prose.scss`, the Sass adapter (mixins) for long-form typography.
 */
const extraAssets = (): Plugin => ({
  name: "minerva-extra-assets",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "prose.scss",
      source: readFileSync(src("components/Prose/prose.scss"), "utf8"),
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    extraAssets(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: entries,
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
      cssFileName: "style",
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        exports: "named",
        // Every component is client-side (state, effects, portals): mark the
        // client entries so React Server Components consumers can import them.
        banner: (chunk) =>
          chunk.isEntry && CLIENT_ENTRIES.has(chunk.name)
            ? '"use client";'
            : "",
      },
    },
  },
  test: {
    name: "lib-core",
    // happy-dom by default; only the HtmlPreview sanitizer tests opt into
    // jsdom (file docblock), because DOMPurify needs a spec-compliant DOM.
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        // A static, offline DOM: no page scripts, no network for <link>,
        // <script src> or iframes; disabled loads count as successful.
        settings: {
          enableJavaScriptEvaluation: false,
          disableJavaScriptFileLoading: true,
          disableCSSFileLoading: true,
          disableIframePageLoading: true,
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: {
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
