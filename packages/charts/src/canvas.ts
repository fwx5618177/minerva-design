// Private entry of the platform packages (Taro, uni-app, WeChat, React
// Native): the DOM-free part of the engine only, so their bundles never
// include the WebGPU / WebGL2 renderers nor the DOM chart.

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
export { formatCompact } from "./engine/format";
export {
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
export type * from "./engine/shapes/types";
