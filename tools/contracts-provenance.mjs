import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
const ROOT = new URL("../", import.meta.url).pathname.replace(/\/$/, "");
export const METADATA_OUTPUT = join(
  ROOT,
  "packages/core/src/contracts/metadata.generated.json",
);
/** Stable snapshot identity. A baseline commit plus content digest describes
 * local builds honestly without making every unrelated commit stale the API. */
export function generateMetadata() {
  const files = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (
        /\.(ts|tsx|vue|mjs)$/.test(file) &&
        !/\.(test|generated)\./.test(file)
      )
        files.push(file);
    }
  };
  for (const name of [
    "react",
    "core",
    "dom",
    "charts",
    "native",
    "vue",
    "angular",
    "taro",
    "uni",
    "weapp",
    "web-components",
  ])
    visit(join(ROOT, `packages/${name}/src`));
  for (const path of [
    "tools/generate-contracts.mjs",
    "tools/renderer-contracts.mjs",
    "tools/type-contracts.mjs",
    "tools/contracts-provenance.mjs",
    "apps/docs/scripts/generate-api.mjs",
    "apps/docs/scripts/generate-vue-api.mjs",
    "apps/docs/src/docs/registry.ts",
    "packages/minerva-design/custom-elements.json",
  ])
    files.push(join(ROOT, path));
  const hash = createHash("sha256");
  for (const file of [...new Set(files)].sort())
    hash
      .update(relative(ROOT, file))
      .update("\0")
      .update(readFileSync(file))
      .update("\0");
  const sourceDigest = `sha256:${hash.digest("hex")}`;
  const previous = existsSync(METADATA_OUTPUT)
    ? JSON.parse(readFileSync(METADATA_OUTPUT, "utf8"))
    : undefined;
  const packageVersion = JSON.parse(
    readFileSync(join(ROOT, "packages/minerva-design/package.json"), "utf8"),
  ).version;
  if (
    previous?.sourceDigest === sourceDigest &&
    previous.packageVersion === packageVersion
  )
    return previous;
  const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();

  return {
    schemaVersion: "2.0.0",
    packageVersion,
    sourceCommit,
    sourceDigest,
  };
}
