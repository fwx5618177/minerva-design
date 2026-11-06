import { expect, it } from "vitest";
import { createTradeBars } from "./market";

it("aggregates executed trades into OHLC and volume, including late executions", () => {
  const bars = createTradeBars(1000, 3);
  bars.add([
    { time: 1200, price: 10, size: 2, side: "buy" },
    { time: 1800, price: 14, size: 3, side: "buy" },
  ]);
  bars.add([
    { time: 1100, price: 8, size: 1, side: "sell" },
    { time: 1700, price: 16, size: 4, side: "buy" },
  ]);
  expect(bars.values()).toEqual([
    { time: 1000, open: 8, high: 16, low: 8, close: 14, volume: 10 },
  ]);
});
it("retains a bounded history without filling enormous clock gaps or accepting invalid trades", () => {
  const bars = createTradeBars(1000, 2);
  bars.add(
    [1, 2, 1e12].map((time) => ({
      time: time * 1000,
      price: 10,
      size: 1,
      side: "buy" as const,
    })),
  );
  bars.add([
    { time: NaN, price: 2, size: 1, side: "buy" },
    { time: 1, price: Infinity, size: 1, side: "buy" },
  ]);
  expect(bars.values().map((bar) => bar.time)).toEqual([2000, 1e15]);
});
