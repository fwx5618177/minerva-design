// Registers <minerva-trading-chart>. Optional entry: not part of the
// all-in-one entry nor of cdn/minerva.js, since it loads the trading engine
// of minerva-design/charts/core (shared with the other renderers); its CDN
// file is cdn/trading-chart.js.
import { MinervaTradingChart } from "../components/trading-chart/trading-chart";
import { defineElement } from "../internal/define";

defineElement(MinervaTradingChart);

export * from "../components/trading-chart/trading-chart";
// the engine types used with the element (the rest: minerva-design/charts/core)
export type {
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
} from "minerva-design/charts/core";
