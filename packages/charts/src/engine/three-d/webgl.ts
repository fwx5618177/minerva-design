// WebGL2 / WebGL (1) backend of the 3D charts: the same GLSL for both
// (a macro prefix makes it GLSL ES 3.0), instancing through WebGL2 or
// ANGLE_instanced_arrays, 32-bit indices through WebGL2 or
// OES_element_index_uint. Attributes are bound for every draw (no vertex
// array objects in WebGL 1): a few calls per item.

import type { RendererLostHandler } from "../renderers/types";
import {
  POINT_STRIDE,
  SEGMENT_STRIDE,
  VERTEX_STRIDE,
  drawOrder,
  type Item3D,
  type Renderer3D,
} from "./render-types";
import {
  GLSL_ATTRIBUTES,
  glslPrograms,
  itemUniforms,
  writesDepth,
  type GlslSource,
} from "./shaders";

type Gl = WebGLRenderingContext | WebGL2RenderingContext;

/** Software rasterizers behind a WebGL context */
export const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i;

export const isSoftwareRenderer = (gl: Gl): boolean => {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  return SOFTWARE_RENDERER.test(String(name ?? ""));
};

const UNIFORMS = [
  "u_viewProj",
  "u_viewport",
  "u_eye",
  "u_light",
  "u_material",
  "u_params",
  "u_fog",
] as const;

interface Program {
  program: WebGLProgram;
  uniforms: Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
}

const compile = (
  gl: Gl,
  source: GlslSource,
  attributes: readonly string[],
): Program | null => {
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
  const uniforms = {} as Program["uniforms"];
  for (const name of UNIFORMS)
    uniforms[name] = gl.getUniformLocation(program, name);
  return { program, uniforms };
};

interface ItemResources {
  version: number;
  kind: Item3D["kind"];
  vertex: WebGLBuffer;
  index: WebGLBuffer | null;
  /** `order` of the uploaded indices (meshes) */
  order: number;
}

/** Corners of the triangle strip of a billboard / segment */
const CORNERS = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
const MAX_LOCATIONS = 4;

export const createWebGl3D = (
  canvas: HTMLCanvasElement,
  version: 1 | 2,
  onLost: RendererLostHandler,
  /** Refuses software rendering: the decimating Canvas2D backend is faster there */
  requireHardware = false,
): Renderer3D | null => {
  const attributes: WebGLContextAttributes = {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    depth: true,
    stencil: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: requireHardware,
  };
  const gl = canvas.getContext(
    version === 2 ? "webgl2" : "webgl",
    attributes,
  ) as Gl | null;
  if (!gl) return null;
  const loseContext = () =>
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  const gl2 = version === 2 ? (gl as WebGL2RenderingContext) : null;
  const angle = gl2 ? null : gl.getExtension("ANGLE_instanced_arrays");
  const uint = gl2 ? true : !!gl.getExtension("OES_element_index_uint");
  if (
    (!gl2 && (!angle || !uint)) ||
    (requireHardware && isSoftwareRenderer(gl))
  ) {
    loseContext();
    return null;
  }
  const divisor = (location: number, value: number) => {
    if (gl2) gl2.vertexAttribDivisor(location, value);
    else angle?.vertexAttribDivisorANGLE(location, value);
  };
  const drawInstanced = (count: number) => {
    if (gl2) gl2.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
    else angle?.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, 4, count);
  };

  const sources = glslPrograms(version);
  const points = compile(gl, sources.points, GLSL_ATTRIBUTES.points);
  const mesh = compile(gl, sources.mesh, GLSL_ATTRIBUTES.mesh);
  const lines = compile(gl, sources.lines, GLSL_ATTRIBUTES.lines);
  const corners = gl.createBuffer();
  if (!points || !mesh || !lines || !corners) {
    loseContext();
    return null;
  }
  const programs = { points, mesh, lines };
  gl.bindBuffer(gl.ARRAY_BUFFER, corners);
  gl.bufferData(gl.ARRAY_BUFFER, CORNERS, gl.STATIC_DRAW);

  let lost = false;
  const handleLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    onLost();
  };
  canvas.addEventListener("webglcontextlost", handleLost);

  const resources = new Map<string, ItemResources>();
  const uniformData = new Float32Array(40);

  const attribute = (
    location: number,
    size: number,
    type: number,
    stride: number,
    offset: number,
    perInstance: boolean,
  ) => {
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(
      location,
      size,
      type,
      type === gl.UNSIGNED_BYTE,
      stride,
      offset,
    );
    divisor(location, perInstance ? 1 : 0);
  };

  const bind = (item: Item3D, res: ItemResources) => {
    const F = gl.FLOAT;
    const U8 = gl.UNSIGNED_BYTE;
    let used: number;
    if (item.kind === "mesh") {
      gl.bindBuffer(gl.ARRAY_BUFFER, res.vertex);
      attribute(0, 3, F, VERTEX_STRIDE, 0, false);
      attribute(1, 3, F, VERTEX_STRIDE, 12, false);
      attribute(2, 4, U8, VERTEX_STRIDE, 24, false);
      used = 3;
    } else {
      gl.bindBuffer(gl.ARRAY_BUFFER, corners);
      attribute(0, 2, F, 0, 0, false);
      gl.bindBuffer(gl.ARRAY_BUFFER, res.vertex);
      if (item.kind === "points") {
        attribute(1, 3, F, POINT_STRIDE, 0, true);
        attribute(2, 1, F, POINT_STRIDE, 12, true);
        attribute(3, 4, U8, POINT_STRIDE, 16, true);
      } else {
        attribute(1, 3, F, SEGMENT_STRIDE, 0, true);
        attribute(2, 3, F, SEGMENT_STRIDE, 12, true);
        attribute(3, 4, U8, SEGMENT_STRIDE, 24, true);
      }
      used = 4;
    }
    for (let i = used; i < MAX_LOCATIONS; i++) {
      gl.disableVertexAttribArray(i);
      divisor(i, 0);
    }
  };

  const upload = (item: Item3D): ItemResources | null => {
    const existing = resources.get(item.key);
    if (
      existing &&
      existing.version === item.version &&
      existing.kind === item.kind
    ) {
      // same mesh, triangles in a new order (transparent, sorted by depth)
      if (
        item.kind === "mesh" &&
        existing.index &&
        (item.order ?? 0) !== existing.order
      ) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, existing.index);
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 0, item.indices);
        existing.order = item.order ?? 0;
      }
      return existing;
    }
    if (existing) {
      gl.deleteBuffer(existing.vertex);
      if (existing.index) gl.deleteBuffer(existing.index);
      resources.delete(item.key);
    }
    const vertex = gl.createBuffer();
    if (!vertex) return null;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      item.kind === "mesh" ? item.vertices : item.data,
      gl.STATIC_DRAW,
    );
    let index: WebGLBuffer | null = null;
    if (item.kind === "mesh") {
      index = gl.createBuffer();
      if (!index) {
        gl.deleteBuffer(vertex);
        return null;
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        item.indices,
        item.order === undefined ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW,
      );
    }
    const res = {
      version: item.version,
      kind: item.kind,
      vertex,
      index,
      order: item.kind === "mesh" ? (item.order ?? 0) : 0,
    };
    resources.set(item.key, res);
    return res;
  };

  return {
    kind: version === 2 ? "webgl2" : "webgl",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      if (lost || gl.isContextLost()) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clearDepth(1);
      gl.depthMask(true);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.disable(gl.CULL_FACE);
      const seen = new Set<string>();
      for (const item of drawOrder(items)) {
        seen.add(item.key);
        const count = item.kind === "mesh" ? item.indices.length : item.count;
        if (count <= 0) continue;
        const res = upload(item);
        if (!res) continue;
        const program = programs[item.kind];
        gl.useProgram(program.program);
        const u = itemUniforms(item, frame, uniformData);
        const loc = program.uniforms;
        gl.uniformMatrix4fv(loc.u_viewProj, false, u.subarray(0, 16));
        gl.uniform4fv(loc.u_viewport, u.subarray(16, 20));
        gl.uniform4fv(loc.u_eye, u.subarray(20, 24));
        gl.uniform4fv(loc.u_light, u.subarray(24, 28));
        gl.uniform4fv(loc.u_material, u.subarray(28, 32));
        gl.uniform4fv(loc.u_params, u.subarray(32, 36));
        gl.uniform4fv(loc.u_fog, u.subarray(36, 40));
        gl.depthMask(writesDepth(item));
        bind(item, res);
        if (item.kind === "mesh") {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, res.index);
          gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_INT, 0);
        } else {
          drawInstanced(count);
        }
      }
      gl.depthMask(true);
      for (const [key, res] of resources) {
        if (!seen.has(key)) {
          gl.deleteBuffer(res.vertex);
          if (res.index) gl.deleteBuffer(res.index);
          resources.delete(key);
        }
      }
    },
    destroy() {
      canvas.removeEventListener("webglcontextlost", handleLost);
      if (!gl.isContextLost()) {
        for (const res of resources.values()) {
          gl.deleteBuffer(res.vertex);
          if (res.index) gl.deleteBuffer(res.index);
        }
        for (const p of Object.values(programs)) gl.deleteProgram(p.program);
        gl.deleteBuffer(corners);
      }
      resources.clear();
      loseContext();
    },
  };
};
