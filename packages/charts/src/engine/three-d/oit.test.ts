import { describe, expect, it } from "vitest";
import {
  FRONT_CLEAR,
  GLSL_COMPOSITE,
  SCREEN_GAIN,
  TONE_KNEE,
  WGSL_COMPOSITE,
  oitComposite,
  oitFragment,
  oitFrontDepth,
  oitWeight,
  screenTone,
  shoulder,
  toneMap,
} from "./oit";
import {
  WGSL_MESH,
  WGSL_POINTS,
  glslOitPrograms,
  glslPrograms,
} from "./shaders";
import { webGl2Capabilities } from "./webgl";

type Rgba = [number, number, number, number];
interface Fragment {
  color: Rgba;
  depth: number;
  additive?: boolean;
}

/**
 * Accumulates the fragments of a pixel as the passes do: the front depth,
 * then the four additive float targets; `front` overrides the front depth
 * (`-1`: plain weighted blended OIT, every fragment behind the front)
 */
const accumulate = (fragments: Fragment[], front?: number) => {
  const depth = front ?? oitFrontDepth(fragments);
  const sums = {
    front: [0, 0, 0, 0],
    accum: [0, 0, 0, 0],
    extra: [0, 0, 0, 0],
    behind: [0, 0, 0, 0],
  };
  for (const f of fragments) {
    const out = oitFragment(f.color, f.depth, !!f.additive, depth);
    for (const key of ["front", "accum", "extra", "behind"] as const)
      for (let i = 0; i < 4; i++) sums[key][i]! += out[key][i]!;
  }
  return oitComposite(sums.accum, sums.extra, sums.front, sums.behind);
};

/** Exact back-to-front "over" of non-additive fragments */
const exact = (fragments: Fragment[]): Rgba => {
  const out: Rgba = [0, 0, 0, 0];
  for (const f of [...fragments].sort((a, b) => b.depth - a.depth)) {
    const a = f.color[3];
    for (let i = 0; i < 4; i++) out[i] = f.color[i]! + out[i]! * (1 - a);
  }
  return out;
};

const error = (a: readonly number[], b: readonly number[]) =>
  Math.max(...a.map((v, i) => Math.abs(v - b[i]!)));

const near = (a: readonly number[], b: readonly number[], digits = 5) =>
  a.forEach((v, i) => expect(v).toBeCloseTo(b[i]!, digits));

const layer = (
  rgb: [number, number, number],
  alpha: number,
  depth: number,
): Fragment => ({
  color: [rgb[0] * alpha, rgb[1] * alpha, rgb[2] * alpha, alpha],
  depth,
});

describe("order-independent transparency", () => {
  it("weights the near fragments more, within half-float range", () => {
    expect(oitWeight(0)).toBe(64);
    expect(oitWeight(1 / 12)).toBeCloseTo(32);
    expect(oitWeight(1)).toBe(64 / 4096);
    expect(oitWeight(2)).toBe(64 / 4096);
    expect(oitWeight(-1)).toBe(64);
    for (let d = 0; d < 1; d += 0.05)
      expect(oitWeight(d + 0.05)).toBeLessThanOrEqual(oitWeight(d));
  });

  it("composites one layer exactly", () => {
    // premultiplied red at alpha 0.6
    near(
      accumulate([{ color: [0.6, 0, 0, 0.6], depth: 0.3 }]),
      [0.6, 0, 0, 0.6],
    );
    near(accumulate([]), [0, 0, 0, 0]);
  });

  it("gives the same result in any order, and the alpha of the stack", () => {
    const a = {
      color: [0.5, 0, 0, 0.5] as [number, number, number, number],
      depth: 0.2,
    };
    const b = {
      color: [0, 0, 0.7, 0.7] as [number, number, number, number],
      depth: 0.6,
    };
    const ab = accumulate([a, b]);
    near(ab, accumulate([b, a]));
    // revealage: (1 − 0.5)(1 − 0.7)
    expect(ab[3]).toBeCloseTo(1 - 0.5 * 0.3);
    // two layers: the front one exact, the other behind it
    near(ab, exact([a, b]));
    // equal depths: a smooth mix (no seam where surfaces cross)
    const crossing = accumulate([
      { ...a, depth: 0.4 },
      { ...b, depth: 0.4 },
    ]);
    expect(crossing[0]! / crossing[2]!).toBeCloseTo(0.5 / 0.7);
    // plain weighted blending: the nearer layer dominates
    const plain = accumulate([a, b], -1);
    expect(plain[0]).toBeGreaterThan(plain[2]!);
  });

  it("keeps the nearest of far-apart layers exact (hybrid)", () => {
    const scenes: Fragment[][] = [
      // a faint layer far in front of a dense one
      [layer([1, 0, 0], 0.3, 0.1), layer([0, 0, 1], 0.9, 0.95)],
      [layer([1, 0, 0], 0.3, 0.55), layer([0, 0, 1], 0.9, 0.95)],
      // a dense layer in front of a faint one
      [layer([0, 1, 0], 0.8, 0.3), layer([1, 0, 0], 0.4, 0.7)],
    ];
    for (const scene of scenes) {
      const truth = exact(scene);
      expect(error(accumulate(scene), truth)).toBeLessThan(1e-6);
      expect(error(accumulate(scene, -1), truth)).toBeGreaterThan(0.05);
    }
    // three layers: the rest behind the front one is approximated
    const three = [
      layer([1, 0, 0], 0.4, 0.15),
      layer([0, 1, 0], 0.5, 0.5),
      layer([0, 0, 1], 0.7, 0.9),
    ];
    const truth = exact(three);
    const hybrid = error(accumulate(three), truth);
    expect(hybrid).toBeLessThan(error(accumulate(three, -1), truth));
    // only the layers behind the front one are approximated: the weighted
    // average cannot reach the exact back-to-front blend
    expect(hybrid).toBeLessThan(0.2);
  });

  it("finds the front layer from the visible non-additive fragments", () => {
    expect(oitFrontDepth([])).toBe(FRONT_CLEAR);
    expect(
      oitFrontDepth([
        { color: [0.5, 0, 0, 0.5], depth: 0.6 },
        { color: [0.5, 0, 0, 0.5], depth: 0.4 },
        // light and nearly invisible fragments don't count
        { color: [1, 1, 1, 1], depth: 0.1, additive: true },
        { color: [0, 0, 0, 0.01], depth: 0.2 },
      ]),
    ).toBe(0.4);
    expect(oitFrontDepth([{ color: [0, 0, 0, 1], depth: 3 }])).toBe(1);
  });

  it("clamps the alpha and keeps the sums finite", () => {
    // behind the front layer (explicit front depth): the weighted path
    const out = oitFragment([1, 1, 1, 1], 0.5, false, 0.1);
    expect(Number.isFinite(out.extra[3])).toBe(true);
    expect(out.accum[3]).toBeCloseTo(0.999 * oitWeight(0.5));
    // out of range input stays finite
    const wild = oitFragment([2, -1, 1, 1.5], 0.5, false, 0.1);
    for (const value of [...wild.accum, ...wild.extra])
      expect(Number.isFinite(value)).toBe(true);
    expect(wild.extra[3]).toBeCloseTo(-Math.log(1 - 0.999));
  });

  it("tone maps the additive light without clipping to white", () => {
    expect(shoulder(0.3)).toBe(0.3);
    expect(shoulder(TONE_KNEE)).toBe(TONE_KNEE);
    // continuous slope at the knee, monotonic, below 1
    expect((shoulder(TONE_KNEE + 1e-4) - TONE_KNEE) / 1e-4).toBeCloseTo(1, 3);
    expect(shoulder(2)).toBeGreaterThan(shoulder(1.5));
    expect(shoulder(5)).toBeLessThan(1);
    expect(shoulder(50)).toBeLessThanOrEqual(1);
    // dim light is unchanged
    near(toneMap([0.4, 0.2, 0.1]), [0.4, 0.2, 0.1]);
    // bright light keeps its hue
    const warm = toneMap([0.9, 0.6, 0.3]);
    expect(Math.max(...warm)).toBeLessThan(0.9);
    expect(warm[1] / warm[0]).toBeCloseTo(0.6 / 0.9);
    // very bright light: saturated, slightly whitened, never pure white
    const hot = toneMap([12, 6, 2]);
    expect(hot[0]).toBeLessThan(1);
    expect(hot[2]).toBeLessThan(hot[0]);
    expect(hot[2] / hot[0]).toBeGreaterThan(2 / 12);
    near(toneMap([0, 0, 0]), [0, 0, 0]);
  });

  it("composites the additive light behind the transparent layers", () => {
    const light = accumulate([
      { color: [0.3, 0.2, 0.1, 0.3], depth: 0.5, additive: true },
      { color: [0.3, 0.2, 0.1, 0.3], depth: 0.1, additive: true },
    ]);
    near(light, [0.6, 0.4, 0.2, 0.6]);
    const covered = accumulate([
      { color: [0.6, 0.4, 0.2, 0.6], depth: 0.5, additive: true },
      { color: [0, 0, 0.5, 0.5], depth: 0.1 },
    ]);
    near(covered, [0.3, 0.2, 0.6, 0.8]);
  });

  it("dims the light behind a surface, not the light in front of it", () => {
    const glow = (depth: number): Fragment => ({
      color: [0.5, 0.4, 0.3, 0.5],
      depth,
      additive: true,
    });
    const surface = layer([0, 0, 0], 0.8, 0.5);
    const behind = accumulate([glow(0.8), surface]);
    const inFront = accumulate([glow(0.2), surface]);
    // behind: through 20 % of transmittance
    near(behind, [0.1, 0.08, 0.06, 0.8 + 0.5 * 0.2]);
    // in front: the full light over the surface
    near(inFront, [0.5, 0.4, 0.3, 0.5 + 0.8 * 0.5]);
    // behind a layer and more layers behind it: dimmed by both
    const deeper = accumulate([glow(0.9), surface, layer([0, 0, 0], 0.5, 0.7)]);
    expect(deeper[0]).toBeLessThan(behind[0]!);
    expect(deeper[0]).toBeGreaterThan(0);
  });

  it("tone maps the screen-blended light (no float targets)", () => {
    expect(screenTone(0)).toBe(0);
    expect(screenTone(-1)).toBe(0);
    // close to the shoulder curve, below 1
    for (let x = 0.05; x < 4; x += 0.05)
      expect(Math.abs(screenTone(x) - shoulder(x))).toBeLessThan(0.07);
    expect(screenTone(20)).toBeLessThanOrEqual(1);
    // blending (one, one − src color): the curve of the sum
    let fb = 0;
    for (const x of [0.2, 0.5, 0.3])
      fb = screenTone(x) + fb * (1 - screenTone(x));
    expect(fb).toBeCloseTo(screenTone(1));
    expect(SCREEN_GAIN).toBeGreaterThan(1);
  });
});

describe("OIT shaders", () => {
  it("adds the transparency entry points", () => {
    for (const code of [WGSL_POINTS, WGSL_MESH]) {
      expect(code).toContain("fn fsOit(");
      expect(code).toContain("fn fsFront(");
      expect(code).toContain("@location(3) behind");
      expect(code).toContain("textureLoad(frontTex");
      // reserved WGSL words
      expect(code).not.toMatch(/\btarget\b/);
    }
    expect(WGSL_COMPOSITE).not.toMatch(/\btarget\b/);
    expect(WGSL_COMPOSITE).toContain("textureLoad(behindTex");
    const oit = glslOitPrograms();
    expect(oit.points.fragment).toContain("layout(location = 3) out vec4");
    expect(oit.mesh.fragment).toContain("#define EMIT(c, d) emitOit(c, d)");
    expect(oit.mesh.fragment).toContain("texelFetch(u_front");
    expect(oit.front.points.fragment).toContain("emitFront(c, d)");
    expect(oit.front.mesh.fragment).not.toContain("o_accum");
    expect(GLSL_COMPOSITE.fragment).toContain("texelFetch(u_behind");
    // the plain programs write one color, the light screen blended
    expect(glslPrograms(2).mesh.fragment).toContain(
      "fragColor = screenLight(c)",
    );
    expect(glslPrograms(1).points.fragment).toContain(
      "gl_FragColor = screenLight(c)",
    );
    expect(glslPrograms(1).points.fragment).not.toContain("layout");
  });
});

describe("WebGL2 capabilities", () => {
  const fakeGl = (float: boolean, samples: number[], max = 8) =>
    ({
      MAX_SAMPLES: 1,
      RENDERBUFFER: 2,
      RGBA16F: 3,
      SAMPLES: 4,
      getParameter: () => max,
      getExtension: (name: string) =>
        name === "EXT_color_buffer_float" && float ? {} : null,
      getInternalformatParameter: () => Int32Array.from(samples),
    }) as unknown as WebGL2RenderingContext;

  it("needs multisampled float color buffers", () => {
    expect(webGl2Capabilities(fakeGl(false, [8, 4]))).toEqual({
      samples: 4,
      orderIndependent: false,
    });
    expect(webGl2Capabilities(fakeGl(true, [8, 4, 2]))).toEqual({
      samples: 4,
      orderIndependent: true,
    });
    // fewer float samples: the color follows
    expect(webGl2Capabilities(fakeGl(true, [2]))).toEqual({
      samples: 2,
      orderIndependent: true,
    });
    // float color buffers that can't be multisampled
    expect(webGl2Capabilities(fakeGl(true, []))).toEqual({
      samples: 4,
      orderIndependent: false,
    });
    // no multisampling at all
    expect(webGl2Capabilities(fakeGl(true, [], 0))).toEqual({
      samples: 0,
      orderIndependent: true,
    });
  });
});
