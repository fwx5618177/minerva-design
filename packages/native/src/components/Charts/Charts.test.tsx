import type { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { describe, expect, it, vi } from "vitest";
import type { ChartOptions } from "@minerva/charts/canvas";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { hostElements, queryPart, type Host } from "../../../test/queries";
import {
  AreaChart,
  BoxPlotChart,
  BubbleChart,
  CandlestickChart,
  GanttChart,
  HeatmapChart,
  HistogramChart,
  MixedChart,
  RangeAreaChart,
  Sparkline,
  WaterfallChart,
} from "./index";

/** Engine options of the last render of ChartBase */
const rendered: { options: ChartOptions | null } = { options: null };
vi.mock("../Chart/ChartBase", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../Chart/ChartBase")>();
  return {
    ...actual,
    ChartBase: (props: Parameters<typeof actual.ChartBase>[0]) => {
      rendered.options = props.options;
      return actual.ChartBase(props);
    },
  };
});
const options = () => rendered.options!;

const W = 360;
const H = 240;

async function mount(ui: ReactElement, height = H) {
  const result = await render(
    <MinervaProvider theme="light">{ui}</MinervaProvider>,
  );
  await fireEvent(queryPart("root", "chart")!, "layout", {
    nativeEvent: { layout: { x: 0, y: 0, width: W, height } },
  });
  return result;
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity?: number;
  backgroundColor?: string;
}

/** Positioned views of the data layer */
const shapes = (): Box[] => {
  const host: Host | null = queryPart("data", "chart");
  return host
    ? hostElements(host)
        .slice(1)
        .map((el) => StyleSheet.flatten(el.props.style) as Box)
        .filter((s) => typeof s?.left === "number")
    : [];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr"];

describe("named cartesian charts", () => {
  it("AreaChart fills smooth areas and stacks them to 100%", async () => {
    await mount(
      <AreaChart
        percent
        series={[
          { name: "Web", data: MONTHS.map((m, i) => [m, 10 + i] as const) },
          { name: "App", data: MONTHS.map((m, i) => [m, 30 - i] as const) },
        ]}
      />,
    );
    const o = options();
    expect(o.stackMode).toBe("percent");
    expect(o.series.map((s) => [s.type, s.curve, s.stack])).toEqual([
      ["area", "smooth", "stack"],
      ["area", "smooth", "stack"],
    ]);
    expect(shapes().length).toBeGreaterThan(4);
    expect(screen.getByText("Web")).toBeTruthy();
  });

  it("CandlestickChart, RangeAreaChart and BubbleChart set the series types", async () => {
    const { unmount } = await mount(
      <CandlestickChart
        series={[
          {
            name: "ACME",
            data: [
              { x: 0, open: 10, high: 14, low: 9, y: 13 },
              { x: 1, open: 13, high: 15, low: 11, y: 12 },
            ],
          },
        ]}
      />,
    );
    expect(options().series[0]!.type).toBe("candlestick");
    expect(shapes().length).toBeGreaterThanOrEqual(2);
    await unmount();
    const second = await mount(
      <RangeAreaChart
        series={[
          {
            data: [
              { x: 0, y0: 1, y: 3 },
              { x: 1, y0: 2, y: 5 },
            ],
          },
        ]}
      />,
    );
    const band = options().series[0]!;
    expect([band.type, band.curve]).toEqual(["area", "smooth"]);
    await second.unmount();
    await mount(
      <BubbleChart
        maxSize={40}
        series={[
          {
            data: [
              { x: 1, y: 2, value: 10 },
              { x: 2, y: 3, value: 40 },
            ],
          },
        ]}
      />,
    );
    expect(options().series[0]!.type).toBe("scatter");
  });

  it("HeatmapChart and Sparkline use the engine presets", async () => {
    const { unmount } = await mount(
      <HeatmapChart
        data={[
          { x: "Mon", y: "AM", value: 3 },
          { x: "Tue", y: "AM", value: 7 },
          { x: "Mon", y: "PM", value: 5 },
          { x: "Tue", y: "PM", value: null },
        ]}
      />,
    );
    const o = options();
    expect(o.series[0]!.type).toBe("heatmap");
    // the color legend (visual map) is shown by default
    expect(o.legend).toBe(true);
    expect(screen.getByText("Mon")).toBeTruthy();
    expect(shapes().length).toBeGreaterThanOrEqual(3);
    await unmount();
    await mount(<Sparkline data={[3, 5, 4, 8]} type="area" />, 48);
    const line = options();
    expect(line.series[0]!.type).toBe("area");
    expect(line.xAxis?.visible).toBe(false);
    expect(
      StyleSheet.flatten(queryPart("root", "chart")!.props.style),
    ).toMatchObject({ height: 48 });
  });

  it("MixedChart passes the right axis, stack mode and orientation", async () => {
    await mount(
      <MixedChart
        yAxis2={{ title: "Growth" }}
        stackMode="percent"
        series={[
          {
            type: "bar",
            name: "Revenue",
            data: [
              ["Q1", 120],
              ["Q2", 180],
            ],
          },
          {
            type: "line",
            name: "Growth",
            yAxis: "right",
            data: [
              ["Q1", 0.05],
              ["Q2", 0.12],
            ],
          },
        ]}
      />,
    );
    const o = options();
    expect(o.yAxis2).toEqual({ title: "Growth" });
    expect(o.stackMode).toBe("percent");
    expect(screen.getAllByText("Growth").length).toBeGreaterThan(1);
  });

  it("HistogramChart bins raw samples and BoxPlotChart computes boxes from groups", async () => {
    const { unmount } = await mount(
      <HistogramChart
        values={[1, 2, 2, 3, 3, 3, 4, 4, 5, 9]}
        bins={4}
        name="Orders"
      />,
    );
    const histogram = options().series[0]!;
    expect([histogram.type, histogram.name]).toEqual(["bar", "Orders"]);
    expect(shapes().length).toBeGreaterThanOrEqual(3);
    await unmount();
    await mount(
      <BoxPlotChart
        orientation="horizontal"
        groups={[
          { x: "A", values: [1, 2, 3, 4, 5, 6, 20] },
          { x: "B", values: [2, 3, 3, 4, 6] },
        ]}
      />,
    );
    const o = options();
    expect(o.orientation).toBe("horizontal");
    expect(o.series[0]).toMatchObject({ type: "boxplot", name: "Values" });
    expect(o.series[0]!.data).toHaveLength(2);
  });

  it("WaterfallChart labels the steps; GanttChart lays tasks on a time axis with a today line", async () => {
    const { unmount } = await mount(
      <WaterfallChart
        steps={[
          { label: "Start", value: 100 },
          { label: "Sales", value: 40 },
          { label: "Costs", value: -25 },
          { label: "End", kind: "total" },
        ]}
      />,
    );
    expect(screen.getByText("Sales")).toBeTruthy();
    expect(screen.getByText("+40")).toBeTruthy();
    await unmount();
    const day = 86_400_000;
    const start = Date.UTC(2026, 0, 5);
    await mount(
      <GanttChart
        today={start + 3 * day}
        todayLabel="Today"
        tasks={[
          { name: "Design", start, end: start + 4 * day, progress: 1 },
          { name: "Build", start: start + 2 * day, end: start + 9 * day },
          { name: "Launch", start: start + 10 * day, milestone: true },
        ]}
      />,
    );
    const o = options();
    expect(o.orientation).toBe("horizontal");
    expect(o.yAxis?.type).toBe("time");
    expect(o.xAxis?.categories).toEqual(["Design", "Build", "Launch"]);
    expect(o.annotations?.[0]).toMatchObject({
      type: "line",
      value: start + 3 * day,
      label: "Today",
    });
    expect(screen.getByText("Design")).toBeTruthy();
  });

  it("keeps the engine options while the props are equal", async () => {
    const series = [{ data: [1, 2, 3] }];
    const result = await mount(<AreaChart series={series} />);
    const first = options();
    await result.rerender(
      <MinervaProvider theme="light">
        <AreaChart series={series} />
      </MinervaProvider>,
    );
    expect(options()).toBe(first);
  });

  it("passes the preset options connector, colorMidpoint, dependenciesName and the outlier style", async () => {
    const r1 = await mount(
      <WaterfallChart
        connector={{ dash: [2, 2] }}
        steps={[
          { label: "Start", value: 10 },
          { label: "End", kind: "total" },
        ]}
      />,
    );
    expect(options().series[0]).toMatchObject({ connector: { dash: [2, 2] } });
    await r1.unmount();

    const r2 = await mount(
      <HeatmapChart
        colorScale="diverging"
        colorMidpoint={0}
        data={[
          { x: "a", y: "r", value: -1 },
          { x: "b", y: "r", value: 1 },
        ]}
      />,
    );
    expect(options().series[0]).toMatchObject({ colorMidpoint: 0 });
    await r2.unmount();

    const r3 = await mount(
      <GanttChart
        dependenciesName="After"
        tasks={[
          { name: "Design", start: 0, end: 40 },
          { name: "Build", start: 40, end: 100, dependencies: ["Design"] },
        ]}
      />,
    );
    expect(JSON.stringify(options().series)).toContain('"name":"After"');
    await r3.unmount();

    await mount(
      <BoxPlotChart
        outlierShape="filled"
        outlierSize={10}
        groups={[{ x: "a", values: [1, 2, 3, 4, 100] }]}
        series={[
          {
            type: "boxplot",
            name: "Own",
            outlierSize: 4,
            data: [{ x: "b", y: 2, q1: 1, q3: 3, low: 0, high: 4 }],
          },
        ]}
      />,
    );
    expect(options().series[0]).toMatchObject({
      outlierShape: "filled",
      outlierSize: 10,
    });
    expect(options().series[1]).toMatchObject({
      outlierShape: "filled",
      outlierSize: 4,
    });
  });
});
