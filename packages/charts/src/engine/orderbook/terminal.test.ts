import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { createHeatmapCandles } from "./candles";
import { createOrderBookHeatmap } from "./heatmap";

const calls: { name: string; args: unknown[]; color: unknown }[] = [];
beforeEach(() => {
  calls.length = 0;
  const state: Record<string, unknown> = {};
  const context = new Proxy(state, {
    get: (target, name: string) =>
      name in target
        ? target[name]
        : name === "createImageData"
          ? (w: number, h: number) => ({
              data: new Uint8ClampedArray(w * h * 4),
            })
          : name === "createLinearGradient"
            ? () => ({ addColorStop() {} })
            : name === "measureText"
              ? (s: string) => ({ width: s.length * 6 })
              : (...args: unknown[]) => {
                  calls.push({ name, args, color: target.fillStyle });
                },
    set: (target, name: string, value) => {
      target[name] = value;
      return true;
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) => (kind === "2d" ? context : null)) as never);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});
afterEach(() => {
  vi.restoreAllMocks();
  document.body.textContent = "";
});
const frame = () => new Promise((resolve) => setTimeout(resolve, 45));
const mount = () => {
  const el = document.createElement("div");
  document.body.append(el);
  return el;
};
const book = (time: number) => ({
  time,
  bids: [[99, 4]] as [number, number][],
  asks: [[101, 6]] as [number, number][],
});

it("sets an explicit view, emits it once when unchanged, and resumes following", async () => {
  const chart = createOrderBookHeatmap(mount(), {
    renderer: "canvas2d",
    interval: 100,
  });
  chart.setBook(book(1000));
  chart.setBook(book(2000));
  await chart.ready;
  chart.setView({ time: [1100, 1800], price: [95, 105] });
  const events: unknown[] = [];
  chart.on("view", (event) => events.push(event));
  await frame();
  expect(chart.getView().view).toEqual({
    time: [1100, 1800],
    price: [95, 105],
    follow: false,
  });
  expect(events).toHaveLength(1);
  chart.resize();
  await frame();
  expect(events).toHaveLength(1);
  chart.setView({ time: [NaN, Infinity], price: [3, 2] });
  expect(chart.getView().view.price).toEqual([95, 105]);
  chart.resetView();
  await frame();
  expect(chart.getView().view.follow).toBe(true);
  chart.destroy();
});

it("draws clipped candle bodies and wicks from supplied bars, updates the last close", async () => {
  const chart = createOrderBookHeatmap(mount(), {
    renderer: "canvas2d",
    bubbles: false,
    bestLines: false,
    profile: false,
    legend: false,
  });
  chart.setBook(book(1000));
  chart.setBook(book(2000));
  chart.setBars([{ time: 1200, open: 98, high: 103, low: 97, close: 102 }]);
  chart.setView({ time: [1000, 2000], price: [95, 105] });
  await chart.ready;
  await frame();
  expect(calls.some((c) => c.name === "clip")).toBe(true);
  expect(
    calls.some(
      (c) =>
        c.name === "fillRect" &&
        Number(c.args[2]) > 1 &&
        Number(c.args[2]) <= 24 &&
        Number(c.args[3]) > 1,
    ),
  ).toBe(true);
  expect(
    calls.some((c) => c.name === "fillText" && Number(c.args[0]) === 102),
  ).toBe(true);
  chart.updateBar({ time: 1200, open: 98, high: 104, low: 97, close: 104 });
  calls.length = 0;
  await frame();
  expect(
    calls.some((c) => c.name === "fillText" && Number(c.args[0]) === 104),
  ).toBe(true);
  chart.setOptions({
    renderer: "canvas2d",
    candles: false,
    lastPriceLine: false,
    bubbles: false,
    bestLines: false,
    profile: false,
    legend: false,
  });
  calls.length = 0;
  await frame();
  expect(
    calls.some(
      (c) =>
        c.name === "fillRect" &&
        Number(c.args[2]) > 1 &&
        Number(c.args[2]) <= 24 &&
        Number(c.args[3]) > 1,
    ),
  ).toBe(false);
  chart.destroy();
});

it("caps retained columns and handles nonfinite sampling options without unbounded work", async () => {
  const chart = createOrderBookHeatmap(mount(), {
    renderer: "canvas2d",
    history: Infinity,
    depth: Infinity,
    interval: 100,
    maxColumns: 4,
  });
  for (let t = 1000; t <= 3000; t += 100) chart.setBook(book(t));
  await chart.ready;
  await frame();
  const available = chart.getView().availableTime!;
  expect(available[0]).toBeGreaterThanOrEqual(2500);
  chart.destroy();
});

it("keeps raw liquidity while intensity filtering changes only uploaded colors", async () => {
  const options = {
    renderer: "canvas2d" as const,
    interval: 100,
    maxSize: 6,
    colors: ["#000000", "#ffffff"],
    legend: false,
  };
  const chart = createOrderBookHeatmap(mount(), options);
  chart.setBook(book(1000));
  chart.setBook(book(2000));
  chart.setView({ time: [1100, 1800], price: [95, 105] });
  await chart.ready;
  await frame();
  const upload = () =>
    calls.filter((c) => c.name === "putImageData").slice(-1)[0]!.args[0] as {
      data: Uint8ClampedArray;
    };
  const before = upload().data.slice();
  chart.setOptions({ ...options, intensityRange: [0, 0] });
  await frame();
  const after = upload().data;
  expect(before.some((v, i) => i % 4 !== 3 && v > 0)).toBe(true);
  expect(after.every((v, i) => i % 4 === 3 || v === 0)).toBe(true);
  expect(chart.getStore().sizeOf("bid", 99)).toBe(4);
  chart.destroy();
});

it("bounds OHLC drawing work and preserves envelopes, updates and typed-array input", () => {
  const candles = createHeatmapCandles();
  const n = 10000;
  const time = Float64Array.from({ length: n }, (_, i) => i * 1000);
  candles.set(
    {
      time,
      open: new Float64Array(n).fill(100),
      high: new Float64Array(n).fill(120),
      low: new Float64Array(n).fill(80),
      close: new Float64Array(n).fill(110),
    },
    5000,
  );
  expect(candles.at(1000)).toBeUndefined();
  const visible = candles.visible(5000000, 9999000, 300);
  expect(visible.length).toBeLessThanOrEqual(102);
  expect(visible[0]).toMatchObject({
    high: 120,
    low: 80,
    open: 100,
    close: 110,
  });
  candles.update(
    { time: 9999000, open: 100, high: 150, low: 80, close: 140 },
    5000,
  );
  expect(candles.visible(5000000, 10000000, 300).slice(-1)[0]).toMatchObject({
    high: 150,
    close: 140,
  });
  candles.update(
    { time: Infinity, open: 100, high: 150, low: 80, close: 140 },
    5000,
  );
  expect(candles.last()!.time).toBe(9999000);
});

it("fits price on a time-only manual view set before the first draw", async () => {
  const chart = createOrderBookHeatmap(mount(), { renderer: "canvas2d" });
  chart.setBook(book(1000));
  chart.setBook(book(2000));
  chart.setView({ time: [1100, 1800] });
  await chart.ready;
  await frame();
  expect(chart.getView().view.price[1]).toBeGreaterThan(100);
  chart.destroy();
});

it("does not stretch candles or hover OHLC across missing intervals", () => {
  const candles = createHeatmapCandles();
  candles.set(
    [0, 1000, 60000].map((time) => ({
      time,
      open: 100,
      high: 102,
      low: 99,
      close: 101,
    })),
    100,
  );
  expect(candles.at(10000)).toBeUndefined();
  expect(candles.at(62000)).toBeUndefined();
  expect(candles.at(1500)?.time).toBe(1000);
  const bars = candles.visible(0, 62000, 1000);
  expect(bars[1].end).toBe(2000);
  expect(bars[2].end).toBe(61000);
  const grouped = candles.visible(0, 62000, 6);
  expect(grouped[0].end).toBe(2000);
  expect(grouped[1].end).toBe(61000);
});

it("uses a newer bar close ahead of stale trades but retains same-bar trade precedence", async () => {
  const chart = createOrderBookHeatmap(mount(), {
    renderer: "canvas2d",
    bubbles: false,
    bestLines: false,
    profile: false,
    legend: false,
  });
  chart.setBook(book(1000));
  chart.setBook(book(5000));
  chart.addTrades({ time: 1500, price: 102.37, size: 1, side: "buy" });
  chart.setBars([{ time: 3000, open: 100, high: 104, low: 99, close: 103.29 }]);
  chart.setView({ time: [1000, 5000], price: [95, 105] });
  await chart.ready;
  await frame();
  expect(
    calls.some((c) => c.name === "fillText" && Number(c.args[0]) === 103.29),
  ).toBe(true);
  chart.addTrades({ time: 3500, price: 102.37, size: 1, side: "buy" });
  calls.length = 0;
  await frame();
  expect(
    calls.some((c) => c.name === "fillText" && Number(c.args[0]) === 102.37),
  ).toBe(true);
  chart.destroy();
});

it("initializes time for a price-only manual view before the first draw", async () => {
  const chart = createOrderBookHeatmap(mount(), { renderer: "canvas2d" });
  chart.setBook(book(1000));
  chart.setBook(book(2000));
  chart.setView({ price: [95, 105] });
  await chart.ready;
  await frame();
  const view = chart.getView().view;
  expect(view.price).toEqual([95, 105]);
  expect(view.follow).toBe(false);
  expect(view.time[1]).toBeGreaterThanOrEqual(2000);
  expect(view.time[0]).toBeLessThan(2000);
  chart.destroy();
});

it("initializes manual price-only time when book data arrives after an empty draw", async () => {
  const chart = createOrderBookHeatmap(mount(), { renderer: "canvas2d" });
  chart.setView({ price: [95, 105] });
  await chart.ready;
  await frame();
  chart.setBook(book(1000));
  chart.setBook(book(2000));
  await frame();
  const view = chart.getView().view;
  expect(view.price).toEqual([95, 105]);
  expect(view.follow).toBe(false);
  expect(view.time[1]).toBeGreaterThanOrEqual(2000);
  expect(view.time[1]).toBeLessThan(3000);
  expect(view.time[0]).toBeLessThan(2000);
  chart.destroy();
});
