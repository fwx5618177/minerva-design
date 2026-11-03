import { css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/DashboardColumns/dashboardColumns.module.scss?inline";
import {
  DASHBOARD_COLUMN_WIDTH,
  DASHBOARD_GAP,
  dashboardAccent,
  dashboardCount,
  dashboardLength,
  type DashboardCardMove,
} from "@minerva/core";
import { createDashboardDrag, type DashboardDrag } from "@minerva/dom";
import { AriaController } from "../../internal/aria";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type { DashboardCardMove };

/** A length: a number of pixels or any CSS length ("18rem", "40vh") */
export type DashboardLength = number | string;

/** Accent of a column: a theme color or any CSS color */
export type DashboardColumnColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | (string & {});

/** Attribute of a length: a plain number is pixels, anything else CSS */
const lengthConverter = {
  fromAttribute(value: string | null): DashboardLength | undefined {
    const text = value?.trim();
    if (!text) return undefined;
    return /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;
  },
  toAttribute(value: DashboardLength | undefined): string | null {
    return value === undefined || value === null ? null : String(value);
  },
};

// Matched by class rather than by tag name, so that elements registered
// under other tags (e.g. deprecated aliases subclassing these) take part.
const childrenOf = <T extends HTMLElement>(
  parent: Element,
  type: abstract new () => T,
) =>
  Array.from(parent.children).filter(
    (child): child is T => child instanceof type,
  );

const text = (element: Element) =>
  (element.textContent ?? "").replace(/\s+/g, " ").trim();

/** The board a card or column belongs to (its closest one) */
const boardOf = (element: Element): MinervaDashboardColumns | null => {
  for (let node = element.parentElement; node; node = node.parentElement)
    if (node instanceof MinervaDashboardColumns) return node;
  return null;
};

/**
 * A horizontally scrolling board of status columns (`<DashboardColumns>` of
 * React): put `minerva-dashboard-column` elements in it. Columns share one
 * width (`column-width`, 18rem by default); `fill` stretches them equally
 * when they fit; `height` / `max-height` bound the board so that the column
 * bodies scroll vertically. The board is a labelled `role="region"` (name:
 * the host's `aria-label` / `aria-labelledby`, else localized "Board") and
 * a tab stop, so the keyboard can scroll it; on narrow screens the columns
 * keep their width and snap while scrolling.
 *
 * `draggable` lets the `minerva-dashboard-card` children of keyed columns
 * (`value`) be dragged with the mouse, touch (long press) or the keyboard
 * (Space / Enter picks a focused card up, the arrows move it, Space / Enter
 * drops it, Escape cancels). The board is controlled: it fires
 * `minerva-card-move` and the app moves the card element (or re-renders).
 * While dragging is on, the board holds a small layer (drop line, dragged
 * copy, live region) as its last light DOM child.
 *
 * @summary Horizontally scrolling board of status columns.
 * @tag minerva-dashboard-columns
 * @slot - The columns (`minerva-dashboard-column`)
 * @csspart root - The scrolling `role=region` row of columns
 * @fires minerva-card-move - A card was dropped at a new position; `detail: { cardKey, fromColumn, fromIndex, toColumn, toIndex }` (`toIndex` counts the cards without the moved one)
 */
export class MinervaDashboardColumns extends MinervaElement {
  static override tagName = "minerva-dashboard-columns";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-inline-size: 0;
        max-inline-size: 100%;
      }
      /* while a card is dragged (the drag controller marks the host) */
      :host([data-dashboard-dragging]) .board {
        scroll-snap-type: none;
        user-select: none;
      }
      :host([data-dashboard-dragging="pointer"]) .board {
        cursor: grabbing;
      }
    `,
    sharedStyles(styles),
  ];

  /** Width of every column (a number is pixels); with `fill` the minimum width */
  @property({ attribute: "column-width", converter: lengthConverter })
  columnWidth: DashboardLength = "18rem";

  /** Stretches the columns equally to fill the board when they fit */
  @property({ type: Boolean, reflect: true })
  fill = false;

  /** Space between the columns (a number is pixels) */
  @property({ converter: lengthConverter })
  gap: DashboardLength = "0.75rem";

  /** Height of the board: the column bodies scroll vertically within it (a number is pixels) */
  @property({ converter: lengthConverter })
  height?: DashboardLength;

  /** Maximum height of the board: the column bodies scroll vertically within it (a number is pixels) */
  @property({ attribute: "max-height", converter: lengthConverter })
  maxHeight?: DashboardLength;

  /**
   * Lets the `minerva-dashboard-card` children of keyed columns be dragged
   * (mouse, touch long press, keyboard); the board fires `minerva-card-move`.
   * Replaces the native `draggable` (HTML drag and drop of the host): the
   * attribute turns it on unless it is `"false"`.
   */
  @property({
    converter: {
      fromAttribute: (value: string | null) =>
        value !== null && value !== "false",
    },
  })
  override draggable = false;

  /**
   * Whether a card may be dropped at a position (property only): refused
   * positions show no drop indicator and the keyboard skips them
   */
  @property({ attribute: false })
  canDrop?: (move: DashboardCardMove) => boolean;

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private drag: DashboardDrag | null = null;
  private static hints = 0;
  private readonly hintId = `minerva-dashboard-hint-${++MinervaDashboardColumns.hints}`;

  override connectedCallback(): void {
    super.connectedCallback();
    this.drag ??= createDashboardDrag(this, {
      columns: () => childrenOf(this, MinervaDashboardColumn),
      columnKey: (column) =>
        (column as MinervaDashboardColumn).value ||
        column.getAttribute("value"),
      columnLabel: (column) => {
        const heading = (column as MinervaDashboardColumn).heading?.trim();
        const slotted = column.querySelector(':scope > [slot="heading"]');
        return (
          heading ||
          (slotted ? text(slotted) : "") ||
          column.getAttribute("aria-label") ||
          column.getAttribute("value") ||
          ""
        );
      },
      cards: (column) => childrenOf(column, MinervaDashboardCard),
      cardKey: (card) =>
        (card as MinervaDashboardCard).value || card.getAttribute("value"),
      cardLabel: (card) =>
        (card as MinervaDashboardCard).label ||
        text(card) ||
        card.getAttribute("value") ||
        "",
      body: (column) => {
        const shadow = column.shadowRoot;
        return (
          shadow?.querySelector<HTMLElement>(".list") ??
          shadow?.querySelector<HTMLElement>(".empty") ??
          null
        );
      },
      scroller: () => this.renderRoot.querySelector<HTMLElement>(".board"),
      hintId: this.hintId,
      enabled: () => this.draggable,
      canDrop: (move) => this.canDrop?.(move) ?? true,
      onMove: (move) => this.emit("minerva-card-move", move),
      t: (key, params) => this.i18n.t(key, params),
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.drag?.destroy();
    this.drag = null;
  }

  override focus(options?: FocusOptions): void {
    this.renderRoot.querySelector<HTMLElement>(".board")?.focus(options);
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    this.drag?.refresh();
    if (changed.has("draggable")) this.syncCards();
  }

  /** Tells the cards whether they are draggable */
  private syncCards() {
    for (const card of this.querySelectorAll("*"))
      if (card instanceof MinervaDashboardCard && boardOf(card) === this)
        card.syncBoard();
  }

  private onSlotChange = () => {
    // the app may have replaced the children, the drag layer with them
    this.drag?.refresh();
  };

  protected override render() {
    const style: Record<string, string> = {};
    // the defaults stay unset: a --dashboard-* variable set on an ancestor wins
    const width = dashboardLength(this.columnWidth);
    const gap = dashboardLength(this.gap);
    const height = dashboardLength(this.height);
    const maxHeight = dashboardLength(this.maxHeight);
    if (width && width !== DASHBOARD_COLUMN_WIDTH)
      style["--dashboard-column-width"] = width;
    if (gap && gap !== DASHBOARD_GAP) style["--dashboard-gap"] = gap;
    if (height) style.height = height;
    if (maxHeight) style["max-height"] = maxHeight;
    return html`<div
      part="root"
      class="board ${this.fill ? "fill" : ""}"
      role="region"
      tabindex="0"
      aria-label=${this.aria.label ?? this.i18n.t("dashboard.label")}
      style=${styleMap(style)}
    >
      <slot @slotchange=${this.onSlotChange}></slot>
    </div>`;
  }
}

/**
 * A status column of a `minerva-dashboard-columns` (`<DashboardColumn>` of React).
 * The header shows an optional accent dot (`color`: a theme color or any
 * CSS color), the `heading`, a `count` badge and the `actions` slot; the
 * cards (default slot) form a `role="list"` that scrolls vertically within a
 * bounded board (each slotted card without a role gets `role="listitem"`;
 * there is no wrapper); `empty-text` / the `empty` slot (default: localized
 * "No items") replaces the list when there are no cards, and the `footer`
 * slot sits below. The column is a `role="group"` named by its heading and
 * count ("To do, 3 items").
 *
 * @summary Status column of a DashboardColumns: header, count, cards and footer.
 * @tag minerva-dashboard-column
 * @slot - The cards (each gets `role="listitem"` unless it has a role)
 * @slot heading - Rich title (alternative to the `heading` attribute)
 * @slot actions - Header controls on the end side (e.g. an add button)
 * @slot description - Supporting text (alternative to the `description` attribute)
 * @slot empty - Content shown when there are no cards (default: `empty-text`, else localized "No items")
 * @slot footer - Footer below the cards (e.g. an "Add card" button)
 * @csspart root - The `role=group` column (state `color-<name>` for a theme accent)
 * @csspart header - The header row (accent, title, count, actions)
 * @csspart indicator - The accent dot before the title (with `color`)
 * @csspart title - The title of the column
 * @csspart count - The count badge (with `count`)
 * @csspart actions - The header actions (with the `actions` slot)
 * @csspart description - The supporting text (with a description)
 * @csspart list - The `role=list` body holding the cards
 * @csspart empty - The empty content shown instead of the list
 * @csspart footer - The footer (with the `footer` slot)
 */
export class MinervaDashboardColumn extends MinervaElement {
  static override tagName = "minerva-dashboard-column";
  static override styles = [
    hostStyles,
    css`
      /* the host is the flex item of the board (equal widths, fill) */
      :host {
        display: flex;
        flex: var(--_dashboard-grow, 0) 0 var(--dashboard-column-width, 18rem);
        flex-direction: column;
        box-sizing: border-box;
        inline-size: var(--dashboard-column-width, 18rem);
        min-inline-size: 0;
        min-block-size: 0;
        max-block-size: 100%;
        scroll-snap-align: start;
      }
      section.column {
        flex: 1 1 auto;
        inline-size: auto;
        min-block-size: 0;
      }
      .list ::slotted(*) {
        flex: none;
        min-inline-size: 0;
      }
      /* the column a dragged card would land in */
      :host([data-dashboard-drop-target]) section.column {
        border-color: var(
          --dashboard-drop-indicator-color,
          var(--primary-color)
        );
        box-shadow: 0 0 0 1px
          var(--dashboard-drop-indicator-color, var(--primary-color));
      }
      @media (forced-colors: active) {
        :host([data-dashboard-drop-target]) section.column {
          border-color: Highlight;
        }
      }
    `,
    sharedStyles(styles),
  ];

  /** Title of the column (also its accessible name; or use the `heading` slot) */
  @property()
  heading = "";

  /** Key of the column, reported as `fromColumn` / `toColumn` by a draggable board (columns without one take no cards) */
  @property()
  value?: string;

  /** Number of items shown as a badge (and announced with the title); unset hides it */
  @property({ type: Number })
  count?: number;

  /** Accent: a theme color (primary, success, warning, danger, info, neutral) or any CSS color */
  @property({ reflect: true })
  color?: DashboardColumnColor;

  /** Supporting text under the header (or use the `description` slot) */
  @property()
  description = "";

  /** Text shown when there are no cards (default: localized "No items"; or use the `empty` slot) */
  @property({ attribute: "empty-text" })
  emptyText?: string;

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);
  /** Slotted cards the column gave role="listitem" */
  private readonly listItems = new Set<Element>();

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.releaseItems(new Set());
  }

  private releaseItems(keep: ReadonlySet<Element>) {
    for (const item of this.listItems) {
      if (keep.has(item)) continue;
      if (item.getAttribute("role") === "listitem")
        item.removeAttribute("role");
      this.listItems.delete(item);
    }
  }

  private syncItems() {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>(
      ".list > slot:not([name])",
    );
    const assigned = new Set(slot ? slot.assignedElements() : []);
    this.releaseItems(assigned);
    for (const item of assigned) {
      if (item.hasAttribute("role")) continue;
      item.setAttribute("role", "listitem");
      this.listItems.add(item);
    }
  }

  protected override updated(): void {
    // the light DOM children re-render the column (HasSlotController)
    this.syncItems();
  }

  protected override hookStates() {
    return { color: dashboardAccent(this.color).scheme };
  }

  protected override render() {
    const t = this.i18n.t;
    const count = dashboardCount(this.count);
    const { scheme, custom } = dashboardAccent(this.color);
    const heading = this.heading.trim();
    const label =
      this.aria.label ??
      (heading
        ? count !== undefined
          ? t("dashboard.columnLabel", { title: heading, count })
          : heading
        : undefined);
    const hasCards = this.slots.test("[default]");
    const hasDescription = !!this.description || this.slots.test("description");
    return html`<section
      part="root"
      class="column ${scheme ?? ""}"
      role="group"
      aria-label=${label ?? nothing}
      aria-labelledby=${
        label === undefined
          ? count !== undefined
            ? "title count"
            : "title"
          : nothing
      }
      style=${styleMap(custom ? { "--dashboard-column-color": custom } : {})}
    >
      <div part="header" class="header">
        ${
          scheme || custom
            ? html`<span
                part="indicator"
                class="indicator"
                aria-hidden="true"
              ></span>`
            : nothing
        }
        <span part="title" class="title" id="title"
          ><slot name="heading">${this.heading}</slot></span
        >
        ${
          count !== undefined
            ? html`<span
                part="count"
                class="count"
                id="count"
                aria-hidden=${label !== undefined ? "true" : nothing}
                >${count}</span
              >`
            : nothing
        }
        ${
          this.slots.test("actions")
            ? html`<div part="actions" class="actions">
                <slot name="actions"></slot>
              </div>`
            : nothing
        }
      </div>
      ${
        hasDescription
          ? html`<p part="description" class="description">
              <slot name="description">${this.description}</slot>
            </p>`
          : nothing
      }
      ${
        hasCards
          ? html`<div part="list" class="list" role="list">
              <slot @slotchange=${this.syncItems}></slot>
            </div>`
          : html`<div part="empty" class="empty">
              <slot name="empty"
                >${this.emptyText ?? t("dashboard.empty")}</slot
              >
            </div>`
      }
      ${
        this.slots.test("footer")
          ? html`<div part="footer" class="footer">
              <slot name="footer"></slot>
            </div>`
          : nothing
      }
    </section>`;
  }
}

/**
 * A card of a `minerva-dashboard-column` (`<DashboardCard>` of React), keyed by
 * `value`. In a draggable board its content sits in a focusable
 * `role="button"` (the `root` part) described by the drag instructions;
 * otherwise the part is a plain wrapper. The host is the list item of the
 * column. Controls inside a draggable card keep working (a drag never
 * starts on them), but keep them few: they sit inside the button.
 *
 * @summary Card of a dashboard column that a draggable board can move.
 * @tag minerva-dashboard-card
 * @slot - The content of the card
 * @csspart root - The card wrapper (a focusable `role=button` in a draggable board)
 */
export class MinervaDashboardCard extends MinervaElement {
  static override tagName = "minerva-dashboard-card";
  static override shadowRootOptions = {
    ...MinervaElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-inline-size: 0;
      }
      /* the card left behind while its copy follows the pointer */
      :host([data-dashboard-dragging="pointer"]) .card {
        opacity: 0.4;
      }
      /* picked up with the keyboard: it stays, the drop line moves */
      :host([data-dashboard-dragging="keyboard"]) .card {
        outline: 2px dashed
          var(--dashboard-drop-indicator-color, var(--primary-color));
        outline-offset: 2px;
      }
    `,
    sharedStyles(styles),
  ];

  /** Key of the card, reported as `cardKey` by a draggable board */
  @property()
  value = "";

  /** Name of the card in the drag announcements and, when draggable, its accessible name (default: its text) */
  @property()
  label?: string;

  /** Whether the closest board is draggable */
  @state()
  private dragEnabled = false;

  private readonly i18n = new LocaleController(this);

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncBoard();
  }

  /** @internal Called by the owning `<minerva-dashboard-columns>`. */
  syncBoard(): void {
    this.dragEnabled = boardOf(this)?.draggable ?? false;
  }

  protected override render() {
    const draggable = this.dragEnabled;
    return html`<div
        part="root"
        class="card"
        role=${draggable ? "button" : nothing}
        tabindex=${draggable ? "0" : nothing}
        aria-label=${(draggable && this.label) || nothing}
        aria-describedby=${draggable ? "hint" : nothing}
        ?data-draggable=${draggable}
      >
        <slot></slot>
      </div>
      ${
        draggable
          ? html`<span id="hint" hidden
              >${this.i18n.t("dashboard.dragHint")}</span
            >`
          : nothing
      }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-dashboard-columns": MinervaDashboardColumns;
    "minerva-dashboard-card": MinervaDashboardCard;
    "minerva-dashboard-column": MinervaDashboardColumn;
  }
}
