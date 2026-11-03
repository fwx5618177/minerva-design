<script setup lang="ts">
import { computed, provide, useId } from "vue";
import { dashboardLength, type DashboardCardMove } from "@minerva/core";
import { useI18n } from "./i18n";
import {
  DASHBOARD_COLUMNS,
  useDashboardColumnsDrag,
  useMeasure,
} from "./dashboard-drag";
/**
 * A board of status columns (DashboardColumn) in a horizontal scroll-view
 * (scroll-x): equal-width columns (columnWidth), stretched equally with
 * fill when they fit, column bodies scrolling vertically within a bounded
 * height / maxHeight. `draggable` lets the DashboardCard children of keyed
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
    /** Lets the DashboardCard children of keyed columns be dragged (long press) */
    draggable?: boolean;
    /** Whether a card may be dropped at a position */
    canDrop?: (move: DashboardCardMove) => boolean;
    /** Accessible name of the board (default: translated "Board") */
    ariaLabel?: string;
  }>(),
  { fill: false, draggable: false, canDrop: undefined },
);
const emit = defineEmits<{
  /** A card was dropped at a new position: move it in your data */
  "card-move": [move: DashboardCardMove];
}>();
const { t } = useI18n();
const id = `mn-dashboard-columns-${useId()}`;
const drag = useDashboardColumnsDrag({
  draggable: () => props.draggable,
  canDrop: () => props.canDrop,
  measureBoard: useMeasure(id),
  onMove: (move) => emit("card-move", move),
});
provide(DASHBOARD_COLUMNS, drag);
const view = drag.view;
const rootStyle = computed(() => ({
  "--dashboard-column-width": dashboardLength(props.columnWidth),
  "--dashboard-gap": dashboardLength(props.gap),
}));
const px = (value: number) => `${value}px`;
</script>
<template>
  <view
    :id="id"
    class="mn-dashboard-columns"
    :class="{ 'mn-fill': fill, 'mn-dragging': !!view }"
    role="region"
    :aria-label="ariaLabel ?? t('dashboard.label')"
    :style="rootStyle"
    ><scroll-view
      class="mn-dashboard-columns__scroll"
      :scroll-x="!view"
      enable-flex
      :style="{
        height: dashboardLength(height),
        maxHeight: dashboardLength(maxHeight),
      }"
      ><view class="mn-dashboard-columns__track"><slot /></view></scroll-view
    ><view
      v-if="view?.line"
      class="mn-dashboard-columns__drop-line"
      aria-hidden="true"
      :style="{
        left: px(view.line.left),
        top: px(view.line.top),
        width: px(view.line.width),
      }"
    /><view
      v-if="view?.ghost"
      class="mn-dashboard-columns__ghost mn-dashboard-columns__ghost--label"
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
