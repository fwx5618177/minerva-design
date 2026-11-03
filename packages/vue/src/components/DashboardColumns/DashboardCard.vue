<script setup lang="ts">
/**
 * DashboardCard: a card of a DashboardColumn, keyed by `value`. In a draggable
 * board it is a focusable `role="button"` described by the drag
 * instructions; otherwise it renders a plain wrapper. Controls inside a
 * draggable card keep working (a drag never starts on them), but keep them
 * few: they sit inside the button.
 */
import { computed, inject, useAttrs } from "vue";
import styles from "@react-styles/components/DashboardColumns/dashboardColumns.module.scss";
import { hooks } from "../../internal/hooks";
import { DASHBOARD_DRAG_KEY } from "./context";
import type { DashboardCardProps } from "./types";

defineOptions({ name: "DashboardCard", inheritAttrs: false });

const props = withDefaults(defineProps<DashboardCardProps>(), {
  label: undefined,
});

defineSlots<{
  /** Content of the card */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const board = inject(DASHBOARD_DRAG_KEY, null);

const rootAttrs = computed(() => {
  const draggable = board?.draggable.value ?? false;
  return {
    ...attrs,
    role: draggable ? "button" : undefined,
    tabindex: draggable ? 0 : undefined,
    "aria-label": draggable ? props.label : undefined,
    "aria-describedby": draggable ? board?.hintId : undefined,
    "data-dashboard-card": props.value,
    "data-draggable": draggable ? "" : undefined,
    class: [styles.card, attrs.class],
    ...hooks("dashboard-card", "root"),
  };
});
</script>

<template>
  <div v-bind="rootAttrs">
    <slot />
  </div>
</template>
