import { describe, expect, it } from "vitest";
import type { ChartCanvas } from "../canvas";
import { createTheme } from "../theme";
import { createCanvasShapeChart } from "./canvas";
import { resolveChord } from "./chord";
import { drawShapeScene, nodeActive } from "./draw";
import { hitTestShapes, pointInPolygon, ribbonOutline } from "./hit";
import {
  describeChart,
  hoverEvent,
  layoutShapeScene,
  layoutShapeTooltip,
  shapeLegend,
  shapeValues,
  toggleCount,
  tooltipContent,
} from "./layout";
import {
  wrapText,
  type RibbonNode,
  type SectorNode,
  type ShapeScene,
  type TextNode,
} from "./scene";
import type {
  BulletChartOptions,
  ChordChartOptions,
  ShapeChartOptions,
} from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;
const W = 600;
const H = 360;

const layout = (
  options: ShapeChartOptions,
  extra: { hidden?: Set<number>; width?: number; height?: number } = {},
) =>
  layoutShapeScene({
    options,
    theme,
    width: extra.width ?? W,
    height: extra.height ?? H,
    measure,
    hidden: extra.hidden,
  });

const ribbons = (scene: ShapeScene) =>
  scene.nodes.filter((n) => n.kind === "ribbon") as RibbonNode[];
const arcs = (scene: ShapeScene) =>
  scene.nodes.filter(
    (n) => n.kind === "sector" && n.hit !== undefined,
  ) as SectorNode[];
const texts = (scene: ShapeScene) =>
  scene.nodes.filter((n) => n.kind === "text") as TextNode[];

// A → B 10, A → C 5, B → A 4, B → C 6, C → A 1, C → B 2
const chord: ChordChartOptions = {
  type: "chord",
  groups: ["A", { name: "B", color: "#ff0000" }, "C"],
  matrix: [
    [0, 10, 5],
    [4, 0, 6],
    [1, 2, 0],
  ],
  animation: false,
};

const span = (a: { a0: number; a1: number }) => a.a1 - a.a0;

describe("chord diagram", () => {
  it("resolves groups and flows from a matrix or a list of links", () => {
    const m = resolveChord(chord);
    expect(m.names).toEqual(["A", "B", "C"]);
    expect(m.colors).toEqual([undefined, "#ff0000", undefined]);
    expect(m.matrix[0]).toEqual([0, 10, 5]);

    // unnamed rows are numbered; negative and missing cells count as 0
    const numbered = resolveChord({
      type: "chord",
      groups: ["A"],
      matrix: [[0, -3], [2]],
    });
    expect(numbered.names).toEqual(["A", "2"]);
    expect(numbered.matrix).toEqual([
      [0, 0],
      [2, 0],
    ]);

    const fromLinks = resolveChord({
      type: "chord",
      groups: ["X"],
      links: [
        { source: "X", target: "Y", value: 3 },
        { source: "X", target: "Y", value: 2, color: "#00f" },
        { source: "Y", target: 0, value: 1 },
        { source: 5, target: "Y", value: 9 },
        { source: "Y", target: "Z", value: -4 },
      ],
    });
    expect(fromLinks.names).toEqual(["X", "Y", "Z"]);
    expect(fromLinks.matrix).toEqual([
      [0, 5, 0],
      [1, 0, 0],
      [0, 0, 0],
    ]);
    expect(fromLinks.cellColors.get(1)).toBe("#00f");
  });

  it("sizes the arcs and both ribbon ends by the flows of both directions", () => {
    const scene = layout(chord);
    expect(scene.type).toBe("chord");
    const [a, b, c] = arcs(scene).sort((x, y) => x.hit! - y.hit!);
    // pairs: A–B 14, A–C 6, B–C 8 → arcs 20 : 22 : 14
    expect(span(a) / span(b)).toBeCloseTo(20 / 22, 6);
    expect(span(c) / span(b)).toBeCloseTo(14 / 22, 6);
    // one ribbon per pair, from the larger direction, as wide at both ends
    const r = ribbons(scene);
    expect(r.map((n) => n.hit).sort()).toEqual([4, 5, 8]);
    const ab = r.find((n) => n.hit === 4)!;
    expect(ab.s1 - ab.s0).toBeCloseTo(ab.t1 - ab.t0, 9);
    expect((ab.s1 - ab.s0) / span(a)).toBeCloseTo(14 / 20, 6);
    expect(ab.head).toBe(0);
    expect(ab.color1).not.toBe(ab.color0);
    expect(ab.also).toEqual([0, 1]);
    // auto subgroups: the flow toward the next group ends the arc
    const ac = r.find((n) => n.hit === 5)!;
    expect(ac.s0).toBeCloseTo(a.a0, 6);
    expect(ab.s1).toBeCloseTo(a.a1, 6);
    // the arc's hover also emphasizes its ribbons
    expect(nodeActive(ab, { index: 0 })).toBe(true);
    expect(nodeActive(ab, { index: 2 })).toBe(false);
    expect(a.also).toEqual(expect.arrayContaining([4, 5]));
  });

  it("describes groups and ribbons in the tooltip and the hover event", () => {
    const scene = layout(chord);
    // keyboard order: groups around the circle, then ribbons along the arcs
    expect(scene.items.map((it) => it.index)).toEqual([0, 1, 2, 5, 4, 8]);
    const group = tooltipContent(scene, { index: 0 })!;
    expect(group.title).toBe("A");
    expect(group.rows.map((r) => [r.name, r.value])).toEqual([
      ["Value", "20"],
      ["Outgoing", "15"],
      ["Incoming", "5"],
      ["Share", "35.7%"],
    ]);
    const ribbon = tooltipContent(scene, { index: 4 })!;
    expect(ribbon.title).toBe("A \u2192 B");
    // share of the pair (10 + 4) among all the pairs (28)
    expect(ribbon.rows.map((r) => [r.name, r.value])).toEqual([
      ["Value", "10"],
      ["Reverse", "4"],
      ["Share", "50.0%"],
    ]);
    expect(hoverEvent(scene, { index: 4 })).toMatchObject({
      name: "A \u2192 B",
      value: 10,
      source: "A",
      target: "B",
      reverseValue: 4,
    });
  });

  it("gives an arc to the groups that only receive flows", () => {
    // undirected links list: B and C never appear as a source
    const links: ChordChartOptions = {
      type: "chord",
      animation: false,
      links: [
        { source: "A", target: "B", value: 6 },
        { source: "A", target: "C", value: 2 },
      ],
    };
    const scene = layout(links);
    const [a, b, c] = arcs(scene).sort((x, y) => x.hit! - y.hit!);
    expect(span(b)).toBeGreaterThan(0);
    expect(span(a) / span(b)).toBeCloseTo(8 / 6, 6);
    expect(span(a) / span(c)).toBeCloseTo(8 / 2, 6);
    const ab = ribbons(scene).find((n) => n.hit === 4)!;
    // the target end covers B's whole arc
    expect(ab.t0).toBeCloseTo(b.a0, 6);
    expect(ab.t1).toBeCloseTo(b.a1, 6);
    expect(ab.s1 - ab.s0).toBeCloseTo(ab.t1 - ab.t0, 9);
    expect(
      tooltipContent(scene, { index: 1 })!.rows.map((r) => [r.name, r.value]),
    ).toEqual([
      ["Value", "6"],
      ["Outgoing", "0"],
      ["Incoming", "6"],
      ["Share", "37.5%"],
    ]);
    expect(
      tooltipContent(scene, { index: 4 })!.rows.map((r) => [r.name, r.value]),
    ).toEqual([
      ["Value", "6"],
      ["Reverse", "0"],
      ["Share", "75.0%"],
    ]);
    // in-only groups are also items and legend entries
    expect(scene.items.map((it) => it.index)).toEqual(
      expect.arrayContaining([0, 1, 2]),
    );

    // directed: B's arc holds the target end of A → B
    const directed = layout({ ...links, directed: true });
    const [da, db, dc] = arcs(directed).sort((x, y) => x.hit! - y.hit!);
    expect(span(da) / span(db)).toBeCloseTo(8 / 6, 6);
    expect(span(da) / span(dc)).toBeCloseTo(8 / 2, 6);
    const dab = ribbons(directed).find((n) => n.hit === 4)!;
    expect(dab.t0).toBeCloseTo(db.a0, 6);
    expect(dab.t1).toBeCloseTo(db.a1, 6);
    expect(dab.s1 - dab.s0).toBeCloseTo(dab.t1 - dab.t0, 9);
  });

  it("counts the relations of a symmetric matrix once", () => {
    const scene = layout({
      type: "chord",
      animation: false,
      groups: ["A", "B", "C"],
      matrix: [
        [2, 5, 1],
        [5, 0, 3],
        [1, 3, 0],
      ],
    });
    const [a, b, c] = arcs(scene).sort((x, y) => x.hit! - y.hit!);
    // row sums 8 : 8 : 4 (self flow included once)
    expect(span(a) / span(b)).toBeCloseTo(1, 6);
    expect(span(c) / span(b)).toBeCloseTo(0.5, 6);
    const ab = ribbons(scene).find((n) => n.hit === 4)!;
    expect((ab.s1 - ab.s0) / span(a)).toBeCloseTo(5 / 8, 6);
    expect(
      tooltipContent(scene, { index: 0 })!.rows.map((r) => r.name),
    ).toEqual(["Value", "Share"]);
    expect(
      tooltipContent(scene, { index: 4 })!.rows.map((r) => [r.name, r.value]),
    ).toEqual([
      ["Value", "5"],
      ["Share", "45.5%"],
    ]);
  });

  it("draws one ribbon per direction with arrowheads when directed", () => {
    const scene = layout({
      ...chord,
      directed: true,
      matrix: [
        [7, 10, 5],
        [4, 0, 6],
        [1, 2, 0],
      ],
    });
    const [a, b, c] = arcs(scene).sort((x, y) => x.hit! - y.hit!);
    // out + in (self flows ignored): 20, 22, 14
    expect(span(a) / span(b)).toBeCloseTo(20 / 22, 6);
    expect(span(c) / span(b)).toBeCloseTo(14 / 22, 6);
    const r = ribbons(scene);
    expect(r).toHaveLength(6);
    expect(r.every((n) => n.head > 0)).toBe(true);
    const ab = r.find((n) => n.hit === 4)!;
    expect(ab.s1 - ab.s0).toBeCloseTo(ab.t1 - ab.t0, 9);
    const rows = tooltipContent(scene, { index: 4 })!.rows.map((x) => x.name);
    expect(rows).toEqual(["Value", "Reverse", "Share"]);
    expect(
      tooltipContent(scene, { index: 0 })!.rows.map((x) => x.name),
    ).toEqual(["Value", "Outgoing", "Incoming", "Share"]);
    // no arrows when disabled
    const plain = layout({ ...chord, directed: true, arrows: false });
    expect(ribbons(plain).every((n) => n.head === 0)).toBe(true);
  });

  it("orders the groups, hides toggled groups and lists them in the legend", () => {
    const sorted = layout({ ...chord, sortGroups: "ascending" });
    const order = arcs(sorted)
      .sort((x, y) => x.a0 - y.a0)
      .map((s) => s.hit);
    expect(order).toEqual([2, 0, 1]);

    const hidden = layout(chord, { hidden: new Set([1]) });
    expect(hidden.items.map((it) => it.index)).toEqual([0, 2, 5]);
    expect(
      tooltipContent(hidden, { index: 0 })!.rows.map((r) => [r.name, r.value]),
    ).toEqual([
      ["Value", "6"],
      ["Outgoing", "5"],
      ["Incoming", "1"],
      ["Share", "50.0%"],
    ]);
    const values = shapeValues(chord, new Set([1]));
    expect(values.get("A\u2192B")).toBe(0);
    expect(values.get("A\u2192C")).toBe(5);
    expect(values.get("~B")).toBe(0);

    expect(toggleCount(chord)).toBe(3);
    const legend = shapeLegend(chord, theme, new Set([2]))!;
    expect(legend.map((e) => [e.name, e.hidden])).toEqual([
      ["A", false],
      ["B", false],
      ["C", true],
    ]);
    expect(shapeLegend({ ...chord, legend: false }, theme)).toBeNull();
  });

  it("writes tangential or radial labels and value ticks", () => {
    const scene = layout(chord);
    const names = texts(scene).filter((t) => ["A", "B", "C"].includes(t.text));
    expect(names).toHaveLength(3);
    expect(names.every((t) => t.align === "center")).toBe(true);
    // ticks: short lines and labelled values outside the arcs
    expect(scene.nodes.some((n) => n.kind === "line")).toBe(true);
    expect(texts(scene).some((t) => t.text === "0")).toBe(true);

    const long = layout(
      {
        ...chord,
        groups: [
          "North America and Caribbean",
          "Western Europe",
          "Southeast Asia, Oceania and the Pacific",
        ],
        ticks: false,
      },
      { width: 300, height: 300 },
    );
    const radial = texts(long);
    expect(radial.length).toBeGreaterThan(0);
    // rotated along their ray, except near 12 / 6 o'clock where they are horizontal
    expect(
      radial.every((t) =>
        t.rotate ? t.align === "left" || t.align === "right" : true,
      ),
    ).toBe(true);
    expect(radial.some((t) => t.rotate)).toBe(true);
    expect(long.nodes.some((n) => n.kind === "line")).toBe(false);
    expect(texts(layout({ ...chord, labels: "none", ticks: false }))).toEqual(
      [],
    );
    // small charts skip the ticks
    const small = layout(chord, { width: 220, height: 220 });
    expect(small.nodes.some((n) => n.kind === "line")).toBe(false);
  });

  it("hit tests ribbons and arcs", () => {
    const scene = layout({ ...chord, ticks: false });
    const ab = ribbons(scene).find((n) => n.hit === 4)!;
    const item = scene.items.find((it) => it.index === 4)!;
    expect(pointInPolygon(item.x, item.y, ribbonOutline(ab))).toBe(true);
    const arc = arcs(scene).find((s) => s.hit === 0)!;
    const mid = (arc.a0 + arc.a1) / 2;
    const r = (arc.r0 + arc.r1) / 2;
    expect(
      hitTestShapes(
        scene,
        arc.cx + r * Math.cos(mid),
        arc.cy + r * Math.sin(mid),
      ),
    ).toEqual({ index: 0 });
    // far outside: nothing
    expect(hitTestShapes(scene, 2, 2)).toBeNull();
    // arrowheads and self flows have outlines too
    const directed = layout({ ...chord, directed: true });
    const arrow = ribbons(directed)[0];
    expect(ribbonOutline(arrow).length).toBeGreaterThan(20);
    const loop = layout({
      ...chord,
      matrix: [[3, 1], [1]],
      groups: ["A", "B"],
    });
    const self = ribbons(loop).find((n) => n.hit === 2)!;
    expect(self.s0).toBe(self.t0);
    const outline = ribbonOutline(self);
    const [ix, iy] = [
      self.cx + self.r * 0.8 * Math.cos((self.s0 + self.s1) / 2),
      self.cy + self.r * 0.8 * Math.sin((self.s0 + self.s1) / 2),
    ];
    expect(pointInPolygon(ix, iy, outline)).toBe(true);
    expect(tooltipContent(loop, { index: 2 })!.title).toBe("A");
  });

  it("is localized and shows a placeholder without flows", () => {
    expect(describeChart(chord)).toBe("Chord diagram");
    expect(describeChart({ ...chord, locale: "zh-CN" })).toBe("\u5f26\u56fe");
    const zh = layout({ ...chord, locale: "zh-CN" });
    expect(tooltipContent(zh, { index: 4 })!.rows[1].name).toBe("\u53cd\u5411");
    expect(layout({ ...chord, matrix: [[0, 0], [0]] }).empty).toBe(true);
    expect(layout({ type: "chord", groups: [] }).empty).toBe(true);
    // entry animation fades and scales around the center
    const entering = layoutShapeScene({
      options: chord,
      theme,
      width: W,
      height: H,
      measure,
      enter: 0.5,
    });
    expect(entering.enter?.alpha).toBe(0.5);
  });

  it("draws ribbons with gradients and arrowheads", () => {
    const calls: string[] = [];
    const ctx = new Proxy({} as Record<string, unknown>, {
      get(target, key: string) {
        if (key in target) return target[key];
        if (key === "createLinearGradient")
          return () => {
            calls.push(key);
            return { addColorStop: () => {} };
          };
        return () => calls.push(key);
      },
      set(target, key: string, value) {
        target[key] = value;
        return true;
      },
    }) as unknown as CanvasRenderingContext2D;
    drawShapeScene(ctx, layout({ ...chord, directed: true }), { index: 4 });
    expect(calls).toContain("createLinearGradient");
    expect(calls).toContain("quadraticCurveTo");
    expect(calls).toContain("lineTo");
    expect(calls).toContain("stroke");
  });

  it("renders on any 2D canvas (mini-programs)", () => {
    const fills: unknown[] = [];
    const ctx = new Proxy({} as Record<string, unknown>, {
      get(target, key: string) {
        if (key in target) return target[key];
        if (key === "measureText")
          return (text: string) => ({ width: text.length * 6 });
        if (key === "createLinearGradient")
          return () => ({ addColorStop: () => {} });
        return (...args: unknown[]) => {
          if (key === "fillText") fills.push(args[0]);
        };
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
    };
    const chart = createCanvasShapeChart({
      canvas,
      width: 480,
      height: 420,
      options: { ...chord, legend: false },
    });
    expect(fills).toEqual(expect.arrayContaining(["A", "B", "C"]));
    const clicks: string[] = [];
    chart.on("click", (e) => clicks.push(e.name));
    // the top of the circle is group A
    const scene = layoutShapeScene({
      options: { ...chord, legend: false },
      theme,
      width: 480,
      height: 420,
      measure,
    });
    const a = scene.items.find((it) => it.index === 0)!;
    chart.touchStart([{ x: a.x - 2, y: a.y + 6 }]);
    chart.touchEnd([{ x: a.x - 2, y: a.y + 6 }]);
    expect(clicks).toEqual(["A"]);
    chart.destroy();
  });
});

describe("long names", () => {
  it("wraps at spaces, or anywhere, with an ellipsis on the last line", () => {
    expect(wrapText("Short", 100, "12px x", measure)).toEqual(["Short"]);
    expect(
      wrapText("Customer satisfaction score", 100, "12px x", measure),
    ).toEqual(["Customer", "satisfaction sc\u2026"]);
    const cjk = wrapText(
      "华东地区线上渠道季度销售额完成情况与同比增长分析",
      60,
      "12px x",
      measure,
    );
    expect(cjk).toHaveLength(2);
    expect(cjk[0]).toHaveLength(10);
    expect(cjk[1].endsWith("\u2026")).toBe(true);
    expect(wrapText("Anything", 2, "12px x", measure)).toEqual([]);
    // a text that fits is balanced, and closing punctuation never starts a line
    expect(
      wrapText("华东地区线上渠道季度销售额", 60, "12px x", measure).map(
        (l) => l.length,
      ),
    ).toEqual([7, 6]);
    const kinsoku = wrapText("一二三四五六七八九十）", 60, "12px x", measure);
    expect(kinsoku).toHaveLength(2);
    expect(kinsoku.every((l) => !l.startsWith("）"))).toBe(true);
    expect(kinsoku.join("")).toBe("一二三四五六七八九十）");
    expect(wrapText("Net revenue retention", 100, "12px x", measure)).toEqual([
      "Net revenue",
      "retention",
    ]);
  });

  it("gives bullet names a measured column and two lines", () => {
    const name =
      "Customer satisfaction score across all regions and every sales channel of the company";
    const options: BulletChartOptions = {
      type: "bullet",
      animation: false,
      data: [
        { name, value: 70, target: 80, subtitle: "%" },
        { name: "Revenue", value: 5, target: 4 },
      ],
    };
    const scene = layout(options, { height: 180 });
    const rowTexts = texts(scene).filter(
      (t) => t.hit === 0 && t.align === "right" && t.font.includes("600"),
    );
    const lines = rowTexts.filter((t) => t.x < 300).map((t) => t.text);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toBe("Customer satisfaction score across");
    expect(lines[1].endsWith("\u2026")).toBe(true);
    // the column is capped at 40% of the width
    expect(rowTexts[0].x).toBeLessThanOrEqual(8 + (W - 16) * 0.4);
    // the tooltip keeps the full name, wrapped on the canvas
    const tip = tooltipContent(scene, { index: 0 })!;
    expect(tip.title).toBe(name);
    const box = layoutShapeTooltip(tip, 100, 50, 300, 200, theme, measure);
    expect(box.titleLines!.length).toBeGreaterThan(1);
    expect(box.titleLines!.join(" ")).toBe(name);
    expect(box.width).toBeLessThanOrEqual(300);

    // vertical: names wrap below the columns when a column is too narrow
    const vertical = layout(
      { ...options, orientation: "vertical" },
      { width: 260 },
    );
    const below = texts(vertical).filter(
      (t) => t.hit === 0 && t.font.includes("600") && t.y > 200,
    );
    expect(below.map((t) => t.text)).toHaveLength(2);
  });
});
