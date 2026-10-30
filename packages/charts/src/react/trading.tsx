import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from "react";
import { createTradingChart } from "../engine/trading/chart";
import type {
  TradingBar,
  TradingBarsInput,
  TradingChartInstance,
  TradingChartOptions,
  TradingClickEvent,
  TradingCrosshairEvent,
  TradingDrawing,
  TradingDrawingTool,
  TradingHistoryRequestEvent,
  TradingIndicatorToggleEvent,
  TradingOrderMoveEvent,
  TradingVisibleRange,
} from "../engine/trading/types";
import type { ChartRendererKind } from "../engine/types";

/** Imperative handle of `<TradingChart>` */
export interface TradingChartHandle {
  /**
   * Streams a bar: the time of the last bar replaces it, a later time
   * appends it (cheap: call it on every tick)
   */
  update(bar: TradingBar): void;
  /** Appends bars newer than the last one */
  appendBars(bars: TradingBarsInput): void;
  /** Inserts older bars before the first one, keeping the view */
  prependBars(bars: TradingBarsInput): void;
  /** Replaces the bars */
  setBars(bars: TradingBarsInput): void;
  /** Number of bars */
  getBarCount(): number;
  /** Bar at an index, `null` outside the data */
  getBar(index: number): TradingBar | null;
  /** Scrolls to the latest bar */
  scrollToRealtime(animate?: boolean): void;
  /** Shows every bar */
  fitContent(): void;
  /** Visible bars, `null` before mounting */
  getVisibleRange(): TradingVisibleRange | null;
  /** Shows the bars between two logical indices */
  setVisibleRange(range: { from: number; to: number }): void;
  /** Fits every price scale to the visible bars again */
  resetPriceScales(): void;
  /** Activates a drawing tool */
  setDrawingTool(tool: TradingDrawingTool): void;
  /** Current drawings */
  getDrawings(): readonly TradingDrawing[];
  /** Deletes a drawing */
  removeDrawing(id: string): void;
  /** Selects a drawing (`null` clears the selection) */
  selectDrawing(id: string | null): void;
  /** Shows or hides an indicator */
  setIndicatorVisible(id: string, visible: boolean): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): TradingChartInstance | null;
}

/** Props of `<TradingChart>`: the options of `createTradingChart`, the size and the events */
export interface TradingChartProps extends TradingChartOptions {
  /**
   * Height (pixels or any CSS length)
   * @default 480
   */
  height?: number | string;
  /**
   * Width (pixels or any CSS length)
   * @default "100%"
   */
  width?: number | string;
  /** Class of the root element */
  className?: string;
  /** Inline styles of the root element */
  style?: CSSProperties;
  /** Imperative handle (streaming, scrolling, drawings) */
  ref?: Ref<TradingChartHandle>;
  /** The crosshair moved (`null` when it left the chart) */
  onCrosshairMove?: (event: TradingCrosshairEvent | null) => void;
  /** A pane was clicked */
  onClick?: (event: TradingClickEvent) => void;
  /** The visible bars changed */
  onVisibleRangeChange?: (range: TradingVisibleRange) => void;
  /** A draggable price line was dropped at a new price */
  onOrderMove?: (event: TradingOrderMoveEvent) => void;
  /** The user added, moved or deleted drawings (pass them back as `drawings`) */
  onDrawingsChange?: (drawings: readonly TradingDrawing[]) => void;
  /** The selected drawing changed */
  onDrawingSelect?: (id: string | null) => void;
  /** The drawing tool changed (back to `cursor` after a drawing) */
  onDrawingToolChange?: (tool: TradingDrawingTool) => void;
  /** An indicator was shown or hidden from its legend */
  onIndicatorToggle?: (event: TradingIndicatorToggleEvent) => void;
  /** The oldest bar came into view: load older bars (`prependBars`) */
  onHistoryRequest?: (event: TradingHistoryRequestEvent) => void;
  /** The backend in use (again after a fallback) */
  onRendererChange?: (renderer: ChartRendererKind) => void;
}

type Handlers = Pick<
  TradingChartProps,
  | "onCrosshairMove"
  | "onClick"
  | "onVisibleRangeChange"
  | "onOrderMove"
  | "onDrawingsChange"
  | "onDrawingSelect"
  | "onDrawingToolChange"
  | "onIndicatorToggle"
  | "onHistoryRequest"
  | "onRendererChange"
>;

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
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) && sameItem(a[key], b[key]),
  );
};

/** Identical, or inline arrays of identical values */
const sameItem = (a: unknown, b: unknown): boolean =>
  a === b ||
  (Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((v, i) => v === b[i]));

/**
 * Same option value: identical, or inline arrays / objects of plain objects
 * with identical fields (`indicators={[{ type: "ma", period: 7 }]}`). Bars,
 * markers and drawings are compared by identity when they are not plain
 * objects (typed arrays) and item by item otherwise.
 */
const sameValue = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every(
        (v, i) =>
          v === b[i] ||
          (isPlainObject(v) && isPlainObject(b[i]) && shallowEqual(v, b[i])),
      )
    );
  }
  return isPlainObject(a) && isPlainObject(b) && shallowEqual(a, b);
};

/** Options describing the same chart (bars and drawings compared by identity) */
const sameOptions = (a: TradingChartOptions, b: TradingChartOptions) => {
  const keys = Object.keys(a) as (keyof TradingChartOptions)[];
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((key) => {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    // new bars / drawings arrays are always applied: compared by identity
    if (key === "bars" || key === "drawings") return a[key] === b[key];
    return sameValue(a[key], b[key]);
  });
};

const size = (value: number | string | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;

/**
 * Professional trading chart: candles (hollow, Heikin-Ashi, bars, line,
 * area, baseline) over a gap-free time axis, indicator panes, drawing
 * tools, order lines and real-time streaming, drawn on the GPU.
 */
export function TradingChart(props: TradingChartProps) {
  const {
    height,
    width,
    className,
    style,
    ref,
    onCrosshairMove,
    onClick,
    onVisibleRangeChange,
    onOrderMove,
    onDrawingsChange,
    onDrawingSelect,
    onDrawingToolChange,
    onIndicatorToggle,
    onHistoryRequest,
    onRendererChange,
    ...options
  } = props;
  const handlers: Handlers = {
    onCrosshairMove,
    onClick,
    onVisibleRangeChange,
    onOrderMove,
    onDrawingsChange,
    onDrawingSelect,
    onDrawingToolChange,
    onIndicatorToggle,
    onHistoryRequest,
    onRendererChange,
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<TradingChartInstance | null>(null);
  const handlersRef = useRef<Handlers>(handlers);

  // a new options object on every render: keep the previous one while it
  // describes the same chart (state derived during render)
  const [stable, setStable] = useState<TradingChartOptions>(options);
  if (stable !== options && !sameOptions(stable, options)) setStable(options);
  const optionsRef = useRef(stable);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chart = createTradingChart(container, optionsRef.current);
    chartRef.current = chart;
    const h = () => handlersRef.current;
    const offs = [
      chart.on("crosshairMove", (e) => h().onCrosshairMove?.(e)),
      chart.on("click", (e) => h().onClick?.(e)),
      chart.on("visibleRangeChange", (e) => h().onVisibleRangeChange?.(e)),
      chart.on("orderMove", (e) => h().onOrderMove?.(e)),
      chart.on("drawingsChange", (e) => h().onDrawingsChange?.(e)),
      chart.on("drawingSelect", (e) => h().onDrawingSelect?.(e)),
      chart.on("drawingToolChange", (e) => h().onDrawingToolChange?.(e)),
      chart.on("indicatorToggle", (e) => h().onIndicatorToggle?.(e)),
      chart.on("historyRequest", (e) => h().onHistoryRequest?.(e)),
      chart.on("renderer", (e) => h().onRendererChange?.(e)),
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
    ref,
    (): TradingChartHandle => ({
      update: (bar) => chartRef.current?.update(bar),
      appendBars: (bars) => chartRef.current?.appendBars(bars),
      prependBars: (bars) => chartRef.current?.prependBars(bars),
      setBars: (bars) => chartRef.current?.setBars(bars),
      getBarCount: () => chartRef.current?.getBarCount() ?? 0,
      getBar: (index) => chartRef.current?.getBar(index) ?? null,
      scrollToRealtime: (animate) =>
        chartRef.current?.scrollToRealtime(animate),
      fitContent: () => chartRef.current?.fitContent(),
      getVisibleRange: () => chartRef.current?.getVisibleRange() ?? null,
      setVisibleRange: (range) => chartRef.current?.setVisibleRange(range),
      resetPriceScales: () => chartRef.current?.resetPriceScales(),
      setDrawingTool: (tool) => chartRef.current?.setDrawingTool(tool),
      getDrawings: () => chartRef.current?.getDrawings() ?? [],
      removeDrawing: (id) => chartRef.current?.removeDrawing(id),
      selectDrawing: (id) => chartRef.current?.selectDrawing(id),
      setIndicatorVisible: (id, visible) =>
        chartRef.current?.setIndicatorVisible(id, visible),
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
        height: size(height, "480px"),
        ...style,
      }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
