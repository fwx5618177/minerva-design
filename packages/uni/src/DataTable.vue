<script setup lang="ts">
import { useAttrs, getCurrentInstance, computed } from "vue";
import Table from "./Table.vue";
import Pagination from "./Pagination.vue";
import type { TableProps } from "./table-types";
import { useI18n } from "./i18n";
defineOptions({ inheritAttrs: false });
const props = defineProps<
  TableProps & {
    error?: string;
    loading?: boolean;
    retryLabel?: string;
    pagination?: Record<string, any>;
  }
>();
const emit = defineEmits([
  "retry",
  "pageChange",
  "sortChange",
  "selectionChange",
  "rowClick",
  "filterChange",
]);
const attrs = useAttrs();
const instance = getCurrentInstance();
const { t } = useI18n();
const tableProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => !["error", "retryLabel", "pagination"].includes(key),
    ),
  ),
);
function pageChange(page: number, size: number) {
  emit("pageChange", page, size);
}
</script>
<template>
  <view class="mn-data-table" :aria-busy="loading || undefined">
    <view v-if="error && !loading" class="mn-alert mn-status-error" role="alert"
      ><slot name="error" :error="error"
        ><text>{{ error }}</text></slot
      ><button
        v-if="instance?.vnode.props?.onRetry"
        class="mn-button"
        @tap="emit('retry')"
      >
        {{ retryLabel ?? t("table.retry") }}
      </button></view
    >
    <template v-else
      ><Table
        v-bind="{ ...attrs, ...tableProps }"
        :loading="loading"
        @sort-change="(...args) => emit('sortChange', ...args)"
        @selection-change="(...args) => emit('selectionChange', ...args)"
        @row-click="(...args) => emit('rowClick', ...args)"
        @filter-change="(...args) => emit('filterChange', ...args)"
        @page-change="(...args) => emit('pageChange', ...args)"
        ><template v-if="$slots.header" #header="slotProps"
          ><slot name="header" :column="slotProps.column"
        /></template>
        <template v-if="$slots.cell" #cell="slotProps"
          ><slot name="cell" :row="slotProps.row" :column="slotProps.column"
        /></template>
        <template v-if="$slots.loading" #loading
          ><slot name="loading"
        /></template>
        <template v-if="$slots.empty" #empty><slot name="empty" /></template>
        <template v-if="$slots.footer" #footer
          ><slot name="footer" /></template></Table
      ><Pagination v-if="pagination" v-bind="pagination" @change="pageChange"
        ><template v-if="$slots['pagination-total']" #total="slotProps"
          ><slot
            name="pagination-total"
            :total="slotProps.total"
            :range="slotProps.range" /></template
        ><template v-if="$slots['pagination-item']" #item="slotProps"
          ><slot
            name="pagination-item"
            :page="slotProps.page"
            :type="slotProps.type"
            :active="slotProps.active" /></template></Pagination
    ></template>
  </view>
</template>
