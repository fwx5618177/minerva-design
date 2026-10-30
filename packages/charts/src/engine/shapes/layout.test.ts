import { describe, expect, it } from "vitest";
import { parseColor } from "../color";
import { createTheme } from "../theme";
import { gaugeBandIndex } from "./gauge";
import { pointInPolygon, pointInSector, hitTestShapes, stepHover } from "./hit";
import {
  layoutShapeScene,
  placeShapeTooltip,
  shapeLegend,
  tooltipContent,
} from "./layout";
import { createShapeRuntime } from "./runtime";
import {
  contrastRatio,
  TAU,
  textOn,
  type ArcNode,
  type LineNode,
  type PolygonNode,
  type RectNode,
  type SectorNode,
  type ShapeScene,
  type TextNode,
} from "./scene";
import { squarify } from "./treemap";
import type {
  FunnelChartOptions,
  GaugeChartOptions,
  PieChartOptions,
  RadarChartOptions,
  ShapeChartOptions,
  TreemapChartOptions,
} from "./types";

const theme = createTheme();
const measure = (text: string) => text.length * 6;
const W = 400;
const H = 300;

const layout = (
  options: ShapeChartOptions,
  extra: { hidden?: Set<number>; enter?: number; width?: number } = {},
) =>
  layoutShapeScene({
    options,
    theme,
    width: extra.width ?? W,
    height: H,
    measure,
    hidden: extra.hidden,
    enter: extra.enter,
  });

const sectors = (scene: ShapeScene) =>
  scene.nodes.filter(
    (n): n is SectorNode => n.kind === "sector" && n.hit !== undefined,
  );
const texts = (scene: ShapeScene) =>
  scene.nodes.filter((n): n is TextNode => n.kind === "text");

/** Leader lines of the outside pie labels */
const leaderLines = (scene: ShapeScene) =>
  scene.nodes
    .filter((n): n is LineNode => n.kind === "line" && n.hit !== undefined)
    .map((n) => {
      const p = n.points;
      let length = 0;
      for (let k = 2; k < p.length; k += 2)
        length += Math.hypot(p[k] - p[k - 2], p[k + 1] - p[k - 1]);
      return {
        hit: n.hit ?? -1,
        points: p,
        start: [p[0], p[1]] as const,
        end: [p[p.length - 2], p[p.length - 1]] as const,
        length,
      };
    });

/** Number of crossings between the leader lines of different labels */
const crossings = (scene: ShapeScene) => {
  const segs: { hit: number; s: number[] }[] = [];
  for (const l of leaderLines(scene))
    for (let k = 2; k < l.points.length; k += 2)
      segs.push({ hit: l.hit, s: l.points.slice(k - 2, k + 2) });
  const side = (s: number[], x: number, y: number) =>
    (s[2] - s[0]) * (y - s[1]) - (s[3] - s[1]) * (x - s[0]);
  const cross = (a: number[], b: number[]) =>
    side(a, b[0], b[1]) * side(a, b[2], b[3]) < 0 &&
    side(b, a[0], a[1]) * side(b, a[2], a[3]) < 0;
  let count = 0;
  for (let i = 0; i < segs.length; i++)
    for (let j = i + 1; j < segs.length; j++)
      if (segs[i].hit !== segs[j].hit && cross(segs[i].s, segs[j].s)) count++;
  return count;
};

/** No NaN / Infinity anywhere in the scene */
const finiteScene = (scene: ShapeScene) =>
  JSON.stringify(scene, (_k, v: unknown) =>
    typeof v === "number" && !Number.isFinite(v) ? "BAD" : v,
  ).includes('"BAD"') === false;

const pie = (extra: Partial<PieChartOptions> = {}): PieChartOptions => ({
  type: "pie",
  data: [
    { name: "Alpha", value: 50 },
    { name: "Beta", value: 30 },
    { name: "Gamma", value: 20 },
  ],
  ...extra,
});

describe("pie layout", () => {
  it("sweeps the whole circle from 12 o'clock in data order", () => {
    const scene = layout(pie());
    const s = sectors(scene);
    expect(s).toHaveLength(3);
    expect(s[0].a0).toBeCloseTo(-Math.PI / 2);
    const total = s.reduce((acc, n) => acc + (n.a1 - n.a0), 0);
    expect(total).toBeCloseTo(TAU);
    expect(s[0].a1 - s[0].a0).toBeCloseTo(TAU * 0.5);
    expect(s[2].a1 - s[2].a0).toBeCloseTo(TAU * 0.2);
    expect(scene.items.map((it) => it.percent)).toEqual([0.5, 0.3, 0.2]);
    expect(s.every((n) => n.r0 === 0 && n.pad === 1)).toBe(true);
    expect(finiteScene(scene)).toBe(true);
  });

  it("honours startAngle", () => {
    const s = sectors(layout(pie({ startAngle: 90 })));
    expect(s[0].a0).toBeCloseTo(0);
  });

  it("cuts a donut hole and draws the center texts", () => {
    const scene = layout(
      pie({ innerRadius: 0.6, centerValue: "100", centerLabel: "Total" }),
    );
    for (const n of sectors(scene)) {
      expect(n.r0).toBeCloseTo(n.r1 * 0.6);
      expect(n.pad).toBe(2);
      expect(n.corner).toBe(4);
    }
    const t = texts(scene).map((n) => n.text);
    expect(t).toContain("100");
    expect(t).toContain("Total");
  });

  it("encodes values in the radius of a rose", () => {
    const s = sectors(layout(pie({ rose: true, labels: "none" })));
    const spans = s.map((n) => n.a1 - n.a0);
    for (const span of spans) expect(span).toBeCloseTo(TAU / 3);
    expect(s[1].r1 / s[0].r1).toBeCloseTo(30 / 50);
    expect(s[2].r1 / s[0].r1).toBeCloseTo(20 / 50);
  });

  it("drops hidden slices from the angles and the shares", () => {
    const scene = layout(pie(), { hidden: new Set([0]) });
    const s = sectors(scene);
    expect(s.map((n) => n.hit)).toEqual([1, 2]);
    expect(s[0].a1 - s[0].a0).toBeCloseTo(TAU * 0.6);
    expect(scene.items.map((it) => it.index)).toEqual([1, 2]);
    expect(scene.items[0].percent).toBeCloseTo(0.6);
    const legend = shapeLegend(pie(), theme, new Set([0]));
    expect(legend?.map((e) => e.hidden)).toEqual([true, false, false]);
  });

  it("draws a placeholder for empty or all-zero data", () => {
    for (const data of [
      [],
      [{ name: "a", value: 0 }],
      [{ name: "a", value: NaN }],
    ]) {
      const scene = layout(pie({ data }));
      expect(scene.empty).toBe(true);
      expect(scene.items).toHaveLength(0);
      expect(texts(scene)[0].text).toBe("No data");
      expect(finiteScene(scene)).toBe(true);
    }
  });

  it("spreads the outside labels without overlaps", () => {
    const data = Array.from({ length: 12 }, (_, i) => ({
      name: `Item ${i}`,
      value: i < 2 ? 40 : 1,
    }));
    const scene = layout({ type: "pie", data, labelContent: ["name"] });
    const labels = texts(scene);
    expect(labels.length).toBeGreaterThan(4);
    for (const right of [true, false]) {
      const ys = labels
        .filter((n) => n.x >= W / 2 === right)
        .map((n) => n.y)
        .sort((a, b) => a - b);
      for (let i = 1; i < ys.length; i++)
        expect(ys[i] - ys[i - 1]).toBeGreaterThanOrEqual(18 - 1e-6);
      for (const y of ys) {
        expect(y).toBeGreaterThanOrEqual(8);
        expect(y).toBeLessThanOrEqual(H - 8);
      }
    }
  });

  it("keeps the labels around a dominant slice in angle order, uncrossed", () => {
    const data = [
      { name: "Big", value: 62 },
      ...Array.from({ length: 7 }, (_, i) => ({
        name: `Small ${i}`,
        value: 6 - i * 0.5,
      })),
    ];
    const scene = layout({ type: "pie", data }, { width: 520 });
    const lines = leaderLines(scene);
    expect(lines).toHaveLength(8);
    expect(crossings(scene)).toBe(0);
    // on each side the labels follow the angles of their slices
    const s = sectors(scene);
    const angle = (hit: number) => {
      const n = s.find((x) => x.hit === hit)!;
      return (n.a0 + n.a1) / 2;
    };
    for (const side of [1, -1]) {
      const own = lines.filter((l) => Math.sign(l.end[0] - 260) === side);
      const byAngle = own
        .slice()
        .sort((a, b) => side * (angle(a.hit) - angle(b.hit)))
        .map((l) => l.hit);
      const byLabel = own
        .slice()
        .sort((a, b) => a.end[1] - b.end[1])
        .map((l) => l.hit);
      expect(byLabel).toEqual(byAngle);
    }
    // the labels spread over the height instead of piling up
    const ys = lines.map((l) => l.end[1]);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(H * 0.5);
  });

  it("anchors rose labels at their own slice", () => {
    const data = Array.from({ length: 12 }, (_, i) => ({
      name: `M${i}`,
      value: [78, 61, 72, 58, 49, 37, 28, 34, 52, 86, 97, 92][i],
    }));
    const scene = layout(
      {
        type: "pie",
        rose: true,
        innerRadius: 0.18,
        data,
        labelContent: ["name"],
      },
      { width: 600 },
    );
    const s = sectors(scene);
    const lines = leaderLines(scene);
    expect(lines).toHaveLength(12);
    const rmax = Math.max(...s.map((n) => n.r1));
    for (const l of lines) {
      const sector = s.find((n) => n.hit === l.hit)!;
      // starts right outside its slice
      const d = Math.hypot(l.start[0] - sector.cx, l.start[1] - sector.cy);
      expect(d).toBeCloseTo(sector.r1 + 2, 5);
      // short leaders: no column at the largest radius for every label
      expect(l.length).toBeLessThan(rmax);
    }
    expect(crossings(scene)).toBe(0);
    // narrow: short labels still fit outside
    const narrow = layout(
      {
        type: "pie",
        rose: true,
        innerRadius: 0.18,
        data,
        labelContent: ["name"],
      },
      { width: 330 },
    );
    expect(leaderLines(narrow).length).toBeGreaterThan(6);
  });

  it("orders the label parts like labelContent", () => {
    const scene = layout(pie({ labelContent: ["value", "name", "percent"] }));
    const alpha = texts(scene)
      .filter((n) => n.hit === 0)
      .sort((a, b) => a.x - b.x)
      .map((n) => n.text);
    expect(alpha).toEqual(["50", "Alpha", "50.0%"]);
    const joined = texts(
      layout(pie({ labelContent: ["name", "percent", "value"] })),
    )
      .filter((n) => n.hit === 1)
      .sort((a, b) => a.x - b.x)
      .map((n) => n.text);
    expect(joined).toEqual(["Beta", "30.0% · 30"]);
    const inside = texts(
      layout(pie({ labels: "inside", labelContent: ["value", "percent"] }), {
        width: 600,
      }),
    ).filter((n) => n.hit === 0);
    expect(inside.map((n) => n.text).join(" ")).toBe("50 · 50.0%");
  });

  it("shows full inside labels when they fit, fewer parts otherwise, padded", () => {
    const data = [
      { name: "Email", value: 1240 },
      { name: "Live chat", value: 980 },
      { name: "Web form", value: 610 },
      { name: "Phone", value: 430 },
      { name: "Social", value: 150 },
      { name: "Community", value: 90 },
    ];
    for (const innerRadius of [0, 0.5]) {
      const scene = layout(
        {
          type: "pie",
          data,
          innerRadius,
          labels: "inside",
          labelContent: ["name", "value", "percent"],
        },
        { width: 600 },
      );
      const s = sectors(scene);
      const labelled = texts(scene).filter((n) => n.hit !== undefined);
      // the large slice shows every part
      const email = labelled.filter((n) => n.hit === 0).map((n) => n.text);
      expect(email.join(" ")).toContain("Email");
      expect(email.join(" ")).toContain("1.24k");
      expect(email.join(" ")).toContain("35.4%");
      // every label box stays 4px inside its slice
      for (const t of labelled) {
        const sector = s.find((n) => n.hit === t.hit)!;
        const w = measure(t.text);
        for (const fx of [-0.5, 0, 0.5])
          for (const fy of [-0.5, 0.5]) {
            const inside = pointInSector(t.x + w * fx, t.y + 15 * fy, {
              ...sector,
              r0: sector.r0 > 0 ? sector.r0 + 3.9 : 0,
              r1: sector.r1 - 3.9,
            });
            expect(inside).toBe(true);
          }
      }
      // the small slices fall back to fewer parts (or none) instead of overflowing
      const community = labelled.filter((n) => n.hit === 5);
      expect(community.every((n) => !n.text.includes("Community"))).toBe(true);
    }
  });

  it("picks a readable color for inside labels", () => {
    const scene = layout({
      type: "pie",
      labels: "inside",
      labelContent: ["percent"],
      data: [
        { name: "Dark", value: 1, color: "#111111" },
        { name: "Light", value: 1, color: "#f5f5f5" },
      ],
    });
    const [dark, light] = texts(scene);
    expect(dark.text).toBe("50.0%");
    expect(dark.color).toMatch(/255, 255, 255/);
    expect(light.color).toMatch(/15, 23, 42/);
  });

  it("sweeps in during the entry animation", () => {
    const s = sectors(layout(pie(), { enter: 0.5 }));
    const total = s.reduce((acc, n) => acc + (n.a1 - n.a0), 0);
    expect(total).toBeCloseTo(Math.PI);
  });
});

const radar = (extra: Partial<RadarChartOptions> = {}): RadarChartOptions => ({
  type: "radar",
  indicators: [
    { name: "Speed", max: 100 },
    { name: "Power", max: 100 },
    { name: "Range", min: 50, max: 150 },
    { name: "Cost", max: 10 },
  ],
  series: [
    { name: "A", values: [50, 100, 100, 20] },
    { name: "B", values: [0, 25, 50, 5] },
  ],
  ...extra,
});

describe("radar layout", () => {
  it("places the vertices by value between min and max", () => {
    const scene = layout(radar());
    const r = scene.radar!;
    const a = r.series[0].points;
    // indicator 0 points up: half of the radius
    expect(a[0]).toBeCloseTo(r.cx);
    expect(a[1]).toBeCloseTo(r.cy - r.radius / 2);
    // indicator 1 points right: full radius
    expect(a[2]).toBeCloseTo(r.cx + r.radius);
    expect(a[3]).toBeCloseTo(r.cy);
    // indicator 2 (min 50, max 150): 100 is the middle
    expect(a[5]).toBeCloseTo(r.cy + r.radius / 2);
    // above max: clamped to the rim
    expect(a[6]).toBeCloseTo(r.cx - r.radius);
    // min value sits in the center
    const b = r.series[1].points;
    expect(b[0]).toBeCloseTo(r.cx);
    expect(b[1]).toBeCloseTo(r.cy);
    expect(b[5]).toBeCloseTo(r.cy);
  });

  it("uses the largest value when max is omitted and hides series", () => {
    const scene = layout(
      radar({ indicators: [{ name: "a" }, { name: "b" }, { name: "c" }] }),
      { hidden: new Set([0]) },
    );
    const r = scene.radar!;
    expect(r.series.map((s) => s.index)).toEqual([1]);
    expect(scene.items.map((it) => it.index)).toEqual([1]);
    expect(shapeLegend(radar(), theme)).toHaveLength(2);
    expect(
      shapeLegend(radar({ series: [{ values: [1, 2, 3, 4] }] }), theme),
    ).toBeNull();
  });

  it("grows from the center during the entry", () => {
    const r = layout(radar(), { enter: 0.5 }).radar!;
    expect(r.series[0].points[2]).toBeCloseTo(r.cx + r.radius / 2);
  });

  it("keeps the tooltip off the hovered vertex and the indicator labels", () => {
    const names = [
      "Camera",
      "Battery",
      "Display",
      "Performance",
      "Price",
      "Design",
    ];
    const scene = layoutShapeScene({
      options: {
        type: "radar",
        indicators: names.map((name) => ({ name, max: 10 })),
        series: [{ name: "Phone", values: [9, 7, 9.5, 8, 5, 9] }],
      },
      theme,
      width: 520,
      height: 320,
      measure,
    });
    const labels = scene.radar?.labels ?? [];
    expect(labels).toHaveLength(6);
    const item = scene.items[0];
    for (let k = 0; k < names.length; k++) {
      const v = item.indicators![k];
      const box = {
        ...placeShapeTooltip(
          scene,
          { index: 0, indicator: k },
          v,
          150,
          80,
          520,
          320,
        ),
        width: 150,
        height: 80,
      };
      const covers = (x: number, y: number) =>
        x > box.x &&
        x < box.x + box.width &&
        y > box.y &&
        y < box.y + box.height;
      expect(covers(v.x, v.y)).toBe(false);
      for (const l of labels)
        expect(
          covers(l.x + l.width / 2, l.y + l.height / 2),
          `${names[k]} tooltip covers a label`,
        ).toBe(false);
      expect(box.x).toBeGreaterThanOrEqual(6);
      expect(box.y + box.height).toBeLessThanOrEqual(320 - 6);
    }
  });

  it("bolds the hovered indicator row of the tooltip", () => {
    const scene = layout(radar());
    const content = tooltipContent(scene, { index: 0, indicator: 1 });
    expect(content?.title).toBe("A");
    expect(content?.rows[1]).toMatchObject({ name: "Power", strong: true });
    expect(content?.rows[0].strong).toBeUndefined();
  });
});

const gauge = (extra: Partial<GaugeChartOptions> = {}): GaugeChartOptions => ({
  type: "gauge",
  value: 50,
  ...extra,
});

const valueArc = (scene: ShapeScene) =>
  scene.nodes.find((n): n is ArcNode => n.kind === "arc" && n.hit === 0);

describe("gauge layout", () => {
  it("clamps the value arc to the range", () => {
    const half = valueArc(layout(gauge()))!;
    const sweep = (240 * Math.PI) / 180;
    expect(half.a1 - half.a0).toBeCloseTo(sweep / 2);
    const over = layout(gauge({ value: 150 }));
    expect(valueArc(over)!.a1 - valueArc(over)!.a0).toBeCloseTo(sweep);
    expect(over.items[0].percent).toBe(1);
    expect(over.items[0].value).toBe(150);
    const under = layout(gauge({ value: -10 }));
    expect(valueArc(under)).toBeUndefined();
    expect(under.items[0].percent).toBe(0);
    expect(finiteScene(layout(gauge({ value: NaN, min: 5, max: 5 })))).toBe(
      true,
    );
  });

  it("picks the band of the value", () => {
    const bands = [
      { to: 30, color: "#ff0000" },
      { to: 70, color: "#00ff00" },
      { to: 100, color: "#0000ff" },
    ];
    expect(gaugeBandIndex(bands, 10)).toBe(0);
    expect(gaugeBandIndex(bands, 30)).toBe(0);
    expect(gaugeBandIndex(bands, 50)).toBe(1);
    expect(gaugeBandIndex(bands, 120)).toBe(2);
    expect(gaugeBandIndex(undefined, 50)).toBe(-1);
    expect(valueArc(layout(gauge({ bands })))!.color).toBe(
      "rgba(0, 255, 0, 1)",
    );
    expect(valueArc(layout(gauge({ value: 90, bands })))!.color).toBe(
      "rgba(0, 0, 255, 1)",
    );
  });

  it("shows the value, the label and the tick labels", () => {
    const t = texts(layout(gauge({ value: 42, label: "CPU" }))).map(
      (n) => n.text,
    );
    expect(t).toEqual(expect.arrayContaining(["42", "CPU", "0", "100"]));
  });
});

const funnel = (
  extra: Partial<FunnelChartOptions> = {},
): FunnelChartOptions => ({
  type: "funnel",
  data: [
    { name: "Visit", value: 1000 },
    { name: "Cart", value: 500 },
    { name: "Order", value: 200 },
  ],
  ...extra,
});

const stages = (scene: ShapeScene) =>
  scene.nodes.filter(
    (n): n is PolygonNode => n.kind === "polygon" && n.hit !== undefined,
  );
const topWidth = (p: PolygonNode) => p.points[2] - p.points[0];
const bottomWidth = (p: PolygonNode) => p.points[4] - p.points[6];

describe("funnel layout", () => {
  it("narrows proportionally to the values", () => {
    const scene = layout(funnel());
    const s = stages(scene);
    expect(s).toHaveLength(3);
    expect(topWidth(s[1]) / topWidth(s[0])).toBeCloseTo(0.5);
    expect(topWidth(s[2]) / topWidth(s[0])).toBeCloseTo(0.2);
    // each trapezoid ends at the width of the next stage
    expect(bottomWidth(s[0])).toBeCloseTo(topWidth(s[1]));
    expect(bottomWidth(s[1])).toBeCloseTo(topWidth(s[2]));
    // centered
    expect(s[1].points[0] + s[1].points[2]).toBeCloseTo(
      s[0].points[0] + s[0].points[2],
    );
    const t = texts(scene).map((n) => n.text);
    expect(t).toContain("↓ 50.0%");
    expect(t).toContain("↓ 40.0%");
    expect(scene.items[2].rows).toContainEqual({
      name: "Conversion",
      value: "40.0%",
    });
    expect(scene.items[2].percent).toBeCloseTo(0.2);
  });

  it("formats the shares with percentFormat", () => {
    const scene = layout(
      funnel({ percentFormat: (p) => `${Math.round(p * 100)} pct` }),
    );
    expect(texts(scene).map((n) => n.text)).toContain("↓ 40 pct");
    expect(scene.items[1].rows).toContainEqual({
      name: "Of first stage",
      value: "50 pct",
    });
    const pieScene = layout(
      pie({ percentFormat: (p) => p.toFixed(2), labelContent: ["percent"] }),
    );
    expect(texts(pieScene).map((n) => n.text)).toContain("0.50");
  });

  it("puts the labels inside when the middle of the stage fits them", () => {
    const scene = layout(
      funnel({
        data: [
          { name: "Visited pricing page", value: 24000 },
          { name: "Started sign-up", value: 9600 },
          { name: "Verified email", value: 6850 },
          { name: "Created project", value: 4100 },
          { name: "Upgraded", value: 640 },
        ],
      }),
      { width: 700 },
    );
    const s = stages(scene);
    const t = texts(scene);
    const first = t.find((n) => n.text === "Visited pricing page")!;
    // inside the first stage, nothing truncated
    expect(first.x).toBeGreaterThan(s[0].points[0]);
    expect(first.x + measure(first.text)).toBeLessThan(s[0].points[2]);
    expect(t.some((n) => n.text.endsWith("…"))).toBe(false);
  });

  it("keeps the values of the outside labels and ellipsizes the names", () => {
    const scene = layout(
      funnel({
        data: [
          { name: "Visited the pricing page", value: 24000 },
          { name: "Started the sign-up flow", value: 9600 },
          { name: "Invited a teammate", value: 1720 },
          { name: "Upgraded to a paid plan", value: 640 },
        ],
      }),
      { width: 240 },
    );
    const t = texts(scene).map((n) => n.text);
    for (const v of ["24k", "9.6k", "1.72k", "640"]) expect(t).toContain(v);
    // nothing leaves the drawing
    for (const n of texts(scene)) {
      const w = measure(n.text);
      const x0 =
        n.align === "left" ? n.x : n.align === "right" ? n.x - w : n.x - w / 2;
      expect(x0).toBeGreaterThanOrEqual(8 - 1e-6);
      expect(x0 + w).toBeLessThanOrEqual(240 - 8 + 1e-6);
    }
  });

  it("sorts the stages and hides toggled ones", () => {
    const data = [
      { name: "a", value: 10 },
      { name: "b", value: 30 },
      { name: "c", value: 20 },
    ];
    expect(
      layout(funnel({ data, sort: "descending" })).items.map((i) => i.name),
    ).toEqual(["b", "c", "a"]);
    expect(
      layout(funnel({ data, sort: "ascending" })).items.map((i) => i.name),
    ).toEqual(["a", "c", "b"]);
    const hidden = layout(funnel({ data }), { hidden: new Set([1]) });
    expect(hidden.items.map((i) => i.index)).toEqual([0, 2]);
    expect(
      texts(layout(funnel({ conversion: false }))).some((n) =>
        n.text.startsWith("↓"),
      ),
    ).toBe(false);
  });

  it("draws bars of the values with the bar shape", () => {
    const rects = layout(funnel({ shape: "bar" })).nodes.filter(
      (n): n is RectNode => n.kind === "rect" && n.hit !== undefined,
    );
    expect(rects).toHaveLength(3);
    expect(rects[1].width / rects[0].width).toBeCloseTo(0.5);
  });
});

describe("squarify", () => {
  const rect = { x: 10, y: 20, width: 300, height: 200 };
  const values = [60, 30, 25, 20, 12, 8, 5, 3, 2, 1];
  const rects = squarify(values, rect);
  const total = values.reduce((a, b) => a + b, 0);

  it("gives areas proportional to the values", () => {
    rects.forEach((r, i) => {
      expect(r.width * r.height).toBeCloseTo(
        (values[i] / total) * rect.width * rect.height,
        6,
      );
    });
  });

  it("stays inside the bounds without overlaps", () => {
    const eps = 1e-6;
    for (const r of rects) {
      expect(r.x).toBeGreaterThanOrEqual(rect.x - eps);
      expect(r.y).toBeGreaterThanOrEqual(rect.y - eps);
      expect(r.x + r.width).toBeLessThanOrEqual(rect.x + rect.width + eps);
      expect(r.y + r.height).toBeLessThanOrEqual(rect.y + rect.height + eps);
    }
    for (let i = 0; i < rects.length; i++)
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i];
        const b = rects[j];
        const ox = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
        const oy =
          Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
        expect(ox <= eps || oy <= eps).toBe(true);
      }
  });

  it("keeps the aspect ratios reasonable", () => {
    for (const r of rects.slice(0, 4))
      expect(Math.max(r.width / r.height, r.height / r.width)).toBeLessThan(4);
  });

  it("handles zeros and empty rectangles", () => {
    const out = squarify([0, 5, 0], rect);
    expect(out[1].width * out[1].height).toBeCloseTo(300 * 200);
    expect(out[0].width * out[0].height).toBe(0);
    expect(squarify([1, 2], { x: 0, y: 0, width: 0, height: 10 })).toHaveLength(
      2,
    );
  });
});

const treemap: TreemapChartOptions = {
  type: "treemap",
  data: [
    {
      name: "Fruits",
      children: [
        { name: "Apple", value: 40 },
        { name: "Pear", value: 20 },
      ],
    },
    { name: "Bread", value: 30 },
    { name: "Milk", value: 10, color: "#123456" },
  ],
};

describe("treemap layout", () => {
  it("indexes the leaves in data order with their paths", () => {
    const scene = layout(treemap);
    expect(scene.items.map((i) => [i.index, i.name])).toEqual([
      [0, "Apple"],
      [1, "Pear"],
      [2, "Bread"],
      [3, "Milk"],
    ]);
    expect(scene.items[0].path).toEqual(["Fruits", "Apple"]);
    expect(scene.items[0].percent).toBeCloseTo(0.4);
    expect(scene.items[3].color).toBe("rgba(18, 52, 86, 1)");
    expect(tooltipContent(scene, { index: 0 })?.title).toBe("Fruits / Apple");
  });

  it("keeps the leaves inside the area, apart, with a header", () => {
    const scene = layout(treemap);
    const leaves = scene.nodes.filter(
      (n): n is RectNode => n.kind === "rect" && n.hit !== undefined,
    );
    expect(leaves).toHaveLength(4);
    for (const r of leaves) {
      expect(r.x).toBeGreaterThanOrEqual(8);
      expect(r.y).toBeGreaterThanOrEqual(8);
      expect(r.x + r.width).toBeLessThanOrEqual(W - 8 + 1e-6);
      expect(r.y + r.height).toBeLessThanOrEqual(H - 8 + 1e-6);
    }
    for (let i = 0; i < leaves.length; i++)
      for (let j = i + 1; j < leaves.length; j++) {
        const a = leaves[i];
        const b = leaves[j];
        const ox = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
        const oy =
          Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
        expect(ox <= 0 || oy <= 0).toBe(true);
      }
    expect(texts(scene).map((t) => t.text)).toContain("Fruits");
    // children of a parent get lighter shades of its color
    expect(leaves[0].fill).not.toBe(leaves[1].fill);
  });

  it("hides top-level nodes", () => {
    const scene = layout(treemap, { hidden: new Set([0]) });
    expect(scene.items.map((i) => i.name)).toEqual(["Bread", "Milk"]);
    expect(layout({ type: "treemap", data: [] }).empty).toBe(true);
  });

  it("draws its labels with at least 4.5:1 contrast, dark themes included", () => {
    const pastel = ["#93c5fd", "#86efac", "#fcd34d", "#f9a8d4", "#c4b5fd"];
    const data = pastel.map((color, i) => ({
      name: `Group ${i}`,
      color,
      children: [
        { name: `Big ${i}`, value: 30 },
        { name: `Mid ${i}`, value: 20 },
        { name: `Low ${i}`, value: 12 },
      ],
    }));
    const dark = createTheme({
      variables: {
        "--background-color": "#0b1120",
        "--text-color": "#e5e7eb",
      },
    });
    for (const t of [theme, dark]) {
      const scene = layoutShapeScene({
        options: { type: "treemap", data },
        theme: t,
        width: 900,
        height: 600,
        measure,
      });
      const leaves = scene.nodes.filter(
        (n): n is RectNode => n.kind === "rect" && n.hit !== undefined,
      );
      const labels = texts(scene).filter((n) => n.hit !== undefined);
      expect(labels.length).toBeGreaterThan(10);
      for (const label of labels) {
        const leaf = leaves.find((r) => r.hit === label.hit)!;
        const fill = parseColor(leaf.fill)!;
        const ink = parseColor(label.color)!;
        expect(label.alpha ?? 1).toBe(1);
        expect(contrastRatio(ink, fill)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("picks the ink of the highest WCAG contrast", () => {
    for (const hex of ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b", "#8b5cf6"]) {
      const fill = parseColor(hex)!;
      const chosen = parseColor(textOn(fill))!;
      const other = parseColor(
        /255, 255, 255/.test(textOn(fill))
          ? "rgba(15, 23, 42, 0.88)"
          : "rgba(255, 255, 255, 0.96)",
      )!;
      expect(contrastRatio(chosen, fill)).toBeGreaterThanOrEqual(
        contrastRatio(other, fill),
      );
    }
  });
});

describe("animation runtime", () => {
  const frameInput = { theme, width: W, height: H, measure };
  const sweep = (scene: ShapeScene) =>
    sectors(scene).reduce((acc, n) => acc + (n.a1 - n.a0), 0);

  it("plays the entry then interpolates updates", () => {
    const runtime = createShapeRuntime(pie({ labels: "none" }), () => false);
    let f = runtime.frame(1000, frameInput);
    expect(f.animating).toBe(true);
    expect(sweep(f.scene)).toBeCloseTo(0);
    f = runtime.frame(1300, frameInput);
    expect(sweep(f.scene)).toBeGreaterThan(0);
    expect(sweep(f.scene)).toBeLessThan(TAU);
    f = runtime.frame(1600, frameInput);
    expect(f.animating).toBe(false);
    expect(sweep(f.scene)).toBeCloseTo(TAU);

    runtime.setOptions(
      pie({
        labels: "none",
        data: [
          { name: "Alpha", value: 20 },
          { name: "Beta", value: 30 },
          { name: "Gamma", value: 50 },
        ],
      }),
    );
    f = runtime.frame(2000, frameInput);
    expect(f.animating).toBe(true);
    expect(sectors(f.scene)[0].a1 - sectors(f.scene)[0].a0).toBeCloseTo(
      TAU * 0.5,
    );
    f = runtime.frame(2400, frameInput);
    expect(f.animating).toBe(false);
    expect(sectors(f.scene)[0].a1 - sectors(f.scene)[0].a0).toBeCloseTo(
      TAU * 0.2,
    );
  });

  it("does not animate the same values again", () => {
    const runtime = createShapeRuntime(pie({ animation: false }));
    expect(runtime.frame(0, frameInput).animating).toBe(false);
    runtime.setOptions(pie({ animation: false }));
    expect(runtime.frame(10, frameInput).animating).toBe(false);
    const animated = createShapeRuntime(pie(), () => false);
    animated.frame(0, frameInput);
    animated.frame(700, frameInput);
    animated.setOptions(pie());
    expect(animated.frame(800, frameInput).animating).toBe(false);
  });

  it("skips the animations when the user prefers reduced motion", () => {
    const runtime = createShapeRuntime(pie(), () => true);
    const f = runtime.frame(0, frameInput);
    expect(f.animating).toBe(false);
    expect(sweep(f.scene)).toBeCloseTo(TAU);
  });

  it("toggles entries and resets them on type changes", () => {
    const runtime = createShapeRuntime(pie({ animation: false }));
    expect(runtime.toggle(1)).toEqual({
      index: 1,
      hidden: true,
      hiddenIndexes: [1],
    });
    expect(runtime.toggle(9)).toBeNull();
    expect([...runtime.hidden]).toEqual([1]);
    expect(runtime.hiddenIndexes()).toEqual([1]);
    runtime.setOptions(gauge());
    expect(runtime.hidden.size).toBe(0);
  });

  it("follows the controlled hidden option", () => {
    const runtime = createShapeRuntime(pie({ animation: false, hidden: [2] }));
    expect(runtime.hiddenIndexes()).toEqual([2]);
    // toggling only proposes the next state
    expect(runtime.toggle(0)).toEqual({
      index: 0,
      hidden: true,
      hiddenIndexes: [0, 2],
    });
    expect(runtime.hiddenIndexes()).toEqual([2]);
    runtime.setOptions(pie({ animation: false, hidden: [0, 2, 7] }));
    expect(runtime.hiddenIndexes()).toEqual([0, 2]);
    expect(sectors(runtime.frame(0, frameInput).scene)).toHaveLength(1);
  });
});

describe("hit testing", () => {
  it("tests annular sectors with gaps", () => {
    const s = { cx: 0, cy: 0, r0: 10, r1: 50, a0: 0, a1: Math.PI / 2, pad: 4 };
    expect(pointInSector(20, 20, s)).toBe(true);
    expect(pointInSector(3, 3, s)).toBe(false); // hole
    expect(pointInSector(60, 1, s)).toBe(false); // outside
    expect(pointInSector(30, 1, s)).toBe(false); // in the gap
    expect(pointInSector(30, 3, s)).toBe(true);
    expect(pointInSector(-20, 20, s)).toBe(false);
    // angles wrap around
    const wrap = { cx: 0, cy: 0, r0: 0, r1: 50, a0: -Math.PI / 2, a1: 0 };
    expect(pointInSector(20, -20, wrap)).toBe(true);
    expect(pointInSector(-20, -20, wrap)).toBe(false);
  });

  it("tests polygons", () => {
    const square = [0, 0, 10, 0, 10, 10, 0, 10];
    expect(pointInPolygon(5, 5, square)).toBe(true);
    expect(pointInPolygon(15, 5, square)).toBe(false);
  });

  it("finds pie slices, keeps the popped slice and ignores the hole", () => {
    const scene = layout(pie({ labels: "none", innerRadius: 0.5 }));
    const s = sectors(scene)[0];
    const m = (s.a0 + s.a1) / 2;
    const r = (s.r0 + s.r1) / 2;
    const x = s.cx + r * Math.cos(m);
    const y = s.cy + r * Math.sin(m);
    expect(hitTestShapes(scene, x, y)).toEqual({ index: 0 });
    expect(hitTestShapes(scene, s.cx, s.cy)).toBeNull();
    const out = s.r1 + 3;
    const ox = s.cx + out * Math.cos(m);
    const oy = s.cy + out * Math.sin(m);
    expect(hitTestShapes(scene, ox, oy)).toBeNull();
    expect(hitTestShapes(scene, ox, oy, { index: 0 })).toEqual({ index: 0 });
  });

  it("finds radar vertices, then polygons with the nearest indicator", () => {
    const scene = layout(radar());
    const r = scene.radar!;
    const [x, y] = r.series[0].points;
    expect(hitTestShapes(scene, x + 2, y)).toEqual({ index: 0, indicator: 0 });
    // inside A only, toward the right (indicator 1)
    expect(hitTestShapes(scene, r.cx + r.radius * 0.8, r.cy + 2)).toEqual({
      index: 0,
      indicator: 1,
    });
    expect(hitTestShapes(scene, 0, 0)).toBeNull();
  });

  it("finds funnel stages and treemap leaves", () => {
    const f = layout(funnel());
    const item = f.items[1];
    expect(hitTestShapes(f, item.x, item.y)).toEqual({ index: 1 });
    const t = layout(treemap);
    for (const leaf of t.items)
      expect(hitTestShapes(t, leaf.x, leaf.y)).toEqual({ index: leaf.index });
    const g = layout(gauge());
    expect(hitTestShapes(g, g.items[0].x, g.items[0].y)).toEqual({ index: 0 });
  });

  it("steps through the items with the keyboard", () => {
    const scene = layout(pie());
    expect(stepHover(scene, null, "next")).toEqual({ index: 0 });
    expect(stepHover(scene, null, "prev")).toEqual({ index: 2 });
    expect(stepHover(scene, { index: 2 }, "next")).toEqual({ index: 0 });
    expect(stepHover(scene, { index: 0 }, "up")).toEqual({ index: 2 });
    const r = layout(radar());
    expect(stepHover(r, { index: 0, indicator: 3 }, "next")).toEqual({
      index: 0,
      indicator: 0,
    });
    expect(stepHover(r, { index: 0, indicator: 2 }, "down")).toEqual({
      index: 1,
      indicator: 2,
    });
  });
});

describe("gauge needle", () => {
  /** Distance from a point to the segment a-b */
  const toSegment = (
    px: number,
    py: number,
    ax: number,
    ay: number,
    bx: number,
    by: number,
  ) => {
    const dx = bx - ax;
    const dy = by - ay;
    const t = clamp01(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy));
    return Math.hypot(px - ax - t * dx, py - ay - t * dy);
  };
  const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

  it("keeps the value and the label clear of the needle and the hub", () => {
    for (const sweep of [180, 240, 270, 300]) {
      for (const [width, height] of [
        [160, 140],
        [300, 240],
        [600, 300],
      ] as const) {
        for (const value of [0, 3, 50, 97, 100]) {
          const scene = layoutShapeScene({
            options: {
              type: "gauge",
              value,
              sweep,
              needle: true,
              label: "Availability",
              format: (v) => `${v.toFixed(1)} km/h`,
            },
            theme,
            width,
            height,
            measure,
          });
          const needle = scene.nodes.find(
            (n): n is PolygonNode => n.kind === "polygon",
          );
          expect(needle).toBeDefined();
          const p = needle?.points ?? [];
          // axis of the needle: middle of the base to the tip
          const ax = ((p[0] ?? 0) + (p[6] ?? 0)) / 2;
          const ay = ((p[1] ?? 0) + (p[7] ?? 0)) / 2;
          const bx = ((p[2] ?? 0) + (p[4] ?? 0)) / 2;
          const by = ((p[3] ?? 0) + (p[5] ?? 0)) / 2;
          for (const t of texts(scene).filter(
            (n) => n.align === "center" && n.baseline === "middle",
          )) {
            const size = Number(/(\d+(?:\.\d+)?)px/.exec(t.font)?.[1] ?? 12);
            const w = measure(t.text) / 2;
            const h = size / 2;
            // corners and edge middles of the text box
            for (const [x, y] of [
              [t.x - w, t.y - h],
              [t.x + w, t.y - h],
              [t.x, t.y - h],
              [t.x - w, t.y + h],
              [t.x + w, t.y + h],
            ] as const)
              expect(toSegment(x, y, ax, ay, bx, by)).toBeGreaterThan(4);
            expect(t.y - h).toBeGreaterThan(ay + 7);
            // inside the drawing
            expect(t.y + h).toBeLessThanOrEqual(height + 1);
          }
        }
      }
    }
  });
});
