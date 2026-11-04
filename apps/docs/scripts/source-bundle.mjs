// Resolve demo dependencies without executing application code. These bundles
// preserve documentation context; only separately tested recipes are standalone.
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, extname, relative, resolve, sep } from "node:path";
import ts from "typescript";

const extensions = [
  "",
  ".ts",
  ".tsx",
  ".vue",
  ".js",
  ".json",
  ".css",
  ".scss",
  "/index.ts",
  "/index.tsx",
];
const inside = (root, file) => {
  const path = relative(root, file);
  if (path === ".." || path.startsWith(`..${sep}`))
    throw new Error(`Source dependency escapes outside ${root}: ${file}`);
  return path.split(sep).join("/");
};
export function collectSourceBundle(entry, root) {
  root = realpathSync(resolve(root));
  entry = realpathSync(resolve(entry));
  const files = {},
    dependencies = new Set(),
    contextImports = new Set();
  function visit(file) {
    file = realpathSync(file);
    const key = inside(root, file);
    if (Object.hasOwn(files, key)) return;
    const source = readFileSync(file, "utf8");
    files[key] = source;
    if (!/\.(?:tsx?|jsx?|vue)$/.test(file)) return;
    const script =
      extname(file) === ".vue"
        ? [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
            .map((m) => m[1])
            .join("\n")
        : source;
    const tree = ts.createSourceFile(
      file,
      script,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const imports = [];
    function scan(node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      )
        imports.push(node.moduleSpecifier.text);
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        ts.isStringLiteral(node.arguments[0])
      )
        imports.push(node.arguments[0].text);
      ts.forEachChild(node, scan);
    }
    scan(tree);
    for (const spec of imports) {
      if (spec.startsWith(".")) {
        const base = resolve(dirname(file), spec.replace(/\?.*$/, ""));
        inside(root, base);
        const dependency = extensions
          .map((ext) => base + ext)
          .find((path) => existsSync(path) && statSync(path).isFile());
        if (!dependency) throw new Error(`Cannot resolve ${spec} from ${file}`);
        visit(dependency);
      } else if (/^(?:@\/|@layout\/|@minerva\/)/.test(spec))
        contextImports.add(spec);
      else
        dependencies.add(
          spec.startsWith("@")
            ? spec.split("/").slice(0, 2).join("/")
            : spec.split("/")[0],
        );
    }
  }
  visit(resolve(entry));
  return {
    kind: "internal-demo",
    entry: inside(root, resolve(entry)),
    files,
    dependencies: [...dependencies].sort(),
    contextImports: [...contextImports].sort(),
  };
}

/** Statically read literal snippets actually passed to CodeBlock; never execute
 * a documentation page or assume every string variable is a code sample. */
export function inlineSnippets(source, bindings = {}) {
  const tree = ts.createSourceFile(
    "index.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const declarations = new Map(),
    result = [];
  // Resolve only text and templates. Never execute a page, a call, or a member
  // access; unresolved expressions are omitted just like dynamic snippets.
  function text(node, seen = new Set()) {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      return node.text;
    if (ts.isIdentifier(node)) {
      const name = node.text;
      if (seen.has(name)) return undefined;
      if (declarations.has(name))
        return text(declarations.get(name), new Set([...seen, name]));
      return Object.hasOwn(bindings, name) && typeof bindings[name] === "string"
        ? bindings[name]
        : undefined;
    }
    if (ts.isTemplateExpression(node)) {
      let value = node.head.text;
      for (const span of node.templateSpans) {
        const part = text(span.expression, seen);
        if (part === undefined) return undefined;
        value += part + span.literal.text;
      }
      return value;
    }
    return undefined;
  }
  function variables(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name))
      declarations.set(node.name.text, node.initializer);
    ts.forEachChild(node, variables);
  }
  variables(tree);
  function visit(node) {
    if (
      (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
      node.tagName.getText(tree) === "CodeBlock"
    ) {
      const attr = (name) =>
        node.attributes.properties.find(
          (p) => ts.isJsxAttribute(p) && p.name.getText(tree) === name,
        )?.initializer;
      const code = attr("code"),
        language = text(attr("language")) ?? "tsx";
      const expression =
        code && ts.isJsxExpression(code) ? code.expression : code;
      const value = text(expression);
      if (value !== undefined) result.push({ source: value, language });
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return result;
}
