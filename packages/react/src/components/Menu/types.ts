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
  /** Whether selecting this item closes the menu (overrides the menu's `closeOnSelect`) */
  closeOnSelect?: boolean;
  /** Entries of a submenu opened by this item */
  children?: MenuEntry[];
}

/** A toggleable item (`role="menuitemcheckbox"`) */
export interface MenuCheckboxEntry {
  /** Entry type */
  type: "checkbox";
  /** Unique key of the item */
  key: string;
  /** Content of the item */
  label: ReactNode;
  /** Text used for typeahead when `label` is not plain text */
  textValue?: string;
  /** Keyboard shortcut hint displayed after the label (display only) */
  shortcut?: string;
  /**
   * Disables the item
   * @default false
   */
  disabled?: boolean;
  /** Whether the item is checked (controlled; pair with onCheckedChange) */
  checked?: boolean;
  /**
   * Initial checked state (uncontrolled)
   * @default false
   */
  defaultChecked?: boolean;
  /** Called with the next checked state when the item is toggled */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether toggling the item closes the menu
   * @default false
   */
  closeOnSelect?: boolean;
}

/** An option of a radio group entry (`role="menuitemradio"`) */
export interface MenuRadioItem {
  /** Value of the option (unique within the group) */
  value: string;
  /** Content of the option */
  label: ReactNode;
  /** Text used for typeahead when `label` is not plain text */
  textValue?: string;
  /** Keyboard shortcut hint displayed after the label (display only) */
  shortcut?: string;
  /**
   * Disables the option
   * @default false
   */
  disabled?: boolean;
}

/** A group of mutually exclusive options */
export interface MenuRadioGroupEntry {
  /** Entry type */
  type: "radio-group";
  /** Unique key of the group */
  key: string;
  /** Label displayed above the group (also names the group) */
  label?: ReactNode;
  /** Options of the group */
  items: MenuRadioItem[];
  /** Selected value (controlled; pair with onValueChange) */
  value?: string;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string;
  /** Called with the value of the option that was chosen */
  onValueChange?: (value: string) => void;
  /**
   * Whether choosing an option closes the menu
   * @default false
   */
  closeOnSelect?: boolean;
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
export type MenuEntry =
  | MenuAction
  | MenuCheckboxEntry
  | MenuRadioGroupEntry
  | MenuSeparatorEntry
  | MenuGroupEntry;

/** Density of the menu items */
export type MenuSize = "small" | "medium";

/** Side of the trigger on which the menu opens */
export type MenuSide = "top" | "right" | "bottom" | "left";

/** Alignment of the menu against the trigger */
export type MenuAlign = "start" | "center" | "end";

/** Reading direction of the menu */
export type MenuDirection = "ltr" | "rtl";

export interface MenuProps {
  /** Trigger element (button); click, Enter, Space and ArrowDown open the menu (ArrowUp focuses the last item) */
  children: ReactElement;
  /** Entries of the menu */
  items: MenuEntry[];
  /** Called with the original item object when an action is selected */
  onSelect?: (item: MenuAction) => void;
  /**
   * Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)
   * @default true
   */
  closeOnSelect?: boolean;
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
   * Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open
   * @default true
   */
  modal?: boolean;
  /**
   * Arrow keys wrap around from the last item to the first (and back)
   * @default true
   */
  loop?: boolean;
  /**
   * Reading direction: in "rtl" submenus open to the left and ArrowLeft / ArrowRight are swapped
   * @default inherited from the nearest `dir` attribute of the trigger (else "ltr")
   */
  dir?: MenuDirection;
  /** Additional class name of the menu panel */
  className?: string;
  /** Accessible label of the menu panel (defaults to the trigger's label) */
  "aria-label"?: string;
}

export interface ContextMenuProps {
  /** Area that opens the menu on right click / long press / Shift+F10 / ContextMenu key */
  children: ReactElement;
  /** Entries of the menu */
  items: MenuEntry[];
  /** Called with the original item object when an action is selected */
  onSelect?: (item: MenuAction) => void;
  /**
   * Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)
   * @default true
   */
  closeOnSelect?: boolean;
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
   * Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open
   * @default true
   */
  modal?: boolean;
  /**
   * Arrow keys wrap around from the last item to the first (and back)
   * @default true
   */
  loop?: boolean;
  /**
   * Reading direction: in "rtl" submenus open to the left and ArrowLeft / ArrowRight are swapped
   * @default inherited from the nearest `dir` attribute of the trigger (else "ltr")
   */
  dir?: MenuDirection;
  /** Additional class name of the menu panel */
  className?: string;
  /** Accessible label of the menu panel */
  "aria-label"?: string;
}
