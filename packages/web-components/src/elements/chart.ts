// Registers the chart elements (<minerva-chart>, <minerva-line-chart>...,
// <minerva-shape-chart>, <minerva-pie-chart>, <minerva-sankey-chart>...).
// Optional entry: not part of the all-in-one entry nor of the CDN bundle,
// since it loads the chart engine (minerva-design/charts/core, shared with
// the other renderers). The trading, order book, 3D and graph elements have
// entries of their own (trading-chart, order-book, chart-3d, graph): their
// engines are only loaded by the pages that use them.
import { MinervaChart } from "../components/chart/chart";
import {
  MinervaAreaChart,
  MinervaBarChart,
  MinervaCandlestickChart,
  MinervaHeatmapChart,
  MinervaLineChart,
  MinervaQuadrantChart,
  MinervaScatterChart,
  MinervaSparkline,
} from "../components/chart/charts";
import {
  MinervaDonutChart,
  MinervaFunnelChart,
  MinervaGaugeChart,
  MinervaPieChart,
  MinervaRadarChart,
  MinervaShapeChart,
  MinervaTreemapChart,
} from "../components/chart/shape-chart";
import {
  MinervaBoxPlotChart,
  MinervaBubbleChart,
  MinervaGanttChart,
  MinervaHistogramChart,
  MinervaHorizontalBarChart,
  MinervaMixedChart,
  MinervaRangeAreaChart,
  MinervaWaterfallChart,
} from "../components/chart/extended";
import {
  MinervaBulletChart,
  MinervaCalendarHeatmap,
  MinervaChordChart,
  MinervaRadialBarChart,
  MinervaSankeyChart,
  MinervaSunburstChart,
} from "../components/chart/shapes-extended";
import { defineElement } from "../internal/define";

for (const element of [
  MinervaChart,
  MinervaLineChart,
  MinervaAreaChart,
  MinervaBarChart,
  MinervaScatterChart,
  MinervaCandlestickChart,
  MinervaHeatmapChart,
  MinervaSparkline,
  MinervaQuadrantChart,
  MinervaHorizontalBarChart,
  MinervaRangeAreaChart,
  MinervaMixedChart,
  MinervaBubbleChart,
  MinervaHistogramChart,
  MinervaBoxPlotChart,
  MinervaWaterfallChart,
  MinervaGanttChart,
  MinervaShapeChart,
  MinervaPieChart,
  MinervaDonutChart,
  MinervaRadarChart,
  MinervaGaugeChart,
  MinervaFunnelChart,
  MinervaTreemapChart,
  MinervaSankeyChart,
  MinervaSunburstChart,
  MinervaRadialBarChart,
  MinervaCalendarHeatmap,
  MinervaBulletChart,
  MinervaChordChart,
]) {
  defineElement(element);
}

export * from "../components/chart/engine-element";
export * from "../components/chart/chart";
export * from "../components/chart/charts";
export * from "../components/chart/shape-chart";
export * from "../components/chart/extended";
export * from "../components/chart/shapes-extended";
// the engine types used with the elements (the rest: minerva-design/charts/core)
export type {
  BoxplotGroup,
  BulletDatum,
  CalendarDatum,
  ChartAxisOptions,
  ChartHoverEvent,
  ChartHoverItem,
  ChartInstance,
  ChartOptions,
  ChartPlotClickEvent,
  ChartRendererKind,
  ChartSeries,
  ChartView,
  ChordGroup,
  ChordLink,
  GanttTask,
  GaugeBand,
  HeatmapCell,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegions,
  RadarIndicator,
  RadarSeries,
  RadialBarDatum,
  SankeyLink,
  SankeyNode,
  ShapeChartInstance,
  ShapeChartOptions,
  ShapeDrillEvent,
  ShapeDatum,
  ShapeHoverEvent,
  ShapeToggleEvent,
  TreemapNode,
  WaterfallStep,
} from "minerva-design/charts/core";
