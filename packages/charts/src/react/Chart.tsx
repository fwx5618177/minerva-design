import {
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from "react";
import { createChart } from "../engine/chart";
import type {
  ChartHoverEvent,
  ChartInstance,
  ChartOptions,
  ChartRendererKind,
  ChartView,
} from "../engine/types";
import type { ChartCommonProps, ChartProps } from "./types";

interface Handlers {
  onHover?: (event: ChartHoverEvent | null) => void;
  onPointClick?: (event: ChartHoverEvent) => void;
  onZoom?: (view: ChartView) => void;
  onRendererChange?: (renderer: ChartRendererKind) => void;
}

const size = (value: number | string | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;

/** Engine options of the common props */
export const engineOptions = (
  props: Omit<ChartCommonProps, "onPointClick"> & Pick<ChartOptions, "series">,
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
}

/** Mounts the engine in a sized <div> and forwards option / handler changes */
export function ChartBase({
  options,
  height,
  width,
  className,
  style,
  handleRef,
  ...handlers
}: ChartBaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const handlersRef = useRef<Handlers>(handlers);
  const optionsRef = useRef(options);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chart = createChart(container, optionsRef.current);
    chartRef.current = chart;
    const offs = [
      chart.on("hover", (e) => handlersRef.current.onHover?.(e)),
      chart.on("click", (e) => handlersRef.current.onPointClick?.(e)),
      chart.on("zoom", (v) => handlersRef.current.onZoom?.(v)),
      chart.on("renderer", (r) => handlersRef.current.onRendererChange?.(r)),
    ];
    return () => {
      offs.forEach((off) => off());
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (optionsRef.current === options) return;
    optionsRef.current = options;
    chartRef.current?.setOptions(options);
  }, [options]);

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
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: size(width, "100%"),
        height: size(height, "320px"),
        ...style,
      }}
    />
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
    onZoom,
    onRendererChange,
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
      onZoom={onZoom}
      onRendererChange={onRendererChange}
    />
  );
}
