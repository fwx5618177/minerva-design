import {
  createCanvasShapeChart,
  drawShapeScene,
  type ShapeChartOptions,
} from "@minerva/charts/canvas";
import { describe, expect, it } from "vitest";
import {
  dashPolyline,
  framePrims,
  regionViews,
  triangulate,
  convexPieces,
  type Prim,
  type Pt,
} from "./geometry";
import { createRecorder, parseColor, type DrawOp } from "./recorder";

/** Whether the views paint the point (views evaluated like the native layout does) */
function covers(prims: readonly Prim[], p: Pt): boolean {
  for (const prim of prims) {
    if (prim.t === "group") {
      if (covers(prim.children, p)) return true;
    } else if (prim.t === "clip") {
      const h = prim.size / 2;
      const c: Pt = [prim.x + h, prim.y + h];
      const q = unrotate(p, c, prim.rotate);
      const local: Pt = [q[0] - prim.x, q[1] - prim.y];
      if (
        local[0] >= 0 &&
        local[0] <= prim.size &&
        local[1] >= 0 &&
        local[1] <= prim.size &&
        covers(prim.children, local)
      )
        return true;
    } else if (prim.t === "box") {
      const c: Pt = [prim.x + prim.w / 2, prim.y + prim.h / 2];
      const q = unrotate(p, c, prim.rotate ?? 0);
      const inside = (inset: number) => {
        const x0 = prim.x + inset;
        const y0 = prim.y + inset;
        const x1 = prim.x + prim.w - inset;
        const y1 = prim.y + prim.h - inset;
        if (q[0] < x0 || q[0] > x1 || q[1] < y0 || q[1] > y1) return false;
        const r = Math.max(0, (prim.radius ?? 0) - inset);
        const cx = Math.min(Math.max(q[0], x0 + r), x1 - r);
        const cy = Math.min(Math.max(q[1], y0 + r), y1 - r);
        return Math.hypot(q[0] - cx, q[1] - cy) <= r + 1e-9;
      };
      if (prim.color && inside(0)) return true;
      if (prim.borderWidth && inside(0) && !inside(prim.borderWidth))
        return true;
    }
  }
  return false;
}

const unrotate = (p: Pt, c: Pt, angle: number): Pt => {
  const cos = Math.cos(-angle);
  const sin = Math.sin(-angle);
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  return [c[0] + dx * cos - dy * sin, c[1] + dx * sin + dy * cos];
};

/** Distinct depth of the nested clips */
const depth = (prims: readonly Prim[]): number =>
  Math.max(
    0,
    ...prims.map((p) =>
      p.t === "clip"
        ? 1 + depth(p.children)
        : p.t === "group"
          ? depth(p.children)
          : 0,
    ),
  );

/** Records what the engine's scene drawing does with some nodes */
function record(nodes: unknown[]): DrawOp[] {
  const recorder = createRecorder();
  const ctx = recorder.context as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, 400, 400);
  drawShapeScene(
    ctx,
    {
      type: "pie",
      width: 400,
      height: 400,
      nodes,
      items: [],
      dim: 0.3,
      empty: false,
    } as never,
    null,
  );
  return recorder.ops();
}

/** Compares the views with a membership test on a grid, away from the edges */
function expectShape(
  prims: readonly Prim[],
  inside: (p: Pt) => boolean,
  margin: (p: Pt) => boolean,
  label = "",
) {
  let checked = 0;
  for (let x = 0; x <= 200; x += 3)
    for (let y = 0; y <= 200; y += 3) {
      const p: Pt = [x + 0.37, y + 0.61];
      if (margin(p)) continue;
      checked++;
      expect(covers(prims, p), `${label} point ${p.join(",")}`).toBe(inside(p));
    }
  expect(checked).toBeGreaterThan(500);
}

/** The outline the canvas fills for a node, curves finely flattened */
function canvasOutline(node: unknown): Pt[] {
  const out: Pt[] = [];
  let pen: Pt = [0, 0];
  let done = false;
  const to = (p: Pt) => {
    if (!done) out.push(p);
    pen = p;
  };
  const ctx = new Proxy(
    {
      moveTo: (x: number, y: number) => to([x, y]),
      lineTo: (x: number, y: number) => to([x, y]),
      arc(
        cx: number,
        cy: number,
        r: number,
        a0: number,
        a1: number,
        ccw?: boolean,
      ) {
        let sweep = a1 - a0;
        if (!ccw && sweep < 0) sweep += Math.PI * 2;
        if (ccw && sweep > 0) sweep -= Math.PI * 2;
        for (let k = 0; k <= 400; k++) {
          const a = a0 + (sweep * k) / 400;
          to([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
        }
      },
      quadraticCurveTo(qx: number, qy: number, x: number, y: number) {
        const [x0, y0] = pen;
        for (let k = 1; k <= 100; k++) {
          const t = k / 100;
          const u = 1 - t;
          to([
            u * u * x0 + 2 * u * t * qx + t * t * x,
            u * u * y0 + 2 * u * t * qy + t * t * y,
          ]);
        }
      },
      fill: () => {
        done = true;
      },
    } as Record<string, unknown>,
    {
      get: (target, key) => (key in target ? target[key as string] : () => {}),
    },
  );
  drawShapeScene(
    ctx as unknown as CanvasRenderingContext2D,
    {
      type: "pie",
      width: 400,
      height: 400,
      nodes: [node],
      items: [],
      dim: 0.3,
      empty: false,
    } as never,
    null,
  );
  return out;
}

function insidePolygon(P: readonly Pt[], p: Pt) {
  let inside = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i] as Pt;
    const b = P[j] as Pt;
    if (
      a[1] > p[1] !== b[1] > p[1] &&
      p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]
    )
      inside = !inside;
  }
  return inside;
}

function distanceToPolygon(P: readonly Pt[], p: Pt) {
  let best = Infinity;
  for (let i = 0; i < P.length; i++) {
    const a = P[i] as Pt;
    const b = P[(i + 1) % P.length] as Pt;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l2 = dx * dx + dy * dy;
    const t =
      l2 > 0
        ? Math.max(
            0,
            Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2),
          )
        : 0;
    best = Math.min(
      best,
      Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy),
    );
  }
  return best;
}

/** Every view of a tree */
const flat = (prims: readonly Prim[]): Prim[] =>
  prims.flatMap((p) =>
    p.t === "clip" || p.t === "group" ? [p, ...flat(p.children)] : [p],
  );

const angleIn = (a: number, a0: number, a1: number) => {
  let t = a - a0;
  while (t < 0) t += Math.PI * 2;
  while (t >= Math.PI * 2) t -= Math.PI * 2;
  return t <= a1 - a0;
};

describe("shape chart geometry", () => {
  it("parses the engine colors", () => {
    expect(parseColor("rgba(10, 20, 30, 0.5)")).toEqual({
      r: 10,
      g: 20,
      b: 30,
      a: 0.5,
    });
    expect(parseColor("#ff0000")).toMatchObject({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor("#0f08")).toMatchObject({ r: 0, g: 255, b: 0 });
    expect(parseColor("hsl(1 2% 3%)").raw).toBe("hsl(1 2% 3%)");
  });

  it("draws a full circle and a ring as single rounded views", () => {
    const disc = framePrims(
      record([{ kind: "circle", cx: 50, cy: 60, r: 10, fill: "#f00" }]),
    );
    expect(disc).toEqual([
      expect.objectContaining({ t: "box", x: 40, y: 50, w: 20, radius: 10 }),
    ]);
    const ring = framePrims(
      record([
        {
          kind: "sector",
          cx: 100,
          cy: 100,
          r0: 40,
          r1: 80,
          a0: 0,
          a1: Math.PI * 2,
          pad: 0,
          corner: 0,
          fill: "rgba(0, 0, 255, 1)",
        },
      ]),
    );
    expect(ring).toEqual([
      expect.objectContaining({
        t: "box",
        w: 160,
        radius: 80,
        borderWidth: 40,
      }),
    ]);
  });

  it("clips annular sectors exactly (any span), without sub-pixel seams", () => {
    for (const [a0, a1] of [
      [0.3, 1.4],
      [-0.4, 2.9],
      [1, 5.6],
    ] as const) {
      const prims = framePrims(
        record([
          {
            kind: "sector",
            cx: 100,
            cy: 100,
            r0: 40,
            r1: 80,
            a0,
            a1,
            pad: 0,
            corner: 0,
            fill: "rgba(255, 0, 0, 1)",
          },
        ]),
      );
      expect(depth(prims)).toBeLessThanOrEqual(4);
      const polar = (p: Pt) => ({
        r: Math.hypot(p[0] - 100, p[1] - 100),
        a: Math.atan2(p[1] - 100, p[0] - 100),
      });
      expectShape(
        prims,
        (p) => {
          const { r, a } = polar(p);
          return r >= 40 && r <= 80 && angleIn(a, a0, a1);
        },
        (p) => {
          const { r, a } = polar(p);
          const edge = (b: number) =>
            Math.abs((p[0] - 100) * Math.sin(b) - (p[1] - 100) * Math.cos(b)) <
              1.5 && angleIn(b, a - 0.8, a + 0.8);
          return (
            Math.abs(r - 40) < 1 || Math.abs(r - 80) < 1 || edge(a0) || edge(a1)
          );
        },
      );
    }
  });

  it("keeps the pixel gaps of pie slices", () => {
    const prims = framePrims(
      record([
        {
          kind: "sector",
          cx: 100,
          cy: 100,
          r0: 0,
          r1: 90,
          a0: 0,
          a1: Math.PI / 2,
          pad: 6,
          corner: 0,
          fill: "rgba(0, 128, 0, 1)",
        },
      ]),
    );
    // inside the slice, but within 3px of its start edge (y = 100)
    expect(covers(prims, [150, 101.5])).toBe(false);
    expect(covers(prims, [150, 105])).toBe(true);
    expect(covers(prims, [101.5, 150])).toBe(false);
    expect(covers(prims, [105, 150])).toBe(true);
  });

  // flattens the engine's outlines densely: slow under coverage on CI
  it(
    "rounds the corners of pie, donut and sunburst slices like the canvas",
    { timeout: 30_000 },
    () => {
      const cases = [
        // donut segments, any span
        { r0: 40, r1: 80, a0: 0.3, a1: 1.4, pad: 0, corner: 10 },
        { r0: 40, r1: 80, a0: -0.4, a1: 2.9, pad: 0, corner: 8 },
        { r0: 40, r1: 80, a0: 1, a1: 5.6, pad: 0, corner: 10 },
        { r0: 50, r1: 90, a0: 0.2, a1: 1.9, pad: 4, corner: 8 },
        // pie slices: the apex stays sharp
        { r0: 0, r1: 90, a0: 0.5, a1: 2, pad: 3, corner: 12 },
        { r0: 0, r1: 90, a0: 1, a1: 5.8, pad: 3, corner: 10 },
        // clamped to half the thickness, then to the arc length
        { r0: 70, r1: 85, a0: 0.4, a1: 2.2, pad: 0, corner: 30 },
        { r0: 0, r1: 85, a0: 0.4, a1: 0.5, pad: 0, corner: 20 },
        // the donut of the docs: 4 slices, padded
        ...[
          [0, 0.4307],
          [0.4307, 0.7122],
          [0.7122, 0.916],
          [0.916, 1],
        ].map(([s0, s1]) => ({
          r0: 68,
          r1: 110,
          a0: -Math.PI / 2 + s0! * Math.PI * 2,
          a1: -Math.PI / 2 + s1! * Math.PI * 2,
          pad: 2,
          corner: 10,
        })),
      ];
      for (const c of cases) {
        const node = {
          kind: "sector",
          cx: 100,
          cy: 100,
          ...c,
          fill: "rgba(200, 0, 0, 1)",
        };
        const prims = framePrims(record([node]));
        const outline = canvasOutline(node);
        const margin = Math.max(
          1.2,
          Math.min(c.corner, (c.r1 - c.r0) / 2) * 0.08,
        );
        expectShape(
          prims,
          (p) => insidePolygon(outline, p),
          (p) => distanceToPolygon(outline, p) < margin,
          JSON.stringify(c),
        );
        // the fillets are anti-aliased discs (unless they would overlap: then
        // the flattened outline)
        if (c.a1 - c.a0 < 0.2) continue;
        const discs = flat(prims).filter(
          (p) => p.t === "box" && (p.radius ?? 0) > 0 && (p.radius ?? 0) < 20,
        );
        expect(discs.length, JSON.stringify(c)).toBeGreaterThanOrEqual(
          c.r0 > 0 ? 3 : 2,
        );
        expect(depth(prims)).toBeLessThanOrEqual(8);
      }
    },
  );

  it("draws stroked arcs as bands with round caps", () => {
    const prims = framePrims(
      record([
        {
          kind: "arc",
          cx: 100,
          cy: 100,
          r: 60,
          a0: Math.PI * 0.75,
          a1: Math.PI * 2.25,
          width: 12,
          color: "rgba(0, 0, 0, 1)",
          cap: "round",
        },
      ]),
    );
    expectShape(
      prims,
      (p) => {
        const r = Math.hypot(p[0] - 100, p[1] - 100);
        const a = Math.atan2(p[1] - 100, p[0] - 100);
        const cap = (b: number) =>
          Math.hypot(
            p[0] - (100 + 60 * Math.cos(b)),
            p[1] - (100 + 60 * Math.sin(b)),
          ) <= 6;
        return (
          (r >= 54 && r <= 66 && angleIn(a, Math.PI * 0.75, Math.PI * 2.25)) ||
          cap(Math.PI * 0.75) ||
          cap(Math.PI * 2.25)
        );
      },
      (p) => {
        const r = Math.hypot(p[0] - 100, p[1] - 100);
        return Math.abs(r - 54) < 1 || Math.abs(r - 66) < 1 || p[1] > 130;
      },
    );
  });

  it("draws wide curved strokes (sankey links) without bulging joins", () => {
    // a 100 px wide S-shaped link: its bends are tighter than its half width
    const W = 100;
    const prims = framePrims(
      record([
        {
          kind: "link",
          x0: 20,
          y0: 40,
          x1: 180,
          y1: 160,
          width: W,
          color0: "#2563eb",
          color1: "#2563eb",
        },
      ]),
    );
    // the canvas stroke: every normal segment of the center line (a bezier)
    const samples: { c: Pt; t: Pt }[] = [];
    for (let i = 0; i <= 2000; i++) {
      const k = i / 2000;
      const u = 1 - k;
      const c: Pt = [
        u ** 3 * 20 + 3 * u * u * k * 100 + 3 * u * k * k * 100 + k ** 3 * 180,
        u ** 3 * 40 + 3 * u * u * k * 40 + 3 * u * k * k * 160 + k ** 3 * 160,
      ];
      const d: Pt = [
        3 * u * u * 80 + 6 * u * k * 0 + 3 * k * k * 80,
        3 * u * u * 0 + 6 * u * k * 120 + 3 * k * k * 0,
      ];
      const l = Math.hypot(d[0], d[1]);
      samples.push({ c, t: [d[0] / l, d[1] / l] });
    }
    const offsets = (p: Pt) =>
      samples
        .filter(
          ({ c, t }) =>
            Math.abs((p[0] - c[0]) * t[0] + (p[1] - c[1]) * t[1]) < 0.6,
        )
        .map(({ c, t }) =>
          Math.abs(-(p[0] - c[0]) * t[1] + (p[1] - c[1]) * t[0]),
        );
    expectShape(
      prims,
      (p) => offsets(p).some((n) => n < W / 2),
      // the edges: not checked (beyond the butt ends is empty)
      (p) =>
        Math.abs(p[0] - 20) < 3 ||
        Math.abs(p[0] - 180) < 3 ||
        offsets(p).some((n) => Math.abs(n - W / 2) < 2.5),
    );
  });

  it("fills concave polygons and rings with holes", () => {
    // a star: concave, split in convex pieces
    const star: Pt[] = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 35 : 90;
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      star.push([100 + r * Math.cos(a), 100 + r * Math.sin(a)]);
    }
    expect(triangulate(star)).toHaveLength(8);
    expect(convexPieces(star).length).toBeLessThan(8);
    const prims = framePrims(
      record([
        { kind: "polygon", points: star.flat(), fill: "rgba(1, 2, 3, 0.4)" },
      ]),
    );
    // translucent: one group with the opacity, opaque pieces inside
    expect(prims).toEqual([
      expect.objectContaining({ t: "group", opacity: 0.4 }),
    ]);
    const inStar = (p: Pt) => {
      let inside = false;
      for (let i = 0, j = star.length - 1; i < star.length; j = i++) {
        const [xi, yi] = star[i]!;
        const [xj, yj] = star[j]!;
        if (
          yi > p[1] !== yj > p[1] &&
          p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi
        )
          inside = !inside;
      }
      return inside;
    };
    const nearEdge = (p: Pt) =>
      star.some((a, i) => {
        const b = star[(i + 1) % star.length]!;
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const t = Math.max(
          0,
          Math.min(
            1,
            ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy),
          ),
        );
        return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy) < 1;
      });
    expectShape(prims, inStar, nearEdge);

    const square = (r: number): number[] => [
      100 - r,
      100 - r,
      100 + r,
      100 - r,
      100 + r,
      100 + r,
      100 - r,
      100 + r,
    ];
    const band = framePrims(
      record([
        { kind: "polygon", points: square(80), hole: square(40), fill: "#000" },
      ]),
    );
    expectShape(
      band,
      (p) => {
        const d = Math.max(Math.abs(p[0] - 100), Math.abs(p[1] - 100));
        return d <= 80 && d >= 40;
      },
      (p) => {
        const d = Math.max(Math.abs(p[0] - 100), Math.abs(p[1] - 100));
        return Math.abs(d - 80) < 1 || Math.abs(d - 40) < 1;
      },
    );
  });

  it("draws (rounded) rectangles, lines, dashes and texts", () => {
    const prims = framePrims(
      record([
        {
          kind: "rect",
          x: 10,
          y: 20,
          width: 50,
          height: 30,
          radius: 4,
          fill: "#123456",
        },
        {
          kind: "line",
          points: [0, 0, 30, 40, 60, 0],
          color: "#000",
          width: 2,
        },
        {
          kind: "text",
          x: 50,
          y: 50,
          text: "Hello",
          font: "600 13px sans-serif",
          color: "#111",
          align: "center",
          baseline: "middle",
          rotate: Math.PI / 2,
        },
      ]),
    );
    expect(prims[0]).toEqual(
      expect.objectContaining({
        t: "box",
        x: 10,
        y: 20,
        w: 50,
        h: 30,
        radius: 4,
      }),
    );
    // round caps and joins: rounded segments
    expect(
      prims.filter((p) => p.t === "box" && p.rotate !== undefined),
    ).toHaveLength(2);
    expect(prims[prims.length - 1]).toEqual(
      expect.objectContaining({
        t: "text",
        text: "Hello",
        size: 13,
        weight: 600,
        rotate: Math.PI / 2,
      }),
    );
    const dashes = dashPolyline(
      [
        [0, 0],
        [20, 0],
      ],
      [3, 3],
    );
    expect(dashes).toHaveLength(4);
    expect(dashes[1]).toEqual([
      [6, 0],
      [9, 0],
    ]);
  });

  it("degrades gradients to colors along their axis", () => {
    const prims = framePrims(
      record([
        {
          kind: "link",
          x0: 0,
          y0: 10,
          x1: 100,
          y1: 60,
          width: 8,
          color0: "rgba(255, 0, 0, 1)",
          color1: "rgba(0, 0, 255, 1)",
        },
      ]),
    );
    const colors = prims
      .filter((p) => p.t === "box" && p.rotate !== undefined)
      .map((p) => (p.t === "box" ? p.color : ""));
    expect(colors.length).toBeGreaterThan(4);
    expect(colors[0]).toMatch(/^rgb\(2\d\d, 0, \d+\)$/);
    expect(colors[colors.length - 1]).toMatch(/^rgb\(\d+, 0, 2\d\d\)$/);
  });

  it("records every engine chart type into views", () => {
    const all: ShapeChartOptions[] = [
      {
        type: "pie",
        innerRadius: 0.6,
        data: [
          { name: "A", value: 3 },
          { name: "B", value: 2 },
          { name: "C", value: 1 },
        ],
        centerValue: "6",
      },
      {
        type: "radar",
        indicators: [
          { name: "a" },
          { name: "b" },
          { name: "c" },
          { name: "d" },
        ],
        series: [{ name: "S", values: [1, 3, 2, 4] }],
      },
      {
        type: "gauge",
        value: 42,
        bands: [
          { to: 50, color: "#22c55e" },
          { to: 100, color: "#ef4444" },
        ],
      },
      {
        type: "funnel",
        data: [
          { name: "Visit", value: 100 },
          { name: "Buy", value: 30 },
        ],
      },
      {
        type: "treemap",
        data: [
          {
            name: "X",
            children: [
              { name: "x1", value: 3 },
              { name: "x2", value: 1 },
            ],
          },
          { name: "Y", value: 2 },
        ],
      },
    ];
    for (const options of all) {
      const recorder = createRecorder();
      const chart = createCanvasShapeChart({
        canvas: { width: 0, height: 0, getContext: () => recorder.context },
        width: 320,
        height: 240,
        options: { ...options, animation: false },
      });
      const ops = recorder.ops();
      chart.destroy();
      expect(ops.length, options.type).toBeGreaterThan(2);
      const prims = framePrims(ops);
      expect(prims.length, options.type).toBeGreaterThan(2);
      expect(
        prims.some((p) => p.t === "text"),
        options.type,
      ).toBe(true);
    }
  });

  it("ignores empty paths", () => {
    expect(regionViews([], "#000")).toEqual([]);
  });
});
