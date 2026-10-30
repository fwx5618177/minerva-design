// Public types of this module (listed in apps/docs/scripts/generate-api.mjs)

import type { ChartRendererKind, ChartRendererPreference } from "../types";

/** One bar (candle). Times are milliseconds since the epoch (UTC). */
export interface TradingBar {
  /** Opening time of the bar, in ms since the epoch */
  time: number;
  /** First traded price */
  open: number;
  /** Highest traded price */
  high: number;
  /** Lowest traded price */
  low: number;
  /** Last traded price */
  close: number;
  /** Traded volume */
  volume?: number;
}

/**
 * Bars as columns of equal length (typed arrays or plain arrays): the
 * compact form for very large histories (no object per bar)
 */
export interface TradingBarColumns {
  /** Opening times, in ms since the epoch, ascending */
  time: ArrayLike<number>;
  /** Opening prices */
  open: ArrayLike<number>;
  /** Highest prices */
  high: ArrayLike<number>;
  /** Lowest prices */
  low: ArrayLike<number>;
  /** Closing prices */
  close: ArrayLike<number>;
  /** Volumes */
  volume?: ArrayLike<number>;
}

/** Bars as objects or as columns, sorted by time */
export type TradingBarsInput = readonly TradingBar[] | TradingBarColumns;

/**
 * Duration of a bar: milliseconds, or a count and a unit — `s` seconds,
 * `m` minutes, `h` / `H` hours, `d` / `D` days, `w` / `W` weeks, `M` months
 * (`"1m"`, `"15m"`, `"4H"`, `"1D"`, `"1W"`)
 */
export type TradingTimeframe =
  number | `${number}${"s" | "m" | "h" | "H" | "d" | "D" | "w" | "W" | "M"}`;

/** How the bars of the price pane are drawn */
export type TradingChartStyle =
  | "candles"
  | "hollowCandles"
  | "heikinAshi"
  | "bars"
  | "line"
  | "area"
  | "baseline";

/**
 * Price scale: `linear`, `log` (equal distances for equal ratios) or
 * `percent` (change from the first visible bar)
 */
export type TradingScaleMode = "linear" | "log" | "percent";

/**
 * Crosshair: `magnet` snaps the horizontal line to the open, high, low or
 * close of the hovered bar; `free` follows the pointer
 */
export type TradingCrosshairMode = "magnet" | "free";

/**
 * Colors of rising and falling bars: `greenUp` (most markets) or `redUp`
 * (mainland China, Japan, Korea, Taiwan conventions)
 */
export type TradingColorConvention = "greenUp" | "redUp";

/** Price used by an indicator */
export type TradingPriceSource =
  "open" | "high" | "low" | "close" | "hl2" | "hlc3" | "ohlc4";

/** Stroke pattern of a line */
export type TradingLineStyle = "solid" | "dashed" | "dotted";

// ------------------------------------------------------------- indicators

/** Options shared by every indicator */
export interface TradingIndicatorBase {
  /**
   * Identifies the indicator in the legend, the events and the pane sizes;
   * defaults to the type and its parameters (`"ma:7"`, `"macd:12:26:9"`)
   */
  id?: string;
  /**
   * Draws the indicator; hidden indicators keep their legend entry, which
   * shows them again
   * @default true
   */
  visible?: boolean;
}

/** Options shared by the indicators drawn in their own pane */
export interface TradingPaneIndicatorBase extends TradingIndicatorBase {
  /**
   * Height of the pane in pixels (the panes can be resized by dragging
   * their separators)
   * @default 110
   */
  height?: number;
}

/** Moving average of a price over the price bars */
export interface TradingMovingAverageIndicator extends TradingIndicatorBase {
  /** `ma` simple, `ema` exponential, `wma` linearly weighted */
  type: "ma" | "ema" | "wma";
  /** Number of bars averaged */
  period: number;
  /**
   * Price averaged
   * @default "close"
   */
  source?: TradingPriceSource;
  /** Line color (any CSS color); a theme color by default */
  color?: string;
  /**
   * Line width in pixels
   * @default 1.5
   */
  lineWidth?: number;
}

/** Bollinger bands: a moving average and bands a number of standard deviations away */
export interface TradingBollingerIndicator extends TradingIndicatorBase {
  /** Bollinger bands */
  type: "boll";
  /**
   * Number of bars of the average and of the deviation
   * @default 20
   */
  period?: number;
  /**
   * Distance of the bands, in standard deviations
   * @default 2
   */
  multiplier?: number;
  /** Colors of the middle, upper and lower lines */
  colors?: readonly string[];
  /**
   * Fills the space between the bands
   * @default true
   */
  fill?: boolean;
}

/** Volume-weighted average price, reset at the start of each period */
export interface TradingVwapIndicator extends TradingIndicatorBase {
  /** Volume-weighted average price */
  type: "vwap";
  /**
   * Period after which the average starts again
   * @default "day"
   */
  reset?: "day" | "week" | "month" | "none";
  /** Line color */
  color?: string;
}

/** Volume bars colored like their bars, with an optional moving average */
export interface TradingVolumeIndicator extends TradingPaneIndicatorBase {
  /** Volume */
  type: "volume";
  /** Period of a moving average of the volume drawn over the bars */
  maPeriod?: number;
  /**
   * Draws the volume at the bottom of the price pane instead of its own pane
   * @default false
   */
  overlay?: boolean;
}

/** Moving average convergence / divergence with its signal line and histogram */
export interface TradingMacdIndicator extends TradingPaneIndicatorBase {
  /** MACD */
  type: "macd";
  /**
   * Period of the fast exponential average
   * @default 12
   */
  fast?: number;
  /**
   * Period of the slow exponential average
   * @default 26
   */
  slow?: number;
  /**
   * Period of the signal line (average of the MACD line)
   * @default 9
   */
  signal?: number;
  /** Colors of the MACD and signal lines */
  colors?: readonly string[];
}

/** Relative strength index (Wilder), with overbought / oversold bands */
export interface TradingRsiIndicator extends TradingPaneIndicatorBase {
  /** Relative strength index */
  type: "rsi";
  /**
   * Number of bars
   * @default 14
   */
  period?: number;
  /**
   * Upper band
   * @default 70
   */
  overbought?: number;
  /**
   * Lower band
   * @default 30
   */
  oversold?: number;
  /** Line color */
  color?: string;
}

/** Stochastic KDJ: K, D and J lines */
export interface TradingKdjIndicator extends TradingPaneIndicatorBase {
  /** KDJ stochastic */
  type: "kdj";
  /**
   * Bars of the highest high / lowest low window
   * @default 9
   */
  period?: number;
  /**
   * Smoothing of K
   * @default 3
   */
  kPeriod?: number;
  /**
   * Smoothing of D
   * @default 3
   */
  dPeriod?: number;
  /** Colors of the K, D and J lines */
  colors?: readonly string[];
}

/** Average true range (Wilder): the volatility in price units */
export interface TradingAtrIndicator extends TradingPaneIndicatorBase {
  /** Average true range */
  type: "atr";
  /**
   * Number of bars
   * @default 14
   */
  period?: number;
  /** Line color */
  color?: string;
}

/**
 * An indicator: averages, Bollinger bands and VWAP are drawn over the
 * price; volume (unless `overlay`), MACD, RSI, KDJ and ATR get a pane
 */
export type TradingIndicator =
  | TradingMovingAverageIndicator
  | TradingBollingerIndicator
  | TradingVwapIndicator
  | TradingVolumeIndicator
  | TradingMacdIndicator
  | TradingRsiIndicator
  | TradingKdjIndicator
  | TradingAtrIndicator;

// ------------------------------------------------------------ annotations

/** A buy / sell (or any) marker attached to a bar */
export interface TradingMarker {
  /** Time of the bar (the bar containing this time) */
  time: number;
  /**
   * `buy` draws an up arrow below the bar, `sell` a down arrow above it
   * @default "buy"
   */
  side?: "buy" | "sell";
  /** Price of the trade: also marks it with a dot on the bar */
  price?: number;
  /** Short text next to the arrow (`"B"`, `"S"`, `"0.5 @ 64,210"`) */
  text?: string;
  /** Color; the up / down color by default */
  color?: string;
  /** Identifies the marker (React keys, tooltips of your own) */
  id?: string;
}

/**
 * Kind of a price line: `order` (pending), `position` (average entry, with
 * the unrealized profit), `takeProfit`, `stopLoss`, `alert` or a plain `line`
 */
export type TradingPriceLineKind =
  "order" | "position" | "takeProfit" | "stopLoss" | "alert" | "line";

/** A horizontal line at a price: orders, positions, take profit / stop loss, alerts */
export interface TradingPriceLine {
  /** Identifies the line in the `orderMove` event */
  id: string;
  /** Price of the line */
  price: number;
  /**
   * What the line stands for (sets its default look and label)
   * @default "line"
   */
  kind?: TradingPriceLineKind;
  /** Side of an order or position (colors it like rising / falling bars) */
  side?: "buy" | "sell";
  /** Label (`"Limit"`, `"TP"`, ...); a short default per kind */
  title?: string;
  /** Quantity shown next to the label; numbers also give positions their profit */
  quantity?: number | string;
  /** Color; derived from the kind and side by default */
  color?: string;
  /**
   * Can be dragged to another price (reported by `orderMove`)
   * @default false
   */
  draggable?: boolean;
  /** Stroke of the line; dashed for orders, solid for positions by default */
  lineStyle?: TradingLineStyle;
}

/** Comparison series drawn over the price (use the `percent` scale) */
export interface TradingCompareSeries {
  /** Name shown in the legend */
  name: string;
  /** Values by time; matched with the bars of the chart by time */
  data: readonly { time: number; value: number }[];
  /** Line color; a theme color by default */
  color?: string;
  /** Identifies the series (defaults to the name) */
  id?: string;
}

// --------------------------------------------------------------- drawings

/** Drawing tools; `cursor` selects and moves drawings */
export type TradingDrawingTool =
  | "cursor"
  | "trendLine"
  | "ray"
  | "extendedLine"
  | "horizontalLine"
  | "verticalLine"
  | "rectangle"
  | "fibRetracement"
  | "measure";

/** Anchor of a drawing: a time and a price */
export interface TradingDrawingPoint {
  /** Time (beyond the last bar, extrapolated with the bar duration) */
  time: number;
  /** Price */
  price: number;
}

/** A drawing on the price pane; plain data, so it can be saved and restored */
export interface TradingDrawing {
  /** Unique id */
  id: string;
  /** Tool that made it */
  type: Exclude<TradingDrawingTool, "cursor">;
  /** Anchors: one for horizontal / vertical lines, two otherwise */
  points: readonly TradingDrawingPoint[];
  /** Color; the primary color by default */
  color?: string;
  /**
   * Line width in pixels
   * @default 1.5
   */
  lineWidth?: number;
  /**
   * Stroke of the lines
   * @default "solid"
   */
  lineStyle?: TradingLineStyle;
  /**
   * Can't be moved nor deleted by the user
   * @default false
   */
  locked?: boolean;
}

// ---------------------------------------------------------------- options

/**
 * Texts written by the chart. Built in for English, Chinese, Japanese and
 * French (picked from `locale`); the defaults below are the English ones.
 */
export interface TradingChartLabels {
  /** Open in the legend @default "O" */
  open?: string;
  /** High in the legend @default "H" */
  high?: string;
  /** Low in the legend @default "L" */
  low?: string;
  /** Close in the legend @default "C" */
  close?: string;
  /** Name before the change of the bar in the legend (none in English) @default "" */
  change?: string;
  /** Volume in the legend and title of the volume pane @default "Vol" */
  volume?: string;
  /** Default title of `order` price lines @default "Limit" */
  limit?: string;
  /** Default title of `position` price lines @default "Position" */
  position?: string;
  /** Default title of `takeProfit` price lines @default "TP" */
  takeProfit?: string;
  /** Default title of `stopLoss` price lines @default "SL" */
  stopLoss?: string;
  /** Default title of `alert` price lines @default "Alert" */
  alert?: string;
  /** Label of the button scrolling back to the latest bar @default "Scroll to the latest bar" */
  scrollToRealtime?: string;
  /** Accessible label of the indicator toggles; `{name}` is replaced @default "Show or hide {name}" */
  toggleIndicator?: string;
  /** Bar count of the measure tool; `{count}` is replaced @default "{count} bars" */
  bars?: string;
  /** Days of the measure tool and the countdown; `{count}` is replaced @default "{count}d" */
  days?: string;
  /** Hours of the measure tool and the countdown; `{count}` is replaced @default "{count}h" */
  hours?: string;
  /** Minutes of the measure tool; `{count}` is replaced @default "{count}m" */
  minutes?: string;
  /** Accessible description of the chart; `{symbol}` is replaced @default "{symbol} price chart" */
  chart?: string;
  /**
   * Bar read aloud when the keyboard moves the crosshair; `{time}`, `{open}`,
   * `{high}`, `{low}` and `{close}` are replaced
   * @default "{time}: open {open}, high {high}, low {low}, close {close}"
   */
  announcement?: string;
  /** Timeframe shown after the symbol in the legend; the `timeframe` option when it is a string by default */
  timeframe?: string;
}

/** Options of `createTradingChart` (and props of `<TradingChart>`) */
export interface TradingChartOptions {
  /** Bars, oldest first; replaced when a new array / object is passed */
  bars?: TradingBarsInput;
  /** Duration of a bar; inferred from the bar times by default */
  timeframe?: TradingTimeframe;
  /** Name shown in the legend and the accessible label (`"BTC/USDT"`) */
  symbol?: string;
  /**
   * How the bars are drawn
   * @default "candles"
   */
  chartStyle?: TradingChartStyle;
  /** Indicators, over the price or in panes below it, in this order */
  indicators?: readonly TradingIndicator[];
  /**
   * Price scale of the price pane
   * @default "linear"
   */
  scaleMode?: TradingScaleMode;
  /**
   * Colors of rising / falling bars: `redUp` swaps the defaults. Not derived
   * from `locale` (a Chinese page may still show global markets): set it
   * explicitly
   * @default "greenUp"
   */
  colorConvention?: TradingColorConvention;
  /** Color of rising bars (any CSS color, `var(--x)` included) */
  upColor?: string;
  /** Color of falling bars */
  downColor?: string;
  /** Decimals of the prices; detected from the data by default */
  precision?: number;
  /** Formats the prices (axis, legend, labels); overrides `precision` */
  formatPrice?: (price: number) => string;
  /**
   * Locale of the texts, numbers and dates (`"zh-CN"`): the page language
   * (`<html lang>`, followed when it changes), else the browser's, by default
   */
  locale?: string;
  /** Offset of the displayed times from UTC, in minutes (`480` for UTC+8); local time by default */
  utcOffset?: number;
  /**
   * Crosshair behaviour
   * @default "magnet"
   */
  crosshair?: TradingCrosshairMode;
  /**
   * Legends with the values at the crosshair (and the indicator toggles)
   * @default true
   */
  legend?: boolean;
  /**
   * Line and axis label at the last price
   * @default true
   */
  lastPriceLine?: boolean;
  /**
   * Time left until the current bar closes, under the last price label
   * @default false
   */
  countdown?: boolean;
  /**
   * Marks the highest and lowest prices of the visible bars
   * @default true
   */
  highLowMarkers?: boolean;
  /** Buy / sell markers */
  markers?: readonly TradingMarker[];
  /** Order, position, take profit / stop loss and alert lines */
  priceLines?: readonly TradingPriceLine[];
  /** Comparison series (best read with `scaleMode: "percent"`) */
  compare?: readonly TradingCompareSeries[];
  /** Drawings; replaced when a new array is passed (see `drawingsChange`) */
  drawings?: readonly TradingDrawing[];
  /**
   * Active drawing tool
   * @default "cursor"
   */
  drawingMode?: TradingDrawingTool;
  /**
   * Keeps the drawing tool after a drawing is made (back to `cursor` otherwise)
   * @default false
   */
  keepDrawingMode?: boolean;
  /** Price of the `baseline` style; the close of the first visible bar by default */
  baselinePrice?: number;
  /**
   * Empty space after the last bar, in bars
   * @default 8
   */
  rightOffset?: number;
  /**
   * Initial width of a bar, in pixels
   * @default 8
   */
  barSpacing?: number;
  /**
   * Mouse wheel: `zoom`, `modifier` (zoom with Ctrl / ⌘ only, so the page
   * scrolls) or `none`
   * @default "zoom"
   */
  wheel?: "zoom" | "modifier" | "none";
  /**
   * Keeps panning after a quick drag
   * @default true
   */
  kineticScroll?: boolean;
  /**
   * Grid lines
   * @default true
   */
  grid?: boolean;
  /** Large faint text behind the bars (`"BTCUSDT · 1H"`) */
  watermark?: string;
  /** Overrides of the built-in texts of the `locale` */
  labels?: Partial<TradingChartLabels>;
  /**
   * Backend of the bars and lines (WebGPU, then WebGL2, WebGL, Canvas2D)
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /** Accessible label; built from the symbol by default */
  ariaLabel?: string;
}

// ----------------------------------------------------------------- events

/** Visible bars: logical indices (fractional) and the times at the edges */
export interface TradingVisibleRange {
  /** Index at the left edge */
  from: number;
  /** Index at the right edge (beyond the last bar when there is space) */
  to: number;
  /** Time at the left edge */
  fromTime: number;
  /** Time at the right edge */
  toTime: number;
}

/** Crosshair position */
export interface TradingCrosshairEvent {
  /** Index of the hovered bar (may be past the last bar) */
  index: number;
  /** Time of the hovered bar */
  time: number;
  /** Hovered bar, `null` outside the data */
  bar: TradingBar | null;
  /** Price (or value of the indicator pane) at the horizontal line */
  price: number;
  /** Hovered pane: `"price"` or the indicator id */
  pane: string;
  /** x of the crosshair in the chart, in pixels (the center of the bar) */
  x: number;
  /** y of the horizontal line in the chart, in pixels */
  y: number;
}

/** Click on a pane */
export interface TradingClickEvent {
  /** Index of the clicked bar */
  index: number;
  /** Time of the clicked bar */
  time: number;
  /** Price (or indicator value) at the pointer */
  price: number;
  /** Clicked pane */
  pane: string;
}

/** A draggable price line was dropped at a new price */
export interface TradingOrderMoveEvent {
  /** Id of the line */
  id: string;
  /** New price (rounded to the price precision) */
  price: number;
  /** Price before the drag */
  previousPrice: number;
  /** The line */
  line: TradingPriceLine;
}

/** The legend toggled an indicator */
export interface TradingIndicatorToggleEvent {
  /** Id of the indicator */
  id: string;
  /** Whether it is now drawn */
  visible: boolean;
}

/** The user scrolled close to the oldest bar: time to load older bars */
export interface TradingHistoryRequestEvent {
  /** Time of the oldest bar */
  firstTime: number;
  /** Number of bars */
  count: number;
}

/** Events of a trading chart */
export interface TradingChartEventMap {
  /** The backend in use (again when it changes after a GPU loss) */
  renderer: ChartRendererKind;
  /** The crosshair moved; `null` when it left the chart */
  crosshairMove: TradingCrosshairEvent | null;
  /** A pane was clicked (not while drawing) */
  click: TradingClickEvent;
  /** The visible bars changed (scroll, zoom, resize, new bars) */
  visibleRangeChange: TradingVisibleRange;
  /** A draggable price line was dropped */
  orderMove: TradingOrderMoveEvent;
  /** Drawings were added, moved or deleted by the user */
  drawingsChange: readonly TradingDrawing[];
  /** The selected drawing changed */
  drawingSelect: string | null;
  /** The drawing tool changed (back to `cursor` after a drawing) */
  drawingToolChange: TradingDrawingTool;
  /** An indicator was shown or hidden from the legend */
  indicatorToggle: TradingIndicatorToggleEvent;
  /** The oldest bar came into view (see `prependBars`) */
  historyRequest: TradingHistoryRequestEvent;
}

/** A trading chart mounted by `createTradingChart` */
export interface TradingChartInstance {
  /** Replaces the options (bars, drawings, ... are replaced only when their reference changed) */
  setOptions(options: TradingChartOptions): void;
  /** Replaces the bars */
  setBars(bars: TradingBarsInput): void;
  /**
   * Streams a bar: the same time as the last bar replaces it, a later time
   * appends it. Cheap: call it on every tick.
   */
  update(bar: TradingBar): void;
  /** Appends bars newer than the last one */
  appendBars(bars: TradingBarsInput): void;
  /** Inserts older bars before the first one; the view stays on the same bars */
  prependBars(bars: TradingBarsInput): void;
  /** Number of bars */
  getBarCount(): number;
  /** Bar at an index, `null` outside the data */
  getBar(index: number): TradingBar | null;
  /** Scrolls to the latest bar */
  scrollToRealtime(animate?: boolean): void;
  /** Shows every bar */
  fitContent(): void;
  /** Visible bars */
  getVisibleRange(): TradingVisibleRange;
  /** Shows the bars between two logical indices */
  setVisibleRange(range: { from: number; to: number }): void;
  /** Sets the price scale of the price pane */
  setScaleMode(mode: TradingScaleMode): void;
  /** Fits every price scale to the visible bars again */
  resetPriceScales(): void;
  /** Activates a drawing tool */
  setDrawingTool(tool: TradingDrawingTool): void;
  /** Active drawing tool */
  getDrawingTool(): TradingDrawingTool;
  /** Current drawings */
  getDrawings(): readonly TradingDrawing[];
  /** Replaces the drawings */
  setDrawings(drawings: readonly TradingDrawing[]): void;
  /** Deletes a drawing */
  removeDrawing(id: string): void;
  /** Selects a drawing (`null` clears the selection) */
  selectDrawing(id: string | null): void;
  /** Shows or hides an indicator */
  setIndicatorVisible(id: string, visible: boolean): void;
  /** Backend in use (`null` until ready or without canvas support) */
  getRenderer(): ChartRendererKind | null;
  /** Resolves with the backend once the first frame can be drawn */
  ready: Promise<ChartRendererKind | null>;
  /** Reads the CSS variables again (theme changes are detected automatically) */
  refreshTheme(): void;
  /** Draws again at the container size (resizes are detected automatically) */
  resize(): void;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof TradingChartEventMap>(
    type: K,
    listener: (event: TradingChartEventMap[K]) => void,
  ): () => void;
  /** Removes the chart and frees the GPU resources */
  destroy(): void;
}
