// Engine options of the named cartesian charts from their props (like the
// web components of minerva-design/charts): the presets of
// @minerva/charts/canvas applied to plain copies of the reactive props.
import { toRaw } from "vue";
import {
  areaSeries,
  barSeries,
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
  type BinOptions,
  type BoxplotGroup,
  type BoxplotStatsOptions,
  type ChartAnnotation,
  type ChartAxisOptions,
  type ChartColorScheme,
  type ChartConnectorOptions,
  type ChartCurve,
  type ChartOptions,
  type ChartOrientation,
  type ChartSeries,
  type ChartTooltipOptions,
  type GanttTask,
  type HeatmapCell,
  type WaterfallStep,
} from "@minerva/charts/canvas";
import {
  chartEngineOptions,
  plain,
  plainSeries,
  type ChartOptionProps,
} from "./chart-canvas";

interface SeriesProps extends ChartOptionProps {
  series: readonly ChartSeries[];
}

/** Defined keys only (an undefined key would override an engine default) */
const defined = <T extends object>(value: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined),
  ) as Partial<T>;

export function areaChartOptions(
  props: SeriesProps & {
    curve?: ChartCurve;
    stacked?: boolean;
    percent?: boolean;
  },
): ChartOptions {
  const stacked = !!props.stacked || !!props.percent;
  return {
    ...chartEngineOptions(
      props,
      areaSeries(plainSeries(props.series), {
        curve: props.curve ?? "smooth",
        stacked,
      }),
    ),
    ...(props.percent ? { stackMode: "percent" as const } : {}),
  };
}

export function horizontalBarChartOptions(
  props: SeriesProps & {
    stacked?: boolean;
    percent?: boolean;
    labels?: boolean;
  },
): ChartOptions {
  return {
    ...chartEngineOptions(
      props,
      barSeries(
        plainSeries(props.series),
        !!props.stacked || !!props.percent,
        !!props.labels,
      ),
    ),
    orientation: "horizontal",
    ...(props.percent ? { stackMode: "percent" as const } : {}),
  };
}

export const candlestickChartOptions = (props: SeriesProps): ChartOptions =>
  chartEngineOptions(props, candlestickSeries(plainSeries(props.series)));

export const rangeAreaChartOptions = (
  props: SeriesProps & { curve?: ChartCurve },
): ChartOptions =>
  chartEngineOptions(
    props,
    rangeAreaSeries(plainSeries(props.series), props.curve ?? "smooth"),
  );

export const mixedChartOptions = (
  props: SeriesProps & {
    yAxis2?: ChartAxisOptions;
    stackMode?: "normal" | "percent";
    orientation?: ChartOrientation;
  },
): ChartOptions => ({
  ...chartEngineOptions(props, plainSeries(props.series)),
  ...defined({
    yAxis2: plain(props.yAxis2),
    stackMode: props.stackMode,
    orientation: props.orientation,
  }),
});

export const bubbleChartOptions = (
  props: SeriesProps & {
    minSize?: number;
    maxSize?: number;
    maxValue?: number;
  },
): ChartOptions =>
  chartEngineOptions(
    props,
    bubbleSeries(plainSeries(props.series), {
      minSize: props.minSize,
      maxSize: props.maxSize,
      maxValue: props.maxValue,
    }),
  );

export function heatmapOptions(
  props: ChartOptionProps & {
    data: readonly HeatmapCell[];
    xCategories?: readonly string[];
    yCategories?: readonly string[];
    colorScale?: readonly string[] | ChartColorScheme;
    valueRange?: readonly [number, number];
    colorMidpoint?: number;
    name?: string;
    radius?: number;
    format?: (value: number) => string;
  },
): ChartOptions {
  const base: Partial<ChartOptions> = chartEngineOptions(props, []);
  return heatmapChartOptions(
    {
      data: plain(props.data),
      xCategories: plain(props.xCategories),
      yCategories: plain(props.yCategories),
      colorScale: plain(props.colorScale),
      valueRange: plain(props.valueRange),
      colorMidpoint: props.colorMidpoint,
      name: props.name,
      radius: props.radius,
      format: props.format,
    },
    base,
  );
}

export const sparklineChartOptions = (props: {
  data: ChartSeries["data"];
  type?: "line" | "area" | "bar";
  color?: string;
  curve?: ChartCurve;
  name?: string;
  reference?: number;
  format?: (value: number) => string;
  tooltip?: boolean | ChartTooltipOptions;
  palette?: readonly string[];
  ariaLabel?: string;
  locale?: string;
  labels?: unknown;
}): ChartOptions =>
  sparklineOptions(
    {
      data: toRaw(props.data),
      type: props.type,
      color: props.color,
      curve: props.curve,
      name: props.name,
      reference: props.reference,
      format: props.format,
    },
    {
      tooltip: plain(props.tooltip),
      palette: plain(props.palette),
      ariaLabel: props.ariaLabel,
      ...defined({
        locale: props.locale || undefined,
        labels:
          props.labels && typeof props.labels === "object"
            ? (plain(props.labels) as ChartOptions["labels"])
            : undefined,
      }),
    },
  );

export const histogramChartOptions = (
  props: ChartOptionProps &
    BinOptions & {
      values: ArrayLike<number>;
      name?: string;
      color?: string;
      formatBin?: (value: number) => string;
      series?: readonly ChartSeries[];
    },
): ChartOptions =>
  chartEngineOptions(props, [
    histogramSeries(toRaw(props.values), {
      bins: props.bins,
      domain: plain(props.domain),
      nice: props.nice,
      name: props.name,
      color: props.color,
      format: props.formatBin,
      locale: props.locale || undefined,
    }),
    ...plainSeries(props.series),
  ]);

export const boxPlotChartOptions = (
  props: ChartOptionProps &
    BoxplotStatsOptions & {
      series?: readonly ChartSeries[];
      groups?: readonly BoxplotGroup[];
      name?: string;
      orientation?: ChartOrientation;
      outlierShape?: "hollow" | "filled";
      outlierSize?: number;
    },
): ChartOptions => {
  const groups = toRaw(props.groups);
  const { outlierShape, outlierSize } = props;
  return {
    ...chartEngineOptions(
      props,
      boxplotSeries([
        ...(groups?.length
          ? [
              {
                id: "boxplot",
                name: props.name ?? "Values",
                data: boxplotData(groups, { whisker: props.whisker }),
              },
            ]
          : []),
        ...plainSeries(props.series),
      ]).map((s) =>
        s.type === "boxplot"
          ? {
              ...s,
              outlierShape: s.outlierShape ?? outlierShape,
              outlierSize: s.outlierSize ?? outlierSize,
            }
          : s,
      ),
    ),
    ...defined({ orientation: props.orientation }),
  };
};

export const waterfallChartOptions = (
  props: ChartOptionProps & {
    steps: readonly WaterfallStep[];
    name?: string;
    upColor?: string;
    downColor?: string;
    totalColor?: string;
    start?: number;
    labels?: boolean;
    format?: (value: number) => string;
    connector?: boolean | ChartConnectorOptions;
    locale?: string;
    orientation?: ChartOrientation;
  },
): ChartOptions => ({
  ...chartEngineOptions(props, [
    waterfallSeries(plain(props.steps), {
      name: props.name,
      upColor: props.upColor,
      downColor: props.downColor,
      totalColor: props.totalColor,
      start: props.start,
      labels: props.labels ?? true,
      format: props.format,
      connector: plain(props.connector),
      locale: props.locale,
    }),
  ]),
  ...defined({ orientation: props.orientation, locale: props.locale }),
});

export function ganttChartOptions(
  props: ChartOptionProps & {
    tasks: readonly GanttTask[];
    colors?: readonly string[];
    taskName?: string;
    progressName?: string;
    milestoneName?: string;
    formatProgress?: (share: number) => string;
    dependenciesName?: string;
    dependencyArrows?: boolean;
    dependencyColor?: string;
    locale?: string;
    today?: boolean | number | Date;
    todayLabel?: string;
  },
  mountedAt: number,
): ChartOptions {
  const gantt = ganttSeries(plain(props.tasks), {
    colors: plain(props.colors),
    taskName: props.taskName,
    progressName: props.progressName,
    milestoneName: props.milestoneName,
    formatProgress: props.formatProgress,
    dependenciesName: props.dependenciesName,
    dependencyArrows: props.dependencyArrows,
    dependencyColor: props.dependencyColor,
    locale: props.locale,
  });
  const today = props.today ?? false;
  const now =
    today === false
      ? null
      : today === true
        ? mountedAt
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
            label: props.todayLabel,
          },
        ];
  const base = chartEngineOptions(props, gantt.series);
  return {
    ...base,
    ...defined({ locale: props.locale }),
    dependencies: gantt.dependencies,
    orientation: "horizontal",
    xAxis: { type: "category", categories: gantt.categories, ...base.xAxis },
    yAxis: {
      type: "time",
      min: gantt.domain[0],
      max: gantt.domain[1],
      ...base.yAxis,
    },
    annotations: [...(base.annotations ?? []), ...lines],
    interaction: base.interaction ?? { zoom: "y" },
    legend: base.legend ?? gantt.series.length > 1,
  };
}
