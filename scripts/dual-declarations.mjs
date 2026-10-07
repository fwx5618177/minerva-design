// Type declarations for dual ESM / CJS packages ("type": "module").
//
// vite-plugin-dts writes `.d.ts` files with extensionless relative imports
// (`export * from './components'`). Under `moduleResolution: node16 / nodenext`
// those only resolve from CommonJS, and a `.d.ts` in a "type": "module"
// package always describes ESM, so `require` consumers would get ESM types
// ("masquerading as ESM"). This helper, used from the `afterBuild` hook of
// vite-plugin-dts:
// - rewrites relative specifiers of every `.d.ts` to explicit `.js` paths
//   (`./components` -> `./components/index.js`)
// - writes a `.d.cts` twin of every `.d.ts` whose relative specifiers point
//   to `.cjs` files, for the `require` condition of the exports map.
import { writeFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

const SPECIFIER =
  /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.{1,2}(?:\/[^"']*)?)\2/g;

/** Rewrites the relative specifiers of a declaration file. */
/**
 * @param {string} content
 * @param {string} file
 * @param {Set<string>} declarations
 * @param {".js" | ".cjs"} extension
 * @returns {string}
 */
export function rewriteSpecifiers(content, file, declarations, extension) {
  return content.replace(SPECIFIER, (_match, prefix, quote, specifier) => {
    const base = normalize(join(dirname(file), specifier));
    const stripped = base.replace(/\.(c|m)?js$/, "");
    let target;
    if (declarations.has(`${stripped}.d.ts`)) {
      target = specifier.replace(/\.(c|m)?js$/, "") + extension;
    } else if (declarations.has(join(base, "index.d.ts"))) {
      target = `${specifier.replace(/\/$/, "")}/index${extension}`;
    }
    if (!target) {
      throw new Error(`Cannot resolve ${specifier} from ${file}`);
    }
    return `${prefix}${quote}${target}${quote}`;
  });
}

/** `afterBuild` hook of vite-plugin-dts: fix `.d.ts`, write `.d.cts` twins. */
/** @param {Map<string, string>} emittedFiles */
export function writeDualDeclarations(emittedFiles) {
  const declarations = new Set(
    [...emittedFiles.keys()]
      .filter((file) => file.endsWith(".d.ts"))
      .map((file) => normalize(file)),
  );
  for (const [file, content] of emittedFiles) {
    if (!file.endsWith(".d.ts")) continue;
    const path = normalize(file);
    writeFileSync(path, rewriteSpecifiers(content, path, declarations, ".js"));
    writeFileSync(
      path.replace(/\.d\.ts$/, ".d.cts"),
      rewriteSpecifiers(content, path, declarations, ".cjs"),
    );
  }
}
