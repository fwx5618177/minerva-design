// @vitest-environment node
// The build-time template minifier (scripts/minify-templates.mjs) must only
// change the static text of css / html / svg templates: same code structure,
// same expressions, same line numbers, same text once whitespace (and CSS
// comments) are ignored.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { minifyTemplates } from "../../scripts/minify-templates.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
const sources = walk(join(root, "src")).filter(
  (f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && !f.endsWith(".d.ts"),
);

const TAGS = new Set(["css", "html", "svg"]);
const isTemplatePart = (node: ts.Node) =>
  ts.isNoSubstitutionTemplateLiteral(node) ||
  ts.isTemplateHead(node) ||
  ts.isTemplateMiddle(node) ||
  ts.isTemplateTail(node);

/** Structure of the module, with the minified templates' text set aside. */
function outline(code: string) {
  const source = ts.createSourceFile(
    "x.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  );
  const parts: string[] = [];
  const texts: string[] = [];
  const visit = (node: ts.Node, inTagged: string | null) => {
    if (isTemplatePart(node) && inTagged) {
      const raw = (node as ts.TemplateLiteralLikeNode).rawText ?? "";
      texts.push(
        inTagged === "css"
          ? raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, "")
          : raw.replace(/\s+/g, ""),
      );
      parts.push(`${ts.SyntaxKind[node.kind]}<template>`);
      return;
    }
    if (ts.isTaggedTemplateExpression(node)) {
      const tag = node.tag.getText(source);
      parts.push(`tagged:${tag}`);
      visit(node.tag, null);
      visit(node.template, TAGS.has(tag) ? tag : null);
      return;
    }
    if (ts.isTemplateSpan(node)) {
      visit(node.expression, null);
      visit(node.literal, inTagged);
      return;
    }
    parts.push(
      node.getChildCount(source) === 0
        ? `${ts.SyntaxKind[node.kind]}:${node.getText(source)}`
        : ts.SyntaxKind[node.kind],
    );
    ts.forEachChild(node, (child) => visit(child, inTagged));
  };
  visit(source, null);
  const diagnostics = (
    source as unknown as { parseDiagnostics: ts.Diagnostic[] }
  ).parseDiagnostics;
  return { parts: parts.join("\n"), texts, diagnostics };
}

describe("minify-templates", () => {
  it("minifies css / html templates, keeps quoted CSS strings and <pre> content", () => {
    const code = [
      "const a = css`",
      "  :host {",
      "    display: block; /* note */",
      '    content: "a ,  b";',
      "  }",
      "`;",
      "const b = html`<div>",
      "    <span>${x ? html`<b>",
      "      y</b>` : nothing}</span>",
      "  </div>`;",
      "const c = html`<pre>",
      "  keep</pre>`;",
      "const d = `plain  ${html`<i>",
      "   z</i>`}`;",
    ].join("\n");
    const out = minifyTemplates(code);
    expect(out.split("\n")).toHaveLength(code.split("\n").length);
    expect(out).toContain(':host{\ndisplay: block;\ncontent: "a ,  b";\n}');
    expect(out).toContain(
      "<div>\n<span>${x ? html`<b>\ny</b>` : nothing}</span>\n</div>`",
    );
    expect(out).toContain("html`<pre>\n  keep</pre>`");
    expect(out).toContain("`plain  ${html`<i>\nz</i>`}`");
  });

  it.each(sources.map((file) => [file.slice(root.length + 1), file]))(
    "only changes template text: %s",
    (_name, file) => {
      const code = readFileSync(file, "utf8");
      const out = minifyTemplates(code);
      expect(out.split("\n").length).toBe(code.split("\n").length);
      const before = outline(code);
      const after = outline(out);
      expect(after.diagnostics).toEqual([]);
      expect(after.parts).toBe(before.parts);
      expect(after.texts).toEqual(before.texts);
    },
  );

  it("shrinks the sources", () => {
    let before = 0;
    let after = 0;
    for (const file of sources) {
      const code = readFileSync(file, "utf8");
      before += code.length;
      after += minifyTemplates(code).length;
    }
    expect(after).toBeLessThan(before);
  });
});
