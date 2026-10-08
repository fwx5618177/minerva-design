import type { Component, VNode, VNodeChild } from "vue";

/**
 * Content of an entry label / icon (the React `ReactNode`): a string or
 * number (text), a VNode (`h(...)`), a component (rendered without props;
 * wrap it with `markRaw` inside reactive state) or a render function
 * (`() => h(...)`, called on every render).
 */
export type MenuRenderable =
  string | number | VNode | Component | (() => VNodeChild);

/** An actionable menu item; with `children` it opens a submenu */
export interface MenuAction {
  /** Unique key of the item */
  key: string;
  /** Content of the item */
  label: MenuRenderable;
  /** Text used for typeahead when `label` is not plain text */
  textValue?: string;
  /** Icon displayed before the label */
  icon?: MenuRenderable;
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
  label: MenuRenderable;
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
  label: MenuRenderable;
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
  label?: MenuRenderable;
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
  label: MenuRenderable;
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

/**
 * Props of `Menu` (same names and defaults as the React `MenuProps`). The
 * trigger is the single child of the `trigger` slot (or of the default
 * slot); `class` / `style` / other attributes go to the menu panel.
 */
export interface MenuProps {
  /** Entries of the menu */
  items: MenuEntry[];
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
  /** Whether the menu is open (controlled, `v-model:open`) */
  open?: boolean;
  /**
   * Initial open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
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
  /** Accessible label of the menu panel (`aria-label`; defaults to the trigger's label) */
  ariaLabel?: string;
}

/**
 * Props of `ContextMenu` (same names and defaults as the React
 * `ContextMenuProps`). The area is the single child of the default slot;
 * `class` / `style` / other attributes go to the menu panel.
 */
export interface ContextMenuProps {
  /** Entries of the menu */
  items: MenuEntry[];
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
  /** Accessible label of the menu panel (`aria-label`) */
  ariaLabel?: string;
}
