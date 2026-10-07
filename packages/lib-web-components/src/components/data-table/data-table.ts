import {
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap, type StyleInfo } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/Table/table.module.scss?inline";
import buttonStyles from "@lib-core-styles/components/Button/button.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  IconChevronDown,
  IconChevronUp,
  IconChevronsUpDown,
  IconRefreshCw,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { MinervaPagination } from "../pagination/pagination";
import { computeFixedColumnLayout } from "./fixed-columns";
import { sharedStyles } from "../../internal/styles";

export type TableSize = "small" | "medium" | "large";
export type TableVariant = "simple" | "striped" | "bordered";
export type TableColumnAlign = "left" | "center" | "right";
export type TableColumnFixed = "left" | "right";
export type TableRowKey = string | number;
export type TableSortOrder = "ascend" | "descend";
export type TableSortCompare<T> = (a: T, b: T) => number;

/** Content returned by headers and cell render functions */
export type TableContent =
  string | number | Node | TemplateResult | null | undefined;

/** Sort state (`order: null` = unsorted) */
export interface TableSortState {
  key: string;
  order: TableSortOrder | null;
}

/** A column of `<minerva-data-table>` */
export interface TableColumn<T = Record<string, unknown>> {
  /** Unique key; also the field read from the row when there is no `render` */
  key: string;
  /** Header content */
  header: TableContent;
  /** Cell content (string, DOM node or Lit template) */
  render?: (row: T, rowIndex: number) => TableContent;
  /** Width (px number or CSS length), also used as min-width */
  width?: string | number;
  align?: TableColumnAlign;
  /** Truncates the content on a single line */
  ellipsis?: boolean;
  /** Sticky column */
  fixed?: TableColumnFixed;
  /** Sortable by `row[key]` (`true`) or by a compare function */
  sortable?: boolean | TableSortCompare<T>;
}

/** Pagination settings (properties of `<minerva-pagination>`) */
export type DataTablePagination = Partial<
  Pick<
    MinervaPagination,
    | "current"
    | "total"
    | "pageSize"
    | "pageSizeOptions"
    | "showSizeChanger"
    | "showQuickJumper"
    | "showTotal"
    | "totalRender"
    | "size"
    | "shape"
    | "variant"
    | "simple"
    | "siblingCount"
    | "boundaryCount"
    | "hideEdges"
    | "hideNumbers"
    | "responsive"
    | "labels"
    | "disabled"
  >
>;

/** Detail of `minerva-selection-change` */
export interface TableSelectionChangeDetail<T = unknown> {
  selectedRowKeys: TableRowKey[];
  selectedRows: T[];
}

const toLength = (value: number | string | undefined): string | undefined =>
  value === undefined
    ? undefined
    : typeof value === "number" || /^\d+(\.\d+)?$/.test(value)
      ? `${value}px`
      : value;

const isEmpty = (value: unknown): boolean =>
  value === null || value === undefined || value === "";

let collator: Intl.Collator | null = null;

/** Default ascending comparison of two cell values (empty values last) */
const compareValues = (a: unknown, b: unknown): number => {
  if (isEmpty(a) || isEmpty(b)) return isEmpty(a) ? (isEmpty(b) ? 0 : 1) : -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "boolean" && typeof b === "boolean")
    return Number(a) - Number(b);
  collator ??= new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  return collator.compare(String(a), String(b));
};

const compareFor = <T>(col: TableColumn<T>): TableSortCompare<T> | null => {
  if (typeof col.sortable === "function") return col.sortable;
  if (col.sortable)
    return (a, b) =>
      compareValues(
        (a as Record<string, unknown>)[col.key],
        (b as Record<string, unknown>)[col.key],
      );
  return null;
};

/** Next state of the ascending -> descending -> unsorted cycle */
const nextSortState = (
  current: TableSortState | null,
  key: string,
): TableSortState => {
  const order = current?.key === key ? current.order : null;
  return {
    key,
    order: order === null ? "ascend" : order === "ascend" ? "descend" : null,
  };
};

const ARIA_SORT = { ascend: "ascending", descend: "descending" } as const;

/** Width of the selection column (px) */
const SELECTION_WIDTH = 48;

/**
 * Declarative data table (`<Table>` / `<DataTable>` of lib-core): `columns`
 * and `rows` properties, sortable columns (`aria-sort`), row selection with
 * checkboxes, sticky fixed columns, ellipsis columns, empty / loading
 * (skeleton) / error states and an optional `<minerva-pagination>`. Cell
 * `render` functions return a string, a DOM node or a Lit template.
 *
 * The scroll wrapper becomes a focusable, named region when it scrolls
 * (keyboard scrolling). Sorting and selection are uncontrolled by default;
 * cancel `minerva-sort-change` / `minerva-selection-change` and set
 * `sortState` / `selectedRowKeys` yourself for the controlled pattern (or use
 * `manual-sort` for server-side sorting).
 *
 * @summary Data table with sorting, row selection, fixed columns, states and pagination.
 * @tag minerva-data-table
 * @slot empty - Content of the empty state (default: `empty-text` or the localized "No data")
 * @slot error - Content of the error state (default: the `error` text)
 * @csspart base - The outer wrapper
 * @csspart wrapper - The scroll wrapper
 * @csspart table - The `<table>`
 * @csspart sort-button - The sort buttons of sortable headers
 * @csspart checkbox - The selection checkboxes
 * @csspart error - The error state
 * @csspart retry-button - The retry button
 * @csspart pagination - The `<minerva-pagination>`
 * @fires minerva-sort-change - The user changed the sort (`detail: { key, order }`, order `null` = unsorted); cancelable: `preventDefault()` keeps the current sort
 * @fires minerva-selection-change - The user changed the selected rows (`detail: { selectedRowKeys, selectedRows }`); cancelable: `preventDefault()` keeps the current selection
 * @fires minerva-page-change - Re-dispatched from the pagination (`detail: { page, pageSize }`); cancelable
 * @fires minerva-retry - The retry button of the error state was activated
 */
export class MinervaDataTable<
  T extends object = Record<string, unknown>,
> extends MinervaElement {
  static override tagName = "minerva-data-table";
  static override dependencies = [MinervaPagination];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .retry {
        align-self: center;
      }
      .sortIcon {
        display: inline-flex;
      }
    `,
    sharedStyles(buttonStyles),
    sharedStyles(styles),
  ];

  /** Column definitions */
  @property({ attribute: false })
  columns: TableColumn<T>[] = [];

  /** Row data */
  @property({ attribute: false })
  rows: T[] = [];

  /**
   * Row key: a field name or a function (default: the row index). Keys keep
   * the selection and the row DOM across sorting / data updates
   */
  @property({ attribute: "row-key" })
  rowKey?: string | ((row: T, index: number) => TableRowKey);

  /** Text of the empty state (default localized "No data") */
  @property({ attribute: "empty-text" })
  emptyText?: string;

  /** Shows skeleton rows instead of the data (and marks the table busy) */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Number of skeleton rows while loading */
  @property({ type: Number, attribute: "loading-rows" })
  loadingRows = 5;

  /** Current sort */
  @property({ attribute: false })
  sortState: TableSortState | null = null;

  /** Keeps the row order (server-side sorting): only the headers change */
  @property({ type: Boolean, attribute: "manual-sort" })
  manualSort = false;

  /** Adds a checkbox column to select rows */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /** Keys of the selected rows */
  @property({ attribute: false })
  selectedRowKeys: TableRowKey[] = [];

  /** Rows whose checkbox is disabled */
  @property({ attribute: false })
  isRowDisabled?: (row: T) => boolean;

  /** Accessible label of a row checkbox ("Select row {label}"; default: the key) */
  @property({ attribute: false })
  getRowLabel?: (row: T, index: number) => string;

  /** Cell padding / font size */
  @property({ reflect: true })
  size: TableSize = "medium";

  /** Visual style */
  @property({ reflect: true })
  variant: TableVariant = "simple";

  /** Highlights the hovered row */
  @property({ type: Boolean, reflect: true })
  hoverable = false;

  /** Horizontal scroll: minimum table width (px number or CSS length) */
  @property({ attribute: "scroll-x" })
  scrollX?: string | number;

  /** Vertical scroll: maximum wrapper height; the header sticks */
  @property({ attribute: "scroll-y" })
  scrollY?: string | number;

  /** Pagination below the table (properties of `<minerva-pagination>`) */
  @property({ attribute: false })
  pagination?: DataTablePagination;

  /** Error message: replaces the table (and the pagination) with an alert */
  @property()
  error?: string;

  /** Shows a retry button in the error state (fires `minerva-retry`) */
  @property({ type: Boolean })
  retryable = false;

  /** Label of the retry button (default localized "Retry") */
  @property({ attribute: "retry-label" })
  retryLabel?: string;

  @state()
  private overflowing = false;

  @query(".wrapper")
  private wrapper?: HTMLElement;

  private readonly aria = new AriaController(this);
  private readonly locale = new LocaleController(this);
  private resize: ResizeObserver | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resize?.disconnect();
    this.resize = null;
  }

  private keyOf(row: T, index: number): TableRowKey {
    const rowKey = this.rowKey;
    if (typeof rowKey === "function") return rowKey(row, index);
    if (typeof rowKey === "string" && rowKey) {
      return (row as Record<string, unknown>)[rowKey] as TableRowKey;
    }
    return index;
  }

  private entries() {
    return (this.rows ?? []).map((row, index) => ({
      row,
      index,
      key: this.keyOf(row, index),
    }));
  }

  private rowDisabled(row: T) {
    return Boolean(this.isRowDisabled?.(row));
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (DEV && (changed.has("rows") || changed.has("rowKey"))) {
      const keys = this.entries().map((e) => e.key);
      if (new Set(keys).size !== keys.length) {
        devWarn(
          MinervaDataTable.tagName,
          "rows have duplicate keys: set row-key to a unique field (or a function).",
        );
      }
    }
  }

  protected override updated(): void {
    this.observeOverflow();
    const pagination =
      this.shadowRoot?.querySelector<MinervaPagination>("minerva-pagination");
    if (pagination && this.pagination) {
      Object.assign(pagination, this.pagination);
    }
  }

  /** Tracks whether the wrapper overflows (it then becomes a region). */
  private observeOverflow() {
    const el = this.wrapper;
    if (!el) {
      this.resize?.disconnect();
      this.resize = null;
      return;
    }
    const update = () => {
      const overflowing =
        el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      if (overflowing !== this.overflowing) this.overflowing = overflowing;
    };
    update();
    if (!this.resize && typeof ResizeObserver !== "undefined") {
      this.resize = new ResizeObserver(update);
      this.resize.observe(el);
      if (el.firstElementChild) this.resize.observe(el.firstElementChild);
    }
  }

  private changeSort(key: string) {
    const next = nextSortState(this.sortState, key);
    if (!this.emit("minerva-sort-change", next, { cancelable: true })) return;
    this.sortState = next;
  }

  private commitSelection(keys: TableRowKey[]) {
    const keySet = new Set(keys);
    const detail: TableSelectionChangeDetail<T> = {
      selectedRowKeys: keys,
      selectedRows: this.entries()
        .filter((e) => keySet.has(e.key))
        .map((e) => e.row),
    };
    if (!this.emit("minerva-selection-change", detail, { cancelable: true })) {
      this.requestUpdate(); // restore the checkboxes (live bindings)
      return;
    }
    this.selectedRowKeys = keys;
  }

  private toggleRow(key: TableRowKey, checked: boolean) {
    const selected = this.selectedRowKeys;
    this.commitSelection(
      checked
        ? [...selected.filter((k) => k !== key), key]
        : selected.filter((k) => k !== key),
    );
  }

  private handlePageChange = (event: Event) => {
    const { page, pageSize } = (
      event as CustomEvent<{
        page: number;
        pageSize: number;
      }>
    ).detail;
    // after the whole dispatch: listeners outside may cancel it
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      this.pagination = { ...this.pagination, current: page, pageSize };
    });
  };

  private renderTable() {
    const columns = this.columns ?? [];
    const t = this.locale.t;
    const layout = computeFixedColumnLayout(columns);
    const hasSelection = this.selectable;
    const selectionFixed = hasSelection && columns[0]?.fixed === "left";
    const leftShift = selectionFixed ? SELECTION_WIDTH : 0;
    const entries = this.entries();
    const sortState = this.sortState;
    const activeOrder = sortState?.order ?? null;
    const sortColumn =
      activeOrder === null
        ? undefined
        : columns.find((col) => col.key === sortState?.key);
    const compare = sortColumn ? compareFor(sortColumn) : null;
    const rows =
      !this.manualSort && compare
        ? [...entries].sort((a, b) =>
            activeOrder === "descend"
              ? compare(b.row, a.row)
              : compare(a.row, b.row),
          )
        : entries;

    const selectedSet = new Set(this.selectedRowKeys);
    const selectable = entries.filter((e) => !this.rowDisabled(e.row));
    const allSelected =
      selectable.length > 0 && selectable.every((e) => selectedSet.has(e.key));
    const someSelected =
      !allSelected && entries.some((e) => selectedSet.has(e.key));
    // Select-all only touches the selectable rows: disabled rows and keys
    // outside `rows` (e.g. other pages) keep their state.
    const toggleAll = () => {
      const selectableKeys = new Set(selectable.map((e) => e.key));
      const current = this.selectedRowKeys;
      this.commitSelection(
        allSelected
          ? current.filter((k) => !selectableKeys.has(k))
          : [
              ...current,
              ...selectable
                .map((e) => e.key)
                .filter((k) => !selectedSet.has(k)),
            ],
      );
    };

    const cellStyle = (col: TableColumn<T>): StyleInfo => {
      const style: StyleInfo = { textAlign: col.align };
      const width = toLength(col.width);
      if (width !== undefined) {
        style.width = width;
        style.minWidth = width;
      }
      if (col.fixed === "left")
        style.left = `${(layout.leftOffsets[col.key] ?? 0) + leftShift}px`;
      else if (col.fixed === "right")
        style.right = `${layout.rightOffsets[col.key] ?? 0}px`;
      return style;
    };
    const edge = (col: TableColumn<T>) =>
      col.fixed === "left" && col.key === layout.lastLeftFixedKey
        ? "left"
        : col.fixed === "right" && col.key === layout.firstRightFixedKey
          ? "right"
          : nothing;
    const selectionStyle = styleMap({
      width: `${SELECTION_WIDTH}px`,
      minWidth: `${SELECTION_WIDTH}px`,
      ...(selectionFixed ? { left: "0px" } : {}),
    });
    const selectionFixedAttr = selectionFixed ? "left" : nothing;
    const columnCount = columns.length + (hasSelection ? 1 : 0);

    const renderHeader = (col: TableColumn<T>) => {
      if (!col.sortable) {
        return html`<th
          scope="col"
          style=${styleMap(cellStyle(col))}
          data-ellipsis=${col.ellipsis ? "true" : nothing}
          data-fixed=${col.fixed ?? nothing}
          data-fixed-edge=${edge(col)}
        >
          ${col.header}
        </th>`;
      }
      const order = sortState?.key === col.key ? sortState.order : null;
      const icon =
        order === "ascend"
          ? IconChevronUp
          : order === "descend"
            ? IconChevronDown
            : IconChevronsUpDown;
      return html`<th
        scope="col"
        aria-sort=${order ? ARIA_SORT[order] : "none"}
        style=${styleMap(cellStyle(col))}
        data-ellipsis=${col.ellipsis ? "true" : nothing}
        data-fixed=${col.fixed ?? nothing}
        data-fixed-edge=${edge(col)}
      >
        <button
          type="button"
          part="sort-button"
          class="sortButton"
          data-sort-order=${order ?? nothing}
          @click=${() => this.changeSort(col.key)}
        >
          <span class="sortLabel">${col.header}</span
          ><span class="sortIcon" aria-hidden="true">${icon}</span>
        </button>
      </th>`;
    };

    let body: unknown;
    if (this.loading) {
      body = Array.from(
        { length: this.loadingRows },
        () =>
          html`<tr aria-hidden="true">
            ${
              hasSelection
                ? html`<td
                    class="selectionCell"
                    style=${selectionStyle}
                    data-fixed=${selectionFixedAttr}
                  ></td>`
                : nothing
            }
            ${columns.map(
              (col) =>
                html`<td
                  style=${styleMap(cellStyle(col))}
                  data-fixed=${col.fixed ?? nothing}
                  data-fixed-edge=${edge(col)}
                >
                  <span class="skeleton"></span>
                </td>`,
            )}
          </tr>`,
      );
    } else if (entries.length === 0) {
      body = html`<tr>
        <td colspan=${columnCount} class="empty">
          <slot name="empty">${this.emptyText ?? t("table.empty")}</slot>
        </td>
      </tr>`;
    } else {
      body = repeat(
        rows,
        (entry) => entry.key,
        ({ row, index, key }, i) => {
          const selected = hasSelection && selectedSet.has(key);
          return html`<tr
            aria-selected=${selected ? "true" : nothing}
            ?data-selected=${selected}
          >
            ${
              hasSelection
                ? html`<td
                    class="selectionCell"
                    style=${selectionStyle}
                    data-fixed=${selectionFixedAttr}
                  >
                    <input
                      type="checkbox"
                      part="checkbox"
                      class="checkbox"
                      .checked=${live(selected)}
                      ?disabled=${this.rowDisabled(row)}
                      aria-label=${t("table.selectRow", {
                        row: this.getRowLabel?.(row, index) ?? String(key),
                      })}
                      @change=${(e: Event) =>
                        this.toggleRow(
                          key,
                          (e.target as HTMLInputElement).checked,
                        )}
                    />
                  </td>`
                : nothing
            }
            ${columns.map(
              (col) =>
                html`<td
                  style=${styleMap(cellStyle(col))}
                  data-ellipsis=${col.ellipsis ? "true" : nothing}
                  data-fixed=${col.fixed ?? nothing}
                  data-fixed-edge=${edge(col)}
                >
                  ${
                    col.render
                      ? col.render(row, i)
                      : ((row as Record<string, unknown>)[
                          col.key
                        ] as TableContent)
                  }
                </td>`,
            )}
          </tr>`;
        },
      );
    }

    const scrollX = toLength(this.scrollX);
    const scrollY = toLength(this.scrollY);
    const scrollable = Boolean(scrollX || scrollY) || this.overflowing;
    const label = this.aria.label;
    return html`<div
      part="wrapper"
      class=${classMap({
        wrapper: true,
        wrapperBordered: this.variant === "bordered",
        wrapperScrollY: !!scrollY,
      })}
      role=${scrollable ? "region" : nothing}
      tabindex=${scrollable ? 0 : nothing}
      aria-label=${scrollable ? (label ?? t("table.scrollRegion")) : nothing}
      style=${styleMap(scrollY ? { maxHeight: scrollY, overflowY: "auto" } : {})}
    >
      <table
        part="table"
        class=${classMap({
          table: true,
          [this.size]: true,
          [this.variant]: true,
          hoverable: this.hoverable,
          scrollX: !!scrollX,
        })}
        style=${styleMap(scrollX ? { minWidth: scrollX } : {})}
        aria-label=${label ?? nothing}
        aria-description=${this.aria.description ?? nothing}
      >
        <thead>
          <tr>
            ${
              hasSelection
                ? html`<th
                    scope="col"
                    class="selectionCell"
                    style=${selectionStyle}
                    data-fixed=${selectionFixedAttr}
                  >
                    <input
                      type="checkbox"
                      part="checkbox"
                      class="checkbox"
                      .checked=${live(allSelected)}
                      .indeterminate=${someSelected}
                      ?disabled=${selectable.length === 0 || this.loading}
                      aria-label=${t("table.selectAll")}
                      @change=${toggleAll}
                    />
                  </th>`
                : nothing
            }
            ${columns.map(renderHeader)}
          </tr>
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
    </div>`;
  }

  protected override render() {
    const showError = Boolean(this.error) && !this.loading;
    return html`<div
      part="base"
      class="dataTable"
      aria-busy=${this.loading ? "true" : nothing}
    >
      ${
        showError
          ? html`<div part="error" class="error" role="alert">
              <div class="errorTitle">
                <slot name="error">${this.error}</slot>
              </div>
              ${
                this.retryable
                  ? html`<button
                      type="button"
                      part="retry-button"
                      class="customButton neutral variant-outline small retry"
                      @click=${() => this.emit("minerva-retry")}
                    >
                      <span class="label"
                        ><span class="retryIcon" aria-hidden="true"
                          >${IconRefreshCw}</span
                        >${this.retryLabel ?? this.locale.t("table.retry")}</span
                      >
                    </button>`
                  : nothing
              }
            </div>`
          : html`${this.renderTable()}
            ${
              this.pagination
                ? html`<minerva-pagination
                    part="pagination"
                    exportparts="base: pagination-base, item: pagination-item"
                    @minerva-page-change=${this.handlePageChange}
                  ></minerva-pagination>`
                : nothing
            }`
      }
    </div>`;
  }
}

/**
 * Bounded, wrapping content inside a table cell (`<TableCellContent>` of
 * lib-core), with an optional muted secondary line.
 *
 * @summary Two-line, bounded table cell content.
 * @tag minerva-table-cell-content
 * @slot - Primary content (alternative to `primary`)
 * @slot secondary - Secondary line (alternative to `secondary`)
 * @csspart base - The wrapper
 */
export class MinervaTableCellContent extends MinervaElement {
  static override tagName = "minerva-table-cell-content";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** Primary line */
  @property()
  primary = "";

  /** Muted secondary line */
  @property()
  secondary?: string;

  /** Renders the primary line as `<code>` in the monospace font */
  @property({ type: Boolean, reflect: true })
  monospace = false;

  /** Maximum width (px number or CSS length) */
  @property({ attribute: "max-width" })
  maxWidth: string | number = 360;

  private hasSecondarySlot() {
    return Array.from(this.children).some(
      (child) => child.getAttribute("slot") === "secondary",
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.observer ??=
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(() => this.requestUpdate());
    this.observer?.observe(this, { childList: true });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  private observer: MutationObserver | null = null;

  protected override render() {
    const hasSecondary =
      (this.secondary !== undefined && this.secondary !== null) ||
      this.hasSecondarySlot();
    const classes = classMap({
      cellPrimary: true,
      cellMono: this.monospace,
      cellStrong: hasSecondary,
    });
    const primary = html`<slot>${this.primary}</slot>`;
    return html`<div
      part="base"
      class="cellContent"
      style=${styleMap({ maxWidth: toLength(this.maxWidth) })}
    >
      ${
        this.monospace
          ? html`<code class=${classes}>${primary}</code>`
          : html`<div class=${classes}>${primary}</div>`
      }
      ${
        hasSecondary
          ? html`<div class="cellSecondary">
              <slot name="secondary">${this.secondary}</slot>
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-data-table": MinervaDataTable;
    "minerva-table-cell-content": MinervaTableCellContent;
  }
}
