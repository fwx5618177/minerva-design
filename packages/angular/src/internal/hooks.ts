import { Directive, input } from "@angular/core";
import type { HookComponentName, StateKey } from "@minerva/core/styling-hooks";

/**
 * State hook values: a string / number for `state` and the keyed states
 * (`data-size="small"`), a boolean for the boolean states (`data-disabled=""`
 * while true). Nothing is rendered for `undefined` / `null` / `false`.
 */
export type HookStates = Partial<
  Record<StateKey, string | number | boolean | null | undefined>
>;

/** The attribute value of a state hook (`null`: no attribute) */
export function hookValue(
  value: string | number | boolean | null | undefined,
): string | null {
  if (value === true) return "";
  if (value === undefined || value === null || value === false) return null;
  return String(value);
}

/**
 * The public styling hooks of an inner element (same contract as React):
 * `data-minerva="<component>"`, `data-part="<part>"` and the state attributes
 * of `minerva-design/styling-hooks`.
 *
 * Host bindings only (no DOM access), so the attributes are part of the
 * server render and of hydration. A component's own host element binds its
 * root hooks in its `host` metadata instead.
 *
 * @example
 * <span mnHook="button" mnPart="label" [mnStates]="{ loading: loading() }"></span>
 */
@Directive({
  selector: "[mnHook]",
  host: {
    "[attr.data-minerva]": "mnHook()",
    "[attr.data-part]": "mnPart()",
    "[attr.data-state]": 'attr("state")',
    "[attr.data-disabled]": 'attr("disabled")',
    "[attr.data-invalid]": 'attr("invalid")',
    "[attr.data-readonly]": 'attr("readonly")',
    "[attr.data-loading]": 'attr("loading")',
    "[attr.data-required]": 'attr("required")',
    "[attr.data-highlighted]": 'attr("highlighted")',
    "[attr.data-current]": 'attr("current")',
    "[attr.data-dragging]": 'attr("dragging")',
    "[attr.data-selected]": 'attr("selected")',
    "[attr.data-expanded]": 'attr("expanded")',
    "[attr.data-today]": 'attr("today")',
    "[attr.data-outside]": 'attr("outside")',
    "[attr.data-size]": 'attr("size")',
    "[attr.data-variant]": 'attr("variant")',
    "[attr.data-color]": 'attr("color")',
    "[attr.data-orientation]": 'attr("orientation")',
    "[attr.data-side]": 'attr("side")',
    "[attr.data-align]": 'attr("align")',
    "[attr.data-placement]": 'attr("placement")',
    "[attr.data-shape]": 'attr("shape")',
    "[attr.data-status]": 'attr("status")',
    "[attr.data-sort]": 'attr("sort")',
    "[attr.data-fill]": 'attr("fill")',
  },
})
export class MnHook {
  /** Component of the hook (`data-minerva`) */
  readonly mnHook = input.required<HookComponentName>();
  /** Part of the component (`data-part`) */
  readonly mnPart = input<string>("root");
  /** State hooks of the element */
  readonly mnStates = input<HookStates | null | undefined>(undefined);

  protected attr(key: StateKey): string | null {
    return hookValue(this.mnStates()?.[key]);
  }
}
