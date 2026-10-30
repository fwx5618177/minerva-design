import type {
  Chart3DCameraState,
  Chart3DInstance,
  ChartInstance,
  ChartRendererKind,
  ChartView,
  DepthChartInstance,
  GraphChartInstance,
  GraphData,
  GraphPoint,
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
  TradingDrawingPatch,
  TradingDrawingTool,
  TradingReplayState,
  TradingScaleMode,
  TradingUndoState,
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
  ChordChartOptions,
  ChordGroup,
  ChordLink,
  DepthChartHoverEvent,
  DepthChartInstance,
  DepthChartOptions,
  FunnelChartOptions,
  GanttTask,
  GaugeBand,
  GaugeChartOptions,
  GraphChartInstance,
  GraphChartLabels,
  GraphChartOptions,
  GraphCircularOptions,
  GraphDagOptions,
  GraphData,
  GraphDirection,
  GraphEdge,
  GraphEdgeStyle,
  GraphForceOptions,
  GraphGroup,
  GraphGroupToggleEvent,
  GraphHoverEvent,
  GraphInteractionOptions,
  GraphLayoutEndEvent,
  GraphLayoutType,
  GraphLegendOptions,
  GraphNode,
  GraphNodeShape,
  GraphPoint,
  GraphSelectEvent,
  GraphToggleEvent,
  GraphTooltipOptions,
  GraphTreeOptions,
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
  TradingOrderCancelEvent,
  TradingOrderCreateEvent,
  TradingReplayState,
  TradingUndoState,
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
  /** Times at the edges of the plot, `null` before mount */
  getVisibleTimeRange(): { from: number; to: number } | null;
  /** Shows the bars between two times */
  setVisibleTimeRange(range: { from: number; to: number }): void;
  /** Shows the crosshair at a time (and a price); `null` hides it */
  setCrosshair(time: number | null, price?: number): void;
  /** Sets the price scale of the price pane */
  setScaleMode(mode: TradingScaleMode): void;
  /** Fits every price scale to the visible bars again */
  resetPriceScales(): void;
  /** Activates a drawing tool */
  setDrawingTool(tool: TradingDrawingTool): void;
  /** Current drawings */
  getDrawings(): readonly TradingDrawing[];
  /** Deletes a drawing */
  removeDrawing(id: string): void;
  /** Changes the style or the content of a drawing (undoable) */
  updateDrawing(id: string, patch: TradingDrawingPatch): void;
  /** Selects a drawing (`null` clears the selection) */
  selectDrawing(id: string | null): void;
  /** Undoes the last change of the drawings */
  undo(): void;
  /** Redoes the last undone change of the drawings */
  redo(): void;
  /** Whether the drawings can be undone or redone */
  getUndoState(): TradingUndoState;
  /** Starts a bar replay after `time` (the user picks the bar without it) */
  startReplay(time?: number): void;
  /** Shows the next bars of the replay */
  replayStep(count?: number): void;
  /** Plays the replay at `speed` bars per second */
  replayPlay(speed?: number): void;
  /** Pauses the replay */
  replayPause(): void;
  /** Ends the replay and shows every bar */
  stopReplay(): void;
  /** State of the bar replay, `null` before mount */
  getReplayState(): TradingReplayState | null;
  /** Image of the chart as a data URL (`""` before mount) */
  toDataURL(type?: string, quality?: number): string;
  /** Image of the chart as a blob */
  toBlob(type?: string, quality?: number): Promise<Blob | null>;
  /** Shows the chart full screen */
  requestFullscreen(): Promise<void>;
  /** Leaves full screen */
  exitFullscreen(): Promise<void>;
  /** Shows or hides an indicator */
  setIndicatorVisible(id: string, visible: boolean): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): TradingChartInstance | null;
}

/** Template ref handle of `GraphChart`, `DependencyGraph` and `TreeChart` */
export interface GraphChartHandle {
  /** Fits the visible nodes in the view */
  fit(animate?: boolean): void;
  /** Centers a node (expanding its collapsed ancestors), optionally zooming */
  focusNode(id: string, options?: { zoom?: number; animate?: boolean }): void;
  /** Replaces the data until the props change again */
  setData(data: GraphData): void;
  /** Selects nodes (`null` clears the selection) */
  select(ids: readonly string[] | string | null): void;
  /** Ids of the selected nodes */
  getSelection(): string[];
  /** Expands a node (all nodes without an id) */
  expand(id?: string): void;
  /** Collapses a node (all nodes with children without an id) */
  collapse(id?: string): void;
  /** Collapses / expands a node */
  toggle(id: string): void;
  /** Current positions of the nodes in layout units */
  getPositions(): Record<string, GraphPoint>;
  /** Computes the layout again */
  relayout(): void;
  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null;
  /** The underlying engine instance (minerva-design/charts/core), `null` before mount */
  getInstance(): GraphChartInstance | null;
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
