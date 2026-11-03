<script setup lang="ts">
import { computed, useId } from "vue";
import {
  injectDashboardColumns,
  injectDashboardColumn,
  useDashboardCardGesture,
  useDashboardRegistration,
  useMeasure,
} from "./dashboard-drag";
/**
 * A card of a DashboardColumn (it is the role="listitem" of the column's
 * list), keyed by `value`. In a draggable board a long press picks it up:
 * a copy showing its `label` follows the finger and the card drops where
 * the finger lifts.
 */
const props = defineProps<{
  /** Key of the card, reported as `cardKey` by a draggable board */
  value: string;
  /** Text of the floating copy while it is dragged (default: `value`) */
  label?: string;
}>();
const board = injectDashboardColumns();
const column = injectDashboardColumn();
const id = `mn-dashboard-card-${useId()}`;
const measure = useMeasure(id);
useDashboardRegistration(
  board
    ? () =>
        board.registerCard({
          key: () => props.value,
          column: () => column?.value,
          label: () => props.label || props.value,
          measure,
        })
    : null,
);
const gesture = useDashboardCardGesture(board, () => props.value);
const draggable = computed(() => !!board?.draggable.value);
const dragging = computed(() => board?.view.value?.card === props.value);
</script>
<template>
  <view
    :id="id"
    class="mn-dashboard-card"
    :class="{ 'mn-draggable': draggable, 'mn-dragging': dragging }"
    role="listitem"
    data-minerva="dashboard-card"
    data-part="root"
    :data-dashboard-card="value"
    @touchstart="gesture.onTouchStart"
    @touchmove="gesture.onTouchMove"
    @touchend="gesture.onTouchEnd"
    @touchcancel="gesture.onTouchCancel"
    ><slot
  /></view>
</template>
