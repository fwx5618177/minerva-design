<script setup lang="ts">
import type { PropType } from "vue";
import {
  sparklineOptions,
  type ChartCurve,
  type ChartHoverEvent,
  type ChartOptions,
  type ChartRendererPreference,
  type ChartSeries,
  type ChartTooltipOptions,
} from "minerva-design/charts/core";
import { useCartesianChart } from "./cartesian";
import { raw } from "./engine";
import { chartFrameProps } from "./props";

/** Word-sized chart without axes: a trend in a table cell, a KPI card, ... */
defineOptions({ name: "Sparkline" });
const props = defineProps({
  ...chartFrameProps,
  /** Values (or `[x, y]` pairs, typed arrays, ...) */
  data: {
    type: [Array, Object] as PropType<ChartSeries["data"]>,
    required: true,
  },
  /** How the values are drawn (default `line`) */
  type: String as PropType<"line" | "area" | "bar">,
  /** Color (any CSS color); the first palette color by default */
  color: String,
  /** Shape of the line (default `smooth`) */
  curve: String as PropType<ChartCurve>,
  /** Name shown in the tooltip */
  name: String,
  /** Draws a reference line at this value (e.g. a target or the average) */
  reference: Number,
  /** Formats the value in the tooltip */
  format: Function as PropType<(value: number) => string>,
  /** Backend of the data layer (default `auto`) */
  renderer: String as PropType<ChartRendererPreference>,
  /** Tooltip; `false` disables it */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | ChartTooltipOptions>,
    default: undefined,
  },
  /** Colors (defaults to the `--chart-series-1..8` CSS variables) */
  palette: Array as PropType<readonly string[]>,
  /** Accessible name of the chart */
  ariaLabel: String,
  /** BCP 47 locale of the texts and numbers the engine writes (tooltip, accessible name); the page language by default */
  locale: String,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<ChartOptions["labels"]>,
});
const emit = defineEmits<{
  /** The hovered value changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
}>();
const { setContainer, rootStyle, handle } = useCartesianChart(
  props,
  () =>
    sparklineOptions(
      {
        data: raw(props.data),
        type: props.type,
        color: props.color,
        curve: props.curve,
        name: props.name,
        reference: props.reference,
        format: props.format,
      },
      {
        renderer: props.renderer,
        tooltip: raw(props.tooltip),
        palette: raw(props.palette),
        ariaLabel: props.ariaLabel,
        locale: props.locale,
        labels: raw(props.labels),
      },
    ),
  { hover: (event) => emit("hover", event) },
  48,
);
defineExpose(handle);
</script>

<template>
  <div class="mn-chart mn-sparkline" data-minerva="chart" :style="rootStyle">
    <div :ref="setContainer" style="position: absolute; inset: 0"></div>
  </div>
</template>
