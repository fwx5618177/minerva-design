// GPU backends of the vector layer (shape charts): WebGPU, then WebGL2 /
// WebGL. Both draw a VectorBatch with 4x MSAA and an 8-bit stencil (see the
// draw modes in vector.ts). Canvas2D needs no backend: the host draws the
// scene directly.

import { resolveRendererPreference } from "../defaults";
import type { ChartRendererKind, ChartRendererPreference } from "../types";
import { rendererCandidates } from "./detect";
import { isSoftwareRenderer } from "./gl";
import { claimGlSlot } from "./gl-budget";
import { VECTOR_STRIDE, type VectorBatch } from "./vector";

export interface VectorRenderer {
  readonly kind: Exclude<ChartRendererKind, "canvas2d">;
  readonly canvas: HTMLCanvasElement;
  /** Drawing buffer size in device pixels */
  resize(width: number, height: number): void;
  render(batch: VectorBatch): void;
  destroy(): void;
}

// lib.dom has the WebGPU interfaces but not these constant objects
const BUFFER_VERTEX = 0x20;
const BUFFER_UNIFORM = 0x40;
const BUFFER_COPY_DST = 0x08;
const TEXTURE_RENDER_ATTACHMENT = 0x10;
const STAGE_VERTEX = 0x1;
const COLOR_ALL = 0xf;
const SAMPLES = 4;

const WGSL = /* wgsl */ `
struct U { size: vec4f };
@group(0) @binding(0) var<uniform> u: U;
struct O { @builtin(position) pos: vec4f, @location(0) color: vec4f };
@vertex fn vs(@location(0) p: vec2f, @location(1) c: vec4f) -> O {
  var o: O;
  o.pos = vec4f(p.x / u.size.x * 2.0 - 1.0, 1.0 - p.y / u.size.y * 2.0, 0.0, 1.0);
  o.color = c;
  return o;
}
@fragment fn fs(i: O) -> @location(0) vec4f { return i.color; }
`;

const GLSL_VERTEX = `
attribute vec2 a_pos;
attribute vec4 a_color;
uniform vec2 u_size;
varying vec4 v_color;
void main() {
  gl_Position = vec4(a_pos.x / u_size.x * 2.0 - 1.0, 1.0 - a_pos.y / u_size.y * 2.0, 0.0, 1.0);
  v_color = a_color;
}`;

const GLSL_FRAGMENT = `
precision mediump float;
varying vec4 v_color;
void main() { gl_FragColor = v_color; }`;

type GpuNavigator = Navigator & { gpu?: GPU };

interface SharedDevice {
  device: GPUDevice;
  /** Software (fallback) adapter */
  fallback: boolean;
  /** Called when the device is lost */
  lost: Set<() => void>;
}

let shared: Promise<SharedDevice | null> | null = null;

/**
 * One device for every shape chart of the page (a dashboard has dozens of
 * small charts); recreated after a loss.
 */
const sharedDevice = (): Promise<SharedDevice | null> => {
  if (shared) return shared;
  const gpu =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as GpuNavigator).gpu;
  if (!gpu) return Promise.resolve(null);
  const promise = (async (): Promise<SharedDevice | null> => {
    const adapter = await gpu.requestAdapter();
    if (!adapter) return null;
    const info = adapter as GPUAdapter & {
      isFallbackAdapter?: boolean;
      info?: { isFallbackAdapter?: boolean };
    };
    const device = await adapter.requestDevice();
    const entry: SharedDevice = {
      device,
      fallback: !!(info.info?.isFallbackAdapter || info.isFallbackAdapter),
      lost: new Set(),
    };
    void device.lost.then(() => {
      if (shared === promise) shared = null;
      for (const listener of [...entry.lost]) listener();
    });
    return entry;
  })().catch(() => null);
  shared = promise;
  void promise.then((entry) => {
    if (!entry && shared === promise) shared = null;
  });
  return promise;
};

const pipelineCache = new WeakMap<
  GPUDevice,
  Map<string, { layout: GPUBindGroupLayout; pipelines: VectorPipelines }>
>();

interface VectorPipelines {
  direct: GPURenderPipeline;
  nonzero: GPURenderPipeline;
  once: GPURenderPipeline;
  cover: GPURenderPipeline;
}

const createPipelines = (device: GPUDevice, format: GPUTextureFormat) => {
  let byFormat = pipelineCache.get(device);
  if (!byFormat) {
    byFormat = new Map();
    pipelineCache.set(device, byFormat);
  }
  const cached = byFormat.get(format);
  if (cached) return cached;
  const layout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: STAGE_VERTEX, buffer: { type: "uniform" } },
    ],
  });
  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [layout],
  });
  const module = device.createShaderModule({ code: WGSL });
  const blend: GPUBlendState = {
    color: {
      srcFactor: "one",
      dstFactor: "one-minus-src-alpha",
      operation: "add",
    },
    alpha: {
      srcFactor: "one",
      dstFactor: "one-minus-src-alpha",
      operation: "add",
    },
  };
  const make = (
    writeMask: number,
    front: GPUStencilFaceState,
    back: GPUStencilFaceState = front,
  ) =>
    device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module,
        entryPoint: "vs",
        buffers: [
          {
            arrayStride: VECTOR_STRIDE,
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32x2" },
              { shaderLocation: 1, offset: 8, format: "unorm8x4" },
            ],
          },
        ],
      },
      fragment: {
        module,
        entryPoint: "fs",
        targets: [{ format, blend, writeMask }],
      },
      primitive: { topology: "triangle-list", cullMode: "none" },
      depthStencil: {
        format: "stencil8",
        stencilFront: front,
        stencilBack: back,
      },
      multisample: { count: SAMPLES },
    });
  const pipelines: VectorPipelines = {
    direct: make(COLOR_ALL, { compare: "always", passOp: "keep" }),
    // winding numbers: front faces count up, back faces down
    nonzero: make(
      0,
      { compare: "always", passOp: "increment-wrap" },
      { compare: "always", passOp: "decrement-wrap" },
    ),
    once: make(0, { compare: "always", passOp: "replace" }),
    // colors the covered samples once and clears them for the next path
    cover: make(COLOR_ALL, {
      compare: "not-equal",
      passOp: "zero",
      failOp: "keep",
    }),
  };
  const entry = { layout, pipelines };
  byFormat.set(format, entry);
  return entry;
};

export const createWebGpuVectorRenderer = async (
  canvas: HTMLCanvasElement,
  onLost: () => void,
  /** Refuses fallback (software) adapters */
  requireHardware = false,
): Promise<VectorRenderer | null> => {
  const gpu = (navigator as GpuNavigator).gpu;
  if (!gpu) return null;
  const entry = await sharedDevice();
  if (!entry || (requireHardware && entry.fallback)) return null;
  const { device } = entry;
  const context = canvas.getContext("webgpu") as GPUCanvasContext | null;
  if (!context) return null;
  const format = gpu.getPreferredCanvasFormat();
  context.configure({ device, format, alphaMode: "premultiplied" });
  const { layout, pipelines } = createPipelines(device, format);

  let destroyed = false;
  const lost = () => {
    if (!destroyed) onLost();
  };
  entry.lost.add(lost);

  const uniform = device.createBuffer({
    size: 16,
    usage: BUFFER_UNIFORM | BUFFER_COPY_DST,
  });
  const bindGroup = device.createBindGroup({
    layout,
    entries: [{ binding: 0, resource: { buffer: uniform } }],
  });
  let vertex: GPUBuffer | null = null;
  let targets: {
    width: number;
    height: number;
    color: GPUTexture;
    stencil: GPUTexture;
  } | null = null;

  const ensureTargets = () => {
    const width = Math.max(1, canvas.width);
    const height = Math.max(1, canvas.height);
    if (targets && targets.width === width && targets.height === height)
      return targets;
    targets?.color.destroy();
    targets?.stencil.destroy();
    targets = {
      width,
      height,
      color: device.createTexture({
        size: [width, height],
        format,
        sampleCount: SAMPLES,
        usage: TEXTURE_RENDER_ATTACHMENT,
      }),
      stencil: device.createTexture({
        size: [width, height],
        format: "stencil8",
        sampleCount: SAMPLES,
        usage: TEXTURE_RENDER_ATTACHMENT,
      }),
    };
    return targets;
  };

  return {
    kind: "webgpu",
    canvas,
    resize(width, height) {
      const w = Math.max(1, Math.round(width));
      const h = Math.max(1, Math.round(height));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    },
    render(batch) {
      if (destroyed) return;
      const t = ensureTargets();
      const bytes = batch.count * VECTOR_STRIDE;
      if (bytes > 0 && (!vertex || vertex.size < bytes)) {
        vertex?.destroy();
        let size = 4096;
        while (size < bytes) size *= 2;
        vertex = device.createBuffer({
          size,
          usage: BUFFER_VERTEX | BUFFER_COPY_DST,
        });
      }
      if (vertex && bytes > 0)
        device.queue.writeBuffer(vertex, 0, batch.data, 0, bytes);
      device.queue.writeBuffer(
        uniform,
        0,
        new Float32Array([t.width, t.height, 0, 0]),
      );
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: t.color.createView(),
            resolveTarget: context.getCurrentTexture().createView(),
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: "clear",
            storeOp: "discard",
          },
        ],
        depthStencilAttachment: {
          view: t.stencil.createView(),
          stencilClearValue: 0,
          stencilLoadOp: "clear",
          stencilStoreOp: "discard",
        },
      });
      if (vertex && bytes > 0) {
        pass.setBindGroup(0, bindGroup);
        pass.setVertexBuffer(0, vertex);
        for (const draw of batch.draws) {
          if (draw.mode === "direct") {
            pass.setPipeline(pipelines.direct);
            pass.draw(draw.count, 1, draw.first);
            continue;
          }
          pass.setPipeline(pipelines[draw.mode]);
          pass.setStencilReference(1);
          pass.draw(draw.count, 1, draw.first);
          pass.setPipeline(pipelines.cover);
          pass.setStencilReference(0);
          pass.draw(draw.count, 1, draw.first);
        }
      }
      pass.end();
      device.queue.submit([encoder.finish()]);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      entry.lost.delete(lost);
      vertex?.destroy();
      uniform.destroy();
      targets?.color.destroy();
      targets?.stencil.destroy();
      context.unconfigure();
    },
  };
};

/** WebGL2 or WebGL (1): the same GLSL ES 1.0 program works on both */
export const createGlVectorRenderer = (
  kind: "webgl2" | "webgl",
  canvas: HTMLCanvasElement,
  onLost: () => void,
  requireHardware = false,
): VectorRenderer | null => {
  const attributes: WebGLContextAttributes = {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    depth: false,
    stencil: true,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: requireHardware,
  };
  const gl = canvas.getContext(kind, attributes) as
    WebGLRenderingContext | WebGL2RenderingContext | null;
  if (!gl) return null;
  if (
    (requireHardware && isSoftwareRenderer(gl)) ||
    !(gl.getContextAttributes()?.stencil ?? false)
  ) {
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return null;
  }

  interface Program {
    program: WebGLProgram;
    size: WebGLUniformLocation | null;
    buffer: WebGLBuffer;
  }
  const compile = (): Program | null => {
    const shader = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };
    const vs = shader(gl.VERTEX_SHADER, GLSL_VERTEX);
    const fs = shader(gl.FRAGMENT_SHADER, GLSL_FRAGMENT);
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!vs || !fs || !program || !buffer) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "a_pos");
    gl.bindAttribLocation(program, 1, "a_color");
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
    return {
      program,
      size: gl.getUniformLocation(program, "u_size"),
      buffer,
    };
  };
  let program = compile();
  if (!program) {
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return null;
  }
  let lost = false;
  let destroyed = false;
  let last: VectorBatch | null = null;
  let capacity = 0;

  const draw = (batch: VectorBatch) => {
    const p = program;
    if (!p) return;
    const w = canvas.width;
    const h = canvas.height;
    gl.viewport(0, 0, w, h);
    gl.disable(gl.STENCIL_TEST);
    gl.colorMask(true, true, true, true);
    gl.stencilMask(0xff);
    gl.clearColor(0, 0, 0, 0);
    gl.clearStencil(0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    if (batch.count <= 0) return;
    gl.useProgram(p.program);
    gl.uniform2f(p.size, w, h);
    gl.bindBuffer(gl.ARRAY_BUFFER, p.buffer);
    const bytes = batch.count * VECTOR_STRIDE;
    if (bytes > capacity) {
      capacity = Math.max(bytes, capacity * 2, 4096);
      gl.bufferData(gl.ARRAY_BUFFER, capacity, gl.DYNAMIC_DRAW);
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Uint8Array(batch.data, 0, bytes));
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, VECTOR_STRIDE, 0);
    gl.vertexAttribPointer(1, 4, gl.UNSIGNED_BYTE, true, VECTOR_STRIDE, 8);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    for (const d of batch.draws) {
      if (d.mode === "direct") {
        gl.disable(gl.STENCIL_TEST);
        gl.colorMask(true, true, true, true);
        gl.drawArrays(gl.TRIANGLES, d.first, d.count);
        continue;
      }
      gl.enable(gl.STENCIL_TEST);
      gl.colorMask(false, false, false, false);
      if (d.mode === "nonzero") {
        gl.stencilFunc(gl.ALWAYS, 0, 0xff);
        gl.stencilOpSeparate(gl.FRONT, gl.KEEP, gl.KEEP, gl.INCR_WRAP);
        gl.stencilOpSeparate(gl.BACK, gl.KEEP, gl.KEEP, gl.DECR_WRAP);
      } else {
        gl.stencilFunc(gl.ALWAYS, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
      }
      gl.drawArrays(gl.TRIANGLES, d.first, d.count);
      gl.colorMask(true, true, true, true);
      gl.stencilFunc(gl.NOTEQUAL, 0, 0xff);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.ZERO);
      gl.drawArrays(gl.TRIANGLES, d.first, d.count);
    }
    gl.disable(gl.STENCIL_TEST);
  };

  // past the page-wide context budget the context may be suspended while
  // off-screen; it comes back with a fresh program and the last frame
  const slot = claimGlSlot(canvas, gl, {
    suspend: () => {
      program = null;
      capacity = 0;
    },
    restore: () => {
      program = compile();
      capacity = 0;
      if (!program) {
        lost = true;
        onLost();
      } else if (last) draw(last);
    },
    lost: () => {
      lost = true;
      if (!destroyed) onLost();
    },
  });

  return {
    kind,
    canvas,
    resize(width, height) {
      const w = Math.max(1, Math.round(width));
      const h = Math.max(1, Math.round(height));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    },
    render(batch) {
      if (destroyed || lost) return;
      // keep a copy: a restored context redraws it
      last = {
        data: batch.data.slice(0, batch.count * VECTOR_STRIDE),
        count: batch.count,
        draws: batch.draws,
      };
      if (!slot.use()) return;
      draw(last);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      slot.release();
      if (program) {
        gl.deleteBuffer(program.buffer);
        gl.deleteProgram(program.program);
      }
      program = null;
      last = null;
    },
  };
};

/**
 * Creates the first vector backend that works for `requested` (same order
 * and rules as the data layer: `auto` skips software GPUs). `null` means
 * Canvas2D: either requested, reached by the fallback chain, or nothing else
 * works.
 */
export const createVectorRenderer = async (
  requested: ChartRendererPreference | undefined,
  makeCanvas: () => HTMLCanvasElement,
  onLost: (kind: ChartRendererKind) => void,
  exclude: ReadonlySet<ChartRendererKind> = new Set(),
): Promise<VectorRenderer | null> => {
  const preference = resolveRendererPreference(requested);
  for (const kind of rendererCandidates(preference, exclude)) {
    if (kind === "canvas2d") return null;
    const requireHardware = preference === "auto" || preference !== kind;
    let renderer: VectorRenderer | null;
    try {
      renderer =
        kind === "webgpu"
          ? await createWebGpuVectorRenderer(
              makeCanvas(),
              () => onLost(kind),
              requireHardware,
            )
          : createGlVectorRenderer(
              kind,
              makeCanvas(),
              () => onLost(kind),
              requireHardware,
            );
    } catch {
      renderer = null;
    }
    if (renderer) return renderer;
  }
  return null;
};
