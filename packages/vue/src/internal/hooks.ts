import type {
  HookComponentName,
  HookPartName,
  StateKey,
} from "@minerva/core/styling-hooks";

/**
 * State hook values: a string / number for `state` and the keyed states
 * (`data-size="small"`), a boolean for the boolean states (`data-disabled=""`
 * while true). Nothing is rendered for `undefined` / `null` / `false`.
 */
export type HookStates = Partial<
  Record<StateKey, string | number | boolean | null | undefined>
>;

/** `data-*` attributes of a styling hook (bound with `v-bind`). */
export type HookAttributes = Record<`data-${string}`, string | undefined>;

/**
 * The public styling hooks of an element: `data-minerva="<component>"`,
 * `data-part="<part>"` and the state attributes: the same DOM contract as
 * the React renderer (manifest of `minerva-design/styling-hooks`). Bind it
 * LAST (`v-bind="{ ...$attrs, ...hooks(...) }"`): the hooks are the
 * component's public contract and cannot be overridden by attributes.
 */
export function hooks<C extends HookComponentName>(
  component: C,
  part: HookPartName<C>,
  states?: HookStates,
): HookAttributes {
  const attributes: HookAttributes = {
    "data-minerva": component,
    "data-part": part,
  };
  if (states) {
    for (const key in states) {
      const value = states[key as StateKey];
      if (value === true) attributes[`data-${key}`] = "";
      else if (value !== undefined && value !== null && value !== false) {
        attributes[`data-${key}`] = String(value);
      }
    }
  }
  return attributes;
}

/** Picks the `data-*` entries of `attrs` (to bind onto a root element). */
export function pickDataAttributes(
  attrs: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith("data-")) result[key] = value;
  }
  return result;
}
