// Codemod of the core / dom split: rewrites `@minerva/core` import / export
// declarations whose names now live in `@minerva/dom` (focus scope, layers,
// scroll lock, positioning, presence, theme DOM / cookie helpers...).
//
//   node tools/codemods/core-dom-imports.mjs <file-or-dir>...   (write)
//   node tools/codemods/core-dom-imports.mjs --check <...>      (exit 1 if a file would change)
//
// The names exported by @minerva/dom are read from its entry with the
// TypeScript compiler, so the codemod stays correct when modules move again.
// Handles named imports / exports (`import { a, type B } from`,
// `import type { ... } from`, `export { ... } from`); namespace imports are
// reported for a manual fix.
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));

/** Names exported by packages/dom/src/index.ts */
export function domExportNames() {
  const entry = join(root, "packages/dom/src/index.ts");
  const program = ts.createProgram([entry], {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2022,
    baseUrl: root,
    paths: { "@minerva/core": ["packages/core/src/index.ts"] },
    resolveJsonModule: true,
    skipLibCheck: true,
  });
  const checker = program.getTypeChecker();
  const symbol = checker.getSymbolAtLocation(program.getSourceFile(entry));
  return new Set(checker.getExportsOfModule(symbol).map((s) => s.name));
}

const DECLARATION =
  /(import|export)(\s+type)?\s*\{([^}]*)\}\s*from\s*(["'])@minerva\/core\4;?/g;

/**
 * @param {string} code
 * @param {Set<string>} domNames
 * @returns {string}
 */
export function splitCoreImports(code, domNames) {
  return code.replace(
    DECLARATION,
    (match, keyword, typeOnly = "", body, quote) => {
      const specifiers = body
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const imported = (spec) =>
        spec
          .replace(/^type\s+/, "")
          .split(/\s+as\s+/)[0]
          .trim();
      const dom = specifiers.filter((s) => domNames.has(imported(s)));
      if (dom.length === 0) return match;
      const core = specifiers.filter((s) => !domNames.has(imported(s)));
      const declaration = (names, from) =>
        `${keyword}${typeOnly} {\n${names.map((n) => `  ${n},`).join("\n")}\n} from ${quote}${from}${quote};`;
      return [
        core.length ? declaration(core, "@minerva/core") : null,
        declaration(dom, "@minerva/dom"),
      ]
        .filter(Boolean)
        .join("\n");
    },
  );
}

const SOURCE = /\.(m?[jt]sx?)$/;
const walk = (path) =>
  statSync(path).isDirectory()
    ? readdirSync(path)
        .filter((name) => name !== "node_modules" && name !== "dist")
        .flatMap((name) => walk(join(path, name)))
    : SOURCE.test(path)
      ? [path]
      : [];

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const files = args.filter((a) => a !== "--check").flatMap(walk);
  const domNames = domExportNames();
  let changed = 0;
  for (const file of files) {
    const code = readFileSync(file, "utf8");
    if (/\*\s+as\s+\w+\s+from\s+["']@minerva\/core["']/.test(code)) {
      console.warn(`${file}: namespace import of @minerva/core (fix by hand)`);
    }
    const next = splitCoreImports(code, domNames);
    if (next === code) continue;
    changed++;
    if (check)
      console.error(`${file}: imports @minerva/dom names from @minerva/core`);
    else writeFileSync(file, next);
  }
  console.log(`${changed} file(s) ${check ? "to update" : "updated"}`);
  if (check && changed) process.exit(1);
}
