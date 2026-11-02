import { css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/KanbanBoard/kanbanBoard.module.scss?inline";
import {
  KANBAN_COLUMN_WIDTH,
  KANBAN_GAP,
  kanbanAccent,
  kanbanCount,
  kanbanLength,
  type KanbanCardMove,
} from "@minerva/core";
import { createKanbanDrag, type KanbanDrag } from "@minerva/dom";
import { AriaController } from "../../internal/aria";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type { KanbanCardMove };

/** A length: a number of pixels or any CSS length ("18rem", "40vh") */
export type KanbanLength = number | string;

/** Accent of a column: a theme color or any CSS color */
export type KanbanColumnColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | (string & {});

/** Attribute of a length: a plain number is pixels, anything else CSS */
const lengthConverter = {
  fromAttribute(value: string | null): KanbanLength | undefined {
    const text = value?.trim();
    if (!text) return undefined;
    return /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;
  },
  toAttribute(value: KanbanLength | undefined): string | null {
    return value === undefined || value === null ? null : String(value);
  },
};

const COLUMN_TAG = "minerva-kanban-column";
const CARD_TAG = "minerva-kanban-card";

const childrenNamed = (parent: Element, tag: string) =>
  Array.from(parent.children).filter(
    (child): child is HTMLElement => child.localName === tag,
  );

const text = (element: Element) =>
  (element.textContent ?? "").replace(/\s+/g, " ").trim();

/** The board a card or column belongs to (its closest one) */
const boardOf = (element: Element) =>
  element.parentElement?.closest<MinervaKanbanBoard>("minerva-kanban-board") ??
  null;

/**
 * A horizontally scrolling board of status columns (`<KanbanBoard>` of
 * React): put `minerva-kanban-column` elements in it. Columns share one
 * width (`column-width`, 18rem by default); `fill` stretches them equally
 * when they fit; `height` / `max-height` bound the board so that the column
 * bodies scroll vertically. The board is a labelled `role="region"` (name:
 * the host's `aria-label` / `aria-labelledby`, else localized "Board") and
 * a tab stop, so the keyboard can scroll it; on narrow screens the columns
 * keep their width and snap while scrolling.
 *
 * `draggable` lets the `minerva-kanban-card` children of keyed columns
 * (`value`) be dragged with the mouse, touch (long press) or the keyboard
 * (Space / Enter picks a focused card up, the arrows move it, Space / Enter
 * drops it, Escape cancels). The board is controlled: it fires
 * `minerva-card-move` and the app moves the card element (or re-renders).
 * While dragging is on, the board holds a small layer (drop line, dragged
 * copy, live region) as its last light DOM child.
 *
 * @summary Horizontally scrolling board of status columns.
 * @tag minerva-kanban-board
 * @slot - The columns (`minerva-kanban-column`)
 * @csspart root - The scrolling `role=region` row of columns
 * @fires minerva-card-move - A card was dropped at a new position; `detail: { cardKey, fromColumn, fromIndex, toColumn, toIndex }` (`toIndex` counts the cards without the moved one)
 */
export class MinervaKanbanBoard extends MinervaElement {
  static override tagName = "minerva-kanban-board";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-inline-size: 0;
        max-inline-size: 100%;
      }
      /* while a card is dragged (the drag controller marks the host) */
      :host([data-kanban-dragging]) .board {
        scroll-snap-type: none;
        user-select: none;
      }
      :host([data-kanban-dragging="pointer"]) .board {
        cursor: grabbing;
      }
    `,
    sharedStyles(styles),
  ];

  /** Width of every column (a number is pixels); with `fill` the minimum width */
  @property({ attribute: "column-width", converter: lengthConverter })
  columnWidth: KanbanLength = "18rem";

  /** Stretches the columns equally to fill the board when they fit */
  @property({ type: Boolean, reflect: true })
  fill = false;

  /** Space between the columns (a number is pixels) */
  @property({ converter: lengthConverter })
  gap: KanbanLength = "0.75rem";

  /** Height of the board: the column bodies scroll vertically within it (a number is pixels) */
  @property({ converter: lengthConverter })
  height?: KanbanLength;

  /** Maximum height of the board: the column bodies scroll vertically within it (a number is pixels) */
  @property({ attribute: "max-height", converter: lengthConverter })
  maxHeight?: KanbanLength;

  /**
   * Lets the `minerva-kanban-card` children of keyed columns be dragged
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
  canDrop?: (move: KanbanCardMove) => boolean;

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private drag: KanbanDrag | null = null;
  private static hints = 0;
  private readonly hintId = `minerva-kanban-hint-${++MinervaKanbanBoard.hints}`;

  override connectedCallback(): void {
    super.connectedCallback();
    this.drag ??= createKanbanDrag(this, {
      columns: () => childrenNamed(this, COLUMN_TAG),
      columnKey: (column) =>
        (column as MinervaKanbanColumn).value || column.getAttribute("value"),
      columnLabel: (column) => {
        const heading = (column as MinervaKanbanColumn).heading?.trim();
        const slotted = column.querySelector(':scope > [slot="heading"]');
        return (
          heading ||
          (slotted ? text(slotted) : "") ||
          column.getAttribute("aria-label") ||
          column.getAttribute("value") ||
          ""
        );
      },
      cards: (column) => childrenNamed(column, CARD_TAG),
      cardKey: (card) =>
        (card as MinervaKanbanCard).value || card.getAttribute("value"),
      cardLabel: (card) =>
        (card as MinervaKanbanCard).label ||
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
    for (const card of this.querySelectorAll<MinervaKanbanCard>(CARD_TAG))
      if (boardOf(card) === this) card.syncBoard();
  }

  private onSlotChange = () => {
    // the app may have replaced the children, the drag layer with them
    this.drag?.refresh();
  };

  protected override render() {
    const style: Record<string, string> = {};
    // the defaults stay unset: a --kanban-* variable set on an ancestor wins
    const width = kanbanLength(this.columnWidth);
    const gap = kanbanLength(this.gap);
    const height = kanbanLength(this.height);
    const maxHeight = kanbanLength(this.maxHeight);
    if (width && width !== KANBAN_COLUMN_WIDTH)
      style["--kanban-column-width"] = width;
    if (gap && gap !== KANBAN_GAP) style["--kanban-gap"] = gap;
    if (height) style.height = height;
    if (maxHeight) style["max-height"] = maxHeight;
    return html`<div
      part="root"
      class="board ${this.fill ? "fill" : ""}"
      role="region"
      tabindex="0"
      aria-label=${this.aria.label ?? this.i18n.t("kanban.label")}
      style=${styleMap(style)}
    >
      <slot @slotchange=${this.onSlotChange}></slot>
    </div>`;
  }
}

/**
 * A status column of a `minerva-kanban-board` (`<KanbanColumn>` of React).
 * The header shows an optional accent dot (`color`: a theme color or any
 * CSS color), the `heading`, a `count` badge and the `actions` slot; the
 * cards (default slot) form a `role="list"` that scrolls vertically within a
 * bounded board (each slotted card without a role gets `role="listitem"`;
 * there is no wrapper); `empty-text` / the `empty` slot (default: localized
 * "No items") replaces the list when there are no cards, and the `footer`
 * slot sits below. The column is a `role="group"` named by its heading and
 * count ("To do, 3 items").
 *
 * @summary Status column of a kanban board: header, count, cards and footer.
 * @tag minerva-kanban-column
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
export class MinervaKanbanColumn extends MinervaElement {
  static override tagName = "minerva-kanban-column";
  static override styles = [
    hostStyles,
    css`
      /* the host is the flex item of the board (equal widths, fill) */
      :host {
        display: flex;
        flex: var(--_kanban-grow, 0) 0 var(--kanban-column-width, 18rem);
        flex-direction: column;
        box-sizing: border-box;
        inline-size: var(--kanban-column-width, 18rem);
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
      :host([data-kanban-drop-target]) section.column {
        border-color: var(--kanban-drop-indicator-color, var(--primary-color));
        box-shadow: 0 0 0 1px
          var(--kanban-drop-indicator-color, var(--primary-color));
      }
      @media (forced-colors: active) {
        :host([data-kanban-drop-target]) section.column {
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
  color?: KanbanColumnColor;

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
    return { color: kanbanAccent(this.color).scheme };
  }

  protected override render() {
    const t = this.i18n.t;
    const count = kanbanCount(this.count);
    const { scheme, custom } = kanbanAccent(this.color);
    const heading = this.heading.trim();
    const label =
      this.aria.label ??
      (heading
        ? count !== undefined
          ? t("kanban.columnLabel", { title: heading, count })
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
      style=${styleMap(custom ? { "--kanban-column-color": custom } : {})}
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
              <slot name="empty">${this.emptyText ?? t("kanban.empty")}</slot>
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
 * A card of a `minerva-kanban-column` (`<KanbanCard>` of React), keyed by
 * `value`. In a draggable board its content sits in a focusable
 * `role="button"` (the `root` part) described by the drag instructions;
 * otherwise the part is a plain wrapper. The host is the list item of the
 * column. Controls inside a draggable card keep working (a drag never
 * starts on them), but keep them few: they sit inside the button.
 *
 * @summary Card of a kanban column that a draggable board can move.
 * @tag minerva-kanban-card
 * @slot - The content of the card
 * @csspart root - The card wrapper (a focusable `role=button` in a draggable board)
 */
export class MinervaKanbanCard extends MinervaElement {
  static override tagName = "minerva-kanban-card";
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
      :host([data-kanban-dragging="pointer"]) .card {
        opacity: 0.4;
      }
      /* picked up with the keyboard: it stays, the drop line moves */
      :host([data-kanban-dragging="keyboard"]) .card {
        outline: 2px dashed
          var(--kanban-drop-indicator-color, var(--primary-color));
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

  /** @internal Called by the owning `<minerva-kanban-board>`. */
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
              >${this.i18n.t("kanban.dragHint")}</span
            >`
          : nothing
      }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-kanban-board": MinervaKanbanBoard;
    "minerva-kanban-card": MinervaKanbanCard;
    "minerva-kanban-column": MinervaKanbanColumn;
  }
}
