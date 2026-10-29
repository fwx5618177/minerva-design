<script setup lang="ts">
import { computed } from "vue";
import {
  scatterSeries,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartView,
} from "@minerva/charts/canvas";
import {
  chartAxisProps,
  chartCommonProps,
  chartSeriesProps,
} from "./chart-types";
import {
  chartEngineOptions,
  plainSeries,
  useCanvasChart,
} from "./chart-canvas";
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartSeriesProps,
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
  handle,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
} = useCanvasChart(
  () => props,
  () => chartEngineOptions(props, scatterSeries(plainSeries(props.series))),
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
      :aria-label="props.ariaLabel"
      style="display: block; width: 100%; height: 100%"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchCancel"
  /></view>
</template>
