<script setup lang="ts">
import { getCurrentInstance, type PropType } from "vue";
import {
  quadrantChartOptions,
  quadrantOf,
  type ChartHoverEvent,
  type ChartRendererKind,
  type ChartView,
  type QuadrantAxisLabels,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart } from "./cartesian";
import { raw } from "./engine";
import { chartCommonProps } from "./props";
import type { QuadrantDropTarget } from "./types";

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG, ...): tinted
 * quadrants with titles, dividers, and labelled dots placed without
 * overlapping labels. Dots can be dragged to another quadrant.
 */
defineOptions({ name: "QuadrantChart" });
const props = defineProps({
  ...chartCommonProps,
  /** Points to place (replace the array to update the chart) */
  points: { type: Array as PropType<readonly QuadrantPoint[]>, required: true },
  /** Range of the horizontal axis (default `[0, 10]`) */
  xDomain: Array as unknown as PropType<[number, number]>,
  /** Range of the vertical axis (default `[0, 10]`) */
  yDomain: Array as unknown as PropType<[number, number]>,
  /** X value of the vertical divider (the middle of `xDomain` by default) */
  xSplit: Number,
  /** Y value of the horizontal divider (the middle of `yDomain` by default) */
  ySplit: Number,
  /** Titles and colors of the quadrants */
  quadrants: Object as PropType<QuadrantRegions>,
  /** Title of the horizontal axis */
  xLabel: String,
  /** Title of the vertical axis */
  yLabel: String,
  /** Texts at the ends of the dividers, drawn inside the plot */
  axisLabels: Object as PropType<QuadrantAxisLabels>,
  /** Shows the numeric ticks of the axes (default `true`) */
  showTicks: { type: Boolean, default: undefined },
  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  reverseX: { type: Boolean, default: undefined },
  /** Draws the labels next to the dots (default `true`) */
  showLabels: { type: Boolean, default: undefined },
  /** Dot diameter in pixels (default 12) */
  pointSize: Number,
  /** Name of the points in the tooltip */
  name: String,
  /** Lets the user drag the dots (default: when a `pointDrop` listener is set) */
  draggable: { type: Boolean, default: undefined },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) point changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A point was clicked */
  pointClick: [point: QuadrantPoint, index: number];
  /** The empty area of a quadrant was clicked */
  quadrantClick: [quadrant: QuadrantCorner, position: { x: number; y: number }];
  /** A dragged point was released (the chart does not move it: update `points`) */
  pointDrop: [point: QuadrantPoint, index: number, target: QuadrantDropTarget];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const vnode = getCurrentInstance()?.vnode;
const geometry = () => ({
  xDomain: raw(props.xDomain),
  yDomain: raw(props.yDomain),
  xSplit: props.xSplit,
  ySplit: props.ySplit,
  reverseX: props.reverseX,
});
const { setContainer, rootStyle, handle } = useCartesianChart(
  props,
  () =>
    quadrantChartOptions(
      {
        ...geometry(),
        points: raw(props.points).map(raw),
        quadrants: raw(props.quadrants),
        xLabel: props.xLabel,
        yLabel: props.yLabel,
        axisLabels: raw(props.axisLabels),
        showTicks: props.showTicks,
        showLabels: props.showLabels,
        pointSize: props.pointSize,
        name: props.name,
        draggable: props.draggable ?? !!vnode?.props?.onPointDrop,
      },
      (({ series: _series, ...rest }) => rest)(engineOptions(props, [])),
    ),
  {
    hover: (event) => emit("hover", event),
    click: (event) => {
      const index = event.items[0]?.index;
      const point = index === undefined ? undefined : props.points[index];
      if (point && index !== undefined) emit("pointClick", point, index);
    },
    plotClick: (at) =>
      emit("quadrantClick", quadrantOf(geometry(), at.x, at.y), {
        x: at.x,
        y: at.y,
      }),
    drop: (event) => {
      const index = event.item.index;
      const point = props.points[index];
      if (!point) return;
      emit("pointDrop", point, index, {
        x: event.x,
        y: event.y,
        quadrant: quadrantOf(geometry(), event.x, event.y),
      });
    },
    zoom: (view) => emit("zoom", view),
    renderer: (renderer) => emit("rendererChange", renderer),
  },
);
defineExpose(handle);
</script>

<template>
  <div
    class="mn-chart mn-quadrant-chart"
    data-minerva="chart"
    :style="rootStyle"
  >
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
