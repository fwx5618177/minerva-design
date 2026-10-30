// Log x axes and views in values of the axes (zoom events, getView /
// setView) on the DOM chart and the controller (mini-programs / React Native).

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axisTicks } from "./axis";
import { createChart } from "./chart";
import { createChartController } from "./controller";
import {
  buildModel,
  fromPlotX,
  toPlotX,
  viewFromValues,
  viewToValues,
  type DataCache,
} from "./model";
import {
  crosshairAt,
  hitTest,
  hoverMarks,
  layoutChart,
  resolveAnnotations,
  tooltipContent,
} from "./scene";
import { createTheme } from "./theme";
import type { ChartInstance, ChartOptions, ChartView } from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;
const model = (options: ChartOptions) =>
  buildModel(options, theme, new Set(), new Map() as DataCache);

const gdp: ChartOptions = {
  xAxis: { type: "log" },
  series: [
    {
      type: "scatter",
      name: "Countries",
      data: [
        { x: 1200, y: 62 },
        { x: 9_800, y: 74 },
        { x: 64_000, y: 81 },
        { x: 0, y: 50 },
      ],
    },
  ],
  annotations: [
    { type: "line", axis: "x", value: 10_000 },
    { type: "rect", x0: 1000, x1: 10_000 },
    { type: "text", x: 100_000, text: "rich" },
  ],
};

describe("log x axes", () => {
  it("plots the logarithms of x on whole decades and keeps the values", () => {
    const m = model(gdp);
    expect(m.x.type).toBe("log");
    expect(m.base.x).toEqual([3, 5]);
    const s = m.series[0]!;
    expect(s.cols.x[1]).toBeCloseTo(Math.log10(9_800));
    // values without a logarithm become gaps
    expect(Number.isNaN(s.cols.x[3])).toBe(true);
    expect(Number.isNaN(s.cols.y[3])).toBe(true);
    expect(s.cols.sorted).toBe(false);
    // the data keeps its values (tooltips)
    expect(s.raw.x[1]).toBe(9_800);
    expect(s.raw.y[3]).toBe(50);
    expect(toPlotX(m, 1000)).toBe(3);
    expect(fromPlotX(m, 4)).toBe(10_000);
    // the cached columns are reused by the next build
    expect(model(gdp).series[0]!.cols).not.toBe(s.cols);
    const cache = new Map() as DataCache;
    const a = buildModel(gdp, theme, new Set(), cache).series[0]!.cols;
    expect(buildModel(gdp, theme, new Set(), cache).series[0]!.cols).toBe(a);
    // bounds are values; nice: false keeps the extent
    expect(
      model({ ...gdp, xAxis: { type: "log", min: 100, max: 1e6 } }).base.x,
    ).toEqual([2, 6]);
    const tight = model({ ...gdp, xAxis: { type: "log", nice: false } });
    expect(tight.base.x[0]).toBeGreaterThan(3);
    expect(tight.base.x[1]).toBeLessThan(5);
  });

  it("ticks decades and maps the annotations", () => {
    const m = model(gdp);
    const ticks = axisTicks(m.x, m.base.x, 6);
    expect(ticks.labels).toEqual([
      "1k",
      "2k",
      "5k",
      "10k",
      "20k",
      "50k",
      "100k",
    ]);
    expect(ticks.formatValue(9_800)).toBe("9,800");
    const a = resolveAnnotations(gdp.annotations, theme, undefined, Math.log10);
    expect(a[0]).toMatchObject({ type: "line", value: 4 });
    expect(a[1]).toMatchObject({ type: "rect", x0: 3, x1: 4 });
    expect(a[2]).toMatchObject({ type: "text", x: 5 });
  });

  it("hit tests, marks and labels hovered points with their values", () => {
    const m = model({
      xAxis: { type: "log" },
      series: [
        {
          type: "line",
          name: "Latency",
          data: [
            [10, 1],
            [100, 3],
            [1000, 2],
          ],
        },
        {
          type: "bar",
          name: "Count",
          data: [
            [10, 4],
            [100, 5],
            [1000, 6],
          ],
        },
      ],
    });
    const view = {
      x: [...m.base.x] as [number, number],
      y: [...m.base.y] as [number, number],
    };
    const { scales, xTicks } = layoutChart({
      model: m,
      view,
      theme,
      width: 400,
      height: 300,
      measure,
    });
    const px = scales.xToPx(2);
    const py = scales.yToPx(3);
    const event = hitTest(m, scales, xTicks, px, py)!;
    expect(event.x).toBe(100);
    expect(event.xLabel).toBe("100");
    const line = model({
      ...gdp,
      series: [
        {
          name: "L",
          data: [
            [10, 1],
            [100, 3],
          ],
        },
      ],
      xAxis: { type: "log" },
    });
    const lineLayout = layoutChart({
      model: line,
      view: {
        x: [...line.base.x] as [number, number],
        y: [...line.base.y] as [number, number],
      },
      theme,
      width: 400,
      height: 300,
      measure,
    });
    const lineEvent = hitTest(
      line,
      lineLayout.scales,
      lineLayout.xTicks,
      lineLayout.scales.xToPx(2),
      lineLayout.scales.yToPx(3),
    )!;
    // the crosshair sits on the plotted x of the point
    expect(crosshairAt(line, lineLayout.scales, lineEvent, true)).toBeCloseTo(
      lineLayout.scales.xToPx(2),
    );
    // bands of bars around the plotted x
    const band = hoverMarks(m, scales, event).find((k) => k.kind === "band");
    expect(band).toBeDefined();
    if (band?.kind === "band") {
      expect(band.x).toBeLessThan(px);
      expect(band.x + band.width).toBeGreaterThan(px);
    }
  });
});

describe("bubble tooltips", () => {
  it("format the value with `format`, y with its axis, the group as a subtitle", () => {
    const m = model({
      xAxis: { type: "log" },
      yAxis: { format: (v) => `${v} y` },
      series: [
        {
          type: "scatter",
          name: "Asia",
          valueName: "Population",
          format: (v) => `${v}M`,
          data: [{ x: 9200, y: 70.8, value: 1430, label: "India" }],
        },
        { type: "scatter", name: "Europe", data: [[50_000, 81]] },
      ],
    });
    const s = m.series[0]!;
    const item = {
      seriesIndex: 0,
      seriesId: s.id,
      seriesName: s.name,
      index: 0,
      x: 9200,
      y: 70.8,
      value: 1430,
      label: "India",
      color: "red",
    };
    const yTicks = axisTicks(m.y, m.base.y, 5);
    const tip = tooltipContent(
      m,
      { items: [item], x: 9200, xLabel: "9,200" },
      yTicks,
    );
    expect(tip.title).toBe("India");
    expect(tip.subtitle).toBe("Asia");
    expect(tip.rows.map((r) => r.value)).toEqual(["9,200", "70.8 y", "1430M"]);
    expect(tip.rows.some((r) => r.name === "")).toBe(false);
    // without a value, `format` is the one of y
    const plain = tooltipContent(
      m,
      {
        items: [{ ...item, value: undefined, label: undefined }],
        x: 9200,
        xLabel: "9,200",
      },
      yTicks,
    );
    expect(plain.rows[1]!.value).toBe("70.8M");
    expect(plain.subtitle).toBeUndefined();
  });
});

describe("views in values of the axes", () => {
  it("converts views of log axes both ways", () => {
    const m = model({ ...gdp, yAxis: { type: "log" } });
    const v = viewToValues(m, { x: [3, 4], y: [1, 2] });
    expect(v).toEqual({ x: [1000, 10_000], y: [10, 100] });
    expect(
      viewFromValues(m, { x: [100, 1000] }, { x: [0, 1], y: [5, 6] }),
    ).toEqual({ x: [2, 3], y: [5, 6] });
    expect(
      viewFromValues(m, { y: [10, 1000] }, { x: [0, 1], y: [5, 6] }),
    ).toEqual({ x: [0, 1], y: [1, 3] });
  });

  it("reports values from the controller", () => {
    const ctrl = createChartController({ options: gdp, measureText: measure });
    ctrl.setSize(400, 300);
    const views: ChartView[] = [];
    ctrl.on("zoom", (v) => views.push(v));
    expect(ctrl.getView().x[0]).toBeCloseTo(1000);
    expect(ctrl.getView().x[1]).toBeCloseTo(100_000);
    ctrl.setView({ x: [2000, 20_000] });
    expect(ctrl.getView().x[0]).toBeCloseTo(2000);
    expect(ctrl.getView().x[1]).toBeCloseTo(20_000);
    const p = ctrl.toPixel(5000, 70)!;
    const back = ctrl.fromPixel(p.x, p.y)!;
    expect(back.x).toBeCloseTo(5000);
    expect(back.y).toBeCloseTo(70);
    ctrl.zoomAt(p.x, p.y, 0.5);
    const last = views[views.length - 1]!;
    expect(last.x[0]).toBeGreaterThan(2000);
    expect(last.x[1]).toBeLessThan(20_000);
    // the zoom is centered on the pointer in log units
    expect(Math.log10(5000) - Math.log10(last.x[0])).toBeCloseTo(
      (Math.log10(5000) - Math.log10(2000)) / 2,
    );
    ctrl.destroy();
  });

  describe("DOM chart", () => {
    let container: HTMLDivElement;
    let chart: ChartInstance | null = null;
    beforeEach(() => {
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
        600,
      );
      vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(
        300,
      );
      container = document.createElement("div");
      document.body.appendChild(container);
    });
    afterEach(() => {
      chart?.destroy();
      chart = null;
      container.remove();
      vi.restoreAllMocks();
    });

    it("reports values in zoom events, getView and pixels", async () => {
      chart = createChart(container, { ...gdp, yAxis: { type: "log" } });
      await chart.ready;
      await new Promise<void>((r) =>
        requestAnimationFrame(() => setTimeout(r, 0)),
      );
      const views: ChartView[] = [];
      chart.on("zoom", (v) => views.push(v));
      expect(chart.getView().x[0]).toBeCloseTo(1000);
      chart.setView({ x: [2000, 20_000], y: [10, 100] });
      expect(chart.getView().y[1]).toBeCloseTo(100);
      expect(chart.getView().x[1]).toBeCloseTo(20_000);
      const p = chart.toPixel(5000, 30)!;
      const back = chart.fromPixel(p.x, p.y)!;
      expect(back.x).toBeCloseTo(5000);
      expect(back.y).toBeCloseTo(30);
      chart.resetZoom();
      expect(views[views.length - 1]!.x[1]).toBeCloseTo(100_000);
    });
  });
});
