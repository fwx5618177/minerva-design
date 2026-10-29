import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import pkg from "./package.json" with { type: "json" };
import { writeDualDeclarations } from "../../tools/dual-declarations.mjs";
import { CHARTS_DIST } from "../../tools/paths.mjs";

// Built into `dist/charts/` of the published `minerva-design` package:
//   minerva-design/charts       -> dist/charts/index.(js|cjs)  React bindings
//   minerva-design/charts/core  -> dist/charts/core.(js|cjs)   framework-free engine
// The engine has no dependencies at all; React stays a peer dependency.
const externalDeps = Object.keys(pkg.peerDependencies ?? {});
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const src = (path: string) =>
  fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      afterBuild: (emittedFiles) => {
        writeDualDeclarations(emittedFiles);
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: CHARTS_DIST,
    sourcemap: true,
    target: "es2020",
    lib: {
      entry: { index: src("index.ts"), core: src("core.ts") },
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
        // Only the React bindings are client components; the engine
        // (minerva-design/charts/core) stays importable from server code.
        banner: (chunk) =>
          (chunk.isEntry && chunk.name === "index") ||
          chunk.name.startsWith("react/")
            ? '"use client";'
            : "",
      },
    },
  },
  test: {
    name: "charts",
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
