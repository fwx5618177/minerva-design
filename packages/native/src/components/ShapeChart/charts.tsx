import { useMemo } from "react";
import {
  calendarStrips,
  type BulletChartOptions,
  type CalendarHeatmapOptions,
  type ChordChartOptions,
  type FunnelChartOptions,
  type GaugeChartOptions,
  type PieChartOptions,
  type RadarChartOptions,
  type RadialBarChartOptions,
  type SankeyChartOptions,
  type ShapeChartCommonOptions,
  type ShapeChartOptions,
  type ShapeDrillEvent,
  type SunburstChartOptions,
  type TreemapChartOptions,
} from "@minerva/charts/canvas";
import { ShapeChartBase } from "./ShapeChartBase";
import type {
  BulletChartProps,
  CalendarHeatmapProps,
  ChordChartProps,
  DonutChartProps,
  FunnelChartProps,
  GaugeChartProps,
  PieChartProps,
  RadarChartProps,
  RadialBarChartProps,
  SankeyChartProps,
  ShapeChartCommonProps,
  ShapeChartFrameProps,
  ShapeChartProps,
  SunburstChartProps,
  TreemapChartProps,
} from "./types";

/** Engine options shared by every type, stable while the props are equal */
function useCommonOptions({
  palette,
  legend,
  tooltip,
  format,
  percentFormat,
  hidden,
  animation,
  padding,
  ariaLabel,
  locale,
  texts,
}: ShapeChartCommonProps): ShapeChartCommonOptions {
  // a new array with the same indexes keeps the options (and the animation)
  const hiddenKey = hidden ? hidden.join(",") : null;
  const stableHidden = useMemo(
    () =>
      hiddenKey === null
        ? undefined
        : hiddenKey
          ? hiddenKey.split(",").map(Number)
          : [],
    [hiddenKey],
  );
  return useMemo(
    () => ({
      palette,
      legend,
      tooltip,
      format,
      percentFormat,
      hidden: stableHidden,
      animation,
      padding,
      ariaLabel,
      locale,
      texts,
    }),
    [
      palette,
      legend,
      tooltip,
      format,
      percentFormat,
      stableHidden,
      animation,
      padding,
      ariaLabel,
      locale,
      texts,
    ],
  );
}

function ShapeHost({
  frame,
  options,
  defaultHeight,
  onDrill,
}: {
  frame: ShapeChartFrameProps;
  options: ShapeChartOptions;
  defaultHeight: number;
  onDrill?: (event: ShapeDrillEvent) => void;
}) {
  const {
    height,
    width,
    style,
    testID,
    ref,
    onHover,
    onClick,
    onToggle,
    renderTooltip,
  } = frame;
  return (
    <ShapeChartBase
      options={options}
      height={height ?? defaultHeight}
      width={width}
      style={style}
      testID={testID}
      handleRef={ref}
      onHover={onHover}
      onClick={onClick}
      onToggle={onToggle}
      onDrill={onDrill}
      renderTooltip={renderTooltip}
    />
  );
}

function PieBase(props: PieChartProps & { defaultInner: number }) {
  const {
    data,
    innerRadius,
    startAngle,
    padAngle,
    cornerRadius,
    rose,
    labels,
    labelContent,
    centerValue,
    centerLabel,
    defaultInner,
  } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): PieChartOptions => ({
      ...common,
      type: "pie",
      data,
      innerRadius: innerRadius ?? defaultInner,
      startAngle,
      padAngle,
      cornerRadius,
      rose,
      labels,
      labelContent,
      centerValue,
      centerLabel,
    }),
    [
      common,
      data,
      innerRadius,
      defaultInner,
      startAngle,
      padAngle,
      cornerRadius,
      rose,
      labels,
      labelContent,
      centerValue,
      centerLabel,
    ],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={320} />;
}

/**
 * Pie chart (or a donut with `innerRadius`, or a Nightingale rose with
 * `rose`): slices with gaps, outside labels with leader lines, legend
 * toggles, tooltip while a slice is pressed.
 */
export function PieChart(props: PieChartProps) {
  return <PieBase {...props} defaultInner={0} />;
}

/** Donut chart: a PieChart with a hole and optional center texts */
export function DonutChart(props: DonutChartProps) {
  return <PieBase {...props} defaultInner={0.62} />;
}

/** Radar (spider) chart comparing series over several indicators */
export function RadarChart(props: RadarChartProps) {
  const { indicators, series, shape, levels, dots } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): RadarChartOptions => ({
      ...common,
      type: "radar",
      indicators,
      series,
      shape,
      levels,
      dots,
    }),
    [common, indicators, series, shape, levels, dots],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={320} />;
}

/** Gauge (speedometer) showing one value on an arc, with colored bands */
export function GaugeChart(props: GaugeChartProps) {
  const {
    value,
    min,
    max,
    label,
    sweep,
    thickness,
    bands,
    color,
    needle,
    ticks,
  } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): GaugeChartOptions => ({
      ...common,
      type: "gauge",
      value: value ?? 0,
      min,
      max,
      label,
      sweep,
      thickness,
      bands,
      color,
      needle,
      ticks,
    }),
    [
      common,
      value,
      min,
      max,
      label,
      sweep,
      thickness,
      bands,
      color,
      needle,
      ticks,
    ],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={240} />;
}

/** Funnel chart of the stages of a process, with conversion rates */
export function FunnelChart(props: FunnelChartProps) {
  const { data, sort, gap, conversion, shape } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): FunnelChartOptions => ({
      ...common,
      type: "funnel",
      data,
      sort,
      gap,
      conversion,
      shape,
    }),
    [common, data, sort, gap, conversion, shape],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={320} />;
}

/** Treemap: nested rectangles of areas proportional to the values */
export function TreemapChart(props: TreemapChartProps) {
  const { data, gap, headers } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): TreemapChartOptions => ({
      ...common,
      type: "treemap",
      data,
      gap,
      headers,
    }),
    [common, data, gap, headers],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={320} />;
}

/**
 * Sankey diagram: flows between nodes in columns, link thickness
 * proportional to the flow; pressing a node or a link highlights its flows
 */
export function SankeyChart(props: SankeyChartProps) {
  const {
    nodes,
    links,
    nodeWidth,
    nodePadding,
    align,
    iterations,
    linkColor,
    linkOpacity,
    labels,
    labelValues,
  } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): SankeyChartOptions => ({
      ...common,
      type: "sankey",
      nodes,
      links,
      nodeWidth,
      nodePadding,
      align,
      iterations,
      linkColor,
      linkOpacity,
      labels,
      labelValues,
    }),
    [
      common,
      nodes,
      links,
      nodeWidth,
      nodePadding,
      align,
      iterations,
      linkColor,
      linkOpacity,
      labels,
      labelValues,
    ],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={360} />;
}

/**
 * Sunburst chart: a hierarchy as concentric rings; tapping a parent zooms
 * into it, tapping the center goes back up
 */
export function SunburstChart(props: SunburstChartProps) {
  const {
    data,
    innerRadius,
    levels,
    startAngle,
    padAngle,
    cornerRadius,
    labels,
    drill,
    drillPath,
    onDrill,
  } = props;
  const common = useCommonOptions(props);
  // a new array with the same names keeps the options (and the animation)
  const drillKey = drillPath ? JSON.stringify(drillPath) : null;
  const stablePath = useMemo(
    () => (drillKey === null ? undefined : (JSON.parse(drillKey) as string[])),
    [drillKey],
  );
  const options = useMemo(
    (): SunburstChartOptions => ({
      ...common,
      type: "sunburst",
      data,
      innerRadius,
      levels,
      startAngle,
      padAngle,
      cornerRadius,
      labels,
      drill,
      drillPath: stablePath,
    }),
    [
      common,
      data,
      innerRadius,
      levels,
      startAngle,
      padAngle,
      cornerRadius,
      labels,
      drill,
      stablePath,
    ],
  );
  return (
    <ShapeHost
      frame={props}
      options={options}
      defaultHeight={360}
      onDrill={onDrill}
    />
  );
}

/** Radial bar chart: concentric progress rings (activity rings, KPI completion) */
export function RadialBarChart(props: RadialBarChartProps) {
  const {
    data,
    max,
    innerRadius,
    startAngle,
    sweep,
    gap,
    track,
    rounded,
    labels,
    labelContent,
    centerValue,
    centerLabel,
  } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): RadialBarChartOptions => ({
      ...common,
      type: "radialBar",
      data,
      max,
      innerRadius,
      startAngle,
      sweep,
      gap,
      track,
      rounded,
      labels,
      labelContent,
      centerValue,
      centerLabel,
    }),
    [
      common,
      data,
      max,
      innerRadius,
      startAngle,
      sweep,
      gap,
      track,
      rounded,
      labels,
      labelContent,
      centerValue,
      centerLabel,
    ],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={300} />;
}

/** Calendar heatmap: daily values on a calendar, contributions-style */
export function CalendarHeatmap(props: CalendarHeatmapProps) {
  const {
    data,
    range,
    layout,
    weekStart,
    locale,
    color,
    colors,
    levels,
    thresholds,
    gap,
    radius,
    maxCellSize,
    monthLabels,
    weekdayLabels,
  } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): CalendarHeatmapOptions => ({
      ...common,
      type: "calendarHeatmap",
      data,
      range,
      layout,
      weekStart,
      locale,
      color,
      colors,
      levels,
      thresholds,
      gap,
      radius,
      maxCellSize,
      monthLabels,
      weekdayLabels,
    }),
    [
      common,
      data,
      range,
      layout,
      weekStart,
      locale,
      color,
      colors,
      levels,
      thresholds,
      gap,
      radius,
      maxCellSize,
      monthLabels,
      weekdayLabels,
    ],
  );
  const legend = options.legend === false ? 0 : 34;
  // one strip of weeks per year when the range spans more than 53 weeks
  const defaultHeight =
    layout === "months" ? 560 : calendarStrips(options) * 120 + legend + 16;
  return (
    <ShapeHost frame={props} options={options} defaultHeight={defaultHeight} />
  );
}

/** Bullet chart: KPI bars against qualitative ranges and a target marker */
export function BulletChart(props: BulletChartProps) {
  const {
    data,
    orientation,
    ranges,
    rangeLabels,
    rangeColors,
    barSize,
    targetColor,
    ticks,
  } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): BulletChartOptions => ({
      ...common,
      type: "bullet",
      data,
      orientation,
      ranges,
      rangeLabels,
      rangeColors,
      barSize,
      targetColor,
      ticks,
    }),
    [
      common,
      data,
      orientation,
      ranges,
      rangeLabels,
      rangeColors,
      barSize,
      targetColor,
      ticks,
    ],
  );
  const legend = options.legend ? 34 : 0;
  const defaultHeight =
    orientation === "vertical"
      ? 320
      : Math.max(96, data.length * 64 + 16) + legend;
  return (
    <ShapeHost frame={props} options={options} defaultHeight={defaultHeight} />
  );
}

/**
 * Chord diagram: flows between groups around a circle; pressing a group
 * highlights its ribbons, pressing a ribbon shows both directions
 */
export function ChordChart(props: ChordChartProps) {
  const {
    groups,
    matrix,
    links,
    directed,
    arrows,
    padAngle,
    startAngle,
    sortGroups,
    sortSubgroups,
    ribbonColor,
    ribbonOpacity,
    arcWidth,
    ticks,
    tickFormat,
    labels,
  } = props;
  const common = useCommonOptions(props);
  const options = useMemo(
    (): ChordChartOptions => ({
      ...common,
      type: "chord",
      groups,
      matrix,
      links,
      directed,
      arrows,
      padAngle,
      startAngle,
      sortGroups,
      sortSubgroups,
      ribbonColor,
      ribbonOpacity,
      arcWidth,
      ticks,
      tickFormat,
      labels,
    }),
    [
      common,
      groups,
      matrix,
      links,
      directed,
      arrows,
      padAngle,
      startAngle,
      sortGroups,
      sortSubgroups,
      ribbonColor,
      ribbonOpacity,
      arcWidth,
      ticks,
      tickFormat,
      labels,
    ],
  );
  return <ShapeHost frame={props} options={options} defaultHeight={420} />;
}

/** Default height of a shape chart type (ShapeChart) */
const DEFAULT_HEIGHTS: Partial<Record<ShapeChartOptions["type"], number>> = {
  gauge: 240,
  radialBar: 300,
  sankey: 360,
  sunburst: 360,
  chord: 420,
};

/**
 * Any shape chart from its engine options (`type`: pie, radar, gauge,
 * funnel, treemap and the other shape types of the engine), drawn with views
 */
export function ShapeChart(props: ShapeChartProps) {
  const { options, onDrill } = props;
  return (
    <ShapeHost
      frame={props}
      options={options}
      defaultHeight={DEFAULT_HEIGHTS[options.type] ?? 320}
      onDrill={onDrill}
    />
  );
}
