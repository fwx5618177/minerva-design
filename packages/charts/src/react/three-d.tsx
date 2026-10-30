import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from "react";
import { createChart3D } from "../engine/three-d/chart";
import type {
  Bar3DSeries,
  Chart3DAxisOptions,
  Chart3DCameraOptions,
  Chart3DCameraState,
  Chart3DColorBarOptions,
  Chart3DColorScale,
  Chart3DHoverEvent,
  Chart3DInstance,
  Chart3DInteractionOptions,
  Chart3DLabels,
  Chart3DLegendOptions,
  Chart3DLightingOptions,
  Chart3DOptions,
  Chart3DSeries,
  Chart3DTooltipOptions,
  Line3DSeries,
  Scatter3DSeries,
  Surface3DContourOptions,
  Surface3DSeries,
  Surface3DWireframeOptions,
} from "../engine/three-d/types";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "../engine/types";

/** Imperative handle of the 3D chart components (`ref`) */
export interface Chart3DHandle {
  /** Restores the camera of the `camera` prop */
  resetCamera(): void;
  /** Current camera, `null` before mount */
  getCamera(): Chart3DCameraState | null;
  /** Moves the camera */
  setCamera(camera: Partial<Chart3DCameraState>): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): Chart3DInstance | null;
}

/** Props shared by every 3D chart component */
export interface Chart3DCommonProps {
  /**
   * Height of the chart (the legend included); numbers are pixels
   * @default 400
   */
  height?: number | string;
  /**
   * Width of the chart; numbers are pixels
   * @default "100%"
   */
  width?: number | string;
  /** X axis (width of the box) */
  xAxis?: Chart3DAxisOptions;
  /** Y axis (depth of the box) */
  yAxis?: Chart3DAxisOptions;
  /** Z axis (height of the box) */
  zAxis?: Chart3DAxisOptions;
  /** Initial camera, also restored by a double click (changing it moves the camera) */
  camera?: Chart3DCameraOptions;
  /**
   * Turns the camera around the box: `true` at 12°/s or a speed in degrees
   * per second; pauses while hovered, off-screen and with reduced motion
   * @default false
   */
  autoRotate?: boolean | number;
  /**
   * Proportions of the box (x, y, z)
   * @default [1, 1, 0.7]
   */
  aspect?: readonly [number, number, number];
  /**
   * Draws the axis box: back walls, grid lines, tick labels and axis titles
   * @default true
   */
  box?: boolean;
  /**
   * Colors of `colorBy: "z"` / `"value"`: a built-in ramp or CSS colors
   * @default "viridis"
   */
  colorScale?: Chart3DColorScale;
  /** Values mapped to the ends of the color scale; the data range by default */
  valueRange?: readonly [number, number];
  /** Color bar; shown by default when a visible series uses the color scale */
  colorBar?: boolean | Chart3DColorBarOptions;
  /** Legend; shown by default when several series have a name */
  legend?: boolean | Chart3DLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | Chart3DTooltipOptions;
  /**
   * Drag rotates, right / Shift + drag pans, Ctrl / ⌘ + wheel and pinch zoom,
   * double click resets, arrow keys rotate; `false` makes the chart static
   * @default true
   */
  interaction?: boolean | Chart3DInteractionOptions;
  /** Lighting of the surfaces and bars */
  lighting?: Chart3DLightingOptions;
  /**
   * Brightness of the light of `blend: "additive"` series, tone mapped on
   * WebGPU and WebGL2 (dense glowing regions saturate instead of turning
   * white)
   * @default 1
   */
  exposure?: number;
  /**
   * Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL,
   * then Canvas2D, skipping GPUs running in software
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette?: readonly string[];
  /** Accessible name of the chart */
  ariaLabel?: string;
  /**
   * Language of the built-in texts (accessible summary, legend announcements,
   * tooltip row names) and of the number formatting; built-in texts in
   * English, Chinese, Japanese and French
   * @default the page language (`<html lang>`), then the browser language
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<Chart3DLabels>;
  /** Called when the hovered point, cell or bar changes */
  onHover?: (event: Chart3DHoverEvent | null) => void;
  /** Called when a point, cell or bar is clicked */
  onPointClick?: (event: Chart3DHoverEvent) => void;
  /** Called after the user rotated, zoomed, panned or reset the camera */
  onCameraChange?: (camera: Chart3DCameraState) => void;
  /** Called with the backend once it is ready (and after a fallback) */
  onRendererChange?: (renderer: ChartRendererKind) => void;
  /** Class of the outer element */
  className?: string;
  /** Style of the outer element */
  style?: CSSProperties;
  /** Imperative handle */
  ref?: Ref<Chart3DHandle>;
}

/** Props of `Scatter3DChart` */
export interface Scatter3DChartProps extends Chart3DCommonProps {
  /** Point clouds (objects, `[x, y, z]` tuples or typed-array columns) */
  series: readonly Scatter3DSeries[];
}

/** Props of `Line3DChart` */
export interface Line3DChartProps extends Chart3DCommonProps {
  /** 3D polylines (trajectories) */
  series: readonly Line3DSeries[];
}

/** Props of `Surface3DChart` */
export interface Surface3DChartProps extends Chart3DCommonProps {
  /** Surfaces over regular grids */
  series: readonly Surface3DSeries[];
  /** Wireframe of the series that do not set one */
  wireframe?: boolean | Surface3DWireframeOptions;
  /** Contour lines of the series that do not set them */
  contours?: boolean | Surface3DContourOptions;
}

/** Props of `Bar3DChart` */
export interface Bar3DChartProps extends Chart3DCommonProps {
  /** Bars over the x × y category grid (bars of the same cell are stacked) */
  series: readonly Bar3DSeries[];
  /**
   * Width of the bars of the series that do not set one, as a fraction of a cell
   * @default 0.7
   */
  barWidth?: number;
}

// ----------------------------------------------------------------- base

interface Handlers {
  onHover?: (event: Chart3DHoverEvent | null) => void;
  onPointClick?: (event: Chart3DHoverEvent) => void;
  onCameraChange?: (camera: Chart3DCameraState) => void;
  onRendererChange?: (renderer: ChartRendererKind) => void;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

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

const sameValue = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((v, i) => v === b[i]);
  return isPlainObject(a) && isPlainObject(b) && shallowEqual(a, b);
};

/**
 * Whether two option objects describe the same chart: top-level values by
 * identity (one level deep for inline arrays / objects), series one by one
 * and shallowly. Data is never compared by content.
 */
const sameOptions3D = (a: Chart3DOptions, b: Chart3DOptions): boolean => {
  if (a === b) return true;
  const keys = Object.keys(a) as (keyof Chart3DOptions)[];
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

const cssSize = (value: number | string | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;

interface Chart3DBaseProps extends Handlers {
  options: Chart3DOptions;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  handleRef?: Ref<Chart3DHandle>;
}

function Chart3DBase({
  options,
  height,
  width,
  className,
  style,
  handleRef,
  ...handlers
}: Chart3DBaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart3DInstance | null>(null);
  const handlersRef = useRef<Handlers>(handlers);
  // keep the previous options while they describe the same chart
  const [stable, setStable] = useState(options);
  if (stable !== options && !sameOptions3D(stable, options)) setStable(options);
  const optionsRef = useRef(stable);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chart = createChart3D(container, optionsRef.current);
    chartRef.current = chart;
    const offs = [
      chart.on("hover", (e) => handlersRef.current.onHover?.(e)),
      chart.on("click", (e) => handlersRef.current.onPointClick?.(e)),
      chart.on("camera", (c) => handlersRef.current.onCameraChange?.(c)),
      chart.on("renderer", (r) => handlersRef.current.onRendererChange?.(r)),
    ];
    return () => {
      offs.forEach((off) => off());
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (optionsRef.current === stable) return;
    optionsRef.current = stable;
    chartRef.current?.setOptions(stable);
  }, [stable]);

  useImperativeHandle(
    handleRef,
    () => ({
      resetCamera: () => chartRef.current?.resetCamera(),
      getCamera: () => chartRef.current?.getCamera() ?? null,
      setCamera: (camera) => chartRef.current?.setCamera(camera),
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
        width: cssSize(width, "100%"),
        height: cssSize(height, "400px"),
        ...style,
      }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}

/** Renders a chart from the common props and the typed series */
function Chart3DFrame({
  props,
  series,
}: {
  props: Chart3DCommonProps;
  series: readonly Chart3DSeries[];
}) {
  const {
    height,
    width,
    xAxis,
    yAxis,
    zAxis,
    camera,
    autoRotate,
    aspect,
    box,
    colorScale,
    valueRange,
    colorBar,
    legend,
    tooltip,
    interaction,
    lighting,
    exposure,
    renderer,
    palette,
    ariaLabel,
    locale,
    labels,
    onHover,
    onPointClick,
    onCameraChange,
    onRendererChange,
    className,
    style,
    ref,
  } = props;
  const options: Chart3DOptions = {
    series,
    xAxis,
    yAxis,
    zAxis,
    camera,
    autoRotate,
    aspect,
    box,
    colorScale,
    valueRange,
    colorBar,
    legend,
    tooltip,
    interaction,
    lighting,
    exposure,
    renderer,
    palette,
    ariaLabel,
    locale,
    labels,
  };
  return (
    <Chart3DBase
      options={options}
      height={height}
      width={width}
      className={className}
      style={style}
      handleRef={ref}
      onHover={onHover}
      onPointClick={onPointClick}
      onCameraChange={onCameraChange}
      onRendererChange={onRendererChange}
    />
  );
}

// ----------------------------------------------------------- components

/**
 * 3D scatter plot: point clouds of up to millions of points on the GPU,
 * colored per series, per point or through a color scale; orbit camera,
 * hover picking and color bar.
 */
export function Scatter3DChart(props: Scatter3DChartProps) {
  const { series: input } = props;
  const series = useMemo(
    () => input.map((s) => ({ ...s, type: "scatter" as const })),
    [input],
  );
  return <Chart3DFrame props={props} series={series} />;
}

/** 3D polylines (trajectories, paths), optionally colored along the line */
export function Line3DChart(props: Line3DChartProps) {
  const { series: input } = props;
  const series = useMemo(
    () => input.map((s) => ({ ...s, type: "line" as const })),
    [input],
  );
  return <Chart3DFrame props={props} series={series} />;
}

/**
 * 3D surface `z = f(x, y)` over a regular grid: lit, colored by a color
 * map, with an optional wireframe, contour lines and transparency.
 */
export function Surface3DChart(props: Surface3DChartProps) {
  const { series: input, wireframe, contours } = props;
  const series = useMemo(
    () =>
      input.map((s) => ({
        ...s,
        type: "surface" as const,
        wireframe: s.wireframe ?? wireframe,
        contours: s.contours ?? contours,
      })),
    [input, wireframe, contours],
  );
  return <Chart3DFrame props={props} series={series} />;
}

/** 3D bars over an x × y category grid, lit, stacked across series */
export function Bar3DChart(props: Bar3DChartProps) {
  const { series: input, barWidth } = props;
  const series = useMemo(
    () =>
      input.map((s) => ({
        ...s,
        type: "bar" as const,
        barWidth: s.barWidth ?? barWidth,
      })),
    [input, barWidth],
  );
  return <Chart3DFrame props={props} series={series} />;
}
