/**
 * Styling hooks of the docs pages, from the manifest of
 * `@minerva/core/styling-hooks` (plain data: no React, importable in Node
 * by the docs tests).
 */
import {
  reactSelector,
  stylingHooks,
  wcSelector,
  type ComponentHookSpec,
  type StateSelector,
} from "@minerva/core/styling-hooks";
import type { DocPageMeta } from "./registry";

export type HookFramework = "react" | "wc";

export const hookManifest = stylingHooks as Record<string, ComponentHookSpec>;
const manifest = hookManifest;

/**
 * Hook components documented on a page: the page's custom elements (in
 * their order), then the components rendered by its React exports.
 */
export function hookComponentsOf(meta: DocPageMeta): string[] {
  const names: string[] = [];
  for (const tag of meta.wc?.tags ?? []) {
    const name = Object.keys(manifest).find((n) => manifest[n].wc === tag);
    if (name) names.push(name);
  }
  for (const exported of meta.exports ?? []) {
    for (const [name, spec] of Object.entries(manifest)) {
      if (spec.react.includes(exported) && !names.includes(name)) {
        names.push(name);
      }
    }
  }
  return names;
}

/** Parts of a component rendered by `framework` */
export const partsOf = (spec: ComponentHookSpec, framework: HookFramework) =>
  Object.entries(spec.parts).filter(
    ([, part]) => part.only !== (framework === "react" ? "wc" : "react"),
  );

/** Parts that carry a state in React (the root carries every state) */
export function statePartsOf(spec: ComponentHookSpec, key: string): string[] {
  return Object.entries(spec.parts)
    .filter(([name, part]) =>
      name === "root" && !part.states
        ? true
        : (part.states as readonly string[] | undefined)?.includes(key),
    )
    .map(([name]) => name);
}

/** An item state of a part: its key and values (`[true]` for a boolean) */
export interface ItemStateRow {
  part: string;
  key: string;
  values: (string | true)[];
}

/** Item states of the parts rendered by `framework` (menu items, rows...) */
export function itemStatesOf(
  spec: ComponentHookSpec,
  framework: HookFramework,
): ItemStateRow[] {
  return partsOf(spec, framework).flatMap(([part, partSpec]) =>
    Object.entries(partSpec.itemStates ?? {}).map(([key, value]) => ({
      part,
      key,
      values: Array.isArray(value) ? [...(value as string[])] : [true],
    })),
  );
}

/** Selector of a part in an item state */
export const itemStateSelector = (
  name: string,
  framework: HookFramework,
  part: string,
  key: string,
  value: string | true,
) =>
  framework === "react"
    ? reactSelector(name, part, undefined, { [key]: value })
    : wcSelector(name, part, undefined, { [key]: value });

/** A state selector example of a state key */
function sampleState(spec: ComponentHookSpec, key: string): StateSelector {
  const value = (spec.states as Record<string, unknown>)[key];
  return { [key]: Array.isArray(value) ? value[0] : true };
}

/** Generated CSS example: one part, then the same part in a state */
export function hookExample(
  name: string,
  framework: HookFramework,
): string | null {
  const spec = manifest[name];
  if (!spec) return null;
  const parts = partsOf(spec, framework).map(([part]) => part);
  const part = parts.find((p) => p !== "root") ?? parts[0];
  const stateKey = Object.keys(spec.states)[0];
  const lines: string[] = [];
  if (framework === "react") {
    lines.push(`${reactSelector(name, part)} {\n  /* … */\n}`);
    if (stateKey) {
      const carrier = statePartsOf(spec, stateKey)[0];
      const state = sampleState(spec, stateKey);
      lines.push(
        carrier === part
          ? `${reactSelector(name, part, state)} {\n  /* … */\n}`
          : `${reactSelector(name, carrier, state)} ${reactSelector(name, part)} {\n  /* … */\n}`,
      );
    }
  } else {
    lines.push(`${wcSelector(name, part)} {\n  /* … */\n}`);
    if (stateKey) {
      lines.push(
        `${wcSelector(name, part, sampleState(spec, stateKey))} {\n  /* … */\n}`,
      );
    }
  }
  // an item in a state (first item state of the component)
  const [item] = itemStatesOf(spec, framework);
  if (item) {
    lines.push(
      `${itemStateSelector(name, framework, item.part, item.key, item.values[0])} {\n  /* … */\n}`,
    );
  }
  return lines.join("\n\n");
}
