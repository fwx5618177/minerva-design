// Styling hooks contract, shared by the React (lib-core) and web component
// (lib-web-components) contract tests: checks rendered DOM against the
// manifest of @minerva/core/styling-hooks.
//
// - every hook element is documented: its `data-part` (React) / `part`
//   (shadow DOM) is a part of its component, and every state hook on it is
//   one of the component's states with a documented value;
// - every documented hook exists: over all the scenarios (fixtures) of a
//   component, each part and each state is rendered at least once (each
//   `data-state` value too).
import {
  BOOLEAN_STATES,
  KEYED_STATES,
  STATE_VALUES,
  stylingHooks,
  type ComponentHookSpec,
  type HookImplementation,
} from "@minerva/core/styling-hooks";

export const manifest = stylingHooks as Record<string, ComponentHookSpec>;

const BOOLEAN = new Set<string>(BOOLEAN_STATES);
const KEYED = new Set<string>(KEYED_STATES);
const STATE = new Set<string>(STATE_VALUES);

/** Every `data-*` attribute of the state vocabulary */
const STATE_ATTRIBUTES = ["state", ...BOOLEAN_STATES, ...KEYED_STATES].map(
  (key) => [key, `data-${key}`] as const,
);

/** What the scenarios of a component rendered */
export class Coverage {
  readonly parts = new Map<string, Set<string>>();
  readonly states = new Map<string, Set<string>>();

  part(component: string, part: string) {
    if (!this.parts.has(component)) this.parts.set(component, new Set());
    this.parts.get(component)!.add(part);
  }

  state(component: string, key: string, value?: string) {
    if (!this.states.has(component)) this.states.set(component, new Set());
    const seen = this.states.get(component)!;
    seen.add(key);
    if (key === "state") seen.add(`state:${value}`);
  }
}

/** The states a part carries in React */
function reactPartStates(spec: ComponentHookSpec, part: string): string[] {
  const partSpec = spec.parts[part];
  if (part === "root" && !partSpec?.states) return Object.keys(spec.states);
  return [...(partSpec?.states ?? [])];
}

function checkValue(
  spec: ComponentHookSpec,
  key: string,
  value: string | undefined,
): string | null {
  const allowed = (spec.states as Record<string, unknown>)[key];
  if (BOOLEAN.has(key)) {
    return value === "" || value === undefined
      ? null
      : `boolean state ${key} must be empty, got "${value}"`;
  }
  return (allowed as string[]).includes(String(value))
    ? null
    : `${key}="${value}" is not one of ${(allowed as string[]).join(", ")}`;
}

/**
 * Checks the hook elements of a React render (`[data-minerva]` /
 * `[data-part]` in `root`, the whole document by default: portals).
 */
export function checkReactDom(
  coverage: Coverage,
  root: ParentNode = document,
): string[] {
  const problems: string[] = [];
  for (const el of Array.from(root.querySelectorAll("[data-part]"))) {
    if (!el.hasAttribute("data-minerva")) {
      problems.push(
        `<${el.localName} data-part="${el.getAttribute("data-part")}"> has no data-minerva`,
      );
    }
  }
  for (const el of Array.from(root.querySelectorAll("[data-minerva]"))) {
    const component = el.getAttribute("data-minerva")!;
    const part = el.getAttribute("data-part");
    const spec = manifest[component];
    const where = `[data-minerva="${component}"][data-part="${part}"]`;
    if (!spec) {
      problems.push(`${where}: unknown component`);
      continue;
    }
    if (!part || !spec.parts[part]) {
      problems.push(`${where}: undocumented part`);
      continue;
    }
    if (spec.parts[part].only === "wc") {
      problems.push(`${where}: documented as web components only`);
    }
    coverage.part(component, part);
    const allowed = reactPartStates(spec, part);
    for (const [key, attribute] of STATE_ATTRIBUTES) {
      if (!el.hasAttribute(attribute)) continue;
      const value = el.getAttribute(attribute) ?? undefined;
      if (!allowed.includes(key)) {
        problems.push(`${where}: undocumented state ${attribute}="${value}"`);
        continue;
      }
      const problem = checkValue(spec, key, value);
      if (problem) problems.push(`${where}: ${problem}`);
      else coverage.state(component, key, value);
    }
  }
  return problems;
}

/** `open` -> state, `disabled` -> boolean, `size-small` -> keyed */
export function parseCustomState(
  name: string,
): { key: string; value?: string } | null {
  if (STATE.has(name)) return { key: "state", value: name };
  if (BOOLEAN.has(name)) return { key: name };
  const dash = name.indexOf("-");
  const key = name.slice(0, dash);
  if (dash > 0 && KEYED.has(key)) return { key, value: name.slice(dash + 1) };
  return null;
}

/** Minerva hosts in `root` and in the shadow roots below it */
function hosts(root: ParentNode, out: Element[] = []): Element[] {
  for (const el of Array.from(root.querySelectorAll("*"))) {
    if (el.localName.startsWith("minerva-")) out.push(el);
    if (el.shadowRoot) hosts(el.shadowRoot, out);
  }
  return out;
}

/**
 * Checks every Minerva element in `root` (and nested shadow roots): the
 * `part` names of its own shadow root and its custom states.
 */
export function checkWcDom(
  coverage: Coverage,
  customStates: (el: Element) => ReadonlySet<string>,
  root: ParentNode = document,
  nonVisual: readonly string[] = [],
): string[] {
  const problems: string[] = [];
  const byTag = new Map(
    Object.entries(manifest)
      .filter(([, spec]) => spec.wc)
      .map(([name, spec]) => [spec.wc!, name] as const),
  );
  for (const host of hosts(root)) {
    const tag = host.localName;
    const component = byTag.get(tag);
    if (!component) {
      if (!nonVisual.includes(tag)) problems.push(`<${tag}>: unknown element`);
      continue;
    }
    const spec = manifest[component];
    for (const el of Array.from(
      host.shadowRoot?.querySelectorAll("[part]") ?? [],
    )) {
      for (const part of (el.getAttribute("part") ?? "").split(/\s+/)) {
        if (!part) continue;
        if (!spec.parts[part]) {
          problems.push(`${tag}::part(${part}): undocumented part`);
        } else if (spec.parts[part].only === "react") {
          problems.push(`${tag}::part(${part}): documented as React only`);
        } else {
          coverage.part(component, part);
        }
      }
    }
    for (const name of customStates(host)) {
      const parsed = parseCustomState(name);
      if (!parsed || !(parsed.key in spec.states)) {
        problems.push(`${tag}:state(${name}): undocumented state`);
        continue;
      }
      const problem = checkValue(spec, parsed.key, parsed.value);
      if (problem) problems.push(`${tag}:state(${name}): ${problem}`);
      else coverage.state(component, parsed.key, parsed.value);
    }
  }
  return problems;
}

/** Documented hooks of `component` that no scenario rendered */
export function missingHooks(
  component: string,
  coverage: Coverage,
  implementation: HookImplementation,
): string[] {
  const spec = manifest[component];
  const other: HookImplementation = implementation === "react" ? "wc" : "react";
  const parts = coverage.parts.get(component) ?? new Set();
  const states = coverage.states.get(component) ?? new Set();
  const missing: string[] = [];
  for (const [part, partSpec] of Object.entries(spec.parts)) {
    if (partSpec.only === other) continue;
    if (!parts.has(part)) missing.push(`part ${part}`);
  }
  for (const [key, value] of Object.entries(spec.states)) {
    if (!states.has(key)) missing.push(`state ${key}`);
    if (key === "state") {
      for (const v of value as string[]) {
        if (!states.has(`state:${v}`)) missing.push(`state ${key}="${v}"`);
      }
    }
  }
  return missing;
}
