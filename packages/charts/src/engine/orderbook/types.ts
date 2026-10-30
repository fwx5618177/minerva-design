// Public types of the order book module: depth chart, order book ladder,
// liquidity heatmap and time and sales (listed in
// apps/docs/scripts/generate-api.mjs).

import type {
  ChartRendererKind,
  ChartRendererPreference,
  ChartTimeZone,
} from "../types";

/** One price level: `[price, size]` */
export type OrderBookLevel = readonly [price: number, size: number];

/** Price levels as two parallel columns (typed arrays welcome) */
export interface OrderBookLevelColumns {
  /** Prices of the levels */
  price: ArrayLike<number>;
  /** Resting size of each level (0 removes the level in a delta) */
  size: ArrayLike<number>;
}

/** Levels of one side: `[price, size]` tuples or columns, in any order */
export type OrderBookLevels = readonly OrderBookLevel[] | OrderBookLevelColumns;

/** Full state of an order book */
export interface OrderBookSnapshot {
  /** Buy orders (any order: they are sorted, highest price first) */
  bids: OrderBookLevels;
  /** Sell orders (any order: they are sorted, lowest price first) */
  asks: OrderBookLevels;
  /** Exchange time of the snapshot (ms since epoch); the local clock when omitted */
  time?: number;
}

/**
 * Incremental update of an order book: every level sets the new resting
 * size of its price, a size of 0 removes the level
 */
export interface OrderBookDelta {
  /** Changed buy levels */
  bids?: OrderBookLevels;
  /** Changed sell levels */
  asks?: OrderBookLevels;
  /** Exchange time of the update (ms since epoch); the local clock when omitted */
  time?: number;
}

/** Side of a price level */
export type OrderBookSide = "bid" | "ask";

/** Aggressor side of a trade: `buy` lifted an ask, `sell` hit a bid */
export type TradeSide = "buy" | "sell";

/** One executed trade (print) of the order book widgets */
export interface MarketTrade {
  /** Execution time (ms since epoch) */
  time: number;
  /** Execution price */
  price: number;
  /** Executed size (base units) */
  size: number;
  /** Aggressor side: `buy` lifted an ask, `sell` hit a bid */
  side: TradeSide;
}

/** Color convention: which of green / red means "up" (bids, buys) */
export type OrderBookColorConvention = "green-up" | "red-up";

/** Options shared by the depth chart, order book, heatmap and time and sales */
export interface OrderBookCommonOptions {
  /**
   * Color of the bids / buys (the "up" side); `--success-color` by default,
   * `--danger-color` with the red-up convention
   */
  upColor?: string;
  /**
   * Color of the asks / sells (the "down" side); `--danger-color` by
   * default, `--success-color` with the red-up convention
   */
  downColor?: string;
  /**
   * `red-up` swaps the default colors (red bids and buys, green asks and
   * sells), the convention of mainland China, Japan and Korea
   * @default "green-up"
   */
  colorConvention?: OrderBookColorConvention;
  /** Decimals of the prices; inferred from the data when omitted */
  pricePrecision?: number;
  /** Decimals of the sizes; inferred from the data when omitted */
  sizePrecision?: number;
  /**
   * Locale of the numbers (`Intl.NumberFormat`, compact units such as k / 万)
   * and of the built-in texts (English, Chinese, Japanese, French); the page
   * language (`<html lang>`) when omitted
   */
  locale?: string;
  /** Formats a price (replaces `pricePrecision` / `locale`) */
  formatPrice?: (price: number) => string;
  /** Formats a size (replaces `sizePrecision` / `locale`) */
  formatSize?: (size: number) => string;
  /** Font family of the texts; the theme font when omitted (a monospace font gives aligned digits) */
  fontFamily?: string;
  /**
   * Font size of the texts, in pixels
   * @default 12
   */
  fontSize?: number;
  /** Accessible name of the widget; the localized `labels.name` when omitted */
  ariaLabel?: string;
}

/** Store of an order book: two sorted sides updated by snapshots and deltas */
export interface OrderBookStore {
  /** Replaces both sides */
  setSnapshot(snapshot: OrderBookSnapshot): void;
  /** Applies one update (size 0 removes a level); `true` when something changed */
  applyDelta(delta: OrderBookDelta): boolean;
  /** Removes every level */
  clear(): void;
  /** Number of levels of a side */
  count(side: OrderBookSide): number;
  /** Price of the `index`-th level from the best one (0 = best) */
  priceAt(side: OrderBookSide, index: number): number;
  /** Size of the `index`-th level from the best one (0 = best) */
  sizeAt(side: OrderBookSide, index: number): number;
  /** Resting size at a price (0 when there is no level) */
  sizeOf(side: OrderBookSide, price: number): number;
  /** Highest bid, `NaN` when there is none */
  bestBid(): number;
  /** Lowest ask, `NaN` when there is none */
  bestAsk(): number;
  /** Middle of the best bid and ask, `NaN` when a side is empty */
  mid(): number;
  /** Best ask minus best bid, `NaN` when a side is empty */
  spread(): number;
  /**
   * Levels from the best one, aggregated by `step` (bids rounded down, asks
   * up) when it is set
   */
  levels(
    side: OrderBookSide,
    options?: { step?: number; limit?: number },
  ): OrderBookLevelColumns & { count: number };
  /** Time of the last snapshot / delta (ms), `NaN` before the first one */
  time(): number;
  /** Increases on every change */
  version(): number;
}

/** Options of `createOrderBookStore` */
export interface OrderBookStoreOptions {
  /**
   * Levels kept per side: the farthest ones from the best price are dropped
   * @default 5000
   */
  maxLevels?: number;
}

// ------------------------------------------------------------------ depth

/** Texts of the depth chart (tooltip, legend, mid label, accessible name), English defaults */
export interface DepthChartLabels {
  /** @default "Bids" */
  bids: string;
  /** @default "Asks" */
  asks: string;
  /** @default "Price" */
  price: string;
  /** Cumulative size @default "Amount" */
  amount: string;
  /** Cumulative notional (price × size) @default "Total" */
  total: string;
  /** Average fill price of the cumulative amount @default "Avg. price" */
  average: string;
  /** Distance from the mid price @default "From mid" */
  distance: string;
  /** @default "Mid" */
  mid: string;
  /** @default "Spread" */
  spread: string;
  /** Basis points unit of the spread label @default "bp" */
  basisPoints: string;
  /** Accessible name (when `ariaLabel` is not set) @default "Depth chart" */
  name: string;
}

/** A horizontal marker of the depth chart (your orders, liquidation price…) */
export interface DepthChartPriceLine {
  /** Price of the vertical line */
  price: number;
  /** Text of the tag */
  label?: string;
  /** Line color; the text color when omitted */
  color?: string;
}

/** Options of the depth chart */
export interface DepthChartOptions extends OrderBookCommonOptions {
  /**
   * Half width of the visible price range, as a fraction of the mid price
   * (`0.01` = mid ± 1%); fits the shorter side of the book when omitted
   */
  range?: number;
  /**
   * Smallest / largest range the wheel and pinch zoom reach
   * @default [0.0005, 0.5]
   */
  rangeLimits?: readonly [number, number];
  /**
   * Zooms the range with the wheel / pinch (around the mid price)
   * @default true
   */
  zoomable?: boolean;
  /**
   * Shape of the cumulative curves
   * @default "step"
   */
  curve?: "step" | "linear";
  /**
   * Cumulates sizes (`base`) or notional values, price × size (`quote`)
   * @default "base"
   */
  amount?: "base" | "quote";
  /**
   * Eases the curves and the scale between snapshots
   * @default true
   */
  animate?: boolean;
  /**
   * Opacity of the area fills (top of the gradient)
   * @default 0.28
   */
  fillOpacity?: number;
  /**
   * Vertical line at the mid price with the mid / spread label
   * @default true
   */
  midLine?: boolean;
  /**
   * Bids / Asks legend in the top corners
   * @default true
   */
  legend?: boolean;
  /**
   * Grid lines
   * @default true
   */
  grid?: boolean;
  /**
   * Price and amount axes
   * @default true
   */
  axes?: boolean;
  /**
   * Hover crosshair and tooltip
   * @default true
   */
  tooltip?: boolean;
  /**
   * Also shows the opposite side at the same distance from the mid price
   * @default true
   */
  mirror?: boolean;
  /** Vertical markers (open orders, liquidation price…) */
  priceLines?: readonly DepthChartPriceLine[];
  /**
   * Overrides of the built-in texts, which follow `locale` (English,
   * Chinese, Japanese and French built in)
   */
  labels?: Partial<DepthChartLabels>;
}

/** Cumulative depth at one price */
export interface DepthPoint {
  /** Side of the book */
  side: OrderBookSide;
  /** Price */
  price: number;
  /** Size resting between the best price and `price` */
  amount: number;
  /** Notional (Σ price × size) of `amount` */
  total: number;
  /** Average fill price of `amount` (`total / amount`) */
  average: number;
  /** Signed distance from the mid price, as a fraction (−0.01 = 1% below) */
  distance: number;
}

/** Hovered depth: the side under the pointer and its mirror */
export interface DepthChartHoverEvent extends DepthPoint {
  /** The other side at the same distance from the mid (`mirror` option) */
  mirror: DepthPoint | null;
}

/** Events of the depth chart */
export interface DepthChartEventMap {
  /** Pointer over the curves (`null` when it leaves) */
  hover: DepthChartHoverEvent | null;
  /** Click / tap on the curves */
  click: DepthChartHoverEvent;
  /** The visible range changed by zooming (fraction of the mid) */
  range: number;
}

/** Depth chart created by `createDepthChart` */
export interface DepthChartInstance {
  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Removes every level */
  clear(): void;
  /** Replaces the options */
  setOptions(options: DepthChartOptions): void;
  /** Sets the visible range (fraction of the mid); `null` fits the book */
  setRange(range: number | null): void;
  /** Visible range (fraction of the mid) */
  getRange(): number;
  /** The book drawn by the chart */
  getStore(): OrderBookStore;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof DepthChartEventMap>(
    event: K,
    handler: (payload: DepthChartEventMap[K]) => void,
  ): () => void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Removes the chart and its listeners */
  destroy(): void;
}

// ------------------------------------------------------------- order book

/** Texts of the order book ladder (headers, spread row, tooltip, accessible name), English defaults */
export interface OrderBookLabels {
  /** @default "Price" */
  price: string;
  /** @default "Size" */
  size: string;
  /** @default "Total" */
  total: string;
  /** @default "Spread" */
  spread: string;
  /** Hover summary: average fill price @default "Avg. price" */
  average: string;
  /** Hover summary: cumulative size @default "Sum" */
  sum: string;
  /** Hover summary: cumulative notional @default "Notional" */
  notional: string;
  /** Imbalance bar, bid share @default "B" */
  buyShare: string;
  /** Imbalance bar, ask share @default "S" */
  sellShare: string;
  /** Best bid, in the screen reader summary @default "Bid" */
  bid: string;
  /** Best ask, in the screen reader summary @default "Ask" */
  ask: string;
  /** Basis points unit of the spread row @default "bp" */
  basisPoints: string;
  /** Accessible name (when `ariaLabel` is not set) @default "Order book" */
  name: string;
}

/** Display mode of the ladder */
export type OrderBookMode = "both" | "bids" | "asks";

/** Options of the order book ladder */
export interface OrderBookOptions extends OrderBookCommonOptions {
  /**
   * Sides shown: asks above the spread row and bids below, or one side
   * @default "both"
   */
  mode?: OrderBookMode;
  /**
   * Price grouping step (tick size aggregation): bids rounded down, asks
   * up; 0 shows the raw levels
   * @default 0
   */
  grouping?: number;
  /** Rows per side; as many as the height allows when omitted */
  rows?: number;
  /**
   * Height of a row, in pixels
   * @default 20
   */
  rowHeight?: number;
  /**
   * Depth bars behind the rows: cumulative total, size of the level, or none
   * @default "cumulative"
   */
  depthBars?: "cumulative" | "level" | "none";
  /**
   * The total column cumulates sizes (`base`) or notional values (`quote`)
   * @default "base"
   */
  total?: "base" | "quote";
  /**
   * Columns, left to right
   * @default ["price", "size", "total"]
   */
  columns?: readonly ("price" | "size" | "total")[];
  /**
   * Flashes the size of the levels that changed (side color when it grows, gray when it shrinks)
   * @default true
   */
  flash?: boolean;
  /**
   * Duration of a flash, in ms
   * @default 450
   */
  flashDuration?: number;
  /** Rows whose size reaches this value are highlighted (walls) */
  largeOrderThreshold?: number;
  /**
   * Header row with the column names
   * @default true
   */
  header?: boolean;
  /**
   * Spread row between the sides: last / mid price, spread and its basis points
   * @default true
   */
  spreadRow?: boolean;
  /**
   * Bid / ask imbalance bar at the bottom
   * @default true
   */
  imbalance?: boolean;
  /**
   * Hover summary (average price, cumulative size and notional to the hovered row)
   * @default true
   */
  tooltip?: boolean;
  /**
   * Overrides of the built-in texts, which follow `locale` (English,
   * Chinese, Japanese and French built in)
   */
  labels?: Partial<OrderBookLabels>;
}

/** A row of the ladder with its cumulative values */
export interface OrderBookLevelEvent {
  /** Side of the row */
  side: OrderBookSide;
  /** Rows from the spread (0 = best) */
  index: number;
  /** Price of the (grouped) level */
  price: number;
  /** Size of the (grouped) level */
  size: number;
  /** Cumulative size from the best level to this one */
  sum: number;
  /** Cumulative notional (Σ price × size) from the best level to this one */
  notional: number;
  /** Average fill price of `sum` */
  average: number;
}

/** Events of the order book ladder */
export interface OrderBookEventMap {
  /** Hovered row (`null` when the pointer leaves) */
  hover: OrderBookLevelEvent | null;
  /** Click / tap / Enter on a row (e.g. to fill a price in an order form) */
  levelClick: OrderBookLevelEvent;
}

/** Order book ladder created by `createOrderBook` */
export interface OrderBookInstance {
  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Removes every level */
  clear(): void;
  /**
   * Price shown in the spread row (colored by its last move); the mid
   * price when `null`
   */
  setLastPrice(price: number | null): void;
  /** Replaces the options */
  setOptions(options: OrderBookOptions): void;
  /** The book drawn by the ladder */
  getStore(): OrderBookStore;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof OrderBookEventMap>(
    event: K,
    handler: (payload: OrderBookEventMap[K]) => void,
  ): () => void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Removes the ladder and its listeners */
  destroy(): void;
}

// ---------------------------------------------------------------- heatmap

/** Texts of the liquidity heatmap (tooltip, accessible name), English defaults */
export interface OrderBookHeatmapLabels {
  /** @default "Time" */
  time: string;
  /** @default "Price" */
  price: string;
  /** Resting size of the hovered cell @default "Liquidity" */
  liquidity: string;
  /** Bought volume of the hovered column @default "Buys" */
  buys: string;
  /** Sold volume of the hovered column @default "Sells" */
  sells: string;
  /** Best bid, in the screen reader summary @default "Bid" */
  bid: string;
  /** Best ask, in the screen reader summary @default "Ask" */
  ask: string;
  /** Accessible name (when `ariaLabel` is not set) @default "Liquidity heatmap" */
  name: string;
}

/** Scale mapping resting sizes to colors */
export type OrderBookHeatmapScale = "linear" | "sqrt" | "log";

/** Options of the liquidity heatmap */
export interface OrderBookHeatmapOptions extends OrderBookCommonOptions {
  /** Height of a price row (levels are aggregated into rows); a round multiple of the book's tick of about 0.1 basis point when omitted */
  tickSize?: number;
  /**
   * Time between two columns, in ms: the book is sampled at this pace
   * @default 100
   */
  interval?: number;
  /**
   * Visible time span, in ms (zoomable)
   * @default 60000
   */
  window?: number;
  /**
   * History kept, in ms (columns older than this are dropped)
   * @default 300000
   */
  history?: number;
  /**
   * Price rows sampled on each side of the book per column
   * @default 160
   */
  depth?: number;
  /** Visible price span (top − bottom); fits the best bid / ask of the window when omitted */
  priceSpan?: number;
  /**
   * Scale from sizes to colors: `log` reveals thin liquidity next to walls
   * @default "log"
   */
  colorScale?: OrderBookHeatmapScale;
  /**
   * Multiplies the sizes before the scale: above 1 brightens thin liquidity,
   * below 1 keeps only the walls
   * @default 1
   */
  contrast?: number;
  /** Size drawn with the hottest color; follows the data when omitted */
  maxSize?: number;
  /**
   * Color ramp, coldest first, interpolated in OKLab after the floor color
   * (the background, a shade darker in dark themes, shown where there is no
   * liquidity); a perceptual heat ramp suited to the theme when omitted
   */
  colors?: readonly string[];
  /**
   * Trades drawn as bubbles sized by volume (buys / sells colors)
   * @default true
   */
  bubbles?: boolean;
  /**
   * Largest bubble diameter, in pixels
   * @default 28
   */
  bubbleSize?: number;
  /** Trade volume of the largest bubble; follows the data when omitted */
  bubbleVolume?: number;
  /**
   * Best bid and ask lines
   * @default true
   */
  bestLines?: boolean;
  /**
   * Profile of the current book at the right edge
   * @default true
   */
  profile?: boolean;
  /**
   * Wheel / pinch zoom and drag pan (double click resumes following the market)
   * @default true
   */
  interactive?: boolean;
  /**
   * Hover crosshair and tooltip
   * @default true
   */
  tooltip?: boolean;
  /**
   * Backend of the cells: the GPU when available
   * @default "auto"
   */
  renderer?: ChartRendererPreference;
  /**
   * Clock of the time axis and the tooltip: the local time or UTC (the
   * clock of most exchanges)
   * @default "local"
   */
  timeZone?: ChartTimeZone;
  /**
   * Overrides of the built-in texts, which follow `locale` (English,
   * Chinese, Japanese and French built in)
   */
  labels?: Partial<OrderBookHeatmapLabels>;
}

/** Hovered cell of the heatmap */
export interface OrderBookHeatmapHoverEvent {
  /** Start time of the hovered column */
  time: number;
  /** Price of the hovered row */
  price: number;
  /** Resting size of the cell */
  size: number;
  /** Side of the cell (`null` inside the spread) */
  side: OrderBookSide | null;
  /** Volume bought during the column */
  buyVolume: number;
  /** Volume sold during the column */
  sellVolume: number;
}

/** Events of the liquidity heatmap */
export interface OrderBookHeatmapEventMap {
  /** Hovered cell (`null` when the pointer leaves) */
  hover: OrderBookHeatmapHoverEvent | null;
  /** Backend in use (also after a GPU loss) */
  renderer: ChartRendererKind;
  /** `true` while the view follows the market, `false` after a zoom / pan */
  follow: boolean;
}

/** Liquidity heatmap created by `createOrderBookHeatmap` */
export interface OrderBookHeatmapInstance {
  /** Replaces the book (closes the columns up to its time) */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (closes the columns up to their time) */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Adds trades (bubbles) */
  addTrades(trades: MarketTrade | readonly MarketTrade[]): void;
  /** Removes the book, the history and the trades */
  clear(): void;
  /** Replaces the options */
  setOptions(options: OrderBookHeatmapOptions): void;
  /** Follows the market again (latest time, centered on the mid price) */
  resetView(): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** Resolves with the backend once it started (`null` without any) */
  readonly ready: Promise<ChartRendererKind | null>;
  /** The live book */
  getStore(): OrderBookStore;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof OrderBookHeatmapEventMap>(
    event: K,
    handler: (payload: OrderBookHeatmapEventMap[K]) => void,
  ): () => void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Removes the heatmap, its GPU resources and listeners */
  destroy(): void;
}

// --------------------------------------------------------- time and sales

/** Texts of the time and sales tape (header, badges, accessible name), English defaults */
export interface TimeAndSalesLabels {
  /** @default "Time" */
  time: string;
  /** @default "Price" */
  price: string;
  /** @default "Size" */
  size: string;
  /** @default "Side" */
  side: string;
  /** @default "Buy" */
  buy: string;
  /** @default "Sell" */
  sell: string;
  /** Badge while the tape is paused, before the count of new trades @default "Paused" */
  paused: string;
  /** Badge of the new trades while scrolled down ("{count}" is replaced) @default "{count} new" */
  newTrades: string;
  /** Accessible name (when `ariaLabel` is not set) @default "Time and sales" */
  name: string;
}

/** A column of the tape */
export type TimeAndSalesColumn = "time" | "price" | "size" | "side";

/** Options of the time and sales tape */
export interface TimeAndSalesOptions extends OrderBookCommonOptions {
  /**
   * Trades kept (older ones are dropped)
   * @default 200000
   */
  capacity?: number;
  /**
   * Height of a row, in pixels
   * @default 20
   */
  rowHeight?: number;
  /**
   * Columns, left to right
   * @default ["time", "price", "size"]
   */
  columns?: readonly TimeAndSalesColumn[];
  /**
   * Hides the trades (after aggregation) smaller than this size
   * @default 0
   */
  minSize?: number;
  /** Trades whose size reaches this value are bold and tinted (stronger as they grow) */
  largeTradeThreshold?: number;
  /**
   * Merges consecutive trades of the same side and millisecond (one
   * aggressive order sweeping several levels) into one row: sizes summed,
   * the last price
   * @default false
   */
  aggregate?: boolean;
  /**
   * Colors the price by aggressor side, or by tick (up / down from the
   * previous trade)
   * @default "side"
   */
  priceColor?: "side" | "tick";
  /**
   * Freezes the rows while the pointer is over the tape (new trades are counted)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * New trades slide in and flash
   * @default true
   */
  animate?: boolean;
  /**
   * Header row with the column names
   * @default true
   */
  header?: boolean;
  /**
   * Milliseconds in the default time format
   * @default true
   */
  milliseconds?: boolean;
  /**
   * Clock of the default time format: the local time or UTC (the clock of
   * most exchanges)
   * @default "local"
   */
  timeZone?: ChartTimeZone;
  /** Formats the time of a trade (replaces the default `HH:MM:SS.mmm`) */
  formatTime?: (time: number) => string;
  /**
   * Overrides of the built-in texts, which follow `locale` (English,
   * Chinese, Japanese and French built in)
   */
  labels?: Partial<TimeAndSalesLabels>;
}

/** A row of the tape */
export interface TimeAndSalesRowEvent {
  /** The trade (aggregated rows sum the sizes and keep the last price) */
  trade: MarketTrade;
  /** Trades merged into the row (1 without aggregation) */
  count: number;
  /** Row from the top (0 = newest) */
  index: number;
}

/** Events of the time and sales tape */
export interface TimeAndSalesEventMap {
  /** Hovered row (`null` when the pointer leaves) */
  hover: TimeAndSalesRowEvent | null;
  /** Click / tap on a row */
  tradeClick: TimeAndSalesRowEvent;
  /** The tape paused (pointer over it, scrolled down) or resumed */
  pause: boolean;
}

/** Time and sales tape created by `createTimeAndSales` */
export interface TimeAndSalesInstance {
  /** Appends trades (oldest first); drawn once at the next frame */
  addTrades(trades: MarketTrade | readonly MarketTrade[]): void;
  /** Replaces every trade (oldest first) */
  setTrades(trades: readonly MarketTrade[]): void;
  /** Removes every trade */
  clear(): void;
  /** Replaces the options */
  setOptions(options: TimeAndSalesOptions): void;
  /** Scrolls back to the newest trade and resumes */
  scrollToLatest(): void;
  /** Rows after filtering and aggregation */
  getCount(): number;
  /** Subscribes to an event; returns the unsubscribe function */
  on<K extends keyof TimeAndSalesEventMap>(
    event: K,
    handler: (payload: TimeAndSalesEventMap[K]) => void,
  ): () => void;
  /** Measures the container again (a ResizeObserver does it automatically) */
  resize(): void;
  /** Removes the tape and its listeners */
  destroy(): void;
}
