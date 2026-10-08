<script setup lang="ts">
/**
 * SkeletonText: a decorative block of text-line placeholders (the last line
 * is shortened to 70% by default). Hidden from assistive technologies;
 * expose the busy state on the surrounding container.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import { resolveSpace } from "@minerva/core";
import styles from "@react-styles/components/Skeleton/skeleton.module.scss";
import { hooks } from "../../internal/hooks";
import type { SkeletonTextProps } from "./types";

defineOptions({ name: "SkeletonText", inheritAttrs: false });

const props = withDefaults(defineProps<SkeletonTextProps>(), {
  lines: 3,
  lineHeight: "1em",
  gap: 2,
  shrinkLast: true,
  animation: "pulse",
});

const attrs = useAttrs();
const count = computed(() =>
  Number.isFinite(props.lines) ? Math.max(0, Math.floor(props.lines)) : 0,
);
const lineStyle = (index: number): CSSProperties => ({
  width: props.shrinkLast && index === count.value - 1 ? "70%" : "100%",
  height:
    typeof props.lineHeight === "number"
      ? `${props.lineHeight}px`
      : props.lineHeight,
});
const rootAttrs = computed(() => ({
  "aria-hidden": "true" as const,
  ...attrs,
  ...hooks("skeleton-text", "root"),
}));
</script>

<template>
  <div
    :class="styles.skeletonText"
    :style="{ gap: resolveSpace(gap) }"
    v-bind="rootAttrs"
  >
    <!-- The markup of decorative text Skeletons, as lines of this block -->
    <span
      v-for="(_, index) in count"
      :key="index"
      aria-hidden="true"
      :class="[
        styles.skeleton,
        styles.decorative,
        styles.text,
        styles[`animation-${animation}`],
      ]"
      :style="lineStyle(index)"
      v-bind="hooks('skeleton-text', 'line')"
    />
  </div>
</template>
