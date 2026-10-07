import type { Ref } from "react";

export interface TimePickerProps {
  /** Ref to the <input> element */
  ref?: Ref<HTMLInputElement>;
  /**
   * Selected time (controlled; pair with onChange). `null` means "no time"
   * while staying controlled; `undefined` makes the picker uncontrolled.
   */
  value?: Date | null;
  /** Initially selected time (uncontrolled) */
  defaultValue?: Date;
  /** Called with the new time, or `undefined` when the value is cleared */
  onChange?: (date: Date | undefined) => void;
  /**
   * Display format: "HH:mm:ss", "HH:mm", "hh:mm:ss a" or "hh:mm a"
   * @default "HH:mm:ss"
   */
  format?: string; // 'HH:mm:ss' | 'hh:mm:ss a' | 'HH:mm' | 'hh:mm a'
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
  /** Accessible label of the input when no visible label is shown */
  ariaLabel?: string;
  /**
   * Name of the input
   * @default "time-picker"
   */
  name?: string;
  /** Called when the panel opens or closes */
  onOpenChange?: (open: boolean) => void;
  /**
   * Disables the picker
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
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Earliest selectable time; earlier options are disabled */
  minTime?: Date;
  /** Latest selectable time; later options are disabled */
  maxTime?: Date;
  /**
   * Shows the seconds column
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

export interface TimeUnit {
  value: number;
  disabled: boolean;
  label: string;
}

/** Props of the internal panel rendered by TimePicker */
export interface TimePickerPanelProps extends Omit<TimePickerProps, "value"> {
  /** Time shown as selected (the panel's reference time when nothing is selected) */
  value?: Date;
  /** Whether a time is actually selected (otherwise nothing is highlighted) */
  hasValue?: boolean;
  /** Called when a unit is picked */
  onTimeChange: (
    type: "hour" | "minute" | "second" | "ampm",
    value: number,
  ) => void;
  /** Whether the panel is visible */
  visible: boolean;
}
