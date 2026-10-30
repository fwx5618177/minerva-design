<script setup lang="ts">
import { computed } from "vue";
import type {
  ChordChartOptions,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "@minerva/charts/canvas";
import { plain } from "./chart-canvas";
import {
  autoHeightProp,
  shapeCommonProps,
  chordChartProps,
} from "./shape-chart-types";
import {
  shapeCommonOptions,
  shapeDefaultHeight,
  useCanvasShapeChart,
} from "./shape-chart-canvas";
const props = defineProps({
  ...shapeCommonProps,
  ...chordChartProps,
  ...autoHeightProp,
});
const emit = defineEmits<{
  hover: [event: ShapeHoverEvent | null];
  click: [event: ShapeHoverEvent];
  toggle: [event: ShapeToggleEvent];
}>();
const options = computed((): ChordChartOptions => ({
  ...shapeCommonOptions(props),
  type: "chord",
  groups: plain(props.groups),
  matrix: plain(props.matrix),
  links: plain(props.links),
  directed: props.directed,
  arrows: props.arrows,
  padAngle: props.padAngle,
  startAngle: props.startAngle,
  sortGroups: props.sortGroups,
  sortSubgroups: props.sortSubgroups,
  ribbonColor: props.ribbonColor,
  ribbonOpacity: props.ribbonOpacity,
  arcWidth: props.arcWidth,
  ticks: props.ticks,
  tickFormat: props.tickFormat,
  labels: props.labels,
}));
const {
  id,
  root,
  rootStyle,
  ariaLabel,
  handle,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
} = useCanvasShapeChart(
  () => ({
    width: props.width,
    height: props.height ?? shapeDefaultHeight(options.value),
  }),
  () => options.value,
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("click", event),
    toggle: (event) => emit("toggle", event),
  },
);
const scrollLocked = computed(() => props.disableScroll ?? false);
defineExpose(handle);
</script>
<template>
  <view
    ref="root"
    class="mn-chart mn-uni-chart mn-shape-chart"
    :style="rootStyle"
    ><canvas
      :id="id"
      type="2d"
      :canvas-id="id"
      class="mn-chart-canvas"
      :hidpi="false"
      :disable-scroll="scrollLocked"
      role="img"
      :aria-label="ariaLabel"
      style="display: block; width: 100%; height: 100%"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchCancel"
  /></view>
</template>
