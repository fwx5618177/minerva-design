<script setup lang="ts">
import { computed } from "vue";
import type {
  ShapeChartOptions,
  ShapeDrillEvent,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "@minerva/charts/canvas";
import { plain } from "./chart-canvas";
import { shapeChartProps } from "./shape-chart-types";
import { shapeDefaultHeight, useCanvasShapeChart } from "./shape-chart-canvas";
const props = defineProps({
  ...shapeChartProps,
  /** Height of the chart (default 320; gauges 240, radial bars 300, sankey and sunburst 360, calendars and bullets from the data); numbers are pixels, strings any CSS length (rpx included) */
  height: {
    type: [Number, String] as import("vue").PropType<number | string>,
    default: undefined,
  },
});
const emit = defineEmits<{
  hover: [event: ShapeHoverEvent | null];
  click: [event: ShapeHoverEvent];
  toggle: [event: ShapeToggleEvent];
  drill: [event: ShapeDrillEvent];
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
  () => ({
    width: props.width,
    height: props.height ?? shapeDefaultHeight(props.options),
  }),
  // a plain copy: nested changes of the options are tracked
  (): ShapeChartOptions => plain(props.options),
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
