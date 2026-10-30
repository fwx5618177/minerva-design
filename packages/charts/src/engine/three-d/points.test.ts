import { afterEach, describe, expect, it, vi } from "vitest";
import { colorLut, colorStops } from "./colormap";
import {
  createCanvas2d3D,
  discProfile,
  glowProfile,
  gradientAxis,
  lightVertices,
  thinnedDot,
} from "./canvas2d";
import {
  CPU_BUDGET,
  GPU_BUDGET,
  createGeometryBuilder,
  type GeometryColors,
  type PointTarget,
} from "./geometry";
import { DEFAULT_CAMERA, cameraFrame, project, type FitRect } from "./math";
import { buildModel, toWorld, type Model3D } from "./model";
import { buildPointIndex, pickPoint } from "./pick";
import {
  POINT_DISC,
  POINT_GLOW,
  POINT_STRIDE,
  VERTEX_STRIDE,
  drawOrder,
  drawRank,
  writesDepth,
  type Frame3D,
  type Item3D,
  type MeshItem,
  type PointsItem,
} from "./render-types";
import { UNIFORM_BYTES, itemUniforms } from "./shaders";
import { MERGED_KEY, createDepthSorter, itemCenter, mergeMeshes } from "./sort";

const W = 600;
const H = 400;
const FIT: FitRect = { x: 40, y: 20, width: 520, height: 340 };
const close = (a: number, b: number) => expect(a).toBeCloseTo(b, 5);

const colors = (): GeometryColors => ({
  series: [
    [1, 0, 0, 1],
    [0, 1, 0, 1],
  ],
  resolve: () => [1, 1, 0, 1],
  lut: colorLut(colorStops("viridis")),
  wire: [0, 0, 0, 0.4],
});

/** Camera frame of a model (its box proportions) */
const frameOf = (model: Model3D, azimuth = 35) =>
  cameraFrame(
    { ...DEFAULT_CAMERA, azimuth, elevation: 24, pan: [0, 0] },
    [model.x.half, model.y.half, model.z.half],
    W,
    H,
    FIT,
  );

/** Renderer frame of a camera frame */
const frame3d = (f: ReturnType<typeof frameOf>): Frame3D => ({
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
  fog: [0, 0, 0, 1],
  exposure: 1,
});

describe("thinned point clouds (CPU backend)", () => {
  const n = 100_000;
  // every point in a corner but two: #1 at the center (thinned out) and
  // #999 at the opposite corner (kept: 999 is a multiple of the stride 3)
  const x = new Float32Array(n).fill(-1);
  const y = new Float32Array(n).fill(-1);
  const z = new Float32Array(n).fill(-1);
  x[1] = y[1] = z[1] = 0;
  x[999] = y[999] = z[999] = 1;
  const model = buildModel({
    series: [{ data: { x, y, z }, pointSize: 8 }],
    xAxis: { min: -1, max: 1 },
    yAxis: { min: -1, max: 1 },
    zAxis: { min: -1, max: 1 },
  });

  it("keeps 1 point out of n within the budget", () => {
    const g = createGeometryBuilder()(model, colors(), CPU_BUDGET, 1);
    const item = g.items[0] as PointsItem;
    const target = g.targets[0] as PointTarget;
    expect(item.count).toBeLessThanOrEqual(CPU_BUDGET.maxPoints);
    expect(item.thinned).toBe(3);
    expect(target.count).toBe(item.count);
    expect(target.source?.[0]).toBe(0);
    expect(target.source?.[333]).toBe(999);
    // the summary counts the data
    expect(g.counts[0]).toBe(n);
  });

  it("only hovers the points it draws", () => {
    const f = frameOf(model);
    const center = project(f, 0, 0, 0);
    const cpu = createGeometryBuilder()(model, colors(), CPU_BUDGET, 1);
    const cpuTargets = cpu.targets as PointTarget[];
    const cpuIndex = buildPointIndex(cpuTargets, f);
    expect(pickPoint(cpuIndex, cpuTargets, center.x, center.y)).toBeNull();
    const corner = project(
      f,
      toWorld(model.x, 1),
      toWorld(model.y, 1),
      toWorld(model.z, 1),
    );
    const hit = pickPoint(cpuIndex, cpuTargets, corner.x, corner.y)!;
    expect(cpuTargets[0]!.source?.[hit.point]).toBe(999);

    const gpu = createGeometryBuilder()(model, colors(), GPU_BUDGET, 1);
    const gpuTargets = gpu.targets as PointTarget[];
    expect(gpuTargets[0]!.count).toBe(n);
    const all = buildPointIndex(gpuTargets, f);
    expect(pickPoint(all, gpuTargets, center.x, center.y)?.point).toBe(1);
  });
});

describe("point styles", () => {
  it("packs the colors of a 0xRRGGBB column", () => {
    const model = buildModel({
      series: [
        {
          data: { x: [0, 1], y: [0, 1], z: [0, 1], color: [0x112233, NaN] },
        },
      ],
    });
    const g = createGeometryBuilder()(model, colors(), GPU_BUDGET, 1);
    const t = g.targets[0] as PointTarget;
    expect(t.packed?.[4]).toBe(0xff332211);
    // NaN: the series color
    expect(t.packed?.[9]).toBe(0xff0000ff);
  });

  it("maps the style and the blending to the item and the uniforms", () => {
    const model = buildModel({
      series: [
        {
          data: [[0, 0, 0]],
          pointStyle: "glow",
          blend: "additive",
        },
        { data: [[0, 0, 0]], pointStyle: "disc" },
      ],
    });
    const g = createGeometryBuilder()(model, colors(), GPU_BUDGET, 1);
    const glow = g.items[0] as PointsItem;
    const disc = g.items[1] as PointsItem;
    expect(glow.style).toBe(POINT_GLOW);
    expect(glow.additive).toBe(true);
    expect(writesDepth(glow)).toBe(false);
    expect(writesDepth(disc)).toBe(true);
    // depth-writing dots first
    expect(drawOrder([glow, disc])).toEqual([disc, glow]);
    // blended dots and transparent meshes share a pass
    expect(drawRank(glow)).toBe(2);
    expect(drawRank(disc)).toBe(1);
    const out = new Float32Array(UNIFORM_BYTES / 4);
    itemUniforms(glow, { ...frame3d(frameOf(model)), exposure: 1.5 }, out);
    expect(out[39]).toBe(1.5);
    itemUniforms(glow, frame3d(frameOf(model)), out);
    expect(out[23]).toBe(POINT_GLOW);
    expect(out[27]).toBe(1);
    itemUniforms(disc, frame3d(frameOf(model)), out);
    expect(out[23]).toBe(1);
    expect(out[27]).toBe(0);
  });

  it("draws a soft core and a gaussian halo", () => {
    const [center, white] = glowProfile(0, 4);
    expect(center).toBe(1);
    expect(white).toBeCloseTo(0.2);
    const [edge] = glowProfile(4, 4);
    expect(edge).toBeGreaterThan(0.25);
    expect(edge).toBeLessThan(0.35);
    expect(glowProfile(8.8, 4)[0]).toBeLessThan(0.005);
  });
});

/** A mesh of quads (4 vertices each) facing -y at the given y, one color */
const quadMesh = (
  key: string,
  ys: number[],
  rgba: [number, number, number, number],
  opacity: number,
): MeshItem => {
  const floats = VERTEX_STRIDE / 4;
  const vertices = new ArrayBuffer(ys.length * 4 * VERTEX_STRIDE);
  const f32 = new Float32Array(vertices);
  const u8 = new Uint8Array(vertices);
  const indices = new Uint32Array(ys.length * 6);
  ys.forEach((y, q) => {
    for (let k = 0; k < 4; k++) {
      const v = q * 4 + k;
      f32[v * floats] = k & 1 ? 0.5 : -0.5;
      f32[v * floats + 1] = y;
      f32[v * floats + 2] = k & 2 ? 0.5 : -0.5;
      f32[v * floats + 4] = -1;
      u8.set(rgba, v * VERTEX_STRIDE + 24);
    }
    const v = q * 4;
    indices.set([v, v + 1, v + 3, v, v + 3, v + 2], q * 6);
  });
  return {
    key,
    version: 1,
    kind: "mesh",
    opacity,
    vertices,
    vertexCount: ys.length * 4,
    indices,
  };
};

const RED: [number, number, number, number] = [255, 0, 0, 255];
const BLUE: [number, number, number, number] = [0, 0, 255, 255];

describe("transparent meshes across series", () => {
  const model = buildModel({ series: [{ data: [[0, 0, 0]] }] });
  // azimuth 0 looks along +y: the largest y is the farthest
  const front = frame3d(frameOf(model, 0));
  const back = frame3d(frameOf(model, 180));
  const firstVertices = (m: MeshItem) =>
    Array.from({ length: m.indices.length / 6 }, (_, q) => m.indices[q * 6]);

  it("merges the meshes, opacity baked into the colors", () => {
    const a = quadMesh("a", [-0.9, 0.9], RED, 0.5);
    const b = quadMesh("b", [0], BLUE, 0.8);
    const merged = mergeMeshes([a, b], MERGED_KEY, 1);
    expect(merged.vertexCount).toBe(12);
    expect(merged.opacity).toBe(1);
    expect(writesDepth(merged)).toBe(false);
    const u8 = new Uint8Array(merged.vertices);
    expect(u8[27]).toBe(128);
    expect(u8[8 * VERTEX_STRIDE + 27]).toBe(204);
    expect(merged.indices[12]).toBe(8);
  });

  it("sorts the quads of every transparent mesh together", () => {
    const sort = createDepthSorter();
    const lines: Item3D = {
      key: "l",
      version: 1,
      kind: "lines",
      opacity: 1,
      data: new ArrayBuffer(0),
      count: 0,
      width: 1,
      bias: 0,
    };
    const a = quadMesh("a", [-0.9, 0.9], RED, 0.5);
    const b = quadMesh("b", [0], BLUE, 0.8);
    const out = sort([a, lines, b], front);
    expect(out.map((i) => i.key)).toEqual([MERGED_KEY, "l"]);
    const merged = out[0] as MeshItem;
    // a's far quad, b, a's near quad
    expect(firstVertices(merged)).toEqual([4, 8, 0]);
    expect(sort([a, lines, b], front)[0]).toMatchObject({
      order: merged.order,
    });
    const turned = sort([a, lines, b], back)[0] as MeshItem;
    expect(firstVertices(turned)).toEqual([0, 8, 4]);
    expect(turned.order).not.toBe(merged.order);
  });

  it("orders meshes that can't be merged by depth", () => {
    const sort = createDepthSorter();
    const near = quadMesh("near", [-0.9], RED, 0.5);
    // a lone triangle: not made of quads
    const far: MeshItem = {
      ...quadMesh("far", [0.9], BLUE, 0.5),
      indices: new Uint32Array([0, 1, 2]),
    };
    expect(sort([near, far], front).map((i) => i.key)).toEqual(["far", "near"]);
    expect(sort([near, far], back).map((i) => i.key)).toEqual(["near", "far"]);
  });

  it("sorts the blended clouds with the transparent meshes", () => {
    const cloud = (key: string, y: number, opacity: number): PointsItem => {
      const data = new ArrayBuffer(2 * POINT_STRIDE);
      const f = new Float32Array(data);
      f.set([-0.5, y, 0, 4], 0);
      f.set([0.5, y, 0.2, 4], POINT_STRIDE / 4);
      return {
        key,
        version: 1,
        kind: "points",
        opacity,
        data,
        count: 2,
        perspective: true,
        style: POINT_DISC,
      };
    };
    const center = itemCenter(cloud("c", 0.9, 1));
    [0, 0.9, 0.1].forEach((v, k) => close(center[k]!, v));
    const sort = createDepthSorter();
    const near = quadMesh("near", [-0.9], RED, 0.5);
    const far = cloud("far", 0.9, 0.5);
    const keys = (items: readonly Item3D[]) => items.map((i) => i.key);
    expect(keys(sort([near, far], front))).toEqual(["far", "near"]);
    expect(keys(sort([near, far], back))).toEqual(["near", "far"]);
    // opaque dots keep their place
    const opaque = cloud("opaque", 0.9, 1);
    expect(keys(sort([near, opaque], front))).toEqual(["near", "opaque"]);
    // two blended clouds without meshes
    const other = cloud("other", -0.9, 0.5);
    expect(keys(sort([other, far], front))).toEqual(["far", "other"]);
    // merged meshes (center y = 0) and a far cloud
    const a = quadMesh("a", [-0.9, 0.9], RED, 0.5);
    const b = quadMesh("b", [0], BLUE, 0.5);
    expect(keys(sort([a, far, b], front))).toEqual(["far", MERGED_KEY]);
    expect(keys(sort([a, far, b], back))).toEqual([MERGED_KEY, "far"]);
  });
});

describe("Canvas2D smooth shading", () => {
  it("finds the axis of a value affine over a screen triangle", () => {
    const x: [number, number, number] = [0, 10, 0];
    const y: [number, number, number] = [0, 0, 10];
    expect(gradientAxis(x, y, [0, 10, 0])).toEqual({
      x0: 0,
      y0: 0,
      x1: 10,
      y1: 0,
      t: [0, 1, 0],
    });
    // s = x + y: from the origin to (5, 5)
    const diagonal = gradientAxis(x, y, [0, 10, 10])!;
    [diagonal.x0, diagonal.y0, diagonal.x1, diagonal.y1].forEach((v, i) =>
      close(v, i < 2 ? 0 : 5),
    );
    expect(diagonal.t).toEqual([0, 1, 1]);
    // constant value, degenerate triangle
    expect(gradientAxis(x, y, [3, 3, 3])).toBeNull();
    expect(gradientAxis([0, 5, 10], [0, 5, 10], [0, 1, 2])).toBeNull();
  });

  it("lights every vertex two-sided, as the GPU shaders", () => {
    const cell = quadMesh("cell", [0], RED, 1);
    const base: Frame3D = {
      ...frame3d(frameOf(buildModel({ series: [{ data: [[0, 0, 0]] }] }))),
      lighting: [0.25, 0.75, 0, 1],
      eye: [0, -5, 0],
    };
    // normals -y toward the eye, light along them: full diffuse
    const front = lightVertices(cell.vertices, 4, {
      ...base,
      light: [0, -1, 0],
    });
    for (let v = 0; v < 4; v++) {
      close(front[v * 3]!, 255);
      close(front[v * 3 + 1]!, 0);
    }
    // seen from behind: the normals turn around, the light behind is lost
    const back = lightVertices(cell.vertices, 4, {
      ...base,
      eye: [0, 5, 0],
      light: [0, -1, 0],
    });
    close(back[0]!, 255 * 0.25);
  });
});

describe("Canvas2D backend", () => {
  afterEach(() => vi.restoreAllMocks());

  /** A 2D context recording the fills and the state at each draw */
  const recorder = () => {
    const log: { op: string; fill: unknown; alpha: unknown; mode: unknown }[] =
      [];
    const state: Record<string | symbol, unknown> = {
      globalAlpha: 1,
      globalCompositeOperation: "source-over",
    };
    const record = (op: string) => () =>
      log.push({
        op,
        fill: state.fillStyle,
        alpha: state.globalAlpha,
        mode: state.globalCompositeOperation,
      });
    const ctx = new Proxy(state, {
      get(target, prop) {
        if (prop in target) return target[prop];
        if (prop === "fill" || prop === "fillRect" || prop === "drawImage")
          return record(prop);
        if (prop === "createLinearGradient")
          return (...axis: number[]) => {
            const stops: [number, string][] = [];
            return {
              axis,
              stops,
              addColorStop: (t: number, c: string) => stops.push([t, c]),
            };
          };
        if (prop === "createImageData")
          return (w: number, h: number) => ({
            data: new Uint8ClampedArray(w * h * 4),
          });
        return () => {};
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
    });
    return { ctx, log };
  };

  const start = () => {
    const { ctx, log } = recorder();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => ctx as never,
    );
    const canvas = document.createElement("canvas");
    const renderer = createCanvas2d3D(canvas)!;
    renderer.resize(W, H);
    return { renderer, log };
  };

  const model = buildModel({ series: [{ data: [[0, 0, 0]] }] });

  it("blends the transparent meshes of several series back to front", () => {
    const { renderer, log } = start();
    renderer.render(
      [quadMesh("a", [-0.9, 0.9], RED, 0.5), quadMesh("b", [0], BLUE, 0.5)],
      frame3d(frameOf(model, 0)),
    );
    const reds = log.map((e) => String(e.fill).startsWith("rgb(1"));
    // two triangles per quad: a's far quad, b, a's near quad
    expect(reds).toEqual([true, true, false, false, true, true]);
  });

  it("shades surface triangles with their vertex normals (no facets)", () => {
    const { renderer, log } = start();
    // one grid cell bent out of its plane, smooth normals all facing -y
    const cell = quadMesh("cell", [0], RED, 1);
    new Float32Array(cell.vertices)[(VERTEX_STRIDE / 4) * 1 + 1] = 0.4;
    const s = Math.SQRT1_2;
    const lit: Frame3D = { ...frame3d(frameOf(model)), light: [0, -s, s] };
    renderer.render([cell], lit);
    const fills = log.map((e) => e.fill);
    expect(fills).toHaveLength(2);
    // flat face normals would light the two triangles differently
    expect(fills[0]).toBe(fills[1]);
    log.length = 0;
    renderer.render([cell], { ...lit, light: [0, 0, 1] });
    expect(log[0]?.fill).not.toBe(fills[0]);
    renderer.destroy();
  });

  it("blends the lit corner colors of steep cells with a gradient", () => {
    const { renderer, log } = start();
    // a red to blue cell: the colors of a color-mapped steep slope
    const cell = quadMesh("cell", [0], RED, 1);
    const u8 = new Uint8Array(cell.vertices);
    u8.set([0, 0, 255, 255], 1 * VERTEX_STRIDE + 24);
    u8.set([0, 0, 255, 255], 3 * VERTEX_STRIDE + 24);
    renderer.render([cell], frame3d(frameOf(model)));
    expect(log).toHaveLength(2);
    for (const { fill } of log) {
      const { stops } = fill as { stops: [number, string][] };
      expect(stops).toHaveLength(3);
      // exact at the corners: the blue ones at the start, the red ones at the end
      const ends = new Set(
        stops.map(
          ([t, c]) => `${t}:${c.startsWith("rgb(0,0,") ? "blue" : "red"}`,
        ),
      );
      expect([...ends].sort()).toEqual(["0:blue", "1:red"]);
    }
    renderer.destroy();
  });

  it("draws glowing additive dots, denser when thinned", () => {
    const { renderer, log } = start();
    const g = createGeometryBuilder()(
      buildModel({
        series: [
          {
            data: [
              [0, 0, 0],
              [1, 1, 1],
            ],
            pointStyle: "glow",
            blend: "additive",
            opacity: 0.2,
          },
        ],
      }),
      colors(),
      GPU_BUDGET,
      1,
    );
    const item = { ...(g.items[0] as PointsItem), thinned: 4 };
    renderer.render([item], frame3d(frameOf(model)));
    expect(log.map((e) => e.op)).toEqual(["drawImage", "drawImage"]);
    expect(log.every((e) => e.mode === "lighter")).toBe(true);
    // 4 dots spread around: twice as large, the same density of light
    const alphas = log.map((e) => e.alpha as number);
    for (const a of alphas) {
      expect(a).toBeGreaterThan(0.1);
      expect(a).toBeLessThanOrEqual(0.2);
    }
    // exposure scales the added light
    log.length = 0;
    renderer.render([item], { ...frame3d(frameOf(model)), exposure: 0.5 });
    log.forEach((e, i) => close(e.alpha as number, alphas[i]! / 2));
    renderer.destroy();
  });

  it("draws small dots as soft sprites, denser when thinned", () => {
    const { renderer, log } = start();
    const g = createGeometryBuilder()(
      buildModel({
        series: [
          {
            data: [
              [0, 0, 0],
              [1, 1, 1],
            ],
            pointStyle: "disc",
            pointSize: 2,
            opacity: 0.1,
          },
        ],
      }),
      colors(),
      GPU_BUDGET,
      1,
    );
    const item = g.items[0] as PointsItem;
    renderer.render([item], frame3d(frameOf(model)));
    expect(log.map((e) => e.op)).toEqual(["drawImage", "drawImage"]);
    expect(log.every((e) => e.mode === "source-over")).toBe(true);
    const single = log.map((e) => e.alpha as number);
    log.length = 0;
    renderer.render([{ ...item, thinned: 10 }], frame3d(frameOf(model)));
    // 10 dots over 9 × the area: 1 − 0.9^(10 / 9)
    log.forEach((e, i) => {
      expect(e.alpha as number).toBeGreaterThan(single[i]!);
      expect(e.alpha as number).toBeLessThan(0.2);
    });
    renderer.destroy();
  });
});

describe("Canvas2D thinned dots", () => {
  it("spreads the light of the dropped additive dots", () => {
    expect(thinnedDot(0.1, 1, true)).toEqual({ alpha: 0.1, grow: 1 });
    // 4 dots: twice the radius, the same light per area
    expect(thinnedDot(0.1, 4, true)).toEqual({ alpha: 0.1, grow: 2 });
    // 25 dots: the radius is capped, the alpha takes the rest
    const many = thinnedDot(0.1, 25, true);
    expect(many.grow).toBe(3);
    close(many.alpha * many.grow * many.grow, 0.1 * 25);
    expect(thinnedDot(0.5, 100, true)).toEqual({ alpha: 1, grow: 3 });
    expect(thinnedDot(0, 10, true)).toEqual({ alpha: 0, grow: 1 });
  });

  it("stacks the coverage of the dropped blended dots", () => {
    expect(thinnedDot(0.3, 1, false)).toEqual({ alpha: 0.3, grow: 1 });
    const spread = thinnedDot(0.1, 9, false);
    expect(spread.grow).toBe(3);
    close(spread.alpha, 0.1);
    // big markers don't grow: the k dots stack on them
    const kept = thinnedDot(0.3, 16, false, 1);
    expect(kept.grow).toBe(1);
    close(kept.alpha, 1 - Math.pow(0.7, 16));
    expect(thinnedDot(1, 1000, false).alpha).toBeCloseTo(1);
  });

  it("draws anti-aliased discs", () => {
    expect(discProfile(0, 4, 1)).toBe(1);
    expect(discProfile(4, 4, 1)).toBeCloseTo(0.5);
    expect(discProfile(4.6, 4, 1)).toBe(0);
    expect(discProfile(3.8, 4, 1)).toBeGreaterThan(discProfile(4.2, 4, 1));
  });
});
