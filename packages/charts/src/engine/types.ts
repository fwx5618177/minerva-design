// Public types of the chart engine (minerva-design/charts/core).

/** GPU / CPU backend that draws the data layer */
export type ChartRendererKind = "webgpu" | "webgl2" | "canvas2d";

/**
 * Requested backend: `auto` tries WebGPU, then WebGL2, then Canvas2D, and
 * skips GPU backends that run in software (no hardware acceleration)
 */
export type ChartRendererPreference = "auto" | ChartRendererKind;

/** Scale of an axis */
export type ChartAxisType = "linear" | "time" | "category";

/** How a series is drawn */
export type ChartSeriesType = "line" | "area" | "bar" | "scatter";

/** X value of a datum: a number, a `Date` (time axis) or a category name */
export type ChartXValue = number | Date | string;

/** One datum written as an object */
export interface ChartPointDatum {
  /** X value; the datum index when omitted */
  x?: ChartXValue;
  /** Y value; `null` leaves a gap */
  y: number | null;
  /** Diameter of the dot in CSS pixels (scatter) */
  size?: number;
  /** Color of the dot (scatter); any CSS color */
  color?: string;
  /** Text drawn next to the dot (scatter with `showLabels`) and shown in the tooltip */
  label?: string;
}

/** Column-oriented data: the fastest form for large data sets (typed arrays are used as is) */
export interface ChartColumnData {
  /** X values; the index when omitted */
  x?: ArrayLike<number> | readonly ChartXValue[];
  /** Y values (`NaN` / `null` leave a gap) */
  y: ArrayLike<number> | readonly (number | null)[];
  /** Per-point diameters in CSS pixels (scatter) */
  size?: ArrayLike<number>;
}

/**
 * Data of a series: y values only (`[3, 5, 2]`, typed arrays included),
 * `[x, y]` tuples, objects or columns
 */
export type ChartSeriesData =
  | ArrayLike<number>
  | readonly (number | null)[]
  | readonly (readonly [ChartXValue, number | null])[]
  | readonly ChartPointDatum[]
  | ChartColumnData;

/** A data series */
export interface ChartSeries {
  /** Stable identifier (defaults to the index) */
  id?: string;
  /** Name shown in the legend and the tooltip */
  name?: string;
  /**
   * How the series is drawn
   * @default "line"
   */
  type?: ChartSeriesType;
  /** Data points */
  data: ChartSeriesData;
  /** Series color (any CSS color, `var(--x)` included); the palette when omitted */
  color?: string;
  /**
   * Line width in CSS pixels (line / area)
   * @default 2
   */
  lineWidth?: number;
  /**
   * Dot diameter in CSS pixels (scatter)
   * @default 8
   */
  pointSize?: number;
  /** Fill opacity (area, scatter), 0-1 */
  opacity?: number;
  /** Bars with the same stack id are stacked */
  stack?: string;
  /** Hides the series (it stays in the legend) */
  hidden?: boolean;
  /** Draws the `label` of each point next to it (scatter) */
  showLabels?: boolean;
}

/** Options of an axis */
export interface ChartAxisOptions {
  /**
   * Scale of the axis: `linear` numbers, `time` timestamps / dates, `category` names
   * @default "linear"
   */
  type?: ChartAxisType;
  /** Lower bound; computed from the data when omitted */
  min?: number;
  /** Upper bound; computed from the data when omitted */
  max?: number;
  /** Axis title */
  title?: string;
  /** Category names (`category` axis); collected from the data when omitted */
  categories?: readonly string[];
  /** Formats a tick / tooltip value */
  format?: (value: number) => string;
  /**
   * Approximate number of ticks
   * @default 5 (y), computed from the width (x)
   */
  tickCount?: number;
  /**
   * Draws grid lines at the ticks
   * @default true for y, false for x
   */
  grid?: boolean;
  /**
   * Shows the axis line, ticks and labels
   * @default true
   */
  visible?: boolean;
  /** Keeps zero inside the automatic range (always on for bars) */
  zero?: boolean;
  /** Reverses the direction of the axis */
  reverse?: boolean;
  /** Rounds the automatic range to tick values; on by default except for category axes */
  nice?: boolean;
}

/** Position of an annotation label inside its area */
export type ChartLabelPosition =
  "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

/** Area annotation: a rectangle in data coordinates (omitted bounds extend to the plot edges) */
export interface ChartRectAnnotation {
  type: "rect";
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  /** Fill color (any CSS color) */
  color?: string;
  /** Fill opacity, 0-1 (default 0.08) */
  opacity?: number;
  /** Text drawn inside the area */
  label?: string;
  /** Where the label goes (default `top-left`) */
  labelPosition?: ChartLabelPosition;
  /** Label color (defaults to `color`) */
  labelColor?: string;
}

/** Reference line annotation at a value of the x or y axis */
export interface ChartLineAnnotation {
  type: "line";
  axis: "x" | "y";
  value: number;
  /** Line color (any CSS color) */
  color?: string;
  /** Line width in CSS pixels (default 1) */
  width?: number;
  /** Dash pattern, e.g. `[4, 4]` */
  dash?: readonly number[];
  /** Text drawn at the end of the line */
  label?: string;
}

/** Background area or reference line */
export type ChartAnnotation = ChartRectAnnotation | ChartLineAnnotation;

/** Zoom / pan / keyboard options */
export interface ChartInteractionOptions {
  /**
   * Axes that zoom and pan; `true` = x for line / area / bar charts, both for scatter charts
   * @default true
   */
  zoom?: boolean | "x" | "y" | "xy";
  /**
   * Wheel zoom: only with Ctrl / ⌘ (and trackpad pinch) or always
   * @default "modifier"
   */
  wheel?: "modifier" | "always";
  /**
   * Drag to pan (when zoomed)
   * @default true
   */
  pan?: boolean;
  /**
   * Arrow keys move the highlight, +/- zoom, 0 resets, Esc clears
   * @default true
   */
  keyboard?: boolean;
}

/** Tooltip options */
export interface ChartTooltipOptions {
  /**
   * `nearest` shows the closest point, `axis` all the series at the closest x
   * @default "axis" ("nearest" when every series is a scatter)
   */
  mode?: "nearest" | "axis";
  /** Renders the tooltip content (a string is set as text) */
  render?: (event: ChartHoverEvent) => string | Node | null;
}

/** Legend options */
export interface ChartLegendOptions {
  /**
   * Legend position
   * @default "top"
   */
  position?: "top" | "bottom";
  /**
   * Clicking an item toggles its series
   * @default true
   */
  toggle?: boolean;
}

/** Inner space around the plot area, in CSS pixels */
export interface ChartPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/** Options of `createChart` */
export interface ChartOptions {
  /** Data series */
  series: readonly ChartSeries[];
  /** X axis */
  xAxis?: ChartAxisOptions;
  /** Y axis */
  yAxis?: ChartAxisOptions;
  /**
   * Backend of the data layer
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Legend; shown by default when there are several named series */
  legend?: boolean | ChartLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | ChartTooltipOptions;
  /** Vertical guide line following the pointer (default on for `axis` tooltips) */
  crosshair?: boolean;
  /** Background areas and reference lines */
  annotations?: readonly ChartAnnotation[];
  /** Zoom / pan / keyboard; `false` makes the chart static */
  interaction?: boolean | ChartInteractionOptions;
  /** Space around the plot area */
  padding?: ChartPadding;
  /** Colors of the series without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
}

/** A point under the pointer */
export interface ChartHoverItem {
  seriesIndex: number;
  seriesId: string;
  seriesName: string;
  /** Index of the point in the series data */
  index: number;
  x: number;
  y: number;
  /** Resolved color of the point */
  color: string;
  label?: string;
}

/** Hover / click payload */
export interface ChartHoverEvent {
  /** Points under the pointer (several in `axis` mode) */
  items: ChartHoverItem[];
  /** X value of the first item */
  x: number;
  /** Formatted x value */
  xLabel: string;
}

/** Visible range of the axes */
export interface ChartView {
  x: [number, number];
  y: [number, number];
}

/** Events of a chart instance */
export interface ChartEventMap {
  hover: ChartHoverEvent | null;
  click: ChartHoverEvent;
  zoom: ChartView;
  renderer: ChartRendererKind;
}

/** Chart created by `createChart` */
export interface ChartInstance {
  /** Replaces the options (unchanged data arrays are not processed again) */
  setOptions(options: ChartOptions): void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range */
  getView(): ChartView;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** Resolves with the backend once the first frame can be drawn (`null` when the browser has no canvas support) */
  ready: Promise<ChartRendererKind | null>;
  /** Reads the CSS variables again (theme changes on `<html>` / `<body>` are detected automatically) */
  refreshTheme(): void;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof ChartEventMap>(
    type: K,
    listener: (event: ChartEventMap[K]) => void,
  ): () => void;
  /** Removes the DOM and frees the GPU resources */
  destroy(): void;
}
