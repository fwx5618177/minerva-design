// Named cartesian charts of React Native: thin wrappers mapping the props
// of the web components (minerva-design/charts) to engine options through
// the presets of @minerva/charts/canvas, drawn by the view-based ChartBase.

import { useMemo, useState } from "react";
import {
  areaSeries,
  boxplotData,
  boxplotSeries,
  bubbleSeries,
  candlestickSeries,
  ganttSeries,
  heatmapChartOptions,
  histogramSeries,
  rangeAreaSeries,
  sparklineOptions,
  waterfallSeries,
  type ChartAnnotation,
  type ChartOptions,
  type ChartSeries,
} from "@minerva/charts/canvas";
import { ChartBase, engineOptions } from "../Chart/ChartBase";
import type { ChartCommonProps } from "../Chart/types";
import type {
  AreaChartProps,
  BoxPlotChartProps,
  BubbleChartProps,
  CandlestickChartProps,
  GanttChartProps,
  HeatmapChartProps,
  HistogramChartProps,
  MixedChartProps,
  RangeAreaChartProps,
  SparklineProps,
  WaterfallChartProps,
} from "./types";

const shallowEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
) => {
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => Object.is(a[key], b[key]))
  );
};

/**
 * The same object while every key keeps the same value (derived state:
 * the engine keeps its zoom and animations while the props are equal)
 */
function useShallowStable<T extends object>(value: T): T {
  const [stable, setStable] = useState(value);
  if (
    stable !== value &&
    !shallowEqual(
      stable as Record<string, unknown>,
      value as Record<string, unknown>,
    )
  ) {
    setStable(value);
    return value;
  }
  return stable;
}

const NO_SERIES: readonly ChartSeries[] = [];

type BaseProps = Omit<ChartCommonProps, "crosshair" | "labels"> & {
  crosshair?: boolean;
  /** Texts of the engine; a boolean is the `labels` prop of a chart (value labels) */
  labels?: ChartCommonProps["labels"] | boolean;
};

/** Engine options of the common props (every option of `engineOptions`), stable while they are equal */
function useBaseOptions(props: BaseProps) {
  const { labels } = props;
  return useShallowStable(
    engineOptions({
      ...props,
      labels: typeof labels === "object" ? labels : undefined,
      series: NO_SERIES,
    }),
  );
}

const frameProps = (props: BaseProps) => ({
  height: props.height,
  width: props.width,
  style: props.style,
  testID: props.testID,
  handleRef: props.ref,
  onHover: props.onHover,
  onPointClick: props.onPointClick,
  onPlotClick: props.onPlotClick,
  onZoom: props.onZoom,
  renderTooltip: props.renderTooltip,
});

/** Area chart: smooth by default, stacked or 100% stacked */
export function AreaChart(props: AreaChartProps) {
  const {
    series: input,
    curve = "smooth",
    stacked = false,
    percent = false,
  } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({
      ...base,
      series: areaSeries(input, { curve, stacked: stacked || percent }),
      stackMode: percent ? "percent" : undefined,
    }),
    [base, input, curve, stacked, percent],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/** Candlestick (OHLC) chart: rising and falling candles, pinch to zoom */
export function CandlestickChart(props: CandlestickChartProps) {
  const { series: input } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({ ...base, series: candlestickSeries(input) }),
    [base, input],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/** Heatmap: a grid of cells colored by value (categories or numbers on both axes) */
export function HeatmapChart(props: HeatmapChartProps) {
  const {
    data,
    xCategories,
    yCategories,
    colorScale,
    valueRange,
    colorMidpoint,
    name,
    radius,
    format,
    legend,
    interaction,
    tooltip,
  } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    () =>
      heatmapChartOptions(
        {
          data,
          xCategories,
          yCategories,
          colorScale,
          valueRange,
          colorMidpoint,
          name,
          radius,
          format,
        },
        { ...base, legend, interaction, tooltip },
      ),
    [
      base,
      data,
      xCategories,
      yCategories,
      colorScale,
      valueRange,
      colorMidpoint,
      name,
      radius,
      format,
      legend,
      interaction,
      tooltip,
    ],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/** Word-sized chart without axes: a trend in a list row, a KPI card, ... */
export function Sparkline(props: SparklineProps) {
  const {
    data,
    type,
    color,
    curve,
    name,
    reference,
    format,
    height = 48,
    width,
    tooltip,
    palette,
    ariaLabel,
    locale,
    labels,
    style,
    testID,
    ref,
    onHover,
    renderTooltip,
  } = props;
  const options = useMemo(
    () =>
      sparklineOptions(
        { data, type, color, curve, name, reference, format },
        { tooltip, palette, ariaLabel, locale, labels },
      ),
    [
      data,
      type,
      color,
      curve,
      name,
      reference,
      format,
      tooltip,
      palette,
      ariaLabel,
      locale,
      labels,
    ],
  );
  return (
    <ChartBase
      options={options}
      height={height}
      width={width}
      style={style}
      testID={testID}
      handleRef={ref}
      onHover={onHover}
      renderTooltip={renderTooltip}
    />
  );
}

/**
 * Range area chart: bands between a lower (`y0`) and an upper edge
 * (confidence intervals, min-max ranges), mixable with lines
 */
export function RangeAreaChart(props: RangeAreaChartProps) {
  const { series: input, curve = "smooth" } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({ ...base, series: rangeAreaSeries(input, curve) }),
    [base, input, curve],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/**
 * Combination chart: bars, lines and areas on one or two value axes
 * (`yAxis: "right"` series use `yAxis2`, aligned on the left grid)
 */
export function MixedChart(props: MixedChartProps) {
  const { series, yAxis2, stackMode, orientation } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({
      ...base,
      series,
      ...(yAxis2 ? { yAxis2 } : null),
      ...(stackMode ? { stackMode } : null),
      ...(orientation ? { orientation } : null),
    }),
    [base, series, yAxis2, stackMode, orientation],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/** Bubble chart: x, y and a value sized by area (√value diameters) */
export function BubbleChart(props: BubbleChartProps) {
  const { series: input, minSize, maxSize, maxValue } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({
      ...base,
      series: bubbleSeries(input, { minSize, maxSize, maxValue }),
    }),
    [base, input, minSize, maxSize, maxValue],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/**
 * Histogram: the distribution of raw samples in bins of equal width
 * (Freedman-Diaconis, Sturges or a count)
 */
export function HistogramChart(props: HistogramChartProps) {
  const {
    values,
    bins,
    domain,
    nice,
    name,
    color,
    formatBin,
    series: extra,
  } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({
      ...base,
      series: [
        histogramSeries(values, {
          bins,
          domain,
          nice,
          name,
          color,
          format: formatBin,
          locale: base.locale,
        }),
        ...(extra ?? []),
      ],
    }),
    [base, values, bins, domain, nice, name, color, formatBin, extra],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/**
 * Box plot: medians, quartiles, whiskers and outliers of samples, from raw
 * values (`groups`) or computed statistics (`series`)
 */
export function BoxPlotChart(props: BoxPlotChartProps) {
  const {
    series: input,
    groups,
    name = "Values",
    whisker,
    orientation,
    outlierShape,
    outlierSize,
  } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({
      ...base,
      series: boxplotSeries([
        ...(groups?.length
          ? [{ id: "boxplot", name, data: boxplotData(groups, { whisker }) }]
          : []),
        ...(input ?? []),
      ]).map((s) =>
        s.type === "boxplot"
          ? {
              ...s,
              outlierShape: s.outlierShape ?? outlierShape,
              outlierSize: s.outlierSize ?? outlierSize,
            }
          : s,
      ),
      ...(orientation ? { orientation } : null),
    }),
    [
      base,
      input,
      groups,
      name,
      whisker,
      orientation,
      outlierShape,
      outlierSize,
    ],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/**
 * Waterfall (bridge) chart: how changes take a value from a start to an
 * end, with subtotals and totals (P&L bridges, budget variances)
 */
export function WaterfallChart(props: WaterfallChartProps) {
  const {
    steps,
    name,
    upColor,
    downColor,
    totalColor,
    start,
    labels = true,
    format,
    connector,
    orientation,
    locale,
  } = props;
  const base = useBaseOptions(props);
  const options = useMemo(
    (): ChartOptions => ({
      ...base,
      ...(locale ? { locale } : null),
      series: [
        waterfallSeries(steps, {
          name,
          upColor,
          downColor,
          totalColor,
          start,
          labels,
          format,
          connector,
          locale: locale ?? base.locale,
        }),
      ],
      ...(orientation ? { orientation } : null),
    }),
    [
      base,
      locale,
      steps,
      name,
      upColor,
      downColor,
      totalColor,
      start,
      labels,
      format,
      connector,
      orientation,
    ],
  );
  return <ChartBase options={options} {...frameProps(props)} />;
}

/**
 * Gantt chart: tasks as bars on a time axis with their progress, groups,
 * milestones and a today line; pinch to zoom along the time
 */
export function GanttChart(props: GanttChartProps) {
  const {
    tasks,
    colors,
    taskName,
    progressName,
    milestoneName,
    formatProgress,
    dependenciesName,
    today = false,
    todayLabel,
    xAxis,
    yAxis,
    annotations,
    interaction,
    legend,
    locale,
  } = props;
  const base = useBaseOptions(props);
  const [mountedAt] = useState(() => Date.now());
  const now =
    today === false
      ? null
      : today === true
        ? mountedAt
        : today instanceof Date
          ? today.getTime()
          : today;
  const options = useMemo((): ChartOptions => {
    const gantt = ganttSeries(tasks, {
      colors,
      taskName,
      progressName,
      milestoneName,
      formatProgress,
      dependenciesName,
      locale: locale ?? base.locale,
    });
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
              label: todayLabel,
            },
          ];
    return {
      ...base,
      ...(locale ? { locale } : null),
      series: gantt.series,
      orientation: "horizontal",
      xAxis: { type: "category", categories: gantt.categories, ...xAxis },
      yAxis: {
        type: "time",
        min: gantt.domain[0],
        max: gantt.domain[1],
        ...yAxis,
      },
      annotations: [...(annotations ?? []), ...lines],
      interaction: interaction ?? { zoom: "y" },
      legend: legend ?? gantt.series.length > 1,
    };
  }, [
    base,
    locale,
    tasks,
    colors,
    taskName,
    progressName,
    milestoneName,
    formatProgress,
    dependenciesName,
    now,
    todayLabel,
    xAxis,
    yAxis,
    annotations,
    interaction,
    legend,
  ]);
  return <ChartBase options={options} {...frameProps(props)} />;
}
