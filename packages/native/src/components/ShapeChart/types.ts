import type { ReactNode, Ref } from "react";
import type { DimensionValue, StyleProp, ViewStyle } from "react-native";
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
  ShapeDrillEvent,
  ShapeHoverEvent,
  ShapeLegendOptions,
  ShapeToggleEvent,
  ShapeTooltipOptions,
  TreemapNode,
} from "@minerva/charts/canvas";

export type {
  BulletDatum,
  CalendarDate,
  CalendarDatum,
  ChordGroup,
  ChordLink,
  GaugeBand,
  RadarIndicator,
  RadarSeries,
  RadialBarDatum,
  SankeyLink,
  SankeyNode,
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

/** Imperative handle of the shape chart components (`ref`) */
export interface ShapeChartHandle {
  /** The platform-free engine instance drawing the chart (`toggle`, `getHidden`, `clearHover`...) */
  getInstance(): CanvasShapeChartInstance | null;
}

/** Props of every shape chart that are not chart options */
export interface ShapeChartFrameProps {
  /**
   * Height of the chart (the legend included)
   * @default 320 (GaugeChart: 240, RadialBarChart: 300, SankeyChart and SunburstChart: 360, ChordChart: 420, CalendarHeatmap and BulletChart: from the data)
   */
  height?: DimensionValue;
  /**
   * Width of the chart
   * @default "100%"
   */
  width?: DimensionValue;
  /** Called when the highlighted mark changes (press and drag over the chart) */
  onHover?: (event: ShapeHoverEvent | null) => void;
  /** Called when a mark is tapped */
  onClick?: (event: ShapeHoverEvent) => void;
  /**
   * Called when a legend item is tapped (or the instance's `toggle()` is
   * called), with the toggled index and every hidden index after the toggle
   */
  onToggle?: (event: ShapeToggleEvent) => void;
  /** React content of the tooltip (replaces the default content) */
  renderTooltip?: (event: ShapeHoverEvent) => ReactNode;
  /** Styles of the root view */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the root view */
  testID?: string;
  /** Imperative handle */
  ref?: Ref<ShapeChartHandle>;
}

/** Props shared by every named shape chart (PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap, BulletChart and ChordChart) */
export interface ShapeChartCommonProps extends ShapeChartFrameProps {
  /** Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors) */
  palette?: readonly string[];
  /**
   * Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level
   * @default shown for pie, donut, funnel, multi-series radar charts, calendar heatmaps and radial bar charts without labels
   */
  legend?: boolean | ShapeLegendOptions;
  /**
   * Tooltip shown while a mark is pressed; `false` disables it
   * @default true
   */
  tooltip?: boolean | ShapeTooltipOptions;
  /**
   * Formats the values of the labels and the tooltip
   * @default compact numbers (1.2k, 3.4M)
   */
  format?: (value: number) => string;
  /**
   * Formats the shares (labels, conversion rates, tooltip); `share` is 0-1
   * @default one decimal, e.g. "40.0%"
   */
  percentFormat?: (share: number) => string;
  /**
   * Hidden slices / stages / radar series / top-level treemap or sunburst
   * nodes / sankey nodes / radial bars / bullet rows / calendar levels, by
   * index. Makes the visibility controlled: legend taps then only call
   * `onToggle`, whose `hiddenIndexes` should be stored and passed back.
   */
  hidden?: readonly number[];
  /**
   * Entry and update animations (skipped when the theme reduces motion)
   * @default true
   */
  animation?: boolean;
  /**
   * Space around the drawing, in pixels
   * @default 8 on every side
   */
  padding?: ChartPadding;
  /**
   * Accessible name of the chart
   * @default the chart type in its locale, e.g. "Donut chart" (a gauge: "Gauge: {label}")
   */
  ariaLabel?: string;
  /**
   * BCP 47 locale of the built-in texts (tooltip rows, accessible names, "No data") and of the numbers
   * @default the runtime's default locale, else English
   */
  locale?: string;
  /** Replaces built-in texts of the `locale` */
  texts?: Partial<ShapeChartLabels>;
}

/** Props of PieChart */
export interface PieChartProps extends ShapeChartCommonProps {
  /** Slices: a name, a value (negative values count as 0) and an optional color */
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
  /**
   * What a label shows: name, value, percent (combinable)
   * @default ["name", "percent"]
   */
  labelContent?: readonly ("name" | "value" | "percent")[];
  /** Big text in the hole of a donut (e.g. the total) */
  centerValue?: string;
  /** Small text under `centerValue` */
  centerLabel?: string;
}

/** Props of DonutChart: a PieChart with a hole */
export interface DonutChartProps extends PieChartProps {
  /**
   * Inner radius as a fraction of the outer radius
   * @default 0.62
   */
  innerRadius?: number;
}

/** Props of RadarChart */
export interface RadarChartProps extends ShapeChartCommonProps {
  /** Axes of the chart, clockwise from 12 o'clock */
  indicators: readonly RadarIndicator[];
  /** Polygons: one value per indicator */
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

/** Props of GaugeChart */
export interface GaugeChartProps extends ShapeChartCommonProps {
  /**
   * Value shown by the arc (clamped to `min` - `max` for the drawing)
   * @default 0
   */
  value?: number;
  /**
   * Value at the start of the arc
   * @default 0
   */
  min?: number;
  /**
   * Value at the end of the arc
   * @default 100
   */
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
  /**
   * Color of the value arc (when there are no bands)
   * @default the first palette color
   */
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

/** Props of FunnelChart */
export interface FunnelChartProps extends ShapeChartCommonProps {
  /** Stages: a name, a value and an optional color */
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

/** Props of TreemapChart */
export interface TreemapChartProps extends ShapeChartCommonProps {
  /** Nodes: leaves carry a value, parents sum their children */
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

/** Props of SankeyChart */
export interface SankeyChartProps extends ShapeChartCommonProps {
  /** Nodes, in their initial order; nodes only named by a link are appended */
  nodes?: readonly SankeyNode[];
  /** Flows between the nodes (by name or index); links closing a cycle are ignored */
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
   * Relaxation passes that straighten the flows and reduce crossings
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
   * Opacity of the links, 0-1 (pressed flows are more opaque)
   * @default 0.4
   */
  linkOpacity?: number;
  /**
   * Node labels (name and value); overlapping labels are skipped
   * @default true
   */
  labels?: boolean;
  /**
   * Shows the value after the name in the labels
   * @default true
   */
  labelValues?: boolean;
}

/** Props of SunburstChart */
export interface SunburstChartProps extends ShapeChartCommonProps {
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
   * Tapping a parent zooms into it; tapping the center goes back up
   * @default true
   */
  drill?: boolean;
  /**
   * Names from the root to the focused node (`[]` = the root). Makes the
   * drill-down controlled: taps then only call `onDrill`, whose `path`
   * should be stored and passed back.
   */
  drillPath?: readonly string[];
  /** Called when a parent or the center is tapped (or the instance's `drill()` is called) */
  onDrill?: (event: ShapeDrillEvent) => void;
}

/** Props of RadialBarChart */
export interface RadialBarChartProps extends ShapeChartCommonProps {
  /** Bars, from the outermost ring inward: a name, a value, an optional `max` and color */
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

/** Props of CalendarHeatmap */
export interface CalendarHeatmapProps extends ShapeChartCommonProps {
  /** Daily values (several entries of the same day add up) */
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
   * @default from `locale`
   */
  weekStart?: number;
  /**
   * BCP 47 locale of the month and weekday names, of the tooltip dates and of the default `weekStart`
   * @default the runtime's default locale
   */
  locale?: string;
  /**
   * Color of the highest level (lower levels are lighter)
   * @default the first palette color
   */
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

/** Props of BulletChart */
export interface BulletChartProps extends ShapeChartCommonProps {
  /** Rows (columns when vertical): name, value, target, ranges and scale */
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

/** Props of ChordChart */
export interface ChordChartProps extends ShapeChartCommonProps {
  /**
   * Groups (names or `{ name, color }`), in their order around the circle;
   * groups only named by `links` are appended. With `matrix`, unnamed rows
   * are numbered from 1.
   */
  groups?: readonly (string | ChordGroup)[];
  /** Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent) */
  matrix?: readonly (readonly number[])[];
  /** Flows as a list (by group name or index); takes precedence over `matrix` */
  links?: readonly ChordLink[];
  /**
   * `false`: one ribbon per pair of groups, as wide as the flows between
   * them in both directions (a symmetric matrix counts each relation once),
   * arcs sized by the ribbons of the group. `true`: one ribbon per
   * direction (same width at both ends), arcs sized by the outgoing plus
   * the incoming flows; flows from a group to itself are ignored.
   * @default false
   */
  directed?: boolean;
  /**
   * Arrowheads at the target end of the ribbons
   * @default true when `directed`
   */
  arrows?: boolean;
  /**
   * Gap between the groups, in degrees
   * @default 2
   */
  padAngle?: number;
  /**
   * Angle of the first group, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Order of the groups around the circle
   * @default "none" (data order)
   */
  sortGroups?: "none" | "ascending" | "descending";
  /**
   * Order of the ribbon ends along an arc: `auto` minimizes the crossings;
   * otherwise the order of the groups, or by value
   * @default "auto"
   */
  sortSubgroups?: "auto" | "none" | "ascending" | "descending";
  /**
   * Color of the ribbons without `color`: a gradient from the source to the
   * target color, one of the two, or a neutral gray
   * @default "gradient"
   */
  ribbonColor?: "gradient" | "source" | "target" | "neutral";
  /**
   * Opacity of the ribbons, 0-1 (pressed ribbons are more opaque)
   * @default 0.65
   */
  ribbonOpacity?: number;
  /**
   * Thickness of the group arcs, in pixels
   * @default 6% of the radius (8-18 px)
   */
  arcWidth?: number;
  /**
   * Value ticks outside the arcs (labelled where there is room); a number sets the step between ticks
   * @default true when the diagram is large enough
   */
  ticks?: boolean | number;
  /**
   * Formats the tick labels
   * @default compact numbers of the `locale`
   */
  tickFormat?: (value: number) => string;
  /**
   * Group labels along the arc (`tangential`) or the radius (`radial`);
   * `auto` picks tangential when every name fits; colliding labels are shortened or skipped
   * @default "auto"
   */
  labels?: "auto" | "tangential" | "radial" | "none";
}

/** Props of ShapeChart: any shape chart type from its engine options */
export interface ShapeChartProps extends ShapeChartFrameProps {
  /**
   * Options of the chart, by `type` (pie, radar, gauge, funnel, treemap and
   * every other shape type of the engine)
   */
  options: ShapeChartOptions;
  /** Called when a sunburst drills into a parent or back up */
  onDrill?: (event: ShapeDrillEvent) => void;
}
