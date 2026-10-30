<script setup lang="ts">
import { computed } from "vue";
import type {
  GaugeChartOptions,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "@minerva/charts/canvas";
import { plain } from "./chart-canvas";
import { gaugeChartProps, shapeCommonProps } from "./shape-chart-types";
import { shapeCommonOptions, useCanvasShapeChart } from "./shape-chart-canvas";
const props = defineProps({
  ...shapeCommonProps,
  /** Height of the chart; numbers are pixels, strings any CSS length (rpx included) */
  height: { ...shapeCommonProps.height, default: 240 },
  ...gaugeChartProps,
});
const emit = defineEmits<{
  hover: [event: ShapeHoverEvent | null];
  click: [event: ShapeHoverEvent];
  toggle: [event: ShapeToggleEvent];
}>();
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
  () => props,
  (): GaugeChartOptions => ({
    ...shapeCommonOptions(props),
    type: "gauge",
    value: props.value,
    min: props.min,
    max: props.max,
    label: props.label,
    sweep: props.sweep,
    thickness: props.thickness,
    bands: plain(props.bands),
    color: props.color,
    needle: props.needle,
    ticks: props.ticks,
  }),
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
