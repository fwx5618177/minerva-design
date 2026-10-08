// Toggles: checkbox (with the indeterminate / mixed state), switch and radio
// group (single selection, roving focus: arrows move and check).
import {
  getNextIndex,
  type Direction,
  type Orientation,
} from "../keyboard-navigation";
import { createMachine, type Machine } from "./store";

// ---------------------------------------------------------------------------
// Checkbox

export interface CheckboxMachineProps {
  /** Controlled checked state (`undefined`: uncontrolled). */
  checked?: boolean;
  /** @default false */
  defaultChecked?: boolean;
  /** Controlled indeterminate (mixed) state (`undefined`: uncontrolled). */
  indeterminate?: boolean;
  /** @default false */
  defaultIndeterminate?: boolean;
  /** Ignores TOGGLE / SET. */
  disabled?: boolean;
  /** Ignores TOGGLE / SET. */
  readOnly?: boolean;
  /** Called when the user checks / unchecks (an indeterminate box becomes checked). */
  onCheckedChange?: (checked: boolean) => void;
  /** Called when the indeterminate state is requested to change. */
  onIndeterminateChange?: (indeterminate: boolean) => void;
}

export interface CheckboxMachineState {
  checked: boolean;
  indeterminate: boolean;
}

export type CheckboxMachineEvent =
  /** An indeterminate box becomes checked; otherwise `checked` flips. */
  { type: "TOGGLE" } | { type: "SET"; checked: boolean };

export type CheckboxMachine = Machine<
  CheckboxMachineState,
  CheckboxMachineEvent,
  CheckboxMachineProps
>;

/** `aria-checked` of a checkbox: "mixed" while indeterminate. */
export const getCheckboxAriaChecked = (
  state: CheckboxMachineState,
): "true" | "false" | "mixed" =>
  state.indeterminate ? "mixed" : state.checked ? "true" : "false";

/** Creates a checkbox machine. */
export function createCheckboxMachine(
  props: CheckboxMachineProps = {},
): CheckboxMachine {
  return createMachine<
    CheckboxMachineState,
    CheckboxMachineEvent,
    CheckboxMachineProps
  >(
    {
      controlled: ["checked", "indeterminate"],
      initial: (p) => ({
        checked: p.checked ?? p.defaultChecked ?? false,
        indeterminate: p.indeterminate ?? p.defaultIndeterminate ?? false,
      }),
      reduce(state, event, p) {
        if (p.disabled || p.readOnly) return state;
        const checked =
          event.type === "TOGGLE"
            ? state.indeterminate || !state.checked
            : event.checked;
        return checked === state.checked && !state.indeterminate
          ? state
          : { checked, indeterminate: false };
      },
      changed(requested, prev, p) {
        if (requested.checked !== prev.checked || prev.indeterminate) {
          p.onCheckedChange?.(requested.checked);
        }
        if (requested.indeterminate !== prev.indeterminate) {
          p.onIndeterminateChange?.(requested.indeterminate);
        }
      },
    },
    props,
  );
}

// ---------------------------------------------------------------------------
// Switch

export interface SwitchMachineProps {
  /** Controlled state (`undefined`: uncontrolled). */
  checked?: boolean;
  /** @default false */
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  /** Called with the requested state (controlled or not). */
  onCheckedChange?: (checked: boolean) => void;
}

export interface SwitchMachineState {
  checked: boolean;
}

export type SwitchMachineEvent =
  { type: "TOGGLE" } | { type: "SET"; checked: boolean };

export type SwitchMachine = Machine<
  SwitchMachineState,
  SwitchMachineEvent,
  SwitchMachineProps
>;

/** Creates a switch machine. */
export function createSwitchMachine(
  props: SwitchMachineProps = {},
): SwitchMachine {
  return createMachine<
    SwitchMachineState,
    SwitchMachineEvent,
    SwitchMachineProps
  >(
    {
      controlled: ["checked"],
      initial: (p) => ({ checked: p.checked ?? p.defaultChecked ?? false }),
      reduce(state, event, p) {
        if (p.disabled || p.readOnly) return state;
        const checked =
          event.type === "TOGGLE" ? !state.checked : event.checked;
        return checked === state.checked ? state : { checked };
      },
      changed(requested, prev, p) {
        if (requested.checked !== prev.checked) {
          p.onCheckedChange?.(requested.checked);
        }
      },
    },
    props,
  );
}

// ---------------------------------------------------------------------------
// Radio group

/** An option of a radio group. */
export interface RadioGroupItem {
  value: string;
  disabled?: boolean;
}

export interface RadioGroupMachineProps {
  /** Controlled checked value (`undefined`: uncontrolled; `null`: none). */
  value?: string | null;
  /** @default null */
  defaultValue?: string | null;
  /** Options in order (events may pass their own list). @default [] */
  items?: readonly RadioGroupItem[];
  /** Disables the whole group. */
  disabled?: boolean;
  readOnly?: boolean;
  /** Which arrow keys move. @default "both" */
  orientation?: Orientation;
  /** @default "ltr" */
  dir?: Direction;
  /** @default true */
  loop?: boolean;
  /** Called with the requested value (controlled or not). */
  onValueChange?: (value: string) => void;
}

export interface RadioGroupMachineState {
  value: string | null;
  /** Option holding the focus (`null`: focus outside the group). */
  focusedValue: string | null;
}

export type RadioGroupMachineEvent =
  /** Click / Space on an option. */
  | { type: "SELECT"; value: string }
  | { type: "FOCUS"; value: string }
  | { type: "BLUR" }
  /**
   * An arrow key: moves the focus to the next enabled option and checks it
   * (the renderer focuses `focusedValue`). Home / End are not part of the
   * radio pattern and are ignored.
   */
  | { type: "NAVIGATE"; key: string; items?: readonly RadioGroupItem[] };

export type RadioGroupMachine = Machine<
  RadioGroupMachineState,
  RadioGroupMachineEvent,
  RadioGroupMachineProps
>;

/**
 * The option holding the roving tab stop: the checked one when enabled, else
 * the first enabled option.
 */
export const getRadioGroupTabStop = (
  items: readonly RadioGroupItem[],
  value: string | null,
): RadioGroupItem | undefined =>
  items.find((item) => item.value === value && !item.disabled) ??
  items.find((item) => !item.disabled);

/** Creates a radio group machine. */
export function createRadioGroupMachine(
  props: RadioGroupMachineProps = {},
): RadioGroupMachine {
  const isItemDisabled = (p: RadioGroupMachineProps, value: string) =>
    !!p.items?.find((item) => item.value === value)?.disabled;

  return createMachine<
    RadioGroupMachineState,
    RadioGroupMachineEvent,
    RadioGroupMachineProps
  >(
    {
      controlled: ["value"],
      initial: (p) => ({
        value: p.value !== undefined ? p.value : (p.defaultValue ?? null),
        focusedValue: null,
      }),
      reduce(state, event, p) {
        switch (event.type) {
          case "SELECT":
            if (p.disabled || p.readOnly || isItemDisabled(p, event.value)) {
              return state;
            }
            return event.value === state.value
              ? state
              : { ...state, value: event.value };
          case "FOCUS":
            return event.value === state.focusedValue
              ? state
              : { ...state, focusedValue: event.value };
          case "BLUR":
            return state.focusedValue === null
              ? state
              : { ...state, focusedValue: null };
          case "NAVIGATE": {
            if (p.disabled || event.key === "Home" || event.key === "End") {
              return state;
            }
            const items = event.items ?? p.items ?? [];
            const from = state.focusedValue ?? state.value;
            const next = getNextIndex({
              currentIndex: items.findIndex((item) => item.value === from),
              count: items.length,
              key: event.key,
              orientation: p.orientation ?? "both",
              dir: p.dir,
              loop: p.loop,
              isDisabled: (index) => !!items[index].disabled,
            });
            if (next === null) return state;
            const value = items[next].value;
            return {
              focusedValue: value,
              value: p.readOnly ? state.value : value,
            };
          }
          default:
            return state;
        }
      },
      changed(requested, prev, p) {
        if (requested.value !== prev.value && requested.value !== null) {
          p.onValueChange?.(requested.value);
        }
      },
    },
    props,
  );
}
