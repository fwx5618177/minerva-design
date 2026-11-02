<script setup lang="ts">
import { computed } from "vue";
import { kanbanLength } from "@minerva/core";
import { useI18n } from "./i18n";
/**
 * A board of status columns (KanbanColumn) in a horizontal scroll-view
 * (scroll-x): equal-width columns (columnWidth), stretched equally with
 * fill when they fit, column bodies scrolling vertically within a bounded
 * height / maxHeight. Drag and drop is not built in: move cards with your
 * own actions and update the columns' data.
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
    /** Accessible name of the board (default: translated "Board") */
    ariaLabel?: string;
  }>(),
  { fill: false },
);
const { t } = useI18n();
const rootStyle = computed(() => ({
  "--kanban-column-width": kanbanLength(props.columnWidth),
  "--kanban-gap": kanbanLength(props.gap),
}));
</script>
<template>
  <view
    class="mn-kanban-board"
    :class="{ 'mn-fill': fill }"
    role="region"
    :aria-label="ariaLabel ?? t('kanban.label')"
    :style="rootStyle"
    ><scroll-view
      class="mn-kanban-board__scroll"
      scroll-x
      enable-flex
      :style="{
        height: kanbanLength(height),
        maxHeight: kanbanLength(maxHeight),
      }"
      ><view class="mn-kanban-board__track"><slot /></view></scroll-view
  ></view>
</template>
