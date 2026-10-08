/**
 * Public state hooks of the elements: custom states of the host
 * (`ElementInternals.states`), styled with `:state()`:
 *
 *   minerva-modal:state(open)::part(content) { ... }
 *   minerva-button:state(loading) { ... }
 *   minerva-button:state(size-small) { ... }
 *
 * Same vocabulary as the React components' `data-*` attributes (manifest:
 * `minerva-design/styling-hooks`): `data-state="open"` -> `:state(open)`,
 * `data-disabled` -> `:state(disabled)`, `data-size="small"` ->
 * `:state(size-small)`. Custom states add no host attribute, so they never
 * cause hydration mismatches and survive DOM morphing.
 *
 * Engines without `:state()` support but with the legacy dashed syntax
 * (Chromium 90-124) get `--<name>` (`:--open`); engines without
 * `CustomStateSet` get no state hooks (the host attributes such as `[open]`
 * / `[disabled]` remain).
 */
import { attachInternals } from "./internals";

/**
 * State hook values (see `hooks()` of React): a string / number for
 * `state` (`:state(open)`) and the keyed states (`:state(size-small)`), a
 * boolean for the boolean states (`:state(disabled)` while true).
 */
export type HookStates = Partial<
  Record<string, string | number | boolean | null | undefined>
>;

/** Custom state names of a set of state hooks. */
export function customStateNames(states: HookStates): Set<string> {
  const names = new Set<string>();
  for (const key in states) {
    const value = states[key];
    if (value === true) names.add(key);
    else if (value !== undefined && value !== null && value !== false) {
      names.add(key === "state" ? String(value) : `${key}-${value}`);
    }
  }
  return names;
}

/**
 * The `part` attribute of an item rendered in a shadow root, with its item
 * states as `<part>--<state>` part names (same vocabulary as the custom
 * states), so consumers combine them in `::part()`:
 *
 *   itemParts("item", { highlighted: true, state: "checked" })
 *   // "item item--checked item--highlighted"
 *   minerva-menu::part(item item--highlighted) { ... }
 *
 * Shadow content only: no host attribute, nothing to hydrate.
 */
export function itemParts(part: string, states: HookStates): string {
  let names = part;
  for (const name of customStateNames(states)) names += ` ${part}--${name}`;
  return names;
}

/** States currently applied to each element (also where unsupported) */
const applied = new WeakMap<Element, Set<string>>();

type StateSet = { add(name: string): unknown; delete(name: string): unknown };

function add(set: StateSet, name: string) {
  try {
    set.add(name);
  } catch {
    // legacy syntax: Chromium 90-124 (and element-internals-polyfill)
    try {
      set.add(`--${name}`);
    } catch {
      // not a valid state name for this engine: skipped
    }
  }
}

function remove(set: StateSet, name: string) {
  set.delete(name);
  set.delete(`--${name}`);
}

/** Applies the state hooks of `el` (adds the new ones, removes the others). */
export function setCustomStates(el: HTMLElement, states: HookStates): void {
  const next = customStateNames(states);
  const previous = applied.get(el) ?? new Set<string>();
  applied.set(el, next);
  const set = (attachInternals(el) as { states?: StateSet } | null)?.states;
  if (!set) return;
  for (const name of previous) if (!next.has(name)) remove(set, name);
  for (const name of next) if (!previous.has(name)) add(set, name);
}

/** The state hooks applied to `el` (`:state()` names; tests and tooling). */
export function customStates(el: Element): ReadonlySet<string> {
  return applied.get(el) ?? new Set<string>();
}
