// Dependency arrows (Gantt charts): geometry, the preset, and the drawing
// on the DOM overlay, the controller scene and Canvas2D.

import { describe, expect, it } from "vitest";
import { createChartController } from "./controller";
import { buildModel, type DataCache } from "./model";
import { drawArrows, drawForeground } from "./overlay";
import { ganttSeries, type GanttTask } from "./presets";
import {
  ARROW_HEAD,
  dependencyArrows,
  layoutChart,
  resolveDependencies,
} from "./scene";
import { createTheme } from "./theme";
import type { ChartOptions, ChartPointDatum } from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;
const day = 86_400_000;
const t0 = Date.UTC(2026, 0, 5);

const tasks: GanttTask[] = [
  { name: "Design", start: t0, end: t0 + 10 * day, group: "Plan" },
  {
    name: "Build",
    start: t0 + 14 * day,
    end: t0 + 30 * day,
    group: "Dev",
    dependencies: ["Design"],
  },
  // starts before the end of its predecessor: routed around
  {
    name: "Docs",
    start: t0 + 20 * day,
    end: t0 + 32 * day,
    group: "Dev",
    dependencies: ["Build", "Missing", "Docs"],
  },
  {
    name: "Launch",
    start: t0 + 34 * day,
    milestone: true,
    dependencies: ["Docs"],
  },
];

const ganttOptions = (extra: Partial<ChartOptions> = {}): ChartOptions => {
  const g = ganttSeries(tasks, { locale: "en" });
  return {
    orientation: "horizontal",
    series: g.series,
    xAxis: { type: "category", categories: g.categories },
    yAxis: { type: "time", min: g.domain[0], max: g.domain[1] },
    dependencies: g.dependencies,
    ...extra,
  };
};

const layout = (options: ChartOptions) => {
  const model = buildModel(options, theme, new Set(), new Map() as DataCache);
  const { scales } = layoutChart({
    model,
    view: { x: [...model.base.x], y: [...model.base.y] },
    theme,
    width: 600,
    height: 300,
    measure,
  });
  return { model, scales };
};

describe("ganttSeries dependencies", () => {
  it("lists the arrows between existing tasks", () => {
    const g = ganttSeries(tasks, { locale: "en" });
    expect(g.dependencies).toEqual([
      { from: "Design", to: "Build" },
      { from: "Build", to: "Docs" },
      { from: "Docs", to: "Launch" },
    ]);
    expect(
      ganttSeries(tasks, { dependencyArrows: false }).dependencies,
    ).toEqual([]);
    expect(
      ganttSeries(tasks, { dependencyColor: "red" }).dependencies[0],
    ).toMatchObject({ color: "red" });
  });
});

describe("dependency arrows", () => {
  it("resolves the colors once", () => {
    const resolved = resolveDependencies(
      [
        { from: "a", to: "b" },
        { from: "a", to: "c", color: "#ff0000" },
      ],
      { ...theme, resolve: () => [1, 0, 0, 1] },
    );
    expect(resolved[0]!.color).toContain("rgba");
    expect(resolved[1]!.color).toBe("rgba(255, 0, 0, 1)");
    expect(resolveDependencies(undefined, theme)).toEqual([]);
  });

  it("draws elbows from the end of a task to the start of the next", () => {
    const options = ganttOptions();
    const { model, scales } = layout(options);
    const arrows = dependencyArrows(
      model,
      scales,
      resolveDependencies(options.dependencies, theme),
    );
    expect(arrows).toHaveLength(3);
    const [first, around, toMilestone] = arrows as [
      (typeof arrows)[number],
      (typeof arrows)[number],
      (typeof arrows)[number],
    ];
    // out of the end of Design, down to Build, into its start
    const designEnd = scales.yToPx(t0 + 10 * day);
    const buildStart = scales.yToPx(t0 + 14 * day);
    expect(first.points).toHaveLength(4);
    expect(first.points[0]!.x).toBeCloseTo(designEnd);
    expect(first.points[0]!.y).toBeCloseTo(scales.xToPx(0));
    expect(first.points[3]!.y).toBeCloseTo(scales.xToPx(1));
    const [tip, b0, b1] = first.head;
    expect(tip.x).toBeCloseTo(buildStart - 1);
    expect(tip.x - b0.x).toBeCloseTo(ARROW_HEAD.length);
    expect(b1.y - b0.y).toBeCloseTo(ARROW_HEAD.half * 2);
    // every leg is horizontal or vertical
    for (const a of arrows)
      for (let k = 1; k < a.points.length; k++) {
        const p = a.points[k - 1]!;
        const q = a.points[k]!;
        expect(p.x === q.x || p.y === q.y).toBe(true);
      }
    // Docs starts before Build ends: around, between the rows
    expect(around.points).toHaveLength(6);
    const between = around.points[2]!.y;
    expect(between).toBeGreaterThan(scales.xToPx(1));
    expect(between).toBeLessThan(scales.xToPx(2));
    expect(around.points[3]!.x).toBeLessThan(scales.yToPx(t0 + 20 * day));
    // into the edge of the milestone dot
    expect(toMilestone.head[0].x).toBeLessThan(scales.yToPx(t0 + 34 * day) - 3);
  });

  it("skips hidden tasks, unknown names and charts without bars", () => {
    const options = ganttOptions();
    const deps = resolveDependencies(options.dependencies, theme);
    const hidden = buildModel(
      options,
      theme,
      new Set(["gantt:Plan"]),
      new Map() as DataCache,
    );
    const { scales } = layout(options);
    expect(dependencyArrows(hidden, scales, deps)).toHaveLength(2);
    const line = layout({ series: [{ data: [1, 2] }] });
    expect(dependencyArrows(line.model, line.scales, deps)).toEqual([]);
    expect(
      dependencyArrows(layout(options).model, scales, [
        { from: "Nope", to: "Build", color: "red" },
      ]),
    ).toEqual([]);
  });

  it("points along the values of vertical charts too", () => {
    const options: ChartOptions = {
      xAxis: { type: "category", categories: ["a", "b"] },
      series: [
        {
          type: "bar",
          data: [
            { x: "a", y0: 0, y: 4 },
            { x: "b", y0: 1, y: 6 },
          ],
        },
      ],
      dependencies: [{ from: "a", to: "b" }],
    };
    const { model, scales } = layout(options);
    const [arrow] = dependencyArrows(
      model,
      scales,
      resolveDependencies(options.dependencies, theme),
    );
    // b starts below the end of a: around, up into its bottom
    expect(arrow!.head[0].y).toBeCloseTo(scales.yToPx(1) + 1);
    expect(arrow!.head[1].y).toBeCloseTo(
      scales.yToPx(1) + 1 + ARROW_HEAD.length,
    );
    expect(arrow!.points).toHaveLength(6);
  });

  it("are drawn with rounded elbows and filled heads", () => {
    const calls: string[] = [];
    const ctx = new Proxy({} as Record<string, unknown>, {
      get: (t, k: string) => (k in t ? t[k] : () => calls.push(k)),
      set: (t, k: string, v) => ((t[k] = v), true),
    }) as unknown as CanvasRenderingContext2D;
    const arrow = {
      points: [
        { x: 0, y: 0 },
        { x: 8, y: 0 },
        { x: 8, y: 20 },
        { x: 30, y: 20 },
      ],
      head: [
        { x: 36, y: 20 },
        { x: 30, y: 16.5 },
        { x: 30, y: 23.5 },
      ] as [
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
      ],
      color: "red",
      width: 1.25,
    };
    drawArrows(ctx, [arrow, { ...arrow, points: [] }]);
    expect(calls.filter((c) => c === "arcTo")).toHaveLength(2);
    expect(calls.filter((c) => c === "fill")).toHaveLength(1);
    // contexts without arcTo (old mini-program canvases): sharp corners
    const plain: string[] = [];
    const legacy = new Proxy({ arcTo: undefined } as Record<string, unknown>, {
      get: (t, k: string) => (k in t ? t[k] : () => plain.push(k)),
      set: (t, k: string, v) => ((t[k] = v), true),
    }) as unknown as CanvasRenderingContext2D;
    drawArrows(legacy, [arrow]);
    expect(plain.filter((c) => c === "lineTo").length).toBeGreaterThan(3);
    // through the foreground layer
    const options = ganttOptions();
    const { model, scales } = layout(options);
    calls.length = 0;
    drawForeground(ctx, {
      width: 600,
      height: 300,
      scales,
      theme,
      annotations: [],
      pointLabels: [],
      arrows: dependencyArrows(
        model,
        scales,
        resolveDependencies(options.dependencies, theme),
      ),
    });
    expect(calls.filter((c) => c === "fill")).toHaveLength(3);
  });

  it("are part of the controller scene", () => {
    const controller = createChartController({
      options: ganttOptions(),
      measureText: measure,
    });
    expect(controller.getScene()).toBeNull();
    controller.setSize(600, 300);
    expect(controller.getScene()!.arrows).toHaveLength(3);
    controller.setOptions(ganttOptions({ dependencies: [] }));
    expect(controller.getScene()!.arrows).toEqual([]);
    controller.destroy();
  });
});

// Rows as category px (horizontal Gantt: category on y, values along x)
type Box = { row: number; from: number; to: number };

/** Every leg is axis-aligned and no leg across the rows passes through a bar */
const expectClear = (
  arrow: { points: { x: number; y: number }[] },
  boxes: readonly Box[],
  scales: ReturnType<typeof layout>["scales"],
) => {
  for (let k = 1; k < arrow.points.length; k++) {
    const p = arrow.points[k - 1]!;
    const q = arrow.points[k]!;
    expect(p.x === q.x || p.y === q.y).toBe(true);
    if (p.x !== q.x) continue;
    for (const b of boxes) {
      const c = scales.xToPx(b.row);
      const [lo, hi] = [scales.yToPx(b.from), scales.yToPx(b.to)].sort(
        (u, v) => u - v,
      ) as [number, number];
      const across = Math.min(p.y, q.y) < c && Math.max(p.y, q.y) > c;
      if (across) expect(p.x > lo && p.x < hi).toBe(false);
    }
  }
};

const rowsOf = (boxes: readonly (Box & { id: string })[]): ChartOptions => ({
  orientation: "horizontal",
  xAxis: { type: "category", categories: ["r0", "r1", "r2", "r3"] },
  yAxis: { min: 0, max: 100 },
  series: [
    {
      type: "bar",
      stack: "tasks",
      data: boxes.map((b) => ({
        x: `r${b.row}`,
        y0: b.from,
        y: b.to,
        id: b.id,
      })),
    },
  ],
});

const arrowsOf = (options: ChartOptions) => {
  const { model, scales } = layout(options);
  return {
    scales,
    arrows: dependencyArrows(
      model,
      scales,
      resolveDependencies(options.dependencies, theme),
    ),
  };
};

describe("dependency routing", () => {
  it("connects tasks by id, several in a row, on any x axis", () => {
    const shared: GanttTask[] = [
      { id: "a", name: "Survey", row: "Crew A", start: t0, end: t0 + 5 * day },
      {
        id: "b",
        name: "Survey",
        row: "Crew A",
        start: t0 + 12 * day,
        end: t0 + 20 * day,
        dependencies: ["a"],
      },
      {
        id: "c",
        name: "Pour",
        row: "Crew B",
        start: t0 + 8 * day,
        end: t0 + 14 * day,
        dependencies: ["a", "nope"],
      },
    ];
    const g = ganttSeries(shared, { locale: "en" });
    expect(g.categories).toEqual(["Crew A", "Crew B"]);
    expect(g.dependencies).toEqual([
      { from: "a", to: "b" },
      { from: "a", to: "c" },
    ]);
    // the task name titles the tooltip of a shared row
    expect(g.series[0]!.data).toContainEqual(
      expect.objectContaining({ id: "b", x: "Crew A", label: "Survey" }),
    );
    const { arrows, scales } = arrowsOf({
      orientation: "horizontal",
      series: g.series,
      xAxis: { type: "category", categories: g.categories },
      yAxis: { type: "time", min: g.domain[0], max: g.domain[1] },
      dependencies: g.dependencies,
    });
    expect(arrows).toHaveLength(2);
    // the exact bars: a straight line along the row, into the second task
    const [inRow, down] = arrows as [(typeof arrows)[0], (typeof arrows)[0]];
    expect(inRow.points).toHaveLength(2);
    expect(inRow.points[0]!.x).toBeCloseTo(scales.yToPx(t0 + 5 * day));
    expect(inRow.points[0]!.y).toBeCloseTo(scales.xToPx(0));
    expect(inRow.head[0].x).toBeCloseTo(scales.yToPx(t0 + 12 * day) - 1);
    expect(down.head[0].x).toBeCloseTo(scales.yToPx(t0 + 8 * day) - 1);
    expect(down.head[0].y).toBeCloseTo(scales.xToPx(1));

    // a numeric x axis (rows 0, 1, 2), vertical: by id or by x value
    const numeric = arrowsOf({
      xAxis: { type: "linear" },
      series: [
        {
          type: "bar",
          data: [
            { x: 0, y0: 0, y: 3, id: "p" },
            { x: 1, y0: 5, y: 8, id: "q" },
            { x: 2, y0: 9, y: 10 },
          ],
        },
      ],
      dependencies: [
        { from: "p", to: "q" },
        { from: "q", to: "2" },
      ],
    });
    expect(numeric.arrows).toHaveLength(2);
    // values grow upwards: the heads point up into the starts
    expect(numeric.arrows[0]!.head[0].y).toBeCloseTo(
      numeric.scales.yToPx(5) + 1,
    );
    expect(numeric.arrows[0]!.head[0].x).toBeCloseTo(
      numeric.scales.xToPx(1),
      0,
    );
  });

  it("skips hidden tasks without falling back to a row of the same name", () => {
    const options: ChartOptions = {
      ...rowsOf([
        { id: "r1", row: 0, from: 0, to: 10 },
        { id: "x", row: 1, from: 20, to: 30 },
        { id: "z", row: 3, from: 0, to: 5 },
      ]),
      dependencies: [{ from: "r1", to: "x" }],
    };
    options.series = [
      { ...options.series[0]!, id: "visible" },
      {
        id: "hidden",
        type: "bar",
        data: [{ x: "r2", y0: 40, y: 50, id: "r3" }],
      },
    ];
    const model = buildModel(
      options,
      theme,
      new Set(["hidden"]),
      new Map() as DataCache,
    );
    const { scales } = layout(options);
    // "r3" is the id of a hidden task, not the row "r3" (task z)
    const deps = resolveDependencies([{ from: "r3", to: "x" }], theme);
    expect(dependencyArrows(model, scales, deps)).toEqual([]);
    // "r1" is an id: its own bar (row r0), not the row "r1" (task x)
    const [arrow] = dependencyArrows(
      model,
      scales,
      resolveDependencies(options.dependencies, theme),
    );
    expect(arrow!.points[0]!.y).toBeCloseTo(scales.xToPx(0));
  });

  it("crosses the rows in a lane clear of the bars in between", () => {
    const boxes = [
      { id: "a", row: 0, from: 0, to: 20 },
      { id: "block", row: 1, from: 15, to: 45 },
      { id: "b", row: 2, from: 60, to: 80 },
    ];
    const { arrows, scales } = arrowsOf({
      ...rowsOf(boxes),
      dependencies: [{ from: "a", to: "b" }],
    });
    const [arrow] = arrows;
    expect(arrow!.points).toHaveLength(4);
    // just after the blocking bar, before the successor
    const lane = arrow!.points[1]!.x;
    expect(lane).toBeGreaterThan(scales.yToPx(45));
    expect(lane).toBeLessThan(scales.yToPx(60));
    expectClear(arrow!, boxes, scales);
    // deterministic
    expect(
      arrowsOf({ ...rowsOf(boxes), dependencies: [{ from: "a", to: "b" }] })
        .arrows,
    ).toEqual(arrows);
  });

  it("jogs along the gaps between the rows when no lane is clear", () => {
    const boxes = [
      { id: "a", row: 0, from: 0, to: 20 },
      // row 1 is busy from before the end of a to after the start of b
      { id: "wide", row: 1, from: 15, to: 70 },
      // row 2 is busy around the end of a
      { id: "left", row: 2, from: 0, to: 30 },
      { id: "b", row: 3, from: 60, to: 90 },
    ];
    const { arrows, scales } = arrowsOf({
      ...rowsOf(boxes),
      dependencies: [{ from: "a", to: "b" }],
    });
    const [arrow] = arrows;
    expect(arrow!.points.length).toBeGreaterThan(4);
    expectClear(arrow!, boxes, scales);
    // the horizontal jogs run between the rows
    const rows = [0, 1, 2, 3].map((r) => scales.xToPx(r));
    for (let k = 1; k < arrow!.points.length - 1; k++) {
      const p = arrow!.points[k - 1]!;
      const q = arrow!.points[k]!;
      if (p.y !== q.y || k === 1) continue;
      expect(rows.some((c) => Math.abs(c - p.y) < 1)).toBe(false);
    }
    // the successor starting early in a busy layout: around, still clear
    const early = [
      { id: "a", row: 0, from: 0, to: 50 },
      { id: "mid", row: 1, from: 20, to: 40 },
      { id: "b", row: 2, from: 30, to: 60 },
    ];
    const around = arrowsOf({
      ...rowsOf(early),
      dependencies: [{ from: "a", to: "b" }],
    });
    expectClear(around.arrows[0]!, early, around.scales);
    expect(around.arrows[0]!.head[0].x).toBeCloseTo(
      around.scales.yToPx(30) - 1,
    );
  });

  it("turns below the row when a task waits for an overlapping one", () => {
    const { arrows, scales } = arrowsOf({
      ...rowsOf([
        { id: "a", row: 1, from: 0, to: 30 },
        { id: "b", row: 1, from: 20, to: 50 },
      ]),
      dependencies: [{ from: "a", to: "b" }],
    });
    const ys = arrows[0]!.points.map((p) => p.y);
    expect(Math.max(...ys)).toBeGreaterThan(scales.xToPx(1));
    expect(arrows[0]!.head[0].y).toBeCloseTo(scales.xToPx(1));
  });

  it("goes around busy rows and leaves milestones from their edge", () => {
    const boxes = [
      { id: "a", row: 0, from: 0, to: 50 },
      { id: "mate", row: 0, from: 60, to: 70 },
      { id: "r1a", row: 1, from: 5, to: 15 },
      { id: "r1b", row: 1, from: 20, to: 35 },
      { id: "r2", row: 2, from: 80, to: 90 },
      { id: "b", row: 3, from: 30, to: 60 },
    ];
    const options = rowsOf(boxes);
    const bars = options.series[0]!;
    options.series = [
      {
        ...bars,
        data: [...(bars.data as ChartPointDatum[]), { x: "r2", y: null }],
      },
      {
        type: "scatter",
        pointSize: 12,
        data: [{ x: "r2", y: 20, id: "m" }],
      },
    ];
    options.dependencies = [
      { from: "a", to: "b" },
      { from: "m", to: "b" },
    ];
    const { arrows, scales } = arrowsOf(options);
    expect(arrows).toHaveLength(2);
    expectClear(arrows[0]!, boxes, scales);
    expect(arrows[0]!.head[0].x).toBeCloseTo(scales.yToPx(30) - 1);
    // out of the right edge of the dot
    expect(arrows[1]!.points[0]!.x).toBeCloseTo(scales.yToPx(20) + 6);
    expectClear(arrows[1]!, boxes, scales);
  });
});
