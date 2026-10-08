// Extracts prop tables from minerva-design (and the theme types of
// minerva-design/core) so the docs site's API tables are generated from the real
// `types.ts` files.
//
//   node scripts/generate-api.mjs          -> writes src/docs/api.generated.json
//   node scripts/generate-api.mjs --check  -> exits 1 when the JSON is stale
//
// For every exported interface / object type alias it records each member's
// name, type, whether it is required, its JSDoc description and `@default` tag.
//
// It also records the public CSS custom properties of every React
// component, declared in its SCSS files as
//   // @css-var --button-height Height of the button (every size)
// under the key `css:<ComponentFolder>`.
//
// Web Components: the API of every custom element of
// minerva-design/web-components (attributes, properties, events, slots, CSS
// parts, CSS custom properties, methods) is read from its Custom Elements
// Manifest (packages/minerva-design/custom-elements.json) and recorded
// under `wc:<tag-name>`.
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
export const DOCS_ROOT = join(here, "..");
const PACKAGES_DIR = join(DOCS_ROOT, "../../packages");
const LIB_SRC = join(PACKAGES_DIR, "react/src");
const CORE_SRC = join(PACKAGES_DIR, "core/src");
const WC_MANIFEST = join(PACKAGES_DIR, "minerva-design/custom-elements.json");
/** Web-component elements are keyed with this prefix (`wc:minerva-button`) */
export const WC_PREFIX = "wc:";
export const OUTPUT = join(DOCS_ROOT, "src/docs/api.generated.json");
/** Web Component APIs: a separate file, loaded only by the "Web Components" tabs */
export const OUTPUT_WC = join(DOCS_ROOT, "src/docs/api.wc.generated.json");

const typeFilesIn = (componentsDir) => {
  const files = [];
  for (const dir of readdirSync(componentsDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const file = join(componentsDir, dir.name, "types.ts");
    if (existsSync(file)) files.push(file);
  }
  return files.sort();
};

/** All files that declare public types, with the key prefix to use */
const sourceFiles = () => [
  ...typeFilesIn(join(LIB_SRC, "components")).map((file) => ({
    file,
    prefix: "",
  })),
  { file: join(LIB_SRC, "contexts/types.ts"), prefix: "" },
  // Theme object types (ThemeProps, ...), re-exported by minerva-design
  { file: join(CORE_SRC, "theme/types.ts"), prefix: "" },
  // Design axes (DesignOptions, ...), re-exported by minerva-design
  { file: join(CORE_SRC, "theme/design.ts"), prefix: "" },
  // i18n types (SupportedLanguage, ...), re-exported by minerva-design
  { file: join(CORE_SRC, "i18n/types.ts"), prefix: "" },
];

const clean = (text) => text.replace(/\s+/g, " ").trim();

/**
 * Single-line rendering of a type written over several lines: collapses the
 * whitespace and drops the padding / trailing commas / leading `|` that the
 * line breaks leave inside brackets (`Extract<\n  A,\n  B\n>` -> `Extract<A, B>`).
 */
const cleanType = (text) =>
  clean(text)
    .replace(/([<(])\s*\|?\s*/g, "$1")
    .replace(/,?\s+([>)])/g, "$1")
    .replace(/^\|\s*/, "");

const jsDocOf = (node) => {
  const docs = node.jsDoc ?? [];
  const doc = docs[docs.length - 1];
  if (!doc) return { description: "", defaultValue: undefined };
  const description =
    typeof doc.comment === "string"
      ? doc.comment
      : (doc.comment ?? []).map((part) => part.text).join("");
  let defaultValue;
  for (const tag of doc.tags ?? []) {
    if (tag.tagName.text === "default" || tag.tagName.text === "defaultValue") {
      const comment =
        typeof tag.comment === "string"
          ? tag.comment
          : (tag.comment ?? []).map((part) => part.text).join("");
      defaultValue = clean(comment);
    }
  }
  return { description: clean(description), defaultValue };
};

const membersOf = (members, sourceFile) =>
  members
    .filter(
      (m) => ts.isPropertySignature(m) || ts.isMethodSignature(m) || false,
    )
    .map((member) => {
      const { description, defaultValue } = jsDocOf(member);
      const name = member.name.getText(sourceFile);
      let type;
      if (ts.isMethodSignature(member)) {
        const params = member.parameters
          .map((p) => p.getText(sourceFile))
          .join(", ");
        type = `(${params}) => ${member.type ? member.type.getText(sourceFile) : "void"}`;
      } else {
        type = member.type ? member.type.getText(sourceFile) : "any";
      }
      const prop = {
        name: name.replace(/^["']|["']$/g, ""),
        type: cleanType(type),
        required: !member.questionToken,
      };
      if (defaultValue !== undefined) prop.default = defaultValue;
      if (description) prop.description = description;
      return prop;
    });

export const generateApi = () => {
  const result = {};
  for (const { file, prefix } of sourceFiles()) {
    const text = readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      true,
    );
    const source = relative(PACKAGES_DIR, file).replace(/\\/g, "/");
    for (const statement of sourceFile.statements) {
      const exported = statement.modifiers?.some(
        (m) => m.kind === ts.SyntaxKind.ExportKeyword,
      );
      if (!exported) continue;
      let entry;
      if (ts.isInterfaceDeclaration(statement)) {
        entry = {
          kind: "interface",
          extends: (statement.heritageClauses ?? []).flatMap((clause) =>
            clause.types.map((t) => cleanType(t.getText(sourceFile))),
          ),
          props: membersOf(statement.members, sourceFile),
        };
      } else if (ts.isTypeAliasDeclaration(statement)) {
        entry = ts.isTypeLiteralNode(statement.type)
          ? {
              kind: "interface",
              extends: [],
              props: membersOf(statement.type.members, sourceFile),
            }
          : {
              kind: "alias",
              type: cleanType(statement.type.getText(sourceFile)),
            };
      } else {
        continue;
      }
      const name = prefix + statement.name.text;
      if (result[name]) {
        throw new Error(`Duplicate exported type name "${name}" in ${source}`);
      }
      const { description } = jsDocOf(statement);
      result[name] = {
        source,
        ...(description ? { description } : {}),
        ...entry,
      };
    }
  }
  Object.assign(result, generateCssVars());
  return Object.fromEntries(
    Object.entries(result).sort(([a], [b]) => a.localeCompare(b)),
  );
};

/** Prefix of the CSS-variable entries (`css:<ComponentFolder>`) */
export const CSS_PREFIX = "css:";
const CSS_VAR_COMMENT = /^\s*\/\/\s*@css-var\s+(--[\w-]+)\s+(.+?)\s*$/gm;

/** `// @css-var` declarations of every React component folder */
export const generateCssVars = () => {
  const componentsDir = join(LIB_SRC, "components");
  const result = {};
  for (const dir of readdirSync(componentsDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const folder = join(componentsDir, dir.name);
    const vars = [];
    for (const file of readdirSync(folder).sort()) {
      if (!file.endsWith(".scss")) continue;
      const text = readFileSync(join(folder, file), "utf8");
      for (const [, name, description] of text.matchAll(CSS_VAR_COMMENT)) {
        if (vars.some((v) => v.name === name)) {
          throw new Error(`Duplicate @css-var ${name} in ${dir.name}`);
        }
        vars.push({ name, description: clean(description) });
      }
    }
    if (vars.length === 0) continue;
    result[CSS_PREFIX + dir.name] = {
      kind: "cssVars",
      source: relative(PACKAGES_DIR, folder).replace(/\\/g, "/"),
      vars,
    };
  }
  return result;
};

/** One line of JSDoc text (manifest descriptions keep their line breaks) */
const oneLine = (text) => (text ? clean(text) : undefined);

const compact = (entry) =>
  Object.fromEntries(
    Object.entries(entry).filter(([, value]) => value !== undefined),
  );

/** API of every custom element, from the Custom Elements Manifest */
export const generateElements = () => {
  const manifest = JSON.parse(readFileSync(WC_MANIFEST, "utf8"));
  const result = {};
  for (const module of manifest.modules) {
    for (const element of module.declarations ?? []) {
      if (!element.tagName) continue;
      const attributes = new Map(
        (element.attributes ?? []).map((a) => [a.fieldName ?? a.name, a]),
      );
      const fields = (element.members ?? []).filter((m) => m.kind === "field");
      result[WC_PREFIX + element.tagName] = {
        kind: "element",
        source: `web-components/${module.path}`,
        className: element.name,
        summary: oneLine(element.summary),
        description: oneLine(element.description),
        // Properties with an attribute first (declaration order), then JS-only ones
        properties: [
          ...fields.filter((f) => attributes.has(f.name)),
          ...fields.filter((f) => !attributes.has(f.name)),
        ].map((field) =>
          compact({
            name: field.name,
            attribute: attributes.get(field.name)?.name,
            type: field.type?.text ? cleanType(field.type.text) : undefined,
            default: field.default,
            readonly: field.readonly || undefined,
            description: oneLine(field.description),
          }),
        ),
        methods: (element.members ?? [])
          .filter((m) => m.kind === "method")
          .map((method) =>
            compact({
              name: method.name,
              signature: `(${(method.parameters ?? [])
                .map((p) =>
                  p.type?.text
                    ? `${p.name}${p.optional ? "?" : ""}: ${cleanType(p.type.text)}`
                    : p.name,
                )
                .join(
                  ", ",
                )}) => ${cleanType(method.return?.type?.text ?? "void")}`,
              description: oneLine(method.description),
            }),
          ),
        events: (element.events ?? []).map((e) =>
          compact({ name: e.name, description: oneLine(e.description) }),
        ),
        slots: (element.slots ?? []).map((s) =>
          compact({ name: s.name, description: oneLine(s.description) }),
        ),
        parts: (element.cssParts ?? []).map((p) =>
          compact({ name: p.name, description: oneLine(p.description) }),
        ),
        cssProperties: (element.cssProperties ?? []).map((p) =>
          compact({ name: p.name, description: oneLine(p.description) }),
        ),
      };
    }
  }
  return result;
};

/** Entries sorted by key (stable output) */
export const sortKeys = (entries) =>
  Object.fromEntries(
    Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)),
  );

export const serialize = (api) => `${JSON.stringify(api, null, 2)}\n`;

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const outputs = [
    [OUTPUT, serialize(generateApi())],
    [OUTPUT_WC, serialize(sortKeys(generateElements()))],
  ];
  for (const [file, next] of outputs) {
    const name = relative(DOCS_ROOT, file);
    if (process.argv.includes("--check")) {
      const current = existsSync(file) ? readFileSync(file, "utf8") : "";
      if (current !== next) {
        console.error(
          `${name} is out of date. Run: pnpm --filter @minerva/docs gen:api`,
        );
        process.exit(1);
      }
      console.log(`${name} is up to date`);
    } else {
      writeFileSync(file, next);
      console.log(`Wrote ${name}`);
    }
  }
}
