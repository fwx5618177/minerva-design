import { watch, type PropType } from "vue";
import type {
  ChartRendererPreference,
  DepthChartLabels,
  DepthChartPriceLine,
  OrderBookColorConvention,
  OrderBookDelta,
  OrderBookHeatmapLabels,
  OrderBookHeatmapScale,
  OrderBookLabels,
  OrderBookMode,
  OrderBookSnapshot,
  TimeAndSalesColumn,
  TimeAndSalesLabels,
} from "minerva-design/charts/core";
import { raw, useChartEngine, type EngineInstance } from "./engine";
import { chartFrameProps } from "./props";
import { definedOptions } from "./trading";
import type { ChartTrades } from "./types";

const optionalBoolean = { type: Boolean, default: undefined } as const;

/** Options shared by the order book components */
const commonProps = {
  ...chartFrameProps,
  /** Color of the bids / buys (any CSS color); from `colorConvention` by default */
  upColor: String,
  /** Color of the asks / sells */
  downColor: String,
  /** `red-up` swaps the default colors (default `green-up`) */
  colorConvention: String as PropType<OrderBookColorConvention>,
  /** Decimals of the prices; detected from the data by default */
  pricePrecision: Number,
  /** Decimals of the sizes; detected from the data by default */
  sizePrecision: Number,
  /** Locale of the numbers and texts (`"zh-CN"`); the page language by default */
  locale: String,
  /** Formats the prices; overrides `pricePrecision` */
  formatPrice: Function as PropType<(price: number) => string>,
  /** Formats the sizes; overrides `sizePrecision` */
  formatSize: Function as PropType<(size: number) => string>,
  /** Font family of the texts (default: the theme font) */
  fontFamily: String,
  /** Font size of the texts, in pixels (default 12) */
  fontSize: Number,
  /** Accessible label */
  ariaLabel: String,
};

/** Props of DepthChart */
export const depthChartProps = {
  ...commonProps,
  /** Book to draw, applied when the object changes (stream updates through the handle's `applyDeltas`) */
  book: Object as PropType<OrderBookSnapshot>,
  /** Visible range on each side of the mid price, as a fraction of the mid; fits the book by default */
  range: Number,
  /** Smallest and largest `range` reachable by zooming (default `[0.0005, 0.5]`) */
  rangeLimits: Array as unknown as PropType<readonly [number, number]>,
  /** Zoom around the mid with the wheel / pinch (default `true`) */
  zoomable: optionalBoolean,
  /** Stepped or straight curves (default `step`) */
  curve: String as PropType<"step" | "linear">,
  /** Cumulative amount in the base asset or the quote notional (default `base`) */
  amount: String as PropType<"base" | "quote">,
  /** Eased transitions between books (default `true`) */
  animate: optionalBoolean,
  /** Opacity of the areas, 0-1 (default 0.28) */
  fillOpacity: Number,
  /** Line and label at the mid price (default `true`) */
  midLine: optionalBoolean,
  /** Legend with the spread (default `true`) */
  legend: optionalBoolean,
  /** Grid lines (default `true`) */
  grid: optionalBoolean,
  /** Price and amount axes (default `true`) */
  axes: optionalBoolean,
  /** Hover readout (default `true`) */
  tooltip: optionalBoolean,
  /** Mirrored readout on the other side (default `true`) */
  mirror: optionalBoolean,
  /** Reference lines at prices (an order, a liquidation) */
  priceLines: Array as PropType<readonly DepthChartPriceLine[]>,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<Partial<DepthChartLabels>>,
};

/** Props of OrderBook */
export const orderBookProps = {
  ...commonProps,
  /** Book to draw, applied when the object changes (stream updates through the handle's `applyDeltas`) */
  book: Object as PropType<OrderBookSnapshot>,
  /** Price of the spread row, colored by its last move; the mid price when omitted */
  lastPrice: { type: Number as PropType<number | null>, default: undefined },
  /** Sides shown (default `both`) */
  mode: String as PropType<OrderBookMode>,
  /** Price step the levels are grouped by (default 0: none) */
  grouping: Number,
  /** Rows per side; fills the height by default */
  rows: Number,
  /** Height of a row, in pixels (default 20) */
  rowHeight: Number,
  /** Depth bars behind the rows (default `cumulative`) */
  depthBars: String as PropType<"cumulative" | "level" | "none">,
  /** Total column in the base asset or the quote notional (default `base`) */
  total: String as PropType<"base" | "quote">,
  /** Columns, in order (default `["price", "size", "total"]`) */
  columns: Array as PropType<readonly ("price" | "size" | "total")[]>,
  /** Flashes the changed sizes (default `true`) */
  flash: optionalBoolean,
  /** Duration of a flash, in ms (default 450) */
  flashDuration: Number,
  /** Highlights the levels at or above this size */
  largeOrderThreshold: Number,
  /** Column headers (default `true`) */
  header: optionalBoolean,
  /** Spread row between the sides (default `true`) */
  spreadRow: optionalBoolean,
  /** Bid / ask imbalance bar (default `true`) */
  imbalance: optionalBoolean,
  /** Hover summary of the cumulative levels (default `true`) */
  tooltip: optionalBoolean,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<Partial<OrderBookLabels>>,
};

/** Props of OrderBookHeatmap */
export const orderBookHeatmapProps = {
  ...commonProps,
  /** Book, applied when the object changes (stream updates through the handle's `applyDeltas`) */
  book: Object as PropType<OrderBookSnapshot>,
  /** Trades; when the array grows, only the appended ones are added */
  trades: Array as PropType<ChartTrades>,
  /** Price step of the rows; detected from the book by default */
  tickSize: Number,
  /** Duration of a column, in ms (default 100) */
  interval: Number,
  /** Time shown, in ms (default 60000) */
  window: Number,
  /** Time kept for panning back, in ms (default 300000) */
  history: Number,
  /** Price levels kept on each side (default 160) */
  depth: Number,
  /** Price range shown around the mid; from `depth` by default */
  priceSpan: Number,
  /** Scale of the sizes to the colors (default `log`) */
  colorScale: String as PropType<OrderBookHeatmapScale>,
  /** Contrast of the colors (default 1) */
  contrast: Number,
  /** Size drawn with the last color; follows the data by default */
  maxSize: Number,
  /** Colors from no liquidity to `maxSize` (any CSS colors) */
  colors: Array as PropType<readonly string[]>,
  /** Trades as bubbles (default `true`) */
  bubbles: optionalBoolean,
  /** Diameter of the largest bubble, in pixels (default 28) */
  bubbleSize: Number,
  /** Trade volume of the largest bubble; follows the data by default */
  bubbleVolume: Number,
  /** Best bid / ask lines (default `true`) */
  bestLines: optionalBoolean,
  /** Size profile of the current book at the right (default `true`) */
  profile: optionalBoolean,
  /** Zoom and pan (default `true`) */
  interactive: optionalBoolean,
  /** Hover readout (default `true`) */
  tooltip: optionalBoolean,
  /** Backend: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`) */
  renderer: String as PropType<ChartRendererPreference>,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<Partial<OrderBookHeatmapLabels>>,
};

/** Props of TimeAndSales */
export const timeAndSalesProps = {
  ...commonProps,
  /** Trades, oldest first; when the array grows, only the appended ones are added (other changes replace the tape) */
  trades: Array as PropType<ChartTrades>,
  /** Trades kept (default 200000) */
  capacity: Number,
  /** Height of a row, in pixels (default 20) */
  rowHeight: Number,
  /** Columns, in order (default `["time", "price", "size"]`) */
  columns: Array as PropType<readonly TimeAndSalesColumn[]>,
  /** Hides the trades below this size (default 0) */
  minSize: Number,
  /** Highlights the trades at or above this size */
  largeTradeThreshold: Number,
  /** Merges the consecutive trades of the same side and price (default `false`) */
  aggregate: optionalBoolean,
  /** Price color: the side of the trade or the tick direction (default `side`) */
  priceColor: String as PropType<"side" | "tick">,
  /** Pauses the tape while hovered (default `true`) */
  pauseOnHover: optionalBoolean,
  /** Slides the new rows in (default `true`) */
  animate: optionalBoolean,
  /** Column headers (default `true`) */
  header: optionalBoolean,
  /** Milliseconds in the times (default `true`) */
  milliseconds: optionalBoolean,
  /** Formats the times */
  formatTime: Function as PropType<(time: number) => string>,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<Partial<TimeAndSalesLabels>>,
};

/** Props passed through engine methods rather than the options */
const STREAMED = ["book", "trades", "lastPrice"];

interface Widget<O> extends EngineInstance<O> {
  setBook?(snapshot: OrderBookSnapshot): void;
  applyDeltas?(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
}

/**
 * Mounts an order book engine: the options are every set prop but the
 * streamed ones; `book` goes through `setBook` when the object changes,
 * `trades` through `add` (the appended trades) / `replace` (any other
 * change)
 */
export function useBookWidget<O, I extends Widget<O>>(
  factory: (container: HTMLElement, options: O) => I,
  props: Record<string, unknown> & {
    book?: OrderBookSnapshot;
    trades?: ChartTrades;
    deep?: boolean;
  },
  bind: (engine: I) => Array<() => void>,
  trades?: {
    add: (engine: I, trades: ChartTrades) => void;
    replace: (engine: I, trades: ChartTrades) => void;
  },
) {
  let previous: ChartTrades | undefined;
  const feed = (engine: I) => {
    const list = raw(props.trades);
    const before = previous;
    previous = list;
    if (!trades || !list || list === before) return;
    const n = before?.length ?? 0;
    if (
      before &&
      n > 0 &&
      list.length >= n &&
      list[0] === before[0] &&
      list[n - 1] === before[n - 1]
    ) {
      if (list.length > n) trades.add(engine, list.slice(n));
      return;
    }
    trades.replace(engine, list);
  };
  const engine = useChartEngine<O, I>(
    factory,
    props,
    () => definedOptions<O>(props, STREAMED),
    (instance) => {
      previous = undefined;
      if (props.book) instance.setBook?.(raw(props.book));
      feed(instance);
      return bind(instance);
    },
    () => definedOptions(props, STREAMED),
  );
  watch(
    () => props.book,
    (book) => {
      if (book) engine.instance.value?.setBook?.(raw(book));
    },
  );
  watch(
    () => props.trades,
    () => {
      if (engine.instance.value) feed(engine.instance.value);
    },
  );
  return engine;
}
