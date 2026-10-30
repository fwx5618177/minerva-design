<script setup lang="ts">
import type {
  ChartHoverEvent,
  ChartPlotClickEvent,
  ChartRendererKind,
  ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart, withSeriesType } from "./cartesian";
import {
  chartAxisProps,
  chartCommonProps,
  chartOrientationProp,
  chartSeriesProps,
  chartStackProps,
} from "./props";

/** Bar chart: grouped side by side, stacked or 100% stacked, with optional value labels */
defineOptions({ name: "BarChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartSeriesProps,
  ...chartStackProps,
  ...chartOrientationProp,
  /** Writes the value above every bar (default `false`) */
  labels: { type: Boolean, default: false },
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) bars changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A bar was clicked */
  pointClick: [event: ChartHoverEvent];
  /** The plot area was clicked where there is no bar */
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
      withSeriesType(
        props.series,
        "bar",
        props.stacked || props.percent ? "stack" : undefined,
      ).map((s) =>
        props.labels && s.type === "bar"
          ? { ...s, showLabels: s.showLabels ?? true }
          : s,
      ),
      props.percent ? "percent" : undefined,
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
