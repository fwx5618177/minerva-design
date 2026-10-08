import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import { runnerImport, type Plugin } from "vite";
import pkg from "./package.json" with { type: "json" };
import { writeDualDeclarations } from "../../tools/dual-declarations.mjs";
import { CSS_LAYER } from "../../tools/css-layer.mjs";
import { CORE_DIST } from "../../tools/paths.mjs";

// Platform-neutral: no runtime dependency (the DOM primitives and
// @floating-ui/dom live in @minerva/dom).
const externalDeps = Object.keys(
  (pkg as { dependencies?: Record<string, string> }).dependencies ?? {},
);
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

/**
 * Design tokens, generated from the token data in src/tokens (the single
 * source of truth) and emitted next to the JS bundle:
 *
 * - `tokens.css` (`minerva-design/tokens.css`): inside the `minerva` cascade
 *   layer (unlayered app CSS wins without `!important`). The unlayered copy
 *   bundled by @minerva/react is src/theme/tokens.css (`@minerva/core/tokens.css`,
 *   kept equal to the generator by src/tokens/generated.test.ts).
 * - `tokens.mini*.css`: class-scoped, pre-resolved tokens for mini-programs
 *   (internal: consumed by the planned Taro / WeChat / uni-app renderers).
 *
 * Kept out of the JS graph so `minerva-design/core` stays side-effect free and
 * importable in Node. The generators are loaded with Vite's module runner
 * (TypeScript on any supported Node version), afresh on every build (the
 * token modules are part of the bundle graph, so `watch` rebuilds on change).
 */
const designTokens = (): Plugin => ({
  name: "minerva-design-tokens",
  async generateBundle(options) {
    // Both lib formats (es, cjs) write to dist/: emit the files once.
    if (options.format !== "es") return;
    const { module } = await runnerImport<typeof import("./src/tokens")>(
      fileURLToPath(new URL("./src/tokens/index.ts", import.meta.url)),
      { configFile: false, logLevel: "error" },
    );
    const { generateTokensCss, generateMiniTokensFiles } = module;
    this.emitFile({
      type: "asset",
      fileName: "tokens.css",
      source: generateTokensCss({ layer: CSS_LAYER }),
    });
    for (const [fileName, source] of Object.entries(
      generateMiniTokensFiles(),
    )) {
      this.emitFile({ type: "asset", fileName, source });
    }
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
      // Same for the contracts data (typed by contracts/index.ts).
      beforeWriteFile: (filePath) =>
        /[\\/]i18n[\\/]locales[\\/]|[\\/]contracts[\\/][^\\/]+\.json\.d\.ts$/.test(
          filePath,
        )
          ? false
          : undefined,
      afterBuild: writeDualDeclarations,
    }),
  ],
  build: {
    // `minerva-design/core`: the one copy of core shared by the React and
    // web component builds (see tools/core-imports.mjs)
    emptyOutDir: true,
    outDir: CORE_DIST,
    sourcemap: true,
    target: "es2020",
    lib: {
      entry: {
        index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        // `minerva-design/styling-hooks`: the styling hooks manifest (data)
        "styling-hooks": fileURLToPath(
          new URL("./src/styling-hooks/index.ts", import.meta.url),
        ),
        // `@minerva/core/contracts` (internal): component contracts (data)
        contracts: fileURLToPath(
          new URL("./src/contracts/index.ts", import.meta.url),
        ),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
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
    // Platform-neutral: tests run without a DOM (like React Native / Hermes
    // or a mini-program engine). DOM primitives are tested in @minerva/dom.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
