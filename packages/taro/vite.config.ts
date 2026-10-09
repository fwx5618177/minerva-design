import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { readFileSync, writeFileSync } from "node:fs";
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
        writeFileSync(
          `${outDir}/style.css`,
          ["mini-controls.css", "taro-components.css"]
            .map((name) =>
              readFileSync(
                new URL(`../../tools/styles/${name}`, import.meta.url),
                "utf8",
              ),
            )
            .join("\n"),
        );
      },
    },
  ],
  build: {
    outDir,
    emptyOutDir: true,
    lib: {
      entry: { index: "src/index.ts", monaco: "src/monaco.tsx" },
      formats: ["es"],
      fileName: (_format, name) => `${name}.js`,
    },
    rolldownOptions: {
      external: (id) => /^(react(?:\/|$)|@tarojs\/|@minerva\/)/.test(id),
    },
  },
});
