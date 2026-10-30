import type {
  Chart3DCameraState,
  Chart3DInstance,
  ChartInstance,
  ChartRendererKind,
  ChartView,
  DepthChartInstance,
  OrderBookDelta,
  OrderBookHeatmapInstance,
  OrderBookInstance,
  OrderBookSnapshot,
  QuadrantCorner,
  ShapeChartInstance,
  TimeAndSalesInstance,
  TradingBar,
  TradingBarsInput,
  TradingChartInstance,
  TradingDrawing,
  TradingDrawingTool,
  TradingVisibleRange,
} from "minerva-design/charts/core";

export type {
  Bar3DSeries,
  BoxplotGroup,
  BulletDatum,
  CalendarDatum,
  Chart3DCameraState,
  Chart3DHoverEvent,
  Chart3DInstance,
  Chart3DOptions,
  ChartAnnotation,
  ChartAxisOptions,
  ChartCurve,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInstance,
  ChartInteractionOptions,
  ChartLegendOptions,
  ChartOptions,
  ChartPadding,
  ChartPlotClickEvent,
  ChartRendererKind,
  ChartRendererPreference,
  ChartSeries,
  ChartTooltipOptions,
  ChartView,
  DepthChartHoverEvent,
  DepthChartInstance,
  DepthChartOptions,
  FunnelChartOptions,
  GanttTask,
  GaugeBand,
  GaugeChartOptions,
  HeatmapCell,
  Line3DSeries,
  OrderBookDelta,
  OrderBookHeatmapHoverEvent,
  OrderBookHeatmapInstance,
  OrderBookHeatmapOptions,
  OrderBookInstance,
  OrderBookLevelEvent,
  OrderBookOptions,
  OrderBookSnapshot,
  PieChartOptions,
  QuadrantAxisLabels,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegion,
  QuadrantRegions,
  RadarChartOptions,
  RadarIndicator,
  RadarSeries,
  RadialBarDatum,
  SankeyLink,
  SankeyNode,
  Scatter3DSeries,
  ShapeChartInstance,
  ShapeChartOptions,
  ShapeDatum,
  ShapeDrillEvent,
  ShapeHoverEvent,
  ShapeToggleEvent,
  Surface3DSeries,
  TimeAndSalesInstance,
  TimeAndSalesOptions,
  TimeAndSalesRowEvent,
  TradingBar,
  TradingBarsInput,
  TradingChartInstance,
  TradingChartOptions,
  TradingClickEvent,
  TradingCrosshairEvent,
  TradingDrawing,
  TradingDrawingTool,
  TradingIndicator,
  TradingVisibleRange,
  TreemapChartOptions,
  TreemapNode,
  WaterfallStep,
} from "minerva-design/charts/core";

/** Template ref handle of the cartesian chart components */
export interface ChartHandle {
  /** Shows the whole data range */
  resetZoom(): void;
  /** Visible range, `null` before mount */
  getView(): ChartView | null;
  /** Sets the visible range */
  setView(view: Partial<ChartView>): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): ChartInstance | null;
}

/** Template ref handle of the shape chart components */
export interface ShapeChartHandle {
  /** Hides / shows a slice, stage, radar series or top-level treemap node by index */
  toggle(index: number): void;
  /** Sunburst: zooms into the node at `path` (names from the root, `[]` = the root) */
  drill(path: readonly string[]): void;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): ShapeChartInstance | null;
}

/** Template ref handle of `TradingChart` */
export interface TradingChartHandle {
  /** Streams a bar: the time of the last bar replaces it, a later time appends it (cheap: call it on every tick) */
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
  /** Visible bars, `null` before mount */
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
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): TradingChartInstance | null;
}

/** Trades of `TimeAndSales` and `OrderBookHeatmap`, oldest first */
export type ChartTrades = Parameters<TimeAndSalesInstance["setTrades"]>[0];

/** Template ref handle of `DepthChart` */
export interface DepthChartHandle {
  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Sets the visible range (fraction of the mid); `null` fits the book */
  setRange(range: number | null): void;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): DepthChartInstance | null;
}

/** Template ref handle of `OrderBook` */
export interface OrderBookHandle {
  /** Replaces the book */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (size 0 removes a level); drawn once at the next frame */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Price of the spread row (the mid price when `null`) */
  setLastPrice(price: number | null): void;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): OrderBookInstance | null;
}

/** Template ref handle of `OrderBookHeatmap` */
export interface OrderBookHeatmapHandle {
  /** Replaces the book (closes the columns up to its time) */
  setBook(snapshot: OrderBookSnapshot): void;
  /** Applies updates (closes the columns up to their time) */
  applyDeltas(deltas: OrderBookDelta | readonly OrderBookDelta[]): void;
  /** Adds trades (bubbles) */
  addTrades(trades: ChartTrades[number] | ChartTrades): void;
  /** Follows the market again */
  resetView(): void;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): OrderBookHeatmapInstance | null;
}

/** Template ref handle of `TimeAndSales` */
export interface TimeAndSalesHandle {
  /** Appends trades (oldest first) */
  addTrades(trades: ChartTrades[number] | ChartTrades): void;
  /** Replaces every trade */
  setTrades(trades: ChartTrades): void;
  /** Removes every trade */
  clear(): void;
  /** Scrolls back to the newest trade and resumes */
  scrollToLatest(): void;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): TimeAndSalesInstance | null;
}

/** Template ref handle of the 3D chart components */
export interface Chart3DHandle {
  /** Restores the camera of the `camera` prop */
  resetCamera(): void;
  /** Current camera, `null` before mount */
  getCamera(): Chart3DCameraState | null;
  /** Moves the camera */
  setCamera(camera: Partial<Chart3DCameraState>): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): Chart3DInstance | null;
}

/** Where a dragged QuadrantChart point was dropped */
export interface QuadrantDropTarget {
  /** Data coordinates of the drop */
  x: number;
  y: number;
  /** Quadrant of the drop, as seen on screen */
  quadrant: QuadrantCorner;
}
