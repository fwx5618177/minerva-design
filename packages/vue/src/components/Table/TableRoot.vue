<script setup lang="ts">
/**
 * TableRoot: a styled `<table>` inside a horizontally scrolling wrapper. Use
 * it with TableHead / TableBody / TableRow / TableHeader / TableCell for
 * custom headers or merged cells; use `Table` for the declarative columns
 * API. Attributes (`aria-label`, `class`, `style`...) fall through to the
 * `<table>`.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  type CSSProperties,
} from "vue";
import styles from "@react-styles/components/Table/table.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import { toLength } from "./shared";
import type { TableRootProps } from "./types";

defineOptions({ name: "TableRoot", inheritAttrs: false });

const props = withDefaults(defineProps<TableRootProps>(), {
  size: "medium",
  variant: "simple",
  hoverable: false,
  scroll: undefined,
});

defineSlots<{
  /** Table sections (`TableHead`, `TableBody`...) */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const wrapper = ref<HTMLDivElement | null>(null);
const table = ref<HTMLTableElement | null>(null);
const overflowing = ref(false);

const scrollX = computed(() => toLength(props.scroll?.x));
const scrollY = computed(() => toLength(props.scroll?.y));

// Without an explicit scroll config, the wrapper still scrolls when the
// content overflows it: track that so it can become a focusable region.
let observer: ResizeObserver | undefined;
onMounted(() => {
  const el = wrapper.value!;
  const update = () => {
    overflowing.value =
      el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
  };
  update();
  if (typeof ResizeObserver === "undefined") return;
  observer = new ResizeObserver(update);
  observer.observe(el);
  if (el.firstElementChild) observer.observe(el.firstElementChild);
});
onBeforeUnmount(() => observer?.disconnect());

// A scrolling wrapper is a tab stop so keyboard users can scroll it; it is
// named after the table (or a localized default).
const regionAttrs = () => {
  if (!(scrollX.value || scrollY.value || overflowing.value)) return {};
  const labelledBy = attrs["aria-labelledby"] as string | undefined;
  return {
    role: "region",
    tabindex: 0,
    "aria-labelledby": labelledBy,
    "aria-label": labelledBy
      ? undefined
      : ((attrs["aria-label"] as string | undefined) ??
        t("table.scrollRegion")),
  };
};
const wrapperStyle = computed<CSSProperties | undefined>(() =>
  scrollY.value ? { maxHeight: scrollY.value, overflowY: "auto" } : undefined,
);
const tableStyle = computed<CSSProperties | undefined>(() =>
  scrollX.value ? { minWidth: scrollX.value } : undefined,
);

defineExpose({
  /** The `<table>` element */
  table,
  /** The scroll wrapper */
  wrapper,
});
</script>

<template>
  <div
    ref="wrapper"
    v-bind="{ ...regionAttrs(), ...hooks('data-table', 'viewport') }"
    :class="[
      styles.wrapper,
      variant === 'bordered' && styles.wrapperBordered,
      scrollY && styles.wrapperScrollY,
    ]"
    :style="wrapperStyle"
  >
    <table
      ref="table"
      :class="[
        styles.table,
        styles[size],
        styles[variant],
        hoverable && styles.hoverable,
        scrollX && styles.scrollX,
      ]"
      :style="tableStyle"
      v-bind="{ ...$attrs, ...hooks('data-table', 'table', { size, variant }) }"
    >
      <slot />
    </table>
  </div>
</template>
