// Number stepper (number input / spin button): a value within min..max moved
// by `step` (rounded to `precision`), a draft text while typing, committed
// (parsed, clamped, rounded) on blur / Enter.
import {
  clampNumber,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
} from "../number-input";
import { createMachine, type Machine } from "./store";

export interface NumberStepperProps {
  /** Controlled value; `null` is empty (`undefined`: uncontrolled). */
  value?: number | null;
  /** @default null */
  defaultValue?: number | null;
  min?: number;
  max?: number;
  /** @default 1 */
  step?: number;
  /** Decimals kept. @default the decimals of `step` */
  precision?: number;
  /** PageUp / PageDown move by `step * pageMultiplier`. @default 10 */
  pageMultiplier?: number;
  /** Committed text out of range is clamped (else kept as is). @default true */
  clampOnBlur?: boolean;
  /** Ignores every event. */
  disabled?: boolean;
  /** Ignores every event. */
  readOnly?: boolean;
  /** Called with the requested value (controlled or not). */
  onValueChange?: (value: number | null) => void;
}

export interface NumberStepperState {
  value: number | null;
  /** Text being typed (`null`: not editing, the formatted value is shown). */
  draft: string | null;
}

export type NumberStepperEvent =
  /** Adds `step * (multiplier ?? 1)`. */
  | { type: "INCREMENT"; multiplier?: number }
  | { type: "DECREMENT"; multiplier?: number }
  /** Sets a value (clamped and rounded); `null` empties the field. */
  | { type: "SET"; value: number | null }
  /** Text typed into the field. */
  | { type: "INPUT"; text: string }
  /** Commits the draft (blur, Enter). */
  | { type: "COMMIT" }
  /** ArrowUp / ArrowDown: one step; PageUp / PageDown: a page; Home / End: min / max. */
  | { type: "KEY"; key: string };

export type NumberStepperMachine = Machine<
  NumberStepperState,
  NumberStepperEvent,
  NumberStepperProps
>;

const precisionOf = (p: NumberStepperProps) =>
  p.precision ?? inferStepPrecision(p.step ?? 1);

/** `n` rounded to the stepper's precision and clamped to min..max. */
export const normalizeStepperValue = (
  n: number,
  p: NumberStepperProps,
): number => {
  const rounded = Number(n.toFixed(precisionOf(p)));
  return clampNumber(rounded, p.min, p.max);
};

/** Text shown by the field: the draft, else the formatted value. */
export const getNumberStepperText = (
  state: NumberStepperState,
  props: NumberStepperProps,
): string => state.draft ?? formatNumberValue(state.value, precisionOf(props));

/** Whether INCREMENT would change the value. */
export const canIncrementStepper = (
  state: NumberStepperState,
  p: NumberStepperProps,
): boolean =>
  !p.disabled &&
  !p.readOnly &&
  (state.value === null || p.max === undefined || state.value < p.max);

/** Whether DECREMENT would change the value. */
export const canDecrementStepper = (
  state: NumberStepperState,
  p: NumberStepperProps,
): boolean =>
  !p.disabled &&
  !p.readOnly &&
  (state.value === null || p.min === undefined || state.value > p.min);

/** Creates a number stepper machine. */
export function createNumberStepperMachine(
  props: NumberStepperProps = {},
): NumberStepperMachine {
  return createMachine<
    NumberStepperState,
    NumberStepperEvent,
    NumberStepperProps
  >(
    {
      controlled: ["value"],
      initial: (p) => ({
        value: p.value !== undefined ? p.value : (p.defaultValue ?? null),
        draft: null,
      }),
      reduce(state, event, p) {
        if (p.disabled || p.readOnly) return state;
        const step = p.step ?? 1;
        const set = (value: number | null): NumberStepperState =>
          Object.is(value, state.value) && state.draft === null
            ? state
            : { value, draft: null };
        const move = (delta: number) => {
          // From empty: start at 0 (or the nearest bound)
          const base = state.value ?? clampNumber(0, p.min, p.max);
          const target = state.value === null ? base : base + delta;
          return set(normalizeStepperValue(target, p));
        };
        switch (event.type) {
          case "INCREMENT":
            return move(step * (event.multiplier ?? 1));
          case "DECREMENT":
            return move(-step * (event.multiplier ?? 1));
          case "SET":
            return set(
              event.value === null || Number.isNaN(event.value)
                ? null
                : normalizeStepperValue(event.value, p),
            );
          case "INPUT":
            return event.text === state.draft
              ? state
              : { ...state, draft: event.text };
          case "COMMIT": {
            if (state.draft === null) return state;
            if (state.draft.trim() === "") return set(null);
            const parsed = parseNumberDraft(state.draft);
            // Invalid text: back to the current value
            if (parsed === null) return { ...state, draft: null };
            const rounded = Number(parsed.toFixed(precisionOf(p)));
            return set(
              (p.clampOnBlur ?? true)
                ? clampNumber(rounded, p.min, p.max)
                : rounded,
            );
          }
          case "KEY": {
            const page = p.pageMultiplier ?? 10;
            switch (event.key) {
              case "ArrowUp":
                return move(step);
              case "ArrowDown":
                return move(-step);
              case "PageUp":
                return move(step * page);
              case "PageDown":
                return move(-step * page);
              case "Home":
                return p.min === undefined ? state : set(p.min);
              case "End":
                return p.max === undefined ? state : set(p.max);
              default:
                return state;
            }
          }
          default:
            return state;
        }
      },
      changed(requested, prev, p) {
        if (!Object.is(requested.value, prev.value)) {
          p.onValueChange?.(requested.value);
        }
      },
    },
    props,
  );
}
