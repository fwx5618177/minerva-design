<script setup lang="ts">
import type { PropType } from "vue";
import {
  heatmapChartOptions,
  type ChartColorScheme,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
  type HeatmapCell,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart } from "./cartesian";
import { raw } from "./engine";
import { chartAxisProps, chartCommonProps } from "./props";

/** Heatmap: a grid of cells colored by value (categories or numbers on both axes) */
defineOptions({ name: "HeatmapChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  /** Cells `{ x, y, value }` */
  data: { type: Array as PropType<readonly HeatmapCell[]>, required: true },
  /** Column names in order (collected from the data when omitted) */
  xCategories: Array as PropType<readonly string[]>,
  /** Row names from bottom to top (collected from the data when omitted) */
  yCategories: Array as PropType<readonly string[]>,
  /** Colors from the lowest to the highest value (interpolated in OKLab), or a built-in theme-aware ramp of the first palette color (default `sequential`) */
  colorScale: [Array, String] as PropType<readonly string[] | ChartColorScheme>,
  /** Values at the ends of the color scale; the data range by default */
  valueRange: Array as unknown as PropType<readonly [number, number]>,
  /** Value at the middle of the color scale (diverging data; default 0 for `diverging` ramps spanning it, else the middle of the range) */
  colorMidpoint: Number,
  /** Name of the value in the tooltip */
  name: String,
  /** Corner radius of the cells, in pixels */
  radius: Number,
  /** Formats the values in the tooltip */
  format: Function as PropType<(value: number) => string>,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) cell changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A cell was clicked */
  pointClick: [event: ChartHoverEvent];
  /** The plot area was clicked where there is no cell */
  plotClick: [event: ChartPlotClickEvent];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();
const { setContainer, rootStyle, handle } = useCartesianChart(
  props,
  () =>
    heatmapChartOptions(
      {
        data: raw(props.data),
        xCategories: raw(props.xCategories),
        yCategories: raw(props.yCategories),
        colorScale: raw(props.colorScale),
        valueRange: raw(props.valueRange),
        colorMidpoint: props.colorMidpoint,
        name: props.name,
        radius: props.radius,
        format: props.format,
      },
      engineOptions(props, []),
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
