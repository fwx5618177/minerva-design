// One copy of @minerva/core in the published `minerva-design` package.
//
// @minerva/core is a private workspace package: it is never published on its
// own. Its build writes `dist/core/` of minerva-design (published as
// `minerva-design/core`), and the React (`dist/react/`) and web component
// (`dist/web-components/`) builds keep it external, then rewrite every
// `@minerva/core` import to a relative path into `dist/core/`. Both entry
// graphs therefore share the same core modules (same layer stack, scroll lock
// counter, theme state...) and no core code is inlined twice.
//
// - `coreImportsPlugin()`: Vite / Rolldown plugin for the JS output
//   (`.js` -> `dist/core/index.js`, `.cjs` -> `dist/core/index.cjs`)
// - `rewriteCoreDeclarations()`: the same for the emitted `.d.ts` / `.d.cts`
//   (run after vite-plugin-dts, which keeps `@minerva/core` as written).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

/** `"@minerva/core"` / `"@minerva/core/styling-hooks"` string literals */
const SPECIFIER = /(["'])@minerva\/core(\/styling-hooks)?\1/g;

/**
 * Relative specifier from `fromFile` to the core module (`index` or the
 * `styling-hooks` entry).
 *
 * @param {string} fromFile absolute path of the importing file
 * @param {string} coreDir absolute path of minerva-design/dist/core
 * @param {boolean} stylingHooks
 * @param {"js" | "cjs" | "d.ts" | "d.cts"} kind
 * @returns {string}
 */
export function coreSpecifier(fromFile, coreDir, stylingHooks, kind) {
  const ext = kind === "cjs" || kind === "d.cts" ? ".cjs" : ".js";
  // JS: dist/core/styling-hooks.js; declarations: dist/core/styling-hooks/index.d.ts
  const name = stylingHooks
    ? kind.startsWith("d.")
      ? `styling-hooks/index${ext}`
      : `styling-hooks${ext}`
    : `index${ext}`;
  const path = relative(dirname(fromFile), join(coreDir, name))
    .split(sep)
    .join("/");
  return path.startsWith(".") ? path : `./${path}`;
}

/**
 * @param {string} code
 * @param {string} fromFile
 * @param {string} coreDir
 * @param {"js" | "cjs" | "d.ts" | "d.cts"} kind
 * @returns {string}
 */
export function rewriteCoreImports(code, fromFile, coreDir, kind) {
  return code.replace(
    SPECIFIER,
    (_match, quote, stylingHooks) =>
      `${quote}${coreSpecifier(fromFile, coreDir, Boolean(stylingHooks), kind)}${quote}`,
  );
}

/**
 * Rewrites `@minerva/core` imports of the output chunks (external in the
 * build) to relative paths into `coreDir`.
 *
 * @param {{ outDir: string; coreDir: string }} options absolute paths
 * @returns {import("vite").Plugin}
 */
export function coreImportsPlugin({ outDir, coreDir }) {
  return {
    name: "minerva-core-imports",
    renderChunk(code, chunk, options) {
      if (!code.includes("@minerva/core")) return null;
      const kind = options.format === "cjs" ? "cjs" : "js";
      return {
        code: rewriteCoreImports(
          code,
          join(outDir, chunk.fileName),
          coreDir,
          kind,
        ),
        // only import specifiers change (same lines)
        map: null,
      };
    },
  };
}

/** @param {string} dir */
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

/**
 * Rewrites `@minerva/core` imports of every declaration file under `dir`.
 *
 * @param {string} dir absolute path (e.g. minerva-design/dist/react)
 * @param {string} coreDir absolute path of minerva-design/dist/core
 */
export function rewriteCoreDeclarations(dir, coreDir) {
  for (const file of walk(dir)) {
    const kind = file.endsWith(".d.cts")
      ? "d.cts"
      : file.endsWith(".d.ts")
        ? "d.ts"
        : undefined;
    if (!kind) continue;
    const code = readFileSync(file, "utf8");
    if (!code.includes("@minerva/core")) continue;
    writeFileSync(file, rewriteCoreImports(code, file, coreDir, kind));
  }
}
