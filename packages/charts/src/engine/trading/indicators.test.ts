import { describe, expect, it } from "vitest";
import {
  atr,
  bollinger,
  ema,
  emaInto,
  heikinAshi,
  kdj,
  macd,
  parseTimeframe,
  resampleBars,
  rsi,
  rsiInto,
  sma,
  smaInto,
  vwap,
  wma,
  wmaInto,
} from "./indicators";
import type { TradingBar } from "./types";

const close = [10, 11, 12, 11, 13, 14, 13, 15, 16, 15, 17, 18, 17, 19, 20, 19];

const naiveSma = (values: number[], p: number) =>
  values.map((_, i) =>
    i < p - 1
      ? NaN
      : values.slice(i - p + 1, i + 1).reduce((a, b) => a + b) / p,
  );

const expectClose = (
  actual: ArrayLike<number>,
  expected: ArrayLike<number>,
) => {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < expected.length; i++) {
    if (Number.isNaN(expected[i])) expect(actual[i]).toBeNaN();
    else expect(actual[i]).toBeCloseTo(expected[i], 9);
  }
};

describe("moving averages", () => {
  it("sma matches the naive mean and is NaN while warming up", () => {
    expectClose(sma(close, 3), naiveSma(close, 3));
    expectClose(sma(close, 1), close);
  });

  it("ema is seeded with the simple average then smoothed", () => {
    const out = ema(close, 4);
    expect(out[2]).toBeNaN();
    expect(out[3]).toBeCloseTo((10 + 11 + 12 + 11) / 4);
    const alpha = 2 / 5;
    expect(out[4]).toBeCloseTo(out[3] + alpha * (13 - out[3]));
  });

  it("wma weighs the newest value most", () => {
    const out = wma([1, 2, 3, 4], 3);
    expect(out[1]).toBeNaN();
    expect(out[2]).toBeCloseTo((1 * 1 + 2 * 2 + 3 * 3) / 6);
    expect(out[3]).toBeCloseTo((2 * 1 + 3 * 2 + 4 * 3) / 6);
  });

  it("recomputes only the tail with the same result", () => {
    const values = Float64Array.from(close);
    for (const kernel of [smaInto, emaInto, wmaInto]) {
      const full = new Float64Array(values.length).fill(NaN);
      kernel(values, values.length, 5, full);
      const incremental = new Float64Array(values.length).fill(NaN);
      kernel(values, 10, 5, incremental);
      kernel(values, values.length, 5, incremental, 10);
      expectClose(incremental, full);
    }
  });
});

describe("oscillators", () => {
  it("bollinger bands are symmetric around the average", () => {
    const { middle, upper, lower } = bollinger(close, 5, 2);
    expectClose(middle, naiveSma(close, 5));
    for (let i = 4; i < close.length; i++) {
      expect(upper[i] - middle[i]).toBeCloseTo(middle[i] - lower[i]);
      expect(upper[i]).toBeGreaterThan(middle[i]);
    }
  });

  it("macd histogram is the line minus the signal", () => {
    const series = Array.from(
      { length: 80 },
      (_, i) => 100 + Math.sin(i / 5) * 10,
    );
    const out = macd(series);
    const i = 60;
    expect(out.histogram[i]).toBeCloseTo(out.macd[i] - out.signal[i]);
    expect(out.signal[30]).toBeNaN();
    expect(Number.isFinite(out.signal[40])).toBe(true);
  });

  it("rsi is 100 on a steady rise, 0 on a steady fall and matches incrementally", () => {
    const rising = Array.from({ length: 30 }, (_, i) => i);
    expect(rsi(rising, 14)[20]).toBe(100);
    expect(
      rsi(
        rising.map((v) => -v),
        14,
      )[20],
    ).toBe(0);
    const out = rsi(close, 5);
    expect(out[4]).toBeNaN();
    expect(out[5]).toBeGreaterThan(50);
    const values = Float64Array.from(close);
    const n = values.length;
    const a = new Float64Array(n);
    const g = new Float64Array(n);
    const l = new Float64Array(n);
    rsiInto(values, 12, 5, a, g, l);
    rsiInto(values, n, 5, a, g, l, 12);
    expectClose(a, out);
  });

  it("kdj stays around its range and J = 3K - 2D", () => {
    const high = close.map((c) => c + 1);
    const low = close.map((c) => c - 1);
    const { k, d, j } = kdj(high, low, close, 9, 3, 3);
    expect(k[7]).toBeNaN();
    for (let i = 8; i < close.length; i++) {
      expect(j[i]).toBeCloseTo(3 * k[i] - 2 * d[i]);
      expect(k[i]).toBeGreaterThanOrEqual(0);
      expect(k[i]).toBeLessThanOrEqual(100);
    }
  });

  it("atr of constant bars is their range", () => {
    const n = 30;
    const out = atr(
      new Array(n).fill(12),
      new Array(n).fill(10),
      new Array(n).fill(11),
      14,
    );
    expect(out[12]).toBeNaN();
    expect(out[20]).toBeCloseTo(2);
  });

  it("vwap restarts every day", () => {
    const day = 86_400_000;
    const time = [0, 3_600_000, day, day + 3_600_000];
    const out = vwap(
      [2, 4, 10, 10],
      [2, 4, 10, 10],
      [2, 4, 10, 20],
      [1, 3, 1, 1],
      {
        time,
      },
    );
    expect(out[0]).toBeCloseTo(2);
    expect(out[1]).toBeCloseTo((2 * 1 + 4 * 3) / 4);
    expect(out[2]).toBeCloseTo(10);
    expect(out[3]).toBeCloseTo((10 + 40 / 3) / 2);
  });

  it("heikin-ashi averages the bars", () => {
    const ha = heikinAshi({
      open: [10, 12],
      high: [13, 14],
      low: [9, 11],
      close: [12, 13],
    });
    expect(ha.close[0]).toBeCloseTo((10 + 13 + 9 + 12) / 4);
    expect(ha.open[0]).toBeCloseTo(11);
    expect(ha.open[1]).toBeCloseTo((ha.open[0] + ha.close[0]) / 2);
    expect(ha.high[1]).toBeGreaterThanOrEqual(
      Math.max(ha.open[1], ha.close[1]),
    );
  });
});

describe("resampleBars", () => {
  const minute = 60_000;
  const bars: TradingBar[] = Array.from({ length: 12 }, (_, i) => ({
    time: i * 5 * minute,
    open: i,
    high: i + 2,
    low: i - 1,
    close: i + 1,
    volume: 10,
  }));

  it("aggregates bars into buckets", () => {
    const hourly = resampleBars(bars, "15m");
    expect(hourly).toHaveLength(4);
    expect(hourly[0]).toEqual({
      time: 0,
      open: 0,
      high: 4,
      low: -1,
      close: 3,
      volume: 30,
    });
    expect(hourly[3].time).toBe(45 * minute);
  });

  it("accepts columns and returns columns", () => {
    const columns = {
      time: bars.map((b) => b.time),
      open: bars.map((b) => b.open),
      high: bars.map((b) => b.high),
      low: bars.map((b) => b.low),
      close: bars.map((b) => b.close),
    };
    const out = resampleBars(columns, "1H");
    expect(out.close).toBeInstanceOf(Float64Array);
    expect(Array.from(out.close)).toEqual([12]);
  });

  it("parses timeframes and aligns weeks on Monday", () => {
    expect(parseTimeframe("4H")?.ms).toBe(4 * 3_600_000);
    expect(parseTimeframe("1M")?.unit).toBe("month");
    expect(parseTimeframe("x" as never)).toBeNull();
    const monday = Date.UTC(2024, 2, 11);
    const weekly = resampleBars(
      [{ time: Date.UTC(2024, 2, 14), open: 1, high: 1, low: 1, close: 1 }],
      "1W",
    );
    expect(weekly[0].time).toBe(monday);
    const monthly = resampleBars(
      [{ time: Date.UTC(2024, 2, 14), open: 1, high: 1, low: 1, close: 1 }],
      "1M",
    );
    expect(monthly[0].time).toBe(Date.UTC(2024, 2, 1));
  });
});
