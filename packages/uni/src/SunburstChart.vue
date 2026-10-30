<script setup lang="ts">
import { computed } from "vue";
import type {
  SunburstChartOptions,
  ShapeDrillEvent,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "@minerva/charts/canvas";
import { plain } from "./chart-canvas";
import {
  autoHeightProp,
  shapeCommonProps,
  sunburstChartProps,
} from "./shape-chart-types";
import {
  shapeCommonOptions,
  shapeDefaultHeight,
  useCanvasShapeChart,
} from "./shape-chart-canvas";
const props = defineProps({
  ...shapeCommonProps,
  ...sunburstChartProps,
  ...autoHeightProp,
});
const emit = defineEmits<{
  hover: [event: ShapeHoverEvent | null];
  click: [event: ShapeHoverEvent];
  toggle: [event: ShapeToggleEvent];
  drill: [event: ShapeDrillEvent];
}>();
const options = computed((): SunburstChartOptions => ({
  ...shapeCommonOptions(props),
  type: "sunburst",
  data: plain(props.data),
  innerRadius: props.innerRadius,
  levels: props.levels,
  startAngle: props.startAngle,
  padAngle: props.padAngle,
  cornerRadius: props.cornerRadius,
  labels: props.labels,
  drill: props.drill,
  drillPath: plain(props.drillPath),
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
    drill: (event) => emit("drill", event),
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
