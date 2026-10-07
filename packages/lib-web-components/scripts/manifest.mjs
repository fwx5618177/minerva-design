// Custom Elements Manifest (custom-elements.json) of @minerva/lib-web-components.
//
//   node scripts/generate-manifest.mjs          -> writes custom-elements.json
//   node scripts/generate-manifest.mjs --check  -> exits 1 when it is stale
//
// The Custom Elements Manifest analyzer (Lit plugin) reads the element
// classes in src/components; this script then:
// - keeps the public API only (no static / private / protected members)
// - expands string-literal type aliases ("ButtonVariant" -> "solid" | ...),
//   so docs, IDE data and typings show the accepted values
// - adds the CSS custom properties declared in the lib-core stylesheets the
//   element renders with (`// @css-var` comments): one contract for both
//   libraries.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { create, ts } from "@custom-elements-manifest/analyzer";
import { litPlugin } from "@custom-elements-manifest/analyzer/src/features/framework-plugins/lit/lit.js";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const MANIFEST = join(ROOT, "custom-elements.json");
const SRC = join(ROOT, "src");
const LIB_CORE_SRC = join(ROOT, "../lib-core/src");
const CORE_SRC = join(ROOT, "../core/src");

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const sourceFiles = () =>
  [...walk(join(SRC, "components")), ...walk(join(SRC, "internal"))]
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
    .sort();

/** Exported string-literal union aliases (name -> `"a" | "b"`). */
const literalAliases = () => {
  const files = [
    ...sourceFiles(),
    join(SRC, "types.ts"),
    join(CORE_SRC, "theme/types.ts"),
  ];
  const aliases = new Map();
  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    for (const statement of source.statements) {
      if (!ts.isTypeAliasDeclaration(statement)) continue;
      const type = statement.type;
      const parts = ts.isUnionTypeNode(type) ? type.types : [type];
      const literals = parts.every(
        (part) =>
          ts.isLiteralTypeNode(part) &&
          (ts.isStringLiteral(part.literal) ||
            ts.isNumericLiteral(part.literal) ||
            part.literal.kind === ts.SyntaxKind.TrueKeyword ||
            part.literal.kind === ts.SyntaxKind.FalseKeyword),
      );
      if (literals) {
        aliases.set(
          statement.name.text,
          parts.map((p) => p.getText(source)).join(" | "),
        );
      }
    }
  }
  return aliases;
};

const expandType = (text, aliases) =>
  text
    .split("|")
    .map((part) => part.trim())
    .map((part) => aliases.get(part) ?? part)
    .join(" | ");

const CSS_VAR_COMMENT = /^\s*\/\/\s*@css-var\s+(--[\w-]+)\s+(.+?)\s*$/gm;
const STYLE_IMPORT = /["']@lib-core-styles\/([^"'?]+)\?inline["']/g;

/** `// @css-var` declarations of the lib-core stylesheets a module imports */
const cssVarsOf = (file) => {
  const vars = [];
  for (const [, path] of readFileSync(file, "utf8").matchAll(STYLE_IMPORT)) {
    const scss = join(LIB_CORE_SRC, path);
    if (!existsSync(scss)) throw new Error(`${file}: missing ${scss}`);
    for (const [, name, description] of readFileSync(scss, "utf8").matchAll(
      CSS_VAR_COMMENT,
    )) {
      if (!vars.some((v) => v.name === name)) {
        vars.push({ name, description: description.replace(/\s+/g, " ") });
      }
    }
  }
  return vars;
};

const HIDDEN_MEMBERS = new Set([
  "tagName",
  "dependencies",
  "formAssociated",
  "styles",
  "shadowRootOptions",
]);

const isPublic = (member) =>
  !member.static &&
  member.privacy !== "private" &&
  member.privacy !== "protected" &&
  !member.name.startsWith("_") &&
  !HIDDEN_MEMBERS.has(member.name);

export function generateManifest() {
  const files = sourceFiles();
  const modules = files.map((file) => {
    const text = readFileSync(file, "utf8");
    // The analyzer's Lit plugin crashes on `@property({ ...shared, x })`
    if (/@(property|state)\(\{[^)]*\.\.\./.test(text)) {
      throw new Error(
        `${relative(ROOT, file)}: write @property options as plain object literals (no spread), the manifest analyzer cannot read them`,
      );
    }
    return ts.createSourceFile(
      relative(ROOT, file).replace(/\\/g, "/"),
      text,
      ts.ScriptTarget.ES2022,
      true,
    );
  });
  const manifest = create({ modules, plugins: [...litPlugin()] });
  const aliases = literalAliases();
  const fix = (entry) => {
    if (entry?.type?.text) {
      entry.type = { text: expandType(entry.type.text, aliases) };
    }
    return entry;
  };

  manifest.modules = manifest.modules
    .map((module) => {
      const declarations = (module.declarations ?? []).filter(
        (d) => d.kind === "class" && d.customElement && d.tagName,
      );
      if (declarations.length === 0) return null;
      for (const element of declarations) {
        element.members = (element.members ?? []).filter(isPublic).map(fix);
        element.attributes = (element.attributes ?? [])
          .filter((a) => !HIDDEN_MEMBERS.has(a.fieldName ?? ""))
          .map(fix);
        const fromScss = cssVarsOf(join(ROOT, module.path));
        const declared = element.cssProperties ?? [];
        const cssProperties = [
          ...declared,
          ...fromScss.filter((v) => !declared.some((d) => d.name === v.name)),
        ];
        if (cssProperties.length) element.cssProperties = cssProperties;
        else delete element.cssProperties;
        for (const key of ["superclass", "mixins"]) delete element[key];
      }
      return {
        kind: module.kind,
        path: module.path,
        declarations,
        exports: (module.exports ?? []).filter((e) =>
          declarations.some((d) => d.name === e.declaration?.name),
        ),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.path.localeCompare(b.path));
  return manifest;
}

export const serializeManifest = (manifest) =>
  `${JSON.stringify(manifest, null, 2)}\n`;

/** Every element of the manifest: `{ tagName, name, path, ...declaration }` */
export const elementsOf = (manifest) =>
  manifest.modules.flatMap((module) =>
    module.declarations.map((d) => ({ ...d, path: module.path })),
  );
