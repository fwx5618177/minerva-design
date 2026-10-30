// WebGPU backend of the 3D charts: 4× MSAA, a depth buffer, one draw per
// item (instanced billboards / segments, indexed triangles).

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
  UNIFORM_BYTES,
  WGSL_LINES,
  WGSL_MESH,
  WGSL_POINTS,
  itemUniforms,
  writesDepth,
} from "./shaders";

// lib.dom has the WebGPU interfaces but not these constant objects
const BUFFER_INDEX = 0x10;
const BUFFER_VERTEX = 0x20;
const BUFFER_UNIFORM = 0x40;
const BUFFER_COPY_DST = 0x08;
const STAGE_VERTEX = 0x1;
const STAGE_FRAGMENT = 0x2;
const TEXTURE_RENDER_ATTACHMENT = 0x10;

const SAMPLES = 4;

interface ItemResources {
  version: number;
  kind: Item3D["kind"];
  vertex: GPUBuffer | null;
  index: GPUBuffer | null;
  /** `order` of the uploaded indices (meshes) */
  order: number;
  uniform: GPUBuffer;
  bindGroup: GPUBindGroup;
}

type GpuNavigator = Navigator & { gpu?: GPU };

export const createWebGpu3D = async (
  canvas: HTMLCanvasElement,
  onLost: RendererLostHandler,
  /** Refuses fallback (software) adapters */
  requireHardware = false,
): Promise<Renderer3D | null> => {
  const gpu =
    typeof navigator !== "undefined"
      ? (navigator as GpuNavigator).gpu
      : undefined;
  if (!gpu) return null;
  const adapter = await gpu.requestAdapter();
  if (!adapter) return null;
  const fallback = adapter as GPUAdapter & {
    isFallbackAdapter?: boolean;
    info?: { isFallbackAdapter?: boolean };
  };
  if (
    requireHardware &&
    (fallback.info?.isFallbackAdapter || fallback.isFallbackAdapter)
  ) {
    return null;
  }
  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu") as GPUCanvasContext | null;
  if (!context) {
    device.destroy();
    return null;
  }
  const format = gpu.getPreferredCanvasFormat();
  context.configure({ device, format, alphaMode: "premultiplied" });

  let destroyed = false;
  void device.lost.then(() => {
    if (!destroyed) onLost();
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: STAGE_VERTEX | STAGE_FRAGMENT,
        buffer: { type: "uniform" },
      },
    ],
  });
  const layout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });
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
  const pipeline = (
    code: string,
    buffers: GPUVertexBufferLayout[],
    topology: GPUPrimitiveTopology,
    depthWrite: boolean,
  ) => {
    const module = device.createShaderModule({ code });
    return device.createRenderPipeline({
      layout,
      vertex: { module, entryPoint: "vs", buffers },
      fragment: { module, entryPoint: "fs", targets: [{ format, blend }] },
      primitive: { topology, cullMode: "none" },
      depthStencil: {
        format: "depth24plus",
        depthWriteEnabled: depthWrite,
        depthCompare: "less-equal",
      },
      multisample: { count: SAMPLES },
    });
  };
  const pointBuffers: GPUVertexBufferLayout[] = [
    {
      arrayStride: POINT_STRIDE,
      stepMode: "instance",
      attributes: [
        { shaderLocation: 0, offset: 0, format: "float32x3" },
        { shaderLocation: 1, offset: 12, format: "float32" },
        { shaderLocation: 2, offset: 16, format: "unorm8x4" },
      ],
    },
  ];
  const meshBuffers: GPUVertexBufferLayout[] = [
    {
      arrayStride: VERTEX_STRIDE,
      stepMode: "vertex",
      attributes: [
        { shaderLocation: 0, offset: 0, format: "float32x3" },
        { shaderLocation: 1, offset: 12, format: "float32x3" },
        { shaderLocation: 2, offset: 24, format: "unorm8x4" },
      ],
    },
  ];
  const lineBuffers: GPUVertexBufferLayout[] = [
    {
      arrayStride: SEGMENT_STRIDE,
      stepMode: "instance",
      attributes: [
        { shaderLocation: 0, offset: 0, format: "float32x3" },
        { shaderLocation: 1, offset: 12, format: "float32x3" },
        { shaderLocation: 2, offset: 24, format: "unorm8x4" },
      ],
    },
  ];
  const pipelines = {
    points: [
      pipeline(WGSL_POINTS, pointBuffers, "triangle-strip", false),
      pipeline(WGSL_POINTS, pointBuffers, "triangle-strip", true),
    ],
    mesh: [
      pipeline(WGSL_MESH, meshBuffers, "triangle-list", false),
      pipeline(WGSL_MESH, meshBuffers, "triangle-list", true),
    ],
    lines: [
      pipeline(WGSL_LINES, lineBuffers, "triangle-strip", false),
      pipeline(WGSL_LINES, lineBuffers, "triangle-strip", true),
    ],
  };

  let targets: {
    width: number;
    height: number;
    color: GPUTexture;
    depth: GPUTexture;
  } | null = null;
  const renderTargets = () => {
    const width = canvas.width;
    const height = canvas.height;
    if (targets && targets.width === width && targets.height === height)
      return targets;
    targets?.color.destroy();
    targets?.depth.destroy();
    targets = {
      width,
      height,
      color: device.createTexture({
        size: [width, height],
        sampleCount: SAMPLES,
        format,
        usage: TEXTURE_RENDER_ATTACHMENT,
      }),
      depth: device.createTexture({
        size: [width, height],
        sampleCount: SAMPLES,
        format: "depth24plus",
        usage: TEXTURE_RENDER_ATTACHMENT,
      }),
    };
    return targets;
  };

  const resources = new Map<string, ItemResources>();
  const uniformData = new Float32Array(UNIFORM_BYTES / 4);

  const buffer = (data: ArrayBuffer | Uint32Array, usage: number) => {
    const bytes = data.byteLength;
    if (bytes <= 0) return null;
    const gpuBuffer = device.createBuffer({
      size: Math.max(16, Math.ceil(bytes / 4) * 4),
      usage: usage | BUFFER_COPY_DST,
    });
    if (data instanceof Uint32Array) {
      device.queue.writeBuffer(
        gpuBuffer,
        0,
        data.buffer,
        data.byteOffset,
        bytes,
      );
    } else {
      device.queue.writeBuffer(gpuBuffer, 0, data);
    }
    return gpuBuffer;
  };

  const release = (res: ItemResources) => {
    res.vertex?.destroy();
    res.index?.destroy();
  };

  const upload = (item: Item3D): ItemResources => {
    let res = resources.get(item.key);
    if (res && res.version === item.version && res.kind === item.kind) {
      // same mesh, triangles in a new order (transparent, sorted by depth)
      if (
        item.kind === "mesh" &&
        res.index &&
        (item.order ?? 0) !== res.order
      ) {
        const { indices } = item;
        device.queue.writeBuffer(
          res.index,
          0,
          indices.buffer,
          indices.byteOffset,
          indices.byteLength,
        );
        res.order = item.order ?? 0;
      }
      return res;
    }
    if (res) release(res);
    const vertex = buffer(
      item.kind === "mesh" ? item.vertices : item.data,
      BUFFER_VERTEX,
    );
    const index =
      item.kind === "mesh" ? buffer(item.indices, BUFFER_INDEX) : null;
    if (!res) {
      const uniform = device.createBuffer({
        size: UNIFORM_BYTES,
        usage: BUFFER_UNIFORM | BUFFER_COPY_DST,
      });
      res = {
        version: item.version,
        kind: item.kind,
        vertex,
        index,
        order: item.kind === "mesh" ? (item.order ?? 0) : 0,
        uniform,
        bindGroup: device.createBindGroup({
          layout: bindGroupLayout,
          entries: [{ binding: 0, resource: { buffer: uniform } }],
        }),
      };
      resources.set(item.key, res);
    } else {
      res.version = item.version;
      res.kind = item.kind;
      res.vertex = vertex;
      res.index = index;
      res.order = item.kind === "mesh" ? (item.order ?? 0) : 0;
    }
    return res;
  };

  return {
    kind: "webgpu",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      if (destroyed) return;
      const { color, depth } = renderTargets();
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: color.createView(),
            resolveTarget: context.getCurrentTexture().createView(),
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: "clear",
            storeOp: "discard",
          },
        ],
        depthStencilAttachment: {
          view: depth.createView(),
          depthClearValue: 1,
          depthLoadOp: "clear",
          depthStoreOp: "discard",
        },
      });
      const seen = new Set<string>();
      for (const item of drawOrder(items)) {
        seen.add(item.key);
        const count = item.kind === "mesh" ? item.indices.length : item.count;
        if (count <= 0) continue;
        const res = upload(item);
        if (!res.vertex) continue;
        device.queue.writeBuffer(
          res.uniform,
          0,
          itemUniforms(item, frame, uniformData),
        );
        const variants = pipelines[item.kind];
        const chosen = variants[writesDepth(item) ? variants.length - 1 : 0];
        if (!chosen) continue;
        pass.setPipeline(chosen);
        pass.setBindGroup(0, res.bindGroup);
        pass.setVertexBuffer(0, res.vertex);
        if (item.kind === "mesh") {
          if (!res.index) continue;
          pass.setIndexBuffer(res.index, "uint32");
          pass.drawIndexed(count);
        } else {
          pass.draw(4, count);
        }
      }
      pass.end();
      device.queue.submit([encoder.finish()]);
      for (const [key, res] of resources) {
        if (!seen.has(key)) {
          release(res);
          res.uniform.destroy();
          resources.delete(key);
        }
      }
    },
    destroy() {
      destroyed = true;
      for (const res of resources.values()) {
        release(res);
        res.uniform.destroy();
      }
      resources.clear();
      targets?.color.destroy();
      targets?.depth.destroy();
      targets = null;
      context.unconfigure();
      device.destroy();
    },
  };
};
