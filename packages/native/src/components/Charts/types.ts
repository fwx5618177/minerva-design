import type { DimensionValue } from "react-native";
import type {
  BinOptions,
  BoxplotGroup,
  BoxplotStatsOptions,
  BubbleOptions,
  ChartAxisOptions,
  ChartCurve,
  ChartOrientation,
  ChartSeries,
  GanttOptions,
  GanttTask,
  HeatmapConfig,
  SparklineConfig,
  WaterfallOptions,
  WaterfallStep,
} from "@minerva/charts/canvas";
import type { ChartCommonProps } from "../Chart/types";

export type {
  BinOptions,
  BoxplotGroup,
  BoxplotStats,
  BoxplotStatsOptions,
  BubbleOptions,
  ChartCurve,
  GanttOptions,
  GanttTask,
  HeatmapCell,
  HeatmapConfig,
  HistogramBinning,
  SparklineConfig,
  WaterfallOptions,
  WaterfallStep,
} from "@minerva/charts/canvas";

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
      | "tooltip"
      | "palette"
      | "ariaLabel"
      | "locale"
      | "labels"
      | "onHover"
      | "renderTooltip"
      | "style"
      | "testID"
      | "ref"
    >,
    SparklineConfig {
  /**
   * Height of the sparkline
   * @default 48
   */
  height?: DimensionValue;
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
export interface MixedChartProps extends ChartCommonProps {
  /**
   * Bars, lines, areas and dots, each with its `type`; `yAxis: "right"`
   * plots a series against `yAxis2`
   */
  series: readonly ChartSeries[];
  /** Right value axis of the series with `yAxis: "right"` (dual axis charts) */
  yAxis2?: ChartAxisOptions;
  /**
   * `percent` scales every stack to 100% at each x
   * @default "normal"
   */
  stackMode?: "normal" | "percent";
  /**
   * `horizontal` puts the x axis (categories) down the left side
   * @default "vertical"
   */
  orientation?: ChartOrientation;
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
