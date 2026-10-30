import simulate from "miniprogram-simulate";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, expect, it, vi } from "vitest";
import type { ChartOptions } from "@minerva/charts/canvas";
import { chartTheme } from "./charts";
import * as weapp from "./index";
import {
  areaChart,
  barChart,
  boxPlotChart,
  bubbleChart,
  candlestickChart,
  chart,
  configProvider,
  ganttChart,
  heatmapChart,
  histogramChart,
  horizontalBarChart,
  lineChart,
  mixedChart,
  quadrantChart,
  rangeAreaChart,
  scatterChart,
  sparkline,
  waterfallChart,
} from "./index";
import { weappChartManifest } from "./manifest";

/** Engine options the charts were created / updated with, latest last */
const engineOptions: ChartOptions[] = [];
vi.mock("@minerva/charts/canvas", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@minerva/charts/canvas")>();
  return {
    ...actual,
    createCanvasChart: (
      config: Parameters<typeof actual.createCanvasChart>[0],
    ) => {
      engineOptions.push(config.options);
      const chart = actual.createCanvasChart(config);
      const setOptions = chart.setOptions.bind(chart);
      chart.setOptions = (options) => {
        engineOptions.push(options);
        setOptions(options);
      };
      return chart;
    },
  };
});
const lastOptions = () => engineOptions[engineOptions.length - 1]!;

type Control = typeof lineChart;
type Root = simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>;

/** 2D context double: records calls and property writes (fillStyle, ...) */
const fakeCanvas = () => {
  const calls: { name: string; args: unknown[] }[] = [];
  const writes: { name: string; value: unknown }[] = [];
  const state: Record<string, unknown> = {};
  const ctx = new Proxy(state, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      return (...args: unknown[]) => {
        calls.push({ name: key, args });
      };
    },
    set(target, key: string, value) {
      target[key] = value;
      writes.push({ name: key, value });
      return true;
    },
  });
  const frames: (() => void)[] = [];
  const canvas = {
    width: 0,
    height: 0,
    getContext: () => ctx,
    requestAnimationFrame: (cb: () => void) => frames.push(cb),
    cancelAnimationFrame: () => {},
  };
  const flush = () => {
    while (frames.length) frames.shift()!();
  };
  const texts = () =>
    calls.filter((c) => c.name === "fillText").map((c) => String(c.args[0]));
  const colors = () =>
    writes
      .filter((w) => w.name === "fillStyle" || w.name === "strokeStyle")
      .map((w) => String(w.value).replace(/\s/g, ""));
  const clear = () => {
    calls.length = 0;
    writes.length = 0;
  };
  return { canvas, calls, frames, flush, texts, colors, clear };
};
type FakeCanvas = ReturnType<typeof fakeCanvas>;

// j-component's SelectorQuery has no `node` field: answer node queries with a
// fake canvas per component, asynchronously like WeChat.
const size = { width: 300, height: 200 };
const canvases = new Map<unknown, FakeCanvas>();
let patched = false;
interface Query {
  _queue: { exparserNode: unknown; fields: { node?: boolean } }[];
  _queueCallback: (((result: unknown) => void) | null)[];
}
const patchSelectorQuery = (instance: WechatMiniprogram.IAnyObject) => {
  if (patched) return;
  patched = true;
  const proto = Object.getPrototypeOf(instance.createSelectorQuery());
  const original = proto.exec;
  proto.exec = function (this: Query, callback?: (result: unknown[]) => void) {
    if (!this._queue.some((item) => item.fields?.node))
      return original.call(this, callback);
    const queue = this._queue,
      callbacks = this._queueCallback;
    this._queue = [];
    this._queueCallback = [];
    const result = queue.map((item) => {
      let fake = canvases.get(item.exparserNode);
      if (!fake) {
        fake = fakeCanvas();
        canvases.set(item.exparserNode, fake);
      }
      return { node: fake.canvas, width: size.width, height: size.height };
    });
    setTimeout(() => {
      result.forEach((item, i) => callbacks[i]?.(item));
      callback?.(result);
    }, 0);
  };
};
const lastCanvas = () => [...canvases.values()].at(-1)!;

const mounted: Root[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  canvases.clear();
  size.width = 300;
  size.height = 200;
});
const tick = () => simulate.sleep(0);
const mount = async (control: Control, props: Record<string, unknown>) => {
  const id = simulate.load({
    tagName: "chart-case",
    template: control.template,
    ...control.definition,
  });
  const w = simulate.render(id, props) as Root;
  patchSelectorQuery(w.instance);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  const fake = lastCanvas();
  fake?.flush();
  return { w, fake };
};
const listen = (w: Root, ...names: string[]) => {
  const events: { name: string; detail: WechatMiniprogram.IAnyObject }[] = [];
  for (const name of names)
    w.addEventListener(name, (e: { detail: WechatMiniprogram.IAnyObject }) =>
      events.push({ name, detail: e.detail }),
    );
  return events;
};
const tap = (w: Root, x: number, y: number, identifier = 0) => {
  const touch = { x, y, identifier };
  w.instance.onTouchStart({ touches: [touch], changedTouches: [touch] });
  w.instance.onTouchEnd({ touches: [], changedTouches: [touch] });
};

it("registers canvas 2d templates with touch forwarding and the shared consumer API", () => {
  for (const control of [
    chart,
    lineChart,
    barChart,
    scatterChart,
    quadrantChart,
  ]) {
    expect(control.template).toContain('<canvas type="2d"');
    for (const [event, handler] of [
      ["touchstart", "onTouchStart"],
      ["touchmove", "onTouchMove"],
      ["touchend", "onTouchEnd"],
      ["touchcancel", "onTouchCancel"],
    ])
      expect(control.template).toContain(`bind${event}="${handler}"`);
    for (const name of [
      "configure",
      "resize",
      "resetZoom",
      "getView",
      "setView",
      "getPlotRect",
      "toPixel",
      "fromPixel",
      "getConfig",
    ])
      expect(control.definition.methods[name]).toBeTypeOf("function");
  }
  expect(lineChart.definition.properties.area).toBeDefined();
  expect(barChart.definition.properties.stacked).toBeDefined();
  expect(quadrantChart.definition.properties.draggable.value).toBe(false);
});

it("creates the chart on the measured canvas node at the device pixel ratio", async () => {
  const { w, fake } = await mount(lineChart, {
    series: [{ name: "Visits", data: [1, 3, 2] }],
    height: 200,
    ariaLabel: "Visits",
  });
  expect(w.data.chartHeight).toBe("200px");
  expect(w.data.chartWidth).toBe("100%");
  // miniprogram-simulate reports pixelRatio 3
  expect([fake.canvas.width, fake.canvas.height]).toEqual([900, 600]);
  expect(fake.calls.some((c) => c.name === "lineTo")).toBe(true);
  expect(fake.texts().length).toBeGreaterThan(0);
  expect(w.instance.getView()).toMatchObject({ x: [0, 2] });
  expect(w.instance.getPlotRect()).toMatchObject({
    width: expect.any(Number),
  });
});

it("re-applies options and size when properties change", async () => {
  const { w, fake } = await mount(barChart, {
    series: [{ data: [1, 2, 3] }],
  });
  const before = w.instance.getView();
  fake.clear();
  w.setData({ series: [{ data: [1, 2, 3, 4, 5, 6] }], stacked: true });
  fake.flush();
  expect(fake.calls.some((c) => c.name === "fill")).toBe(true);
  expect(w.instance.getView().x[1]).toBeGreaterThan(before.x[1]);

  size.height = 240;
  w.setData({ height: 240 });
  await tick();
  await tick();
  fake.flush();
  expect(w.data.chartHeight).toBe("240px");
  expect(fake.canvas.height).toBe(720);
});

it("forwards canvas touches: tap emits hover and pointclick, pinch zooms and resetZoom restores", async () => {
  const { w, fake } = await mount(lineChart, {
    series: [{ name: "A", data: [1, 3, 2, 5, 4] }],
  });
  const events = listen(w, "hover", "pointclick", "zoom");
  const at = w.instance.toPixel(1, 3);
  tap(w, at.x, at.y);
  expect(events.find((e) => e.name === "pointclick")?.detail).toMatchObject({
    items: [{ index: 1, y: 3, seriesName: "A" }],
  });
  expect(events.find((e) => e.name === "hover")?.detail.items[0].index).toBe(1);
  fake.flush();

  // two fingers spreading apart zoom the x axis
  const plot = w.instance.getPlotRect();
  const cy = plot.y + plot.height / 2,
    cx = plot.x + plot.width / 2;
  const a = { x: cx - 20, y: cy, identifier: 1 },
    b = { x: cx + 20, y: cy, identifier: 2 };
  w.instance.onTouchStart({ touches: [a], changedTouches: [a] });
  w.instance.onTouchStart({ touches: [a, b], changedTouches: [b] });
  const a2 = { ...a, x: cx - 80 },
    b2 = { ...b, x: cx + 80 };
  w.instance.onTouchMove({ touches: [a2, b2], changedTouches: [a2, b2] });
  w.instance.onTouchEnd({ touches: [b2], changedTouches: [a2] });
  w.instance.onTouchEnd({ touches: [], changedTouches: [b2] });
  const zoom = events.filter((e) => e.name === "zoom").at(-1)?.detail;
  expect(zoom!.x[1] - zoom!.x[0]).toBeLessThan(4);
  w.instance.resetZoom();
  expect(w.instance.getView().x).toEqual([0, 4]);

  // cleared hover is still an object detail
  w.instance.onTouchCancel({ changedTouches: [] });
  expect(events.every((e) => e.detail && typeof e.detail === "object")).toBe(
    true,
  );
});

it("emits plotclick on empty plot area and applies configure() formatters and tooltip text", async () => {
  const { w, fake } = await mount(scatterChart, {
    series: [
      {
        name: "S",
        data: [
          [1, 1],
          [9, 9],
        ],
      },
    ],
    xAxis: { min: 0, max: 10 },
    yAxis: { min: 0, max: 10 },
  });
  const events = listen(w, "plotclick", "pointclick");
  w.instance.configure({
    yAxis: { format: (v: number) => `${v}%` },
    renderTooltip: (event: { items: { index: number }[] }) =>
      `point ${event.items[0].index}`,
  });
  fake.clear();
  fake.flush();
  expect(fake.texts().some((t) => t.endsWith("%"))).toBe(true);

  const empty = w.instance.toPixel(5, 2);
  tap(w, empty.x, empty.y);
  const click = events.find((e) => e.name === "plotclick")!.detail;
  expect(click.x).toBeCloseTo(5, 0);
  expect(click.y).toBeCloseTo(2, 0);

  const dot = w.instance.toPixel(9, 9);
  fake.clear();
  tap(w, dot.x, dot.y);
  fake.flush();
  expect(events.some((e) => e.name === "pointclick")).toBe(true);
  expect(fake.texts()).toContain("point 1");
});

it("QuadrantChart maps clicks to points and quadrants and drops dragged points", async () => {
  const points = [
    { x: 2, y: 8, label: "A" },
    { x: 8, y: 2, label: "B" },
  ];
  const { w, fake } = await mount(quadrantChart, {
    points,
    draggable: true,
    quadrants: { topRight: { label: "Do first" } },
  });
  const events = listen(
    w,
    "pointclick",
    "quadrantclick",
    "pointdrag",
    "pointdrop",
  );
  w.instance.configure({
    renderTooltip: (point: { label: string }, index: number) =>
      `${point.label}#${index}`,
  });
  const a = w.instance.toPixel(2, 8);
  fake.clear();
  tap(w, a.x, a.y);
  fake.flush();
  expect(events.find((e) => e.name === "pointclick")?.detail).toEqual({
    point: points[0],
    index: 0,
  });
  expect(fake.texts()).toContain("A#0");
  expect(fake.texts()).toContain("Do first");

  const empty = w.instance.toPixel(8, 8);
  tap(w, empty.x, empty.y);
  expect(events.find((e) => e.name === "quadrantclick")?.detail).toMatchObject({
    quadrant: "topRight",
  });

  // drag A into the top-right quadrant
  const target = w.instance.toPixel(7, 7);
  const start = { x: a.x, y: a.y, identifier: 3 };
  const mid = {
    x: (a.x + target.x) / 2,
    y: (a.y + target.y) / 2,
    identifier: 3,
  };
  const end = { x: target.x, y: target.y, identifier: 3 };
  w.instance.onTouchStart({ touches: [start], changedTouches: [start] });
  w.instance.onTouchMove({ touches: [mid], changedTouches: [mid] });
  w.instance.onTouchMove({ touches: [end], changedTouches: [end] });
  w.instance.onTouchEnd({ touches: [], changedTouches: [end] });
  expect(events.some((e) => e.name === "pointdrag")).toBe(true);
  const drop = events.find((e) => e.name === "pointdrop")!.detail;
  expect(drop).toMatchObject({
    point: points[0],
    index: 0,
    target: { quadrant: "topRight" },
  });
  expect(drop.target.x).toBeCloseTo(7, 0);
  expect(drop.target.y).toBeCloseTo(7, 0);
});

it("QuadrantChart does not drag points unless draggable", async () => {
  const { w } = await mount(quadrantChart, {
    points: [{ x: 2, y: 8, label: "A" }],
  });
  const events = listen(w, "pointdrop", "pointdrag");
  const a = w.instance.toPixel(2, 8),
    b = w.instance.toPixel(8, 2);
  const start = { x: a.x, y: a.y, identifier: 0 },
    end = { x: b.x, y: b.y, identifier: 0 };
  w.instance.onTouchStart({ touches: [start], changedTouches: [start] });
  w.instance.onTouchMove({ touches: [end], changedTouches: [end] });
  w.instance.onTouchEnd({ touches: [], changedTouches: [end] });
  expect(events).toEqual([]);
});

it("builds the chart theme from the Minerva tokens of the nearest provider", async () => {
  const light = chartTheme(),
    dark = chartTheme({
      theme: "dark",
      resolvedMode: "dark",
      palette: null,
      design: {},
    });
  expect(light.variables?.["--primary-color"]).toBe("#2563eb");
  expect(dark.variables?.["--primary-color"]).toBe("#818cf8");
  expect(dark.variables?.["--surface-color"]).not.toBe(
    light.variables?.["--surface-color"],
  );
  expect(
    chartTheme({
      theme: "dark",
      resolvedMode: "dark",
      palette: null,
      design: {},
    }),
  ).toBe(dark);
  expect(
    chartTheme({
      theme: { "primary-color": "#ff0000" },
      resolvedMode: "light",
      palette: null,
      design: {},
    }).variables?.["--primary-color"],
  ).toBe("#ff0000");
  expect(
    chartTheme({
      theme: "github-dark",
      resolvedMode: "dark",
      palette: null,
      design: {},
    }).variables?.["--primary-color"],
  ).not.toBe("#818cf8");

  const provider = simulate.load({
    tagName: "chart-provider",
    template: configProvider.template,
    ...configProvider.definition,
  });
  const child = simulate.load({
    tagName: "chart-child",
    template: lineChart.template,
    ...lineChart.definition,
  });
  const host = simulate.load({
    tagName: "chart-theme-host",
    usingComponents: { "mn-provider": provider, "mn-line-chart": child },
    template:
      '<mn-provider mode="{{mode}}"><mn-line-chart id="c" series="{{series}}"/></mn-provider>',
    data: { mode: "light", series: [{ data: [1, 2, 3] }] },
  });
  const w = simulate.render(host) as Root;
  patchSelectorQuery(w.instance);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  const fake = lastCanvas();
  fake.flush();
  expect(fake.colors().some((c) => c.includes("37,99,235"))).toBe(true);
  fake.clear();
  w.setData({ mode: "dark" });
  await tick();
  fake.flush();
  expect(fake.colors().some((c) => c.includes("129,140,248"))).toBe(true);
  expect(fake.colors().some((c) => c.includes("37,99,235"))).toBe(false);
});

it("waits for a visible size and creates the chart on resize()", async () => {
  size.width = 0;
  const { w } = await mount(chart, { series: [{ data: [1, 2] }] });
  expect(w.instance.getView()).toBeNull();
  size.width = 320;
  w.instance.resize();
  await tick();
  expect(w.instance.getView()).not.toBeNull();
});

it("destroys the chart on detach: no more frames, events or method results", async () => {
  const { w, fake } = await mount(lineChart, {
    series: [{ data: [1, 3, 2] }],
  });
  const events = listen(w, "hover", "pointclick");
  const at = w.instance.toPixel(1, 3);
  mounted.splice(mounted.indexOf(w), 1);
  w.detach();
  fake.clear();
  tap(w, at.x, at.y);
  w.instance.resize();
  await tick();
  fake.flush();
  expect(events).toEqual([]);
  expect(fake.calls).toEqual([]);
  expect(w.instance.getView()).toBeNull();
});

it("chart manifest lists every chart component with real tests", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  expect(weappChartManifest.map((entry) => entry.name)).toEqual([
    "Chart",
    "LineChart",
    "BarChart",
    "ScatterChart",
    "QuadrantChart",
    "PieChart",
    "DonutChart",
    "RadarChart",
    "GaugeChart",
    "FunnelChart",
    "TreemapChart",
    "ShapeChart",
    "AreaChart",
    "HorizontalBarChart",
    "CandlestickChart",
    "HeatmapChart",
    "Sparkline",
    "RangeAreaChart",
    "MixedChart",
    "BubbleChart",
    "HistogramChart",
    "BoxPlotChart",
    "WaterfallChart",
    "GanttChart",
    "SankeyChart",
    "SunburstChart",
    "RadialBarChart",
    "CalendarHeatmap",
    "BulletChart",
    "ChordChart",
    "TradingChart",
    "DepthChart",
    "OrderBook",
    "OrderBookHeatmap",
    "TimeAndSales",
    "Scatter3DChart",
    "Surface3DChart",
    "Bar3DChart",
    "Line3DChart",
  ]);
  for (const entry of weappChartManifest) {
    expect(entry.limitations.length, entry.name).toBeGreaterThan(0);
    for (const test of entry.tests)
      expect(existsSync(join(root, test.split(":")[0])), test).toBe(true);
  }
});

it("draws the named charts from their web props", async () => {
  const day = 86_400_000;
  const start = Date.UTC(2026, 0, 5);
  const cases: [Control, Record<string, unknown>, string][] = [
    [
      areaChart,
      {
        series: [
          {
            name: "Web",
            data: [
              ["Jan", 1],
              ["Feb", 3],
            ],
          },
        ],
        percent: true,
      },
      "Jan",
    ],
    [
      horizontalBarChart,
      {
        series: [
          {
            data: [
              ["Maps", 27],
              ["Notes", 12],
            ],
          },
        ],
        labels: true,
      },
      "Maps",
    ],
    [
      candlestickChart,
      { series: [{ data: [{ x: 0, open: 1, high: 3, low: 0, y: 2 }] }] },
      "",
    ],
    [heatmapChart, { data: [{ x: "Mon", y: "AM", value: 3 }] }, "Mon"],
    [sparkline, { data: [1, 4, 2, 5] }, ""],
    [rangeAreaChart, { series: [{ data: [{ x: 0, y0: 1, y: 3 }] }] }, ""],
    [
      mixedChart,
      {
        series: [
          { type: "bar", data: [["Q1", 3]] },
          { type: "line", yAxis: "right", data: [["Q1", 0.2]] },
        ],
        yAxis2: { title: "Growth" },
      },
      "Growth",
    ],
    [bubbleChart, { series: [{ data: [{ x: 1, y: 2, value: 3 }] }] }, ""],
    [histogramChart, { values: [1, 2, 2, 3, 9], name: "Orders" }, ""],
    [boxPlotChart, { groups: [{ x: "A", values: [1, 2, 3, 4, 20] }] }, "A"],
    [
      waterfallChart,
      {
        steps: [
          { label: "Start", value: 10 },
          { label: "Sales", value: 4 },
        ],
      },
      "Sales",
    ],
    [
      ganttChart,
      {
        tasks: [{ name: "Design", start, end: start + 3 * day }],
        today: start + day,
        todayLabel: "Today",
      },
      "Design",
    ],
  ];
  for (const [control, props, text] of cases) {
    const { fake } = await mount(control, props);
    expect(fake.calls.length, JSON.stringify(props)).toBeGreaterThan(0);
    if (text) expect(fake.texts(), text).toContain(text);
  }
  const { w } = await mount(sparkline, { data: [1, 2] });
  expect(w.instance.data.chartHeight).toBe("48px");
});

it("passes the preset options, locale and labels to the engine", async () => {
  await mount(waterfallChart, {
    steps: [{ label: "Start", value: 10 }],
    connector: { dash: [2, 2] },
    locale: "zh-CN",
    labels: false,
  });
  expect(lastOptions().series[0]).toMatchObject({
    connector: { dash: [2, 2] },
    showLabels: false,
  });
  expect(lastOptions().locale).toBe("zh-CN");
  // `labels` of the waterfall are the value labels, not the texts
  expect(lastOptions().labels).toBeUndefined();
  await mount(heatmapChart, {
    data: [
      { x: "a", y: "r", value: -1 },
      { x: "b", y: "r", value: 1 },
    ],
    colorScale: "diverging",
    colorMidpoint: 0,
  });
  expect(lastOptions().series[0]).toMatchObject({
    colorScale: "diverging",
    colorMidpoint: 0,
  });
  await mount(ganttChart, {
    tasks: [
      { name: "Design", start: 0, end: 40 },
      { name: "Build", start: 40, end: 100, dependencies: ["Design"] },
    ],
    dependenciesName: "After",
  });
  expect(JSON.stringify(lastOptions().series)).toContain('"name":"After"');
  expect(lastOptions().dependencies).toEqual([{ from: "Design", to: "Build" }]);
  const ganttWithArrows = await mount(ganttChart, {
    tasks: [
      { name: "Design", start: 0, end: 40 },
      { name: "Build", start: 40, end: 100, dependencies: ["Design"] },
    ],
    dependencyColor: "#f00",
  });
  expect(lastOptions().dependencies).toEqual([
    { from: "Design", to: "Build", color: "#f00" },
  ]);
  ganttWithArrows.w.setData({ dependencyArrows: false });
  await tick();
  expect(lastOptions().dependencies).toEqual([]);
  await mount(boxPlotChart, {
    groups: [{ x: "A", values: [1, 2, 3, 4, 20] }],
    outlierShape: "filled",
    outlierSize: 10,
  });
  expect(lastOptions().series[0]).toMatchObject({
    outlierShape: "filled",
    outlierSize: 10,
  });
  const { w } = await mount(areaChart, {
    series: [{ data: [1, 2] }],
    locale: "ja",
    labels: { series: "系列" },
  });
  expect(lastOptions()).toMatchObject({
    locale: "ja",
    labels: { series: "系列" },
  });
  w.setData({ locale: "fr" });
  await tick();
  expect(lastOptions().locale).toBe("fr");
  await mount(sparkline, {
    data: [1, 2],
    locale: "fr",
    labels: { value: "V" },
  });
  expect(lastOptions()).toMatchObject({
    locale: "fr",
    labels: { value: "V" },
  });
});

it("names the charts in their locale, the ConfigProvider's by default", async () => {
  expect(areaChart.template).toContain('aria-label="{{chartLabel}}"');
  const { w } = await mount(areaChart, {
    series: [
      { name: "Web", data: [1, 2] },
      { name: "App", data: [2, 1] },
    ],
  });
  expect(w.instance.data.chartLabel).toBe("Chart: Web, App");
  // the provider's language reaches the consumers as `localeLanguage`
  w.setData({ localeLanguage: "zh" });
  await tick();
  expect(lastOptions().locale).toBe("zh");
  expect(w.instance.data.chartLabel).toBe("图表：Web、App");
  w.setData({ locale: "ja" });
  await tick();
  expect(w.instance.data.chartLabel).toBe("グラフ：Web、App");
  w.setData({ ariaLabel: "Traffic" });
  await tick();
  expect(w.instance.data.chartLabel).toBe("Traffic");
});

it("does not export the DOM / GPU-only charts", () => {
  for (const entry of weappChartManifest) {
    const exported = Object.keys(weapp).some(
      (key) => key.toLowerCase() === entry.name.toLowerCase(),
    );
    expect(exported, entry.name).toBe(entry.status !== "n/a");
  }
});
