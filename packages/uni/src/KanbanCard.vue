<script setup lang="ts">
import { computed, useId } from "vue";
import {
  injectKanbanBoard,
  injectKanbanColumn,
  useKanbanCardGesture,
  useKanbanRegistration,
  useMeasure,
} from "./kanban-drag";
/**
 * A card of a KanbanColumn (it is the role="listitem" of the column's
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
const board = injectKanbanBoard();
const column = injectKanbanColumn();
const id = `mn-kanban-card-${useId()}`;
const measure = useMeasure(id);
useKanbanRegistration(
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
const gesture = useKanbanCardGesture(board, () => props.value);
const draggable = computed(() => !!board?.draggable.value);
const dragging = computed(() => board?.view.value?.card === props.value);
</script>
<template>
  <view
    :id="id"
    class="mn-kanban-card"
    :class="{ 'mn-draggable': draggable, 'mn-dragging': dragging }"
    role="listitem"
    data-minerva="kanban-card"
    data-part="root"
    :data-kanban-card="value"
    @touchstart="gesture.onTouchStart"
    @touchmove="gesture.onTouchMove"
    @touchend="gesture.onTouchEnd"
    @touchcancel="gesture.onTouchCancel"
    ><slot
  /></view>
</template>
