export interface DropdownOption {
  /** Text of the menu item */
  label: string;
  /** Value of the menu item */
  value: string;
  /** Disables the menu item */
  disabled?: boolean;
}

export interface DropdownProps {
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
   * Side on which the menu opens
   * @default "down"
   */
  direction?: "down" | "up" | "left" | "right";
  /** Trigger element; a small "Dropdown" button is rendered when omitted */
  children?: React.ReactNode;
}
