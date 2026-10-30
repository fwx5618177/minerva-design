import type { PropType } from "vue";
import type {
  BinOptions,
  BoxplotGroup,
  BoxplotStatsOptions,
  CanvasChartInstance,
  ChartAnnotation,
  ChartAxisOptions,
  ChartInteractionOptions,
  ChartLegendOptions,
  ChartOrientation,
  ChartPadding,
  ChartSeries,
  ChartTooltipOptions,
  ChartView,
  GanttTask,
  HeatmapCell,
  QuadrantAxisLabels,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegions,
  WaterfallStep,
} from "@minerva/charts/canvas";

export type {
  BoxplotGroup,
  GanttTask,
  HeatmapCell,
  WaterfallStep,
  CanvasChartInstance,
  ChartAnnotation,
  ChartAxisOptions,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInteractionOptions,
  ChartLegendOptions,
  ChartPadding,
  ChartPlotClickEvent,
  ChartSeries,
  ChartSeriesData,
  ChartTooltipOptions,
  ChartView,
  QuadrantAxisLabels,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegion,
  QuadrantRegions,
} from "@minerva/charts/canvas";

/** Imperative handle of the chart components (template `ref`) */
export interface ChartHandle {
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range, `null` until the canvas is ready */
  getView(): ChartView | null;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** Always `canvas2d` once the canvas is ready, `null` before */
  getRenderer(): "canvas2d" | null;
  /** The underlying canvas chart, `null` until the canvas is ready */
  getInstance(): CanvasChartInstance | null;
  /** Measures the canvas again (after a layout change the chart cannot see) */
  resize(): void;
}

/** Where a dragged QuadrantChart point was dropped */
export interface QuadrantDropTarget {
  /** Data coordinates of the drop */
  x: number;
  y: number;
  /** Quadrant of the drop, as seen on screen */
  quadrant: QuadrantCorner;
}

// Booleans and boolean unions default to `undefined` (not Vue's `false`) so
// the engine defaults apply when they are omitted.

/** Props shared by every chart component */
export const chartCommonProps = {
  /** Height of the chart (the legend included); numbers are pixels, strings any CSS length (rpx included) */
  height: { type: [Number, String] as PropType<number | string>, default: 320 },
  /** Width of the chart; numbers are pixels */
  width: {
    type: [Number, String] as PropType<number | string>,
    default: "100%",
  },
  /** Legend; shown by default when several series have a name */
  legend: {
    type: [Boolean, Object] as PropType<boolean | ChartLegendOptions>,
    default: undefined,
  },
  /** Tooltip; `false` disables it (`render` may return a string) */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | ChartTooltipOptions>,
    default: undefined,
  },
  /** Vertical guide line following the finger */
  crosshair: { type: Boolean, default: undefined },
  /** Background areas and reference lines */
  annotations: Array as PropType<readonly ChartAnnotation[]>,
  /** Pinch zoom, pan, double tap reset; `false` makes the chart static */
  interaction: {
    type: [Boolean, Object] as PropType<boolean | ChartInteractionOptions>,
    default: undefined,
  },
  /** Space around the plot area, in pixels */
  padding: Object as PropType<ChartPadding>,
  /** Series colors (defaults to the theme colors) */
  palette: Array as PropType<readonly string[]>,
  /** Accessible name of the chart */
  ariaLabel: String,
  /** Keeps the page from scrolling while a finger moves on the chart */
  disableScroll: { type: Boolean, default: undefined },
};

/** X / Y axes (every chart but QuadrantChart) */
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

/** Props of QuadrantChart (besides the common ones) */
export const quadrantChartProps = {
  /** Points to place (replace the array to update the chart) */
  points: { type: Array as PropType<readonly QuadrantPoint[]>, required: true },
  /** Range of the horizontal axis (default `[0, 10]`) */
  xDomain: Array as unknown as PropType<[number, number]>,
  /** Range of the vertical axis (default `[0, 10]`) */
  yDomain: Array as unknown as PropType<[number, number]>,
  /** X value of the vertical divider (the middle of `xDomain` by default) */
  xSplit: Number,
  /** Y value of the horizontal divider (the middle of `yDomain` by default) */
  ySplit: Number,
  /** Titles and colors of the quadrants */
  quadrants: Object as PropType<QuadrantRegions>,
  /** Title of the horizontal axis */
  xLabel: String,
  /** Title of the vertical axis */
  yLabel: String,
  /** Texts at the ends of the dividers, drawn inside the plot */
  axisLabels: Object as PropType<QuadrantAxisLabels>,
  /** Shows the numeric ticks of the axes (default `true`) */
  showTicks: { type: Boolean, default: undefined },
  /** Reverses the horizontal axis */
  reverseX: { type: Boolean, default: undefined },
  /** Draws the labels next to the dots (default `true`) */
  showLabels: { type: Boolean, default: undefined },
  /** Dot diameter in pixels (default 12) */
  pointSize: Number,
  /** Name of the points in the tooltip */
  name: String,
  /** Lets the user drag the dots (default: when a `pointDrop` listener is set) */
  draggable: { type: Boolean, default: undefined },
} as const;

/** Shape of lines and area edges */
const curveProp = String as PropType<"linear" | "smooth" | "step">;

/** Props of AreaChart (besides the common, axis and series ones) */
export const areaChartProps = {
  /** Shape of the edges (default "smooth") */
  curve: curveProp,
  /** Stacks the areas on top of each other */
  stacked: { type: Boolean, default: false },
  /** Scales the stacks to 100% (implies `stacked`) */
  percent: { type: Boolean, default: false },
} as const;

/** Props of HorizontalBarChart (besides the common, axis and series ones) */
export const horizontalBarChartProps = {
  /** Stacks the bars of every series */
  stacked: { type: Boolean, default: false },
  /** Scales the stacks to 100% (implies `stacked`) */
  percent: { type: Boolean, default: false },
  /** Writes the value at the end of every bar */
  labels: { type: Boolean, default: false },
} as const;

/** Props of RangeAreaChart (besides the common, axis and series ones) */
export const rangeAreaChartProps = {
  /** Shape of the edges (default "smooth") */
  curve: curveProp,
} as const;

/** Props of MixedChart (besides the common, axis and series ones) */
export const mixedChartProps = {
  /** Right value axis of the series with `yAxis: "right"` */
  yAxis2: Object as PropType<ChartAxisOptions>,
  /** `percent` scales every stack to 100% at each x (default "normal") */
  stackMode: String as PropType<"normal" | "percent">,
  /** `horizontal` puts the categories down the left side (default "vertical") */
  orientation: String as PropType<ChartOrientation>,
} as const;

/** Props of BubbleChart (besides the common, axis and series ones) */
export const bubbleChartProps = {
  /** Diameter in pixels of the smallest bubbles (default 6) */
  minSize: Number,
  /** Diameter in pixels of the largest bubbles (default 48) */
  maxSize: Number,
  /** Value drawn at `maxSize` (default the largest value) */
  maxValue: Number,
} as const;

/** Props of HeatmapChart (besides the common and axis ones) */
export const heatmapChartProps = {
  /** Cells: a column, a row and a value */
  data: { type: Array as PropType<readonly HeatmapCell[]>, required: true },
  /** Column names in order (collected from the data when omitted) */
  xCategories: Array as PropType<readonly string[]>,
  /** Row names from bottom to top (collected from the data when omitted) */
  yCategories: Array as PropType<readonly string[]>,
  /** Colors from the lowest to the highest value */
  colorScale: Array as PropType<readonly string[]>,
  /** Values at the ends of the color scale (default the data range) */
  valueRange: Array as unknown as PropType<readonly [number, number]>,
  /** Name of the value in the tooltip */
  name: String,
  /** Corner radius of the cells, in pixels */
  radius: Number,
  /** Formats the values in the tooltip */
  format: Function as PropType<(value: number) => string>,
} as const;

/** Props of Sparkline (besides the tooltip / palette / ariaLabel ones) */
export const sparklineProps = {
  /** Values (or `[x, y]` pairs) */
  data: {
    type: [Array, Object] as PropType<ChartSeries["data"]>,
    required: true,
  },
  /** How the values are drawn (default "line") */
  type: String as PropType<"line" | "area" | "bar">,
  /** Color (any CSS color) */
  color: String,
  /** Shape of the line (default "smooth") */
  curve: curveProp,
  /** Name shown in the tooltip */
  name: String,
  /** Draws a reference line at this value */
  reference: Number,
  /** Formats the value in the tooltip */
  format: Function as PropType<(value: number) => string>,
  /** Height of the sparkline; numbers are pixels */
  height: { type: [Number, String] as PropType<number | string>, default: 48 },
} as const;

/** Props of HistogramChart (besides the common and axis ones) */
export const histogramChartProps = {
  /** Raw samples */
  values: {
    type: [Array, Object] as PropType<ArrayLike<number>>,
    required: true,
  },
  /** Number of bins or the rule choosing it (default "auto") */
  bins: [Number, String] as PropType<BinOptions["bins"]>,
  /** Range binned (default the data range) */
  domain: Array as unknown as PropType<readonly [number, number]>,
  /** Rounds the bin edges (default `true`) */
  nice: { type: Boolean, default: undefined },
  /** Name of the counts (default "Count") */
  name: String,
  /** Bar color */
  color: String,
  /** Formats the edges of the bins in the tooltip */
  formatBin: Function as PropType<(value: number) => string>,
  /** More series drawn over the bins (e.g. a density `line`) */
  series: Array as PropType<readonly ChartSeries[]>,
} as const;

/** Props of BoxPlotChart (besides the common and axis ones) */
export const boxPlotChartProps = {
  /** Series of box plots (computed statistics) */
  series: Array as PropType<readonly ChartSeries[]>,
  /** Raw samples, one box each (an alternative to `series`) */
  groups: Array as PropType<readonly BoxplotGroup[]>,
  /** Name of the series built from `groups` (default "Values") */
  name: String,
  /** Reach of the whiskers in interquartile ranges, or "minmax" (default 1.5) */
  whisker: [Number, String] as PropType<BoxplotStatsOptions["whisker"]>,
  /** `horizontal` lays the boxes out in rows (default "vertical") */
  orientation: String as PropType<ChartOrientation>,
} as const;

/** Props of WaterfallChart (besides the common and axis ones) */
export const waterfallChartProps = {
  /** Changes, subtotals and totals, in order */
  steps: { type: Array as PropType<readonly WaterfallStep[]>, required: true },
  /** Name of the series (tooltip) */
  name: String,
  /** Color of the increases */
  upColor: String,
  /** Color of the decreases */
  downColor: String,
  /** Color of the totals and subtotals */
  totalColor: String,
  /** Value the first change starts from (default 0) */
  start: Number,
  /** Writes the change (or the total) at the end of every bar */
  labels: { type: Boolean, default: true },
  /** Formats the values (labels, tooltip) */
  format: Function as PropType<(value: number) => string>,
  /** Locale of the default name */
  locale: String,
  /** `horizontal` lays the steps out in rows (default "vertical") */
  orientation: String as PropType<ChartOrientation>,
} as const;

/** Props of GanttChart (besides the common and axis ones) */
export const ganttChartProps = {
  /** Tasks and milestones, from top to bottom */
  tasks: { type: Array as PropType<readonly GanttTask[]>, required: true },
  /** Colors of the groups in order of appearance */
  colors: Array as PropType<readonly string[]>,
  /** Name of the tasks without a group */
  taskName: String,
  /** Name of the progress bars */
  progressName: String,
  /** Name of the milestones */
  milestoneName: String,
  /** Formats the progress shares (tooltip) */
  formatProgress: Function as PropType<(share: number) => string>,
  /** Locale of the default names and of the progress shares */
  locale: String,
  /** Draws a line at this date (`true`: now) */
  today: {
    type: [Boolean, Number, Date] as PropType<boolean | number | Date>,
    default: false,
  },
  /** Label of the today line */
  todayLabel: String,
} as const;

/** Frame props of Sparkline (no axes, legend, zoom or annotations) */
export const sparklineFrameProps = {
  width: chartCommonProps.width,
  tooltip: chartCommonProps.tooltip,
  palette: chartCommonProps.palette,
  ariaLabel: chartCommonProps.ariaLabel,
  disableScroll: chartCommonProps.disableScroll,
};
