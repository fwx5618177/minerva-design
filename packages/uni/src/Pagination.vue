<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  getPaginationItems,
  getPaginationVisibleRange,
  getPaginationKeyTarget,
  getTotalPages,
  type PaginationItem,
} from "@minerva/core";
import { useI18n } from "./i18n";
interface Labels {
  prev?: string;
  next?: string;
  jumpPrev?: string;
  jumpNext?: string;
  page?: (page: number) => string;
  jumpTo?: string;
  jumpToInput?: string;
  pageSize?: string;
  pageSizeOption?: (size: number) => string;
  currentPage?: string;
  total?: (total: number) => string;
  nav?: string;
}
const props = withDefaults(
  defineProps<{
    current?: number;
    defaultCurrent?: number;
    total?: number;
    pageSize?: number;
    defaultPageSize?: number;
    disabled?: boolean;
    showTotal?: boolean;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
    size?: "small" | "medium" | "large";
    shape?: "circle" | "rounded" | "square";
    variant?: "solid" | "outline" | "ghost";
    simple?: boolean;
    siblingCount?: number;
    boundaryCount?: number;
    hideEdges?: boolean;
    hideNumbers?: boolean;
    responsive?: boolean;
    labels?: Labels;
  }>(),
  {
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 10,
    pageSizeOptions: () => [10, 20, 50, 100],
    size: "medium",
    shape: "rounded",
    variant: "solid",
    labels: () => ({}),
  },
);
const emit = defineEmits<{
  change: [page: number, size: number];
  "update:current": [page: number];
  "update:pageSize": [size: number];
}>();
const { t, dir } = useI18n();
const local = ref(props.defaultCurrent),
  localSize = ref(props.defaultPageSize),
  jump = ref(""),
  simpleDraft = ref<string>();
const sizeValue = computed(() =>
  Math.max(1, props.pageSize ?? localSize.value),
);
const count = computed(() =>
  getTotalPages(Math.max(0, props.total), sizeValue.value),
);
const page = computed(() =>
  Math.max(1, Math.min(count.value, props.current ?? local.value)),
);
const range = computed(() =>
  getPaginationVisibleRange(page.value, sizeValue.value, props.total),
);
const items = computed(() =>
  getPaginationItems({
    page: page.value,
    totalPages: count.value,
    siblingCount: props.siblingCount,
    boundaryCount: props.boundaryCount,
    hideEdges: props.hideEdges,
  }),
);
const sizes = computed(() =>
  [...new Set([...props.pageSizeOptions, sizeValue.value])].filter(
    (v) => Number.isFinite(v) && v > 0,
  ),
);
watch(page, () => {
  simpleDraft.value = undefined;
});
function change(next: number, nextSize = sizeValue.value) {
  if (
    props.disabled ||
    !Number.isFinite(next) ||
    !Number.isFinite(nextSize) ||
    nextSize <= 0
  )
    return;
  next = Math.max(
    1,
    Math.min(getTotalPages(props.total, nextSize), Math.trunc(next)),
  );
  if (next === page.value && nextSize === sizeValue.value) return;
  const previousSize = sizeValue.value;
  if (props.current === undefined) local.value = next;
  if (props.pageSize === undefined) localSize.value = nextSize;
  emit("change", next, nextSize);
  emit("update:current", next);
  if (nextSize !== previousSize) emit("update:pageSize", nextSize);
}
function submit(simple = false) {
  const draft = simple ? simpleDraft.value : jump.value;
  if (draft?.trim() && Number.isFinite(Number(draft))) change(Number(draft));
  jump.value = "";
  simpleDraft.value = undefined;
}
function resize(event: any) {
  const index = Number(event.detail?.value);
  const next = sizes.value[index];
  if (next) change(1, next);
}
function keydown(event: KeyboardEvent) {
  const key =
    dir.value === "rtl"
      ? event.key === "ArrowLeft"
        ? "ArrowRight"
        : event.key === "ArrowRight"
          ? "ArrowLeft"
          : event.key
      : event.key;
  const target = getPaginationKeyTarget(key, page.value, count.value);
  if (target !== null) {
    event.preventDefault();
    change(target);
  }
}
function label(item: PaginationItem) {
  switch (item.kind) {
    case "page":
      return (
        props.labels.page?.(item.page) ??
        t("pagination.page", { page: item.page })
      );
    case "prev":
      return props.labels.prev ?? t("pagination.prev");
    case "next":
      return props.labels.next ?? t("pagination.next");
    case "jump-prev":
      return props.labels.jumpPrev ?? t("pagination.jumpPrev");
    case "jump-next":
      return props.labels.jumpNext ?? t("pagination.jumpNext");
    default:
      return "…";
  }
}
function text(item: PaginationItem) {
  return item.kind === "page"
    ? item.page
    : item.kind === "prev"
      ? "‹"
      : item.kind === "next"
        ? "›"
        : "…";
}
</script>
<template>
  <view
    class="mn-pagination mn-uni-pagination"
    :class="[
      `mn-pagination-${size}`,
      `mn-pagination-${shape}`,
      `mn-pagination-${variant}`,
      { 'mn-pagination-responsive': responsive },
    ]"
    role="navigation"
    :aria-label="labels.nav ?? t('pagination.nav')"
  >
    <text v-if="showTotal || $slots.total"
      ><slot name="total" :total="total" :range="range">{{
        labels.total?.(total) ?? t("pagination.total", { total })
      }}</slot></text
    >
    <template v-if="simple || hideNumbers">
      <button
        v-if="!hideEdges"
        class="mn-button mn-variant-outline"
        :disabled="disabled || page === 1"
        :aria-label="labels.prev ?? t('pagination.prev')"
        @tap="change(page - 1)"
      >
        <slot name="item" :page="page - 1" type="prev">‹</slot>
      </button>
      <view class="mn-row"
        ><input
          v-if="simple"
          data-simple-page
          class="mn-input"
          type="number"
          :disabled="disabled"
          :value="simpleDraft ?? String(page)"
          :aria-label="labels.currentPage ?? t('pagination.currentPage')"
          @input="simpleDraft = String(($event as any).detail.value)"
          @confirm="submit(true)"
          @blur="submit(true)"
          @keydown.enter.prevent="submit(true)"
        /><text v-else aria-live="polite">{{ page }}</text
        ><text>/ {{ count }}</text></view
      >
      <button
        v-if="!hideEdges"
        class="mn-button mn-variant-outline"
        :disabled="disabled || page === count"
        :aria-label="labels.next ?? t('pagination.next')"
        @tap="change(page + 1)"
      >
        <slot name="item" :page="page + 1" type="next">›</slot>
      </button>
    </template>
    <template v-else v-for="item in items" :key="item.key">
      <text v-if="item.kind === 'ellipsis'" aria-hidden="true">…</text>
      <button
        v-else
        class="mn-button mn-pagination-item"
        :class="{ 'mn-active': item.kind === 'page' && page === item.page }"
        :data-page="item.kind === 'page' ? item.page : undefined"
        :aria-label="label(item)"
        :aria-current="
          item.kind === 'page' && page === item.page ? 'page' : undefined
        "
        :disabled="disabled || item.page < 1 || item.page > count"
        @tap="change(item.page)"
        @keydown="keydown"
      >
        <slot
          name="item"
          :page="item.page"
          :type="item.kind"
          :active="item.kind === 'page' && page === item.page"
          >{{ text(item) }}</slot
        >
      </button>
    </template>
    <picker
      v-if="showSizeChanger"
      data-page-size
      mode="selector"
      :range="
        sizes.map(
          (s) =>
            labels.pageSizeOption?.(s) ??
            t('pagination.pageSizeOption', { size: s }),
        )
      "
      :value="sizes.indexOf(sizeValue)"
      :disabled="disabled"
      :aria-label="labels.pageSize ?? t('pagination.pageSize')"
      @change="resize"
      ><view class="mn-button mn-variant-outline">{{
        labels.pageSizeOption?.(sizeValue) ??
        t("pagination.pageSizeOption", { size: sizeValue })
      }}</view></picker
    >
    <view v-if="showQuickJumper" class="mn-row"
      ><text>{{ labels.jumpTo ?? t("pagination.jumpTo") }}</text
      ><input
        data-jumper
        class="mn-input"
        type="number"
        :value="jump"
        :disabled="disabled"
        :aria-label="labels.jumpToInput ?? t('pagination.jumpToInput')"
        @input="jump = String(($event as any).detail.value)"
        @confirm="submit()"
        @blur="submit()"
        @keydown.enter.prevent="submit()"
    /></view>
  </view>
</template>
