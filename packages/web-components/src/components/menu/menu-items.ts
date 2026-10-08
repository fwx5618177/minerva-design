import { css } from "lit";
import type { TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { MinervaElement } from "../../internal/minerva-element";

/** Content of a menu label / icon: text, nodes or a Lit template */
export type MenuContent = string | Node | Node[] | TemplateResult;

/** An actionable menu item; with `children` it opens a submenu */
export interface MenuAction {
  /** Unique key of the item (the `value` of `minerva-select`) */
  key: string;
  /** Content of the item */
  label: MenuContent;
  /** Text used for typeahead when `label` is not plain text */
  textValue?: string;
  /** Icon displayed before the label */
  icon?: MenuContent;
  /** Keyboard shortcut hint displayed after the label (display only) */
  shortcut?: string;
  /** Disables the item */
  disabled?: boolean;
  /** Whether selecting this item closes the menu (overrides the menu's setting) */
  closeOnSelect?: boolean;
  /** Entries of a submenu opened by this item */
  children?: MenuEntry[];
  /** Declarative `<minerva-menu-item>` the entry was read from */
  element?: HTMLElement;
}

/** A toggleable item (`role="menuitemcheckbox"`) */
export interface MenuCheckboxEntry {
  type: "checkbox";
  key: string;
  label: MenuContent;
  textValue?: string;
  shortcut?: string;
  disabled?: boolean;
  /** Checked state (the item keeps the state toggled by the user until `items` changes) */
  checked?: boolean;
  /** Initial checked state */
  defaultChecked?: boolean;
  /** Whether toggling the item closes the menu (default false) */
  closeOnSelect?: boolean;
  element?: HTMLElement;
}

/** An option of a radio group entry (`role="menuitemradio"`) */
export interface MenuRadioItem {
  value: string;
  label: MenuContent;
  textValue?: string;
  shortcut?: string;
  disabled?: boolean;
  /** Declarative only: choosing it closes the menu */
  closeOnSelect?: boolean;
  element?: HTMLElement;
}

/** A group of mutually exclusive options */
export interface MenuRadioGroupEntry {
  type: "radio-group";
  key: string;
  /** Label displayed above the group (also names the group) */
  label?: MenuContent;
  items: MenuRadioItem[];
  /** Selected value */
  value?: string;
  /** Initially selected value */
  defaultValue?: string;
  /** Whether choosing an option closes the menu (default false) */
  closeOnSelect?: boolean;
  element?: HTMLElement;
}

/** A visual separator between entries */
export interface MenuSeparatorEntry {
  type: "separator";
  key: string;
}

/** A labelled group of entries */
export interface MenuGroupEntry {
  type: "group";
  key: string;
  label: MenuContent;
  items: MenuEntry[];
}

/** A standalone (non-interactive) section label */
export interface MenuLabelEntry {
  type: "label";
  key: string;
  label: MenuContent;
}

/** Any entry of a menu / context menu */
export type MenuEntry =
  | MenuAction
  | MenuCheckboxEntry
  | MenuRadioGroupEntry
  | MenuSeparatorEntry
  | MenuGroupEntry
  | MenuLabelEntry;

/** Data elements describe entries; the menu renders them in its own panel. */
const dataStyles = css`
  :host {
    display: none !important;
  }
`;

/**
 * Declarative menu item of `<minerva-menu>` / `<minerva-context-menu>`
 * (the React library's `MenuAction`). The menu reads it and renders the item in its
 * panel (`role="menuitem"`); nested menu elements make it a submenu
 * trigger. Its text is the label; a `slot="icon"` child is the icon.
 *
 * @summary Menu item (action or submenu trigger).
 * @tag minerva-menu-item
 * @slot - Label, and nested menu elements forming a submenu
 * @slot icon - Icon displayed before the label
 */
export class MinervaMenuItem extends MinervaElement {
  static override tagName = "minerva-menu-item";
  static override styles = dataStyles;

  /** Key reported by `minerva-select` (default: the label text) */
  @property({ reflect: true })
  value = "";

  /** Disables the item */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Keyboard shortcut hint displayed after the label (display only) */
  @property()
  shortcut = "";

  /** Text used for typeahead when the label is not plain text */
  @property({ attribute: "text-value" })
  textValue = "";

  /** Selecting this item keeps the menu open */
  @property({ type: Boolean, attribute: "keep-open" })
  keepOpen = false;
}

/**
 * Declarative checkbox item (`role="menuitemcheckbox"`, the React library's
 * `MenuCheckboxEntry`). Toggling it updates `checked`.
 *
 * @summary Toggleable menu item.
 * @tag minerva-menu-checkbox-item
 * @slot - Label
 */
export class MinervaMenuCheckboxItem extends MinervaElement {
  static override tagName = "minerva-menu-checkbox-item";
  static override styles = dataStyles;

  /** Key reported by `minerva-change` */
  @property({ reflect: true })
  value = "";

  /** Whether the item is checked */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Disables the item */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Keyboard shortcut hint (display only) */
  @property()
  shortcut = "";

  /** Text used for typeahead when the label is not plain text */
  @property({ attribute: "text-value" })
  textValue = "";

  /** Toggling the item closes the menu */
  @property({ type: Boolean, attribute: "close-on-select" })
  closeOnSelect = false;
}

/**
 * Declarative radio item (`role="menuitemradio"`, the React library's
 * `MenuRadioItem`). Radio items of the same `<minerva-menu-group>` (or
 * consecutive radio items) are mutually exclusive.
 *
 * @summary Mutually exclusive menu option.
 * @tag minerva-menu-radio-item
 * @slot - Label
 */
export class MinervaMenuRadioItem extends MinervaElement {
  static override tagName = "minerva-menu-radio-item";
  static override styles = dataStyles;

  /** Value of the option */
  @property({ reflect: true })
  value = "";

  /** Whether the option is the selected one of its group */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /** Disables the option */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Keyboard shortcut hint (display only) */
  @property()
  shortcut = "";

  /** Text used for typeahead when the label is not plain text */
  @property({ attribute: "text-value" })
  textValue = "";

  /** Choosing the option closes the menu */
  @property({ type: Boolean, attribute: "close-on-select" })
  closeOnSelect = false;
}

/**
 * Labelled group of menu entries (`role="group"`, the React library's
 * `MenuGroupEntry`); a group of radio items is a radio group
 * (`MenuRadioGroupEntry`).
 *
 * @summary Labelled group of menu entries.
 * @tag minerva-menu-group
 * @slot - Entries of the group
 */
export class MinervaMenuGroup extends MinervaElement {
  static override tagName = "minerva-menu-group";
  static override styles = dataStyles;

  /** Label displayed above the group (names the group) */
  @property()
  label = "";

  /** Radio groups: choosing an option closes the menu */
  @property({ type: Boolean, attribute: "close-on-select" })
  closeOnSelect = false;
}

/**
 * Separator between menu entries (`role="separator"`).
 *
 * @summary Menu separator.
 * @tag minerva-menu-separator
 */
export class MinervaMenuSeparator extends MinervaElement {
  static override tagName = "minerva-menu-separator";
  static override styles = dataStyles;
}

/**
 * Non-interactive section label of a menu.
 *
 * @summary Menu section label.
 * @tag minerva-menu-label
 * @slot - Label text
 */
export class MinervaMenuLabel extends MinervaElement {
  static override tagName = "minerva-menu-label";
  static override styles = dataStyles;
}

/** Tags of the declarative data elements. */
export const MENU_DATA_TAGS = [
  MinervaMenuItem.tagName,
  MinervaMenuCheckboxItem.tagName,
  MinervaMenuRadioItem.tagName,
  MinervaMenuGroup.tagName,
  MinervaMenuSeparator.tagName,
  MinervaMenuLabel.tagName,
];

const isDataElement = (node: Node): node is HTMLElement =>
  node.nodeType === 1 && MENU_DATA_TAGS.includes((node as Element).localName);

/** Whether a mutation of `node` changes the declarative entries. */
export const affectsEntries = (node: Node): boolean => {
  const el = node.nodeType === 1 ? (node as Element) : node.parentElement;
  return !!el?.closest(MENU_DATA_TAGS.join(","));
};

/** Label of a data element: its text, or clones of its rich content. */
function labelOf(el: Element): MenuContent {
  const nodes = Array.from(el.childNodes).filter(
    (node) =>
      !isDataElement(node) &&
      !(
        node.nodeType === 1 && (node as Element).getAttribute("slot") === "icon"
      ),
  );
  if (nodes.every((node) => node.nodeType === 3)) {
    return nodes
      .map((node) => node.textContent ?? "")
      .join("")
      .trim();
  }
  return nodes.map((node) => node.cloneNode(true));
}

const textOf = (el: Element) =>
  Array.from(el.childNodes)
    .filter((node) => !isDataElement(node))
    .map((node) => node.textContent ?? "")
    .join("")
    .trim();

const attr = (el: Element, name: string) => el.getAttribute(name) ?? undefined;
const flag = (el: Element, name: string) => el.hasAttribute(name);

function radioOf(el: Element): MenuRadioItem {
  return {
    value: attr(el, "value") ?? textOf(el),
    label: labelOf(el),
    textValue: attr(el, "text-value"),
    shortcut: attr(el, "shortcut"),
    disabled: flag(el, "disabled"),
    closeOnSelect: flag(el, "close-on-select"),
    element: el as HTMLElement,
  };
}

/** Reads the declarative entries (data elements) of `parent`. */
export function readEntries(parent: Element, prefix = "e"): MenuEntry[] {
  const out: MenuEntry[] = [];
  let radios: MenuRadioGroupEntry | null = null;
  Array.from(parent.children).forEach((child, index) => {
    const key = `${prefix}-${index}`;
    if (child.localName !== MinervaMenuRadioItem.tagName) radios = null;
    switch (child.localName) {
      case MinervaMenuItem.tagName: {
        const children = readEntries(child, key);
        const icon = child.querySelector(":scope > [slot='icon']");
        out.push({
          key: attr(child, "value") || textOf(child),
          label: labelOf(child),
          textValue: attr(child, "text-value"),
          icon: icon ? icon.cloneNode(true) : undefined,
          shortcut: attr(child, "shortcut"),
          disabled: flag(child, "disabled"),
          closeOnSelect: flag(child, "keep-open") ? false : undefined,
          children: children.length ? children : undefined,
          element: child as HTMLElement,
        });
        break;
      }
      case MinervaMenuCheckboxItem.tagName:
        out.push({
          type: "checkbox",
          key: attr(child, "value") || textOf(child),
          label: labelOf(child),
          textValue: attr(child, "text-value"),
          shortcut: attr(child, "shortcut"),
          disabled: flag(child, "disabled"),
          checked: flag(child, "checked"),
          closeOnSelect: flag(child, "close-on-select"),
          element: child as HTMLElement,
        });
        break;
      case MinervaMenuRadioItem.tagName: {
        if (!radios) {
          radios = { type: "radio-group", key, items: [] };
          out.push(radios);
        }
        const radio = radioOf(child);
        radios.items.push(radio);
        if (flag(child, "checked")) radios.value = radio.value;
        break;
      }
      case MinervaMenuSeparator.tagName:
        out.push({ type: "separator", key });
        break;
      case MinervaMenuLabel.tagName:
        out.push({ type: "label", key, label: labelOf(child) });
        break;
      case MinervaMenuGroup.tagName: {
        const kids = Array.from(child.children);
        const label = attr(child, "label");
        if (
          kids.length > 0 &&
          kids.every((kid) => kid.localName === MinervaMenuRadioItem.tagName)
        ) {
          const items = kids.map(radioOf);
          out.push({
            type: "radio-group",
            key,
            label,
            items,
            value: items.find((item) => item.element?.hasAttribute("checked"))
              ?.value,
            closeOnSelect: flag(child, "close-on-select"),
            element: child as HTMLElement,
          });
        } else {
          out.push({
            type: "group",
            key,
            label: label ?? "",
            items: readEntries(child, key),
          });
        }
        break;
      }
    }
  });
  return out;
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-menu-item": MinervaMenuItem;
    "minerva-menu-checkbox-item": MinervaMenuCheckboxItem;
    "minerva-menu-radio-item": MinervaMenuRadioItem;
    "minerva-menu-group": MinervaMenuGroup;
    "minerva-menu-separator": MinervaMenuSeparator;
    "minerva-menu-label": MinervaMenuLabel;
  }
}
