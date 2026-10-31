// Every chart element against a fake engine: the options each one builds
// from its properties and attributes, every engine event re-dispatched as a
// minerva-* DOM event, and every element method forwarded to the engine.
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

/** What the fake engine methods return (the others return `undefined`) */
const RETURNS: Record<string, unknown> = {
  getView: { x: [0, 10], y: [0, 5] },
  getRenderer: "webgl2",
  getBarCount: 42,
  getBar: { time: 0, open: 1, high: 2, low: 0.5, close: 1.5 },
  getVisibleRange: { from: 0, to: 10, fromTime: 0, toTime: 1 },
  getDrawings: [{ id: "d1", type: "trendLine" }],
  getCamera: { azimuth: 30, elevation: 20 },
  getVisibleTimeRange: { from: 10, to: 20 },
  getUndoState: { canUndo: true, canRedo: false },
  getReplayState: { active: true, index: 3 },
  toDataURL: "data:image/png;base64,",
  getSelection: ["a"],
  getPositions: { a: { x: 1, y: 2 } },
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
    createGraphChart: create("graph"),
  };
});

await import("../../elements/chart");
await import("../../elements/trading-chart");
await import("../../elements/order-book");
await import("../../elements/chart-3d");
await import("../../elements/graph");
const { mount, settle } = await import("../../../tests/utils");

beforeEach(() => {
  engines.length = 0;
});
afterEach(() => {
  document.body.innerHTML = "";
});

type Methods = Record<string, (...args: unknown[]) => unknown>;
const create = async (
  tag: string,
  props: Record<string, unknown>,
  attributes = "",
) => {
  const el = await mount<HTMLElement>(`<${tag} ${attributes}></${tag}>`);
  Object.assign(el, props);
  await settle();
  return {
    el,
    methods: el as unknown as Methods,
    engine: last(),
    height: () =>
      el.shadowRoot!.querySelector<HTMLElement>("[part=root]")!.style.height,
  };
};

/**
 * Fires each engine event and expects the DOM event it maps to; `detail`
 * maps the engine payload to the expected detail (the payload by default)
 */
const expectEvents = (
  el: HTMLElement,
  engine: FakeEngine,
  events: Record<string, string | [string, (payload: unknown) => unknown]>,
) => {
  Object.entries(events).forEach(([type, mapping], i) => {
    const [name, detail] =
      typeof mapping === "string"
        ? [mapping, (payload: unknown) => payload]
        : mapping;
    const listener = vi.fn();
    el.addEventListener(name, listener);
    const payload = { event: type, i };
    engine.fire(type, payload);
    expect(listener, `${type} → ${name}`).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual(detail(payload));
  });
};

/** Calls each element method and expects the engine call it forwards to */
const expectForwarded = (
  methods: Methods,
  engine: FakeEngine,
  calls: Record<string, unknown[]>,
  as: Record<string, string> = {},
) => {
  for (const [method, args] of Object.entries(calls)) {
    const result = methods[method](...args);
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
const cartesianEvents = {
  hover: "minerva-hover",
  click: "minerva-point-click",
  plotClick: "minerva-plot-click",
  zoom: "minerva-zoom",
  renderer: [
    "minerva-renderer-change",
    (renderer: unknown) => ({ renderer }),
  ] as [string, (payload: unknown) => unknown],
};

describe("cartesian elements", () => {
  const cases: Array<[string, Record<string, unknown>, string, object]> = [
    ["minerva-chart", { options: { series } }, "", { series }],
    ["minerva-line-chart", { series }, "", { series: [{ type: "line" }] }],
    [
      "minerva-area-chart",
      { series },
      'stacked curve="step"',
      { series: [{ type: "area", stack: "stack", curve: "step" }] },
    ],
    [
      "minerva-area-chart",
      { series },
      "percent",
      { stackMode: "percent", series: [{ type: "area", curve: "smooth" }] },
    ],
    [
      "minerva-bar-chart",
      { series },
      "percent",
      { stackMode: "percent", series: [{ type: "bar", stack: "stack" }] },
    ],
    [
      "minerva-scatter-chart",
      { series },
      "",
      { series: [{ type: "scatter" }] },
    ],
    [
      "minerva-candlestick-chart",
      {
        series: [
          { name: "BTC", data: [{ x: 0, open: 1, high: 2, low: 0, close: 1 }] },
        ],
      },
      "",
      { series: [{ type: "candlestick" }] },
    ],
    [
      "minerva-heatmap-chart",
      { data: [{ x: "Mon", y: "AM", value: 3 }] },
      'value-name="Load" radius="2" color-scale="diverging" color-midpoint="0"',
      {
        series: [
          {
            type: "heatmap",
            name: "Load",
            colorScale: "diverging",
            colorMidpoint: 0,
          },
        ],
      },
    ],
    [
      "minerva-horizontal-bar-chart",
      { series },
      "",
      { orientation: "horizontal", series: [{ type: "bar" }] },
    ],
    [
      "minerva-mixed-chart",
      {
        series: [
          { name: "Sales", type: "bar", data: [1, 2] },
          { name: "Trend", data: [1, 2] },
        ],
        options: { yAxis2: { min: 0 } },
      },
      "",
      { yAxis2: { min: 0 }, series: [{ type: "bar" }, { type: "line" }] },
    ],
    [
      "minerva-bubble-chart",
      { series: [{ name: "A", data: [{ x: 1, y: 1, value: 100 }] }] },
      'min-size="4" max-size="30"',
      { series: [{ type: "scatter", data: [{ size: 30 }] }] },
    ],
    [
      "minerva-histogram-chart",
      { values: [1, 2, 2, 3, 3, 3, 4] },
      'bins="sturges" value-name="Requests"',
      { series: [{ type: "bar", name: "Requests" }] },
    ],
    [
      "minerva-box-plot-chart",
      { groups: [{ x: "A", values: [1, 2, 3, 4, 5, 40] }] },
      'whisker="minmax" orientation="horizontal"',
      {
        orientation: "horizontal",
        series: [{ type: "boxplot", data: [{ x: "A", high: 40 }] }],
      },
    ],
    [
      "minerva-box-plot-chart",
      {
        groups: [{ x: "A", values: [1, 2, 3, 4, 5] }],
        series: [{ name: "Target", type: "line", data: [["A", 3]] }],
      },
      'whisker="3" outlier-shape="filled" outlier-size="10"',
      {
        series: [
          {
            type: "boxplot",
            data: [{ x: "A", y: 3 }],
            outlierShape: "filled",
            outlierSize: 10,
          },
          { type: "line" },
        ],
      },
    ],
    [
      "minerva-waterfall-chart",
      { steps: [{ label: "Start", value: 10 }] },
      'value-name="Cash"',
      {
        series: [{ name: "Cash", connector: true, data: [{ y0: 0, y: 10 }] }],
      },
    ],
    [
      "minerva-waterfall-chart",
      { steps: [{ label: "Start", value: 10 }], connector: { dash: [2, 2] } },
      "",
      { series: [{ connector: { dash: [2, 2] } }] },
    ],
    [
      "minerva-waterfall-chart",
      { steps: [{ label: "Start", value: 10 }], connector: { dash: [2, 2] } },
      "hide-connectors",
      { series: [{ connector: false }] },
    ],
    [
      "minerva-gantt-chart",
      { tasks: [{ name: "Build", start: 0, end: 10 }] },
      'task-name="Task" dependencies-name="After"',
      { orientation: "horizontal", xAxis: { categories: ["Build"] } },
    ],
  ];

  it.each(cases)(
    "<%s> builds its options, re-dispatches the engine events and forwards its methods",
    async (tag, props, attributes, expected) => {
      const { el, methods, engine, height } = await create(
        tag,
        props,
        attributes,
      );
      expect(engine.kind).toBe("chart");
      expect(engine.options).toMatchObject(expected);
      expect(height()).toBe("320px");
      expectEvents(el, engine, cartesianEvents);
      expectForwarded(methods, engine, {
        resetZoom: [],
        getView: [],
        setView: [{ x: [2, 4] }],
        getRenderer: [],
      });
    },
  );

  it("<minerva-range-area-chart> follows the curve attribute", async () => {
    const { engine } = await create(
      "minerva-range-area-chart",
      { series: [{ name: "Band", data: [{ x: 0, y0: 1, y: 2 }] }] },
      'curve="linear"',
    );
    expect(engine.options.series).toMatchObject([
      { type: "area", curve: "linear" },
    ]);
  });

  it("<minerva-histogram-chart> reads a bin count from its attribute", async () => {
    const { el, engine } = await create(
      "minerva-histogram-chart",
      { values: [1, 2, 3, 4, 5, 6, 7, 8] },
      'bins="4"',
    );
    expect((el as unknown as { bins: unknown }).bins).toBe(4);
    expect((engine.options.series as unknown[]).length).toBe(1);
  });

  it("<minerva-sparkline> takes its series name and format", async () => {
    const format = (value: number) => `${value} ms`;
    const { engine, height } = await create(
      "minerva-sparkline",
      { data: [1, 2, 3], format },
      'value-name="Latency" color="red"',
    );
    expect(height()).toBe("48px");
    expect(engine.options.series).toMatchObject([
      { name: "Latency", color: "red" },
    ]);
  });

  it("<minerva-quadrant-chart> re-dispatches hover / zoom and the dropped point", async () => {
    const points = [{ x: 8, y: 9, label: "A" }];
    const { el, engine } = await create(
      "minerva-quadrant-chart",
      { points },
      "drag-points",
    );
    expect(JSON.stringify(engine.options)).toContain('"dragPoints":true');
    expectEvents(el, engine, { hover: "minerva-hover", zoom: "minerva-zoom" });
    const clicks = vi.fn();
    el.addEventListener("minerva-point-click", clicks);
    engine.fire("click", { items: [] });
    expect(clicks).not.toHaveBeenCalled();
    const drops = vi.fn();
    el.addEventListener("minerva-point-drop", drops);
    engine.fire("drop", { item: { index: 0 }, x: 2, y: 2 });
    engine.fire("drop", { item: { index: 3 }, x: 2, y: 2 });
    expect(drops.mock.calls.map(([event]) => event.detail)).toEqual([
      { point: points[0], index: 0, x: 2, y: 2, quadrant: "bottomLeft" },
    ]);
    const drags = vi.fn();
    el.addEventListener("minerva-point-drag", drags);
    engine.fire("drag", { item: { index: 0 }, x: 9, y: 9 });
    expect(drags.mock.calls.map(([event]) => event.detail)).toEqual([
      { point: points[0], index: 0, x: 9, y: 9, quadrant: "topRight" },
    ]);
    const doubles = vi.fn();
    el.addEventListener("minerva-point-double-click", doubles);
    engine.fire("click", { items: [{ index: 0 }] });
    engine.fire("click", { items: [{ index: 0 }] });
    expect(clicks).toHaveBeenCalledTimes(2);
    expect(doubles.mock.calls.map(([event]) => event.detail)).toEqual([
      { point: points[0], index: 0 },
    ]);
  });
});

describe("shape elements", () => {
  const cases: Array<
    [string, Record<string, unknown>, string, object, string]
  > = [
    [
      "minerva-shape-chart",
      { options: { type: "gauge", value: 3 } },
      "",
      { type: "gauge" },
      "240px",
    ],
    [
      "minerva-shape-chart",
      { options: { type: "funnel", data: shapeData } },
      "",
      { type: "funnel" },
      "320px",
    ],
    [
      "minerva-pie-chart",
      { data: shapeData },
      'rose labels="inside" center-label="Total"',
      { type: "pie", rose: true, labels: "inside", centerLabel: "Total" },
      "320px",
    ],
    [
      "minerva-donut-chart",
      { data: shapeData },
      "",
      { type: "pie", innerRadius: 0.62 },
      "320px",
    ],
    [
      "minerva-radar-chart",
      {
        indicators: [{ name: "Speed" }, { name: "Power" }],
        series: [{ name: "Car", values: [3, 4] }],
      },
      'shape="circle" levels="5"',
      { type: "radar", shape: "circle", levels: 5 },
      "320px",
    ],
    [
      "minerva-gauge-chart",
      { bands: [{ to: 50, color: "green" }] },
      'value="72" needle',
      { type: "gauge", value: 72, needle: true, bands: [{ to: 50 }] },
      "240px",
    ],
    [
      "minerva-funnel-chart",
      { data: shapeData },
      "",
      { type: "funnel" },
      "320px",
    ],
    [
      "minerva-treemap-chart",
      { data: shapeData },
      "",
      { type: "treemap" },
      "320px",
    ],
    [
      "minerva-sankey-chart",
      { links: [{ source: "A", target: "B", value: 1 }] },
      'link-color="source"',
      { type: "sankey", linkColor: "source" },
      "360px",
    ],
    [
      "minerva-radial-bar-chart",
      { data: shapeData },
      'max="10" center-value="80%"',
      { type: "radialBar", max: 10, centerValue: "80%" },
      "300px",
    ],
    [
      "minerva-calendar-heatmap",
      { data: [{ date: "2026-01-02", value: 1 }] },
      'layout="months" color="green"',
      { type: "calendarHeatmap", layout: "months", color: "green" },
      "560px",
    ],
    [
      "minerva-calendar-heatmap",
      {
        data: [{ date: "2026-01-02", value: 1 }],
        options: { legend: false },
      },
      "",
      { type: "calendarHeatmap", layout: "weeks" },
      `${120 + 16}px`,
    ],
    [
      "minerva-bullet-chart",
      {
        data: [
          { name: "Revenue", value: 3, target: 4 },
          { name: "Profit", value: 1, target: 2 },
        ],
      },
      'target-color="red"',
      { type: "bullet", targetColor: "red" },
      `${2 * 64 + 16}px`,
    ],
    [
      "minerva-bullet-chart",
      { data: [{ name: "Revenue", value: 3 }] },
      'orientation="vertical"',
      { type: "bullet", orientation: "vertical" },
      "320px",
    ],
    [
      "minerva-chord-chart",
      {
        groups: ["A", "B"],
        matrix: [
          [0, 2],
          [3, 0],
        ],
        tickFormat: String,
        options: { ticks: 5, padAngle: 3 },
      },
      'directed ribbon-color="source" labels="radial"',
      {
        type: "chord",
        groups: ["A", "B"],
        matrix: [
          [0, 2],
          [3, 0],
        ],
        directed: true,
        ribbonColor: "source",
        labels: "radial",
        tickFormat: String,
        ticks: 5,
        padAngle: 3,
      },
      "420px",
    ],
    [
      "minerva-chord-chart",
      {
        links: [{ source: "A", target: "B", value: 2 }],
        options: { directed: true },
      },
      "",
      {
        type: "chord",
        links: [{ source: "A" }],
        directed: true,
        ribbonColor: "gradient",
        labels: "auto",
      },
      "420px",
    ],
  ];

  it.each(cases)(
    "<%s> builds its options, re-dispatches the engine events and forwards toggle",
    async (tag, props, attributes, expected, height) => {
      const created = await create(tag, props, attributes);
      const { el, methods, engine } = created;
      expect(engine.kind).toBe("shape");
      expect(engine.options).toMatchObject(expected);
      expect(created.height()).toBe(height);
      expectEvents(el, engine, {
        hover: "minerva-hover",
        click: "minerva-click",
        toggle: "minerva-toggle",
      });
      expectForwarded(methods, engine, { toggle: [1] });
    },
  );

  it("<minerva-sunburst-chart> also re-dispatches and forwards drills", async () => {
    const { el, methods, engine, height } = await create(
      "minerva-sunburst-chart",
      { data: [{ name: "A", children: [{ name: "B", value: 1 }] }] },
      "no-drill",
    );
    expect(engine.options).toMatchObject({ type: "sunburst" });
    expect(height()).toBe("360px");
    expectEvents(el, engine, {
      hover: "minerva-hover",
      click: "minerva-click",
      toggle: "minerva-toggle",
      drill: "minerva-drill",
    });
    expectForwarded(methods, engine, { toggle: [0], drill: [["A"]] });
  });
});

describe("<minerva-trading-chart>", () => {
  it("re-dispatches every engine event and forwards every method", async () => {
    const bars = [{ time: 0, open: 1, high: 2, low: 0.5, close: 1.5 }];
    const { el, methods, engine } = await create(
      "minerva-trading-chart",
      { bars, options: { countdown: true } },
      'timeframe="60000"',
    );
    expect(engine.options).toMatchObject({
      bars,
      timeframe: 60000,
      chartStyle: "candles",
      countdown: true,
    });
    expectEvents(el, engine, {
      crosshairMove: "minerva-crosshair-move",
      click: "minerva-click",
      visibleRangeChange: "minerva-visible-range-change",
      orderMove: "minerva-order-move",
      orderCreate: "minerva-order-create",
      orderCancel: "minerva-order-cancel",
      drawingsChange: ["minerva-drawings-change", (drawings) => ({ drawings })],
      drawingSelect: ["minerva-drawing-select", (id) => ({ id })],
      drawingToolChange: ["minerva-drawing-tool-change", (tool) => ({ tool })],
      undoChange: "minerva-undo-change",
      replayChange: "minerva-replay-change",
      fullscreenChange: [
        "minerva-fullscreen-change",
        (fullscreen) => ({ fullscreen }),
      ],
      indicatorToggle: "minerva-indicator-toggle",
      historyRequest: "minerva-history-request",
      renderer: ["minerva-renderer-change", (renderer) => ({ renderer })],
    });
    const bar = { time: 1, open: 1.5, high: 3, low: 1, close: 2 };
    expectForwarded(
      methods,
      engine,
      {
        updateBar: [bar],
        appendBars: [[bar]],
        prependBars: [bars],
        setBars: [bars],
        getBarCount: [],
        getBar: [0],
        scrollToRealtime: [true],
        fitContent: [],
        getVisibleRange: [],
        setVisibleRange: [{ from: 2, to: 8 }],
        getVisibleTimeRange: [],
        setVisibleTimeRange: [{ from: 10, to: 20 }],
        setCrosshair: [10, 1.5],
        setScaleMode: ["log"],
        resetPriceScales: [],
        setDrawingTool: ["trendLine"],
        getDrawings: [],
        removeDrawing: ["d1"],
        updateDrawing: ["d1", { color: "red" }],
        selectDrawing: [null],
        undo: [],
        redo: [],
        getUndoState: [],
        startReplay: [5],
        replayStep: [2],
        replayPlay: [4],
        replayPause: [],
        stopReplay: [],
        getReplayState: [],
        toDataURL: ["image/jpeg", 0.8],
        toBlob: ["image/webp", 0.9],
        requestChartFullscreen: [],
        exitChartFullscreen: [],
        setIndicatorVisible: ["sma", false],
        getRenderer: [],
      },
      {
        updateBar: "update",
        requestChartFullscreen: "requestFullscreen",
        exitChartFullscreen: "exitFullscreen",
      },
    );
  });

  it("returns empty values before it is connected", async () => {
    const chart = document.createElement("minerva-trading-chart");
    expect(chart.getBarCount()).toBe(0);
    expect(chart.getBar(0)).toBeNull();
    expect(chart.getVisibleRange()).toBeNull();
    expect(chart.getDrawings()).toEqual([]);
    expect(chart.getRenderer()).toBeNull();
    expect(chart.getVisibleTimeRange()).toBeNull();
    expect(chart.getUndoState()).toEqual({ canUndo: false, canRedo: false });
    expect(chart.getReplayState()).toBeNull();
    expect(chart.toDataURL()).toBe("");
    await expect(chart.toBlob()).resolves.toBeNull();
    await expect(chart.requestChartFullscreen()).resolves.toBeUndefined();
    await expect(chart.exitChartFullscreen()).resolves.toBeUndefined();
    chart.updateBar({ time: 0, open: 1, high: 1, low: 1, close: 1 });
    expect(engines).toHaveLength(0);
  });
});

describe("order book elements", () => {
  const book = { bids: [[99, 1]], asks: [[101, 2]] } as const;
  const deltas = [{ side: "bid" as const, price: 99, size: 0 }];

  it("<minerva-depth-chart> re-dispatches hover / click / range and forwards its methods", async () => {
    const { el, methods, engine, height } = await create(
      "minerva-depth-chart",
      { book },
    );
    expect(height()).toBe("320px");
    expectEvents(el, engine, {
      hover: "minerva-hover",
      click: "minerva-click",
      range: ["minerva-range-change", (range) => ({ range })],
    });
    engine.calls.length = 0;
    expectForwarded(methods, engine, {
      setBook: [book],
      applyDeltas: [deltas],
      setRange: [null],
    });
  });

  it("<minerva-order-book> forwards its methods and follows last-price and options", async () => {
    const { el, methods, engine, height } = await create("minerva-order-book", {
      book,
    });
    expect(height()).toBe("420px");
    expectEvents(el, engine, {
      hover: "minerva-hover",
      levelClick: "minerva-level-click",
    });
    engine.calls.length = 0;
    expectForwarded(methods, engine, {
      setBook: [book],
      applyDeltas: [deltas],
      setLastPrice: [100.5],
    });
    engine.calls.length = 0;
    el.setAttribute("last-price", "101");
    Object.assign(el, { options: { rows: 8 } });
    await settle();
    expect(called(engine, "setLastPrice")).toEqual([[101]]);
    expect(called(engine, "setOptions")).toEqual([[{ rows: 8 }]]);
  });

  it("<minerva-order-book-heatmap> re-dispatches its events and forwards its methods", async () => {
    const trade = { time: 1, price: 100, size: 1, side: "buy" as const };
    const { el, methods, engine, height } = await create(
      "minerva-order-book-heatmap",
      { book },
    );
    expect(height()).toBe("360px");
    expectEvents(el, engine, {
      hover: "minerva-hover",
      renderer: ["minerva-renderer-change", (renderer) => ({ renderer })],
      follow: ["minerva-follow-change", (follow) => ({ follow })],
    });
    engine.calls.length = 0;
    expectForwarded(methods, engine, {
      setBook: [book],
      applyDeltas: [deltas],
      addTrades: [[trade]],
      resetView: [],
      getRenderer: [],
    });
  });

  it("<minerva-time-and-sales> re-dispatches its events, forwards its methods and resets its feed on reconnect", async () => {
    const a = { time: 1, price: 100, size: 1, side: "buy" as const };
    const b = { time: 2, price: 101, size: 2, side: "sell" as const };
    const { el, methods, engine, height } = await create(
      "minerva-time-and-sales",
      { trades: [a], options: { aggregate: true } },
    );
    expect(height()).toBe("360px");
    expect(engine.options).toEqual({ aggregate: true });
    expectEvents(el, engine, {
      hover: "minerva-hover",
      tradeClick: "minerva-trade-click",
      pause: ["minerva-pause", (paused) => ({ paused })],
    });
    engine.calls.length = 0;
    expectForwarded(methods, engine, {
      addTrades: [[b]],
      setTrades: [[a]],
      clear: [],
      scrollToLatest: [],
    });
    Object.assign(el, { options: { aggregate: false } });
    await settle();
    expect(engine.options).toEqual({ aggregate: false });

    // a new engine after a reconnect gets every trade again
    el.remove();
    document.body.append(el);
    await settle();
    expect(called(last(), "setTrades")).toEqual([[[a]]]);
  });
});

describe("3D chart elements", () => {
  const points = [{ name: "P", data: [{ x: 0, y: 0, z: 1 }] }];
  const cases: Array<[string, Record<string, unknown>, object]> = [
    ["minerva-scatter-3d-chart", { series: points }, { type: "scatter" }],
    ["minerva-line-3d-chart", { series: points }, { type: "line" }],
    [
      "minerva-surface-3d-chart",
      {
        series: [{ name: "z", data: { z: [[1, 2]] } }],
        contours: { count: 5 },
      },
      { type: "surface", contours: { count: 5 } },
    ],
    [
      "minerva-bar-3d-chart",
      { series: [{ name: "Sales", data: [["A", "Q1", 3]], barWidth: 0.4 }] },
      { type: "bar", barWidth: 0.4 },
    ],
  ];

  it.each(cases)(
    "<%s> types its series, re-dispatches the engine events and forwards the camera",
    async (tag, props, expected) => {
      const { el, methods, engine, height } = await create(tag, {
        ...props,
        options: { autoRotate: 20 },
      });
      expect(engine.kind).toBe("3d");
      expect(height()).toBe("400px");
      expect(engine.options).toMatchObject({
        autoRotate: 20,
        series: [expected],
      });
      expectEvents(el, engine, {
        hover: "minerva-hover",
        click: "minerva-point-click",
        camera: "minerva-camera-change",
        renderer: ["minerva-renderer-change", (renderer) => ({ renderer })],
      });
      expectForwarded(methods, engine, {
        resetCamera: [],
        getCamera: [],
        setCamera: [{ azimuth: 90 }],
        getRenderer: [],
      });
    },
  );

  it("waits for its series", async () => {
    const { el } = await create("minerva-line-3d-chart", {});
    expect(engines).toHaveLength(0);
    expect((el as unknown as { getCamera(): unknown }).getCamera()).toBeNull();
  });
});

describe("graph elements", () => {
  const nodes = [
    { id: "a", group: "g1" },
    { id: "b", group: "g2" },
  ];
  const edges = [{ source: "a", target: "b" }];
  const cases: Array<[string, Record<string, unknown>, string, object]> = [
    [
      "minerva-graph-chart",
      { options: { force: { charge: -200 }, nodeSize: [8, 30] } },
      'layout="circular" direction="LR" node-shape="box" edge-style="curve" edge-color="source" arrow-style="filled" highlight="lineage" locale="fr"',
      {
        layout: "circular",
        direction: "LR",
        force: { charge: -200 },
        nodeSize: [8, 30],
        nodeShape: "box",
        edgeStyle: "curve",
        edgeColor: "source",
        arrowStyle: "filled",
        highlight: "lineage",
        locale: "fr",
      },
    ],
    [
      "minerva-dependency-graph",
      { options: { dag: { layerGap: 80 } } },
      "critical-path",
      {
        layout: "dag",
        direction: "TB",
        dag: { layerGap: 80, criticalPath: true },
        arrowStyle: "open",
      },
    ],
    [
      "minerva-tree-chart",
      { options: { tree: { root: "a" } } },
      'layout="org" edge-color="target" arrow-style="open"',
      {
        layout: "org",
        edgeColor: "target",
        arrowStyle: "open",
        tree: { root: "a" },
      },
    ],
  ];

  it.each(cases)(
    "<%s> builds its options, re-dispatches the engine events and forwards its methods",
    async (tag, props, attributes, expected) => {
      const created = await create(
        tag,
        { nodes, edges, groups: [{ id: "g1" }], selected: ["a"], ...props },
        attributes,
      );
      const { el, methods, engine } = created;
      expect(engine.kind).toBe("graph");
      expect(engine.options).toMatchObject({
        nodes,
        edges,
        groups: [{ id: "g1" }],
        selected: ["a"],
        ...expected,
      });
      expect(created.height()).toBe("480px");
      expectEvents(el, engine, {
        hover: "minerva-hover",
        click: "minerva-item-click",
        select: [
          "minerva-selection-change",
          (payload) => ({ ids: (payload as { ids?: unknown }).ids }),
        ],
        toggle: "minerva-toggle",
        groupToggle: "minerva-group-toggle",
        layoutEnd: "minerva-layout-end",
        renderer: ["minerva-renderer-change", (renderer) => ({ renderer })],
      });
      const listener = vi.fn();
      el.addEventListener("minerva-selection-change", listener);
      engine.fire("select", { ids: ["a", "b"] });
      expect(listener.mock.calls[0][0].detail).toEqual({ ids: ["a", "b"] });
      expectForwarded(methods, engine, {
        fit: [false],
        focusNode: ["a", { zoom: 2 }],
        setData: [{ nodes, edges }],
        select: [["b"]],
        getSelection: [],
        expand: ["a"],
        collapse: ["b"],
        toggle: ["a"],
        getPositions: [],
        relayout: [],
        getRenderer: [],
      });
    },
  );

  it("keeps the layout when the data is rebuilt with the same objects", async () => {
    const { el, engine } = await create("minerva-graph-chart", {
      nodes,
      edges,
      options: { force: { charge: -100 } },
    });
    const chart = el as HTMLElement & Record<string, unknown>;
    Object.assign(chart, {
      nodes: [...nodes],
      edges: [...edges],
      options: { force: { charge: -100 } },
      height: 300,
    });
    await settle();
    expect(called(engine, "setOptions")).toEqual([]);
    const more = [...nodes, { id: "c" }];
    chart.nodes = more;
    await settle();
    expect(called(engine, "setOptions")).toHaveLength(1);
    expect(engine.options.nodes).toBe(more);
    chart.edgeStyle = "orthogonal";
    await settle();
    expect(called(engine, "setOptions")).toHaveLength(2);
    expect(engine.options).toMatchObject({ edgeStyle: "orthogonal" });
    // a reconnected element creates a new engine with the current options
    const parent = el.parentElement!;
    el.remove();
    parent.append(el);
    await settle();
    expect(last()).not.toBe(engine);
    expect(last().options.nodes).toBe(more);
  });

  it("waits for its data and returns empty values before it is connected", async () => {
    const tree = await create("minerva-tree-chart", { nodes });
    expect(engines).toHaveLength(0);
    const element = tree.el as unknown as Record<string, () => unknown>;
    expect(element.getSelection()).toEqual([]);
    expect(element.getPositions()).toEqual({});
    expect(element.getRenderer()).toBeNull();
    (tree.el as unknown as { edges: unknown }).edges = edges;
    await settle();
    expect(last().options).toMatchObject({ layout: "tree", direction: "LR" });
  });
});
