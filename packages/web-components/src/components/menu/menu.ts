import { html, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { toPlacement, type Placement } from "@minerva/core";
import { DEV, devWarn } from "../../internal/dev";
import { MenuBase } from "./menu-base";
import {
  MinervaMenuCheckboxItem,
  MinervaMenuGroup,
  MinervaMenuItem,
  MinervaMenuLabel,
  MinervaMenuRadioItem,
  MinervaMenuSeparator,
} from "./menu-items";

export * from "./menu-items";
export {
  SUBMENU_OPEN_DELAY,
  type FocusIntent,
  type MenuChangeReason,
  type MenuSize,
} from "./menu-base";

/** Side of the trigger on which the menu opens */
export type MenuSide = "top" | "right" | "bottom" | "left";

/** Alignment of the menu against the trigger */
export type MenuAlign = "start" | "center" | "end";

const OFFSET = { mainAxis: 6, crossAxis: 0 };

/** Sets / removes an attribute only when it changes (no mutation noise). */
export function setAttr(el: Element, name: string, value: string | null) {
  if (value === null) {
    if (el.hasAttribute(name)) el.removeAttribute(name);
  } else if (el.getAttribute(name) !== value) {
    el.setAttribute(name, value);
  }
}

/**
 * Action menu opened from a trigger button (`<Menu>` of React, WAI-ARIA
 * menu button). Entries come from declarative child elements
 * (`<minerva-menu-item>`, `<minerva-menu-checkbox-item>`,
 * `<minerva-menu-radio-item>`, `<minerva-menu-group>`,
 * `<minerva-menu-separator>`, `<minerva-menu-label>`; nesting items makes
 * submenus) or from the `items` property (the React library's `MenuEntry` shape).
 *
 * - Trigger: click, Enter, Space or ArrowDown open the menu and focus the
 *   first item (a pointer click focuses the panel); ArrowUp focuses the last.
 * - Inside: arrows (wrapping unless `no-loop`), Home / End, typeahead,
 *   Enter / Space activate; Escape closes the topmost (sub)menu only and
 *   returns focus; Tab closes the menu and moves on from the trigger.
 * - Submenus open with ArrowRight (ArrowLeft in RTL), Enter, Space or hover
 *   (after a short delay) and stay open while the pointer moves towards
 *   them (core pointer grace).
 * - Modal (default): outside pointer events disabled, focus trapped, scroll
 *   locked, the rest of the page hidden from assistive technologies.
 *
 * The panels live in the shadow root in the top layer (`popover="manual"`),
 * so they inherit the theme of the element's scope. The reading direction
 * comes from the closest `dir` attribute (set `dir="rtl"` on the menu or an
 * ancestor).
 *
 * @summary Dropdown action menu with submenus, checkbox / radio items and typeahead.
 * @tag minerva-menu
 * @slot trigger - The button opening the menu (gets `aria-haspopup="menu"`, `aria-expanded`, `data-state`)
 * @csspart content - A menu panel (`role="menu"`: the root menu and its submenus)
 * @csspart item - An item (`role="menuitem"`, `menuitemcheckbox` or `menuitemradio`)
 * @csspart item--highlighted - Item state of `item`: highlighted
 * @csspart item--disabled - Item state of `item`: disabled
 * @csspart item--checked - Item state of `item`: checked
 * @csspart item--unchecked - Item state of `item`: unchecked
 * @csspart item--expanded - Item state of `item`: expanded
 * @csspart item-indicator - The check mark / radio dot of a checkbox or radio item
 * @csspart icon - The icon of an item
 * @csspart item-label - The label of an item
 * @csspart shortcut - The keyboard shortcut hint of an item
 * @csspart group - A group of entries (`role="group"`, also radio groups)
 * @csspart label - A group heading or section label
 * @csspart separator - A separator
 * @fires minerva-open-change - The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state
 * @fires minerva-select - An action item was chosen (`detail: { value, item }`, `value` = the item key / `value`); cancelable: `preventDefault()` keeps the menu open
 * @fires minerva-change - A checkbox item was toggled (`detail: { value, checked, item }`) or a radio option chosen (`detail: { value, group, item }`); cancelable: `preventDefault()` keeps the previous state
 */
export class MinervaMenu extends MenuBase {
  static override tagName = "minerva-menu";
  static override dependencies = [
    MinervaMenuItem,
    MinervaMenuCheckboxItem,
    MinervaMenuRadioItem,
    MinervaMenuGroup,
    MinervaMenuSeparator,
    MinervaMenuLabel,
  ];

  /** Preferred side; the menu flips when there is not enough room */
  @property({ reflect: true })
  side: MenuSide = "bottom";

  /** Alignment of the menu against the trigger */
  @property({ reflect: true })
  align: MenuAlign = "end";

  /** Disabled attribute added to the trigger by the menu */
  private disabledTrigger: Element | null = null;

  private triggerElement(): HTMLElement | null {
    return this.querySelector<HTMLElement>(":scope > [slot='trigger']");
  }

  protected override anchorElement() {
    return this.triggerElement();
  }

  override rootPlacement(): Placement {
    return toPlacement(this.side, this.align);
  }

  override rootOffset() {
    return OFFSET;
  }

  protected override restoreTarget() {
    return this.triggerElement();
  }

  protected override branches() {
    return [this.triggerElement()];
  }

  protected override rootLabel() {
    const own = this.getAttribute("aria-label");
    if (own) return own;
    const trigger = this.triggerElement();
    return (
      trigger?.getAttribute("aria-label") ??
      (trigger?.textContent?.trim() || undefined)
    );
  }

  protected override syncTrigger() {
    const trigger = this.triggerElement();
    if (!trigger) return;
    setAttr(trigger, "aria-haspopup", "menu");
    setAttr(trigger, "aria-expanded", String(this.open));
    setAttr(trigger, "data-state", this.open ? "open" : "closed");
    setAttr(trigger, "data-disabled", this.disabled ? "" : null);
    if (this.disabled && !trigger.hasAttribute("disabled")) {
      trigger.setAttribute("disabled", "");
      this.disabledTrigger = trigger;
    } else if (!this.disabled && this.disabledTrigger === trigger) {
      trigger.removeAttribute("disabled");
      this.disabledTrigger = null;
    }
  }

  private fromTrigger(event: Event): boolean {
    const trigger = this.triggerElement();
    return !!trigger && event.composedPath().includes(trigger);
  }

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || event.defaultPrevented || !this.fromTrigger(event)) {
      return;
    }
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (this.open) this.requestOpenChange(false, "trigger");
        else this.openWith("first", "keyboard");
        break;
      case "ArrowDown":
        event.preventDefault();
        this.openWith("first", "keyboard");
        break;
      case "ArrowUp":
        event.preventDefault();
        this.openWith("last", "keyboard");
        break;
    }
  };

  private readonly handleClick = (event: MouseEvent) => {
    if (this.disabled || event.defaultPrevented || !this.fromTrigger(event)) {
      return;
    }
    if (this.open) this.requestOpenChange(false, "trigger");
    // detail 0: a keyboard / programmatic click
    else this.openWith(event.detail === 0 ? "first" : "content", "trigger");
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("click", this.handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("click", this.handleClick);
  }

  protected override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    if (DEV && !this.triggerElement()) {
      devWarn(
        MinervaMenu.tagName,
        'no slot="trigger" element: nothing opens the menu (add e.g. <button slot="trigger">).',
      );
    }
  }

  protected override render() {
    return html`<slot name="trigger"></slot>${this.renderPanels()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-menu": MinervaMenu;
  }
}
