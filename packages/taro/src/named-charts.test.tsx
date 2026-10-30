import { render, waitFor } from "@testing-library/react";
import Taro from "@tarojs/taro";
import { cloneElement, createRef, type ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ChartOptions } from "@minerva/charts/canvas";
import {
  AreaChart,
  BoxPlotChart,
  BubbleChart,
  CandlestickChart,
  ConfigProvider,
  GanttChart,
  HeatmapChart,
  HistogramChart,
  HorizontalBarChart,
  MixedChart,
  PieChart,
  RangeAreaChart,
  Sparkline,
  WaterfallChart,
  type ChartHandle,
  type ShapeChartHandle,
} from "./index";

/** Options each chart was created with */
const created: ChartOptions[] = [];
vi.mock("@minerva/charts/canvas", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@minerva/charts/canvas")>();
  return {
    ...actual,
    createCanvasChart: (
      config: Parameters<typeof actual.createCanvasChart>[0],
    ) => {
      created.push(config.options);
      return actual.createCanvasChart(config);
    },
  };
});

/** 2D context double recording the drawn texts */
const fakeNode = () => {
  const texts: string[] = [];
  const ctx = new Proxy({} as Record<string, unknown>, {
    get(target, key: string) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      if (key === "createLinearGradient") return () => ({ addColorStop() {} });
      if (key === "fillText") return (text: string) => texts.push(text);
      return () => {};
    },
    set(target, key: string, value) {
      target[key] = value;
      return true;
    },
  });
  const node = {
    width: 300,
    height: 150,
    getContext: () => ctx,
    requestAnimationFrame: (cb: () => void) => setTimeout(cb, 0),
    cancelAnimationFrame: (id: ReturnType<typeof setTimeout>) =>
      clearTimeout(id),
  };
  const query = {
    in: () => query,
    select: () => query,
    fields: () => query,
    exec: (callback: (res: unknown[]) => void) =>
      callback([{ node, width: 400, height: 300, left: 0, top: 0 }]),
  };
  vi.spyOn(Taro, "createSelectorQuery").mockImplementation(
    () => query as unknown as ReturnType<typeof Taro.createSelectorQuery>,
  );
  return texts;
};

/** Mounts a chart and returns the options it was created with */
async function mount(ui: ReactElement) {
  const texts = fakeNode();
  const ref = createRef<ChartHandle>();
  const result = render(cloneElement(ui, { ref } as object));
  await waitFor(() => expect(ref.current?.getInstance()).toBeTruthy());
  return { ...result, texts, options: created[created.length - 1]! };
}

const MONTHS = ["Jan", "Feb", "Mar"];

afterEach(() => {
  vi.restoreAllMocks();
  created.length = 0;
});

describe("named cartesian charts", () => {
  it("AreaChart and HorizontalBarChart map their props to the presets", async () => {
    const area = await mount(
      <AreaChart
        percent
        series={[
          { name: "Web", data: MONTHS.map((m, i) => [m, i + 1] as const) },
        ]}
      />,
    );
    expect(area.options.stackMode).toBe("percent");
    expect(area.options.series[0]).toMatchObject({
      type: "area",
      curve: "smooth",
      stack: "stack",
    });
    area.unmount();

    const bars = await mount(
      <HorizontalBarChart labels series={[{ data: [["Maps", 27]] }]} />,
    );
    expect(bars.options.orientation).toBe("horizontal");
    expect(bars.options.series[0]).toMatchObject({
      type: "bar",
      showLabels: true,
    });
  });

  it("candlestick, range area, bubble, histogram and box plot series", async () => {
    const cases: [ReactElement, string][] = [
      [
        <CandlestickChart
          key="candles"
          series={[{ data: [{ x: 0, open: 1, high: 3, low: 0, y: 2 }] }]}
        />,
        "candlestick",
      ],
      [
        <RangeAreaChart
          key="range"
          series={[{ data: [{ x: 0, y0: 1, y: 3 }] }]}
        />,
        "area",
      ],
      [
        <BubbleChart
          key="bubble"
          series={[{ data: [{ x: 1, y: 2, value: 3 }] }]}
        />,
        "scatter",
      ],
      [<HistogramChart key="histogram" values={[1, 2, 2, 3, 9]} />, "bar"],
      [
        <BoxPlotChart
          key="boxplot"
          groups={[{ x: "A", values: [1, 2, 3, 4, 20] }]}
        />,
        "boxplot",
      ],
    ];
    for (const [ui, type] of cases) {
      const { options, unmount } = await mount(ui);
      expect(options.series[0]?.type, String(ui.key)).toBe(type);
      unmount();
      vi.restoreAllMocks();
    }
  });

  it("HeatmapChart, Sparkline and MixedChart", async () => {
    const heatmap = await mount(
      <HeatmapChart
        data={[
          { x: "Mon", y: "AM", value: 3 },
          { x: "Tue", y: "PM", value: 5 },
        ]}
      />,
    );
    expect(heatmap.options.series[0]?.type).toBe("heatmap");
    // the color legend (visual map) is shown by default
    expect(heatmap.options.legend).toBe(true);
    heatmap.unmount();

    const spark = await mount(<Sparkline data={[1, 3, 2]} type="bar" />);
    expect(spark.options.series[0]?.type).toBe("bar");
    expect(spark.container.firstElementChild).toHaveStyle({ height: "48px" });
    spark.unmount();

    const mixed = await mount(
      <MixedChart
        yAxis2={{ title: "Growth" }}
        series={[
          { type: "bar", data: [["Q1", 1]] },
          { type: "line", yAxis: "right", data: [["Q1", 0.1]] },
        ]}
      />,
    );
    expect(mixed.options.yAxis2).toEqual({ title: "Growth" });
  });

  it("passes the preset options, locale and labels (bars keep their boolean value labels)", async () => {
    const preset = await mount(
      <WaterfallChart
        connector={{ dash: [2, 2] }}
        steps={[
          { label: "Start", value: 10 },
          { label: "End", kind: "total" },
        ]}
      />,
    );
    expect(preset.options.series[0]).toMatchObject({
      connector: { dash: [2, 2] },
    });
    preset.unmount();
    const heat = await mount(
      <HeatmapChart
        colorScale="diverging"
        colorMidpoint={0}
        data={[
          { x: "a", y: "r", value: -1 },
          { x: "b", y: "r", value: 1 },
        ]}
      />,
    );
    expect(heat.options.series[0]).toMatchObject({ colorMidpoint: 0 });
    heat.unmount();
    const gantt = await mount(
      <GanttChart
        dependenciesName="After"
        tasks={[
          { name: "Design", start: 0, end: 40 },
          { name: "Build", start: 40, end: 100, dependencies: ["Design"] },
        ]}
      />,
    );
    expect(JSON.stringify(gantt.options.series)).toContain('"name":"After"');
    expect(gantt.options.dependencies).toEqual([
      { from: "Design", to: "Build" },
    ]);
    gantt.unmount();
    const colored = await mount(
      <GanttChart
        dependencyColor="#ff0000"
        tasks={[
          { name: "Design", start: 0, end: 40 },
          { name: "Build", start: 40, end: 100, dependencies: ["Design"] },
        ]}
      />,
    );
    expect(colored.options.dependencies).toEqual([
      { from: "Design", to: "Build", color: "#ff0000" },
    ]);
    colored.unmount();
    const plain = await mount(
      <GanttChart
        dependencyArrows={false}
        tasks={[
          { name: "Design", start: 0, end: 40 },
          { name: "Build", start: 40, end: 100, dependencies: ["Design"] },
        ]}
      />,
    );
    expect(plain.options.dependencies).toEqual([]);
    plain.unmount();
    const box = await mount(
      <BoxPlotChart
        outlierShape="filled"
        outlierSize={10}
        groups={[{ x: "A", values: [1, 2, 3, 4, 20] }]}
      />,
    );
    expect(box.options.series[0]).toMatchObject({
      outlierShape: "filled",
      outlierSize: 10,
    });
    box.unmount();
    const area = await mount(
      <AreaChart
        locale="zh-CN"
        labels={{ series: "系列" }}
        series={[{ data: [["Q1", 1]] }]}
      />,
    );
    expect(area.options).toMatchObject({
      locale: "zh-CN",
      labels: { series: "系列" },
    });
    area.unmount();

    const bars = await mount(
      <HorizontalBarChart locale="fr" labels series={[{ data: [["A", 1]] }]} />,
    );
    expect(bars.options.locale).toBe("fr");
    expect(bars.options.labels).toBeUndefined();
    bars.unmount();

    const spark = await mount(
      <Sparkline data={[1, 2]} locale="ja" labels={{ value: "値" }} />,
    );
    expect(spark.options).toMatchObject({
      locale: "ja",
      labels: { value: "値" },
    });
  });

  it("WaterfallChart and GanttChart", async () => {
    const waterfall = await mount(
      <WaterfallChart
        steps={[
          { label: "Start", value: 100 },
          { label: "Sales", value: 40 },
          { label: "End", kind: "total" },
        ]}
      />,
    );
    expect(waterfall.options.series[0]).toMatchObject({ type: "bar" });
    waterfall.unmount();

    const day = 86_400_000;
    const start = Date.UTC(2026, 0, 5);
    const gantt = await mount(
      <GanttChart
        today={start + day}
        tasks={[
          { name: "Design", start, end: start + 3 * day },
          { name: "Build", start: start + 2 * day, end: start + 6 * day },
        ]}
      />,
    );
    expect(gantt.options.orientation).toBe("horizontal");
    expect(gantt.options.yAxis?.type).toBe("time");
    expect(gantt.options.xAxis?.categories).toEqual(["Design", "Build"]);
    expect(gantt.options.annotations?.[0]).toMatchObject({
      type: "line",
      value: start + day,
    });
  });
});

describe("accessible names", () => {
  it("names the charts in their locale, the ConfigProvider's by default", async () => {
    fakeNode();
    const area = createRef<ChartHandle>();
    const pie = createRef<ShapeChartHandle>();
    const zh = render(
      <ConfigProvider locale="zh">
        <AreaChart
          ref={area}
          series={[
            { name: "营收", data: [["Jan", 1]] },
            { name: "成本", data: [["Jan", 2]] },
          ]}
        />
        <PieChart
          ref={pie}
          locale="ja"
          data={[
            { name: "A", value: 1 },
            { name: "B", value: 2 },
          ]}
          animation={false}
        />
      </ConfigProvider>,
    );
    await waitFor(() => expect(area.current?.getInstance()).toBeTruthy());
    expect(created[created.length - 1]!.locale).toBe("zh");
    const [first, second] = zh.container.querySelectorAll(
      "[data-minerva='chart']",
    );
    expect(first).toHaveAttribute("aria-label", "图表：营收、成本");
    // an explicit locale wins over the provider
    expect(second).toHaveAttribute("aria-label", "円グラフ");
    zh.unmount();

    const fr = await mount(
      <Sparkline data={[1, 2]} name="Ventes" locale="fr" />,
    );
    expect(fr.container.firstElementChild?.getAttribute("aria-label")).toMatch(
      /^Graphique\s:\sVentes$/,
    );
    fr.unmount();
    const named = await mount(
      <AreaChart ariaLabel="Traffic" series={[{ name: "Web", data: [] }]} />,
    );
    expect(named.container.firstElementChild).toHaveAttribute(
      "aria-label",
      "Traffic",
    );
  });
});

describe("chart manifest", () => {
  it("lists every exported chart, and the DOM / GPU widgets as n/a without exports", async () => {
    const [{ taroChartManifest }, exports] = await Promise.all([
      import("./manifest"),
      import("./index"),
    ]);
    expect(taroChartManifest.length).toBe(39);
    for (const entry of taroChartManifest) {
      if (entry.status === "n/a") {
        expect(entry.name in exports, entry.name).toBe(false);
        expect(entry.limitations.join(" ")).toContain("web-view");
      } else expect(entry.name in exports, entry.name).toBe(true);
    }
  });
});
