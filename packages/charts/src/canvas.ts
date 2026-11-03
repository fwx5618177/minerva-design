// Private entry of the platform packages (Taro, uni-app, WeChat, React
// Native): the DOM-free part of the engine only, so their bundles never
// include the WebGPU / WebGL renderers nor the DOM chart.

export {
  createCanvasChart,
  drawScene,
  type CanvasChartConfig,
  type CanvasChartInstance,
  type ChartCanvas,
  type ChartTouch,
} from "./engine/canvas";
export {
  createChartController,
  scenePrimitives,
  type ChartAreaPrimitive,
  type ChartBarPrimitive,
  type ChartColorLegendLayout,
  type ChartController,
  type ChartControllerConfig,
  type ChartControllerEventMap,
  type ChartDotPrimitive,
  type ChartHoverLayout,
  type ChartLegendEntry,
  type ChartLegendLayout,
  type ChartLinePrimitive,
  type ChartPointerOptions,
  type ChartPrimitive,
  type ChartPrimitiveOptions,
  type ChartScene,
  type ChartTooltipLayout,
} from "./engine/controller";
export { formatCompact, formatDuration, formatValue } from "./engine/format";
export { chartAriaLabel, describeChart } from "./engine/labels";
export { drawPrimitives } from "./engine/canvas";
export {
  areaTitleLayout as annotationTitleLayout,
  lineOf as annotationLine,
  rectOf as annotationRect,
  textBox as annotationTextBox,
  type AreaText as ChartAreaText,
  type AreaTitle as ChartAreaTitle,
} from "./engine/overlay";
export { toData, toScreen } from "./engine/layout";
export {
  binValues,
  boxplotData,
  boxplotStats,
  bubbleSeries,
  ganttSeries,
  histogramSeries,
  quantiles,
  waterfallSeries,
  type BinOptions,
  type BoxplotGroup,
  type BoxplotStats,
  type BoxplotStatsOptions,
  type BubbleOptions,
  type GanttOptions,
  type GanttSeries,
  type GanttTask,
  type HistogramBinning,
  type HistogramBins,
  type HistogramSeriesOptions,
  type WaterfallOptions,
  type WaterfallStep,
  boxplotSeries,
  rangeAreaSeries,
  areaSeries,
  barSeries,
  candlestickSeries,
  DEFAULT_QUADRANT_COLORS,
  heatmapChartOptions,
  lineSeries,
  quadrantCenter,
  quadrantChartOptions,
  quadrantCountText,
  quadrantGroups,
  quadrantLabels,
  quadrantOf,
  scatterSeries,
  sparklineOptions,
  withSeriesType,
  type LineSeriesOptions,
  type HeatmapCell,
  type HeatmapConfig,
  type QuadrantAxisLabels,
  type QuadrantChartState,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantGroup,
  type QuadrantLabels,
  type QuadrantPoint,
  type QuadrantRegion,
  type QuadrantRegions,
  type SparklineConfig,
} from "./engine/presets";
export {
  QUADRANT_CORNERS,
  quadrantAccessibleGroups,
  quadrantHoverEvent,
  quadrantKeyTarget,
  quadrantMoveDrop,
  quadrantMovedText,
  quadrantMoveTargets,
  quadrantName,
  type QuadrantAccessibleConfig,
  type QuadrantAccessibleGroup,
  type QuadrantAccessibleMove,
  type QuadrantAccessiblePoint,
} from "./engine/quadrant-keyboard";
export {
  QUADRANT_TASK_ICONS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  placeQuadrantTaskPanel,
  quadrantTaskColor,
  quadrantTaskIconUri,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type QuadrantTaskBox,
  type QuadrantTaskDraft,
  type QuadrantTaskGeometry,
  type QuadrantTaskLabels,
  type QuadrantTaskPanelPlacement,
} from "./engine/quadrant-tasks";
export { toCss } from "./engine/color";
export { CANVAS_TOOLTIP_ALPHA, tooltipColors } from "./engine/tooltip";
export { liftedBarRect, type BarHoverMark } from "./engine/scene";
export type { ChartThemeInput } from "./engine/theme";
export type * from "./engine/types";
export {
  createCanvasShapeChart,
  type CanvasShapeChartConfig,
  type CanvasShapeChartInstance,
} from "./engine/shapes/canvas";
export { drawShapeScene } from "./engine/shapes/draw";
export { calendarStrips } from "./engine/shapes/calendar";
export { describeChart as describeShapeChart } from "./engine/shapes/layout";
export type * from "./engine/shapes/types";
