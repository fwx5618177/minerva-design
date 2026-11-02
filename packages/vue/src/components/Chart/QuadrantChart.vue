<script setup lang="ts">
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type PropType,
} from "vue";
import {
  createQuadrantPointLayer,
  quadrantChartOptions,
  quadrantOf,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartRendererKind,
  type ChartView,
  type QuadrantAxisLabels,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantPointLayer,
  type QuadrantPointLayerOptions,
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
  /** Shows the number of points of each quadrant after its title; a function returns the text */
  showCounts: {
    type: [Boolean, Function] as PropType<QuadrantConfig["showCounts"]>,
    default: undefined,
  },
  /** Index of the selected point, drawn with a ring (`null`: none) */
  selectedIndex: {
    type: Number as PropType<number | null>,
    default: undefined,
  },
  /** Indices of the selected points */
  selectedIndices: Array as PropType<readonly number[]>,
  /**
   * Renders a visually hidden list of the points per quadrant: screen
   * readers can reach every point; arrows move between them, Enter clicks
   * and Shift + arrows move the focused point to the neighbouring quadrant
   * (`pointDrop`, with a `pointDrop` listener)
   */
  accessiblePoints: { type: Boolean, default: true },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) point changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A point was clicked */
  pointClick: [point: QuadrantPoint, index: number];
  /** The same point was clicked twice in quick succession */
  pointDoubleClick: [point: QuadrantPoint, index: number];
  /** A point is being dragged (on every move, with the quadrant under the pointer) */
  pointDrag: [point: QuadrantPoint, index: number, target: QuadrantDropTarget];
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
/** Two clicks on the same point within this delay count as a double click */
const DOUBLE_CLICK_MS = 400;
let lastClick: { index: number; time: number } | null = null;
const geometry = () => ({
  xDomain: raw(props.xDomain),
  yDomain: raw(props.yDomain),
  xSplit: props.xSplit,
  ySplit: props.ySplit,
  reverseX: props.reverseX,
});
const dropAt = (event: ChartDragEvent): QuadrantDropTarget => ({
  x: event.x,
  y: event.y,
  quadrant: quadrantOf(geometry(), event.x, event.y),
});
// keyboard-focused point of the accessible layer (drawn with a focus ring)
const focusedIndex = ref<number | null>(null);
const root = ref<HTMLElement | null>(null);
const build = () =>
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
      draggable:
        props.draggable ??
        !!(vnode?.props?.onPointDrop || vnode?.props?.onPointDrag),
      showCounts: props.showCounts,
      selectedIndex: props.selectedIndex,
      selectedIndices: raw(props.selectedIndices),
    },
    (({ series: _series, ...rest }) => rest)(engineOptions(props, [])),
    { focusedIndex: props.accessiblePoints ? focusedIndex.value : null },
  );
const { setContainer, rootStyle, handle } = useCartesianChart(props, build, {
  hover: (event) => emit("hover", event),
  click: (event) => {
    const index = event.items[0]?.index;
    const point = index === undefined ? undefined : props.points[index];
    if (!point || index === undefined) return;
    const now = Date.now();
    const double =
      lastClick?.index === index && now - lastClick.time < DOUBLE_CLICK_MS;
    lastClick = double ? null : { index, time: now };
    emit("pointClick", point, index);
    if (double) emit("pointDoubleClick", point, index);
  },
  plotClick: (at) =>
    emit("quadrantClick", quadrantOf(geometry(), at.x, at.y), {
      x: at.x,
      y: at.y,
    }),
  drag: (event) => {
    const point = props.points[event.item.index];
    if (point) emit("pointDrag", point, event.item.index, dropAt(event));
  },
  drop: (event) => {
    const point = props.points[event.item.index];
    if (point) emit("pointDrop", point, event.item.index, dropAt(event));
  },
  zoom: (view) => emit("zoom", view),
  renderer: (renderer) => emit("rendererChange", renderer),
});

// the accessible point layer (shared with the other DOM renderers)
let layer: QuadrantPointLayer | null = null;
const layerOptions = (): QuadrantPointLayerOptions => ({
  config: {
    ...geometry(),
    points: raw(props.points).map(raw),
    quadrants: raw(props.quadrants),
    xLabel: props.xLabel,
    yLabel: props.yLabel,
    name: props.name,
  },
  locale: props.locale,
  movable: !!vnode?.props?.onPointDrop && props.draggable !== false,
  selected: [
    ...(props.selectedIndices ?? []),
    ...(props.selectedIndex !== undefined && props.selectedIndex !== null
      ? [props.selectedIndex]
      : []),
  ],
  onFocusChange: (index, hover) => {
    focusedIndex.value = index;
    emit("hover", hover);
  },
  onClick: (index) => {
    const point = props.points[index];
    if (point) emit("pointClick", point, index);
  },
  onMove: (index, target) => {
    const point = props.points[index];
    if (point) emit("pointDrop", point, index, target);
  },
});
const syncLayer = () => {
  if (!props.accessiblePoints) {
    layer?.destroy();
    layer = null;
    focusedIndex.value = null;
  } else if (layer) layer.update(layerOptions());
  else if (root.value)
    layer = createQuadrantPointLayer(root.value, layerOptions());
};
onMounted(syncLayer);
watch(() => ({ ...props }), syncLayer, { flush: "post" });
// the focus ring is not a prop: redraw on its own
watch(focusedIndex, () => handle.getInstance()?.setOptions(build()));
onBeforeUnmount(() => {
  layer?.destroy();
  layer = null;
});
defineExpose(handle);
</script>

<template>
  <div
    ref="root"
    class="mn-chart mn-quadrant-chart"
    data-minerva="chart"
    :style="rootStyle"
  >
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
