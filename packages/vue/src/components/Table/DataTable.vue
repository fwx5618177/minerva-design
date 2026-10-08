<script setup lang="ts" generic="T">
/**
 * DataTable: a `Table` with optional pagination and an error state with a
 * retry action (`@retry`). While loading it shows skeleton rows (even if
 * `error` is set) and marks itself busy. Attributes, `v-model:sortState`,
 * `v-model:selectedRowKeys` and the cell / header / empty slots go to the
 * `Table`.
 */
import { computed } from "vue";
import styles from "@react-styles/components/Table/table.module.scss";
import { hooks } from "../../internal/hooks";
import { IconRefreshCw } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { Button } from "../Button";
import { Pagination } from "../Pagination";
import Table from "./Table.vue";
import type {
  DataTableProps,
  TableColumn,
  TableRowKey,
  TableSortState,
} from "./types";

defineOptions({ name: "DataTable", inheritAttrs: false });

const props = withDefaults(defineProps<DataTableProps<T>>(), {
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
  pagination: undefined,
  error: undefined,
  onRetry: undefined,
  retryLabel: undefined,
});

const emit = defineEmits<{
  "update:sortState": [sortState: TableSortState | null];
  /** A sortable header was activated: the next sort state */
  sortChange: [sortState: TableSortState];
  "update:selectedRowKeys": [selectedRowKeys: TableRowKey[]];
  /** The selection changed: the selected keys and their rows of `data` */
  selectionChange: [selectedRowKeys: TableRowKey[], selectedRows: T[]];
}>();

const slots = defineSlots<
  {
    /** Error message (the `error` prop); shows the error state */
    error?: () => unknown;
    /** Content under the table, replacing the `pagination` prop */
    pagination?: () => unknown;
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

const showError = computed(
  () => (Boolean(props.error) || !!slots.error) && !props.loading,
);

const tableProps = computed(() => {
  const {
    pagination: _pagination,
    error: _error,
    onRetry: _onRetry,
    retryLabel: _retryLabel,
    ...rest
  } = props;
  return rest;
});

/** Scope of a forwarded slot (typed as every Table slot scope) */
const scopeOf = (scope: unknown) =>
  (scope ?? {}) as { row: T; index: number; value: unknown } & {
    column: TableColumn<T>;
  };

/** Slots forwarded to the Table */
const tableSlots = computed(
  () =>
    Object.keys(slots).filter(
      (name) => name !== "error" && name !== "pagination",
    ) as Array<"empty" | `cell-${string}` | `header-${string}`>,
);
</script>

<template>
  <div
    :class="styles.dataTable"
    :aria-busy="loading || undefined"
    v-bind="hooks('data-table', 'root', { loading, size, variant })"
  >
    <div
      v-if="showError"
      :class="styles.error"
      role="alert"
      v-bind="hooks('data-table', 'error')"
    >
      <div :class="styles.errorTitle">
        <slot name="error">{{ error }}</slot>
      </div>
      <Button
        v-if="onRetry"
        color="neutral"
        variant="outline"
        size="small"
        @click="onRetry()"
      >
        <IconRefreshCw aria-hidden="true" :class="styles.retryIcon" />
        {{ retryLabel ?? t("table.retry") }}
      </Button>
    </div>
    <template v-else>
      <Table
        v-bind="{ ...$attrs, ...tableProps }"
        @update:sort-state="emit('update:sortState', $event)"
        @sort-change="emit('sortChange', $event)"
        @update:selected-row-keys="emit('update:selectedRowKeys', $event)"
        @selection-change="
          (keys: TableRowKey[], rows: T[]) =>
            emit('selectionChange', keys, rows)
        "
      >
        <template v-for="name in tableSlots" :key="name" #[name]="scope">
          <slot :name="name" v-bind="scopeOf(scope)" />
        </template>
      </Table>
      <slot name="pagination">
        <Pagination v-if="pagination" v-bind="pagination" />
      </slot>
    </template>
  </div>
</template>
