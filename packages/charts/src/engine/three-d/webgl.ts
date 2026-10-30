// WebGL2 / WebGL (1) backend of the 3D charts: the same GLSL for both
// (a macro prefix makes it GLSL ES 3.0), instancing through WebGL2 or
// ANGLE_instanced_arrays, 32-bit indices through WebGL2 or
// OES_element_index_uint. Attributes are bound for every draw (no vertex
// array objects in WebGL 1): a few calls per item.
//
// WebGL2 draws into its own multisampled framebuffer, blitted to the canvas.
// With EXT_color_buffer_float (multisampled RGBA16F), the blended items go
// through the weighted blended order-independent transparency (`oit.ts`):
// opaque items, then the blended ones into two float targets sharing the
// depth buffer (resolved into textures by blits), their composite, then the
// lines. Otherwise (and on WebGL 1) the blended items are drawn sorted.
//
// The context is part of the page-wide budget (`gl-budget.ts`): when it is
// suspended off-screen, its GPU objects go; the restore builds the programs
// again (the framebuffers and buffers follow lazily) and redraws the last
// frame. A suspension is not a loss: only real losses reach `onLost`.

import type { RendererLostHandler } from "../renderers/types";
import { claimGlSlot } from "../renderers/gl-budget";
import { GLSL_COMPOSITE } from "./oit";
import {
  POINT_STRIDE,
  SEGMENT_STRIDE,
  VERTEX_STRIDE,
  drawOrder,
  drawRank,
  type Frame3D,
  type Item3D,
  type Renderer3D,
} from "./render-types";
import {
  GLSL_ATTRIBUTES,
  glslOitPrograms,
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
const MAX_SAMPLES = 4;

/**
 * Samples of the WebGL2 framebuffers and whether the order-independent
 * transparency is possible: float color buffers (EXT_color_buffer_float)
 * that can be multisampled as much as the color
 */
export const webGl2Capabilities = (
  gl: WebGL2RenderingContext,
): { samples: number; orderIndependent: boolean } => {
  const max = Number(gl.getParameter(gl.MAX_SAMPLES)) || 0;
  const samples = Math.max(0, Math.min(MAX_SAMPLES, max));
  if (!gl.getExtension("EXT_color_buffer_float"))
    return { samples, orderIndependent: false };
  const counts = gl.getInternalformatParameter(
    gl.RENDERBUFFER,
    gl.RGBA16F,
    gl.SAMPLES,
  ) as ArrayLike<number> | null;
  let floatMax = 0;
  for (let i = 0; i < (counts?.length ?? 0); i++)
    floatMax = Math.max(floatMax, counts?.[i] ?? 0);
  // single-sampled framebuffers: any float support is enough
  if (samples > 1 && floatMax < 2) return { samples, orderIndependent: false };
  return {
    samples: Math.min(samples, floatMax || samples),
    orderIndependent: true,
  };
};

interface Framebuffers {
  width: number;
  height: number;
  main: WebGLFramebuffer;
  color: WebGLRenderbuffer;
  depth: WebGLRenderbuffer;
  /** Transparency targets, created on first use */
  oit: {
    fbo: WebGLFramebuffer;
    buffers: [WebGLRenderbuffer, WebGLRenderbuffer];
    resolved: [WebGLFramebuffer, WebGLFramebuffer];
    textures: [WebGLTexture, WebGLTexture];
  } | null;
}

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
    // WebGL2 multisamples its own framebuffer
    antialias: version === 1,
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
  if (requireHardware && isSoftwareRenderer(gl)) {
    loseContext();
    return null;
  }
  let angle: ANGLE_instanced_arrays | null = null;
  const divisor = (location: number, value: number) => {
    if (gl2) gl2.vertexAttribDivisor(location, value);
    else angle?.vertexAttribDivisorANGLE(location, value);
  };
  const drawInstanced = (count: number) => {
    if (gl2) gl2.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
    else angle?.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, 4, count);
  };

  let programs: Record<Item3D["kind"], Program> | null = null;
  let corners: WebGLBuffer | null = null;
  let capabilities = { samples: 0, orderIndependent: false };
  let oitPrograms: {
    points: Program;
    mesh: Program;
    composite: WebGLProgram;
  } | null = null;
  let framebuffers: Framebuffers | null = null;

  /**
   * Extensions, programs, the corner buffer and the transparency programs:
   * at creation and again after a restore (GL objects and extension objects
   * don't survive the context). False when the context can't draw.
   */
  const build = (): boolean => {
    programs = null;
    corners = null;
    oitPrograms = null;
    // recreated lazily at the next draw
    framebuffers = null;
    angle = gl2 ? null : gl.getExtension("ANGLE_instanced_arrays");
    const uint = gl2 ? true : !!gl.getExtension("OES_element_index_uint");
    if (!gl2 && (!angle || !uint)) return false;
    const sources = glslPrograms(version);
    const points = compile(gl, sources.points, GLSL_ATTRIBUTES.points);
    const mesh = compile(gl, sources.mesh, GLSL_ATTRIBUTES.mesh);
    const lines = compile(gl, sources.lines, GLSL_ATTRIBUTES.lines);
    const buffer = gl.createBuffer();
    if (!points || !mesh || !lines || !buffer) return false;
    programs = { points, mesh, lines };
    corners = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.bufferData(gl.ARRAY_BUFFER, CORNERS, gl.STATIC_DRAW);

    // order-independent transparency (WebGL2 with float color buffers)
    capabilities = gl2
      ? webGl2Capabilities(gl2)
      : { samples: 0, orderIndependent: false };
    if (gl2 && capabilities.orderIndependent) {
      const oit = glslOitPrograms();
      const p = compile(gl, oit.points, GLSL_ATTRIBUTES.points);
      const m = compile(gl, oit.mesh, GLSL_ATTRIBUTES.mesh);
      const c = compile(gl, GLSL_COMPOSITE, []);
      if (p && m && c) {
        oitPrograms = { points: p, mesh: m, composite: c.program };
        gl.useProgram(c.program);
        gl.uniform1i(gl.getUniformLocation(c.program, "u_accum"), 0);
        gl.uniform1i(gl.getUniformLocation(c.program, "u_extra"), 1);
      } else {
        for (const program of [p, m, c])
          if (program) gl.deleteProgram(program.program);
      }
    }
    return true;
  };
  if (!build()) {
    loseContext();
    return null;
  }
  const deleteOit = (fb: Framebuffers) => {
    if (!fb.oit) return;
    gl.deleteFramebuffer(fb.oit.fbo);
    for (const b of fb.oit.buffers) gl.deleteRenderbuffer(b);
    for (const f of fb.oit.resolved) gl.deleteFramebuffer(f);
    for (const t of fb.oit.textures) gl.deleteTexture(t);
    fb.oit = null;
  };
  const deleteFramebuffers = () => {
    if (!framebuffers) return;
    deleteOit(framebuffers);
    gl.deleteFramebuffer(framebuffers.main);
    gl.deleteRenderbuffer(framebuffers.color);
    gl.deleteRenderbuffer(framebuffers.depth);
    framebuffers = null;
  };
  const renderbuffer = (format: number, width: number, height: number) => {
    const rb = gl.createRenderbuffer();
    if (!gl2 || !rb) return rb;
    gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
    if (capabilities.samples > 1)
      gl2.renderbufferStorageMultisample(
        gl.RENDERBUFFER,
        capabilities.samples,
        format,
        width,
        height,
      );
    else gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
    return rb;
  };
  const complete = () =>
    gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  /** The multisampled framebuffer of WebGL2 (null: draw into the canvas) */
  const mainFramebuffer = (): Framebuffers | null => {
    if (!gl2) return null;
    const { width, height } = canvas;
    if (framebuffers?.width === width && framebuffers.height === height)
      return framebuffers;
    deleteFramebuffers();
    const main = gl.createFramebuffer();
    const color = renderbuffer(gl2.RGBA8, width, height);
    const depth = renderbuffer(gl2.DEPTH_COMPONENT24, width, height);
    if (!main || !color || !depth) return null;
    gl.bindFramebuffer(gl.FRAMEBUFFER, main);
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.RENDERBUFFER,
      color,
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      depth,
    );
    framebuffers = { width, height, main, color, depth, oit: null };
    if (!complete()) {
      deleteFramebuffers();
      return null;
    }
    return framebuffers;
  };
  /** The transparency targets sharing the depth of `fb` */
  const oitFramebuffers = (fb: Framebuffers) => {
    if (fb.oit || !gl2) return fb.oit;
    const { width, height } = fb;
    const fbo = gl.createFramebuffer();
    const accum = renderbuffer(gl2.RGBA16F, width, height);
    const extra = renderbuffer(gl2.RGBA16F, width, height);
    const resolved = [gl.createFramebuffer(), gl.createFramebuffer()];
    const textures = [gl.createTexture(), gl.createTexture()];
    const [r0, r1] = resolved;
    const [t0, t1] = textures;
    if (!fbo || !accum || !extra || !r0 || !r1 || !t0 || !t1) return null;
    fb.oit = {
      fbo,
      buffers: [accum, extra],
      resolved: [r0, r1],
      textures: [t0, t1],
    };
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.RENDERBUFFER,
      accum,
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl2.COLOR_ATTACHMENT1,
      gl.RENDERBUFFER,
      extra,
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      fb.depth,
    );
    gl2.drawBuffers([gl.COLOR_ATTACHMENT0, gl2.COLOR_ATTACHMENT1]);
    let ok = complete();
    fb.oit.textures.forEach((texture, i) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl2.texStorage2D(gl.TEXTURE_2D, 1, gl2.RGBA16F, width, height);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb.oit!.resolved[i]!);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0,
      );
      ok &&= complete();
    });
    gl.bindTexture(gl.TEXTURE_2D, null);
    if (!ok) {
      deleteOit(fb);
      oitPrograms = null;
    }
    return fb.oit;
  };

  let lost = false;
  let last: { items: readonly Item3D[]; frame: Frame3D } | null = null;
  const resources = new Map<string, ItemResources>();
  // past the page-wide context budget, the context may be suspended while
  // off-screen (not a failure): its GPU objects go, and come back with the
  // context, which then redraws its last frame
  const slot = claimGlSlot(canvas, gl, {
    suspend: () => {
      resources.clear();
      programs = null;
      oitPrograms = null;
      corners = null;
      framebuffers = null;
    },
    restore: () => {
      if (lost) return;
      if (!build()) {
        lost = true;
        onLost();
      } else if (last) renderFrame(last.items, last.frame);
    },
    lost: () => {
      lost = true;
      onLost();
    },
  });
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

  /** Sets the uniforms of an item and draws it */
  const draw = (
    item: Item3D,
    program: Program,
    frame: Frame3D,
    seen: Set<string>,
  ) => {
    seen.add(item.key);
    const count = item.kind === "mesh" ? item.indices.length : item.count;
    if (count <= 0) return;
    const res = upload(item);
    if (!res) return;
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
    bind(item, res);
    if (item.kind === "mesh") {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, res.index);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_INT, 0);
    } else {
      drawInstanced(count);
    }
  };

  /** Blended items into the transparency targets, then their composite */
  const drawTransparent = (
    fb: Framebuffers,
    oit: NonNullable<Framebuffers["oit"]>,
    blended: readonly Item3D[],
    frame: Frame3D,
    seen: Set<string>,
  ) => {
    if (!gl2 || !oitPrograms) return;
    const { width, height } = fb;
    gl.bindFramebuffer(gl.FRAMEBUFFER, oit.fbo);
    gl2.clearBufferfv(gl2.COLOR, 0, [0, 0, 0, 0]);
    gl2.clearBufferfv(gl2.COLOR, 1, [0, 0, 0, 0]);
    gl.depthMask(false);
    gl.blendFunc(gl.ONE, gl.ONE);
    for (const item of blended) {
      if (item.kind !== "lines")
        draw(item, oitPrograms[item.kind], frame, seen);
    }
    // resolve the samples into the textures read by the composite
    gl.bindFramebuffer(gl2.READ_FRAMEBUFFER, oit.fbo);
    oit.resolved.forEach((target, i) => {
      gl2.readBuffer(i === 0 ? gl.COLOR_ATTACHMENT0 : gl2.COLOR_ATTACHMENT1);
      gl.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, target);
      gl2.blitFramebuffer(
        0,
        0,
        width,
        height,
        0,
        0,
        width,
        height,
        gl.COLOR_BUFFER_BIT,
        gl.NEAREST,
      );
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb.main);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    for (let i = 0; i < MAX_LOCATIONS; i++) {
      gl.disableVertexAttribArray(i);
      divisor(i, 0);
    }
    gl.useProgram(oitPrograms.composite);
    oit.textures.forEach((texture, i) => {
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    });
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.enable(gl.DEPTH_TEST);
  };

  /** Draws a frame (the context is live) */
  const renderFrame = (items: readonly Item3D[], frame: Frame3D) => {
    const progs = programs;
    if (!progs) return;
    const fb = mainFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb ? fb.main : null);
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
    const ordered = drawOrder(items);
    const blended = ordered.filter((item) => drawRank(item) === 2);
    const oit =
      fb && oitPrograms && blended.length > 0 ? oitFramebuffers(fb) : null;
    let additive = false;
    let composited = !oit;
    for (const item of ordered) {
      const rank = drawRank(item);
      if (oit && rank === 2) continue;
      if (fb && oit && rank === 3 && !composited) {
        drawTransparent(fb, oit, blended, frame, seen);
        composited = true;
        additive = false;
      }
      gl.depthMask(writesDepth(item));
      const add = item.kind === "points" && !!item.additive;
      if (add !== additive) {
        // additive points: the colors add up, the coverage composites as usual
        if (add)
          gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        else gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        additive = add;
      }
      draw(item, progs[item.kind], frame, seen);
    }
    if (fb && oit && !composited) {
      drawTransparent(fb, oit, blended, frame, seen);
      additive = false;
    }
    gl.depthMask(true);
    if (additive) gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    if (fb && gl2) {
      // the samples resolved into the canvas
      gl.bindFramebuffer(gl2.READ_FRAMEBUFFER, fb.main);
      gl.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, null);
      gl2.blitFramebuffer(
        0,
        0,
        fb.width,
        fb.height,
        0,
        0,
        fb.width,
        fb.height,
        gl.COLOR_BUFFER_BIT,
        gl.NEAREST,
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    for (const [key, res] of resources) {
      if (!seen.has(key)) {
        gl.deleteBuffer(res.vertex);
        if (res.index) gl.deleteBuffer(res.index);
        resources.delete(key);
      }
    }
  };

  return {
    kind: version === 2 ? "webgl2" : "webgl",
    canvas,
    get orderIndependent() {
      return !!oitPrograms;
    },
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      last = { items, frame };
      // suspended by the context budget: redrawn by the restore
      if (lost || !slot.use() || gl.isContextLost()) return;
      renderFrame(items, frame);
    },
    destroy() {
      slot.release();
      last = null;
      if (!gl.isContextLost()) {
        for (const res of resources.values()) {
          gl.deleteBuffer(res.vertex);
          if (res.index) gl.deleteBuffer(res.index);
        }
        for (const p of Object.values(programs ?? {})) {
          gl.deleteProgram(p.program);
        }
        if (oitPrograms) {
          gl.deleteProgram(oitPrograms.points.program);
          gl.deleteProgram(oitPrograms.mesh.program);
          gl.deleteProgram(oitPrograms.composite);
        }
        deleteFramebuffers();
        gl.deleteBuffer(corners);
      }
      oitPrograms = null;
      programs = null;
      corners = null;
      framebuffers = null;
      resources.clear();
      loseContext();
    },
  };
};
