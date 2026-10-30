import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DonutChart from "./DonutChart.vue";
import FunnelChart from "./FunnelChart.vue";
import GaugeChart from "./GaugeChart.vue";
import PieChart from "./PieChart.vue";
import RadarChart from "./RadarChart.vue";
import ShapeChart from "./ShapeChart.vue";
import TreemapChart from "./TreemapChart.vue";
import SankeyChart from "./SankeyChart.vue";
import SunburstChart from "./SunburstChart.vue";
import RadialBarChart from "./RadialBarChart.vue";
import CalendarHeatmap from "./CalendarHeatmap.vue";
import BulletChart from "./BulletChart.vue";
import type { ShapeChartHandle } from "./shape-chart-types";

/** 2D context double recording the calls (like the engine tests) */
const fakeContext = () => {
  const calls: { name: string; args: unknown[] }[] = [];
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
      return true;
    },
  });
  return { ctx, calls };
};

const RECT = { left: 60, top: 80, width: 400, height: 300 };
let frames: (() => void)[] = [];
let calls: { name: string; args: unknown[] }[] = [];
const flushFrames = () => {
  while (frames.length) frames.shift()!();
};
const raf = globalThis.requestAnimationFrame;
const caf = globalThis.cancelAnimationFrame;
const previousUni = uni;

beforeEach(() => {
  frames = [];
  const fake = fakeContext();
  calls = fake.calls;
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    (() => fake.ctx) as unknown as HTMLCanvasElement["getContext"],
  );
  vi.spyOn(
    HTMLCanvasElement.prototype,
    "getBoundingClientRect",
  ).mockReturnValue({
    ...RECT,
    x: RECT.left,
    y: RECT.top,
    right: RECT.left + RECT.width,
    bottom: RECT.top + RECT.height,
    toJSON: () => ({}),
  } as DOMRect);
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
    frames.push(() => cb(0));
  globalThis.cancelAnimationFrame = () => {};
  vi.stubGlobal("uni", {
    ...previousUni,
    getWindowInfo: () => ({ pixelRatio: 2 }),
    onWindowResize: vi.fn(),
    offWindowResize: vi.fn(),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  globalThis.requestAnimationFrame = raf;
  globalThis.cancelAnimationFrame = caf;
  vi.stubGlobal("uni", previousUni);
});

const handleOf = (wrapper: { vm: unknown }) =>
  wrapper.vm as unknown as ShapeChartHandle;

/** Dispatches a touch event (H5 client coordinates); `p` is in canvas pixels */
const touch = async (
  target: Element,
  type: "touchstart" | "touchend",
  p: { x: number; y: number },
) => {
  const list = [
    { clientX: p.x + RECT.left, clientY: p.y + RECT.top, identifier: 0 },
  ];
  const event = new Event(type, { bubbles: true });
  Object.defineProperty(event, "touches", {
    value: type === "touchend" ? [] : list,
  });
  Object.defineProperty(event, "changedTouches", { value: list });
  target.dispatchEvent(event);
  await nextTick();
};
const tap = async (target: Element, p: { x: number; y: number }) => {
  await touch(target, "touchstart", p);
  await touch(target, "touchend", p);
};

const texts = () =>
  calls.filter((c) => c.name === "fillText").map((c) => c.args[0]);

const data = [
  { name: "Alpha", value: 3 },
  { name: "Beta", value: 1 },
];

describe("uni shape charts (H5 canvas)", () => {
  it("draws a pie on the inner canvas with the device pixel ratio", async () => {
    const wrapper = mount(PieChart, { props: { data, animation: false } });
    await flushPromises();
    const host = wrapper.find("uni-canvas");
    expect(host.attributes("type")).toBe("2d");
    expect(host.attributes("canvas-id")).toMatch(/^mn-shape-chart-/);
    expect(host.attributes("aria-label")).toBe("Pie chart");
    expect(wrapper.attributes("style")).toContain("height: 320px");
    expect(handleOf(wrapper).getInstance()).not.toBeNull();
    flushFrames();
    const canvas = wrapper.find("canvas.uni-canvas-canvas")
      .element as HTMLCanvasElement;
    expect(canvas.width).toBe(800);
    expect(texts()).toContain("Alpha");
    wrapper.unmount();
  });

  it("defaults the donut hole and the gauge height", async () => {
    const donut = mount(DonutChart, {
      props: { data, centerLabel: "Total", animation: false },
    });
    await flushPromises();
    expect(donut.find("uni-canvas").attributes("aria-label")).toBe(
      "Donut chart",
    );
    expect(texts()).toContain("Total");
    donut.unmount();
    const gauge = mount(GaugeChart, { props: { value: 42, label: "CPU" } });
    await flushPromises();
    expect(gauge.attributes("style")).toContain("height: 240px");
    expect(gauge.find("uni-canvas").attributes("aria-label")).toBe(
      "Gauge: CPU",
    );
    gauge.unmount();
  });

  it("emits click for a tapped slice and toggle for a legend item", async () => {
    const wrapper = mount(PieChart, {
      props: { data, labels: "none", animation: false },
    });
    await flushPromises();
    flushFrames();
    const host = wrapper.find("uni-canvas").element;
    const alpha = calls.filter(
      (c) => c.name === "fillText" && c.args[0] === "Alpha",
    );
    const [lx, ly] = alpha[alpha.length - 1]!.args.slice(1) as number[];
    await tap(host, { x: lx! + 4, y: ly! });
    expect(wrapper.emitted("toggle")![0]).toEqual([
      { index: 0, hidden: true, hiddenIndexes: [0] },
    ]);
    handleOf(wrapper).getInstance()!.toggle(0);
    flushFrames();
    await tap(host, { x: 230, y: 130 });
    expect(wrapper.emitted("click")![0]![0]).toMatchObject({
      index: 0,
      name: "Alpha",
    });
    wrapper.unmount();
  });

  it("sends prop updates to the engine", async () => {
    const wrapper = mount(FunnelChart, { props: { data, animation: false } });
    await flushPromises();
    const instance = handleOf(wrapper).getInstance()!;
    const setOptions = vi.spyOn(instance, "setOptions");
    await wrapper.setProps({ data: [...data, { name: "Gamma", value: 1 }] });
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions.mock.calls[0]![0]).toMatchObject({
      type: "funnel",
      data: [{ name: "Alpha" }, { name: "Beta" }, { name: "Gamma" }],
    });
    wrapper.unmount();
  });

  it("draws radar and treemap charts, and any type with ShapeChart", async () => {
    const radar = mount(RadarChart, {
      props: {
        indicators: [{ name: "Speed" }, { name: "Power" }, { name: "Range" }],
        series: [{ name: "A", values: [3, 4, 2] }],
        animation: false,
      },
    });
    await flushPromises();
    expect(texts()).toContain("Power");
    radar.unmount();
    const treemap = mount(TreemapChart, {
      props: {
        data: [
          { name: "Docs", value: 4 },
          { name: "Blog", value: 2 },
        ],
        animation: false,
      },
    });
    await flushPromises();
    expect(texts()).toContain("Docs");
    treemap.unmount();
    const generic = mount(ShapeChart, {
      props: {
        options: { type: "gauge", value: 64, label: "Load", animation: false },
      },
    });
    await flushPromises();
    expect(generic.attributes("style")).toContain("height: 240px");
    expect(texts()).toContain("Load");
    await generic.setProps({
      options: { type: "pie", data, animation: false },
    });
    flushFrames();
    expect(generic.attributes("style")).toContain("height: 320px");
    expect(texts()).toContain("Beta");
    generic.unmount();
  });

  it("draws sankey, sunburst, radial bar, calendar heatmap and bullet charts", async () => {
    const cases = [
      {
        component: SankeyChart,
        props: {
          links: [
            { source: "Ads", target: "Site", value: 6 },
            { source: "Site", target: "Signup", value: 3 },
          ],
        },
        label: "Sankey diagram",
        height: "360px",
        text: "Signup",
      },
      {
        component: SunburstChart,
        props: {
          data: [
            { name: "Web", children: [{ name: "Docs", value: 4 }] },
            { name: "Mobile", value: 2 },
          ],
        },
        label: "Sunburst chart",
        height: "360px",
      },
      {
        component: RadialBarChart,
        props: { data: [{ name: "Move", value: 420, max: 500 }] },
        label: "Radial bar chart",
        height: "300px",
        text: "Move",
      },
      {
        component: CalendarHeatmap,
        props: { data: [{ date: "2026-03-02", value: 3 }], range: 2026 },
        label: "Calendar heatmap",
        height: "170px",
      },
      {
        component: BulletChart,
        props: {
          data: [{ name: "Revenue", value: 270, target: 250 }],
          ranges: [150, 225, 300],
        },
        label: "Bullet chart",
        height: "96px",
        text: "Revenue",
      },
    ] as const;
    for (const { component, props, label, height, ...rest } of cases) {
      calls.length = 0;
      const wrapper = mount(
        component as Parameters<typeof mount>[0],
        {
          props: { ...props, animation: false },
        } as never,
      );
      await flushPromises();
      expect(wrapper.find("uni-canvas").attributes("aria-label")).toBe(label);
      expect(wrapper.attributes("style"), label).toContain(`height: ${height}`);
      expect(
        calls.filter((c) => c.name === "fill" || c.name === "stroke").length,
        label,
      ).toBeGreaterThan(0);
      if ("text" in rest) expect(texts().join(" "), label).toContain(rest.text);
      wrapper.unmount();
    }
  });

  it("emits drill from SunburstChart and ShapeChart", async () => {
    const tree = [
      {
        name: "Web",
        children: [
          { name: "Docs", value: 4 },
          { name: "Blog", value: 2 },
        ],
      },
      { name: "Mobile", value: 6 },
    ];
    const named = mount(SunburstChart, {
      props: { data: tree, animation: false },
    });
    await flushPromises();
    const chart = handleOf(named).getInstance()!;
    chart.drill(["Web"]);
    expect(named.emitted("drill")).toEqual([[{ path: ["Web"] }]]);
    expect(chart.getDrillPath()).toEqual(["Web"]);
    named.unmount();

    const generic = mount(ShapeChart, {
      props: { options: { type: "sunburst", data: tree, animation: false } },
    });
    await flushPromises();
    handleOf(generic).getInstance()!.drill(["Web"]);
    expect(generic.emitted("drill")).toEqual([[{ path: ["Web"] }]]);
    expect(generic.attributes("style")).toContain("height: 360px");
    generic.unmount();
  });
});
