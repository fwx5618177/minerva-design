import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { claimGlSlot, glContextUsage, setGlContextBudget } from "./gl-budget";
import type { LineItem, RenderFrame } from "./types";
import { createWebGlRenderer } from "./webgl";

/**
 * A canvas whose WebGL context can be lost and restored like with
 * WEBGL_lose_context: the events are dispatched on a later task.
 */
const fakeContext = ({ loseExtension = true } = {}) => {
  const canvas = document.createElement("canvas");
  let lost = false;
  const ext = {
    loseContext: vi.fn(() => {
      lost = true;
      setTimeout(() =>
        canvas.dispatchEvent(
          new Event("webglcontextlost", { cancelable: true }),
        ),
      );
    }),
    restoreContext: vi.fn(() => {
      setTimeout(() => {
        lost = false;
        canvas.dispatchEvent(new Event("webglcontextrestored"));
      });
    }),
  };
  const gl = {
    getExtension: (name: string) =>
      name === "WEBGL_lose_context" && loseExtension ? ext : null,
    isContextLost: () => lost,
  } as unknown as WebGLRenderingContext;
  /** A loss the budget didn't ask for (GPU reset, browser eviction) */
  const crash = () => {
    lost = true;
    canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
  };
  return { canvas, gl, ext, crash };
};

const hooks = () => ({
  suspend: vi.fn<() => void>(),
  restore: vi.fn<() => void>(),
  lost: vi.fn<() => void>(),
});

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

/** IntersectionObserver double: `show(canvas, visible)` reports an entry */
let observed: { callback: IntersectionObserverCallback; targets: Set<Element> };
class FakeObserver {
  constructor(callback: IntersectionObserverCallback) {
    observed = { callback, targets: new Set() };
  }
  observe(target: Element) {
    observed.targets.add(target);
  }
  unobserve(target: Element) {
    observed.targets.delete(target);
  }
  disconnect() {}
}
const show = (target: Element, visible: boolean) =>
  observed.callback(
    [{ target, isIntersecting: visible } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  );

const KEY = Symbol.for("minerva-design.charts.gl-budget");

beforeEach(() => {
  delete (globalThis as Record<symbol, unknown>)[KEY];
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  setGlContextBudget(2);
});

afterEach(() => {
  delete (globalThis as Record<symbol, unknown>)[KEY];
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("WebGL context budget", () => {
  it("suspends the least recently drawn context past the budget, and restores it on use", async () => {
    const a = fakeContext();
    const b = fakeContext();
    const c = fakeContext();
    const ha = hooks();
    const hb = hooks();
    const slotA = claimGlSlot(a.canvas, a.gl, ha);
    const slotB = claimGlSlot(b.canvas, b.gl, hb);
    expect(slotA.use()).toBe(true);
    expect(slotB.use()).toBe(true);
    // A drawn again: B is now the least recently drawn
    slotA.use();
    claimGlSlot(c.canvas, c.gl, hooks());
    expect(hb.suspend).toHaveBeenCalledTimes(1);
    expect(b.ext.loseContext).toHaveBeenCalledTimes(1);
    expect(ha.suspend).not.toHaveBeenCalled();
    expect(glContextUsage()).toEqual({ total: 3, suspended: 1 });

    await settle(); // the lost event of B
    expect(hb.lost).not.toHaveBeenCalled();
    // B drawn again while A scrolled away: a restore makes room from A
    show(a.canvas, false);
    expect(slotB.use()).toBe(false);
    expect(ha.suspend).toHaveBeenCalledTimes(1);
    await settle(); // A lost
    await settle(); // B restored
    expect(b.ext.restoreContext).toHaveBeenCalledTimes(1);
    expect(hb.restore).toHaveBeenCalledTimes(1);
    expect(slotB.use()).toBe(true);
    expect(glContextUsage()).toEqual({ total: 3, suspended: 1 });
  });

  it("suspends off-screen contexts first and restores them when they come back", async () => {
    const a = fakeContext();
    const b = fakeContext();
    const c = fakeContext();
    const ha = hooks();
    const hb = hooks();
    claimGlSlot(a.canvas, a.gl, ha);
    const slotB = claimGlSlot(b.canvas, b.gl, hb);
    slotB.use();
    // A is older but on screen, B was just drawn but scrolled away
    show(a.canvas, true);
    show(b.canvas, false);
    claimGlSlot(c.canvas, c.gl, hooks());
    expect(hb.suspend).toHaveBeenCalledTimes(1);
    expect(ha.suspend).not.toHaveBeenCalled();
    await settle();
    // scrolling swaps them: B comes back, A goes away
    show(a.canvas, false);
    show(b.canvas, true);
    await settle();
    await settle();
    await settle();
    expect(hb.restore).toHaveBeenCalledTimes(1);
    expect(ha.suspend).toHaveBeenCalledTimes(1);
  });

  it("waits for the lost event before restoring a context resumed at once", async () => {
    const a = fakeContext();
    const b = fakeContext();
    const hb = hooks();
    setGlContextBudget(1);
    const slotB = claimGlSlot(b.canvas, b.gl, hb);
    claimGlSlot(a.canvas, a.gl, hooks());
    expect(hb.suspend).toHaveBeenCalledTimes(1);
    show(a.canvas, false);
    // same task: the lost event of B is not dispatched yet
    expect(slotB.use()).toBe(false);
    expect(b.ext.restoreContext).not.toHaveBeenCalled();
    await settle();
    await settle();
    expect(b.ext.restoreContext).toHaveBeenCalledTimes(1);
    await settle();
    expect(hb.restore).toHaveBeenCalledTimes(1);
  });

  it("never suspends an on-screen chart to restore another one", async () => {
    const a = fakeContext();
    const b = fakeContext();
    const ha = hooks();
    const hb = hooks();
    setGlContextBudget(1);
    const slotA = claimGlSlot(a.canvas, a.gl, ha);
    const slotB = claimGlSlot(b.canvas, b.gl, hb);
    await settle();
    // both on screen: A waits (blank) instead of taking B's slot
    for (let i = 0; i < 3; i++) {
      expect(slotA.use()).toBe(false);
      expect(slotB.use()).toBe(true);
    }
    expect(a.ext.restoreContext).not.toHaveBeenCalled();
    expect(hb.suspend).not.toHaveBeenCalled();
    // B leaves: A gets the slot back
    slotB.release();
    await settle();
    await settle();
    expect(ha.restore).toHaveBeenCalledTimes(1);
  });

  it("loses again a context restored after its chart was destroyed", async () => {
    const a = fakeContext();
    const b = fakeContext();
    setGlContextBudget(1);
    const slotB = claimGlSlot(b.canvas, b.gl, hooks());
    claimGlSlot(a.canvas, a.gl, hooks());
    await settle();
    show(a.canvas, false); // B is restored in its place
    expect(b.ext.restoreContext).toHaveBeenCalledTimes(1);
    slotB.release(); // destroyed before the restore arrives
    expect(b.ext.loseContext).toHaveBeenCalledTimes(1);
    await settle();
    expect(b.ext.loseContext).toHaveBeenCalledTimes(2);
  });

  it("reports real losses and leaves the budget", () => {
    const a = fakeContext();
    const ha = hooks();
    const slot = claimGlSlot(a.canvas, a.gl, ha);
    a.crash();
    expect(ha.lost).toHaveBeenCalledTimes(1);
    expect(glContextUsage().total).toBe(0);
    slot.release();
    expect(observed.targets.size).toBe(0);
  });

  it("reports a restore that never comes back as a loss", async () => {
    vi.useFakeTimers();
    const a = fakeContext();
    const b = fakeContext();
    const hb = hooks();
    setGlContextBudget(1);
    const slotB = claimGlSlot(b.canvas, b.gl, hb);
    claimGlSlot(a.canvas, a.gl, hooks());
    b.ext.restoreContext.mockImplementation(() => {});
    await vi.advanceTimersByTimeAsync(1);
    show(a.canvas, false);
    slotB.use();
    await vi.advanceTimersByTimeAsync(5000);
    expect(hb.lost).toHaveBeenCalledTimes(1);
    expect(hb.restore).not.toHaveBeenCalled();
  });

  it("leaves contexts without WEBGL_lose_context to the browser", () => {
    const a = fakeContext({ loseExtension: false });
    const ha = hooks();
    const slot = claimGlSlot(a.canvas, a.gl, ha);
    expect(slot.use()).toBe(true);
    expect(glContextUsage().total).toBe(0);
    a.crash();
    expect(ha.lost).toHaveBeenCalledTimes(1);
    slot.release();
  });

  it("releases its slot on destroy", () => {
    const slots = [fakeContext(), fakeContext()].map((f) =>
      claimGlSlot(f.canvas, f.gl, hooks()),
    );
    expect(glContextUsage().total).toBe(2);
    for (const slot of slots) slot.release();
    expect(glContextUsage()).toEqual({ total: 0, suspended: 0 });
  });
});

describe("WebGL backend in the budget", () => {
  /** Enough of a WebGL 1 context for the backend, with lose / restore */
  const glCanvas = () => {
    const { canvas, ext } = fakeContext();
    let lost = false;
    ext.loseContext.mockImplementation(() => {
      lost = true;
      setTimeout(() =>
        canvas.dispatchEvent(
          new Event("webglcontextlost", { cancelable: true }),
        ),
      );
    });
    ext.restoreContext.mockImplementation(() => {
      setTimeout(() => {
        lost = false;
        canvas.dispatchEvent(new Event("webglcontextrestored"));
      });
    });
    const draws = vi.fn();
    const compiled = vi.fn();
    const instancing = {
      vertexAttribDivisorANGLE() {},
      drawArraysInstancedANGLE: draws,
    };
    const methods: Record<string, (...args: unknown[]) => unknown> = {
      getExtension: (name) =>
        name === "WEBGL_lose_context"
          ? ext
          : name === "ANGLE_instanced_arrays"
            ? instancing
            : null,
      getParameter: () => "ANGLE (Apple, Apple M3, Metal)",
      createShader: () => ({}),
      createProgram: () => {
        compiled();
        return {};
      },
      createBuffer: () => ({}),
      getShaderParameter: () => true,
      getProgramParameter: () => true,
      getUniformLocation: (_p, name) => name,
      isContextLost: () => lost,
    };
    const gl = new Proxy(
      {},
      {
        get: (_t, key: string) =>
          /^[A-Z_0-9]+$/.test(key) ? key : (methods[key] ?? (() => undefined)),
      },
    );
    Object.defineProperty(canvas, "getContext", {
      value: (kind: string) => (kind === "webgl" ? gl : null),
    });
    return { canvas, draws, compiled };
  };

  const frame: RenderFrame = {
    transform: { xScale: 1, xOffset: 0, yScale: 1, yOffset: 0 },
    width: 100,
    height: 50,
    dpr: 1,
  };
  const line: LineItem = {
    kind: "line",
    key: "line",
    version: 1,
    color: [1, 0, 0, 1],
    points: new Float32Array([0, 0, 0.5, 0.5, 1, 0]),
    count: 3,
    width: 2,
    sorted: false,
  };

  it("redraws its last frame once a suspended context is restored", async () => {
    setGlContextBudget(1);
    const first = glCanvas();
    const onLost = vi.fn();
    const renderer = createWebGlRenderer(first.canvas, onLost)!;
    renderer.render([line], frame);
    expect(first.draws).toHaveBeenCalledTimes(1);
    const compiledOnce = first.compiled.mock.calls.length;

    // a second context suspends the first one
    const second = glCanvas();
    const other = createWebGlRenderer(second.canvas, vi.fn())!;
    show(second.canvas, false);
    await settle();
    renderer.render([line], frame); // asks for a restore, draws nothing yet
    expect(first.draws).toHaveBeenCalledTimes(1);
    await settle();
    await settle();
    await settle();
    // programs rebuilt, the last frame drawn again, no fallback
    expect(first.compiled.mock.calls.length).toBe(compiledOnce * 2);
    expect(first.draws).toHaveBeenCalledTimes(2);
    expect(onLost).not.toHaveBeenCalled();
    renderer.destroy();
    other.destroy();
    expect(glContextUsage().total).toBe(0);
  });
});
