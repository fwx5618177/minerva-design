// Weighted blended order-independent transparency (McGuire & Bavoil 2013)
// of the WebGPU and WebGL2 backends, and the tone mapping of the additive
// light. The blended items (transparent meshes, blended and additive points)
// are drawn in any order, without writing depth, into two float targets
// cleared to 0 and blended by plain addition (one, one):
//
//   accum  rgb: Σ premultiplied color × w   a: Σ alpha × w
//   extra  rgb: Σ additive light            a: Σ −ln(1 − alpha)
//
// w favours the fragments near the camera (`oitWeight`). The revealage
// Π(1 − alpha) is stored as the sum of its logarithms so that every target
// uses the same additive blending (WebGL2 has no per-target blend
// functions). The composite pass blends over the opaque scene:
//
//   transparent = (accum.rgb / accum.a) × (1 − e^−extra.a), alpha 1 − e^−extra.a
//   light       = toneMap(extra.rgb), alpha its largest channel
//
// `toneMap` keeps the colors below a knee and rolls the brighter ones off
// towards 1 (Reinhard) by their largest channel (hue preserving), whitening
// only the very bright light a little: dense glowing clouds saturate
// gracefully instead of clipping to white.

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
 * Weight of a blended fragment at a depth (0 nearest … 1 farthest point of
 * the box sphere): 64 × 2^(−12 depth), at least 0.01. Accumulated in half
 * floats: about a thousand layers of the nearest fragments fit.
 */
export const oitWeight = (depth: number): number =>
  Math.max(
    WEIGHT_MIN,
    WEIGHT_SCALE *
      Math.pow(2, -WEIGHT_FALLOFF * Math.min(1, Math.max(0, depth))),
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
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Tone mapping of additive light (linear, premultiplied) */
export const toneMap = (
  rgb: readonly [number, number, number],
): [number, number, number] => {
  const m = Math.max(rgb[0], rgb[1], rgb[2]);
  if (m <= 1e-6) return [rgb[0], rgb[1], rgb[2]];
  const peak = shoulder(m);
  const s = peak / m;
  const white = smoothstep(WHITE_FROM, WHITE_TO, m) * WHITE_AMOUNT;
  return [
    rgb[0] * s + (peak - rgb[0] * s) * white,
    rgb[1] * s + (peak - rgb[1] * s) * white,
    rgb[2] * s + (peak - rgb[2] * s) * white,
  ];
};

/** What a blended fragment adds to the two targets (JS mirror of the shaders) */
export const oitFragment = (
  premultiplied: readonly [number, number, number, number],
  depth: number,
  additive: boolean,
): { accum: number[]; extra: number[] } => {
  const [r, g, b, alpha] = premultiplied;
  if (additive) return { accum: [0, 0, 0, 0], extra: [r, g, b, 0] };
  const a = Math.min(MAX_ALPHA, Math.max(0, alpha));
  const w = oitWeight(depth);
  return {
    accum: [r * w, g * w, b * w, a * w],
    extra: [0, 0, 0, -Math.log(1 - a)],
  };
};

/** Composite of the targets: a premultiplied color (JS mirror of the shaders) */
export const oitComposite = (
  accum: readonly number[],
  extra: readonly number[],
): [number, number, number, number] => {
  const alpha = 1 - Math.exp(-(extra[3] ?? 0));
  const k = alpha / Math.max(accum[3] ?? 0, 1e-6);
  const light = toneMap([extra[0] ?? 0, extra[1] ?? 0, extra[2] ?? 0]);
  const lightAlpha = Math.min(1, Math.max(light[0], light[1], light[2]));
  const behind = 1 - alpha;
  return [
    (accum[0] ?? 0) * k + light[0] * behind,
    (accum[1] ?? 0) * k + light[1] * behind,
    (accum[2] ?? 0) * k + light[2] * behind,
    alpha + lightAlpha * behind,
  ];
};

const f = (v: number) => (Number.isInteger(v) ? v.toFixed(1) : String(v));

// ------------------------------------------------------------------- WGSL

/** Second fragment entry point of the points and meshes: `fsOit` */
export const WGSL_OIT = /* wgsl */ `
struct Oit {
  @location(0) accum: vec4f,
  @location(1) extra: vec4f,
};

fn oit(c: vec4f, depth: f32) -> Oit {
  var o: Oit;
  if (u.light.w > 0.5) {
    o.accum = vec4f(0.0);
    o.extra = vec4f(c.rgb, 0.0);
    return o;
  }
  let a = clamp(c.a, 0.0, ${f(MAX_ALPHA)});
  let w = max(${f(WEIGHT_MIN)}, ${f(WEIGHT_SCALE)} * exp2(-${f(WEIGHT_FALLOFF)} * clamp(depth, 0.0, 1.0)));
  o.accum = vec4f(c.rgb, a) * w;
  o.extra = vec4f(0.0, 0.0, 0.0, -log(1.0 - a));
  return o;
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

/** Full-screen composite of the two targets over the opaque scene */
export const WGSL_COMPOSITE = /* wgsl */ `${WGSL_TONE}
@group(0) @binding(0) var accumTex: texture_2d<f32>;
@group(0) @binding(1) var extraTex: texture_2d<f32>;

@vertex
fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0;
  return vec4f(p, 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) position: vec4f) -> @location(0) vec4f {
  let xy = vec2i(position.xy);
  let accum = textureLoad(accumTex, xy, 0);
  let extra = textureLoad(extraTex, xy, 0);
  let alpha = 1.0 - exp(-extra.a);
  let light = toneMap(extra.rgb);
  let lightAlpha = clamp(max(max(light.r, light.g), light.b), 0.0, 1.0);
  let rgb = accum.rgb * (alpha / max(accum.a, 1e-6)) + light * (1.0 - alpha);
  let a = alpha + lightAlpha * (1.0 - alpha);
  if (a <= 0.0) { discard; }
  return vec4f(rgb, a);
}
`;

// ------------------------------------------------------------------- GLSL

/** Outputs of the OIT variants (GLSL ES 3.0): `EMIT(color, depth)` */
export const GLSL_OIT = `
layout(location = 0) out vec4 o_accum;
layout(location = 1) out vec4 o_extra;
void emitOit(vec4 c, float depth) {
  if (u_light.w > 0.5) {
    o_accum = vec4(0.0);
    o_extra = vec4(c.rgb, 0.0);
    return;
  }
  float a = clamp(c.a, 0.0, ${f(MAX_ALPHA)});
  float w = max(${f(WEIGHT_MIN)}, ${f(WEIGHT_SCALE)} * exp2(-${f(WEIGHT_FALLOFF)} * clamp(depth, 0.0, 1.0)));
  o_accum = vec4(c.rgb, a) * w;
  o_extra = vec4(0.0, 0.0, 0.0, -log(1.0 - a));
}
#define EMIT(c, d) emitOit(c, d)
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
uniform sampler2D u_accum;
uniform sampler2D u_extra;
out vec4 fragColor;
${GLSL_TONE}
void main() {
  ivec2 xy = ivec2(gl_FragCoord.xy);
  vec4 accum = texelFetch(u_accum, xy, 0);
  vec4 extra = texelFetch(u_extra, xy, 0);
  float alpha = 1.0 - exp(-extra.a);
  vec3 light = toneMap(extra.rgb);
  float lightAlpha = clamp(max(max(light.r, light.g), light.b), 0.0, 1.0);
  vec3 rgb = accum.rgb * (alpha / max(accum.a, 1e-6)) + light * (1.0 - alpha);
  float a = alpha + lightAlpha * (1.0 - alpha);
  if (a <= 0.0) discard;
  fragColor = vec4(rgb, a);
}
`,
};
