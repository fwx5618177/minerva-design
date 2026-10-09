// Native Angular API documentation from signal declarations and public methods.
// Models describe their input and generated Change output together.
import ts from "typescript";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(
  root,
  "../../apps/docs/src/docs/angular/api.generated.json",
);
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((item) =>
    item.isDirectory() ? files(join(dir, item.name)) : [join(dir, item.name)],
  );
const declarations = new Map();
const sourceFiles = [
  ...files(join(root, "src")),
  join(root, "monaco/index.ts"),
].filter(
  (file) => file.endsWith(".ts") && !/\.test\.ts$|\/testing\//.test(file),
);
const config = ts.readConfigFile(join(root, "tsconfig.json"), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(sourceFiles, parsed.options);
const checker = program.getTypeChecker();
for (const path of sourceFiles) {
  const source = program.getSourceFile(path);
  if (!source) throw new Error(`Cannot read Angular API source: ${path}`);
  for (const node of source.statements)
    if (ts.isClassDeclaration(node) && node.name)
      declarations.set(node.name.text, { node, source, path });
}
const privateMember = (node) =>
  node.modifiers?.some(
    (m) =>
      m.kind === ts.SyntaxKind.PrivateKeyword ||
      m.kind === ts.SyntaxKind.ProtectedKeyword ||
      m.kind === ts.SyntaxKind.StaticKeyword,
  );
function rows(name, seen = new Set()) {
  if (seen.has(name)) return [];
  seen.add(name);
  const entry = declarations.get(name);
  if (!entry) return [];
  const { node, source } = entry;
  const base =
    node.heritageClauses
      ?.flatMap((c) => c.types)
      .map((t) => t.expression.getText(source)) ?? [];
  const result = new Map(
    base.flatMap((parent) => rows(parent, seen)).map((row) => [row.name, row]),
  );
  for (const member of node.members) {
    if (privateMember(member) || !member.name) continue;
    const name = member.name.getText(source);
    const description = (member.jsDoc ?? [])
      .map((doc) => (typeof doc.comment === "string" ? doc.comment : ""))
      .filter(Boolean)
      .join("\n");
    if (
      ts.isPropertyDeclaration(member) &&
      member.initializer &&
      ts.isCallExpression(member.initializer)
    ) {
      const call = member.initializer;
      const kind = call.expression.getText(source).split(".")[0];
      if (!["input", "model", "output"].includes(kind)) continue;
      const required = call.expression.getText(source).endsWith(".required");
      const defaultValue =
        kind === "output" || required
          ? undefined
          : call.arguments[0]?.getText(source);
      let type =
        call.typeArguments?.[0]?.getText(source) ??
        (defaultValue === "true" || defaultValue === "false"
          ? "boolean"
          : /^\d/.test(defaultValue ?? "")
            ? "number"
            : /^['"`]/.test(defaultValue ?? "")
              ? "string"
              : kind === "output"
                ? "void"
                : "unknown");
      let alias = name;
      for (const argument of call.arguments)
        if (ts.isObjectLiteralExpression(argument)) {
          const prop = argument.properties.find(
            (p) => p.name?.getText(source) === "alias",
          );
          if (
            prop &&
            ts.isPropertyAssignment(prop) &&
            ts.isStringLiteral(prop.initializer)
          )
            alias = prop.initializer.text;
        }
      result.set(alias, {
        name: alias,
        kind,
        type,
        required,
        ...(defaultValue && defaultValue !== "undefined"
          ? { default: defaultValue }
          : {}),
        description,
        ...(kind === "model" ? { changeEvent: `${alias}Change` } : {}),
      });
    } else if (
      ts.isMethodDeclaration(member) &&
      ![
        "ngOnInit",
        "ngOnDestroy",
        "writeValue",
        "registerOnChange",
        "registerOnTouched",
        "setDisabledState",
      ].includes(name)
    ) {
      const parameters = member.parameters
        .map(
          (p) =>
            `${p.name.getText(source)}${p.questionToken ? "?" : ""}: ${p.type?.getText(source) ?? "unknown"}`,
        )
        .join(", ");
      const signature = checker.getSignatureFromDeclaration(member);
      const returnType = signature
        ? checker.typeToString(
            checker.getReturnTypeOfSignature(signature),
            member,
            ts.TypeFormatFlags.NoTruncation,
          )
        : (member.type?.getText(source) ?? "void");
      result.set(name, {
        name,
        kind: "method",
        type: `(${parameters}) => ${returnType}`,
        required: false,
        description,
      });
    }
  }
  return [...result.values()];
}
const api = {};
for (const [name, { node, path }] of declarations) {
  if (
    !node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ||
    !name.startsWith("Mn") ||
    path.includes("/internal/") ||
    name.endsWith("Base")
  )
    continue;
  const members = rows(name);
  api[name] = {
    name,
    source: relative(root, path),
    description: (node.jsDoc ?? [])
      .map((d) => (typeof d.comment === "string" ? d.comment : ""))
      .filter(Boolean)
      .join("\n"),
    members,
  };
}
const content = JSON.stringify(api, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (readFileSync(target, "utf8") !== content) {
    console.error(
      "Angular API documentation is stale. Run node packages/angular/scripts/generate-api.mjs",
    );
    process.exit(1);
  }
} else writeFileSync(target, content);
console.log(
  `Angular API: ${Object.keys(api).length} classes, ${Object.values(api).reduce((n, c) => n + c.members.length, 0)} inputs, models, outputs and methods`,
);
