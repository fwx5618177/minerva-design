// Registers the graph elements (<minerva-graph-chart>,
// <minerva-dependency-graph>, <minerva-tree-chart>). Optional entry: not
// part of the all-in-one entry nor of cdn/minerva.js, since it loads the
// graph engine of minerva-design/charts/core (shared with the other
// renderers); its CDN file is cdn/graph.js.
import {
  MinervaDependencyGraph,
  MinervaGraphChart,
  MinervaTreeChart,
} from "../components/graph/graph";
import { defineElement } from "../internal/define";

for (const element of [
  MinervaGraphChart,
  MinervaDependencyGraph,
  MinervaTreeChart,
]) {
  defineElement(element);
}

export * from "../components/graph/graph";
// the engine types used with the elements (the rest: minerva-design/charts/core)
export type {
  GraphChartInstance,
  GraphChartLabels,
  GraphChartOptions,
  GraphData,
  GraphDirection,
  GraphEdge,
  GraphGroup,
  GraphGroupToggleEvent,
  GraphHoverEvent,
  GraphLayoutEndEvent,
  GraphLayoutType,
  GraphNode,
  GraphPoint,
  GraphSelectEvent,
  GraphToggleEvent,
} from "minerva-design/charts/core";
