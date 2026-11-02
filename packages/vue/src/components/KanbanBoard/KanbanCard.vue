<script setup lang="ts">
/**
 * KanbanCard: a card of a KanbanColumn, keyed by `value`. In a draggable
 * board it is a focusable `role="button"` described by the drag
 * instructions; otherwise it renders a plain wrapper. Controls inside a
 * draggable card keep working (a drag never starts on them), but keep them
 * few: they sit inside the button.
 */
import { computed, inject, useAttrs } from "vue";
import styles from "@react-styles/components/KanbanBoard/kanbanBoard.module.scss";
import { hooks } from "../../internal/hooks";
import { KANBAN_DRAG_KEY } from "./context";
import type { KanbanCardProps } from "./types";

defineOptions({ name: "KanbanCard", inheritAttrs: false });

const props = withDefaults(defineProps<KanbanCardProps>(), {
  label: undefined,
});

defineSlots<{
  /** Content of the card */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const board = inject(KANBAN_DRAG_KEY, null);

const rootAttrs = computed(() => {
  const draggable = board?.draggable.value ?? false;
  return {
    ...attrs,
    role: draggable ? "button" : undefined,
    tabindex: draggable ? 0 : undefined,
    "aria-label": draggable ? props.label : undefined,
    "aria-describedby": draggable ? board?.hintId : undefined,
    "data-kanban-card": props.value,
    "data-draggable": draggable ? "" : undefined,
    class: [styles.card, attrs.class],
    ...hooks("kanban-card", "root"),
  };
});
</script>

<template>
  <div v-bind="rootAttrs">
    <slot />
  </div>
</template>
