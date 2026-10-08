export type NumberInputSize = "small" | "medium" | "large";

/**
 * Props of `NumberInput` (same names and defaults as the React
 * `NumberInputProps`; the value is `v-model`). The `class` goes to the
 * wrapper; other attributes and native listeners go to the `<input>`.
 */
export interface NumberInputProps {
  /** Current value (controlled, `v-model`); `null` is an empty field. Omit for an uncontrolled field */
  modelValue?: number | null;
  /**
   * Initial value of an uncontrolled field
   * @default null
   */
  defaultValue?: number | null;
  /** Smallest allowed value; committed values are clamped to it */
  min?: number;
  /** Largest allowed value; committed values are clamped to it */
  max?: number;
  /**
   * Amount added / removed by ArrowUp / ArrowDown and the stepper
   * @default 1
   */
  step?: number;
  /** Decimal places of the value; inferred from step when omitted (step 0.01 -> 2) */
  precision?: number;
  /**
   * Field size
   * @default "medium"
   */
  size?: NumberInputSize;
  /**
   * Error state (also set by an invalid FormControl or an out-of-range draft)
   * @default false
   */
  invalid?: boolean;
  /**
   * Disables the field (also set by FormControl)
   * @default false
   */
  disabled?: boolean;
  /**
   * Focusable and copyable, but typing and stepping do not change the value
   * (also set by FormControl)
   * @default false
   */
  readOnly?: boolean;
  /** Marks the field as required. @default false */
  required?: boolean;
  /** id of the input (defaults to the enclosing FormControl's id) */
  id?: string;
  /**
   * Shows increment / decrement buttons; the arrow keys always work
   * @default false
   */
  showStepper?: boolean;
  /**
   * Clearing the field commits `null`; otherwise it falls back to min (or 0)
   * @default true
   */
  allowEmpty?: boolean;
  /**
   * Accessible label of the increment button
   * @default "Increase" (localized)
   */
  incrementLabel?: string;
  /**
   * Accessible label of the decrement button
   * @default "Decrease" (localized)
   */
  decrementLabel?: string;
  /**
   * Hint shown (as the wrapper title) while the draft is not a number
   * @default "Enter a number" (localized)
   */
  notANumberMessage?: string;
  /**
   * Hint shown while the draft is below min
   * @default "Minimum {min}" (localized)
   */
  belowMinMessage?: string;
  /**
   * Hint shown while the draft is above max
   * @default "Maximum {max}" (localized)
   */
  aboveMaxMessage?: string;
}
