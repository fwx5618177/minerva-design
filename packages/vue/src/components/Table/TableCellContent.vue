<script setup lang="ts">
/**
 * TableCellContent: bounded, wrapping content inside a table cell (not a
 * replacement for `<td>`), with an optional muted secondary line.
 * Attributes fall through to the root `<div>`.
 */
import { computed } from "vue";
import styles from "@react-styles/components/Table/table.module.scss";
import { hooks } from "../../internal/hooks";
import { toLength } from "./shared";
import type { TableCellContentProps } from "./types";

defineOptions({ name: "TableCellContent", inheritAttrs: false });

const props = withDefaults(defineProps<TableCellContentProps>(), {
  primary: undefined,
  secondary: undefined,
  monospace: false,
  maxWidth: 360,
});

const slots = defineSlots<{
  /** Main content (the `primary` prop) */
  default?: () => unknown;
  /** Secondary, muted line (the `secondary` prop) */
  secondary?: () => unknown;
}>();

const hasSecondary = computed(
  () => props.secondary != null || !!slots.secondary,
);
</script>

<template>
  <div
    :class="styles.cellContent"
    :style="{ maxWidth: toLength(maxWidth) }"
    v-bind="{ ...$attrs, ...hooks('table-cell-content', 'root') }"
  >
    <component
      :is="monospace ? 'code' : 'div'"
      :class="[
        styles.cellPrimary,
        monospace && styles.cellMono,
        hasSecondary && styles.cellStrong,
      ]"
      v-bind="hooks('table-cell-content', 'primary')"
    >
      <slot>{{ primary }}</slot>
    </component>
    <div
      v-if="hasSecondary"
      :class="styles.cellSecondary"
      v-bind="hooks('table-cell-content', 'secondary')"
    >
      <slot name="secondary">{{ secondary }}</slot>
    </div>
  </div>
</template>
