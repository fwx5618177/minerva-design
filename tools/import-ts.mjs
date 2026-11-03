// Imports a standalone TypeScript module (no runtime imports, e.g. the
// component manifests and the docs registry) from the Node build tools.
//
// Node only strips types by default from 22.18, but the development
// toolchain supports Node >=22.13.0 (the floor of pnpm 11, root `engines`),
// so the tools transpile explicitly with the repository's TypeScript instead
// of relying on the Node version. The output is cached under node_modules/.cache by
// content hash and imported from there (works under Node and Vitest).
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, "node_modules/.cache/minerva-import-ts");

/** Whether the transpiled module still imports or re-exports at runtime. */
const hasRuntimeImports = (code) =>
  ts
    .createSourceFile("out.mjs", code, ts.ScriptTarget.ES2022)
    .statements.some(
      (node) =>
        ts.isImportDeclaration(node) ||
        (ts.isExportDeclaration(node) && !!node.moduleSpecifier),
    );

/**
 * Transpiles `file` (a path or a `file:` URL) and returns its module.
 * Throws when the module has runtime imports: they would not resolve from the
 * cache directory.
 */
export async function importTs(file) {
  const path = file instanceof URL ? fileURLToPath(file) : file;
  const source = readFileSync(path, "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  if (hasRuntimeImports(outputText)) {
    throw new Error(
      `importTs: ${path} has runtime imports; only standalone modules are supported`,
    );
  }
  const hash = createHash("sha256").update(outputText).digest("hex");
  const out = join(CACHE, `${basename(path, ".ts")}.${hash.slice(0, 16)}.mjs`);
  if (!existsSync(out)) {
    mkdirSync(CACHE, { recursive: true });
    writeFileSync(out, outputText);
  }
  return import(pathToFileURL(out).href);
}
