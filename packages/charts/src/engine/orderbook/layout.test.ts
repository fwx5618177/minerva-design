import { describe, expect, it } from "vitest";
import {
  fitPriceRange,
  fitTimeRange,
  layoutAxisLabels,
  niceCeil,
  fineCeil,
} from "./layout";

describe("axis label layout", () => {
  it("keeps separate labels where they are and hides the ticks under them", () => {
    const layout = layoutAxisLabels(
      [
        { y: 50, h: 16 },
        { y: 150, h: 16 },
      ],
      null,
      [20, 55, 100, 160, 195],
      12,
      [0, 200],
    );
    expect(layout.pinned).toEqual([50, 150]);
    // 55 and 160 sit under the tags; 195 overflows the bottom edge
    expect(layout.ticks).toEqual([true, false, true, false, false]);
  });

  it("stacks overlapping pinned labels in order around their positions", () => {
    // best ask just above the best bid: one stack, the ask stays on top
    const layout = layoutAxisLabels(
      [
        { y: 100, h: 16 },
        { y: 102, h: 16 },
        { y: 101, h: 16 },
      ],
      null,
      [],
      12,
      [0, 300],
    );
    const [a, b, c] = layout.pinned as number[];
    expect(a).toBeLessThan(c!);
    expect(c).toBeLessThan(b!);
    expect(c! - a!).toBeGreaterThanOrEqual(16);
    expect(b! - c!).toBeGreaterThanOrEqual(16);
    // centered on the mean of the wished positions
    expect((a! + b! + c!) / 3).toBeCloseTo(101, 5);
  });

  it("keeps stacks inside the bounds", () => {
    const layout = layoutAxisLabels(
      [
        { y: 2, h: 16 },
        { y: 4, h: 16 },
      ],
      null,
      [],
      12,
      [0, 100],
    );
    expect(layout.pinned[0]).toBe(8);
    expect(layout.pinned[1]).toBe(26);
  });

  it("lets the hover label win over the pinned ones and the ticks", () => {
    const layout = layoutAxisLabels(
      [
        { y: 100, h: 16 },
        { y: 30, h: 16 },
        { y: Number.NaN, h: 16 },
      ],
      { y: 106, h: 16 },
      [60, 110],
      12,
      [0, 200],
    );
    expect(layout.pinned).toEqual([null, 30, null]);
    expect(layout.ticks).toEqual([true, false]);
  });
});

describe("heatmap view fit", () => {
  it("keeps the price range while the market stays inside", () => {
    const first = fitPriceRange(null, 100, 101, 10);
    expect(first).toEqual([95.5, 105.5]);
    expect(fitPriceRange(first, 99, 102, 10)).toEqual(first);
    // leaving the inner part re-centers
    expect(fitPriceRange(first, 104, 105, 10)).toEqual([99.5, 109.5]);
    // a wide market widens it
    expect(fitPriceRange(first, 90, 110, 10)).toEqual([84, 116]);
    // a range much too wide for a calm market shrinks
    expect(fitPriceRange([0, 200], 100, 101, 10)).toEqual([95.5, 105.5]);
  });

  it("keeps a span set by the user and handles missing prices", () => {
    expect(fitPriceRange([90, 110], 100, 101, 10, 20)).toEqual([90, 110]);
    expect(fitPriceRange([90, 110], 100, 101, 10, 4)).toEqual([98.5, 102.5]);
    expect(fitPriceRange([1, 2], Number.NaN, 5, 10)).toEqual([1, 2]);
    const none = fitPriceRange(null, Number.NaN, Number.NaN, 10);
    expect(none.every(Number.isNaN)).toBe(true);
  });

  it("fills the plot with a short history, then slides a full window", () => {
    // 5 s of data, a 60 s window: the data spans the plot
    expect(fitTimeRange(10_000, 15_000, 60_000, 2_000)).toEqual([
      10_000, 15_000,
    ]);
    // at least the minimum span
    expect(fitTimeRange(14_500, 15_000, 60_000, 2_000)).toEqual([
      13_000, 15_000,
    ]);
    // history longer than the window
    expect(fitTimeRange(0, 100_000, 60_000, 2_000)).toEqual([40_000, 100_000]);
    expect(fitTimeRange(Number.NaN, 100, 50, 10)).toEqual([50, 100]);
  });

  it("rounds scales up to nice numbers", () => {
    expect(niceCeil(0.7)).toBeCloseTo(1);
    expect(niceCeil(13)).toBe(20);
    expect(niceCeil(21)).toBe(25);
    expect(niceCeil(26.08)).toBe(50);
    expect(niceCeil(100)).toBe(100);
    expect(niceCeil(0)).toBe(0);
    expect(niceCeil(Number.NaN)).toBe(0);
  });

  it("rounds scales up on a fine series (at most a third above)", () => {
    expect(fineCeil(1)).toBe(1);
    expect(fineCeil(1.1)).toBe(1.2);
    expect(fineCeil(13)).toBe(15);
    expect(fineCeil(0.031)).toBe(0.04);
    expect(fineCeil(7)).toBe(8);
    expect(fineCeil(8.5)).toBe(10);
    expect(fineCeil(0)).toBe(0);
    expect(fineCeil(Infinity)).toBe(0);
    for (const v of [0.37, 4.2, 61, 999, 12345]) {
      expect(fineCeil(v)).toBeGreaterThanOrEqual(v);
      expect(fineCeil(v)).toBeLessThanOrEqual((v * 4) / 3 + 1e-9);
    }
  });
});
