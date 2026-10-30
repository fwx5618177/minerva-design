import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from "@angular/core";
import {
  boxplotData,
  bubbleSeries,
  ganttSeries,
  histogramSeries,
  waterfallSeries,
  type BoxplotGroup,
  type ChartAnnotation,
  type ChartAxisOptions,
  type ChartConnectorOptions,
  type ChartCurve,
  type ChartOptions,
  type ChartOrientation,
  type ChartSeries,
  type GanttTask,
  type HistogramBinning,
  type WaterfallStep,
} from "minerva-design/charts/core";
import { MnSeriesChartBase, withSeriesType } from "./cartesian";
import { CHART_SURFACE } from "./engine";

/**
 * Horizontal bar chart: categories down the left side, values from the
 * left (rankings, long names, diverging surveys, stacked progress)
 */
@Component({
  selector: "mn-horizontal-bar-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnHorizontalBarChart extends MnSeriesChartBase {
  /** Series drawn as bars from the left unless they set a `type`; the x values (categories) run from top to bottom */
  readonly series = input.required<readonly ChartSeries[]>();
  /** Stacks the bars of every series (otherwise they are grouped side by side) */
  readonly stacked = input(false, { transform: booleanAttribute });
  /** Scales the stacks to 100% (implies `stacked`) */
  readonly percent = input(false, { transform: booleanAttribute });
  /** Writes the value at the end of every bar */
  readonly labels = input(false, { transform: booleanAttribute });

  protected engineOptions(): ChartOptions {
    const labels = this.labels();
    return {
      ...this.axesOptions(),
      orientation: "horizontal",
      series: withSeriesType(
        this.series(),
        "bar",
        this.stacked() || this.percent() ? "stack" : undefined,
      ).map((s) =>
        labels && s.type === "bar"
          ? { ...s, showLabels: s.showLabels ?? true }
          : s,
      ),
      stackMode: this.percent() ? "percent" : undefined,
    };
  }
}

/**
 * Range area chart: bands between a lower (`y0`) and an upper edge
 * (confidence intervals, min-max ranges), mixable with lines
 */
@Component({
  selector: "mn-range-area-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnRangeAreaChart extends MnSeriesChartBase {
  /** Bands between `y0` (lower edge) and `y` (upper edge) of every point, unless a series sets a `type` */
  readonly series = input.required<readonly ChartSeries[]>();
  /** Shape of the edges: straight, smooth (monotone) or steps */
  readonly curve = input<ChartCurve>("smooth");

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: withSeriesType(
        this.series(),
        "area",
        undefined,
        this.curve(),
      ).map((s) =>
        s.type === "area" ? { ...s, lineWidth: s.lineWidth ?? 1.5 } : s,
      ),
    };
  }
}

/**
 * Combination chart: bars, lines and areas on one or two value axes
 * (`yAxis: "right"` series use `yAxis2`, aligned on the left grid)
 */
@Component({
  selector: "mn-mixed-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnMixedChart extends MnSeriesChartBase {
  /** Bars, lines, areas and dots, each with its `type` (line by default) */
  readonly series = input.required<readonly ChartSeries[]>();
  /** Right value axis of the series with `yAxis: "right"` */
  readonly yAxis2 = input<ChartAxisOptions | undefined>(undefined);
  /** `percent` scales every stack to 100% at each x */
  readonly stackMode = input<"normal" | "percent" | undefined>(undefined);
  /** `horizontal` puts the x axis (categories) down the left side */
  readonly orientation = input<ChartOrientation | undefined>(undefined);

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: withSeriesType(this.series(), "line"),
      yAxis2: this.yAxis2(),
      stackMode: this.stackMode(),
      orientation: this.orientation(),
    };
  }
}

/** Bubble chart: x, y and a value sized by area (√value diameters) */
@Component({
  selector: "mn-bubble-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnBubbleChart extends MnSeriesChartBase {
  /** Series of points with a `value` sizing their bubble (area ∝ value) */
  readonly series = input.required<readonly ChartSeries[]>();
  /** Diameter in pixels of the smallest bubbles (default 6) */
  readonly minSize = input<number | undefined>(undefined);
  /** Diameter in pixels of the largest value (default 48) */
  readonly maxSize = input<number | undefined>(undefined);
  /** Value drawn with `maxSize` (share a scale between charts); the largest value by default */
  readonly maxValue = input<number | undefined>(undefined);

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: bubbleSeries(this.series(), {
        minSize: this.minSize(),
        maxSize: this.maxSize(),
        maxValue: this.maxValue(),
      }),
    };
  }
}

/**
 * Histogram: the distribution of raw samples in bins of equal width
 * (Freedman-Diaconis, Sturges or a count); millions of samples are binned
 * in milliseconds
 */
@Component({
  selector: "mn-histogram-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnHistogramChart extends MnSeriesChartBase {
  /** Raw samples (typed arrays are counted without copies) */
  readonly values = input.required<ArrayLike<number>>();
  /** Number of bins, or the rule choosing it (default `auto`) */
  readonly bins = input<HistogramBinning | undefined>(undefined);
  /** Range covered by the bins; the data range by default */
  readonly domain = input<readonly [number, number] | undefined>(undefined);
  /** Rounds the bin width to 1, 2 or 5 × 10^k and aligns the edges on it */
  readonly nice = input(true, { transform: booleanAttribute });
  /** Name of the counts (legend, tooltip; default "Count") */
  readonly name = input<string | undefined>(undefined);
  /** Bar color (any CSS color) */
  readonly color = input<string | undefined>(undefined);
  /** Formats the edges of the bins in the tooltip */
  readonly formatBin = input<((value: number) => string) | undefined>(
    undefined,
  );
  /** More series drawn over the bins (e.g. a density `line`) */
  readonly series = input<readonly ChartSeries[] | undefined>(undefined);

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      series: [
        histogramSeries(this.values(), {
          bins: this.bins(),
          domain: this.domain(),
          nice: this.nice(),
          name: this.name(),
          color: this.color(),
          format: this.formatBin(),
        }),
        ...withSeriesType(this.series() ?? [], "line"),
      ],
    };
  }
}

/**
 * Box plot: medians, quartiles, whiskers and outliers of samples, from raw
 * values (`groups`) or computed statistics (`series`)
 */
@Component({
  selector: "mn-box-plot-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnBoxPlotChart extends MnSeriesChartBase {
  /** Series of box plots: points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers` */
  readonly series = input<readonly ChartSeries[] | undefined>(undefined);
  /** Raw samples, one box each (an alternative to `series`) */
  readonly groups = input<readonly BoxplotGroup[] | undefined>(undefined);
  /** Name of the series built from `groups` */
  readonly name = input("Values");
  /** Reach of the whiskers in interquartile ranges (Tukey: 1.5), or `minmax` */
  readonly whisker = input<number | "minmax" | undefined>(undefined);
  /** Outliers drawn as rings of the series color or as filled dots; series may set their own (default `hollow`) */
  readonly outlierShape = input<"hollow" | "filled" | undefined>(undefined);
  /** Diameter of the outliers in CSS pixels (default 7) */
  readonly outlierSize = input<number | undefined>(undefined);
  /** `horizontal` lays the boxes out in rows */
  readonly orientation = input<ChartOrientation | undefined>(undefined);

  protected engineOptions(): ChartOptions | null {
    const groups = this.groups();
    const series = this.series();
    if (!groups?.length && !series) return null;
    return {
      ...this.axesOptions(),
      orientation: this.orientation(),
      series: withSeriesType(
        [
          ...(groups?.length
            ? [
                {
                  id: "boxplot",
                  name: this.name(),
                  data: boxplotData(groups, { whisker: this.whisker() }),
                },
              ]
            : []),
          ...(series ?? []),
        ],
        "boxplot",
      ).map((s) =>
        s.type === "boxplot"
          ? {
              ...s,
              outlierShape: s.outlierShape ?? this.outlierShape(),
              outlierSize: s.outlierSize ?? this.outlierSize(),
            }
          : s,
      ),
    };
  }
}

/**
 * Waterfall (bridge) chart: how changes take a value from a start to an
 * end, with subtotals and totals (P&L bridges, budget variances)
 */
@Component({
  selector: "mn-waterfall-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnWaterfallChart extends MnSeriesChartBase {
  /** Changes, subtotals and totals `{ label, value, kind, color }`, in order */
  readonly steps = input.required<readonly WaterfallStep[]>();
  /** Name of the series (tooltip; default "Change") */
  readonly name = input<string | undefined>(undefined);
  /** Color of the increases (the success color by default) */
  readonly upColor = input<string | undefined>(undefined);
  /** Color of the decreases (the danger color by default) */
  readonly downColor = input<string | undefined>(undefined);
  /** Color of the totals and subtotals (the primary color by default) */
  readonly totalColor = input<string | undefined>(undefined);
  /** Value the first change starts from (default 0) */
  readonly start = input<number | undefined>(undefined);
  /** Writes the change (or the total) at the end of every bar */
  readonly labels = input(true, { transform: booleanAttribute });
  /** Formats the values (labels, tooltip) */
  readonly format = input<((value: number) => string) | undefined>(undefined);
  /** Thin lines from the end of every bar to the next one; an object styles them (default `true`: dashed, secondary text color) */
  readonly connector = input<boolean | ChartConnectorOptions | undefined>(
    undefined,
  );
  /** `horizontal` lays the steps out in rows */
  readonly orientation = input<ChartOrientation | undefined>(undefined);

  protected engineOptions(): ChartOptions {
    return {
      ...this.axesOptions(),
      orientation: this.orientation(),
      series: [
        waterfallSeries(this.steps(), {
          name: this.name(),
          upColor: this.upColor(),
          downColor: this.downColor(),
          totalColor: this.totalColor(),
          start: this.start(),
          labels: this.labels(),
          format: this.format(),
          connector: this.connector(),
          locale: this.locale(),
        }),
      ],
    };
  }
}

/**
 * Gantt chart: tasks as bars on a time axis with their progress, groups,
 * milestones and a today line; zooms and pans along the time
 */
@Component({
  selector: "mn-gantt-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnGanttChart extends MnSeriesChartBase {
  /** Tasks and milestones `{ name, start, end, progress, group, color, milestone }`, from top to bottom */
  readonly tasks = input.required<readonly GanttTask[]>();
  /** Colors of the groups in order of appearance; the chart palette by default */
  readonly colors = input<readonly string[] | undefined>(undefined);
  /** Name of the tasks without a group (default "Tasks") */
  readonly taskName = input<string | undefined>(undefined);
  /** Name of the progress bars (legend, tooltip; default "Progress") */
  readonly progressName = input<string | undefined>(undefined);
  /** Name of the milestones (legend, tooltip; default "Milestones") */
  readonly milestoneName = input<string | undefined>(undefined);
  /** Formats the progress shares (tooltip; default "60%") */
  readonly formatProgress = input<((share: number) => string) | undefined>(
    undefined,
  );
  /** Name of the dependencies row of the tooltip (default "Depends on", in the `locale`) */
  readonly dependenciesName = input<string | undefined>(undefined);
  /** Draws a line at this date (`true`: now) */
  readonly today = input<boolean | number | Date>(false);
  /** Label of the today line */
  readonly todayLabel = input<string | undefined>(undefined);

  private readonly mountedAt = Date.now();

  protected engineOptions(): ChartOptions {
    const gantt = ganttSeries(this.tasks(), {
      colors: this.colors(),
      taskName: this.taskName(),
      progressName: this.progressName(),
      milestoneName: this.milestoneName(),
      formatProgress: this.formatProgress(),
      dependenciesName: this.dependenciesName(),
      locale: this.locale(),
    });
    const today = this.today();
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
              label: this.todayLabel(),
            },
          ];
    const options = this.axesOptions();
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
