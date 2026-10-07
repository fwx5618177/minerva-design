export interface SwitchProps {
  /** Whether the switch is on (controlled) */
  checked?: boolean;
  /**
   * Initial state (uncontrolled)
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Disables the switch
   * @default false
   */
  disabled?: boolean;
  /**
   * Switch size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /**
   * Color when on: a theme color name or any CSS color
   * @default "primary"
   */
  color?: "primary" | "secondary" | "success" | "warning" | "error" | string;
  /**
   * Shape of the track and thumb
   * @default "round"
   */
  shape?: "round" | "square";
  /** Label displayed next to the switch */
  label?: React.ReactNode;
  /**
   * Position of the label relative to the switch
   * @default "end"
   */
  labelPlacement?: "start" | "end" | "top" | "bottom";
  /**
   * Shows a loading state and blocks interaction
   * @default false
   */
  loading?: boolean;
  /**
   * Shows a ripple effect on click
   * @default true
   */
  ripple?: boolean;
  /** Additional class name */
  className?: string;
  /** Inline styles of the root label element */
  labelStyle?: React.CSSProperties;
  /** Inline styles of the track */
  trackStyle?: React.CSSProperties;
  /** Inline styles of the thumb */
  thumbStyle?: React.CSSProperties;
  /** Called when the state changes */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  /** Called when the switch receives focus */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when the switch loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /**
   * Icon position: inside the thumb ("start") or after the switch ("end")
   * @default "start"
   */
  iconPlacement?: "start" | "end";
}
