// minerva-design/charts/core: the framework-free chart engine. Importing it
// has no side effects and touches no browser API; createChart needs a DOM,
// createCanvasChart only a 2D canvas (mini-programs included) and
// createChartController nothing at all.

export { createChart } from "./engine/chart";
export {
  createCanvasChart,
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
  barSeries,
  DEFAULT_QUADRANT_COLORS,
  lineSeries,
  quadrantCenter,
  quadrantChartOptions,
  quadrantOf,
  scatterSeries,
  type QuadrantAxisLabels,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegion,
  type QuadrantRegions,
} from "./engine/presets";
export type { ChartThemeInput } from "./engine/theme";
export type {
  ChartAnnotation,
  ChartAxisOptions,
  ChartAxisType,
  ChartColumnData,
  ChartDragEvent,
  ChartEventMap,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInstance,
  ChartInteractionOptions,
  ChartLabelPosition,
  ChartLegendOptions,
  ChartLineAnnotation,
  ChartOptions,
  ChartPadding,
  ChartPlotClickEvent,
  ChartPointDatum,
  ChartRect,
  ChartRectAnnotation,
  ChartRendererKind,
  ChartRendererPreference,
  ChartSeries,
  ChartSeriesData,
  ChartSeriesType,
  ChartTextAnnotation,
  ChartTooltipOptions,
  ChartView,
  ChartXValue,
} from "./engine/types";
