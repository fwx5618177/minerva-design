// Generates the component contracts of @minerva/core/contracts
// (packages/core/src/contracts/components.generated.json) from the sources:
//
// - React: every exported component `X` of minerva-design (packages/react)
//   with an exported `XProps` type; its props are read with the TypeScript
//   checker (inherited Minerva props included, native DOM props excluded):
//   kind, string literal values, `@default`, required, description.
// - Web Components: every custom element of the Custom Elements Manifest
//   (packages/minerva-design/custom-elements.json): properties, attributes,
//   events (with their `detail: { ... }` fields), slots.
// - React Native: the components of minerva-design/native and the contract
//   each implements (packages/native/src/manifest.ts): their `native`
//   status is `beta`; native-only (mobile) components get a contract of
//   their own (toC track, props / events read from their native types).
// - Docs: the page documenting the component (apps/docs registry).
// - Vue: the exports of the native Vue renderer (packages/vue, read
//   statically from its barrels): `stable` when the cross-platform contract
//   suites cover the component (tests/contracts), `beta` otherwise.
//
//   node tools/generate-contracts.mjs          -> writes the JSON
//   node tools/generate-contracts.mjs --check  -> exits 1 when it is stale
//
// (`pnpm gen:contracts`; tests/docs/contracts.test.ts fails when stale.)
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import {
  generateApi,
  generateElements,
} from "../apps/docs/scripts/generate-api.mjs";
import { docPages } from "../apps/docs/src/docs/registry.ts";
import { NATIVE_COMPONENTS } from "../packages/native/src/manifest.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const at = (path) => join(ROOT, path);

export const CONTRACTS_OUTPUT = at(
  "packages/core/src/contracts/components.generated.json",
);

/** Every renderer, in display order */
export const PLATFORMS = [
  "react",
  "wc",
  "vue",
  "angular",
  "native",
  "taro",
  "weapp",
  "uni",
];

/**
 * Elements whose React component is not `pascal(tag)`; `null`: data objects
 * in React (items / entries arrays of the parent), elements in HTML.
 */
export const TAG_TO_REACT = {
  "minerva-progress": "ProgressIndicator",
  "minerva-autocomplete": "AutoComplete",
  "minerva-code-editor": "MonacoCodeEditor",
  "minerva-config": "ConfigProvider",
  "minerva-toast-region": "ToastProvider",
  "minerva-hstack": "HStack",
  "minerva-vstack": "VStack",
  "minerva-option": "SelectItem",
  "minerva-option-group": "SelectGroup",
  "minerva-description-item": null,
  "minerva-menu-item": null,
  "minerva-menu-checkbox-item": null,
  "minerva-menu-radio-item": null,
  "minerva-menu-group": null,
  "minerva-menu-separator": null,
  "minerva-menu-label": null,
};

/** React props interfaces not named `<Component>Props` */
const REACT_PROPS = {
  ConfigProvider: "ConfigContextProviderProps",
};

/** Exported values with a `XProps` type that are not components */
const NOT_COMPONENTS = new Set(["ConfigContext"]);

/**
 * Vue components driven by the shared contract suites (tests/contracts/
 * suites + the Vue driver): `stable` on Vue; the other Vue exports are `beta`.
 */
export const VUE_CONTRACT_SUITE_COMPONENTS = new Set([
  "Button",
  "Checkbox",
  "ConfigProvider",
  "Modal",
  "Pagination",
  "Radio",
  "RadioGroup",
  "Switch",
  "Tab",
  "TabList",
  "TabPanel",
  "Tabs",
  "ToastProvider",
]);

const VUE_ENTRIES = ["packages/vue/src/index.ts", "packages/vue/src/monaco.ts"];

/**
 * Value exports of the Vue renderer, read statically from its barrels
 * (`export * from`, `export { a, b as c }`, `export { default as X }`,
 * `export const X`): `.vue` modules cannot be imported by this script.
 */
export function readVue() {
  const names = new Set();
  const seen = new Set();
  const resolve = (from, specifier) => {
    const base = join(dirname(from), specifier);
    for (const candidate of [`${base}.ts`, join(base, "index.ts"), base]) {
      if (existsSync(candidate) && candidate.endsWith(".ts")) return candidate;
    }
    return undefined;
  };
  const visit = (file) => {
    if (!file || seen.has(file) || !existsSync(file)) return;
    seen.add(file);
    const text = readFileSync(file, "utf8").replace(/\/\/.*$/gm, "");
    for (const [, specifier] of text.matchAll(
      /export\s+\*\s+from\s+["'](\.[^"']+)["']/g,
    ))
      visit(resolve(file, specifier));
    for (const [, list] of text.matchAll(/export\s+\{([^}]*)\}/g)) {
      for (const item of list.split(",")) {
        const entry = item.trim();
        if (!entry || entry.startsWith("type ")) continue;
        const alias = /\bas\s+(\w+)$/.exec(entry);
        names.add(alias ? alias[1] : entry);
      }
    }
    for (const [, name] of text.matchAll(
      /export\s+(?:const|function|class)\s+(\w+)/g,
    ))
      names.add(name);
  };
  for (const entry of VUE_ENTRIES) visit(at(entry));
  return names;
}

/** Support of a component on Vue (generated from the Vue exports) */
function vueSupport(name, react, vueExports) {
  if (vueExports.has(name)) {
    return {
      status: VUE_CONTRACT_SUITE_COMPONENTS.has(name) ? "stable" : "beta",
    };
  }
  if (!react) return { status: "n/a", notes: NOT_APPLICABLE_NOTES.vue };
  return { status: "planned" };
}

/** Where a React-only part / a WC-only element lives on the other side */
const NOT_APPLICABLE_NOTES = {
  react:
    "Data object in React: an item of the parent component's items / entries prop.",
  wc: "React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.",
  vue: "Data object in Vue (like React): an item of the parent component's items / entries prop.",
  native:
    "Mobile component of minerva-design/native (React Native); on the web use the responsive web components.",
};

/**
 * Product tracks: back-office / data-heavy components are `toB` only,
 * consumer-facing ones `toC` only; everything else serves both.
 */
const TO_B = new Set([
  "AppShell",
  "Cascader",
  "CommandDialog",
  "ContextMenu",
  "DataTable",
  "DescriptionList",
  "FormLayout",
  "HtmlPreview",
  "JsonField",
  "KeyValueEditor",
  "MonacoCodeEditor",
  "NavTree",
  "Page",
  "PageHeader",
  "PageSection",
  "PageTab",
  "PageTabs",
  "SplitLayout",
  "StatCard",
  "Table",
  "TableBody",
  "TableCell",
  "TableCellContent",
  "TableHead",
  "TableHeader",
  "TableRoot",
  "TableRow",
  "Toolbar",
  "VirtualList",
]);
const TO_C = new Set(["Rating", "RatingScale"]);
const tracksOf = (name) =>
  TO_B.has(name) ? ["toB"] : TO_C.has(name) ? ["toC"] : ["toB", "toC"];

const pascal = (tag) =>
  tag
    .replace(/^minerva-/, "")
    .replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const kebab = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const clean = (text) => text.replace(/\s+/g, " ").trim();

/** JSON literal of a `@default` / manifest default, or undefined */
export function literal(text) {
  const value = text?.trim();
  if (!value) return undefined;
  if (/^"[^"]*"$|^'[^']*'$/.test(value)) return value.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value === "true" || value === "false") return value === "true";
  if (value === "null") return null;
  return undefined;
}

/** String literal values of a `"a" | "b"` type text, or undefined */
const literalUnion = (text) =>
  text && /^\s*"[^"]*"(\s*\|\s*("[^"]*"|undefined))*\s*$/.test(text)
    ? Array.from(text.matchAll(/"([^"]*)"/g), (m) => m[1]).sort()
    : undefined;

// --- React (TypeScript checker) ---------------------------------------------

const REACT_ENTRIES = [
  at("packages/react/src/index.ts"),
  at("packages/react/src/monaco.ts"),
];
const MINERVA_SOURCE = /[\\/]packages[\\/](react|core|dom)[\\/]src[\\/]/;
const NATIVE_ENTRIES = [at("packages/native/src/index.ts")];
const NATIVE_SOURCE = /[\\/]packages[\\/](native|core)[\\/]src[\\/]/;
/** Composition / host props that are not part of the contract */
const SKIPPED_REACT_PROPS = new Set([
  "children",
  "className",
  "style",
  "ref",
  "key",
]);

function reactKind(checker, type) {
  const text = checker.typeToString(type);
  if (/React(Node|Element)|JSX\.Element/.test(text)) return { kind: "node" };
  const parts = (type.isUnion() ? type.types : [type]).filter(
    (t) => !(t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)),
  );
  if (parts.length === 0) return { kind: "object" };
  if (parts.every((t) => t.flags & ts.TypeFlags.BooleanLike))
    return { kind: "boolean" };
  if (parts.every((t) => t.isStringLiteral()))
    return { kind: "enum", values: parts.map((t) => t.value).sort() };
  if (parts.every((t) => t.flags & ts.TypeFlags.StringLike))
    return { kind: "string" };
  if (parts.every((t) => t.flags & ts.TypeFlags.NumberLike))
    return { kind: "number" };
  if (parts.every((t) => t.getCallSignatures().length > 0))
    return { kind: "function" };
  if (parts.every((t) => checker.isArrayType(t) || checker.isTupleType(t)))
    return { kind: "array" };
  if (parts.length > 1) return { kind: "union" };
  return { kind: "object" };
}

/**
 * Exported components and their props (declared in Minerva sources only):
 * every exported value `X` with an exported `XProps` type.
 */
function readComponents({ entries, source, paths, propsOf = {} }) {
  const program = ts.createProgram(entries, {
    strict: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2022,
    skipLibCheck: true,
    noEmit: true,
    paths,
  });
  const checker = program.getTypeChecker();
  const exports = new Map();
  for (const file of entries) {
    const module = checker.getSymbolAtLocation(program.getSourceFile(file));
    for (const symbol of checker.getExportsOfModule(module)) {
      exports.set(
        symbol.name,
        symbol.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(symbol)
          : symbol,
      );
    }
  }
  const components = new Map();
  for (const [name, symbol] of exports) {
    if (!/^[A-Z]/.test(name) || NOT_COMPONENTS.has(name)) continue;
    if (!(symbol.flags & ts.SymbolFlags.Value)) continue;
    const propsSymbol = exports.get(propsOf[name] ?? `${name}Props`);
    if (!propsSymbol || !(propsSymbol.flags & ts.SymbolFlags.Type)) continue;
    const type = checker.getDeclaredTypeOfSymbol(propsSymbol);
    const all = checker.getPropertiesOfType(type);
    const props = [];
    for (const prop of all) {
      const own = (prop.declarations ?? []).some((d) =>
        source.test(d.getSourceFile().fileName),
      );
      if (!own || SKIPPED_REACT_PROPS.has(prop.name)) continue;
      const propType = checker.getTypeOfSymbol(prop);
      const tag = prop
        .getJsDocTags(checker)
        .find((t) => t.name === "default" || t.name === "defaultValue");
      const description = clean(
        ts.displayPartsToString(prop.getDocumentationComment(checker)),
      );
      props.push({
        name: prop.name,
        ...reactKind(checker, propType),
        default: literal(tag ? ts.displayPartsToString(tag.text) : undefined),
        required: !(prop.flags & ts.SymbolFlags.Optional),
        description: description || undefined,
      });
    }
    // declaration order of the props interface (inherited props after)
    const description = clean(
      ts.displayPartsToString(propsSymbol.getDocumentationComment(checker)),
    );
    components.set(name, {
      props,
      children: all.some((p) => p.name === "children"),
      description: description || undefined,
    });
  }
  return components;
}

/** Exported React components and their props (Minerva-declared only) */
export function readReact() {
  return readComponents({
    entries: REACT_ENTRIES,
    source: MINERVA_SOURCE,
    propsOf: REACT_PROPS,
    paths: {
      "@minerva/core": [at("packages/core/src/index.ts")],
      "@minerva/dom": [at("packages/dom/src/index.ts")],
    },
  });
}

/**
 * Exported React Native components (minerva-design/native) and their props
 * (declared in the native / core sources: React Native's own props such as
 * `PressableProps` are not part of the contract)
 */
export function readNative() {
  return readComponents({
    entries: NATIVE_ENTRIES,
    source: NATIVE_SOURCE,
    paths: { "@minerva/core": [at("packages/core/src/index.ts")] },
  });
}

// --- Web Components (Custom Elements Manifest) ------------------------------

function wcKind(text, aliases) {
  if (!text) return { kind: "object" };
  const type = text.replace(/\s*\|\s*(undefined|null)\b/g, "").trim();
  const values = literalUnion(type) ?? literalUnion(aliases.get(type));
  if (values) return { kind: "enum", values };
  if (type === "boolean") return { kind: "boolean" };
  if (type === "number") return { kind: "number" };
  if (type === "string") return { kind: "string" };
  if (type.includes("=>")) return { kind: "function" };
  if (/\[\]$|^(readonly\s+)?Array</.test(type)) return { kind: "array" };
  if (/^[^<{(]*\|/.test(type)) return { kind: "union" };
  return { kind: "object" };
}

/** `detail: { a, b: true }` fields documented in an event description */
export const detailFields = (description = "") => {
  const fields = new Set();
  for (const [, body] of description.matchAll(/detail:\s*\{([^}]*)\}/g)) {
    for (const part of body.split(",")) {
      const name = /^\s*(\w+)/.exec(part)?.[1];
      if (name) fields.add(name);
    }
  }
  return fields.size ? [...fields] : undefined;
};

/** Custom elements (docs API format), keyed by tag name */
export function readElements() {
  return new Map(
    Object.entries(generateElements()).map(([key, element]) => [
      key.replace(/^wc:/, ""),
      element,
    ]),
  );
}

// --- Merge ------------------------------------------------------------------

const compact = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  );

/** DOM events the element dispatches natively (`onClick` -> `click`) */
const NATIVE_EVENTS = {
  onClick: "click",
  onDoubleClick: "dblclick",
  onFocus: "focus",
  onBlur: "blur",
  onKeyDown: "keydown",
  onKeyUp: "keyup",
  onPointerDown: "pointerdown",
  onPointerUp: "pointerup",
  onMouseEnter: "mouseenter",
  onMouseLeave: "mouseleave",
  onScroll: "scroll",
};

/** React callback -> element event, like tests/docs/parity.test.ts */
const eventFor = (callback, events) => {
  const native = NATIVE_EVENTS[callback];
  if (native) {
    if (!events.has(native)) events.set(native, { name: native, wc: native });
    return native;
  }
  const base = kebab(callback.slice(2)).slice(1);
  return [
    `minerva-${base}`,
    `minerva-${base}-change`,
    `minerva-${base}ed-change`,
    base,
    `minerva-${base.replace(/-change$/, "")}-change`,
  ].find((candidate) => events.has(candidate));
};

/** `native` support of a contract implemented by minerva-design/native */
function nativeSupport(name) {
  const component = NATIVE_COMPONENTS.find((c) => c.contract === name);
  if (!component) return { status: "planned" };
  return compact({
    status: "beta",
    notes:
      component.notes ??
      (component.name === name ? undefined : `As ${component.name}`),
  });
}

/** Contract of a native-only (mobile) component, from its native types */
function buildNativeContract(component, native, docs) {
  const props = [];
  const events = [];
  for (const prop of native?.props ?? []) {
    if (/^on[A-Z]/.test(prop.name) && prop.kind === "function") {
      events.push(
        compact({
          name: kebab(prop.name.slice(2)).slice(1),
          native: prop.name,
          description: prop.description,
        }),
      );
      continue;
    }
    props.push(
      compact({
        name: prop.name,
        kind: prop.kind,
        values: prop.values,
        default: prop.default,
        required: prop.required,
        description: prop.description,
        only: "native",
      }),
    );
  }
  const platforms = Object.fromEntries(
    PLATFORMS.map((platform) => [platform, { status: "planned" }]),
  );
  platforms.react = { status: "n/a", notes: NOT_APPLICABLE_NOTES.native };
  platforms.wc = { status: "n/a", notes: NOT_APPLICABLE_NOTES.native };
  platforms.native = compact({ status: "beta", notes: component.notes });
  return compact({
    name: component.name,
    docs,
    descriptionKey: docs ? `docs.${docs}.description` : undefined,
    description: native?.description,
    tracks: ["toC"],
    props,
    events,
    slots: [],
    children: native?.children ?? false,
    platforms,
  });
}

/** React callback -> the native component's callback (RN idioms) */
const NATIVE_CALLBACKS = { onClick: "onPress" };

function buildContract({
  name,
  tag,
  react,
  element,
  aliasTypes,
  docs,
  vueExports,
  native,
}) {
  // props: React declaration order, then element-only properties
  const props = [];
  const events = new Map(
    (element?.events ?? []).map((e) => [
      e.name,
      compact({
        name: e.name,
        wc: e.name,
        detail: detailFields(e.description),
        description: e.description,
      }),
    ]),
  );
  const properties = new Map(
    (element?.properties ?? [])
      .filter((p) => !p.readonly)
      .map((p) => [p.name, p]),
  );
  for (const prop of react?.props ?? []) {
    if (/^on[A-Z]/.test(prop.name) && prop.kind === "function") {
      const wc = element ? eventFor(prop.name, events) : undefined;
      if (wc) {
        events.get(wc).react ??= prop.name;
      } else {
        const event = kebab(prop.name.slice(2)).slice(1);
        events.set(
          `react:${event}`,
          compact({
            name: event,
            react: prop.name,
            description: prop.description,
          }),
        );
      }
      continue;
    }
    const property = properties.get(prop.name);
    props.push(
      compact({
        name: prop.name,
        kind: prop.kind,
        values: prop.values,
        default: prop.default,
        required: prop.required,
        description: prop.description ?? property?.description,
        attribute: property?.attribute,
        only: element && !property ? "react" : undefined,
      }),
    );
  }
  const reactNames = new Set((react?.props ?? []).map((p) => p.name));
  for (const property of properties.values()) {
    if (reactNames.has(property.name)) continue;
    props.push(
      compact({
        name: property.name,
        ...wcKind(property.type, aliasTypes),
        default: literal(property.default),
        required: false,
        description: property.description,
        attribute: property.attribute,
        only: react ? "wc" : undefined,
      }),
    );
  }
  const platforms = Object.fromEntries(
    PLATFORMS.map((platform) => [platform, { status: "planned" }]),
  );
  platforms.react = react
    ? { status: "stable" }
    : { status: "n/a", notes: NOT_APPLICABLE_NOTES.react };
  platforms.wc = element
    ? { status: "stable" }
    : { status: "n/a", notes: NOT_APPLICABLE_NOTES.wc };
  platforms.vue = vueSupport(name, react, vueExports);
  platforms.native = nativeSupport(name);
  // the native callback of each React callback (same name, or its RN idiom)
  if (native) {
    const nativeProps = new Set(native.props.map((p) => p.name));
    for (const event of events.values()) {
      if (!event.react) continue;
      const callback = nativeProps.has(event.react)
        ? event.react
        : NATIVE_CALLBACKS[event.react];
      if (callback && nativeProps.has(callback)) event.native = callback;
    }
  }
  return compact({
    name,
    tag,
    docs,
    descriptionKey: docs ? `docs.${docs}.description` : undefined,
    description: element?.summary ?? react?.description,
    tracks: tracksOf(name),
    props,
    // React callbacks first, element events after (manifest order)
    events: [...events.values()],
    slots: (element?.slots ?? []).map((s) =>
      compact({ name: s.name || "default", description: s.description }),
    ),
    children: react?.children ?? (element?.slots ?? []).some((s) => !s.name),
    platforms,
  });
}

/** Docs page of a React export / element tag / native export */
function docsIndex() {
  const index = new Map();
  for (const page of docPages) {
    for (const name of page.exports ?? []) index.set(name, page.id);
    for (const tag of page.wc?.tags ?? []) index.set(tag, page.id);
  }
  const nativeIndex = new Map();
  for (const page of docPages) {
    for (const name of page.native?.exports ?? [])
      nativeIndex.set(name, page.id);
  }
  return Object.assign(index, { native: nativeIndex });
}

/** Every component contract, sorted by name */
export function generateContracts() {
  const react = readReact();
  const elements = readElements();
  const docs = docsIndex();
  const vueExports = readVue();
  // exported type aliases resolve the element types named after them
  // (`SwitchColor` -> `"primary" | "success" | ...`)
  const aliasTypes = new Map(
    Object.entries(generateApi())
      .filter(([, entry]) => entry.kind === "alias")
      .map(([key, entry]) => [key, entry.type]),
  );

  const byName = new Map();
  for (const [tag, element] of elements) {
    const mapped = tag in TAG_TO_REACT ? TAG_TO_REACT[tag] : pascal(tag);
    const name = mapped ?? pascal(tag);
    const reactComponent = mapped ? react.get(mapped) : undefined;
    byName.set(name, {
      name,
      tag,
      react: reactComponent,
      element,
      docs: docs.get(tag) ?? (mapped ? docs.get(mapped) : undefined),
    });
  }
  for (const [name, component] of react) {
    if (byName.has(name)) continue;
    byName.set(name, { name, react: component, docs: docs.get(name) });
  }
  const native = readNative();
  const contracts = [...byName.values()].map((input) =>
    buildContract({
      ...input,
      aliasTypes,
      vueExports,
      native: native.get(
        NATIVE_COMPONENTS.find((c) => c.contract === input.name)?.name,
      ),
    }),
  );
  // native-only (mobile) components
  for (const component of NATIVE_COMPONENTS) {
    if (component.contract !== null) continue;
    if (byName.has(component.name))
      throw new Error(`${component.name}: native-only name used on the web`);
    contracts.push(
      buildNativeContract(
        component,
        native.get(component.name),
        docs.native.get(component.name),
      ),
    );
  }
  return contracts.sort((a, b) => a.name.localeCompare(b.name));
}

/** Prettier-formatted JSON (the committed file is compared verbatim) */
export async function serializeContracts(contracts = generateContracts()) {
  const prettier = await import("prettier");
  const options = (await prettier.resolveConfig(CONTRACTS_OUTPUT)) ?? {};
  return prettier.format(JSON.stringify(contracts), {
    ...options,
    filepath: CONTRACTS_OUTPUT,
  });
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const next = await serializeContracts();
  const name = relative(ROOT, CONTRACTS_OUTPUT);
  if (process.argv.includes("--check")) {
    const current = existsSync(CONTRACTS_OUTPUT)
      ? readFileSync(CONTRACTS_OUTPUT, "utf8")
      : "";
    if (current !== next) {
      console.error(`${name} is out of date. Run: pnpm gen:contracts`);
      process.exit(1);
    }
    console.log(`${name} is up to date`);
  } else {
    writeFileSync(CONTRACTS_OUTPUT, next);
    console.log(`Wrote ${name}`);
  }
}
