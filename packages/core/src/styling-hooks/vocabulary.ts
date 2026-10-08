/**
 * The state vocabulary of Minerva's public styling hooks: one set of names
 * shared by every component, in React (`data-*` attributes) and in the web
 * components (custom states, `:state()`).
 *
 * | Kind    | React                     | Web components         |
 * | ------- | ------------------------- | ---------------------- |
 * | state   | `[data-state="open"]`     | `:state(open)`         |
 * | boolean | `[data-disabled]`         | `:state(disabled)`     |
 * | keyed   | `[data-size="small"]`     | `:state(size-small)`   |
 *
 * Adding a name here is a minor change; removing or renaming one is a major
 * change (see `STABILITY_POLICY`).
 */

/** Values of `data-state` (`:state(<value>)` on the web components) */
export const STATE_VALUES = [
  "open",
  "closed",
  "checked",
  "unchecked",
  "indeterminate",
  "active",
  "inactive",
] as const;

/**
 * Boolean states: `data-<name>=""` while true, absent while false
 * (`:state(<name>)` on the web components)
 */
export const BOOLEAN_STATES = [
  "disabled",
  "invalid",
  "readonly",
  "loading",
  "required",
  "highlighted",
  "current",
  "dragging",
] as const;

/**
 * Keyed states: `data-<name>="<value>"` (`:state(<name>-<value>)` on the
 * web components). The values are listed per component.
 */
export const KEYED_STATES = [
  "size",
  "variant",
  "color",
  "orientation",
  "side",
  "align",
  "placement",
  "shape",
  "status",
] as const;

export type StateValue = (typeof STATE_VALUES)[number];
export type BooleanState = (typeof BOOLEAN_STATES)[number];
export type KeyedState = (typeof KEYED_STATES)[number];
/** Every state hook key: `state`, a boolean state or a keyed state */
export type StateKey = "state" | BooleanState | KeyedState;

/** Attribute names of the hooks rendered by the React components */
export const ATTRIBUTES = {
  component: "data-minerva",
  part: "data-part",
} as const;

/** The React attribute of a state key (`size` -> `data-size`). */
export const stateAttribute = (key: StateKey): `data-${string}` =>
  `data-${key}`;

/**
 * The custom state name (`:state(<name>)`) of a web component state:
 * `state` -> its value, a boolean -> its key, a keyed state -> `key-value`.
 */
export function customStateName(key: StateKey, value?: string): string {
  if (key === "state") return String(value);
  if ((BOOLEAN_STATES as readonly string[]).includes(key)) return key;
  return `${key}-${value}`;
}

/**
 * Stability policy of the hook surface (`styling-hooks.lock.json`):
 * adding a component, part, state key or value is a minor change; removing
 * or renaming one (or moving a state to another part) is a major change.
 * CSS classes, the DOM structure and the elements that carry no hook are
 * private and may change in any release.
 */
export const STABILITY_POLICY =
  "Adding a component, part, state or state value is a minor change. Removing or renaming one is a major change. Class names and DOM structure without hooks are private.";
