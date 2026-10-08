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

/** `data-*` attributes of a styling hook (spread onto the element). */
export type HookAttributes = Record<`data-${string}`, string | undefined>;

/**
 * The public styling hooks of an element: `data-minerva="<component>"`,
 * `data-part="<part>"` and the state attributes. Spread it AFTER the props
 * forwarded from the user (`{...rest} {...hooks(...)}`): the hooks are the
 * component's public contract and cannot be overridden.
 *
 * The names are checked against the manifest of `minerva-design/styling-hooks`
 * at compile time; the contract tests (tests/styling-hooks) check that the
 * rendered DOM matches it.
 *
 * @example
 * <button {...rest} {...hooks("button", "root", { disabled, size })} />
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
