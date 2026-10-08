// One copy of each private workspace package in the published
// `minerva-design` package.
//
// @minerva/core (platform-neutral) and @minerva/dom (DOM primitives) are
// private workspace packages: they are never published on their own. Their
// builds write `dist/core/` and `dist/dom/` of minerva-design, and every
// renderer build (`dist/react/`, `dist/web-components/`, later the other
// renderers) keeps them external, then rewrites each `@minerva/core` /
// `@minerva/dom` import to a relative path into `dist/core/` / `dist/dom/`.
// Every entry graph therefore shares the same modules (same layer stack,
// scroll lock counter, theme state...) and no core code is inlined twice.
//
// - `coreImportsPlugin()`: Vite / Rolldown plugin for the JS output
//   (`.js` -> `dist/core/index.js`, `.cjs` -> `dist/core/index.cjs`)
// - `rewriteCoreDeclarations()`: the same for the emitted `.d.ts` / `.d.cts`
//   (run after vite-plugin-dts, which keeps the specifiers as written).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { DIST_DIR } from "./paths.mjs";

/**
 * Workspace specifiers and their built module, relative to `dist/`:
 * `js` for the JS files, `types` for the declarations.
 */
export const WORKSPACE_ENTRIES = {
  "@minerva/core": { js: "core/index", types: "core/index" },
  "@minerva/core/styling-hooks": {
    js: "core/styling-hooks",
    types: "core/styling-hooks/index",
  },
  "@minerva/core/contracts": {
    js: "core/contracts",
    types: "core/contracts/index",
  },
  "@minerva/dom": { js: "dom/index", types: "dom/index" },
};

/** Quoted workspace specifiers (longest first, exact match only) */
const SPECIFIER = new RegExp(
  `(["'])(${Object.keys(WORKSPACE_ENTRIES)
    .sort((a, b) => b.length - a.length)
    .map((s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&"))
    .join("|")})\\1`,
  "g",
);

/**
 * Relative specifier from `fromFile` to the built module of a workspace
 * specifier (`@minerva/core`, `@minerva/core/styling-hooks`, `@minerva/dom`...).
 *
 * @param {string} fromFile absolute path of the importing file
 * @param {string} specifier a key of WORKSPACE_ENTRIES
 * @param {"js" | "cjs" | "d.ts" | "d.cts"} kind
 * @param {string} [distDir] absolute path of minerva-design/dist
 * @returns {string}
 */
export function workspaceSpecifier(
  fromFile,
  specifier,
  kind,
  distDir = DIST_DIR,
) {
  const entry = WORKSPACE_ENTRIES[specifier];
  if (!entry) throw new Error(`Unknown workspace specifier ${specifier}`);
  const ext = kind === "cjs" || kind === "d.cts" ? ".cjs" : ".js";
  const name = `${kind.startsWith("d.") ? entry.types : entry.js}${ext}`;
  const path = relative(dirname(fromFile), join(distDir, name))
    .split(sep)
    .join("/");
  return path.startsWith(".") ? path : `./${path}`;
}

/**
 * @param {string} code
 * @param {string} fromFile
 * @param {"js" | "cjs" | "d.ts" | "d.cts"} kind
 * @param {string} [distDir]
 * @returns {string}
 */
export function rewriteCoreImports(code, fromFile, kind, distDir = DIST_DIR) {
  return code.replace(
    SPECIFIER,
    (_match, quote, specifier) =>
      `${quote}${workspaceSpecifier(fromFile, specifier, kind, distDir)}${quote}`,
  );
}

/**
 * Rewrites the `@minerva/core` / `@minerva/dom` imports of the output chunks
 * (external in the build) to relative paths into `dist/`.
 *
 * @param {{ outDir: string; distDir?: string }} options absolute paths
 * @returns {import("vite").Plugin}
 */
export function coreImportsPlugin({ outDir, distDir = DIST_DIR }) {
  return {
    name: "minerva-core-imports",
    renderChunk(code, chunk, options) {
      if (!code.includes("@minerva/")) return null;
      const kind = options.format === "cjs" ? "cjs" : "js";
      return {
        code: rewriteCoreImports(
          code,
          join(outDir, chunk.fileName),
          kind,
          distDir,
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
 * Rewrites the workspace imports of every declaration file under `dir`.
 *
 * @param {string} dir absolute path (e.g. minerva-design/dist/react)
 * @param {string} [distDir] absolute path of minerva-design/dist
 */
export function rewriteCoreDeclarations(dir, distDir = DIST_DIR) {
  for (const file of walk(dir)) {
    const kind = file.endsWith(".d.cts")
      ? "d.cts"
      : file.endsWith(".d.ts")
        ? "d.ts"
        : undefined;
    if (!kind) continue;
    const code = readFileSync(file, "utf8");
    if (!code.includes("@minerva/")) continue;
    writeFileSync(file, rewriteCoreImports(code, file, kind, distDir));
  }
}
