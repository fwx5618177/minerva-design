export interface TimePickerProps {
  /** Selected time (only read on mount; the date part is ignored) */
  value?: Date;
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
   * @default "Select time"
   */
  placeholder?: string;
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

export interface TimePickerPanelProps extends TimePickerProps {
  onTimeChange: (
    type: "hour" | "minute" | "second" | "ampm",
    value: number,
  ) => void;
  visible: boolean;
}
