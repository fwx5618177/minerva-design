import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "@lib-core-styles/components/PageTabs/pageTabs.module.scss?inline";
import iconButtonStyles from "@lib-core-styles/components/IconButton/iconButton.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection } from "../../internal/dom";
import { IconChevronLeft, IconChevronRight, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

interface ScrollState {
  overflow: boolean;
  left: boolean;
  right: boolean;
  /** Right-to-left layout: the start (first) scroll button is on the right */
  rtl: boolean;
}

/** Classes of lib-core's small square ghost IconButton (scroll / close buttons) */
const iconButtonClasses = (disabled: boolean, extra: string) => ({
  iconButton: true,
  neutral: true,
  "variant-ghost": true,
  small: true,
  square: true,
  disabled,
  [extra]: true,
});

/**
 * A strip of open application pages (`<PageTabs>` of lib-core): route
 * navigation, not an ARIA tablist. The application owns routes, closing and
 * leave guards. Overflowing items scroll horizontally with scroll buttons
 * and the current item (`active-value`) is kept in view; when the focused
 * item is removed, focus goes back to the current page.
 *
 * @summary Strip of open pages with overflow scrolling and closable items.
 * @tag minerva-page-tabs
 * @slot - `<minerva-page-tab>` items
 * @slot actions - Global actions after the scrollable list (e.g. a page menu)
 * @csspart root - The <nav> landmark
 * @csspart viewport - The scrolling viewport of the items
 * @csspart list - The item list
 * @csspart scroll-button - The scroll left / right buttons (while the items overflow)
 * @csspart actions - The global actions after the list
 * @fires minerva-select - Re-dispatched from `<minerva-page-tab>`: a page was chosen (`detail: { value }`)
 * @fires minerva-close - Re-dispatched from `<minerva-page-tab>`: the close button of a page was activated (`detail: { value }`)
 */
export class MinervaPageTabs extends MinervaElement {
  static override tagName = "minerva-page-tabs";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
  ];

  /**
   * Value of the current route's item: it gets `active` and is scrolled into
   * view when it (or the set of items) changes
   */
  @property({ reflect: true, attribute: "active-value" })
  activeValue?: string;

  /** Accessible label of the "scroll left" button (default localized) */
  @property({ attribute: "scroll-left-label" })
  scrollLeftLabel?: string;

  /** Accessible label of the "scroll right" button (default localized) */
  @property({ attribute: "scroll-right-label" })
  scrollRightLabel?: string;

  @state()
  private scrollState: ScrollState = {
    overflow: false,
    left: false,
    right: false,
    rtl: false,
  };

  @query(".viewport")
  private viewport!: HTMLElement;

  @query(".scroll-left")
  private leftButton?: HTMLButtonElement;

  @query(".scroll-right")
  private rightButton?: HTMLButtonElement;

  private readonly aria = new AriaController(this);
  private readonly locale = new LocaleController(this);
  private readonly slots = new HasSlotController(this);
  private focused: HTMLElement | null = null;
  private previousItems: string | null = null;
  private movedWith: "left" | "right" | null = null;
  private mutations: MutationObserver | null = null;
  private resize: ResizeObserver | null = null;

  /** The `<minerva-page-tab>` items. */
  get items(): MinervaPageTab[] {
    return Array.from(this.children).filter(
      (el): el is MinervaPageTab => el instanceof MinervaPageTab,
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("focusin", this.handleFocusIn);
    this.addEventListener("minerva-select", this.handleSelect);
    if (typeof MutationObserver !== "undefined") {
      this.mutations = new MutationObserver(() => this.itemsChanged());
      this.mutations.observe(this, {
        childList: true,
        attributes: true,
        attributeFilter: ["value", "active", "disabled"],
        subtree: true,
      });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("focusin", this.handleFocusIn);
    this.removeEventListener("minerva-select", this.handleSelect);
    this.mutations?.disconnect();
    this.mutations = null;
    this.resize?.disconnect();
    this.resize = null;
  }

  protected override firstUpdated(): void {
    this.observeViewport();
  }

  protected override reconnectedCallback(): void {
    super.reconnectedCallback();
    this.observeViewport();
  }

  /** Keeps the active tab in view when the viewport resizes. */
  private observeViewport() {
    if (this.resize || typeof ResizeObserver === "undefined") return;
    this.resize = new ResizeObserver(() => this.revealActive());
    this.resize.observe(this.viewport);
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (DEV && !this.aria.label) {
      devWarn(
        MinervaPageTabs.tagName,
        'set aria-label (e.g. "Open pages") to name the navigation landmark.',
      );
    }
    if (changed.has("activeValue")) this.itemsChanged();
    // A scroll button activated from the keyboard is disabled once its end
    // is reached, which would drop focus: hand it to the opposite button.
    const from = this.movedWith;
    if (from) {
      const button = from === "left" ? this.leftButton : this.rightButton;
      if (button?.disabled) {
        this.movedWith = null;
        const active = this.shadowRoot?.activeElement;
        if (!active || active === button) {
          (from === "left" ? this.rightButton : this.leftButton)?.focus({
            preventScroll: true,
          });
        }
      }
    }
  }

  private handleFocusIn = (event: FocusEvent) => {
    const target = event.target as Element;
    this.focused =
      target instanceof MinervaPageTab && this.items.includes(target)
        ? target
        : null;
  };

  private handleSelect = (event: Event) => {
    const item = event.target;
    if (
      !(item instanceof MinervaPageTab) ||
      !this.items.includes(item) ||
      event.defaultPrevented
    ) {
      return;
    }
    // a page tab asks first (cancelable), then the strip follows it
    queueMicrotask(() => {
      if (!event.defaultPrevented) this.activeValue = item.value;
    });
  };

  /** Pushes `active` to the items, reveals the active one, restores focus. */
  private itemsChanged() {
    const items = this.items;
    if (this.activeValue !== undefined) {
      for (const item of items) item.active = item.value === this.activeValue;
    }
    const key = JSON.stringify([
      this.activeValue,
      ...items.map((item) => [item.value, item.active]),
    ]);
    if (key !== this.previousItems) {
      this.previousItems = key;
      this.revealActive();
    }
    const focused = this.focused;
    if (focused && !focused.isConnected) {
      this.focused = null;
      const active = document.activeElement;
      if (!active || active === document.body || !active.isConnected) {
        items.find((item) => item.active)?.focus({ preventScroll: true });
      }
    }
  }

  private measure = () => {
    const el = this.viewport;
    if (!el) return;
    // In RTL, scrollLeft runs from 0 (start, right edge) to -(max).
    const rtl = getDirection(this) === "rtl";
    const max = el.scrollWidth - el.clientWidth;
    const next: ScrollState = {
      overflow: el.scrollWidth > el.clientWidth + 1,
      left: rtl ? el.scrollLeft > -max + 1 : el.scrollLeft > 1,
      right: rtl ? el.scrollLeft < -1 : el.scrollLeft < max - 1,
      rtl,
    };
    const prev = this.scrollState;
    if (
      prev.overflow !== next.overflow ||
      prev.left !== next.left ||
      prev.right !== next.right ||
      prev.rtl !== next.rtl
    ) {
      this.scrollState = next;
    }
  };

  private revealActive() {
    const el = this.viewport;
    if (!el) return;
    const activeItem = this.items.find((item) => item.active);
    const active = activeItem?.surface;
    if (activeItem && !active) {
      // not rendered yet (first render / just added)
      void activeItem.updateComplete.then(() => {
        if (activeItem.surface) this.revealActive();
      });
    }
    if (active) {
      const view = el.getBoundingClientRect();
      const item = active.getBoundingClientRect();
      // Oversized items always align their start edge
      if (item.width > view.width) el.scrollLeft += item.left - view.left;
      else if (item.left < view.left) el.scrollLeft -= view.left - item.left;
      else if (item.right > view.right)
        el.scrollLeft += item.right - view.right;
    }
    this.measure();
  }

  private move(direction: number) {
    const el = this.viewport;
    if (!el) return;
    this.movedWith = direction < 0 ? "left" : "right";
    el.scrollLeft += direction * Math.max(1, el.clientWidth * 0.8);
    this.measure();
  }

  private renderScrollButton(side: "left" | "right") {
    const left = side === "left";
    const label = left
      ? (this.scrollLeftLabel ?? this.locale.t("pageTabs.scrollLeft"))
      : (this.scrollRightLabel ?? this.locale.t("pageTabs.scrollRight"));
    const disabled = left ? !this.scrollState.left : !this.scrollState.right;
    return html`<button
      type="button"
      part="scroll-button"
      class=${classMap({
        ...iconButtonClasses(disabled, "scroll"),
        [`scroll-${side}`]: true,
      })}
      aria-label=${label}
      ?disabled=${disabled}
      tabindex=${disabled ? -1 : 0}
      @click=${() => this.move(left ? -1 : 1)}
    >
      ${left ? IconChevronLeft : IconChevronRight}
    </button>`;
  }

  protected override render() {
    const { overflow, rtl } = this.scrollState;
    const left = () => this.renderScrollButton("left");
    const right = () => this.renderScrollButton("right");
    return html`<nav
      part="root"
      class="pageTabs"
      aria-label=${this.aria.label ?? nothing}
    >
      ${overflow ? (rtl ? right() : left()) : nothing}
      <div part="viewport" class="viewport" @scroll=${this.measure}>
        <div part="list" class="list">
          <slot @slotchange=${() => this.itemsChanged()}></slot>
        </div>
      </div>
      ${overflow ? (rtl ? left() : right()) : nothing}
      ${
        this.slots.test("actions")
          ? html`<div part="actions" class="actions">
              <slot name="actions"></slot>
            </div>`
          : nothing
      }
    </nav>`;
  }
}

/**
 * One open page of `<minerva-page-tabs>` (`<PageTab>` of lib-core). The label
 * button selects it (`aria-current="page"` while `active`); the `action`
 * slot (or the built-in close button of `closable`) is a separate control,
 * never nested inside the label button.
 *
 * @summary An open page of `<minerva-page-tabs>`.
 * @tag minerva-page-tab
 * @slot icon - Icon displayed before the label
 * @slot action - Separate control next to the label (e.g. a close button)
 * @csspart root - The item wrapper
 * @csspart trigger - The label <button> (selects the page)
 * @csspart icon - The icon before the label
 * @csspart label - The (truncated) label
 * @csspart action - The wrapper of the separate control next to the label
 * @csspart close-button - The built-in close button (`closable`)
 * @fires minerva-select - The label button was activated (`detail: { value }`); cancelable: `preventDefault()` keeps the strip's `active-value`
 * @fires minerva-close - The built-in close button was activated (`detail: { value }`); remove the element to close the page
 */
export class MinervaPageTab extends MinervaElement {
  static override tagName = "minerva-page-tab";
  static override shadowRootOptions = {
    ...MinervaElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: contents;
      }
      .icon ::slotted(svg) {
        width: 16px;
        height: 16px;
      }
    `,
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
  ];

  /** Identifier of the page */
  @property({ reflect: true })
  value = "";

  /** Title of the page; truncated with an ellipsis (full text in `title`) */
  @property()
  label = "";

  /** Marks the item as the current page (`aria-current="page"`) */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Disables the label button (the separate action keeps its own state) */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Renders a built-in close button (fires `minerva-close`) */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /** Accessible label of the close button (default localized "Close <label>") */
  @property({ attribute: "close-label" })
  closeLabel?: string;

  @query(".trigger")
  private trigger?: HTMLButtonElement;

  @query(".pageTab")
  private wrapper?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly slots = new HasSlotController(this);

  /** @internal The element carrying the item geometry. */
  get surface(): HTMLElement | null {
    return this.wrapper ?? null;
  }

  /** Focuses the label button. */
  override focus(options?: FocusOptions): void {
    this.trigger?.focus(options);
  }

  private handleSelect() {
    if (this.disabled) return;
    this.emit("minerva-select", { value: this.value }, { cancelable: true });
  }

  private handleClose() {
    this.emit("minerva-close", { value: this.value });
  }

  protected override hookStates() {
    return { current: this.active, disabled: this.disabled };
  }

  protected override updated(): void {
    if (DEV && !this.label) {
      devWarn(MinervaPageTab.tagName, "set label to name the page.");
    }
  }

  protected override render() {
    return html`<div
      part="root"
      class="pageTab"
      data-value=${this.value}
      ?data-current=${this.active}
      ?data-disabled=${this.disabled}
    >
      <button
        type="button"
        part="trigger"
        class="trigger"
        title=${this.label || nothing}
        aria-current=${this.active ? "page" : nothing}
        ?disabled=${this.disabled}
        @click=${this.handleSelect}
      >
        ${
          this.slots.test("icon")
            ? html`<span part="icon" class="icon" aria-hidden="true"
                ><slot name="icon"></slot
              ></span>`
            : nothing
        }
        <span part="label" class="label">${this.label}</span>
      </button>
      ${
        this.closable || this.slots.test("action")
          ? html`<span part="action" class="action"
              ><slot name="action"></slot>${
                this.closable
                  ? html`<button
                      type="button"
                      part="close-button"
                      class=${classMap(iconButtonClasses(false, "close"))}
                      aria-label=${
                        this.closeLabel ??
                        this.locale.t("pageTabs.close", {
                          label: this.label,
                          defaultValue: "Close {{label}}",
                        })
                      }
                      @click=${this.handleClose}
                    >
                      ${IconX}
                    </button>`
                  : nothing
              }</span
            >`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-page-tabs": MinervaPageTabs;
    "minerva-page-tab": MinervaPageTab;
  }
}
