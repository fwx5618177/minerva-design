// Public types of the 3D charts (scatter, surface, bars, lines) of
// minerva-design/charts/core (listed in apps/docs/scripts/generate-api.mjs).

import type { ChartRendererKind, ChartRendererPreference } from "../types";

/** How a 3D series is drawn */
export type Chart3DSeriesType = "scatter" | "surface" | "bar" | "line";

/**
 * Built-in color ramps, from the lowest to the highest value: perceptually
 * uniform (`viridis`, `plasma`, `inferno`, `magma`, `cividis`), rainbow
 * (`turbo`, `spectral`), diverging (`coolwarm`), elevation (`terrain`) and
 * sequential (`blues`)
 */
export type Chart3DColorMap =
  | "viridis"
  | "plasma"
  | "inferno"
  | "magma"
  | "cividis"
  | "turbo"
  | "spectral"
  | "coolwarm"
  | "terrain"
  | "blues";

/** A built-in ramp, or two or more CSS colors from the lowest to the highest value */
export type Chart3DColorScale = Chart3DColorMap | readonly string[];

/**
 * What sets the color of the points, cells or bars: the series color, the
 * height (`z`) or the `value` of the data, both through the chart's
 * `colorScale`
 */
export type Chart3DColorBy = "series" | "z" | "value";

/** One 3D datum written as an object */
export interface Chart3DPoint {
  x: number;
  y: number;
  /** Height (vertical axis) */
  z: number;
  /** Diameter of the dot in CSS pixels (scatter) */
  size?: number;
  /** Color of the dot (any CSS color); wins over the series color and the color scale */
  color?: string;
  /** Value mapped to the color scale (`colorBy: "value"`) */
  value?: number;
  /** Text shown in the tooltip */
  label?: string;
}

/**
 * Column-oriented 3D data: the fastest form for large data sets (typed
 * arrays are used as is, `NaN` skips a point)
 */
export interface Chart3DColumnData {
  x: ArrayLike<number>;
  y: ArrayLike<number>;
  /** Heights (vertical axis) */
  z: ArrayLike<number>;
  /** Per-point diameters in CSS pixels (scatter) */
  size?: ArrayLike<number>;
  /** Per-point values mapped to the color scale (`colorBy: "value"`) */
  value?: ArrayLike<number>;
  /**
   * Per-point colors as `0xRRGGBB` numbers (a `Uint32Array` for large
   * clouds); win over the series color and the color scale
   */
  color?: ArrayLike<number>;
  /** Per-point texts shown in the tooltip */
  label?: readonly string[];
}

/**
 * Look of the scatter dots: `"sphere"` shaded balls, `"disc"` flat
 * anti-aliased discs, `"glow"` soft discs with a gaussian halo (stars,
 * dense clouds; pairs well with `blend: "additive"`)
 */
export type Scatter3DPointStyle = "sphere" | "disc" | "glow";

/**
 * How the dots mix with what is behind them: `"normal"` alpha blending, or
 * `"additive"` light accumulation (dense regions get brighter; meant for
 * dark backgrounds, the dots don't hide each other)
 */
export type Scatter3DBlend = "normal" | "additive";

/** Points of a scatter or line series: objects, `[x, y, z]` tuples or columns */
export type Chart3DPointData =
  | readonly Chart3DPoint[]
  | readonly (readonly [number, number, number])[]
  | Chart3DColumnData;

/** Options shared by every 3D series */
export interface Chart3DSeriesBase {
  /** Stable identifier (defaults to the index) */
  id?: string;
  /** Name shown in the legend and the tooltip */
  name?: string;
  /** Series color (any CSS color, `var(--x)` included); the palette when omitted */
  color?: string;
  /** Hides the series (it stays in the legend) */
  hidden?: boolean;
  /**
   * Formats the `value` of the hovered item in the tooltip (its height when
   * the data has no values); the axis formats by default
   */
  format?: (value: number) => string;
}

/** A cloud of 3D points */
export interface Scatter3DSeries extends Chart3DSeriesBase {
  /**
   * Set by the chart components; `createChart3D` treats series without a
   * type as scatter series
   * @default "scatter"
   */
  type?: "scatter";
  /** The points */
  data: Chart3DPointData;
  /**
   * Dot diameter in CSS pixels (per-point `size` wins)
   * @default 6
   */
  pointSize?: number;
  /**
   * Opacity of the dots, 0-1
   * @default 1
   */
  opacity?: number;
  /**
   * Source of the dot colors
   * @default "value" when the data has values, "series" otherwise
   */
  colorBy?: Chart3DColorBy;
  /**
   * Scales the dots with their distance (perspective projection only)
   * @default true
   */
  perspectiveSize?: boolean;
  /**
   * Look of the dots: shaded spheres, flat discs or glowing discs
   * @default "sphere"
   */
  pointStyle?: Scatter3DPointStyle;
  /**
   * Blending of the dots: `"additive"` accumulates light (dark backgrounds)
   * @default "normal"
   */
  blend?: Scatter3DBlend;
}

/** A 3D polyline (trajectory); `NaN` coordinates break the line */
export interface Line3DSeries extends Chart3DSeriesBase {
  type?: "line";
  /** The vertices, in drawing order */
  data: Chart3DPointData;
  /**
   * Line width in CSS pixels
   * @default 2
   */
  lineWidth?: number;
  /**
   * Opacity of the line, 0-1
   * @default 1
   */
  opacity?: number;
  /**
   * Source of the line color (a gradient along the line for `z` / `value`)
   * @default "value" when the data has values, "series" otherwise
   */
  colorBy?: Chart3DColorBy;
  /**
   * Diameter of a dot drawn at every vertex, in CSS pixels (0: no dots)
   * @default 0
   */
  pointSize?: number;
}

/**
 * Heights of a regular grid, `z = f(x, y)`: `rows × cols` values stored row
 * by row (row `r` is `y[r]`, column `c` is `x[c]`); `NaN` leaves a hole
 */
export interface Surface3DData {
  /** Number of rows (y samples), 2 or more */
  rows: number;
  /** Number of columns (x samples), 2 or more */
  cols: number;
  /** `rows × cols` heights, row-major (`Float32Array` recommended) */
  z: ArrayLike<number>;
  /** X coordinates of the columns (`cols` values); `0 … cols - 1` when omitted */
  x?: ArrayLike<number>;
  /** Y coordinates of the rows (`rows` values); `0 … rows - 1` when omitted */
  y?: ArrayLike<number>;
  /** `rows × cols` values mapped to the color scale instead of the heights (`colorBy: "value"`) */
  value?: ArrayLike<number>;
}

/** Contour lines of a surface */
export interface Surface3DContourOptions {
  /**
   * Number of levels, spread over the height range (ignored with `levels`)
   * @default 10
   */
  count?: number;
  /** Heights of the lines */
  levels?: readonly number[];
  /**
   * Projects the lines on the floor of the axis box
   * @default true
   */
  floor?: boolean;
  /**
   * Draws the lines on the surface itself
   * @default false
   */
  surface?: boolean;
  /** Line color (any CSS color); each level takes its color-scale color when omitted */
  color?: string;
  /**
   * Line width in CSS pixels
   * @default 1
   */
  width?: number;
}

/** Wireframe drawn over a surface */
export interface Surface3DWireframeOptions {
  /** Line color (any CSS color); a contrasting tint of the text color when omitted */
  color?: string;
  /**
   * Draws every n-th grid line
   * @default 1 (a line every 64 rows / columns at most)
   */
  step?: number;
  /**
   * Line width in CSS pixels
   * @default 1
   */
  width?: number;
}

/** A surface over a regular grid */
export interface Surface3DSeries extends Chart3DSeriesBase {
  type?: "surface";
  /** Grid of heights */
  data: Surface3DData;
  /**
   * Source of the colors: the height (`z`), the `value` grid or the series color
   * @default "value" when the data has values, "z" otherwise
   */
  colorBy?: Chart3DColorBy;
  /**
   * Opacity of the surface, 0-1 (below 1 the surface does not hide what is behind it)
   * @default 1
   */
  opacity?: number;
  /**
   * Grid lines over the surface
   * @default false
   */
  wireframe?: boolean | Surface3DWireframeOptions;
  /**
   * Contour lines (on the floor by default)
   * @default false
   */
  contours?: boolean | Surface3DContourOptions;
  /**
   * Draws the faces; `false` keeps only the wireframe / contours
   * @default true
   */
  fill?: boolean;
}

/** One bar: a cell of the x × y category grid and its height */
export interface Bar3DDatum {
  /** X category (a name, or its index) */
  x: string | number;
  /** Y category (a name, or its index) */
  y: string | number;
  /** Height; `null` leaves the cell empty */
  z: number | null;
  /** Bar color (any CSS color); wins over the series color and the color scale */
  color?: string;
  /** Value mapped to the color scale (`colorBy: "value"`); the height by default */
  value?: number;
  /** Text shown in the tooltip */
  label?: string;
}

/** Bars over an x × y category grid; bars of several series in the same cell are stacked */
export interface Bar3DSeries extends Chart3DSeriesBase {
  type?: "bar";
  /** The bars: objects or `[x, y, z]` tuples */
  data:
    | readonly Bar3DDatum[]
    | readonly (readonly [string | number, string | number, number | null])[];
  /**
   * Source of the bar colors
   * @default "series"
   */
  colorBy?: Chart3DColorBy;
  /**
   * Opacity of the bars, 0-1
   * @default 1
   */
  opacity?: number;
  /**
   * Width of the bars as a fraction of a cell, 0-1
   * @default 0.7
   */
  barWidth?: number;
}

/** A 3D data series */
export type Chart3DSeries =
  Scatter3DSeries | Surface3DSeries | Bar3DSeries | Line3DSeries;

/** Options of a 3D axis */
export interface Chart3DAxisOptions {
  /** Axis title */
  title?: string;
  /** Lower bound; computed from the data when omitted */
  min?: number;
  /** Upper bound; computed from the data when omitted */
  max?: number;
  /**
   * Category names (x / y axes of bar charts); collected from the data when
   * omitted. Setting them makes the axis a category axis.
   */
  categories?: readonly string[];
  /** Formats a tick / tooltip value (category axes: the category index) */
  format?: (value: number) => string;
  /**
   * Approximate number of ticks
   * @default 5
   */
  tickCount?: number;
  /**
   * Draws grid lines at the ticks on the walls of the box
   * @default true
   */
  grid?: boolean;
  /**
   * Shows the tick labels and the title
   * @default true
   */
  visible?: boolean;
  /**
   * Rounds the automatic range to tick values
   * @default true
   */
  nice?: boolean;
}

/** Projection of the camera */
export type Chart3DProjection = "perspective" | "orthographic";

/** Camera position around the center of the box */
export interface Chart3DCameraOptions {
  /**
   * Horizontal angle in degrees, counterclockwise seen from above (0 looks
   * along the y axis)
   * @default 35
   */
  azimuth?: number;
  /**
   * Height angle in degrees (-89 … 89; positive looks from above)
   * @default 24
   */
  elevation?: number;
  /**
   * Zoom: 1 fits the box, 2 shows it twice as large
   * @default 1
   */
  zoom?: number;
  /**
   * Perspective (vanishing lines) or orthographic (parallel lines)
   * @default "perspective"
   */
  projection?: Chart3DProjection;
  /**
   * Vertical field of view in degrees (perspective)
   * @default 32
   */
  fov?: number;
}

/** Current camera, reported by `camera` events and `getCamera()` */
export interface Chart3DCameraState {
  /** Horizontal angle in degrees */
  azimuth: number;
  /** Height angle in degrees */
  elevation: number;
  /** Zoom factor (1 fits the box) */
  zoom: number;
  /** Shift of the box center in screen space, as fractions of the plot height */
  pan: [number, number];
  projection: Chart3DProjection;
}

/** Rotation / zoom / pan options */
export interface Chart3DInteractionOptions {
  /**
   * Drag (one finger) rotates the camera
   * @default true
   */
  rotate?: boolean;
  /**
   * Wheel and pinch zoom
   * @default true
   */
  zoom?: boolean;
  /**
   * Wheel zoom: only with Ctrl / ⌘ (and trackpad pinch) or always
   * @default "modifier"
   */
  wheel?: "modifier" | "always";
  /**
   * Right-drag, Shift + drag and two-finger drag pan the view
   * @default true
   */
  pan?: boolean;
  /**
   * Arrow keys rotate, +/- zoom, 0 resets, Esc clears the highlight
   * @default true
   */
  keyboard?: boolean;
}

/** Lighting of the surfaces and bars */
export interface Chart3DLightingOptions {
  /**
   * Light reaching every face, 0-1
   * @default 0.5
   */
  ambient?: number;
  /**
   * Strength of the directional light (Lambert), 0-1
   * @default 0.6
   */
  diffuse?: number;
  /**
   * Strength of the highlights (Blinn-Phong), 0-1
   * @default 0.25
   */
  specular?: number;
  /**
   * Sharpness of the highlights
   * @default 32
   */
  shininess?: number;
}

/** Color bar of the color scale */
export interface Chart3DColorBarOptions {
  /** Title above the bar */
  title?: string;
  /** Formats the values of the bar (the z axis format by default) */
  format?: (value: number) => string;
}

/** Legend options */
export interface Chart3DLegendOptions {
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

/** Tooltip options */
export interface Chart3DTooltipOptions {
  /** Renders the tooltip content (a string is set as text) */
  render?: (event: Chart3DHoverEvent) => string | Node | null;
}

/** Options of `createChart3D` */
export interface Chart3DOptions {
  /** Data series (scatter, surface, bar and line series can be mixed) */
  series: readonly Chart3DSeries[];
  /** X axis (width) */
  xAxis?: Chart3DAxisOptions;
  /** Y axis (depth) */
  yAxis?: Chart3DAxisOptions;
  /** Z axis (height) */
  zAxis?: Chart3DAxisOptions;
  /** Initial camera (also the position restored by a double click) */
  camera?: Chart3DCameraOptions;
  /**
   * Turns the camera around the box: `true` at 12°/s, or a speed in
   * degrees per second (negative turns clockwise). Pauses while the pointer
   * is over the chart, when it is off-screen and with `prefers-reduced-motion`.
   * @default false
   */
  autoRotate?: boolean | number;
  /**
   * Proportions of the box (x, y, z)
   * @default [1, 1, 0.7]
   */
  aspect?: readonly [number, number, number];
  /**
   * Draws the axis box: back walls, grid lines, tick labels and axis titles
   * @default true
   */
  box?: boolean;
  /**
   * Colors of `colorBy: "z"` / `"value"`: a built-in ramp or CSS colors
   * @default "viridis"
   */
  colorScale?: Chart3DColorScale;
  /** Values mapped to the ends of the color scale; the data range by default */
  valueRange?: readonly [number, number];
  /** Color bar of the color scale; shown by default when a visible series uses it */
  colorBar?: boolean | Chart3DColorBarOptions;
  /** Legend; shown by default when there are several named series */
  legend?: boolean | Chart3DLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | Chart3DTooltipOptions;
  /** Rotation / zoom / pan / keyboard; `false` makes the chart static */
  interaction?: boolean | Chart3DInteractionOptions;
  /** Lighting of the surfaces and bars */
  lighting?: Chart3DLightingOptions;
  /**
   * Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL,
   * then Canvas2D (CPU projection, decimated) and skips GPUs running in software
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Colors of the series without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
  /**
   * Language of the built-in texts (accessible summary, legend announcements,
   * tooltip row names) and of the number formatting (`Intl.NumberFormat`,
   * compact units such as k / M or 万 / 亿). Built-in texts exist in English,
   * Chinese, Japanese and French; other languages fall back to English.
   * @default the page language (`<html lang>`), then the browser language
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<Chart3DLabels>;
}

/**
 * Built-in texts of the 3D charts. Templates replace `{name}`-style
 * placeholders.
 */
export interface Chart3DLabels {
  /** Role description and accessible name of an unnamed chart @default "3D chart" */
  chart: string;
  /** Accessible name when series are named; `{names}` @default "3D chart: {names}" */
  chartNamed: string;
  /** Name of an unnamed series; `{n}` is its 1-based position @default "Series {n}" */
  series: string;
  /** Summary: number of series; `{count}` @default "{count} series." */
  seriesCount: string;
  /** Summary of a series; `{name}`, `{type}`, `{size}` @default "{name} ({type}): {size}." */
  seriesSummary: string;
  /** Summary of a hidden series; `{name}`, `{type}`, `{size}` @default "{name} ({type}): {size}, hidden." */
  seriesSummaryHidden: string;
  /** Type name of scatter series @default "scatter" */
  scatter: string;
  /** Type name of line series @default "line" */
  line: string;
  /** Type name of surface series @default "surface" */
  surface: string;
  /** Type name of bar series @default "bar" */
  bar: string;
  /** Size of a scatter series; `{count}` @default "{count} points" */
  points: string;
  /** Size of a line series; `{count}` @default "{count} vertices" */
  vertices: string;
  /** Size of a surface series; `{rows}`, `{cols}` @default "{rows} × {cols} grid" */
  grid: string;
  /** Size of a bar series; `{count}` @default "{count} bars" */
  bars: string;
  /** Summary of an axis without title; `{axis}`, `{range}` @default "{axis} axis: {range}." */
  axis: string;
  /** Summary of an axis with a title; `{axis}`, `{title}`, `{range}` @default "{axis} axis ({title}): {range}." */
  axisTitled: string;
  /** Range of a numeric axis; `{min}`, `{max}` @default "{min} to {max}" */
  range: string;
  /** Separator of the lists (series names, categories) @default ", " */
  listSeparator: string;
  /** Announcement when the legend shows a series; `{name}` @default "{name}: shown" */
  shown: string;
  /** Announcement when the legend hides a series; `{name}` @default "{name}: hidden" */
  hidden: string;
  /** Tooltip row of the `value` (when the color bar has no title) @default "value" */
  value: string;
  /** Tooltip row of x when the axis has no title @default "x" */
  x: string;
  /** Tooltip row of y when the axis has no title @default "y" */
  y: string;
  /** Tooltip row of z when the axis has no title @default "z" */
  z: string;
}

/** The point, surface cell or bar under the pointer */
export interface Chart3DHoverEvent {
  seriesIndex: number;
  seriesId: string;
  seriesName: string;
  /** Type of the series */
  type: Chart3DSeriesType;
  /** Index of the point / bar in the series data; surfaces: `row * cols + col` */
  index: number;
  /** Surfaces: row of the grid vertex */
  row?: number;
  /** Surfaces: column of the grid vertex */
  col?: number;
  x: number;
  y: number;
  z: number;
  /** Color-scale value (`value` of the data) */
  value?: number;
  /** Bars: category names */
  xCategory?: string;
  yCategory?: string;
  /** Resolved color of the point / cell / bar */
  color: string;
  label?: string;
  /** Position of the item in CSS pixels, relative to the chart's container */
  clientX: number;
  clientY: number;
}

/** Events of a 3D chart instance */
export interface Chart3DEventMap {
  hover: Chart3DHoverEvent | null;
  click: Chart3DHoverEvent;
  /** The camera moved (rotation, zoom, pan, reset; not the automatic rotation) */
  camera: Chart3DCameraState;
  renderer: ChartRendererKind;
}

/** Chart created by `createChart3D` */
export interface Chart3DInstance {
  /** Replaces the options (unchanged data arrays are not processed again) */
  setOptions(options: Chart3DOptions): void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Restores the camera of the options */
  resetCamera(): void;
  /** Current camera */
  getCamera(): Chart3DCameraState;
  /** Moves the camera */
  setCamera(camera: Partial<Chart3DCameraState>): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** Resolves with the backend once the first frame can be drawn (`null` when the browser has no canvas support) */
  ready: Promise<ChartRendererKind | null>;
  /** Reads the CSS variables again (theme changes on `<html>` / `<body>` are detected automatically) */
  refreshTheme(): void;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof Chart3DEventMap>(
    type: K,
    listener: (event: Chart3DEventMap[K]) => void,
  ): () => void;
  /** Removes the DOM and frees the GPU resources */
  destroy(): void;
}
