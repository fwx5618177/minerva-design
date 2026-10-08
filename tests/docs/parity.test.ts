// React <-> Web Components API parity, computed from the sources: the props
// of every lib-core `<Name>Props` (inherited native props included, through
// the TypeScript checker) against the element's Custom Elements Manifest
// entry (custom-elements.json, via the docs generator).
//
// Hard rule (no exceptions): a same-named prop / property has the same
// literal default and the same set of string literal values.
// Checked: every React `on*` callback maps to an element event (`onFoo` ->
// `minerva-foo`, `minerva-foo-change`, `minerva-fooed-change`, or the native
// DOM event); every React prop exists on the element (same name, a slot of
// the kebab-case name, or the inverted boolean attribute `hideX` / `noX`)
// and every element property exists in React.
// Every other difference must be explained by a systematic rule below, or be
// listed in parity-differences.json (reviewed snapshot: a new difference, or
// a listed one that disappeared, fails the test).
import { describe, expect, it } from "vitest";
import ts from "typescript";
import { writeFileSync } from "node:fs";
import {
  generateApi,
  generateElements,
} from "../../packages/sample/scripts/generate-api.mjs";
import { at, readJson } from "./utils";

interface Member {
  name: string;
  type?: string;
  default?: string;
}
interface Entry {
  kind: string;
  props?: Member[];
  properties?: Member[];
  events?: { name: string }[];
  slots?: { name: string }[];
}
const api = { ...generateApi(), ...generateElements() } as Record<
  string,
  Entry
>;

/** Elements whose React props interface does not follow `minerva-x` -> `XProps` */
const INTERFACE: Record<string, string | null> = {
  "minerva-progress": "ProgressIndicatorProps",
  "minerva-autocomplete": "AutoCompleteProps",
  "minerva-code-editor": "MonacoCodeEditorProps",
  "minerva-config": "ConfigContextProviderProps",
  "minerva-toast-region": "ToastProviderProps",
  "minerva-hstack": "StackProps",
  "minerva-vstack": "StackProps",
  "minerva-option": "SelectItemProps",
  "minerva-option-group": "SelectGroupProps",
  // data objects in React (items / entries arrays), elements here
  "minerva-description-item": null,
  "minerva-menu-item": null,
  "minerva-menu-checkbox-item": null,
  "minerva-menu-radio-item": null,
  "minerva-menu-group": null,
  "minerva-menu-separator": null,
  "minerva-menu-label": null,
};

const pascal = (tag: string) =>
  tag
    .replace(/^minerva-/, "")
    .replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const literal = (value?: string) => {
  const text = value?.trim();
  if (!text || !/^("[^"]*"|-?\d+(\.\d+)?|true|false|null)$/.test(text))
    return undefined;
  return text.replace(/^"(-?\d+(\.\d+)?)"$/, "$1");
};
const literals = (type?: string) =>
  type && /^\s*"[^"]*"(\s*\|\s*("[^"]*"|undefined))*\s*$/.test(type)
    ? Array.from(type.matchAll(/"([^"]*)"/g), (m) => m[1]).sort()
    : null;

/** All prop names of the exported React props interfaces (inherited included) */
function reactPropNames(names: string[]) {
  const program = ts.createProgram(
    [
      at("packages/lib-core/src/index.ts"),
      at("packages/lib-core/src/monaco.ts"),
    ],
    {
      strict: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ES2022,
      skipLibCheck: true,
      noEmit: true,
      paths: { "@minerva/core": [at("packages/core/src/index.ts")] },
    },
  );
  const checker = program.getTypeChecker();
  const result = new Map<string, Set<string>>();
  for (const file of [
    at("packages/lib-core/src/index.ts"),
    at("packages/lib-core/src/monaco.ts"),
  ]) {
    const source = program.getSourceFile(file)!;
    const module = checker.getSymbolAtLocation(source)!;
    for (const symbol of checker.getExportsOfModule(module)) {
      if (!names.includes(symbol.name)) continue;
      const target =
        symbol.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(symbol)
          : symbol;
      const type = checker.getDeclaredTypeOfSymbol(target);
      result.set(
        symbol.name,
        new Set(checker.getPropertiesOfType(type).map((p) => p.name)),
      );
    }
  }
  return result;
}

/** DOM events: the element dispatches them natively (`click`, `focus`...) */
const NATIVE_EVENTS =
  /^on(Click|DoubleClick|Focus|Blur|KeyDown|KeyUp|PointerDown|PointerUp|MouseEnter|MouseLeave|Scroll)$/;

/** React-only by design: composition, styling hooks and host attributes */
const REACT_ONLY =
  /^(children|className|style|ref|key|as|asChild|aria-.*|on[A-Z]\w*|default[A-Z]\w*|render[A-Z]\w*|\w+(ClassName|Style|Props|Ref))$/;
/** Element-only by design: form association, read-only state and DOM APIs */
const WC_ONLY =
  /^(form|labels|validity|validationMessage|willValidate|isDisabled|selectedOptions|defaultValue|defaultChecked|resolved\w*|is[A-Z]\w*)$/;

const elements = Object.entries(api)
  .filter(([, e]) => e.kind === "element")
  .map(([key, e]) => [key.slice(3), e] as const);
const interfaces = new Map(
  elements.map(([tag]) => [
    tag,
    tag in INTERFACE ? INTERFACE[tag] : `${pascal(tag)}Props`,
  ]),
);
const names = reactPropNames([
  ...new Set([...interfaces.values()].filter((n): n is string => !!n)),
]);

function differences() {
  const found: Record<string, string[]> = {};
  const hard: string[] = [];
  for (const [tag, element] of elements) {
    const iface = interfaces.get(tag);
    if (!iface) continue;
    const react = api[iface];
    const all = names.get(iface);
    if (!react?.props || !all) {
      hard.push(`${tag}: no React interface ${iface}`);
      continue;
    }
    const own = new Map(react.props.map((p) => [p.name, p]));
    const properties = new Map(
      (element.properties ?? []).map((p) => [p.name, p]),
    );
    const slots = new Set((element.slots ?? []).map((s) => s.name));
    const events = new Set((element.events ?? []).map((e) => e.name));
    const list: string[] = [];
    for (const name of all) {
      const prop = own.get(name);
      if (/^on[A-Z]/.test(name) && prop?.type?.includes("=>")) {
        if (NATIVE_EVENTS.test(name)) continue; // native DOM event of the host
        const base = kebab(name.slice(2)).slice(1);
        const candidates = [
          `minerva-${base}`,
          `minerva-${base}-change`,
          `minerva-${base}ed-change`,
          base,
          `minerva-${base.replace(/-change$/, "")}-change`,
        ];
        if (!candidates.some((c) => events.has(c))) list.push(`event ${name}`);
        continue;
      }
      if (properties.has(name) || !prop) continue; // same name, or inherited native prop
      if (REACT_ONLY.test(name)) continue;
      if (slots.has(kebab(name)) || (name === "title" && slots.has("heading")))
        continue;
      const cap = name[0].toUpperCase() + name.slice(1);
      // HTML boolean attributes default to false: `showX` / `x` (default true) -> `hideX` / `noX`
      if (
        /^show[A-Z]/.test(name) &&
        (properties.has(`hide${name.slice(4)}`) ||
          properties.has(`no${name.slice(4)}`))
      )
        continue;
      if (properties.has(`no${cap}`) || properties.has(`hide${cap}`)) continue;
      list.push(`react-only ${name}`);
    }
    for (const [name, property] of properties) {
      const prop = own.get(name);
      if (prop) {
        const expected = literal(prop.default);
        const actual =
          literal(property.default) ??
          (expected === "false" && property.default === undefined
            ? "false"
            : property.default);
        if (
          expected !== undefined &&
          actual !== expected &&
          !RESOLVED_AT_RUNTIME.has(`${tag}.${name}`)
        ) {
          hard.push(
            `${tag}.${name}: default ${property.default} (React ${prop.default})`,
          );
        }
        const a = literals(property.type);
        const b = literals(prop.type);
        if (a && b && a.join("|") !== b.join("|")) {
          hard.push(
            `${tag}.${name}: values ${a.join("|")} (React ${b.join("|")})`,
          );
        }
        continue;
      }
      if (all.has(name) || WC_ONLY.test(name)) continue;
      const m = /^(no|hide)([A-Z]\w*)$/.exec(name);
      if (
        m &&
        (all.has(m[2][0].toLowerCase() + m[2].slice(1)) ||
          all.has(`show${m[2]}`))
      )
        continue;
      list.push(`wc-only ${name}`);
    }
    if (list.length) found[tag] = list.sort();
  }
  return { found, hard };
}

/** Same behaviour, the default is resolved at runtime instead of declared */
const RESOLVED_AT_RUNTIME = new Set([
  "minerva-app-shell.skipLink", // text of the always-rendered skip link (React: boolean | text)
  "minerva-skeleton.size", // circular placeholder falls back to 32px
  "minerva-tooltip.enterDelay", // provider, then 200ms
  "minerva-tooltip.leaveDelay", // provider, then 0ms
  // HStack / VStack fix the direction (React omits the prop: HStackProps)
  "minerva-hstack.direction",
  "minerva-vstack.direction",
]);

const reviewed = readJson<{ differences: Record<string, string[]> }>(
  "tests/docs/parity-differences.json",
);

describe("React <-> Web Components parity", () => {
  const { found, hard } = differences();

  it("compares every element with a React counterpart", () => {
    expect(Object.keys(found).length + elements.length).toBeGreaterThan(80);
    expect(names.size).toBeGreaterThan(60);
  });

  it("same-named props share defaults and literal values; every interface exists", () => {
    expect(hard).toEqual([]);
  });

  it("every other difference is reviewed (parity-differences.json)", () => {
    if (process.env.UPDATE_PARITY) {
      writeFileSync(
        at("tests/docs/parity-differences.json"),
        `${JSON.stringify({ ...reviewed, differences: found }, null, 2)}\n`,
      );
      return;
    }
    // to review a change: inspect the diff, fix the API or update the JSON
    expect(found).toEqual(reviewed.differences);
  });
});
