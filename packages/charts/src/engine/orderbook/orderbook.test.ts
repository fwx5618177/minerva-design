import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  applyDeltas,
  createOrderBookStore,
  decimalsOf,
  groupPrice,
  inferPriceDecimals,
  inferSizeDecimals,
  inferTickSize,
} from "./book";
import { createDepthChart } from "./depth";
import {
  createFormatters,
  formatClock,
  formatCompactNumber,
  sideColors,
} from "./format";
import { createOrderBookHeatmap, heatIntensity } from "./heatmap";
import { createOrderBook } from "./ladder";
import { createTimeAndSales } from "./tape";
import { readTheme } from "../theme";
import { setDefaultChartRenderer } from "../defaults";
import type { MarketTrade } from "./types";

/** 2D context double recording the texts drawn */
const fakeContext = () => {
  const texts: string[] = [];
  const state: Record<string, unknown> = {};
  const ctx = new Proxy(state, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      if (key === "fillText")
        return (text: string) => {
          texts.push(text);
        };
      return () => {};
    },
    set(target, key: string, value) {
      target[key] = value;
      return true;
    },
  });
  return { ctx, texts };
};

let texts: string[] = [];

beforeEach(() => {
  const fake = fakeContext();
  texts = fake.texts;
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) => (kind === "2d" ? fake.ctx : null)) as never);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(400);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.textContent = "";
});

const frame = () => new Promise<void>((resolve) => setTimeout(resolve, 40));

const mount = () => {
  const el = document.createElement("div");
  document.body.appendChild(el);
  return el;
};

const BOOK = {
  bids: [
    [99.5, 3],
    [100, 1],
    [99.9, 2],
  ] as [number, number][],
  asks: [
    [100.2, 4],
    [100.1, 1.5],
    [101, 10],
  ] as [number, number][],
  time: 1000,
};

describe("order book store", () => {
  it("sorts both sides and answers best / mid / spread", () => {
    const store = createOrderBookStore();
    store.setSnapshot(BOOK);
    expect(store.count("bid")).toBe(3);
    expect(store.priceAt("bid", 0)).toBe(100);
    expect(store.priceAt("bid", 2)).toBe(99.5);
    expect(store.priceAt("ask", 0)).toBe(100.1);
    expect(store.bestBid()).toBe(100);
    expect(store.bestAsk()).toBe(100.1);
    expect(store.mid()).toBeCloseTo(100.05);
    expect(store.spread()).toBeCloseTo(0.1);
    expect(store.sizeOf("ask", 101)).toBe(10);
    expect(store.time()).toBe(1000);
  });

  it("applies deltas: update, insert, remove", () => {
    const store = createOrderBookStore();
    store.setSnapshot(BOOK);
    const version = store.version();
    expect(
      applyDeltas(store, [{ bids: [[100, 0]] }, { bids: [[99.95, 7]] }]),
    ).toBe(true);
    // columns work too
    store.applyDelta({ asks: { price: [100.1], size: [2] } });
    expect(store.bestBid()).toBe(99.95);
    expect(store.sizeOf("bid", 100)).toBe(0);
    expect(store.sizeOf("ask", 100.1)).toBe(2);
    expect(store.version()).toBeGreaterThan(version);
    // removing a missing level changes nothing
    expect(store.applyDelta({ bids: [[42, 0]] })).toBe(false);
  });

  it("groups levels by a price step", () => {
    const store = createOrderBookStore();
    store.setSnapshot(BOOK);
    const bids = store.levels("bid", { step: 0.5 });
    expect(Array.from(bids.price)).toEqual([100, 99.5]);
    expect(Array.from(bids.size)).toEqual([1, 5]);
    const asks = store.levels("ask", { step: 1, limit: 1 });
    expect(asks.count).toBe(1);
    expect(asks.price[0]).toBe(101);
    expect(asks.size[0]).toBe(15.5);
  });

  it("keeps the levels closest to the best price", () => {
    const store = createOrderBookStore({ maxLevels: 2 });
    store.setSnapshot(BOOK);
    expect(store.count("bid")).toBe(2);
    expect(store.priceAt("bid", 1)).toBe(99.9);
    expect(store.count("ask")).toBe(2);
    expect(store.priceAt("ask", 1)).toBe(100.2);
  });

  it("infers decimals and tick size", () => {
    const store = createOrderBookStore();
    store.setSnapshot(BOOK);
    expect(inferPriceDecimals(store)).toBe(1);
    expect(inferSizeDecimals(store)).toBe(1);
    expect(inferTickSize(store)).toBeCloseTo(0.1);
    expect(decimalsOf(0.25)).toBe(2);
    expect(decimalsOf(64000)).toBe(0);
    expect(groupPrice(100.07, 0.05, "bid")).toBe(100.05);
    expect(groupPrice(100.07, 0.05, "ask")).toBe(100.1);
    expect(groupPrice(100.1, 0.05, "ask")).toBe(100.1);
  });
});

describe("helpers", () => {
  it("formats prices, sizes and times", () => {
    const fmt = createFormatters({ locale: "en-US" }, 2, 3);
    expect(fmt.price(64000.5)).toBe("64,000.50");
    expect(fmt.size(0.5)).toBe("0.500");
    expect(fmt.price(NaN)).toBe("–");
    const custom = createFormatters({ formatPrice: (p) => `$${p}` }, 2, 3);
    expect(custom.price(1)).toBe("$1");
    expect(formatClock(new Date(2024, 0, 1, 9, 5, 7, 42).getTime())).toBe(
      "09:05:07.042",
    );
    expect(formatClock(0, false)).toMatch(/^\d\d:\d\d:\d\d$/);
    expect(formatClock(Date.UTC(2024, 0, 1, 9, 5, 7, 42), true, "utc")).toBe(
      "09:05:07.042",
    );
    expect(formatClock(Date.UTC(2024, 0, 1, 23, 0, 1), false, "utc")).toBe(
      "23:00:01",
    );
  });

  it("swaps the side colors with the red-up convention", () => {
    const theme = readTheme(document.body);
    const green = sideColors(theme, {});
    const red = sideColors(theme, { colorConvention: "red-up" });
    expect(red.up).toEqual(green.down);
    expect(red.down).toEqual(green.up);
    const custom = sideColors(theme, { upColor: "#0000ff" });
    expect(custom.up).toEqual([0, 0, 1, 1]);
  });

  it("maps sizes to heat intensities", () => {
    expect(heatIntensity(0, 10, "log", 1)).toBe(0);
    expect(heatIntensity(10, 10, "linear", 1)).toBe(1);
    expect(heatIntensity(20, 10, "sqrt", 1)).toBe(1);
    const lin = heatIntensity(1, 10, "linear", 1);
    const sqrt = heatIntensity(1, 10, "sqrt", 1);
    const log = heatIntensity(1, 10, "log", 1);
    expect(lin).toBeCloseTo(0.1);
    expect(sqrt).toBeGreaterThan(lin);
    expect(log).toBeGreaterThan(lin);
    expect(heatIntensity(1, 10, "linear", 2)).toBeCloseTo(0.2);
    expect(heatIntensity(2, 10, "log", 1)).toBeGreaterThan(log);
  });
});

describe("localization", () => {
  afterEach(() => {
    document.documentElement.lang = "";
  });

  it("formats compact numbers in the units of the language", () => {
    expect(formatCompactNumber(12_400, "en-US")).toBe("12.4k");
    expect(formatCompactNumber(1_250_000, "fr-FR")).toBe("1,25 M");
    expect(formatCompactNumber(35_000, "zh-CN")).toBe("3.5万");
    expect(formatCompactNumber(1.5e8, "ja-JP")).toBe("1.5億");
    const zh = createFormatters({ locale: "zh-CN" }, 2, 2);
    expect(zh.total(2_500_000)).toBe("250万");
    expect(zh.notional(123_456)).toBe("12.35万");
    expect(zh.percent(0.0125)).toBe("+1.25%");
    expect(createFormatters({ locale: "fr-FR" }, 2, 2).fixed(1.5, 2)).toBe(
      "1,50",
    );
  });

  it("follows the page language, the locale option and the overrides", async () => {
    document.documentElement.lang = "zh-CN";
    const el = mount();
    const book = createOrderBook(el, { flash: false });
    book.setBook(BOOK);
    await frame();
    expect(texts).toContain("价格");
    expect(texts).toContain("累计");
    expect(el.querySelector('[aria-label="订单簿"]')).not.toBeNull();
    texts.length = 0;
    book.setOptions({
      flash: false,
      locale: "ja-JP",
      labels: { size: "数量 (BTC)" },
    });
    await frame();
    expect(texts).toContain("価格");
    expect(texts).toContain("数量 (BTC)");
    expect(el.querySelector('[aria-label="板情報"]')).not.toBeNull();
    book.destroy();

    const depth = mount();
    const chart = createDepthChart(depth, {});
    chart.setBook(BOOK);
    await frame();
    expect(depth.querySelector('[aria-label="深度图"]')).not.toBeNull();
    expect(texts.some((t) => t.startsWith("中间价"))).toBe(true);
    chart.destroy();

    const tape = mount();
    const sales = createTimeAndSales(tape, { locale: "fr" });
    sales.addTrades({
      time: 1,
      price: 100,
      size: 1,
      side: "buy",
    });
    await frame();
    expect(texts).toContain("Prix");
    expect(
      tape.querySelector('[aria-label="Historique des transactions"]'),
    ).not.toBeNull();
    sales.destroy();
  });
});

describe("depth chart", () => {
  it("draws the book and its mid label, then cleans up", async () => {
    const el = mount();
    const chart = createDepthChart(el, {
      ariaLabel: "Depth",
      locale: "en-US",
    });
    chart.setBook(BOOK);
    chart.applyDeltas({ asks: [[100.1, 0]] });
    await frame();
    expect(el.querySelector('[aria-label="Depth"]')).not.toBeNull();
    // mid of 100 / 100.2
    expect(texts.some((t) => t.includes("100.1"))).toBe(true);
    expect(chart.getStore().bestAsk()).toBe(100.2);
    chart.setRange(0.01);
    expect(chart.getRange()).toBeCloseTo(0.01);
    chart.destroy();
    expect(el.childElementCount).toBe(0);
  });
});

describe("order book ladder", () => {
  it("draws the rows, groups them and emits level clicks", async () => {
    const el = mount();
    const book = createOrderBook(el, { locale: "en-US", flash: false });
    book.setBook(BOOK);
    await frame();
    expect(texts).toContain("100.0");
    expect(texts).toContain("101.0");
    texts.length = 0;
    book.setOptions({ locale: "en-US", flash: false, grouping: 0.5 });
    await frame();
    expect(texts).toContain("99.5");
    expect(texts).not.toContain("99.9");
    const clicks: number[] = [];
    book.on("levelClick", (level) => clicks.push(level.price));
    const root = el.firstElementChild as HTMLElement;
    root.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    await frame();
    root.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(clicks).toEqual([100]);
    book.destroy();
    expect(el.childElementCount).toBe(0);
  });
});

describe("order book heatmap", () => {
  it("builds columns from snapshots and trades", async () => {
    const el = mount();
    const heatmap = createOrderBookHeatmap(el, {
      interval: 100,
      locale: "en-US",
      renderer: "canvas2d",
    });
    for (let i = 0; i < 20; i++) {
      heatmap.setBook({ ...BOOK, time: 1000 + i * 100 });
      heatmap.addTrades({
        time: 1000 + i * 100,
        price: 100.1,
        size: 1,
        side: "buy",
      });
    }
    expect(await heatmap.ready).toBe("canvas2d");
    expect(heatmap.getRenderer()).toBe("canvas2d");
    await frame();
    expect(heatmap.getStore().bestBid()).toBe(100);
    heatmap.resetView();
    heatmap.destroy();
    expect(el.childElementCount).toBe(0);
  });

  it("recreates its heat field when the default renderer switches live", async () => {
    const fake2d = fakeContext().ctx;
    // a WebGL double: every call succeeds
    const gl = new Proxy({} as Record<string, unknown>, {
      get(_target, key: string) {
        if (key === "isContextLost") return () => false;
        if (key === "getExtension") return () => null;
        if (key === "getParameter") return () => "Apple M3";
        if (/^[A-Z_0-9]+$/.test(key)) return key;
        return () => (key.startsWith("get") ? true : {});
      },
    });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
      kind: string,
    ) => (kind === "2d" ? fake2d : kind === "webgl2" ? gl : null)) as never);
    const auto = createOrderBookHeatmap(mount(), { interval: 100 });
    const fixed = createOrderBookHeatmap(mount(), {
      interval: 100,
      renderer: "canvas2d",
    });
    const switches: string[] = [];
    auto.on("renderer", (kind) => switches.push(kind));
    try {
      setDefaultChartRenderer("canvas2d");
      await auto.ready;
      await frame();
      expect(auto.getRenderer()).toBe("canvas2d");
      setDefaultChartRenderer("webgl2");
      await frame();
      expect(auto.getRenderer()).toBe("webgl2");
      setDefaultChartRenderer("canvas2d");
      await frame();
      expect(auto.getRenderer()).toBe("canvas2d");
      expect(switches.slice(-2)).toEqual(["webgl2", "canvas2d"]);
      // one heat field canvas at a time, the old one is removed
      const root = document.querySelectorAll<HTMLElement>(
        ".minerva-orderbook-heatmap",
      )[0]!;
      expect(root.dataset.renderer).toBe("canvas2d");
      expect(root.querySelectorAll("canvas").length).toBe(2);
      // an explicit backend doesn't follow the default
      expect(fixed.getRenderer()).toBe("canvas2d");
    } finally {
      setDefaultChartRenderer("auto");
      auto.destroy();
      fixed.destroy();
    }
  });

  it("draws tags, the profile scale, hovers cells and pans / zooms", async () => {
    const el = mount();
    const heatmap = createOrderBookHeatmap(el, {
      interval: 100,
      locale: "en-US",
      renderer: "canvas2d",
      pricePrecision: 1,
    });
    const hovers: (number | null)[] = [];
    const follows: boolean[] = [];
    heatmap.on("hover", (event) => hovers.push(event ? event.price : null));
    heatmap.on("follow", (follow) => follows.push(follow));
    heatmap.setBook({ ...BOOK, time: 1000 });
    for (let i = 1; i < 30; i++) {
      heatmap.applyDeltas({
        bids: [[99.8, 1 + (i % 3)]],
        asks: [[100.3, 2]],
        time: 1000 + i * 100,
      });
      heatmap.addTrades([
        { time: 1000 + i * 100, price: 100.1, size: 0.5 + i, side: "buy" },
        { time: 1000 + i * 100, price: 100, size: 1, side: "sell" },
      ]);
    }
    await heatmap.ready;
    await frame();
    // best bid / ask tags, the last trade, the price ticks, the size scale
    expect(texts).toContain("100.0");
    expect(texts).toContain("100.1");
    expect(texts).toContain("0");
    const root = el.firstElementChild as HTMLElement;
    root.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 150, clientY: 120 }),
    );
    await frame();
    expect(hovers.length).toBeGreaterThan(0);
    expect(typeof hovers[hovers.length - 1]).toBe("number");
    // the tooltip keeps its full border (no single-side accent)
    const tip = root.querySelector(".minerva-orderbook-tooltip") as HTMLElement;
    expect(tip.style.display).toBe("block");
    expect(tip.style.borderLeft).toBe("");
    // drag: pan (stops following), double click: follow again
    root.dispatchEvent(
      new PointerEvent("pointerdown", { clientX: 150, clientY: 120 }),
    );
    root.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 190, clientY: 130 }),
    );
    root.dispatchEvent(new PointerEvent("pointerup"));
    expect(follows).toEqual([false]);
    root.dispatchEvent(new MouseEvent("dblclick"));
    expect(follows).toEqual([false, true]);
    // dragging the price axis scales the prices; ctrl + wheel zooms
    root.dispatchEvent(
      new PointerEvent("pointerdown", { clientX: 390, clientY: 100 }),
    );
    root.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 390, clientY: 140 }),
    );
    root.dispatchEvent(new PointerEvent("pointerup"));
    root.dispatchEvent(
      new WheelEvent("wheel", { deltaY: 100, ctrlKey: true, clientX: 100 }),
    );
    root.dispatchEvent(
      new WheelEvent("wheel", { deltaY: -100, ctrlKey: true, clientX: 395 }),
    );
    for (const key of ["+", "-", "ArrowUp", "ArrowLeft", "0"])
      root.dispatchEvent(new KeyboardEvent("keydown", { key }));
    root.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", shiftKey: true }),
    );
    expect(follows).toEqual([false, true, false, true]);
    await frame();
    root.dispatchEvent(new PointerEvent("pointerleave"));
    await frame();
    expect(hovers[hovers.length - 1]).toBeNull();
    // light / dark ramps and options updates keep the history
    heatmap.setOptions({
      interval: 100,
      locale: "zh-CN",
      renderer: "canvas2d",
      colors: ["#000000", "#ffffff"],
      profile: false,
      bestLines: false,
      bubbles: false,
    });
    await frame();
    heatmap.clear();
    expect(heatmap.getStore().count("bid")).toBe(0);
    heatmap.destroy();
  });
});

describe("time and sales", () => {
  const trades = (n: number, start = 0): MarketTrade[] =>
    Array.from({ length: n }, (_, i) => ({
      time: 1000 + Math.floor((start + i) / 3),
      price: 100 + ((start + i) % 5) * 0.1,
      size: ((start + i) % 4) + 0.5,
      side: (start + i) % 6 < 3 ? "buy" : "sell",
    }));

  it("keeps a bounded tape and filters / aggregates it", async () => {
    const el = mount();
    const tape = createTimeAndSales(el, { capacity: 1000, locale: "en-US" });
    tape.setTrades(trades(1500));
    expect(tape.getCount()).toBe(1000);
    tape.setOptions({ capacity: 1000, locale: "en-US", minSize: 2 });
    expect(tape.getCount()).toBe(500);
    // trades 3 by 3 share their millisecond and side
    tape.setOptions({ capacity: 1000, locale: "en-US", aggregate: true });
    expect(tape.getCount()).toBe(Math.ceil(1000 / 3));
    tape.clear();
    expect(tape.getCount()).toBe(0);
    tape.addTrades(trades(6));
    expect(tape.getCount()).toBe(2);
    await frame();
    expect(texts).toContain("Price");
    tape.destroy();
    expect(el.childElementCount).toBe(0);
  });

  it("pauses on hover and emits row clicks", async () => {
    const el = mount();
    const tape = createTimeAndSales(el, { locale: "en-US", animate: false });
    tape.setTrades(trades(50));
    await frame();
    const pauses: boolean[] = [];
    const clicks: number[] = [];
    tape.on("pause", (paused) => pauses.push(paused));
    tape.on("tradeClick", (row) => clicks.push(row.index));
    const root = el.firstElementChild as HTMLElement;
    root.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 50, clientY: 35 }),
    );
    tape.addTrades(trades(3, 50));
    await frame();
    expect(texts.some((t) => t.includes("Paused") && t.includes("3 new"))).toBe(
      true,
    );
    root.dispatchEvent(new MouseEvent("click", { clientX: 50, clientY: 35 }));
    // the view did not move: the hovered row is the 4th newest now
    expect(clicks).toEqual([3]);
    root.dispatchEvent(new PointerEvent("pointerleave"));
    expect(pauses).toEqual([true, false]);
    tape.destroy();
  });

  it("handles 100k trades", () => {
    const el = mount();
    const tape = createTimeAndSales(el);
    const t0 = performance.now();
    tape.setTrades(trades(100000));
    tape.addTrades(trades(1000, 100000));
    expect(tape.getCount()).toBe(101000);
    expect(performance.now() - t0).toBeLessThan(2000);
    tape.destroy();
  });
});
