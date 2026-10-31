import { afterEach, describe, expect, it, vi } from "vitest";
import {
  HEAT_TABLE_SIZE,
  buildHeatGrid,
  createCanvasHeatField,
  createGlHeatField,
  createHeatFieldRenderer,
  createWebGpuHeatField,
  heatTable,
  paintHeatGrid,
  percentile,
  type HeatGridInput,
} from "./field";
import { tooltipHtml } from "./host";
import { glContextUsage, setGlContextBudget } from "../renderers/gl-budget";

afterEach(() => {
  vi.restoreAllMocks();
  document.body.textContent = "";
});

const COLD = 0xff000001;
const HOT = 0xff0000ff;
const LUT = new Uint32Array([COLD, 0xff000080, HOT]);

const input = (over: Partial<HeatGridInput> = {}): HeatGridInput => ({
  sources: [],
  step: 100,
  tick: 1,
  x0: 0,
  x1: 400,
  y0: 9.5,
  y1: 13.5,
  end: Infinity,
  maxWidth: 1000,
  maxHeight: 1000,
  ...over,
});

/** Size of a texel by column and price row */
const cell = (
  grid: NonNullable<ReturnType<typeof buildHeatGrid>>,
  column: number,
  bin: number,
) => {
  const tick = (grid.p1 - grid.p0) / grid.height;
  const row = Math.floor((grid.p1 - bin * tick) / tick);
  return grid.cells[row * grid.width + column];
};

describe("heat field", () => {
  it("keeps the older time columns untouched when a column arrives", () => {
    const older = [
      { time: 0, bins: [10, 12], sizes: [1, 3] },
      { time: 100, bins: [11], sizes: [2] },
    ];
    const before = buildHeatGrid(input({ sources: older }))!;
    const old = [0, 1].flatMap((column) =>
      [10, 11, 12, 13].map((bin) => cell(before, column, bin)),
    );
    // a new column (and a new book) arrives
    const after = buildHeatGrid(
      input({
        sources: [
          ...older.map((column) => ({ ...column, sizes: [...column.sizes] })),
          { time: 200, bins: [13, 14], sizes: [9, 4] },
        ],
      }),
    )!;
    const kept = [0, 1].flatMap((column) =>
      [10, 11, 12, 13].map((bin) => cell(after, column, bin)),
    );
    expect(kept).toEqual(old);
    // the new column only fills its own texel
    expect(cell(after, 2, 13)).toBe(9);
    expect(cell(after, 2, 14)).toBe(4);
  });

  it("ignores a column arriving after a newer one (no rewriting back)", () => {
    const grid = buildHeatGrid(
      input({
        sources: [
          { time: 0, bins: [10], sizes: [1] },
          { time: 100, bins: [10], sizes: [7] },
          // a late column, older than the last one
          { time: 50, bins: [10], sizes: [5] },
        ],
      }),
    )!;
    // columns are consumed in order: the late one cannot rewrite the texels
    // of the newer column, which keeps covering its span
    expect(cell(grid, 0, 10)).toBe(1);
    expect(cell(grid, 1, 10)).toBe(7);
    expect(cell(grid, 2, 10)).toBe(7);
    expect(cell(grid, 3, 10)).toBe(7);
  });
  it("rasterizes columns into abutting texels, filling gaps forward", () => {
    const grid = buildHeatGrid(
      input({
        sources: [
          { time: 0, bins: [10, 12], sizes: [1, 3] },
          // no column at 100 (a gap): the first one lasts until 200
          { time: 200, bins: [11], sizes: [2] },
          { time: 300, bins: [13], sizes: [5] },
        ],
      }),
    )!;
    expect(grid.width).toBe(4);
    // rows 10..14 (y1 = 13.5 rounds up to the row of 14): one texel each
    expect(grid.height).toBe(5);
    expect(grid.p0).toBe(9.5);
    expect(grid.p1).toBe(14.5);
    expect([grid.t0, grid.t1]).toEqual([0, 400]);
    expect(cell(grid, 0, 10)).toBe(1);
    expect(cell(grid, 0, 12)).toBe(3);
    expect(cell(grid, 1, 10)).toBe(1);
    expect(cell(grid, 1, 12)).toBe(3);
    expect(cell(grid, 2, 10)).toBe(0);
    expect(cell(grid, 2, 11)).toBe(2);
    expect(cell(grid, 3, 13)).toBe(5);
  });

  it("starts with the column before the view and stops at the live time", () => {
    const grid = buildHeatGrid(
      input({
        sources: [
          { time: -300, bins: [11], sizes: [4] },
          { time: 100, bins: [12], sizes: [6] },
        ],
        end: 250,
      }),
    )!;
    expect(cell(grid, 0, 11)).toBe(4);
    expect(cell(grid, 1, 12)).toBe(6);
    expect(cell(grid, 2, 12)).toBe(6);
    // after the live time: nothing (the cold color)
    expect(cell(grid, 3, 12)).toBe(0);
  });

  it("max-pools dense data down to the size limits", () => {
    const sources = Array.from({ length: 40 }, (_, i) => ({
      time: i * 10,
      bins: [i % 20],
      sizes: [i + 1],
    }));
    const grid = buildHeatGrid(
      input({
        sources,
        step: 10,
        x1: 400,
        y0: 0,
        y1: 19,
        maxWidth: 10,
        maxHeight: 5,
      }),
    )!;
    expect(grid.width).toBeLessThanOrEqual(10);
    expect(grid.height).toBeLessThanOrEqual(5);
    let max = 0;
    for (const v of grid.cells) max = Math.max(max, v);
    expect(max).toBe(40);
    // reusing the buffers
    const again = buildHeatGrid(
      input({ sources, step: 10, y0: 0, y1: 19, maxWidth: 10, maxHeight: 5 }),
      grid,
    )!;
    expect(again.cells).toBe(grid.cells);
    expect(again.version).toBe(grid.version + 1);
  });

  it("rejects invalid ranges", () => {
    expect(buildHeatGrid(input({ x1: 0 }))).toBeNull();
    expect(buildHeatGrid(input({ tick: 0 }))).toBeNull();
    expect(buildHeatGrid(input({ y0: NaN }))).toBeNull();
  });

  it("paints empty cells with the cold color, sizes through the table", () => {
    const table = heatTable(LUT, (r) => r);
    expect(table.length).toBe(HEAT_TABLE_SIZE + 1);
    expect(table[0]).toBe(COLD);
    expect(table[HEAT_TABLE_SIZE]).toBe(HOT);
    const grid = buildHeatGrid(
      input({ sources: [{ time: 0, bins: [10, 11], sizes: [10, 40] }] }),
    )!;
    const version = grid.version;
    paintHeatGrid(grid, table, HEAT_TABLE_SIZE / 10);
    expect(grid.version).toBe(version + 1);
    const pixel = (column: number, bin: number) => {
      const row = Math.floor(grid.p1 - bin);
      return grid.pixels[row * grid.width + column];
    };
    // 10 / 10: the hottest color; 40 / 10: clamped to it; empty: cold
    expect(pixel(0, 10)).toBe(HOT);
    expect(pixel(0, 11)).toBe(HOT);
    expect(pixel(0, 12)).toBe(COLD);
    expect(pixel(3, 10)).toBe(HOT);
    // a missing scale paints everything cold (never transparent)
    paintHeatGrid(grid, table, NaN);
    expect([...grid.pixels].every((p) => p === COLD)).toBe(true);
  });

  it("takes robust percentiles of the positive values", () => {
    expect(percentile([0, 0], 0.98)).toBeNaN();
    const values = Array.from({ length: 101 }, (_, i) => i);
    expect(percentile(values, 0.5)).toBeCloseTo(50.5);
    expect(percentile(values, 1)).toBe(100);
    // sampled: still close
    const many = new Float32Array(100_000).map((_, i) => (i % 1000) + 1);
    expect(percentile(many, 0.98, 4096)).toBeGreaterThan(950);
    expect(percentile(many, 0.98, 4096)).toBeLessThanOrEqual(1000);
  });
});

describe("heat field renderers", () => {
  const fake2d = () => {
    const calls: string[] = [];
    const ctx = new Proxy({} as Record<string, unknown>, {
      get(target, key: string) {
        if (key in target) return target[key];
        if (key === "createImageData")
          return (w: number, h: number) => ({
            data: new Uint8ClampedArray(w * h * 4),
          });
        return (...args: unknown[]) => {
          calls.push(`${key}:${args.length}`);
        };
      },
      set(target, key: string, value) {
        target[key] = value;
        return true;
      },
    });
    return { ctx, calls };
  };

  it("draws the image without smoothing over a cold clear (Canvas2D)", () => {
    const { ctx, calls } = fake2d();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (() => ctx) as never,
    );
    const canvas = document.createElement("canvas");
    const field = createCanvasHeatField(canvas)!;
    expect(field.kind).toBe("canvas2d");
    field.resize(200, 100);
    expect([canvas.width, canvas.height]).toEqual([200, 100]);
    const grid = buildHeatGrid(
      input({ sources: [{ time: 0, bins: [10], sizes: [1] }] }),
    )!;
    paintHeatGrid(
      grid,
      heatTable(LUT, (r) => r),
      100,
    );
    field.render(grid, [0, 0, 200, 100], [0.1, 0.2, 0.3, 1]);
    expect(ctx.fillStyle).toBe("rgb(26, 51, 77)");
    expect(ctx.imageSmoothingEnabled).toBe(false);
    expect(calls).toContain("fillRect:4");
    expect(calls).toContain("putImageData:3");
    expect(calls).toContain("drawImage:5");
    // unchanged grid: no new upload
    const uploads = calls.filter((c) => c.startsWith("putImageData")).length;
    field.render(grid, [0, 0, 200, 100], [0, 0, 0, 1]);
    expect(calls.filter((c) => c.startsWith("putImageData")).length).toBe(
      uploads,
    );
    field.render(null, [0, 0, 0, 0], [0, 0, 0, 1]);
    field.destroy();
  });

  it("falls back to Canvas2D when no GPU context exists", async () => {
    const { ctx } = fake2d();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
      kind: string,
    ) => (kind === "2d" ? ctx : null)) as never);
    const canvases: HTMLCanvasElement[] = [];
    const field = await createHeatFieldRenderer(
      "auto",
      () => {
        const c = document.createElement("canvas");
        canvases.push(c);
        return c;
      },
      () => {},
    );
    expect(field?.kind).toBe("canvas2d");
    // a fresh canvas per attempt
    expect(new Set(canvases).size).toBe(canvases.length);
    expect(
      createGlHeatField(document.createElement("canvas"), "webgl2", () => {}),
    ).toBeNull();
    expect(
      await createWebGpuHeatField(document.createElement("canvas"), () => {}),
    ).toBeNull();
    expect(
      await createHeatFieldRenderer(
        "canvas2d",
        () => canvases[0]!,
        () => {},
        new Set(["canvas2d"]),
      ),
    ).toBeNull();
  });

  /**
   * WebGL context double: records the calls, every query succeeds. With
   * `canvas`, WEBGL_lose_context works like the browser's (async events).
   */
  const fakeGl = (canvas?: HTMLCanvasElement) => {
    const calls: string[] = [];
    const listeners: Record<string, () => void> = {};
    let lost = false;
    const ext = canvas && {
      loseContext: () => {
        lost = true;
        setTimeout(() =>
          canvas.dispatchEvent(
            new Event("webglcontextlost", { cancelable: true }),
          ),
        );
      },
      restoreContext: () => {
        setTimeout(() => {
          lost = false;
          canvas.dispatchEvent(new Event("webglcontextrestored"));
        });
      },
    };
    /** A loss nobody asked for (GPU reset) */
    const crash = () => {
      lost = true;
      canvas?.dispatchEvent(
        new Event("webglcontextlost", { cancelable: true }),
      );
    };
    const gl = new Proxy({} as Record<string, unknown>, {
      get(_target, key: string) {
        if (key === "isContextLost") return () => lost;
        if (key === "getExtension")
          return (name: string) =>
            name === "WEBGL_lose_context" ? (ext ?? null) : null;
        if (key === "getParameter") return () => "Apple M3";
        if (/^[A-Z_0-9]+$/.test(key)) return key;
        return (...args: unknown[]) => {
          calls.push(key);
          return key.startsWith("get") ? true : { key, args };
        };
      },
    });
    return { gl, calls, listeners, crash };
  };

  it("draws one nearest-filtered textured quad without blending (WebGL)", () => {
    const { gl, calls } = fakeGl();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (() => gl) as never,
    );
    const canvas = document.createElement("canvas");
    const lost = vi.fn();
    const field = createGlHeatField(canvas, "webgl2", lost, true)!;
    expect(field.kind).toBe("webgl2");
    expect(calls.filter((c) => c === "texParameteri").length).toBe(4);
    field.resize(300, 150);
    const grid = buildHeatGrid(
      input({ sources: [{ time: 0, bins: [10], sizes: [1] }] }),
    )!;
    paintHeatGrid(
      grid,
      heatTable(LUT, (r) => r),
      100,
    );
    field.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
    expect(calls).toContain("disable");
    expect(calls).toContain("clearColor");
    expect(calls).toContain("texImage2D");
    expect(calls).toContain("drawArrays");
    // same size: a sub-image update; same version: none
    paintHeatGrid(
      grid,
      heatTable(LUT, (r) => r),
      50,
    );
    field.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
    expect(calls).toContain("texSubImage2D");
    const uploads = calls.length;
    field.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
    expect(calls.slice(uploads)).not.toContain("texSubImage2D");
    field.render(null, [0, 0, 0, 0], [0, 0, 0, 1]);
    canvas.dispatchEvent(new Event("webglcontextlost"));
    expect(lost).toHaveBeenCalledTimes(1);
    field.destroy();
    canvas.dispatchEvent(new Event("webglcontextlost"));
    expect(lost).toHaveBeenCalledTimes(1);
    field.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
  });

  it("joins the page-wide WebGL budget: suspensions redraw on restore, real losses fall back", async () => {
    const settle = () => new Promise((resolve) => setTimeout(resolve, 0));
    const KEY = Symbol.for("minerva-design.charts.gl-budget");
    delete (globalThis as Record<symbol, unknown>)[KEY];
    setGlContextBudget(1);
    try {
      const a = document.createElement("canvas");
      const b = document.createElement("canvas");
      const fa = fakeGl(a);
      const fb = fakeGl(b);
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
        function (this: HTMLCanvasElement) {
          return (this === a ? fa.gl : fb.gl) as never;
        } as never,
      );
      const lostA = vi.fn();
      const lostB = vi.fn();
      const fieldA = createGlHeatField(a, "webgl2", lostA)!;
      fieldA.resize(300, 150);
      const grid = buildHeatGrid(
        input({ sources: [{ time: 0, bins: [10], sizes: [1] }] }),
      )!;
      fieldA.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
      expect(fa.calls).toContain("drawArrays");
      // a second context past the budget suspends the first one
      const fieldB = createGlHeatField(b, "webgl2", lostB)!;
      expect(glContextUsage()).toEqual({ total: 2, suspended: 1 });
      await settle();
      // drawing a suspended context is skipped (no failure)
      const before = fa.calls.length;
      fieldA.render(grid, [0, 0, 300, 150], [0.1, 0, 0, 1]);
      expect(fa.calls.length).toBe(before);
      // the slot frees: A comes back, rebuilt, with its last frame
      fieldB.destroy();
      await settle();
      await settle();
      const redrawn = fa.calls.slice(before);
      expect(redrawn).toContain("createTexture");
      expect(redrawn).toContain("texImage2D");
      expect(redrawn).toContain("drawArrays");
      expect(lostA).not.toHaveBeenCalled();
      expect(lostB).not.toHaveBeenCalled();
      // a real loss reaches the heatmap (it falls back)
      fa.crash();
      expect(lostA).toHaveBeenCalledTimes(1);
      const after = fa.calls.length;
      fieldA.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
      expect(fa.calls.length).toBe(after);
      fieldA.destroy();
      expect(glContextUsage().total).toBe(0);
    } finally {
      delete (globalThis as Record<symbol, unknown>)[KEY];
    }
  });

  it("draws through a WebGPU pipeline, refusing fallback adapters on demand", async () => {
    const calls: string[] = [];
    const record =
      (name: string, result: unknown = {}) =>
      () => {
        calls.push(name);
        return result;
      };
    const pass = {
      setPipeline: record("setPipeline"),
      setBindGroup: record("setBindGroup"),
      draw: record("draw"),
      end: record("end"),
    };
    const device = {
      lost: new Promise(() => {}),
      createBindGroupLayout: record("layout"),
      createShaderModule: record("module"),
      createPipelineLayout: record("pipelineLayout"),
      createRenderPipeline: record("pipeline"),
      createSampler: record("sampler"),
      createBuffer: record("buffer", { destroy: record("bufferDestroy") }),
      createTexture: (desc: { size: { width: number; height: number } }) => {
        calls.push("texture");
        return {
          width: desc.size.width,
          height: desc.size.height,
          createView: record("view"),
          destroy: record("textureDestroy"),
        };
      },
      createBindGroup: record("bindGroup"),
      createCommandEncoder: () => ({
        beginRenderPass: () => pass,
        finish: record("finish"),
      }),
      queue: {
        writeTexture: record("writeTexture"),
        writeBuffer: record("writeBuffer"),
        submit: record("submit"),
      },
      destroy: record("deviceDestroy"),
    };
    let fallback = true;
    vi.stubGlobal("navigator", {
      gpu: {
        requestAdapter: async () => ({
          info: { isFallbackAdapter: fallback },
          requestDevice: async () => device,
        }),
        getPreferredCanvasFormat: () => "bgra8unorm",
      },
    });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (() => ({
        configure: record("configure"),
        unconfigure: record("unconfigure"),
        getCurrentTexture: () => ({ createView: record("view") }),
      })) as never,
    );
    try {
      const canvas = document.createElement("canvas");
      expect(await createWebGpuHeatField(canvas, () => {}, true)).toBeNull();
      fallback = false;
      const field = (await createWebGpuHeatField(canvas, () => {}, true))!;
      expect(field.kind).toBe("webgpu");
      field.resize(300, 150);
      const grid = buildHeatGrid(
        input({ sources: [{ time: 0, bins: [10], sizes: [1] }] }),
      )!;
      paintHeatGrid(
        grid,
        heatTable(LUT, (r) => r),
        100,
      );
      field.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
      expect(calls).toContain("writeTexture");
      expect(calls).toContain("draw");
      expect(calls).toContain("submit");
      const textures = calls.filter((c) => c === "texture").length;
      paintHeatGrid(
        grid,
        heatTable(LUT, (r) => r),
        10,
      );
      field.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
      // same size: the texture is kept
      expect(calls.filter((c) => c === "texture").length).toBe(textures);
      field.render(null, [0, 0, 0, 0], [0, 0, 0, 1]);
      field.destroy();
      expect(calls).toContain("deviceDestroy");
      field.render(grid, [0, 0, 300, 150], [0, 0, 0, 1]);
      // the selection: forced webgpu
      expect(
        (
          await createHeatFieldRenderer(
            "webgpu",
            () => canvas,
            () => {},
          )
        )?.kind,
      ).toBe("webgpu");
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe("tooltip badge", () => {
  it("shows the side as a dot and a text, without accent borders", () => {
    const tip = document.createElement("div");
    tooltipHtml(
      document,
      tip,
      { text: "12:00", badge: { text: "Bid side", color: "rgb(0, 128, 0)" } },
      [["Price", "100"]],
    );
    const badge = tip.querySelector(
      ".minerva-orderbook-tooltip-badge",
    ) as HTMLElement;
    expect(badge.textContent).toBe("Bid side");
    expect(badge.style.color).toBe("rgb(0, 128, 0)");
    expect((badge.firstElementChild as HTMLElement).style.borderRadius).toBe(
      "50%",
    );
    expect(tip.style.borderLeft).toBe("");
    // same content: not rebuilt
    const head = tip.firstElementChild;
    tooltipHtml(
      document,
      tip,
      { text: "12:00", badge: { text: "Bid side", color: "rgb(0, 128, 0)" } },
      [["Price", "100"]],
    );
    expect(tip.firstElementChild).toBe(head);
  });
});
