import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
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
import { CHARTS_DIST, NATIVE_DIST } from "../../tools/paths.mjs";

// `minerva-design/native`: built into `dist/native/` of the published
// package, one module per source module (Metro / bundlers tree-shake per
// component), ESM (`.js`) and CJS (`.cjs`, Jest) with declarations.
// react / react-native stay external (peer dependencies) and the
// `@minerva/core` imports are rewritten to the shared `dist/core/` copy
// (tools/core-imports.mjs): the native entry never inlines the core.
// The chart engine is bundled: `@minerva/charts/canvas` is its DOM-free
// entry (no WebGPU / WebGL / DOM chart), which `dist/charts/` does not
// build as a module; its declarations point to `dist/charts/canvas.d.ts`.
const BUNDLED = ["@minerva/charts"];
const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].filter((dep) => !BUNDLED.includes(dep));
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const CHARTS_CANVAS = /(["'])@minerva\/charts\/canvas\1/g;

/** Points the `@minerva/charts/canvas` imports of the declarations to `dist/charts/` */
const rewriteChartsDeclarations = (dir: string) => {
  for (const file of walk(dir)) {
    const cts = file.endsWith(".d.cts");
    if (!cts && !file.endsWith(".d.ts")) continue;
    const code = readFileSync(file, "utf8");
    if (!code.includes("@minerva/charts/canvas")) continue;
    const target = relative(
      dirname(file),
      join(CHARTS_DIST, cts ? "canvas.cjs" : "canvas.js"),
    )
      .split("\\")
      .join("/");
    writeFileSync(
      file,
      code.replace(
        CHARTS_CANVAS,
        (_match, quote) => `${quote}${target}${quote}`,
      ),
    );
  }
};

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
 * imports pointing at the shared `dist/core/` build and the
 * `@minerva/charts/canvas` imports at the engine bundled in `dist/native/`.
 */
const typescriptSources = (): Plugin => ({
  name: "minerva-native-sources",
  generateBundle(options, bundle) {
    if (options.format !== "es") return;
    const canvas = Object.values(bundle).find(
      (output) =>
        output.type === "chunk" &&
        /[\\/]charts[\\/]src[\\/]canvas\.ts$/.test(output.facadeModuleId ?? ""),
    );
    if (!canvas)
      throw new Error("The chart engine (canvas entry) was not bundled");
    for (const file of walk(SRC).filter(isSource)) {
      const fileName = `source/${relative(SRC, file).split("\\").join("/")}`;
      const charts = relative(dirname(fileName), canvas.fileName)
        .split("\\")
        .join("/");
      this.emitFile({
        type: "asset",
        fileName,
        source: rewriteCoreImports(
          readFileSync(file, "utf8"),
          join(NATIVE_DIST, fileName),
          "js",
        ).replace(
          CHARTS_CANVAS,
          (_match, quote) => `${quote}${charts}${quote}`,
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
        rewriteChartsDeclarations(NATIVE_DIST);
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
