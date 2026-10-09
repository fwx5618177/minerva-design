import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { expect, it } from "vitest";
it("does not eagerly register Web Components on React-only routes", () => {
  const filename = fileURLToPath(
    new URL("../../apps/docs/src/index.tsx", import.meta.url),
  );
  const source = ts.createSourceFile(
    filename,
    readFileSync(filename, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const imports = source.statements
    .filter(ts.isImportDeclaration)
    .map((node) => (node.moduleSpecifier as ts.StringLiteral).text);
  expect(imports).not.toContain("minerva-design/web-components");
});
