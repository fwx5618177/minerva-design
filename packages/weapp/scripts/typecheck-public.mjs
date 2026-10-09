import {
  mkdtempSync,
  mkdirSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
const require = createRequire(import.meta.url);
const temporary = mkdtempSync(join(tmpdir(), "minerva-weapp-types-"));
try {
  const fixture = fileURLToPath(new URL("../type-tests/", import.meta.url));
  const published = fileURLToPath(
    new URL("../../minerva-design/package.json", import.meta.url),
  );
  const manifest = JSON.parse(readFileSync(published, "utf8"));
  const entry = manifest.exports?.["./weapp/types"]?.types;
  if (entry !== "./dist/weapp/types.d.ts")
    throw new Error(
      "The public package must expose the native types-only entry.",
    );
  const packageDir = join(temporary, "node_modules/minerva-design");
  mkdirSync(join(packageDir, "dist/weapp"), { recursive: true });
  // Use the actual published manifest; this detects an absent/broken export.
  copyFileSync(published, join(packageDir, "package.json"));
  writeFileSync(
    join(packageDir, "dist/weapp/package.json"),
    '{"type":"commonjs"}\n',
  );
  copyFileSync(
    fileURLToPath(new URL("../src/public-types.ts", import.meta.url)),
    join(packageDir, "dist/weapp/types.d.ts"),
  );
  copyFileSync(
    join(fixture, "types.fixture.ts"),
    join(temporary, "types.fixture.ts"),
  );
  copyFileSync(
    join(fixture, "tsconfig.json"),
    join(temporary, "tsconfig.json"),
  );
  execFileSync(
    process.execPath,
    [
      require.resolve("typescript/bin/tsc"),
      "-p",
      join(temporary, "tsconfig.json"),
    ],
    { stdio: "inherit" },
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
