import { afterEach, describe, expect, it, vi } from "vitest";
import { createRenderer } from "./detect";
import { GLSL1_AREA, GLSL1_BAR, GLSL1_LINE, GLSL1_SCATTER } from "./shaders";
import type { BarItem, LineItem, RenderFrame, ScatterItem } from "./types";
import { createWebGlRenderer } from "./webgl";

interface Call {
  name: string;
  args: unknown[];
}

/** WebGL 1 context double: records every call, constants are their names */
const fakeGl = ({
  renderer = "ANGLE (Apple, Apple M2, OpenGL 4.1)",
  instancing = true,
}: { renderer?: string; instancing?: boolean } = {}) => {
  const calls: Call[] = [];
  let lost = false;
  const ext = {
    vertexAttribDivisorANGLE: (...args: unknown[]) =>
      calls.push({ name: "vertexAttribDivisorANGLE", args }),
    drawArraysInstancedANGLE: (...args: unknown[]) =>
      calls.push({ name: "drawArraysInstancedANGLE", args }),
  };
  const loseContext = vi.fn(() => {
    lost = true;
  });
  const methods: Record<string, (...args: unknown[]) => unknown> = {
    getExtension: (name) =>
      name === "ANGLE_instanced_arrays"
        ? instancing
          ? ext
          : null
        : name === "WEBGL_lose_context"
          ? { loseContext }
          : name === "WEBGL_debug_renderer_info"
            ? { UNMASKED_RENDERER_WEBGL: "UNMASKED_RENDERER_WEBGL" }
            : null,
    getParameter: () => renderer,
    createShader: (type) => ({ type }),
    createProgram: () => ({}),
    createBuffer: () => ({ id: calls.length }),
    getShaderParameter: () => true,
    getProgramParameter: () => true,
    getUniformLocation: (_p, name) => name,
    isContextLost: () => lost,
  };
  const gl = new Proxy(
    {},
    {
      get: (_target, key: string) => {
        if (/^[A-Z_0-9]+$/.test(key)) return key;
        const method = methods[key];
        return (...args: unknown[]) => {
          calls.push({ name: key, args });
          return method?.(...args);
        };
      },
    },
  );
  return {
    gl,
    calls,
    loseContext,
    named: (name: string) => calls.filter((c) => c.name === name),
  };
};

const canvasWith = (contexts: Record<string, unknown>) => {
  const canvas = document.createElement("canvas");
  const getContext = vi.fn((kind: string) => contexts[kind] ?? null);
  Object.defineProperty(canvas, "getContext", { value: getContext });
  return { canvas, getContext };
};

const frame = (x0: number, x1: number): RenderFrame => ({
  // relative x in [x0, x1] maps to clip [-1, 1]
  transform: {
    xScale: 2 / (x1 - x0),
    xOffset: -1 - (2 * x0) / (x1 - x0),
    yScale: 1,
    yOffset: 0,
  },
  width: 400,
  height: 200,
  dpr: 2,
});

const lineItem = (count: number, version = 1): LineItem => {
  const points = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    points[i * 2] = i;
    points[i * 2 + 1] = Math.sin(i);
  }
  return {
    kind: "line",
    key: "line",
    version,
    color: [1, 0, 0, 1],
    points,
    count,
    width: 2,
    sorted: true,
  };
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("GLSL ES 1.0 programs", () => {
  it("use no GLSL ES 3.0 syntax", () => {
    for (const program of [GLSL1_LINE, GLSL1_AREA, GLSL1_BAR, GLSL1_SCATTER]) {
      for (const source of [program.vertex, program.fragment]) {
        expect(source).not.toMatch(
          /#version|gl_VertexID|\bflat\b|\bin\s|\bout\s/,
        );
      }
      expect(program.vertex).toMatch(/attribute vec2 a_corner;/);
      expect(program.fragment).toMatch(/gl_FragColor/);
      // a uniform shared by both stages would need the same precision
      expect(program.fragment).not.toMatch(/uniform/);
    }
  });
});

describe("createWebGlRenderer", () => {
  it("returns null without a WebGL context or without instancing", () => {
    expect(createWebGlRenderer(canvasWith({}).canvas, () => {})).toBeNull();
    const fake = fakeGl({ instancing: false });
    const { canvas } = canvasWith({ webgl: fake.gl });
    expect(createWebGlRenderer(canvas, () => {})).toBeNull();
    expect(fake.loseContext).toHaveBeenCalled();
  });

  it("refuses software rasterizers only when hardware is required", () => {
    const soft = () => fakeGl({ renderer: "Google SwiftShader" });
    const required = soft();
    expect(
      createWebGlRenderer(
        canvasWith({ webgl: required.gl }).canvas,
        () => {},
        true,
      ),
    ).toBeNull();
    expect(required.loseContext).toHaveBeenCalled();
    const forced = createWebGlRenderer(
      canvasWith({ webgl: soft().gl }).canvas,
      () => {},
      false,
    );
    expect(forced?.kind).toBe("webgl");
  });

  it("requests the context with the hardware flag", () => {
    const { canvas, getContext } = canvasWith({ webgl: fakeGl().gl });
    createWebGlRenderer(canvas, () => {}, true);
    expect(getContext).toHaveBeenCalledWith(
      "webgl",
      expect.objectContaining({
        failIfMajorPerformanceCaveat: true,
        premultipliedAlpha: true,
        antialias: false,
      }),
    );
  });

  it("binds the per-vertex corner to location 0", () => {
    const fake = fakeGl();
    createWebGlRenderer(canvasWith({ webgl: fake.gl }).canvas, () => {});
    const bindings = fake.named("bindAttribLocation").map((c) => c.args);
    expect(bindings.filter(([, i]) => i === 0).map(([, , n]) => n)).toEqual([
      "a_corner",
      "a_corner",
      "a_corner",
      "a_corner",
    ]);
    expect(bindings.map(([, , n]) => n)).toContain("a_size");
  });

  it("draws the visible segments as one instanced draw and uploads once", () => {
    const fake = fakeGl();
    const renderer = createWebGlRenderer(
      canvasWith({ webgl: fake.gl }).canvas,
      () => {},
    )!;
    const item = lineItem(1000);
    renderer.render([item], frame(100, 200));
    const draws = fake.named("drawArraysInstancedANGLE");
    expect(draws).toHaveLength(1);
    // segments 99..200 (one before and the one crossing the right edge)
    expect(draws[0]!.args).toEqual(["TRIANGLE_STRIP", 0, 4, 101]);
    // the pointers start at the first visible instance (no base instance)
    const pointers = fake.named("vertexAttribPointer").map((c) => c.args);
    expect(pointers).toContainEqual([0, 2, "FLOAT", false, 0, 0]);
    expect(pointers).toContainEqual([1, 2, "FLOAT", false, 8, 99 * 8]);
    expect(pointers).toContainEqual([2, 2, "FLOAT", false, 8, 100 * 8]);
    const divisors = fake.named("vertexAttribDivisorANGLE").map((c) => c.args);
    expect(divisors).toContainEqual([0, 0]);
    expect(divisors).toContainEqual([1, 1]);
    // unused locations are reset (state is global without VAOs)
    expect(divisors).toContainEqual([3, 0]);
    expect(fake.named("disableVertexAttribArray").map((c) => c.args)).toEqual([
      [3],
    ]);
    // line width in device pixels / 2
    expect(fake.named("uniform4f").map((c) => c.args)).toContainEqual([
      "u_params",
      2,
      0,
      0,
      0,
    ]);

    const uploads = () => fake.named("bufferData").length;
    const before = uploads();
    renderer.render([item], frame(0, 50));
    expect(uploads()).toBe(before);
    renderer.render([{ ...item, version: 2 }], frame(0, 50));
    expect(uploads()).toBe(before + 1);
    renderer.render([], frame(0, 50));
    expect(fake.named("deleteBuffer")).toHaveLength(2);
  });

  it("reads bar and scatter colors as normalized unorm8x4", () => {
    const fake = fakeGl();
    const renderer = createWebGlRenderer(
      canvasWith({ webgl: fake.gl }).canvas,
      () => {},
    )!;
    const bar: BarItem = {
      kind: "bar",
      key: "bar",
      version: 1,
      color: [0, 0, 0, 1],
      instances: new ArrayBuffer(16 * 3),
      count: 3,
      halfWidth: 0.4,
      radius: 2,
      inset: 1,
      minHalf: 0.5,
      sorted: false,
    };
    const scatter: ScatterItem = {
      kind: "scatter",
      key: "scatter",
      version: 1,
      color: [0, 0, 0, 1],
      instances: new ArrayBuffer(16 * 5),
      count: 5,
      opacity: 0.8,
      stroke: 1,
    };
    renderer.render([bar, scatter], frame(0, 10));
    const pointers = fake.named("vertexAttribPointer").map((c) => c.args);
    expect(pointers).toContainEqual([2, 4, "UNSIGNED_BYTE", true, 16, 12]);
    expect(pointers).toContainEqual([3, 4, "UNSIGNED_BYTE", true, 16, 12]);
    expect(fake.named("uniform4f").map((c) => c.args)).toContainEqual([
      "u_params",
      0.4,
      2,
      1,
      0.5,
    ]);
    expect(
      fake.named("drawArraysInstancedANGLE").map((c) => c.args[3]),
    ).toEqual([3, 5]);
  });

  it("reports a lost context and stops drawing", () => {
    const fake = fakeGl();
    const onLost = vi.fn();
    const { canvas } = canvasWith({ webgl: fake.gl });
    const renderer = createWebGlRenderer(canvas, onLost)!;
    const event = new Event("webglcontextlost", { cancelable: true });
    canvas.dispatchEvent(event);
    expect(onLost).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
    renderer.render([lineItem(10)], frame(0, 10));
    expect(fake.named("drawArraysInstancedANGLE")).toHaveLength(0);
    renderer.destroy();
  });
});

describe("createRenderer", () => {
  it("falls back to WebGL when WebGPU and WebGL2 are unavailable", async () => {
    const fake = fakeGl();
    const tried: string[] = [];
    const renderer = await createRenderer(
      "auto",
      () => {
        const { canvas, getContext } = canvasWith({ webgl: fake.gl });
        getContext.mockImplementation((kind: string) => {
          tried.push(kind);
          return kind === "webgl" ? fake.gl : null;
        });
        return canvas;
      },
      () => {},
    );
    expect(renderer?.kind).toBe("webgl");
    expect(tried).toEqual(["webgl2", "webgl"]);
  });

  it("skips WebGL when it is excluded after a loss", async () => {
    const tried: string[] = [];
    const renderer = await createRenderer(
      "webgl",
      () => {
        const { canvas, getContext } = canvasWith({});
        getContext.mockImplementation((kind: string) => {
          tried.push(kind);
          return null;
        });
        return canvas;
      },
      () => {},
      new Set(["webgl"]),
    );
    expect(renderer).toBeNull();
    expect(tried).toEqual(["2d"]);
  });
});
