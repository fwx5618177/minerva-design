import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import { compile } from "sass";
import type { Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };

// Dependencies (@floating-ui/dom) are resolved by the consumer, never bundled.
const externalDeps = Object.keys(pkg.dependencies ?? {});
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const TOKENS_ENTRY = fileURLToPath(
  new URL("./src/theme/tokens.scss", import.meta.url),
);

/**
 * Design tokens (`@minerva/core/tokens.css`): compiled from the Sass sources
 * in src/theme/tokens and emitted next to the JS bundle. Kept out of the JS
 * graph so `@minerva/core` stays side-effect free and importable in Node.
 */
const designTokens = (): Plugin => ({
  name: "minerva-design-tokens",
  buildStart() {
    this.addWatchFile(TOKENS_ENTRY);
  },
  generateBundle(options) {
    // Both lib formats (es, cjs) write to dist/: emit the file once.
    if (options.format !== "es") return;
    const { css, loadedUrls } = compile(TOKENS_ENTRY, { style: "expanded" });
    for (const url of loadedUrls) this.addWatchFile(fileURLToPath(url));
    this.emitFile({
      type: "asset",
      fileName: "tokens.css",
      source: `${css}\n`,
    });
  },
});

export default defineConfig({
  plugins: [
    designTokens(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      // The message bundles are typed as `Messages` by i18n/index.ts; their
      // per-locale declarations (incl. `*.json.d.ts`) are never referenced.
      beforeWriteFile: (filePath) =>
        /[\\/]i18n[\\/]locales[\\/]/.test(filePath) ? false : undefined,
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: true,
    target: "es2020",
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
    name: "core",
    environment: "happy-dom",
    include: ["src/**/*.test.ts"],
  },
});
