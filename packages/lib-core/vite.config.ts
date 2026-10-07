import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin, Rolldown } from "vite";

type OutputBundle = Rolldown.OutputBundle;
type OutputChunk = Rolldown.OutputChunk;
import pkg from "./package.json" with { type: "json" };
import { writeDualDeclarations } from "../../scripts/dual-declarations.mjs";

// Everything the package depends on is resolved by the consumer, never bundled.
// Matches bare ids and subpaths (e.g. react/jsx-runtime, react-icons/fa).
// Stylesheets are the exception: CSS / SCSS imported from a dependency (the
// `@minerva/core/tokens.css` design tokens) is bundled into style.css and
// styles/tokens.css, so consumers never resolve @minerva/core's CSS.
const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isStylesheet = (id: string) => /\.(css|scss|sass)$/.test(id);
const isExternal = (id: string) =>
  !isStylesheet(id) &&
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const src = (path: string) =>
  fileURLToPath(new URL(`./src/${path}`, import.meta.url));

/**
 * Package entries. The build preserves the module structure (one output file
 * per source module) so bundlers tree-shake per component. Every module but
 * the server-safe theme-utils entry (pure functions / constants used by root
 * layouts, which only imports @minerva/core) gets a `"use client"` banner, so
 * React Server Components can import the client entries, and deep imports
 * created by barrel optimisation (e.g. Next.js `optimizePackageImports`) stay
 * client modules too.
 */
const entries = {
  index: src("index.ts"),
  "theme-utils": src("theme-utils.ts"),
  monaco: src("monaco.ts"),
};
const SERVER_ENTRIES = new Set(["theme-utils"]);

const kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * Stylesheets. Vite emits one CSS file per module (cssCodeSplit + preserved
 * modules); this plugin replaces them with:
 * - `style.css`: everything (design tokens first), in module evaluation order
 * - `styles/tokens.css`: the design tokens of @minerva/core only
 * - `styles/<component>.css`: one component folder (e.g. `styles/tag-input.css`)
 *   with the CSS of every lib-core module it imports (dependencies first),
 *   without the tokens, so apps can import only what they use.
 */
const stylesheets = (): Plugin => ({
  name: "minerva-stylesheets",
  enforce: "post",
  generateBundle(options, bundle: OutputBundle) {
    const cssAssets = new Map<string, string>();
    for (const [fileName, output] of Object.entries(bundle)) {
      if (output.type === "asset" && fileName.endsWith(".css")) {
        cssAssets.set(fileName, String(output.source));
        delete bundle[fileName];
      }
    }
    // Both lib formats (es, cjs) produce the same CSS: emit it once.
    if (options.format !== "es") return;

    const chunks = new Map<string, OutputChunk>();
    for (const output of Object.values(bundle)) {
      if (output.type === "chunk") chunks.set(output.fileName, output);
    }
    const cssOf = (chunk: OutputChunk) => [
      ...((
        chunk as OutputChunk & {
          viteMetadata?: { importedCss: Set<string> };
        }
      ).viteMetadata?.importedCss ?? []),
    ];
    /** CSS files of a chunk and its static imports, dependencies first */
    const collect = (start: OutputChunk, seen = new Set<string>()) => {
      const files: string[] = [];
      const visit = (chunk: OutputChunk) => {
        if (seen.has(chunk.fileName)) return;
        seen.add(chunk.fileName);
        for (const imported of chunk.imports) {
          const dep = chunks.get(imported);
          if (dep) visit(dep);
        }
        files.push(...cssOf(chunk));
      };
      visit(start);
      return files;
    };
    const isTokens = (file: string) => /tokens(-[\w-]+)?\.css$/.test(file);
    const read = (files: string[]) =>
      [...new Set(files)]
        .map((file) => {
          const css = cssAssets.get(file);
          if (css === undefined) throw new Error(`Missing CSS asset ${file}`);
          return css.trim();
        })
        .join("\n");

    // style.css: every entry, sharing one `seen` set (no duplicates)
    const seen = new Set<string>();
    const all = [...chunks.values()]
      .filter((chunk) => chunk.isEntry)
      .sort((a, b) => (a.name === "index" ? -1 : b.name === "index" ? 1 : 0))
      .flatMap((chunk) => collect(chunk, seen));
    const tokens = all.filter(isTokens);
    if (tokens.length !== 1) {
      throw new Error(`Expected one design-token stylesheet, got ${tokens}`);
    }
    const missing = [...cssAssets.keys()].filter((f) => !all.includes(f));
    if (missing.length) throw new Error(`Unreferenced CSS: ${missing}`);
    // The tokens first: the entry imports them before any component (the
    // import position is lost in the chunk metadata)
    this.emitFile({
      type: "asset",
      fileName: "style.css",
      source: `${read([...tokens, ...all.filter((f) => !isTokens(f))])}\n`,
    });
    this.emitFile({
      type: "asset",
      fileName: "styles/tokens.css",
      source: `${read(tokens)}\n`,
    });
    // Group the modules of each component folder (barrels are flattened)
    const folders = new Map<string, OutputChunk[]>();
    for (const chunk of chunks.values()) {
      const match = /[\\/]src[\\/]components[\\/](\w+)[\\/]/.exec(
        chunk.facadeModuleId ?? "",
      );
      if (!match) continue;
      folders.set(match[1], [...(folders.get(match[1]) ?? []), chunk]);
    }
    for (const [folder, folderChunks] of folders) {
      const visited = new Set<string>();
      const files = folderChunks
        .flatMap((chunk) => collect(chunk, visited))
        .filter((file) => !isTokens(file));
      if (files.length === 0) continue;
      this.emitFile({
        type: "asset",
        fileName: `styles/${kebab(folder)}.css`,
        source: `${read(files)}\n`,
      });
    }
  },
});

/**
 * Stand-alone stylesheet published next to `style.css`:
 * `prose.scss`, the Sass adapter (mixins) for long-form typography.
 */
const extraAssets = (): Plugin => ({
  name: "minerva-extra-assets",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "prose.scss",
      source: readFileSync(src("components/Prose/prose.scss"), "utf8"),
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    extraAssets(),
    stylesheets(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      afterBuild: writeDualDeclarations,
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: entries,
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
      cssFileName: "style",
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        exports: "named",
        preserveModules: true,
        preserveModulesRoot: "src",
        // Every component is client-side (state, effects, portals)
        banner: (chunk) =>
          chunk.isEntry && SERVER_ENTRIES.has(chunk.name)
            ? ""
            : '"use client";',
      },
    },
  },
  test: {
    name: "lib-core",
    // Tests run against the @minerva/core sources (no build needed); the
    // library build keeps it external like every other dependency.
    alias: [
      {
        find: /^@minerva\/core\/tokens\.css$/,
        replacement: fileURLToPath(
          new URL("../core/src/theme/tokens.scss", import.meta.url),
        ),
      },
      {
        find: /^@minerva\/core$/,
        replacement: fileURLToPath(
          new URL("../core/src/index.ts", import.meta.url),
        ),
      },
    ],
    // happy-dom by default; only the HtmlPreview sanitizer tests opt into
    // jsdom (file docblock), because DOMPurify needs a spec-compliant DOM.
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        // A static, offline DOM: no page scripts, no network for <link>,
        // <script src> or iframes; disabled loads count as successful.
        settings: {
          enableJavaScriptEvaluation: false,
          disableJavaScriptFileLoading: true,
          disableCSSFileLoading: true,
          disableIframePageLoading: true,
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: {
      modules: { classNameStrategy: "non-scoped" },
    },
  },
});
