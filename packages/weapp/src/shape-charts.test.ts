import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import {
  configProvider,
  donutChart,
  funnelChart,
  gaugeChart,
  pieChart,
  radarChart,
  shapeChart,
  treemapChart,
  sankeyChart,
  sunburstChart,
  radialBarChart,
  calendarHeatmap,
  bulletChart,
  chordChart,
} from "./index";

type Control = typeof pieChart;
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
  const textAt = (text: string) => {
    const found = calls.filter(
      (c) => c.name === "fillText" && c.args[0] === text,
    );
    return found[found.length - 1]?.args.slice(1) as [number, number];
  };
  const colors = () =>
    writes
      .filter((w) => w.name === "fillStyle" || w.name === "strokeStyle")
      .map((w) => String(w.value).replace(/\s/g, ""));
  const clear = () => {
    calls.length = 0;
    writes.length = 0;
  };
  return { canvas, calls, flush, texts, textAt, colors, clear };
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
const lastCanvas = () => {
  const all = [...canvases.values()];
  return all[all.length - 1]!;
};

const mounted: Root[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  canvases.clear();
  size.width = 300;
  size.height = 200;
});
const tick = () => simulate.sleep(0);
let cases = 0;
const mount = async (control: Control, props: Record<string, unknown>) => {
  const id = simulate.load({
    tagName: `shape-chart-case-${cases++}`,
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
const tap = (w: Root, x: number, y: number) => {
  const touch = { x, y, identifier: 0 };
  w.instance.onTouchStart({ touches: [touch], changedTouches: [touch] });
  w.instance.onTouchEnd({ touches: [], changedTouches: [touch] });
};

const data = [
  { name: "Alpha", value: 3 },
  { name: "Beta", value: 1 },
];

it("registers canvas 2d templates with touches and the shape chart methods", () => {
  for (const control of [
    pieChart,
    donutChart,
    radarChart,
    gaugeChart,
    funnelChart,
    treemapChart,
    sankeyChart,
    sunburstChart,
    radialBarChart,
    calendarHeatmap,
    bulletChart,
    shapeChart,
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
      "toggle",
      "getHidden",
      "clearHover",
      "drill",
      "getDrillPath",
      "getConfig",
    ])
      expect(control.definition.methods[name]).toBeTypeOf("function");
  }
  expect(shapeChart.definition.properties.options).toBeDefined();
  expect(radarChart.definition.properties.indicators).toBeDefined();
});

it("draws a pie on the measured canvas node at the device pixel ratio", async () => {
  const { w, fake } = await mount(pieChart, { data, animation: false });
  expect(w.data.chartHeight).toBe("320px");
  expect(w.data.chartLabel).toBe("Pie chart");
  // miniprogram-simulate reports pixelRatio 3
  expect([fake.canvas.width, fake.canvas.height]).toEqual([900, 600]);
  expect(fake.calls.some((c) => c.name === "arc")).toBe(true);
  expect(fake.texts()).toContain("Alpha");
});

it("defaults the donut hole, the gauge height and the generic chart height", async () => {
  const donut = await mount(donutChart, {
    data,
    centerLabel: "Total",
    animation: false,
  });
  expect(donut.w.data.chartLabel).toBe("Donut chart");
  expect(donut.fake.texts()).toContain("Total");
  const gauge = await mount(gaugeChart, { value: 42, label: "CPU" });
  expect(gauge.w.data.chartHeight).toBe("240px");
  expect(gauge.w.data.chartLabel).toBe("Gauge: CPU");
  const generic = await mount(shapeChart, {
    options: { type: "gauge", value: 10, animation: false },
  });
  expect(generic.w.data.chartHeight).toBe("240px");
  generic.w.setData({ options: { type: "funnel", data, animation: false } });
  await tick();
  generic.fake.flush();
  expect(generic.w.data.chartHeight).toBe("320px");
  expect(generic.fake.texts()).toContain("Beta");
});

it("taps: a slice emits hover and click, a legend item emits toggle", async () => {
  const { w, fake } = await mount(pieChart, {
    data,
    labels: "none",
    animation: false,
  });
  const events = listen(w, "hover", "click", "toggle");
  const [lx, ly] = fake.textAt("Alpha");
  tap(w, lx + 4, ly);
  expect(events.find((e) => e.name === "toggle")?.detail).toEqual({
    index: 0,
    hidden: true,
    hiddenIndexes: [0],
  });
  expect(w.instance.getHidden()).toEqual([0]);
  w.instance.toggle(0);
  fake.flush();
  // the first slice covers 12 to 9 o'clock: the right of the center
  tap(w, 180, 80);
  expect(events.find((e) => e.name === "click")?.detail).toMatchObject({
    index: 0,
    name: "Alpha",
  });
  expect(events.find((e) => e.name === "hover")?.detail).toMatchObject({
    index: 0,
  });
  w.instance.clearHover();
  expect(events[events.length - 1]).toMatchObject({
    name: "hover",
    detail: { index: -1 },
  });
});

it("controlled hidden: legend taps only emit toggle", async () => {
  const { w, fake } = await mount(funnelChart, {
    data,
    hidden: [1],
    animation: false,
  });
  const events = listen(w, "toggle");
  const [lx, ly] = fake.textAt("Alpha");
  tap(w, lx + 4, ly);
  expect(events[0]?.detail).toEqual({
    index: 0,
    hidden: true,
    hiddenIndexes: [0, 1],
  });
  expect(w.instance.getHidden()).toEqual([1]);
});

it("applies configure() formatters and tooltip text, and property updates", async () => {
  const { w, fake } = await mount(radarChart, {
    indicators: [{ name: "Speed" }, { name: "Power" }, { name: "Range" }],
    series: [{ name: "A", values: [3, 4, 2] }],
    animation: false,
  });
  expect(fake.texts()).toContain("Power");
  fake.clear();
  w.setData({
    indicators: [{ name: "Speed" }, { name: "Power" }, { name: "Cost" }],
  });
  fake.flush();
  expect(fake.texts()).toContain("Cost");

  const tree = await mount(treemapChart, {
    data: [
      { name: "Docs", value: 4 },
      { name: "Blog", value: 2 },
    ],
    animation: false,
  });
  tree.w.instance.configure({
    format: (v: number) => `${v} GB`,
    renderTooltip: (event: { name: string }) => `tip ${event.name}`,
  });
  tree.fake.clear();
  tree.fake.flush();
  expect(tree.fake.texts().some((t) => t.endsWith(" GB"))).toBe(true);
  tap(tree.w, 60, 60);
  tree.fake.flush();
  expect(tree.fake.texts()).toContain("tip Docs");
});

it("follows the theme of the nearest provider", async () => {
  const provider = simulate.load({
    tagName: "shape-provider",
    template: configProvider.template,
    ...configProvider.definition,
  });
  const child = simulate.load({
    tagName: "shape-child",
    template: pieChart.template,
    ...pieChart.definition,
  });
  const host = simulate.load({
    tagName: "shape-theme-host",
    usingComponents: { "mn-provider": provider, "mn-pie-chart": child },
    template:
      '<mn-provider mode="{{mode}}"><mn-pie-chart id="c" data="{{data}}" animation="{{false}}"/></mn-provider>',
    data: { mode: "light", data },
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
  expect(fake.colors().some((c) => c.includes("37,99,235"))).toBe(false);
});

it("destroys the chart on detach", async () => {
  const { w, fake } = await mount(pieChart, { data, animation: false });
  const events = listen(w, "hover", "click");
  mounted.splice(mounted.indexOf(w), 1);
  w.detach();
  fake.clear();
  tap(w, 180, 80);
  await tick();
  fake.flush();
  expect(events).toEqual([]);
  expect(fake.calls).toEqual([]);
  expect(w.instance.getHidden()).toEqual([]);
});

it("draws sankey, sunburst, radial bar, calendar heatmap and bullet charts", async () => {
  const cases: [Control, Record<string, unknown>, string, string][] = [
    [
      sankeyChart,
      {
        links: [
          { source: "Ads", target: "Site", value: 6 },
          { source: "Site", target: "Signup", value: 3 },
        ],
      },
      "Sankey diagram",
      "360px",
    ],
    [
      sunburstChart,
      {
        data: [
          { name: "Web", children: [{ name: "Docs", value: 4 }] },
          { name: "Mobile", value: 2 },
        ],
      },
      "Sunburst chart",
      "360px",
    ],
    [
      radialBarChart,
      { data: [{ name: "Move", value: 420, max: 500 }] },
      "Radial bar chart",
      "300px",
    ],
    [
      calendarHeatmap,
      { data: [{ date: "2026-03-02", value: 3 }], range: 2026 },
      "Calendar heatmap",
      "170px",
    ],
    [
      calendarHeatmap,
      {
        data: [{ date: "2025-03-02", value: 3 }],
        range: ["2025-01-01", "2026-12-31"],
      },
      "Calendar heatmap",
      "290px",
    ],
    [
      // across new year but within 53 weeks: one strip
      calendarHeatmap,
      {
        data: [{ date: "2025-12-02", value: 3 }],
        range: ["2025-11-01", "2026-02-28"],
      },
      "Calendar heatmap",
      "170px",
    ],
    [
      bulletChart,
      {
        data: [{ name: "Revenue", value: 270, target: 250 }],
        ranges: [150, 225, 300],
      },
      "Bullet chart",
      "96px",
    ],
  ];
  for (const [control, props, label, height] of cases) {
    const { w, fake } = await mount(control, { ...props, animation: false });
    expect(w.data.chartLabel).toBe(label);
    expect(w.data.chartHeight, label).toBe(height);
    expect(
      fake.calls.filter((c) => c.name === "fill" || c.name === "stroke").length,
      label,
    ).toBeGreaterThan(0);
  }
});

it("sunburst: drill() emits drill and getDrillPath() follows it", async () => {
  const { w } = await mount(sunburstChart, {
    data: [
      {
        name: "Web",
        children: [
          { name: "Docs", value: 4 },
          { name: "Blog", value: 2 },
        ],
      },
      { name: "Mobile", value: 6 },
    ],
    animation: false,
  });
  const events = listen(w, "drill");
  w.instance.drill(["Web"]);
  expect(events).toEqual([{ name: "drill", detail: { path: ["Web"] } }]);
  expect(w.instance.getDrillPath()).toEqual(["Web"]);
});

it("chord-chart: draws arcs and ribbons, ticks via configure({ tickFormat }) and legend toggles", async () => {
  const { w, fake } = await mount(chordChart, {
    groups: ["Apps", "Web", "Store"],
    matrix: [
      [0, 5, 2],
      [3, 0, 4],
      [1, 2, 0],
    ],
    ticks: 2,
    animation: false,
  });
  expect(w.instance.data.chartLabel).toBe("Chord diagram");
  expect(w.instance.data.chartHeight).toBe("420px");
  expect(fake.calls.some((c) => c.name === "quadraticCurveTo")).toBe(true);
  expect(fake.texts()).toContain("Apps");
  w.instance.configure({ tickFormat: (v: number) => `${v}u` });
  await tick();
  fake.flush();
  expect(fake.texts().some((t) => /^\d+u$/.test(t))).toBe(true);
  const events = listen(w, "toggle");
  w.instance.toggle(1);
  expect(events[0]).toMatchObject({
    name: "toggle",
    detail: { index: 1, hiddenIndexes: [1] },
  });
});

it("forwards locale and texts to the engine", async () => {
  const { w, fake } = await mount(pieChart, {
    data: [],
    locale: "zh-CN",
    animation: false,
  });
  expect(fake.texts()).toContain("暂无数据");
  w.setData({ texts: { noData: "空" } });
  await tick();
  fake.flush();
  expect(fake.texts()).toContain("空");
});
