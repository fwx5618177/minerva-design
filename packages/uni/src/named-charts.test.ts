import { mount, flushPromises } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AreaChart from "./AreaChart.vue";
import BoxPlotChart from "./BoxPlotChart.vue";
import BubbleChart from "./BubbleChart.vue";
import CandlestickChart from "./CandlestickChart.vue";
import GanttChart from "./GanttChart.vue";
import HeatmapChart from "./HeatmapChart.vue";
import HistogramChart from "./HistogramChart.vue";
import HorizontalBarChart from "./HorizontalBarChart.vue";
import MixedChart from "./MixedChart.vue";
import RangeAreaChart from "./RangeAreaChart.vue";
import Sparkline from "./Sparkline.vue";
import WaterfallChart from "./WaterfallChart.vue";
import type { ChartHandle } from "./chart-types";
import {
  areaChartOptions,
  boxPlotChartOptions,
  ganttChartOptions,
  heatmapOptions,
  horizontalBarChartOptions,
  mixedChartOptions,
  sparklineChartOptions,
  waterfallChartOptions,
} from "./named-chart-options";

/** 2D context double recording the drawn texts and fills */
const fakeContext = () => {
  const calls: string[] = [];
  const texts: string[] = [];
  const ctx = new Proxy({} as Record<string, unknown>, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      if (key === "fillText") return (text: string) => texts.push(text);
      return () => calls.push(key);
    },
    set(target, key: string, value) {
      target[key] = value;
      return true;
    },
  });
  return { ctx, calls, texts };
};

const RECT = { left: 0, top: 0, width: 400, height: 300 };
let drawn = fakeContext();
let frames: (() => void)[] = [];
const flushFrames = () => {
  while (frames.length) frames.shift()!();
};
const raf = globalThis.requestAnimationFrame;
const previousUni = uni;

beforeEach(() => {
  drawn = fakeContext();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    (() => drawn.ctx) as unknown as HTMLCanvasElement["getContext"],
  );
  vi.spyOn(
    HTMLCanvasElement.prototype,
    "getBoundingClientRect",
  ).mockReturnValue({
    ...RECT,
    x: 0,
    y: 0,
    right: RECT.width,
    bottom: RECT.height,
    toJSON: () => ({}),
  } as DOMRect);
  frames = [];
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
    frames.push(() => cb(0));
  vi.stubGlobal("uni", {
    ...previousUni,
    getWindowInfo: () => ({ pixelRatio: 1 }),
    onWindowResize: vi.fn(),
    offWindowResize: vi.fn(),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  globalThis.requestAnimationFrame = raf;
  vi.stubGlobal("uni", previousUni);
});

const MONTHS = ["Jan", "Feb", "Mar"];
const day = 86_400_000;
const start = Date.UTC(2026, 0, 5);

describe("named cartesian chart options", () => {
  it("maps area, horizontal bar and mixed chart props to the presets", () => {
    const area = areaChartOptions({
      series: [{ data: MONTHS.map((m, i) => [m, i] as const) }],
      percent: true,
    });
    expect(area.stackMode).toBe("percent");
    expect(area.series[0]).toMatchObject({
      type: "area",
      curve: "smooth",
      stack: "stack",
    });
    const bars = horizontalBarChartOptions({
      series: [{ data: [["Maps", 27]] }],
      labels: true,
    });
    expect(bars.orientation).toBe("horizontal");
    expect(bars.series[0]).toMatchObject({ type: "bar", showLabels: true });
    const mixed = mixedChartOptions({
      series: [{ type: "bar", data: [1] }],
      yAxis2: { title: "Growth" },
    });
    expect(mixed.yAxis2).toEqual({ title: "Growth" });
    expect("orientation" in mixed).toBe(false);
  });

  it("builds heatmap, sparkline, box plot, waterfall and gantt options", () => {
    const heatmap = heatmapOptions({
      data: [{ x: "Mon", y: "AM", value: 3 }],
    });
    expect(heatmap.series[0]?.type).toBe("heatmap");
    expect(heatmap.legend).toBe(false);
    expect(sparklineChartOptions({ data: [1, 2] }).xAxis?.visible).toBe(false);
    const box = boxPlotChartOptions({
      groups: [{ x: "A", values: [1, 2, 3, 4, 20] }],
      orientation: "horizontal",
    });
    expect(box.series[0]).toMatchObject({ type: "boxplot", name: "Values" });
    expect(box.orientation).toBe("horizontal");
    const waterfall = waterfallChartOptions({
      steps: [
        { label: "Start", value: 10 },
        { label: "End", kind: "total" },
      ],
    });
    expect(waterfall.series[0]?.type).toBe("bar");
    const gantt = ganttChartOptions(
      {
        tasks: [{ name: "Design", start, end: start + 2 * day }],
        today: true,
        todayLabel: "Today",
      },
      start + day,
    );
    expect(gantt.orientation).toBe("horizontal");
    expect(gantt.yAxis?.type).toBe("time");
    expect(gantt.annotations?.[0]).toMatchObject({
      value: start + day,
      label: "Today",
    });
    expect(gantt.interaction).toEqual({ zoom: "y" });
  });
});

describe("named cartesian chart components (H5 canvas)", () => {
  it("mount and draw every chart", async () => {
    const cases = [
      [AreaChart, { series: [{ name: "Web", data: [1, 3, 2] }] }],
      [
        HorizontalBarChart,
        { series: [{ data: [["Maps", 27]] }], labels: true },
      ],
      [
        CandlestickChart,
        { series: [{ data: [{ x: 0, open: 1, high: 3, low: 0, y: 2 }] }] },
      ],
      [HeatmapChart, { data: [{ x: "Mon", y: "AM", value: 3 }] }],
      [Sparkline, { data: [1, 4, 2, 5] }],
      [RangeAreaChart, { series: [{ data: [{ x: 0, y0: 1, y: 3 }] }] }],
      [MixedChart, { series: [{ type: "bar", data: [["Q1", 3]] }] }],
      [BubbleChart, { series: [{ data: [{ x: 1, y: 2, value: 3 }] }] }],
      [HistogramChart, { values: [1, 2, 2, 3, 9] }],
      [BoxPlotChart, { groups: [{ x: "A", values: [1, 2, 3, 4, 20] }] }],
      [
        WaterfallChart,
        {
          steps: [
            { label: "Start", value: 10 },
            { label: "Sales", value: 4 },
          ],
        },
      ],
      [
        GanttChart,
        { tasks: [{ name: "Design", start, end: start + 2 * day }] },
      ],
    ] as const;
    for (const [component, props] of cases) {
      drawn.calls.length = 0;
      const wrapper = mount(
        component as Parameters<typeof mount>[0],
        {
          props,
        } as never,
      );
      await flushPromises();
      flushFrames();
      const name = (component as { __name?: string }).__name;
      expect(
        (wrapper.vm as unknown as ChartHandle).getInstance(),
        name,
      ).toBeTruthy();
      expect(drawn.calls.length, name).toBeGreaterThan(0);
      wrapper.unmount();
    }
  });

  it("defaults the sparkline height and forwards prop updates", async () => {
    const spark = mount(Sparkline, { props: { data: [1, 2, 3] } });
    await flushPromises();
    expect(spark.attributes("style")).toContain("height: 48px");
    spark.unmount();

    const waterfall = mount(WaterfallChart, {
      props: { steps: [{ label: "Start", value: 10 }] },
    });
    await flushPromises();
    const instance = (waterfall.vm as unknown as ChartHandle).getInstance()!;
    const setOptions = vi.spyOn(instance, "setOptions");
    await waterfall.setProps({
      steps: [
        { label: "Start", value: 10 },
        { label: "Sales", value: 4 },
      ],
    });
    expect(setOptions).toHaveBeenCalledTimes(1);
    flushFrames();
    expect(drawn.texts).toContain("Start");
    waterfall.unmount();
  });
});

describe("chart manifest", () => {
  it("exports every listed chart and none of the DOM / GPU-only ones", async () => {
    const [{ uniChartManifest }, exports] = await Promise.all([
      import("./manifest"),
      import("./index"),
    ]);
    expect(uniChartManifest.length).toBe(38);
    for (const entry of uniChartManifest) {
      if (entry.status === "n/a") {
        expect(entry.name in exports, entry.name).toBe(false);
        expect(entry.limitations.join(" ")).toContain("web-view");
      } else expect(entry.name in exports, entry.name).toBe(true);
    }
  });
});
