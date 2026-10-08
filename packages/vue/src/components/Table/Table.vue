<script setup lang="ts" generic="T">
/**
 * Table: declarative data table (`columns` + `data`) with sortable columns
 * (`v-model:sortState`), row selection (`rowSelection`,
 * `v-model:selectedRowKeys`), sticky fixed columns, ellipsis columns, empty
 * and loading states. Cells render `row[key]`, `column.render` or the
 * `cell-<key>` scoped slot. Attributes fall through to the `<table>`.
 */
import { computed, nextTick, ref, watch, type CSSProperties } from "vue";
import { getColumnCompare, nextSortState } from "@minerva/core";
import styles from "@react-styles/components/Table/table.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import {
  IconChevronDown,
  IconChevronUp,
  IconChevronsUpDown,
} from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import TableRoot from "./TableRoot.vue";
import TableHead from "./TableHead.vue";
import TableBody from "./TableBody.vue";
import TableRow from "./TableRow.vue";
import TableHeader from "./TableHeader.vue";
import TableCell from "./TableCell.vue";
import { computeFixedColumnLayout } from "./fixedColumns";
import { RenderNode, SELECTION_WIDTH, toLength } from "./shared";
import type {
  TableColumn,
  TableProps,
  TableRowKey,
  TableSortState,
} from "./types";

defineOptions({ name: "Table", inheritAttrs: false });

const props = withDefaults(defineProps<TableProps<T>>(), {
  size: "medium",
  variant: "simple",
  hoverable: false,
  scroll: undefined,
  rowKey: undefined,
  emptyText: undefined,
  loading: false,
  loadingRows: 5,
  sortState: undefined,
  defaultSortState: null,
  manualSort: false,
  rowSelection: undefined,
  selectedRowKeys: undefined,
  defaultSelectedRowKeys: undefined,
});

const emit = defineEmits<{
  "update:sortState": [sortState: TableSortState | null];
  /** A sortable header was activated: the next sort state */
  sortChange: [sortState: TableSortState];
  "update:selectedRowKeys": [selectedRowKeys: TableRowKey[]];
  /** The selection changed: the selected keys and their rows of `data` */
  selectionChange: [selectedRowKeys: TableRowKey[], selectedRows: T[]];
}>();

defineSlots<
  {
    /** Content of the empty row (the `emptyText` prop) */
    empty?: () => unknown;
  } & {
    /** Content of the cells of the column `<key>` */
    [name: `cell-${string}`]:
      | ((scope: { row: T; index: number; value: unknown }) => unknown)
      | undefined;
  } & {
    /** Content of the header of the column `<key>` */
    [name: `header-${string}`]:
      ((scope: { column: TableColumn<T> }) => unknown) | undefined;
  }
>();

const { t } = useI18n();

const ARIA_SORT = { ascend: "ascending", descend: "descending" } as const;

const sortState = useControllable<TableSortState | null>(props, "sortState", {
  fallback: null,
  name: "Table",
  onChange: (next) => {
    if (next) emit("sortChange", next);
  },
});

// `v-model:selectedRowKeys` wins over the keys of `rowSelection`.
const selectionProps = {
  get selectedRowKeys() {
    return props.selectedRowKeys ?? props.rowSelection?.selectedRowKeys;
  },
  get defaultSelectedRowKeys() {
    return (
      props.defaultSelectedRowKeys ?? props.rowSelection?.defaultSelectedRowKeys
    );
  },
};
const selectedKeys = useControllable<TableRowKey[]>(
  selectionProps,
  "selectedRowKeys",
  { fallback: [], name: "Table" },
);

const hasSelection = computed(
  () =>
    props.rowSelection !== undefined ||
    props.selectedRowKeys !== undefined ||
    props.defaultSelectedRowKeys !== undefined,
);
const layout = computed(() => computeFixedColumnLayout(props.columns));
// The selection column sticks with a leading left-fixed block and shifts it.
const selectionFixed = computed(
  () => hasSelection.value && props.columns[0]?.fixed === "left",
);

// Row keys come from the position in `data`, so they survive sorting.
const entries = computed(() =>
  props.data.map((row, index) => ({
    row,
    index,
    key: props.rowKey ? props.rowKey(row, index) : index,
  })),
);

const rows = computed(() => {
  const state = sortState.value;
  const order = state?.order ?? null;
  const column =
    order === null
      ? undefined
      : props.columns.find((col) => col.key === state?.key);
  const compare = column ? getColumnCompare(column) : null;
  if (props.manualSort || !compare) return entries.value;
  return [...entries.value].sort((a, b) =>
    order === "descend" ? compare(b.row, a.row) : compare(a.row, b.row),
  );
});

// Selection
const selectedSet = computed(() => new Set(selectedKeys.value));
const isRowDisabled = (row: T) =>
  Boolean(props.rowSelection?.getCheckboxProps?.(row).disabled);
const selectable = computed(() =>
  entries.value.filter((e) => !isRowDisabled(e.row)),
);
const allSelected = computed(
  () =>
    selectable.value.length > 0 &&
    selectable.value.every((e) => selectedSet.value.has(e.key)),
);
const someSelected = computed(
  () =>
    !allSelected.value &&
    entries.value.some((e) => selectedSet.value.has(e.key)),
);
const isSelected = (key: TableRowKey) =>
  hasSelection.value && selectedSet.value.has(key);

function commitSelection(keys: TableRowKey[]) {
  selectedKeys.value = keys;
  const keySet = new Set(keys);
  const selectedRows = entries.value
    .filter((e) => keySet.has(e.key))
    .map((e) => e.row);
  emit("selectionChange", keys, selectedRows);
  props.rowSelection?.onChange?.(keys, selectedRows);
}

// A controlled selection that is not updated keeps the checkbox in sync.
const syncChecked = (input: HTMLInputElement, checked: () => boolean) =>
  nextTick(() => {
    input.checked = checked();
  });

function toggleRow(key: TableRowKey, event: Event) {
  const input = event.target as HTMLInputElement;
  const current = selectedKeys.value;
  commitSelection(
    input.checked
      ? [...current.filter((k) => k !== key), key]
      : current.filter((k) => k !== key),
  );
  syncChecked(input, () => isSelected(key));
}

// Select-all only touches the selectable rows: disabled rows keep their
// state, keys outside `data` (e.g. other pages) are preserved.
function toggleAll(event: Event) {
  const current = selectedKeys.value;
  const selectableKeys = new Set(selectable.value.map((e) => e.key));
  commitSelection(
    allSelected.value
      ? current.filter((k) => !selectableKeys.has(k))
      : [
          ...current,
          ...selectable.value
            .map((e) => e.key)
            .filter((k) => !selectedSet.value.has(k)),
        ],
  );
  syncChecked(event.target as HTMLInputElement, () => allSelected.value);
}

// `indeterminate` is a DOM property only (not rendered on the server).
const selectAll = ref<HTMLInputElement | null>(null);
const setSelectAll = (el: unknown) => {
  selectAll.value = el as HTMLInputElement | null;
  if (selectAll.value) selectAll.value.indeterminate = someSelected.value;
};
watch(
  someSelected,
  (some) => {
    if (selectAll.value) selectAll.value.indeterminate = some;
  },
  { flush: "post" },
);

// Column width goes to both width and min-width: with table-layout: auto the
// min-width is a hard floor, so narrow containers scroll instead of squeezing.
const cellStyleFor = (col: TableColumn<T>): CSSProperties => {
  const style: CSSProperties = { textAlign: col.align };
  const width = toLength(col.width);
  if (width !== undefined) {
    style.width = width;
    style.minWidth = width;
  }
  const { leftOffsets, rightOffsets } = layout.value;
  const leftShift = selectionFixed.value ? SELECTION_WIDTH : 0;
  if (col.fixed === "left")
    style.left = `${(leftOffsets[col.key] ?? 0) + leftShift}px`;
  else if (col.fixed === "right")
    style.right = `${rightOffsets[col.key] ?? 0}px`;
  return style;
};

const cellPropsFor = (col: TableColumn<T>) => {
  const { lastLeftFixedKey, firstRightFixedKey } = layout.value;
  return {
    style: cellStyleFor(col),
    "data-ellipsis": col.ellipsis ? "true" : undefined,
    "data-fixed": col.fixed,
    "data-fixed-edge":
      col.fixed === "left" && col.key === lastLeftFixedKey
        ? "left"
        : col.fixed === "right" && col.key === firstRightFixedKey
          ? "right"
          : undefined,
  };
};

const selectionCellProps = computed(() => ({
  class: styles.selectionCell,
  style: {
    width: `${SELECTION_WIDTH}px`,
    minWidth: `${SELECTION_WIDTH}px`,
    ...(selectionFixed.value ? { left: "0px" } : {}),
  },
  "data-fixed": selectionFixed.value ? "left" : undefined,
}));

const columnCount = computed(
  () => props.columns.length + (hasSelection.value ? 1 : 0),
);

const orderOf = (col: TableColumn<T>) =>
  sortState.value?.key === col.key ? sortState.value.order : null;
const ariaSortOf = (col: TableColumn<T>) => {
  const order = orderOf(col);
  return order ? ARIA_SORT[order] : "none";
};
const sortIconOf = (col: TableColumn<T>) => {
  const order = orderOf(col);
  return order === "ascend"
    ? IconChevronUp
    : order === "descend"
      ? IconChevronDown
      : IconChevronsUpDown;
};
const sortBy = (key: string) => {
  sortState.value = nextSortState(sortState.value, key);
};

const rowLabel = (row: T, index: number, key: TableRowKey) =>
  t("table.selectRow", {
    row: props.rowSelection?.getRowLabel?.(row, index) ?? String(key),
  });
const valueOf = (row: T, key: string) => (row as Record<string, unknown>)[key];
</script>

<template>
  <TableRoot
    v-bind="$attrs"
    :size="size"
    :variant="variant"
    :hoverable="hoverable"
    :scroll="scroll"
  >
    <TableHead>
      <TableRow>
        <TableHeader
          v-if="hasSelection"
          scope="col"
          v-bind="selectionCellProps"
        >
          <input
            :ref="setSelectAll"
            type="checkbox"
            :class="styles.checkbox"
            v-bind="hooks('data-table', 'checkbox')"
            :checked="allSelected"
            :disabled="selectable.length === 0 || loading"
            :aria-label="t('table.selectAll')"
            @change="toggleAll"
          />
        </TableHeader>
        <template v-for="col in columns" :key="col.key">
          <TableHeader
            v-if="col.sortable"
            scope="col"
            :aria-sort="ariaSortOf(col)"
            v-bind="cellPropsFor(col)"
          >
            <button
              type="button"
              :class="styles.sortButton"
              v-bind="hooks('data-table', 'sort-button')"
              @click="sortBy(col.key)"
            >
              <span :class="styles.sortLabel">
                <slot :name="`header-${col.key}`" :column="col">
                  <RenderNode :content="col.header" />
                </slot>
              </span>
              <component
                :is="sortIconOf(col)"
                aria-hidden="true"
                :class="styles.sortIcon"
              />
            </button>
          </TableHeader>
          <TableHeader v-else scope="col" v-bind="cellPropsFor(col)">
            <slot :name="`header-${col.key}`" :column="col">
              <RenderNode :content="col.header" />
            </slot>
          </TableHeader>
        </template>
      </TableRow>
    </TableHead>
    <TableBody>
      <template v-if="loading">
        <TableRow
          v-for="i in loadingRows"
          :key="`skeleton-${i}`"
          aria-hidden="true"
        >
          <TableCell v-if="hasSelection" v-bind="selectionCellProps" />
          <TableCell
            v-for="col in columns"
            :key="col.key"
            v-bind="{ ...cellPropsFor(col), 'data-ellipsis': undefined }"
          >
            <span
              :class="styles.skeleton"
              v-bind="hooks('data-table', 'skeleton')"
            />
          </TableCell>
        </TableRow>
      </template>
      <TableRow v-else-if="data.length === 0">
        <td
          :colspan="columnCount"
          :class="styles.empty"
          v-bind="hooks('data-table', 'empty')"
        >
          <slot name="empty">{{ emptyText ?? t("table.empty") }}</slot>
        </td>
      </TableRow>
      <template v-else>
        <TableRow
          v-for="(entry, i) in rows"
          :key="entry.key"
          :aria-selected="isSelected(entry.key) || undefined"
        >
          <TableCell v-if="hasSelection" v-bind="selectionCellProps">
            <input
              type="checkbox"
              :class="styles.checkbox"
              v-bind="hooks('data-table', 'checkbox')"
              :checked="isSelected(entry.key)"
              :disabled="isRowDisabled(entry.row)"
              :aria-label="rowLabel(entry.row, entry.index, entry.key)"
              @change="toggleRow(entry.key, $event)"
            />
          </TableCell>
          <TableCell
            v-for="col in columns"
            :key="col.key"
            v-bind="cellPropsFor(col)"
          >
            <slot
              :name="`cell-${col.key}`"
              :row="entry.row"
              :index="i"
              :value="valueOf(entry.row, col.key)"
            >
              <RenderNode
                :content="
                  col.render
                    ? col.render(entry.row, i)
                    : (valueOf(entry.row, col.key) as any)
                "
              />
            </slot>
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </TableRoot>
</template>
