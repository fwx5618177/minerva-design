// Makes type text printed by the TypeScript checker independent of the
// checkout location. `checker.typeToString` (and vue-component-meta) print
// types from modules that are not imported by name as
// `import("/abs/path/node_modules/.pnpm/pkg@1/node_modules/pkg/sub")`, which
// would leak the local path into the committed API JSON and make the
// `--check` steps fail on any other machine.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Public module name of an absolute module path:
 * `<root>/node_modules/.pnpm/x@1/node_modules/pkg/sub` -> `pkg/sub` (just
 * `pkg` when `sub` is the package's types entry), a repository file -> its
 * repository-relative path.
 */
export function publicModulePath(path, root = ROOT) {
  const normalized = path.replace(/\\/g, "/");
  const marker = "/node_modules/";
  const at = normalized.lastIndexOf(marker);
  if (at === -1) {
    const base = root.replace(/\\/g, "/").replace(/\/$/, "");
    return normalized.startsWith(`${base}/`)
      ? normalized.slice(base.length + 1)
      : normalized;
  }
  const rest = normalized.slice(at + marker.length).split("/");
  const name = rest[0].startsWith("@") ? rest.slice(0, 2).join("/") : rest[0];
  const sub = rest.slice(name.split("/").length).join("/");
  if (!sub) return name;
  try {
    const pkg = JSON.parse(
      readFileSync(
        join(normalized.slice(0, at + marker.length), name, "package.json"),
        "utf8",
      ),
    );
    const types = (pkg.types ?? pkg.typings ?? "")
      .replace(/^\.\//, "")
      .replace(/\.d\.[cm]?ts$/, "");
    if (types && types === sub.replace(/\.d\.[cm]?ts$/, "")) return name;
  } catch {
    // no package.json: keep the subpath
  }
  return `${name}/${sub}`;
}

/** Rewrites the absolute paths of `import("...")` types in `text` */
export const portableTypes = (text, root = ROOT) =>
  text?.replace(
    /import\("((?:[A-Za-z]:)?[\\/][^"]+)"\)/g,
    (_, path) => `import("${publicModulePath(path, root)}")`,
  );
