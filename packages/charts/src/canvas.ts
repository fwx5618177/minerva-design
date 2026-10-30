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
export { formatCompact, formatValue } from "./engine/format";
export { chartAriaLabel } from "./engine/labels";
export { drawPrimitives } from "./engine/canvas";
export {
  lineOf as annotationLine,
  rectOf as annotationRect,
  textBox as annotationTextBox,
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
  quadrantOf,
  scatterSeries,
  sparklineOptions,
  withSeriesType,
  type LineSeriesOptions,
  type HeatmapCell,
  type HeatmapConfig,
  type QuadrantAxisLabels,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegion,
  type QuadrantRegions,
  type SparklineConfig,
} from "./engine/presets";
export { toCss } from "./engine/color";
export type { ChartThemeInput } from "./engine/theme";
export type * from "./engine/types";
export {
  createCanvasShapeChart,
  type CanvasShapeChartConfig,
  type CanvasShapeChartInstance,
} from "./engine/shapes/canvas";
export { drawShapeScene } from "./engine/shapes/draw";
export { calendarStrips } from "./engine/shapes/calendar";
export type * from "./engine/shapes/types";
