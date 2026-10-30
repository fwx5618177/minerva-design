// React components of the order book module (depth chart, order book
// ladder, liquidity heatmap, time and sales), re-exported by index.ts. Each
// one mounts its engine once; options are forwarded when they change and
// streams go through the ref handle (`applyDeltas`, `addTrades`) without
// re-rendering React.

import {
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type Ref,
  type RefObject,
} from "react";
import { resolveLocale } from "../engine/locale";
import { createDepthChart } from "../engine/orderbook/depth";
import { createOrderBookHeatmap } from "../engine/orderbook/heatmap";
import { createOrderBook } from "../engine/orderbook/ladder";
import { createTimeAndSales } from "../engine/orderbook/tape";
import type {
  DepthChartHoverEvent,
  DepthChartInstance,
  DepthChartOptions,
  MarketTrade,
  OrderBookDelta,
  OrderBookHeatmapHoverEvent,
  OrderBookHeatmapInstance,
  OrderBookHeatmapOptions,
  OrderBookInstance,
  OrderBookLevelEvent,
  OrderBookOptions,
  OrderBookSnapshot,
  TimeAndSalesInstance,
  TimeAndSalesOptions,
  TimeAndSalesRowEvent,
} from "../engine/orderbook/types";
import type { ChartRendererKind } from "../engine/types";

/** Container props shared by the order book components */
export interface OrderBookWidgetProps {
  /** Height of the widget; numbers are pixels */
  height?: number | string;
  /**
   * Width of the widget; numbers are pixels
   * @default "100%"
   */
  width?: number | string;
  /** Class of the container */
  className?: string;
  /** Style of the container */
  style?: CSSProperties;
}

/** Imperative handle of `DepthChart` */
export interface DepthChartHandle {
  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Sets the visible range (fraction of the mid); `null` fits the book */
  setRange(range: number | null): void;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): DepthChartInstance | null;
}

/** Props of `DepthChart` */
export interface DepthChartProps
  extends DepthChartOptions, OrderBookWidgetProps {
  /** Book to draw, applied when the object changes (stream updates through the ref) */
  book?: OrderBookSnapshot;
  /** Pointer over the curves (`null` when it leaves) */
  onHover?: (event: DepthChartHoverEvent | null) => void;
  /** Click / tap on the curves */
  onClick?: (event: DepthChartHoverEvent) => void;
  /** The visible range changed by zooming (fraction of the mid) */
  onRangeChange?: (range: number) => void;
  /** Imperative handle: `setBook`, `applyDeltas`, `setRange` */
  ref?: Ref<DepthChartHandle>;
}

/** Imperative handle of `OrderBook` */
export interface OrderBookHandle {
  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Price of the spread row (the mid price when `null`) */
  setLastPrice(price: number | null): void;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): OrderBookInstance | null;
}

/** Props of `OrderBook` */
export interface OrderBookProps extends OrderBookOptions, OrderBookWidgetProps {
  /** Book to draw, applied when the object changes (stream updates through the ref) */
  book?: OrderBookSnapshot;
  /** Price of the spread row, colored by its last move; the mid price when omitted */
  lastPrice?: number | null;
  /** Hovered row (`null` when the pointer leaves) */
  onHover?: (level: OrderBookLevelEvent | null) => void;
  /** Click / tap / Enter on a row (e.g. to fill a price in an order form) */
  onLevelClick?: (level: OrderBookLevelEvent) => void;
  /** Imperative handle: `setBook`, `applyDeltas`, `setLastPrice` */
  ref?: Ref<OrderBookHandle>;
}

/** Imperative handle of `OrderBookHeatmap` */
export interface OrderBookHeatmapHandle {
  /** Replaces the book (closes the columns up to its time) */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (closes the columns up to their time) */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Adds trades (bubbles) */
  addTrades(trades: MarketTrade | readonly MarketTrade[]): void;
  /** Follows the market again */
  resetView(): void;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): OrderBookHeatmapInstance | null;
}

/** Props of `OrderBookHeatmap` */
export interface OrderBookHeatmapProps
  extends OrderBookHeatmapOptions, OrderBookWidgetProps {
  /** Book, applied when the object changes (stream updates through the ref) */
  book?: OrderBookSnapshot;
  /** Trades; when the array grows, only the appended ones are added */
  trades?: readonly MarketTrade[];
  /** Hovered cell (`null` when the pointer leaves) */
  onHover?: (event: OrderBookHeatmapHoverEvent | null) => void;
  /** Backend in use (also after a GPU loss) */
  onRendererChange?: (renderer: ChartRendererKind) => void;
  /** `true` while the view follows the market, `false` after a zoom / pan */
  onFollowChange?: (follow: boolean) => void;
  /** Imperative handle: `setBook`, `applyDeltas`, `addTrades`, `resetView` */
  ref?: Ref<OrderBookHeatmapHandle>;
}

/** Imperative handle of `TimeAndSales` */
export interface TimeAndSalesHandle {
  /** Appends trades (oldest first) */
  addTrades(trades: MarketTrade | readonly MarketTrade[]): void;
  /** Replaces every trade */
  setTrades(trades: readonly MarketTrade[]): void;
  /** Removes every trade */
  clear(): void;
  /** Scrolls back to the newest trade and resumes */
  scrollToLatest(): void;
  /** The underlying engine instance (minerva-design/charts/core) */
  getInstance(): TimeAndSalesInstance | null;
}

/** Props of `TimeAndSales` */
export interface TimeAndSalesProps
  extends TimeAndSalesOptions, OrderBookWidgetProps {
  /**
   * Trades, oldest first; when the array grows, only the appended ones are
   * added (other changes replace the tape)
   */
  trades?: readonly MarketTrade[];
  /** Hovered row (`null` when the pointer leaves) */
  onHover?: (row: TimeAndSalesRowEvent | null) => void;
  /** Click / tap / Enter on a row */
  onTradeClick?: (row: TimeAndSalesRowEvent) => void;
  /** The tape paused (pointer over it, scrolled down) or resumed */
  onPause?: (paused: boolean) => void;
  /** Imperative handle: `addTrades`, `setTrades`, `clear`, `scrollToLatest` */
  ref?: Ref<TimeAndSalesHandle>;
}

// ------------------------------------------------------------------ shared

const size = (value: number | string | undefined, fallback: string) =>
  value === undefined
    ? fallback
    : typeof value === "number"
      ? `${value}px`
      : value;

/** Identical values, or inline arrays / objects with identical items */
const sameValue = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b))
    return a.length === b.length && a.every((v, i) => v === b[i]);
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null ||
    Object.getPrototypeOf(a) !== Object.prototype ||
    Object.getPrototypeOf(b) !== Object.prototype
  )
    return false;
  const ka = Object.keys(a);
  return (
    ka.length === Object.keys(b).length &&
    ka.every(
      (k) =>
        (a as Record<string, unknown>)[k] === (b as Record<string, unknown>)[k],
    )
  );
};

/** Same options, one level deep (inline `labels={{ … }}` stays equal) */
const sameOptions = (a: object, b: object): boolean => {
  const ka = Object.keys(a).filter(
    (k) => (a as Record<string, unknown>)[k] !== undefined,
  );
  const kb = Object.keys(b).filter(
    (k) => (b as Record<string, unknown>)[k] !== undefined,
  );
  return (
    ka.length === kb.length &&
    ka.every((k) =>
      sameValue(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
      ),
    )
  );
};

interface Widget<O> {
  setOptions(options: O): void;
  destroy(): void;
}

/** Locale the engine resolves for `options` (the page language by default) */
const localeOf = (options: object): string =>
  resolveLocale((options as { locale?: string }).locale);

/**
 * Mounts an engine widget once, forwards option changes and subscribes the
 * handlers (read through a ref: inline callbacks never re-subscribe). The
 * options are applied again when the page language (`<html lang>`) changed,
 * so the built-in texts follow a language switch.
 */
function useWidget<O extends object, I extends Widget<O>, H>(
  factory: (container: HTMLElement, options: O) => I,
  options: O,
  handlers: H,
  connect: (instance: I, handlers: () => H) => (() => void)[],
): {
  containerRef: RefObject<HTMLDivElement | null>;
  instanceRef: RefObject<I | null>;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<I | null>(null);
  const optionsRef = useRef(options);
  const localeRef = useRef("");
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    localeRef.current = localeOf(optionsRef.current);
    const instance = factory(container, optionsRef.current);
    instanceRef.current = instance;
    const offs = connect(instance, () => handlersRef.current);
    return () => {
      offs.forEach((off) => off());
      instance.destroy();
      instanceRef.current = null;
    };
  }, [factory, connect]);

  useEffect(() => {
    const locale = localeOf(options);
    if (
      sameOptions(optionsRef.current, options) &&
      locale === localeRef.current
    )
      return;
    optionsRef.current = options;
    localeRef.current = locale;
    instanceRef.current?.setOptions(options);
  });

  return { containerRef, instanceRef };
}

/** Applies `book` when the object changes */
function useBook(
  instanceRef: RefObject<{ setBook(s: OrderBookSnapshot): void } | null>,
  book: OrderBookSnapshot | undefined,
) {
  useEffect(() => {
    if (book) instanceRef.current?.setBook(book);
  }, [instanceRef, book]);
}

/** Adds the trades appended to `trades`; `replace` gets any other change */
function useTrades(
  instanceRef: RefObject<object | null>,
  trades: readonly MarketTrade[] | undefined,
  add: (trades: readonly MarketTrade[]) => void,
  replace: (trades: readonly MarketTrade[]) => void,
) {
  const previousRef = useRef<readonly MarketTrade[] | undefined>(undefined);
  /** Instance that received `previousRef` (a remount starts over) */
  const targetRef = useRef<object | null>(null);
  const addRef = useRef(add);
  const replaceRef = useRef(replace);
  useEffect(() => {
    addRef.current = add;
    replaceRef.current = replace;
  });
  useEffect(() => {
    const target = instanceRef.current;
    const previous =
      targetRef.current === target ? previousRef.current : undefined;
    previousRef.current = trades;
    targetRef.current = target;
    if (!trades || trades === previous) return;
    const n = previous?.length ?? 0;
    // a grown array (same items in front): only the new ones
    if (
      previous &&
      n > 0 &&
      trades.length >= n &&
      trades[n - 1] === previous[n - 1] &&
      trades[0] === previous[0]
    ) {
      if (trades.length > n) addRef.current(trades.slice(n));
      return;
    }
    replaceRef.current(trades);
  }, [instanceRef, trades]);
}

function Frame({
  containerRef,
  height,
  width,
  className,
  style,
  fallbackHeight,
}: OrderBookWidgetProps & {
  containerRef: RefObject<HTMLDivElement | null>;
  fallbackHeight: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size(width, "100%"),
        height: size(height, fallbackHeight),
        ...style,
      }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}

// -------------------------------------------------------------- depth chart

interface DepthHandlers {
  onHover?: DepthChartProps["onHover"];
  onClick?: DepthChartProps["onClick"];
  onRangeChange?: DepthChartProps["onRangeChange"];
}

const connectDepth = (chart: DepthChartInstance, h: () => DepthHandlers) => [
  chart.on("hover", (e) => h().onHover?.(e)),
  chart.on("click", (e) => h().onClick?.(e)),
  chart.on("range", (r) => h().onRangeChange?.(r)),
];

/**
 * Cumulative depth of an order book: stepped bid / ask areas around the mid
 * price, mirrored hover readout, zoom around the mid, eased updates.
 */
export function DepthChart({
  height,
  width,
  className,
  style,
  book,
  onHover,
  onClick,
  onRangeChange,
  ref,
  ...options
}: DepthChartProps) {
  const { containerRef, instanceRef } = useWidget(
    createDepthChart,
    options,
    { onHover, onClick, onRangeChange },
    connectDepth,
  );
  useBook(instanceRef, book);
  useImperativeHandle(
    ref,
    () => ({
      setBook: (snapshot) => instanceRef.current?.setBook(snapshot),
      applyDeltas: (deltas) => instanceRef.current?.applyDeltas(deltas),
      setRange: (range) => instanceRef.current?.setRange(range),
      getInstance: () => instanceRef.current,
    }),
    [instanceRef],
  );
  return (
    <Frame
      containerRef={containerRef}
      height={height}
      width={width}
      className={className}
      style={style}
      fallbackHeight="320px"
    />
  );
}

// --------------------------------------------------------------- order book

interface LadderHandlers {
  onHover?: OrderBookProps["onHover"];
  onLevelClick?: OrderBookProps["onLevelClick"];
}

const connectLadder = (book: OrderBookInstance, h: () => LadderHandlers) => [
  book.on("hover", (e) => h().onHover?.(e)),
  book.on("levelClick", (e) => h().onLevelClick?.(e)),
];

/**
 * Order book ladder: asks above the spread row, bids below, with depth
 * bars, price grouping, change flashes and large order highlight.
 */
export function OrderBook({
  height,
  width,
  className,
  style,
  book,
  lastPrice,
  onHover,
  onLevelClick,
  ref,
  ...options
}: OrderBookProps) {
  const { containerRef, instanceRef } = useWidget(
    createOrderBook,
    options,
    { onHover, onLevelClick },
    connectLadder,
  );
  useBook(instanceRef, book);
  useEffect(() => {
    if (lastPrice !== undefined) instanceRef.current?.setLastPrice(lastPrice);
  }, [instanceRef, lastPrice]);
  useImperativeHandle(
    ref,
    () => ({
      setBook: (snapshot) => instanceRef.current?.setBook(snapshot),
      applyDeltas: (deltas) => instanceRef.current?.applyDeltas(deltas),
      setLastPrice: (price) => instanceRef.current?.setLastPrice(price),
      getInstance: () => instanceRef.current,
    }),
    [instanceRef],
  );
  return (
    <Frame
      containerRef={containerRef}
      height={height}
      width={width}
      className={className}
      style={style}
      fallbackHeight="420px"
    />
  );
}

// ------------------------------------------------------------------ heatmap

interface HeatmapHandlers {
  onHover?: OrderBookHeatmapProps["onHover"];
  onRendererChange?: OrderBookHeatmapProps["onRendererChange"];
  onFollowChange?: OrderBookHeatmapProps["onFollowChange"];
}

const connectHeatmap = (
  heatmap: OrderBookHeatmapInstance,
  h: () => HeatmapHandlers,
) => [
  heatmap.on("hover", (e) => h().onHover?.(e)),
  heatmap.on("renderer", (r) => h().onRendererChange?.(r)),
  heatmap.on("follow", (f) => h().onFollowChange?.(f)),
];

/**
 * Liquidity heatmap: resting size over time and price drawn by the GPU,
 * best bid / ask lines and trades as bubbles sized by volume.
 */
export function OrderBookHeatmap({
  height,
  width,
  className,
  style,
  book,
  trades,
  onHover,
  onRendererChange,
  onFollowChange,
  ref,
  ...options
}: OrderBookHeatmapProps) {
  const { containerRef, instanceRef } = useWidget(
    createOrderBookHeatmap,
    options,
    { onHover, onRendererChange, onFollowChange },
    connectHeatmap,
  );
  useBook(instanceRef, book);
  useTrades(
    instanceRef,
    trades,
    (list) => instanceRef.current?.addTrades(list),
    (list) => instanceRef.current?.addTrades(list),
  );
  useImperativeHandle(
    ref,
    () => ({
      setBook: (snapshot) => instanceRef.current?.setBook(snapshot),
      applyDeltas: (deltas) => instanceRef.current?.applyDeltas(deltas),
      addTrades: (list) => instanceRef.current?.addTrades(list),
      resetView: () => instanceRef.current?.resetView(),
      getInstance: () => instanceRef.current,
    }),
    [instanceRef],
  );
  return (
    <Frame
      containerRef={containerRef}
      height={height}
      width={width}
      className={className}
      style={style}
      fallbackHeight="360px"
    />
  );
}

// ----------------------------------------------------------- time and sales

interface TapeHandlers {
  onHover?: TimeAndSalesProps["onHover"];
  onTradeClick?: TimeAndSalesProps["onTradeClick"];
  onPause?: TimeAndSalesProps["onPause"];
}

const connectTape = (tape: TimeAndSalesInstance, h: () => TapeHandlers) => [
  tape.on("hover", (e) => h().onHover?.(e)),
  tape.on("tradeClick", (e) => h().onTradeClick?.(e)),
  tape.on("pause", (p) => h().onPause?.(p)),
];

/**
 * Time and sales tape: newest trades on top, virtualized (hundreds of
 * thousands of rows), large trades highlighted, paused while hovered.
 */
export function TimeAndSales({
  height,
  width,
  className,
  style,
  trades,
  onHover,
  onTradeClick,
  onPause,
  ref,
  ...options
}: TimeAndSalesProps) {
  const { containerRef, instanceRef } = useWidget(
    createTimeAndSales,
    options,
    { onHover, onTradeClick, onPause },
    connectTape,
  );
  useTrades(
    instanceRef,
    trades,
    (list) => instanceRef.current?.addTrades(list),
    (list) => instanceRef.current?.setTrades(list),
  );
  useImperativeHandle(
    ref,
    () => ({
      addTrades: (list) => instanceRef.current?.addTrades(list),
      setTrades: (list) => instanceRef.current?.setTrades(list),
      clear: () => instanceRef.current?.clear(),
      scrollToLatest: () => instanceRef.current?.scrollToLatest(),
      getInstance: () => instanceRef.current,
    }),
    [instanceRef],
  );
  return (
    <Frame
      containerRef={containerRef}
      height={height}
      width={width}
      className={className}
      style={style}
      fallbackHeight="360px"
    />
  );
}
