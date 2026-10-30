import type { PropType } from "vue";
import type {
  ChartAnnotation,
  ChartAxisOptions,
  ChartCurve,
  ChartInteractionOptions,
  ChartLegendOptions,
  ChartOptions,
  ChartOrientation,
  ChartPadding,
  ChartRendererPreference,
  ChartSeries,
  ChartTooltipOptions,
  ShapeChartCommonOptions,
  ShapeDatum,
  ShapeLegendOptions,
  ShapeTooltipOptions,
} from "minerva-design/charts/core";

// Booleans and boolean unions default to `undefined` (not Vue's `false`) so
// the engine defaults apply when they are omitted.

/** Size and update props of every chart component */
export const chartFrameProps = {
  /** Height of the chart (the legend included); numbers are pixels, strings any CSS length */
  height: [Number, String] as PropType<number | string>,
  /** Width of the chart; numbers are pixels (default `100%`) */
  width: [Number, String] as PropType<number | string>,
  /**
   * Also follows in-place mutations of nested data (`series[0].data.push()`);
   * by default the chart updates when a prop is replaced (cheaper on large data)
   */
  deep: { type: Boolean, default: false },
};

/** Props shared by the cartesian chart components (engine `createChart`) */
export const chartCommonProps = {
  ...chartFrameProps,
  /** Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`) */
  renderer: String as PropType<ChartRendererPreference>,
  /** Legend; shown by default when several series have a name */
  legend: {
    type: [Boolean, Object] as PropType<boolean | ChartLegendOptions>,
    default: undefined,
  },
  /** Tooltip; `false` disables it */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | ChartTooltipOptions>,
    default: undefined,
  },
  /** Vertical guide line following the pointer */
  crosshair: { type: Boolean, default: undefined },
  /** Background areas and reference lines */
  annotations: Array as PropType<readonly ChartAnnotation[]>,
  /** Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`) */
  interaction: {
    type: [Boolean, Object] as PropType<boolean | ChartInteractionOptions>,
    default: undefined,
  },
  /** Space around the plot area, in pixels */
  padding: Object as PropType<ChartPadding>,
  /** Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette: Array as PropType<readonly string[]>,
  /** Accessible name of the chart */
  ariaLabel: String,
  /** BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default */
  locale: String,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<ChartOptions["labels"]>,
};

/** X / Y axes */
export const chartAxisProps = {
  /** X axis */
  xAxis: Object as PropType<ChartAxisOptions>,
  /** Y axis */
  yAxis: Object as PropType<ChartAxisOptions>,
};

/** Data series */
export const chartSeriesProps = {
  /** Data series (replace the array or a `data` array to update the chart) */
  series: { type: Array as PropType<readonly ChartSeries[]>, required: true },
} as const;

/** Orientation of the bars, boxes and steps */
export const chartOrientationProp = {
  /** `horizontal` puts the x axis (categories) down the left side and the values along the bottom (default `vertical`) */
  orientation: String as PropType<ChartOrientation>,
};

/** Right value axis */
export const chartAxis2Prop = {
  /** Right value axis of the series with `yAxis: "right"`; its range is aligned on the left ticks (vertical charts) */
  yAxis2: Object as PropType<ChartAxisOptions>,
};

/** Stacking of the line, area and bar charts */
export const chartStackProps = {
  /** Stacks the series on top of each other (default `false`) */
  stacked: { type: Boolean, default: false },
  /** Scales the stacks to 100% (implies `stacked`; default `false`) */
  percent: { type: Boolean, default: false },
};

/** Shape of the lines */
export const chartCurveProp = {
  /** Shape of the lines: straight, smooth (monotone) or steps */
  curve: String as PropType<ChartCurve>,
};

/** Props shared by the shape chart components (engine `createShapeChart`) */
export const shapeCommonProps = {
  ...chartFrameProps,
  /** Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette: Array as PropType<readonly string[]>,
  /** Legend; clicking an item hides / shows its slice, stage or series (shown by default for pie, donut, funnel and multi-series radar charts) */
  legend: {
    type: [Boolean, Object] as PropType<boolean | ShapeLegendOptions>,
    default: undefined,
  },
  /** Tooltip; `false` disables it (default `true`) */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | ShapeTooltipOptions>,
    default: undefined,
  },
  /** Formats the values of the labels and the tooltip (default: compact numbers, 1.2k, 3.4M) */
  format: Function as PropType<(value: number) => string>,
  /** Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 (default: one decimal, "40.0%") */
  percentFormat: Function as PropType<(share: number) => string>,
  /**
   * Hidden slices / stages / radar series / top-level treemap nodes, by
   * index. Makes the visibility controlled: legend clicks then only emit
   * `toggle`, whose `hiddenIndexes` should be stored and passed back.
   */
  hidden: Array as PropType<readonly number[]>,
  /** Entry and update animations, skipped when the user prefers reduced motion (default `true`) */
  animation: { type: Boolean, default: undefined },
  /** Space around the drawing, in pixels (default 8 on every side) */
  padding: Object as PropType<ChartPadding>,
  /** Accessible name of the chart (default: the chart type, e.g. "Donut chart") */
  ariaLabel: String,
  /** BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the page language by default */
  locale: String,
  /** Replaces built-in texts of the `locale` (tooltip rows, accessible names, "No data") */
  texts: Object as PropType<ShapeChartCommonOptions["texts"]>,
};

/** Props of PieChart and DonutChart (besides the common ones) */
export const pieProps = {
  /** Slices: a name, a value (negative values count as 0) and an optional color */
  data: { type: Array as PropType<readonly ShapeDatum[]>, required: true },
  /** Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut (default 0, DonutChart 0.62) */
  innerRadius: Number,
  /** Angle of the first slice, degrees clockwise from 12 o'clock (default 0) */
  startAngle: Number,
  /** Gap between the slices, in pixels (default 1, donut 2) */
  padAngle: Number,
  /** Corner radius of the slices, in pixels (default 0, donut 4) */
  cornerRadius: Number,
  /** Nightingale rose: the radius (instead of the angle) shows the value */
  rose: { type: Boolean, default: undefined },
  /** Slice labels: `outside` with leader lines, `inside` the slices, or none (default `outside` up to 12 slices) */
  labels: String as PropType<"outside" | "inside" | "none">,
  /** What a label shows: name, value, percent (default `["name", "percent"]`) */
  labelContent: Array as PropType<readonly ("name" | "value" | "percent")[]>,
  /** Big text in the hole of a donut (e.g. the total) */
  centerValue: String,
  /** Small text under `centerValue` */
  centerLabel: String,
} as const;
