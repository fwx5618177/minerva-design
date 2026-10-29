import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal, flushSync } from "react-dom";
import type { ChartPadding } from "../engine/types";
import { createShapeChart } from "../engine/shapes/chart";
import type {
  FunnelChartOptions,
  GaugeBand,
  GaugeChartOptions,
  PieChartOptions,
  RadarChartOptions,
  RadarIndicator,
  RadarSeries,
  ShapeChartCommonOptions,
  ShapeChartInstance,
  ShapeChartOptions,
  ShapeDatum,
  ShapeHoverEvent,
  ShapeLegendOptions,
  ShapeToggleEvent,
  ShapeTooltipOptions,
  TreemapChartOptions,
  TreemapNode,
} from "../engine/shapes/types";

/** Imperative handle of the shape chart components (`ref`) */
export interface ShapeChartHandle {
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): ShapeChartInstance | null;
}

/** Props shared by PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart and TreemapChart */
export interface ShapeChartCommonProps {
  /**
   * Height of the chart (the legend included); numbers are pixels
   * @default 320 (GaugeChart: 240)
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
   * Legend; clicking an item hides / shows its slice, stage or series
   * @default shown for pie, donut, funnel and multi-series radar charts
   */
  legend?: boolean | ShapeLegendOptions;
  /**
   * Tooltip; `false` disables it
   * @default true
   */
  tooltip?: boolean | ShapeTooltipOptions;
  /**
   * Formats the values of the labels and the tooltip
   * @default compact numbers (1.2k, 3.4M)
   */
  format?: (value: number) => string;
  /**
   * Formats the shares (labels, conversion rates, tooltip); `share` is 0-1
   * @default one decimal, e.g. "40.0%"
   */
  percentFormat?: (share: number) => string;
  /**
   * Hidden slices / stages / radar series / top-level treemap nodes, by
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
   * @default the chart type, e.g. "Donut chart"
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

interface Handlers {
  onHover?: (event: ShapeHoverEvent | null) => void;
  onClick?: (event: ShapeHoverEvent) => void;
  onToggle?: (event: ShapeToggleEvent) => void;
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

/** Engine options shared by every type, stable while the props are equal */
const useCommonOptions = ({
  palette,
  legend,
  tooltip,
  format,
  percentFormat,
  hidden,
  animation,
  padding,
  ariaLabel,
}: ShapeChartCommonProps): ShapeChartCommonOptions => {
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

function ShapeHost({
  props,
  options,
  defaultHeight,
}: {
  props: ShapeChartCommonProps;
  options: ShapeChartOptions;
  defaultHeight: number;
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
      renderTooltip={props.renderTooltip}
    />
  );
}
