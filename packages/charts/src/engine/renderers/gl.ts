// Helpers shared by the WebGL2 and WebGL (1) backends.

import type { RenderFrame, RenderItem } from "./types";

export type GlContext = WebGLRenderingContext | WebGL2RenderingContext;

export interface GlProgram {
  program: WebGLProgram;
  xform: WebGLUniformLocation | null;
  viewport: WebGLUniformLocation | null;
  color: WebGLUniformLocation | null;
  params: WebGLUniformLocation | null;
}

/** Context attributes of the data layer (premultiplied, no MSAA: the shaders anti-alias) */
export const glContextAttributes = (
  requireHardware: boolean,
): WebGLContextAttributes => ({
  alpha: true,
  premultipliedAlpha: true,
  antialias: false,
  depth: false,
  stencil: false,
  preserveDrawingBuffer: false,
  failIfMajorPerformanceCaveat: requireHardware,
});

/** Compiles and links a program; `attributes[i]` is bound to location `i` */
export const compileProgram = (
  gl: GlContext,
  source: { vertex: string; fragment: string },
  attributes: readonly string[],
): GlProgram | null => {
  const shader = (type: number, code: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, code);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s);
      return null;
    }
    return s;
  };
  const vs = shader(gl.VERTEX_SHADER, source.vertex);
  const fs = shader(gl.FRAGMENT_SHADER, source.fragment);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  attributes.forEach((name, i) => gl.bindAttribLocation(program, i, name));
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return {
    program,
    xform: gl.getUniformLocation(program, "u_xform"),
    viewport: gl.getUniformLocation(program, "u_viewport"),
    color: gl.getUniformLocation(program, "u_color"),
    params: gl.getUniformLocation(program, "u_params"),
  };
};

export const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i;

/** Software rasterizer (SwiftShader, llvmpipe, ...) behind the WebGL context */
export const isSoftwareRenderer = (gl: GlContext): boolean => {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  return SOFTWARE_RENDERER.test(String(name ?? ""));
};

/** `u_params` of an item (see the uniform layout in shaders.ts) */
export const itemParams = (
  item: RenderItem,
  frame: RenderFrame,
): [number, number, number, number] => {
  switch (item.kind) {
    case "line":
      return [(item.width * frame.dpr) / 2, 0, 0, 0];
    case "area":
      return [item.flat ? 1 : 0, item.opacity, 0, 0];
    case "bar":
      return [item.halfWidth, item.radius, item.inset, item.minHalf];
    default:
      return [item.opacity, item.stroke, 0, 0];
  }
};
