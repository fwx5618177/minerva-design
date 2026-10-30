<script setup lang="ts">
import { computed } from "vue";
import type {
  BulletChartOptions,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "@minerva/charts/canvas";
import { plain } from "./chart-canvas";
import {
  autoHeightProp,
  shapeCommonProps,
  bulletChartProps,
} from "./shape-chart-types";
import {
  shapeCommonOptions,
  shapeDefaultHeight,
  useCanvasShapeChart,
} from "./shape-chart-canvas";
const props = defineProps({
  ...shapeCommonProps,
  ...bulletChartProps,
  ...autoHeightProp,
});
const emit = defineEmits<{
  hover: [event: ShapeHoverEvent | null];
  click: [event: ShapeHoverEvent];
  toggle: [event: ShapeToggleEvent];
}>();
const options = computed((): BulletChartOptions => ({
  ...shapeCommonOptions(props),
  type: "bullet",
  data: plain(props.data),
  orientation: props.orientation,
  ranges: plain(props.ranges),
  rangeLabels: plain(props.rangeLabels),
  rangeColors: plain(props.rangeColors),
  barSize: props.barSize,
  targetColor: props.targetColor,
  ticks: props.ticks,
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
