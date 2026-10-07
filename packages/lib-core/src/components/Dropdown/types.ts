import type { ReactNode, Ref } from "react";

export interface DropdownOption {
  /** Text of the menu item */
  label: string;
  /** Value of the menu item */
  value: string;
  /** Disables the menu item */
  disabled?: boolean;
}

export interface DropdownProps {
  /** Ref to the root element */
  ref?: Ref<HTMLDivElement>;
  /** Whether the menu is open (controlled; pair with onOpenChange) */
  open?: boolean;
  /**
   * Initial open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close */
  onOpenChange?: (open: boolean) => void;
  /**
   * Additional class name
   * @default ""
   */
  className?: string;
  /** Accessible label of the menu */
  ariaLabel?: string;
  /**
   * Disables the dropdown
   * @default false
   */
  disabled?: boolean;
  /**
   * Menu items
   * @default []
   */
  items?: DropdownOption[];
  /** Called with the selected item; the menu closes afterwards */
  onSelect?: (item: DropdownOption) => void;
  /**
   * Menu background color
   * @default "var(--surface-elevated-color)"
   */
  menuBgColor?: string;
  /**
   * Menu text color
   * @default "var(--text-color)"
   */
  menuTextColor?: string;
  /**
   * Menu box shadow
   * @default "var(--shadow-md)"
   */
  menuBoxShadow?: string;
  /**
   * Preferred side on which the menu opens; it flips to the opposite side
   * and shifts to stay inside the viewport
   * @default "down"
   */
  direction?: "down" | "up" | "left" | "right";
  /** Trigger element; a small "Dropdown" button is rendered when omitted */
  children?: ReactNode;
}
