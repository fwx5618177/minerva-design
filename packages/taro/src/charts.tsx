// Charts drawn on a `<Canvas type="2d">` by the DOM-free engine: the same
// options, presets and gestures as minerva-design/charts on the web, without
// the WebGPU / WebGL2 renderers.
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  type CSSProperties,
  type ForwardedRef,
} from "react";
import { Canvas, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { cn } from "@minerva/core";
import {
  areaSeries,
  barSeries,
  boxplotData,
  boxplotSeries,
  bubbleSeries,
  candlestickSeries,
  createCanvasChart,
  ganttSeries,
  heatmapChartOptions,
  histogramSeries,
  lineSeries,
  quadrantChartOptions,
  quadrantOf,
  rangeAreaSeries,
  scatterSeries,
  sparklineOptions,
  waterfallSeries,
  type BinOptions,
  type BoxplotGroup,
  type BoxplotStatsOptions,
  type BubbleOptions,
  type CanvasChartInstance,
  type ChartAnnotation,
  type ChartAxisOptions,
  type ChartCanvas,
  type ChartCurve,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartInteractionOptions,
  type ChartLabels,
  type ChartLegendOptions,
  type ChartOptions,
  type ChartOrientation,
  type ChartPadding,
  type ChartPlotClickEvent,
  type ChartSeries,
  type ChartThemeInput,
  type ChartTooltipOptions,
  type ChartTouch,
  type ChartView,
  type GanttOptions,
  type GanttTask,
  type HeatmapConfig,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantPoint,
  type SparklineConfig,
  type WaterfallOptions,
  type WaterfallStep,
} from "@minerva/charts/canvas";
import { useOptionalTheme, useThemeTokens } from "./theme";
import { describeCartesianChart } from "./chart-a11y";

export type {
  BinOptions,
  BoxplotGroup,
  BoxplotStatsOptions,
  BubbleOptions,
  CanvasChartInstance,
  ChartAnnotation,
  ChartAxisOptions,
  ChartCurve,
  ChartDragEvent,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInteractionOptions,
  ChartLabels,
  ChartLegendOptions,
  ChartOptions,
  ChartOrientation,
  ChartPadding,
  ChartPlotClickEvent,
  ChartSeries,
  ChartThemeInput,
  ChartTooltipOptions,
  ChartView,
  GanttOptions,
  GanttTask,
  HeatmapCell,
  HeatmapConfig,
  QuadrantAxisLabels,
  QuadrantConfig,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegion,
  QuadrantRegions,
  SparklineConfig,
  WaterfallOptions,
  WaterfallStep,
} from "@minerva/charts/canvas";

/** Imperative handle of the chart components (`ref`) */
export interface ChartHandle {
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range, `null` until the canvas is ready */
  getView(): ChartView | null;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** The underlying canvas chart, `null` until the canvas is ready */
  getInstance(): CanvasChartInstance | null;
  /** Measures the canvas again (e.g. after it was shown in a hidden tab) */
  resize(): void;
}

/** Props shared by every chart component */
export interface ChartCommonProps {
  /**
   * Height of the chart (the legend included); numbers are pixels
   * @default 320
   */
  height?: number | string;
  /**
   * Width of the chart; numbers are pixels
   * @default "100%"
   */
  width?: number | string;
  /** X axis */
  xAxis?: ChartAxisOptions;
  /** Y axis */
  yAxis?: ChartAxisOptions;
  /** Legend; shown by default when several series have a name (tap toggles a series) */
  legend?: boolean | ChartLegendOptions;
  /** Tooltip; `false` disables it */
  tooltip?: boolean | ChartTooltipOptions;
  /** Vertical guide line following the finger */
  crosshair?: boolean;
  /** Background areas and reference lines */
  annotations?: readonly ChartAnnotation[];
  /**
   * Pinch zoom, pan (drag when zoomed) and double-tap reset; `false` makes the chart static
   * @default true
   */
  interaction?: boolean | ChartInteractionOptions;
  /** Space around the plot area, in pixels */
  padding?: ChartPadding;
  /** Series colors (defaults to the `--chart-series-1..8` tokens, then the theme colors) */
  palette?: readonly string[];
  /**
   * Accessible name of the chart
   * @default the series names in the chart's locale, e.g. "Chart: Revenue, Costs"
   */
  ariaLabel?: string;
  /**
   * Locale of the texts and numbers the chart writes (tooltip rows, compact
   * units `k` / `万`, separators, month and weekday names of time axes).
   * Mini-programs have no `<html lang>`: pass the app language
   * @default the system language (`navigator.language` when there is one), else English
   */
  locale?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<ChartLabels>;
  /**
   * Keeps the page from scrolling while a finger moves on the chart
   * (needed to pan a zoomed chart or drag points)
   * @default false
   */
  disableScroll?: boolean;
  /** Called when the touched (or hovered) points change */
  onHover?: (event: ChartHoverEvent | null) => void;
  /** Called when a point (or bar) is tapped */
  onPointClick?: (event: ChartHoverEvent) => void;
  /** Called when the plot area is tapped where there is no point */
  onPlotClick?: (event: ChartPlotClickEvent) => void;
  /** Called when the user zooms or pans */
  onZoom?: (view: ChartView) => void;
  /** Additional class name of the root element */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
  /** Id of the `<Canvas>` (generated by default) */
  id?: string;
}

/** Props of Chart: any mix of line, area, bar, scatter, candlestick, heatmap and box plot series */
export interface ChartProps extends ChartCommonProps {
  /** Data series; each sets its own `type` */
  series: readonly ChartSeries[];
  /** Right value axis of the series with `yAxis: "right"` (dual axis charts) */
  yAxis2?: ChartAxisOptions;
  /**
   * `percent` scales every stack to 100% at each x
   * @default "normal"
   */
  stackMode?: "normal" | "percent";
  /**
   * `horizontal` puts the x axis (categories) down the left side
   * @default "vertical"
   */
  orientation?: ChartOrientation;
}

/** Props of LineChart */
export interface LineChartProps extends ChartCommonProps {
  /** Series drawn as lines (or areas with `area`) unless they set a `type` */
  series: readonly ChartSeries[];
  /**
   * Fills the area under the lines
   * @default false
   */
  area?: boolean;
}

/** Props of BarChart */
export interface BarChartProps extends ChartCommonProps {
  /** Series drawn as bars unless they set a `type` (e.g. a `line` overlay) */
  series: readonly ChartSeries[];
  /**
   * Stacks the bars of every series (otherwise they are grouped side by side)
   * @default false
   */
  stacked?: boolean;
}

/** Props of ScatterChart */
export interface ScatterChartProps extends ChartCommonProps {
  /** Series drawn as dots unless they set a `type` */
  series: readonly ChartSeries[];
}

/** Props of AreaChart */
export interface AreaChartProps extends ChartCommonProps {
  /** Series drawn as areas unless they set a `type` */
  series: readonly ChartSeries[];
  /**
   * Shape of the edges: straight, smooth (monotone) or steps
   * @default "smooth"
   */
  curve?: ChartCurve;
  /**
   * Stacks the areas on top of each other
   * @default false
   */
  stacked?: boolean;
  /**
   * Scales the stacks to 100% (implies `stacked`)
   * @default false
   */
  percent?: boolean;
}

/** Props of HorizontalBarChart */
export interface HorizontalBarChartProps extends Omit<
  ChartCommonProps,
  "labels"
> {
  /**
   * Series drawn as bars from the left unless they set a `type`; the x
   * values (categories) run from top to bottom
   */
  series: readonly ChartSeries[];
  /**
   * Stacks the bars of every series
   * @default false
   */
  stacked?: boolean;
  /**
   * Scales the stacks to 100% (implies `stacked`)
   * @default false
   */
  percent?: boolean;
  /**
   * Writes the value at the end of every bar
   * @default false
   */
  labels?: boolean;
}

/** Props of CandlestickChart */
export interface CandlestickChartProps extends ChartCommonProps {
  /**
   * Series drawn as candles unless they set a `type` (e.g. a moving average
   * `line`); data points carry `open`, `high`, `low` and `y` (the close)
   */
  series: readonly ChartSeries[];
}

/** Props of HeatmapChart */
export interface HeatmapChartProps
  extends Omit<ChartCommonProps, "crosshair">, HeatmapConfig {}

/** Props of Sparkline */
export interface SparklineProps
  extends
    Pick<
      ChartCommonProps,
      | "width"
      | "tooltip"
      | "palette"
      | "ariaLabel"
      | "locale"
      | "labels"
      | "onHover"
      | "className"
      | "style"
      | "id"
    >,
    SparklineConfig {
  /**
   * Height of the sparkline; numbers are pixels
   * @default 48
   */
  height?: number | string;
}

/** Props of RangeAreaChart */
export interface RangeAreaChartProps extends ChartCommonProps {
  /**
   * Bands between `y0` (lower edge) and `y` (upper edge) of every point,
   * unless a series sets a `type` (e.g. a `line` for the forecast itself)
   */
  series: readonly ChartSeries[];
  /**
   * Shape of the edges: straight, smooth (monotone) or steps
   * @default "smooth"
   */
  curve?: ChartCurve;
}

/** Props of MixedChart */
export interface MixedChartProps extends ChartProps {
  /**
   * Bars, lines, areas and dots, each with its `type`; `yAxis: "right"`
   * plots a series against `yAxis2`
   */
  series: readonly ChartSeries[];
}

/** Props of BubbleChart */
export interface BubbleChartProps extends ChartCommonProps, BubbleOptions {
  /** Series of points with a `value` sizing their bubble (area ∝ value) */
  series: readonly ChartSeries[];
}

/** Props of HistogramChart */
export interface HistogramChartProps extends ChartCommonProps, BinOptions {
  /** Raw samples (typed arrays are counted without copies) */
  values: ArrayLike<number>;
  /**
   * Name of the counts (legend, tooltip)
   * @default "Count"
   */
  name?: string;
  /** Bar color (any CSS color) */
  color?: string;
  /** Formats the edges of the bins in the tooltip */
  formatBin?: (value: number) => string;
  /** More series drawn over the bins (e.g. a density `line`) */
  series?: readonly ChartSeries[];
}

/** Props of BoxPlotChart */
export interface BoxPlotChartProps
  extends ChartCommonProps, BoxplotStatsOptions {
  /**
   * Series of box plots: data points with `low`, `q1`, `y` (the median),
   * `q3`, `high` and `outliers`
   */
  series?: readonly ChartSeries[];
  /** Raw samples, one box each (an alternative to `series`) */
  groups?: readonly BoxplotGroup[];
  /**
   * Name of the series built from `groups`
   * @default "Values"
   */
  name?: string;
  /**
   * `horizontal` lays the boxes out in rows
   * @default "vertical"
   */
  orientation?: ChartOrientation;
  /**
   * Outliers drawn as rings of the series color or as filled dots (series
   * may set their own `outlierShape`)
   * @default "hollow"
   */
  outlierShape?: "hollow" | "filled";
  /**
   * Diameter of the outliers in pixels
   * @default 7
   */
  outlierSize?: number;
}

/** Props of WaterfallChart */
export interface WaterfallChartProps
  extends
    Omit<ChartCommonProps, "crosshair" | "labels">,
    Omit<WaterfallOptions, "labels"> {
  /** Changes, subtotals and totals, in order */
  steps: readonly WaterfallStep[];
  /**
   * Writes the change (or the total) at the end of every bar
   * @default true
   */
  labels?: boolean;
  /**
   * `horizontal` lays the steps out in rows
   * @default "vertical"
   */
  orientation?: ChartOrientation;
}

/** Props of GanttChart */
export interface GanttChartProps
  extends Omit<ChartCommonProps, "crosshair">, GanttOptions {
  /** Tasks and milestones, from top to bottom */
  tasks: readonly GanttTask[];
  /**
   * Draws a line at this date (`true`: now)
   * @default false
   */
  today?: boolean | number | Date;
  /** Label of the today line */
  todayLabel?: string;
}

/** Where a dragged QuadrantChart point was dropped */
export interface QuadrantDropTarget {
  /** Data coordinates of the drop */
  x: number;
  y: number;
  /** Quadrant of the drop, as seen on screen */
  quadrant: QuadrantCorner;
}

/** Props of QuadrantChart */
export interface QuadrantChartProps
  extends
    Omit<
      ChartCommonProps,
      "onPointClick" | "onPlotClick" | "xAxis" | "yAxis" | "disableScroll"
    >,
    QuadrantConfig {
  /** Called with the tapped point and its index */
  onPointClick?: (point: QuadrantPoint, index: number) => void;
  /** Called when the empty area of a quadrant is tapped */
  onQuadrantClick?: (
    quadrant: QuadrantCorner,
    position: { x: number; y: number },
  ) => void;
  /**
   * Called when a dragged point is released; the dots become draggable
   * when it is set (the chart does not move them: update `points`)
   */
  onPointDrop?: (
    point: QuadrantPoint,
    index: number,
    target: QuadrantDropTarget,
  ) => void;
  /**
   * Keeps the page from scrolling while a finger moves on the chart
   * @default draggable
   */
  disableScroll?: boolean;
}

const isH5 = process.env.TARO_ENV === "h5";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value &&
  typeof value === "object" &&
  Object.getPrototypeOf(value) === Object.prototype;

const shallowEqual = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  depth: number,
): boolean => {
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every(
      (key) =>
        Object.is(a[key], b[key]) ||
        (depth > 0 &&
          isPlainObject(a[key]) &&
          isPlainObject(b[key]) &&
          shallowEqual(a[key], b[key], depth - 1)),
    )
  );
};

/**
 * Same object as long as every key keeps the same value; inline option
 * objects (`xAxis={{ title }}`) are compared one level deep
 */
function useShallowStable<T extends Record<string, unknown>>(value: T): T {
  const ref = useRef(value);
  if (!shallowEqual(ref.current, value, 1)) ref.current = value;
  return ref.current;
}

const OPTION_KEYS = [
  "xAxis",
  "yAxis",
  "legend",
  "tooltip",
  "crosshair",
  "annotations",
  "interaction",
  "padding",
  "palette",
  "ariaLabel",
  "locale",
  "labels",
] as const;

type OptionProps = Pick<ChartCommonProps, (typeof OPTION_KEYS)[number]>;

/** Props carrying the engine options (`labels` may be the value labels flag) */
type PickableProps = Omit<OptionProps, "labels"> & { labels?: unknown };

const pickOptions = (props: PickableProps): OptionProps => {
  const out: Record<string, unknown> = {};
  for (const key of OPTION_KEYS) out[key] = props[key];
  // `labels` writes the values on bar and waterfall charts: texts are objects
  if (typeof out.labels !== "object") delete out.labels;
  return out as OptionProps;
};

const toLength = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

/** The defined values of an object (undefined keys would override the base options) */
const compact = <T extends Record<string, unknown>>(value: T): Partial<T> => {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(value))
    if (value[key] !== undefined) out[key] = value[key];
  return out as Partial<T>;
};

const pixelRatio = () => {
  try {
    const api = Taro as unknown as {
      getWindowInfo?: () => { pixelRatio?: number };
      getSystemInfoSync?: () => { pixelRatio?: number };
    };
    return (
      api.getWindowInfo?.()?.pixelRatio ||
      api.getSystemInfoSync?.()?.pixelRatio ||
      1
    );
  } catch {
    return 1;
  }
};

type Host = {
  parentNode?: Host | null;
  ctx?: unknown;
  querySelector?: (selector: string) => unknown;
  getBoundingClientRect?: () => {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  componentOnReady?: () => Promise<unknown>;
};

/** Custom component (CustomWrapper) the canvas is rendered in, if any */
const queryScope = (host: Host | null) => {
  for (let node = host?.parentNode; node; node = node.parentNode)
    if (node.ctx) return node.ctx;
  return undefined;
};

interface Measure {
  canvas: ChartCanvas;
  width: number;
  height: number;
  left: number;
  top: number;
}

type QueryResult = {
  node?: Partial<ChartCanvas> | null;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
} | null;

type RawTouch = {
  x?: number;
  y?: number;
  clientX?: number;
  clientY?: number;
  identifier?: number;
};

type RawTouchEvent = {
  touches?: ArrayLike<RawTouch>;
  changedTouches?: ArrayLike<RawTouch>;
};

type RawMouseEvent = { clientX: number; clientY: number };

interface Handlers {
  onHover?: (event: ChartHoverEvent | null) => void;
  onPointClick?: (event: ChartHoverEvent) => void;
  onPlotClick?: (event: ChartPlotClickEvent) => void;
  onZoom?: (view: ChartView) => void;
  onDrop?: (event: ChartDragEvent) => void;
}

interface ChartBaseProps extends Handlers {
  options: ChartOptions;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  id?: string;
  ariaLabel?: string;
  disableScroll: boolean;
  handleRef: ForwardedRef<ChartHandle>;
}

const RETRIES = 20;
const RETRY_MS = 100;
/** Mouse events emulated after a touch are ignored for this long */
const MOUSE_AFTER_TOUCH_MS = 800;

function ChartBase({
  options: input,
  height = 320,
  width = "100%",
  className,
  style,
  id,
  ariaLabel,
  disableScroll,
  handleRef,
  ...handlers
}: ChartBaseProps) {
  const generated = `mn-chart-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const canvasId = id ?? generated;
  const tokens = useThemeTokens();
  // mini-programs have no `<html lang>`: the ConfigProvider's language
  const providerLocale = useOptionalTheme()?.locale;
  const options = useMemo(
    () =>
      input.locale || !providerLocale
        ? input
        : { ...input, locale: providerLocale },
    [input, providerLocale],
  );
  const themeKey = JSON.stringify(tokens.css);
  const theme = useMemo<ChartThemeInput>(
    () => ({
      variables: Object.fromEntries(
        Object.entries(tokens.css).map(([key, value]) => [
          `--${key}`,
          String(value),
        ]),
      ),
      ...(tokens.css["font-family-sans"]
        ? { fontFamily: String(tokens.css["font-family-sans"]) }
        : {}),
    }),
    // tokens is a new object on every render of the provider
    [themeKey],
  );

  const hostRef = useRef<Host | null>(null);
  const chartRef = useRef<CanvasChartInstance | null>(null);
  const rectRef = useRef({ left: 0, top: 0 });
  const optionsRef = useRef(options);
  const themeRef = useRef(theme);
  const handlersRef = useRef<Handlers>(handlers);
  const remeasureRef = useRef<() => void>(() => {});
  handlersRef.current = handlers;

  // Mount: locate the canvas node once it is rendered, then draw on it
  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const offs: (() => void)[] = [];

    const measure = (done: (result: Measure | null) => void) => {
      const host = hostRef.current;
      const fromDom = () => {
        // H5: the 2D node is the <canvas> inside <taro-canvas-core>
        const canvas = isH5
          ? (host?.querySelector?.("canvas") as ChartCanvas | null)
          : null;
        const rect = canvas ? host?.getBoundingClientRect?.() : undefined;
        done(
          canvas && rect && rect.width > 0 && rect.height > 0
            ? {
                canvas,
                width: rect.width,
                height: rect.height,
                left: rect.left,
                top: rect.top,
              }
            : null,
        );
      };
      try {
        let query = Taro.createSelectorQuery?.();
        if (!query) return fromDom();
        const scope = queryScope(host);
        if (scope) query = query.in(scope as never);
        query
          .select(`#${canvasId}`)
          .fields({ node: true, size: true, rect: true })
          .exec((res: unknown) => {
            if (disposed) return;
            const found = (Array.isArray(res) ? res[0] : null) as QueryResult;
            const node = found?.node;
            if (
              node &&
              typeof node.getContext === "function" &&
              (found.width ?? 0) > 0 &&
              (found.height ?? 0) > 0
            )
              done({
                canvas: node as ChartCanvas,
                width: found.width!,
                height: found.height!,
                left: found.left ?? 0,
                top: found.top ?? 0,
              });
            else fromDom();
          });
      } catch {
        fromDom();
      }
    };

    const create = (m: Measure) => {
      rectRef.current = { left: m.left, top: m.top };
      const chart = createCanvasChart({
        canvas: m.canvas,
        width: m.width,
        height: m.height,
        pixelRatio: pixelRatio(),
        options: optionsRef.current,
        theme: themeRef.current,
      });
      chartRef.current = chart;
      const h = () => handlersRef.current;
      offs.push(
        chart.on("hover", (event) => h().onHover?.(event)),
        chart.on("click", (event) => h().onPointClick?.(event)),
        chart.on("plotClick", (event) => h().onPlotClick?.(event)),
        chart.on("zoom", (view) => h().onZoom?.(view)),
        chart.on("drop", (event) => h().onDrop?.(event)),
      );
    };

    const locate = (attempt: number) => {
      if (disposed) return;
      measure((m) => {
        if (disposed || chartRef.current) return;
        if (m) create(m);
        else if (attempt < RETRIES)
          timer = setTimeout(() => locate(attempt + 1), RETRY_MS);
      });
    };

    remeasureRef.current = () => {
      if (disposed) return;
      if (!chartRef.current) {
        clearTimeout(timer);
        return locate(0);
      }
      measure((m) => {
        const chart = chartRef.current;
        if (!m || !chart || disposed) return;
        rectRef.current = { left: m.left, top: m.top };
        chart.resize(m.width, m.height, pixelRatio());
      });
    };

    const start = () => {
      if (disposed) return;
      // H5: wait for the first render of <taro-canvas-core>, which resets
      // the size of its inner canvas
      const host = hostRef.current;
      const ready = isH5 ? host?.componentOnReady?.() : undefined;
      if (ready)
        ready.then(
          () => locate(0),
          () => locate(0),
        );
      else locate(0);
    };
    Taro.nextTick(start);

    const onWindowResize = () => remeasureRef.current();
    Taro.onWindowResize?.(onWindowResize);
    let observer: ResizeObserver | undefined;
    if (isH5 && typeof ResizeObserver !== "undefined") {
      const host = hostRef.current as unknown as Element | null;
      const box = host?.parentNode as Element | null | undefined;
      if (box) {
        let first = true;
        observer = new ResizeObserver(() => {
          if (first) first = false;
          else remeasureRef.current();
        });
        observer.observe(box);
      }
    }

    return () => {
      disposed = true;
      clearTimeout(timer);
      Taro.offWindowResize?.(onWindowResize);
      observer?.disconnect();
      offs.forEach((off) => off());
      chartRef.current?.destroy();
      chartRef.current = null;
      remeasureRef.current = () => {};
    };
    // Created once: the canvas id is fixed, the props are read through refs
  }, []);

  useEffect(() => {
    if (optionsRef.current === options) return;
    optionsRef.current = options;
    chartRef.current?.setOptions(options);
  }, [options]);

  useEffect(() => {
    if (themeRef.current === theme) return;
    themeRef.current = theme;
    chartRef.current?.setTheme(theme);
  }, [theme]);

  const sized = useRef(false);
  useEffect(() => {
    if (!sized.current) {
      sized.current = true;
      return;
    }
    Taro.nextTick(() => remeasureRef.current());
  }, [width, height]);

  useImperativeHandle(
    handleRef,
    () => ({
      resetZoom: () => chartRef.current?.resetZoom(),
      getView: () => chartRef.current?.getView() ?? null,
      setView: (view) => chartRef.current?.setView(view),
      getInstance: () => chartRef.current,
      resize: () => remeasureRef.current(),
    }),
    [],
  );

  // Stable props: on H5 every re-render of <taro-canvas-core> clears the canvas
  const canvasProps = useMemo(() => {
    let lastTouch = 0;
    const origin = () => {
      const rect = isH5 ? hostRef.current?.getBoundingClientRect?.() : null;
      return rect ?? rectRef.current;
    };
    const convert = (list: ArrayLike<RawTouch> | undefined): ChartTouch[] => {
      if (!list) return [];
      let o: { left: number; top: number } | undefined;
      return Array.from(list, (t, i) => {
        const identifier = t.identifier ?? i;
        // mini-programs: x / y relative to the canvas
        if (typeof t.x === "number" && typeof t.y === "number")
          return { x: t.x, y: t.y, identifier };
        o ??= origin();
        return {
          x: (t.clientX ?? 0) - o.left,
          y: (t.clientY ?? 0) - o.top,
          identifier,
        };
      });
    };
    const touch =
      (kind: "touchStart" | "touchMove" | "touchEnd" | "touchCancel") =>
      (event: unknown) => {
        const chart = chartRef.current;
        if (!chart) return;
        lastTouch = Date.now();
        const e = event as RawTouchEvent;
        const touches = convert(
          kind === "touchMove" ? e.touches : e.changedTouches,
        );
        if (kind === "touchCancel")
          chart.touchCancel(touches.length ? touches : undefined);
        else chart[kind](touches);
      };
    let pressed = false;
    const mouse =
      (kind: "pointerDown" | "pointerMove" | "pointerUp") =>
      (event: unknown) => {
        const chart = chartRef.current;
        if (!chart || Date.now() - lastTouch < MOUSE_AFTER_TOUCH_MS) return;
        const e = event as RawMouseEvent;
        const o = origin();
        if (kind === "pointerDown") pressed = true;
        else if (kind === "pointerUp") {
          if (!pressed) return;
          pressed = false;
        }
        chart[kind](e.clientX - o.left, e.clientY - o.top);
      };
    const leave = () => {
      const chart = chartRef.current;
      if (!chart) return;
      if (pressed) chart.pointerUp(-1, -1);
      pressed = false;
      chart.pointerLeave();
    };
    return {
      onTouchStart: touch("touchStart"),
      onTouchMove: touch("touchMove"),
      onTouchEnd: touch("touchEnd"),
      onTouchCancel: touch("touchCancel"),
      // H5 on desktop: mouse hover / click / drag
      ...(isH5
        ? {
            onMouseDown: mouse("pointerDown"),
            onMouseMove: mouse("pointerMove"),
            onMouseUp: mouse("pointerUp"),
            onMouseLeave: leave,
          }
        : {}),
    };
  }, []);

  const canvasStyle = useMemo<CSSProperties>(
    () => ({
      display: "block",
      width: "100%",
      height: "100%",
      ...(disableScroll ? { touchAction: "none" } : {}),
    }),
    [disableScroll],
  );

  return (
    <View
      className={cn("mn-chart", className)}
      data-minerva="chart"
      {...{ role: "img" }}
      aria-label={ariaLabel || describeCartesianChart(options)}
      style={{
        position: "relative",
        width: toLength(width),
        height: toLength(height),
        ...style,
      }}
    >
      <Canvas
        ref={hostRef as never}
        type="2d"
        id={canvasId}
        className="mn-chart-canvas"
        style={canvasStyle}
        disableScroll={disableScroll}
        {...(canvasProps as Record<string, (event: never) => void>)}
      />
    </View>
  );
}

const frameProps = (props: Omit<ChartCommonProps, "labels">) => ({
  height: props.height,
  width: props.width,
  className: props.className,
  style: props.style,
  id: props.id,
  ariaLabel: props.ariaLabel,
  disableScroll: props.disableScroll ?? false,
  onHover: props.onHover,
  onPointClick: props.onPointClick,
  onPlotClick: props.onPlotClick,
  onZoom: props.onZoom,
});

function useEngineOptions(
  props: PickableProps,
  series: readonly ChartSeries[],
  extra?: Partial<ChartOptions>,
): ChartOptions {
  const picked = useShallowStable(
    pickOptions(props) as Record<string, unknown>,
  ) as OptionProps;
  const more = useShallowStable((extra ?? {}) as Record<string, unknown>);
  return useMemo(
    () => ({ ...picked, ...more, series }),
    [picked, more, series],
  );
}

/** Chart mixing line, area, bar, scatter, candlestick, heatmap and box plot series (each sets its `type`) */
export const Chart = forwardRef<ChartHandle, ChartProps>(
  function Chart(props, ref) {
    const { yAxis2, stackMode, orientation } = props;
    const options = useEngineOptions(
      props,
      props.series,
      compact({ yAxis2, stackMode, orientation }),
    );
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/** Line (or area) chart */
export const LineChart = forwardRef<ChartHandle, LineChartProps>(
  function LineChart(props, ref) {
    const { series: input, area = false } = props;
    const series = useMemo(() => lineSeries(input, area), [input, area]);
    const options = useEngineOptions(props, series);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/** Bar chart: grouped side by side, or stacked */
export const BarChart = forwardRef<ChartHandle, BarChartProps>(
  function BarChart(props, ref) {
    const { series: input, stacked = false } = props;
    const series = useMemo(() => barSeries(input, stacked), [input, stacked]);
    const options = useEngineOptions(props, series);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/** Scatter chart: zooms on both axes */
export const ScatterChart = forwardRef<ChartHandle, ScatterChartProps>(
  function ScatterChart(props, ref) {
    const { series: input } = props;
    const series = useMemo(() => scatterSeries(input), [input]);
    const options = useEngineOptions(props, series);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG, ...): tinted
 * quadrants with titles, dividers, and labelled dots placed without
 * overlapping labels. Dots can be dragged to another quadrant.
 */
export const QuadrantChart = forwardRef<ChartHandle, QuadrantChartProps>(
  function QuadrantChart(props, ref) {
    const { points, onPointClick, onPointDrop, onQuadrantClick } = props;
    const draggable = props.draggable ?? !!onPointDrop;
    const config = useShallowStable({
      points,
      xDomain: props.xDomain,
      yDomain: props.yDomain,
      xSplit: props.xSplit,
      ySplit: props.ySplit,
      quadrants: props.quadrants,
      xLabel: props.xLabel,
      yLabel: props.yLabel,
      axisLabels: props.axisLabels,
      showTicks: props.showTicks,
      reverseX: props.reverseX,
      showLabels: props.showLabels,
      pointSize: props.pointSize,
      name: props.name,
      draggable,
    });
    const base = useShallowStable(
      pickOptions(props) as Record<string, unknown>,
    ) as OptionProps;
    const options = useMemo(
      () => quadrantChartOptions(config, base),
      [config, base],
    );
    const at = (index: number | undefined) =>
      index !== undefined && points[index] ? points[index] : undefined;

    return (
      <ChartBase
        options={options}
        {...frameProps({
          ...props,
          onPointClick: undefined,
          onPlotClick: undefined,
          disableScroll: props.disableScroll ?? draggable,
        })}
        handleRef={ref}
        onPointClick={
          onPointClick
            ? (event) => {
                const index = event.items[0]?.index;
                const point = at(index);
                if (point) onPointClick(point, index!);
              }
            : undefined
        }
        onPlotClick={
          onQuadrantClick
            ? (position) =>
                onQuadrantClick(
                  quadrantOf(config, position.x, position.y),
                  position,
                )
            : undefined
        }
        onDrop={
          onPointDrop
            ? (event) => {
                const index = event.item.index;
                const point = at(index);
                if (!point) return;
                onPointDrop(point, index, {
                  x: event.x,
                  y: event.y,
                  quadrant: quadrantOf(config, event.x, event.y),
                });
              }
            : undefined
        }
      />
    );
  },
);

/** Area chart: smooth by default, stacked or 100% stacked */
export const AreaChart = forwardRef<ChartHandle, AreaChartProps>(
  function AreaChart(props, ref) {
    const {
      series: input,
      curve = "smooth",
      stacked = false,
      percent = false,
    } = props;
    const series = useMemo(
      () => areaSeries(input, { curve, stacked: stacked || percent }),
      [input, curve, stacked, percent],
    );
    const options = useEngineOptions(
      props,
      series,
      percent ? { stackMode: "percent" } : undefined,
    );
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/**
 * Horizontal bar chart: categories down the left side, values from the
 * left (rankings, long names, surveys, stacked progress)
 */
export const HorizontalBarChart = forwardRef<
  ChartHandle,
  HorizontalBarChartProps
>(function HorizontalBarChart(props, ref) {
  const {
    series: input,
    stacked = false,
    percent = false,
    labels = false,
  } = props;
  const series = useMemo(
    () => barSeries(input, stacked || percent, labels),
    [input, stacked, percent, labels],
  );
  const options = useEngineOptions(
    props,
    series,
    compact({
      orientation: "horizontal" as const,
      stackMode: percent ? ("percent" as const) : undefined,
    }),
  );
  return <ChartBase options={options} {...frameProps(props)} handleRef={ref} />;
});

/** Candlestick (OHLC) chart: rising and falling candles, pinch to zoom */
export const CandlestickChart = forwardRef<ChartHandle, CandlestickChartProps>(
  function CandlestickChart(props, ref) {
    const { series: input } = props;
    const series = useMemo(() => candlestickSeries(input), [input]);
    const options = useEngineOptions(props, series);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/** Heatmap: a grid of cells colored by value (categories or numbers on both axes) */
export const HeatmapChart = forwardRef<ChartHandle, HeatmapChartProps>(
  function HeatmapChart(props, ref) {
    const config = useShallowStable({
      data: props.data,
      xCategories: props.xCategories,
      yCategories: props.yCategories,
      colorScale: props.colorScale,
      valueRange: props.valueRange,
      colorMidpoint: props.colorMidpoint,
      name: props.name,
      radius: props.radius,
      format: props.format,
    });
    const base = useShallowStable(
      pickOptions(props) as Record<string, unknown>,
    ) as OptionProps;
    const options = useMemo(
      () => heatmapChartOptions(config, base),
      [config, base],
    );
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/** Word-sized chart without axes: a trend in a list row, a KPI card, ... */
export const Sparkline = forwardRef<ChartHandle, SparklineProps>(
  function Sparkline(props, ref) {
    const {
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
      height = 48,
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
        {...frameProps({ ...props, height })}
        handleRef={ref}
      />
    );
  },
);

/**
 * Range area chart: bands between a lower (`y0`) and an upper edge
 * (confidence intervals, min-max ranges), mixable with lines
 */
export const RangeAreaChart = forwardRef<ChartHandle, RangeAreaChartProps>(
  function RangeAreaChart(props, ref) {
    const { series: input, curve = "smooth" } = props;
    const series = useMemo(() => rangeAreaSeries(input, curve), [input, curve]);
    const options = useEngineOptions(props, series);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/**
 * Combination chart: bars, lines and areas on one or two value axes
 * (`yAxis: "right"` series use `yAxis2`)
 */
export const MixedChart = forwardRef<ChartHandle, MixedChartProps>(
  function MixedChart(props, ref) {
    return <Chart {...props} ref={ref} />;
  },
);

/** Bubble chart: x, y and a value sized by area (√value diameters) */
export const BubbleChart = forwardRef<ChartHandle, BubbleChartProps>(
  function BubbleChart(props, ref) {
    const { series: input, minSize, maxSize, maxValue } = props;
    const series = useMemo(
      () => bubbleSeries(input, { minSize, maxSize, maxValue }),
      [input, minSize, maxSize, maxValue],
    );
    const options = useEngineOptions(props, series);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/** Histogram: the distribution of raw samples in bins of equal width */
export const HistogramChart = forwardRef<ChartHandle, HistogramChartProps>(
  function HistogramChart(props, ref) {
    const {
      values,
      bins,
      domain,
      nice,
      name,
      color,
      formatBin,
      series: extra,
      locale,
    } = props;
    const series = useMemo(
      () => [
        histogramSeries(values, {
          bins,
          domain,
          nice,
          name,
          color,
          format: formatBin,
          locale,
        }),
        ...(extra ?? []),
      ],
      [values, bins, domain, nice, name, color, formatBin, extra, locale],
    );
    const options = useEngineOptions(props, series);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/**
 * Box plot: medians, quartiles, whiskers and outliers of samples, from raw
 * values (`groups`) or computed statistics (`series`)
 */
export const BoxPlotChart = forwardRef<ChartHandle, BoxPlotChartProps>(
  function BoxPlotChart(props, ref) {
    const {
      series: input,
      groups,
      name = "Values",
      whisker,
      orientation,
      outlierShape,
      outlierSize,
    } = props;
    const series = useMemo(
      () =>
        boxplotSeries([
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
      [input, groups, name, whisker, outlierShape, outlierSize],
    );
    const options = useEngineOptions(props, series, compact({ orientation }));
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/**
 * Waterfall (bridge) chart: how changes take a value from a start to an
 * end, with subtotals and totals
 */
export const WaterfallChart = forwardRef<ChartHandle, WaterfallChartProps>(
  function WaterfallChart(props, ref) {
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
    const series = useMemo(
      () => [
        waterfallSeries(steps, {
          name,
          upColor,
          downColor,
          totalColor,
          start,
          labels,
          format,
          connector,
          locale,
        }),
      ],
      [
        steps,
        name,
        upColor,
        downColor,
        totalColor,
        start,
        labels,
        format,
        connector,
        locale,
      ],
    );
    const options = useEngineOptions(
      props,
      series,
      compact({ orientation, locale }),
    );
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);

/**
 * Gantt chart: tasks as bars on a time axis with their progress, groups,
 * milestones and a today line; pinch to zoom along the time
 */
export const GanttChart = forwardRef<ChartHandle, GanttChartProps>(
  function GanttChart(props, ref) {
    const {
      tasks,
      colors,
      taskName,
      progressName,
      milestoneName,
      formatProgress,
      dependenciesName,
      dependencyArrows,
      dependencyColor,
      locale,
      today = false,
      todayLabel,
    } = props;
    const gantt = useMemo(
      () =>
        ganttSeries(tasks, {
          colors,
          taskName,
          progressName,
          milestoneName,
          formatProgress,
          dependenciesName,
          dependencyArrows,
          dependencyColor,
          locale,
        }),
      [
        tasks,
        colors,
        taskName,
        progressName,
        milestoneName,
        formatProgress,
        dependenciesName,
        dependencyArrows,
        dependencyColor,
        locale,
      ],
    );
    const mountedAt = useMemo(() => Date.now(), []);
    const now =
      today === false
        ? null
        : today === true
          ? mountedAt
          : today instanceof Date
            ? today.getTime()
            : today;
    const base = useShallowStable(
      pickOptions(props) as Record<string, unknown>,
    ) as OptionProps;
    const options = useMemo((): ChartOptions => {
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
        dependencies: gantt.dependencies,
        orientation: "horizontal",
        xAxis: {
          type: "category",
          categories: gantt.categories,
          ...base.xAxis,
        },
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
    }, [base, gantt, now, todayLabel, locale]);
    return (
      <ChartBase options={options} {...frameProps(props)} handleRef={ref} />
    );
  },
);
