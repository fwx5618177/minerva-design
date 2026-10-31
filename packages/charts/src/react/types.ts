import type { CSSProperties, ReactNode, Ref } from "react";
import type {
  ChartAnnotation,
  ChartAxisOptions,
  ChartCurve,
  ChartHoverEvent,
  ChartInstance,
  ChartLabels,
  ChartLegendOptions,
  ChartInteractionOptions,
  ChartOrientation,
  ChartPadding,
  ChartPlotClickEvent,
  ChartRendererKind,
  ChartRendererPreference,
  ChartSeries,
  ChartTooltipOptions,
  ChartView,
} from "../engine/types";
import type {
  BinOptions,
  BoxplotGroup,
  BoxplotStatsOptions,
  BubbleOptions,
  GanttOptions,
  GanttTask,
  HeatmapConfig,
  QuadrantConfig,
  QuadrantCorner,
  QuadrantPoint,
  SparklineConfig,
  WaterfallOptions,
  WaterfallStep,
} from "../engine/presets";

export type {
  BinOptions,
  BoxplotGroup,
  BoxplotStats,
  BoxplotStatsOptions,
  BubbleOptions,
  GanttOptions,
  GanttSeries,
  GanttTask,
  HistogramBinning,
  HistogramBins,
  HistogramSeriesOptions,
  WaterfallOptions,
  WaterfallStep,
  HeatmapCell,
  HeatmapConfig,
  QuadrantAxisLabels,
  QuadrantConfig,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegion,
  QuadrantRegions,
  SparklineConfig,
} from "../engine/presets";

/** Imperative handle of the chart components (`ref`) */
export interface ChartHandle {
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range */
  getView(): ChartView | null;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): ChartInstance | null;
}

/** Props shared by every chart component */
export interface ChartCommonProps {
  /**
   * Height of the chart (the legend included); numbers are pixels
   * @default 320
   */
  height?: number | string;
  /**
   * Width of the chart; numbers are pixels
   * @default "100%"
   */
  width?: number | string;
  /** X axis */
  xAxis?: ChartAxisOptions;
  /** Y axis */
  yAxis?: ChartAxisOptions;
  /**
   * Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Legend; shown by default when several series have a name */
  legend?: boolean | ChartLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | ChartTooltipOptions;
  /** Vertical guide line following the pointer */
  crosshair?: boolean;
  /** Background areas and reference lines */
  annotations?: readonly ChartAnnotation[];
  /**
   * Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static
   * @default true
   */
  interaction?: boolean | ChartInteractionOptions;
  /** Space around the plot area, in pixels */
  padding?: ChartPadding;
  /** Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
  /**
   * Locale of the texts and numbers the chart writes (tooltip rows, compact
   * units `k` / `万`, separators, month and weekday names of time axes)
   * @default the page language (`<html lang>`), else the browser language
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<ChartLabels>;
  /** Called when the hovered (or keyboard-focused) points change */
  onHover?: (event: ChartHoverEvent | null) => void;
  /** Called when a point (or bar) is clicked */
  onPointClick?: (event: ChartHoverEvent) => void;
  /** Called when the plot area is clicked where there is no point */
  onPlotClick?: (event: ChartPlotClickEvent) => void;
  /** React content of the tooltip (replaces the default content) */
  renderTooltip?: (event: ChartHoverEvent) => ReactNode;
  /** Called when the user zooms or pans */
  onZoom?: (view: ChartView) => void;
  /** Called with the backend once it is ready (and when it falls back after a GPU loss) */
  onRendererChange?: (renderer: ChartRendererKind) => void;
  /** Additional class name of the root element */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
  /** Imperative handle */
  ref?: Ref<ChartHandle>;
}

/** Props of Chart: any mix of line, area, bar, scatter, candlestick, heatmap and box plot series */
export interface ChartProps extends ChartCommonProps {
  /** Data series; each sets its own `type` */
  series: readonly ChartSeries[];
  /**
   * `percent` scales every stack to 100% at each x
   * @default "normal"
   */
  stackMode?: "normal" | "percent";
  /**
   * Right value axis of the series with `yAxis: "right"`; its range is
   * aligned on the left ticks (vertical charts)
   */
  yAxis2?: ChartAxisOptions;
  /**
   * `horizontal` puts the x axis (categories) down the left side and the
   * values along the bottom
   * @default "vertical"
   */
  orientation?: ChartOrientation;
}

/** Props of LineChart */
export interface LineChartProps extends ChartCommonProps {
  /** Series drawn as lines (or areas with `area`) unless they set a `type` */
  series: readonly ChartSeries[];
  /**
   * Fills the area under the lines
   * @default false
   */
  area?: boolean;
  /**
   * Shape of the lines: straight, smooth (monotone) or steps
   * @default "linear"
   */
  curve?: ChartCurve;
  /**
   * Stacks the series on top of each other
   * @default false
   */
  stacked?: boolean;
  /**
   * Scales the stacks to 100% (with `stacked`)
   * @default false
   */
  percent?: boolean;
}

/** Props of AreaChart */
export interface AreaChartProps extends ChartCommonProps {
  /** Series drawn as areas unless they set a `type` */
  series: readonly ChartSeries[];
  /**
   * Shape of the edges: straight, smooth (monotone) or steps
   * @default "smooth"
   */
  curve?: ChartCurve;
  /**
   * Stacks the areas on top of each other
   * @default false
   */
  stacked?: boolean;
  /**
   * Scales the stacks to 100% (implies `stacked`)
   * @default false
   */
  percent?: boolean;
}

/**
 * Props of BarChart (`labels` writes the values: override the tooltip texts
 * with `tooltip.labels`)
 */
export interface BarChartProps extends Omit<ChartCommonProps, "labels"> {
  /** Series drawn as bars unless they set a `type` (e.g. a `line` overlay) */
  series: readonly ChartSeries[];
  /**
   * Stacks the bars of every series (otherwise they are grouped side by side)
   * @default false
   */
  stacked?: boolean;
  /**
   * Scales the stacks to 100% (implies `stacked`)
   * @default false
   */
  percent?: boolean;
  /**
   * Writes the value above every bar
   * @default false
   */
  labels?: boolean;
  /**
   * `horizontal` draws the bars from the left, the categories down the left side
   * @default "vertical"
   */
  orientation?: ChartOrientation;
}

/** Props of HorizontalBarChart */
export interface HorizontalBarChartProps extends Omit<
  BarChartProps,
  "orientation"
> {
  /**
   * Series drawn as bars from the left unless they set a `type`; the x
   * values (categories) run from top to bottom
   */
  series: readonly ChartSeries[];
}

/** Props of RangeAreaChart */
export interface RangeAreaChartProps extends ChartCommonProps {
  /**
   * Bands between `y0` (lower edge) and `y` (upper edge) of every point,
   * unless a series sets a `type` (e.g. a `line` for the forecast itself)
   */
  series: readonly ChartSeries[];
  /**
   * Shape of the edges: straight, smooth (monotone) or steps
   * @default "smooth"
   */
  curve?: ChartCurve;
}

/** Props of MixedChart */
export interface MixedChartProps extends ChartProps {
  /**
   * Bars, lines, areas and dots, each with its `type`; `yAxis: "right"`
   * plots a series against `yAxis2`
   */
  series: readonly ChartSeries[];
}

/** Props of BubbleChart */
export interface BubbleChartProps extends ChartCommonProps, BubbleOptions {
  /** Series of points with a `value` sizing their bubble (area ∝ value) */
  series: readonly ChartSeries[];
}

/** Props of HistogramChart */
export interface HistogramChartProps extends ChartCommonProps, BinOptions {
  /** Raw samples (typed arrays are counted without copies) */
  values: ArrayLike<number>;
  /**
   * Name of the counts (legend, tooltip)
   * @default "Count"
   */
  name?: string;
  /** Bar color (any CSS color) */
  color?: string;
  /** Formats the edges of the bins in the tooltip */
  formatBin?: (value: number) => string;
  /** More series drawn over the bins (e.g. a density `line`) */
  series?: readonly ChartSeries[];
}

/** Props of BoxPlotChart */
export interface BoxPlotChartProps
  extends ChartCommonProps, BoxplotStatsOptions {
  /**
   * Series of box plots: data points with `low`, `q1`, `y` (the median),
   * `q3`, `high` and `outliers` (see `boxplotData` / `boxplotStats`)
   */
  series?: readonly ChartSeries[];
  /** Raw samples, one box each (an alternative to `series`) */
  groups?: readonly BoxplotGroup[];
  /**
   * Name of the series built from `groups`
   * @default "Values"
   */
  name?: string;
  /**
   * `horizontal` lays the boxes out in rows
   * @default "vertical"
   */
  orientation?: ChartOrientation;
  /**
   * Outliers drawn as rings of the series color or as filled dots (series
   * may set their own `outlierShape`)
   * @default "hollow"
   */
  outlierShape?: "hollow" | "filled";
  /**
   * Diameter of the outliers in CSS pixels
   * @default 7
   */
  outlierSize?: number;
}

/** Props of WaterfallChart */
export interface WaterfallChartProps
  extends
    Omit<ChartCommonProps, "crosshair" | "labels">,
    Omit<WaterfallOptions, "labels"> {
  /** Changes, subtotals and totals, in order */
  steps: readonly WaterfallStep[];
  /**
   * Writes the change (or the total) at the end of every bar
   * @default true
   */
  labels?: boolean;
  /**
   * `horizontal` lays the steps out in rows
   * @default "vertical"
   */
  orientation?: ChartOrientation;
}

/** Props of GanttChart */
export interface GanttChartProps
  extends Omit<ChartCommonProps, "crosshair">, GanttOptions {
  /** Tasks and milestones, from top to bottom */
  tasks: readonly GanttTask[];
  /**
   * Draws a line at this date (`true`: now)
   * @default false
   */
  today?: boolean | number | Date;
  /** Label of the today line */
  todayLabel?: string;
}

/** Props of CandlestickChart */
export interface CandlestickChartProps extends ChartCommonProps {
  /**
   * Series drawn as candles unless they set a `type` (e.g. a moving average
   * `line`); data points carry `open`, `high`, `low` and `y` (the close)
   */
  series: readonly ChartSeries[];
}

/** Props of HeatmapChart */
export interface HeatmapChartProps
  extends Omit<ChartCommonProps, "crosshair">, HeatmapConfig {}

/** Props of Sparkline */
export interface SparklineProps
  extends
    Pick<
      ChartCommonProps,
      | "width"
      | "renderer"
      | "tooltip"
      | "palette"
      | "ariaLabel"
      | "locale"
      | "labels"
      | "onHover"
      | "renderTooltip"
      | "className"
      | "style"
      | "ref"
    >,
    SparklineConfig {
  /**
   * Height of the sparkline; numbers are pixels
   * @default 48
   */
  height?: number | string;
}

/** Props of ScatterChart */
export interface ScatterChartProps extends ChartCommonProps {
  /** Series drawn as dots unless they set a `type` */
  series: readonly ChartSeries[];
}

/** Where a dragged QuadrantChart point was dropped */
export interface QuadrantDropTarget {
  /** Data coordinates of the drop */
  x: number;
  y: number;
  /** Quadrant of the drop, as seen on screen */
  quadrant: QuadrantCorner;
}

/** Props of QuadrantChart */
export interface QuadrantChartProps
  extends
    Omit<
      ChartCommonProps,
      "onPointClick" | "onPlotClick" | "renderTooltip" | "xAxis" | "yAxis"
    >,
    QuadrantConfig {
  /** Called with the clicked point and its index */
  onPointClick?: (point: QuadrantPoint, index: number) => void;
  /** Called when the same point is clicked twice in quick succession */
  onPointDoubleClick?: (point: QuadrantPoint, index: number) => void;
  /**
   * Called on every move of a dragged point, with the quadrant under the
   * pointer; the dots stay in place until the drop (update `points` in
   * `onPointDrop`)
   */
  onPointDrag?: (
    point: QuadrantPoint,
    index: number,
    target: QuadrantDropTarget,
  ) => void;
  /** Called when the empty area of a quadrant is clicked */
  onQuadrantClick?: (
    quadrant: QuadrantCorner,
    position: { x: number; y: number },
  ) => void;
  /**
   * Called when a dragged point is released; the dots become draggable
   * when it is set (the chart does not move them: update `points`)
   */
  onPointDrop?: (
    point: QuadrantPoint,
    index: number,
    target: QuadrantDropTarget,
  ) => void;
  /** React content of the tooltip of a point */
  renderTooltip?: (point: QuadrantPoint, index: number) => ReactNode;
  /**
   * React content placed over each quadrant (e.g. an add button); the
   * content receives pointer events, the rest of the quadrant does not
   */
  quadrantContent?: Partial<Record<QuadrantCorner, ReactNode>>;
}
