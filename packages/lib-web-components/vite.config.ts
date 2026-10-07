import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };
import { writeEsmDeclarations } from "../../scripts/dual-declarations.mjs";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// Dependencies (lit, @minerva/core) are resolved by the consumer, never bundled.
const externalDeps = Object.keys(pkg.dependencies ?? {});
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

/**
 * Package entries: the all-in-one `index` (registers every element) and one
 * define entry per element (`src/elements/<name>.ts`, published as
 * `@minerva/lib-web-components/<name>`). Modules are preserved so importing
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
 * Shared styles: the component stylesheets of @minerva/lib-core (SCSS
 * modules) are compiled into each element's shadow root with their class
 * names unchanged (`generateScopedName: "[local]"`), so both libraries
 * render from one source (same look, same `--<component>-*` variables).
 */
const libCoreStyles = here("../lib-core/src/");

/** Publishes the design tokens of @minerva/core as `tokens.css`. */
const designTokens = (): Plugin => ({
  name: "minerva-wc-design-tokens",
  apply: "build",
  closeBundle() {
    mkdirSync(here("./dist"), { recursive: true });
    copyFileSync(here("../core/dist/tokens.css"), here("./dist/tokens.css"));
  },
});

export default defineConfig({
  plugins: [
    designTokens(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      exclude: ["src/**/*.test.ts"],
      // explicit `.js` specifiers so `moduleResolution: node16` resolves them
      afterBuild: writeEsmDeclarations,
    }),
  ],
  resolve: {
    alias: [{ find: /^@lib-core-styles\//, replacement: libCoreStyles }],
  },
  css: {
    modules: { generateScopedName: "[local]" },
  },
  build: {
    emptyOutDir: true,
    outDir: "dist",
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
        // lib-core stylesheets become `styles/<Component>/<file>.css.js`
        // (no `?inline` query in published file names)
        entryFileNames: (chunk) =>
          `${chunk.name
            .replace(/^lib-core\/src\/components\//, "styles/")
            .replace(/^lib-core\/src\//, "styles/")
            .replace(/(\.module)?\.scss\?inline$/, ".css")}.js`,
      },
    },
  },
  test: {
    name: "lib-web-components",
    environment: "happy-dom",
    include: [
      "src/**/*.test.ts",
      "tests/ssr/**/*.test.ts",
      "tests/meta/**/*.test.ts",
      "tests/e2e/**/*.test.ts",
    ],
    alias: [
      {
        find: /^@minerva\/core$/,
        replacement: here("../core/src/index.ts"),
      },
    ],
    setupFiles: ["./tests/setup/setup.ts"],
    css: {
      include: [/\.scss/],
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
