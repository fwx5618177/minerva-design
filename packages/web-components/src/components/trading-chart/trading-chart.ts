import { property } from "lit/decorators.js";
import {
  createTradingChart,
  type ChartRendererKind,
  type TradingBar,
  type TradingBarsInput,
  type TradingChartInstance,
  type TradingChartOptions,
  type TradingChartStyle,
  type TradingDrawing,
  type TradingDrawingTool,
  type TradingIndicator,
  type TradingTimeframe,
  type TradingVisibleRange,
} from "minerva-design/charts/core";
import { MinervaEngineElement } from "../chart/engine-element";

const timeframeConverter = {
  fromAttribute: (value: string | null): TradingTimeframe | undefined =>
    value === null
      ? undefined
      : /^\d+$/.test(value)
        ? Number(value)
        : (value as TradingTimeframe),
};

/**
 * Professional trading chart of `minerva-design/charts/core` (the
 * `<TradingChart>` of React, engine `createTradingChart`): candles (hollow,
 * Heikin-Ashi, bars, line, area, baseline) over a gap-free time axis,
 * indicator panes, drawing tools, order lines and real-time streaming,
 * drawn on the GPU. Stream ticks with `updateBar(bar)`; replace `bars` for a
 * new data set.
 *
 * Published as the optional entry
 * `minerva-design/web-components/trading-chart` (it loads the trading
 * engine only).
 *
 * @summary GPU trading chart: candles, indicators, drawings, streaming.
 * @tag minerva-trading-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 * @fires minerva-crosshair-move - The crosshair moved; detail: { time, index, bar, price, pane, x, y }, `null` when it left the chart
 * @fires minerva-click - A pane was clicked; detail: { time, index, price, pane }
 * @fires minerva-visible-range-change - The visible bars changed; detail: { from, to, fromTime, toTime }
 * @fires minerva-order-move - A draggable price line was dropped; detail: { id, price, previousPrice, line }
 * @fires minerva-drawings-change - The user added, moved or deleted drawings; detail: { drawings }
 * @fires minerva-drawing-select - The selected drawing changed; detail: { id }
 * @fires minerva-drawing-tool-change - The drawing tool changed (back to `cursor` after a drawing); detail: { tool }
 * @fires minerva-indicator-toggle - An indicator was shown or hidden from its legend; detail: { id, visible }
 * @fires minerva-history-request - The oldest bar came into view (load older bars with `prependBars`); detail: { firstTime, count }
 * @fires minerva-renderer-change - The backend is ready (or fell back after a GPU loss); detail: { renderer }
 */
export class MinervaTradingChart extends MinervaEngineElement<
  TradingChartOptions,
  TradingChartInstance
> {
  static override tagName = "minerva-trading-chart";

  /** Height of the chart: pixels or any CSS length */
  @property()
  override height?: string | number = 480;

  /** Bars `{ time, open, high, low, close, volume }` (or columns of typed arrays), oldest first; property only */
  @property({ attribute: false })
  bars?: TradingBarsInput;

  /** Symbol shown in the legend (e.g. "BTC/USDT") */
  @property()
  symbol?: string;

  /** Duration of a bar: milliseconds, or a count and a unit (`1m`, `15m`, `4H`, `1D`, `1W`) */
  @property({ converter: timeframeConverter })
  timeframe?: TradingTimeframe;

  /** How the bars of the price pane are drawn */
  @property({ attribute: "chart-style" })
  chartStyle: TradingChartStyle = "candles";

  /** Indicators `{ type, period, ... }` (overlays on the price pane, or panes of their own); property only */
  @property({ attribute: false })
  indicators?: readonly TradingIndicator[];

  /** Other engine options (`TradingChartOptions`: markers, priceLines, drawings, colorConvention, locale, labels...); property only */
  @property({ attribute: false })
  options?: Partial<TradingChartOptions>;

  protected createEngine(
    container: HTMLElement,
    options: TradingChartOptions,
  ): TradingChartInstance {
    return createTradingChart(container, options);
  }

  protected engineOptions(): TradingChartOptions {
    return {
      ...this.options,
      bars: this.bars ?? this.options?.bars,
      symbol: this.symbol ?? this.options?.symbol,
      timeframe: this.timeframe ?? this.options?.timeframe,
      chartStyle: this.chartStyle,
      indicators: this.indicators ?? this.options?.indicators,
    };
  }

  protected override bindEngine(
    chart: TradingChartInstance,
  ): Array<() => void> {
    return [
      chart.on("crosshairMove", (e) => this.emit("minerva-crosshair-move", e)),
      chart.on("click", (e) => this.emit("minerva-click", e)),
      chart.on("visibleRangeChange", (e) =>
        this.emit("minerva-visible-range-change", e),
      ),
      chart.on("orderMove", (e) => this.emit("minerva-order-move", e)),
      chart.on("drawingsChange", (drawings) =>
        this.emit("minerva-drawings-change", { drawings }),
      ),
      chart.on("drawingSelect", (id) =>
        this.emit("minerva-drawing-select", { id }),
      ),
      chart.on("drawingToolChange", (tool) =>
        this.emit("minerva-drawing-tool-change", { tool }),
      ),
      chart.on("indicatorToggle", (e) =>
        this.emit("minerva-indicator-toggle", e),
      ),
      chart.on("historyRequest", (e) =>
        this.emit("minerva-history-request", e),
      ),
      chart.on("renderer", (renderer) =>
        this.emit("minerva-renderer-change", { renderer }),
      ),
    ];
  }

  /**
   * Streams a bar: the time of the last bar replaces it, a later time
   * appends it (cheap: call it on every tick). The `update(bar)` of the
   * engine instance and of the React handle (`update` is a Lit lifecycle
   * method of the element)
   */
  updateBar(bar: TradingBar): void {
    this.instance?.update(bar);
  }

  /** Appends bars newer than the last one */
  appendBars(bars: TradingBarsInput): void {
    this.instance?.appendBars(bars);
  }

  /** Inserts older bars before the first one, keeping the view */
  prependBars(bars: TradingBarsInput): void {
    this.instance?.prependBars(bars);
  }

  /** Replaces the bars */
  setBars(bars: TradingBarsInput): void {
    this.instance?.setBars(bars);
  }

  /** Number of bars */
  getBarCount(): number {
    return this.instance?.getBarCount() ?? 0;
  }

  /** Bar at an index, `null` outside the data */
  getBar(index: number): TradingBar | null {
    return this.instance?.getBar(index) ?? null;
  }

  /** Scrolls to the latest bar */
  scrollToRealtime(animate?: boolean): void {
    this.instance?.scrollToRealtime(animate);
  }

  /** Shows every bar */
  fitContent(): void {
    this.instance?.fitContent();
  }

  /** Visible bars, `null` before the engine is created */
  getVisibleRange(): TradingVisibleRange | null {
    return this.instance?.getVisibleRange() ?? null;
  }

  /** Shows the bars between two logical indices */
  setVisibleRange(range: { from: number; to: number }): void {
    this.instance?.setVisibleRange(range);
  }

  /** Fits every price scale to the visible bars again */
  resetPriceScales(): void {
    this.instance?.resetPriceScales();
  }

  /** Activates a drawing tool (`cursor`, `trendLine`, `horizontalLine`, `fibRetracement`...) */
  setDrawingTool(tool: TradingDrawingTool): void {
    this.instance?.setDrawingTool(tool);
  }

  /** Current drawings */
  getDrawings(): readonly TradingDrawing[] {
    return this.instance?.getDrawings() ?? [];
  }

  /** Deletes a drawing */
  removeDrawing(id: string): void {
    this.instance?.removeDrawing(id);
  }

  /** Selects a drawing (`null` clears the selection) */
  selectDrawing(id: string | null): void {
    this.instance?.selectDrawing(id);
  }

  /** Shows or hides an indicator */
  setIndicatorVisible(id: string, visible: boolean): void {
    this.instance?.setIndicatorVisible(id, visible);
  }

  /** Backend in use (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance?.getRenderer() ?? null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-trading-chart": MinervaTradingChart;
  }
}
