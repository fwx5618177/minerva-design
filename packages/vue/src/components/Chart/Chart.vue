<script setup lang="ts">
import type { PropType } from "vue";
import type {
  ChartHoverEvent,
  ChartPlotClickEvent,
  ChartRendererKind,
  ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart, withSeriesType } from "./cartesian";
import {
  chartAxis2Prop,
  chartAxisProps,
  chartCommonProps,
  chartOrientationProp,
  chartSeriesProps,
} from "./props";

/**
 * GPU chart (WebGPU, then WebGL2, WebGL, Canvas2D) mixing line, area, bar,
 * scatter, candlestick and heatmap series; zoomable, keyboard accessible and
 * themed by the Minerva CSS variables (the engine of
 * `minerva-design/charts/core`).
 */
defineOptions({ name: "Chart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartSeriesProps,
  ...chartAxis2Prop,
  ...chartOrientationProp,
  /** `percent` scales every stack to 100% at each x (default `normal`) */
  stackMode: String as PropType<"normal" | "percent">,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) points changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A point (or a bar) was clicked */
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
  () =>
    engineOptions(
      props,
      // raw series (line is also the engine's default type)
      withSeriesType(props.series, "line"),
      props.stackMode,
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
