import type { Ref } from "react";

export interface ChipProps {
  /** Text of the chip */
  label: string;
  /**
   * Visual style
   * @default "filled"
   */
  variant?: "filled" | "outlined" | "soft";
  /**
   * Color scheme
   * @default "default"
   */
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
  /**
   * Chip size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  /** Icon displayed before the label */
  icon?: React.ReactNode;
  /** Avatar displayed before the label */
  avatar?: React.ReactNode;
  /** Called when the delete button is clicked; providing it shows the delete button */
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Called when the chip is clicked (requires clickable) */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Disables the chip and hides the delete button
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Custom delete icon */
  deleteIcon?: React.ReactNode;
  /**
   * Accessible label for the delete button
   * @default "Remove {label}" (localized)
   */
  deleteLabel?: string;
  /**
   * Renders the chip content as a native button (focusable, activated with
   * Enter / Space). With onDelete, the delete button is a sibling button
   * @default false
   */
  clickable?: boolean;
  /**
   * Shows a spinner before the label
   * @default false
   */
  loading?: boolean;
  /**
   * Shows the selected state; on clickable chips it is also exposed as
   * aria-pressed (when set)
   * @default false
   */
  selected?: boolean;
  /** Ref to the root element */
  ref?: Ref<HTMLDivElement>;
}
