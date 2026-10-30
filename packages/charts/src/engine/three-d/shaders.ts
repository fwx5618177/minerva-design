// Shaders of the 3D data layer: instanced point billboards (shaded spheres,
// flat discs or glowing discs), lit triangles (two-sided Lambert +
// Blinn-Phong) and screen-space wide line segments. WGSL for WebGPU, GLSL ES
// 1.0 for WebGL (turned into GLSL ES 3.0 for WebGL2 by a macro prefix).
// Outputs are premultiplied.
//
// Uniforms (WGSL struct, GLSL vec4 uniforms of the same names):
//   viewProj  world -> clip (OpenGL depth convention)
//   viewport  drawing buffer width, height (device px), dpr, orthographic
//   eye       camera position, depth bias of the lines (NDC) | point style
//   light     unit vector towards the light, additive points (0/1)
//   material  ambient, diffuse, specular, shininess
//   params    opacity, perspective sizes (0/1) | line width (CSS px), distance, radius
//   fog       background color (far points fade towards it), exposure of the
//             additive light
//
// Points and meshes have a second fragment entry point writing the targets
// of the order-independent transparency (`oit.ts`): `fsOit` in WGSL, the
// `oit` variant of the GLSL programs (WebGL2).
//
// Point sizes are CSS pixels times the device pixel ratio (billboards: no
// point size limit). Dots thinner than the smallest drawn radius keep their
// energy: their alpha scales with the area they would cover.

import { GLSL_OIT, WGSL_OIT } from "./oit";
import { POINT_SPHERE, type Frame3D, type Item3D } from "./render-types";

export { writesDepth } from "./render-types";

/** Bytes of the WGSL uniform struct */
export const UNIFORM_BYTES = 160;

/** Writes the uniforms of an item in the WGSL struct layout */
const writeUniforms = (
  out: Float32Array,
  viewProj: Float32Array,
  viewport: readonly [number, number, number, number],
  eye: readonly [number, number, number, number],
  light: readonly [number, number, number, number],
  material: readonly [number, number, number, number],
  params: readonly [number, number, number, number],
  fog: readonly [number, number, number, number],
): Float32Array => {
  out.set(viewProj, 0);
  out.set(viewport, 16);
  out.set(eye, 20);
  out.set(light, 24);
  out.set(material, 28);
  out.set(params, 32);
  out.set(fog, 36);
  return out;
};

/** Uniform values of an item (40 floats, the WGSL struct layout) */
export const itemUniforms = (
  item: Item3D,
  frame: Frame3D,
  out: Float32Array,
): Float32Array => {
  const second =
    item.kind === "points"
      ? item.perspective
        ? 1
        : 0
      : item.kind === "lines"
        ? item.width
        : 0;
  return writeUniforms(
    out,
    frame.viewProj,
    [frame.width, frame.height, frame.dpr, frame.orthographic ? 1 : 0],
    [
      frame.eye[0],
      frame.eye[1],
      frame.eye[2],
      item.kind === "lines"
        ? item.bias
        : item.kind === "points"
          ? (item.style ?? POINT_SPHERE)
          : 0,
    ],
    [
      frame.light[0],
      frame.light[1],
      frame.light[2],
      item.kind === "points" && item.additive ? 1 : 0,
    ],
    frame.lighting,
    [item.opacity, second, frame.distance, frame.radius],
    [frame.fog[0], frame.fog[1], frame.fog[2], frame.exposure],
  );
};

// ------------------------------------------------------------------- WGSL

const WGSL_UNIFORMS = /* wgsl */ `
struct U {
  viewProj: mat4x4f,
  viewport: vec4f,
  eye: vec4f,
  light: vec4f,
  material: vec4f,
  params: vec4f,
  fog: vec4f,
};
@group(0) @binding(0) var<uniform> u: U;

fn toWebGpuDepth(p: vec4f) -> vec4f {
  return vec4f(p.x, p.y, (p.z + p.w) * 0.5, p.w);
}

fn depthCue(world: vec3f) -> f32 {
  let near = u.params.z - u.params.w;
  return clamp((length(world - u.eye.xyz) - near) / (2.0 * u.params.w), 0.0, 1.0);
}
${WGSL_OIT}`;

export const WGSL_POINTS = /* wgsl */ `${WGSL_UNIFORMS}
struct Out {
  @builtin(position) position: vec4f,
  @location(0) offset: vec2f,
  @location(1) radius: f32,
  @location(2) color: vec4f,
  @location(3) fog: f32,
  @location(4) coverage: f32,
};

@vertex
fn vs(
  @builtin(vertex_index) vi: u32,
  @location(0) pos: vec3f,
  @location(1) size: f32,
  @location(2) color: vec4f,
) -> Out {
  var out: Out;
  let corner = vec2f(f32(vi & 1u), f32(vi >> 1u)) * 2.0 - 1.0;
  let clip = u.viewProj * vec4f(pos, 1.0);
  var factor = 1.0;
  if (u.params.y > 0.5 && u.viewport.w < 0.5) {
    factor = clamp(u.params.z / max(clip.w, 1e-6), 0.5, 2.0);
  }
  let glow = u.eye.w > 1.5;
  let raw = max(size, 0.0) * u.viewport.z * factor * 0.5;
  let radius = max(raw, select(0.5, 0.75, glow));
  let reach = select(radius + 1.0, radius * 2.2 + 1.0, glow);
  let shift = corner * reach * 2.0 / u.viewport.xy * clip.w;
  out.position = toWebGpuDepth(vec4f(clip.xy + shift, clip.z, clip.w));
  out.offset = corner * reach;
  out.radius = radius;
  out.color = color;
  out.fog = depthCue(pos);
  out.coverage = min(1.0, raw * raw / (radius * radius));
  return out;
}

fn shade(in: Out) -> vec4f {
  let d = length(in.offset);
  let r = in.radius;
  var alpha = clamp(r + 0.5 - d, 0.0, 1.0);
  var rgb = in.color.rgb;
  if (u.eye.w > 1.5) {
    // glow: an anti-aliased core and a gaussian halo
    let core = clamp(r * 0.6 + 0.5 - d, 0.0, 1.0);
    let q = d / r;
    alpha = core + (1.0 - core) * exp(-1.2 * q * q);
    rgb = rgb + (vec3f(1.0) - rgb) * (0.2 * core);
  } else if (u.eye.w < 0.5) {
    let q = min(d / r, 1.0);
    let n = vec3f(in.offset.x / r, in.offset.y / r, sqrt(max(0.0, 1.0 - q * q)));
    let l = normalize(vec3f(-0.45, 0.55, 0.7));
    let lambert = max(dot(n, l), 0.0);
    let shaded = rgb * (0.62 + 0.45 * lambert) + vec3f(pow(lambert, 18.0) * 0.28);
    rgb = mix(rgb, shaded, smoothstep(1.5, 3.5, r));
  }
  if (alpha <= 0.004) { discard; }
  let fog = in.fog * 0.45;
  if (u.light.w > 0.5) {
    // additive light fades with the distance
    alpha = alpha * (1.0 - fog);
    rgb = rgb * u.fog.w;
  } else {
    rgb = mix(rgb, u.fog.rgb, fog);
  }
  alpha = alpha * in.coverage * in.color.a * u.params.x;
  return vec4f(rgb * alpha, alpha);
}

@fragment
fn fs(in: Out) -> @location(0) vec4f {
  return shade(in);
}

@fragment
fn fsOit(in: Out) -> Oit {
  return oit(shade(in), in.fog);
}
`;

export const WGSL_MESH = /* wgsl */ `${WGSL_UNIFORMS}
struct Out {
  @builtin(position) position: vec4f,
  @location(0) world: vec3f,
  @location(1) normal: vec3f,
  @location(2) color: vec4f,
};

@vertex
fn vs(
  @location(0) pos: vec3f,
  @location(1) normal: vec3f,
  @location(2) color: vec4f,
) -> Out {
  var out: Out;
  out.position = toWebGpuDepth(u.viewProj * vec4f(pos, 1.0));
  out.world = pos;
  out.normal = normal;
  out.color = color;
  return out;
}

fn shade(in: Out) -> vec4f {
  var n = normalize(in.normal);
  let v = normalize(u.eye.xyz - in.world);
  if (dot(n, v) < 0.0) { n = -n; }
  let l = u.light.xyz;
  let diffuse = max(dot(n, l), 0.0);
  let h = normalize(l + v);
  let specular = pow(max(dot(n, h), 0.0), u.material.w) * u.material.z;
  let rgb = in.color.rgb * (u.material.x + u.material.y * diffuse) + vec3f(specular);
  let alpha = in.color.a * u.params.x;
  return vec4f(rgb * alpha, alpha);
}

@fragment
fn fs(in: Out) -> @location(0) vec4f {
  return shade(in);
}

@fragment
fn fsOit(in: Out) -> Oit {
  return oit(shade(in), depthCue(in.world));
}
`;

export const WGSL_LINES = /* wgsl */ `${WGSL_UNIFORMS}
struct Out {
  @builtin(position) position: vec4f,
  @location(0) across: f32,
  @location(1) color: vec4f,
};

@vertex
fn vs(
  @builtin(vertex_index) vi: u32,
  @location(0) a: vec3f,
  @location(1) b: vec3f,
  @location(2) color: vec4f,
) -> Out {
  var out: Out;
  let corner = vec2f(f32(vi & 1u), f32(vi >> 1u));
  let ca = u.viewProj * vec4f(a, 1.0);
  let cb = u.viewProj * vec4f(b, 1.0);
  let halfSize = u.viewport.xy * 0.5;
  let sa = ca.xy / ca.w * halfSize;
  let sb = cb.xy / cb.w * halfSize;
  var dir = sb - sa;
  let len = length(dir);
  dir = select(vec2f(1.0, 0.0), dir / len, len > 1e-6);
  let normal = vec2f(-dir.y, dir.x);
  let w = max(0.5, u.params.y * u.viewport.z * 0.5) + 0.5;
  let clip = select(ca, cb, corner.x > 0.5);
  let side = corner.y * 2.0 - 1.0;
  let pixel = select(sa, sb, corner.x > 0.5) + dir * (corner.x * 2.0 - 1.0) * w + normal * side * w;
  let z = clip.z - u.eye.w * clip.w;
  out.position = toWebGpuDepth(vec4f(pixel / halfSize * clip.w, z, clip.w));
  out.across = side * w;
  out.color = color;
  return out;
}

@fragment
fn fs(in: Out) -> @location(0) vec4f {
  let core = u.params.y * u.viewport.z * 0.5;
  let coverage = clamp(max(core, 0.5) + 0.5 - abs(in.across), 0.0, 1.0) * min(1.0, core * 2.0);
  let alpha = coverage * in.color.a * u.params.x;
  if (alpha <= 0.0) { discard; }
  return vec4f(in.color.rgb * alpha, alpha);
}
`;

// ------------------------------------------------------------------- GLSL

const GLSL_UNIFORMS = `
uniform mat4 u_viewProj;
uniform vec4 u_viewport;
uniform vec4 u_eye;
uniform vec4 u_light;
uniform vec4 u_material;
uniform vec4 u_params;
uniform vec4 u_fog;
`;

const GLSL_POINTS_VS = `
attribute vec2 a_corner;
attribute vec3 a_pos;
attribute float a_size;
attribute vec4 a_color;
varying vec2 v_offset;
varying float v_radius;
varying vec4 v_color;
varying float v_fog;
varying float v_coverage;
void main() {
  vec2 corner = a_corner * 2.0 - 1.0;
  vec4 clip = u_viewProj * vec4(a_pos, 1.0);
  float factor = 1.0;
  if (u_params.y > 0.5 && u_viewport.w < 0.5) {
    factor = clamp(u_params.z / max(clip.w, 1e-6), 0.5, 2.0);
  }
  bool glow = u_eye.w > 1.5;
  float raw = max(a_size, 0.0) * u_viewport.z * factor * 0.5;
  float radius = max(raw, glow ? 0.75 : 0.5);
  float reach = glow ? radius * 2.2 + 1.0 : radius + 1.0;
  vec2 shift = corner * reach * 2.0 / u_viewport.xy * clip.w;
  gl_Position = vec4(clip.xy + shift, clip.z, clip.w);
  v_offset = corner * reach;
  v_radius = radius;
  v_color = a_color;
  float near = u_params.z - u_params.w;
  v_fog = clamp((length(a_pos - u_eye.xyz) - near) / (2.0 * u_params.w), 0.0, 1.0);
  v_coverage = min(1.0, raw * raw / (radius * radius));
}
`;

const GLSL_POINTS_FS = `
varying vec2 v_offset;
varying float v_radius;
varying vec4 v_color;
varying float v_fog;
varying float v_coverage;
void main() {
  float d = length(v_offset);
  float r = v_radius;
  float alpha = clamp(r + 0.5 - d, 0.0, 1.0);
  vec3 rgb = v_color.rgb;
  if (u_eye.w > 1.5) {
    float core = clamp(r * 0.6 + 0.5 - d, 0.0, 1.0);
    float q = d / r;
    alpha = core + (1.0 - core) * exp(-1.2 * q * q);
    rgb = rgb + (vec3(1.0) - rgb) * (0.2 * core);
  } else if (u_eye.w < 0.5) {
    float q = min(d / r, 1.0);
    vec3 n = vec3(v_offset / r, sqrt(max(0.0, 1.0 - q * q)));
    vec3 l = normalize(vec3(-0.45, 0.55, 0.7));
    float lambert = max(dot(n, l), 0.0);
    vec3 shaded = rgb * (0.62 + 0.45 * lambert) + vec3(pow(lambert, 18.0) * 0.28);
    rgb = mix(rgb, shaded, smoothstep(1.5, 3.5, r));
  }
  if (alpha <= 0.004) discard;
  float fog = v_fog * 0.45;
  if (u_light.w > 0.5) {
    alpha = alpha * (1.0 - fog);
    rgb = rgb * u_fog.w;
  } else {
    rgb = mix(rgb, u_fog.rgb, fog);
  }
  alpha = alpha * v_coverage * v_color.a * u_params.x;
  EMIT(vec4(rgb * alpha, alpha), v_fog);
}
`;

const GLSL_MESH_VS = `
attribute vec3 a_pos;
attribute vec3 a_normal;
attribute vec4 a_color;
varying vec3 v_world;
varying vec3 v_normal;
varying vec4 v_color;
void main() {
  gl_Position = u_viewProj * vec4(a_pos, 1.0);
  v_world = a_pos;
  v_normal = a_normal;
  v_color = a_color;
}
`;

const GLSL_MESH_FS = `
varying vec3 v_world;
varying vec3 v_normal;
varying vec4 v_color;
void main() {
  vec3 n = normalize(v_normal);
  vec3 v = normalize(u_eye.xyz - v_world);
  if (dot(n, v) < 0.0) n = -n;
  vec3 l = u_light.xyz;
  float diffuse = max(dot(n, l), 0.0);
  vec3 h = normalize(l + v);
  float specular = pow(max(dot(n, h), 0.0), u_material.w) * u_material.z;
  vec3 rgb = v_color.rgb * (u_material.x + u_material.y * diffuse) + vec3(specular);
  float alpha = v_color.a * u_params.x;
  float near = u_params.z - u_params.w;
  float depth = (length(v_world - u_eye.xyz) - near) / (2.0 * u_params.w);
  EMIT(vec4(rgb * alpha, alpha), depth);
}
`;

const GLSL_LINES_VS = `
attribute vec2 a_corner;
attribute vec3 a_a;
attribute vec3 a_b;
attribute vec4 a_color;
varying float v_across;
varying vec4 v_color;
void main() {
  vec4 ca = u_viewProj * vec4(a_a, 1.0);
  vec4 cb = u_viewProj * vec4(a_b, 1.0);
  vec2 halfSize = u_viewport.xy * 0.5;
  vec2 sa = ca.xy / ca.w * halfSize;
  vec2 sb = cb.xy / cb.w * halfSize;
  vec2 dir = sb - sa;
  float len = length(dir);
  dir = len > 1e-6 ? dir / len : vec2(1.0, 0.0);
  vec2 normal = vec2(-dir.y, dir.x);
  float w = max(0.5, u_params.y * u_viewport.z * 0.5) + 0.5;
  bool atEnd = a_corner.x > 0.5;
  vec4 clip = atEnd ? cb : ca;
  float side = a_corner.y * 2.0 - 1.0;
  vec2 pixel = (atEnd ? sb : sa) + dir * (a_corner.x * 2.0 - 1.0) * w + normal * side * w;
  gl_Position = vec4(pixel / halfSize * clip.w, clip.z - u_eye.w * clip.w, clip.w);
  v_across = side * w;
  v_color = a_color;
}
`;

const GLSL_LINES_FS = `
varying float v_across;
varying vec4 v_color;
void main() {
  float core = u_params.y * u_viewport.z * 0.5;
  float coverage = clamp(max(core, 0.5) + 0.5 - abs(v_across), 0.0, 1.0) * min(1.0, core * 2.0);
  float alpha = coverage * v_color.a * u_params.x;
  if (alpha <= 0.0) discard;
  EMIT(vec4(v_color.rgb * alpha, alpha), 0.0);
}
`;

const PRECISION = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

export interface GlslSource {
  vertex: string;
  fragment: string;
}

const glsl = (
  vs: string,
  fs: string,
  version: 1 | 2,
  oit = false,
): GlslSource =>
  version === 2
    ? {
        vertex: `#version 300 es\n#define attribute in\n#define varying out\n${GLSL_UNIFORMS}${vs}`,
        fragment: `#version 300 es\nprecision highp float;\n#define varying in\n${GLSL_UNIFORMS}${
          oit
            ? GLSL_OIT
            : "out vec4 fragColor;\n#define EMIT(c, d) fragColor = (c)\n"
        }${fs}`,
      }
    : {
        vertex: `${GLSL_UNIFORMS}${vs}`,
        fragment: `${PRECISION}#define EMIT(c, d) gl_FragColor = (c)\n${GLSL_UNIFORMS}${fs}`,
      };

/** GLSL programs of the three primitives for WebGL (1) or WebGL2 */
export const glslPrograms = (version: 1 | 2) => ({
  points: glsl(GLSL_POINTS_VS, GLSL_POINTS_FS, version),
  mesh: glsl(GLSL_MESH_VS, GLSL_MESH_FS, version),
  lines: glsl(GLSL_LINES_VS, GLSL_LINES_FS, version),
});

/**
 * Variants of the points and meshes writing the targets of the
 * order-independent transparency (WebGL2)
 */
export const glslOitPrograms = () => ({
  points: glsl(GLSL_POINTS_VS, GLSL_POINTS_FS, 2, true),
  mesh: glsl(GLSL_MESH_VS, GLSL_MESH_FS, 2, true),
});

/** Attribute names of every program, bound to locations 0, 1, ... */
export const GLSL_ATTRIBUTES = {
  points: ["a_corner", "a_pos", "a_size", "a_color"],
  mesh: ["a_pos", "a_normal", "a_color"],
  lines: ["a_corner", "a_a", "a_b", "a_color"],
} as const;
