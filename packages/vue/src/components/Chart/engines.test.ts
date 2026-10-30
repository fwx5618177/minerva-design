// The extended chart components (cartesian / shape presets, trading, order
// book, 3D) with fake engines: option presets, the data streamed apart from
// the options (books, trades), emitted engine events and the handles.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import type { OrderBookSnapshot } from "minerva-design/charts/core";

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

const {
  Bar3DChart,
  BoxPlotChart,
  CalendarHeatmap,
  DepthChart,
  GanttChart,
  HistogramChart,
  HorizontalBarChart,
  MixedChart,
  OrderBook,
  Scatter3DChart,
  SunburstChart,
  TimeAndSales,
  TradingChart,
  WaterfallChart,
} = await import("./index");

beforeEach(() => {
  engines.length = 0;
});

describe("extended cartesian and shape components", () => {
  it("build the options of their preset", () => {
    mount(HorizontalBarChart, {
      props: { series: [{ name: "Votes", data: [3, 1] }] },
    });
    expect(last().options).toMatchObject({
      orientation: "horizontal",
      series: [{ type: "bar" }],
    });
    mount(MixedChart, {
      props: {
        series: [{ name: "A", type: "bar", data: [1] }],
        yAxis2: { min: 0 },
      },
    });
    expect(last().options).toMatchObject({ yAxis2: { min: 0 } });
    mount(HistogramChart, { props: { values: [1, 2, 2, 3], name: "Hits" } });
    expect(last().options.series).toMatchObject([{ name: "Hits" }]);
    mount(BoxPlotChart, {
      props: { groups: [{ x: "A", values: [1, 2, 3, 4, 5] }] },
    });
    expect(last().options.series).toMatchObject([
      { type: "boxplot", name: "Values", data: [{ y: 3 }] },
    ]);
    mount(WaterfallChart, {
      props: {
        steps: [
          { label: "Start", value: 5 },
          { label: "End", kind: "total" },
        ],
      },
    });
    expect(last().options.series).toMatchObject([
      { showLabels: true, data: [{ y0: 0, y: 5 }, { y: 5 }] },
    ]);
    mount(GanttChart, {
      props: { tasks: [{ name: "Design", start: 0, end: 10 }], today: 4 },
    });
    expect(last().options).toMatchObject({
      xAxis: { categories: ["Design"] },
      annotations: [{ value: 4 }],
    });
  });

  it("GanttChart draws the task dependencies as arrows", async () => {
    const tasks = [
      { name: "Design", start: 0, end: 10 },
      { name: "Build", start: 10, end: 20, dependencies: ["Design"] },
    ];
    const gantt = mount(GanttChart, {
      props: { tasks, dependencyColor: "red" },
    });
    const engine = last();
    expect(engine.options.dependencies).toEqual([
      { from: "Design", to: "Build", color: "red" },
    ]);
    await gantt.setProps({ dependencyArrows: false });
    expect(engine.options.dependencies).toEqual([]);
  });

  it("shape components: calendar height from the range, sunburst drills", async () => {
    const calendar = mount(CalendarHeatmap, {
      props: {
        data: [{ date: "2026-01-02", value: 1 }],
        range: ["2024-01-01", "2026-12-31"],
      },
    });
    expect(last().options).toMatchObject({ type: "calendarHeatmap" });
    expect(calendar.element.getAttribute("style")).toContain(
      `height: ${3 * 120 + 34 + 16}px`,
    );
    const sunburst = mount(SunburstChart, {
      props: { data: [{ name: "A", children: [{ name: "B", value: 1 }] }] },
    });
    last().fire("drill", { path: ["A"] });
    expect(sunburst.emitted("drill")).toEqual([[{ path: ["A"] }]]);
    (sunburst.vm as unknown as { drill(path: string[]): void }).drill([]);
    expect(called(last(), "drill")).toEqual([[[]]]);
  });
});

describe("TradingChart", () => {
  it("passes the set props as options, exposes the stream handle and emits events", async () => {
    const bars = [{ time: 0, open: 1, high: 2, low: 0.5, close: 1.5 }];
    const chart = mount(TradingChart, {
      props: { bars, symbol: "BTC", countdown: true },
    });
    const engine = last();
    expect(engine.kind).toBe("trading");
    expect(engine.options).toEqual({ bars, symbol: "BTC", countdown: true });
    const handle = chart.vm as unknown as {
      update(bar: unknown): void;
      getBarCount(): number;
    };
    handle.update({ time: 0, open: 1, high: 3, low: 0.5, close: 2 });
    expect(called(engine, "update")).toHaveLength(1);
    expect(handle.getBarCount()).toBe(42);
    engine.fire("crosshairMove", { index: 3 });
    engine.fire("drawingToolChange", "cursor");
    expect(chart.emitted("crosshairMove")).toEqual([[{ index: 3 }]]);
    expect(chart.emitted("drawingToolChange")).toEqual([["cursor"]]);
    await chart.setProps({ chartStyle: "line" });
    expect(engine.options).toMatchObject({ chartStyle: "line" });
  });

  it("forwards the autoscale and color convention options", () => {
    mount(TradingChart, {
      props: {
        bars: [],
        autoscaleIncludesDrawings: true,
        colorConvention: "auto",
      },
    });
    expect(last().options).toEqual({
      bars: [],
      autoscaleIncludesDrawings: true,
      colorConvention: "auto",
    });
  });
});

describe("order book components", () => {
  const book: OrderBookSnapshot = { bids: [[99, 1]], asks: [[101, 2]] };

  it("DepthChart passes the book apart from the options", async () => {
    const depth = mount(DepthChart, { props: { book, curve: "linear" } });
    const engine = last();
    expect(engine.options).toEqual({ curve: "linear" });
    expect(called(engine, "setBook")).toEqual([[book]]);
    const next: OrderBookSnapshot = { bids: [[98, 1]], asks: [[102, 1]] };
    await depth.setProps({ book: next });
    expect(called(engine, "setBook")).toEqual([[book], [next]]);
    expect(called(engine, "setOptions")).toEqual([]);
    engine.fire("range", 0.02);
    expect(depth.emitted("rangeChange")).toEqual([[0.02]]);
  });

  it("OrderBook sets the last price; TimeAndSales appends the grown trades", async () => {
    const ladder = mount(OrderBook, { props: { book, lastPrice: 100 } });
    expect(called(last(), "setLastPrice")).toEqual([[100]]);
    await ladder.setProps({ lastPrice: 101 });
    expect(called(last(), "setLastPrice")).toEqual([[100], [101]]);

    const a = { time: 1, price: 100, size: 1, side: "buy" as const };
    const b = { time: 2, price: 101, size: 2, side: "sell" as const };
    const tape = mount(TimeAndSales, { props: { trades: [a] } });
    const engine = last();
    expect(called(engine, "setTrades")).toEqual([[[a]]]);
    await tape.setProps({ trades: [a, b] });
    await nextTick();
    expect(called(engine, "addTrades")).toEqual([[[b]]]);
  });
});

describe("3D components", () => {
  it("type their series and expose the camera", () => {
    const chart = mount(Bar3DChart, {
      props: { series: [{ name: "Sales", data: [] }] as never },
    });
    expect(last().options.series).toMatchObject([
      { type: "bar", barWidth: 0.7 },
    ]);
    expect(
      (chart.vm as unknown as { getCamera(): unknown }).getCamera(),
    ).toEqual({ azimuth: 30 });
    last().fire("click", { index: 1 });
    expect(chart.emitted("pointClick")).toEqual([[{ index: 1 }]]);
  });

  it("pass the exposure of additive series", async () => {
    const chart = mount(Scatter3DChart, {
      props: { series: [{ data: [] }] as never, exposure: 0.6 },
    });
    const engine = last();
    expect(engine.options.exposure).toBe(0.6);
    await chart.setProps({ exposure: 1.4 });
    expect(engine.options.exposure).toBe(1.4);
  });
});
