<script setup lang="ts">
import type { PropType } from "vue";
import {
  boxplotData,
  type BoxplotGroup,
  type ChartSeries,
  type ChartHoverEvent,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
} from "minerva-design/charts/core";
import { engineOptions, useCartesianChart, withSeriesType } from "./cartesian";
import { raw } from "./engine";
import {
  chartAxisProps,
  chartCommonProps,
  chartOrientationProp,
} from "./props";

/**
 * Box plot: medians, quartiles, whiskers and outliers of samples, from raw
 * values (`groups`) or computed statistics (`series`)
 */
defineOptions({ name: "BoxPlotChart" });
const props = defineProps({
  ...chartCommonProps,
  ...chartAxisProps,
  ...chartOrientationProp,
  /** Series of box plots: data points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers` */
  series: Array as PropType<readonly ChartSeries[]>,
  /** Raw samples, one box each (an alternative to `series`) */
  groups: Array as PropType<readonly BoxplotGroup[]>,
  /** Name of the series built from `groups` */
  name: { type: String, default: "Values" },
  /** Reach of the whiskers in interquartile ranges beyond the box (Tukey: 1.5); `minmax` extends them to the extremes */
  whisker: [Number, String] as PropType<number | "minmax">,
  /** Outliers drawn as rings of the series color or as filled dots; series may set their own (default `hollow`) */
  outlierShape: String as PropType<"hollow" | "filled">,
  /** Diameter of the outliers in CSS pixels (default 7) */
  outlierSize: Number,
});
const emit = defineEmits<{
  /** The hovered (or keyboard-focused) boxes changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A box was clicked */
  pointClick: [event: ChartHoverEvent];
  /** The plot area was clicked where there is no box */
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
        [
          ...(props.groups?.length
            ? [
                {
                  id: "boxplot",
                  name: props.name,
                  data: boxplotData(raw(props.groups), {
                    whisker: props.whisker,
                  }),
                },
              ]
            : []),
          ...(props.series ?? []),
        ],
        "boxplot",
      ).map((s) =>
        s.type === "boxplot"
          ? {
              ...s,
              outlierShape: s.outlierShape ?? props.outlierShape,
              outlierSize: s.outlierSize ?? props.outlierSize,
            }
          : s,
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
