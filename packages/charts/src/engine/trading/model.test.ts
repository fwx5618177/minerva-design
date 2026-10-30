import { describe, expect, it } from "vitest";
import {
  boundaryWeight,
  detectPrecision,
  formatCountdown,
  formatPercent,
  formatVolume,
  inferTimeframe,
  pickTicks,
  tickText,
} from "./format";
import { localeLabels } from "../locale";
import { TRADING_LABELS } from "./labels";
import { candleMetrics, LineBuffer } from "./geometry";
import {
  createScale,
  fitScale,
  scaleTicks,
  toScaled,
  valueAt,
  yOf,
} from "./scale";
import {
  appendBars,
  createPyramid,
  createStore,
  indexOfTime,
  invalidatePyramid,
  prependBars,
  pyramidLevel,
  setBars,
  updateBar,
} from "./store";
import { buildStudies } from "./studies";

const bar = (time: number, close: number, volume = 1) => ({
  time,
  open: close - 1,
  high: close + 1,
  low: close - 2,
  close,
  volume,
});

describe("bar store", () => {
  it("replaces the last bar at the same time and appends newer ones", () => {
    const store = createStore();
    setBars(store, [bar(1, 10), bar(2, 11)]);
    expect(updateBar(store, bar(2, 12))).toBe(1);
    expect(store.length).toBe(2);
    expect(store.close[1]).toBe(12);
    expect(updateBar(store, bar(3, 13))).toBe(2);
    expect(updateBar(store, bar(1, 0))).toBe(-1);
    expect(store.length).toBe(3);
  });

  it("grows its columns and prepends older bars", () => {
    const store = createStore();
    setBars(store, [bar(100, 1)]);
    expect(
      appendBars(
        store,
        Array.from({ length: 40 }, (_, i) => bar(101 + i, i)),
      ),
    ).toBe(1);
    expect(store.length).toBe(41);
    expect(store.capacity).toBeGreaterThanOrEqual(41);
    expect(prependBars(store, [bar(98, 5), bar(99, 6), bar(100, 7)])).toBe(2);
    expect(store.time[0]).toBe(98);
    expect(store.time[2]).toBe(100);
    expect(store.close[2]).toBe(1);
    expect(indexOfTime(store.time, store.length, 100.5)).toBe(2);
  });

  it("takes columns with typed arrays", () => {
    const store = createStore();
    const n = 1000;
    setBars(store, {
      time: Float64Array.from({ length: n }, (_, i) => i),
      open: new Float64Array(n).fill(1),
      high: new Float64Array(n).fill(2),
      low: new Float64Array(n).fill(0),
      close: new Float64Array(n).fill(1.5),
    });
    expect(store.length).toBe(n);
    expect(store.hasVolume).toBe(false);
  });
});

describe("pyramid", () => {
  it("aggregates groups of 2^k bars and refreshes the stale ones", () => {
    const store = createStore();
    setBars(
      store,
      Array.from({ length: 10 }, (_, i) => bar(i, i, i)),
    );
    const pyramid = createPyramid();
    const level = pyramidLevel(pyramid, store, store.length, 2);
    // groups of 4: [0..3], [4..7], [8..9]
    expect(level.size).toBe(4);
    expect(Array.from(level.close.subarray(0, 3))).toEqual([3, 7, 9]);
    expect(Array.from(level.high.subarray(0, 3))).toEqual([4, 8, 10]);
    expect(Array.from(level.low.subarray(0, 3))).toEqual([-2, 2, 6]);
    expect(Array.from(level.volume.subarray(0, 3))).toEqual([6, 22, 17]);
    updateBar(store, bar(9, 100, 9));
    invalidatePyramid(pyramid, 9);
    expect(pyramidLevel(pyramid, store, store.length, 2).high[2]).toBe(101);
    updateBar(store, bar(10, 50, 1));
    invalidatePyramid(pyramid, 10);
    const after = pyramidLevel(pyramid, store, store.length, 2);
    expect(after.close[2]).toBe(50);
    expect(after.volume[2]).toBe(8 + 9 + 1);
  });
});

describe("studies", () => {
  it("gets default ids, reuses unchanged indicators and puts oscillators in panes", () => {
    const first = buildStudies(
      [
        { type: "ma", period: 7 },
        { type: "ma", period: 7 },
        { type: "macd" },
        { type: "volume", overlay: true },
      ],
      [],
      0,
    ).studies;
    expect(first.map((s) => s.id)).toEqual([
      "ma:7",
      "ma:7#2",
      "macd:12:26:9",
      "volume",
    ]);
    expect(first.map((s) => s.overlay)).toEqual([true, true, false, true]);
    const second = buildStudies(
      [{ type: "ma", period: 7 }, { type: "rsi" }],
      first,
      0,
    );
    expect(second.studies[0]).toBe(first[0]);
    expect(second.studies[1].range).toEqual([0, 100]);
  });

  it("computes from the store and recomputes the tail", () => {
    const store = createStore();
    setBars(
      store,
      Array.from({ length: 30 }, (_, i) => bar(i, 10 + i)),
    );
    const [ma] = buildStudies([{ type: "ma", period: 5 }], [], 0).studies;
    ma.compute(store, 0);
    expect(ma.outputs[0].values[29]).toBeCloseTo(37);
    updateBar(store, bar(29, 49));
    ma.compute(store, 29);
    expect(ma.outputs[0].values[29]).toBeCloseTo(37 + 2);
  });
});

describe("formatting", () => {
  it("detects the decimals of prices", () => {
    expect(detectPrecision([1, 2, 3], 0, 3)).toBe(0);
    expect(detectPrecision([64210.5, 64211.25], 0, 2)).toBe(2);
    expect(detectPrecision([0.000123], 0, 1)).toBe(6);
  });

  it("formats percents and countdowns", () => {
    expect(formatPercent(1.234, "en-US")).toBe("+1.23%");
    expect(formatPercent(-0.5, "en-US")).toBe("−0.50%");
    expect(formatCountdown(65_000)).toBe("01:05");
    expect(formatCountdown(3_725_000)).toBe("01:02:05");
    expect(formatCountdown(2 * 86_400_000 + 4 * 3_600_000)).toBe("2d 04h");
    expect(
      formatCountdown(
        2 * 86_400_000 + 4 * 3_600_000,
        localeLabels(TRADING_LABELS, "zh-CN"),
      ),
    ).toBe("2天 04小时");
  });

  it("formats volumes with the compact units of the language", () => {
    expect(formatVolume(950, "en-US")).toBe("950");
    expect(formatVolume(12_345_678, "en-US")).toBe("12.35M");
    expect(formatVolume(999_999, "en-US")).toBe("1M");
    expect(formatVolume(12_345_678, "zh-CN")).toBe("1,234.57万");
    expect(formatVolume(3.2e8, "ja-JP")).toBe("3.2億");
    expect(formatVolume(4_500, "fr-FR")).toBe("4,5 k");
  });

  it("has every text in every built-in language", () => {
    const keys = Object.keys(TRADING_LABELS.en).sort();
    for (const language of ["zh", "ja", "fr"]) {
      expect(Object.keys(TRADING_LABELS[language] ?? {}).sort()).toEqual(keys);
    }
    expect(localeLabels(TRADING_LABELS, "de-DE").open).toBe("O");
    expect(
      localeLabels(TRADING_LABELS, "zh-TW", { close: "收盤" }),
    ).toMatchObject({ open: "开", close: "收盤" });
  });

  it("weighs time boundaries by calendar unit", () => {
    const t = Date.UTC(2024, 0, 31, 23, 0);
    expect(boundaryWeight(t, Date.UTC(2024, 1, 1))).toBe(60);
    expect(boundaryWeight(Date.UTC(2023, 11, 31), Date.UTC(2024, 0, 1))).toBe(
      70,
    );
    expect(boundaryWeight(Date.UTC(2024, 0, 2), Date.UTC(2024, 0, 3))).toBe(50);
    expect(
      boundaryWeight(Date.UTC(2024, 0, 2, 5, 55), Date.UTC(2024, 0, 2, 6)),
    ).toBe(45);
    expect(
      boundaryWeight(Date.UTC(2024, 0, 2, 5, 10), Date.UTC(2024, 0, 2, 5, 15)),
    ).toBe(33);
    expect(tickText(Date.UTC(2024, 0, 1), 70, "en-US", true)).toBe("2024");
    expect(tickText(Date.UTC(2024, 0, 2, 14, 5), 31, "en-US", true)).toBe(
      "14:05",
    );
  });

  it("keeps the heaviest ticks apart", () => {
    const picked = pickTicks(
      [
        { x: 0, weight: 31, time: 0 },
        { x: 10, weight: 50, time: 1 },
        { x: 20, weight: 31, time: 2 },
        { x: 60, weight: 31, time: 3 },
      ],
      30,
    );
    expect(picked.map((t) => t.x)).toEqual([10, 60]);
  });

  it("infers the bar duration despite weekends", () => {
    const day = 86_400_000;
    const times = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 14].map((d) => d * day);
    expect(inferTimeframe(times, times.length)).toBe(day);
  });
});

describe("scales and geometry", () => {
  it("maps values in linear, log and percent modes", () => {
    const scale = createScale("linear");
    scale.top = 0;
    scale.height = 100;
    scale.marginTop = scale.marginBottom = 0;
    fitScale(scale, 0, 10);
    expect(yOf(scale, 10)).toBe(0);
    expect(yOf(scale, 5)).toBe(50);
    expect(valueAt(scale, 25)).toBeCloseTo(7.5);
    scale.mode = "log";
    fitScale(scale, toScaled(scale, 1), toScaled(scale, 100));
    expect(yOf(scale, 10)).toBeCloseTo(50);
    scale.mode = "percent";
    scale.base = 200;
    expect(toScaled(scale, 220)).toBeCloseTo(10);
    const ticks = scaleTicks(
      { ...scale, mode: "log", min: 0, max: 2 },
      20,
    ).scaled;
    expect(ticks.length).toBeGreaterThan(2);
    expect(
      ticks.every((t) => Number.isInteger(Number((10 ** t).toPrecision(2)))),
    ).toBe(true);
  });

  it("snaps candles to the pixel grid", () => {
    const m = candleMetrics(10, 1);
    expect(m.wick).toBe(1);
    expect((m.body - m.wick) % 2).toBe(0);
    expect(m.snap(12.3)).toBe(12.5);
    const hd = candleMetrics(20, 2);
    expect(hd.wick).toBe(2);
    expect(hd.snap(12.3)).toBe(12);
  });

  it("clips lines to their pane", () => {
    const line = new LineBuffer(0, 100);
    line.push(0, 50);
    line.push(10, 150);
    line.push(20, 50);
    const item = line.item("k", 1, [1, 1, 1, 1], 1);
    const ys = [];
    for (let i = 0; i < item.count; i++) ys.push(item.points[i * 2 + 1]);
    // 50, 100 (cut), gap, 100 (re-entry), 50
    expect(ys[0]).toBe(50);
    expect(ys[1]).toBe(100);
    expect(ys[2]).toBeGreaterThan(1e37);
    expect(ys[3]).toBe(100);
    expect(ys[4]).toBe(50);
  });
});
