import { describe, expect, it } from "vitest";
import {
  formatFixed,
  formatVolume,
  isTimeZone,
  typographicMinus,
  zoneOffset,
} from "./format";
import {
  atr,
  cci,
  dmi,
  donchian,
  ema,
  highestInto,
  ichimoku,
  keltner,
  lowestInto,
  mfi,
  obv,
  psar,
  resampleBars,
  rsi,
  sessionKey,
  sma,
  stochRsi,
  supertrend,
  volumeProfile,
  williamsR,
} from "./indicators";
import {
  createRangePyramid,
  createStore,
  invalidateRangePyramid,
  rangeLevel,
  setBars,
  updateBar,
} from "./store";
import { buildStudies, createStudy, indicatorKey } from "./studies";
import type { TradingBar, TradingIndicator } from "./types";

const HOUR = 3_600_000;

/** A wavy series with a trend, as columns */
const series = (n: number, seed = 1) => {
  const high: number[] = [];
  const low: number[] = [];
  const close: number[] = [];
  const open: number[] = [];
  const volume: number[] = [];
  for (let i = 0; i < n; i++) {
    const c = 100 + Math.sin((i + seed) / 5) * 8 + i * 0.1;
    open.push(c - Math.cos(i) * 0.6);
    close.push(c);
    high.push(c + 1 + (i % 3) * 0.4);
    low.push(c - 1 - (i % 4) * 0.3);
    volume.push(1000 + (i % 7) * 120);
  }
  return { open, high, low, close, volume };
};

const window = (values: number[], i: number, p: number) =>
  values.slice(i - p + 1, i + 1);

describe("highest / lowest (monotonic queue)", () => {
  it("matches a naive scan, NaN while warming up or over a NaN", () => {
    const values = [5, 3, 8, 1, 9, NaN, 4, 2, 7, 6, 10, 0];
    const hi = new Float64Array(values.length);
    const lo = new Float64Array(values.length);
    highestInto(values, values.length, 3, hi);
    lowestInto(values, values.length, 3, lo);
    for (let i = 0; i < values.length; i++) {
      const w = window(values, i, 3);
      if (i < 2 || w.some(Number.isNaN)) {
        expect(hi[i]).toBeNaN();
        expect(lo[i]).toBeNaN();
      } else {
        expect(hi[i]).toBe(Math.max(...w));
        expect(lo[i]).toBe(Math.min(...w));
      }
    }
    // recomputing from the middle gives the same values
    const again = new Float64Array(hi);
    highestInto(values, values.length, 3, again, 8);
    expect([...again]).toEqual([...hi]);
  });
});

describe("volume indicators", () => {
  it("obv adds up-close volumes and subtracts down-close ones", () => {
    expect([...obv([10, 11, 11, 9, 12], [5, 7, 3, 4, 6])]).toEqual([
      0, 7, 7, 3, 9,
    ]);
  });

  it("mfi is a volume-weighted RSI of the typical price", () => {
    const { high, low, close, volume } = series(40);
    const out = mfi(high, low, close, volume, 14);
    expect(out[13]).toBeNaN();
    const tp = close.map((c, i) => (high[i] + low[i] + c) / 3);
    let pos = 0;
    let neg = 0;
    for (let k = 30 - 13; k <= 30; k++) {
      const flow = tp[k] * volume[k];
      if (tp[k] > tp[k - 1]) pos += flow;
      else if (tp[k] < tp[k - 1]) neg += flow;
    }
    expect(out[30]).toBeCloseTo(100 - 100 / (1 + pos / neg), 9);
    // flat prices: no flow either way
    expect(mfi([1, 1, 1], [1, 1, 1], [1, 1, 1], [5, 5, 5], 2)[2]).toBe(50);
  });

  it("volumeProfile keeps the volume, finds the point of control and the value area", () => {
    const bars = {
      open: [10, 11, 12, 11.8],
      high: [11, 12, 13, 12],
      low: [10, 11, 12, 11],
      close: [11, 12, 12.5, 11.2],
      volume: [100, 400, 100, 300],
    };
    const profile = volumeProfile(bars, { rows: 3, valueArea: 0.7 });
    const total = [...profile.up, ...profile.down].reduce((a, b) => a + b);
    expect(total).toBeCloseTo(900, 9);
    expect(profile.total).toBe(900);
    expect(profile.low).toBe(10);
    expect(profile.high).toBe(13);
    // 11-12 holds bars 2 and 4: the point of control
    expect(profile.poc).toBe(1);
    const inside =
      profile.up
        .slice(profile.valueAreaFrom, profile.valueAreaTo + 1)
        .reduce((a, b) => a + b) +
      profile.down
        .slice(profile.valueAreaFrom, profile.valueAreaTo + 1)
        .reduce((a, b) => a + b);
    expect(inside / total).toBeGreaterThanOrEqual(0.7);
    // falling bars go to `down`
    expect(profile.down[1]).toBeCloseTo(300, 9);
    // a range without volume
    expect(volumeProfile({ ...bars, volume: [0, 0, 0, 0] }).poc).toBe(-1);
    expect(volumeProfile(bars, { from: 5, to: 2 }).poc).toBe(-1);
  });
});

describe("oscillators", () => {
  const { high, low, close, volume } = series(80);

  it("cci measures the distance from the mean in mean deviations", () => {
    const out = cci(high, low, close, 20);
    expect(out[18]).toBeNaN();
    const tp = close.map((c, i) => (high[i] + low[i] + c) / 3);
    const w = window(tp, 50, 20);
    const mean = w.reduce((a, b) => a + b) / 20;
    const dev = w.reduce((a, b) => a + Math.abs(b - mean), 0) / 20;
    expect(out[50]).toBeCloseTo((tp[50] - mean) / (0.015 * dev), 9);
    expect(cci([1, 1, 1], [1, 1, 1], [1, 1, 1], 2)[2]).toBe(0);
  });

  it("williamsR places the close in the range of the window", () => {
    const out = williamsR(high, low, close, 14);
    expect(out[12]).toBeNaN();
    const hh = Math.max(...window(high, 40, 14));
    const ll = Math.min(...window(low, 40, 14));
    expect(out[40]).toBeCloseTo(((hh - close[40]) / (hh - ll)) * -100, 9);
    expect(out[40]).toBeLessThanOrEqual(0);
    expect(out[40]).toBeGreaterThanOrEqual(-100);
    expect(williamsR([2, 2], [2, 2], [2, 2], 2)[1]).toBe(-50);
  });

  it("stochRsi smooths the stochastic of the RSI into K and D", () => {
    const { k, d } = stochRsi(close);
    const r = rsi(close, 14);
    const raw = r.map((value, i) => {
      if (i < 27) return NaN;
      const w = Array.from(window([...r], i, 14));
      const hh = Math.max(...w);
      const ll = Math.min(...w);
      return hh === ll ? 50 : ((value - ll) / (hh - ll)) * 100;
    });
    const expectedK = sma(raw, 3);
    for (let i = 0; i < close.length; i++) {
      if (Number.isNaN(expectedK[i])) expect(k[i]).toBeNaN();
      else expect(k[i]).toBeCloseTo(expectedK[i], 9);
    }
    const expectedD = sma(k, 3);
    expect(d[60]).toBeCloseTo(expectedD[60], 9);
    expect(k[60]).toBeGreaterThanOrEqual(0);
    expect(k[60]).toBeLessThanOrEqual(100);
  });

  it("dmi rises with the trend: +DI over −DI and a growing ADX", () => {
    const n = 80;
    const up = Array.from({ length: n }, (_, i) => 100 + i);
    const { plus, minus, adx } = dmi(
      up.map((v) => v + 1),
      up.map((v) => v - 1),
      up,
    );
    expect(plus[13]).toBeNaN();
    expect(plus[40]).toBeGreaterThan(minus[40]);
    expect(adx[40]).toBeGreaterThan(50);
    expect(adx[60]).toBeLessThanOrEqual(100);
    // mixed data stays in range
    const mixed = dmi(high, low, close);
    for (let i = 30; i < 80; i++) {
      expect(mixed.adx[i]).toBeGreaterThanOrEqual(0);
      expect(mixed.adx[i]).toBeLessThanOrEqual(100);
    }
    expect(volume.length).toBe(80);
  });
});

describe("trailing stops", () => {
  // a rally, then a crash
  const close = [
    ...Array.from({ length: 40 }, (_, i) => 100 + i),
    ...Array.from({ length: 40 }, (_, i) => 139 - i * 2),
  ];
  const high = close.map((c) => c + 1);
  const low = close.map((c) => c - 1);

  it("psar trails under a rally, then flips above the bars", () => {
    const out = psar(high, low);
    expect(out[0]).toBeNaN();
    for (let i = 2; i < 40; i++) expect(out[i]).toBeLessThanOrEqual(low[i]);
    const flip = close.findIndex((_, i) => i > 40 && out[i] > high[i]);
    expect(flip).toBeGreaterThan(40);
    for (let i = flip; i < 80; i++) expect(out[i]).toBeGreaterThan(low[i]);
  });

  it("supertrend follows the trend and flips its direction", () => {
    const { value, direction } = supertrend(high, low, close, 10, 3);
    expect(direction[8]).toBeNaN();
    expect(direction[39]).toBe(1);
    expect(value[39]).toBeLessThan(low[39]);
    expect(direction[79]).toBe(-1);
    expect(value[79]).toBeGreaterThan(high[79]);
    // the band only tightens while the trend holds
    for (let i = 21; i < 39; i++)
      if (direction[i] === 1 && direction[i + 1] === 1)
        expect(value[i + 1]).toBeGreaterThanOrEqual(value[i]);
  });
});

describe("channels and Ichimoku", () => {
  const { high, low, close } = series(90);

  it("ichimoku lines are midpoints of their windows", () => {
    const out = ichimoku(high, low);
    const mid = (i: number, p: number) =>
      (Math.max(...window(high, i, p)) + Math.min(...window(low, i, p))) / 2;
    expect(out.conversion[7]).toBeNaN();
    expect(out.conversion[60]).toBeCloseTo(mid(60, 9), 9);
    expect(out.base[60]).toBeCloseTo(mid(60, 26), 9);
    expect(out.spanB[60]).toBeCloseTo(mid(60, 52), 9);
    expect(out.spanA[60]).toBeCloseTo(
      (out.conversion[60] + out.base[60]) / 2,
      9,
    );
  });

  it("keltner sits multiplier ATRs around an EMA", () => {
    const out = keltner(high, low, close, { multiplier: 1.5 });
    const middle = ema(close, 20);
    const range = atr(high, low, close, 10);
    expect(out.middle[50]).toBeCloseTo(middle[50], 9);
    expect(out.upper[50] - out.middle[50]).toBeCloseTo(1.5 * range[50], 9);
    expect(out.middle[50] - out.lower[50]).toBeCloseTo(1.5 * range[50], 9);
  });

  it("donchian follows the highest high and the lowest low", () => {
    const out = donchian(high, low, 10);
    expect(out.upper[8]).toBeNaN();
    expect(out.upper[30]).toBe(Math.max(...window(high, 30, 10)));
    expect(out.lower[30]).toBe(Math.min(...window(low, 30, 10)));
    expect(out.middle[30]).toBeCloseTo((out.upper[30] + out.lower[30]) / 2, 9);
  });
});

describe("studies of the chart", () => {
  const ALL: TradingIndicator[] = [
    { type: "ma", period: 5, source: "hlc3" },
    { type: "ema", period: 5, source: "ohlc4" },
    { type: "wma", period: 5, source: "hl2" },
    { type: "boll" },
    { type: "vwap" },
    { type: "volume", maPeriod: 5 },
    { type: "macd" },
    { type: "rsi" },
    { type: "kdj" },
    { type: "atr" },
    { type: "psar" },
    { type: "ichimoku" },
    { type: "supertrend" },
    { type: "keltner" },
    { type: "donchian" },
    { type: "obv", maPeriod: 10 },
    { type: "cci" },
    { type: "stochRsi" },
    { type: "dmi" },
    { type: "williamsR" },
    { type: "mfi" },
  ];

  const toBars = (n: number): TradingBar[] => {
    const s = series(n, 3);
    return s.close.map((close, i) => ({
      time: Date.UTC(2024, 0, 1) + i * HOUR,
      open: s.open[i],
      high: s.high[i],
      low: s.low[i],
      close,
      volume: s.volume[i],
    }));
  };

  it.each(ALL.map((config) => [indicatorKey(config), config] as const))(
    "%s: a tick recomputes the same values as a full computation",
    (_, config) => {
      const bars = toBars(120);
      const full = createStore();
      setBars(full, bars);
      const whole = createStudy(config, "s", 0, 0);
      whole.compute(full, 0);

      // streamed: the first 100 bars, then the last 20 one tick at a time
      const live = createStore();
      setBars(live, bars.slice(0, 100));
      const streamed = createStudy(config, "s", 0, 0);
      streamed.compute(live, 0);
      for (const bar of bars.slice(100)) {
        // a first version of the bar, then the final one
        const at = updateBar(live, { ...bar, close: bar.open });
        streamed.compute(live, at);
        updateBar(live, bar);
        streamed.compute(live, at);
      }
      whole.outputs.forEach((out, k) => {
        const other = streamed.outputs[k];
        for (let i = 0; i < 120; i++) {
          const a = out.values[i];
          const b = other.values[i];
          if (Number.isNaN(a)) expect(b).toBeNaN();
          else expect(b).toBeCloseTo(a, 6);
        }
      });
      expect(whole.title.length).toBeGreaterThan(0);
      // something was computed
      expect(
        whole.outputs.some((out) =>
          Array.from(out.values.subarray(0, 120)).some(Number.isFinite),
        ),
      ).toBe(true);
    },
  );

  it("describes the drawing of the new indicators", () => {
    const [sar, cloud, trend, kc, dc] = buildStudies(
      [
        { type: "psar" },
        { type: "ichimoku", displacement: 30 },
        { type: "supertrend", upColor: "#0f0" },
        { type: "keltner", fill: false },
        { type: "donchian" },
      ],
      [],
      (time) => (time ? 0 : 0),
    ).studies;
    expect(sar.outputs[0].kind).toBe("dots");
    expect(cloud.titleKey).toBe("ichimoku");
    expect(cloud.outputs.map((o) => o.shift)).toEqual([0, 0, -29, 29, 29]);
    expect(cloud.fills[0]).toMatchObject({ a: 3, b: 4, colorBelow: "down" });
    expect(trend.mergeLegend).toBe(true);
    expect(trend.outputs[0].color).toBe("#0f0");
    expect(kc.fills).toEqual([]);
    expect(dc.fills).toHaveLength(1);
    expect(dc.title).toBe("DC 20");
  });
});

describe("value ranges of the zoomed-out chart", () => {
  it("rangeLevel keeps the min, max and last value of each group", () => {
    const values = new Float64Array([4, 1, NaN, 7, 3, 9, 2, NaN, 5]);
    const pyramid = createRangePyramid();
    const level = rangeLevel(pyramid, values, values.length, 2);
    expect(level.size).toBe(4);
    expect([...level.min.subarray(0, 3)]).toEqual([1, 2, 5]);
    expect([...level.max.subarray(0, 3)]).toEqual([7, 9, 5]);
    expect([...level.last.subarray(0, 3)]).toEqual([7, 2, 5]);
    // a changed value is picked up after an invalidation
    values[8] = 11;
    invalidateRangePyramid(pyramid, 8);
    expect(rangeLevel(pyramid, values, values.length, 2).max[2]).toBe(11);
    // a longer column grows the level
    const longer = new Float64Array(64).map((_, i) => i);
    const grown = rangeLevel(pyramid, longer, 64, 2);
    expect(grown.max[15]).toBe(63);
  });
});

describe("time zones and formats", () => {
  it("reads the offset of a zone, daylight saving included", () => {
    expect(zoneOffset(Date.UTC(2024, 0, 15), "America/New_York")).toBe(-300);
    expect(zoneOffset(Date.UTC(2024, 6, 15), "America/New_York")).toBe(-240);
    expect(zoneOffset(Date.UTC(2024, 6, 15), "Asia/Shanghai")).toBe(480);
    expect(zoneOffset(Date.UTC(2024, 6, 15), "UTC")).toBe(0);
    // cached per quarter of an hour
    expect(zoneOffset(Date.UTC(2024, 6, 15, 0, 7), "Asia/Shanghai")).toBe(480);
    expect(isTimeZone("Nowhere/City")).toBe(false);
    expect(zoneOffset(0, "Nowhere/City")).toBe(
      -new Date(0).getTimezoneOffset(),
    );
  });

  it("aggregates days in a time zone and keeps them whole over a clock change", () => {
    // hourly bars across the New York switch to daylight saving (March 10,
    // 2024): 24 + 23 + 24 hours
    const bars: TradingBar[] = Array.from({ length: 71 }, (_, i) => ({
      time: Date.UTC(2024, 2, 9, 5) + i * HOUR,
      open: i,
      high: i + 1,
      low: i - 1,
      close: i + 0.5,
      volume: 1,
    }));
    const days = resampleBars(bars, "1D", "America/New_York");
    expect(days).toHaveLength(3);
    // March 10 has 23 hours
    expect(days[1].volume).toBe(23);
    expect(days[1].time).toBe(Date.UTC(2024, 2, 10, 5));
    expect(days[2].time).toBe(Date.UTC(2024, 2, 11, 4));
    const shanghai = resampleBars(bars.slice(0, 24), "1D", "Asia/Shanghai");
    expect(shanghai[1].time).toBe(Date.UTC(2024, 2, 9, 16));
    expect(sessionKey(Date.UTC(2024, 2, 9, 16), "day", () => 480)).toBe(
      sessionKey(Date.UTC(2024, 2, 10, 15), "day", 480),
    );
  });

  it("writes negative numbers with the minus sign", () => {
    expect(formatFixed(-1.5, 2, "en")).toBe("−1.50");
    expect(formatVolume(-2_500_000, "en")).toBe("−2.5M");
    expect(typographicMinus("12")).toBe("12");
  });
});
