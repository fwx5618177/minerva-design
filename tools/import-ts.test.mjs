import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { test } from "node:test";
import { importTs } from "./import-ts.mjs";

const fixture = (source) => {
  const dir = mkdtempSync(join(tmpdir(), "minerva-import-ts-"));
  const file = join(dir, "module.ts");
  writeFileSync(file, source);
  return file;
};

test("imports a standalone TypeScript module on any supported Node", async () => {
  const file = fixture(
    [
      "type Status = 'ready' | 'n/a';",
      "export interface Item { name: string; status: Status }",
      "export const items: readonly Item[] = [{ name: 'Button', status: 'ready' }];",
      "export enum Kind { A = 'a' }",
    ].join("\n"),
  );
  const mod = await importTs(file);
  assert.deepEqual(mod.items, [{ name: "Button", status: "ready" }]);
  assert.equal(mod.Kind.A, "a");
  // a file: URL works like a path
  assert.deepEqual((await importTs(pathToFileURL(file))).items, mod.items);
});

test("type-only imports are erased and accepted", async () => {
  const file = fixture(
    "import type { Foo } from './foo';\nexport const value: Foo | 1 = 1;\n",
  );
  assert.equal((await importTs(file)).value, 1);
});

test("rejects modules with runtime imports or re-exports", async () => {
  await assert.rejects(
    importTs(fixture("import { x } from './x';\nexport const y = x;\n")),
    /has runtime imports/,
  );
  await assert.rejects(
    importTs(fixture("export { x } from './x';\n")),
    /has runtime imports/,
  );
});

test("imports the real manifests and docs registry", async () => {
  const root = new URL("../", import.meta.url);
  for (const [path, name] of [
    ["apps/docs/src/docs/registry.ts", "docPages"],
    ["packages/native/src/manifest.ts", "NATIVE_COMPONENTS"],
    ["packages/taro/src/manifest.ts", "taroComponentManifest"],
  ]) {
    const mod = await importTs(new URL(path, root));
    assert.ok(mod[name], `${path} exports ${name}`);
  }
});
