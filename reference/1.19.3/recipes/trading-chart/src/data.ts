import type { TradingBar } from "minerva-design/charts";
// Deterministic local fixture: no network feed, document helpers or i18n setup.
export const bars: TradingBar[] = Array.from({ length: 90 }, (_, index) => {
  const open = 100 + index * 0.4 + Math.sin(index / 4) * 3;
  const close = open + Math.cos(index / 3);
  return {
    time: Date.UTC(2026, 0, 1 + index),
    open,
    high: Math.max(open, close) + 1,
    low: Math.min(open, close) - 1,
    close,
    volume: 1000 + index * 12,
  };
});
