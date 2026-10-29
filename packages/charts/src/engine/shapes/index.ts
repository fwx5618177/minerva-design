// Shape charts: pie / donut / rose, radar, gauge, funnel and treemap.

export { createShapeChart } from "./chart";
export {
  createCanvasShapeChart,
  type CanvasShapeChartConfig,
  type CanvasShapeChartInstance,
} from "./canvas";
export { drawShapeLegend, drawShapeScene, drawShapeTooltip } from "./draw";
export {
  hitTestShapes,
  hoverAnchor,
  pointInPolygon,
  pointInSector,
  stepHover,
} from "./hit";
export {
  describeChart,
  describeScene,
  hoverEvent,
  layoutShapeLegend,
  layoutShapeScene,
  layoutShapeTooltip,
  placeShapeTooltip,
  shapeLegend,
  shapeValues,
  tooltipContent,
  type ShapeLayoutInput,
  type ShapeLegendBox,
  type ShapeTooltipBox,
  type ShapeTooltipContent,
} from "./layout";
export { gaugeBandIndex } from "./gauge";
export { squarify, treemapLeaves } from "./treemap";
export type {
  MeasureText,
  ShapeHover,
  ShapeItem,
  ShapeLegendEntry,
  ShapeNode,
  ShapeRect,
  ShapeScene,
  ShapeTooltipRow,
} from "./scene";
export type {
  FunnelChartOptions,
  GaugeBand,
  GaugeChartOptions,
  PieChartOptions,
  RadarChartOptions,
  RadarIndicator,
  RadarSeries,
  ShapeChartCommonOptions,
  ShapeChartEventMap,
  ShapeChartInstance,
  ShapeChartOptions,
  ShapeChartType,
  ShapeDatum,
  ShapeHoverEvent,
  ShapeLegendOptions,
  ShapeToggleEvent,
  ShapeTooltipOptions,
  TreemapChartOptions,
  TreemapNode,
} from "./types";
