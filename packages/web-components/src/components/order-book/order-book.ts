import type { PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import {
  createDepthChart,
  createOrderBook,
  createOrderBookHeatmap,
  createTimeAndSales,
  type ChartRendererKind,
  type DepthChartInstance,
  type DepthChartOptions,
  type OrderBookDelta,
  type OrderBookHeatmapInstance,
  type OrderBookHeatmapOptions,
  type OrderBookInstance,
  type OrderBookOptions,
  type OrderBookSnapshot,
  type TimeAndSalesInstance,
  type TimeAndSalesOptions,
} from "minerva-design/charts/core";
import {
  MinervaEngineElement,
  type EngineInstance,
} from "../chart/engine-element";

/** Trades of the tape and of the heatmap, oldest first */
type Trades = Parameters<TimeAndSalesInstance["setTrades"]>[0];

/** Engine of an order book widget: options plus a book streamed apart */
interface BookEngine<O> extends EngineInstance<O> {
  setBook(snapshot: OrderBookSnapshot): void;
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
}

/**
 * Base of the order book widgets: `options` go through `setOptions`, the
 * `book` property through `setBook` (stream updates with `applyDeltas`).
 */
abstract class BookElement<
  O extends object,
  I extends BookEngine<O>,
> extends MinervaEngineElement<O, I> {
  /** Book `{ bids, asks, time }` (levels `[price, size]`), applied when the object changes; stream updates through `applyDeltas`; property only */
  @property({ attribute: false })
  book?: OrderBookSnapshot;

  /** Engine options; property only */
  abstract options?: O;

  protected engineOptions(): O {
    return { ...this.options } as O;
  }

  protected override engineMounted(engine: I): void {
    if (this.book) engine.setBook(this.book);
  }

  protected override syncEngine(engine: I, changed: PropertyValues): void {
    if (changed.has("options")) engine.setOptions(this.engineOptions());
    if (changed.has("book") && this.book) engine.setBook(this.book);
  }

  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void {
    this.instance?.setBook(snapshot);
  }

  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void {
    this.instance?.applyDeltas(deltas);
  }
}

/**
 * Passes a trades array to an engine: when it grew (same first and last
 * known items), only the appended trades; any other change replaces them
 */
class TradeFeed {
  private previous?: Trades;

  reset(): void {
    this.previous = undefined;
  }

  apply(
    trades: Trades | undefined,
    add: (trades: Trades) => void,
    replace: (trades: Trades) => void,
  ): void {
    const previous = this.previous;
    this.previous = trades;
    if (!trades || trades === previous) return;
    const n = previous?.length ?? 0;
    if (
      previous &&
      n > 0 &&
      trades.length >= n &&
      trades[0] === previous[0] &&
      trades[n - 1] === previous[n - 1]
    ) {
      if (trades.length > n) add(trades.slice(n));
      return;
    }
    replace(trades);
  }
}

/**
 * Cumulative depth of an order book (the `<DepthChart>` of React, engine
 * `createDepthChart` of `minerva-design/charts/core`): stepped bid / ask
 * areas around the mid price, mirrored hover readout, zoom around the mid,
 * eased updates.
 *
 * Published as the optional entry `minerva-design/web-components/order-book`.
 *
 * @summary Cumulative bid / ask depth around the mid price.
 * @tag minerva-depth-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 * @fires minerva-hover - The pointer moved over the curves; detail: { side, price, amount, total, average, distance, mirror }, `null` when it left
 * @fires minerva-click - The curves were clicked or tapped; detail: { side, price, amount, total, average, distance, mirror }
 * @fires minerva-range-change - The visible range changed by zooming; detail: { range } (fraction of the mid)
 */
export class MinervaDepthChart extends BookElement<
  DepthChartOptions,
  DepthChartInstance
> {
  static override tagName = "minerva-depth-chart";

  /** Engine options (`DepthChartOptions`: range, curve, amount, priceLines, colorConvention, locale, labels...); property only */
  @property({ attribute: false })
  override options?: DepthChartOptions;

  protected createEngine(
    container: HTMLElement,
    options: DepthChartOptions,
  ): DepthChartInstance {
    return createDepthChart(container, options);
  }

  protected override bindEngine(chart: DepthChartInstance): Array<() => void> {
    return [
      chart.on("hover", (e) => this.emit("minerva-hover", e)),
      chart.on("click", (e) => this.emit("minerva-click", e)),
      chart.on("range", (range) =>
        this.emit("minerva-range-change", { range }),
      ),
    ];
  }

  /** Sets the visible range (fraction of the mid); `null` fits the book */
  setRange(range: number | null): void {
    this.instance?.setRange(range);
  }
}

/**
 * Order book ladder (the `<OrderBook>` of React, engine `createOrderBook`
 * of `minerva-design/charts/core`): asks above the spread row, bids below,
 * with depth bars, price grouping, change flashes and large order
 * highlight.
 *
 * Published as the optional entry `minerva-design/web-components/order-book`.
 *
 * @summary Order book ladder with depth bars and flashes.
 * @tag minerva-order-book
 * @csspart root - The sized box of the ladder
 * @csspart surface - The element the engine renders into
 * @fires minerva-hover - A row is hovered; detail: { side, index, price, size, sum, notional, average }, `null` when the pointer left
 * @fires minerva-level-click - A row was clicked, tapped or activated with Enter; detail: { side, index, price, size, sum, notional, average }
 */
export class MinervaOrderBook extends BookElement<
  OrderBookOptions,
  OrderBookInstance
> {
  static override tagName = "minerva-order-book";

  /** Price of the spread row, colored by its last move (the mid price when unset) */
  @property({ type: Number, attribute: "last-price" })
  lastPrice?: number | null;

  /** Engine options (`OrderBookOptions`: mode, grouping, rows, columns, depthBars, locale, labels...); property only */
  @property({ attribute: false })
  override options?: OrderBookOptions;

  protected override get defaultHeight(): string | number {
    return 420;
  }

  protected createEngine(
    container: HTMLElement,
    options: OrderBookOptions,
  ): OrderBookInstance {
    return createOrderBook(container, options);
  }

  protected override bindEngine(book: OrderBookInstance): Array<() => void> {
    return [
      book.on("hover", (e) => this.emit("minerva-hover", e)),
      book.on("levelClick", (e) => this.emit("minerva-level-click", e)),
    ];
  }

  protected override engineMounted(engine: OrderBookInstance): void {
    super.engineMounted(engine);
    if (this.lastPrice !== undefined) engine.setLastPrice(this.lastPrice);
  }

  protected override syncEngine(
    engine: OrderBookInstance,
    changed: PropertyValues,
  ): void {
    super.syncEngine(engine, changed);
    if (changed.has("lastPrice") && this.lastPrice !== undefined)
      engine.setLastPrice(this.lastPrice);
  }

  /** Price of the spread row (the mid price when `null`) */
  setLastPrice(price: number | null): void {
    this.instance?.setLastPrice(price);
  }
}

/**
 * Liquidity heatmap (the `<OrderBookHeatmap>` of React, engine
 * `createOrderBookHeatmap` of `minerva-design/charts/core`): resting size
 * over time and price drawn by the GPU, best bid / ask lines and trades as
 * bubbles sized by volume.
 *
 * Published as the optional entry `minerva-design/web-components/order-book`.
 *
 * @summary GPU liquidity heatmap of an order book over time.
 * @tag minerva-order-book-heatmap
 * @csspart root - The sized box of the heatmap
 * @csspart surface - The element the engine renders into
 * @fires minerva-hover - A cell is hovered; detail: { time, price, size, side, buyVolume, sellVolume }, `null` when the pointer left
 * @fires minerva-renderer-change - The backend is ready (or fell back after a GPU loss); detail: { renderer }
 * @fires minerva-follow-change - The view follows the market (`true`) or not after a zoom / pan (`false`); detail: { follow }
 */
export class MinervaOrderBookHeatmap extends BookElement<
  OrderBookHeatmapOptions,
  OrderBookHeatmapInstance
> {
  static override tagName = "minerva-order-book-heatmap";

  /** Trades `{ time, price, size, side }`; when the array grows, only the appended ones are added; property only */
  @property({ attribute: false })
  trades?: Trades;

  /** Engine options (`OrderBookHeatmapOptions`: tickSize, interval, window, colorScale, bubbles, locale, labels...); property only */
  @property({ attribute: false })
  override options?: OrderBookHeatmapOptions;

  private feed = new TradeFeed();

  protected override get defaultHeight(): string | number {
    return 360;
  }

  protected createEngine(
    container: HTMLElement,
    options: OrderBookHeatmapOptions,
  ): OrderBookHeatmapInstance {
    this.feed.reset();
    return createOrderBookHeatmap(container, options);
  }

  protected override bindEngine(
    heatmap: OrderBookHeatmapInstance,
  ): Array<() => void> {
    return [
      heatmap.on("hover", (e) => this.emit("minerva-hover", e)),
      heatmap.on("renderer", (renderer) =>
        this.emit("minerva-renderer-change", { renderer }),
      ),
      heatmap.on("follow", (follow) =>
        this.emit("minerva-follow-change", { follow }),
      ),
    ];
  }

  private feedTrades(engine: OrderBookHeatmapInstance): void {
    const add = (list: Trades) => engine.addTrades(list);
    this.feed.apply(this.trades, add, add);
  }

  protected override engineMounted(engine: OrderBookHeatmapInstance): void {
    super.engineMounted(engine);
    this.feedTrades(engine);
  }

  protected override syncEngine(
    engine: OrderBookHeatmapInstance,
    changed: PropertyValues,
  ): void {
    super.syncEngine(engine, changed);
    if (changed.has("trades")) this.feedTrades(engine);
  }

  /** Adds trades (bubbles) */
  addTrades(trades: Trades[number] | Trades): void {
    this.instance?.addTrades(trades);
  }

  /** Follows the market again (latest time, centered on the mid price) */
  resetView(): void {
    this.instance?.resetView();
  }

  /** Backend in use (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance?.getRenderer() ?? null;
  }
}

/**
 * Time and sales tape (the `<TimeAndSales>` of React, engine
 * `createTimeAndSales` of `minerva-design/charts/core`): newest trades on
 * top, virtualized (hundreds of thousands of rows), large trades
 * highlighted, paused while hovered.
 *
 * Published as the optional entry `minerva-design/web-components/order-book`.
 *
 * @summary Virtualized tape of the latest trades.
 * @tag minerva-time-and-sales
 * @csspart root - The sized box of the tape
 * @csspart surface - The element the engine renders into
 * @fires minerva-hover - A row is hovered; detail: { trade, count, index }, `null` when the pointer left
 * @fires minerva-trade-click - A row was clicked, tapped or activated with Enter; detail: { trade, count, index }
 * @fires minerva-pause - The tape paused (pointer over it, scrolled down) or resumed; detail: { paused }
 */
export class MinervaTimeAndSales extends MinervaEngineElement<
  TimeAndSalesOptions,
  TimeAndSalesInstance
> {
  static override tagName = "minerva-time-and-sales";

  /** Trades `{ time, price, size, side }`, oldest first; when the array grows, only the appended ones are added (other changes replace the tape); property only */
  @property({ attribute: false })
  trades?: Trades;

  /** Engine options (`TimeAndSalesOptions`: columns, minSize, largeTradeThreshold, aggregate, locale, labels...); property only */
  @property({ attribute: false })
  options?: TimeAndSalesOptions;

  private feed = new TradeFeed();

  protected override get defaultHeight(): string | number {
    return 360;
  }

  protected createEngine(
    container: HTMLElement,
    options: TimeAndSalesOptions,
  ): TimeAndSalesInstance {
    this.feed.reset();
    return createTimeAndSales(container, options);
  }

  protected engineOptions(): TimeAndSalesOptions {
    return { ...this.options };
  }

  protected override bindEngine(tape: TimeAndSalesInstance): Array<() => void> {
    return [
      tape.on("hover", (e) => this.emit("minerva-hover", e)),
      tape.on("tradeClick", (e) => this.emit("minerva-trade-click", e)),
      tape.on("pause", (paused) => this.emit("minerva-pause", { paused })),
    ];
  }

  private feedTrades(engine: TimeAndSalesInstance): void {
    this.feed.apply(
      this.trades,
      (list) => engine.addTrades(list),
      (list) => engine.setTrades(list),
    );
  }

  protected override engineMounted(engine: TimeAndSalesInstance): void {
    this.feedTrades(engine);
  }

  protected override syncEngine(
    engine: TimeAndSalesInstance,
    changed: PropertyValues,
  ): void {
    if (changed.has("options")) engine.setOptions(this.engineOptions());
    if (changed.has("trades")) this.feedTrades(engine);
  }

  /** Appends trades (oldest first) */
  addTrades(trades: Trades[number] | Trades): void {
    this.instance?.addTrades(trades);
  }

  /** Replaces every trade */
  setTrades(trades: Trades): void {
    this.instance?.setTrades(trades);
  }

  /** Removes every trade */
  clear(): void {
    this.instance?.clear();
  }

  /** Scrolls back to the newest trade and resumes */
  scrollToLatest(): void {
    this.instance?.scrollToLatest();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-depth-chart": MinervaDepthChart;
    "minerva-order-book": MinervaOrderBook;
    "minerva-order-book-heatmap": MinervaOrderBookHeatmap;
    "minerva-time-and-sales": MinervaTimeAndSales;
  }
}
