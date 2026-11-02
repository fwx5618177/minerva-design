// Gantt swimlanes on an intra-day range: a one-day schedule with several
// tasks per lane gets a whole-hour domain and readable hour:minute ticks.

import { describe, expect, it } from "vitest";
import { parseColor, unpackColor } from "./color";
import { createChartController, scenePrimitives } from "./controller";
import { buildItems } from "./items";
import { tooltipObstacles } from "./hover-rect";
import type { Rect } from "./layout";
import { buildModel, type DataCache } from "./model";
import { drawForeground, placeLabels } from "./overlay";
import { ganttSeries, type GanttTask } from "./presets";
import type { BarItem } from "./renderers/types";
import { collectPointLabels, layoutChart } from "./scene";
import { createTheme } from "./theme";
import { overlapArea, placeTooltip } from "./tooltip";
import type { ChartOptions } from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6.5;
const at = (h: number, m = 0) => new Date(2026, 10, 2, h, m).getTime();
const tasks: GanttTask[] = [
  { name: "Standup", row: "高", start: at(9), end: at(9, 30) },
  { name: "Deep work", row: "高", start: at(10), end: at(12) },
  { name: "Review", row: "中", start: at(13, 30), end: at(15) },
  { name: "Email", row: "低", start: at(8), end: at(8, 45) },
  { name: "Gym", row: "低", start: at(19), end: at(20, 30) },
  { name: "Read", row: "中", start: at(21), end: at(22) },
];

const layout = (
  width: number,
  list: GanttTask[] = tasks,
  colors?: readonly string[],
) => {
  const g = ganttSeries(list, { locale: "en", colors });
  const options: ChartOptions = {
    locale: "en",
    orientation: "horizontal",
    series: g.series,
    xAxis: { type: "category", categories: g.categories },
    yAxis: { type: "time", min: g.domain[0], max: g.domain[1] },
  };
  const model = buildModel(options, theme, new Set(), new Map() as DataCache);
  return {
    g,
    model,
    options,
    l: layoutChart({
      model,
      view: { x: [...model.base.x], y: [...model.base.y] },
      theme,
      width,
      height: 240,
      measure,
    }),
  };
};

describe("Gantt swimlanes on a single day", () => {
  it("keeps one lane per row and snaps the domain to whole hours", () => {
    const { g, l } = layout(720);
    expect(g.categories).toEqual(["高", "中", "低"]);
    expect(g.domain).toEqual([at(8), at(22)]);
    expect(l.xTicks.labels).toEqual(["高", "中", "低"]);
  });

  it("labels hours as hour:minute with enough ticks on narrow charts", () => {
    const narrow = layout(320).l.yTicks.labels;
    expect(narrow.length).toBeGreaterThanOrEqual(4);
    for (const label of narrow) expect(label).toMatch(/^\d{2}:00$/);
    expect(layout(720).l.yTicks.labels).toEqual([
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
    ]);
  });

  it("uses quarter hours on short ranges", () => {
    const { g } = layout(720, [
      { name: "A", start: at(9, 5), end: at(9, 50) },
      { name: "B", start: at(10), end: at(11, 20) },
    ]);
    expect(g.domain).toEqual([at(9), at(11, 30)]);
  });
});

describe("Gantt bar labels", () => {
  const names = (list: GanttTask[], barLabels?: boolean | "inside" | "auto") =>
    ganttSeries(list, { barLabels }).series[0]!;
  const ownRows: GanttTask[] = [
    { name: "Design", start: 0, end: 10 },
    { name: "Build", start: 10, end: 30 },
  ];

  it("are on when tasks share a row (auto), or as asked", () => {
    const shared = names(tasks);
    expect(shared.showLabels).toBe("inside");
    expect((shared.data as unknown as { label?: string }[])[0]!.label).toBe(
      "Standup",
    );
    expect(names(tasks, false).showLabels).toBeUndefined();
    // one task per row: the row names already say it
    expect(names(ownRows).showLabels).toBeUndefined();
    for (const on of [true, "inside"] as const) {
      const s = names(ownRows, on);
      expect(s.showLabels).toBe("inside");
      expect(
        (s.data as unknown as { label?: string }[]).map((d) => d.label),
      ).toEqual(["Design", "Build"]);
    }
  });

  it("are written inside the bars, cut to fit, contrasting with the fill", () => {
    const { model, l } = layout(720, tasks, ["#1d4ed8"]);
    const labels = collectPointLabels(
      model,
      l.scales.view,
      l.scales,
      l.yTicks,
      theme.background,
    );
    expect(labels).toHaveLength(tasks.length);
    const deep = labels.find((p) => p.text === "Deep work")!;
    expect(deep.placement).toBe("inside");
    // solid dark blue bar: white text
    expect(deep.color).toBe("#ffffff");
    // the bar spans 10:00-12:00 on the time axis
    expect(deep.bar!.x).toBeCloseTo(l.scales.yToPx(at(10)), 5);
    expect(deep.bar!.x + deep.bar!.width).toBeCloseTo(
      l.scales.yToPx(at(12)),
      5,
    );
    const placed = placeLabels(labels, l.plot, measure, 14);
    const text = (name: string) =>
      placed.find(
        (p) => p.label.bar === labels.find((q) => q.text === name)!.bar,
      )?.label.text;
    expect(text("Deep work")).toBe("Deep work");
    for (const { label, box } of placed) {
      // inside its bar, left-aligned after a padding
      expect(box.x).toBeCloseTo(label.bar!.x + 6, 5);
      expect(box.x + box.width).toBeLessThanOrEqual(
        label.bar!.x + label.bar!.width - 6 + 1e-6,
      );
    }
    // "Standup" (30 minutes) gets an ellipsis or nothing
    const standup = text("Standup");
    expect(standup === undefined || standup.endsWith("…")).toBe(true);
  });

  it("are drawn in their color without a halo", () => {
    const { l } = layout(720);
    const drawn: { op: string; text: string; color: unknown }[] = [];
    const state: Record<string, unknown> = {
      measureText: (t: string) => ({ width: measure(t) }),
      fillText: (text: string) =>
        drawn.push({ op: "fill", text, color: state.fillStyle }),
      strokeText: (text: string) =>
        drawn.push({ op: "stroke", text, color: state.strokeStyle }),
    };
    const ctx = new Proxy(state, {
      get: (t, k: string) => (k in t ? t[k] : () => undefined),
      set: (t, k: string, v) => ((t[k] = v), true),
    }) as unknown as CanvasRenderingContext2D;
    const bar = { x: 100, y: 50, width: 200, height: 30 };
    drawForeground(ctx, {
      width: 720,
      height: 240,
      scales: l.scales,
      theme,
      annotations: [],
      pointLabels: [
        {
          x: 0,
          y: 0,
          r: 0,
          text: "Solid",
          placement: "inside",
          align: "start",
          bar,
          color: "#ffffff",
        },
        {
          x: 0,
          y: 0,
          r: 0,
          text: "Faded",
          placement: "inside",
          align: "start",
          bar: { ...bar, y: 90 },
        },
      ],
    });
    expect(drawn.filter((d) => d.text === "Solid")).toEqual([
      { op: "fill", text: "Solid", color: "#ffffff" },
    ]);
    expect(drawn.filter((d) => d.text === "Faded").map((d) => d.op)).toEqual([
      "stroke",
      "fill",
    ]);
  });

  it("use dark text on light bars and the themed halo on translucent ones", () => {
    const { model, l } = layout(
      720,
      [
        ...tasks.slice(0, 2),
        { ...tasks[2]!, progress: 0.4 },
        ...tasks.slice(3),
      ],
      ["#fde047"],
    );
    const labels = collectPointLabels(
      model,
      l.scales.view,
      l.scales,
      l.yTicks,
      theme.background,
    );
    expect(labels.find((p) => p.text === "Deep work")!.color).toBe(
      "rgba(17, 24, 39, 0.92)",
    );
    // the task with a progress is translucent: theme text with a halo
    expect(labels.find((p) => p.text === "Review")!.color).toBeUndefined();
  });
});

describe("Gantt bar fills", () => {
  const list: GanttTask[] = [
    { name: "Plan", start: 0, end: 10, progress: 0.5 },
    { name: "Ship", start: 10, end: 30 },
  ];

  it("are near-solid without a progress, translucent under one", () => {
    const data = ganttSeries(list).series[0]!.data as unknown as {
      opacity?: number;
    }[];
    expect(data[0]!.opacity).toBeUndefined();
    expect(data[1]!.opacity).toBe(0.9);
    const g = ganttSeries(list, { colors: ["#2563eb"] });
    const options: ChartOptions = {
      orientation: "horizontal",
      series: g.series,
      xAxis: { type: "category", categories: g.categories },
      yAxis: { type: "time", min: g.domain[0], max: g.domain[1] },
    };
    // GPU items: the alpha of every bar
    const model = buildModel(options, theme, new Set(), new Map() as DataCache);
    const bars = buildItems(model, { x: 0, y: 0 }, 1).find(
      (it): it is BarItem => it.kind === "bar",
    )!;
    const u = new Uint32Array(bars.instances);
    expect(unpackColor(u[3]!)[3]).toBeCloseTo(0.3, 2);
    expect(unpackColor(u[7]!)[3]).toBeCloseTo(0.9, 2);
    // shapes of the platforms without a GPU
    const ctrl = createChartController({ options, measureText: measure });
    ctrl.setSize(400, 200);
    const prim = scenePrimitives(ctrl.getScene()!).find(
      (p) => p.kind === "bars",
    );
    expect(prim?.kind === "bars" && prim.opacity).toBeFalsy();
    const alphas =
      prim?.kind === "bars" ? prim.colors!.map((c) => parseColor(c)![3]) : [];
    expect(alphas[0]).toBeCloseTo(0.3, 2);
    expect(alphas[1]).toBeCloseTo(0.9, 2);
    ctrl.destroy();
  });
});

describe("Gantt tooltip", () => {
  /** `rows` lanes of one task each: morning tasks and a late one, or whole-day tasks */
  const big = (rows: number, height: number, full = false) => {
    const list: GanttTask[] = Array.from({ length: rows }, (_, i) => ({
      name: `Task ${i}`,
      row: `Lane ${i}`,
      start: full ? at(8) : i === rows - 1 ? at(20) : at(8 + (i % 4)),
      end: full ? at(22) : i === rows - 1 ? at(22) : at(9, 30 + (i % 4) * 60),
    }));
    const g = ganttSeries(list, { locale: "en" });
    const options: ChartOptions = {
      locale: "en",
      orientation: "horizontal",
      series: g.series,
      xAxis: { type: "category", categories: g.categories },
      yAxis: { type: "time", min: g.domain[0], max: g.domain[1] },
    };
    const model = buildModel(options, theme, new Set(), new Map() as DataCache);
    const l = layoutChart({
      model,
      view: { x: [...model.base.x], y: [...model.base.y] },
      theme,
      width: 720,
      height,
      measure,
    });
    return { model, l, bars: tooltipObstacles(model, l.scales) };
  };
  const center = (r: Rect) => ({ x: r.x + r.width / 2, y: r.y + r.height / 2 });
  const boxOf = (p: { x: number; y: number }, w: number, h: number) => ({
    x: p.x,
    y: p.y,
    width: w,
    height: h,
  });

  it("gives every visible task bar as an obstacle, once per layout", () => {
    const { model, l, bars } = big(24, 520);
    expect(bars).toHaveLength(24);
    expect(tooltipObstacles(model, l.scales)).toBe(bars);
    const plot = l.scales.plot;
    for (const r of bars) {
      expect(r.x).toBeGreaterThanOrEqual(plot.x - 0.01);
      expect(r.y).toBeGreaterThanOrEqual(plot.y - 0.01);
      expect(r.x + r.width).toBeLessThanOrEqual(plot.x + plot.width + 0.01);
      expect(r.y + r.height).toBeLessThanOrEqual(plot.y + plot.height + 0.01);
    }
  });

  it("puts a tall tooltip over no other task bar when there is room", () => {
    const { bars } = big(24, 520);
    const [w, h] = [170, 160];
    for (const k of [0, 5, 11, 12, 17, 23]) {
      const hovered = bars[k];
      const p = placeTooltip({
        anchor: center(hovered),
        avoid: hovered,
        obstacles: bars,
        prefer: "vertical",
        size: { width: w, height: h },
        stage: { width: 720, height: 520 },
      });
      expect(p.fit, `task ${k}`).toBe("stage");
      const box = boxOf(p, w, h);
      for (const bar of bars)
        expect(overlapArea(box, bar), `task ${k}`).toBe(0);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + w).toBeLessThanOrEqual(720);
      expect(box.y + h).toBeLessThanOrEqual(520);
    }
  });

  it("overflows the chart when every lane is busy", () => {
    // whole-day tasks: no tooltip-sized hole in the plot nor its margins
    const { bars } = big(24, 520, true);
    const [w, h] = [200, 120];
    const hovered = bars[12];
    const input = {
      anchor: center(hovered),
      avoid: hovered,
      obstacles: bars,
      prefer: "vertical" as const,
      size: { width: w, height: h },
      stage: { width: 720, height: 520 },
    };
    const p = placeTooltip({
      ...input,
      bounds: { x: -100, y: -300, width: 920, height: 1200 },
    });
    expect(p.fit).toBe("bounds");
    const box = boxOf(p, w, h);
    for (const bar of bars) expect(overlapArea(box, bar)).toBe(0);
    expect(box.y < 0 || box.y + h > 520).toBe(true);

    // nowhere to go: the least covering spot, never over the hovered task
    const none = placeTooltip(input);
    expect(none.fit).toBe("none");
    expect(overlapArea(boxOf(none, w, h), hovered)).toBe(0);
  });
});
