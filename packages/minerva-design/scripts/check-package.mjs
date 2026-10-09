// Lints the published package (`pnpm check:package`, after `pnpm build`):
// - publint: package.json fields, exports targets, file formats
// - Are the Types Wrong? on the packed tarball, per entry family:
//   the React / core entries are dual (ESM + CJS, a declaration file per
//   condition, node10 typesVersions); the web components and the Vue
//   renderer are ESM only.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DUAL_SUBPATHS,
  VUE_SUBPATHS,
  expectedExports,
} from "./sync-package.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const run = (cmd, args) =>
  execFileSync(cmd, args, { cwd: root, stdio: "inherit" });

run("pnpm", ["exec", "publint", "--strict"]);

const dir = mkdtempSync(join(tmpdir(), "minerva-design-pack-"));
try {
  execFileSync("pnpm", ["pack", "--pack-destination", dir], {
    cwd: root,
    stdio: "ignore",
  });
  const tarball = join(
    dir,
    readdirSync(dir).find((f) => f.endsWith(".tgz")),
  );
  const dual = [".", "./native", ...Object.keys(DUAL_SUBPATHS).map((name) => `./${name}`)];
  const esmOnly = [
    ...Object.keys(expectedExports()).filter(
      (key) =>
        key.startsWith("./web-components") && key !== "./web-components/cdn",
    ),
    ...VUE_SUBPATHS,
    "./vue/global",
  ];
  run("pnpm", ["exec", "attw", tarball, "--entrypoints", ...dual]);
  run("pnpm", [
    "exec",
    "attw",
    tarball,
    "--profile",
    "esm-only",
    "--entrypoints",
    ...esmOnly,
  ]);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
