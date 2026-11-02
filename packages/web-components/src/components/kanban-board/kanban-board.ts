import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/KanbanBoard/kanbanBoard.module.scss?inline";
import {
  KANBAN_COLUMN_WIDTH,
  KANBAN_GAP,
  kanbanAccent,
  kanbanCount,
  kanbanLength,
} from "@minerva/core";
import { AriaController } from "../../internal/aria";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

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
 * Drag and drop is not built in: move cards with your own actions (a menu,
 * buttons) and update the columns.
 *
 * @summary Horizontally scrolling board of status columns.
 * @tag minerva-kanban-board
 * @slot - The columns (`minerva-kanban-column`)
 * @csspart root - The scrolling `role=region` row of columns
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

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);

  override focus(options?: FocusOptions): void {
    this.renderRoot.querySelector<HTMLElement>(".board")?.focus(options);
  }

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
      <slot></slot>
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
    `,
    sharedStyles(styles),
  ];

  /** Title of the column (also its accessible name; or use the `heading` slot) */
  @property()
  heading = "";

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

declare global {
  interface HTMLElementTagNameMap {
    "minerva-kanban-board": MinervaKanbanBoard;
    "minerva-kanban-column": MinervaKanbanColumn;
  }
}
