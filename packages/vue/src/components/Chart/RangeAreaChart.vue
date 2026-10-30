<script setup lang="ts">
import type { PropType } from "vue";
import {
  type ChartCurve,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart, withSeriesType } from "./cartesian";
import { chartAxisProps, chartCommonProps, chartSeriesProps } from "./props";

/**
 * Range area chart: bands between a lower (`y0`) and an upper edge
 * (confidence intervals, min-max ranges), mixable with lines
 */
defineOptions({ name: "RangeAreaChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartSeriesProps,
  /** Shape of the edges: straight, smooth (monotone) or steps */
  curve: { type: String as PropType<ChartCurve>, default: "smooth" },
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
  () =>
    engineOptions(
      props,
      withSeriesType(props.series, "area", undefined, props.curve).map((s) =>
        s.type === "area" ? { ...s, lineWidth: s.lineWidth ?? 1.5 } : s,
      ),
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
