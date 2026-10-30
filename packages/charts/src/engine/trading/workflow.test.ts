import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTradingChart } from "./chart";
import { syncCharts } from "./sync";
import type {
  TradingBar,
  TradingChartInstance,
  TradingChartOptions,
  TradingCrosshairEvent,
  TradingDrawing,
  TradingOrderCancelEvent,
  TradingOrderCreateEvent,
  TradingReplayState,
  TradingUndoState,
} from "./types";

const WIDTH = 800;
const HEIGHT = 400;
const HOUR = 3_600_000;
const START = Date.UTC(2024, 0, 1);

let containers: HTMLDivElement[] = [];
let charts: TradingChartInstance[] = [];
let calls: Record<string, number>;

const fakeContext = () =>
  new Proxy({} as Record<string | symbol, unknown>, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      return () => {
        calls[String(key)] = (calls[String(key)] ?? 0) + 1;
      };
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;

const bars = (count: number): TradingBar[] =>
  Array.from({ length: count }, (_, i) => {
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

const frames = async (count = 2) => {
  for (let i = 0; i < count; i++) await nextFrame();
};

const mount = async (options: TradingChartOptions) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const chart = createTradingChart(container, options);
  charts.push(chart);
  await chart.ready;
  await nextFrame();
  const root = container.querySelector<HTMLDivElement>(
    ".minerva-trading-chart",
  )!;
  const send = (
    type: string,
    x: number,
    y: number,
    init: PointerEventInit = {},
  ) =>
    root.dispatchEvent(
      new PointerEvent(type, {
        clientX: x,
        clientY: y,
        bubbles: true,
        pointerId: 1,
        button: 0,
        pointerType: "mouse",
        ...init,
      }),
    );
  const click = (x: number, y: number) => {
    send("pointerdown", x, y);
    send("pointerup", x, y);
  };
  const drag = (x0: number, y0: number, x1: number, y1: number) => {
    send("pointerdown", x0, y0);
    send("pointermove", (x0 + x1) / 2, (y0 + y1) / 2);
    send("pointermove", x1, y1);
    send("pointerup", x1, y1);
  };
  /** Width of the plot (the data canvas covers it) */
  const plotWidth = () =>
    parseFloat(
      root.querySelector<HTMLCanvasElement>(".minerva-chart-data")!.style.width,
    );
  return { chart, root, send, click, drag, plotWidth };
};

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
  document.documentElement.lang = "en";
});

afterEach(() => {
  charts.forEach((chart) => chart.destroy());
  charts = [];
  containers.forEach((container) => container.remove());
  containers = [];
  document.documentElement.lang = "";
  vi.restoreAllMocks();
});

describe("drawings: history, tools and toolbar", () => {
  it("undoes and redoes drawings, from the API and the keyboard", async () => {
    const { chart, root, drag } = await mount({ bars: bars(200) });
    const changes: (readonly TradingDrawing[])[] = [];
    const undo: TradingUndoState[] = [];
    chart.on("drawingsChange", (d) => changes.push(d));
    chart.on("undoChange", (s) => undo.push(s));
    chart.setDrawingTool("trendLine");
    drag(100, 80, 300, 150);
    expect(chart.getDrawings()).toHaveLength(1);
    expect(chart.getUndoState()).toEqual({ canUndo: true, canRedo: false });
    chart.undo();
    expect(chart.getDrawings()).toHaveLength(0);
    expect(chart.getUndoState()).toEqual({ canUndo: false, canRedo: true });
    root.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Z", ctrlKey: true, shiftKey: true }),
    );
    expect(chart.getDrawings()).toHaveLength(1);
    root.dispatchEvent(
      new KeyboardEvent("keydown", { key: "z", metaKey: true }),
    );
    expect(chart.getDrawings()).toHaveLength(0);
    root.dispatchEvent(
      new KeyboardEvent("keydown", { key: "y", ctrlKey: true }),
    );
    expect(chart.getDrawings()).toHaveLength(1);
    expect(changes.map((d) => d.length)).toEqual([1, 0, 1, 0, 1]);
    expect(undo.length).toBeGreaterThanOrEqual(2);

    // restyling is undoable too
    const id = chart.getDrawings()[0].id;
    chart.updateDrawing(id, { color: "#f00", lineWidth: 3 });
    expect(chart.getDrawings()[0]).toMatchObject({
      color: "#f00",
      lineWidth: 3,
    });
    chart.undo();
    expect(chart.getDrawings()[0].color).toBeUndefined();
    chart.updateDrawing("nope", { color: "#0f0" });
    expect(chart.getDrawings()[0].color).toBeUndefined();
  });

  it("makes channels and pitchforks with three clicks", async () => {
    const { chart, click, send } = await mount({ bars: bars(200) });
    chart.setDrawingTool("parallelChannel");
    click(100, 200);
    send("pointermove", 250, 150);
    click(250, 150);
    expect(chart.getDrawings()).toHaveLength(0);
    send("pointermove", 180, 100);
    click(180, 100);
    const [channel] = chart.getDrawings();
    expect(channel.type).toBe("parallelChannel");
    expect(channel.points).toHaveLength(3);
    expect(channel.points[2].price).toBeGreaterThan(channel.points[1].price);
    expect(chart.getDrawingTool()).toBe("cursor");

    // a drag fixes the first two anchors of a pitchfork
    chart.setDrawingTool("pitchfork");
    send("pointerdown", 120, 150);
    send("pointermove", 260, 100);
    send("pointerup", 260, 100);
    send("pointermove", 260, 220);
    click(260, 220);
    expect(chart.getDrawings()[1]).toMatchObject({ type: "pitchfork" });
    expect(chart.getDrawings()[1].points).toHaveLength(3);
  });

  it("places positions with a target and a stop in one click", async () => {
    const { chart, click } = await mount({ bars: bars(200), precision: 2 });
    chart.setDrawingTool("longPosition");
    click(400, 120);
    const [long] = chart.getDrawings();
    const [entry, target, stop] = long.points;
    expect(target.price).toBeGreaterThan(entry.price);
    expect(stop.price).toBeLessThan(entry.price);
    // a reward twice the risk
    expect(
      (target.price - entry.price) / (entry.price - stop.price),
    ).toBeCloseTo(2, 0);
    expect(target.time).toBeGreaterThan(entry.time);
    chart.setDrawingTool("shortPosition");
    click(400, 120);
    const short = chart.getDrawings()[1];
    expect(short.points[1].price).toBeLessThan(short.points[0].price);
    await frames();
    expect(calls.fillText ?? 0).toBeGreaterThan(0);
  });

  it("edits text notes in place; an empty or cancelled note is not kept", async () => {
    const { chart, root, click } = await mount({ bars: bars(200) });
    chart.setDrawingTool("text");
    click(300, 100);
    const editor = root.querySelector("textarea")!;
    expect(editor.style.display).toBe("block");
    editor.value = "Breakout";
    editor.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(editor.style.display).toBe("none");
    expect(chart.getDrawings()[0]).toMatchObject({
      type: "text",
      text: "Breakout",
    });
    // a single undo step removes it
    chart.undo();
    expect(chart.getDrawings()).toHaveLength(0);
    chart.redo();

    chart.setDrawingTool("text");
    click(320, 140);
    expect(chart.getDrawings()).toHaveLength(2);
    root
      .querySelector("textarea")!
      .dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(chart.getDrawings()).toHaveLength(1);

    // double-click edits an existing note
    await frames();
    const id = chart.getDrawings()[0].id;
    chart.selectDrawing(id);
    root.dispatchEvent(
      new MouseEvent("dblclick", { clientX: 305, clientY: 105, bubbles: true }),
    );
    expect(editor.style.display).toBe("block");
    expect(editor.value).toBe("Breakout");
    editor.value = "Retest";
    editor.dispatchEvent(new Event("blur"));
    expect(chart.getDrawings()[0].text).toBe("Retest");
  });

  it("draws on indicator panes too", async () => {
    const { chart, click } = await mount({
      bars: bars(200),
      indicators: [{ type: "rsi" }],
    });
    chart.setDrawingTool("horizontalLine");
    // the RSI pane is under the price pane (372 px of plot, 110 for RSI)
    click(300, 320);
    const [line] = chart.getDrawings();
    expect(line.pane).toBe("rsi:14");
    expect(line.points[0].price).toBeGreaterThan(0);
    expect(line.points[0].price).toBeLessThan(100);
    await frames();
  });

  it("restyles, locks and deletes the selected drawing from its toolbar", async () => {
    const { chart, root } = await mount({
      bars: bars(200),
      drawings: [
        {
          id: "box",
          type: "rectangle",
          points: [
            { time: START + 120 * HOUR, price: 100 },
            { time: START + 160 * HOUR, price: 106 },
          ],
        },
      ],
    });
    chart.selectDrawing("box");
    await frames();
    const toolbar = root.querySelector<HTMLDivElement>(
      ".minerva-trading-toolbar",
    )!;
    expect(toolbar.style.display).toBe("flex");
    const button = (label: string) =>
      [...toolbar.querySelectorAll("button")].find((b) =>
        b.getAttribute("aria-label")?.startsWith(label),
      )!;
    button("Line style").click();
    expect(chart.getDrawings()[0].lineStyle).toBe("dashed");
    await frames();
    button("Line width").click();
    expect(chart.getDrawings()[0].lineWidth).toBe(2);
    await frames();
    button("Fill").click();
    expect(chart.getDrawings()[0].fill).toBe(false);
    await frames();
    button("Color").click();
    const swatch = button("Color #f23645");
    swatch.click();
    expect(chart.getDrawings()[0].color).toBe("#f23645");
    await frames();
    button("Lock").click();
    expect(chart.getDrawings()[0].locked).toBe(true);
    await frames();
    // a locked drawing only offers to unlock
    expect(button("Delete")).toBeUndefined();
    button("Lock").click();
    await frames();
    button("Delete").click();
    expect(chart.getDrawings()).toHaveLength(0);
    await frames();
    expect(toolbar.style.display).toBe("none");
  });
});

describe("bar replay", () => {
  it("hides the later bars, steps, plays and restores them", async () => {
    const all = bars(200);
    const { chart } = await mount({ bars: all });
    const states: TradingReplayState[] = [];
    chart.on("replayChange", (s) => states.push(s));
    chart.startReplay(all[99].time);
    expect(chart.getBarCount()).toBe(100);
    expect(chart.getReplayState()).toMatchObject({
      active: true,
      index: 100,
      total: 200,
    });
    chart.replayStep(5);
    expect(chart.getBarCount()).toBe(105);
    // the stream goes on behind the replay
    chart.update({ ...all[199], time: all[199].time + HOUR });
    expect(chart.getBarCount()).toBe(105);
    expect(chart.getReplayState().total).toBe(201);
    chart.replayPlay(200);
    expect(chart.getReplayState().playing).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 80));
    chart.replayPause();
    expect(chart.getReplayState().playing).toBe(false);
    expect(chart.getBarCount()).toBeGreaterThan(105);
    chart.stopReplay();
    expect(chart.getBarCount()).toBe(201);
    expect(chart.getReplayState().active).toBe(false);
    expect(states.length).toBeGreaterThan(4);
  });

  it("lets the user pick the first bar", async () => {
    const { chart, click, send } = await mount({ bars: bars(200) });
    chart.startReplay();
    expect(chart.getReplayState().picking).toBe(true);
    send("pointermove", 300, 100);
    await frames();
    click(300, 100);
    const state = chart.getReplayState();
    expect(state.active).toBe(true);
    expect(state.index).toBeGreaterThan(50);
    expect(state.index).toBeLessThan(200);
    // a new bars option ends the replay
    chart.setOptions({ bars: bars(150) });
    expect(chart.getReplayState().active).toBe(false);
    expect(chart.getBarCount()).toBe(150);
  });
});

describe("layouts", () => {
  it("shows a crosshair set from outside without reporting it", async () => {
    const all = bars(200);
    const { chart, root } = await mount({ bars: all, symbol: "X" });
    const moves: (TradingCrosshairEvent | null)[] = [];
    chart.on("crosshairMove", (e) => moves.push(e));
    chart.setCrosshair(all[150].time);
    await frames();
    expect(root.textContent).toContain(all[150].close.toFixed(2));
    expect(moves).toEqual([]);
    chart.setCrosshair(null);
    await frames();
  });

  it("syncCharts shares the crosshair time and the visible time range", async () => {
    const a = await mount({ bars: bars(300) });
    const b = await mount({ bars: bars(300) });
    const spy = vi.spyOn(b.chart, "setCrosshair");
    const stop = syncCharts([a.chart, b.chart]);
    a.send("pointermove", 300, 100);
    await frames();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[spy.mock.calls.length - 1]?.[0]).toBeGreaterThan(
      START,
    );
    a.chart.setVisibleRange({ from: 50, to: 150 });
    await frames(3);
    const ra = a.chart.getVisibleTimeRange();
    const rb = b.chart.getVisibleTimeRange();
    expect(rb.from).toBeCloseTo(ra.from, -3);
    expect(rb.to).toBeCloseTo(ra.to, -3);
    stop();
    a.chart.setVisibleRange({ from: 100, to: 200 });
    await frames(3);
    expect(b.chart.getVisibleTimeRange().from).toBeCloseTo(ra.from, -3);
  });

  it("converts visible time ranges, between and beyond the bars", async () => {
    const { chart } = await mount({ bars: bars(200) });
    chart.setVisibleTimeRange({
      from: START + 20.5 * HOUR,
      to: START + 250 * HOUR,
    });
    await frames();
    const range = chart.getVisibleRange();
    expect(range.from).toBeCloseTo(20.5, 1);
    expect(range.to).toBeCloseTo(250, 1);
  });
});

describe("orders on the chart", () => {
  it("creates a limit order from the + of the price axis", async () => {
    const { chart, send, click, plotWidth } = await mount({
      bars: bars(200),
      orderEntry: true,
      crosshair: "free",
      precision: 2,
    });
    const created: TradingOrderCreateEvent[] = [];
    chart.on("orderCreate", (e) => created.push(e));
    const x = plotWidth() - 12;
    send("pointermove", x, 60);
    await frames(3);
    click(x, 60);
    expect(created).toHaveLength(1);
    expect(created[0].side).toBe("sell");
    expect(Number(created[0].price.toFixed(2))).toBe(created[0].price);
    send("pointermove", x, 250);
    await frames(3);
    click(x, 250);
    expect(created[1]?.side).toBe("buy");
  });

  it("cancels a cancellable line from its close button", async () => {
    const options: TradingChartOptions = { bars: bars(200), crosshair: "free" };
    const { chart, send, click, plotWidth } = await mount(options);
    const prices: number[] = [];
    chart.on("crosshairMove", (e) => e && prices.push(e.price));
    send("pointermove", 100, 100);
    await frames();
    const price = prices[prices.length - 1];
    chart.setOptions({
      ...options,
      priceLines: [{ id: "o1", kind: "order", price, cancellable: true }],
    });
    await frames();
    const cancelled: TradingOrderCancelEvent[] = [];
    chart.on("orderCancel", (e) => cancelled.push(e));
    // label: "Limit" (5 × 6 + 12 px) then the 20 px close button
    const left = Math.round(plotWidth() - 62 - 56);
    send("pointermove", left + 52, 100);
    await frames(3);
    click(left + 52, 100);
    expect(cancelled.map((e) => e.id)).toEqual(["o1"]);
  });
});

describe("image and full screen", () => {
  it("composes every layer into one image", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(
      "data:image/png;base64,AAAA",
    );
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(
      function (this: HTMLCanvasElement, callback: BlobCallback) {
        callback(new Blob(["x"], { type: "image/png" }));
      },
    );
    const { chart } = await mount({
      bars: bars(200),
      indicators: [{ type: "ma", period: 7 }],
      symbol: "X",
    });
    calls = {};
    expect(chart.toDataURL()).toBe("data:image/png;base64,AAAA");
    expect(calls.drawImage ?? 0).toBeGreaterThanOrEqual(3);
    // the legends are written as text
    expect(calls.fillText ?? 0).toBeGreaterThan(5);
    const blob = await chart.toBlob();
    expect(blob?.type).toBe("image/png");
  });

  it("enters and leaves full screen", async () => {
    const { chart, root } = await mount({ bars: bars(50) });
    const request = vi.fn(async () => undefined);
    const exit = vi.fn(async () => undefined);
    root.requestFullscreen = request;
    document.exitFullscreen = exit;
    const events: boolean[] = [];
    chart.on("fullscreenChange", (full) => events.push(full));
    await chart.requestFullscreen();
    expect(request).toHaveBeenCalled();
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => root,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    expect(chart.isFullscreen()).toBe(true);
    await chart.exitFullscreen();
    expect(exit).toHaveBeenCalled();
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      get: () => null,
    });
    document.dispatchEvent(new Event("fullscreenchange"));
    expect(events).toEqual([true, false]);
  });
});

describe("time zones, sessions and the volume profile", () => {
  it("writes times in the time zone, unless a UTC offset is given", async () => {
    const { chart, root } = await mount({
      bars: bars(200),
      timeZone: "Asia/Shanghai",
      sessionBreaks: true,
    });
    const live = () => root.querySelector("[aria-live]")!.textContent ?? "";
    root.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    // bar 198 opens at 06:00 UTC: 14:00 in Shanghai
    expect(live()).toContain("14:00");
    chart.setOptions({
      bars: bars(200),
      utcOffset: 0,
      timeZone: "Asia/Shanghai",
    });
    root.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    expect(live()).toMatch(/0[56]:00/);
    await frames();
  });

  it("draws the volume profile of the visible bars", async () => {
    await mount({ bars: bars(200), volumeProfile: { rows: 30 } });
    const plain = calls.fillRect ?? 0;
    calls = {};
    const other = await mount({ bars: bars(200) });
    await frames();
    expect(plain).toBeGreaterThan((calls.fillRect ?? 0) + 30);
    other.chart.setOptions({ bars: bars(200), volumeProfile: true });
    await frames();
  });
});

describe("new indicators in the legends", () => {
  it("titles them, localized where they are words", async () => {
    const indicators: TradingChartOptions["indicators"] = [
      { type: "psar" },
      { type: "ichimoku" },
      { type: "supertrend" },
      { type: "keltner" },
      { type: "donchian" },
      { type: "obv" },
      { type: "cci" },
      { type: "stochRsi" },
      { type: "dmi" },
      { type: "williamsR" },
      { type: "mfi" },
    ];
    const { chart, root } = await mount({ bars: bars(300), indicators });
    const text = root.textContent ?? "";
    for (const title of [
      "SAR 0.02 0.02 0.2",
      "Ichimoku 9 26 52 26",
      "SuperTrend 10 3",
      "KC 20 2 10",
      "DC 20",
      "OBV",
      "CCI 20",
      "Stoch RSI 14 14 3 3",
      "DMI 14 14",
      "+DI",
      "%R 14",
      "MFI 14",
    ])
      expect(text).toContain(title);
    document.documentElement.lang = "zh-CN";
    await frames();
    expect(root.textContent).toContain("一目均衡表 9 26 52 26");
    expect(root.textContent).toContain("超级趋势 10 3");
    chart.setOptions({ bars: bars(300), indicators, barSpacing: 0.3 });
    await frames();
  });

  it("draws zoomed-out indicators with the range of each pixel column", async () => {
    const { chart } = await mount({
      bars: bars(6000),
      barSpacing: 0.15,
      indicators: [
        { type: "macd" },
        { type: "ichimoku" },
        { type: "psar" },
        { type: "boll" },
      ],
      compare: [
        {
          name: "Y",
          data: bars(6000).map((b) => ({ time: b.time, value: b.close * 2 })),
        },
      ],
      scaleMode: "percent",
    });
    await frames();
    const range = chart.getVisibleRange();
    expect(range.to - range.from).toBeGreaterThan(3000);
    chart.update({ ...bars(6001)[6000] });
    await frames();
    expect(chart.getBarCount()).toBe(6001);
  });
});
