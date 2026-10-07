import type { ReactElement, ReactNode } from "react";

/** An actionable menu item; with `children` it opens a submenu */
export interface MenuAction {
  /** Unique key of the item */
  key: string;
  /** Content of the item */
  label: ReactNode;
  /** Text used for typeahead when `label` is not plain text */
  textValue?: string;
  /** Icon displayed before the label */
  icon?: ReactNode;
  /** Keyboard shortcut hint displayed after the label (display only) */
  shortcut?: string;
  /**
   * Disables the item
   * @default false
   */
  disabled?: boolean;
  /** Entries of a submenu opened by this item */
  children?: MenuEntry[];
}

/** A visual separator between entries */
export interface MenuSeparatorEntry {
  /** Entry type */
  type: "separator";
  /** Unique key of the separator */
  key: string;
}

/** A labelled group of entries */
export interface MenuGroupEntry {
  /** Entry type */
  type: "group";
  /** Unique key of the group */
  key: string;
  /** Label displayed above the group */
  label: ReactNode;
  /** Entries of the group */
  items: MenuEntry[];
}

/** Any entry of a Menu / ContextMenu */
export type MenuEntry = MenuAction | MenuSeparatorEntry | MenuGroupEntry;

/** Density of the menu items */
export type MenuSize = "small" | "medium";

/** Side of the trigger on which the menu opens */
export type MenuSide = "top" | "right" | "bottom" | "left";

/** Alignment of the menu against the trigger */
export type MenuAlign = "start" | "center" | "end";

export interface MenuProps {
  /** Trigger element (button); click, Enter, Space and ArrowDown open the menu */
  children: ReactElement;
  /** Entries of the menu */
  items: MenuEntry[];
  /** Called with the original item object when an action is selected; the menu closes afterwards */
  onSelect?: (item: MenuAction) => void;
  /**
   * Density of the items
   * @default "medium"
   */
  size?: MenuSize;
  /**
   * Alignment of the menu against the trigger
   * @default "end"
   */
  align?: MenuAlign;
  /**
   * Preferred side; the menu flips when there is not enough room
   * @default "bottom"
   */
  side?: MenuSide;
  /** Whether the menu is open (controlled; pair with onOpenChange) */
  open?: boolean;
  /**
   * Initial open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when the menu opens or closes */
  onOpenChange?: (open: boolean) => void;
  /**
   * Disables the trigger
   * @default false
   */
  disabled?: boolean;
  /**
   * Modal menus block interaction outside and trap focus while open
   * @default true
   */
  modal?: boolean;
  /** Additional class name of the menu panel */
  className?: string;
  /** Accessible label of the menu panel */
  ariaLabel?: string;
}

export interface ContextMenuProps {
  /** Area that opens the menu on right click / long press / Shift+F10 */
  children: ReactElement;
  /** Entries of the menu */
  items: MenuEntry[];
  /** Called with the original item object when an action is selected; the menu closes afterwards */
  onSelect?: (item: MenuAction) => void;
  /**
   * Density of the items
   * @default "medium"
   */
  size?: MenuSize;
  /** Called when the menu opens or closes */
  onOpenChange?: (open: boolean) => void;
  /**
   * Disables the context menu (the native one shows instead)
   * @default false
   */
  disabled?: boolean;
  /**
   * Modal menus block interaction outside and trap focus while open
   * @default true
   */
  modal?: boolean;
  /** Additional class name of the menu panel */
  className?: string;
  /** Accessible label of the menu panel */
  ariaLabel?: string;
}
