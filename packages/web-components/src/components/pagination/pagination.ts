import {
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import styles from "@react-styles/components/Pagination/pagination.module.scss?inline";
import {
  getCompactPageItems,
  getPageRange,
  PAGINATION_JUMP_SIZE,
} from "@minerva/core";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection } from "../../internal/dom";
import { itemParts } from "../../internal/styling-hooks";
import {
  IconChevronLeft,
  IconChevronRight,
  IconEllipsis,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

/** Kind of a pagination item (`itemRender` second argument) */
export type PaginationItemType =
  "page" | "prev" | "next" | "jump-prev" | "jump-next";
export type PaginationSize = "small" | "medium" | "large";
export type PaginationShape = "circle" | "rounded" | "square";
export type PaginationVariant = "solid" | "outline" | "ghost";

/** Content returned by the render callbacks */
export type PaginationRenderResult = string | number | Node | TemplateResult;

/** Detail of `minerva-page-change` */
export interface PaginationChangeDetail {
  page: number;
  pageSize: number;
}

/** Texts of `<minerva-pagination>`; omitted entries use the localized default */
export interface PaginationLabels {
  prev?: string;
  next?: string;
  jumpPrev?: string;
  jumpNext?: string;
  page?: (page: number) => string;
  jumpTo?: string;
  jumpToInput?: string;
  pageSize?: string;
  pageSizeOption?: (size: number) => string;
  currentPage?: string;
  total?: (total: number) => string;
  nav?: string;
}

/** `"10, 20 50"` <-> `[10, 20, 50]` */
const numberListConverter = {
  fromAttribute: (value: string | null) =>
    (value ?? "")
      .split(/[\s,]+/)
      .map((part) => parseInt(part, 10))
      .filter((n) => !isNaN(n) && n > 0),
  toAttribute: (value: number[]) => value.join(","),
};

interface Ripple {
  x: number;
  y: number;
  id: number;
  itemKey: string;
}

interface Item {
  key: string;
  type: PaginationItemType | "ellipsis";
  target: number;
}

/**
 * Page navigation (`<Pagination>` of React): page buttons with jump
 * items or a compact list with gaps, prev / next, a simple mode with a page
 * input, a quick jumper, a native page-size select and a total. Arrow keys
 * (swapped in RTL), Home and End on the page buttons change the page and
 * move focus to it; focus never gets lost when the focused button is
 * disabled or removed by a page change.
 *
 * @summary Page navigation with jumper, page size selector and total.
 * @tag minerva-pagination
 * @slot prev-icon - Icon of the previous-page button
 * @slot next-icon - Icon of the next-page button
 * @slot jump-prev-icon - Icon of the jump-backward item
 * @slot jump-next-icon - Icon of the jump-forward item
 * @csspart root - The `<nav>` landmark
 * @csspart item - A page / previous / next / jump button (the current page has aria-current=page)
 * @csspart item--current - Item state of `item`: current
 * @csspart item--disabled - Item state of `item`: disabled
 * @csspart total - The total text
 * @csspart jumper - The quick jumper label (wraps its input)
 * @csspart size-changer - The page size `<select>`
 * @csspart simple-input - The page input of the simple mode
 * @fires minerva-page-change - The user changed the page or the page size (`detail: { page, pageSize }`); cancelable: `preventDefault()` keeps the current page and size (controlled pattern)
 */
export class MinervaPagination extends MinervaElement {
  static override tagName = "minerva-pagination";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Current page (1-based) */
  @property({ type: Number, reflect: true })
  current = 1;

  /** Total number of items */
  @property({ type: Number })
  total = 0;

  /** Number of items per page */
  @property({ type: Number, reflect: true, attribute: "page-size" })
  pageSize = 10;

  /** Disables the pagination */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Shows an input to jump to a page */
  @property({ type: Boolean, attribute: "show-quick-jumper" })
  showQuickJumper = false;

  /** Shows a page size selector (native `<select>`) */
  @property({ type: Boolean, attribute: "show-size-changer" })
  showSizeChanger = false;

  /** Options of the page size selector (attribute: `"10,20,50"`) */
  @property({ attribute: "page-size-options", converter: numberListConverter })
  pageSizeOptions: number[] = [10, 20, 50, 100];

  /** Shows the total number of items (customize it with `totalRender`) */
  @property({ type: Boolean, attribute: "show-total" })
  showTotal = false;

  /** Custom rendering of the total; `range` is the [first, last] item of the page */
  @property({ attribute: false })
  totalRender?: (
    total: number,
    range: [number, number],
  ) => PaginationRenderResult;

  /** Custom rendering of the page, prev / next and jump items */
  @property({ attribute: false })
  itemRender?: (
    page: number,
    type: PaginationItemType,
  ) => PaginationRenderResult;

  /** Pagination size */
  @property({ reflect: true })
  size: PaginationSize = "medium";

  /** Shape of the page items */
  @property({ reflect: true })
  shape: PaginationShape = "rounded";

  /** Visual style of the page items */
  @property({ reflect: true })
  variant: PaginationVariant = "solid";

  /** Simple mode: prev / next buttons with a page input */
  @property({ type: Boolean, reflect: true })
  simple = false;

  /** Pages on each side of the current one; switches to the compact list */
  @property({ type: Number, attribute: "sibling-count" })
  siblingCount?: number;

  /** Pages always shown at both ends of the compact list */
  @property({ type: Number, attribute: "boundary-count" })
  boundaryCount?: number;

  /** Hides the prev / next buttons */
  @property({ type: Boolean, attribute: "hide-edges" })
  hideEdges = false;

  /** Replaces the page buttons with a "current / total" counter */
  @property({ type: Boolean, attribute: "hide-numbers" })
  hideNumbers = false;

  /** Adapts the layout to small screens */
  @property({ type: Boolean, reflect: true })
  responsive = false;

  /** Custom texts and accessible labels (override the localized defaults) */
  @property({ attribute: false })
  labels?: PaginationLabels;

  @state()
  private jumpValue = "";

  @state()
  private simpleDraft: string | null = null;

  @state()
  private ripples: Ripple[] = [];

  private readonly aria = new AriaController(this);
  private readonly locale = new LocaleController(this);
  private nextRippleId = 0;
  private rippleTimer: ReturnType<typeof setTimeout> | undefined;
  private restoreFocus: { mode: "active" | "if-lost"; page: number } | null =
    null;

  /** Number of pages (at least 1). */
  get totalPages(): number {
    return Math.max(
      1,
      this.pageSize > 0 ? Math.ceil(this.total / this.pageSize) : 0,
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.rippleTimer);
  }

  /** Asks to change the page / size: emits, then applies unless canceled. */
  private request(page: number, pageSize: number): boolean {
    const detail: PaginationChangeDetail = { page, pageSize };
    if (!this.emit("minerva-page-change", detail, { cancelable: true })) {
      return false;
    }
    this.current = page;
    this.pageSize = pageSize;
    return true;
  }

  private changePage(target: number, focus: "active" | "if-lost" = "if-lost") {
    const page = this.current;
    if (
      this.disabled ||
      target === page ||
      target < 1 ||
      target > this.totalPages
    ) {
      return;
    }
    this.restoreFocus = { mode: focus, page: target };
    this.request(target, this.pageSize);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (DEV && (changed.has("current") || changed.has("total"))) {
      if (this.total > 0 && this.current > this.totalPages) {
        devWarn(
          MinervaPagination.tagName,
          `current (${this.current}) is greater than the number of pages (${this.totalPages}).`,
        );
      }
    }
  }

  protected override updated(): void {
    // Focus management after a page change (the DOM is updated)
    const request = this.restoreFocus;
    this.restoreFocus = null;
    const root = this.shadowRoot;
    if (!request || !root || request.page !== this.current) return;
    const active = root.activeElement as HTMLElement | null;
    const lost = !active || (active as HTMLButtonElement).disabled === true;
    if (request.mode === "active" || lost) {
      const target =
        root.querySelector<HTMLElement>('[aria-current="page"]') ??
        root.querySelector<HTMLElement>("button:not(:disabled), input");
      target?.focus();
    }
  }

  private handleItemClick(target: number, itemKey: string, event: MouseEvent) {
    const page = this.current;
    if (
      this.disabled ||
      target === page ||
      target < 1 ||
      target > this.totalPages
    ) {
      return;
    }
    // Ripple only for pointer clicks (keyboard-triggered clicks have detail 0)
    if (event.detail > 0) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      this.ripples = [
        ...this.ripples,
        {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          id: this.nextRippleId++,
          itemKey,
        },
      ];
      clearTimeout(this.rippleTimer);
      this.rippleTimer = setTimeout(() => (this.ripples = []), 1000);
    }
    this.changePage(target);
  }

  // Arrow keys / Home / End on the page buttons (inputs keep their keys)
  private handleKeyDown = (event: KeyboardEvent) => {
    let key = event.key;
    if (
      (key === "ArrowLeft" || key === "ArrowRight") &&
      getDirection(this) === "rtl"
    ) {
      key = key === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
    }
    const page = this.current;
    const destination =
      key === "ArrowLeft"
        ? page - 1
        : key === "ArrowRight"
          ? page + 1
          : key === "Home"
            ? 1
            : key === "End"
              ? this.totalPages
              : null;
    if (destination === null) return;
    event.preventDefault();
    this.changePage(destination, "active");
  };

  private handleJump = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const value = parseInt(this.jumpValue, 10);
    if (!isNaN(value) && value >= 1 && value <= this.totalPages) {
      this.changePage(value);
      this.jumpValue = "";
      (event.target as HTMLInputElement).value = "";
    }
  };

  private handleSizeChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value, 10);
    if (!this.request(1, newSize)) select.value = String(this.pageSize);
  };

  private commitSimpleDraft = () => {
    const draft = this.simpleDraft;
    if (draft === null) return;
    this.simpleDraft = null;
    const value = parseInt(draft, 10);
    if (isNaN(value)) return;
    this.changePage(Math.min(Math.max(value, 1), this.totalPages));
  };

  private label(type: PaginationItemType, target: number): string {
    const labels = this.labels;
    const t = this.locale.t;
    switch (type) {
      case "prev":
        return labels?.prev ?? t("pagination.prev");
      case "next":
        return labels?.next ?? t("pagination.next");
      case "jump-prev":
        return labels?.jumpPrev ?? t("pagination.jumpPrev");
      case "jump-next":
        return labels?.jumpNext ?? t("pagination.jumpNext");
      default:
        return labels?.page?.(target) ?? t("pagination.page", { page: target });
    }
  }

  protected override hookStates() {
    return {
      disabled: this.disabled,
      size: this.size,
      shape: this.shape,
      variant: this.variant,
    };
  }

  private renderItem(item: Item) {
    const { type, target, key } = item;
    if (type === "ellipsis") {
      return html`<span class="ellipsis" aria-hidden="true">…</span>`;
    }
    const page = this.current;
    const isActive = type === "page" && target === page;
    const isDisabled =
      this.disabled ||
      (type === "prev"
        ? page <= 1
        : type === "next"
          ? page >= this.totalPages
          : false);
    let content: unknown;
    switch (type) {
      case "prev":
        content = html`<slot name="prev-icon">${IconChevronLeft}</slot>`;
        break;
      case "next":
        content = html`<slot name="next-icon">${IconChevronRight}</slot>`;
        break;
      case "jump-prev":
      case "jump-next":
        content = html`<span class="jumpWrapper"
          ><slot
            name=${type === "jump-prev" ? "jump-prev-icon" : "jump-next-icon"}
            >${IconEllipsis}</slot
          ><span class="jumpHint" aria-hidden="true"
            >${this.label(type, target)}</span
          ></span
        >`;
        break;
      default:
        content = target;
    }
    if (this.itemRender) content = this.itemRender(target, type);
    return html`<button
      type="button"
      part=${itemParts("item", { current: isActive, disabled: isDisabled })}
      data-key=${key}
      class=${classMap({
        item: true,
        active: isActive,
        disabled: isDisabled,
        prev: type === "prev",
        next: type === "next",
        jump: type === "jump-prev" || type === "jump-next",
      })}
      ?disabled=${isDisabled}
      aria-label=${this.label(type, target)}
      aria-current=${isActive ? "page" : nothing}
      @keydown=${this.handleKeyDown}
      @click=${(e: MouseEvent) => this.handleItemClick(target, key, e)}
    >
      ${content}
      ${this.ripples
        .filter((ripple) => ripple.itemKey === key)
        .map(
          (ripple) =>
            html`<span
              class="ripple"
              style="left:${ripple.x}px;top:${ripple.y}px"
              aria-hidden="true"
            ></span>`,
        )}
    </button>`;
  }

  /** Items of the page list (stable keys: the focused button survives). */
  private items(): Item[] {
    const page = this.current;
    const totalPages = this.totalPages;
    const edge = (type: "prev" | "next"): Item[] =>
      this.hideEdges
        ? []
        : [{ key: type, type, target: type === "prev" ? page - 1 : page + 1 }];
    const pageItem = (p: number): Item => ({
      key: `page-${p}`,
      type: "page",
      target: p,
    });

    if (this.siblingCount !== undefined || this.boundaryCount !== undefined) {
      const compact = getCompactPageItems(
        totalPages,
        page,
        Math.max(0, this.siblingCount ?? 1),
        Math.max(1, this.boundaryCount ?? 1),
      );
      return [
        ...edge("prev"),
        ...compact.map((item) =>
          typeof item === "number"
            ? pageItem(item)
            : { key: item, type: "ellipsis" as const, target: 0 },
        ),
        ...edge("next"),
      ];
    }

    const range = getPageRange(page, totalPages);
    const items: Item[] = [...edge("prev")];
    if (range.length > 0 && range[0] > 1) {
      items.push(pageItem(1));
      if (range[0] > 2) {
        items.push({
          key: "jump-prev",
          type: "jump-prev",
          target: Math.max(1, page - PAGINATION_JUMP_SIZE),
        });
      }
    }
    range.forEach((p) => items.push(pageItem(p)));
    const last = range[range.length - 1];
    if (range.length > 0 && last < totalPages) {
      if (last < totalPages - 1) {
        items.push({
          key: "jump-next",
          type: "jump-next",
          target: Math.min(totalPages, page + PAGINATION_JUMP_SIZE),
        });
      }
      items.push(pageItem(totalPages));
    }
    items.push(...edge("next"));
    return items;
  }

  private renderPageList() {
    const page = this.current;
    const edge = (type: "prev" | "next") =>
      this.hideEdges
        ? nothing
        : this.renderItem({
            key: type,
            type,
            target: type === "prev" ? page - 1 : page + 1,
          });
    if (this.simple) {
      return html`${edge("prev")}
        <div class="simpleInput">
          <input
            part="simple-input"
            .value=${this.simpleDraft ?? String(page)}
            ?disabled=${this.disabled}
            aria-label=${
              this.labels?.currentPage ??
              this.locale.t("pagination.currentPage")
            }
            inputmode="numeric"
            @input=${(e: Event) =>
              (this.simpleDraft = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              this.commitSimpleDraft();
            }}
            @blur=${this.commitSimpleDraft}
          />
          <span class="simpleDivider" aria-hidden="true">/</span>
          <span>${this.totalPages}</span>
        </div>
        ${edge("next")}`;
    }
    if (this.hideNumbers) {
      return html`${edge("prev")}
        <span class="counter" aria-live="polite"
          >${page} / ${this.totalPages}</span
        >
        ${edge("next")}`;
    }
    return repeat(
      this.items(),
      (item) => item.key,
      (item) => this.renderItem(item),
    );
  }

  protected override render() {
    const t = this.locale.t;
    const labels = this.labels;
    const total = this.total;
    const pageSize = this.pageSize;
    const shownPage = Math.min(Math.max(1, this.current), this.totalPages);
    const visibleRange: [number, number] =
      total > 0
        ? [
            (shownPage - 1) * pageSize + 1,
            Math.min(shownPage * pageSize, total),
          ]
        : [0, 0];
    const options = this.pageSizeOptions.includes(pageSize)
      ? this.pageSizeOptions
      : [...this.pageSizeOptions, pageSize].sort((a, b) => a - b);
    const sizeOptionLabel = (size: number) =>
      labels?.pageSizeOption?.(size) ??
      t("pagination.pageSizeOption", { size });

    return html`<nav
      part="root"
      aria-label=${this.aria.label ?? labels?.nav ?? t("pagination.nav")}
      class=${classMap({
        pagination: true,
        disabled: this.disabled,
        small: this.size === "small",
        large: this.size === "large",
        circle: this.shape === "circle",
        square: this.shape === "square",
        [this.variant]: true,
        responsive: this.responsive,
      })}
    >
      ${
        this.showTotal
          ? html`<div
              part="total"
              class="total"
              aria-live="polite"
              aria-atomic="true"
            >
              ${
                this.totalRender
                  ? this.totalRender(total, visibleRange)
                  : (labels?.total?.(total) ?? t("pagination.total", { total }))
              }
            </div>`
          : nothing
      }
      ${this.renderPageList()}
      ${
        this.showQuickJumper
          ? html`<label part="jumper" class="jumper">
              ${labels?.jumpTo ?? t("pagination.jumpTo")}
              <input
                .value=${this.jumpValue}
                ?disabled=${this.disabled}
                inputmode="numeric"
                aria-label=${labels?.jumpToInput ?? t("pagination.jumpToInput")}
                @input=${(e: Event) =>
                  (this.jumpValue = (e.target as HTMLInputElement).value)}
                @keydown=${this.handleJump}
              />
            </label>`
          : nothing
      }
      ${
        this.showSizeChanger
          ? html`<div class="sizeChanger">
              <select
                part="size-changer"
                ?disabled=${this.disabled}
                aria-label=${labels?.pageSize ?? t("pagination.pageSize")}
                @change=${this.handleSizeChange}
              >
                ${options.map(
                  (option) =>
                    html`<option
                      value=${option}
                      .selected=${option === pageSize}
                    >
                      ${sizeOptionLabel(option)}
                    </option>`,
                )}
              </select>
            </div>`
          : nothing
      }
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-pagination": MinervaPagination;
  }
}
