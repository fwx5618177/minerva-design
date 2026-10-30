import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  effect,
  input,
  output,
  untracked,
} from "@angular/core";
import {
  createDepthChart,
  createOrderBook,
  createOrderBookHeatmap,
  createTimeAndSales,
  createTradingChart,
  type ChartRendererKind,
  type DepthChartHoverEvent,
  type DepthChartInstance,
  type DepthChartOptions,
  type OrderBookDelta,
  type OrderBookHeatmapHoverEvent,
  type OrderBookHeatmapInstance,
  type OrderBookHeatmapOptions,
  type OrderBookInstance,
  type OrderBookLevelEvent,
  type OrderBookOptions,
  type OrderBookSnapshot,
  type TimeAndSalesInstance,
  type TimeAndSalesOptions,
  type TimeAndSalesRowEvent,
  type TradingBar,
  type TradingBarsInput,
  type TradingChartInstance,
  type TradingChartOptions,
  type TradingChartStyle,
  type TradingClickEvent,
  type TradingCrosshairEvent,
  type TradingDrawing,
  type TradingDrawingTool,
  type TradingHistoryRequestEvent,
  type TradingIndicator,
  type TradingIndicatorToggleEvent,
  type TradingOrderMoveEvent,
  type TradingTimeframe,
  type TradingVisibleRange,
} from "minerva-design/charts/core";
import { CHART_SURFACE, MnChartEngine, type EngineInstance } from "./engine";

/** Trades of `MnTimeAndSales` and `MnOrderBookHeatmap`, oldest first */
export type ChartTrades = Parameters<TimeAndSalesInstance["setTrades"]>[0];

/**
 * Professional trading chart: candles (hollow, Heikin-Ashi, bars, line,
 * area, baseline) over a gap-free time axis, indicator panes, drawing
 * tools, order lines and real-time streaming, drawn on the GPU (engine
 * `createTradingChart`). Stream ticks with `update(bar)`.
 */
@Component({
  selector: "mn-trading-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnTradingChart extends MnChartEngine<
  TradingChartOptions,
  TradingChartInstance
> {
  /** Bars, oldest first; replaced when a new array / object is passed */
  readonly bars = input<TradingBarsInput | undefined>(undefined);
  /** Name shown in the legend and the accessible label (`"BTC/USDT"`) */
  readonly symbol = input<string | undefined>(undefined);
  /** Duration of a bar; inferred from the bar times by default */
  readonly timeframe = input<TradingTimeframe | undefined>(undefined);
  /** How the bars are drawn (default `candles`) */
  readonly chartStyle = input<TradingChartStyle | undefined>(undefined);
  /** Indicators, over the price or in panes below it, in this order */
  readonly indicators = input<readonly TradingIndicator[] | undefined>(
    undefined,
  );
  /** Locale of the texts, numbers and dates (`"zh-CN"`); the page language by default */
  readonly locale = input<string | undefined>(undefined);
  /** Other engine options (`TradingChartOptions`: markers, priceLines, drawings, colorConvention, labels...) */
  readonly options = input<Partial<TradingChartOptions> | undefined>(undefined);

  /** The crosshair moved (`null` when it left the chart) */
  readonly crosshairMove = output<TradingCrosshairEvent | null>();
  /** A pane was clicked */
  readonly paneClick = output<TradingClickEvent>();
  /** The visible bars changed */
  readonly visibleRangeChange = output<TradingVisibleRange>();
  /** A draggable price line was dropped at a new price */
  readonly orderMove = output<TradingOrderMoveEvent>();
  /** The user added, moved or deleted drawings (pass them back in `options.drawings`) */
  readonly drawingsChange = output<readonly TradingDrawing[]>();
  /** The selected drawing changed */
  readonly drawingSelect = output<string | null>();
  /** The drawing tool changed (back to `cursor` after a drawing) */
  readonly drawingToolChange = output<TradingDrawingTool>();
  /** An indicator was shown or hidden from its legend */
  readonly indicatorToggle = output<TradingIndicatorToggleEvent>();
  /** The oldest bar came into view: load older bars (`prependBars`) */
  readonly historyRequest = output<TradingHistoryRequestEvent>();
  /** The backend in use (again after a fallback) */
  readonly rendererChange = output<ChartRendererKind>();

  protected override defaultHeight(): number {
    return 480;
  }

  protected createEngine(
    container: HTMLElement,
    options: TradingChartOptions,
  ): TradingChartInstance {
    return createTradingChart(container, options);
  }

  protected engineOptions(): TradingChartOptions {
    const options = this.options();
    return {
      ...options,
      bars: this.bars() ?? options?.bars,
      symbol: this.symbol() ?? options?.symbol,
      timeframe: this.timeframe() ?? options?.timeframe,
      chartStyle: this.chartStyle() ?? options?.chartStyle,
      indicators: this.indicators() ?? options?.indicators,
      locale: this.locale() ?? options?.locale,
    };
  }

  protected override bindEngine(chart: TradingChartInstance) {
    return [
      chart.on("crosshairMove", (e) => this.crosshairMove.emit(e)),
      chart.on("click", (e) => this.paneClick.emit(e)),
      chart.on("visibleRangeChange", (e) => this.visibleRangeChange.emit(e)),
      chart.on("orderMove", (e) => this.orderMove.emit(e)),
      chart.on("drawingsChange", (e) => this.drawingsChange.emit(e)),
      chart.on("drawingSelect", (e) => this.drawingSelect.emit(e)),
      chart.on("drawingToolChange", (e) => this.drawingToolChange.emit(e)),
      chart.on("indicatorToggle", (e) => this.indicatorToggle.emit(e)),
      chart.on("historyRequest", (e) => this.historyRequest.emit(e)),
      chart.on("renderer", (e) => this.rendererChange.emit(e)),
    ];
  }

  /** Streams a bar: the time of the last bar replaces it, a later time appends it (cheap: call it on every tick) */
  update(bar: TradingBar): void {
    this.instance()?.update(bar);
  }

  /** Appends bars newer than the last one */
  appendBars(bars: TradingBarsInput): void {
    this.instance()?.appendBars(bars);
  }

  /** Inserts older bars before the first one, keeping the view */
  prependBars(bars: TradingBarsInput): void {
    this.instance()?.prependBars(bars);
  }

  /** Replaces the bars */
  setBars(bars: TradingBarsInput): void {
    this.instance()?.setBars(bars);
  }

  /** Number of bars */
  getBarCount(): number {
    return this.instance()?.getBarCount() ?? 0;
  }

  /** Bar at an index, `null` outside the data */
  getBar(index: number): TradingBar | null {
    return this.instance()?.getBar(index) ?? null;
  }

  /** Scrolls to the latest bar */
  scrollToRealtime(animate?: boolean): void {
    this.instance()?.scrollToRealtime(animate);
  }

  /** Shows every bar */
  fitContent(): void {
    this.instance()?.fitContent();
  }

  /** Visible bars, `null` before the first render */
  getVisibleRange(): TradingVisibleRange | null {
    return this.instance()?.getVisibleRange() ?? null;
  }

  /** Shows the bars between two logical indices */
  setVisibleRange(range: { from: number; to: number }): void {
    this.instance()?.setVisibleRange(range);
  }

  /** Fits every price scale to the visible bars again */
  resetPriceScales(): void {
    this.instance()?.resetPriceScales();
  }

  /** Activates a drawing tool */
  setDrawingTool(tool: TradingDrawingTool): void {
    this.instance()?.setDrawingTool(tool);
  }

  /** Current drawings */
  getDrawings(): readonly TradingDrawing[] {
    return this.instance()?.getDrawings() ?? [];
  }

  /** Deletes a drawing */
  removeDrawing(id: string): void {
    this.instance()?.removeDrawing(id);
  }

  /** Selects a drawing (`null` clears the selection) */
  selectDrawing(id: string | null): void {
    this.instance()?.selectDrawing(id);
  }

  /** Shows or hides an indicator */
  setIndicatorVisible(id: string, visible: boolean): void {
    this.instance()?.setIndicatorVisible(id, visible);
  }

  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance()?.getRenderer() ?? null;
  }
}

/** Engine of an order book widget: options plus a book streamed apart */
interface BookEngine<O> extends EngineInstance<O> {
  setBook(snapshot: OrderBookSnapshot): void;
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
}

/**
 * Base of the order book widgets: `options` go through `setOptions`, the
 * `book` input through `setBook` when the object changes (stream updates
 * with `applyDeltas`)
 */
@Directive()
export abstract class MnBookWidgetBase<
  O extends object,
  I extends BookEngine<O>,
> extends MnChartEngine<O, I> {
  /** Book to draw `{ bids, asks, time }`, applied when the object changes (stream updates through `applyDeltas`) */
  readonly book = input<OrderBookSnapshot | undefined>(undefined);
  /** Locale of the numbers and texts (`"zh-CN"`); the page language by default */
  readonly locale = input<string | undefined>(undefined);
  /** Engine options (colors, precision, labels, ...) */
  readonly options = input<O | undefined>(undefined);

  constructor() {
    super();
    effect(() => {
      const engine = this.instance();
      const book = this.book();
      if (engine && book) untracked(() => engine.setBook(book));
    });
  }

  protected engineOptions(): O {
    const locale = this.locale();
    return { ...this.options(), ...(locale ? { locale } : {}) } as O;
  }

  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void {
    this.instance()?.setBook(snapshot);
  }

  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void {
    this.instance()?.applyDeltas(deltas);
  }
}

/**
 * Feeds a trades input to an engine: when the array grew (same first and
 * last known items), only the appended trades; any other change replaces
 * them
 */
const tradeFeed = (
  instance: () => object | null,
  trades: () => ChartTrades | undefined,
  add: (trades: ChartTrades) => void,
  replace: (trades: ChartTrades) => void,
) => {
  let previous: ChartTrades | undefined;
  let target: object | null = null;
  effect(() => {
    const engine = instance();
    const list = trades();
    untracked(() => {
      if (!engine) return;
      const before = target === engine ? previous : undefined;
      target = engine;
      previous = list;
      if (!list || list === before) return;
      const n = before?.length ?? 0;
      if (
        before &&
        n > 0 &&
        list.length >= n &&
        list[0] === before[0] &&
        list[n - 1] === before[n - 1]
      ) {
        if (list.length > n) add(list.slice(n));
        return;
      }
      replace(list);
    });
  });
};

/**
 * Cumulative depth of an order book: stepped bid / ask areas around the mid
 * price, mirrored hover readout, zoom around the mid, eased updates (engine
 * `createDepthChart`)
 */
@Component({
  selector: "mn-depth-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnDepthChart extends MnBookWidgetBase<
  DepthChartOptions,
  DepthChartInstance
> {
  /** Pointer over the curves (`null` when it leaves) */
  readonly hover = output<DepthChartHoverEvent | null>();
  /** Click / tap on the curves */
  readonly depthClick = output<DepthChartHoverEvent>();
  /** The visible range changed by zooming (fraction of the mid) */
  readonly rangeChange = output<number>();

  protected createEngine(
    container: HTMLElement,
    options: DepthChartOptions,
  ): DepthChartInstance {
    return createDepthChart(container, options);
  }

  protected override bindEngine(chart: DepthChartInstance) {
    return [
      chart.on("hover", (e) => this.hover.emit(e)),
      chart.on("click", (e) => this.depthClick.emit(e)),
      chart.on("range", (r) => this.rangeChange.emit(r)),
    ];
  }

  /** Sets the visible range (fraction of the mid); `null` fits the book */
  setRange(range: number | null): void {
    this.instance()?.setRange(range);
  }
}

/**
 * Order book ladder: asks above the spread row, bids below, with depth
 * bars, price grouping, change flashes and large order highlight (engine
 * `createOrderBook`)
 */
@Component({
  selector: "mn-order-book",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnOrderBook extends MnBookWidgetBase<
  OrderBookOptions,
  OrderBookInstance
> {
  /** Price of the spread row, colored by its last move; the mid price when omitted */
  readonly lastPrice = input<number | null | undefined>(undefined);
  /** Hovered row (`null` when the pointer leaves) */
  readonly hover = output<OrderBookLevelEvent | null>();
  /** Click / tap / Enter on a row (e.g. to fill a price in an order form) */
  readonly levelClick = output<OrderBookLevelEvent>();

  constructor() {
    super();
    effect(() => {
      const engine = this.instance();
      const price = this.lastPrice();
      if (engine && price !== undefined)
        untracked(() => engine.setLastPrice(price));
    });
  }

  protected override defaultHeight(): number {
    return 420;
  }

  protected createEngine(
    container: HTMLElement,
    options: OrderBookOptions,
  ): OrderBookInstance {
    return createOrderBook(container, options);
  }

  protected override bindEngine(book: OrderBookInstance) {
    return [
      book.on("hover", (e) => this.hover.emit(e)),
      book.on("levelClick", (e) => this.levelClick.emit(e)),
    ];
  }

  /** Price of the spread row (the mid price when `null`) */
  setLastPrice(price: number | null): void {
    this.instance()?.setLastPrice(price);
  }
}

/**
 * Liquidity heatmap: resting size over time and price drawn by the GPU,
 * best bid / ask lines and trades as bubbles sized by volume (engine
 * `createOrderBookHeatmap`)
 */
@Component({
  selector: "mn-order-book-heatmap",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnOrderBookHeatmap extends MnBookWidgetBase<
  OrderBookHeatmapOptions,
  OrderBookHeatmapInstance
> {
  /** Trades; when the array grows, only the appended ones are added */
  readonly trades = input<ChartTrades | undefined>(undefined);
  /** Hovered cell (`null` when the pointer leaves) */
  readonly hover = output<OrderBookHeatmapHoverEvent | null>();
  /** Backend in use (also after a GPU loss) */
  readonly rendererChange = output<ChartRendererKind>();
  /** `true` while the view follows the market, `false` after a zoom / pan */
  readonly followChange = output<boolean>();

  constructor() {
    super();
    const add = (list: ChartTrades) => this.instance()?.addTrades(list);
    tradeFeed(this.instance, this.trades, add, add);
  }

  protected override defaultHeight(): number {
    return 360;
  }

  protected createEngine(
    container: HTMLElement,
    options: OrderBookHeatmapOptions,
  ): OrderBookHeatmapInstance {
    return createOrderBookHeatmap(container, options);
  }

  protected override bindEngine(heatmap: OrderBookHeatmapInstance) {
    return [
      heatmap.on("hover", (e) => this.hover.emit(e)),
      heatmap.on("renderer", (r) => this.rendererChange.emit(r)),
      heatmap.on("follow", (f) => this.followChange.emit(f)),
    ];
  }

  /** Adds trades (bubbles) */
  addTrades(trades: ChartTrades[number] | ChartTrades): void {
    this.instance()?.addTrades(trades);
  }

  /** Follows the market again */
  resetView(): void {
    this.instance()?.resetView();
  }
}

/**
 * Time and sales tape: newest trades on top, virtualized (hundreds of
 * thousands of rows), large trades highlighted, paused while hovered
 * (engine `createTimeAndSales`)
 */
@Component({
  selector: "mn-time-and-sales",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnTimeAndSales extends MnChartEngine<
  TimeAndSalesOptions,
  TimeAndSalesInstance
> {
  /** Trades, oldest first; when the array grows, only the appended ones are added (other changes replace the tape) */
  readonly trades = input<ChartTrades | undefined>(undefined);
  /** Locale of the numbers, times and texts (`"zh-CN"`); the page language by default */
  readonly locale = input<string | undefined>(undefined);
  /** Engine options (columns, minSize, largeTradeThreshold, aggregate, labels...) */
  readonly options = input<TimeAndSalesOptions | undefined>(undefined);
  /** Hovered row (`null` when the pointer leaves) */
  readonly hover = output<TimeAndSalesRowEvent | null>();
  /** Click / tap / Enter on a row */
  readonly tradeClick = output<TimeAndSalesRowEvent>();
  /** The tape paused (pointer over it, scrolled down) or resumed */
  readonly pause = output<boolean>();

  constructor() {
    super();
    tradeFeed(
      this.instance,
      this.trades,
      (list) => this.instance()?.addTrades(list),
      (list) => this.instance()?.setTrades(list),
    );
  }

  protected override defaultHeight(): number {
    return 360;
  }

  protected createEngine(
    container: HTMLElement,
    options: TimeAndSalesOptions,
  ): TimeAndSalesInstance {
    return createTimeAndSales(container, options);
  }

  protected engineOptions(): TimeAndSalesOptions {
    const locale = this.locale();
    return { ...this.options(), ...(locale ? { locale } : {}) };
  }

  protected override bindEngine(tape: TimeAndSalesInstance) {
    return [
      tape.on("hover", (e) => this.hover.emit(e)),
      tape.on("tradeClick", (e) => this.tradeClick.emit(e)),
      tape.on("pause", (p) => this.pause.emit(p)),
    ];
  }

  /** Appends trades (oldest first) */
  addTrades(trades: ChartTrades[number] | ChartTrades): void {
    this.instance()?.addTrades(trades);
  }

  /** Replaces every trade */
  setTrades(trades: ChartTrades): void {
    this.instance()?.setTrades(trades);
  }

  /** Removes every trade */
  clear(): void {
    this.instance()?.clear();
  }

  /** Scrolls back to the newest trade and resumes */
  scrollToLatest(): void {
    this.instance()?.scrollToLatest();
  }
}
