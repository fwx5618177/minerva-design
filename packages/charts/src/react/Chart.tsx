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
    Pick<ChartOptions, "series">,
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
  const [tipEvent, setTipEvent] = useState<ChartHoverEvent | null>(null);
  const [plot, setPlot] = useState<ChartRect | null>(null);
  const tipHost = useMemo(
    () =>
      typeof document === "undefined" ? null : document.createElement("div"),
    [],
  );

  const resolved = useMemo((): ChartOptions => {
    if (!renderTooltip || !tipHost || options.tooltip === false) return options;
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
  }, [options, renderTooltip, tipHost]);
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
