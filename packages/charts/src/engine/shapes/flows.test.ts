import { describe, expect, it, vi } from "vitest";
import type { ChartCanvas } from "../canvas";
import { createTheme } from "../theme";
import { bulletScale } from "./bullet";
import {
  calendarDay,
  calendarIso,
  calendarLevelNames,
  calendarModel,
  localeWeekStart,
} from "./calendar";
import { createCanvasShapeChart } from "./canvas";
import { nodeActive } from "./draw";
import { hitTestShapes, pointNearLink, stepHover } from "./hit";
import {
  describeChart,
  hoverEvent,
  layoutShapeScene,
  shapeLegend,
  toggleCount,
  tooltipContent,
} from "./layout";
import { createShapeRuntime } from "./runtime";
import { resolveSankey, sankeyColumns } from "./sankey";
import type {
  ArcNode,
  LinkNode,
  RectNode,
  SectorNode,
  ShapeScene,
  TextNode,
} from "./scene";
import type {
  BulletChartOptions,
  CalendarHeatmapOptions,
  RadialBarChartOptions,
  SankeyChartOptions,
  ShapeChartOptions,
  SunburstChartOptions,
} from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;
const W = 600;
const H = 360;

const layout = (
  options: ShapeChartOptions,
  extra: {
    hidden?: Set<number>;
    enter?: number;
    width?: number;
    height?: number;
    focus?: string[];
  } = {},
) =>
  layoutShapeScene({
    options,
    theme,
    width: extra.width ?? W,
    height: extra.height ?? H,
    measure,
    hidden: extra.hidden,
    enter: extra.enter,
    focus: extra.focus,
  });

const of = <K extends string>(scene: ShapeScene, kind: K) =>
  scene.nodes.filter((n) => n.kind === kind);
const links = (scene: ShapeScene) => of(scene, "link") as LinkNode[];
const rects = (scene: ShapeScene) =>
  (of(scene, "rect") as RectNode[]).filter((n) => n.hit !== undefined);
const texts = (scene: ShapeScene) => of(scene, "text") as TextNode[];
const sectors = (scene: ShapeScene) => of(scene, "sector") as SectorNode[];

const textBox = (t: TextNode) => {
  const w = measure(t.text);
  const x0 =
    t.align === "left" ? t.x : t.align === "right" ? t.x - w : t.x - w / 2;
  return { x0, x1: x0 + w, y0: t.y - 6, y1: t.y + 6 };
};

// ------------------------------------------------------------------ sankey

const energy: SankeyChartOptions = {
  type: "sankey",
  links: [
    { source: "Coal", target: "Power", value: 40 },
    { source: "Gas", target: "Power", value: 30 },
    { source: "Gas", target: "Heat", value: 20 },
    { source: "Solar", target: "Power", value: 10 },
    { source: "Power", target: "Homes", value: 45 },
    { source: "Power", target: "Industry", value: 35 },
    { source: "Heat", target: "Homes", value: 20 },
  ],
};

describe("sankey", () => {
  it("resolves names and indexes, drops self links and cycles", () => {
    const g = resolveSankey({
      type: "sankey",
      nodes: [{ name: "A" }, { name: "B" }],
      links: [
        { source: 0, target: "B", value: 1 },
        { source: "B", target: "C", value: 1 },
        { source: "C", target: "A", value: 1 }, // closes a cycle
        { source: "C", target: "C", value: 1 }, // self link
        { source: 9, target: "A", value: 1 }, // invalid index
      ],
    });
    expect(g.names).toEqual(["A", "B", "C"]);
    expect(g.edges.map((e) => e.link)).toEqual([0, 1]);
  });

  it("puts the nodes in columns (sinks last when justified)", () => {
    const g = resolveSankey({
      type: "sankey",
      links: [
        { source: "A", target: "B", value: 1 },
        { source: "B", target: "C", value: 1 },
        { source: "A", target: "D", value: 1 },
      ],
    });
    expect(sankeyColumns(g)).toEqual([0, 1, 2, 2]);
    expect(sankeyColumns(g, "left")).toEqual([0, 1, 2, 1]);
  });

  it("sizes the nodes by their flow and keeps the flows conserved", () => {
    const scene = layout(energy);
    const g = resolveSankey(energy);
    const bar = (name: string) =>
      rects(scene).find((r) => r.hit === g.names.indexOf(name))!;
    const power = bar("Power");
    const coal = bar("Coal");
    expect(power.height / coal.height).toBeCloseTo(80 / 40, 1);
    // the links entering Power fill its height
    const entering = links(scene).filter(
      (l) =>
        Math.abs(l.x1 - power.x) < 0.5 &&
        l.y1 > power.y &&
        l.y1 < power.y + power.height,
    );
    const widths = entering.reduce((s, l) => s + l.width, 0);
    expect(widths).toBeCloseTo(power.height, 1);
    // columns from left to right
    expect(coal.x).toBeLessThan(power.x);
    expect(power.x).toBeLessThan(bar("Homes").x);
  });

  it("relaxes the node order to avoid crossings", () => {
    const scene = layout({
      type: "sankey",
      // the targets are declared in the reverse order of their sources
      nodes: [{ name: "A" }, { name: "B" }, { name: "Y" }, { name: "X" }],
      links: [
        { source: "A", target: "X", value: 10 },
        { source: "B", target: "Y", value: 10 },
      ],
    });
    const y = (i: number) => rects(scene).find((r) => r.hit === i)!.y;
    // A -> X and B -> Y do not cross
    expect(y(0) < y(1)).toBe(y(3) < y(2));
  });

  it("labels the nodes without overlaps, on the inner side of the last column", () => {
    const scene = layout(energy);
    const labels = texts(scene);
    expect(labels.map((t) => t.text)).toEqual(
      expect.arrayContaining(["Coal", "Power", "Homes"]),
    );
    const boxes = labels.map(textBox);
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const overlap =
          a.x0 < b.x1 - 0.5 &&
          b.x0 < a.x1 - 0.5 &&
          a.y0 < b.y1 - 0.5 &&
          b.y0 < a.y1 - 0.5;
        // the name and the value of a node touch, never overlap
        expect(overlap).toBe(false);
      }
    const homes = labels.find((t) => t.text === "Homes")!;
    expect(homes.x).toBeLessThan(W - 20);
  });

  it("hovers links (source / target in the event) and emphasizes their ends", () => {
    const scene = layout(energy);
    const n = resolveSankey(energy).names.length;
    const link = links(scene).find((l) => l.hit === n + 0)!;
    const xm = (link.x0 + link.x1) / 2;
    const ym = (link.y0 + link.y1) / 2;
    expect(pointNearLink(xm, ym, link)).toBe(true);
    expect(pointNearLink(xm, ym + link.width, link)).toBe(false);
    const hit = hitTestShapes(scene, xm, ym);
    expect(hit?.index).toBe(n);
    const event = hoverEvent(scene, hit);
    expect(event).toMatchObject({
      name: "Coal \u2192 Power",
      source: "Coal",
      target: "Power",
      value: 40,
    });
    // hovering the link keeps its two nodes emphasized
    const coal = rects(scene).find((r) => r.hit === 0)!;
    expect(nodeActive(coal, hit)).toBe(true);
    // hovering a node emphasizes its links
    expect(nodeActive(link, { index: 0 })).toBe(true);
  });

  it("hides a node and its flows, with legend entries for the nodes", () => {
    const g = resolveSankey(energy);
    const solar = g.names.indexOf("Solar");
    const scene = layout(energy, { hidden: new Set([solar]) });
    expect(rects(scene).some((r) => r.hit === solar)).toBe(false);
    expect(scene.items.some((it) => it.index === solar)).toBe(false);
    expect(toggleCount(energy)).toBe(g.names.length);
    expect(shapeLegend(energy, theme)).toBeNull();
    expect(
      shapeLegend({ ...energy, legend: true }, theme)?.map((e) => e.name),
    ).toEqual(g.names);
    expect(describeChart(energy)).toBe("Sankey diagram");
  });

  it("is empty without flows", () => {
    expect(layout({ type: "sankey", links: [] }).empty).toBe(true);
  });
});

// ---------------------------------------------------------------- sunburst

const disk: SunburstChartOptions = {
  type: "sunburst",
  data: [
    {
      name: "src",
      children: [
        { name: "app", value: 30 },
        { name: "lib", value: 10 },
      ],
    },
    { name: "docs", value: 20 },
    {
      name: "assets",
      children: [
        { name: "img", value: 25 },
        { name: "fonts", value: 15 },
      ],
    },
  ],
};

describe("sunburst", () => {
  it("nests the children in the angle of their parent", () => {
    const scene = layout(disk);
    const s = sectors(scene);
    // depth-first indexes: src 0, app 1, lib 2, docs 3, assets 4, img 5, fonts 6
    const src = s.find((x) => x.hit === 0)!;
    const app = s.find((x) => x.hit === 1)!;
    const lib = s.find((x) => x.hit === 2)!;
    expect(src.a1 - src.a0).toBeCloseTo((Math.PI * 2 * 40) / 100, 5);
    expect(app.a0).toBeCloseTo(src.a0, 5);
    expect(lib.a1).toBeCloseTo(src.a1, 5);
    expect(app.r0).toBeCloseTo(src.r1, 5);
    // the total in the center
    expect(texts(scene).some((t) => t.text === "100")).toBe(true);
    const app1 = scene.items.find((it) => it.index === 1)!;
    expect(app1.path).toEqual(["src", "app"]);
    expect(tooltipContent(scene, { index: 1 })?.title).toBe("src / app");
    // parents can be drilled into, leaves not
    expect(scene.items.find((it) => it.index === 0)?.drill).toEqual(["src"]);
    expect(app1.drill).toBeUndefined();
  });

  it("drills into a node: its children fill the circle, the center goes up", () => {
    const scene = layout(disk, { focus: ["assets"] });
    const s = sectors(scene);
    const img = s.find((x) => x.hit === 5)!;
    const fonts = s.find((x) => x.hit === 6)!;
    expect(fonts.a1 - img.a0).toBeCloseTo(Math.PI * 2, 4);
    expect(s.some((x) => x.hit === 0)).toBe(false);
    const center = scene.items.find((it) => it.index === 4)!;
    expect(center.drill).toEqual([]);
    expect(texts(scene).some((t) => t.text === "assets")).toBe(true);
  });

  it("drills through the runtime, controlled or not", () => {
    const runtime = createShapeRuntime(
      { ...disk, animation: false },
      () => true,
    );
    expect(runtime.drill(["assets", "img"])).toEqual({ path: ["assets"] });
    expect(runtime.drillPath()).toEqual(["assets"]);
    expect(runtime.drill(["nope"])).toEqual({ path: [] });
    expect(runtime.drillPath()).toEqual([]);
    expect(runtime.drill([])).toBeNull();

    runtime.setOptions({ ...disk, animation: false, drillPath: ["src"] });
    expect(runtime.drillPath()).toEqual(["src"]);
    expect(runtime.drill([])).toEqual({ path: [] });
    // controlled: unchanged until passed back
    expect(runtime.drillPath()).toEqual(["src"]);
    const { scene } = runtime.frame(0, {
      theme,
      width: W,
      height: H,
      measure,
    });
    expect(scene.items.find((it) => it.index === 0)?.drill).toEqual([]);
  });

  it("keeps the rotated labels upright and inside their sector", () => {
    const scene = layout(disk);
    const labels = texts(scene).filter((t) => t.rotate !== undefined);
    expect(labels.length).toBeGreaterThan(3);
    for (const t of labels) {
      expect(t.rotate!).toBeGreaterThan(-Math.PI / 2 - 1e-9);
      expect(t.rotate!).toBeLessThanOrEqual(Math.PI / 2 + 1e-9);
    }
  });

  it("toggles top-level nodes", () => {
    const scene = layout(disk, { hidden: new Set([0]) });
    expect(sectors(scene).some((x) => x.hit === 0)).toBe(false);
    expect(toggleCount(disk)).toBe(3);
  });
});

// -------------------------------------------------------------- radial bar

const rings: RadialBarChartOptions = {
  type: "radialBar",
  data: [
    { name: "Move", value: 450, max: 600 },
    { name: "Exercise", value: 30, max: 30 },
    { name: "Stand", value: 6, max: 12 },
  ],
};

describe("radial bar", () => {
  const bars = (scene: ShapeScene) =>
    (of(scene, "arc") as ArcNode[]).filter(
      (a) =>
        a.hit !== undefined &&
        a.color === scene.items.find((it) => it.index === a.hit)?.color,
    );

  it("draws concentric bars, outermost first, proportional to value / max", () => {
    const scene = layout({ ...rings, rounded: false, track: false });
    const arcs = bars(scene);
    expect(arcs.map((a) => a.hit)).toEqual([0, 1, 2]);
    expect(arcs[0].r).toBeGreaterThan(arcs[1].r);
    expect(arcs[1].r).toBeGreaterThan(arcs[2].r);
    const sweep = (Math.PI * 3) / 2;
    expect(arcs[0].a1 - arcs[0].a0).toBeCloseTo(sweep * 0.75, 5);
    expect(arcs[1].a1 - arcs[1].a0).toBeCloseTo(sweep, 5);
    expect(arcs[2].a1 - arcs[2].a0).toBeCloseTo(sweep * 0.5, 5);
    expect(scene.items[0].rows.map((r) => r.value)).toEqual([
      "450",
      "600",
      "75.0%",
    ]);
  });

  it("keeps the rounded ends inside the sweep and hovers the tracks", () => {
    const scene = layout(rings);
    const tracks = (of(scene, "arc") as ArcNode[]).filter((a) => a.hit === 1);
    expect(tracks.length).toBe(2);
    const [track, bar] = tracks;
    const start = -Math.PI / 2;
    expect(track.a0).toBeGreaterThan(start);
    expect(bar.a1).toBeCloseTo(track.a1, 5);
    // a point on the empty part of the third track hits it
    const stand = (of(scene, "arc") as ArcNode[]).find((a) => a.hit === 2)!;
    const a = start + Math.PI * 1.3;
    const hit = hitTestShapes(
      scene,
      stand.cx + stand.r * Math.cos(a),
      stand.cy + stand.r * Math.sin(a),
    );
    expect(hit?.index).toBe(2);
  });

  it("labels the bars before their start, or shows a legend for full rings", () => {
    const labelled = layout(rings);
    expect(texts(labelled).map((t) => t.text)).toEqual(
      expect.arrayContaining(["Move  450"]),
    );
    expect(shapeLegend(rings, theme)).toBeNull();
    const full = { ...rings, sweep: 360 };
    expect(texts(layout(full)).length).toBe(0);
    expect(shapeLegend(full, theme)?.length).toBe(3);
  });

  it("removes hidden bars and widens the others", () => {
    const all = bars(layout(rings));
    const scene = layout(rings, { hidden: new Set([1]) });
    const arcs = bars(scene);
    expect(arcs.map((a) => a.hit)).toEqual([0, 2]);
    expect(arcs[0].width).toBeGreaterThan(all[0].width);
  });
});

// -------------------------------------------------------- calendar heatmap

describe("calendar heatmap", () => {
  it("parses days and locales", () => {
    expect(calendarIso(calendarDay("2026-03-01")!)).toBe("2026-03-01");
    expect(calendarIso(calendarDay(new Date(2026, 2, 1, 23, 30))!)).toBe(
      "2026-03-01",
    );
    expect(calendarDay("nope")).toBeNull();
    expect(localeWeekStart("en-US")).toBe(0);
    expect(localeWeekStart("fr-FR")).toBe(1);
    expect(localeWeekStart("en-GB")).toBe(1);
    expect(localeWeekStart("ja-JP")).toBe(0);
  });

  const year: CalendarHeatmapOptions = {
    type: "calendarHeatmap",
    range: 2025,
    weekStart: 1,
    data: [
      { date: "2025-01-06", value: 1 },
      { date: "2025-01-07", value: 3 },
      { date: "2025-01-08", value: 5 },
      { date: "2025-01-08", value: 3 },
      { date: "2025-06-02", value: 7 },
    ],
  };

  it("splits the values in levels with readable names", () => {
    const model = calendarModel(year)!;
    expect(model.max).toBe(8);
    expect(model.thresholds).toEqual([2, 4, 6]);
    expect(calendarLevelNames(model)).toEqual([
      "1\u20132",
      "3\u20134",
      "5\u20136",
      "> 6",
    ]);
    expect(toggleCount(year)).toBe(4);
    expect(shapeLegend(year, theme)?.map((e) => e.name)).toEqual([
      "1\u20132",
      "3\u20134",
      "5\u20136",
      "> 6",
    ]);
  });

  it("lays a year out in weeks, a row per weekday", () => {
    const scene = layout(year, { width: 900, height: 200 });
    const cells = rects(scene);
    expect(cells.length).toBe(365);
    // 2025-01-06 and 2025-06-02 are Mondays: first row with weekStart 1
    const day = (iso: string) =>
      cells.find(
        (c) => c.hit === calendarDay(iso)! - calendarDay("2025-01-01")!,
      )!;
    expect(day("2025-01-06").y).toBeCloseTo(day("2025-06-02").y, 5);
    expect(day("2025-01-07").y).toBeGreaterThan(day("2025-01-06").y);
    expect(day("2025-01-13").x).toBeGreaterThan(day("2025-01-06").x);
    // month names
    expect(texts(scene).length).toBeGreaterThan(10);
    // tooltip / event with the date
    const hit = { index: day("2025-01-08").hit! };
    expect(hoverEvent(scene, hit)).toMatchObject({
      date: "2025-01-08",
      value: 8,
    });
    // arrow keys: Right = next week, Down = next day
    expect(stepHover(scene, hit, "next")?.index).toBe(hit.index + 7);
    expect(stepHover(scene, hit, "down")?.index).toBe(hit.index + 1);
    expect(stepHover(scene, { index: 0 }, "prev")?.index).toBe(0);
  });

  it("draws the days of a hidden level as empty days", () => {
    const shown = layout(year);
    const hidden = layout(year, { hidden: new Set([3]) });
    const index = calendarDay("2025-01-08")! - calendarDay("2025-01-01")!;
    const empty = rects(shown).find((c) => c.hit === 0)!.fill;
    expect(rects(shown).find((c) => c.hit === index)!.fill).not.toBe(empty);
    expect(rects(hidden).find((c) => c.hit === index)!.fill).toBe(empty);
  });

  it("lays months out as small calendars, and long ranges as yearly strips", () => {
    const months = layout(
      { ...year, layout: "months", locale: "en-US" },
      { width: 800, height: 600 },
    );
    expect(texts(months).filter((t) => t.text === "January").length).toBe(1);
    const steps = months.steps!;
    expect(steps).toEqual({ next: 1, down: 7 });

    const multi = layout(
      { ...year, range: ["2024-01-01", "2025-12-31"] },
      { width: 900, height: 360 },
    );
    expect(rects(multi).length).toBe(366 + 365);
    expect(texts(multi).map((t) => t.text)).toEqual(
      expect.arrayContaining(["2024", "2025"]),
    );
  });

  it("defaults to the 53 weeks ending on the last day of the data", () => {
    const model = calendarModel({ ...year, range: undefined })!;
    expect(calendarIso(model.end)).toBe("2025-06-02");
    expect(model.end - model.start).toBeGreaterThanOrEqual(364);
    expect(model.end - model.start).toBeLessThan(371);
    expect(layout({ type: "calendarHeatmap", data: [] }).empty).toBe(true);
  });
});

// ------------------------------------------------------------------ bullet

const kpis: BulletChartOptions = {
  type: "bullet",
  data: [
    {
      name: "Revenue",
      subtitle: "k$",
      value: 270,
      target: 250,
      ranges: [150, 225, 300],
    },
    { name: "Orders", value: 1650, target: 2000 },
  ],
};

describe("bullet", () => {
  it("computes the scale from the ranges, else a nice bound", () => {
    expect(bulletScale(kpis, kpis.data[0])).toEqual([0, 300]);
    expect(bulletScale(kpis, kpis.data[1])).toEqual([0, 2000]);
    expect(bulletScale(kpis, { name: "x", value: -20, max: 50 })).toEqual([
      -20, 50,
    ]);
  });

  it("draws ranges, the measure and the target on the row's scale", () => {
    const scene = layout(kpis);
    const row = rects(scene).filter((r) => r.hit === 0);
    // hover area, 3 disjoint ranges, measure, target
    expect(row.length).toBe(6);
    const [, low, mid, high, bar, target] = row;
    const outer = { x: low.x, width: low.width + mid.width + high.width };
    expect(low.width / outer.width).toBeCloseTo(150 / 300, 5);
    expect(mid.x).toBeCloseTo(low.x + low.width, 5);
    expect(bar.width / outer.width).toBeCloseTo(270 / 300, 5);
    expect(bar.height).toBeLessThan(low.height);
    expect(target.x + target.width / 2 - outer.x).toBeCloseTo(
      (outer.width * 250) / 300,
      4,
    );
    expect(texts(scene).map((t) => t.text)).toEqual(
      expect.arrayContaining(["Revenue", "k$", "270"]),
    );
    expect(scene.items[0].rows.map((r) => r.name)).toEqual([
      "Value",
      "Target",
      "Of target",
    ]);
    expect(scene.items[0].percent).toBeCloseTo(270 / 250, 5);
  });

  it("grows the bars upward when vertical", () => {
    const scene = layout({ ...kpis, orientation: "vertical" });
    const [, low, mid, high, bar] = rects(scene).filter((r) => r.hit === 0);
    const bottom = low.y + low.height;
    const height = low.height + mid.height + high.height;
    expect(bar.y + bar.height).toBeCloseTo(bottom, 5);
    expect(bar.height / height).toBeCloseTo(270 / 300, 5);
  });

  it("hides rows", () => {
    const scene = layout(kpis, { hidden: new Set([0]) });
    expect(rects(scene).some((r) => r.hit === 0)).toBe(false);
    expect(scene.items.map((it) => it.index)).toEqual([1]);
  });
});

// ---------------------------------------------------- canvas host: drill

describe("createCanvasShapeChart drill-down", () => {
  it("drills into a parent on tap and back up from the center", () => {
    const frames: (() => void)[] = [];
    const ctx = new Proxy({} as Record<string, unknown>, {
      get(target, key: string) {
        if (key in target) return target[key];
        if (key === "measureText")
          return (text: string) => ({ width: text.length * 6 });
        return () => {};
      },
      set(target, key: string, value) {
        target[key] = value;
        return true;
      },
    });
    const canvas: ChartCanvas = {
      width: 0,
      height: 0,
      getContext: () => ctx as unknown as CanvasRenderingContext2D,
      requestAnimationFrame: (cb) => frames.push(cb),
      cancelAnimationFrame: () => {},
    };
    const flush = () => {
      for (let i = 0; i < 100 && frames.length; i++) frames.shift()!();
    };
    const chart = createCanvasShapeChart({
      canvas,
      width: 400,
      height: 400,
      options: { ...disk, animation: false },
    });
    const drills = vi.fn();
    chart.on("drill", drills);
    // "src" starts at 12 o'clock: tap its ring just right of the top
    const scene = layout(disk, { width: 400, height: 400 });
    const src = sectors(scene).find((s) => s.hit === 0)!;
    const a = src.a0 + 0.2;
    const r = (src.r0 + src.r1) / 2;
    chart.touchStart([
      { x: src.cx + r * Math.cos(a), y: src.cy + r * Math.sin(a) },
    ]);
    chart.touchEnd([
      { x: src.cx + r * Math.cos(a), y: src.cy + r * Math.sin(a) },
    ]);
    expect(drills).toHaveBeenLastCalledWith({ path: ["src"] });
    expect(chart.getDrillPath()).toEqual(["src"]);
    flush();
    chart.touchStart([{ x: src.cx, y: src.cy }]);
    chart.touchEnd([{ x: src.cx, y: src.cy }]);
    expect(drills).toHaveBeenLastCalledWith({ path: [] });
    expect(chart.getDrillPath()).toEqual([]);
    chart.drill(["assets"]);
    expect(chart.getDrillPath()).toEqual(["assets"]);
    chart.destroy();
  });
});
