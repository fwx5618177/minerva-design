import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  coreImportsPlugin,
  rewriteCoreDeclarations,
} from "../../tools/core-imports.mjs";
import { writeEsmDeclarations } from "../../tools/dual-declarations.mjs";
const outDir = fileURLToPath(
  new URL("../minerva-design/dist/taro", import.meta.url),
);
// The chart engine (@minerva/charts/canvas: DOM-free, no WebGPU / WebGL)
// is bundled into dist/taro: dist/charts has no such entry. Its types are
// the public ones of minerva-design/charts/core (a superset).
const chartTypes = fileURLToPath(
  new URL("../minerva-design/dist/charts/core.js", import.meta.url),
);
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );
const rewriteChartDeclarations = () => {
  for (const file of walk(outDir)) {
    if (!/\.d\.c?ts$/.test(file)) continue;
    const code = readFileSync(file, "utf8");
    if (!code.includes("@minerva/charts/canvas")) continue;
    const path = relative(dirname(file), chartTypes).split(sep).join("/");
    const target = path.startsWith(".") ? path : `./${path}`;
    writeFileSync(
      file,
      code.replace(/(["'])@minerva\/charts\/canvas\1/g, `$1${target}$1`),
    );
  }
};
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
        rewriteChartDeclarations();
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
      external: (id) =>
        /^(react(?:\/|$)|@tarojs\/|@minerva\/(?!charts(?:\/|$)))/.test(id),
    },
  },
});
