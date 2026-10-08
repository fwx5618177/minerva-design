import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json" with { type: "json" };
import { writeDualDeclarations } from "../../tools/dual-declarations.mjs";
import {
  coreImportsPlugin,
  rewriteCoreDeclarations,
  rewriteCoreImports,
} from "../../tools/core-imports.mjs";
import { NATIVE_DIST } from "../../tools/paths.mjs";

// `minerva-design/native`: built into `dist/native/` of the published
// package, one module per source module (Metro / bundlers tree-shake per
// component), ESM (`.js`) and CJS (`.cjs`, Jest) with declarations.
// react / react-native stay external (peer dependencies) and the
// `@minerva/core` imports are rewritten to the shared `dist/core/` copy
// (tools/core-imports.mjs): the native entry never inlines the core.
const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const SRC = fileURLToPath(new URL("./src", import.meta.url).href);
const isSource = (file: string) =>
  /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file);

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

/**
 * The TypeScript sources, for the `source` export condition (Metro /
 * bundlers configured with `unstable_conditionNames: ["source", ...]`
 * compile them directly): `dist/native/source/`, with the `@minerva/core`
 * imports pointing at the shared `dist/core/` build.
 */
const typescriptSources = (): Plugin => ({
  name: "minerva-native-sources",
  generateBundle(options) {
    if (options.format !== "es") return;
    for (const file of walk(SRC).filter(isSource)) {
      const fileName = `source/${relative(SRC, file).split("\\").join("/")}`;
      this.emitFile({
        type: "asset",
        fileName,
        source: rewriteCoreImports(
          readFileSync(file, "utf8"),
          join(NATIVE_DIST, fileName),
          "js",
        ),
      });
    }
  },
});

export default defineConfig({
  plugins: [
    react(),
    coreImportsPlugin({ outDir: NATIVE_DIST }),
    typescriptSources(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      afterBuild: (emittedFiles) => {
        writeDualDeclarations(emittedFiles);
        rewriteCoreDeclarations(NATIVE_DIST);
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: NATIVE_DIST,
    sourcemap: true,
    // Hermes (RN 0.79+) and Metro's Babel pass handle ES2020 output
    target: "es2020",
    lib: {
      entry: { index: join(SRC, "index.ts") },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        exports: "named",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
