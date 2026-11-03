import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import ts from "typescript";
import { describeType, typeGraph } from "./type-contracts.mjs";

function moduleGraph() {
  const root = mkdtempSync(join(tmpdir(), "minerva-type-checkout-"));
  const pkg = join(root, "node_modules/monaco-editor");
  mkdirSync(join(pkg, "esm/vs/editor"), { recursive: true });
  writeFileSync(
    join(pkg, "package.json"),
    JSON.stringify({
      name: "monaco-editor",
      types: "esm/vs/editor/editor.api.d.ts",
    }),
  );
  writeFileSync(
    join(pkg, "esm/vs/editor/editor.api.d.ts"),
    "export declare const version: string;\n",
  );
  const file = join(root, "index.ts");
  writeFileSync(file, 'export type API = typeof import("monaco-editor");\n');
  const program = ts.createProgram([file], {
    strict: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(file);
  const symbol = checker.getExportsOfModule(
    checker.getSymbolAtLocation(source),
  )[0];
  const reference = describeType(
    checker,
    checker.getDeclaredTypeOfSymbol(symbol),
  );
  return { root, reference, node: typeGraph[reference.typeRef] };
}

test("module type graph names and references are identical across checkouts", () => {
  const a = moduleGraph(),
    b = moduleGraph();
  try {
    assert.equal(a.node.kind, "external");
    assert.equal(a.node.name, "monaco-editor");
    assert.equal(a.node.source, "monaco-editor");
    assert.deepEqual(a.reference, b.reference);
    assert.deepEqual(a.node, b.node);
    assert.ok(!JSON.stringify(a.node).includes(a.root));
  } finally {
    rmSync(a.root, { recursive: true, force: true });
    rmSync(b.root, { recursive: true, force: true });
  }
});

test("same printed names retain distinct local shapes through array, optional, generic and callback wrappers", () => {
  const root = mkdtempSync(join(tmpdir(), "minerva-local-types-"));
  try {
    const files = ["a", "b"].map((name) => join(root, `${name}.ts`));
    writeFileSync(
      join(root, "common.ts"),
      "export interface Box<T> { item: T }\nexport type Callback<T> = (columns: T[]) => T[];\n",
    );
    for (const [index, file] of files.entries())
      writeFileSync(
        file,
        `
      import type { Box, Callback } from "./common";
      export interface Column { key: string; width?: ${index ? "number" : "number | string"}; next?: Column; children?: Column[]; ${index ? "" : "fixed?: boolean;"} }
      export interface Props { array: Column[]; optional?: Column[]; generic: Box<Column>; callback: Callback<Column>; }
    `,
      );
    const program = ts.createProgram(files, { strict: true });
    const checker = program.getTypeChecker();
    const props = files.map((file) => {
      const source = program.getSourceFile(file);
      const symbol = checker
        .getExportsOfModule(checker.getSymbolAtLocation(source))
        .find((entry) => entry.name === "Props");
      return new Map(
        checker
          .getPropertiesOfType(checker.getDeclaredTypeOfSymbol(symbol))
          .map((property) => [
            property.name,
            describeType(checker, checker.getTypeOfSymbol(property)),
          ]),
      );
    });
    for (const name of ["array", "optional", "generic", "callback"])
      assert.notEqual(
        props[0].get(name).typeRef,
        props[1].get(name).typeRef,
        name,
      );
    const a = typeGraph[typeGraph[props[0].get("array").typeRef].elementType];
    const b = typeGraph[typeGraph[props[1].get("array").typeRef].elementType];
    assert.ok(a.fields.some((field) => field.name === "fixed"));
    assert.ok(!b.fields.some((field) => field.name === "fixed"));
    assert.equal(
      b.fields.find((field) => field.name === "width").typeText,
      "number | undefined",
    );
    const nested = b.fields.find((field) => field.name === "children");
    assert.equal(typeGraph[nested.typeRef].kind, "union");
    const callbacks = props.map(
      (entries) => typeGraph[entries.get("callback").typeRef],
    );
    assert.notEqual(
      callbacks[0].signatures[0].parameters[0].typeRef,
      callbacks[1].signatures[0].parameters[0].typeRef,
    );
    assert.notEqual(
      callbacks[0].signatures[0].returnType.typeRef,
      callbacks[1].signatures[0].returnType.typeRef,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
