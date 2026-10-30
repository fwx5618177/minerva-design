// Registers the order book elements (<minerva-depth-chart>,
// <minerva-order-book>, <minerva-order-book-heatmap>,
// <minerva-time-and-sales>). Optional entry: not part of the all-in-one
// entry nor of the CDN bundle, since it loads the order book engines of
// minerva-design/charts/core (shared with the other renderers).
import {
  MinervaDepthChart,
  MinervaOrderBook,
  MinervaOrderBookHeatmap,
  MinervaTimeAndSales,
} from "../components/order-book/order-book";
import { defineElement } from "../internal/define";

for (const element of [
  MinervaDepthChart,
  MinervaOrderBook,
  MinervaOrderBookHeatmap,
  MinervaTimeAndSales,
]) {
  defineElement(element);
}

export * from "../components/order-book/order-book";
// the engine types used with the elements (the rest: minerva-design/charts/core)
export type {
  DepthChartHoverEvent,
  DepthChartOptions,
  OrderBookDelta,
  OrderBookHeatmapHoverEvent,
  OrderBookHeatmapOptions,
  OrderBookLevelEvent,
  OrderBookOptions,
  OrderBookSnapshot,
  TimeAndSalesOptions,
  TimeAndSalesRowEvent,
} from "minerva-design/charts/core";
