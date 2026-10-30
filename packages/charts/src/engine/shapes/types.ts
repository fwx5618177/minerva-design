// Public types of the shape charts: pie / donut, radar, gauge, funnel,
// treemap, sankey, sunburst, radial bar, calendar heatmap and bullet. They
// have no cartesian axes and few marks, so they are drawn with Canvas2D
// (crisp text, arcs and polygons) by the same code in the browser
// (createShapeChart) and on any 2D canvas (createCanvasShapeChart).

import type { ChartPadding } from "../types";

/** Kind of shape chart */
export type ShapeChartType =
  | "pie"
  | "radar"
  | "gauge"
  | "funnel"
  | "treemap"
  | "sankey"
  | "sunburst"
  | "radialBar"
  | "calendarHeatmap"
  | "bullet";

/** A named value (pie slice, funnel stage) */
export interface ShapeDatum {
  /** Name shown in the legend, the labels and the tooltip */
  name: string;
  /** Value (negative values count as 0) */
  value: number;
  /** Color (any CSS color, `var(--x)` included); the palette when omitted */
  color?: string;
}

/** Legend of a shape chart */
export interface ShapeLegendOptions {
  /**
   * Legend position
   * @default "bottom"
   */
  position?: "top" | "bottom";
  /**
   * Clicking an item hides / shows its slice, stage or series
   * @default true
   */
  toggle?: boolean;
}

/** What the pointer is over */
export interface ShapeHoverEvent {
  /**
   * Index of the slice / stage / series / leaf (treemap: in the flattened
   * leaves; sunburst: of the node, in depth-first order; sankey: of the node,
   * or the number of nodes + the link index for a link; calendar heatmap:
   * days since the first day shown; radial bar / bullet: of the datum)
   */
  index: number;
  /** Radar: index of the indicator closest to the pointer */
  indicator?: number;
  /** Name of the mark (sankey link: "source → target"; calendar heatmap: the formatted date) */
  name: string;
  /** Value of the mark */
  value: number;
  /**
   * Share, 0-1 (pie: of the visible total, funnel: of the first stage,
   * treemap / sunburst: of the root, gauge: of the range, radial bar: of the
   * bar's max, bullet: of the target (else of the scale), sankey: of the
   * flow entering the diagram (links: of the source node), calendar heatmap:
   * of the largest day)
   */
  percent: number;
  /** Resolved CSS color of the mark */
  color: string;
  /** Treemap / sunburst: names from the root to the node */
  path?: string[];
  /** Calendar heatmap: day of the cell, `YYYY-MM-DD` */
  date?: string;
  /** Sankey: name of the source node of the hovered link */
  source?: string;
  /** Sankey: name of the target node of the hovered link */
  target?: string;
}

/** Tooltip of a shape chart */
export interface ShapeTooltipOptions {
  /** Renders the tooltip content (a string is set as text) */
  render?: (event: ShapeHoverEvent) => string | Node | null;
}

/**
 * Texts the shape charts write themselves (tooltip rows, accessible names,
 * placeholder); `{name}`, `{label}` and `{index}` are replaced
 */
export interface ShapeChartLabels {
  /** Placeholder of a chart without data */
  noData: string;
  /** Tooltip row: the value of the mark */
  value: string;
  /** Tooltip row: share of the total (pie, treemap, sunburst) */
  share: string;
  /** Funnel tooltip row: share of the first stage */
  ofFirstStage: string;
  /** Funnel tooltip row: conversion from the previous stage */
  conversion: string;
  /** Gauge tooltip row: position in the min-max range */
  ofRange: string;
  /** Tooltip row: share of a parent (sunburst) or of a link end (sankey), `Of {name}` */
  ofName: string;
  /** Sankey tooltip row: flow entering a node */
  incoming: string;
  /** Sankey tooltip row: flow leaving a node */
  outgoing: string;
  /** Radial bar tooltip row: the maximum of the bar */
  max: string;
  /** Radial bar tooltip row: value / max */
  progress: string;
  /** Bullet tooltip row: the target */
  target: string;
  /** Bullet tooltip row: value / target */
  ofTarget: string;
  /** Bullet tooltip row: name of the qualitative range of the value */
  range: string;
  /** Name of a radar series without `name`, `Series {index}` (1-based) */
  series: string;
  /** Accessible name of a pie chart */
  pieChart: string;
  /** Accessible name of a donut chart */
  donutChart: string;
  /** Accessible name of a rose chart */
  roseChart: string;
  /** Accessible name of a radar chart */
  radarChart: string;
  /** Accessible name of a gauge without `label` */
  gaugeChart: string;
  /** Accessible name of a gauge with a `label`, `Gauge: {label}` */
  gaugeChartNamed: string;
  /** Accessible name of a funnel chart */
  funnelChart: string;
  /** Accessible name of a treemap */
  treemapChart: string;
  /** Accessible name of a sankey diagram */
  sankeyChart: string;
  /** Accessible name of a sunburst chart */
  sunburstChart: string;
  /** Accessible name of a radial bar chart */
  radialBarChart: string;
  /** Accessible name of a calendar heatmap */
  calendarHeatmap: string;
  /** Accessible name of a bullet chart */
  bulletChart: string;
}

/** Options shared by every shape chart */
export interface ShapeChartCommonOptions {
  /** Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Legend; shown by default for pie, funnel and multi-series radar charts */
  legend?: boolean | ShapeLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | ShapeTooltipOptions;
  /**
   * Formats the values (labels, tooltip)
   * @default compact numbers of the `locale` (1.2k, 3.4M; 1.2万 in Chinese and Japanese)
   */
  format?: (value: number) => string;
  /**
   * Formats the shares (labels, conversion rates, tooltip); `share` is 0-1
   * @default a percent of the `locale` with one decimal, e.g. "40.0%", "40,0 %"
   */
  percentFormat?: (share: number) => string;
  /**
   * BCP 47 locale of the texts and numbers the chart writes (tooltip rows,
   * accessible names, number and percent formats, calendar dates); built-in
   * texts in English, Chinese, Japanese and French (English otherwise)
   * @default the page language (`<html lang>`), else the browser language
   */
  locale?: string;
  /** Replaces built-in texts of the `locale` (tooltip rows, accessible names, "No data") */
  texts?: Partial<ShapeChartLabels>;
  /**
   * Indexes of the hidden slices / stages / radar series / top-level treemap
   * or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar
   * heatmap levels. When set, the chart is controlled: this list wins over
   * the legend state, and legend clicks (or `toggle()`) only emit the
   * `toggle` event, whose `hiddenIndexes` should be passed back here.
   */
  hidden?: readonly number[];
  /**
   * Entry / update animation (skipped when the user prefers reduced motion)
   * @default true
   */
  animation?: boolean;
  /** Space around the drawing, in CSS pixels */
  padding?: ChartPadding;
  /** Accessible name of the chart */
  ariaLabel?: string;
}

/** Pie / donut chart */
export interface PieChartOptions extends ShapeChartCommonOptions {
  type: "pie";
  data: readonly ShapeDatum[];
  /**
   * Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut
   * @default 0
   */
  innerRadius?: number;
  /**
   * Angle of the first slice, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Gap between the slices, in pixels
   * @default 1 (pie), 2 (donut)
   */
  padAngle?: number;
  /**
   * Corner radius of the slices, in pixels
   * @default 0 (pie), 4 (donut)
   */
  cornerRadius?: number;
  /**
   * Nightingale rose: the radius (instead of the angle) shows the value
   * @default false
   */
  rose?: boolean;
  /**
   * Slice labels: `outside` with leader lines, `inside` the slices, or none
   * @default "outside" (up to 12 slices), "none" otherwise
   */
  labels?: "outside" | "inside" | "none";
  /** What a label shows: name, value, percent (combinable) */
  labelContent?: readonly ("name" | "value" | "percent")[];
  /** Big text in the hole of a donut (e.g. the total) */
  centerValue?: string;
  /** Small text under `centerValue` */
  centerLabel?: string;
}

/** An axis of a radar chart */
export interface RadarIndicator {
  name: string;
  /** Value at the rim; the largest value of the series when omitted */
  max?: number;
  /**
   * Value at the center
   * @default 0
   */
  min?: number;
}

/** A polygon of a radar chart */
export interface RadarSeries {
  name?: string;
  /** One value per indicator */
  values: readonly number[];
  color?: string;
  /**
   * Fill opacity, 0-1
   * @default 0.18
   */
  opacity?: number;
}

/** Radar (spider) chart */
export interface RadarChartOptions extends ShapeChartCommonOptions {
  type: "radar";
  indicators: readonly RadarIndicator[];
  series: readonly RadarSeries[];
  /**
   * Grid shape
   * @default "polygon"
   */
  shape?: "polygon" | "circle";
  /**
   * Number of grid rings
   * @default 4
   */
  levels?: number;
  /**
   * Dots on the vertices
   * @default true
   */
  dots?: boolean;
}

/** A colored range of a gauge */
export interface GaugeBand {
  /** Upper bound of the band (the previous band's bound, or `min`, is the lower one) */
  to: number;
  color: string;
}

/** Gauge (speedometer) chart */
export interface GaugeChartOptions extends ShapeChartCommonOptions {
  type: "gauge";
  value: number;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** Caption under the value */
  label?: string;
  /**
   * Total angle of the arc, degrees
   * @default 240
   */
  sweep?: number;
  /**
   * Thickness of the arc as a fraction of the radius
   * @default 0.16
   */
  thickness?: number;
  /** Colored ranges of the track; the value arc takes the color of its band */
  bands?: readonly GaugeBand[];
  /** Color of the value arc (when there are no bands); the first palette color by default */
  color?: string;
  /**
   * Draws a needle in addition to the value arc
   * @default false
   */
  needle?: boolean;
  /**
   * Tick labels at the ends (and at the band bounds)
   * @default true
   */
  ticks?: boolean;
}

/** Funnel chart */
export interface FunnelChartOptions extends ShapeChartCommonOptions {
  type: "funnel";
  data: readonly ShapeDatum[];
  /**
   * Order of the stages
   * @default "none" (data order)
   */
  sort?: "descending" | "ascending" | "none";
  /**
   * Vertical gap between the stages, in pixels
   * @default 4
   */
  gap?: number;
  /**
   * Shows the conversion rate from the previous stage
   * @default true
   */
  conversion?: boolean;
  /**
   * Shape of the stages: trapezoids that narrow to the next stage, or centered bars
   * @default "trapezoid"
   */
  shape?: "trapezoid" | "bar";
}

/** A node of a treemap or a sunburst: leaves carry a value, parents sum their children */
export interface TreemapNode {
  /** Name shown in the cell / sector, the header and the tooltip */
  name: string;
  /** Value of a leaf (parents sum their children) */
  value?: number;
  /** Color; top-level nodes take the palette when omitted, children get shades of their parent's */
  color?: string;
  /** Child nodes */
  children?: readonly TreemapNode[];
}

/** Treemap chart */
export interface TreemapChartOptions extends ShapeChartCommonOptions {
  type: "treemap";
  data: readonly TreemapNode[];
  /**
   * Gap between the cells, in pixels
   * @default 2
   */
  gap?: number;
  /**
   * Draws the names of the parents above their children
   * @default true
   */
  headers?: boolean;
}

/** A node of a sankey diagram */
export interface SankeyNode {
  /** Name shown in the label and the tooltip; links refer to the node by this name (or by index) */
  name: string;
  /** Color of the node (and of the ends of its links); the palette when omitted */
  color?: string;
  /** Column of the node, 0 = leftmost; computed from the links when omitted */
  column?: number;
}

/** A flow between two nodes of a sankey diagram */
export interface SankeyLink {
  /** Source node: its `name`, or its index in `nodes` */
  source: string | number;
  /** Target node: its `name`, or its index in `nodes` */
  target: string | number;
  /** Size of the flow (negative values count as 0) */
  value: number;
  /** Color of the flow; follows `linkColor` when omitted */
  color?: string;
}

/** Sankey diagram: flows between nodes laid out in columns */
export interface SankeyChartOptions extends ShapeChartCommonOptions {
  type: "sankey";
  /** Nodes, in their initial order; nodes only named by a link are appended */
  nodes?: readonly SankeyNode[];
  /** Flows; links that would close a cycle are ignored */
  links: readonly SankeyLink[];
  /**
   * Width of the node bars, in pixels
   * @default 12
   */
  nodeWidth?: number;
  /**
   * Vertical gap between the nodes of a column, in pixels (reduced when space is short)
   * @default 12
   */
  nodePadding?: number;
  /**
   * Column of the nodes without a `column`: `justify` puts the sinks in the
   * last column, `left` / `right` align on the sources / sinks, `center`
   * puts the sources next to their first target
   * @default "justify"
   */
  align?: "justify" | "left" | "right" | "center";
  /**
   * Relaxation passes moving the nodes toward the weighted center of their
   * neighbours, which straightens the flows and reduces crossings
   * @default 32
   */
  iterations?: number;
  /**
   * Color of the links without `color`: a gradient from the source to the
   * target color, one of the two, or a neutral gray
   * @default "gradient"
   */
  linkColor?: "gradient" | "source" | "target" | "neutral";
  /**
   * Opacity of the links, 0-1 (hovered flows are more opaque)
   * @default 0.4
   */
  linkOpacity?: number;
  /**
   * Node labels: the name and the value beside each node (left of the last
   * column, right of the others); overlapping labels are skipped
   * @default true
   */
  labels?: boolean;
  /**
   * Shows the value after the name in the labels
   * @default true
   */
  labelValues?: boolean;
}

/** Sunburst chart: a hierarchy drawn as concentric rings, with drill-down */
export interface SunburstChartOptions extends ShapeChartCommonOptions {
  type: "sunburst";
  /** Nodes: leaves carry a value, parents sum their children */
  data: readonly TreemapNode[];
  /**
   * Radius of the center circle as a fraction of the outer radius
   * @default 0.26
   */
  innerRadius?: number;
  /**
   * Rings shown at once below the focused node (fewer when they would be thinner than 18 px)
   * @default every level
   */
  levels?: number;
  /**
   * Angle of the first node, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Gap between the sectors, in pixels
   * @default 1
   */
  padAngle?: number;
  /**
   * Corner radius of the sectors, in pixels
   * @default 2
   */
  cornerRadius?: number;
  /**
   * Sector labels: `auto` writes each name along the arc or along the
   * radius, whichever fits best; labels that do not fit are shortened or skipped
   * @default "auto"
   */
  labels?: "auto" | "tangential" | "radial" | "none";
  /**
   * Clicking (or Enter on) a parent zooms into it; clicking the center goes back up
   * @default true
   */
  drill?: boolean;
  /**
   * Names from the root to the focused node (`[]` = the root). When set,
   * the drill-down is controlled: clicks (or `drill()`) only emit the
   * `drill` event, whose `path` should be passed back here.
   */
  drillPath?: readonly string[];
}

/** A bar of a radial bar chart */
export interface RadialBarDatum extends ShapeDatum {
  /** Value of a full bar (e.g. a goal); the chart's `max` when omitted */
  max?: number;
}

/** Radial bar chart: concentric progress rings / circular bars */
export interface RadialBarChartOptions extends ShapeChartCommonOptions {
  type: "radialBar";
  /** Bars, from the outermost ring inward */
  data: readonly RadialBarDatum[];
  /**
   * Value of a full bar for the data without `max`
   * @default the largest value
   */
  max?: number;
  /**
   * Radius of the innermost ring's inner edge, as a fraction of the outer radius
   * @default 0.3
   */
  innerRadius?: number;
  /**
   * Angle where the bars start, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Angle of a full bar, degrees (360 = full rings)
   * @default 270
   */
  sweep?: number;
  /**
   * Gap between the rings, as a fraction of a ring's slot (0-0.9)
   * @default 0.28
   */
  gap?: number;
  /**
   * Background tracks behind the bars
   * @default true
   */
  track?: boolean;
  /**
   * Rounded bar ends
   * @default true
   */
  rounded?: boolean;
  /**
   * Labels before the start of the bars (in the empty part of the circle)
   * @default true when `sweep` leaves room for them (up to 300°)
   */
  labels?: boolean;
  /**
   * What a label shows: name, value, percent of the bar's max (combinable)
   * @default ["name", "value"]
   */
  labelContent?: readonly ("name" | "value" | "percent")[];
  /** Big text in the center (e.g. the overall completion) */
  centerValue?: string;
  /** Small text under `centerValue` */
  centerLabel?: string;
}

/** A day: a `YYYY-MM-DD` string, a `Date` or a timestamp (local calendar day) */
export type CalendarDate = string | number | Date;

/** Value of a day of a calendar heatmap */
export interface CalendarDatum {
  /** Day of the value (several entries of the same day add up) */
  date: CalendarDate;
  /** Value of the day (negative values count as 0) */
  value: number;
}

/** Calendar heatmap: daily values on a calendar (contributions-style) */
export interface CalendarHeatmapOptions extends ShapeChartCommonOptions {
  type: "calendarHeatmap";
  /** Daily values */
  data: readonly CalendarDatum[];
  /**
   * Days shown: a year (`2026`) or an inclusive `[start, end]` range
   * @default the 53 weeks ending on the last day of the data
   */
  range?: number | readonly [CalendarDate, CalendarDate];
  /**
   * `weeks`: a column per week and a row per weekday (one strip per year
   * when the range spans several years); `months`: a small calendar per month
   * @default "weeks"
   */
  layout?: "weeks" | "months";
  /**
   * First day of the week, 0 = Sunday … 6 = Saturday
   * @default from `locale` (e.g. Sunday for en-US and ja-JP, Monday for fr-FR and zh-CN)
   */
  weekStart?: number;
  /**
   * BCP 47 locale of the month and weekday names, of the dates of the
   * tooltip, of the default `weekStart` and of the built-in texts
   * @default the page language (`<html lang>`), else the browser language
   */
  locale?: string;
  /** Color of the highest level (lower levels are lighter); the first palette color by default */
  color?: string;
  /** Colors of the levels, lowest first (replaces `color` and sets the number of levels) */
  colors?: readonly string[];
  /**
   * Number of color levels above the empty days
   * @default 4
   */
  levels?: number;
  /**
   * Upper bounds of the levels but the last, ascending (`[2, 5, 10]`: 1-2,
   * 3-5, 6-10, more); an even split of the largest value by default
   */
  thresholds?: readonly number[];
  /**
   * Gap between the cells, in pixels
   * @default 3
   */
  gap?: number;
  /**
   * Corner radius of the cells, in pixels
   * @default 2
   */
  radius?: number;
  /**
   * Largest cell size, in pixels (cells shrink to fit the width)
   * @default 16 (weeks), 28 (months)
   */
  maxCellSize?: number;
  /**
   * Month names (and years) around the cells
   * @default true
   */
  monthLabels?: boolean;
  /**
   * Weekday names beside (weeks) or above (months) the cells
   * @default true
   */
  weekdayLabels?: boolean;
}

/** A row of a bullet chart */
export interface BulletDatum {
  /** Name of the measure */
  name: string;
  /** Small text under the name (unit, period) */
  subtitle?: string;
  /** Current value, drawn as the bar */
  value: number;
  /** Target, drawn as the marker */
  target?: number;
  /** Upper bounds of the qualitative ranges, ascending (e.g. poor / fair / good); the chart's `ranges` when omitted */
  ranges?: readonly number[];
  /**
   * Start of the scale
   * @default 0 (or the smallest value when negative)
   */
  min?: number;
  /** End of the scale; the largest of the ranges, the value and the target when omitted */
  max?: number;
  /** Color of the bar; the palette when omitted */
  color?: string;
}

/** Bullet chart: KPI bars against qualitative ranges and a target */
export interface BulletChartOptions extends ShapeChartCommonOptions {
  type: "bullet";
  /** Rows (columns when vertical) */
  data: readonly BulletDatum[];
  /**
   * Horizontal rows or vertical columns
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /** Qualitative ranges of the rows without `ranges`: upper bounds, ascending */
  ranges?: readonly number[];
  /** Names of the qualitative ranges, lowest first (tooltip) */
  rangeLabels?: readonly string[];
  /** Colors of the qualitative ranges, lowest first; shades of gray by default */
  rangeColors?: readonly string[];
  /**
   * Thickness of the value bar as a fraction of the ranges' thickness
   * @default 0.4
   */
  barSize?: number;
  /**
   * Color of the target markers
   * @default the text color
   */
  targetColor?: string;
  /**
   * Tick labels of the scales (when there is room)
   * @default true
   */
  ticks?: boolean;
}

/** Options of a shape chart, by `type` */
export type ShapeChartOptions =
  | PieChartOptions
  | RadarChartOptions
  | GaugeChartOptions
  | FunnelChartOptions
  | TreemapChartOptions
  | SankeyChartOptions
  | SunburstChartOptions
  | RadialBarChartOptions
  | CalendarHeatmapOptions
  | BulletChartOptions;

/** A legend item was clicked (or `toggle()` was called) */
export interface ShapeToggleEvent {
  /** Index of the toggled entry (slice, stage, series, top-level node, sankey node, bar, row or level) */
  index: number;
  /** Whether that entry is (or, in a controlled chart, would be) hidden */
  hidden: boolean;
  /** Every hidden index after the toggle, ascending */
  hiddenIndexes: number[];
}

/** Events of a shape chart */
export interface ShapeChartEventMap {
  hover: ShapeHoverEvent | null;
  click: ShapeHoverEvent;
  /**
   * Legend click or `toggle()` call. Uncontrolled charts emit it after
   * hiding / showing the entry; with the `hidden` option nothing changes
   * until the new `hiddenIndexes` are passed back.
   */
  toggle: ShapeToggleEvent;
  /**
   * Sunburst: a parent or the center was clicked (or `drill()` was called).
   * Uncontrolled charts emit it after zooming; with the `drillPath` option
   * nothing changes until the new `path` is passed back.
   */
  drill: ShapeDrillEvent;
}

/** The focused node of a sunburst changed (or, when controlled, would change) */
export interface ShapeDrillEvent {
  /** Names from the root to the new focused node (`[]` = the root) */
  path: string[];
}

/** Shape chart created by `createShapeChart` */
export interface ShapeChartInstance {
  /** Replaces the options (animates from the previous values) */
  setOptions(options: ShapeChartOptions): void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Reads the CSS variables again (theme changes on `<html>` / `<body>` are detected automatically) */
  refreshTheme(): void;
  /**
   * Hides / shows a slice, stage, radar series or top-level treemap node by
   * index and emits `toggle` (with the `hidden` option: only emits `toggle`)
   */
  toggle(index: number): void;
  /** Indexes of the hidden entries, ascending */
  getHidden(): number[];
  /**
   * Sunburst: zooms into the node at `path` (names from the root, `[]` =
   * the root) and emits `drill` (with the `drillPath` option: only emits `drill`)
   */
  drill(path: readonly string[]): void;
  /** Sunburst: names from the root to the focused node (`[]` = the root) */
  getDrillPath(): string[];
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof ShapeChartEventMap>(
    type: K,
    listener: (event: ShapeChartEventMap[K]) => void,
  ): () => void;
  /** Removes the DOM */
  destroy(): void;
}
