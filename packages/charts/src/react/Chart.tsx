import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal, flushSync } from "react-dom";
import { createChart } from "../engine/chart";
import type {
  ChartDragEvent,
  ChartHoverEvent,
  ChartInstance,
  ChartOptions,
  ChartPlotClickEvent,
  ChartRect,
  ChartRendererKind,
  ChartView,
} from "../engine/types";
import type { ChartCommonProps, ChartProps } from "./types";

interface Handlers {
  onHover?: (event: ChartHoverEvent | null) => void;
  onPointClick?: (event: ChartHoverEvent) => void;
  onPlotClick?: (event: ChartPlotClickEvent) => void;
  onZoom?: (view: ChartView) => void;
  onRendererChange?: (renderer: ChartRendererKind) => void;
  onDrag?: (event: ChartDragEvent) => void;
  onDrop?: (event: ChartDragEvent) => void;
}

const size = (value: number | string | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;

/** Engine options of the common props */
export const engineOptions = (
  props: Pick<
    ChartCommonProps,
    | "xAxis"
    | "yAxis"
    | "renderer"
    | "legend"
    | "tooltip"
    | "crosshair"
    | "annotations"
    | "interaction"
    | "padding"
    | "palette"
    | "ariaLabel"
  > &
    Pick<ChartOptions, "series" | "stackMode">,
): ChartOptions => ({
  series: props.series,
  xAxis: props.xAxis,
  yAxis: props.yAxis,
  renderer: props.renderer,
  legend: props.legend,
  tooltip: props.tooltip,
  crosshair: props.crosshair,
  annotations: props.annotations,
  interaction: props.interaction,
  padding: props.padding,
  palette: props.palette,
  ariaLabel: props.ariaLabel,
  stackMode: props.stackMode,
});

interface ChartBaseProps extends Handlers {
  options: ChartOptions;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  handleRef?: ChartCommonProps["ref"];
  /** React content of the tooltip (replaces the engine's content) */
  renderTooltip?: (event: ChartHoverEvent) => ReactNode;
  /** React content placed over the chart, given the plot area */
  overlay?: (plot: ChartRect) => ReactNode;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/** Same keys with identical values */
const shallowEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean => {
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(
    (key) => a[key] === b[key] && Object.prototype.hasOwnProperty.call(b, key),
  );
};

/**
 * Identical values, or plain arrays / objects whose items are identical
 * (`["#f00"]`, `{ title: "x" }` written inline)
 */
const sameValue = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((v, i) => v === b[i]);
  return isPlainObject(a) && isPlainObject(b) && shallowEqual(a, b);
};

/**
 * Whether `b` describes the same chart as `a`: top-level options compared by
 * identity (or one level deep for inline arrays / objects), series compared
 * one by one, each series shallowly (inline `series={[{ name, data }]}`
 * with a stable `data` stays equal). Data is never compared by content.
 */
export const sameOptions = (a: ChartOptions, b: ChartOptions): boolean => {
  if (a === b) return true;
  const keys = Object.keys(a) as (keyof ChartOptions)[];
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((key) => {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (key !== "series") return sameValue(a[key], b[key]);
    const sa = a.series;
    const sb = b.series;
    return (
      sa === sb ||
      (sa.length === sb.length &&
        sa.every(
          (s, i) =>
            s === sb[i] ||
            shallowEqual(
              s as unknown as Record<string, unknown>,
              sb[i] as unknown as Record<string, unknown>,
            ),
        ))
    );
  });
};

/** Same hovered points with the same values (same tooltip content) */
const sameTooltipEvent = (
  a: ChartHoverEvent | null,
  b: ChartHoverEvent,
): boolean =>
  !!a &&
  a.x === b.x &&
  a.xLabel === b.xLabel &&
  a.items.length === b.items.length &&
  a.items.every((item, i) =>
    shallowEqual(
      item as unknown as Record<string, unknown>,
      b.items[i] as unknown as Record<string, unknown>,
    ),
  );

/** Mounts the engine in a sized <div> and forwards option / handler changes */
export function ChartBase({
  options,
  height,
  width,
  className,
  style,
  handleRef,
  renderTooltip,
  overlay,
  ...handlers
}: ChartBaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const handlersRef = useRef<Handlers>(handlers);
  const tooltipRef = useRef(renderTooltip);
  const tipEventRef = useRef<ChartHoverEvent | null>(null);
  const [tipEvent, setTipEvent] = useState<ChartHoverEvent | null>(null);
  const [plot, setPlot] = useState<ChartRect | null>(null);
  const tipHost = useMemo(
    () =>
      typeof document === "undefined" ? null : document.createElement("div"),
    [],
  );

  // Parents pass a new options object on every render: keep the previous
  // one while it describes the same chart, so the engine isn't rebuilt
  // (state derived during render, the pattern React documents for it)
  const [stable, setStable] = useState(options);
  if (stable !== options && !sameOptions(stable, options)) setStable(options);
  // the render callback reads the latest `renderTooltip` through a ref: only
  // its presence matters here (inline callbacks change on every render)
  const hasTooltip = !!renderTooltip;

  const resolved = useMemo((): ChartOptions => {
    if (!hasTooltip || !tipHost || stable.tooltip === false) return stable;
    const base = typeof stable.tooltip === "object" ? stable.tooltip : {};
    return {
      ...stable,
      tooltip: {
        ...base,
        render: (event) => {
          if (!tooltipRef.current) return null;
          // render synchronously so the engine measures the final size;
          // pointer moves over the same points keep the rendered content
          if (!sameTooltipEvent(tipEventRef.current, event)) {
            tipEventRef.current = event;
            flushSync(() => setTipEvent(event));
          }
          return tipHost;
        },
      },
    };
  }, [stable, hasTooltip, tipHost]);
  const optionsRef = useRef(resolved);

  useEffect(() => {
    handlersRef.current = handlers;
    tooltipRef.current = renderTooltip;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chart = createChart(container, optionsRef.current);
    chartRef.current = chart;
    const offs = [
      chart.on("hover", (e) => handlersRef.current.onHover?.(e)),
      chart.on("click", (e) => handlersRef.current.onPointClick?.(e)),
      chart.on("plotClick", (e) => handlersRef.current.onPlotClick?.(e)),
      chart.on("zoom", (v) => handlersRef.current.onZoom?.(v)),
      chart.on("renderer", (r) => handlersRef.current.onRendererChange?.(r)),
      chart.on("drag", (e) => handlersRef.current.onDrag?.(e)),
      chart.on("drop", (e) => handlersRef.current.onDrop?.(e)),
      chart.on("layout", (rect) => setPlot(rect)),
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
    () => ({
      resetZoom: () => chartRef.current?.resetZoom(),
      getView: () => chartRef.current?.getView() ?? null,
      setView: (view) => chartRef.current?.setView(view),
      getRenderer: () => chartRef.current?.getRenderer() ?? null,
      getInstance: () => chartRef.current,
    }),
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
      {overlay && plot && (
        <div
          className="minerva-chart-overlay"
          style={{
            position: "absolute",
            left: plot.x,
            top: plot.y,
            width: plot.width,
            height: plot.height,
            pointerEvents: "none",
          }}
        >
          {overlay(plot)}
        </div>
      )}
      {tipHost &&
        tipEvent &&
        renderTooltip &&
        createPortal(renderTooltip(tipEvent), tipHost)}
    </div>
  );
}

/**
 * GPU chart (WebGPU, then WebGL2, then Canvas2D) mixing line, area, bar and
 * scatter series; zoomable, keyboard accessible and themed by the Minerva
 * CSS variables.
 */
export function Chart(props: ChartProps) {
  const {
    height,
    width,
    className,
    style,
    ref,
    onHover,
    onPointClick,
    onPlotClick,
    onZoom,
    onRendererChange,
    renderTooltip,
  } = props;
  return (
    <ChartBase
      options={engineOptions(props)}
      height={height}
      width={width}
      className={className}
      style={style}
      handleRef={ref}
      onHover={onHover}
      onPointClick={onPointClick}
      onPlotClick={onPlotClick}
      onZoom={onZoom}
      onRendererChange={onRendererChange}
      renderTooltip={renderTooltip}
    />
  );
}
