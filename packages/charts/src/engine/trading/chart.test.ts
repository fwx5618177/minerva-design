import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTradingChart } from "./chart";
import type {
  TradingBar,
  TradingChartInstance,
  TradingChartOptions,
  TradingDrawing,
  TradingOrderMoveEvent,
} from "./types";

const WIDTH = 800;
const HEIGHT = 400;
const HOUR = 3_600_000;
const START = Date.UTC(2024, 0, 1);

let container: HTMLDivElement;
let chart: TradingChartInstance | null = null;
let calls: Record<string, number>;

/** A 2D context recording its calls (happy-dom has no canvas) */
const fakeContext = () =>
  new Proxy({} as Record<string | symbol, unknown>, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      if (key === "getImageData")
        return () => ({ data: new Uint8ClampedArray(4) });
      return () => {
        calls[String(key)] = (calls[String(key)] ?? 0) + 1;
      };
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;

const bars = (count: number, from = 0): TradingBar[] =>
  Array.from({ length: count }, (_, k) => {
    const i = k + from;
    const close = 100 + Math.sin(i / 7) * 10 + i * 0.05;
    return {
      time: START + i * HOUR,
      open: close - 0.5,
      high: close + 1.25,
      low: close - 1.5,
      close,
      volume: 1000 + (i % 10) * 50,
    };
  });

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

const mount = async (options: TradingChartOptions) => {
  chart = createTradingChart(container, options);
  await chart.ready;
  await nextFrame();
  return chart;
};

const root = () =>
  container.querySelector<HTMLDivElement>(".minerva-trading-chart")!;

const pointer = (type: string, x: number, y: number) =>
  root().dispatchEvent(
    new PointerEvent(type, {
      clientX: x,
      clientY: y,
      bubbles: true,
      pointerId: 1,
      button: 0,
      pointerType: "mouse",
    }),
  );

beforeEach(() => {
  calls = {};
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(WIDTH);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
    HEIGHT,
  );
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) =>
    kind === "2d"
      ? fakeContext()
      : null) as unknown as HTMLCanvasElement["getContext"]);
  container = document.createElement("div");
  document.body.appendChild(container);
  document.documentElement.lang = "en";
});

afterEach(() => {
  chart?.destroy();
  chart = null;
  container.remove();
  document.documentElement.lang = "";
  vi.restoreAllMocks();
});

describe("createTradingChart", () => {
  it("mounts an accessible, focusable chart drawn with the fallback backend", async () => {
    const c = await mount({ bars: bars(200), symbol: "BTC/USDT" });
    expect(c.getRenderer()).toBe("canvas2d");
    expect(root().getAttribute("aria-label")).toBe("BTC/USDT price chart");
    expect(root().tabIndex).toBe(0);
    expect(root().querySelector(".minerva-chart-data")).not.toBeNull();
    // candles were drawn
    expect(calls.rect ?? 0).toBeGreaterThan(50);
    expect(c.getBarCount()).toBe(200);
    expect(c.getBar(199)?.close).toBeCloseTo(bars(200)[199].close);
  });

  it("shows the OHLC values and indicator legends that toggle", async () => {
    const c = await mount({
      bars: bars(200),
      symbol: "BTC",
      timeframe: "1H",
      indicators: [{ type: "ma", period: 7 }, { type: "macd" }],
    });
    const text = root().textContent ?? "";
    expect(text).toContain("BTC · 1H");
    expect(text).toContain("MA7");
    expect(text).toContain("MACD 12 26 9");
    const toggles: { id: string; visible: boolean }[] = [];
    c.on("indicatorToggle", (e) => toggles.push(e));
    const button = [...root().querySelectorAll("button")].find(
      (b) => b.textContent === "MA7",
    )!;
    button.click();
    expect(toggles).toEqual([{ id: "ma:7", visible: false }]);
    expect(button.getAttribute("aria-pressed")).toBe("false");
  });

  it("streams bars: same time replaces, newer appends and keeps the latest bar in view", async () => {
    const c = await mount({ bars: bars(100) });
    const before = c.getVisibleRange();
    const last = bars(100)[99];
    c.update({ ...last, close: last.close + 5, high: last.high + 5 });
    expect(c.getBarCount()).toBe(100);
    expect(c.getBar(99)?.close).toBeCloseTo(last.close + 5);
    c.update({ ...last, time: last.time + HOUR });
    expect(c.getBarCount()).toBe(101);
    await nextFrame();
    expect(c.getVisibleRange().to).toBeCloseTo(before.to + 1);
  });

  it("treats a longer bars prop with the same history as streaming", async () => {
    const c = await mount({ bars: bars(100) });
    c.setVisibleRange({ from: 20, to: 60 });
    const range = c.getVisibleRange();
    c.setOptions({ bars: bars(101) });
    await nextFrame();
    // the last bar was out of view: the view stays
    expect(c.getVisibleRange().to).toBeCloseTo(range.to);
    expect(c.getBarCount()).toBe(101);
  });

  it("prepends history and asks for more at the left edge", async () => {
    const c = await mount({ bars: bars(100, 100) });
    const requests: number[] = [];
    c.on("historyRequest", (e) => requests.push(e.count));
    c.setVisibleRange({ from: -5, to: 40 });
    await nextFrame();
    expect(requests).toEqual([100]);
    const range = c.getVisibleRange();
    c.prependBars(bars(100));
    expect(c.getBarCount()).toBe(200);
    expect(c.getVisibleRange().to).toBeCloseTo(range.to + 100);
  });

  it("creates a drawing and goes back to the cursor", async () => {
    const c = await mount({ bars: bars(100) });
    const changes: (readonly TradingDrawing[])[] = [];
    c.on("drawingsChange", (d) => changes.push(d));
    c.setDrawingTool("horizontalLine");
    pointer("pointerdown", 300, 150);
    pointer("pointerup", 300, 150);
    expect(changes).toHaveLength(1);
    expect(changes[0][0].type).toBe("horizontalLine");
    expect(c.getDrawingTool()).toBe("cursor");
    // two-point tools: drag from one point to the other
    c.setDrawingTool("trendLine");
    pointer("pointerdown", 200, 100);
    pointer("pointermove", 400, 200);
    pointer("pointerup", 400, 200);
    expect(c.getDrawings()).toHaveLength(2);
    const trend = c.getDrawings()[1];
    expect(trend.points[1].time).toBeGreaterThan(trend.points[0].time);
    // delete with the keyboard
    root().dispatchEvent(
      new KeyboardEvent("keydown", { key: "Delete", bubbles: true }),
    );
    expect(c.getDrawings()).toHaveLength(1);
  });

  it("drags an order line and reports its new price", async () => {
    const c = await mount({
      bars: bars(100),
      priceLines: [{ id: "o1", price: 100, kind: "order", draggable: true }],
    });
    const moves: TradingOrderMoveEvent[] = [];
    c.on("orderMove", (e) => moves.push(e));
    // find the line: scan the plot for the cursor change
    let y = -1;
    for (let yy = 10; yy < 360; yy++) {
      pointer("pointermove", 300, yy);
      if (root().style.cursor === "ns-resize") {
        y = yy;
        break;
      }
    }
    expect(y).toBeGreaterThan(0);
    pointer("pointerdown", 300, y);
    pointer("pointermove", 300, y - 40);
    pointer("pointerup", 300, y - 40);
    expect(moves).toHaveLength(1);
    expect(moves[0].id).toBe("o1");
    expect(moves[0].previousPrice).toBe(100);
    expect(moves[0].price).toBeGreaterThan(100);
  });

  it("moves a keyboard crosshair and announces the bar", async () => {
    const c = await mount({ bars: bars(50) });
    const moves: (number | null)[] = [];
    c.on("crosshairMove", (e) => moves.push(e ? e.index : null));
    root().dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );
    await nextFrame();
    expect(moves[moves.length - 1]).toBe(48);
    expect(root().querySelector("[aria-live]")?.textContent).toMatch(
      /: open .+, high .+, low .+, close /,
    );
  });

  it("writes its texts in the page language, overridable by locale and labels", async () => {
    document.documentElement.lang = "zh-CN";
    const c = await mount({
      bars: bars(200).map((b) => ({ ...b, volume: 123_456 })),
      symbol: "BTC",
      indicators: [{ type: "volume" }],
    });
    expect(root().getAttribute("aria-label")).toBe("BTC 价格图表");
    let text = root().textContent ?? "";
    expect(text).toContain("开");
    expect(text).toContain("涨跌幅");
    expect(text).toContain("成交量");
    expect(text).toContain("12.35万");
    // the page language changes
    document.documentElement.lang = "ja";
    await nextFrame();
    expect(root().getAttribute("aria-label")).toBe("BTC 価格チャート");
    expect(root().textContent).toContain("出来高");
    // an explicit locale and overrides win
    c.setOptions({
      bars: bars(10),
      symbol: "BTC",
      locale: "fr-FR",
      labels: { chart: "Cours {symbol}" },
    });
    await nextFrame();
    expect(root().getAttribute("aria-label")).toBe("Cours BTC");
    text = root().textContent ?? "";
    expect(text).toContain("Var.");
  });

  it("draws a large history through the aggregated levels", async () => {
    const n = 200_000;
    const time = new Float64Array(n);
    const close = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      time[i] = START + i * 60_000;
      close[i] = 100 + Math.sin(i / 500) * 20;
    }
    const c = await mount({
      bars: {
        time,
        open: close,
        high: close.map((v) => v + 1),
        low: close.map((v) => v - 1),
        close,
      },
      indicators: [{ type: "ema", period: 50 }],
    });
    c.fitContent();
    const start = performance.now();
    await nextFrame();
    expect(performance.now() - start).toBeLessThan(1000);
    const range = c.getVisibleRange();
    expect(range.from).toBeLessThan(10);
    expect(range.to).toBeGreaterThan(n - 1);
  });
});
