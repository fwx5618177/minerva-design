<script setup lang="ts">
import type {
  ChartHoverEvent,
  ChartPlotClickEvent,
  ChartRendererKind,
  ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart, withSeriesType } from "./cartesian";
import { chartAxisProps, chartCommonProps, chartSeriesProps } from "./props";

/** Scatter chart: zooms on both axes, hit testing through a spatial index */
defineOptions({ name: "ScatterChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartSeriesProps,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) points changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A point was clicked */
  pointClick: [event: ChartHoverEvent];
  /** The plot area was clicked where there is no point */
  plotClick: [event: ChartPlotClickEvent];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useCartesianChart(
  props,
  () => engineOptions(props, withSeriesType(props.series, "scatter")),
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
