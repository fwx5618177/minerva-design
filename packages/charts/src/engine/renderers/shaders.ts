// WGSL (WebGPU), GLSL ES 3.0 (WebGL2) and GLSL ES 1.0 (WebGL) programs.
// Every primitive is an instanced 4-vertex triangle strip; anti-aliasing
// comes from signed distance functions in pixel space (no MSAA needed).
//
// Uniforms (all backends):
//   xform    = (xScale, xOffset, yScale, yOffset)  relative data -> clip
//   viewport = (width px, height px, dpr, 0)
//   color    = straight RGBA of the series
//   params   = line: (half width px) | area: (flat 0/1, opacity)
//              bar: (half width in x units, radius px, inset px, min half px)
//              scatter: (opacity, stroke px)
// Bars and scatter dots carry their own color (unorm8x4 per instance).
// Output colors are premultiplied.

const WGSL_COMMON = /* wgsl */ `
struct U {
  xform: vec4f,
  viewport: vec4f,
  color: vec4f,
  params: vec4f,
};
@group(0) @binding(0) var<uniform> u: U;

fn gap(p: vec2f) -> bool {
  return abs(p.x) > 1e37 || abs(p.y) > 1e37;
}
fn toClip(p: vec2f) -> vec2f {
  return vec2f(p.x * u.xform.x + u.xform.y, p.y * u.xform.z + u.xform.w);
}
fn toPx(p: vec2f) -> vec2f {
  return (toClip(p) * 0.5 + 0.5) * u.viewport.xy;
}
fn pxToClip(p: vec2f) -> vec4f {
  return vec4f(p / u.viewport.xy * 2.0 - 1.0, 0.0, 1.0);
}
fn corner(vi: u32) -> vec2f {
  return vec2f(f32(vi & 1u), f32(vi >> 1u));
}
const HIDDEN = vec4f(2.0, 2.0, 2.0, 1.0);
`;

export const WGSL_LINE = /* wgsl */ `${WGSL_COMMON}
struct Out {
  @builtin(position) pos: vec4f,
  @location(0) local: vec2f,
  @location(1) len: f32,
};
@vertex fn vs(@builtin(vertex_index) vi: u32, @location(0) a: vec2f, @location(1) b: vec2f) -> Out {
  var out: Out;
  if (gap(a) || gap(b)) {
    out.pos = HIDDEN;
    return out;
  }
  let pa = toPx(a);
  let pb = toPx(b);
  let d = pb - pa;
  let len = length(d);
  var dir = vec2f(1.0, 0.0);
  if (len > 1e-6) { dir = d / len; }
  let nrm = vec2f(-dir.y, dir.x);
  let hw = u.params.x + 1.0;
  let c = corner(vi);
  let along = mix(-hw, len + hw, c.x);
  let across = mix(-hw, hw, c.y);
  out.pos = pxToClip(pa + dir * along + nrm * across);
  out.local = vec2f(along, across);
  out.len = len;
  return out;
}
@fragment fn fs(v: Out) -> @location(0) vec4f {
  let x = clamp(v.local.x, 0.0, v.len);
  let dist = length(vec2f(v.local.x - x, v.local.y));
  let a = clamp(u.params.x - dist + 0.5, 0.0, 1.0) * u.color.a;
  return vec4f(u.color.rgb * a, a);
}
`;

export const WGSL_AREA = /* wgsl */ `${WGSL_COMMON}
struct Out {
  @builtin(position) pos: vec4f,
  @location(0) t: f32,
};
@vertex fn vs(@builtin(vertex_index) vi: u32, @location(0) a: vec3f, @location(1) b: vec3f) -> Out {
  var out: Out;
  if (gap(a.xy) || gap(b.xy) || abs(a.z) > 1e37 || abs(b.z) > 1e37) {
    out.pos = HIDDEN;
    return out;
  }
  let c = corner(vi);
  let p = select(a, b, c.y > 0.5);
  let y = select(p.z, p.y, c.x > 0.5);
  out.pos = vec4f(toClip(vec2f(p.x, y)), 0.0, 1.0);
  // one vertical gradient over the canvas, like Canvas2D (no per-column fade)
  out.t = select((out.pos.y + 1.0) * 0.5, 1.0, u.params.x > 0.5);
  return out;
}
@fragment fn fs(v: Out) -> @location(0) vec4f {
  let a = u.color.a * u.params.y * (0.25 + 0.75 * clamp(v.t, 0.0, 1.0));
  return vec4f(u.color.rgb * a, a);
}
`;

export const WGSL_BAR = /* wgsl */ `${WGSL_COMMON}
struct Out {
  @builtin(position) pos: vec4f,
  @location(0) local: vec2f,
  @location(1) @interpolate(flat) hs: vec2f,
  @location(2) @interpolate(flat) color: vec4f,
};
@vertex fn vs(@builtin(vertex_index) vi: u32, @location(0) inst: vec3f, @location(1) color: vec4f) -> Out {
  var out: Out;
  if (gap(inst.xy) || abs(inst.z) > 1e37) {
    out.pos = HIDDEN;
    return out;
  }
  let dpr = u.viewport.z;
  let rawHw = abs(u.params.x * u.xform.x) * 0.5 * u.viewport.x;
  let p0 = toPx(inst.xy);
  let y1 = toPx(vec2f(inst.x, inst.z)).y;
  let lo = min(p0.y, y1);
  let hi = max(p0.y, y1);
  // the gap between cells fades out on small cells (dense heatmaps stay
  // solid); without a gap, cells overlap by a pixel so no seam shows
  let fade = clamp((min(rawHw, (hi - lo) * 0.5) - 3.0 * dpr) / (2.0 * dpr), 0.0, 1.0);
  let inset = u.params.z * dpr * fade - select(0.0, 0.5 * (1.0 - fade), u.params.z > 0.0);
  let minHalf = u.params.w * dpr;
  let hw = max(max(rawHw - inset, 0.5), minHalf);
  let hsz = vec2f(hw, max((hi - lo) * 0.5 - inset, minHalf));
  let center = vec2f(p0.x, (lo + hi) * 0.5);
  let ext = hsz + vec2f(1.0);
  let c = corner(vi) * 2.0 - 1.0;
  out.pos = pxToClip(center + c * ext);
  out.local = c * ext;
  out.hs = hsz;
  out.color = color;
  return out;
}
@fragment fn fs(v: Out) -> @location(0) vec4f {
  let r = min(u.params.y * u.viewport.z, min(v.hs.x, v.hs.y));
  let q = abs(v.local) - v.hs + vec2f(r);
  let d = length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0) - r;
  let a = clamp(0.5 - d, 0.0, 1.0) * v.color.a;
  return vec4f(v.color.rgb * a, a);
}
`;

export const WGSL_SCATTER = /* wgsl */ `${WGSL_COMMON}
struct Out {
  @builtin(position) pos: vec4f,
  @location(0) local: vec2f,
  @location(1) @interpolate(flat) r: f32,
  @location(2) @interpolate(flat) color: vec4f,
};
@vertex fn vs(@builtin(vertex_index) vi: u32, @location(0) p: vec2f, @location(1) size: f32, @location(2) color: vec4f) -> Out {
  var out: Out;
  if (gap(p) || !(size > 0.0)) {
    out.pos = HIDDEN;
    return out;
  }
  let r = size * 0.5 * u.viewport.z;
  let ext = r + 1.0;
  let c = corner(vi) * 2.0 - 1.0;
  out.pos = pxToClip(toPx(p) + c * ext);
  out.local = c * ext;
  out.r = r;
  out.color = color;
  return out;
}
@fragment fn fs(v: Out) -> @location(0) vec4f {
  let d = length(v.local) - v.r;
  let cover = clamp(0.5 - d, 0.0, 1.0);
  let inner = clamp(0.5 - (d + u.params.y * u.viewport.z), 0.0, 1.0);
  let a = v.color.a * (inner * u.params.x + (cover - inner));
  return vec4f(v.color.rgb * a, a);
}
`;

const GLSL_HEADER = /* glsl */ `#version 300 es
precision highp float;
uniform vec4 u_xform;
uniform vec4 u_viewport;
uniform vec4 u_color;
uniform vec4 u_params;
`;

const GLSL_VERTEX_COMMON = /* glsl */ `${GLSL_HEADER}
bool gap(vec2 p) { return abs(p.x) > 1e37 || abs(p.y) > 1e37; }
vec2 toClip(vec2 p) { return vec2(p.x * u_xform.x + u_xform.y, p.y * u_xform.z + u_xform.w); }
vec2 toPx(vec2 p) { return (toClip(p) * 0.5 + 0.5) * u_viewport.xy; }
vec4 pxToClip(vec2 p) { return vec4(p / u_viewport.xy * 2.0 - 1.0, 0.0, 1.0); }
vec2 corner() { return vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)); }
const vec4 HIDDEN = vec4(2.0, 2.0, 2.0, 1.0);
`;

export const GLSL_LINE = {
  vertex: /* glsl */ `${GLSL_VERTEX_COMMON}
in vec2 a_a;
in vec2 a_b;
out vec2 v_local;
out float v_len;
void main() {
  v_local = vec2(0.0);
  v_len = 0.0;
  if (gap(a_a) || gap(a_b)) { gl_Position = HIDDEN; return; }
  vec2 pa = toPx(a_a);
  vec2 pb = toPx(a_b);
  vec2 d = pb - pa;
  float len = length(d);
  vec2 dir = len > 1e-6 ? d / len : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float hw = u_params.x + 1.0;
  vec2 c = corner();
  float along = mix(-hw, len + hw, c.x);
  float across = mix(-hw, hw, c.y);
  gl_Position = pxToClip(pa + dir * along + nrm * across);
  v_local = vec2(along, across);
  v_len = len;
}`,
  fragment: /* glsl */ `${GLSL_HEADER}
in vec2 v_local;
in float v_len;
out vec4 outColor;
void main() {
  float x = clamp(v_local.x, 0.0, v_len);
  float dist = length(vec2(v_local.x - x, v_local.y));
  float a = clamp(u_params.x - dist + 0.5, 0.0, 1.0) * u_color.a;
  outColor = vec4(u_color.rgb * a, a);
}`,
};

export const GLSL_AREA = {
  vertex: /* glsl */ `${GLSL_VERTEX_COMMON}
in vec3 a_a;
in vec3 a_b;
out float v_t;
void main() {
  v_t = 0.0;
  if (gap(a_a.xy) || gap(a_b.xy) || abs(a_a.z) > 1e37 || abs(a_b.z) > 1e37) { gl_Position = HIDDEN; return; }
  vec2 c = corner();
  vec3 p = c.y > 0.5 ? a_b : a_a;
  float y = c.x > 0.5 ? p.y : p.z;
  gl_Position = vec4(toClip(vec2(p.x, y)), 0.0, 1.0);
  // one vertical gradient over the canvas, like Canvas2D (no per-column fade)
  v_t = u_params.x > 0.5 ? 1.0 : (gl_Position.y + 1.0) * 0.5;
}`,
  fragment: /* glsl */ `${GLSL_HEADER}
in float v_t;
out vec4 outColor;
void main() {
  float a = u_color.a * u_params.y * (0.25 + 0.75 * clamp(v_t, 0.0, 1.0));
  outColor = vec4(u_color.rgb * a, a);
}`,
};

export const GLSL_BAR = {
  vertex: /* glsl */ `${GLSL_VERTEX_COMMON}
in vec3 a_inst;
in vec4 a_color;
out vec2 v_local;
flat out vec2 v_half;
flat out vec4 v_color;
void main() {
  v_local = vec2(0.0);
  v_half = vec2(0.0);
  v_color = a_color;
  if (gap(a_inst.xy) || abs(a_inst.z) > 1e37) { gl_Position = HIDDEN; return; }
  float dpr = u_viewport.z;
  float rawHw = abs(u_params.x * u_xform.x) * 0.5 * u_viewport.x;
  vec2 p0 = toPx(a_inst.xy);
  float y1 = toPx(vec2(a_inst.x, a_inst.z)).y;
  float lo = min(p0.y, y1);
  float hi = max(p0.y, y1);
  float fade = clamp((min(rawHw, (hi - lo) * 0.5) - 3.0 * dpr) / (2.0 * dpr), 0.0, 1.0);
  float inset = u_params.z * dpr * fade - (u_params.z > 0.0 ? 0.5 * (1.0 - fade) : 0.0);
  float minHalf = u_params.w * dpr;
  float hw = max(max(rawHw - inset, 0.5), minHalf);
  vec2 hsz = vec2(hw, max((hi - lo) * 0.5 - inset, minHalf));
  vec2 center = vec2(p0.x, (lo + hi) * 0.5);
  vec2 ext = hsz + vec2(1.0);
  vec2 c = corner() * 2.0 - 1.0;
  gl_Position = pxToClip(center + c * ext);
  v_local = c * ext;
  v_half = hsz;
}`,
  fragment: /* glsl */ `${GLSL_HEADER}
in vec2 v_local;
flat in vec2 v_half;
flat in vec4 v_color;
out vec4 outColor;
void main() {
  float r = min(u_params.y * u_viewport.z, min(v_half.x, v_half.y));
  vec2 q = abs(v_local) - v_half + vec2(r);
  float d = length(max(q, vec2(0.0))) + min(max(q.x, q.y), 0.0) - r;
  float a = clamp(0.5 - d, 0.0, 1.0) * v_color.a;
  outColor = vec4(v_color.rgb * a, a);
}`,
};

export const GLSL_SCATTER = {
  vertex: /* glsl */ `${GLSL_VERTEX_COMMON}
in vec2 a_pos;
in float a_size;
in vec4 a_color;
out vec2 v_local;
flat out float v_r;
flat out vec4 v_color;
void main() {
  v_local = vec2(0.0);
  v_r = 0.0;
  v_color = a_color;
  if (gap(a_pos) || !(a_size > 0.0)) { gl_Position = HIDDEN; return; }
  float r = a_size * 0.5 * u_viewport.z;
  float ext = r + 1.0;
  vec2 c = corner() * 2.0 - 1.0;
  gl_Position = pxToClip(toPx(a_pos) + c * ext);
  v_local = c * ext;
  v_r = r;
}`,
  fragment: /* glsl */ `${GLSL_HEADER}
in vec2 v_local;
flat in float v_r;
flat in vec4 v_color;
out vec4 outColor;
void main() {
  float d = length(v_local) - v_r;
  float cover = clamp(0.5 - d, 0.0, 1.0);
  float inner = clamp(0.5 - (d + u_params.y * u_viewport.z), 0.0, 1.0);
  float a = v_color.a * (inner * u_params.x + (cover - inner));
  outColor = vec4(v_color.rgb * a, a);
}`,
};

// GLSL ES 1.0 (WebGL): no gl_VertexID (the corner comes from a per-vertex
// attribute, location 0), no flat varyings (every vertex of an instance
// writes the same value, so interpolation keeps it) and the fragment shaders
// read no uniform: a uniform shared by both stages must have the same
// precision, and highp is optional in WebGL fragment shaders.

const GLSL1_VERTEX_COMMON = /* glsl */ `precision highp float;
uniform vec4 u_xform;
uniform vec4 u_viewport;
uniform vec4 u_color;
uniform vec4 u_params;
attribute vec2 a_corner;
bool gap(vec2 p) { return abs(p.x) > 1e37 || abs(p.y) > 1e37; }
vec2 toClip(vec2 p) { return vec2(p.x * u_xform.x + u_xform.y, p.y * u_xform.z + u_xform.w); }
vec2 toPx(vec2 p) { return (toClip(p) * 0.5 + 0.5) * u_viewport.xy; }
vec4 pxToClip(vec2 p) { return vec4(p / u_viewport.xy * 2.0 - 1.0, 0.0, 1.0); }
const vec4 HIDDEN = vec4(2.0, 2.0, 2.0, 1.0);
`;

const GLSL1_FRAGMENT_COMMON = /* glsl */ `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

export const GLSL1_LINE = {
  vertex: /* glsl */ `${GLSL1_VERTEX_COMMON}
attribute vec2 a_a;
attribute vec2 a_b;
varying vec2 v_local;
varying float v_len;
varying float v_hw;
varying vec4 v_color;
void main() {
  v_local = vec2(0.0);
  v_len = 0.0;
  v_hw = u_params.x;
  v_color = u_color;
  if (gap(a_a) || gap(a_b)) { gl_Position = HIDDEN; return; }
  vec2 pa = toPx(a_a);
  vec2 pb = toPx(a_b);
  vec2 d = pb - pa;
  float len = length(d);
  vec2 dir = len > 1e-6 ? d / len : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float hw = u_params.x + 1.0;
  float along = mix(-hw, len + hw, a_corner.x);
  float across = mix(-hw, hw, a_corner.y);
  gl_Position = pxToClip(pa + dir * along + nrm * across);
  v_local = vec2(along, across);
  v_len = len;
}`,
  fragment: /* glsl */ `${GLSL1_FRAGMENT_COMMON}
varying vec2 v_local;
varying float v_len;
varying float v_hw;
varying vec4 v_color;
void main() {
  float x = clamp(v_local.x, 0.0, v_len);
  float dist = length(vec2(v_local.x - x, v_local.y));
  float a = clamp(v_hw - dist + 0.5, 0.0, 1.0) * v_color.a;
  gl_FragColor = vec4(v_color.rgb * a, a);
}`,
};

export const GLSL1_AREA = {
  vertex: /* glsl */ `${GLSL1_VERTEX_COMMON}
attribute vec3 a_a;
attribute vec3 a_b;
varying float v_t;
varying vec4 v_color;
void main() {
  v_t = 0.0;
  v_color = vec4(u_color.rgb, u_color.a * u_params.y);
  if (gap(a_a.xy) || gap(a_b.xy) || abs(a_a.z) > 1e37 || abs(a_b.z) > 1e37) { gl_Position = HIDDEN; return; }
  vec3 p = a_corner.y > 0.5 ? a_b : a_a;
  float y = a_corner.x > 0.5 ? p.y : p.z;
  gl_Position = vec4(toClip(vec2(p.x, y)), 0.0, 1.0);
  // one vertical gradient over the canvas, like Canvas2D (no per-column fade)
  v_t = u_params.x > 0.5 ? 1.0 : (gl_Position.y + 1.0) * 0.5;
}`,
  fragment: /* glsl */ `${GLSL1_FRAGMENT_COMMON}
varying float v_t;
varying vec4 v_color;
void main() {
  float a = v_color.a * (0.25 + 0.75 * clamp(v_t, 0.0, 1.0));
  gl_FragColor = vec4(v_color.rgb * a, a);
}`,
};

export const GLSL1_BAR = {
  vertex: /* glsl */ `${GLSL1_VERTEX_COMMON}
attribute vec3 a_inst;
attribute vec4 a_color;
varying vec2 v_local;
varying vec2 v_half;
varying float v_radius;
varying vec4 v_color;
void main() {
  v_local = vec2(0.0);
  v_half = vec2(0.0);
  v_radius = u_params.y * u_viewport.z;
  v_color = a_color;
  if (gap(a_inst.xy) || abs(a_inst.z) > 1e37) { gl_Position = HIDDEN; return; }
  float dpr = u_viewport.z;
  float rawHw = abs(u_params.x * u_xform.x) * 0.5 * u_viewport.x;
  vec2 p0 = toPx(a_inst.xy);
  float y1 = toPx(vec2(a_inst.x, a_inst.z)).y;
  float lo = min(p0.y, y1);
  float hi = max(p0.y, y1);
  float fade = clamp((min(rawHw, (hi - lo) * 0.5) - 3.0 * dpr) / (2.0 * dpr), 0.0, 1.0);
  float inset = u_params.z * dpr * fade - (u_params.z > 0.0 ? 0.5 * (1.0 - fade) : 0.0);
  float minHalf = u_params.w * dpr;
  float hw = max(max(rawHw - inset, 0.5), minHalf);
  vec2 hsz = vec2(hw, max((hi - lo) * 0.5 - inset, minHalf));
  vec2 center = vec2(p0.x, (lo + hi) * 0.5);
  vec2 ext = hsz + vec2(1.0);
  vec2 c = a_corner * 2.0 - 1.0;
  gl_Position = pxToClip(center + c * ext);
  v_local = c * ext;
  v_half = hsz;
}`,
  fragment: /* glsl */ `${GLSL1_FRAGMENT_COMMON}
varying vec2 v_local;
varying vec2 v_half;
varying float v_radius;
varying vec4 v_color;
void main() {
  float r = min(v_radius, min(v_half.x, v_half.y));
  vec2 q = abs(v_local) - v_half + vec2(r);
  float d = length(max(q, vec2(0.0))) + min(max(q.x, q.y), 0.0) - r;
  float a = clamp(0.5 - d, 0.0, 1.0) * v_color.a;
  gl_FragColor = vec4(v_color.rgb * a, a);
}`,
};

export const GLSL1_SCATTER = {
  vertex: /* glsl */ `${GLSL1_VERTEX_COMMON}
attribute vec2 a_pos;
attribute float a_size;
attribute vec4 a_color;
varying vec2 v_local;
varying float v_r;
varying vec2 v_style;
varying vec4 v_color;
void main() {
  v_local = vec2(0.0);
  v_r = 0.0;
  v_style = vec2(u_params.x, u_params.y * u_viewport.z);
  v_color = a_color;
  if (gap(a_pos) || !(a_size > 0.0)) { gl_Position = HIDDEN; return; }
  float r = a_size * 0.5 * u_viewport.z;
  float ext = r + 1.0;
  vec2 c = a_corner * 2.0 - 1.0;
  gl_Position = pxToClip(toPx(a_pos) + c * ext);
  v_local = c * ext;
  v_r = r;
}`,
  fragment: /* glsl */ `${GLSL1_FRAGMENT_COMMON}
varying vec2 v_local;
varying float v_r;
varying vec2 v_style;
varying vec4 v_color;
void main() {
  float d = length(v_local) - v_r;
  float cover = clamp(0.5 - d, 0.0, 1.0);
  float inner = clamp(0.5 - (d + v_style.y), 0.0, 1.0);
  float a = v_color.a * (inner * v_style.x + (cover - inner));
  gl_FragColor = vec4(v_color.rgb * a, a);
}`,
};
