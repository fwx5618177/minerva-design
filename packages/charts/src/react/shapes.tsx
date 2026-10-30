import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal, flushSync } from "react-dom";
import type { ChartPadding } from "../engine/types";
import { calendarStrips } from "../engine/shapes/calendar";
import { createShapeChart } from "../engine/shapes/chart";
import type {
  BulletChartOptions,
  BulletDatum,
  CalendarDate,
  CalendarDatum,
  CalendarHeatmapOptions,
  ChordChartOptions,
  ChordGroup,
  ChordLink,
  FunnelChartOptions,
  GaugeBand,
  GaugeChartOptions,
  PieChartOptions,
  RadarChartOptions,
  RadarIndicator,
  RadarSeries,
  RadialBarChartOptions,
  RadialBarDatum,
  SankeyChartOptions,
  SankeyLink,
  SankeyNode,
  ShapeChartCommonOptions,
  ShapeChartInstance,
  ShapeChartLabels,
  ShapeChartOptions,
  ShapeDatum,
  ShapeDrillEvent,
  ShapeHoverEvent,
  ShapeLegendOptions,
  ShapeToggleEvent,
  ShapeTooltipOptions,
  SunburstChartOptions,
  TreemapChartOptions,
  TreemapNode,
} from "../engine/shapes/types";

/** Imperative handle of the shape chart components (`ref`) */
export interface ShapeChartHandle {
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): ShapeChartInstance | null;
}

/**
 * Props shared by PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart,
 * TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap,
 * BulletChart and ChordChart
 */
export interface ShapeChartCommonProps {
  /**
   * Height of the chart (the legend included); numbers are pixels
   * @default 320 (GaugeChart: 240, RadialBarChart: 300, ChordChart: 420, CalendarHeatmap and BulletChart: from the data)
   */
  height?: number | string;
  /**
   * Width of the chart; numbers are pixels
   * @default "100%"
   */
  width?: number | string;
  /** Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /**
   * Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level
   * @default shown for pie, donut, funnel, multi-series radar charts, calendar heatmaps and radial bar charts without labels
   */
  legend?: boolean | ShapeLegendOptions;
  /**
   * Tooltip; `false` disables it
   * @default true
   */
  tooltip?: boolean | ShapeTooltipOptions;
  /**
   * Formats the values of the labels and the tooltip
   * @default compact numbers of the `locale` (1.2k, 3.4M; 1.2万 in Chinese and Japanese)
   */
  format?: (value: number) => string;
  /**
   * Formats the shares (labels, conversion rates, tooltip); `share` is 0-1
   * @default a percent of the `locale` with one decimal, e.g. "40.0%", "40,0 %"
   */
  percentFormat?: (share: number) => string;
  /**
   * BCP 47 locale of the texts and numbers the chart writes (tooltip rows,
   * accessible names, number and percent formats, calendar dates); built-in
   * texts in English, Chinese, Japanese and French (English otherwise)
   * @default the page language (`<html lang>`, followed when it changes), else the browser language
   */
  locale?: string;
  /** Replaces built-in texts of the `locale` (tooltip rows, accessible names, "No data") */
  texts?: Partial<ShapeChartLabels>;
  /**
   * Hidden slices / stages / radar series / top-level treemap or sunburst
   * nodes / sankey nodes / radial bars / bullet rows / calendar levels, by
   * index. Makes the visibility controlled: legend clicks then only call
   * `onToggle`, whose `hiddenIndexes` should be stored and passed back.
   * Leave undefined to let the legend hide / show entries by itself.
   */
  hidden?: readonly number[];
  /**
   * Called when a legend item is clicked (or the instance's `toggle()` is
   * called), with the toggled index and every hidden index after the toggle
   */
  onToggle?: (event: ShapeToggleEvent) => void;
  /**
   * Entry and update animations (skipped when the user prefers reduced motion)
   * @default true
   */
  animation?: boolean;
  /**
   * Space around the drawing, in pixels
   * @default 8 on every side
   */
  padding?: ChartPadding;
  /**
   * Accessible name of the chart
   * @default the chart type in the `locale`, e.g. "Donut chart"
   */
  ariaLabel?: string;
  /** Called when the hovered (or keyboard-focused) mark changes */
  onHover?: (event: ShapeHoverEvent | null) => void;
  /** Called when a mark is clicked, tapped or activated with Enter */
  onClick?: (event: ShapeHoverEvent) => void;
  /** React content of the tooltip (replaces the default content) */
  renderTooltip?: (event: ShapeHoverEvent) => ReactNode;
  /** Additional class name of the root element */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
  /** Imperative handle */
  ref?: Ref<ShapeChartHandle>;
}

/** Props of PieChart */
export interface PieChartProps extends ShapeChartCommonProps {
  /** Slices: a name, a value (negative values count as 0) and an optional color */
  data: readonly ShapeDatum[];
  /**
   * Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut
   * @default 0
   */
  innerRadius?: number;
  /**
   * Angle of the first slice, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Gap between the slices, in pixels
   * @default 1 (pie), 2 (donut)
   */
  padAngle?: number;
  /**
   * Corner radius of the slices, in pixels
   * @default 0 (pie), 4 (donut)
   */
  cornerRadius?: number;
  /**
   * Nightingale rose: the radius (instead of the angle) shows the value
   * @default false
   */
  rose?: boolean;
  /**
   * Slice labels: `outside` with leader lines, `inside` the slices, or none
   * @default "outside" (up to 12 slices), "none" otherwise
   */
  labels?: "outside" | "inside" | "none";
  /**
   * What a label shows: name, value, percent (combinable)
   * @default ["name", "percent"]
   */
  labelContent?: readonly ("name" | "value" | "percent")[];
  /** Big text in the hole of a donut (e.g. the total) */
  centerValue?: string;
  /** Small text under `centerValue` */
  centerLabel?: string;
}

/** Props of DonutChart: a PieChart with a hole */
export interface DonutChartProps extends PieChartProps {
  /**
   * Inner radius as a fraction of the outer radius
   * @default 0.62
   */
  innerRadius?: number;
}

/** Props of RadarChart */
export interface RadarChartProps extends ShapeChartCommonProps {
  /** Axes of the chart, clockwise from 12 o'clock */
  indicators: readonly RadarIndicator[];
  /** Polygons: one value per indicator */
  series: readonly RadarSeries[];
  /**
   * Grid shape
   * @default "polygon"
   */
  shape?: "polygon" | "circle";
  /**
   * Number of grid rings
   * @default 4
   */
  levels?: number;
  /**
   * Dots on the vertices
   * @default true
   */
  dots?: boolean;
}

/** Props of GaugeChart */
export interface GaugeChartProps extends ShapeChartCommonProps {
  /** Value shown by the arc (clamped to `min` - `max` for the drawing) */
  value: number;
  /**
   * Value at the start of the arc
   * @default 0
   */
  min?: number;
  /**
   * Value at the end of the arc
   * @default 100
   */
  max?: number;
  /** Caption under the value */
  label?: string;
  /**
   * Total angle of the arc, degrees
   * @default 240
   */
  sweep?: number;
  /**
   * Thickness of the arc as a fraction of the radius
   * @default 0.16
   */
  thickness?: number;
  /** Colored ranges of the track; the value arc takes the color of its band */
  bands?: readonly GaugeBand[];
  /**
   * Color of the value arc (when there are no bands)
   * @default the first palette color
   */
  color?: string;
  /**
   * Draws a needle in addition to the value arc
   * @default false
   */
  needle?: boolean;
  /**
   * Tick labels at the ends (and at the band bounds)
   * @default true
   */
  ticks?: boolean;
}

/** Props of FunnelChart */
export interface FunnelChartProps extends ShapeChartCommonProps {
  /** Stages: a name, a value and an optional color */
  data: readonly ShapeDatum[];
  /**
   * Order of the stages
   * @default "none" (data order)
   */
  sort?: "descending" | "ascending" | "none";
  /**
   * Vertical gap between the stages, in pixels
   * @default 4
   */
  gap?: number;
  /**
   * Shows the conversion rate from the previous stage
   * @default true
   */
  conversion?: boolean;
  /**
   * Shape of the stages: trapezoids that narrow to the next stage, or centered bars
   * @default "trapezoid"
   */
  shape?: "trapezoid" | "bar";
}

/** Props of TreemapChart */
export interface TreemapChartProps extends ShapeChartCommonProps {
  /** Nodes: leaves carry a value, parents sum their children */
  data: readonly TreemapNode[];
  /**
   * Gap between the cells, in pixels
   * @default 2
   */
  gap?: number;
  /**
   * Draws the names of the parents above their children
   * @default true
   */
  headers?: boolean;
}

/** Props of SankeyChart */
export interface SankeyChartProps extends ShapeChartCommonProps {
  /** Nodes, in their initial order; nodes only named by a link are appended */
  nodes?: readonly SankeyNode[];
  /** Flows between the nodes (by name or index); links closing a cycle are ignored */
  links: readonly SankeyLink[];
  /**
   * Width of the node bars, in pixels
   * @default 12
   */
  nodeWidth?: number;
  /**
   * Vertical gap between the nodes of a column, in pixels (reduced when space is short)
   * @default 12
   */
  nodePadding?: number;
  /**
   * Column of the nodes without a `column`: `justify` puts the sinks in the
   * last column, `left` / `right` align on the sources / sinks, `center`
   * puts the sources next to their first target
   * @default "justify"
   */
  align?: "justify" | "left" | "right" | "center";
  /**
   * Relaxation passes that straighten the flows and reduce crossings
   * @default 32
   */
  iterations?: number;
  /**
   * Color of the links without `color`: a gradient from the source to the
   * target color, one of the two, or a neutral gray
   * @default "gradient"
   */
  linkColor?: "gradient" | "source" | "target" | "neutral";
  /**
   * Opacity of the links, 0-1 (hovered flows are more opaque)
   * @default 0.4
   */
  linkOpacity?: number;
  /**
   * Node labels (name and value); overlapping labels are skipped
   * @default true
   */
  labels?: boolean;
  /**
   * Shows the value after the name in the labels
   * @default true
   */
  labelValues?: boolean;
}

/** Props of SunburstChart */
export interface SunburstChartProps extends ShapeChartCommonProps {
  /** Nodes: leaves carry a value, parents sum their children */
  data: readonly TreemapNode[];
  /**
   * Radius of the center circle as a fraction of the outer radius
   * @default 0.26
   */
  innerRadius?: number;
  /**
   * Rings shown at once below the focused node (fewer when they would be thinner than 18 px)
   * @default every level
   */
  levels?: number;
  /**
   * Angle of the first node, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Gap between the sectors, in pixels
   * @default 1
   */
  padAngle?: number;
  /**
   * Corner radius of the sectors, in pixels
   * @default 2
   */
  cornerRadius?: number;
  /**
   * Sector labels: `auto` writes each name along the arc or along the
   * radius, whichever fits best; labels that do not fit are shortened or skipped
   * @default "auto"
   */
  labels?: "auto" | "tangential" | "radial" | "none";
  /**
   * Clicking (or Enter on) a parent zooms into it; clicking the center (or Backspace) goes back up
   * @default true
   */
  drill?: boolean;
  /**
   * Names from the root to the focused node (`[]` = the root). Makes the
   * drill-down controlled: clicks then only call `onDrill`, whose `path`
   * should be stored and passed back.
   */
  drillPath?: readonly string[];
  /** Called when a parent or the center is clicked (or the instance's `drill()` is called) */
  onDrill?: (event: ShapeDrillEvent) => void;
}

/** Props of RadialBarChart */
export interface RadialBarChartProps extends ShapeChartCommonProps {
  /** Bars, from the outermost ring inward: a name, a value, an optional `max` and color */
  data: readonly RadialBarDatum[];
  /**
   * Value of a full bar for the data without `max`
   * @default the largest value
   */
  max?: number;
  /**
   * Radius of the innermost ring's inner edge, as a fraction of the outer radius
   * @default 0.3
   */
  innerRadius?: number;
  /**
   * Angle where the bars start, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Angle of a full bar, degrees (360 = full rings)
   * @default 270
   */
  sweep?: number;
  /**
   * Gap between the rings, as a fraction of a ring's slot (0-0.9)
   * @default 0.28
   */
  gap?: number;
  /**
   * Background tracks behind the bars
   * @default true
   */
  track?: boolean;
  /**
   * Rounded bar ends
   * @default true
   */
  rounded?: boolean;
  /**
   * Labels before the start of the bars (in the empty part of the circle)
   * @default true when `sweep` leaves room for them (up to 300°)
   */
  labels?: boolean;
  /**
   * What a label shows: name, value, percent of the bar's max (combinable)
   * @default ["name", "value"]
   */
  labelContent?: readonly ("name" | "value" | "percent")[];
  /** Big text in the center (e.g. the overall completion) */
  centerValue?: string;
  /** Small text under `centerValue` */
  centerLabel?: string;
}

/** Props of CalendarHeatmap */
export interface CalendarHeatmapProps extends ShapeChartCommonProps {
  /** Daily values (several entries of the same day add up) */
  data: readonly CalendarDatum[];
  /**
   * Days shown: a year (`2026`) or an inclusive `[start, end]` range
   * @default the 53 weeks ending on the last day of the data
   */
  range?: number | readonly [CalendarDate, CalendarDate];
  /**
   * `weeks`: a column per week and a row per weekday (one strip per year
   * when the range spans several years); `months`: a small calendar per month
   * @default "weeks"
   */
  layout?: "weeks" | "months";
  /**
   * First day of the week, 0 = Sunday … 6 = Saturday
   * @default from `locale`
   */
  weekStart?: number;
  /**
   * BCP 47 locale of the month and weekday names, of the tooltip dates, of the default `weekStart` and of the built-in texts
   * @default the page language (`<html lang>`), else the browser language
   */
  locale?: string;
  /**
   * Color of the highest level (lower levels are lighter)
   * @default the first palette color
   */
  color?: string;
  /** Colors of the levels, lowest first (replaces `color` and sets the number of levels) */
  colors?: readonly string[];
  /**
   * Number of color levels above the empty days
   * @default 4
   */
  levels?: number;
  /**
   * Upper bounds of the levels but the last, ascending (`[2, 5, 10]`: 1-2,
   * 3-5, 6-10, more); an even split of the largest value by default
   */
  thresholds?: readonly number[];
  /**
   * Gap between the cells, in pixels
   * @default 3
   */
  gap?: number;
  /**
   * Corner radius of the cells, in pixels
   * @default 2
   */
  radius?: number;
  /**
   * Largest cell size, in pixels (cells shrink to fit the width)
   * @default 16 (weeks), 28 (months)
   */
  maxCellSize?: number;
  /**
   * Month names (and years) around the cells
   * @default true
   */
  monthLabels?: boolean;
  /**
   * Weekday names beside (weeks) or above (months) the cells
   * @default true
   */
  weekdayLabels?: boolean;
}

/** Props of BulletChart */
export interface BulletChartProps extends ShapeChartCommonProps {
  /** Rows (columns when vertical): name, value, target, ranges and scale */
  data: readonly BulletDatum[];
  /**
   * Horizontal rows or vertical columns
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /** Qualitative ranges of the rows without `ranges`: upper bounds, ascending */
  ranges?: readonly number[];
  /** Names of the qualitative ranges, lowest first (tooltip) */
  rangeLabels?: readonly string[];
  /** Colors of the qualitative ranges, lowest first; shades of gray by default */
  rangeColors?: readonly string[];
  /**
   * Thickness of the value bar as a fraction of the ranges' thickness
   * @default 0.4
   */
  barSize?: number;
  /**
   * Color of the target markers
   * @default the text color
   */
  targetColor?: string;
  /**
   * Tick labels of the scales (when there is room)
   * @default true
   */
  ticks?: boolean;
}

/** Props of ChordChart */
export interface ChordChartProps extends ShapeChartCommonProps {
  /**
   * Groups (names or `{ name, color }`), in their order around the circle;
   * groups only named by `links` are appended. With `matrix`, unnamed rows
   * are numbered from 1.
   */
  groups?: readonly (string | ChordGroup)[];
  /** Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent) */
  matrix?: readonly (readonly number[])[];
  /** Flows as a list (by group name or index); takes precedence over `matrix` */
  links?: readonly ChordLink[];
  /**
   * `false`: one ribbon per pair of groups, each end as wide as the flow
   * leaving that end. `true`: one ribbon per direction, arcs sized by the
   * outgoing plus the incoming flows (self flows ignored)
   * @default false
   */
  directed?: boolean;
  /**
   * Arrowheads at the target end of the ribbons
   * @default true when `directed`
   */
  arrows?: boolean;
  /**
   * Gap between the groups, in degrees
   * @default 2
   */
  padAngle?: number;
  /**
   * Angle of the first group, degrees clockwise from 12 o'clock
   * @default 0
   */
  startAngle?: number;
  /**
   * Order of the groups around the circle
   * @default "none" (data order)
   */
  sortGroups?: "none" | "ascending" | "descending";
  /**
   * Order of the ribbon ends along an arc: `auto` minimizes the crossings;
   * otherwise the order of the groups, or by value
   * @default "auto"
   */
  sortSubgroups?: "auto" | "none" | "ascending" | "descending";
  /**
   * Color of the ribbons without `color`: a gradient from the source to the
   * target color, one of the two, or a neutral gray
   * @default "gradient"
   */
  ribbonColor?: "gradient" | "source" | "target" | "neutral";
  /**
   * Opacity of the ribbons, 0-1 (hovered ribbons are more opaque)
   * @default 0.65
   */
  ribbonOpacity?: number;
  /**
   * Thickness of the group arcs, in pixels
   * @default 6% of the radius (8-18 px)
   */
  arcWidth?: number;
  /**
   * Value ticks outside the arcs (labelled where there is room); a number sets the step between ticks
   * @default true when the diagram is large enough
   */
  ticks?: boolean | number;
  /**
   * Formats the tick labels
   * @default compact numbers of the `locale` (not `format`, whose units would crowd the ticks)
   */
  tickFormat?: (value: number) => string;
  /**
   * Group labels along the arc (`tangential`) or the radius (`radial`);
   * `auto` picks tangential when every name fits; colliding labels are shortened or skipped
   * @default "auto"
   */
  labels?: "auto" | "tangential" | "radial" | "none";
}

interface Handlers {
  onHover?: (event: ShapeHoverEvent | null) => void;
  onClick?: (event: ShapeHoverEvent) => void;
  onToggle?: (event: ShapeToggleEvent) => void;
  onDrill?: (event: ShapeDrillEvent) => void;
}

interface ShapeChartBaseProps extends Handlers {
  options: ShapeChartOptions;
  height: number | string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  handleRef?: Ref<ShapeChartHandle>;
  renderTooltip?: (event: ShapeHoverEvent) => ReactNode;
}

const size = (value: number | string | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;

const subscribePageLanguage = (onChange: () => void) => {
  if (typeof document === "undefined" || typeof MutationObserver !== "function")
    return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  return () => observer.disconnect();
};

const pageLanguage = () =>
  typeof document === "undefined" ? "" : document.documentElement.lang;

const noPageLanguage = () => "";

/** Engine options shared by every type, stable while the props are equal */
const useCommonOptions = ({
  palette,
  legend,
  tooltip,
  format,
  percentFormat,
  locale,
  texts,
  hidden,
  animation,
  padding,
  ariaLabel,
}: ShapeChartCommonProps): ShapeChartCommonOptions => {
  // without `locale`, follow the page language (`<html lang>`) as it changes
  const language = useSyncExternalStore(
    subscribePageLanguage,
    pageLanguage,
    noPageLanguage,
  );
  const resolvedLocale = locale ?? (language || undefined);
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
      locale: resolvedLocale,
      texts,
      hidden: stableHidden,
      animation,
      padding,
      ariaLabel,
    }),
    [
      palette,
      legend,
      tooltip,
      format,
      percentFormat,
      resolvedLocale,
      texts,
      stableHidden,
      animation,
      padding,
      ariaLabel,
    ],
  );
};

/** Mounts the engine in a sized <div> and forwards option / handler changes */
function ShapeChartBase({
  options,
  height,
  width,
  className,
  style,
  handleRef,
  renderTooltip,
  ...handlers
}: ShapeChartBaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ShapeChartInstance | null>(null);
  const handlersRef = useRef<Handlers>(handlers);
  const tooltipRef = useRef(renderTooltip);
  const [tipEvent, setTipEvent] = useState<ShapeHoverEvent | null>(null);
  const tipHost = useMemo(
    () =>
      typeof document === "undefined" ? null : document.createElement("div"),
    [],
  );
  const customTooltip = !!renderTooltip;

  const resolved = useMemo((): ShapeChartOptions => {
    if (!customTooltip || !tipHost || options.tooltip === false) return options;
    const base = typeof options.tooltip === "object" ? options.tooltip : {};
    return {
      ...options,
      tooltip: {
        ...base,
        render: (event) => {
          if (!tooltipRef.current) return null;
          // render synchronously so the engine measures the final size
          flushSync(() => setTipEvent(event));
          return tipHost;
        },
      },
    };
  }, [options, customTooltip, tipHost]);
  const optionsRef = useRef(resolved);

  useEffect(() => {
    handlersRef.current = handlers;
    tooltipRef.current = renderTooltip;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chart = createShapeChart(container, optionsRef.current);
    chartRef.current = chart;
    const offs = [
      chart.on("hover", (e) => handlersRef.current.onHover?.(e)),
      chart.on("click", (e) => handlersRef.current.onClick?.(e)),
      chart.on("toggle", (e) => handlersRef.current.onToggle?.(e)),
      chart.on("drill", (e) => handlersRef.current.onDrill?.(e)),
    ];
    return () => {
      offs.forEach((off) => off());
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (optionsRef.current === resolved) return;
    optionsRef.current = resolved;
    chartRef.current?.setOptions(resolved);
  }, [resolved]);

  useImperativeHandle(
    handleRef,
    () => ({ getInstance: () => chartRef.current }),
    [],
  );

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size(width, "100%"),
        height: size(height, "320px"),
        ...style,
      }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
      {tipHost &&
        tipEvent &&
        renderTooltip &&
        createPortal(renderTooltip(tipEvent), tipHost)}
    </div>
  );
}

/**
 * Pie chart (or a donut with `innerRadius`, or a Nightingale rose with
 * `rose`): slices with gaps, outside labels with leader lines, legend toggles.
 */
export function PieChart(props: PieChartProps) {
  return <PieBase {...props} defaultInner={0} />;
}

/** Donut chart: a PieChart with a hole and optional center texts */
export function DonutChart(props: DonutChartProps) {
  return <PieBase {...props} defaultInner={0.62} />;
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
  return <ShapeHost props={props} options={options} defaultHeight={320} />;
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
  return <ShapeHost props={props} options={options} defaultHeight={320} />;
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
  return <ShapeHost props={props} options={options} defaultHeight={240} />;
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
  return <ShapeHost props={props} options={options} defaultHeight={320} />;
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
  return <ShapeHost props={props} options={options} defaultHeight={320} />;
}

/**
 * Sankey diagram: flows between nodes in columns, link thickness
 * proportional to the flow; hovering a node or a link highlights its flows
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
  return <ShapeHost props={props} options={options} defaultHeight={360} />;
}

/**
 * Sunburst chart: a hierarchy as concentric rings; clicking a parent zooms
 * into it, clicking the center goes back up
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
      props={props}
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
  return <ShapeHost props={props} options={options} defaultHeight={300} />;
}

/** Calendar heatmap: daily values on a calendar, contributions-style */
export function CalendarHeatmap(props: CalendarHeatmapProps) {
  const {
    data,
    range,
    layout,
    weekStart,
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
  const defaultHeight = useMemo(() => {
    const legend = options.legend === false ? 0 : 34;
    if (layout === "months") return 560;
    return calendarStrips(options) * 120 + legend + 16;
  }, [options, layout]);
  return (
    <ShapeHost props={props} options={options} defaultHeight={defaultHeight} />
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
    <ShapeHost props={props} options={options} defaultHeight={defaultHeight} />
  );
}

/**
 * Chord diagram: flows between groups around a circle; hovering a group
 * highlights its ribbons, hovering a ribbon shows both directions
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
  return <ShapeHost props={props} options={options} defaultHeight={420} />;
}

function ShapeHost({
  props,
  options,
  defaultHeight,
  onDrill,
}: {
  props: ShapeChartCommonProps;
  options: ShapeChartOptions;
  defaultHeight: number;
  onDrill?: (event: ShapeDrillEvent) => void;
}) {
  return (
    <ShapeChartBase
      options={options}
      height={props.height ?? defaultHeight}
      width={props.width}
      className={props.className}
      style={props.style}
      handleRef={props.ref}
      onHover={props.onHover}
      onClick={props.onClick}
      onToggle={props.onToggle}
      onDrill={onDrill}
      renderTooltip={props.renderTooltip}
    />
  );
}
