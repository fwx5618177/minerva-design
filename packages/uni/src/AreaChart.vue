<script setup lang="ts">
// Area chart: smooth by default, stacked or 100% stacked
import { computed } from "vue";
import type {
  ChartHoverEvent,
  ChartPlotClickEvent,
  ChartView,
} from "@minerva/charts/canvas";
import {
  areaChartProps,
  chartAxisProps,
  chartCommonProps,
  chartSeriesProps,
} from "./chart-types";
import { useCanvasChart } from "./chart-canvas";
import { areaChartOptions } from "./named-chart-options";
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartSeriesProps,
  ...areaChartProps,
});
const emit = defineEmits<{
  hover: [event: ChartHoverEvent | null];
  pointClick: [event: ChartHoverEvent];
  plotClick: [event: ChartPlotClickEvent];
  zoom: [view: ChartView];
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
} = useCanvasChart(
  () => props,
  () => areaChartOptions(props),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("pointClick", event),
    plotClick: (event) => emit("plotClick", event),
    zoom: (view) => emit("zoom", view),
  },
);
const scrollLocked = computed(() => props.disableScroll ?? false);
defineExpose(handle);
</script>
<template>
  <view ref="root" class="mn-chart mn-uni-chart" :style="rootStyle"
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
