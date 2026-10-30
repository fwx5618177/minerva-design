import { afterEach, describe, expect, it, vi } from "vitest";
import { glContextUsage, setGlContextBudget } from "../renderers/gl-budget";
import {
  POINT_GLOW,
  POINT_STRIDE,
  VERTEX_STRIDE,
  type Frame3D,
  type Item3D,
} from "./render-types";
import { createWebGl3D } from "./webgl";

/**
 * A WebGL context recording its calls: constants are distinct numbers,
 * objects are created on demand, shaders compile, framebuffers are complete.
 * WEBGL_lose_context loses / restores it with the events on a later task,
 * like the browser (`crash` is a loss nobody asked for).
 */
const fakeGl = (options: { float: boolean; samples?: number[] }) => {
  const calls: { name: string; args: unknown[] }[] = [];
  const constants = new Map<string, number>();
  const constant = (name: string) => {
    let value = constants.get(name);
    if (value === undefined) {
      value = 0x1000 + constants.size;
      constants.set(name, value);
    }
    return value;
  };
  const context = { canvas: null as HTMLCanvasElement | null, lost: false };
  const dispatch = (type: string) =>
    context.canvas?.dispatchEvent(new Event(type, { cancelable: true }));
  const crash = () => {
    context.lost = true;
    dispatch("webglcontextlost");
  };
  const returns: Record<string, (...args: unknown[]) => unknown> = {
    getExtension: (name) =>
      name === "EXT_color_buffer_float"
        ? options.float
          ? {}
          : null
        : name === "WEBGL_debug_renderer_info"
          ? null
          : {
              vertexAttribDivisorANGLE: () => {},
              drawArraysInstancedANGLE: () => {},
              loseContext: () => {
                context.lost = true;
                setTimeout(() => dispatch("webglcontextlost"));
              },
              restoreContext: () => {
                setTimeout(() => {
                  context.lost = false;
                  dispatch("webglcontextrestored");
                });
              },
            },
    getParameter: (p) =>
      p === constant("MAX_SAMPLES")
        ? 4
        : p === constant("RENDERER")
          ? "GPU"
          : 0,
    getInternalformatParameter: () => Int32Array.from(options.samples ?? [4]),
    getShaderParameter: () => true,
    getProgramParameter: () => true,
    checkFramebufferStatus: () => constant("FRAMEBUFFER_COMPLETE"),
    isContextLost: () => context.lost,
    getUniformLocation: () => ({}),
  };
  const gl = new Proxy(
    {},
    {
      get(_, prop) {
        if (typeof prop !== "string") return undefined;
        if (/^[A-Z0-9_]+$/.test(prop)) return constant(prop);
        return (...args: unknown[]) => {
          calls.push({ name: prop, args });
          const r = returns[prop];
          if (r) return r(...args);
          return prop.startsWith("create") ? { id: calls.length } : undefined;
        };
      },
    },
  );
  return { gl, calls, constant, context, crash };
};

const frame: Frame3D = {
  viewProj: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
  eye: [0, -4, 2],
  light: [0, 0, 1],
  orthographic: false,
  distance: 4,
  radius: 1.5,
  width: 200,
  height: 100,
  dpr: 1,
  lighting: [0.5, 0.5, 0.2, 16],
  fog: [0, 0, 0, 1],
  exposure: 1,
};

const mesh = (key: string, opacity: number): Item3D => ({
  key,
  version: 1,
  kind: "mesh",
  opacity,
  vertices: new ArrayBuffer(3 * VERTEX_STRIDE),
  vertexCount: 3,
  indices: new Uint32Array([0, 1, 2]),
});
const glow: Item3D = {
  key: "glow",
  version: 1,
  kind: "points",
  opacity: 0.3,
  data: new ArrayBuffer(POINT_STRIDE),
  count: 1,
  perspective: true,
  style: POINT_GLOW,
  additive: true,
};
const lines: Item3D = {
  key: "lines",
  version: 1,
  kind: "lines",
  opacity: 1,
  data: new ArrayBuffer(28),
  count: 1,
  width: 1,
  bias: 0,
};

const start = (
  version: 1 | 2,
  float: boolean,
  samples?: number[],
  onLost: () => void = () => {},
) => {
  const fake = fakeGl({ float, samples });
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockImplementation(() => fake.gl as never);
  const canvas = document.createElement("canvas");
  fake.context.canvas = canvas;
  const renderer = createWebGl3D(canvas, version, onLost)!;
  renderer.resize(200, 100);
  fake.calls.length = 0;
  return { ...fake, canvas, renderer, getContext };
};

const names = (calls: { name: string }[], wanted: readonly string[]) =>
  calls.map((c) => c.name).filter((n) => wanted.includes(n));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("WebGL2 order-independent transparency", () => {
  it("draws the blended items into float targets, then composites them", () => {
    const { renderer, calls, getContext, constant } = start(2, true);
    expect(renderer.orderIndependent).toBe(true);
    // multisampled by its own framebuffer
    expect(getContext.mock.calls[0]?.[1]).toMatchObject({ antialias: false });
    renderer.render(
      [lines, mesh("transparent", 0.5), glow, mesh("opaque", 1)],
      frame,
    );
    expect(
      names(calls, [
        "drawElements",
        "clearBufferfv",
        "drawArraysInstanced",
        "blitFramebuffer",
        "drawArrays",
      ]),
    ).toEqual([
      // opaque mesh into the multisampled framebuffer
      "drawElements",
      // transparency targets: the transparent mesh and the additive points
      "clearBufferfv",
      "clearBufferfv",
      "drawElements",
      "drawArraysInstanced",
      // resolved, composited, then the lines, then the canvas
      "blitFramebuffer",
      "blitFramebuffer",
      "drawArrays",
      "drawArraysInstanced",
      "blitFramebuffer",
    ]);
    // the transparency targets: two multisampled RGBA16F buffers
    const rgba16f = calls.filter(
      (c) =>
        c.name === "renderbufferStorageMultisample" &&
        c.args[2] === constant("RGBA16F"),
    );
    expect(rgba16f).toHaveLength(2);
    expect(rgba16f[0]?.args[1]).toBe(4);
    renderer.destroy();
  });

  it("reuses the targets until the size changes", () => {
    const { renderer, calls } = start(2, true);
    renderer.render([mesh("t", 0.5)], frame);
    const created = names(calls, ["createFramebuffer"]).length;
    expect(created).toBe(4);
    renderer.render([mesh("t", 0.5)], frame);
    expect(names(calls, ["createFramebuffer"]).length).toBe(created);
    renderer.resize(300, 100);
    renderer.render([mesh("t", 0.5)], frame);
    expect(names(calls, ["createFramebuffer"]).length).toBe(created * 2);
    expect(names(calls, ["deleteFramebuffer"]).length).toBe(4);
    renderer.destroy();
  });

  it("draws everything in one pass without blended items", () => {
    const { renderer, calls } = start(2, true);
    renderer.render([mesh("opaque", 1), lines], frame);
    expect(names(calls, ["clearBufferfv", "drawArrays"])).toEqual([]);
    expect(names(calls, ["blitFramebuffer"])).toEqual(["blitFramebuffer"]);
    renderer.destroy();
  });

  it("falls back to the sorted blending without float color buffers", () => {
    for (const { float, samples } of [
      { float: false, samples: [4] },
      { float: true, samples: [] },
    ]) {
      const { renderer, calls } = start(2, float, samples);
      expect(renderer.orderIndependent).toBe(false);
      renderer.render([mesh("transparent", 0.5), glow], frame);
      expect(names(calls, ["clearBufferfv", "drawArrays"])).toEqual([]);
      expect(names(calls, ["drawElements", "drawArraysInstanced"])).toEqual([
        "drawElements",
        "drawArraysInstanced",
      ]);
      renderer.destroy();
    }
  });

  it("keeps WebGL 1 on the antialiased canvas", () => {
    const { renderer, calls, getContext } = start(1, true);
    expect(renderer.orderIndependent).toBe(false);
    expect(getContext.mock.calls[0]?.[1]).toMatchObject({ antialias: true });
    renderer.render([mesh("transparent", 0.5)], frame);
    expect(names(calls, ["blitFramebuffer", "createFramebuffer"])).toEqual([]);
    renderer.destroy();
  });
});

describe("WebGL context budget", () => {
  const KEY = Symbol.for("minerva-design.charts.gl-budget");
  /** IntersectionObserver double: `show(canvas, visible)` reports an entry */
  let report: IntersectionObserverCallback = () => {};
  class FakeObserver {
    constructor(callback: IntersectionObserverCallback) {
      report = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  const show = (target: Element, visible: boolean) =>
    report(
      [{ target, isIntersecting: visible } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  const settle = async () => {
    for (let i = 0; i < 4; i++) await new Promise((r) => setTimeout(r, 0));
  };
  const count = (calls: { name: string }[], name: string) =>
    calls.filter((c) => c.name === name).length;

  const setup = () => {
    delete (globalThis as Record<symbol, unknown>)[KEY];
    vi.stubGlobal("IntersectionObserver", FakeObserver);
    setGlContextBudget(1);
  };
  afterEach(() => {
    delete (globalThis as Record<symbol, unknown>)[KEY];
    vi.unstubAllGlobals();
  });

  it("suspends without failing, then rebuilds and redraws the last frame", async () => {
    setup();
    const onLost = vi.fn();
    const first = start(2, true, [4], onLost);
    const items = [mesh("opaque", 1), mesh("transparent", 0.5), glow];
    first.renderer.render(items, frame);
    const drawn = count(first.calls, "drawElements");
    expect(drawn).toBe(2);
    expect(count(first.calls, "createFramebuffer")).toBe(4);

    // a second chart takes the only slot: the first one is suspended
    const secondLost = vi.fn();
    const second = start(1, false, [4], secondLost);
    await settle();
    expect(first.context.lost).toBe(true);
    expect(glContextUsage()).toEqual({ total: 2, suspended: 1 });
    expect(onLost).not.toHaveBeenCalled();

    // drawn again while the other one is off-screen: restore, then redraw
    show(second.canvas, false);
    first.calls.length = 0;
    first.renderer.render(items, frame);
    expect(count(first.calls, "drawElements")).toBe(0);
    await settle();
    expect(first.context.lost).toBe(false);
    // programs (3 + 3 transparency ones), main and transparency targets
    expect(count(first.calls, "linkProgram")).toBe(6);
    expect(count(first.calls, "createFramebuffer")).toBe(4);
    expect(count(first.calls, "drawElements")).toBe(drawn);
    expect(count(first.calls, "drawArrays")).toBe(1);
    expect(first.renderer.orderIndependent).toBe(true);
    expect(onLost).not.toHaveBeenCalled();
    expect(secondLost).not.toHaveBeenCalled();

    first.renderer.destroy();
    second.renderer.destroy();
    expect(glContextUsage().total).toBe(0);
  });

  it("reports a real loss", () => {
    setup();
    const onLost = vi.fn();
    const { renderer, calls, crash } = start(2, true, [4], onLost);
    crash();
    expect(onLost).toHaveBeenCalledTimes(1);
    calls.length = 0;
    renderer.render([mesh("opaque", 1)], frame);
    expect(count(calls, "drawElements")).toBe(0);
    renderer.destroy();
    expect(glContextUsage().total).toBe(0);
  });
});
