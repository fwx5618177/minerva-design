// The elements of the extended chart set (cartesian / shape presets, the
// trading, order book and 3D entries) with fake engines: option presets,
// data streamed apart from the options (books, trades), engine events
// forwarded as minerva-* events and the instance methods.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Listener = (event: unknown) => void;
interface FakeEngine {
  kind: string;
  options: Record<string, unknown>;
  calls: Array<[string, unknown[]]>;
  fire(type: string, event: unknown): void;
}

const engines: FakeEngine[] = [];
const last = () => engines[engines.length - 1];
const called = (engine: FakeEngine, method: string) =>
  engine.calls.filter(([name]) => name === method).map(([, args]) => args);

vi.mock("minerva-design/charts/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/charts/core")>();
  const create =
    (kind: string) =>
    (_container: HTMLElement, options: Record<string, unknown>) => {
      const listeners = new Map<string, Set<Listener>>();
      const engine: FakeEngine = {
        kind,
        options,
        calls: [],
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      };
      engines.push(engine);
      const methods: Record<string, unknown> = {
        on: (type: string, listener: Listener) => {
          if (!listeners.has(type)) listeners.set(type, new Set());
          listeners.get(type)!.add(listener);
          return () => listeners.get(type)!.delete(listener);
        },
        setOptions: (next: Record<string, unknown>) => {
          engine.options = next;
          engine.calls.push(["setOptions", [next]]);
        },
        getBarCount: () => 42,
        getCamera: () => ({ azimuth: 30 }),
        getRenderer: () => "canvas2d",
      };
      return new Proxy(methods, {
        get: (target, key: string) =>
          target[key] ??
          ((...args: unknown[]) => {
            engine.calls.push([key, args]);
          }),
      });
    };
  return {
    ...actual,
    createChart: create("chart"),
    createShapeChart: create("shape"),
    createTradingChart: create("trading"),
    createDepthChart: create("depth"),
    createOrderBook: create("ladder"),
    createOrderBookHeatmap: create("heatmap"),
    createTimeAndSales: create("tape"),
    createChart3D: create("3d"),
  };
});

await import("../../elements/chart");
await import("../../elements/trading-chart");
await import("../../elements/order-book");
await import("../../elements/chart-3d");
const { mount, settle } = await import("../../../tests/utils");

beforeEach(() => {
  engines.length = 0;
});
afterEach(() => {
  document.body.innerHTML = "";
});

const create = async <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]>,
  attributes = "",
) => {
  const el = await mount<HTMLElementTagNameMap[K]>(
    `<${tag} ${attributes}></${tag}>`,
  );
  Object.assign(el, props);
  await settle();
  return el;
};

describe("extended cartesian and shape elements", () => {
  it("<minerva-horizontal-bar-chart> draws bars from the left", async () => {
    await create("minerva-horizontal-bar-chart", {
      series: [{ name: "Votes", data: [3, 1] }],
    });
    expect(last().options).toMatchObject({
      orientation: "horizontal",
      series: [{ type: "bar" }],
    });
  });

  it("<minerva-range-area-chart> draws smooth bands with thin edges", async () => {
    await create("minerva-range-area-chart", {
      series: [{ name: "Range", data: [{ x: 0, y0: 1, y: 2 }] }],
    });
    expect(last().options.series).toMatchObject([
      { type: "area", curve: "smooth", lineWidth: 1.5 },
    ]);
  });

  it("<minerva-histogram-chart> bins the raw samples", async () => {
    await create(
      "minerva-histogram-chart",
      { values: [1, 2, 2, 3, 3, 3, 4] },
      'bins="3" value-name="Requests"',
    );
    const [bins] = last().options.series as Array<{
      name: string;
      data: unknown[];
    }>;
    expect(bins.name).toBe("Requests");
    expect(bins.data.length).toBeGreaterThan(1);
  });

  it("<minerva-box-plot-chart> computes the quartiles of its groups", async () => {
    await create("minerva-box-plot-chart", {
      groups: [{ x: "A", values: [1, 2, 3, 4, 5] }],
    });
    expect(last().options).toMatchObject({
      orientation: "vertical",
      series: [{ type: "boxplot", data: [{ x: "A", y: 3, q1: 2, q3: 4 }] }],
    });
  });

  it("<minerva-waterfall-chart> floats the changes and labels them", async () => {
    await create("minerva-waterfall-chart", {
      steps: [
        { label: "Start", value: 10 },
        { label: "Cost", value: -4 },
        { label: "End", kind: "total" },
      ],
    });
    expect(last().options.series).toMatchObject([
      {
        showLabels: true,
        data: [
          { y0: 0, y: 10 },
          { y0: 10, y: 6 },
          { x: "End", y: 6 },
        ],
      },
    ]);
  });

  it("<minerva-gantt-chart> lays the tasks out on a time axis", async () => {
    await create("minerva-gantt-chart", {
      tasks: [{ name: "Design", start: 0, end: 10, progress: 0.5 }],
      today: 5,
    });
    expect(last().options).toMatchObject({
      orientation: "horizontal",
      xAxis: { type: "category", categories: ["Design"] },
      yAxis: { type: "time" },
      annotations: [{ type: "line", value: 5 }],
    });
  });

  it("<minerva-bubble-chart> sizes the dots by value", async () => {
    await create("minerva-bubble-chart", {
      series: [{ name: "A", data: [{ x: 1, y: 1, value: 100 }] }],
    });
    expect(last().options.series).toMatchObject([
      { type: "scatter", data: [{ size: 48 }] },
    ]);
  });

  it("shape elements build the options of their type; the sunburst forwards drills", async () => {
    await create("minerva-sankey-chart", {
      links: [{ source: "A", target: "B", value: 1 }],
    });
    expect(last().options).toMatchObject({ type: "sankey", align: "justify" });
    await create("minerva-radial-bar-chart", {
      data: [{ name: "Move", value: 3 }],
    });
    expect(last().options).toMatchObject({ type: "radialBar", sweep: 270 });
    await create("minerva-bullet-chart", {
      data: [{ name: "Revenue", value: 3, target: 4 }],
    });
    expect(last().options).toMatchObject({ type: "bullet" });
    const calendar = await create("minerva-calendar-heatmap", {
      data: [{ date: "2026-01-02", value: 3 }],
      range: ["2024-01-01", "2026-12-31"],
    });
    expect(last().options).toMatchObject({
      type: "calendarHeatmap",
      layout: "weeks",
    });
    const root =
      calendar.shadowRoot!.querySelector<HTMLElement>("[part=root]")!;
    expect(root.style.height).toBe(`${3 * 120 + 34 + 16}px`);

    const sunburst = await create("minerva-sunburst-chart", {
      data: [{ name: "A", children: [{ name: "B", value: 1 }] }],
    });
    const drill = vi.fn();
    sunburst.addEventListener("minerva-drill", drill);
    last().fire("drill", { path: ["A"] });
    expect(drill.mock.calls[0][0].detail).toEqual({ path: ["A"] });
    sunburst.drill([]);
    expect(called(last(), "drill")).toEqual([[[]]]);
  });
});

describe("<minerva-trading-chart>", () => {
  it("passes its properties as engine options, streams bars and forwards events", async () => {
    const bars = [{ time: 0, open: 1, high: 2, low: 0.5, close: 1.5 }];
    const chart = await create(
      "minerva-trading-chart",
      { bars },
      'symbol="BTC" timeframe="1h" chart-style="line"',
    );
    const engine = last();
    expect(engine.kind).toBe("trading");
    expect(engine.options).toMatchObject({
      bars,
      symbol: "BTC",
      timeframe: "1h",
      chartStyle: "line",
    });
    const root = chart.shadowRoot!.querySelector<HTMLElement>("[part=root]")!;
    expect(root.style.height).toBe("480px");

    chart.updateBar({ time: 0, open: 1, high: 3, low: 0.5, close: 2 });
    expect(called(engine, "update")).toHaveLength(1);
    expect(chart.getBarCount()).toBe(42);
    chart.setDrawingTool("trendLine");
    expect(called(engine, "setDrawingTool")).toEqual([["trendLine"]]);

    const moved = vi.fn();
    const tool = vi.fn();
    chart.addEventListener("minerva-crosshair-move", moved);
    chart.addEventListener("minerva-drawing-tool-change", tool);
    engine.fire("crosshairMove", { time: 0, index: 0 });
    engine.fire("drawingToolChange", "cursor");
    expect(moved.mock.calls[0][0].detail).toEqual({ time: 0, index: 0 });
    expect(tool.mock.calls[0][0].detail).toEqual({ tool: "cursor" });

    chart.indicators = [{ type: "sma", period: 7 }] as never;
    await settle();
    expect(engine.options).toMatchObject({ indicators: [{ period: 7 }] });
  });
});

describe("order book elements", () => {
  const book = { bids: [[99, 1]], asks: [[101, 2]] } as const;

  it("<minerva-depth-chart> passes the book apart from the options", async () => {
    const chart = await create("minerva-depth-chart", {
      book,
      options: { curve: "linear" },
    });
    const engine = last();
    expect(engine.options).toEqual({ curve: "linear" });
    expect(called(engine, "setBook")).toEqual([[book]]);

    const next = { bids: [[98, 1]], asks: [[102, 1]] } as const;
    const optionUpdates = called(engine, "setOptions").length;
    chart.book = next;
    await settle();
    expect(called(engine, "setBook")).toEqual([[book], [next]]);
    expect(called(engine, "setOptions")).toHaveLength(optionUpdates);

    chart.applyDeltas({ bids: [[99, 0]] });
    expect(called(engine, "applyDeltas")).toHaveLength(1);
    const range = vi.fn();
    chart.addEventListener("minerva-range-change", range);
    engine.fire("range", 0.02);
    expect(range.mock.calls[0][0].detail).toEqual({ range: 0.02 });
  });

  it("<minerva-order-book> sets the last price and forwards level clicks", async () => {
    const ladder = await create(
      "minerva-order-book",
      { book },
      'last-price="100"',
    );
    const engine = last();
    expect(called(engine, "setLastPrice")).toEqual([[100]]);
    const click = vi.fn();
    ladder.addEventListener("minerva-level-click", click);
    engine.fire("levelClick", { side: "bid", price: 99 });
    expect(click.mock.calls[0][0].detail).toEqual({ side: "bid", price: 99 });
  });

  it("<minerva-time-and-sales> appends the trades added to its array", async () => {
    const a = { time: 1, price: 100, size: 1, side: "buy" as const };
    const b = { time: 2, price: 101, size: 2, side: "sell" as const };
    const tape = await create("minerva-time-and-sales", { trades: [a] });
    const engine = last();
    expect(called(engine, "setTrades")).toEqual([[[a]]]);
    tape.trades = [a, b];
    await settle();
    expect(called(engine, "addTrades")).toEqual([[[b]]]);
    tape.trades = [b];
    await settle();
    expect(called(engine, "setTrades")).toEqual([[[a]], [[b]]]);
  });

  it("<minerva-order-book-heatmap> adds trades and forwards follow changes", async () => {
    const trade = { time: 1, price: 100, size: 1, side: "buy" as const };
    const heatmap = await create("minerva-order-book-heatmap", {
      book,
      trades: [trade],
    });
    const engine = last();
    expect(called(engine, "addTrades")).toEqual([[[trade]]]);
    const follow = vi.fn();
    heatmap.addEventListener("minerva-follow-change", follow);
    engine.fire("follow", false);
    expect(follow.mock.calls[0][0].detail).toEqual({ follow: false });
    heatmap.resetView();
    expect(called(engine, "resetView")).toHaveLength(1);
  });
});

describe("3D chart elements", () => {
  it("type their series, expose the camera and forward events", async () => {
    const chart = await create("minerva-bar-3d-chart", {
      series: [{ name: "Sales", data: [] }] as never,
    });
    const engine = last();
    expect(engine.kind).toBe("3d");
    expect(engine.options.series).toMatchObject([
      { type: "bar", barWidth: 0.7 },
    ]);
    const root = chart.shadowRoot!.querySelector<HTMLElement>("[part=root]")!;
    expect(root.style.height).toBe("400px");
    expect(chart.getCamera()).toEqual({ azimuth: 30 });
    chart.resetCamera();
    expect(called(engine, "resetCamera")).toHaveLength(1);
    const click = vi.fn();
    chart.addEventListener("minerva-point-click", click);
    engine.fire("click", { index: 1 });
    expect(click.mock.calls[0][0].detail).toEqual({ index: 1 });

    await create("minerva-surface-3d-chart", {
      series: [{ name: "z", z: [], wireframe: undefined }] as never,
      wireframe: true,
    });
    expect(last().options.series).toMatchObject([
      { type: "surface", wireframe: true },
    ]);
  });
});
