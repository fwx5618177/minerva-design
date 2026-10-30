import type { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { describe, expect, it } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { hostElements, queryPart, type Host } from "../../../test/queries";
import { Chart, HorizontalBarChart } from "./index";

const W = 360;
const H = 240;

async function mount(ui: ReactElement) {
  const result = await render(
    <MinervaProvider theme="light">{ui}</MinervaProvider>,
  );
  await fireEvent(queryPart("root", "chart")!, "layout", {
    nativeEvent: { layout: { x: 0, y: 0, width: W, height: H } },
  });
  return result;
}

const part = (name: string) => queryPart(name, "chart");

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity?: number;
  backgroundColor?: string;
}

/** Positioned views of the data layer */
const boxes = (host: Host | null): Box[] =>
  host
    ? hostElements(host)
        .slice(1)
        .map((el) => StyleSheet.flatten(el.props.style) as Box)
        .filter((s) => typeof s?.left === "number")
    : [];

describe("charts: horizontal bars, ranges, box plots and dual axes", () => {
  it("draws horizontal bars from the left with the categories on the left", async () => {
    await mount(
      <HorizontalBarChart
        labels
        series={[
          {
            name: "Users",
            data: [
              ["Messages", 48],
              ["Photos", 35],
              ["Maps", 27],
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText("Messages")).toBeTruthy();
    expect(screen.getByText("48")).toBeTruthy();
    const bars = boxes(part("data"));
    expect(bars).toHaveLength(3);
    // longer than thick, all starting at the left edge, top to bottom
    for (const b of bars) expect(b.width).toBeGreaterThan(b.height);
    expect(new Set(bars.map((b) => Math.round(b.left))).size).toBe(1);
    expect(bars[0]!.top).toBeLessThan(bars[1]!.top);
    expect(bars[0]!.width).toBeGreaterThan(bars[2]!.width);
  });

  it("fills range areas between their edges and outlines both", async () => {
    await mount(
      <Chart
        series={[
          {
            type: "area",
            data: [
              { x: 0, y0: 1, y: 4 },
              { x: 1, y0: 2, y: 6 },
              { x: 2, y0: 1.5, y: 5 },
            ],
          },
        ]}
      />,
    );
    const shapes = boxes(part("data"));
    const strips = shapes.filter((b) => b.opacity !== undefined);
    expect(strips.length).toBeGreaterThan(5);
    // the strips stop at the lower edge (not at a common baseline)
    const bottoms = new Set(strips.map((b) => Math.round(b.top + b.height)));
    expect(bottoms.size).toBeGreaterThan(2);
    // two edges: segments of the upper and of the lower line
    expect(shapes.length - strips.length).toBeGreaterThanOrEqual(4);
  });

  it("draws box plots: translucent boxes, lines and outliers", async () => {
    await mount(
      <Chart
        series={[
          {
            type: "boxplot",
            data: [
              { x: "a", low: 2, q1: 4, y: 5, q3: 7, high: 10, outliers: [16] },
              { x: "b", low: 1, q1: 3, y: 4, q3: 6, high: 9 },
            ],
          },
        ]}
      />,
    );
    const shapes = boxes(part("data"));
    const translucent = shapes.filter(
      (b) => b.opacity !== undefined && b.opacity < 0.5,
    );
    // 2 boxes + 1 outlier dot (dots have an opacity too)
    expect(translucent).toHaveLength(2);
    // 9 lines per box
    expect(shapes.length).toBeGreaterThanOrEqual(2 + 18 + 1);
  });

  it("labels the right axis of dual axis charts", async () => {
    await mount(
      <Chart
        yAxis2={{ title: "Growth" }}
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
    expect(screen.getAllByText("Growth").length).toBeGreaterThan(1);
    expect(screen.getByText("0.12")).toBeTruthy();
    expect(screen.getByText("0.04")).toBeTruthy();
  });

  it("fills rect annotations with open edges (bands)", async () => {
    await mount(
      <Chart
        series={[{ type: "line", data: [1, 3, 2, 5] }]}
        annotations={[
          { type: "rect", x0: 1, x1: 2, color: "#ff0000" },
          { type: "rect", y0: 2, y1: 3, color: "#0000ff" },
        ]}
      />,
    );
    const areas = boxes(part("surface")).filter((b) =>
      /255,\s*0,\s*0|0,\s*0,\s*255|#ff0000|#0000ff/i.test(
        String(b.backgroundColor),
      ),
    );
    expect(areas.length).toBe(2);
    for (const a of areas) {
      expect(Number.isFinite(a.width) && a.width > 0).toBe(true);
      expect(Number.isFinite(a.height) && a.height > 0).toBe(true);
    }
  });

  it("writes the texts of the locale", async () => {
    await mount(
      <Chart
        locale="zh-CN"
        series={[
          {
            type: "bar",
            data: [
              ["a", 12000],
              ["b", 52000],
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText("5万")).toBeTruthy();
    expect(queryPart("surface", "chart")?.props.accessibilityLabel).toBe(
      "图表：系列 1",
    );
  });
});
