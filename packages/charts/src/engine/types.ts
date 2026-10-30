// Public types of the chart engine (minerva-design/charts/core).

/** GPU / CPU backend that draws the data layer */
export type ChartRendererKind = "webgpu" | "webgl2" | "webgl" | "canvas2d";

/**
 * Requested backend: `auto` tries WebGPU, then WebGL2, then WebGL (1), then
 * Canvas2D, and skips GPU backends that run in software (no hardware
 * acceleration). A forced backend falls back along the same chain.
 */
export type ChartRendererPreference = "auto" | ChartRendererKind;

/**
 * Scale of an axis; `log` (base 10, positive values only) applies to the
 * value axes (`yAxis`, `yAxis2`)
 */
export type ChartAxisType = "linear" | "log" | "time" | "category";

/**
 * Built-in color ramps of heatmaps, theme-aware (light and dark):
 * `sequential` goes from a tint of the surface to a deep (light theme) or
 * bright (dark theme) series color; `diverging` from the danger color
 * through a neutral middle to the series color
 */
export type ChartColorScheme = "sequential" | "diverging";

/** An extra row of the default tooltip of a point */
export interface ChartTooltipDetail {
  /** Name (left column) */
  name: string;
  /** Value (right column) */
  value: string;
}

/** Lines joining the end of every bar to the start of the next one */
export interface ChartConnectorOptions {
  /** Line color (any CSS color) @default the secondary text color */
  color?: string;
  /** Dash pattern in CSS pixels; `[]` draws solid lines @default [3, 3] */
  dash?: readonly number[];
  /** Line width in CSS pixels @default 1 */
  width?: number;
}

/** How a series is drawn */
export type ChartSeriesType =
  "line" | "area" | "bar" | "scatter" | "candlestick" | "heatmap" | "boxplot";

/** Direction of the value axis: `horizontal` puts the x (category) axis on the left */
export type ChartOrientation = "vertical" | "horizontal";

/** Shape of a line (and of the edge of an area) between its points */
export type ChartCurve = "linear" | "smooth" | "step";

/** X value of a datum: a number, a `Date` (time axis) or a category name */
export type ChartXValue = number | Date | string;

/** One datum written as an object */
export interface ChartPointDatum {
  /** X value; the datum index when omitted */
  x?: ChartXValue;
  /**
   * Y value; `null` leaves a gap. Candlesticks: the close. Heatmaps: the
   * row (a number, or a category name of a `category` y axis)
   */
  y: number | string | null;
  /**
   * Start of a floating bar (waterfall steps, Gantt tasks) or lower edge of
   * a range area (confidence bands, min-max ranges); dates are timestamps
   */
  y0?: number | Date | null;
  /** Diameter of the dot in CSS pixels (scatter) */
  size?: number;
  /** Color of the dot or bar (scatter, bar); any CSS color */
  color?: string;
  /**
   * Text drawn next to the dot (scatter with `showLabels`) or at the end of
   * the bar instead of its value (bar with `showLabels`), and shown in the
   * tooltip
   */
  label?: string;
  /** Candlestick: opening value */
  open?: number;
  /** Candlestick: highest value; box plot: upper whisker (the maximum) */
  high?: number;
  /** Candlestick: lowest value; box plot: lower whisker (the minimum) */
  low?: number;
  /** Box plot: first quartile (bottom of the box; `y` is the median) */
  q1?: number;
  /** Box plot: third quartile (top of the box) */
  q3?: number;
  /** Box plot: values beyond the whiskers, drawn as dots */
  outliers?: readonly number[];
  /**
   * Heatmap: value of the cell, mapped to `colorScale`; scatter (bubbles):
   * a value shown in the tooltip
   */
  value?: number | null;
  /** Extra rows of the default tooltip of this point, after its values */
  details?: readonly ChartTooltipDetail[];
}

/** Column-oriented data: the fastest form for large data sets (typed arrays are used as is) */
export interface ChartColumnData {
  /** X values; the index when omitted */
  x?: ArrayLike<number> | readonly ChartXValue[];
  /** Y values (`NaN` / `null` leave a gap); candlesticks: the closes; heatmaps: the rows */
  y: ArrayLike<number> | readonly (number | string | null)[];
  /** Starts of floating bars / lower edges of range areas (`NaN` / `null`: from zero) */
  y0?: ArrayLike<number> | readonly (number | null)[];
  /** Per-point diameters in CSS pixels (scatter) */
  size?: ArrayLike<number>;
  /** Candlestick: opening values */
  open?: ArrayLike<number>;
  /** Candlestick: highest values; box plots: the maximums */
  high?: ArrayLike<number>;
  /** Candlestick: lowest values; box plots: the minimums */
  low?: ArrayLike<number>;
  /** Box plots: first quartiles */
  q1?: ArrayLike<number>;
  /** Box plots: third quartiles */
  q3?: ArrayLike<number>;
  /** Heatmap: values of the cells; scatter: values shown in the tooltip */
  value?: ArrayLike<number> | readonly (number | null)[];
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
  /**
   * Series with the same stack id are stacked (bars, areas and lines; see
   * `stackMode` for 100% stacks)
   */
  stack?: string;
  /** Hides the series (it stays in the legend) */
  hidden?: boolean;
  /**
   * Draws the `label` of each point next to it (scatter) or the value above
   * each bar (bar)
   */
  showLabels?: boolean;
  /**
   * Shape of the line between the points: straight, smooth (monotone, never
   * overshoots the data) or steps (line / area)
   * @default "linear"
   */
  curve?: ChartCurve;
  /** Candlestick: color of the rising candles (close >= open); `--success-color` by default */
  upColor?: string;
  /** Candlestick: color of the falling candles; `--danger-color` by default */
  downColor?: string;
  /**
   * Heatmap: colors from the lowest to the highest value (two or more,
   * interpolated in OKLab) or a built-in theme-aware scheme
   * @default "sequential"
   */
  colorScale?: readonly string[] | ChartColorScheme;
  /** Heatmap: values mapped to the ends of `colorScale`; the data range by default */
  valueRange?: readonly [number, number];
  /**
   * Heatmap: value at the middle of the color scale (diverging data such as
   * correlations or changes); each half of the ramp covers one side
   * @default 0 for `diverging` ramps spanning it, else the middle of the range
   */
  colorMidpoint?: number;
  /** Bar / heatmap: corner radius in CSS pixels (bars: 3, heatmap cells: 2) */
  radius?: number;
  /** Formats the values of this series in the tooltip (the y axis format by default) */
  format?: (value: number) => string;
  /**
   * Value axis of the series: `right` plots it against `yAxis2` (dual axis
   * charts; vertical orientation only)
   * @default "left"
   */
  yAxis?: "left" | "right";
  /**
   * Bars / box plots: share of the space of a category taken by the bars,
   * 0-1 (`1` makes them touch, e.g. histograms); the widest value of the
   * visible series is used
   * @default 0.62 (one series), 0.78 (groups)
   */
  barWidth?: number;
  /** Scatter: name of the `value` of the points in the tooltip (bubble charts) */
  valueName?: string;
  /**
   * `false` leaves the series out of hit tests and tooltips (decorations,
   * overlays such as the progress of Gantt tasks)
   * @default true
   */
  tooltip?: boolean;
  /**
   * Box plot: outliers drawn as rings of the series color or as filled dots
   * @default "hollow"
   */
  outlierShape?: "hollow" | "filled";
  /**
   * Box plot: diameter of the outliers in CSS pixels
   * @default 7
   */
  outlierSize?: number;
  /**
   * Bars: thin lines from the end of every bar to the next bar (waterfall
   * charts); `true` uses dashed lines of the secondary text color
   * @default false
   */
  connector?: boolean | ChartConnectorOptions;
}

/** Options of an axis */
export interface ChartAxisOptions {
  /**
   * Scale of the axis: `linear` numbers, `time` timestamps / dates, `category`
   * names (x axis, and y axis of heatmaps)
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
  /**
   * Calendar of a `time` axis: steps and labels of the ticks and tooltips in
   * local time or in UTC (UTC data aligned on UTC midnights / months)
   * @default "local"
   */
  timeZone?: ChartTimeZone;
}

/** Calendar of a time axis */
export type ChartTimeZone = "local" | "utc";

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

/**
 * Reference line annotation at a value of the x or y axis (`y` lines are
 * vertical in horizontal charts)
 */
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

/** Text placed at a data position (omitted coordinates center it on the plot) */
export interface ChartTextAnnotation {
  type: "text";
  x?: number;
  y?: number;
  text: string;
  /**
   * Side of the text that touches the position: `top` hangs the text below
   * it, `left` starts it there, ...; the text always stays inside the plot
   * @default "center"
   */
  anchor?: "center" | "top" | "bottom" | "left" | "right";
  /** Text color (defaults to the secondary text color) */
  color?: string;
  /**
   * Font weight
   * @default 500
   */
  weight?: number;
}

/** Background area, reference line or text */
export type ChartAnnotation =
  ChartRectAnnotation | ChartLineAnnotation | ChartTextAnnotation;

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
  /**
   * Scatter points can be dragged: `drag` events follow the pointer and a
   * `drop` event ends the gesture (the data is not changed by the chart)
   * @default false
   */
  dragPoints?: boolean;
}

/** Tooltip options */
export interface ChartTooltipOptions {
  /**
   * `nearest` shows the closest point, `axis` all the series at the closest
   * x, `item` only the shape under the pointer (bar, box, cell or dot;
   * nothing over empty space)
   * @default "axis" ("nearest" when every series is a scatter, "item" for
   *   range bars on a time axis such as Gantt charts)
   */
  mode?: "nearest" | "axis" | "item";
  /** Renders the tooltip content (a string is set as text) */
  render?: (event: ChartHoverEvent) => string | Node | null;
  /**
   * Names of the rows of the default tooltip; alias of the matching
   * `ChartOptions.labels` (which win)
   */
  labels?: ChartTooltipLabels;
}

/** Row names of the default tooltip (candlesticks, box plots, ranges, bubbles) */
export interface ChartTooltipLabels {
  /** @default "Open" */
  open?: string;
  /** @default "High" */
  high?: string;
  /** @default "Low" */
  low?: string;
  /** @default "Close" */
  close?: string;
  /** Box plot upper whisker @default "Max" */
  max?: string;
  /** @default "Q3" */
  q3?: string;
  /** @default "Median" */
  median?: string;
  /** @default "Q1" */
  q1?: string;
  /** Box plot lower whisker @default "Min" */
  min?: string;
  /** Number of outliers @default "Outliers" */
  outliers?: string;
  /** Scatter `value` (bubbles) when the series has no `valueName` @default "Value" */
  value?: string;
}

/**
 * Texts the engine writes itself, built in for English, Chinese, Japanese
 * and French (the language of `locale`); override any of them with
 * `ChartOptions.labels`
 */
export interface ChartLabels {
  /** Candlestick open @default "Open" */
  open: string;
  /** Candlestick high @default "High" */
  high: string;
  /** Candlestick low @default "Low" */
  low: string;
  /** Candlestick close @default "Close" */
  close: string;
  /** Box plot upper whisker @default "Max" */
  max: string;
  /** Box plot third quartile @default "Q3" */
  q3: string;
  /** Box plot median @default "Median" */
  median: string;
  /** Box plot first quartile @default "Q1" */
  q1: string;
  /** Box plot lower whisker @default "Min" */
  min: string;
  /** Number of outliers of a box @default "Outliers" */
  outliers: string;
  /** Scatter `value` (bubbles) when the series has no `valueName` @default "Value" */
  value: string;
  /** Tooltip row of the x of a scatter point when the axis has no title @default "x" */
  x: string;
  /** Tooltip row of the y of a scatter point when the axis has no title @default "y" */
  y: string;
  /** Default series names: `"Series 1"`, `"Series 2"`... @default "Series" */
  series: string;
  /** Accessible name of a chart without named series @default "Chart" */
  chart: string;
  /** Accessible name of a chart; `{series}` is the list of the series names @default "Chart: {series}" */
  chartOf: string;
  /** Start of a range bar on a time axis (Gantt tasks) @default "Start" */
  start: string;
  /** End of a range bar on a time axis @default "End" */
  end: string;
  /** Length of a range bar on a time axis (`4 weeks`, `26 days`) @default "Duration" */
  duration: string;
  /** Done share of a Gantt task @default "Progress" */
  progress: string;
  /** Tasks a Gantt task waits for @default "Depends on" */
  dependencies: string;
  /** A hovered box plot outlier @default "Outlier" */
  outlier: string;
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
   * Second value axis on the right, for the series with `yAxis: "right"`;
   * its range is aligned on the ticks of the left axis (the grid follows
   * the left axis). Ignored by horizontal charts
   */
  yAxis2?: ChartAxisOptions;
  /**
   * `horizontal` swaps the axes: the x axis (categories) runs down the
   * left side, the values along the bottom (horizontal bars, Gantt charts)
   * @default "vertical"
   */
  orientation?: ChartOrientation;
  /**
   * Backend of the data layer
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Legend; shown by default when there are several named series */
  legend?: boolean | ChartLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | ChartTooltipOptions;
  /** Guide line following the pointer across the x axis (default on for `axis` tooltips of lines / areas) */
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
  /**
   * Locale of the texts and numbers the engine writes (tooltip rows, compact
   * units `k` / `万`, separators, month and weekday names of time axes);
   * resolved at every options update
   * @default the page language (`<html lang>`), else the browser language
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<ChartLabels>;
  /**
   * `percent` scales every stack to 100% at each x (the axis shows percents,
   * the tooltip the actual values)
   * @default "normal"
   */
  stackMode?: "normal" | "percent";
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
  /** Candlestick: open / high / low (`y` is the close) */
  open?: number;
  high?: number;
  low?: number;
  /** Heatmap: value of the cell; scatter: the `value` of the point (bubbles) */
  value?: number;
  /** Floating bars / range areas: the start (or lower edge); `y` is the end */
  y0?: number;
  /** Box plot: first quartile (`y` is the median, `low` / `high` the whiskers) */
  q1?: number;
  /** Box plot: third quartile */
  q3?: number;
  /** Box plot: number of outliers */
  outliers?: number;
  /** Box plot: value of the hovered outlier (the pointer is on an outlier) */
  outlier?: number;
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

/** Rectangle in CSS pixels, relative to the chart's container */
export interface ChartRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** A dragged point (`drag` / `drop` events) */
export interface ChartDragEvent {
  /** The point being dragged */
  item: ChartHoverItem;
  /** Data coordinates under the pointer */
  x: number;
  y: number;
}

/** A click (or tap) on the plot area outside the points */
export interface ChartPlotClickEvent {
  /** Data coordinates of the click */
  x: number;
  y: number;
}

/** Events of a chart instance */
export interface ChartEventMap {
  hover: ChartHoverEvent | null;
  click: ChartHoverEvent;
  /** Click on the plot area where there is no point */
  plotClick: ChartPlotClickEvent;
  zoom: ChartView;
  renderer: ChartRendererKind;
  /** The plot area moved or was resized */
  layout: ChartRect;
  /** A point is dragged (`interaction.dragPoints`) */
  drag: ChartDragEvent;
  /** A dragged point was released */
  drop: ChartDragEvent;
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
  /** Plot area in CSS pixels of the container (`null` before the first frame) */
  getPlotRect(): ChartRect | null;
  /** Data coordinates -> CSS pixels of the container (`null` before the first frame) */
  toPixel(x: number, y: number): { x: number; y: number } | null;
  /** CSS pixels of the container -> data coordinates (`null` before the first frame) */
  fromPixel(x: number, y: number): { x: number; y: number } | null;
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
