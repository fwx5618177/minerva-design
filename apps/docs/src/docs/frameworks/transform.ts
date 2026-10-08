// Deterministic transformer: Web Component demo (wc/<demo>.html + optional
// wc/<demo>.ts exporting `setup(root)`) -> the same demo written in the idiom
// of each framework (Vue SFC, Angular standalone component, Svelte 5
// component, Solid component, plain HTML + JS).
//
// Build-time only: it runs in Node (Vite plugin `wcFrameworksPlugin`, unit
// tests) and uses the TypeScript compiler API; it is never shipped to the
// browser.
//
// How a demo script is read (see README of the docs site / docs.md):
// - `const x = root.querySelector<T>("#id")!` -> an element reference
//   (template ref) on the element matched in the HTML
// - `x.addEventListener("evt", handler[, capture])` -> an event binding in
//   the template; the matching `removeEventListener` of the cleanup is
//   dropped (the framework removes template listeners itself)
// - `x.prop = value` at the top level of setup -> a property binding
// - an element only used through `.textContent` (or `.value` of an
//   <output>) -> reactive text state rendered in the template
// - other declarations -> component state / functions; other statements ->
//   the mount hook; the rest of the returned cleanup -> the unmount hook.
// Anything the rules cannot express keeps the original setup function,
// called on mount with a container ref (`imperative` fallback).
import ts from "typescript";
import {
  VOID_ELEMENTS,
  decodeEntities,
  getAttr,
  parseHtml,
  plainText,
  querySimple,
  type HtmlElement,
  type HtmlNode,
} from "./html.ts";

import type { WcFrameworkId } from "./index.ts";

/** Source dialects generated for every Web Component demo */
export const WC_FRAMEWORKS: readonly WcFrameworkId[] = [
  "vue",
  "angular",
  "svelte",
  "solid",
  "html",
];
export type WcFramework = WcFrameworkId;
export type WcFrameworkSources = Record<WcFramework, string>;

export interface WcDemoInput {
  /** Page id (`menu`) */
  page: string;
  /** Demo id (`basic`) */
  demo: string;
  /** wc/<demo>.html */
  html: string;
  /** wc/<demo>.ts (exports `setup(root)`) */
  script?: string;
}

export interface WcTransformResult {
  sources: WcFrameworkSources;
  /** Frameworks rendered with the `imperative` fallback, and why */
  fallbacks: Partial<Record<WcFramework, string>>;
}

// ---------------------------------------------------------------- helpers

const pascal = (value: string) =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");

const camel = (value: string) => {
  const p = pascal(value);
  return p ? p[0].toLowerCase() + p.slice(1) : p;
};

const isFunctionLike = (node: ts.Node) =>
  ts.isArrowFunction(node) ||
  ts.isFunctionExpression(node) ||
  ts.isFunctionDeclaration(node) ||
  ts.isMethodDeclaration(node) ||
  ts.isGetAccessor(node) ||
  ts.isSetAccessor(node) ||
  ts.isClassLike(node);

/** Strips `!`, `as T`, `<T>x` and parentheses */
const unwrap = (node: ts.Expression): ts.Expression => {
  let current = node;
  for (;;) {
    if (
      ts.isNonNullExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isSatisfiesExpression(current)
    ) {
      current = current.expression;
    } else return current;
  }
};

class Fallback extends Error {}

// --------------------------------------------------------------- analysis

interface RefInfo {
  symbol: ts.Symbol;
  /** Variable name in the demo script (`menu`); the template ref name */
  name: string;
  element: HtmlElement;
  /** Element type (`HTMLElement & { hide(): void }`) */
  type: string;
  nonNull: boolean;
  declaration: ts.VariableStatement;
  /** `const { toast } = root.querySelector(...)` destructured names */
  aliases: Map<ts.Symbol, string>;
}

interface ListenerOptions {
  capture: boolean;
  once: boolean;
  passive: boolean;
}

interface ListenerInfo {
  statement: ts.ExpressionStatement;
  /** Target ref, `null` for the setup root (container) */
  target: RefInfo | null;
  event: string;
  handler:
    | { kind: "name"; name: string; symbol: ts.Symbol | undefined }
    | { kind: "inline"; node: ts.Expression };
  options: ListenerOptions;
}

interface TextState {
  ref: RefInfo;
  /** State name (`resultText`) */
  name: string;
  initial: string;
  /** `textContent` or `value` (<output>) */
  property: string;
}

type SetupItem =
  | { kind: "ref"; ref: RefInfo }
  | { kind: "listener"; listener: ListenerInfo; handlerName: string }
  | {
      kind: "prop";
      statement: ts.ExpressionStatement;
      /** Element the property is bound on */
      element: HtmlElement;
      prop: string;
      value: ts.Expression;
      name: string;
    }
  | { kind: "member"; statement: ts.Statement }
  | {
      /** Declared as a member, computed on mount (`items = [...]`) */
      kind: "deferred";
      statement: ts.VariableStatement;
      name: string;
      type: string;
      value: ts.Expression;
    }
  | { kind: "mount"; statement: ts.Statement };

interface Analysis {
  sf: ts.SourceFile;
  text: string;
  checker: ts.TypeChecker;
  header: string;
  moduleStatements: ts.Statement[];
  setup: ts.FunctionDeclaration;
  rootSymbol: ts.Symbol;
  rootName: string;
  refs: RefInfo[];
  items: SetupItem[];
  textStates: Map<RefInfo, TextState>;
  /** Statements (or the expression) of the returned cleanup */
  cleanup: ts.Node[];
  /** Removes of the template-bound listeners (dropped) */
  liftedRemoves: Set<ts.Node>;
  /** Names declared at the top level of setup (component members) */
  memberSymbols: Map<ts.Symbol, string>;
  /** The setup root is referenced (container ref needed) */
  rootUsed: boolean;
  /** Generated names in use */
  names: Set<string>;
}

function createChecker(fileName: string, text: string) {
  const options: ts.CompilerOptions = {
    noLib: true,
    noResolve: true,
    target: ts.ScriptTarget.ES2022,
    types: [],
  };
  const sf = ts.createSourceFile(
    fileName,
    text,
    ts.ScriptTarget.ES2022,
    true,
    ts.ScriptKind.TS,
  );
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (name) => (name === fileName ? sf : undefined);
  host.fileExists = (name) => name === fileName;
  host.readFile = (name) => (name === fileName ? text : undefined);
  host.writeFile = () => {};
  const program = ts.createProgram({ rootNames: [fileName], options, host });
  return { sf, checker: program.getTypeChecker() };
}

/** Symbol an identifier refers to (shorthand properties included) */
const symbolOf = (checker: ts.TypeChecker, id: ts.Identifier) => {
  if (ts.isShorthandPropertyAssignment(id.parent) && id.parent.name === id) {
    return checker.getShorthandAssignmentValueSymbol(id.parent);
  }
  return checker.getSymbolAtLocation(id);
};

/** Identifier is a reference (not a declaration name / property name) */
const isReference = (id: ts.Identifier) => {
  const parent = id.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.name === id) return false;
  if (ts.isPropertyAssignment(parent) && parent.name === id) return false;
  if (
    (ts.isVariableDeclaration(parent) ||
      ts.isParameter(parent) ||
      ts.isFunctionDeclaration(parent) ||
      ts.isBindingElement(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isMethodSignature(parent) ||
      ts.isPropertyDeclaration(parent) ||
      ts.isTypeAliasDeclaration(parent) ||
      ts.isInterfaceDeclaration(parent) ||
      ts.isFunctionExpression(parent)) &&
    (parent as ts.NamedDeclaration).name === id
  ) {
    return false;
  }
  if (ts.isBindingElement(parent) && parent.propertyName === id) return false;
  if (ts.isQualifiedName(parent) || ts.isTypeReferenceNode(parent))
    return false;
  if (ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent))
    return false;
  return true;
};

/** Visits the identifiers of a node; `deep` enters nested functions */
function forEachIdentifier(
  node: ts.Node,
  visit: (id: ts.Identifier) => void,
  deep = true,
) {
  const walk = (n: ts.Node) => {
    if (ts.isIdentifier(n)) {
      if (isReference(n)) visit(n);
      return;
    }
    if (!deep && n !== node && isFunctionLike(n)) return;
    if (ts.isTypeNode(n)) return;
    n.forEachChild(walk);
  };
  walk(node);
}

interface QueryCall {
  selector: string;
  type: string;
  nonNull: boolean;
}

function readQuery(
  expr: ts.Expression | undefined,
  rootSymbol: ts.Symbol,
  checker: ts.TypeChecker,
  sf: ts.SourceFile,
): QueryCall | null {
  if (!expr) return null;
  let nonNull = false;
  let castType: string | undefined;
  let current = expr;
  for (;;) {
    if (ts.isNonNullExpression(current)) {
      nonNull = true;
      current = current.expression;
    } else if (ts.isAsExpression(current)) {
      castType ??= current.type.getText(sf);
      current = current.expression;
    } else if (ts.isParenthesizedExpression(current)) {
      current = current.expression;
    } else break;
  }
  if (
    !ts.isCallExpression(current) ||
    !ts.isPropertyAccessExpression(current.expression) ||
    current.expression.name.text !== "querySelector" ||
    !ts.isIdentifier(current.expression.expression) ||
    checker.getSymbolAtLocation(current.expression.expression) !== rootSymbol ||
    current.arguments.length !== 1 ||
    !ts.isStringLiteralLike(current.arguments[0])
  ) {
    return null;
  }
  const typeArg = current.typeArguments?.[0]?.getText(sf);
  return {
    selector: current.arguments[0].text,
    type: castType ?? typeArg ?? "HTMLElement",
    nonNull,
  };
}

const readOptions = (
  arg: ts.Expression | undefined,
): ListenerOptions | null => {
  const none = { capture: false, once: false, passive: false };
  if (!arg) return none;
  if (arg.kind === ts.SyntaxKind.TrueKeyword) return { ...none, capture: true };
  if (arg.kind === ts.SyntaxKind.FalseKeyword) return none;
  if (!ts.isObjectLiteralExpression(arg)) return null;
  const options = { ...none };
  for (const prop of arg.properties) {
    if (
      !ts.isPropertyAssignment(prop) ||
      !ts.isIdentifier(prop.name) ||
      !(prop.name.text in options)
    ) {
      return null;
    }
    if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
      options[prop.name.text as keyof ListenerOptions] = true;
    } else if (prop.initializer.kind !== ts.SyntaxKind.FalseKeyword) {
      return null;
    }
  }
  return options;
};

/** Type of `[Array.from(] x.querySelectorAll<T>(...) [)]` */
function listType(expr: ts.Expression, sf: ts.SourceFile): string | undefined {
  const query = (node: ts.Expression) => {
    const call = unwrap(node);
    if (
      ts.isCallExpression(call) &&
      ts.isPropertyAccessExpression(call.expression) &&
      call.expression.name.text === "querySelectorAll"
    ) {
      return call.typeArguments?.[0]?.getText(sf) ?? "Element";
    }
    return undefined;
  };
  const value = unwrap(expr);
  if (
    ts.isCallExpression(value) &&
    value.expression.getText(sf) === "Array.from" &&
    value.arguments.length === 1
  ) {
    const item = query(value.arguments[0]);
    return item && `${item}[]`;
  }
  if (
    ts.isArrayLiteralExpression(value) &&
    value.elements.length === 1 &&
    ts.isSpreadElement(value.elements[0])
  ) {
    const item = query(value.elements[0].expression);
    return item && `${item}[]`;
  }
  const item = query(value);
  return item && `NodeListOf<${item}>`;
}

function analyze(input: WcDemoInput, nodes: HtmlNode[]): Analysis {
  const text = input.script!;
  const fileName = `/${input.page}/${input.demo}.ts`;
  const { sf, checker } = createChecker(fileName, text);

  const setup = sf.statements.find(
    (s): s is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(s) && s.name?.text === "setup" && !!s.body,
  );
  if (!setup?.body) throw new Fallback("no setup function");
  const rootParam = setup.parameters[0];
  if (!rootParam || !ts.isIdentifier(rootParam.name)) {
    throw new Fallback("setup has no root parameter");
  }
  const rootSymbol = checker.getSymbolAtLocation(rootParam.name)!;
  const rootName = rootParam.name.text;

  // Leading comment of the file (or of setup) explains the demo
  const firstStatement = sf.statements[0];
  const header = text
    .slice(firstStatement.getFullStart(), firstStatement.getStart(sf))
    .trim();
  const moduleStatements = sf.statements.filter((s) => s !== setup);

  const names = new Set<string>();
  sf.forEachChild(function collect(n) {
    if (ts.isIdentifier(n)) names.add(n.text);
    n.forEachChild(collect);
  });
  const unique = (base: string) => {
    let name = base;
    for (let i = 2; names.has(name); i++) name = `${base}${i}`;
    names.add(name);
    return name;
  };

  const body = [...setup.body.statements];
  let cleanup: ts.Node[] = [];
  const last = body[body.length - 1];
  if (last && ts.isReturnStatement(last)) {
    body.pop();
    const value = last.expression && unwrap(last.expression);
    if (value && ts.isArrowFunction(value)) {
      // a block body gives statements, an expression body one expression
      cleanup = ts.isBlock(value.body)
        ? [...value.body.statements]
        : [value.body];
    } else if (value) {
      throw new Fallback("setup returns a value that is not an arrow function");
    }
  }
  const containsReturn = (n: ts.Node): boolean =>
    ts.isReturnStatement(n) ||
    (!isFunctionLike(n) &&
      !!n.forEachChild((c) => containsReturn(c) || undefined));
  if (body.some(containsReturn)) {
    throw new Fallback("early return in setup");
  }

  // 1. element references
  const refs: RefInfo[] = [];
  const refBySymbol = new Map<ts.Symbol, RefInfo>();
  const usedElements = new Set<HtmlElement>();
  const items: SetupItem[] = [];
  for (const statement of body) {
    if (!ts.isVariableStatement(statement)) continue;
    const list = statement.declarationList.declarations;
    if (list.length !== 1) continue;
    const decl = list[0];
    const query = readQuery(decl.initializer, rootSymbol, checker, sf);
    if (!query) continue;
    const element = querySimple(nodes, query.selector);
    if (!element) {
      throw new Fallback(`selector ${query.selector} matches no element`);
    }
    if (usedElements.has(element)) {
      throw new Fallback(`element ${query.selector} is queried twice`);
    }
    usedElements.add(element);
    let ref: RefInfo;
    if (ts.isIdentifier(decl.name)) {
      ref = {
        symbol: checker.getSymbolAtLocation(decl.name)!,
        name: decl.name.text,
        element,
        type: decl.type?.getText(sf) ?? query.type,
        nonNull: query.nonNull,
        declaration: statement,
        aliases: new Map(),
      };
    } else if (ts.isObjectBindingPattern(decl.name)) {
      const id = getAttr(element, "id")?.value;
      const aliases = new Map<ts.Symbol, string>();
      for (const binding of decl.name.elements) {
        if (
          binding.dotDotDotToken ||
          binding.initializer ||
          !ts.isIdentifier(binding.name) ||
          (binding.propertyName && !ts.isIdentifier(binding.propertyName))
        ) {
          throw new Fallback("unsupported destructuring of an element");
        }
        const prop = (binding.propertyName as ts.Identifier | undefined)?.text;
        aliases.set(
          checker.getSymbolAtLocation(binding.name)!,
          prop ?? binding.name.text,
        );
      }
      ref = {
        // a synthetic symbol: the destructuring has no name of its own
        symbol: {} as ts.Symbol,
        name: unique(camel(id ?? element.name)),
        element,
        type: query.type,
        nonNull: query.nonNull,
        declaration: statement,
        aliases,
      };
    } else {
      throw new Fallback("unsupported element declaration");
    }
    refs.push(ref);
    refBySymbol.set(ref.symbol, ref);
  }
  const aliasOwner = new Map<ts.Symbol, RefInfo>();
  for (const ref of refs) {
    for (const symbol of ref.aliases.keys()) aliasOwner.set(symbol, ref);
  }

  const refOf = (expr: ts.Expression): RefInfo | null | undefined => {
    const target = unwrap(expr);
    if (!ts.isIdentifier(target)) return undefined;
    const symbol = checker.getSymbolAtLocation(target);
    if (symbol === rootSymbol) return null;
    return symbol ? refBySymbol.get(symbol) : undefined;
  };

  // 2. listeners, property assignments, members, mount statements
  const listeners: ListenerInfo[] = [];
  const memberSymbols = new Map<ts.Symbol, string>();
  const mountSymbols = new Set<ts.Symbol>();
  /**
   * The code reads the DOM (elements, root, values computed on mount) or
   * calls a function of setup as soon as it runs: it must run on mount. A
   * function is lazy (it runs later, from an event or the mount hook).
   */
  const memberFunctions = new Map<ts.Symbol, ts.Node>();
  const calling = new Set<ts.Symbol>();
  const isEager = (node: ts.Node): boolean => {
    if (isFunctionLike(node)) return false;
    if (ts.isVariableStatement(node)) {
      return node.declarationList.declarations.some(
        (d) => !!d.initializer && isEager(d.initializer),
      );
    }
    let eager = false;
    const visit = (n: ts.Node) => {
      if (eager || ts.isTypeNode(n)) return;
      if (ts.isIdentifier(n)) {
        if (!isReference(n)) return;
        const symbol = symbolOf(checker, n);
        if (
          symbol &&
          (symbol === rootSymbol ||
            refBySymbol.has(symbol) ||
            aliasOwner.has(symbol) ||
            mountSymbols.has(symbol))
        ) {
          eager = true;
        }
        return;
      }
      // calling a function of setup reads the DOM if its body does
      if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
        const symbol = checker.getSymbolAtLocation(n.expression);
        if (symbol && memberSymbols.has(symbol)) {
          const body = memberFunctions.get(symbol);
          if (!body || calling.has(symbol)) eager = true;
          else {
            calling.add(symbol);
            if (isEager(body)) eager = true;
            calling.delete(symbol);
          }
        }
      }
      n.forEachChild(visit);
    };
    visit(node);
    return eager;
  };
  const declaredSymbols = (statement: ts.Statement) => {
    const symbols: [ts.Symbol, string][] = [];
    const addName = (name: ts.BindingName) => {
      if (ts.isIdentifier(name)) {
        symbols.push([checker.getSymbolAtLocation(name)!, name.text]);
      } else {
        for (const element of name.elements) {
          if (!ts.isOmittedExpression(element)) addName(element.name);
        }
      }
    };
    if (ts.isVariableStatement(statement)) {
      statement.declarationList.declarations.forEach((d) => addName(d.name));
    } else if (ts.isFunctionDeclaration(statement) && statement.name) {
      addName(statement.name);
    }
    return symbols;
  };

  for (const statement of body) {
    const ref = refs.find((r) => r.declaration === statement);
    if (ref) {
      items.push({ kind: "ref", ref });
      continue;
    }
    if (ts.isExpressionStatement(statement)) {
      const expr = statement.expression;
      // x.addEventListener("evt", handler, options?)
      if (
        ts.isCallExpression(expr) &&
        ts.isPropertyAccessExpression(expr.expression) &&
        expr.expression.name.text === "addEventListener" &&
        expr.arguments.length >= 2 &&
        ts.isStringLiteralLike(expr.arguments[0])
      ) {
        const target = refOf(expr.expression.expression);
        const options = readOptions(expr.arguments[2]);
        const handlerExpr = expr.arguments[1];
        if (target !== undefined && options) {
          let handler: ListenerInfo["handler"] | null = null;
          if (ts.isIdentifier(handlerExpr)) {
            const symbol = checker.getSymbolAtLocation(handlerExpr);
            if (!symbol || !mountSymbols.has(symbol)) {
              handler = { kind: "name", name: handlerExpr.text, symbol };
            }
          } else if (
            ts.isArrowFunction(handlerExpr) ||
            ts.isFunctionExpression(handlerExpr)
          ) {
            handler = { kind: "inline", node: handlerExpr };
          }
          if (handler) {
            const listener: ListenerInfo = {
              statement,
              target,
              event: expr.arguments[0].text,
              handler,
              options,
            };
            listeners.push(listener);
            const handlerName =
              handler.kind === "name"
                ? handler.name
                : unique(
                    `on${pascal(target ? target.name : "")}${pascal(listener.event)}`,
                  );
            items.push({ kind: "listener", listener, handlerName });
            continue;
          }
        }
      }
      // x.prop = value
      if (
        ts.isBinaryExpression(expr) &&
        expr.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isPropertyAccessExpression(expr.left) &&
        ts.isIdentifier(expr.left.name)
      ) {
        // a ref, or `root.querySelector("#id")!` used once
        const ref = refOf(expr.left.expression);
        const query = !ref
          ? readQuery(expr.left.expression, rootSymbol, checker, sf)
          : null;
        const queried = query ? querySimple(nodes, query.selector) : undefined;
        const element = ref ? ref.element : queried;
        const base = ref
          ? ref.name
          : camel(
              (queried && getAttr(queried, "id")?.value) ?? queried?.name ?? "",
            );
        const prop = expr.left.name.text;
        if (
          element &&
          !["textContent", "innerHTML", "innerText", "className"].includes(
            prop,
          ) &&
          !isEager(expr.right) &&
          !items.some(
            (item) =>
              item.kind === "prop" &&
              item.element === element &&
              item.prop === prop,
          )
        ) {
          items.push({
            kind: "prop",
            statement,
            element,
            prop,
            value: expr.right,
            name: unique(`${base}${pascal(prop)}`),
          });
          continue;
        }
      }
    }
    if (
      (ts.isVariableStatement(statement) ||
        ts.isFunctionDeclaration(statement)) &&
      !isEager(statement)
    ) {
      for (const [symbol, name] of declaredSymbols(statement)) {
        memberSymbols.set(symbol, name);
      }
      // bodies of the functions, to know what calling them reads
      const fn = ts.isFunctionDeclaration(statement)
        ? statement
        : statement.declarationList.declarations.length === 1
          ? statement.declarationList.declarations[0].initializer
          : undefined;
      const name = ts.isFunctionDeclaration(statement)
        ? statement.name
        : statement.declarationList.declarations[0]?.name;
      if (
        fn &&
        name &&
        ts.isIdentifier(name) &&
        (ts.isFunctionDeclaration(fn) ||
          ts.isArrowFunction(fn) ||
          ts.isFunctionExpression(fn)) &&
        fn.body
      ) {
        memberFunctions.set(checker.getSymbolAtLocation(name)!, fn.body);
      }
      items.push({ kind: "member", statement });
      continue;
    }
    // `const items = Array.from(root.querySelectorAll<T>(...))`: a member
    // of a known type, assigned on mount
    if (
      ts.isVariableStatement(statement) &&
      statement.declarationList.declarations.length === 1
    ) {
      const decl = statement.declarationList.declarations[0];
      const type =
        decl.initializer &&
        (decl.type?.getText(sf) ?? listType(decl.initializer, sf));
      if (ts.isIdentifier(decl.name) && decl.initializer && type) {
        memberSymbols.set(
          checker.getSymbolAtLocation(decl.name)!,
          decl.name.text,
        );
        items.push({
          kind: "deferred",
          statement,
          name: decl.name.text,
          type,
          value: decl.initializer,
        });
        continue;
      }
    }
    for (const [symbol] of declaredSymbols(statement)) mountSymbols.add(symbol);
    items.push({ kind: "mount", statement });
  }

  // Mount-only names must stay in the mount hook
  const outsideMount = items
    .filter(
      (item) =>
        item.kind !== "mount" &&
        item.kind !== "ref" &&
        item.kind !== "deferred",
    )
    .map((item): ts.Node | undefined =>
      item.kind === "listener"
        ? item.listener.handler.kind === "inline"
          ? item.listener.handler.node
          : undefined
        : item.kind === "prop"
          ? item.value
          : item.statement,
    )
    .filter((n): n is ts.Node => !!n);
  for (const n of [...outsideMount, ...cleanup]) {
    forEachIdentifier(n, (id) => {
      const symbol = symbolOf(checker, id);
      if (symbol && mountSymbols.has(symbol)) {
        throw new Fallback(
          `"${id.text}" is computed on mount and used elsewhere`,
        );
      }
    });
  }

  // Removes of the listeners bound in the template
  const liftedRemoves = new Set<ts.Node>();
  for (const statement of cleanup) {
    const expr = ts.isExpressionStatement(statement)
      ? statement.expression
      : statement;
    if (
      !ts.isCallExpression(expr) ||
      !ts.isPropertyAccessExpression(expr.expression) ||
      expr.expression.name.text !== "removeEventListener" ||
      !ts.isStringLiteralLike(expr.arguments[0] ?? ts.factory.createTrue()) ||
      !ts.isIdentifier(expr.arguments[1] ?? ts.factory.createTrue())
    ) {
      continue;
    }
    const target = refOf(expr.expression.expression);
    const event = (expr.arguments[0] as ts.StringLiteral).text;
    const handler = (expr.arguments[1] as ts.Identifier).text;
    if (
      listeners.some(
        (l) =>
          l.target === target &&
          l.event === event &&
          l.handler.kind === "name" &&
          l.handler.name === handler,
      )
    ) {
      liftedRemoves.add(statement);
    }
  }

  // 3. elements only used for their text -> text state
  const usage = new Map<RefInfo, ts.Identifier[]>();
  // statements turned into template bindings -> the parts still emitted
  const skip = new Map<ts.Node, ts.Node[]>([
    ...refs.map((r) => [r.declaration, []] as [ts.Node, ts.Node[]]),
    ...items.flatMap((item): [ts.Node, ts.Node[]][] =>
      item.kind === "listener"
        ? [
            [
              item.listener.statement,
              item.listener.handler.kind === "inline"
                ? [item.listener.handler.node]
                : [],
            ],
          ]
        : item.kind === "prop"
          ? [[item.statement, [item.value]]]
          : [],
    ),
    ...[...liftedRemoves].map((n) => [n, []] as [ts.Node, ts.Node[]]),
  ]);
  let rootUsed = false;
  const scan = (n: ts.Node) => {
    const kept = skip.get(n);
    if (kept) {
      kept.forEach(scan);
      return;
    }
    if (ts.isIdentifier(n)) {
      if (!isReference(n)) return;
      const symbol = symbolOf(checker, n);
      if (symbol === rootSymbol) rootUsed = true;
      const ref = symbol && refBySymbol.get(symbol);
      if (ref) usage.set(ref, [...(usage.get(ref) ?? []), n]);
      return;
    }
    if (ts.isTypeNode(n)) return;
    n.forEachChild(scan);
  };
  body.forEach(scan);
  cleanup.forEach(scan);
  // root listeners are bound on the container
  if (listeners.some((l) => l.target === null)) rootUsed = true;
  for (const ref of refs) {
    if (rootUsed && ref.name === rootName) {
      throw new Fallback("an element ref is named like the root");
    }
  }

  const textStates = new Map<RefInfo, TextState>();
  for (const ref of refs) {
    const uses = usage.get(ref) ?? [];
    if (!uses.length || ref.aliases.size) continue;
    const initial = plainText(ref.element);
    if (initial === null) continue;
    const props = new Set(
      uses.map((id) =>
        ts.isPropertyAccessExpression(id.parent) && id.parent.expression === id
          ? id.parent.name.text
          : "",
      ),
    );
    const property = [...props][0];
    const allowed =
      property === "textContent" ||
      (property === "value" && ref.element.name === "output");
    if (props.size !== 1 || !allowed) continue;
    // `x.textContent` must be read or assigned (not passed around)
    textStates.set(ref, {
      ref,
      name: unique(`${ref.name}Text`),
      initial,
      property,
    });
  }

  return {
    sf,
    text,
    checker,
    header,
    moduleStatements,
    setup,
    rootSymbol,
    rootName,
    refs,
    items,
    textStates,
    cleanup,
    liftedRemoves,
    memberSymbols,
    rootUsed,
    names,
  };
}

// ---------------------------------------------------------------- emitting

interface Dialect {
  id: Exclude<WcFramework, "html">;
  /** Expression reaching a ref's element */
  ref(ref: RefInfo): string;
  /** Expression reaching the container (setup root) */
  root(): string;
  /** Reads a text state */
  readText(state: TextState): string;
  /** Writes a text state (`op` is `=`, `+=`...) */
  writeText(state: TextState, op: string, value: string): string;
  /** Reference to a component member (Angular: `this.x`) */
  member(name: string): string;
}

const dialects = (rootName: string): Record<Dialect["id"], Dialect> => ({
  vue: {
    id: "vue",
    ref: (ref) => `${ref.name}.value${ref.nonNull ? "!" : ""}`,
    root: () => `${rootName}.value!`,
    readText: (s) => `${s.name}.value`,
    writeText: (s, op, value) => `${s.name}.value ${op} ${value}`,
    member: (name) => name,
  },
  angular: {
    id: "angular",
    ref: (ref) => `this.${ref.name}.nativeElement`,
    root: () => `this.${rootName}.nativeElement`,
    readText: (s) => `this.${s.name}`,
    writeText: (s, op, value) => `this.${s.name} ${op} ${value}`,
    member: (name) => `this.${name}`,
  },
  svelte: {
    id: "svelte",
    ref: (ref) => ref.name,
    root: () => rootName,
    readText: (s) => s.name,
    writeText: (s, op, value) => `${s.name} ${op} ${value}`,
    member: (name) => name,
  },
  solid: {
    id: "solid",
    ref: (ref) => ref.name,
    root: () => rootName,
    readText: (s) => `${s.name}()`,
    writeText: (s, op, value) =>
      op === "="
        ? `set${pascal(s.name)}(${value})`
        : `set${pascal(s.name)}((current) => current ${op.slice(0, -1)} (${value}))`,
    member: (name) => name,
  },
});

/** Source text of a node with the references rewritten for a dialect */
function printer(a: Analysis, dialect: Dialect) {
  const { sf, text, checker } = a;
  const refBySymbol = new Map(a.refs.map((r) => [r.symbol, r]));
  const aliasOwner = new Map<ts.Symbol, [RefInfo, string]>();
  for (const ref of a.refs) {
    for (const [symbol, prop] of ref.aliases)
      aliasOwner.set(symbol, [ref, prop]);
  }
  const textByRef = a.textStates;

  const replacement = (node: ts.Node): string | undefined => {
    // text state: x.textContent (read) / x.textContent = v (write)
    if (
      ts.isBinaryExpression(node) &&
      ts.isPropertyAccessExpression(node.left)
    ) {
      const op = node.operatorToken.getText(sf);
      const state = textStateOf(node.left);
      if (state && /^(\+|-)?=$/.test(op)) {
        return dialect.writeText(state, op, print(node.right));
      }
    }
    if (ts.isPropertyAccessExpression(node)) {
      const state = textStateOf(node);
      if (state) return dialect.readText(state);
    }
    if (ts.isIdentifier(node) && isReference(node)) {
      const symbol = symbolOf(checker, node);
      if (!symbol) return undefined;
      const shorthand =
        ts.isShorthandPropertyAssignment(node.parent) &&
        node.parent.name === node;
      const wrap = (value: string) =>
        shorthand ? `${node.text}: ${value}` : value;
      if (symbol === a.rootSymbol) return wrap(dialect.root());
      const ref = refBySymbol.get(symbol);
      if (ref) return wrap(dialect.ref(ref));
      const alias = aliasOwner.get(symbol);
      if (alias) return wrap(`${dialect.ref(alias[0])}.${alias[1]}`);
      const member = a.memberSymbols.get(symbol);
      if (member && dialect.id === "angular") {
        return wrap(dialect.member(member));
      }
    }
    return undefined;
  };

  const textStateOf = (node: ts.PropertyAccessExpression) => {
    if (!ts.isIdentifier(node.expression)) return undefined;
    const symbol = checker.getSymbolAtLocation(node.expression);
    const ref = symbol && refBySymbol.get(symbol);
    const state = ref && textByRef.get(ref);
    return state && state.property === node.name.text ? state : undefined;
  };

  const print = (node: ts.Node, start = node.getStart(sf)): string => {
    const replaced = replacement(node);
    if (replaced !== undefined) return replaced;
    let out = "";
    let pos = start;
    node.forEachChild((child) => {
      const childStart = child.getStart(sf);
      if (childStart < pos) return; // synthetic / JSDoc
      out += text.slice(pos, childStart);
      out += print(child);
      pos = child.end;
    });
    return out + text.slice(pos, node.end);
  };

  /** Leading comments of a statement (blank lines collapsed) */
  const leading = (node: ts.Node) => {
    const trivia = text.slice(node.getFullStart(), node.getStart(sf));
    const comments = trivia.trim();
    const blank = /\n\s*\n/.test(trivia) ? "\n" : "";
    return comments ? `${blank}${comments}\n` : blank;
  };

  return { print, leading };
}

interface Plan {
  ref?: string;
  events: {
    event: string;
    handler: string;
    options: ListenerOptions;
  }[];
  props: { prop: string; name: string }[];
  text?: TextState;
}

interface Component {
  /** Statements of the component body (Vue / Svelte / Solid) */
  imports: Set<string>;
  plans: Map<HtmlElement | null, Plan>;
  /** Code blocks, in order */
  members: string[];
  mount: string[];
  cleanup: string[];
  /** Refs declared (name -> type) */
  refs: { name: string; type: string }[];
  texts: TextState[];
}

/** Listener options a dialect can express in the template */
const supportsOptions = (dialect: Dialect["id"], o: ListenerOptions) => {
  if (!o.capture && !o.once && !o.passive) return true;
  if (dialect === "vue") return true;
  if (dialect === "angular") return false;
  return !o.once && !o.passive; // svelte / solid: capture only
};

function buildComponent(a: Analysis, dialect: Dialect): Component {
  const { print, leading } = printer(a, dialect);
  const plans = new Map<HtmlElement | null, Plan>();
  const plan = (el: HtmlElement | null) => {
    let p = plans.get(el);
    if (!p) plans.set(el, (p = { events: [], props: [] }));
    return p;
  };
  const component: Component = {
    imports: new Set(),
    plans,
    members: [],
    mount: [],
    cleanup: [],
    refs: [],
    texts: [...a.textStates.values()],
  };
  for (const state of component.texts) plan(state.ref.element).text = state;

  // which refs are still needed as element references
  const needed = new Set<RefInfo>();
  const markRefs = (node: ts.Node) =>
    forEachIdentifier(node, (id) => {
      const symbol = symbolOf(a.checker, id);
      const ref = a.refs.find(
        (r) => r.symbol === symbol || (symbol && r.aliases.has(symbol)),
      );
      if (!ref) return;
      const state = a.textStates.get(ref);
      const parent = id.parent;
      if (
        state &&
        ts.isPropertyAccessExpression(parent) &&
        parent.name.text === state.property
      ) {
        return;
      }
      needed.add(ref);
    });

  const unsupported = new Set<ListenerInfo>();
  for (const item of a.items) {
    if (item.kind === "listener") {
      if (!supportsOptions(dialect.id, item.listener.options)) {
        unsupported.add(item.listener);
        if (item.listener.target) needed.add(item.listener.target);
      }
      if (item.listener.handler.kind === "inline") {
        markRefs(item.listener.handler.node);
      }
    } else if (item.kind === "prop") markRefs(item.value);
    else if (item.kind === "member" || item.kind === "mount") {
      markRefs(item.statement);
    } else if (item.kind === "deferred") markRefs(item.value);
  }
  for (const statement of a.cleanup) {
    if (!a.liftedRemoves.has(statement)) markRefs(statement);
  }
  // removes of listeners that stay imperative stay in the cleanup
  const keptRemoves = new Set<ts.Node>();
  for (const statement of a.liftedRemoves) {
    const expr = (
      ts.isExpressionStatement(statement) ? statement.expression : statement
    ) as ts.CallExpression;
    const event = (expr.arguments[0] as ts.StringLiteral).text;
    const handler = (expr.arguments[1] as ts.Identifier).text;
    for (const listener of unsupported) {
      if (
        listener.event === event &&
        listener.handler.kind === "name" &&
        listener.handler.name === handler
      ) {
        keptRemoves.add(statement);
      }
    }
  }

  for (const ref of a.refs) {
    if (!needed.has(ref)) continue;
    plan(ref.element).ref = ref.name;
    component.refs.push({ name: ref.name, type: ref.type });
  }
  if (a.rootUsed) {
    plan(null).ref = a.rootName;
    component.refs.unshift({ name: a.rootName, type: "HTMLElement" });
  }

  for (const item of a.items) {
    switch (item.kind) {
      case "ref":
        break;
      case "listener": {
        const { listener, handlerName } = item;
        if (listener.handler.kind === "inline") {
          component.members.push(
            `${leading(listener.statement)}${declare(dialect, handlerName, print(listener.handler.node))}`,
          );
        }
        if (unsupported.has(listener)) {
          if (listener.handler.kind === "inline") {
            // the handler became a member: reference it by name
            const call = listener.statement.expression as ts.CallExpression;
            const target = print(
              (call.expression as ts.PropertyAccessExpression).expression,
            );
            const rest = call.arguments
              .slice(2)
              .map((arg) => `, ${print(arg)}`)
              .join("");
            component.mount.push(
              `${target}.addEventListener(${JSON.stringify(listener.event)}, ${dialect.member(handlerName)}${rest});`,
            );
          } else {
            component.mount.push(
              `${leading(listener.statement)}${print(listener.statement)}`,
            );
          }
        } else {
          const target = listener.target ? listener.target.element : null;
          plan(target).events.push({
            event: listener.event,
            handler: handlerName,
            options: listener.options,
          });
        }
        break;
      }
      case "prop": {
        component.members.push(
          `${leading(item.statement)}${declare(dialect, item.name, print(item.value))}`,
        );
        plan(item.element).props.push({ prop: item.prop, name: item.name });
        break;
      }
      case "member":
        component.members.push(
          memberCode(a, dialect, item.statement, print, leading),
        );
        break;
      case "mount":
        component.mount.push(
          `${leading(item.statement)}${print(item.statement)}`,
        );
        break;
      case "deferred": {
        const empty = item.type.endsWith("[]") ? " = []" : "";
        const definite = empty ? "" : "!";
        component.members.push(
          `${leading(item.statement)}${
            dialect.id === "angular" ? "" : "let "
          }${item.name}${definite}: ${item.type}${empty};`,
        );
        component.mount.push(
          `${dialect.member(item.name)} = ${print(item.value)};`,
        );
        break;
      }
    }
  }
  for (const statement of a.cleanup) {
    if (a.liftedRemoves.has(statement) && !keptRemoves.has(statement)) continue;
    const code = print(statement);
    component.cleanup.push(
      `${leading(statement)}${ts.isStatement(statement) ? code : `${code};`}`,
    );
  }
  return component;
}

/** `const name = value;` in the dialect (Angular: a class field) */
const declare = (dialect: Dialect, name: string, value: string) =>
  dialect.id === "angular"
    ? `${name} = ${value};`
    : `const ${name} = ${value};`;

/** A declaration of setup as component code (Angular: class members) */
function memberCode(
  a: Analysis,
  dialect: Dialect,
  statement: ts.Statement,
  print: (node: ts.Node) => string,
  leading: (node: ts.Node) => string,
): string {
  const comments = leading(statement);
  if (dialect.id !== "angular") return `${comments}${print(statement)}`;
  const { sf } = a;
  if (ts.isVariableStatement(statement)) {
    return (
      comments +
      statement.declarationList.declarations
        .map((decl) => {
          if (!ts.isIdentifier(decl.name)) {
            throw new Fallback("destructuring declaration (Angular field)");
          }
          const type = decl.type ? `: ${decl.type.getText(sf)}` : "";
          if (!decl.initializer)
            return `${decl.name.text}${type || ": unknown"};`;
          return `${decl.name.text}${type} = ${print(decl.initializer)};`;
        })
        .join("\n")
    );
  }
  if (ts.isFunctionDeclaration(statement) && statement.name && statement.body) {
    const isAsync = statement.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.AsyncKeyword,
    );
    if (statement.asteriskToken) {
      throw new Fallback("generator function (Angular field)");
    }
    const typeParams = statement.typeParameters
      ? `<${statement.typeParameters.map((p) => p.getText(sf)).join(", ")},>`
      : "";
    const params = statement.parameters.map((p) => print(p)).join(", ");
    const returnType = statement.type ? `: ${statement.type.getText(sf)}` : "";
    return `${comments}${statement.name.text} = ${isAsync ? "async " : ""}${typeParams}(${params})${returnType} => ${print(statement.body)};`;
  }
  throw new Fallback("unsupported member");
}

// ---------------------------------------------------------------- markup

interface MarkupOptions {
  dialect: WcFramework;
  plans: Map<HtmlElement | null, Plan>;
}

const escapeText: Record<WcFramework, (text: string) => string> = {
  vue: (t) => t,
  html: (t) => t,
  angular: (t) =>
    t.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;").replace(/@/g, "&#64;"),
  svelte: (t) => t.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;"),
  solid: (t) =>
    t
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;")
      .replace(/>/g, "&gt;")
      .replace(/</g, "&lt;"),
};

const attrText = (
  dialect: WcFramework,
  name: string,
  value: string | null,
  quote: string,
) => {
  if (value === null) return name;
  if (dialect === "svelte" && /[{}]/.test(value)) {
    return `${name}={${JSON.stringify(decodeEntities(value))}}`;
  }
  const q = quote || '"';
  return `${name}=${q}${value}${q}`;
};

/** Binding attributes of an element plan */
function bindingAttrs(dialect: WcFramework, plan: Plan | undefined): string[] {
  if (!plan) return [];
  const out: string[] = [];
  if (plan.ref) {
    out.push(
      {
        vue: `ref="${plan.ref}"`,
        angular: `#${plan.ref}`,
        svelte: `bind:this={${plan.ref}}`,
        solid: `ref={${plan.ref}}`,
        html: "",
      }[dialect],
    );
  }
  for (const { prop, name } of plan.props) {
    out.push(
      {
        vue: `:${prop}.prop="${name}"`,
        angular: `[${prop}]="${name}"`,
        svelte: `${prop}={${name}}`,
        solid: `prop:${prop}={${name}}`,
        html: "",
      }[dialect],
    );
  }
  for (const { event, handler, options } of plan.events) {
    const vueMods = [
      options.capture && ".capture",
      options.once && ".once",
      options.passive && ".passive",
    ]
      .filter(Boolean)
      .join("");
    out.push(
      {
        vue: `@${event}${vueMods}="${handler}"`,
        angular: `(${event})="${handler}($event)"`,
        svelte: `on${event}${options.capture ? "capture" : ""}={${handler}}`,
        solid: `${options.capture ? "oncapture" : "on"}:${event}={${handler}}`,
        html: "",
      }[dialect],
    );
  }
  return out.filter(Boolean);
}

/** Indentation of the line a node starts on (from the preceding text) */
const indentBefore = (previous: HtmlNode | undefined, fallback: string) => {
  if (previous?.type !== "text") return fallback;
  const match = /\n([ \t]*)$/.exec(previous.value);
  return match ? match[1] : fallback;
};

function startTag(
  el: HtmlElement,
  dialect: WcFramework,
  extra: string[],
  indent: string,
): string {
  const isVoid = VOID_ELEMENTS.has(el.name);
  const close =
    dialect === "solid" && (isVoid || el.selfClosing)
      ? " />"
      : el.selfClosing
        ? " />"
        : ">";
  const needsRebuild =
    extra.length > 0 ||
    (dialect === "solid" && isVoid && !el.selfClosing) ||
    (dialect === "svelte" &&
      el.attrs.some((at) => /[{}]/.test(at.value ?? "")));
  if (!needsRebuild) return el.rawStart;
  const attrs = [
    ...el.attrs.map((at) => attrText(dialect, at.name, at.value, at.quote)),
    ...extra,
  ];
  const tag = el.rawStart.match(/^<([^\s/>]+)/)![1];
  const single = `<${tag}${attrs.map((x) => ` ${x}`).join("")}${close}`;
  const multiline =
    el.rawStart.includes("\n") || indent.length + single.length > 80;
  if (!multiline || !attrs.length) return single;
  return `<${tag}${attrs.map((x) => `\n${indent}  ${x}`).join("")}\n${indent}${close.trim()}`;
}

/** Markup of the demo for a framework (styles extracted) */
function serialize(
  nodes: HtmlNode[],
  options: MarkupOptions,
  styles: string[],
  indent = "",
): string {
  const { dialect, plans } = options;
  let out = "";
  nodes.forEach((node, index) => {
    const previous = nodes[index - 1];
    switch (node.type) {
      case "text":
        out += escapeText[dialect](node.value);
        break;
      case "comment":
        out +=
          dialect === "solid"
            ? `{/*${node.value.replace(/\*\//g, "* /")}*/}`
            : `<!--${node.value}-->`;
        break;
      case "raw":
        out += node.value;
        break;
      case "element": {
        if (node.name === "style" && dialect !== "html") {
          const css = node.children
            .map((c) => (c.type === "raw" ? c.value : ""))
            .join("");
          if (dialect === "solid") {
            out += `<style>{\`${css.replace(/[`\\]/g, "\\$&").replace(/\$\{/g, "\\${")}\`}</style>`;
          } else {
            styles.push(css);
            // drop the line the <style> element was on
            out = out.replace(/\n?[ \t]*$/, "");
          }
          break;
        }
        const tagIndent = indentBefore(previous, indent);
        const plan = plans.get(node);
        out += startTag(node, dialect, bindingAttrs(dialect, plan), tagIndent);
        if (VOID_ELEMENTS.has(node.name) || node.selfClosing) break;
        if (plan?.text) {
          out += {
            vue: `{{ ${plan.text.name} }}`,
            angular: `{{ ${plan.text.name} }}`,
            svelte: `{${plan.text.name}}`,
            solid: `{${plan.text.name}()}`,
            html: "",
          }[dialect];
        } else {
          out += serialize(node.children, options, styles, `${tagIndent}  `);
        }
        out += `</${node.rawStart.match(/^<([^\s/>]+)/)![1]}>`;
        break;
      }
    }
  });
  return out;
}

/** Markup of the whole demo, wrapped in the container when needed */
function markup(
  nodes: HtmlNode[],
  dialect: WcFramework,
  plans: Map<HtmlElement | null, Plan>,
) {
  const styles: string[] = [];
  const container = plans.get(null);
  let body = serialize(nodes, { dialect, plans }, styles).trim();
  if (container) {
    const attrs = bindingAttrs(dialect, container);
    const inner = body.replace(/^/gm, "  ");
    body = `<div\n  ${attrs.join("\n  ")}\n>\n${inner}\n</div>`;
  }
  const css = styles
    .map((s) => s.replace(/^\n+|\s+$/g, ""))
    .filter(Boolean)
    .join("\n\n");
  return { body, css };
}

// ------------------------------------------------------------- frameworks

const indent = (code: string, by: string) =>
  code
    .split("\n")
    .map((line) => (line.trim() ? by + line : line))
    .join("\n");

const block = (lines: string[]) => lines.filter((l) => l !== "").join("\n");

/** Module-level statements (types, constants, helpers) */
const moduleCode = (a: Analysis | null) =>
  a
    ? a.moduleStatements
        .map((s, index) => {
          const trivia = a.text.slice(s.getFullStart(), s.getStart(a.sf));
          const first = s === a.sf.statements[0];
          const comments = first ? "" : trivia.trim() && `${trivia.trim()}\n`;
          // keep the blank lines of the demo between statements
          const blank = index > 0 && /\n\s*\n/.test(trivia) ? "\n" : "";
          return blank + comments + s.getText(a.sf);
        })
        .join("\n")
    : "";

const headerOf = (a: Analysis | null) => (a?.header ? `${a.header}\n` : "");

/** The original setup function, used by the imperative fallback */
const setupSource = (a: Analysis) =>
  a.setup.getText(a.sf).replace(/^export\s+/, "");

interface Names {
  component: string;
  file: string;
  selector: string;
}

function vue(
  nodes: HtmlNode[],
  a: Analysis | null,
  c: Component | null,
  names: Names,
): string {
  const parts: string[] = [];
  const imports = new Set<string>();
  let template: { body: string; css: string };
  if (a && !c) {
    // imperative fallback
    imports.add("onBeforeUnmount").add("onMounted").add("ref");
    template = markup(
      nodes,
      "vue",
      new Map([[null, { ref: "root", events: [], props: [] }]]),
    );
    parts.push(
      headerOf(a),
      moduleCode(a),
      `const root = ref<HTMLElement>();\nlet cleanup: void | (() => void);\n\nonMounted(() => (cleanup = setup(root.value!)));\nonBeforeUnmount(() => cleanup?.());`,
      setupSource(a),
    );
  } else {
    template = markup(nodes, "vue", c?.plans ?? new Map());
    if (a && c) {
      if (c.refs.length || c.texts.length) imports.add("ref");
      parts.push(
        headerOf(a),
        moduleCode(a),
        block([
          ...c.refs.map((r) => `const ${r.name} = ref<${r.type}>();`),
          ...c.texts.map(
            (t) => `const ${t.name} = ref(${JSON.stringify(t.initial)});`,
          ),
        ]),
        c.members.join("\n"),
      );
      if (c.mount.length) {
        imports.add("onMounted");
        parts.push(
          `onMounted(() => {\n${indent(c.mount.join("\n"), "  ")}\n});`,
        );
      }
      if (c.cleanup.length) {
        imports.add("onBeforeUnmount");
        parts.push(
          `onBeforeUnmount(() => {\n${indent(c.cleanup.join("\n"), "  ")}\n});`,
        );
      }
    }
  }
  // "</script" inside a string would end the script block
  const script = parts
    .filter((p) => p.trim())
    .join("\n\n")
    .replace(/<\/script/gi, "<\\/script");
  const importLine = imports.size
    ? `import { ${[...imports].sort().join(", ")} } from "vue";\n\n`
    : "";
  const out = [`<!-- ${names.component}.vue -->`];
  if (script || importLine) {
    out.push(`<script setup lang="ts">\n${importLine}${script}\n</script>`);
  }
  out.push(`<template>\n${indent(template.body, "  ")}\n</template>`);
  if (template.css) out.push(`<style>\n${template.css}\n</style>`);
  return `${out.join("\n\n")}\n`;
}

function angular(
  nodes: HtmlNode[],
  a: Analysis | null,
  c: Component | null,
  names: Names,
): string {
  const core = new Set(["CUSTOM_ELEMENTS_SCHEMA", "Component"]);
  const typeImports = new Set<string>();
  const members: string[] = [];
  const implementsList: string[] = [];
  let template: { body: string; css: string };
  if (a && !c) {
    core.add("ElementRef").add("ViewChild");
    typeImports.add("AfterViewInit").add("OnDestroy");
    implementsList.push("AfterViewInit", "OnDestroy");
    template = markup(
      nodes,
      "angular",
      new Map([[null, { ref: "root", events: [], props: [] }]]),
    );
    members.push(
      `@ViewChild("root") root!: ElementRef<HTMLElement>;\nprivate cleanup: void | (() => void);`,
      `ngAfterViewInit(): void {\n  this.cleanup = setup(this.root.nativeElement);\n}`,
      `ngOnDestroy(): void {\n  this.cleanup?.();\n}`,
    );
  } else {
    template = markup(nodes, "angular", c?.plans ?? new Map());
    if (c) {
      if (c.refs.length) core.add("ElementRef").add("ViewChild");
      members.push(
        block([
          ...c.refs.map(
            (r) => `@ViewChild("${r.name}") ${r.name}!: ElementRef<${r.type}>;`,
          ),
          ...c.texts.map((t) => `${t.name} = ${JSON.stringify(t.initial)};`),
        ]),
        c.members.join("\n"),
      );
      if (c.mount.length) {
        typeImports.add("AfterViewInit");
        implementsList.push("AfterViewInit");
        members.push(
          `ngAfterViewInit(): void {\n${indent(c.mount.join("\n"), "  ")}\n}`,
        );
      }
      if (c.cleanup.length) {
        typeImports.add("OnDestroy");
        implementsList.push("OnDestroy");
        members.push(
          `ngOnDestroy(): void {\n${indent(c.cleanup.join("\n"), "  ")}\n}`,
        );
      }
    }
  }
  const specifiers = [
    ...[...core].sort(),
    ...[...typeImports].sort().map((t) => `type ${t}`),
  ];
  const tpl = template.body.replace(/[`\\]/g, "\\$&").replace(/\$\{/g, "\\${");
  const decorator = [
    `  selector: "${names.selector}",`,
    `  standalone: true,`,
    `  // <minerva-*> are custom elements: bind their properties and events`,
    `  schemas: [CUSTOM_ELEMENTS_SCHEMA],`,
    `  template: \`\n${indent(tpl, "    ")}\n  \`,`,
  ];
  if (template.css) {
    decorator.push(
      `  styles: \`\n${indent(template.css.replace(/[`\\]/g, "\\$&"), "    ")}\n  \`,`,
    );
  }
  const body = members.filter((m) => m.trim()).join("\n\n");
  return [
    `// ${names.file}.component.ts`,
    `import { ${specifiers.join(", ")} } from "@angular/core";`,
    a ? block([headerOf(a).trim(), moduleCode(a)]) : "",
    a && !c ? setupSource(a) : "",
    `@Component({\n${decorator.join("\n")}\n})\nexport class ${names.component}Component${
      implementsList.length ? ` implements ${implementsList.join(", ")}` : ""
    } {${body ? `\n${indent(body, "  ")}\n` : ""}}`,
  ]
    .filter((p) => p.trim())
    .join("\n\n")
    .concat("\n");
}

function svelte(
  nodes: HtmlNode[],
  a: Analysis | null,
  c: Component | null,
  names: Names,
): string {
  const imports = new Set<string>();
  const parts: string[] = [];
  let template: { body: string; css: string };
  if (a && !c) {
    imports.add("onMount");
    template = markup(
      nodes,
      "svelte",
      new Map([[null, { ref: "root", events: [], props: [] }]]),
    );
    parts.push(
      headerOf(a),
      moduleCode(a),
      `let root: HTMLElement;\n\n// the returned cleanup runs when the component is destroyed\nonMount(() => setup(root));`,
      setupSource(a),
    );
  } else {
    template = markup(nodes, "svelte", c?.plans ?? new Map());
    if (a && c) {
      parts.push(
        headerOf(a),
        moduleCode(a),
        block([
          ...c.refs.map((r) => `let ${r.name}: ${r.type};`),
          ...c.texts.map(
            (t) => `let ${t.name} = $state(${JSON.stringify(t.initial)});`,
          ),
        ]),
        c.members.join("\n"),
      );
      if (c.mount.length || c.cleanup.length) {
        imports.add("onMount");
        const cleanup = c.cleanup.length
          ? `\n  return () => {\n${indent(c.cleanup.join("\n"), "    ")}\n  };`
          : "";
        parts.push(
          `onMount(() => {\n${indent(c.mount.join("\n"), "  ")}${cleanup}\n});`,
        );
      }
    }
  }
  // "</script" inside a string would end the script block
  const script = parts
    .filter((p) => p.trim())
    .join("\n\n")
    .replace(/<\/script/gi, "<\\/script");
  const importLine = imports.size
    ? `import { ${[...imports].sort().join(", ")} } from "svelte";\n\n`
    : "";
  const out = [`<!-- ${names.component}.svelte -->`];
  if (script || importLine) {
    out.push(
      `<script lang="ts">\n${indent(`${importLine}${script}`, "  ")}\n</script>`,
    );
  }
  out.push(template.body);
  if (template.css)
    out.push(`<style>\n${indent(template.css, "  ")}\n</style>`);
  return `${out.join("\n\n")}\n`;
}

function solid(
  nodes: HtmlNode[],
  a: Analysis | null,
  c: Component | null,
  names: Names,
): string {
  const imports = new Set<string>();
  const parts: string[] = [];
  let template: { body: string; css: string };
  if (a && !c) {
    imports.add("onCleanup").add("onMount");
    template = markup(
      nodes,
      "solid",
      new Map([[null, { ref: "root", events: [], props: [] }]]),
    );
    parts.push(
      `let root!: HTMLDivElement;\nonMount(() => {\n  const cleanup = setup(root);\n  if (cleanup) onCleanup(cleanup);\n});`,
    );
  } else {
    template = markup(nodes, "solid", c?.plans ?? new Map());
    if (c) {
      if (c.texts.length) imports.add("createSignal");
      parts.push(
        block([
          ...c.refs.map((r) => `let ${r.name}!: ${r.type};`),
          ...c.texts.map(
            (t) =>
              `const [${t.name}, set${pascal(t.name)}] = createSignal(${JSON.stringify(t.initial)});`,
          ),
        ]),
        c.members.join("\n"),
      );
      if (c.mount.length) {
        imports.add("onMount");
        parts.push(`onMount(() => {\n${indent(c.mount.join("\n"), "  ")}\n});`);
      }
      if (c.cleanup.length) {
        imports.add("onCleanup");
        parts.push(
          `onCleanup(() => {\n${indent(c.cleanup.join("\n"), "  ")}\n});`,
        );
      }
    }
  }
  const multiRoot =
    nodes.filter(
      (n) =>
        (n.type === "element" && (n.name !== "style" || true)) ||
        (n.type === "text" && n.value.trim()) ||
        n.type === "comment",
    ).length > 1 && !(c?.plans.get(null) || (a && !c));
  const jsx = multiRoot
    ? `<>\n${indent(template.body, "  ")}\n</>`
    : template.body;
  const body = parts.filter((p) => p.trim()).join("\n\n");
  const importLine = imports.size
    ? `import { ${[...imports].sort().join(", ")} } from "solid-js";`
    : "";
  return [
    `// ${names.component}.tsx`,
    importLine,
    a ? block([headerOf(a).trim(), moduleCode(a)]) : "",
    a && !c ? setupSource(a) : "",
    `export default function ${names.component}() {\n${body ? `${indent(body, "  ")}\n\n` : ""}  return (\n${indent(jsx, "    ")}\n  );\n}`,
  ]
    .filter((p) => p.trim())
    .join("\n\n")
    .concat("\n");
}

/** Plain HTML: the markup and a module script (types stripped) */
function html(input: WcDemoInput, a: Analysis | null): string {
  const registration = `// registers every <minerva-*> element (or import one entry per element)\nimport "minerva-design/web-components";`;
  if (!input.script) {
    return `${input.html.trim()}\n\n<script type="module">\n  ${registration.replace(/\n/g, "\n  ")}\n</script>\n`;
  }
  let code: string;
  if (a) {
    // setup's body at the top level of the module, `root` -> `document`
    const { sf, text } = a;
    const edits: { start: number; end: number; value: string }[] = [];
    const visit = (n: ts.Node) => {
      if (
        ts.isIdentifier(n) &&
        isReference(n) &&
        symbolOf(a.checker, n) === a.rootSymbol
      ) {
        edits.push({
          start: n.getStart(sf),
          end: n.end,
          value: ts.isShorthandPropertyAssignment(n.parent)
            ? `${n.text}: document`
            : "document",
        });
      }
      n.forEachChild(visit);
    };
    const statements = [...a.setup.body!.statements];
    const last = statements[statements.length - 1];
    if (last && ts.isReturnStatement(last)) statements.pop();
    const chunks: string[] = [];
    const BLANK = '"__BLANK__";';
    const emitStatement = (s: ts.Statement, first: boolean) => {
      const trivia = text.slice(s.getFullStart(), s.getStart(sf));
      edits.length = 0;
      visit(s);
      let body = "";
      let pos = s.getStart(sf);
      for (const edit of edits.sort((x, y) => x.start - y.start)) {
        body += text.slice(pos, edit.start) + edit.value;
        pos = edit.end;
      }
      body += text.slice(pos, s.end);
      const blank = !first && /\n\s*\n/.test(trivia) ? `${BLANK}\n` : "";
      chunks.push(
        `${blank}${trivia.trim() ? `${trivia.trim()}\n` : ""}${body}`,
      );
    };
    a.moduleStatements.forEach((s, i) => emitStatement(s, i === 0));
    if (a.moduleStatements.length) chunks.push(BLANK);
    statements.forEach((s, i) => emitStatement(s, i === 0));
    const tsCode = chunks.join("\n");
    code = ts
      .transpileModule(tsCode, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          removeComments: false,
        },
      })
      .outputText.replace(/^\s*"__BLANK__";\s*$/gm, "")
      .replace(/^"use strict";\s*$/m, "")
      .replace(/^export \{\};\s*$/m, "")
      .trim();
    const header = a.header ? `${a.header}\n` : "";
    code = `${header}${code}`;
  } else {
    const js = ts.transpileModule(input.script, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    }).outputText;
    code = `${js.replace(/export function setup/, "function setup").trim()}\n\nsetup(document.body);`;
  }
  // "</script" inside a string would end the inline script
  code = code.replace(/<\/script/gi, "<\\/script");
  return `${input.html.trim()}\n\n<script type="module">\n${indent(`${registration}\n\n${code}`, "  ")}\n</script>\n`;
}

/** Transforms one Web Component demo into every framework (unformatted). */
export function transformWcDemo(input: WcDemoInput): WcTransformResult {
  const nodes = parseHtml(input.html);
  const component = pascal(`${input.page}-${input.demo}`);
  const names: Names = {
    component,
    file: `${input.page}-${input.demo}`,
    selector: `app-${input.page}-${input.demo}`,
  };
  const fallbacks: WcTransformResult["fallbacks"] = {};
  let analysis: Analysis | null = null;
  let analysisError: string | null = null;
  if (input.script) {
    try {
      analysis = analyze(input, nodes);
    } catch (error) {
      if (!(error instanceof Fallback)) throw error;
      analysisError = error.message;
    }
  }
  // the original script, for the imperative fallback
  const raw = () => {
    if (analysis) return analysis;
    const { sf, checker } = createChecker("/demo.ts", input.script!);
    const setup = sf.statements.find(
      (s): s is ts.FunctionDeclaration =>
        ts.isFunctionDeclaration(s) && s.name?.text === "setup",
    )!;
    return {
      sf,
      text: input.script!,
      checker,
      header: input
        .script!.slice(
          sf.statements[0].getFullStart(),
          sf.statements[0].getStart(sf),
        )
        .trim(),
      moduleStatements: sf.statements.filter((s) => s !== setup),
      setup,
    } as Analysis;
  };

  const build = (id: Dialect["id"]) => {
    const emitters = { vue, angular, svelte, solid };
    if (!input.script) return emitters[id](nodes, null, null, names);
    if (analysis) {
      try {
        const dialect = dialects(analysis.rootName)[id];
        return emitters[id](
          nodes,
          analysis,
          buildComponent(analysis, dialect),
          names,
        );
      } catch (error) {
        if (!(error instanceof Fallback)) throw error;
        fallbacks[id] = error.message;
        return emitters[id](nodes, analysis, null, names);
      }
    }
    fallbacks[id] = analysisError ?? "unknown";
    return emitters[id](nodes, raw(), null, names);
  };

  const sources = {
    vue: build("vue"),
    angular: build("angular"),
    svelte: build("svelte"),
    solid: build("solid"),
    html: html(input, analysis),
  };
  return { sources, fallbacks };
}

type Format = (source: string, options: { parser: string }) => Promise<string>;

/**
 * Formats the generated sources with Prettier: Vue SFC, Angular and Solid
 * TypeScript (Angular templates included). The Svelte markup and the HTML
 * markup are kept as written in the demo; their script blocks are formatted
 * as TypeScript / JavaScript. A source Prettier cannot parse is returned as
 * generated (`onError` is called).
 */
export async function formatWcSources(
  sources: WcFrameworkSources,
  format: Format,
  onError: (framework: WcFramework, error: unknown) => void = () => {},
): Promise<WcFrameworkSources> {
  const scriptBlock = async (
    source: string,
    open: string,
    parser: string,
  ): Promise<string> => {
    const start = source.indexOf(`${open}\n`);
    const end = source.lastIndexOf("\n</script>");
    if (start === -1 || end < start) return source;
    const inner = source.slice(start + open.length + 1, end);
    const code = await format(inner.replace(/^ {2}/gm, ""), { parser });
    return `${source.slice(0, start)}${open}\n${indent(code.trimEnd(), "  ")}${source.slice(end)}`;
  };
  const run = async (
    framework: WcFramework,
    task: () => Promise<string>,
  ): Promise<string> => {
    try {
      return await task();
    } catch (error) {
      onError(framework, error);
      return sources[framework];
    }
  };
  const [vue, angular, svelte, solid, html] = await Promise.all([
    run("vue", () => format(sources.vue, { parser: "vue" })),
    run("angular", () => format(sources.angular, { parser: "typescript" })),
    run("svelte", () =>
      scriptBlock(sources.svelte, '<script lang="ts">', "typescript"),
    ),
    run("solid", () => format(sources.solid, { parser: "typescript" })),
    run("html", () =>
      scriptBlock(sources.html, '<script type="module">', "babel"),
    ),
  ]);
  return { vue, angular, svelte, solid, html };
}
