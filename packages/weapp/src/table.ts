import {
  computeFixedColumnLayout,
  compareTableValues,
  nextSortState,
  getPaginationItems,
  getTotalPages,
  getPaginationVisibleRange,
  type TableSortState,
} from "@minerva/core";
type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent"
>;
type Event = WechatMiniprogram.CustomEvent<{ value: string }>;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
type Row = Record<string, unknown>;
type Key = string | number;
interface Column {
  key: string;
  header?: string;
  width?: number | string;
  align?: string;
  ellipsis?: boolean;
  fixed?: "left" | "right";
  sortable?: boolean;
  filters?: { value: string; text: string }[];
}
export interface NativeTableCell {
  primary?: string;
  secondary?: string;
  monospace?: boolean;
  image?: string;
  icon?: string;
  action?: string;
  disabled?: boolean;
  richText?: WechatMiniprogram.IAnyObject[] | string;
}
export interface NativeTableConfig {
  rowKey?: (row: Row, index: number) => Key;
  comparators?: Record<string, (a: Row, b: Row) => number>;
  cellRender?: (
    row: Row,
    column: Column,
    index: number,
  ) => NativeTableCell | string;
  getCheckboxProps?: (row: Row) => { disabled?: boolean };
  getRowLabel?: (row: Row, index: number) => string;
  filter?: (row: Row, filters: Record<string, string[]>) => boolean;
}
const configured = new WeakMap<object, NativeTableConfig>();
const optional = (value: unknown = null) => ({ type: null, value });
const string = (value = "") => ({ type: String, value });
const flag = (value = false) => ({ type: Boolean, value });
const length = (value: unknown) =>
  typeof value === "number" ? `${value}px` : String(value || "");
const blocked = (self: Instance) => self.data.disabled || self.data.readOnly;
function selected(self: Instance): Key[] {
  return (
    self.data.rowSelection?.selectedRowKeys ??
    self.data.selectedRowKeys ??
    self.data.localSelected ??
    []
  );
}
function keyOf(self: Instance, row: Row, index: number): Key {
  return (
    configured.get(self)?.rowKey?.(row, index) ??
    (row[self.data.rowKey] as Key) ??
    index
  );
}
function sortOf(self: Instance): TableSortState | null {
  return self.data.sortState !== "" ? self.data.sortState : self.data.localSort;
}
function sync(self: Instance) {
  const d = self.data,
    config = configured.get(self);
  if (!d.initialized)
    self.setData({
      initialized: true,
      localSelected:
        d.rowSelection?.defaultSelectedRowKeys ?? d.defaultSelectedRowKeys,
      localSort: d.defaultSortState,
      localPage: d.defaultCurrent,
    });
  const columns: Column[] = d.columns;
  const fixed = computeFixedColumnLayout(columns);
  const selectable = !!d.rowSelection || d.selectable;
  const selection = selected(self);
  const viewColumns = columns.map((c) => {
    const offset =
      c.fixed === "left"
        ? fixed.leftOffsets[c.key] + (selectable ? 48 : 0)
        : fixed.rightOffsets[c.key];
    const width = length(c.width || 120);
    return {
      ...c,
      style: `width:${width};min-width:${width};text-align:${c.align || "left"};${c.fixed ? `position:sticky;${c.fixed}:${offset}px;z-index:2;` : ""}`,
      edge:
        c.key === fixed.lastLeftFixedKey || c.key === fixed.firstRightFixedKey,
    };
  });
  const filters = d.filters ?? d.localFilters ?? {};
  let rows = (d.data as Row[])
    .map((row, index) => ({
      row,
      index,
      key: keyOf(self, row, index),
      disabled:
        !!row.disabled ||
        (d.disabledRowKeys || []).includes(keyOf(self, row, index)) ||
        !!config?.getCheckboxProps?.(row).disabled,
    }))
    .filter(
      (e) =>
        d.manualFilter ||
        (config?.filter
          ? config.filter(e.row, filters)
          : Object.entries(filters).every(
              ([key, values]) =>
                !(values as string[]).length ||
                (values as string[]).includes(String(e.row[key])),
            )),
    );
  const sort = sortOf(self);
  if (sort?.order && !d.manualSort) {
    const compare = config?.comparators?.[sort.key];
    rows.sort(
      (a, b) =>
        (compare
          ? compare(a.row, b.row)
          : compareTableValues(a.row[sort.key], b.row[sort.key])) *
        (sort.order === "ascend" ? 1 : -1),
    );
  }
  const p = d.pagination ?? {};
  const pageSize = p.pageSize ?? d.localPageSize ?? d.pageSize;
  const total = p.total ?? (d.serverPagination ? d.total : rows.length);
  const pageCount = pageSize > 0 ? getTotalPages(total, pageSize) : 1;
  const activePage = Math.min(
    pageCount,
    Math.max(1, p.current ?? d.current ?? d.localPage ?? 1),
  );
  if (pageSize > 0 && !d.serverPagination)
    rows = rows.slice((activePage - 1) * pageSize, activePage * pageSize);
  const enabled = rows.filter((r) => !r.disabled);
  const labels = p.labels ?? {};
  self.setData({
    viewColumns,
    selectableView: selectable,
    tableStyle: d.scroll?.x ? `min-width:${length(d.scroll.x)}` : "",
    scrollStyle: d.scroll?.y ? `max-height:${length(d.scroll.y)}` : "",
    verticalScroll: !!d.scroll?.y,
    pageCount,
    activePage,
    effectivePageSize: pageSize,
    pageTotal: total,
    range: getPaginationVisibleRange(activePage, Math.max(1, pageSize), total),
    pageOptions: p,
    showPagination:
      d.pagination !== false &&
      pageSize > 0 &&
      (!!d.pagination || !d.serverPagination || total > 0),
    pageItems: getPaginationItems({
      page: activePage,
      totalPages: pageCount,
      siblingCount: p.siblingCount,
      boundaryCount: p.boundaryCount,
      hideEdges: p.hideEdges,
    })
      .filter(
        (x) =>
          (!p.hideNumbers && !p.simple) ||
          x.kind === "prev" ||
          x.kind === "next",
      )
      .map((x) => ({
        ...x,
        label:
          x.kind === "prev"
            ? (labels.prev ?? d.localeLabels?.paginationPrev ?? "Previous")
            : x.kind === "next"
              ? (labels.next ?? d.localeLabels?.paginationNext ?? "Next")
              : x.kind === "page"
                ? String(x.page)
                : "…",
        disabled: x.kind === "ellipsis" || x.page < 1 || x.page > pageCount,
      })),
    sizeChoices: p.pageSizeOptions ?? [10, 20, 50, 100],
    skeletonRows: Array.from(
      { length: Math.max(0, Math.floor(d.loadingRows)) },
      (_, i) => i,
    ),
    allChecked:
      enabled.length > 0 && enabled.every((e) => selection.includes(e.key)),
    someChecked: enabled.some((e) => selection.includes(e.key)),
    rows: rows.map((e) => ({
      ...e,
      selected: selection.includes(e.key),
      label: config?.getRowLabel?.(e.row, e.index) ?? String(e.key),
      cells: viewColumns.map((c) => {
        const custom = config?.cellRender?.(e.row, c, e.index);
        const content =
          typeof custom === "string"
            ? { primary: custom }
            : (custom ?? { primary: String(e.row[c.key] ?? "") });
        return {
          key: c.key,
          column: c,
          raw: e.row[c.key] ?? null,
          value: String(e.row[c.key] ?? ""),
          ...content,
          align: c.align || "left",
          width: length(c.width || 120),
          style: c.style,
          ellipsis: c.ellipsis,
          fixed: c.fixed,
          edge: c.edge,
        };
      }),
    })),
  });
}
function selectionRequest(self: Instance, keys: Key[]) {
  if (
    self.data.rowSelection?.selectedRowKeys === undefined &&
    self.data.selectedRowKeys === null
  )
    self.setData({ localSelected: keys });
  sync(self);
  self.triggerEvent("selectionchange", {
    selectedRowKeys: keys,
    selectedRows: (self.data.data as Row[]).filter((row, i) =>
      keys.includes(keyOf(self, row, i)),
    ),
  });
}
function pageRequest(
  self: Instance,
  current: number,
  pageSize = self.data.effectivePageSize,
) {
  if (
    blocked(self) ||
    self.data.pageOptions.disabled ||
    !Number.isFinite(current) ||
    !Number.isFinite(pageSize) ||
    pageSize <= 0
  )
    return;
  current = Math.min(
    getTotalPages(self.data.pageTotal, pageSize),
    Math.max(1, Math.floor(current)),
  );
  if (self.data.current === null && self.data.pagination?.current === undefined)
    self.setData({ localPage: current });
  if (!self.data.pagination || self.data.pagination.pageSize === undefined)
    self.setData({ localPageSize: pageSize });
  sync(self);
  self.triggerEvent("pagechange", { current, pageSize });
}
const template = `<view class="mn-table-region"><scroll-view scroll-x scroll-y="{{verticalScroll}}" class="mn-table-scroll" style="{{scrollStyle}}" aria-label="{{ariaLabel}}"><view class="mn-table mn-size-{{size}} mn-variant-{{variant}} {{hoverable?'mn-table-hoverable':''}}" role="table" style="{{tableStyle}}"><view class="mn-table-row mn-table-head" role="row"><button wx:if="{{selectableView}}" class="mn-table-cell mn-select-all" role="checkbox" aria-checked="{{allChecked}}" disabled="{{disabled || readOnly}}" bindtap="onSelectAll">{{allChecked?'☑':someChecked?'⊟':'☐'}}</button><view wx:for="{{viewColumns}}" wx:key="key" class="mn-table-cell mn-table-header {{item.fixed?'mn-table-fixed':''}} {{item.edge?'mn-table-fixed-edge':''}}" role="columnheader" style="{{item.style}}"><button class="mn-table-sort" data-index="{{index}}" disabled="{{disabled || readOnly || !item.sortable}}" bindtap="onSort">{{item.header}}</button><button wx:for="{{item.filters}}" wx:for-item="filter" wx:key="value" class="mn-tag mn-filter-option" disabled="{{disabled || readOnly}}" data-key="{{item.key}}" data-value="{{filter.value}}" bindtap="onFilter">{{filter.text}}</button></view></view><block wx:if="{{loading}}"><view wx:for="{{skeletonRows}}" wx:key="*this" class="mn-table-row mn-table-skeleton-row"><view wx:for="{{viewColumns}}" wx:key="key" class="mn-table-cell" style="{{item.style}}"><view class="mn-skeleton" style="height:16px;width:80%"/></view></view></block><view wx:elif="{{!rows.length}}" class="mn-empty"><slot name="empty"/>{{emptyText || localeLabels.tableEmpty}}</view><block wx:else><view wx:for="{{rows}}" wx:key="key" class="mn-table-row {{item.selected?'mn-active':''}}" role="row" data-index="{{index}}" bindtap="onRow"><button wx:if="{{selectableView}}" class="mn-table-cell mn-select-row" role="checkbox" aria-checked="{{item.selected}}" aria-label="{{item.label}}" data-index="{{index}}" disabled="{{disabled || readOnly || item.disabled}}" catchtap="onSelect">{{item.selected?'☑':'☐'}}</button><view wx:for="{{item.cells}}" wx:for-item="cell" wx:for-index="cellIndex" wx:key="key" class="mn-table-cell {{cell.fixed?'mn-table-fixed':''}} {{cell.edge?'mn-table-fixed-edge':''}} {{cell.ellipsis?'mn-table-ellipsis':''}}" role="cell" style="{{cell.style}}"><cell-renderer class="mn-custom-cell" wx:if="{{customCellRenderer}}" row="{{item.row}}" row-key="{{item.key}}" column="{{cell.column}}" value="{{cell.raw}}" row-index="{{item.index}}" data-row="{{index}}" data-column="{{cell.key}}" bindaction="onCellAction"/><block wx:else><image wx:if="{{cell.image}}" class="mn-table-cell-image" src="{{cell.image}}" mode="aspectFit"/><text wx:if="{{cell.icon}}">{{cell.icon}}</text><rich-text wx:if="{{cell.richText}}" nodes="{{cell.richText}}"/><text wx:else class="{{cell.monospace?'mn-code':''}}">{{cell.primary}}</text><text wx:if="{{cell.secondary}}" class="mn-muted mn-cell-secondary">{{cell.secondary}}</text><button wx:if="{{cell.action}}" class="mn-button mn-table-cell-action" disabled="{{disabled || cell.disabled}}" data-row="{{index}}" data-column="{{cell.key}}" catchtap="onCellAction">{{cell.action}}</button></block></view></view></block></view></scroll-view><view wx:if="{{showPagination}}" class="mn-pagination mn-pagination-{{pageOptions.size || 'medium'}} mn-pagination-{{pageOptions.shape || 'rounded'}} mn-pagination-{{pageOptions.variant || 'solid'}}"><text wx:if="{{pageOptions.showTotal}}">{{pageTotal}} ({{range[0]}}–{{range[1]}})</text><button wx:for="{{pageItems}}" wx:key="key" class="mn-button mn-page-item {{item.kind==='prev'?'mn-previous-page':item.kind==='next'?'mn-next-page':''}} {{item.kind==='page' && item.page===activePage?'mn-active':''}}" data-page="{{item.page}}" disabled="{{disabled || readOnly || pageOptions.disabled || item.disabled}}" bindtap="onPage">{{item.label}}</button><text wx:if="{{pageOptions.hideNumbers || pageOptions.simple}}">{{activePage}} / {{pageCount}}</text><input wx:if="{{pageOptions.showQuickJumper || pageOptions.simple}}" class="mn-input mn-table-quick-jump" type="number" disabled="{{disabled || pageOptions.disabled}}" bindconfirm="onJump"/><picker wx:if="{{pageOptions.showSizeChanger}}" class="mn-table-page-size" range="{{sizeChoices}}" disabled="{{disabled || pageOptions.disabled}}" bindchange="onSize"><text>{{effectivePageSize}} / page</text></picker><slot name="pagination"/></view><slot name="footer"/></view>`;
export function enhanceTable(controls: { table: Control; dataTable: Control }) {
  for (const [name, c] of Object.entries(controls)) {
    Object.assign(c, {
      componentGenerics: {
        "cell-renderer": { default: "../table-cell-content/index" },
      },
    });
    c.template =
      name === "dataTable"
        ? `<view class="mn-data-table"><view wx:if="{{error}}" class="mn-alert mn-status-error"><text>{{error}}</text><button wx:if="{{retryable}}" class="mn-button mn-table-retry" bindtap="onRetry">{{retryLabel || localeLabels.tableRetry}}</button><slot name="error"/></view><block wx:else>${template}</block></view>`
        : template;
    Object.assign(c.definition.properties, {
      selectedRowKeys: optional(),
      defaultSelectedRowKeys: optional([]),
      rowSelection: optional(),
      sortState: optional(""),
      defaultSortState: optional(),
      defaultCurrent: { type: Number, value: 1 },
      current: optional(),
      scroll: optional({}),
      pagination: optional(),
      hoverable: flag(),
      ariaLabel: string("Scrollable table"),
      loadingRows: { type: Number, value: 5 },
      customCellRenderer: flag(),
      retryable: flag(true),
      retryLabel: string(),
      emptyText: string(),
    });
    Object.assign(c.definition, {
      data: {
        rows: [],
        viewColumns: [],
        skeletonRows: [],
        localSort: null,
        localSelected: [],
        localPage: 1,
        localPageSize: null,
        initialized: false,
      },
      observers: {
        "columns,data,rowKey,rowSelection,selectedRowKeys,sortState,manualSort,filters,manualFilter,disabledRowKeys,pageSize,current,pagination,total,scroll,loadingRows,localeLanguage":
          function (this: Instance) {
            sync(this);
          },
      },
      lifetimes: {
        attached(this: Instance) {
          sync(this);
        },
        detached(this: Instance) {
          configured.delete(this);
        },
      },
    });
    Object.assign(c.definition.methods, {
      configure(this: Instance, config: NativeTableConfig) {
        configured.set(this, config);
        sync(this);
      },
      onSort(this: Instance, e: Event) {
        const column = this.data.columns[Number(e.currentTarget.dataset.index)];
        if (blocked(this) || !column?.sortable) return;
        const sort = nextSortState(sortOf(this), column.key);
        if (this.data.sortState === "") this.setData({ localSort: sort });
        sync(this);
        this.triggerEvent("sortchange", { sortState: sort });
      },
      onSelect(this: Instance, e: Event) {
        const entry = this.data.rows[Number(e.currentTarget.dataset.index)];
        if (blocked(this) || !entry || entry.disabled) return;
        const old = selected(this);
        selectionRequest(
          this,
          old.includes(entry.key)
            ? old.filter((k) => k !== entry.key)
            : [...old, entry.key],
        );
      },
      onSelectAll(this: Instance) {
        if (blocked(this)) return;
        const keys = this.data.rows
          .filter((r: { disabled: boolean }) => !r.disabled)
          .map((r: { key: Key }) => r.key);
        const old = selected(this);
        selectionRequest(
          this,
          this.data.allChecked
            ? old.filter((k) => !keys.includes(k))
            : [...new Set([...old, ...keys])],
        );
      },
      onFilter(this: Instance, e: Event) {
        if (blocked(this)) return;
        const key = String(e.currentTarget.dataset.key),
          value = String(e.currentTarget.dataset.value);
        const old = this.data.filters ?? this.data.localFilters ?? {};
        const values = old[key] ?? [];
        const filters = {
          ...old,
          [key]: values.includes(value)
            ? values.filter((v: string) => v !== value)
            : [...values, value],
        };
        if (this.data.filters === null) this.setData({ localFilters: filters });
        if (this.data.current === null) this.setData({ localPage: 1 });
        sync(this);
        this.triggerEvent("filterchange", { filters });
        this.triggerEvent("pagechange", {
          current: 1,
          pageSize: this.data.effectivePageSize,
        });
      },
      onPage(this: Instance, e: Event) {
        pageRequest(
          this,
          Number(
            e.currentTarget.dataset.page ??
              this.data.activePage + Number(e.currentTarget.dataset.delta),
          ),
        );
      },
      onJump(this: Instance, e: Event) {
        pageRequest(this, Number(e.detail.value));
      },
      onSize(this: Instance, e: Event) {
        pageRequest(this, 1, this.data.sizeChoices[Number(e.detail.value)]);
      },
      onRow(this: Instance, e: Event) {
        const entry = this.data.rows[Number(e.currentTarget.dataset.index)];
        if (entry && !this.data.disabled)
          this.triggerEvent("rowclick", {
            row: entry.row,
            key: entry.key,
            index: entry.index,
          });
      },
      onCellAction(this: Instance, e: Event) {
        const entry = this.data.rows[Number(e.currentTarget.dataset.row)],
          columnKey = String(e.currentTarget.dataset.column);
        const cell = entry?.cells.find(
          (c: { key: string }) => c.key === columnKey,
        );
        if (!entry || this.data.disabled || cell?.disabled) return;
        this.triggerEvent("cellaction", {
          row: entry.row,
          key: entry.key,
          index: entry.index,
          columnKey,
          detail: e.detail,
        });
      },
    });
  }
}
