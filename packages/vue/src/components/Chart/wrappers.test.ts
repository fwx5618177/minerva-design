// Every chart component against a fake engine: the options each one builds
// from its props, every engine event re-emitted as a Vue event, and every
// method of the template ref handle forwarded to the engine instance.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import type { DefineComponent } from "vue";
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

/** What the fake engine methods return (the others return `undefined`) */
const RETURNS: Record<string, unknown> = {
  getView: { x: [0, 10], y: [0, 5] },
  getRenderer: "webgl2",
  getBarCount: 42,
  getBar: { time: 0, open: 1, high: 2, low: 0.5, close: 1.5 },
  getVisibleRange: { from: 0, to: 10, fromTime: 0, toTime: 1 },
  getDrawings: [{ id: "d1", type: "trendLine" }],
  getCamera: { azimuth: 30, elevation: 20 },
};

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
      };
      return new Proxy(methods, {
        get: (target, key: string) =>
          target[key] ??
          ((...args: unknown[]) => {
            engine.calls.push([key, args]);
            return RETURNS[key];
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

const charts = await import("./index");

beforeEach(() => {
  engines.length = 0;
});

type Handle = Record<string, (...args: unknown[]) => unknown>;
const mountChart = (name: string, props: Record<string, unknown>) => {
  const component = (charts as unknown as Record<string, DefineComponent>)[
    name
  ];
  const wrapper = mount(component, { props });
  return { wrapper, handle: wrapper.vm as unknown as Handle, engine: last() };
};

/**
 * Fires each engine event and expects the Vue event it maps to, with the
 * same payload
 */
const expectEvents = (
  wrapper: ReturnType<typeof mount>,
  engine: FakeEngine,
  events: Record<string, string>,
) => {
  Object.entries(events).forEach(([type, emitted], i) => {
    const payload = { event: type, i };
    engine.fire(type, payload);
    expect(wrapper.emitted(emitted), `${type} → ${emitted}`).toEqual([
      [payload],
    ]);
  });
};

/** Calls each handle method and expects the engine call it forwards to */
const expectForwarded = (
  handle: Handle,
  engine: FakeEngine,
  methods: Record<string, unknown[]>,
  as: Record<string, string> = {},
) => {
  for (const [method, args] of Object.entries(methods)) {
    const result = handle[method](...args);
    const target = as[method] ?? method;
    expect(called(engine, target), `${method} → ${target}`).toEqual([args]);
    if (target in RETURNS) expect(result).toEqual(RETURNS[target]);
  }
};

const series = [{ name: "Visits", data: [1, 3, 2] }];
const shapeData = [
  { name: "A", value: 3 },
  { name: "B", value: 1 },
];

describe("cartesian components", () => {
  const cases: Array<[string, Record<string, unknown>, object]> = [
    ["Chart", { series }, { series: [{ type: "line" }] }],
    ["LineChart", { series }, { series: [{ type: "line" }] }],
    [
      "AreaChart",
      { series, stacked: true },
      { series: [{ type: "area", stack: "stack", curve: "smooth" }] },
    ],
    [
      "BarChart",
      { series, percent: true },
      { stackMode: "percent", series: [{ type: "bar", stack: "stack" }] },
    ],
    ["ScatterChart", { series }, { series: [{ type: "scatter" }] }],
    [
      "CandlestickChart",
      {
        series: [
          { name: "BTC", data: [{ x: 0, open: 1, high: 2, low: 0, close: 1 }] },
        ],
      },
      { series: [{ type: "candlestick" }] },
    ],
    [
      "HeatmapChart",
      { data: [{ x: "Mon", y: "AM", value: 3 }], name: "Load" },
      { series: [{ type: "heatmap", name: "Load" }] },
    ],
    [
      "HorizontalBarChart",
      { series },
      { orientation: "horizontal", series: [{ type: "bar" }] },
    ],
    [
      "RangeAreaChart",
      { series: [{ name: "Band", data: [{ x: 0, y0: 1, y: 2 }] }] },
      { series: [{ type: "area", curve: "smooth" }] },
    ],
    [
      "MixedChart",
      {
        series: [
          { name: "Sales", type: "bar", data: [1, 2] },
          { name: "Trend", data: [1, 2] },
        ],
        yAxis2: { min: 0 },
      },
      {
        yAxis2: { min: 0 },
        series: [{ type: "bar" }, { type: "line" }],
      },
    ],
    [
      "BubbleChart",
      { series: [{ name: "A", data: [{ x: 1, y: 1, value: 100 }] }] },
      { series: [{ type: "scatter", data: [{ size: 48 }] }] },
    ],
    [
      "HistogramChart",
      { values: [1, 2, 2, 3, 3, 3, 4], bins: 3, name: "Requests" },
      { series: [{ type: "bar", name: "Requests" }] },
    ],
    [
      "BoxPlotChart",
      { groups: [{ x: "A", values: [1, 2, 3, 4, 5] }] },
      { series: [{ type: "boxplot", data: [{ x: "A", y: 3, q1: 2, q3: 4 }] }] },
    ],
    [
      "WaterfallChart",
      {
        steps: [
          { label: "Start", value: 10 },
          { label: "Cost", value: -4 },
        ],
      },
      {
        series: [
          {
            data: [
              { y0: 0, y: 10 },
              { y0: 10, y: 6 },
            ],
          },
        ],
      },
    ],
    [
      "GanttChart",
      { tasks: [{ name: "Build", start: 0, end: 10 }] },
      { orientation: "horizontal", xAxis: { categories: ["Build"] } },
    ],
  ];

  it.each(cases)(
    "%s builds its options, emits the engine events and forwards its handle",
    (name, props, expected) => {
      const { wrapper, handle, engine } = mountChart(name, props);
      expect(engine.kind).toBe("chart");
      expect(engine.options).toMatchObject(expected);
      expectEvents(wrapper, engine, {
        hover: "hover",
        click: "pointClick",
        plotClick: "plotClick",
        zoom: "zoom",
        renderer: "rendererChange",
      });
      expectForwarded(handle, engine, {
        resetZoom: [],
        getView: [],
        setView: [{ x: [2, 4] }],
        getRenderer: [],
      });
      expect(handle.getInstance()).toBeTruthy();
    },
  );

  it("Sparkline draws a single axis-less series, emits hover and forwards its handle", () => {
    const { wrapper, handle, engine } = mountChart("Sparkline", {
      data: [1, 2, 3],
      type: "bar",
      reference: 2,
    });
    expect(engine.options).toMatchObject({
      legend: false,
      series: [{ type: "bar" }],
      annotations: [{ value: 2 }],
    });
    expectEvents(wrapper, engine, { hover: "hover" });
    expectForwarded(handle, engine, { resetZoom: [], getView: [] });
  });

  it("QuadrantChart emits hover / zoom / renderer and the dropped point with its quadrant", () => {
    const points = [{ x: 8, y: 9, label: "A" }];
    const { wrapper, engine } = mountChart("QuadrantChart", { points });
    expectEvents(wrapper, engine, {
      hover: "hover",
      zoom: "zoom",
      renderer: "rendererChange",
    });
    // a click without a point emits nothing
    engine.fire("click", { items: [] });
    expect(wrapper.emitted("pointClick")).toBeUndefined();
    engine.fire("drop", { item: { index: 0 }, x: 2, y: 2 });
    engine.fire("drop", { item: { index: 5 }, x: 2, y: 2 });
    expect(wrapper.emitted("pointDrop")).toEqual([
      [points[0], 0, { x: 2, y: 2, quadrant: "bottomLeft" }],
    ]);
  });
});

describe("shape components", () => {
  const cases: Array<[string, Record<string, unknown>, object]> = [
    [
      "ShapeChart",
      { options: { type: "funnel", data: shapeData } },
      { type: "funnel" },
    ],
    ["PieChart", { data: shapeData }, { type: "pie", innerRadius: 0 }],
    [
      "DonutChart",
      { data: shapeData, centerLabel: "Total" },
      { type: "pie", innerRadius: 0.62, centerLabel: "Total" },
    ],
    [
      "RadarChart",
      {
        indicators: [{ name: "Speed" }, { name: "Power" }],
        series: [{ name: "Car", values: [3, 4] }],
      },
      { type: "radar", series: [{ name: "Car" }] },
    ],
    ["GaugeChart", { value: 72 }, { type: "gauge", value: 72 }],
    ["FunnelChart", { data: shapeData }, { type: "funnel" }],
    ["TreemapChart", { data: shapeData }, { type: "treemap" }],
    [
      "SankeyChart",
      { links: [{ source: "A", target: "B", value: 1 }] },
      { type: "sankey", links: [{ source: "A" }] },
    ],
    ["RadialBarChart", { data: shapeData }, { type: "radialBar" }],
    [
      "CalendarHeatmap",
      { data: [{ date: "2026-01-02", value: 1 }] },
      { type: "calendarHeatmap" },
    ],
    [
      "BulletChart",
      { data: [{ name: "Revenue", value: 3, target: 4 }] },
      { type: "bullet" },
    ],
  ];

  it.each(cases)(
    "%s builds its options, emits the engine events and forwards toggle",
    (name, props, expected) => {
      const { wrapper, handle, engine } = mountChart(name, props);
      expect(engine.kind).toBe("shape");
      expect(engine.options).toMatchObject(expected);
      expectEvents(wrapper, engine, {
        hover: "hover",
        click: "click",
        toggle: "toggle",
      });
      expectForwarded(handle, engine, { toggle: [1] });
      expect(handle.getInstance()).toBeTruthy();
    },
  );

  it("SunburstChart also emits and forwards drills", () => {
    const { wrapper, handle, engine } = mountChart("SunburstChart", {
      data: [{ name: "A", children: [{ name: "B", value: 1 }] }],
    });
    expect(engine.options).toMatchObject({ type: "sunburst" });
    expectEvents(wrapper, engine, {
      hover: "hover",
      click: "click",
      toggle: "toggle",
      drill: "drill",
    });
    expectForwarded(handle, engine, { toggle: [0], drill: [["A"]] });
  });
});

describe("TradingChart", () => {
  it("emits every engine event and forwards every handle method", () => {
    const bars = [{ time: 0, open: 1, high: 2, low: 0.5, close: 1.5 }];
    const { wrapper, handle, engine } = mountChart("TradingChart", {
      bars,
      symbol: "BTC/USDT",
      height: 300,
    });
    expect(engine.options).toEqual({ bars, symbol: "BTC/USDT" });
    expectEvents(wrapper, engine, {
      crosshairMove: "crosshairMove",
      click: "click",
      visibleRangeChange: "visibleRangeChange",
      orderMove: "orderMove",
      drawingsChange: "drawingsChange",
      drawingSelect: "drawingSelect",
      drawingToolChange: "drawingToolChange",
      indicatorToggle: "indicatorToggle",
      historyRequest: "historyRequest",
      renderer: "rendererChange",
    });
    const bar = { time: 1, open: 1.5, high: 3, low: 1, close: 2 };
    expectForwarded(handle, engine, {
      update: [bar],
      appendBars: [[bar]],
      prependBars: [bars],
      setBars: [bars],
      getBarCount: [],
      getBar: [0],
      scrollToRealtime: [true],
      fitContent: [],
      getVisibleRange: [],
      setVisibleRange: [{ from: 2, to: 8 }],
      resetPriceScales: [],
      setDrawingTool: ["trendLine"],
      getDrawings: [],
      removeDrawing: ["d1"],
      selectDrawing: [null],
      setIndicatorVisible: ["sma", false],
      getRenderer: [],
    });
    expect(handle.getInstance()).toBeTruthy();
  });
});

describe("order book components", () => {
  const book: OrderBookSnapshot = { bids: [[99, 1]], asks: [[101, 2]] };
  const deltas = [{ side: "bid" as const, price: 99, size: 0 }];

  it("DepthChart emits hover / click / rangeChange and forwards the book methods", () => {
    const { wrapper, handle, engine } = mountChart("DepthChart", { book });
    expect(engine.kind).toBe("depth");
    expectEvents(wrapper, engine, {
      hover: "hover",
      click: "click",
      range: "rangeChange",
    });
    // the mounted book was passed once already
    engine.calls.length = 0;
    expectForwarded(handle, engine, {
      setBook: [book],
      applyDeltas: [deltas],
      setRange: [0.05],
    });
    expect(handle.getInstance()).toBeTruthy();
  });

  it("OrderBook emits hover / levelClick and forwards the book methods", () => {
    const { wrapper, handle, engine } = mountChart("OrderBook", {
      book,
      rows: 10,
    });
    expect(engine.options).toEqual({ rows: 10 });
    expectEvents(wrapper, engine, { hover: "hover", levelClick: "levelClick" });
    engine.calls.length = 0;
    expectForwarded(handle, engine, {
      setBook: [book],
      applyDeltas: [deltas],
      setLastPrice: [100.5],
    });
    expect(handle.getInstance()).toBeTruthy();
  });

  it("OrderBookHeatmap adds its trades, emits hover / rendererChange / followChange and forwards its methods", async () => {
    const a = { time: 1, price: 100, size: 1, side: "buy" as const };
    const b = { time: 2, price: 101, size: 2, side: "sell" as const };
    const { wrapper, handle, engine } = mountChart("OrderBookHeatmap", {
      book,
      trades: [a],
      tickSize: 0.5,
    });
    expect(engine.options).toEqual({ tickSize: 0.5 });
    expect(called(engine, "setBook")).toEqual([[book]]);
    expect(called(engine, "addTrades")).toEqual([[[a]]]);
    // a grown array adds the appended trades only
    await wrapper.setProps({ trades: [a, b] } as never);
    expect(called(engine, "addTrades")).toEqual([[[a]], [[b]]]);
    // a different array replaces the trades: the heatmap adds them all
    await wrapper.setProps({ trades: [b] } as never);
    expect(called(engine, "addTrades")).toEqual([[[a]], [[b]], [[b]]]);
    expectEvents(wrapper, engine, {
      hover: "hover",
      renderer: "rendererChange",
      follow: "followChange",
    });
    engine.calls.length = 0;
    expectForwarded(handle, engine, {
      setBook: [book],
      applyDeltas: [deltas],
      addTrades: [[a]],
      resetView: [],
    });
    expect(handle.getInstance()).toBeTruthy();
  });

  it("TimeAndSales emits hover / tradeClick / pause and forwards its methods", () => {
    const trade = { time: 1, price: 100, size: 1, side: "buy" as const };
    const { wrapper, handle, engine } = mountChart("TimeAndSales", {
      trades: [trade],
    });
    expectEvents(wrapper, engine, {
      hover: "hover",
      tradeClick: "tradeClick",
      pause: "pause",
    });
    engine.calls.length = 0;
    expectForwarded(handle, engine, {
      addTrades: [[trade]],
      setTrades: [[trade]],
      clear: [],
      scrollToLatest: [],
    });
    expect(handle.getInstance()).toBeTruthy();
  });
});

describe("3D components", () => {
  const points = [{ name: "P", data: [{ x: 0, y: 0, z: 1 }] }];
  const cases: Array<[string, Record<string, unknown>, object]> = [
    ["Scatter3DChart", { series: points }, { series: [{ type: "scatter" }] }],
    ["Line3DChart", { series: points }, { series: [{ type: "line" }] }],
    [
      "Surface3DChart",
      {
        series: [{ name: "z", data: { z: [[1, 2]] } }],
        wireframe: true,
        contours: { count: 5 },
      },
      {
        series: [{ type: "surface", wireframe: true, contours: { count: 5 } }],
      },
    ],
    [
      "Bar3DChart",
      { series: [{ name: "Sales", data: [["A", "Q1", 3]] }], barWidth: 0.5 },
      { series: [{ type: "bar", barWidth: 0.5 }] },
    ],
  ];

  it.each(cases)(
    "%s types its series, emits the engine events and forwards the camera",
    (name, props, expected) => {
      const { wrapper, handle, engine } = mountChart(name, {
        ...props,
        autoRotate: 20,
        zAxis: { title: "Z" },
      });
      expect(engine.kind).toBe("3d");
      expect(engine.options).toMatchObject({
        ...expected,
        autoRotate: 20,
        zAxis: { title: "Z" },
      });
      expectEvents(wrapper, engine, {
        hover: "hover",
        click: "pointClick",
        camera: "cameraChange",
        renderer: "rendererChange",
      });
      expectForwarded(handle, engine, {
        resetCamera: [],
        getCamera: [],
        setCamera: [{ azimuth: 90 }],
        getRenderer: [],
      });
      expect(handle.getInstance()).toBeTruthy();
    },
  );
});
