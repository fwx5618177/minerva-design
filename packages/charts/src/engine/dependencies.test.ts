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
import type { ChartOptions } from "./types";

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

  it("skips hidden tasks, unknown names and non-category axes", () => {
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
