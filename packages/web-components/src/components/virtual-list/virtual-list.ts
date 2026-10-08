import {
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/VirtualList/virtualList.module.scss?inline";
import progressStyles from "@react-styles/components/ProgressIndicator/progressIndicator.module.scss?inline";
import { getVirtualRange } from "@minerva/core";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { IconWaveSquare } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

/** An item of a virtual list */
export interface VirtualListItem {
  /** Unique key of the item */
  id: string | number;
  /** Arbitrary data for renderItem */
  metadata?: Record<string, string | number | boolean>;
}

/** Renders the content of one row */
export type VirtualListRenderItem = (
  item: VirtualListItem,
  index: number,
) => string | Node | TemplateResult | null | undefined;

interface WindowItem {
  index: number;
  start: number;
}

/**
 * A windowed (virtualized) list: only the rows in view (plus `overscan`
 * rows above and below) are in the DOM (`<VirtualList>` of React). Rows
 * have a fixed height (`item-height`, or measured from the first item).
 *
 * - Data: set the `items` property (`{ id, metadata? }[]`) and a
 *   `renderItem(item, index)` function property returning text, a Node or a
 *   Lit template. Rows are rendered in the shadow root: style their content
 *   with inline styles / your own elements, or through `::part(item)`.
 * - The scroll container is a focusable `region` (keyboard scrolling) named
 *   by `aria-label`; rows are `listitem`s exposing their real position
 *   (`aria-setsize` / `aria-posinset`). The row holding focus stays rendered
 *   when scrolled out of the window (focus is never dropped).
 * - `clickable` (React: passing `onItemClick`) makes rows focusable and
 *   activatable with Enter / Space: `minerva-item-click`.
 * - Scrolling near the bottom fires `minerva-load-more` (once until `items`
 *   or `loading` change).
 *
 * @summary Windowed list rendering only the visible rows.
 * @tag minerva-virtual-list
 * @csspart root - The scroll container (`role="region"`)
 * @csspart list - The list (`role="list"`) sized to all the rows
 * @csspart item - A rendered row (`role="listitem"`)
 * @csspart loading - The loading indicator row (while loading)
 * @fires minerva-item-click - A clickable row was clicked or activated with Enter / Space (`detail: { item, index }`)
 * @fires minerva-load-more - The list was scrolled within `load-more-threshold` px of the bottom
 */
export class MinervaVirtualList extends MinervaElement {
  static override tagName = "minerva-virtual-list";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      .wave {
        display: inline-flex;
      }
    `,
    sharedStyles(progressStyles),
    sharedStyles(styles),
  ];

  /** Items to render */
  @property({ attribute: false })
  items: VirtualListItem[] = [];

  /** Renders the content of one row (text, Node or Lit template) */
  @property({ attribute: false })
  renderItem?: VirtualListRenderItem;

  /** Fixed row height in pixels; measured from the first item when omitted */
  @property({ type: Number, attribute: "item-height" })
  itemHeight?: number;

  /** Padding of each row in pixels */
  @property({ type: Number, attribute: "item-padding" })
  itemPadding = 8;

  /** Number of rows rendered above and below the visible area */
  @property({ type: Number })
  overscan = 5;

  /** Maximum height of the scroll container in pixels */
  @property({ type: Number, attribute: "max-height" })
  maxHeight?: number;

  /** Distance from the bottom (px) at which `minerva-load-more` fires */
  @property({ type: Number, attribute: "load-more-threshold" })
  loadMoreThreshold = 100;

  /** Batches scroll updates with requestAnimationFrame and requestIdleCallback */
  @property({ type: Boolean, attribute: "high-performance" })
  highPerformance = false;

  /** Shows a loading indicator at the bottom of the list (aria-busy) */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Rows are clickable: focusable, pointer cursor, `minerva-item-click` */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  @state()
  private scrollOffset = 0;

  @state()
  private containerHeight = 0;

  /** Measured content height of a row (without padding); 0 = not measured */
  @state()
  private measuredHeight = 0;

  @state()
  private focusedId: VirtualListItem["id"] | null = null;

  @query(".virtualList")
  private container?: HTMLElement;

  @query(".measureItem")
  private measureElement?: HTMLElement;

  private readonly aria = new AriaController(this);
  private readonly locale = new LocaleController(this);
  private resizeObserver: ResizeObserver | null = null;
  private measureObserver: ResizeObserver | null = null;
  private lastScrollTop = 0;
  private loadingMore = false;
  private raf?: number;
  private idle?: number;

  /** The scroll container (e.g. to scroll programmatically) */
  get scrollContainer(): HTMLElement | null {
    return this.container ?? null;
  }

  /** Scrolls so that the row at `index` is at the top of the list */
  scrollToIndex(index: number): void {
    const container = this.container;
    const height = this.rowHeight;
    if (!container || !height) return;
    container.scrollTop = Math.max(0, index) * height;
    this.updateScroll(container.scrollTop);
  }

  private get rowHeight(): number {
    if (this.itemHeight) return this.itemHeight;
    return this.measuredHeight > 0
      ? this.measuredHeight + this.itemPadding * 2
      : 0;
  }

  private get needsMeasure(): boolean {
    return (
      !this.itemHeight && this.measuredHeight === 0 && this.items.length > 0
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.measureObserver?.disconnect();
    this.measureObserver = null;
    this.cancelScheduled();
  }

  protected override firstUpdated(): void {
    this.observeContainer();
  }

  protected override reconnectedCallback(): void {
    super.reconnectedCallback();
    this.observeContainer();
  }

  /** Tracks the height of the scroll container. */
  private observeContainer() {
    const container = this.container;
    if (!container) return;
    this.containerHeight = container.clientHeight;
    if (this.resizeObserver || typeof ResizeObserver === "undefined") return;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.containerHeight = entry.contentRect.height;
      }
    });
    this.resizeObserver.observe(container);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    // New data / loading state: a new load-more request may happen
    if (changed.has("items") || changed.has("loading")) {
      this.loadingMore = false;
    }
    if (
      this.focusedId !== null &&
      changed.has("items") &&
      !this.items.some((item) => item.id === this.focusedId)
    ) {
      this.focusedId = null;
    }
  }

  protected override updated(): void {
    this.syncMeasure();
    if (DEV && this.items.length > 0 && !this.renderItem) {
      devWarn(
        MinervaVirtualList.tagName,
        "set the renderItem property (a function returning the content of a row); rows show the item id meanwhile.",
      );
    }
    if (DEV && this.maxHeight === undefined) {
      devWarn(
        MinervaVirtualList.tagName,
        "set max-height (pixels): without a bounded height the list cannot scroll, so every row is rendered.",
      );
    }
  }

  /** Measures the first item while no row height is known. */
  private syncMeasure() {
    const node = this.needsMeasure ? this.measureElement : undefined;
    if (!node) {
      this.measureObserver?.disconnect();
      this.measureObserver = null;
      return;
    }
    const measure = () => {
      const height = node.offsetHeight;
      if (height > 0) this.measuredHeight = height;
    };
    measure();
    if (this.measureObserver || typeof ResizeObserver === "undefined") return;
    this.measureObserver = new ResizeObserver(measure);
    this.measureObserver.observe(node);
  }

  private cancelScheduled() {
    if (this.raf !== undefined) {
      cancelAnimationFrame(this.raf);
      this.raf = undefined;
    }
    if (this.idle !== undefined) {
      if (typeof cancelIdleCallback === "function")
        cancelIdleCallback(this.idle);
      this.idle = undefined;
    }
  }

  private schedule(callback: () => void) {
    if (!this.highPerformance) {
      callback();
      return;
    }
    // Only the latest scroll position matters: drop pending work
    this.cancelScheduled();
    this.raf = requestAnimationFrame(() => {
      this.raf = undefined;
      if (typeof requestIdleCallback === "function") {
        this.idle = requestIdleCallback(
          () => {
            this.idle = undefined;
            callback();
          },
          { timeout: 100 },
        );
      } else {
        callback();
      }
    });
  }

  private updateScroll(scrollTop: number) {
    this.scrollOffset = scrollTop;
  }

  private handleScroll(event: Event) {
    const { scrollTop, scrollHeight, clientHeight } =
      event.currentTarget as HTMLElement;
    const scrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop;
    this.schedule(() => {
      this.updateScroll(scrollTop);
      if (
        scrollingDown &&
        !this.loadingMore &&
        !this.loading &&
        scrollHeight - scrollTop - clientHeight < this.loadMoreThreshold &&
        scrollHeight > clientHeight
      ) {
        this.loadingMore = true;
        this.emit("minerva-load-more");
      }
    });
  }

  private visibleWindow(): WindowItem[] {
    const height = this.rowHeight;
    if (!height) return [];
    const { start, end } = getVirtualRange({
      scrollTop: this.scrollOffset,
      viewportHeight: this.containerHeight,
      itemHeight: height,
      itemCount: this.items.length,
      overscan: this.overscan,
    });
    const rows: WindowItem[] = [];
    for (let i = start; i < end; i++)
      rows.push({ index: i, start: i * height });
    // Keep the focused row rendered (at its real position) outside the window
    if (this.focusedId !== null) {
      const index = this.items.findIndex((item) => item.id === this.focusedId);
      if (index >= 0 && (index < start || index >= end)) {
        const row = { index, start: index * height };
        if (index < start) rows.unshift(row);
        else rows.push(row);
      }
    }
    return rows;
  }

  private renderContent(item: VirtualListItem, index: number) {
    return this.renderItem ? this.renderItem(item, index) : String(item.id);
  }

  private activate(item: VirtualListItem, index: number) {
    this.emit("minerva-item-click", { item, index });
  }

  private handleRowKeyDown(
    event: KeyboardEvent,
    item: VirtualListItem,
    index: number,
  ) {
    // Only the row itself: keys of its content are theirs
    if (event.composedPath()[0] !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this.activate(item, index);
  }

  private handleRowFocusOut(event: FocusEvent) {
    const row = event.currentTarget as HTMLElement;
    const next = event.relatedTarget as Node | null;
    if (!next || !row.contains(next)) this.focusedId = null;
  }

  protected override hookStates() {
    return { loading: this.loading };
  }

  protected override render() {
    const height = this.rowHeight;
    const label = this.aria.label ?? nothing;
    const rows = this.visibleWindow();
    const total = this.items.length;
    return html`<div
      class="virtualList"
      part="root"
      role="region"
      tabindex="0"
      aria-label=${label}
      aria-busy=${this.loading ? "true" : nothing}
      style=${styleMap({
        maxHeight:
          this.maxHeight !== undefined ? `${this.maxHeight}px` : undefined,
        overflow: "auto",
        position: "relative",
      })}
      @scroll=${this.handleScroll}
    >
      ${
        this.needsMeasure
          ? html`<div class="measureItem" aria-hidden="true">
              ${this.renderContent(this.items[0], 0)}
            </div>`
          : nothing
      }
      <div
        class="virtualListContent"
        part="list"
        role="list"
        aria-label=${label}
        style=${styleMap({
          height: height ? `${total * height}px` : "auto",
          position: "relative",
          willChange: "transform",
        })}
      >
        ${repeat(
          rows,
          (row) => this.items[row.index].id,
          (row) => {
            const item = this.items[row.index];
            return html`<div
              part="item"
              role="listitem"
              class=${classMap({
                virtualListItem: true,
                clickable: this.clickable,
              })}
              style=${styleMap({
                position: "absolute",
                top: "0",
                transform: `translateY(${row.start}px)`,
                width: "100%",
                height: `${height}px`,
                willChange: "transform",
                padding: `${this.itemPadding}px`,
              })}
              tabindex=${this.clickable ? "0" : nothing}
              aria-setsize=${total}
              aria-posinset=${row.index + 1}
              @click=${this.clickable ? () => this.activate(item, row.index) : nothing}
              @keydown=${
                this.clickable
                  ? (event: KeyboardEvent) =>
                      this.handleRowKeyDown(event, item, row.index)
                  : nothing
              }
              @focusin=${() => (this.focusedId = item.id)}
              @focusout=${this.handleRowFocusOut}
            >
              ${this.renderContent(item, row.index)}
            </div>`;
          },
        )}
      </div>
      ${
        this.loading
          ? html`<div class="loadingWrapper" part="loading">
              <div
                class="progressIndicator primary"
                role="progressbar"
                aria-label=${this.locale.t("common.loading")}
              >
                <div class="waveContainer small">
                  <span class="wave" aria-hidden="true">${IconWaveSquare}</span>
                </div>
              </div>
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-virtual-list": MinervaVirtualList;
  }
}
