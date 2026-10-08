/**
 * Props of `TimePicker` (same names and defaults as the React
 * `TimePickerProps`). The selected time is `v-model` (`modelValue`);
 * `class`, `style` and `data-*` attributes fall through to the root element.
 */
export interface TimePickerProps {
  /**
   * Selected time (controlled, `v-model`). `null` means "no time" while
   * staying controlled; `undefined` makes the picker uncontrolled.
   */
  modelValue?: Date | null;
  /** Initially selected time (uncontrolled) */
  defaultValue?: Date;
  /**
   * Display format: "HH:mm:ss", "HH:mm", "hh:mm:ss a" or "hh:mm a"
   * @default "HH:mm:ss"
   */
  format?: string;
  /**
   * Uses a 12-hour clock with an AM/PM column
   * @default false
   */
  use12Hours?: boolean;
  /**
   * Placeholder of the input
   * @default "Select time" (localized)
   */
  placeholder?: string;
  /** Visible label of the input; without it the input is labelled "Time" (localized) */
  label?: string;
  /** Accessible label of the input when no visible label is shown (`aria-label`) */
  ariaLabel?: string;
  /**
   * Id(s) of the element(s) labelling the input (`aria-labelledby`); inside
   * a FormControl it defaults to the FormLabel (unless `label` /
   * `aria-label` is set)
   */
  ariaLabelledby?: string;
  /**
   * Id(s) of the element(s) describing the input (`aria-describedby`);
   * merged with the helper / error text of an enclosing FormControl
   */
  ariaDescribedby?: string;
  /** Id of the input; defaults to the id of an enclosing FormControl */
  id?: string;
  /**
   * Marks the input as required; defaults to the enclosing FormControl's state
   */
  required?: boolean;
  /**
   * Shows the value without allowing changes (typing, panel, clearing);
   * defaults to the enclosing FormControl's state
   */
  readOnly?: boolean;
  /**
   * Marks the input as invalid (aria-invalid); defaults to the enclosing
   * FormControl's state
   */
  invalid?: boolean;
  /**
   * Name of the input
   * @default "time-picker"
   */
  name?: string;
  /**
   * Disables the picker; defaults to the enclosing FormControl's state
   * @default false
   */
  disabled?: boolean;
  /**
   * Allows clearing the value with the suffix button
   * @default true
   */
  clearable?: boolean;
  /**
   * Size of the input and panel
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Earliest selectable time; earlier options are disabled */
  minTime?: Date;
  /** Latest selectable time; later options are disabled */
  maxTime?: Date;
  /**
   * Shows seconds. `false` also removes the seconds token from `format`
   * ("HH:mm:ss" -> "HH:mm"): the format in use is the single source of truth
   * of the seconds column, the displayed text and parsing
   * @default true
   */
  showSecond?: boolean;
  /**
   * Interval between hour options
   * @default 1
   */
  hourStep?: number;
  /**
   * Interval between minute options
   * @default 1
   */
  minuteStep?: number;
  /**
   * Interval between second options
   * @default 1
   */
  secondStep?: number;
}

/** Emits of `TimePicker` */
export interface TimePickerEmits {
  /** `v-model`: the new time, `null` when cleared */
  "update:modelValue": [value: Date | null];
  /** The new time, or `undefined` when the value is cleared */
  change: [date: Date | undefined];
  /** The panel opened or closed */
  openChange: [open: boolean];
}

export interface TimeUnit {
  value: number;
  disabled: boolean;
  label: string;
}

/** A column of the panel */
export type TimeUnitKind = "hour" | "minute" | "second" | "ampm";

/** Props of the internal panel rendered by TimePicker */
export interface TimePickerPanelProps {
  /** Time shown as selected (the panel's reference time when nothing is selected) */
  value?: Date;
  /**
   * Whether a time is actually selected (otherwise nothing is highlighted)
   * @default true
   */
  hasValue?: boolean;
  /** Display format */
  format?: string;
  /** Uses a 12-hour clock with an AM/PM column */
  use12Hours?: boolean;
  /** Shows the seconds column */
  showSecond?: boolean;
  /** @default 1 */
  hourStep?: number;
  /** @default 1 */
  minuteStep?: number;
  /** @default 1 */
  secondStep?: number;
  /** Earliest selectable time */
  minTime?: Date;
  /** Latest selectable time */
  maxTime?: Date;
  /** Whether the panel is visible */
  visible: boolean;
  /**
   * Move focus to the first column's selected (or first enabled) unit when
   * the panel becomes visible (opened from the keyboard).
   * @default false
   */
  focusOnOpen?: boolean;
}

/** Emits of the internal panel */
export interface TimePickerPanelEmits {
  /** A unit was picked (the React `onTimeChange`) */
  timeChange: [type: TimeUnitKind, value: number];
}
