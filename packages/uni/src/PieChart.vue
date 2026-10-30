<script setup lang="ts">
import { computed } from "vue";
import type {
  PieChartOptions,
  ShapeHoverEvent,
  ShapeToggleEvent,
} from "@minerva/charts/canvas";
import { plain } from "./chart-canvas";
import { pieChartProps, shapeCommonProps } from "./shape-chart-types";
import { shapeCommonOptions, useCanvasShapeChart } from "./shape-chart-canvas";
const props = defineProps({ ...shapeCommonProps, ...pieChartProps });
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
  (): PieChartOptions => ({
    ...shapeCommonOptions(props),
    type: "pie",
    data: plain(props.data),
    innerRadius: props.innerRadius ?? 0,
    startAngle: props.startAngle,
    padAngle: props.padAngle,
    cornerRadius: props.cornerRadius,
    rose: props.rose,
    labels: props.labels,
    labelContent: plain(props.labelContent),
    centerValue: props.centerValue,
    centerLabel: props.centerLabel,
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
