<script setup lang="ts">
import type { PropType } from "vue";
import {
  histogramSeries,
  type ChartSeries,
  type HistogramBinning,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart, withSeriesType } from "./cartesian";
import { raw } from "./engine";
import { chartAxisProps, chartCommonProps } from "./props";

/**
 * Histogram: the distribution of raw samples in bins of equal width
 * (Freedman-Diaconis, Sturges or a count); millions of samples are binned
 * in milliseconds
 */
defineOptions({ name: "HistogramChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  /** Raw samples (typed arrays are counted without copies) */
  values: {
    type: Object as PropType<ArrayLike<number>>,
    required: true,
  },
  /** Number of bins, or the rule choosing it: `auto`, `sturges`, `freedman-diaconis` (default `auto`) */
  bins: [Number, String] as PropType<HistogramBinning>,
  /** Range covered by the bins (values outside are not counted); the data range by default */
  domain: Array as unknown as PropType<readonly [number, number]>,
  /** Rounds the bin width to 1, 2 or 5 × 10^k and aligns the edges on it */
  nice: { type: Boolean, default: true },
  /** Name of the counts (legend, tooltip; default "Count") */
  name: String,
  /** Bar color (any CSS color) */
  color: String,
  /** Formats the edges of the bins in the tooltip */
  formatBin: Function as PropType<(value: number) => string>,
  /** More series drawn over the bins (e.g. a density `line`) */
  series: Array as PropType<readonly ChartSeries[]>,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) bins changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A bin was clicked */
  pointClick: [event: ChartHoverEvent];
  /** The plot area was clicked where there is no bin */
  plotClick: [event: ChartPlotClickEvent];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useCartesianChart(
  props,
  () =>
    engineOptions(props, [
      histogramSeries(raw(props.values), {
        bins: props.bins,
        domain: raw(props.domain),
        nice: props.nice,
        name: props.name,
        color: props.color,
        format: props.formatBin,
      }),
      ...withSeriesType(props.series ?? [], "line"),
    ]),
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
