import { afterEach, describe, expect, it, vi } from "vitest";
import { colorLut, colorStops } from "./colormap";
import { createCanvas2d3D, glowProfile } from "./canvas2d";
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
  POINT_GLOW,
  VERTEX_STRIDE,
  drawOrder,
  writesDepth,
  type Frame3D,
  type Item3D,
  type MeshItem,
  type PointsItem,
} from "./render-types";
import { UNIFORM_BYTES, itemUniforms } from "./shaders";
import { MERGED_KEY, createDepthSorter, mergeMeshes } from "./sort";

const W = 600;
const H = 400;
const FIT: FitRect = { x: 40, y: 20, width: 520, height: 340 };

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
    const out = new Float32Array(UNIFORM_BYTES / 4);
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
    // opacity 0.2 × √4, dimmed by the distance
    for (const e of log) {
      expect(e.alpha as number).toBeGreaterThan(0.2);
      expect(e.alpha as number).toBeLessThanOrEqual(0.4);
    }
    renderer.destroy();
  });
});
