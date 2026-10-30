import type { PropType } from "vue";
import type {
  BulletDatum,
  CalendarDate,
  CalendarDatum,
  CanvasShapeChartInstance,
  ChartPadding,
  ChordGroup,
  ChordLink,
  GaugeBand,
  RadarIndicator,
  RadarSeries,
  RadialBarDatum,
  SankeyLink,
  SankeyNode,
  ShapeChartLabels,
  ShapeChartOptions,
  ShapeDatum,
  ShapeLegendOptions,
  ShapeTooltipOptions,
  TreemapNode,
} from "@minerva/charts/canvas";

export type {
  BulletDatum,
  CalendarDate,
  CalendarDatum,
  CanvasShapeChartInstance,
  ChordGroup,
  ChordLink,
  GaugeBand,
  RadarIndicator,
  RadarSeries,
  RadialBarDatum,
  SankeyLink,
  SankeyNode,
  ShapeChartLabels,
  ShapeChartOptions,
  ShapeChartType,
  ShapeDatum,
  ShapeDrillEvent,
  ShapeHoverEvent,
  ShapeLegendOptions,
  ShapeToggleEvent,
  ShapeTooltipOptions,
  TreemapNode,
} from "@minerva/charts/canvas";

/** Imperative handle of the shape chart components (template `ref`) */
export interface ShapeChartHandle {
  /** The underlying canvas chart (`toggle`, `getHidden`, `clearHover`...), `null` until the canvas is ready */
  getInstance(): CanvasShapeChartInstance | null;
  /** Measures the canvas again (after a layout change the chart cannot see) */
  resize(): void;
}

// Booleans default to `undefined` (not Vue's `false`) so the engine
// defaults apply when they are omitted.

/** Size and scrolling of every shape chart */
export const shapeFrameProps = {
  /** Height of the chart (the legend included); numbers are pixels, strings any CSS length (rpx included) */
  height: { type: [Number, String] as PropType<number | string>, default: 320 },
  /** Width of the chart; numbers are pixels */
  width: {
    type: [Number, String] as PropType<number | string>,
    default: "100%",
  },
  /** Keeps the page from scrolling while a finger moves on the chart */
  disableScroll: { type: Boolean, default: undefined },
};

/** Props shared by PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart and TreemapChart */
export const shapeCommonProps = {
  ...shapeFrameProps,
  /** Colors of the marks without `color` (defaults to the `--chart-series-1..8` tokens) */
  palette: Array as PropType<readonly string[]>,
  /** Legend; tapping an item hides / shows its slice, stage or series */
  legend: {
    type: [Boolean, Object] as PropType<boolean | ShapeLegendOptions>,
    default: undefined,
  },
  /** Tooltip drawn on the canvas; `false` disables it (`render` may return a string) */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | ShapeTooltipOptions>,
    default: undefined,
  },
  /** Formats the values of the labels and the tooltip (compact numbers by default) */
  format: Function as PropType<(value: number) => string>,
  /** Formats the shares (0-1) of the labels and the tooltip (one decimal by default) */
  percentFormat: Function as PropType<(share: number) => string>,
  /** Hidden entries by index (controlled: legend taps then only emit `toggle`) */
  hidden: Array as PropType<readonly number[]>,
  /** Entry and update animations (default `true`) */
  animation: { type: Boolean, default: undefined },
  /** Space around the drawing, in pixels (default 8 on every side) */
  padding: Object as PropType<ChartPadding>,
  /** Accessible name of the chart (default: the chart type, e.g. "Donut chart") */
  ariaLabel: String,
  /**
   * Locale of the built-in texts and of the numbers (tooltip rows, "No data").
   * Mini-programs have no `<html lang>`: pass the app language (default: the
   * system language when the runtime has `navigator.language`, else English)
   */
  locale: String,
  /** Overrides of the built-in texts of the `locale` */
  texts: Object as PropType<Partial<ShapeChartLabels>>,
};

/** Props of PieChart / DonutChart (besides the common ones) */
export const pieChartProps = {
  /** Slices: a name, a value and an optional color */
  data: { type: Array as PropType<readonly ShapeDatum[]>, required: true },
  /** Inner radius as a fraction of the outer radius: 0 = pie (DonutChart: 0.62) */
  innerRadius: Number,
  /** Angle of the first slice, degrees clockwise from 12 o'clock */
  startAngle: Number,
  /** Gap between the slices, in pixels */
  padAngle: Number,
  /** Corner radius of the slices, in pixels */
  cornerRadius: Number,
  /** Nightingale rose: the radius shows the value */
  rose: { type: Boolean, default: undefined },
  /** Slice labels: outside with leader lines, inside the slices, or none */
  labels: String as PropType<"outside" | "inside" | "none">,
  /** What a label shows: name, value, percent */
  labelContent: Array as PropType<readonly ("name" | "value" | "percent")[]>,
  /** Big text in the hole of a donut */
  centerValue: String,
  /** Small text under `centerValue` */
  centerLabel: String,
} as const;

/** Props of RadarChart (besides the common ones) */
export const radarChartProps = {
  /** Axes of the chart, clockwise from 12 o'clock */
  indicators: {
    type: Array as PropType<readonly RadarIndicator[]>,
    required: true,
  },
  /** Polygons: one value per indicator */
  series: { type: Array as PropType<readonly RadarSeries[]>, required: true },
  /** Grid shape (default "polygon") */
  shape: String as PropType<"polygon" | "circle">,
  /** Number of grid rings (default 4) */
  levels: Number,
  /** Dots on the vertices (default `true`) */
  dots: { type: Boolean, default: undefined },
} as const;

/** Props of GaugeChart (besides the common ones) */
export const gaugeChartProps = {
  /** Value shown by the arc */
  value: { type: Number, required: true },
  /** Value at the start of the arc (default 0) */
  min: Number,
  /** Value at the end of the arc (default 100) */
  max: Number,
  /** Caption under the value */
  label: String,
  /** Total angle of the arc, degrees (default 240) */
  sweep: Number,
  /** Thickness of the arc as a fraction of the radius (default 0.16) */
  thickness: Number,
  /** Colored ranges of the track */
  bands: Array as PropType<readonly GaugeBand[]>,
  /** Color of the value arc (when there are no bands) */
  color: String,
  /** Draws a needle (default `false`) */
  needle: { type: Boolean, default: undefined },
  /** Tick labels at the ends and at the band bounds (default `true`) */
  ticks: { type: Boolean, default: undefined },
} as const;

/** Props of FunnelChart (besides the common ones) */
export const funnelChartProps = {
  /** Stages: a name, a value and an optional color */
  data: { type: Array as PropType<readonly ShapeDatum[]>, required: true },
  /** Order of the stages (default "none": data order) */
  sort: String as PropType<"descending" | "ascending" | "none">,
  /** Vertical gap between the stages, in pixels (default 4) */
  gap: Number,
  /** Shows the conversion rate from the previous stage (default `true`) */
  conversion: { type: Boolean, default: undefined },
  /** Trapezoids that narrow to the next stage, or centered bars */
  shape: String as PropType<"trapezoid" | "bar">,
} as const;

/** Props of TreemapChart (besides the common ones) */
export const treemapChartProps = {
  /** Nodes: leaves carry a value, parents sum their children */
  data: { type: Array as PropType<readonly TreemapNode[]>, required: true },
  /** Gap between the cells, in pixels (default 2) */
  gap: Number,
  /** Draws the names of the parents above their children (default `true`) */
  headers: { type: Boolean, default: undefined },
} as const;

/** Props of SankeyChart (besides the common ones) */
export const sankeyChartProps = {
  /** Nodes, in their initial order; nodes only named by a link are appended */
  nodes: Array as PropType<readonly SankeyNode[]>,
  /** Flows between the nodes (by name or index); links closing a cycle are ignored */
  links: { type: Array as PropType<readonly SankeyLink[]>, required: true },
  /** Width of the node bars, in pixels (default 12) */
  nodeWidth: Number,
  /** Vertical gap between the nodes of a column, in pixels (default 12) */
  nodePadding: Number,
  /** Column of the nodes without a `column` (default "justify") */
  align: String as PropType<"justify" | "left" | "right" | "center">,
  /** Relaxation passes that straighten the flows (default 32) */
  iterations: Number,
  /** Color of the links without `color` (default "gradient") */
  linkColor: String as PropType<"gradient" | "source" | "target" | "neutral">,
  /** Opacity of the links, 0-1 (default 0.4) */
  linkOpacity: Number,
  /** Node labels (default `true`) */
  labels: { type: Boolean, default: undefined },
  /** Shows the value after the name in the labels (default `true`) */
  labelValues: { type: Boolean, default: undefined },
} as const;

/** Props of SunburstChart (besides the common ones) */
export const sunburstChartProps = {
  /** Nodes: leaves carry a value, parents sum their children */
  data: { type: Array as PropType<readonly TreemapNode[]>, required: true },
  /** Radius of the center circle as a fraction of the outer radius (default 0.26) */
  innerRadius: Number,
  /** Rings shown at once below the focused node (default every level) */
  levels: Number,
  /** Angle of the first node, degrees clockwise from 12 o'clock (default 0) */
  startAngle: Number,
  /** Gap between the sectors, in pixels (default 1) */
  padAngle: Number,
  /** Corner radius of the sectors, in pixels (default 2) */
  cornerRadius: Number,
  /** Sector labels (default "auto") */
  labels: String as PropType<"auto" | "tangential" | "radial" | "none">,
  /** Tapping a parent zooms into it, the center goes back up (default `true`) */
  drill: { type: Boolean, default: undefined },
  /** Names from the root to the focused node; makes the drill-down controlled (listen to `drill`) */
  drillPath: Array as PropType<readonly string[]>,
} as const;

/** Props of RadialBarChart (besides the common ones) */
export const radialBarChartProps = {
  /** Bars, from the outermost ring inward: a name, a value, an optional `max` and color */
  data: { type: Array as PropType<readonly RadialBarDatum[]>, required: true },
  /** Value of a full bar for the data without `max` (default the largest value) */
  max: Number,
  /** Radius of the innermost ring's inner edge, as a fraction of the outer radius (default 0.3) */
  innerRadius: Number,
  /** Angle where the bars start, degrees clockwise from 12 o'clock (default 0) */
  startAngle: Number,
  /** Angle of a full bar, degrees (default 270) */
  sweep: Number,
  /** Gap between the rings, as a fraction of a ring's slot (default 0.28) */
  gap: Number,
  /** Background tracks behind the bars (default `true`) */
  track: { type: Boolean, default: undefined },
  /** Rounded bar ends (default `true`) */
  rounded: { type: Boolean, default: undefined },
  /** Labels before the start of the bars */
  labels: { type: Boolean, default: undefined },
  /** What a label shows: name, value, percent (default ["name", "value"]) */
  labelContent: Array as PropType<readonly ("name" | "value" | "percent")[]>,
  /** Big text in the center */
  centerValue: String,
  /** Small text under `centerValue` */
  centerLabel: String,
} as const;

/** Props of CalendarHeatmap (besides the common ones) */
export const calendarHeatmapProps = {
  /** Daily values (several entries of the same day add up) */
  data: { type: Array as PropType<readonly CalendarDatum[]>, required: true },
  /** Days shown: a year (`2026`) or an inclusive `[start, end]` range */
  range: [Number, Array] as PropType<
    number | readonly [CalendarDate, CalendarDate]
  >,
  /** `weeks` (default) or `months` */
  layout: String as PropType<"weeks" | "months">,
  /** First day of the week, 0 = Sunday … 6 = Saturday (default from `locale`) */
  weekStart: Number,
  /** BCP 47 locale of the month and weekday names and of the tooltip dates */
  locale: String,
  /** Color of the highest level (default the first palette color) */
  color: String,
  /** Colors of the levels, lowest first */
  colors: Array as PropType<readonly string[]>,
  /** Number of color levels above the empty days (default 4) */
  levels: Number,
  /** Upper bounds of the levels but the last, ascending */
  thresholds: Array as PropType<readonly number[]>,
  /** Gap between the cells, in pixels (default 3) */
  gap: Number,
  /** Corner radius of the cells, in pixels (default 2) */
  radius: Number,
  /** Largest cell size, in pixels (default 16 weeks, 28 months) */
  maxCellSize: Number,
  /** Month names around the cells (default `true`) */
  monthLabels: { type: Boolean, default: undefined },
  /** Weekday names beside or above the cells (default `true`) */
  weekdayLabels: { type: Boolean, default: undefined },
} as const;

/** Props of BulletChart (besides the common ones) */
export const bulletChartProps = {
  /** Rows (columns when vertical): name, value, target, ranges and scale */
  data: { type: Array as PropType<readonly BulletDatum[]>, required: true },
  /** Horizontal rows (default) or vertical columns */
  orientation: String as PropType<"horizontal" | "vertical">,
  /** Qualitative ranges of the rows without `ranges`: upper bounds, ascending */
  ranges: Array as PropType<readonly number[]>,
  /** Names of the qualitative ranges, lowest first (tooltip) */
  rangeLabels: Array as PropType<readonly string[]>,
  /** Colors of the qualitative ranges, lowest first */
  rangeColors: Array as PropType<readonly string[]>,
  /** Thickness of the value bar as a fraction of the ranges' thickness (default 0.4) */
  barSize: Number,
  /** Color of the target markers (default the text color) */
  targetColor: String,
  /** Tick labels of the scales (default `true`) */
  ticks: { type: Boolean, default: undefined },
} as const;

/** Props of ChordChart (besides the common ones) */
export const chordChartProps = {
  /** Groups (names or `{ name, color }`) in their order around the circle; groups only named by `links` are appended */
  groups: Array as PropType<readonly (string | ChordGroup)[]>,
  /** Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent) */
  matrix: Array as PropType<readonly (readonly number[])[]>,
  /** Flows as a list (by group name or index); takes precedence over `matrix` */
  links: Array as PropType<readonly ChordLink[]>,
  /** One ribbon per direction, arcs sized by the outgoing plus the incoming flows (default `false`) */
  directed: { type: Boolean, default: undefined },
  /** Arrowheads at the target end of the ribbons (default `true` when `directed`) */
  arrows: { type: Boolean, default: undefined },
  /** Gap between the groups, in degrees (default 2) */
  padAngle: Number,
  /** Angle of the first group, degrees clockwise from 12 o'clock (default 0) */
  startAngle: Number,
  /** Order of the groups around the circle (default "none") */
  sortGroups: String as PropType<"none" | "ascending" | "descending">,
  /** Order of the ribbon ends along an arc (default "auto": fewest crossings) */
  sortSubgroups: String as PropType<
    "auto" | "none" | "ascending" | "descending"
  >,
  /** Color of the ribbons without `color` (default "gradient") */
  ribbonColor: String as PropType<"gradient" | "source" | "target" | "neutral">,
  /** Opacity of the ribbons, 0-1 (default 0.65) */
  ribbonOpacity: Number,
  /** Thickness of the group arcs, in pixels (default 6% of the radius, 8-18 px) */
  arcWidth: Number,
  /** Value ticks outside the arcs; a number sets the step (default `true` when large enough) */
  ticks: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: undefined,
  },
  /** Formats the tick labels (default compact numbers of the `locale`) */
  tickFormat: Function as PropType<(value: number) => string>,
  /** Group labels along the arc or the radius (default "auto") */
  labels: String as PropType<"auto" | "tangential" | "radial" | "none">,
} as const;

/** Height computed from the type and the data when the `height` prop is omitted */
export const autoHeightProp = {
  /** Height of the chart; numbers are pixels, strings any CSS length (rpx included); computed from the type / data by default */
  height: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
} as const;

/** Props of ShapeChart (any shape type of the engine) */
export const shapeChartProps = {
  ...shapeFrameProps,
  /** Options of the chart, by `type` (pie, radar, gauge, funnel, treemap...) */
  options: { type: Object as PropType<ShapeChartOptions>, required: true },
} as const;
