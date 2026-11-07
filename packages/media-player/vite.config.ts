import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import manifest from "./package.json" with { type: "json" };
import { writeDualDeclarations } from "../../tools/dual-declarations.mjs";
import { MEDIA_PLAYER_DIST } from "../../tools/paths.mjs";
const external = [
  ...Object.keys(manifest.dependencies),
  ...Object.keys(manifest.peerDependencies),
];
const source = (name: string) =>
  fileURLToPath(new URL(`./src/${name}`, import.meta.url));
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      afterBuild: writeDualDeclarations,
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: MEDIA_PLAYER_DIST,
    target: "es2022",
    sourcemap: true,
    lib: {
      entry: {
        index: source("index.ts"),
        engines: source("engines/index.ts"),
        ...Object.fromEntries(
          ["hls", "dash", "flv", "native"].map((name) => [
            `engines/${name}`,
            source(`engines/${name}.ts`),
          ]),
        ),
      },
      formats: ["es", "cjs"],
      fileName: (format, name) => `${name}.${format === "es" ? "js" : "cjs"}`,
      cssFileName: "style",
    },
    rolldownOptions: {
      external: (id) =>
        external.some((name) => id === name || id.startsWith(`${name}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
        banner: (chunk) =>
          chunk.name.startsWith("engines") ? "" : '"use client";',
      },
    },
  },
  test: {
    name: "media-player",
    environment: "happy-dom",
    globals: true,
    include: ["test/**/*.test.{ts,tsx}"],
    exclude: ["test/product/**"],
  },
});
