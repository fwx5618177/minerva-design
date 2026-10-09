<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { computed, ref } from "vue";
import type { Key, Row, Column, TableProps } from "./table-types";
const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  data: () => [],
  rowKey: "id",
  size: "medium",
  variant: "simple",
  defaultCurrent: 1,
});
const emit = defineEmits([
  "sortChange",
  "selectionChange",
  "rowClick",
  "filterChange",
  "pageChange",
]);
const sort = ref<{ key: string; order: string | null } | null>(
  props.defaultSortState ?? null,
);
const selection = ref<Key[]>(props.rowSelection?.defaultSelectedRowKeys ?? []);
const localFilters = ref<Record<string, string[]>>({});
const localPage = ref(props.defaultCurrent);
const selected = computed(
  () =>
    props.rowSelection?.selectedRowKeys ??
    props.selectedRowKeys ??
    selection.value,
);
const active = computed(() =>
  props.sortState === undefined ? sort.value : props.sortState,
);
const filtering = computed(() => props.filters ?? localFilters.value);
const selectionEnabled = computed(
  () => props.selectable || !!props.rowSelection,
);
const allRows = computed(() =>
  props.data.map((row, i) => ({
    row,
    key:
      typeof props.rowKey === "function"
        ? props.rowKey(row, i)
        : typeof row[props.rowKey] === "string" ||
            typeof row[props.rowKey] === "number"
          ? (row[props.rowKey] as Key)
          : i,
    disabled: !!(
      props.rowSelection?.getCheckboxProps?.(row).disabled ?? row.disabled
    ),
  })),
);
const ordered = computed(() => {
  let r = allRows.value.filter(
    (e) =>
      props.manualFilter ||
      Object.entries(filtering.value).every(
        ([key, values]) =>
          !values.length || values.includes(String(e.row[key])),
      ),
  );
  if (props.manualSort || !active.value?.order) return r;
  const { key, order } = active.value;
  const compare = props.columns.find((c) => c.key === key)?.sortable;
  return [...r].sort((a, b) => {
    if (typeof compare === "function")
      return compare(a.row, b.row) * (order === "ascend" ? 1 : -1);
    const av = a.row[key],
      bv = b.row[key];
    if (av == null) return bv == null ? 0 : 1;
    if (bv == null) return -1;
    return (
      (typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av).localeCompare(String(bv), undefined, { numeric: true })) *
      (order === "ascend" ? 1 : -1)
    );
  });
});
const pages = computed(() =>
  props.pageSize
    ? Math.max(1, Math.ceil(ordered.value.length / props.pageSize))
    : 1,
);
const page = computed(() =>
  Math.max(1, Math.min(pages.value, props.current ?? localPage.value)),
);
const rows = computed(() =>
  props.pageSize
    ? ordered.value.slice(
        (page.value - 1) * props.pageSize,
        page.value * props.pageSize,
      )
    : ordered.value,
);
const enabled = computed(() => rows.value.filter((r) => !r.disabled));
const allChecked = computed(
  () =>
    enabled.value.length > 0 &&
    enabled.value.every((r) => selected.value.includes(r.key)),
);
const someChecked = computed(() =>
  enabled.value.some((r) => selected.value.includes(r.key)),
);
function order(c: Column) {
  if (!c.sortable || props.disabled || props.readOnly) return;
  sort.value = {
    key: c.key,
    order:
      active.value?.key !== c.key || active.value.order === null
        ? "ascend"
        : active.value.order === "ascend"
          ? "descend"
          : null,
  };
  emit("sortChange", sort.value);
}
function changeSelection(keys: Key[]) {
  selection.value = keys;
  const records = allRows.value
    .filter((r) => keys.includes(r.key))
    .map((r) => r.row);
  emit("selectionChange", keys, records);
  props.rowSelection?.onChange?.(keys, records);
}
function select(key: Key) {
  if (
    props.disabled ||
    props.readOnly ||
    allRows.value.find((r) => r.key === key)?.disabled
  )
    return;
  changeSelection(
    selected.value.includes(key)
      ? selected.value.filter((k) => k !== key)
      : [...selected.value, key],
  );
}
function selectAll() {
  if (props.disabled || props.readOnly) return;
  const keys = enabled.value.map((r) => r.key);
  changeSelection(
    allChecked.value
      ? selected.value.filter((k) => !keys.includes(k))
      : [...new Set([...selected.value, ...keys])],
  );
}
function filter(key: string, value: string) {
  if (props.disabled || props.readOnly) return;
  const old = filtering.value[key] ?? [];
  localFilters.value = {
    ...filtering.value,
    [key]: old.includes(value)
      ? old.filter((v) => v !== value)
      : [...old, value],
  };
  localPage.value = 1;
  emit("filterChange", localFilters.value);
  emit("pageChange", 1, props.pageSize);
}
function turn(n: number) {
  if (props.disabled || n < 1 || n > pages.value) return;
  localPage.value = n;
  emit("pageChange", n, props.pageSize);
}
function length(v?: number | string) {
  return typeof v === "number" ? `${v}px` : v;
}
function cellStyle(c: Column) {
  let offset = 0;
  if (c.fixed) {
    const list =
      c.fixed === "left" ? props.columns : [...props.columns].reverse();
    for (const col of list) {
      if (col.key === c.key) break;
      if (col.fixed === c.fixed)
        offset += typeof col.width === "number" ? col.width : 120;
    }
  }
  return {
    textAlign: (c.align ?? "left") as any,
    minWidth: length(c.width),
    width: length(c.width),
    position: c.fixed ? ("sticky" as const) : undefined,
    left: c.fixed === "left" ? `${offset}px` : undefined,
    right: c.fixed === "right" ? `${offset}px` : undefined,
    zIndex: c.fixed ? 2 : undefined,
  };
}
</script>
<template>
  <view class="mn-table-container"
    ><scroll-view
      scroll-x
      :scroll-y="!!scroll?.y"
      class="mn-table-scroll"
      :style="{ maxHeight: length(scroll?.y) }"
      ><view
        class="mn-table"
        :class="[
          `mn-table-${variant}`,
          `mn-table-${size}`,
          { 'mn-table-hoverable': hoverable },
        ]"
        :style="{ minWidth: length(scroll?.x) }"
        ><view class="mn-table-row mn-table-head"
          ><button
            v-if="selectionEnabled"
            class="mn-table-cell"
            data-action="select-all"
            :class="{ 'mn-disabled': disabled || readOnly || !enabled.length }"
            :disabled="disabled || readOnly || !enabled.length"
            @tap="selectAll"
          >
            {{ allChecked ? "☑" : someChecked ? "⊟" : "☐" }}</button
          ><view
            v-for="c in columns"
            :key="c.key"
            class="mn-table-cell"
            :style="cellStyle(c)"
            ><button
              class="mn-option"
              :data-sort="c.key"
              :class="{ 'mn-disabled': !c.sortable || disabled || readOnly }"
              :disabled="!c.sortable || disabled || readOnly"
              @tap="order(c)"
            >
              <slot name="header" :column="c">{{ c.header }}</slot>
              {{
                active?.key === c.key
                  ? active.order === "ascend"
                    ? "↑"
                    : active.order === "descend"
                      ? "↓"
                      : ""
                  : ""
              }}</button
            ><view v-if="c.filters" class="mn-table-filters"
              ><button
                v-for="option in c.filters"
                :key="option.value"
                class="mn-tag"
                :data-filter="`${c.key}:${option.value}`"
                :class="[
                  { 'mn-active': filtering[c.key]?.includes(option.value) },
                  { 'mn-disabled': disabled || readOnly },
                ]"
                :disabled="disabled || readOnly"
                @tap="filter(c.key, option.value)"
              >
                {{ option.text }}
              </button></view
            ></view
          ></view
        ><text v-if="loading" class="mn-muted"
          ><slot name="loading">{{ t("common.loading") }}</slot></text
        ><view v-else-if="!rows.length" class="mn-empty"
          ><slot name="empty">{{ emptyText ?? t("table.empty") }}</slot></view
        ><view
          v-for="entry in loading ? [] : rows"
          :key="entry.key"
          class="mn-table-row"
          :class="{ 'mn-row-selected': selected.includes(entry.key) }"
          @tap="emit('rowClick', entry.row)"
          ><button
            v-if="selectionEnabled"
            class="mn-table-cell mn-select-row"
            :data-select="entry.key"
            :class="{ 'mn-disabled': disabled || readOnly || entry.disabled }"
            :disabled="disabled || readOnly || entry.disabled"
            @tap.stop="select(entry.key)"
          >
            {{ selected.includes(entry.key) ? "☑" : "☐" }}</button
          ><view
            v-for="c in columns"
            :key="c.key"
            class="mn-table-cell"
            :class="{ 'mn-ellipsis': c.ellipsis }"
            data-part="cell"
            :style="cellStyle(c)"
            ><slot name="cell" :row="entry.row" :column="c">{{
              entry.row[c.key]
            }}</slot></view
          ></view
        ><slot name="footer" /></view></scroll-view
    ><view v-if="pageSize" class="mn-pagination"
      ><button
        class="mn-button mn-variant-outline"
        data-action="previous-page"
        :class="{ 'mn-disabled': disabled || page <= 1 }"
        :disabled="disabled || page <= 1"
        @tap="turn(page - 1)"
      >
        Previous</button
      ><text>{{ page }} / {{ pages }}</text
      ><button
        class="mn-button mn-variant-outline"
        data-action="next-page"
        :class="{ 'mn-disabled': disabled || page >= pages }"
        :disabled="disabled || page >= pages"
        @tap="turn(page + 1)"
      >
        Next
      </button></view
    ></view
  >
</template>
