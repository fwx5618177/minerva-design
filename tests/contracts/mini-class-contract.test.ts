import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import ts from "typescript";
import { expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

// These parts establish layout, rather than merely identify a component.
// Read the class contract from the JSX so renaming a part without updating
// the shipped stylesheet cannot silently turn tables and overlays into text.
const structuralParts = new Set([
  "table:row",
  "table:header",
  "table:cell",
  "modal:content",
  "modal:body",
  "modal:footer",
  "drawer:content",
  "popover:content",
  "tabs:list",
]);

it("Taro structural parts have matching renderer stylesheet selectors", () => {
  const classes = new Set<string>();
  for (const file of ["data.tsx", "navigation.tsx", "overlays.tsx"]) {
    const source = ts.createSourceFile(
      file,
      read(`packages/taro/src/${file}`),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node: ts.Node) {
      if (
        (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
        node.tagName.getText(source) === "Part"
      ) {
        const attributes = node.attributes.properties.filter(ts.isJsxAttribute);
        const value = (key: string) =>
          attributes.find((a) => a.name.getText(source) === key)?.initializer;
        const name = value("name");
        const part = value("part");
        if (part && ts.isStringLiteral(part)) {
          // OverlayContent's kind union renders both modal and drawer.
          const names =
            name && ts.isStringLiteral(name)
              ? [name.text]
              : name?.getText(source) === "{kind}"
                ? ["modal", "drawer"]
                : [];
          for (const component of names) {
            if (structuralParts.has(`${component}:${part.text}`))
              classes.add(`mn-${component}__${part.text}`);
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  expect(classes.size).toBe(structuralParts.size);
  const css = readdirSync(join(root, "tools/styles"))
    .filter((file) => /(?:mini|taro).*\.css$/.test(file))
    .map((file) => read(`tools/styles/${file}`))
    .join("\n");
  const selectors = [
    ...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g),
  ]
    .map((match) => match[1])
    .join("\n");
  const absent = [...classes].filter(
    (name) => !new RegExp(`\\.${name}(?![\\w-])`).test(selectors),
  );
  expect(absent, "Unstyled structural parts from packages/taro/src").toEqual(
    [],
  );
});
