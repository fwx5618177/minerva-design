<script setup lang="ts">
/**
 * ResponsiveGrid: an equal-width column grid whose column count follows its
 * own available width (container queries at 480 / 768 / 1200px), not the
 * viewport.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import { resolveSpace } from "@minerva/core";
import styles from "@react-styles/components/ResponsiveGrid/responsiveGrid.module.scss";
import { hooks } from "../../internal/hooks";
import type { ResponsiveGridProps } from "./types";

defineOptions({ name: "ResponsiveGrid", inheritAttrs: false });

const props = withDefaults(defineProps<ResponsiveGridProps>(), {
  as: "div",
  columns: 1,
  gap: 4,
  rowGap: undefined,
  columnGap: undefined,
});

defineSlots<{ default?: () => unknown }>();

const BREAKPOINTS = ["base", "sm", "md", "lg"] as const;

const attrs = useAttrs();

const variables = computed(() => {
  const { columns } = props;
  const counts = typeof columns === "number" ? { base: columns } : columns;
  const result: Record<string, string | number> = {};
  let previous = 1;
  for (const key of BREAKPOINTS) {
    const value = counts[key] ?? previous;
    if (!Number.isInteger(value) || value < 1 || value > 12) {
      throw new RangeError(
        "ResponsiveGrid columns must be integers from 1 to 12",
      );
    }
    result[`--grid-columns-${key}`] = value;
    previous = value;
  }
  result["--grid-row-gap"] = resolveSpace(props.rowGap ?? props.gap);
  result["--grid-column-gap"] = resolveSpace(props.columnGap ?? props.gap);
  return result as CSSProperties;
});

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("responsive-grid", "root"),
}));
</script>

<template>
  <component
    :is="as"
    :class="styles.root"
    :style="variables"
    v-bind="rootAttrs"
  >
    <div :class="styles.layout" v-bind="hooks('responsive-grid', 'layout')">
      <slot />
    </div>
  </component>
</template>
