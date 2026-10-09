import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  coreImportsPlugin,
  rewriteCoreDeclarations,
} from "../../tools/core-imports.mjs";
import { writeEsmDeclarations } from "../../tools/dual-declarations.mjs";
const outDir = fileURLToPath(
  new URL("../minerva-design/dist/taro", import.meta.url),
);
export default defineConfig({
  plugins: [
    react(),
    coreImportsPlugin({ outDir }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      afterBuild(files) {
        writeEsmDeclarations(files);
        rewriteCoreDeclarations(outDir);
      },
    }),
    {
      name: "mini-styles",
      closeBundle() {
        cpSync(
          new URL("../../tools/styles/mini-controls.css", import.meta.url),
          `${outDir}/style.css`,
        );
      },
    },
  ],
  build: {
    outDir,
    emptyOutDir: true,
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "index" },
    rolldownOptions: {
      external: (id) => /^(react(?:\/|$)|@tarojs\/|@minerva\/)/.test(id),
    },
  },
});
