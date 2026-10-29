import { describe, expect, it } from "vitest";
import { packColor, unpackColor } from "./color";
import { curvePoints } from "./curve";
import { buildItems } from "./items";
import { createScales } from "./layout";
import { buildModel } from "./model";
import { BAR_STRIDE, GAP } from "./renderers/types";
import {
  collectPointLabels,
  hitTest,
  hoverMarks,
  showsCrosshair,
  tooltipContent,
} from "./scene";
import { createTheme } from "./theme";
import type { ChartOptions } from "./types";

const theme = createTheme();
const model = (options: ChartOptions) =>
  buildModel(options, theme, new Set(), new Map());

describe("curvePoints", () => {
  const x = [0, 1, 2, 3];
  const y = [0, 10, 10, 0];

  it("passes through every point and never overshoots (smooth)", () => {
    const c = curvePoints(x, y, 0, 4, "smooth");
    const xs: number[] = [];
    for (let i = 0; i < c.length; i++) {
      xs.push(c.points[i * 2]);
      expect(c.points[i * 2 + 1]).toBeGreaterThanOrEqual(-1e-9);
      expect(c.points[i * 2 + 1]).toBeLessThanOrEqual(10 + 1e-9);
    }
    for (const v of x) expect(xs).toContain(v);
    // flat between equal values (monotone)
    for (let i = 0; i < c.length; i++) {
      const px = c.points[i * 2];
      if (px > 1 && px < 2) expect(c.points[i * 2 + 1]).toBeCloseTo(10);
    }
  });

  it("adds the corners of steps and keeps gaps", () => {
    const c = curvePoints([0, 1, 2, 3], [1, 2, NaN, 4], 0, 4, "step");
    const pts = Array.from(c.points.subarray(0, c.length * 2));
    expect(pts.slice(0, 6)).toEqual([0, 1, 1, 1, 1, 2]);
    expect(Number.isNaN(pts[7])).toBe(true);
    // no step across the gap
    expect(c.length).toBe(5);
  });

  it("only writes `length` points (the buffers are larger)", () => {
    const c = curvePoints([0, 1, 2], [1, NaN, 3], 0, 3, "smooth");
    expect(c.length).toBe(3);
  });
});

describe("stacks", () => {
  it("stacks areas and keeps the bottom edge in the items", () => {
    const m = model({
      series: [
        { type: "area", stack: "a", data: [1, 2, 3] },
        { type: "area", stack: "a", data: [1, 1, 1] },
      ],
    });
    expect(Array.from(m.series[1].stackBase ?? [])).toEqual([1, 2, 3]);
    expect(Array.from(m.series[1].stackTop ?? [])).toEqual([2, 3, 4]);
    const items = buildItems(m, { x: 0, y: 0 }, 1);
    const areas = items.filter((i) => i.kind === "area");
    expect(areas).toHaveLength(2);
    const second = areas[1];
    if (second.kind !== "area") throw new Error("area expected");
    // x, top, bottom
    expect(Array.from(second.points.subarray(0, 3))).toEqual([0, 2, 1]);
  });

  it("scales 100% stacks and shows shares in the tooltip", () => {
    const m = model({
      stackMode: "percent",
      series: [
        { name: "A", type: "bar", stack: "s", data: [30, 10] },
        { name: "B", type: "bar", stack: "s", data: [10, 30] },
      ],
    });
    expect(m.base.y).toEqual([0, 100]);
    expect(Array.from(m.series[0].barTop ?? [])).toEqual([75, 25]);
    expect(Array.from(m.series[1].barTop ?? [])).toEqual([100, 100]);
    expect(m.y.format?.(50)).toBe("50%");
    const content = tooltipContent(
      m,
      {
        x: 0,
        xLabel: "0",
        items: [
          { ...item(0, 30), seriesIndex: 0 },
          { ...item(0, 10), seriesIndex: 1 },
        ],
      },
      null,
    );
    expect(content.rows[0].value).toBe("30 · 75.0%");
  });
});

const item = (x: number, y: number) => ({
  seriesIndex: 0,
  seriesId: "0",
  seriesName: "s",
  index: x,
  x,
  y,
  color: "red",
});

describe("candlesticks", () => {
  const options: ChartOptions = {
    series: [
      {
        type: "candlestick",
        data: [
          { x: 0, open: 10, high: 14, low: 8, y: 12 },
          { x: 1, open: 12, high: 13, low: 6, y: 7 },
        ],
      },
    ],
  };

  it("covers the wicks and colors the candles by direction", () => {
    const m = model(options);
    expect(m.base.y[0]).toBeLessThanOrEqual(6);
    expect(m.base.y[1]).toBeGreaterThanOrEqual(14);
    const items = buildItems(m, { x: 0, y: 0 }, 1);
    expect(items.map((i) => i.kind)).toEqual(["bar", "bar"]);
    const [wicks, bodies] = items;
    if (wicks.kind !== "bar" || bodies.kind !== "bar")
      throw new Error("bars expected");
    const f = new Float32Array(wicks.instances);
    expect([f[1], f[2]]).toEqual([8, 14]);
    const u = new Uint32Array(bodies.instances);
    const s = m.series[0];
    expect(u[3]).toBe(packColor(s.upColor));
    expect(u[BAR_STRIDE / 4 + 3]).toBe(packColor(s.downColor));
    expect(wicks.minHalf).toBeGreaterThan(0);
  });

  it("hits the whole candle and lists open / high / low / close", () => {
    const m = model(options);
    const sc = createScales(
      { x: 0, y: 0, width: 200, height: 100 },
      m.base,
      false,
      false,
    );
    const hit = hitTest(m, sc, null, sc.xToPx(1), sc.yToPx(6.5));
    expect(hit?.items[0]).toMatchObject({ open: 12, high: 13, low: 6, y: 7 });
    const rows = tooltipContent(m, hit!, null).rows;
    expect(rows.map((r) => r.name)).toEqual([
      "Series 1",
      "Open",
      "High",
      "Low",
      "Close",
    ]);
    expect(rows[0].value).toBe("-41.67%");
    // a band behind the candle, no crosshair
    expect(hoverMarks(m, sc, hit!)[0].kind).toBe("band");
    expect(showsCrosshair(m, hit!, undefined)).toBe(false);
  });
});

describe("heatmaps", () => {
  const options: ChartOptions = {
    series: [
      {
        type: "heatmap",
        colorScale: ["#000000", "#ffffff"],
        data: [
          { x: "Mon", y: "AM", value: 0 },
          { x: "Tue", y: "AM", value: 10 },
          { x: "Mon", y: "PM", value: 5 },
          { x: "Tue", y: "PM", value: null },
        ],
      },
    ],
  };

  it("uses category axes and maps values to the color scale", () => {
    const m = model(options);
    expect(m.x.categories).toEqual(["Mon", "Tue"]);
    expect(m.y.type).toBe("category");
    expect(m.y.categories).toEqual(["AM", "PM"]);
    expect(m.base.y).toEqual([-0.5, 1.5]);
    const colors = m.series[0].cellColors!;
    expect(unpackColor(colors[0])[0]).toBe(0);
    expect(unpackColor(colors[1])[0]).toBe(1);
    expect(unpackColor(colors[2])[0]).toBeCloseTo(0.5, 1);
    expect(colors[3]).toBe(0);
    const items = buildItems(m, { x: 0, y: 0 }, 1);
    const cells = items[0];
    if (cells.kind !== "bar") throw new Error("bar expected");
    const f = new Float32Array(cells.instances);
    expect([f[1], f[2]]).toEqual([-0.5, 0.5]);
    // the empty cell is not drawn
    expect(f[3 * 4 + 1]).toBe(Math.fround(GAP));
  });

  it("hits the cell under the pointer and names its row", () => {
    const m = model(options);
    const sc = createScales(
      { x: 0, y: 0, width: 200, height: 100 },
      m.base,
      false,
      false,
    );
    const hit = hitTest(m, sc, null, sc.xToPx(1.3), sc.yToPx(-0.2));
    expect(hit?.items[0]).toMatchObject({ index: 1, value: 10 });
    const content = tooltipContent(m, hit!, null);
    expect(content.title).toContain("AM");
    expect(hoverMarks(m, sc, hit!)[0].kind).toBe("cell");
    // the empty cell has no hit
    expect(hitTest(m, sc, null, sc.xToPx(1), sc.yToPx(1))).toBeNull();
  });
});

describe("bar value labels", () => {
  it("are placed above positive and below negative bars", () => {
    const m = model({
      series: [{ type: "bar", showLabels: true, data: [5, -3] }],
    });
    // room above the tallest bar
    expect(m.base.y[1]).toBeGreaterThan(5);
    const sc = createScales(
      { x: 0, y: 0, width: 200, height: 100 },
      m.base,
      false,
      false,
    );
    const labels = collectPointLabels(m, m.base, sc);
    expect(labels.map((l) => [l.text, l.placement])).toEqual([
      ["5", "above"],
      ["-3", "below"],
    ]);
  });

  it("colors bars per point", () => {
    const m = model({
      series: [
        {
          type: "bar",
          data: [
            { x: 0, y: 1, color: "#00ff00" },
            { x: 1, y: 2 },
          ],
        },
      ],
    });
    const items = buildItems(m, { x: 0, y: 0 }, 1);
    const bars = items[0];
    if (bars.kind !== "bar") throw new Error("bar expected");
    const u = new Uint32Array(bars.instances);
    expect(u[3]).toBe(packColor([0, 1, 0, 1]));
    expect(u[7]).toBe(packColor(m.series[0].color));
  });
});

describe("hover marks", () => {
  it("gives dots a translucent halo of their color", () => {
    const m = model({ series: [{ data: [1, 2, 3], color: "#ff0000" }] });
    const sc = createScales(
      { x: 0, y: 0, width: 200, height: 100 },
      m.base,
      false,
      false,
    );
    const hit = hitTest(m, sc, null, sc.xToPx(1), sc.yToPx(2))!;
    const [mark] = hoverMarks(m, sc, hit);
    expect(mark).toMatchObject({ kind: "dot", halo: "rgba(255, 0, 0, 0.2)" });
  });
});
