import { stylingHooks, type HookComponentName } from "./manifest";
import type { ComponentHookSpec } from "./types";
import {
  BOOLEAN_STATES,
  customStateName,
  itemPartName,
  stateAttribute,
  type StateKey,
} from "./vocabulary";

/** State hooks of a selector: `{ state: "open" }`, `{ disabled: true }`... */
export type StateSelector = Partial<Record<StateKey, string | true>>;

const isBoolean = (key: string) =>
  (BOOLEAN_STATES as readonly string[]).includes(key);

/** `[data-state="open"]`, `[data-disabled]`, `[data-size="small"]`... */
export function reactStateSelector(states: StateSelector = {}): string {
  return Object.entries(states)
    .map(([key, value]) =>
      isBoolean(key) || value === true
        ? `[${stateAttribute(key as StateKey)}]`
        : `[${stateAttribute(key as StateKey)}="${value}"]`,
    )
    .join("");
}

/** `:state(open)`, `:state(disabled)`, `:state(size-small)`... */
export function wcStateSelector(states: StateSelector = {}): string {
  return Object.entries(states)
    .map(
      ([key, value]) =>
        `:state(${customStateName(key as StateKey, value === true ? undefined : value)})`,
    )
    .join("");
}

/**
 * React selector of a component / part (compound: robust to portals and
 * nesting): `[data-minerva="button"][data-part="label"]`. Item states are
 * attributes of the part element too:
 * `reactSelector("menu", "item", undefined, { highlighted: true })` ->
 * `[data-minerva="menu"][data-part="item"][data-highlighted]`.
 */
export function reactSelector(
  component: HookComponentName | (string & {}),
  part?: string,
  states?: StateSelector,
  itemStates?: StateSelector,
): string {
  return `[data-minerva="${component}"]${part ? `[data-part="${part}"]` : ""}${reactStateSelector(states)}${reactStateSelector(itemStates)}`;
}

/**
 * The part names of an item in states (web components):
 * `wcItemParts("item", { highlighted: true })` -> `item item--highlighted`.
 */
export function wcItemParts(part: string, itemStates: StateSelector = {}) {
  return [
    part,
    ...Object.entries(itemStates).map(([key, value]) =>
      itemPartName(part, key as StateKey, value === true ? undefined : value),
    ),
  ].join(" ");
}

/**
 * Web component selector of a component / part; states are custom states
 * of the host: `minerva-button:state(loading)::part(label)`. Item states
 * (items rendered in the shadow root) are part names:
 * `wcSelector("menu", "item", undefined, { highlighted: true })` ->
 * `minerva-menu::part(item item--highlighted)`.
 */
export function wcSelector(
  component: HookComponentName | (string & {}),
  part?: string,
  states?: StateSelector,
  itemStates?: StateSelector,
): string {
  const spec = (stylingHooks as Record<string, ComponentHookSpec>)[component];
  const tag = spec?.wc ?? `minerva-${component}`;
  const parts = part && itemStates ? wcItemParts(part, itemStates) : part;
  return `${tag}${wcStateSelector(states)}${parts ? `::part(${parts})` : ""}`;
}

/** State keys and values, sorted (lock file) */
function sortedStates(states: ComponentHookSpec["states"]) {
  return Object.fromEntries(
    Object.keys(states)
      .sort()
      .map((key) => {
        const value = (states as Record<string, unknown>)[key];
        return [key, Array.isArray(value) ? [...value].sort() : value];
      }),
  );
}

/** The public hook surface (no descriptions): what the lock file records. */
export function hookSurface(
  manifest: Record<string, ComponentHookSpec> = stylingHooks,
) {
  return Object.fromEntries(
    Object.keys(manifest)
      .sort()
      .map((name) => {
        const spec = manifest[name];
        return [
          name,
          {
            react: [...spec.react].sort(),
            wc: spec.wc,
            parts: Object.fromEntries(
              Object.keys(spec.parts)
                .sort()
                .map((part) => {
                  const { states, only, itemStates } = spec.parts[part];
                  return [
                    part,
                    {
                      ...(states ? { states: [...states].sort() } : {}),
                      ...(only ? { only } : {}),
                      ...(itemStates
                        ? { itemStates: sortedStates(itemStates) }
                        : {}),
                    },
                  ];
                }),
            ),
            states: sortedStates(spec.states),
          },
        ];
      }),
  );
}
