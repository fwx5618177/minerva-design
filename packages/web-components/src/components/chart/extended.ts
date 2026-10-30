import { property } from "lit/decorators.js";
import {
  boxplotData,
  bubbleSeries,
  ganttSeries,
  histogramSeries,
  waterfallSeries,
  type BoxplotGroup,
  type ChartAnnotation,
  type ChartConnectorOptions,
  type ChartOptions,
  type ChartSeries,
  type GanttTask,
  type HistogramBinning,
  type WaterfallStep,
} from "minerva-design/charts/core";
import { MinervaCartesianChartElement } from "./chart";
import {
  MinervaBarChart,
  SeriesChartElement,
  type ChartBaseOptions,
} from "./charts";
import { withSeriesType } from "./series";

/**
 * Horizontal bar chart of `minerva-design/charts/core` (the
 * `<HorizontalBarChart>` of React): categories down the left side, values
 * from the left (rankings, long names, diverging surveys, stacked
 * progress). The series without a `type` are drawn as bars.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU bar chart drawn from the left: rankings and long names.
 * @tag minerva-horizontal-bar-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaHorizontalBarChart extends MinervaBarChart {
  static override tagName = "minerva-horizontal-bar-chart";

  protected override engineOptions(): ChartOptions | null {
    const options = super.engineOptions();
    return options && { ...options, orientation: "horizontal" };
  }
}

/**
 * Range area chart of `minerva-design/charts/core` (the `<RangeAreaChart>`
 * of React): bands between a lower (`y0`) and an upper edge (`y`) of every
 * point (confidence intervals, min-max ranges), mixable with lines. The
 * series without a `type` are drawn as bands.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU bands between a lower and an upper edge.
 * @tag minerva-range-area-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaRangeAreaChart extends SeriesChartElement {
  static override tagName = "minerva-range-area-chart";

  /** Shape of the edges: straight, smooth (monotone) or steps */
  @property()
  curve: "linear" | "smooth" | "step" = "smooth";

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(series, "area", undefined, this.curve).map((s) =>
      s.type === "area" ? { ...s, lineWidth: s.lineWidth ?? 1.5 } : s,
    );
  }
}

/**
 * Combination chart of `minerva-design/charts/core` (the `<MixedChart>` of
 * React): bars, lines, areas and dots, each series with its `type`, on one
 * or two value axes (`yAxis: "right"` series use `options.yAxis2`).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU combination of bars, lines and areas on two value axes.
 * @tag minerva-mixed-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaMixedChart extends SeriesChartElement {
  static override tagName = "minerva-mixed-chart";

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(series, "line");
  }
}

/**
 * Bubble chart of `minerva-design/charts/core` (the `<BubbleChart>` of
 * React): x, y and a `value` per point sized by area (√value diameters,
 * one scale for every series). The series without a `type` are drawn as
 * bubbles.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU bubble chart: x, y and a value sized by area.
 * @tag minerva-bubble-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaBubbleChart extends SeriesChartElement {
  static override tagName = "minerva-bubble-chart";

  /** Diameter in pixels of the smallest bubbles */
  @property({ type: Number, attribute: "min-size" })
  minSize = 6;

  /** Diameter in pixels of the largest value */
  @property({ type: Number, attribute: "max-size" })
  maxSize = 48;

  /** Value drawn with `max-size` (share a scale between charts); the largest value by default */
  @property({ type: Number, attribute: "max-value" })
  maxValue?: number;

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return bubbleSeries(series, {
      minSize: this.minSize,
      maxSize: this.maxSize,
      maxValue: this.maxValue,
    });
  }
}

const binning = {
  fromAttribute: (value: string | null): HistogramBinning | undefined =>
    value === null
      ? undefined
      : /^\d+$/.test(value)
        ? Number(value)
        : (value as HistogramBinning),
};

/**
 * Histogram of `minerva-design/charts/core` (the `<HistogramChart>` of
 * React): the distribution of raw samples in bins of equal width
 * (Freedman-Diaconis, Sturges or a count); millions of samples are binned
 * in milliseconds.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU histogram of raw samples, binned automatically.
 * @tag minerva-histogram-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaHistogramChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-histogram-chart";

  /** Raw samples (typed arrays are counted without copies); property only */
  @property({ attribute: false })
  values?: ArrayLike<number>;

  /** Number of bins, or the rule choosing it: `auto`, `sturges`, `freedman-diaconis` */
  @property({ converter: binning })
  bins: HistogramBinning = "auto";

  /** Range covered by the bins (the data range by default); property only */
  @property({ attribute: false })
  domain?: readonly [number, number];

  /** Rounds the bin width to 1, 2 or 5 × 10^k and aligns the edges on it; property only */
  @property({ attribute: false })
  nice = true;

  /** Name of the counts (legend, tooltip; default "Count") */
  @property({ attribute: "value-name" })
  valueName?: string;

  /** Bar color (any CSS color) */
  @property()
  color?: string;

  /** Formats the edges of the bins in the tooltip; property only */
  @property({ attribute: false })
  formatBin?: (value: number) => string;

  /** More series drawn over the bins (e.g. a density `line`); property only */
  @property({ attribute: false })
  series?: readonly ChartSeries[];

  /** Other engine options (axes, legend, tooltip, annotations...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected engineOptions(): ChartOptions | null {
    if (!this.values) return null;
    return {
      ...this.options,
      series: [
        histogramSeries(this.values, {
          bins: this.bins,
          domain: this.domain,
          nice: this.nice,
          name: this.valueName,
          color: this.color,
          format: this.formatBin,
        }),
        ...(this.series ?? []),
      ],
    };
  }
}

const whiskerReach = {
  fromAttribute: (value: string | null): number | "minmax" | undefined =>
    value === null ? undefined : value === "minmax" ? value : Number(value),
};

/**
 * Box plot of `minerva-design/charts/core` (the `<BoxPlotChart>` of
 * React): medians, quartiles, whiskers and outliers of samples, from raw
 * values (`groups`) or computed statistics (`series`).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU box plot of raw samples or computed quartiles.
 * @tag minerva-box-plot-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaBoxPlotChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-box-plot-chart";

  /** Raw samples `{ x, values, color }`, one box each; property only */
  @property({ attribute: false })
  groups?: readonly BoxplotGroup[];

  /** Series of computed box plots (`low`, `q1`, `y` the median, `q3`, `high`, `outliers`); property only */
  @property({ attribute: false })
  series?: readonly ChartSeries[];

  /** Name of the series built from `groups` (default "Values") */
  @property({ attribute: "value-name" })
  valueName?: string;

  /** Reach of the whiskers in interquartile ranges (Tukey: 1.5), or `minmax` */
  @property({ converter: whiskerReach })
  whisker: number | "minmax" = 1.5;

  /** Outliers drawn as rings of the series color or as filled dots (series may set their own) */
  @property({ attribute: "outlier-shape" })
  outlierShape: "hollow" | "filled" = "hollow";

  /** Diameter of the outliers in CSS pixels */
  @property({ type: Number, attribute: "outlier-size" })
  outlierSize = 7;

  /** `horizontal` lays the boxes out in rows */
  @property()
  orientation: "vertical" | "horizontal" = "vertical";

  /** Other engine options (axes, legend, tooltip, annotations...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected engineOptions(): ChartOptions | null {
    if (!this.groups?.length && !this.series) return null;
    return {
      ...this.options,
      orientation: this.orientation,
      series: withSeriesType(
        [
          ...(this.groups?.length
            ? [
                {
                  id: "boxplot",
                  name: this.valueName ?? "Values",
                  data: boxplotData(this.groups, { whisker: this.whisker }),
                },
              ]
            : []),
          ...(this.series ?? []),
        ],
        "boxplot",
      ).map((s) =>
        s.type === "boxplot"
          ? {
              ...s,
              outlierShape: s.outlierShape ?? this.outlierShape,
              outlierSize: s.outlierSize ?? this.outlierSize,
            }
          : s,
      ),
    };
  }
}

/**
 * Waterfall (bridge) chart of `minerva-design/charts/core` (the
 * `<WaterfallChart>` of React): how changes take a value from a start to an
 * end, with subtotals and totals (P&L bridges, budget variances).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU bridge of changes, subtotals and totals.
 * @tag minerva-waterfall-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaWaterfallChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-waterfall-chart";

  /** Changes, subtotals and totals `{ label, value, kind, color }`, in order; property only */
  @property({ attribute: false })
  steps?: readonly WaterfallStep[];

  /** Name of the series in the tooltip (default "Change") */
  @property({ attribute: "value-name" })
  valueName?: string;

  /** Color of the increases (the success color by default) */
  @property({ attribute: "up-color" })
  upColor?: string;

  /** Color of the decreases (the danger color by default) */
  @property({ attribute: "down-color" })
  downColor?: string;

  /** Color of the totals and subtotals (the primary color by default) */
  @property({ attribute: "total-color" })
  totalColor?: string;

  /** Value the first change starts from */
  @property({ type: Number })
  start = 0;

  /** Hides the change (or total) written at the end of every bar */
  @property({ type: Boolean, attribute: "hide-labels" })
  hideLabels = false;

  /** Formats the values (labels, tooltip); property only */
  @property({ attribute: false })
  format?: (value: number) => string;

  /** Hides the thin lines from the end of every bar to the next one */
  @property({ type: Boolean, attribute: "hide-connectors" })
  hideConnectors = false;

  /** Style of the connector lines `{ color, width, dash }` (dashed, secondary text color by default); property only */
  @property({ attribute: false })
  connector?: ChartConnectorOptions;

  /** `horizontal` lays the steps out in rows */
  @property()
  orientation: "vertical" | "horizontal" = "vertical";

  /** Other engine options (axes, tooltip, annotations...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected engineOptions(): ChartOptions | null {
    if (!this.steps) return null;
    return {
      ...this.options,
      orientation: this.orientation,
      series: [
        waterfallSeries(this.steps, {
          name: this.valueName,
          upColor: this.upColor,
          downColor: this.downColor,
          totalColor: this.totalColor,
          start: this.start,
          labels: !this.hideLabels,
          format: this.format,
          connector: this.hideConnectors ? false : (this.connector ?? true),
          locale: this.options?.locale,
        }),
      ],
    };
  }
}

/**
 * Gantt chart of `minerva-design/charts/core` (the `<GanttChart>` of
 * React): tasks as bars on a time axis with their progress, groups,
 * milestones and a today line; zooms and pans along the time.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU Gantt chart of tasks, progress and milestones.
 * @tag minerva-gantt-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaGanttChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-gantt-chart";

  /** Tasks and milestones `{ name, start, end, progress, group, color, milestone }`, from top to bottom; property only */
  @property({ attribute: false })
  tasks?: readonly GanttTask[];

  /** Colors of the groups in order of appearance (the chart palette by default); property only */
  @property({ attribute: false })
  colors?: readonly string[];

  /** Name of the tasks without a group ("Tasks" in the locale by default) */
  @property({ attribute: "task-name" })
  taskName?: string;

  /** Name of the progress bars (legend, tooltip; "Progress" in the locale by default) */
  @property({ attribute: "progress-name" })
  progressName?: string;

  /** Name of the milestones (legend, tooltip; "Milestones" in the locale by default) */
  @property({ attribute: "milestone-name" })
  milestoneName?: string;

  /** Name of the dependencies row of the tooltip ("Depends on" in the locale by default) */
  @property({ attribute: "dependencies-name" })
  dependenciesName?: string;

  /** Formats the progress shares (tooltip, default "60%"); property only */
  @property({ attribute: false })
  formatProgress?: (share: number) => string;

  /** Draws a line at this date (`true`: now); property only */
  @property({ attribute: false })
  today: boolean | number | Date = false;

  /** Label of the today line */
  @property({ attribute: "today-label" })
  todayLabel?: string;

  /** Other engine options (axes, legend, annotations, interaction...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  private mountedAt = Date.now();

  protected engineOptions(): ChartOptions | null {
    if (!this.tasks) return null;
    const gantt = ganttSeries(this.tasks, {
      colors: this.colors,
      taskName: this.taskName,
      progressName: this.progressName,
      milestoneName: this.milestoneName,
      formatProgress: this.formatProgress,
      dependenciesName: this.dependenciesName,
      locale: this.options?.locale,
    });
    const today = this.today;
    const now =
      today === false
        ? null
        : today === true
          ? this.mountedAt
          : today instanceof Date
            ? today.getTime()
            : today;
    const lines: ChartAnnotation[] =
      now === null
        ? []
        : [
            {
              type: "line",
              axis: "y",
              value: now,
              color: "var(--danger-color, #dc2626)",
              dash: [4, 3],
              label: this.todayLabel,
            },
          ];
    const options = this.options ?? {};
    return {
      ...options,
      series: gantt.series,
      orientation: "horizontal",
      xAxis: {
        type: "category",
        categories: gantt.categories,
        ...options.xAxis,
      },
      yAxis: {
        type: "time",
        min: gantt.domain[0],
        max: gantt.domain[1],
        ...options.yAxis,
      },
      annotations: [...(options.annotations ?? []), ...lines],
      interaction: options.interaction ?? { zoom: "y" },
      legend: options.legend ?? gantt.series.length > 1,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-horizontal-bar-chart": MinervaHorizontalBarChart;
    "minerva-range-area-chart": MinervaRangeAreaChart;
    "minerva-mixed-chart": MinervaMixedChart;
    "minerva-bubble-chart": MinervaBubbleChart;
    "minerva-histogram-chart": MinervaHistogramChart;
    "minerva-box-plot-chart": MinervaBoxPlotChart;
    "minerva-waterfall-chart": MinervaWaterfallChart;
    "minerva-gantt-chart": MinervaGanttChart;
  }
}
