import { describe, expect, it } from "vitest";
import {
  GLSL_COMPOSITE,
  TONE_KNEE,
  WGSL_COMPOSITE,
  oitComposite,
  oitFragment,
  oitWeight,
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

/** Accumulates fragments as the additive float targets do */
const accumulate = (
  fragments: {
    color: [number, number, number, number];
    depth: number;
    additive?: boolean;
  }[],
) => {
  const accum = [0, 0, 0, 0];
  const extra = [0, 0, 0, 0];
  for (const f of fragments) {
    const out = oitFragment(f.color, f.depth, !!f.additive);
    for (let i = 0; i < 4; i++) {
      accum[i]! += out.accum[i]!;
      extra[i]! += out.extra[i]!;
    }
  }
  return oitComposite(accum, extra);
};

const near = (a: readonly number[], b: readonly number[], digits = 5) =>
  a.forEach((v, i) => expect(v).toBeCloseTo(b[i]!, digits));

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
    // the nearer layer dominates
    expect(ab[0]).toBeGreaterThan(ab[2]!);
    // equal depths: a smooth mix (no seam where surfaces cross)
    const crossing = accumulate([
      { ...a, depth: 0.4 },
      { ...b, depth: 0.4 },
    ]);
    expect(crossing[0]! / crossing[2]!).toBeCloseTo(0.5 / 0.7);
  });

  it("keeps the alpha below 1 and the sums finite", () => {
    const out = oitFragment([1, 1, 1, 1], 0, false);
    expect(Number.isFinite(out.extra[3])).toBe(true);
    expect(out.accum[3]).toBeCloseTo(0.999 * 64);
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
});

describe("OIT shaders", () => {
  it("adds the transparency entry points", () => {
    for (const code of [WGSL_POINTS, WGSL_MESH]) {
      expect(code).toContain("fn fsOit(");
      expect(code).toContain("@location(1) extra");
      // reserved WGSL words
      expect(code).not.toMatch(/\btarget\b/);
    }
    expect(WGSL_COMPOSITE).not.toMatch(/\btarget\b/);
    expect(WGSL_COMPOSITE).toContain("textureLoad(extraTex");
    const oit = glslOitPrograms();
    expect(oit.points.fragment).toContain("layout(location = 1) out vec4");
    expect(oit.mesh.fragment).toContain("#define EMIT(c, d) emitOit(c, d)");
    expect(GLSL_COMPOSITE.fragment).toContain("texelFetch(u_extra");
    // the plain programs write one color
    expect(glslPrograms(2).mesh.fragment).toContain("fragColor = (c)");
    expect(glslPrograms(1).points.fragment).toContain("gl_FragColor = (c)");
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
