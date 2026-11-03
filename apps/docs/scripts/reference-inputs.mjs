import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

/** Identity belongs to the text/examples being exported, in addition to the
 * library contract snapshot: a translation edit must change it too. */
export function referenceDigest(inputs) {
  const hash = createHash("sha256");
  for (const [path, content] of Object.entries(inputs).sort(([a], [b]) =>
    a.localeCompare(b),
  ))
    hash.update(path).update("\0").update(content).update("\0");
  return `sha256:${hash.digest("hex")}`;
}
export function referenceInputs(root) {
  const files = {};
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && !/\.test\./.test(path))
        files[relative(root, path)] = readFileSync(path);
    }
  }
  for (const directory of [
    "apps/docs/src/docs",
    "apps/docs/src/i18n/locales",
    "apps/docs/recipes",
    "apps/docs/scripts",
  ])
    visit(join(root, directory));
  for (const path of [
    "tools/import-ts.mjs",
    "packages/minerva-design/package.json",
    "packages/core/src/contracts/components.generated.json",
    "packages/core/src/contracts/types.generated.json",
    "packages/core/src/contracts/metadata.generated.json",
  ])
    files[path] = readFileSync(join(root, path));
  return files;
}
