import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import pkg from "./package.json" with { type: "json" };
import { writeDualDeclarations } from "../../tools/dual-declarations.mjs";
import {
  coreImportsPlugin,
  rewriteCoreDeclarations,
} from "../../tools/core-imports.mjs";
import { DOM_DIST } from "../../tools/paths.mjs";

// Built into `dist/dom/` of the published `minerva-design` package (internal,
// except `core-web`, published as `minerva-design/core`). Dependencies
// (@floating-ui/dom) are resolved by the consumer; @minerva/core stays
// external and its imports are rewritten to the shared `dist/core/`
// (tools/core-imports.mjs).
const externalDeps = Object.keys(pkg.dependencies ?? {});
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

export default defineConfig({
  plugins: [
    coreImportsPlugin({ outDir: DOM_DIST }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      afterBuild: (emittedFiles) => {
        writeDualDeclarations(emittedFiles);
        rewriteCoreDeclarations(DOM_DIST);
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: DOM_DIST,
    sourcemap: true,
    target: "es2020",
    lib: {
      entry: {
        index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        // `minerva-design/core`: @minerva/core + @minerva/dom (see the file)
        "core-web": fileURLToPath(
          new URL("./src/core-web.ts", import.meta.url),
        ),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rolldownOptions: {
      external: isExternal,
      output: { exports: "named" },
    },
  },
  test: {
    name: "dom",
    environment: "happy-dom",
    include: ["src/**/*.test.ts"],
    alias: [
      {
        find: /^@minerva\/core$/,
        replacement: fileURLToPath(
          new URL("../core/src/index.ts", import.meta.url),
        ),
      },
    ],
  },
});
