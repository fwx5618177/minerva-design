import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { portableTypes, publicModulePath } from "./portable-types.mjs";

/** A fake checkout with a pnpm-style node_modules layout */
const checkout = () => {
  const root = mkdtempSync(join(tmpdir(), "minerva-checkout-"));
  const store = join(
    root,
    "node_modules/.pnpm/monaco-editor@0.52.2/node_modules",
  );
  mkdirSync(join(store, "monaco-editor"), { recursive: true });
  writeFileSync(
    join(store, "monaco-editor/package.json"),
    JSON.stringify({ types: "./esm/vs/editor/editor.api.d.ts" }),
  );
  mkdirSync(join(store, "@scope/pkg"), { recursive: true });
  writeFileSync(join(store, "@scope/pkg/package.json"), "{}");
  return { root, store };
};

test("maps the types entry of a package to its public name", () => {
  const { root, store } = checkout();
  assert.equal(
    publicModulePath(
      join(store, "monaco-editor/esm/vs/editor/editor.api"),
      root,
    ),
    "monaco-editor",
  );
  assert.equal(
    publicModulePath(
      join(store, "monaco-editor/esm/vs/editor/editor.api.d.ts"),
      root,
    ),
    "monaco-editor",
  );
});

test("keeps other subpaths and scoped package names", () => {
  const { root, store } = checkout();
  assert.equal(
    publicModulePath(join(store, "monaco-editor/esm/vs/other"), root),
    "monaco-editor/esm/vs/other",
  );
  assert.equal(
    publicModulePath(join(store, "@scope/pkg/dist/types"), root),
    "@scope/pkg/dist/types",
  );
  assert.equal(publicModulePath(join(store, "@scope/pkg"), root), "@scope/pkg");
});

test("makes repository files repository-relative", () => {
  const { root } = checkout();
  assert.equal(
    publicModulePath(join(root, "packages/vue/src/types"), root),
    "packages/vue/src/types",
  );
  assert.equal(
    publicModulePath("C:\\work\\repo\\packages\\x", "C:\\work\\repo"),
    "packages/x",
  );
});

test("type text is identical in two checkouts", () => {
  const a = checkout();
  const b = checkout();
  const text = (store) =>
    `typeof import("${join(store, "monaco-editor/esm/vs/editor/editor.api")}") | undefined`;
  const out = portableTypes(text(a.store), a.root);
  assert.equal(out, 'typeof import("monaco-editor") | undefined');
  assert.equal(portableTypes(text(b.store), b.root), out);
  // relative / bare specifiers and missing text are left alone
  assert.equal(portableTypes('import("vue").Ref'), 'import("vue").Ref');
  assert.equal(portableTypes(undefined), undefined);
});
