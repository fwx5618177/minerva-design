// Explicit source migration for consumers adopting Minerva's current API.
// Dry-run by default. Ambiguous value/shape changes remain review warnings.
import ts from "typescript";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, extname } from "node:path";
import { pathToFileURL } from "node:url";

const renamed = {
  Spinner: "ProgressIndicator",
  SpinnerProps: "ProgressIndicatorProps",
  EmptyState: "Empty",
  EmptyStateProps: "EmptyProps",
  Autocomplete: "AutoComplete",
  AutocompleteOption: "AutoCompleteOption",
  AutocompleteProps: "AutoCompleteProps",
};
const sizes = {
  xs: "xsmall",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "xlarge",
  "2xl": "xxlarge",
};
const colors = { brand: "primary", gray: "neutral", confirm: "success" };
const states = {
  isLoading: "loading",
  isRequired: "required",
  isInvalid: "invalid",
  isDisabled: "disabled",
  isReadOnly: "readOnly",
};

export function migrateSource(source, fileName = "consumer.tsx", options = {}) {
  const name = resolve(fileName);
  const file = ts.createSourceFile(
    name,
    source,
    ts.ScriptTarget.Latest,
    true,
    /\.tsx$/.test(name) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const host = ts.createCompilerHost({ noLib: true, noResolve: true });
  host.getSourceFile = (path) => (path === name ? file : undefined);
  const checker = ts
    .createProgram(
      [name],
      { noLib: true, noResolve: true, jsx: ts.JsxEmit.Preserve },
      host,
    )
    .getTypeChecker();
  const imports = new Map();
  const vitestHelpers = new Set();
  const edits = [];
  const warnings = [];
  const replace = (node, text) =>
    edits.push({ start: node.getStart(file), end: node.end, text });
  const warn = (node, message) =>
    warnings.push(
      `${fileName}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}: ${message}`,
    );
  for (const statement of file.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    )
      continue;
    const path = statement.moduleSpecifier.text;
    const named = statement.importClause?.namedBindings;
    if (path === "vitest" && named && ts.isNamedImports(named)) {
      for (const binding of named.elements)
        if (
          ["vi", "vitest"].includes((binding.propertyName ?? binding.name).text)
        )
          vitestHelpers.add(checker.getSymbolAtLocation(binding.name));
    }
    if (
      path !== "@novel-isr/ui" &&
      !path.startsWith("@novel-isr/ui/") &&
      path !== "minerva-design" &&
      !path.startsWith("minerva-design/")
    )
      continue;
    const nextPath = path
      .replace("@novel-isr/ui", "minerva-design")
      .replace(/\/styles\.css$/, "/style.css");
    const quote = statement.moduleSpecifier.getText(file)[0];
    replace(statement.moduleSpecifier, `${quote}${nextPath}${quote}`);
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings))
      for (const binding of bindings.elements) {
        const exported = (binding.propertyName ?? binding.name).text;
        imports.set(checker.getSymbolAtLocation(binding.name), exported);
        if (renamed[exported]) {
          if (binding.propertyName)
            replace(binding.propertyName, renamed[exported]);
          else
            replace(
              binding.name,
              `${renamed[exported]} as ${binding.name.text}`,
            );
        }
      }
  }
  const importedName = (node) => imports.get(checker.getSymbolAtLocation(node));
  function visit(node) {
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const module = node.arguments[0];
      const moduleCall =
        callee.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isPropertyAccessExpression(callee) &&
          vitestHelpers.has(checker.getSymbolAtLocation(callee.expression)) &&
          [
            "mock",
            "doMock",
            "unmock",
            "doUnmock",
            "importActual",
            "importMock",
          ].includes(callee.name.text));
      if (
        moduleCall &&
        module &&
        ts.isStringLiteral(module) &&
        (module.text === "@novel-isr/ui" ||
          module.text.startsWith("@novel-isr/ui/"))
      ) {
        const quote = module.getText(file)[0];
        replace(
          module,
          `${quote}${module.text.replace("@novel-isr/ui", "minerva-design").replace(/\/styles\.css$/, "/style.css")}${quote}`,
        );
      }
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const component = importedName(node.tagName);
      if (component) {
        const attributes = node.attributes.properties;
        const hasScheme = attributes.some(
          (p) => ts.isJsxAttribute(p) && p.name.getText(file) === "colorScheme",
        );
        const attribute = (name) =>
          attributes.find(
            (p) => ts.isJsxAttribute(p) && p.name.getText(file) === name,
          );
        const expression = (attr) =>
          attr?.initializer && ts.isJsxExpression(attr.initializer)
            ? attr.initializer.expression?.getText(file)
            : undefined;
        const pageHandler = attribute("onPageChange") ?? attribute("onChange");
        const sizeHandler = attribute("onPageSizeChange");
        if (component === "Pagination" && expression(sizeHandler)) {
          const onPage = expression(pageHandler);
          replace(
            sizeHandler,
            `onChange={(page, pageSize) => { (${expression(sizeHandler)})(pageSize); ${onPage ? `(${onPage})(page);` : ""} }}${attribute("showSizeChanger") ? "" : " showSizeChanger"}`,
          );
          if (pageHandler) replace(pageHandler, "");
        }
        const tooltipSide = attribute("side");
        const tooltipAlign = attribute("align");
        const staticPlacement =
          component === "Tooltip" &&
          tooltipSide?.initializer &&
          ts.isStringLiteral(tooltipSide.initializer) &&
          (!tooltipAlign ||
            (tooltipAlign.initializer &&
              ts.isStringLiteral(tooltipAlign.initializer)));
        for (const attr of attributes) {
          if (!ts.isJsxAttribute(attr)) {
            warn(
              attr,
              `${component}: review spread props against the new contract`,
            );
            continue;
          }
          const key = attr.name.getText(file);
          if (
            component === "Pagination" &&
            expression(sizeHandler) &&
            (attr === pageHandler || attr === sizeHandler)
          )
            continue;
          if (staticPlacement && attr === tooltipAlign) {
            replace(attr, "");
            continue;
          }
          if (staticPlacement && attr === tooltipSide) {
            const align = tooltipAlign?.initializer?.text;
            replace(
              attr,
              `placement="${tooltipSide.initializer.text}${align && align !== "center" ? `-${align}` : ""}"`,
            );
            continue;
          }
          if (key === "intent" && hasScheme) {
            replace(attr, "");
            continue;
          }
          let next = states[key] ?? key;
          if (
            ["colorScheme", "intent"].includes(key) ||
            (component === "Alert" && key === "status")
          )
            next = "color";
          if (
            ["Modal", "Drawer", "CommandDialog", "ConfirmDialog"].includes(
              component,
            ) &&
            key === "isOpen"
          )
            next = "open";
          if (
            component === "Checkbox" &&
            ["isInvalid", "invalid"].includes(key)
          )
            next = "error";
          if (
            ["Modal", "Drawer"].includes(component) &&
            key === "onClose" &&
            attr.initializer &&
            ts.isJsxExpression(attr.initializer) &&
            attr.initializer.expression
          ) {
            replace(
              attr,
              `onOpenChange={(open) => { if (!open) (${attr.initializer.expression.getText(file)})(); }}`,
            );
            continue;
          }
          if (
            key === "onValueChange" &&
            [
              "Select",
              "Tabs",
              "RadioGroup",
              "Autocomplete",
              "NumberInput",
              "TagInput",
            ].includes(component)
          )
            next = "onChange";
          if (
            key === "onCheckedChange" &&
            ["Switch", "Checkbox"].includes(component)
          )
            next = "onChange";
          if (component === "Tooltip" && key === "label") next = "content";
          if (
            ["TooltipProvider", "Tooltip"].includes(component) &&
            key === "delayDuration"
          )
            next = "enterDelay";
          if (component === "Tooltip" && key === "side" && !tooltipAlign)
            next = "placement";
          if (component === "Tooltip" && key === "tone")
            warn(
              attr,
              "Tooltip tone requires an explicit theme/color decision; use color/variant or contentClassName with tooltip CSS variables",
            );
          if (
            ["Popover", "PopoverContent", "Tooltip"].includes(component) &&
            key === "showArrow"
          )
            next = "arrow";
          if (component === "Pagination" && key === "page") next = "current";
          if (component === "Pagination" && key === "onPageChange")
            next = "onChange";
          if (component === "Button" && key === "leftIcon") next = "startIcon";
          if (component === "Button" && key === "rightIcon") next = "endIcon";
          if (component === "Textarea" && key === "resize") {
            replace(attr, "");
            continue;
          }
          if (next !== key) replace(attr.name, next);
          if (
            attr.initializer &&
            ts.isJsxExpression(attr.initializer) &&
            attr.initializer.expression &&
            ts.isConditionalExpression(attr.initializer.expression)
          ) {
            const rewriteValue = (expression) => {
              if (ts.isConditionalExpression(expression)) {
                rewriteValue(expression.whenTrue);
                rewriteValue(expression.whenFalse);
              } else if (ts.isStringLiteral(expression)) {
                const value =
                  next === "color"
                    ? (options.colorMappings?.[expression.text] ??
                      colors[expression.text])
                    : ["size", "padding"].includes(next)
                      ? sizes[expression.text]
                      : undefined;
                if (value) replace(expression, JSON.stringify(value));
              }
            };
            rewriteValue(attr.initializer.expression);
          }
          const literal =
            attr.initializer &&
            (ts.isStringLiteral(attr.initializer)
              ? attr.initializer
              : ts.isJsxExpression(attr.initializer) &&
                  attr.initializer.expression &&
                  ts.isStringLiteral(attr.initializer.expression)
                ? attr.initializer.expression
                : undefined);
          if (literal) {
            let value = literal.text;
            if (["size", "padding"].includes(next))
              value = sizes[value] ?? value;
            if (
              ["EmptyState", "Empty"].includes(component) &&
              next === "size" &&
              value === "compact"
            )
              value = "small";
            if (component === "RadioGroup" && next === "direction")
              value = { row: "horizontal", column: "vertical" }[value] ?? value;
            if (next === "color") {
              value = options.colorMappings?.[value] ?? colors[value] ?? value;
              if (["secondary", "accent"].includes(value))
                warn(
                  attr,
                  `color '${value}' needs an explicit product palette mapping`,
                );
            }
            if (value !== literal.text) replace(literal, JSON.stringify(value));
          }
          if (component === "Autocomplete" && key === "options")
            warn(
              attr,
              "AutoComplete options require id→value, hint→description, filterValue→filterOption and input props review",
            );
        }
      }
    }
    if (
      ts.isPropertyAccessExpression(node) &&
      node.name.text === "error" &&
      importedName(node.expression) === "toast"
    )
      replace(node.name, "danger");
    if (
      ts.isCallExpression(node) &&
      importedName(node.expression) === "confirm" &&
      node.arguments[0] &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      for (const property of node.arguments[0].properties) {
        if (
          ts.isPropertyAssignment(property) &&
          property.name.getText(file) === "intent"
        )
          replace(property.name, "color");
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  let result = source;
  let boundary = source.length + 1;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    if (edit.end > boundary)
      throw new Error(
        `Overlapping migration edits at ${fileName}:${edit.start}`,
      );
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
    boundary = edit.start;
  }
  return { source: result, warnings };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const write = process.argv.includes("--write");
  const directory = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
  if (!directory)
    throw new Error(
      "Usage: node tools/migrate-novel-ui.mjs <consumer/src> [--write]",
    );
  const walk = (path) =>
    readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
      if (["node_modules", ".git", "dist"].includes(entry.name)) return [];
      const child = resolve(path, entry.name);
      return entry.isDirectory() ? walk(child) : [child];
    });
  let changed = 0,
    review = 0;
  for (const path of walk(resolve(directory))) {
    if (![".ts", ".tsx"].includes(extname(path))) continue;
    const before = readFileSync(path, "utf8");
    const result = migrateSource(before, path);
    for (const warning of result.warnings) {
      console.warn(warning);
      review++;
    }
    if (result.source === before) continue;
    changed++;
    if (write) writeFileSync(path, result.source);
    console.log(`${write ? "Updated" : "Would update"} ${path}`);
  }
  console.log(
    `${changed} files; ${review} review items. Run consumer typecheck, build and behavior/visual regression after migration.`,
  );
}
