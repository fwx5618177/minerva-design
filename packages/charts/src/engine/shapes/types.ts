// Public types of the shape charts: pie / donut, radar, gauge, funnel and
// treemap. They have no cartesian axes and few marks, so they are drawn with
// Canvas2D (crisp text, arcs and polygons) by the same code in the browser
// (createShapeChart) and on any 2D canvas (createCanvasShapeChart).

import type { ChartPadding } from "../types";

/** Kind of shape chart */
export type ShapeChartType = "pie" | "radar" | "gauge" | "funnel" | "treemap";

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
  /** Index of the slice / stage / series / leaf (treemap: in the flattened leaves) */
  index: number;
  /** Radar: index of the indicator closest to the pointer */
  indicator?: number;
  name: string;
  value: number;
  /** Share of the total, 0-1 (pie: of the visible total, funnel: of the first stage, treemap: of the root, gauge: of the range) */
  percent: number;
  /** Resolved CSS color of the mark */
  color: string;
  /** Treemap: names from the root to the leaf */
  path?: string[];
}

/** Tooltip of a shape chart */
export interface ShapeTooltipOptions {
  /** Renders the tooltip content (a string is set as text) */
  render?: (event: ShapeHoverEvent) => string | Node | null;
}

/** Options shared by every shape chart */
export interface ShapeChartCommonOptions {
  /** Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Legend; shown by default for pie, funnel and multi-series radar charts */
  legend?: boolean | ShapeLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | ShapeTooltipOptions;
  /** Formats the values (labels, tooltip); compact numbers (1.2k, 3.4M) by default */
  format?: (value: number) => string;
  /**
   * Formats the shares (labels, conversion rates, tooltip); `share` is 0-1
   * @default one decimal, e.g. "40.0%"
   */
  percentFormat?: (share: number) => string;
  /**
   * Indexes of the hidden slices / stages / radar series / top-level treemap
   * nodes. When set, the chart is controlled: this list wins over the legend
   * state, and legend clicks (or `toggle()`) only emit the `toggle` event,
   * whose `hiddenIndexes` should be passed back here.
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

/** A node of a treemap: leaves carry a value, parents sum their children */
export interface TreemapNode {
  name: string;
  value?: number;
  color?: string;
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

/** Options of a shape chart, by `type` */
export type ShapeChartOptions =
  | PieChartOptions
  | RadarChartOptions
  | GaugeChartOptions
  | FunnelChartOptions
  | TreemapChartOptions;

/** A legend item was clicked (or `toggle()` was called) */
export interface ShapeToggleEvent {
  /** Index of the slice / stage / radar series / top-level treemap node */
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
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof ShapeChartEventMap>(
    type: K,
    listener: (event: ShapeChartEventMap[K]) => void,
  ): () => void;
  /** Removes the DOM */
  destroy(): void;
}
