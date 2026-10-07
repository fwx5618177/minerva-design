// Extracts prop tables from @minerva/lib-core (and the theme types of
// @minerva/core) so the docs site's API tables are generated from the real
// `types.ts` files.
//
//   node scripts/generate-api.mjs          -> writes src/docs/api.generated.json
//   node scripts/generate-api.mjs --check  -> exits 1 when the JSON is stale
//
// For every exported interface / object type alias it records each member's
// name, type, whether it is required, its JSDoc description and `@default` tag.
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
export const SAMPLE_ROOT = join(here, "..");
const LIB_SRC = join(SAMPLE_ROOT, "../lib-core/src");
const CORE_SRC = join(SAMPLE_ROOT, "../core/src");
const WC_SRC = join(SAMPLE_ROOT, "../lib-web-components/src");
/** Web-component types are keyed with this prefix to avoid name clashes */
export const WC_PREFIX = "wc:";
export const OUTPUT = join(SAMPLE_ROOT, "src/docs/api.generated.json");

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
  // Theme object types (ThemeProps, ...), re-exported by @minerva/lib-core
  { file: join(CORE_SRC, "theme/types.ts"), prefix: "" },
  // i18n types (SupportedLanguage, ...), re-exported by @minerva/lib-core
  { file: join(CORE_SRC, "i18n/types.ts"), prefix: "" },
  ...typeFilesIn(WC_SRC).map((file) => ({ file, prefix: WC_PREFIX })),
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
    const source = relative(join(SAMPLE_ROOT, ".."), file).replace(/\\/g, "/");
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
  return Object.fromEntries(
    Object.entries(result).sort(([a], [b]) => a.localeCompare(b)),
  );
};

export const serialize = (api) => `${JSON.stringify(api, null, 2)}\n`;

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const next = serialize(generateApi());
  if (process.argv.includes("--check")) {
    const current = existsSync(OUTPUT) ? readFileSync(OUTPUT, "utf8") : "";
    if (current !== next) {
      console.error(
        "api.generated.json is out of date. Run: pnpm --filter @minerva/sample gen:api",
      );
      process.exit(1);
    }
    console.log("api.generated.json is up to date");
  } else {
    writeFileSync(OUTPUT, next);
    console.log(`Wrote ${relative(SAMPLE_ROOT, OUTPUT)}`);
  }
}
