// Shaders of the GPU backends. Mesh vertices are on the 24×24 icon grid;
// each instance places, rotates and colors one icon (premultiplied alpha).

/** GLSL ES 1.00, used by the WebGL and WebGL2 backends */
export const GLSL_VERTEX = `
attribute vec2 a_position;
attribute vec4 a_box;
attribute vec4 a_color;
attribute float a_depth;
uniform vec2 u_viewport;
varying vec4 v_color;
void main() {
  vec2 q = (a_position - 12.0) * (a_box.z / 24.0);
  float c = cos(a_box.w);
  float s = sin(a_box.w);
  vec2 p = vec2(q.x * c - q.y * s, q.x * s + q.y * c) + a_box.xy + a_box.z * 0.5;
  vec2 clip = p / u_viewport * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, a_depth * 2.0 - 1.0, 1.0);
  v_color = a_color;
}
`;

export const GLSL_FRAGMENT = `
precision mediump float;
varying vec4 v_color;
void main() {
  gl_FragColor = v_color;
}
`;

/** WGSL, used by the WebGPU backend */
export const WGSL = `
struct Uniforms {
  viewport: vec2f,
  pad: vec2f,
};
@group(0) @binding(0) var<uniform> u: Uniforms;

struct Varyings {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};

@vertex
fn vs(
  @location(0) position: vec2f,
  @location(1) box: vec4f,
  @location(2) color: vec4f,
  @location(3) depth: f32,
) -> Varyings {
  let q = (position - vec2f(12.0)) * (box.z / 24.0);
  let c = cos(box.w);
  let s = sin(box.w);
  let p = vec2f(q.x * c - q.y * s, q.x * s + q.y * c) + box.xy + vec2f(box.z * 0.5);
  let clip = p / u.viewport * 2.0 - 1.0;
  var out: Varyings;
  out.position = vec4f(clip.x, -clip.y, depth, 1.0);
  out.color = color;
  return out;
}

@fragment
fn fs(v: Varyings) -> @location(0) vec4f {
  return v.color;
}
`;
