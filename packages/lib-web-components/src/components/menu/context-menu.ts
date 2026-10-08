import { css, html } from "lit";
import {
  contains,
  getActiveElement,
  type Placement,
  type VirtualElement,
} from "@minerva/core";
import { getDirection } from "../../internal/dom";
import { MenuBase } from "./menu-base";
import { setAttr } from "./menu";
import {
  MENU_DATA_TAGS,
  MinervaMenuCheckboxItem,
  MinervaMenuGroup,
  MinervaMenuItem,
  MinervaMenuLabel,
  MinervaMenuRadioItem,
  MinervaMenuSeparator,
} from "./menu-items";

/** Touch long press duration that opens the menu (ms) */
export const LONG_PRESS_DELAY = 700;

const AT_POINTER = { mainAxis: 2, crossAxis: 0 };
const AT_ELEMENT = { mainAxis: 4, crossAxis: 0 };

interface Position {
  anchor: Element | VirtualElement;
  placement: Placement;
  offset: { mainAxis: number; crossAxis: number };
}

/** A zero-size anchor at a viewport point (the pointer). */
const pointAnchor = (
  x: number,
  y: number,
  contextElement: Element,
): VirtualElement => ({
  contextElement,
  getBoundingClientRect: () => ({
    x,
    y,
    left: x,
    top: y,
    right: x,
    bottom: y,
    width: 0,
    height: 0,
  }),
});

/**
 * Context menu (`<ContextMenu>` of lib-core): the menu entries opened at the
 * pointer on right click (long press on touch) in its area (the default
 * slot); Shift+F10 or the ContextMenu key open it at the area. A right click
 * while open moves the menu. Focus moves to the first item and returns to
 * the area (or the element focused in it) on close. Same entries, keyboard,
 * submenus and events as `<minerva-menu>`.
 *
 * @summary Menu opened at the pointer on right click / long press / Shift+F10.
 * @tag minerva-context-menu
 * @slot - The area (and the declarative menu entries, which are not displayed)
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
 * @fires minerva-open-change - The menu opens / asks to close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state
 * @fires minerva-select - An action item was chosen (`detail: { value, item }`); cancelable: `preventDefault()` keeps the menu open
 * @fires minerva-change - A checkbox item was toggled (`detail: { value, checked, item }`) or a radio option chosen (`detail: { value, group, item }`); cancelable
 */
export class MinervaContextMenu extends MenuBase {
  static override tagName = "minerva-context-menu";
  static override dependencies = [
    MinervaMenuItem,
    MinervaMenuCheckboxItem,
    MinervaMenuRadioItem,
    MinervaMenuGroup,
    MinervaMenuSeparator,
    MinervaMenuLabel,
  ];
  static override styles = [
    ...MenuBase.styles,
    css`
      :host(:not([disabled])) ::slotted(*) {
        -webkit-touch-callout: none;
      }
    `,
  ];

  private position: Position | null = null;
  private restoreTo: HTMLElement | null = null;
  private longPress: ReturnType<typeof setTimeout> | undefined;
  private areaPointerEvents: string | null = null;

  /** The area: the first slotted element that is not a menu entry. */
  private area(): HTMLElement | null {
    return (
      Array.from(this.children).find(
        (child): child is HTMLElement =>
          !MENU_DATA_TAGS.includes(child.localName),
      ) ?? null
    );
  }

  protected override anchorElement() {
    return this.position?.anchor ?? null;
  }

  override rootPlacement(): Placement {
    return this.position?.placement ?? "right-start";
  }

  override rootOffset() {
    return this.position?.offset ?? AT_POINTER;
  }

  protected override restoreTarget() {
    return this.restoreTo;
  }

  protected override branches() {
    return [];
  }

  protected override rootLabel() {
    return this.getAttribute("aria-label") ?? undefined;
  }

  protected override onRootPointerDownOutside(event: PointerEvent) {
    // A right click in the area moves the menu instead of closing it.
    const area = this.area();
    const target = event.composedPath()[0];
    if (
      event.button === 2 &&
      area &&
      target instanceof Node &&
      contains(area, target)
    ) {
      event.preventDefault();
    }
  }

  protected override syncTrigger() {
    const area = this.area();
    if (!area) return;
    setAttr(area, "data-state", this.open ? "open" : "closed");
    setAttr(area, "data-disabled", this.disabled ? "" : null);
    // Keep right clicks reaching the area while a modal menu disables
    // pointer events on the page (they move the menu).
    const keep = this.open && this.isModal && !this.disabled;
    if (keep && this.areaPointerEvents === null) {
      this.areaPointerEvents = area.style.pointerEvents;
      area.style.pointerEvents = "auto";
    } else if (!keep && this.areaPointerEvents !== null) {
      area.style.pointerEvents = this.areaPointerEvents;
      this.areaPointerEvents = null;
    }
  }

  private openAt(next: Position) {
    const area = this.area();
    if (!area) return;
    if (!this.open) {
      const focused = getActiveElement(document);
      this.restoreTo =
        focused instanceof HTMLElement && contains(area, focused)
          ? focused
          : area;
    }
    this.position = next;
    if (this.open) {
      this.reanchor();
      return;
    }
    this.openWith("first", "contextmenu");
  }

  private openAtPoint(x: number, y: number) {
    const area = this.area();
    if (!area) return;
    const rtl = getDirection(area) === "rtl";
    this.openAt({
      anchor: pointAnchor(x, y, area),
      placement: rtl ? "left-start" : "right-start",
      offset: AT_POINTER,
    });
  }

  private inArea(event: Event): boolean {
    const area = this.area();
    const target = event.composedPath()[0];
    return !!area && target instanceof Node && contains(area, target);
  }

  private clearLongPress() {
    clearTimeout(this.longPress);
    this.longPress = undefined;
  }

  private readonly handleContextMenu = (event: MouseEvent) => {
    if (this.disabled || event.defaultPrevented || !this.inArea(event)) return;
    event.preventDefault();
    this.clearLongPress();
    this.openAtPoint(event.clientX, event.clientY);
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || event.defaultPrevented || !this.inArea(event)) return;
    if (
      event.key === "ContextMenu" ||
      (event.shiftKey && event.key === "F10")
    ) {
      const area = this.area();
      if (!area) return;
      event.preventDefault();
      const rtl = getDirection(area) === "rtl";
      this.openAt({
        anchor: area,
        placement: rtl ? "bottom-end" : "bottom-start",
        offset: AT_ELEMENT,
      });
    }
  };

  private readonly handlePointerDown = (event: PointerEvent) => {
    if (this.disabled || event.pointerType !== "touch" || !this.inArea(event))
      return;
    this.clearLongPress();
    const { clientX, clientY } = event;
    this.longPress = setTimeout(() => {
      this.longPress = undefined;
      this.openAtPoint(clientX, clientY);
    }, LONG_PRESS_DELAY);
  };

  private readonly handleTouchEnd = (event: PointerEvent) => {
    if (event.pointerType === "touch") this.clearLongPress();
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("contextmenu", this.handleContextMenu);
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("pointerdown", this.handlePointerDown);
    this.addEventListener("pointermove", this.handleTouchEnd);
    this.addEventListener("pointerup", this.handleTouchEnd);
    this.addEventListener("pointercancel", this.handleTouchEnd);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearLongPress();
    this.removeEventListener("contextmenu", this.handleContextMenu);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("pointerdown", this.handlePointerDown);
    this.removeEventListener("pointermove", this.handleTouchEnd);
    this.removeEventListener("pointerup", this.handleTouchEnd);
    this.removeEventListener("pointercancel", this.handleTouchEnd);
  }

  protected override render() {
    return html`<slot></slot>${this.renderPanels()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-context-menu": MinervaContextMenu;
  }
}
