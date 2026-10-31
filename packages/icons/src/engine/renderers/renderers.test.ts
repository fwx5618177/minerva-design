import { afterEach, describe, expect, it, vi } from "vitest";
import { setDefaultIconRenderer } from "../defaults";
import type { IconDefinition } from "../types";
import { MeshAtlas, prepareFrame } from "./batch";
import { createIconBackend, iconRendererCandidates } from "./detect";
import { createGlBackend } from "./gl";
import { GLSL_VERTEX, WGSL } from "./shaders";
import { INSTANCE_FLOATS, type FrameItem, type IconFrame } from "./types";

interface Call {
  name: string;
  args: unknown[];
}

/** WebGL context double: records every call, constants are their names */
const fakeGl = ({
  renderer = "ANGLE (Apple, Apple M2, OpenGL 4.1)",
  instancing = true,
  version = 2,
}: { renderer?: string; instancing?: boolean; version?: 1 | 2 } = {}) => {
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
        if (version === 1 && key === "drawArraysInstanced") return undefined;
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

const plus: IconDefinition = { name: "plus", paths: ["M12 5v14", "M5 12h14"] };
const minus: IconDefinition = { name: "minus", paths: ["M5 12h14"] };

const item = (icon: IconDefinition, x = 0, alpha = 1): FrameItem => ({
  icon,
  x,
  y: 0,
  size: 24,
  rotation: 0,
  strokeWidth: 2,
  color: [1, 0.5, 0, alpha],
});

const frameOf = (...items: FrameItem[]): IconFrame => ({
  width: 200,
  height: 100,
  dpr: 2,
  items,
});

afterEach(() => {
  vi.restoreAllMocks();
  setDefaultIconRenderer("auto");
});

describe("prepareFrame", () => {
  it("packs premultiplied colors and decreasing depths, one run per mesh", () => {
    const atlas = new MeshAtlas();
    const { instances, runs } = prepareFrame(
      frameOf(item(plus), item(plus, 30, 0.5), item(minus, 60), item(plus, 90)),
      atlas,
    );
    expect(runs.map((r) => [r.instance, r.instances])).toEqual([
      [0, 2],
      [2, 1],
      [3, 1],
    ]);
    // the two plus runs share the mesh
    expect(runs[0]!.first).toBe(runs[2]!.first);
    const second = instances.subarray(INSTANCE_FLOATS, INSTANCE_FLOATS * 2);
    expect([...second]).toEqual([
      30,
      0,
      24,
      0,
      0.5,
      0.25,
      0,
      0.5,
      Math.fround(0.6),
    ]);
    const depths = [0, 1, 2, 3].map((i) => instances[i * INSTANCE_FLOATS + 8]!);
    expect([...depths].sort((a, b) => b - a)).toEqual(depths);
    expect(atlas.length).toBeGreaterThan(0);
  });

  it("skips invisible icons", () => {
    const { runs } = prepareFrame(
      frameOf(item(plus, 0, 0), { ...item(plus), size: 0 }),
      new MeshAtlas(),
    );
    expect(runs).toEqual([]);
  });
});

describe("backend selection", () => {
  it("orders candidates from the preference", () => {
    expect(iconRendererCandidates("auto")).toEqual([
      "webgpu",
      "webgl2",
      "webgl",
      "canvas2d",
    ]);
    expect(iconRendererCandidates("webgl")).toEqual(["webgl", "canvas2d"]);
    expect(iconRendererCandidates("auto", new Set(["webgl2"]))).toEqual([
      "webgpu",
      "webgl",
      "canvas2d",
    ]);
  });

  it("falls back along the chain, skipping software GPUs with auto", async () => {
    const software = fakeGl({ renderer: "Google SwiftShader" });
    const make = () =>
      canvasWith({ webgl2: software.gl, webgl: null, "2d": {} }).canvas;
    const auto = await createIconBackend("auto", make, () => {});
    expect(auto?.kind).toBe("canvas2d");
    // forced: a software WebGL2 is accepted
    const forced = await createIconBackend("webgl2", make, () => {});
    expect(forced?.kind).toBe("webgl2");
  });

  it("starts from the global default with auto", async () => {
    setDefaultIconRenderer("webgl");
    const gl = fakeGl({ version: 1 });
    const backend = await createIconBackend(
      undefined,
      () => canvasWith({ webgl: gl.gl, "2d": {} }).canvas,
      () => {},
    );
    expect(backend?.kind).toBe("webgl");
  });
});

describe("WebGL backends", () => {
  it("draws runs with native instancing (WebGL2), MSAA and a depth test", () => {
    const fake = fakeGl();
    const { canvas, getContext } = canvasWith({ webgl2: fake.gl });
    const backend = createGlBackend(canvas, 2, () => {}, true)!;
    expect(getContext).toHaveBeenCalledWith(
      "webgl2",
      expect.objectContaining({ antialias: true, depth: true }),
    );
    backend.render(frameOf(item(plus), item(plus, 30), item(minus, 60)));
    expect(canvas.width).toBe(400);
    expect(canvas.height).toBe(200);
    const draws = fake.named("drawArraysInstanced");
    expect(draws.map((c) => [c.args[0], c.args[3]])).toEqual([
      ["TRIANGLES", 2],
      ["TRIANGLES", 1],
    ]);
    expect(fake.named("depthFunc")[0]?.args).toEqual(["LESS"]);
    expect(fake.named("blendFunc")[0]?.args).toEqual([
      "ONE",
      "ONE_MINUS_SRC_ALPHA",
    ]);
    expect(fake.named("uniform2f")[0]?.args).toEqual(["u_viewport", 200, 100]);
    // the second run reads its instances from the right offset
    const pointers = fake
      .named("vertexAttribPointer")
      .filter((c) => c.args[0] === 1);
    expect(pointers.map((c) => c.args[5])).toEqual([0, 2 * 36]);
    backend.destroy();
    expect(fake.loseContext).toHaveBeenCalled();
  });

  it("uses ANGLE_instanced_arrays on WebGL, and refuses without it", () => {
    const fake = fakeGl({ version: 1 });
    const backend = createGlBackend(
      canvasWith({ webgl: fake.gl }).canvas,
      1,
      () => {},
      false,
    )!;
    expect(backend.kind).toBe("webgl");
    backend.render(frameOf(item(minus)));
    expect(fake.named("drawArraysInstancedANGLE")).toHaveLength(1);

    const bare = fakeGl({ version: 1, instancing: false });
    expect(
      createGlBackend(
        canvasWith({ webgl: bare.gl }).canvas,
        1,
        () => {},
        false,
      ),
    ).toBeNull();
  });

  it("uploads only the new meshes", () => {
    const fake = fakeGl();
    const backend = createGlBackend(
      canvasWith({ webgl2: fake.gl }).canvas,
      2,
      () => {},
      false,
    )!;
    backend.render(frameOf(item(plus)));
    const uploads = () =>
      fake.calls.filter(
        (c) =>
          (c.name === "bufferData" || c.name === "bufferSubData") &&
          c.args[0] === "ARRAY_BUFFER",
      ).length;
    const first = uploads();
    backend.render(frameOf(item(plus)));
    // only the instances again
    expect(uploads() - first).toBe(1);
    backend.render(frameOf(item(plus), item(minus)));
    expect(uploads() - first).toBe(3);
  });

  it("reports a lost context once", () => {
    const fake = fakeGl();
    const { canvas } = canvasWith({ webgl2: fake.gl });
    const onLost = vi.fn();
    createGlBackend(canvas, 2, onLost, false);
    canvas.dispatchEvent(new Event("webglcontextlost"));
    canvas.dispatchEvent(new Event("webglcontextlost"));
    expect(onLost).toHaveBeenCalledTimes(1);
  });
});

describe("shaders", () => {
  it("place icons the same way in GLSL and WGSL", () => {
    for (const source of [GLSL_VERTEX, WGSL]) {
      expect(source).toMatch(
        /- (vec2f\()?12\.0\)?\) \* \(a?_?box\.z \/ 24\.0\)/,
      );
      expect(source).toContain("-clip.y");
    }
  });
});
