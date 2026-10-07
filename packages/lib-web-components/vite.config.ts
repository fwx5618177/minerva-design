import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import pkg from "./package.json" with { type: "json" };
import { writeDualDeclarations } from "../../scripts/dual-declarations.mjs";

// lit (and its subpaths such as lit/decorators.js) is resolved by the consumer.
const externalDeps = Object.keys(pkg.dependencies ?? {});
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      // ships src/react.d.ts (optional React JSX typings) as dist/react.d.ts
      copyDtsFiles: true,
      // .d.ts for ESM, .d.cts for CJS (see scripts/dual-declarations.mjs)
      afterBuild: writeDualDeclarations,
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: true,
    target: "es2021",
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        exports: "named",
      },
    },
  },
  test: {
    name: "lib-web-components",
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
