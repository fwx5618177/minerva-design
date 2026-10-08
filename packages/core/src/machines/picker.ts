// Cascading picker columns (mobile wheel picker, cascader, region / date
// pickers): an options tree shown as one column per level. Choosing an
// option in column N keeps columns < N and recomputes every column > N
// (first enabled option of each level, or the previous choice when it still
// exists there).
import { createMachine, type Machine } from "./store";

/** A node of the options tree. */
export interface PickerOption<V = string> {
  value: V;
  label?: string;
  disabled?: boolean;
  /** Options of the next column when this one is chosen. */
  children?: readonly PickerOption<V>[];
}

/** A column derived from the tree and the value path. */
export interface PickerColumn<V = string> {
  options: readonly PickerOption<V>[];
  /** Index of the chosen option (`-1`: none, every option disabled). */
  selectedIndex: number;
}

export interface PickerProps<V = string> {
  /** Options of the first column (their `children` feed the next ones). */
  options: readonly PickerOption<V>[];
  /** Controlled value path, one value per column (`undefined`: uncontrolled). */
  value?: readonly V[];
  /** Initial value path while uncontrolled (missing levels pick the first enabled option). */
  defaultValue?: readonly V[];
  /** Called with the requested value path (controlled or not). */
  onValueChange?: (value: V[], selectedOptions: PickerOption<V>[]) => void;
}

export interface PickerState<V = string> {
  /** Value path, one value per column (always a valid path of the tree). */
  value: readonly V[];
}

export type PickerEvent<V = string> =
  /** Chooses the option at `index` of `column`. */
  | { type: "SELECT"; column: number; index: number }
  /** Moves the choice of `column` by `delta` enabled options (wheel, arrows), clamped. */
  | { type: "STEP"; column: number; delta: number }
  /** Replaces the value path. */
  | { type: "SET"; value: readonly V[] };

export type PickerMachine<V = string> = Machine<
  PickerState<V>,
  PickerEvent<V>,
  PickerProps<V>
>;

const firstEnabled = <V>(options: readonly PickerOption<V>[]) =>
  options.findIndex((o) => !o.disabled);

/**
 * Columns shown for a value path: every level down the chosen options
 * (a level whose value is missing or disabled falls back to its first
 * enabled option).
 */
export function getPickerColumns<V>(
  options: readonly PickerOption<V>[],
  value: readonly V[],
): PickerColumn<V>[] {
  const columns: PickerColumn<V>[] = [];
  let level: readonly PickerOption<V>[] | undefined = options;
  for (let depth = 0; level && level.length > 0; depth++) {
    let index: number = level.findIndex(
      (o) => !o.disabled && Object.is(o.value, value[depth]),
    );
    if (index < 0) index = firstEnabled(level);
    columns.push({ options: level, selectedIndex: index });
    level = index < 0 ? undefined : level[index].children;
  }
  return columns;
}

/** The options chosen in each column (the resolved value path). */
export const getPickerSelectedOptions = <V>(
  columns: readonly PickerColumn<V>[],
): PickerOption<V>[] =>
  columns
    .filter((c) => c.selectedIndex >= 0)
    .map((c) => c.options[c.selectedIndex]);

const resolve = <V>(options: readonly PickerOption<V>[], value: readonly V[]) =>
  getPickerSelectedOptions(getPickerColumns(options, value)).map(
    (o) => o.value,
  );

const samePath = <V>(a: readonly V[], b: readonly V[]) =>
  a.length === b.length && a.every((v, i) => Object.is(v, b[i]));

/** Creates a picker columns machine. */
export function createPickerMachine<V = string>(
  props: PickerProps<V>,
): PickerMachine<V> {
  return createMachine<PickerState<V>, PickerEvent<V>, PickerProps<V>>(
    {
      controlled: ["value"],
      initial: (p) => ({ value: p.value ?? p.defaultValue ?? [] }),
      reduce(state, event, p) {
        const columns = getPickerColumns(p.options, state.value);
        const path = getPickerSelectedOptions(columns).map((o) => o.value);
        const choose = (column: number, index: number) => {
          const option = columns[column]?.options[index];
          if (!option || option.disabled) return state;
          // Levels after `column` are recomputed (previous values are kept
          // when they still exist below the new choice).
          const value = resolve(p.options, [
            ...path.slice(0, column),
            option.value,
            ...path.slice(column + 1),
          ]);
          return samePath(value, state.value) ? state : { value };
        };
        switch (event.type) {
          case "SELECT":
            return choose(event.column, event.index);
          case "STEP": {
            const column = columns[event.column];
            if (!column || event.delta === 0) return state;
            const step = event.delta > 0 ? 1 : -1;
            let index = column.selectedIndex;
            let target = index;
            for (let moved = 0; moved < Math.abs(event.delta);) {
              index += step;
              if (index < 0 || index >= column.options.length) break;
              if (!column.options[index].disabled) {
                target = index;
                moved++;
              }
            }
            return choose(event.column, target);
          }
          case "SET": {
            const value = resolve(p.options, event.value);
            return samePath(value, state.value) ? state : { value };
          }
          default:
            return state;
        }
      },
      normalize(state, p) {
        const value = resolve(p.options, state.value);
        return samePath(value, state.value) ? state : { value };
      },
      changed(requested, prev, p) {
        if (samePath(requested.value, prev.value)) return;
        const selected = getPickerSelectedOptions(
          getPickerColumns(p.options, requested.value),
        );
        p.onValueChange?.([...requested.value], selected);
      },
    },
    props,
  );
}
