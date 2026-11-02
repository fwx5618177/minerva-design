<script setup lang="ts">
import { computed, provide, useId } from "vue";
import { kanbanLength, type KanbanCardMove } from "@minerva/core";
import { useI18n } from "./i18n";
import { KANBAN_BOARD, useKanbanBoardDrag, useMeasure } from "./kanban-drag";
/**
 * A board of status columns (KanbanColumn) in a horizontal scroll-view
 * (scroll-x): equal-width columns (columnWidth), stretched equally with
 * fill when they fit, column bodies scrolling vertically within a bounded
 * height / maxHeight. `draggable` lets the KanbanCard children of keyed
 * columns (`value`) be moved with a long press and drag; the board is
 * controlled and emits each move (`card-move`).
 */
const props = withDefaults(
  defineProps<{
    /** Width of every column (a number is pixels; default 18rem / 288px) */
    columnWidth?: number | string;
    /** Stretches the columns equally when they fit */
    fill?: boolean;
    /** Space between the columns (a number is pixels; default 12px) */
    gap?: number | string;
    /** Height of the board: the column bodies scroll within it */
    height?: number | string;
    /** Maximum height of the board: the column bodies scroll within it */
    maxHeight?: number | string;
    /** Lets the KanbanCard children of keyed columns be dragged (long press) */
    draggable?: boolean;
    /** Whether a card may be dropped at a position */
    canDrop?: (move: KanbanCardMove) => boolean;
    /** Accessible name of the board (default: translated "Board") */
    ariaLabel?: string;
  }>(),
  { fill: false, draggable: false, canDrop: undefined },
);
const emit = defineEmits<{
  /** A card was dropped at a new position: move it in your data */
  "card-move": [move: KanbanCardMove];
}>();
const { t } = useI18n();
const id = `mn-kanban-board-${useId()}`;
const drag = useKanbanBoardDrag({
  draggable: () => props.draggable,
  canDrop: () => props.canDrop,
  measureBoard: useMeasure(id),
  onMove: (move) => emit("card-move", move),
});
provide(KANBAN_BOARD, drag);
const view = drag.view;
const rootStyle = computed(() => ({
  "--kanban-column-width": kanbanLength(props.columnWidth),
  "--kanban-gap": kanbanLength(props.gap),
}));
const px = (value: number) => `${value}px`;
</script>
<template>
  <view
    :id="id"
    class="mn-kanban-board"
    :class="{ 'mn-fill': fill, 'mn-dragging': !!view }"
    role="region"
    :aria-label="ariaLabel ?? t('kanban.label')"
    :style="rootStyle"
    ><scroll-view
      class="mn-kanban-board__scroll"
      :scroll-x="!view"
      enable-flex
      :style="{
        height: kanbanLength(height),
        maxHeight: kanbanLength(maxHeight),
      }"
      ><view class="mn-kanban-board__track"><slot /></view></scroll-view
    ><view
      v-if="view?.line"
      class="mn-kanban-board__drop-line"
      aria-hidden="true"
      :style="{
        left: px(view.line.left),
        top: px(view.line.top),
        width: px(view.line.width),
      }"
    /><view
      v-if="view?.ghost"
      class="mn-kanban-board__ghost mn-kanban-board__ghost--label"
      aria-hidden="true"
      :style="{
        left: px(view.ghost.left),
        top: px(view.ghost.top),
        width: px(view.ghost.width),
      }"
      ><text>{{ view.label }}</text></view
    ></view
  >
</template>
