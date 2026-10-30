<script setup lang="ts">
import type { PropType } from "vue";
import {
  waterfallSeries,
  type WaterfallStep,
  type ChartConnectorOptions,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart } from "./cartesian";
import { raw } from "./engine";
import {
  chartAxisProps,
  chartCommonProps,
  chartOrientationProp,
} from "./props";

/**
 * Waterfall (bridge) chart: how changes take a value from a start to an
 * end, with subtotals and totals (P&L bridges, budget variances)
 */
defineOptions({ name: "WaterfallChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartOrientationProp,
  /** Changes, subtotals and totals, in order */
  steps: { type: Array as PropType<readonly WaterfallStep[]>, required: true },
  /** Name of the series (tooltip; default "Change") */
  name: String,
  /** Color of the increases (the success color by default) */
  upColor: String,
  /** Color of the decreases (the danger color by default) */
  downColor: String,
  /** Color of the totals and subtotals (the primary color by default) */
  totalColor: String,
  /** Value the first change starts from (default 0) */
  start: Number,
  /** Writes the change (or the total) at the end of every bar */
  labels: { type: Boolean, default: true },
  /** Formats the values (labels, tooltip) */
  format: Function as PropType<(value: number) => string>,
  /** Thin lines from the end of every bar to the next one; an object styles them (default `true`: dashed, secondary text color) */
  connector: {
    type: [Boolean, Object] as PropType<boolean | ChartConnectorOptions>,
    default: undefined,
  },
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
    engineOptions(props, [
      waterfallSeries(raw(props.steps), {
        name: props.name,
        upColor: props.upColor,
        downColor: props.downColor,
        totalColor: props.totalColor,
        start: props.start,
        labels: props.labels,
        format: props.format,
        connector: raw(props.connector),
        locale: props.locale,
      }),
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
