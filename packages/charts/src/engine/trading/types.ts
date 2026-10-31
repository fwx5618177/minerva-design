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
 * Colors of rising and falling bars: `greenUp` (most markets), `redUp`
 * (mainland China, Taiwan, Japan, Korea conventions) or `auto` (`redUp` when
 * the region of the `locale` is CN, TW, JP or KR, or the language is Chinese,
 * Japanese or Korean without a region; `greenUp` otherwise)
 */
export type TradingColorConvention = "greenUp" | "redUp" | "auto";

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

/** Parabolic stop and reverse: dots under rising bars, over falling ones */
export interface TradingParabolicSarIndicator extends TradingIndicatorBase {
  /** Parabolic SAR */
  type: "psar";
  /**
   * Initial acceleration factor
   * @default 0.02
   */
  start?: number;
  /**
   * Increase of the factor at each new extreme
   * @default 0.02
   */
  increment?: number;
  /**
   * Largest acceleration factor
   * @default 0.2
   */
  maximum?: number;
  /** Color of the dots; the up / down colors by trend by default */
  color?: string;
}

/** Ichimoku cloud: conversion and base lines, lagging span and the cloud between the leading spans */
export interface TradingIchimokuIndicator extends TradingIndicatorBase {
  /** Ichimoku Kinkō Hyō */
  type: "ichimoku";
  /**
   * Bars of the conversion line (Tenkan-sen)
   * @default 9
   */
  conversionPeriod?: number;
  /**
   * Bars of the base line (Kijun-sen)
   * @default 26
   */
  basePeriod?: number;
  /**
   * Bars of the leading span B (Senkou span B)
   * @default 52
   */
  spanBPeriod?: number;
  /**
   * Shift of the leading spans (ahead) and of the lagging span (back), in bars
   * @default 26
   */
  displacement?: number;
  /** Colors of the conversion, base, lagging, leading A and leading B lines */
  colors?: readonly string[];
  /**
   * Fills the cloud between the leading spans: the up color while span A is
   * above span B, the down color otherwise
   * @default true
   */
  cloud?: boolean;
}

/** SuperTrend: a trailing band of average true ranges that flips with the trend */
export interface TradingSupertrendIndicator extends TradingIndicatorBase {
  /** SuperTrend */
  type: "supertrend";
  /**
   * Bars of the average true range
   * @default 10
   */
  period?: number;
  /**
   * Distance of the band, in average true ranges
   * @default 3
   */
  multiplier?: number;
  /** Color of the band in an uptrend; the up color by default */
  upColor?: string;
  /** Color of the band in a downtrend; the down color by default */
  downColor?: string;
}

/** Keltner channel: an exponential average ± a multiple of the average true range */
export interface TradingKeltnerIndicator extends TradingIndicatorBase {
  /** Keltner channel */
  type: "keltner";
  /**
   * Bars of the exponential average
   * @default 20
   */
  period?: number;
  /**
   * Distance of the bands, in average true ranges
   * @default 2
   */
  multiplier?: number;
  /**
   * Bars of the average true range
   * @default 10
   */
  atrPeriod?: number;
  /** Colors of the middle, upper and lower lines */
  colors?: readonly string[];
  /**
   * Fills the channel
   * @default true
   */
  fill?: boolean;
}

/** Donchian channel: the highest high and lowest low of a window, and their midpoint */
export interface TradingDonchianIndicator extends TradingIndicatorBase {
  /** Donchian channel */
  type: "donchian";
  /**
   * Number of bars
   * @default 20
   */
  period?: number;
  /** Colors of the middle, upper and lower lines */
  colors?: readonly string[];
  /**
   * Fills the channel
   * @default true
   */
  fill?: boolean;
}

/** On-balance volume: the running volume of up closes minus down closes */
export interface TradingObvIndicator extends TradingPaneIndicatorBase {
  /** On-balance volume */
  type: "obv";
  /** Period of a moving average drawn over the line */
  maPeriod?: number;
  /** Line color */
  color?: string;
}

/** Commodity channel index, with ±100 bands */
export interface TradingCciIndicator extends TradingPaneIndicatorBase {
  /** Commodity channel index */
  type: "cci";
  /**
   * Number of bars
   * @default 20
   */
  period?: number;
  /** Line color */
  color?: string;
}

/** Stochastic RSI: K and D lines between 0 and 100, with 20 / 80 bands */
export interface TradingStochRsiIndicator extends TradingPaneIndicatorBase {
  /** Stochastic RSI */
  type: "stochRsi";
  /**
   * Bars of the RSI
   * @default 14
   */
  rsiPeriod?: number;
  /**
   * Bars of the stochastic of the RSI
   * @default 14
   */
  stochPeriod?: number;
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
  /** Colors of the K and D lines */
  colors?: readonly string[];
}

/** Directional movement index: +DI, −DI and ADX (trend strength) */
export interface TradingDmiIndicator extends TradingPaneIndicatorBase {
  /** Directional movement index */
  type: "dmi";
  /**
   * Bars of the directional indicators
   * @default 14
   */
  period?: number;
  /**
   * Smoothing of the ADX
   * @default 14
   */
  adxPeriod?: number;
  /** Colors of the +DI, −DI and ADX lines */
  colors?: readonly string[];
}

/** Williams %R (−100 to 0), with −80 / −20 bands */
export interface TradingWilliamsRIndicator extends TradingPaneIndicatorBase {
  /** Williams %R */
  type: "williamsR";
  /**
   * Number of bars
   * @default 14
   */
  period?: number;
  /** Line color */
  color?: string;
}

/** Money flow index (0-100): a volume-weighted RSI, with 20 / 80 bands */
export interface TradingMfiIndicator extends TradingPaneIndicatorBase {
  /** Money flow index */
  type: "mfi";
  /**
   * Number of bars
   * @default 14
   */
  period?: number;
  /** Line color */
  color?: string;
}

/**
 * An indicator: averages, Bollinger / Keltner / Donchian channels, VWAP,
 * parabolic SAR, Ichimoku and SuperTrend are drawn over the price; volume
 * (unless `overlay`), MACD, RSI, KDJ, ATR, OBV, CCI, stochastic RSI, DMI,
 * Williams %R and MFI get a pane
 */
export type TradingIndicator =
  | TradingMovingAverageIndicator
  | TradingBollingerIndicator
  | TradingVwapIndicator
  | TradingVolumeIndicator
  | TradingMacdIndicator
  | TradingRsiIndicator
  | TradingKdjIndicator
  | TradingAtrIndicator
  | TradingParabolicSarIndicator
  | TradingIchimokuIndicator
  | TradingSupertrendIndicator
  | TradingKeltnerIndicator
  | TradingDonchianIndicator
  | TradingObvIndicator
  | TradingCciIndicator
  | TradingStochRsiIndicator
  | TradingDmiIndicator
  | TradingWilliamsRIndicator
  | TradingMfiIndicator;

/** Volume profile of the visible bars, drawn as a horizontal histogram on the price pane */
export interface TradingVolumeProfileOptions {
  /**
   * Number of price rows
   * @default 24
   */
  rows?: number;
  /**
   * Width of the longest row, as a fraction of the plot width
   * @default 0.28
   */
  width?: number;
  /**
   * Share of the volume in the value area, around the point of control
   * @default 0.7
   */
  valueArea?: number;
  /**
   * Side of the plot the rows grow from
   * @default "right"
   */
  side?: "left" | "right";
  /** Color of the volume of rising bars; the up color by default */
  upColor?: string;
  /** Color of the volume of falling bars; the down color by default */
  downColor?: string;
  /** Color of the point of control line */
  pocColor?: string;
}

/** Volume by price of a range of bars, as computed by `volumeProfile` */
export interface TradingVolumeProfile {
  /** Price at the bottom of the first row */
  low: number;
  /** Price at the top of the last row */
  high: number;
  /** Height of a row, in price */
  step: number;
  /** Volume of rising bars per row, bottom row first */
  up: Float64Array;
  /** Volume of falling bars per row */
  down: Float64Array;
  /** Total volume */
  total: number;
  /** Row of the point of control (the largest volume); −1 without volume */
  poc: number;
  /** First row of the value area */
  valueAreaFrom: number;
  /** Last row of the value area */
  valueAreaTo: number;
}

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
  /**
   * Shows a close button on the label (reported by `orderCancel`)
   * @default false
   */
  cancellable?: boolean;
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
  /**
   * Line width in pixels
   * @default 1.5
   */
  lineWidth?: number;
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
  | "arrow"
  | "horizontalLine"
  | "verticalLine"
  | "parallelChannel"
  | "pitchfork"
  | "rectangle"
  | "fibRetracement"
  | "text"
  | "longPosition"
  | "shortPosition"
  | "measure";

/** Anchor of a drawing: a time and a price */
export interface TradingDrawingPoint {
  /** Time (beyond the last bar, extrapolated with the bar duration) */
  time: number;
  /** Price (or value of the indicator pane) */
  price: number;
}

/** A drawing; plain data, so it can be saved and restored */
export interface TradingDrawing {
  /** Unique id */
  id: string;
  /** Tool that made it */
  type: Exclude<TradingDrawingTool, "cursor">;
  /**
   * Anchors: one for horizontal / vertical lines and texts, three for
   * channels, pitchforks and positions (entry, target, stop), two otherwise
   */
  points: readonly TradingDrawingPoint[];
  /**
   * Pane of the drawing: `"price"` or the id of an indicator pane
   * @default "price"
   */
  pane?: string;
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
   * Fills the shape (rectangles, channels, pitchforks, Fibonacci levels)
   * @default true
   */
  fill?: boolean;
  /** Text of a `text` drawing (`\n` starts a new line) */
  text?: string;
  /**
   * Font size of a `text` drawing, in pixels
   * @default 13
   */
  fontSize?: number;
  /** Quantity of a position drawing: shows the profit in price units */
  quantity?: number;
  /**
   * Can't be moved nor deleted by the user
   * @default false
   */
  locked?: boolean;
}

/** Style and content of a drawing, as changed by `updateDrawing` */
export type TradingDrawingPatch = Partial<Omit<TradingDrawing, "id" | "type">>;

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
  /** Legend title of the Ichimoku cloud @default "Ichimoku" */
  ichimoku?: string;
  /** Legend title of the SuperTrend @default "SuperTrend" */
  supertrend?: string;
  /** Default text of a new text drawing @default "Text" */
  text?: string;
  /** Color button of the drawing toolbar @default "Color" */
  color?: string;
  /** Line width button of the drawing toolbar @default "Line width" */
  lineWidth?: string;
  /** Line style button of the drawing toolbar @default "Line style" */
  lineStyle?: string;
  /** Fill button of the drawing toolbar @default "Fill" */
  fill?: string;
  /** Edit button of text drawings in the drawing toolbar @default "Edit text" */
  editText?: string;
  /** Lock button of the drawing toolbar @default "Lock" */
  lock?: string;
  /** Delete button of the drawing toolbar @default "Delete" */
  remove?: string;
  /** Target of the position tools; `{price}` and `{change}` are replaced @default "Target {price} ({change})" */
  target?: string;
  /** Stop of the position tools; `{price}` and `{change}` are replaced @default "Stop {price} ({change})" */
  stop?: string;
  /** Risk / reward ratio of the position tools; `{ratio}` is replaced @default "R:R {ratio}" */
  riskReward?: string;
  /** Profit of the position tools at the last price; `{value}` is replaced @default "P&L {value}" */
  profit?: string;
  /** Long position tool @default "Long" */
  long?: string;
  /** Short position tool @default "Short" */
  short?: string;
  /** Badge of the bar replay; `{time}` is replaced @default "Replay · {time}" */
  replay?: string;
  /** Hint while picking the first bar of a replay @default "Click a bar to start the replay" */
  replayHint?: string;
  /** Buy limit order (at or below the last price); `{price}` is replaced @default "Buy limit {price}" */
  buyLimit?: string;
  /** Sell limit order (at or above the last price); `{price}` is replaced @default "Sell limit {price}" */
  sellLimit?: string;
  /** Buy stop order (above the last price); `{price}` is replaced @default "Buy stop {price}" */
  buyStop?: string;
  /** Sell stop order (below the last price); `{price}` is replaced @default "Sell stop {price}" */
  sellStop?: string;
  /** Read aloud while a keyboard order is armed or a line is selected @default "Arrows move the price, Enter confirms, Escape cancels" */
  orderHint?: string;
  /** Read aloud when a keyboard order is armed @default "Alt+B or Alt+S switches between limit and stop" */
  orderTypeHint?: string;
  /** Read aloud when the line selected by the keyboard can be cancelled @default "Delete cancels the order" */
  orderCancelHint?: string;
  /** Price line selected by the keyboard; `{title}` and `{price}` are replaced @default "{title} at {price}" */
  orderLine?: string;
  /** Read aloud when an order is created or moved; `{price}` is replaced @default "Order placed at {price}" */
  orderPlaced?: string;
  /** Read aloud when a keyboard order is abandoned or an order cancelled @default "Order cancelled" */
  orderCancelled?: string;
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
   * Colors of rising / falling bars: `redUp` swaps the defaults, `auto`
   * follows the market convention of the `locale` (red up for CN, TW, JP and
   * KR). Not derived from the locale by default (a Chinese page may still
   * show global markets)
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
  /** Offset of the displayed times from UTC, in minutes (`480` for UTC+8); overrides `timeZone` */
  utcOffset?: number;
  /**
   * Time zone of the time axis, the session breaks and the VWAP periods (an
   * IANA name such as `"America/New_York"`, or `"UTC"`); the local time by
   * default
   */
  timeZone?: string;
  /**
   * Dashed vertical lines where a day starts (intraday bars)
   * @default false
   */
  sessionBreaks?: boolean;
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
  /**
   * A "+" button at the crosshair price, on the right of the price pane:
   * clicking it reports a limit order (`orderCreate`) at that price, a buy
   * below the last price and a sell above it (with Alt / Option held: the
   * stop order of the other side). With the chart focused, `B` / `S` arm a
   * buy / sell order at the crosshair price (or the last price), the arrows
   * move it (Shift: ten ticks), Enter confirms and Escape cancels. The order
   * is a limit when it waits for a better price (a buy at or below the last
   * price, a sell at or above it), else a stop; `Alt+B` / `Alt+S` switch
   * between limit and stop explicitly. `O` selects the draggable lines in
   * turn to move them the same way, Delete cancels the `cancellable` ones
   * @default false
   */
  orderEntry?: boolean;
  /**
   * Volume by price of the visible bars, with its point of control and
   * value area (`true` for the defaults)
   * @default false
   */
  volumeProfile?: boolean | TradingVolumeProfileOptions;
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
  /**
   * Floating toolbar over the selected drawing (color, width, style, fill,
   * lock, delete)
   * @default true
   */
  drawingToolbar?: boolean;
  /**
   * The automatic price scale also fits the visible drawings of each pane
   * (lines, channels, position tools...)
   * @default false
   */
  autoscaleIncludesDrawings?: boolean;
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

/** A draggable price line was dropped at a new price (or moved with the keyboard) */
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

/** The "+" button of `orderEntry` was clicked, or an order confirmed with the keyboard */
export interface TradingOrderCreateEvent {
  /** Price of the order (rounded to the price precision) */
  price: number;
  /** `buy` below the last price, `sell` above it (`B` / `S` with the keyboard) */
  side: "buy" | "sell";
  /**
   * `limit` for a buy at or below the last price or a sell at or above it,
   * `stop` otherwise (or as switched with Alt)
   */
  orderType: TradingOrderType;
}

/** Type of an order created on the chart */
export type TradingOrderType = "limit" | "stop";

/** The close button of a `cancellable` price line was clicked (or Delete pressed on it) */
export interface TradingOrderCancelEvent {
  /** Id of the line */
  id: string;
  /** The line */
  line: TradingPriceLine;
}

/** State of the bar replay */
export interface TradingReplayState {
  /** Bars are being replayed (the later ones are hidden) */
  active: boolean;
  /** The user is picking the first bar */
  picking: boolean;
  /** Bars are added automatically */
  playing: boolean;
  /** Bars added per second while playing */
  speed: number;
  /** Number of bars shown */
  index: number;
  /** Number of bars of the whole history */
  total: number;
  /** Time of the last bar shown */
  time: number;
}

/** Whether the drawings can be undone or redone */
export interface TradingUndoState {
  /** A change can be undone */
  canUndo: boolean;
  /** An undone change can be redone */
  canRedo: boolean;
}

/** What `syncCharts` keeps in step */
export interface TradingSyncOptions {
  /**
   * Shows the crosshair of the hovered chart on the others (at the same time)
   * @default true
   */
  crosshair?: boolean;
  /**
   * Shows the same time range on every chart when one scrolls or zooms
   * @default true
   */
  timeRange?: boolean;
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
  /** The "+" order entry button was clicked */
  orderCreate: TradingOrderCreateEvent;
  /** The close button of a price line was clicked */
  orderCancel: TradingOrderCancelEvent;
  /** Drawings were added, moved, restyled, deleted, undone or redone */
  drawingsChange: readonly TradingDrawing[];
  /** The selected drawing changed */
  drawingSelect: string | null;
  /** The drawing tool changed (back to `cursor` after a drawing) */
  drawingToolChange: TradingDrawingTool;
  /** Undo / redo became possible or impossible */
  undoChange: TradingUndoState;
  /** An indicator was shown or hidden from the legend */
  indicatorToggle: TradingIndicatorToggleEvent;
  /** The oldest bar came into view (see `prependBars`) */
  historyRequest: TradingHistoryRequestEvent;
  /** The bar replay started, stepped, played, paused or stopped */
  replayChange: TradingReplayState;
  /** The chart entered (`true`) or left full screen */
  fullscreenChange: boolean;
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
  /** Times at the edges of the plot (interpolated between bars) */
  getVisibleTimeRange(): { from: number; to: number };
  /** Shows the bars between two times */
  setVisibleTimeRange(range: { from: number; to: number }): void;
  /**
   * Shows the crosshair at a time (and a price), as if the pointer were
   * there; `null` hides it. Does not emit `crosshairMove`.
   */
  setCrosshair(time: number | null, price?: number): void;
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
  /** Changes the style or the content of a drawing (undoable) */
  updateDrawing(id: string, patch: TradingDrawingPatch): void;
  /** Selects a drawing (`null` clears the selection) */
  selectDrawing(id: string | null): void;
  /** Undoes the last change of the drawings (also Ctrl / ⌘ + Z) */
  undo(): void;
  /** Redoes the last undone change (also Ctrl / ⌘ + Shift + Z) */
  redo(): void;
  /** Whether the drawings can be undone or redone */
  getUndoState(): TradingUndoState;
  /**
   * Starts a bar replay: the bars after `time` are hidden, then added back
   * by `replayStep` or `replayPlay`. Without `time`, the user picks the
   * first bar with a click.
   */
  startReplay(time?: number): void;
  /** Shows the next bars of the replay */
  replayStep(count?: number): void;
  /** Adds `speed` bars per second (the current speed by default) */
  replayPlay(speed?: number): void;
  /** Pauses the replay */
  replayPause(): void;
  /** Ends the replay and shows every bar */
  stopReplay(): void;
  /** State of the bar replay */
  getReplayState(): TradingReplayState;
  /**
   * Image of the chart (bars, axes, drawings and legends) as a data URL
   * @param type image type @default "image/png"
   */
  toDataURL(type?: string, quality?: number): string;
  /** Image of the chart as a blob (`null` without canvas support) */
  toBlob(type?: string, quality?: number): Promise<Blob | null>;
  /** Shows the chart full screen */
  requestFullscreen(): Promise<void>;
  /** Leaves full screen */
  exitFullscreen(): Promise<void>;
  /** Whether the chart is full screen */
  isFullscreen(): boolean;
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
