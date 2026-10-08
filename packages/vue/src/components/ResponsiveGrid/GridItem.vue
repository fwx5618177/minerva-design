<script setup lang="ts">
/**
 * GridItem: a cell of a ResponsiveGrid (or any CSS grid). `fullWidth` spans
 * the whole row; `asChild` applies the item to its single child without a
 * wrapper.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/ResponsiveGrid/responsiveGrid.module.scss";
import { hooks } from "../../internal/hooks";
import { Slot } from "../../internal/Slot";
import type { GridItemProps } from "./types";

defineOptions({ name: "GridItem", inheritAttrs: false });

const props = withDefaults(defineProps<GridItemProps>(), {
  fullWidth: false,
  asChild: false,
});

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [
  styles.item,
  props.fullWidth && styles.fullWidth,
]);
const rootAttrs = computed(() => ({ ...attrs, ...hooks("grid-item", "root") }));
</script>

<template>
  <component :is="asChild ? Slot : 'div'" :class="classes" v-bind="rootAttrs">
    <slot />
  </component>
</template>
