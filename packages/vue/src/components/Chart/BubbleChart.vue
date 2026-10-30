<script setup lang="ts">
import {
  bubbleSeries,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart, withSeriesType } from "./cartesian";
import { chartAxisProps, chartCommonProps, chartSeriesProps } from "./props";

/**
 * Bubble chart: x, y and a value sized by area (√value diameters)
 */
defineOptions({ name: "BubbleChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartSeriesProps,
  /** Diameter in pixels of the smallest bubbles (default 6) */
  minSize: Number,
  /** Diameter in pixels of the largest value (default 48) */
  maxSize: Number,
  /** Value drawn with `maxSize` (share a scale between charts); the largest value by default */
  maxValue: Number,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) bubbles changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A bubble was clicked */
  pointClick: [event: ChartHoverEvent];
  /** The plot area was clicked where there is no bubble */
  plotClick: [event: ChartPlotClickEvent];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useCartesianChart(
  props,
  () =>
    engineOptions(
      props,
      bubbleSeries(withSeriesType(props.series, "scatter"), {
        minSize: props.minSize,
        maxSize: props.maxSize,
        maxValue: props.maxValue,
      }),
    ),
  {
    hover: (event) => emit("hover", event),
    click: (event) => emit("pointClick", event),
    plotClick: (event) => emit("plotClick", event),
    zoom: (view) => emit("zoom", view),
    renderer: (renderer) => emit("rendererChange", renderer),
  },
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
