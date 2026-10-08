// Selection of items of a collection (listbox, select, table rows, tree,
// tag group...): single or multiple, disabled items, a maximum count.
import { createMachine, type Machine } from "./store";

export type SelectionMode = "single" | "multiple";

export interface SelectionProps<V = string> {
  /** "single": at most one value; "multiple": any number. @default "single" */
  mode?: SelectionMode;
  /** Controlled selected values, in selection order (`undefined`: uncontrolled). */
  value?: readonly V[];
  /** Initial selected values while uncontrolled. @default [] */
  defaultValue?: readonly V[];
  /** Every selectable value, in order (used by SELECT_ALL). @default [] */
  items?: readonly V[];
  /**
   * Disabled values can't be selected; in multiple mode a selected disabled
   * value can't be deselected either.
   */
  isDisabled?: (value: V) => boolean;
  /** Most values selected at once in multiple mode. @default Infinity */
  max?: number;
  /**
   * Single mode: whether TOGGLE / DESELECT may empty the selection.
   * @default true
   */
  allowEmpty?: boolean;
  /** Called with the requested selection (controlled or not). */
  onValueChange?: (value: V[]) => void;
}

export interface SelectionState<V = string> {
  value: readonly V[];
}

export type SelectionEvent<V = string> =
  | { type: "SELECT"; value: V }
  | { type: "DESELECT"; value: V }
  | { type: "TOGGLE"; value: V }
  /** Replaces the selection (disabled values are left as they are). */
  | { type: "SET"; value: readonly V[] }
  /** Selects every enabled item (up to `max`; multiple mode only). */
  | { type: "SELECT_ALL" }
  /** Deselects every enabled value. */
  | { type: "CLEAR" };

export type SelectionMachine<V = string> = Machine<
  SelectionState<V>,
  SelectionEvent<V>,
  SelectionProps<V>
>;

/** Whether `value` is selected. */
export const isSelected = <V>(state: SelectionState<V>, value: V): boolean =>
  state.value.includes(value);

const sameValues = <V>(a: readonly V[], b: readonly V[]) =>
  a.length === b.length && a.every((v, i) => Object.is(v, b[i]));

/** Creates a selection machine. */
export function createSelectionMachine<V = string>(
  props: SelectionProps<V> = {},
): SelectionMachine<V> {
  const reduceValue = (
    current: readonly V[],
    event: SelectionEvent<V>,
    p: SelectionProps<V>,
  ): readonly V[] => {
    const multiple = p.mode === "multiple";
    const disabled = p.isDisabled ?? (() => false);
    const max = multiple ? (p.max ?? Infinity) : 1;
    const allowEmpty = multiple || (p.allowEmpty ?? true);
    // Disabled values stay selected in multiple mode; a single selection
    // can always be replaced by an enabled value.
    const locked = multiple ? current.filter(disabled) : [];

    const select = (value: V): readonly V[] => {
      if (disabled(value) || current.includes(value)) return current;
      if (!multiple) return [value];
      return current.length >= max ? current : [...current, value];
    };
    const deselect = (value: V): readonly V[] => {
      if (!current.includes(value) || (multiple && disabled(value))) {
        return current;
      }
      const next = current.filter((v) => !Object.is(v, value));
      return next.length === 0 && !allowEmpty ? current : next;
    };

    switch (event.type) {
      case "SELECT":
        return select(event.value);
      case "DESELECT":
        return deselect(event.value);
      case "TOGGLE":
        return current.includes(event.value)
          ? deselect(event.value)
          : select(event.value);
      case "SET": {
        const wanted = event.value.filter((v, i, all) => {
          return !disabled(v) && all.indexOf(v) === i;
        });
        const next = [...locked, ...wanted].slice(0, multiple ? max : 1);
        return next.length === 0 && !allowEmpty ? current : next;
      }
      case "SELECT_ALL": {
        if (!multiple) return current;
        const next = [...current];
        for (const v of p.items ?? []) {
          if (next.length >= max) break;
          if (!disabled(v) && !next.includes(v)) next.push(v);
        }
        return next;
      }
      case "CLEAR": {
        const next = multiple ? current.filter(disabled) : [];
        return next.length === 0 && !allowEmpty ? current : next;
      }
      default:
        return current;
    }
  };

  return createMachine<SelectionState<V>, SelectionEvent<V>, SelectionProps<V>>(
    {
      controlled: ["value"],
      initial: (p) => ({ value: p.value ?? p.defaultValue ?? [] }),
      reduce(state, event, p) {
        const value = reduceValue(state.value, event, p);
        return sameValues(value, state.value) ? state : { value };
      },
      changed(requested, prev, p) {
        if (!sameValues(requested.value, prev.value)) {
          p.onValueChange?.([...requested.value]);
        }
      },
    },
    props,
  );
}
