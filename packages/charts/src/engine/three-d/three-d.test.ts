import { describe, expect, it } from "vitest";
import { COLOR_MAPS, colorLut, colorStops, lutIndex } from "./colormap";
import { contourSegments } from "./contours";
import { rendererCandidates3D } from "./detect";
import {
  CPU_BUDGET,
  GPU_BUDGET,
  contourLevels,
  createGeometryBuilder,
  stepped,
  type GeometryColors,
  type PointTarget,
} from "./geometry";
import { highlightShape, hoverEvent, tooltipRows } from "./hover";
import { fill, formatCompact3D, locale3D } from "./labels";
import {
  DEFAULT_CAMERA,
  cameraFrame,
  clampCamera,
  eyeDirection,
  identity,
  invert,
  multiply,
  project,
  rayBox,
  rayTriangle,
  screenRay,
  type FitRect,
  type Vec3,
} from "./math";
import { boxHalf, buildModel, fromWorld, toWorld } from "./model";
import { farWalls, gridPositions, labelEdge } from "./overlay";
import { createPicker, pickPoint, buildPointIndex } from "./pick";
import {
  VERTEX_STRIDE,
  drawOrder,
  type Frame3D,
  type Item3D,
  type MeshItem,
} from "./render-types";
import { UNIFORM_BYTES, itemUniforms, writesDepth } from "./shaders";
import { createDepthSorter, sortQuads } from "./sort";
import type { Chart3DOptions } from "./types";

const close = (a: number, b: number, eps = 1e-4) =>
  expect(Math.abs(a - b)).toBeLessThan(eps);

const FIT: FitRect = { x: 40, y: 20, width: 520, height: 340 };
const W = 600;
const H = 400;

const frameFor = (
  azimuth = 35,
  elevation = 24,
  projection: "perspective" | "orthographic" = "perspective",
) =>
  cameraFrame(
    { ...DEFAULT_CAMERA, azimuth, elevation, pan: [0, 0], projection },
    [1, 1, 0.7],
    W,
    H,
    FIT,
  );

const colors = (): GeometryColors => ({
  series: [
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
  ],
  resolve: () => [1, 1, 0, 1],
  lut: colorLut(colorStops("viridis")),
  wire: [0, 0, 0, 0.4],
});

describe("3D math", () => {
  it("inverts matrices", () => {
    const f = frameFor();
    const product = multiply(f.viewProj, invert(f.viewProj)!);
    const id = identity();
    for (let i = 0; i < 16; i++) close(product[i]!, id[i]!, 1e-3);
    expect(invert(new Float32Array(16))).toBeNull();
  });

  it("orbits around the box center with z up", () => {
    const [x, y, z] = eyeDirection(0, 0);
    close(x, 0);
    close(y, -1);
    close(z, 0);
    close(eyeDirection(90, 0)[0], 1);
    close(eyeDirection(0, 90)[2], 1);
  });

  it("keeps the camera in range", () => {
    const c = clampCamera({
      ...DEFAULT_CAMERA,
      pan: [0, 0],
      azimuth: 540,
      elevation: 120,
      zoom: 100,
    });
    expect(c.azimuth).toBe(180);
    expect(c.elevation).toBe(89);
    expect(c.zoom).toBe(12);
    expect(clampCamera({ ...c, azimuth: -190 }).azimuth).toBe(170);
  });

  it.each([
    [0, 24, "perspective"],
    [35, 24, "perspective"],
    [90, 60, "perspective"],
    [-135, 10, "orthographic"],
    [45, -30, "orthographic"],
  ] as const)(
    "fits the box into the fit rectangle (azimuth %d, elevation %d, %s)",
    (azimuth, elevation, projection) => {
      const f = frameFor(azimuth, elevation, projection);
      const center = project(f, 0, 0, 0);
      close(center.x, FIT.x + FIT.width / 2, 1e-2);
      close(center.y, FIT.y + FIT.height / 2, 1e-2);
      // the fit ignores the azimuth (no size change while turning) and only
      // approximates the perspective: allow a few pixels
      const slack = FIT.height * 0.03;
      for (let i = 0; i < 8; i++) {
        const p = project(
          f,
          i & 1 ? 1 : -1,
          i & 2 ? 1 : -1,
          i & 4 ? 0.7 : -0.7,
        );
        expect(p.visible).toBe(true);
        expect(p.x).toBeGreaterThanOrEqual(FIT.x - slack);
        expect(p.x).toBeLessThanOrEqual(FIT.x + FIT.width + slack);
        expect(p.y).toBeGreaterThanOrEqual(FIT.y - slack);
        expect(p.y).toBeLessThanOrEqual(FIT.y + FIT.height + slack);
        expect(p.depth).toBeGreaterThan(-1);
        expect(p.depth).toBeLessThan(1);
      }
    },
  );

  it("zooms and pans in screen space", () => {
    const base = frameFor();
    const zoomed = cameraFrame(
      { ...DEFAULT_CAMERA, zoom: 2, pan: [0.1, 0] },
      [1, 1, 0.7],
      W,
      H,
      FIT,
    );
    const a = project(base, 1, 0, 0);
    const b = project(zoomed, 1, 0, 0);
    const c0 = FIT.x + FIT.width / 2;
    close(b.x - (c0 + 0.1 * FIT.height), (a.x - c0) * 2, 1e-2);
  });

  it("casts rays through the pixels", () => {
    const f = frameFor();
    const target: Vec3 = [0.3, -0.2, 0.1];
    const p = project(f, ...target);
    const ray = screenRay(f, p.x, p.y)!;
    const d = rayBox(
      ray,
      [target[0] - 0.01, target[1] - 0.01, target[2] - 0.01],
      [target[0] + 0.01, target[1] + 0.01, target[2] + 0.01],
    );
    expect(Number.isFinite(d)).toBe(true);
    expect(rayBox(ray, [5, 5, 5], [6, 6, 6])).toBe(Infinity);
  });

  it("intersects triangles", () => {
    const ray = { origin: [0.2, 0.2, 5] as Vec3, dir: [0, 0, -1] as Vec3 };
    close(rayTriangle(ray, 0, 0, 1, 1, 0, 1, 0, 1, 1), 4);
    expect(rayTriangle(ray, 2, 2, 0, 3, 2, 0, 2, 3, 0)).toBe(Infinity);
  });
});

describe("color maps and contours", () => {
  it("samples the ramps", () => {
    expect(COLOR_MAPS).toContain("viridis");
    const lut = colorLut(colorStops(["#000000", "#ffffff"]));
    expect(lut.rgba[0]).toEqual([0, 0, 0, 1]);
    expect(lut.rgba[255]).toEqual([1, 1, 1, 1]);
    expect(lutIndex(5, 0, 10)).toBe(128);
    expect(lutIndex(-3, 0, 10)).toBe(0);
    expect(lutIndex(30, 0, 10)).toBe(255);
    // custom colors go through the resolver (CSS variables)
    const resolved = colorStops(["var(--a)", "var(--b)"], () => [1, 0, 0, 1]);
    expect(resolved).toEqual([
      [1, 0, 0, 1],
      [1, 0, 0, 1],
    ]);
  });

  it("traces the iso-lines of a grid (marching squares)", () => {
    // a cone: z = distance to the center of a 21 × 21 grid
    const n = 21;
    const z = new Float32Array(n * n);
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++) z[r * n + c] = Math.hypot(c - 10, r - 10);
    const segments = contourSegments(z, n, n, 5);
    expect(segments.length).toBeGreaterThan(0);
    expect(segments.length % 4).toBe(0);
    for (let i = 0; i < segments.length; i += 2) {
      const d = Math.hypot(segments[i]! - 10, segments[i + 1]! - 10);
      expect(Math.abs(d - 5)).toBeLessThan(0.3);
    }
    expect(contourSegments(z, n, n, 100)).toEqual([]);
  });

  it("chooses contour levels", () => {
    expect(contourLevels({ levels: [1, NaN, 2] }, 0, 3)).toEqual([1, 2]);
    const levels = contourLevels({ count: 4 }, 0, 10);
    expect(levels.length).toBeGreaterThanOrEqual(2);
    expect(levels.every((l) => l > 0 && l < 10)).toBe(true);
    expect(contourLevels({}, 1, 1)).toEqual([]);
    expect(stepped(10, 4)).toEqual([0, 4, 8, 9]);
  });
});

describe("3D model", () => {
  it("normalizes the box proportions", () => {
    expect(boxHalf(undefined)).toEqual([1, 1, 0.7]);
    expect(boxHalf([2, 1, -1])).toEqual([1, 0.5, 0.5]);
  });

  it("builds nice domains from every series", () => {
    const model = buildModel({
      series: [
        {
          data: [
            [0.3, 1, 2],
            [4.6, 2, 9],
          ],
        },
        { hidden: true, data: { x: [-2], y: [0], z: [0] } },
      ],
    });
    expect(model.x.domain).toEqual([-2, 5]);
    expect(model.z.domain[0]).toBeLessThanOrEqual(0);
    expect(model.z.domain[1]).toBeGreaterThanOrEqual(9);
    expect(model.colorDomain).toBeNull();
    const x = model.x;
    close(toWorld(x, x.domain[0]), -x.half);
    close(fromWorld(x, toWorld(x, 1.5)), 1.5);
  });

  it("maps the color domain and honours valueRange", () => {
    const series = [
      { data: { x: [0, 1], y: [0, 1], z: [0, 1], value: [10, 20] } },
    ];
    expect(buildModel({ series }).colorDomain).toEqual([10, 20]);
    expect(buildModel({ series, valueRange: [0, 100] }).colorDomain).toEqual([
      0, 100,
    ]);
    const surface = buildModel({
      series: [
        {
          type: "surface",
          data: { rows: 2, cols: 2, z: [1, 2, 3, 4] },
        },
      ],
    });
    expect(surface.colorDomain).toEqual([1, 4]);
    expect(surface.colorFromZ).toBe(true);
  });

  it("stacks bars and collects the categories", () => {
    const model = buildModel({
      series: [
        {
          type: "bar",
          data: [
            ["a", "x", 2],
            ["b", "x", -1],
          ],
        },
        {
          type: "bar",
          data: [
            ["a", "x", 3],
            ["b", "x", -2],
            ["c", "y", null],
          ],
        },
      ],
    });
    // a null height still declares its categories (an empty cell)
    expect(model.x.categories).toEqual(["a", "b", "c"]);
    expect(model.y.categories).toEqual(["x", "y"]);
    expect(model.x.domain).toEqual([-0.5, 2.5]);
    const second = model.series[1]!;
    if (second.type !== "bar") throw new Error("bar expected");
    expect([...second.bars.z0.slice(0, 2)]).toEqual([2, -1]);
    expect([...second.bars.z1.slice(0, 2)]).toEqual([5, -3]);
    expect(second.bars.count).toBe(2);
    expect(model.z.domain[0]).toBeLessThanOrEqual(-3);
    expect(model.z.domain[1]).toBeGreaterThanOrEqual(5);
    // given categories: numbers are indices
    const fixed = buildModel({
      xAxis: { categories: ["Q1", "Q2"] },
      yAxis: { categories: ["EU"] },
      series: [{ type: "bar", data: [{ x: 1, y: 0, z: 4 }] }],
    });
    const bars = fixed.series[0]!;
    if (bars.type !== "bar") throw new Error("bar expected");
    expect(bars.bars.xi[0]).toBe(1);
  });
});

describe("3D geometry", () => {
  it("packs the points and skips NaN", () => {
    const model = buildModel({
      series: [
        { data: { x: [0, NaN, 1, 2], y: [0, 0, 1, 2], z: [0, 0, 1, 2] } },
      ],
    });
    const build = createGeometryBuilder();
    const g = build(model, colors(), GPU_BUDGET, 1);
    const item = g.items[0]!;
    expect(item.kind).toBe("points");
    if (item.kind !== "points") return;
    expect(item.count).toBe(3);
    const target = g.targets[0] as PointTarget;
    expect([...target.source!]).toEqual([0, 2, 3]);
    // unchanged inputs keep the uploaded buffers
    const again = build(model, colors(), GPU_BUDGET, 1);
    expect(again.items[0]!.version).toBe(item.version);
    const other = build(model, colors(), GPU_BUDGET, 2);
    expect(other.items[0]!.version).not.toBe(item.version);
  });

  it("triangulates surfaces with holes, wireframes and contours", () => {
    const n = 5;
    const z = new Float32Array(n * n).fill(1);
    z[12] = NaN;
    const model = buildModel({
      series: [
        {
          type: "surface",
          data: { rows: n, cols: n, z },
          wireframe: true,
          contours: { levels: [1] },
        },
      ],
    });
    const g = createGeometryBuilder()(model, colors(), GPU_BUDGET, 1);
    const mesh = g.items.find((i) => i.kind === "mesh");
    if (mesh?.kind !== "mesh") throw new Error("mesh expected");
    // 16 cells, the 4 around the hole are dropped
    expect(mesh.indices.length).toBe(12 * 6);
    // the flat surface faces up
    const f32 = new Float32Array(mesh.vertices);
    expect(Math.abs(f32[3]!) + Math.abs(f32[4]!)).toBe(0);
    expect(f32[5]).toBe(1);
    expect(g.items.filter((i) => i.kind === "lines").length).toBe(1);
    expect(g.counts).toEqual([25]);
  });

  it("resamples large grids for the CPU backend", () => {
    const n = 100;
    const model = buildModel({
      series: [
        {
          type: "surface",
          data: { rows: n, cols: n, z: new Float32Array(n * n) },
        },
      ],
    });
    const g = createGeometryBuilder()(model, colors(), CPU_BUDGET, 1);
    const mesh = g.items[0]!;
    if (mesh.kind !== "mesh") throw new Error("mesh expected");
    expect(mesh.vertexCount).toBe(CPU_BUDGET.maxGridSide ** 2);
  });

  it("builds 24 vertices and 36 indices per bar", () => {
    const model = buildModel({
      series: [
        {
          type: "bar",
          data: [
            ["a", "x", 1],
            ["b", "x", 2],
          ],
        },
      ],
    });
    const g = createGeometryBuilder()(model, colors(), GPU_BUDGET, 1);
    const mesh = g.items[0]!;
    if (mesh.kind !== "mesh") throw new Error("mesh expected");
    expect(mesh.vertexCount).toBe(48);
    expect(mesh.indices.length).toBe(72);
    expect(g.targets[0]!.kind).toBe("bars");
  });

  it("orders the draws", () => {
    const base = { key: "", version: 0 };
    const items: Item3D[] = [
      {
        ...base,
        key: "l",
        kind: "lines",
        opacity: 1,
        data: new ArrayBuffer(0),
        count: 0,
        width: 1,
        bias: 0,
      },
      {
        ...base,
        key: "t",
        kind: "mesh",
        opacity: 0.5,
        vertices: new ArrayBuffer(0),
        vertexCount: 0,
        indices: new Uint32Array(0),
      },
      {
        ...base,
        key: "p",
        kind: "points",
        opacity: 1,
        data: new ArrayBuffer(0),
        count: 0,
        perspective: true,
      },
      {
        ...base,
        key: "m",
        kind: "mesh",
        opacity: 1,
        vertices: new ArrayBuffer(0),
        vertexCount: 0,
        indices: new Uint32Array(0),
      },
    ];
    expect(drawOrder(items).map((i) => i.key)).toEqual(["m", "p", "t", "l"]);
    expect(writesDepth(items[1]!)).toBe(false);
    expect(writesDepth(items[3]!)).toBe(true);
  });

  it("writes the uniforms in the WGSL layout", () => {
    const out = new Float32Array(UNIFORM_BYTES / 4);
    const f = frameFor();
    itemUniforms(
      {
        key: "l",
        version: 0,
        kind: "lines",
        opacity: 0.5,
        data: new ArrayBuffer(0),
        count: 0,
        width: 3,
        bias: 0.01,
      },
      {
        viewProj: f.viewProj,
        eye: f.eye,
        light: [0, 0, 1],
        orthographic: false,
        distance: 4,
        radius: 1.5,
        width: 800,
        height: 600,
        dpr: 2,
        lighting: [0.5, 0.6, 0.2, 32],
        fog: [1, 1, 1, 1],
        exposure: 1,
      },
      out,
    );
    expect([...out.slice(16, 20)]).toEqual([800, 600, 2, 0]);
    close(out[23]!, 0.01);
    expect([...out.slice(32, 36)]).toEqual([0.5, 3, 4, 1.5]);
  });
});

describe("3D picking", () => {
  const options: Chart3DOptions = {
    series: [
      {
        data: [
          [-1, -1, -1],
          [0, 0, 0],
          [1, 1, 1],
        ],
        pointSize: 10,
      },
    ],
  };

  it("finds the dot under the pointer", () => {
    const model = buildModel(options);
    const g = createGeometryBuilder()(model, colors(), GPU_BUDGET, 1);
    const f = frameFor();
    const targets = g.targets as PointTarget[];
    const index = buildPointIndex(targets, f);
    const center = project(f, 0, 0, 0);
    expect(pickPoint(index, targets, center.x + 2, center.y)?.point).toBe(1);
    expect(pickPoint(index, targets, center.x + 7, center.y)?.point).toBe(1);
    expect(pickPoint(index, targets, center.x + 40, center.y + 40)).toBeNull();
  });

  it("hits surfaces and bars with rays", () => {
    const picker = createPicker();
    const f = frameFor(35, 40);
    const surface = buildModel({
      series: [
        { type: "surface", data: { rows: 3, cols: 3, z: new Float32Array(9) } },
      ],
      zAxis: { min: -1, max: 1 },
    });
    const gs = createGeometryBuilder()(surface, colors(), GPU_BUDGET, 1);
    const c = project(f, 0, 0, 0);
    const hit = picker.pick(gs.targets, f, c.x, c.y)!;
    expect(hit.kind).toBe("surface");
    expect(hit.item).toBe(4);
    expect(picker.pick(gs.targets, f, 2, 2)).toBeNull();

    const bars = buildModel({
      series: [{ type: "bar", data: [["a", "x", 3]] }],
    });
    const gb = createGeometryBuilder()(bars, colors(), GPU_BUDGET, 1);
    const top = project(f, 0, 0, 0);
    const barHit = createPicker().pick(gb.targets, f, top.x, top.y)!;
    expect(barHit.kind).toBe("bars");
    const event = hoverEvent(bars, gb.targets, barHit, colors())!;
    expect(event.xCategory).toBe("a");
    expect(event.yCategory).toBe("x");
    expect(event.z).toBe(3);
    expect(highlightShape(gb.targets, barHit, "red")?.kind).toBe("box");
  });

  it("turns hits into events and tooltip rows", () => {
    const model = buildModel({
      xAxis: { title: "Width" },
      series: [
        {
          name: "S",
          data: {
            x: [NaN, 2],
            y: [0, 3],
            z: [0, 4],
            value: [0, 7],
            label: ["a", "b"],
          },
          format: (v) => `${v} °C`,
        },
      ],
    });
    const g = createGeometryBuilder()(model, colors(), GPU_BUDGET, 1);
    const event = hoverEvent(
      model,
      g.targets,
      {
        series: 0,
        kind: "points",
        item: 0,
        world: [0, 0, 0],
        x: 10,
        y: 20,
        depth: 0,
      },
      colors(),
      { x: 5, y: 6 },
    )!;
    expect(event).toMatchObject({
      seriesName: "S",
      type: "scatter",
      index: 1,
      x: 2,
      y: 3,
      z: 4,
      value: 7,
      label: "b",
      clientX: 15,
      clientY: 26,
    });
    const rows = tooltipRows(model, event, "Temperature");
    expect(rows[0]).toEqual({ name: "", value: "b" });
    expect(rows[1]!.name).toBe("Width");
    expect(rows[4]).toEqual({ name: "Temperature", value: "7 °C" });
  });
});

describe("3D overlay and backends", () => {
  it("places the grid lines and the label edges", () => {
    const bars = buildModel({
      series: [
        {
          type: "bar",
          data: [
            ["a", "x", 1],
            ["b", "x", 1],
            ["c", "x", 1],
          ],
        },
      ],
    });
    expect(gridPositions(bars.x).map((v) => +v.toFixed(3))).toEqual([
      -0.333, 0.333,
    ]);
    const f = frameFor(35, 24);
    // eye on +x, -y, +z: the far walls are at -x, +y and the floor
    expect(farWalls(f)).toEqual([-1, 1, -1]);
    const edge = labelEdge(f, bars, 0);
    expect(edge[1]).toBe(-bars.y.half);
    expect(edge[2]).toBe(-bars.z.half);
  });

  it("lists the backends to try", () => {
    expect(rendererCandidates3D("auto")).toEqual([
      "webgpu",
      "webgl2",
      "webgl",
      "canvas2d",
    ]);
    expect(rendererCandidates3D("webgl")).toEqual(["webgl", "canvas2d"]);
    expect(rendererCandidates3D("auto", new Set(["webgpu"]))).toEqual([
      "webgl2",
      "webgl",
      "canvas2d",
    ]);
  });
});

describe("3D locale", () => {
  it("fills the templates", () => {
    expect(fill("{a} and {b} {c}", { a: 1, b: "two" })).toBe("1 and two {c}");
  });

  it("completes the built-in texts with English and the overrides", () => {
    const zh = locale3D("zh-TW", { value: "温度" });
    expect(zh.labels.chart).toBe("3D 图表");
    expect(zh.labels.value).toBe("温度");
    expect(zh.labels.x).toBe("x");
    expect(locale3D("de").labels.chart).toBe("3D chart");
    expect(locale3D("ja").labels.points).toBe("{count} 点");
  });

  it("formats numbers with the units of the language", () => {
    expect(formatCompact3D("en", 1_234_567)).toBe("1.23M");
    expect(formatCompact3D("zh", 1_234_567)).toBe("123.46万");
    expect(formatCompact3D("ja", 3e8)).toBe("3億");
    expect(formatCompact3D("fr", 2_500_000)).toBe("2,5 M");
    expect(formatCompact3D("en", -0)).toBe("0");
    const fr = locale3D("fr");
    expect(fr.value(1234.5678)).toBe("1\u202f234,57");
    expect(fr.count(1_000_000)).toBe("1\u202f000\u202f000");
    expect(locale3D("en").value(0.123456)).toBe("0.1235");
    expect(locale3D("en").value(NaN)).toBe("–");
    // evenly spaced ticks keep the same decimals, never "-0"
    const ticks = locale3D("de").ticks(0.5, 2);
    expect([-0.0001, 1, 1.5].map(ticks)).toEqual(["0,0", "1,0", "1,5"]);
    const big = locale3D("zh").ticks(50_000, 200_000);
    expect([0, 50_000, 200_000].map(big)).toEqual(["0", "5万", "20万"]);
  });

  it("localizes the axes and the tooltip rows", () => {
    const model = buildModel({
      locale: "fr",
      series: [
        { data: { x: [0, 1.5], y: [0, 1], z: [0, 1], value: [0, 2.5] } },
      ],
    });
    expect(model.x.labels).toContain("1,5");
    const rows = tooltipRows(
      model,
      {
        seriesIndex: 0,
        seriesId: "0",
        seriesName: "",
        type: "scatter",
        index: 1,
        x: 1.5,
        y: 1,
        z: 1,
        value: 2.5,
        color: "red",
        clientX: 0,
        clientY: 0,
      },
      "",
    );
    expect(rows.map((r) => r.name)).toEqual(["x", "y", "z", "valeur"]);
    expect(rows[0]!.value).toBe("1,5");
    expect(rows[3]!.value).toBe("2,5");
  });
});

describe("transparent meshes", () => {
  /** n quads along x, at depths y spread inside the box (-0.9 … 0.9) */
  const quads = (n: number, opacity = 0.5): MeshItem => {
    const floats = VERTEX_STRIDE / 4;
    const vertices = new Float32Array(n * 4 * floats);
    const indices = new Uint32Array(n * 6);
    for (let q = 0; q < n; q++) {
      for (let k = 0; k < 4; k++) {
        const o = (q * 4 + k) * floats;
        vertices[o] = k & 1 ? 1 : 0;
        vertices[o + 1] = -0.9 + (1.8 * q) / Math.max(1, n - 1);
        vertices[o + 2] = k & 2 ? 1 : 0;
      }
      const v = q * 4;
      indices.set([v, v + 1, v + 3, v, v + 3, v + 2], q * 6);
    }
    return {
      key: "m",
      version: 1,
      kind: "mesh",
      opacity,
      vertices: vertices.buffer,
      vertexCount: n * 4,
      indices,
    };
  };
  const frame = (
    azimuth: number,
    projection: "perspective" | "orthographic" = "perspective",
  ) => {
    const f = frameFor(azimuth, 10, projection);
    return {
      viewProj: f.viewProj,
      eye: f.eye,
      light: [0, 0, 1],
      orthographic: f.orthographic,
      distance: f.distance,
      radius: f.radius,
      width: W,
      height: H,
      dpr: 1,
      lighting: [0.5, 0.5, 0, 1],
      fog: [1, 1, 1, 1],
      exposure: 1,
    } satisfies Frame3D;
  };
  const firstQuads = (indices: Uint32Array) =>
    Array.from({ length: indices.length / 6 }, (_, q) => indices[q * 6]! / 4);

  it("sorts the quads back to front", () => {
    const item = quads(4);
    const out = new Uint32Array(item.indices.length);
    const scratch = {
      keys: new Float32Array(4),
      counts: new Uint32Array(1 << 16),
    };
    const vertices = new Float32Array(item.vertices);
    // azimuth 0 looks along +y: the largest y is the farthest
    for (const projection of ["perspective", "orthographic"] as const) {
      const f = frame(0, projection);
      sortQuads(
        item.indices,
        vertices,
        f.viewProj,
        f.orthographic,
        out,
        scratch,
      );
      expect(firstQuads(out)).toEqual([3, 2, 1, 0]);
    }
    const back = frame(180);
    sortQuads(item.indices, vertices, back.viewProj, false, out, scratch);
    expect(firstQuads(out)).toEqual([0, 1, 2, 3]);
  });

  it("sorts again only when the camera moves", () => {
    const sort = createDepthSorter();
    const item = quads(3);
    const opaque = quads(3, 1);
    expect(sort([opaque], frame(0))[0]).toBe(opaque);
    const a = sort([item], frame(0))[0] as MeshItem;
    expect(firstQuads(a.indices)).toEqual([2, 1, 0]);
    expect(a.order).toBeDefined();
    const same = sort([item], frame(0))[0] as MeshItem;
    expect(same.order).toBe(a.order);
    const moved = sort([item], frame(180))[0] as MeshItem;
    expect(moved.order).not.toBe(a.order);
    expect(firstQuads(moved.indices)).toEqual([0, 1, 2]);
    // the source indices are left untouched
    expect(firstQuads(item.indices)).toEqual([0, 1, 2]);
  });
});
