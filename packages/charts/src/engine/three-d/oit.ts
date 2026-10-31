// Order-independent transparency of the WebGPU and WebGL2 backends: a hybrid
// of an exact front layer and weighted blended OIT (McGuire & Bavoil 2013)
// behind it, and the tone mapping of the additive light.
//
// 1. Front pass: the blended (non-additive) items write the depth of their
//    visible fragments (alpha ≥ `FRONT_MIN_ALPHA`, depth 0 nearest … 1
//    farthest point of the box sphere) into a single-channel float target
//    cleared to `FRONT_CLEAR`, blended by `min`: the depth of the front-most
//    transparent layer of every pixel. No depth test: a transparent fragment
//    in front of the opaque scene is always nearer than a hidden one.
// 2. Main pass: every blended item, in any order, without writing depth,
//    into four float targets cleared to 0 and blended by plain addition:
//
//      front   rgba: Σ premultiplied color of the fragments of the front layer
//                    (at most `FRONT_EPSILON` behind its depth): exact
//      accum   rgb: Σ premultiplied color × w   a: Σ alpha × w (the rest)
//      extra   rgb: Σ additive light in front of the front layer
//              a:   Σ −ln(1 − alpha) of the rest (its revealage)
//      behind  rgb: Σ additive light behind the front layer
//
//    w favours the fragments near the camera (`oitWeight`). The revealage
//    Π(1 − alpha) is stored as the sum of its logarithms so that every
//    target uses the same additive blending (WebGL2 has no per-target blend
//    functions).
// 3. Composite over the opaque scene (`oitComposite`): the front layer over
//    the weighted average of the rest; the light behind the front layer,
//    attenuated by it and by the mean transmittance of the rest, under the
//    layers; the light in front of them over everything. Far-apart layers
//    stay exact for the nearest one (plain WBOIT lets the farther layers
//    bleed through), and glowing points behind a surface are dimmed by it.
//
// `toneMap` keeps the light below a knee and rolls the brighter light off
// towards 1 (Reinhard) by its largest channel (hue preserving), whitening
// only the very bright light a little: dense glowing clouds saturate
// gracefully instead of clipping to white. Without float targets (WebGL 1,
// Canvas2D), the light accumulates by screen blending, 1 − Π(1 − light):
// the exponential `1 − e^(−SCREEN_GAIN × Σ light)` of its sum, close to the
// same curve (`screenTone`); Canvas2D inverts it per pixel and applies
// `toneMap` exactly.

/** Weight of the closest fragments; halves every 1/12 of the depth range */
const WEIGHT_SCALE = 64;
const WEIGHT_FALLOFF = 12;
const WEIGHT_MIN = 0.01;
/** Largest alpha of a blended fragment (keeps −ln(1 − alpha) finite) */
const MAX_ALPHA = 0.999;
/** Light values below the knee are kept */
export const TONE_KNEE = 0.6;
/** Light values where the whitening starts / is full, and its amount */
const WHITE_FROM = 1;
const WHITE_TO = 6;
const WHITE_AMOUNT = 0.35;
/**
 * Depth (fraction of the box sphere diameter) within which the fragments
 * belong to the front layer: a few half-float steps
 */
export const FRONT_EPSILON = 2e-3;
/** Front depth of the pixels without transparent fragment */
export const FRONT_CLEAR = 4;
/** Fainter fragments don't define the front layer (soft edges, glows) */
export const FRONT_MIN_ALPHA = 0.05;
/**
 * Gain of the exponential tone curve of the screen-blended light (WebGL 1,
 * no float targets): 1 − e^(−1.4 x) stays within 0.06 of `toneMap`'s curve
 */
export const SCREEN_GAIN = 1.4;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Weight of a blended fragment at a depth (0 nearest … 1 farthest point of
 * the box sphere): 64 × 2^(−12 depth), at least 0.01. Accumulated in half
 * floats: about a thousand layers of the nearest fragments fit.
 */
export const oitWeight = (depth: number): number =>
  Math.max(
    WEIGHT_MIN,
    WEIGHT_SCALE * Math.pow(2, -WEIGHT_FALLOFF * clamp01(depth)),
  );

/**
 * Soft shoulder: identity below `TONE_KNEE`, then a Reinhard roll-off
 * towards 1 (never reached) with a continuous slope: bright regions keep a
 * gradient instead of a flat plateau
 */
export const shoulder = (x: number): number => {
  if (x <= TONE_KNEE) return x;
  const t = (x - TONE_KNEE) / (1 - TONE_KNEE);
  return TONE_KNEE + (1 - TONE_KNEE) * (t / (1 + t));
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * Tone mapping of additive light (linear, premultiplied), into `out` when
 * given (no allocation: per pixel on the CPU)
 */
export const toneMap = (
  rgb: readonly [number, number, number],
  out: [number, number, number] = [0, 0, 0],
): [number, number, number] => {
  const m = Math.max(rgb[0], rgb[1], rgb[2]);
  if (m <= 1e-6) {
    out[0] = rgb[0];
    out[1] = rgb[1];
    out[2] = rgb[2];
    return out;
  }
  const peak = shoulder(m);
  const s = peak / m;
  const white = smoothstep(WHITE_FROM, WHITE_TO, m) * WHITE_AMOUNT;
  const r = rgb[0] * s;
  const g = rgb[1] * s;
  const b = rgb[2] * s;
  out[0] = r + (peak - r) * white;
  out[1] = g + (peak - g) * white;
  out[2] = b + (peak - b) * white;
  return out;
};

/**
 * Screen-blended light: what an additive fragment of light `x` (one channel)
 * writes with the blending `(one, one − src color)`. The framebuffer then
 * holds `1 − e^(−SCREEN_GAIN Σx)`: the light is tone mapped as it adds up.
 */
export const screenTone = (x: number): number =>
  1 - Math.exp(-SCREEN_GAIN * Math.max(0, x));

/** What a blended fragment adds to the four targets */
export interface OitOutput {
  front: number[];
  accum: number[];
  extra: number[];
  behind: number[];
}

const ZERO = [0, 0, 0, 0] as const;

/**
 * Depth of the front layer of a pixel from its blended fragments (JS
 * mirror of the front pass): the nearest visible non-additive fragment
 */
export const oitFrontDepth = (
  fragments: readonly {
    color: readonly [number, number, number, number];
    depth: number;
    additive?: boolean;
  }[],
): number => {
  let front = FRONT_CLEAR;
  for (const f of fragments) {
    if (f.additive || f.color[3] < FRONT_MIN_ALPHA) continue;
    front = Math.min(front, clamp01(f.depth));
  }
  return front;
};

/**
 * What a blended fragment adds to the targets (JS mirror of the shaders),
 * `front` the depth of the front layer of its pixel (`oitFrontDepth`)
 */
export const oitFragment = (
  premultiplied: readonly [number, number, number, number],
  depth: number,
  additive: boolean,
  front: number = FRONT_CLEAR,
): OitOutput => {
  const [r, g, b, alpha] = premultiplied;
  const near = clamp01(depth) <= front + FRONT_EPSILON;
  const out: OitOutput = {
    front: [...ZERO],
    accum: [...ZERO],
    extra: [...ZERO],
    behind: [...ZERO],
  };
  if (additive) {
    if (near) out.extra = [r, g, b, 0];
    else out.behind = [r, g, b, 0];
    return out;
  }
  if (near) {
    out.front = [r, g, b, alpha];
    return out;
  }
  const a = Math.min(MAX_ALPHA, Math.max(0, alpha));
  const w = oitWeight(depth);
  out.accum = [r * w, g * w, b * w, a * w];
  out.extra = [0, 0, 0, -Math.log(1 - a)];
  return out;
};

/**
 * Composite of the targets: a premultiplied color blended over the opaque
 * scene (JS mirror of the shaders)
 */
export const oitComposite = (
  accum: readonly number[],
  extra: readonly number[],
  front: readonly number[] = ZERO,
  behind: readonly number[] = ZERO,
): [number, number, number, number] => {
  // the rest: weighted average color, alpha from the revealage
  const tau = Math.max(0, extra[3] ?? 0);
  const restAlpha = 1 - Math.exp(-tau);
  const k = restAlpha / Math.max(accum[3] ?? 0, 1e-6);
  // the front layer (several fragments at its depth: normalized)
  const sum = Math.max(0, front[3] ?? 0);
  const scale = sum > 1 ? 1 / sum : 1;
  const fa = sum * scale;
  const alpha = fa + restAlpha * (1 - fa);
  const color = [0, 1, 2].map(
    (i) => (front[i] ?? 0) * scale + (accum[i] ?? 0) * k * (1 - fa),
  );
  // light behind the front layer, mixed through the rest: its mean
  // transmittance (1 − e^−τ) / τ
  const meanT = tau > 1e-4 ? restAlpha / tau : 1;
  const t = (1 - fa) * meanT;
  const back = toneMap([behind[0] ?? 0, behind[1] ?? 0, behind[2] ?? 0]);
  const backAlpha = clamp01(Math.max(back[0], back[1], back[2]));
  const under = color.map((c, i) => c + back[i]! * t);
  const underAlpha = Math.min(1, alpha + backAlpha * t);
  // light in front of every layer
  const light = toneMap([extra[0] ?? 0, extra[1] ?? 0, extra[2] ?? 0]);
  const lightAlpha = clamp01(Math.max(light[0], light[1], light[2]));
  return [
    light[0] + under[0]! * (1 - lightAlpha),
    light[1] + under[1]! * (1 - lightAlpha),
    light[2] + under[2]! * (1 - lightAlpha),
    lightAlpha + underAlpha * (1 - lightAlpha),
  ];
};

const f = (v: number) => (Number.isInteger(v) ? v.toFixed(1) : String(v));

// ------------------------------------------------------------------- WGSL

/**
 * Transparency outputs of the points and meshes (`fsOit`, `fsFront`): the
 * front depth texture is bound in group 1 by the main pass only
 */
export const WGSL_OIT = /* wgsl */ `
@group(1) @binding(0) var frontTex: texture_2d<f32>;

struct Oit {
  @location(0) front: vec4f,
  @location(1) accum: vec4f,
  @location(2) extra: vec4f,
  @location(3) behind: vec4f,
};

fn oit(c: vec4f, depth: f32, xy: vec4f) -> Oit {
  var o: Oit;
  o.front = vec4f(0.0);
  o.accum = vec4f(0.0);
  o.extra = vec4f(0.0);
  o.behind = vec4f(0.0);
  let z = clamp(depth, 0.0, 1.0);
  let near = z <= textureLoad(frontTex, vec2i(xy.xy), 0).r + ${f(FRONT_EPSILON)};
  if (u.light.w > 0.5) {
    if (near) { o.extra = vec4f(c.rgb, 0.0); } else { o.behind = vec4f(c.rgb, 0.0); }
    return o;
  }
  if (near) {
    o.front = c;
    return o;
  }
  let a = clamp(c.a, 0.0, ${f(MAX_ALPHA)});
  let w = max(${f(WEIGHT_MIN)}, ${f(WEIGHT_SCALE)} * exp2(-${f(WEIGHT_FALLOFF)} * z));
  o.accum = vec4f(c.rgb, a) * w;
  o.extra = vec4f(0.0, 0.0, 0.0, -log(1.0 - a));
  return o;
}

fn frontDepth(c: vec4f, depth: f32) -> vec4f {
  if (c.a < ${f(FRONT_MIN_ALPHA)}) { discard; }
  return vec4f(clamp(depth, 0.0, 1.0));
}

fn screenLight(c: vec4f) -> vec4f {
  if (u.light.w < 0.5) { return c; }
  let v = vec3f(1.0) - exp(-${f(SCREEN_GAIN)} * max(c.rgb, vec3f(0.0)));
  return vec4f(v, max(max(v.r, v.g), v.b));
}
`;

const WGSL_TONE = /* wgsl */ `
fn shoulder(x: f32) -> f32 {
  if (x <= ${f(TONE_KNEE)}) { return x; }
  let t = (x - ${f(TONE_KNEE)}) / ${f(1 - TONE_KNEE)};
  return ${f(TONE_KNEE)} + ${f(1 - TONE_KNEE)} * t / (1.0 + t);
}

fn toneMap(rgb: vec3f) -> vec3f {
  let m = max(max(rgb.r, rgb.g), rgb.b);
  if (m <= 1e-6) { return rgb; }
  let peak = shoulder(m);
  let scaled = rgb * (peak / m);
  return mix(scaled, vec3f(peak), smoothstep(${f(WHITE_FROM)}, ${f(WHITE_TO)}, m) * ${f(WHITE_AMOUNT)});
}
`;

/** Full-screen composite of the four targets over the opaque scene */
export const WGSL_COMPOSITE = /* wgsl */ `${WGSL_TONE}
@group(0) @binding(0) var frontTex: texture_2d<f32>;
@group(0) @binding(1) var accumTex: texture_2d<f32>;
@group(0) @binding(2) var extraTex: texture_2d<f32>;
@group(0) @binding(3) var behindTex: texture_2d<f32>;


@vertex
fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0;
  return vec4f(p, 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) position: vec4f) -> @location(0) vec4f {
  let xy = vec2i(position.xy);
  let front = textureLoad(frontTex, xy, 0);
  let accum = textureLoad(accumTex, xy, 0);
  let extra = textureLoad(extraTex, xy, 0);
  let behind = textureLoad(behindTex, xy, 0);
  let tau = max(extra.a, 0.0);
  let restAlpha = 1.0 - exp(-tau);
  let rest = accum.rgb * (restAlpha / max(accum.a, 1e-6));
  let sum = max(front.a, 0.0);
  let scale = select(1.0, 1.0 / max(sum, 1e-6), sum > 1.0);
  let fa = sum * scale;
  let alpha = fa + restAlpha * (1.0 - fa);
  let color = front.rgb * scale + rest * (1.0 - fa);
  let meanT = select(1.0, restAlpha / max(tau, 1e-6), tau > 1e-4);
  let t = (1.0 - fa) * meanT;
  let back = toneMap(behind.rgb);
  let backAlpha = clamp(max(max(back.r, back.g), back.b), 0.0, 1.0);
  let under = color + back * t;
  let underAlpha = min(1.0, alpha + backAlpha * t);
  let light = toneMap(extra.rgb);
  let lightAlpha = clamp(max(max(light.r, light.g), light.b), 0.0, 1.0);
  let a = lightAlpha + underAlpha * (1.0 - lightAlpha);
  let rgb = light + under * (1.0 - lightAlpha);
  if (a <= 0.0) { discard; }
  return vec4f(rgb, a);
}
`;

// ------------------------------------------------------------------- GLSL

/**
 * Outputs of the OIT variants (GLSL ES 3.0): `EMIT(color, depth)`; the
 * front depth texture is `u_front`
 */
export const GLSL_OIT = `
uniform highp sampler2D u_front;
layout(location = 0) out vec4 o_front;
layout(location = 1) out vec4 o_accum;
layout(location = 2) out vec4 o_extra;
layout(location = 3) out vec4 o_behind;
void emitOit(vec4 c, float depth) {
  o_front = vec4(0.0);
  o_accum = vec4(0.0);
  o_extra = vec4(0.0);
  o_behind = vec4(0.0);
  float z = clamp(depth, 0.0, 1.0);
  bool near = z <= texelFetch(u_front, ivec2(gl_FragCoord.xy), 0).r + ${f(FRONT_EPSILON)};
  if (u_light.w > 0.5) {
    if (near) o_extra = vec4(c.rgb, 0.0); else o_behind = vec4(c.rgb, 0.0);
    return;
  }
  if (near) {
    o_front = c;
    return;
  }
  float a = clamp(c.a, 0.0, ${f(MAX_ALPHA)});
  float w = max(${f(WEIGHT_MIN)}, ${f(WEIGHT_SCALE)} * exp2(-${f(WEIGHT_FALLOFF)} * z));
  o_accum = vec4(c.rgb, a) * w;
  o_extra = vec4(0.0, 0.0, 0.0, -log(1.0 - a));
}
#define EMIT(c, d) emitOit(c, d)
`;

/** Output of the front pass (GLSL ES 3.0): the depth of visible fragments */
export const GLSL_FRONT = `
out vec4 fragColor;
void emitFront(vec4 c, float depth) {
  if (c.a < ${f(FRONT_MIN_ALPHA)}) discard;
  fragColor = vec4(clamp(depth, 0.0, 1.0));
}
#define EMIT(c, d) emitFront(c, d)
`;

/**
 * Plain output (`output` the output variable): additive light screen
 * blended, tone mapped as it adds up (`screenTone`)
 */
export const glslScreen = (output: string) => `
vec4 screenLight(vec4 c) {
  if (u_light.w < 0.5) return c;
  vec3 v = vec3(1.0) - exp(-${f(SCREEN_GAIN)} * max(c.rgb, vec3(0.0)));
  return vec4(v, max(max(v.r, v.g), v.b));
}
#define EMIT(c, d) ${output} = screenLight(c)
`;

const GLSL_TONE = `
float shoulder(float x) {
  if (x <= ${f(TONE_KNEE)}) return x;
  float t = (x - ${f(TONE_KNEE)}) / ${f(1 - TONE_KNEE)};
  return ${f(TONE_KNEE)} + ${f(1 - TONE_KNEE)} * t / (1.0 + t);
}
vec3 toneMap(vec3 rgb) {
  float m = max(max(rgb.r, rgb.g), rgb.b);
  if (m <= 1e-6) return rgb;
  float peak = shoulder(m);
  vec3 scaled = rgb * (peak / m);
  return mix(scaled, vec3(peak), smoothstep(${f(WHITE_FROM)}, ${f(WHITE_TO)}, m) * ${f(WHITE_AMOUNT)});
}
`;

/** Composite program of WebGL2 (full-screen triangle from `gl_VertexID`) */
export const GLSL_COMPOSITE = {
  vertex: `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)) * 2.0 - 1.0;
  gl_Position = vec4(p, 0.0, 1.0);
}
`,
  fragment: `#version 300 es
precision highp float;
uniform sampler2D u_frontColor;
uniform sampler2D u_accum;
uniform sampler2D u_extra;
uniform sampler2D u_behind;
out vec4 fragColor;
${GLSL_TONE}
void main() {
  ivec2 xy = ivec2(gl_FragCoord.xy);
  vec4 front = texelFetch(u_frontColor, xy, 0);
  vec4 accum = texelFetch(u_accum, xy, 0);
  vec4 extra = texelFetch(u_extra, xy, 0);
  vec4 behind = texelFetch(u_behind, xy, 0);
  float tau = max(extra.a, 0.0);
  float restAlpha = 1.0 - exp(-tau);
  vec3 rest = accum.rgb * (restAlpha / max(accum.a, 1e-6));
  float sum = max(front.a, 0.0);
  float scale = sum > 1.0 ? 1.0 / sum : 1.0;
  float fa = sum * scale;
  float alpha = fa + restAlpha * (1.0 - fa);
  vec3 color = front.rgb * scale + rest * (1.0 - fa);
  float meanT = tau > 1e-4 ? restAlpha / tau : 1.0;
  float t = (1.0 - fa) * meanT;
  vec3 back = toneMap(behind.rgb);
  float backAlpha = clamp(max(max(back.r, back.g), back.b), 0.0, 1.0);
  vec3 under = color + back * t;
  float underAlpha = min(1.0, alpha + backAlpha * t);
  vec3 light = toneMap(extra.rgb);
  float lightAlpha = clamp(max(max(light.r, light.g), light.b), 0.0, 1.0);
  float a = lightAlpha + underAlpha * (1.0 - lightAlpha);
  vec3 rgb = light + under * (1.0 - lightAlpha);
  if (a <= 0.0) discard;
  fragColor = vec4(rgb, a);
}
`,
};
