// Synchronized charts: a layout of several charts sharing the crosshair
// time and the visible time range (multi-chart terminals).

import { syncHooks } from "./chart";
import type { TradingChartInstance, TradingSyncOptions } from "./types";

/**
 * Keeps charts in step: the crosshair of the hovered chart shows on the
 * others at the same time, and scrolling or zooming one shows the same time
 * range on every chart (charts of different timeframes included). Returns
 * a function that stops the synchronization.
 */
export const syncCharts = (
  charts: readonly TradingChartInstance[],
  options: TradingSyncOptions = {},
): (() => void) => {
  const offs: (() => void)[] = [];
  for (const chart of charts) {
    const others = charts.filter((other) => other !== chart);
    if (options.crosshair !== false) {
      offs.push(
        chart.on("crosshairMove", (event) => {
          for (const other of others)
            other.setCrosshair(event ? event.time : null);
        }),
      );
    }
    if (options.timeRange !== false) {
      offs.push(
        chart.on("visibleRangeChange", () => {
          const range = chart.getVisibleTimeRange();
          for (const other of others) {
            // the followers don't report the change back (no echo)
            const hooks = syncHooks.get(other);
            if (hooks) hooks.setTimeRange(range);
            else other.setVisibleTimeRange(range);
          }
        }),
      );
    }
  }
  return () => {
    offs.forEach((off) => off());
    for (const chart of charts) chart.setCrosshair(null);
  };
};
