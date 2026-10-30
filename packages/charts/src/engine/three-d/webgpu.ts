// WebGPU backend of the 3D charts: 4× MSAA, a depth buffer, one draw per
// item (instanced billboards / segments, indexed triangles). With blended
// items (transparent meshes, blended or additive points), three passes:
// the opaque items; the blended ones into the float targets of the
// weighted blended order-independent transparency (`oit.ts`, multisampled,
// testing the opaque depth, resolved); then their composite and the lines.

import type { RendererLostHandler } from "../renderers/types";
import { WGSL_COMPOSITE } from "./oit";
import {
  POINT_STRIDE,
  SEGMENT_STRIDE,
  VERTEX_STRIDE,
  drawOrder,
  drawRank,
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
const TEXTURE_BINDING = 0x04;
const TEXTURE_RENDER_ATTACHMENT = 0x10;

const SAMPLES = 4;
/** Format of the transparency targets (renderable, blendable, resolvable) */
const OIT_FORMAT: GPUTextureFormat = "rgba16float";

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
  // additive points: the colors add up, the coverage composites as usual
  const additive: GPUBlendState = {
    color: { srcFactor: "one", dstFactor: "one", operation: "add" },
    alpha: blend.alpha,
  };
  // transparency targets: plain sums
  const sum: GPUBlendState = {
    color: { srcFactor: "one", dstFactor: "one", operation: "add" },
    alpha: { srcFactor: "one", dstFactor: "one", operation: "add" },
  };
  const pipeline = (
    code: string,
    buffers: GPUVertexBufferLayout[],
    topology: GPUPrimitiveTopology,
    depthWrite: boolean,
    blending: GPUBlendState = blend,
    oit = false,
  ) => {
    const module = device.createShaderModule({ code });
    return device.createRenderPipeline({
      layout,
      vertex: { module, entryPoint: "vs", buffers },
      fragment: {
        module,
        entryPoint: oit ? "fsOit" : "fs",
        targets: oit
          ? [
              { format: OIT_FORMAT, blend: sum },
              { format: OIT_FORMAT, blend: sum },
            ]
          : [{ format, blend: blending }],
      },
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
  let additivePoints: GPURenderPipeline | null = null;
  const pipelineOf = (item: Item3D) => {
    if (item.kind === "points" && item.additive) {
      additivePoints ??= pipeline(
        WGSL_POINTS,
        pointBuffers,
        "triangle-strip",
        false,
        additive,
      );
      return additivePoints;
    }
    const variants = pipelines[item.kind];
    return variants[writesDepth(item) ? variants.length - 1 : 0];
  };

  // order-independent transparency: validated once (rgba16float targets are
  // core, but a failing driver falls back to the sorted blending)
  device.pushErrorScope("validation");
  const compositeLayout = device.createBindGroupLayout({
    entries: [0, 1].map((binding) => ({
      binding,
      visibility: STAGE_FRAGMENT,
      texture: { sampleType: "unfilterable-float" as const },
    })),
  });
  const compositeModule = device.createShaderModule({ code: WGSL_COMPOSITE });
  const oitPipelines = {
    points: pipeline(
      WGSL_POINTS,
      pointBuffers,
      "triangle-strip",
      false,
      blend,
      true,
    ),
    mesh: pipeline(WGSL_MESH, meshBuffers, "triangle-list", false, blend, true),
    composite: device.createRenderPipeline({
      layout: device.createPipelineLayout({
        bindGroupLayouts: [compositeLayout],
      }),
      vertex: { module: compositeModule, entryPoint: "vs" },
      fragment: {
        module: compositeModule,
        entryPoint: "fs",
        targets: [{ format, blend }],
      },
      primitive: { topology: "triangle-list" },
      depthStencil: {
        format: "depth24plus",
        depthWriteEnabled: false,
        depthCompare: "always",
      },
      multisample: { count: SAMPLES },
    }),
  };
  const orderIndependent = !(await device.popErrorScope());

  let targets: {
    width: number;
    height: number;
    color: GPUTexture;
    depth: GPUTexture;
    /** Transparency targets, created on first use */
    oit: {
      accum: GPUTexture;
      extra: GPUTexture;
      accumResolved: GPUTexture;
      extraResolved: GPUTexture;
      bindGroup: GPUBindGroup;
    } | null;
  } | null = null;
  const destroyOit = () => {
    const oit = targets?.oit;
    if (!oit) return;
    oit.accum.destroy();
    oit.extra.destroy();
    oit.accumResolved.destroy();
    oit.extraResolved.destroy();
  };
  const renderTargets = () => {
    const width = canvas.width;
    const height = canvas.height;
    if (targets && targets.width === width && targets.height === height)
      return targets;
    targets?.color.destroy();
    targets?.depth.destroy();
    destroyOit();
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
      oit: null,
    };
    return targets;
  };
  const oitTargets = (t: NonNullable<typeof targets>) => {
    if (t.oit) return t.oit;
    const texture = (samples: number) =>
      device.createTexture({
        size: [t.width, t.height],
        sampleCount: samples,
        format: OIT_FORMAT,
        usage:
          samples > 1
            ? TEXTURE_RENDER_ATTACHMENT
            : TEXTURE_RENDER_ATTACHMENT | TEXTURE_BINDING,
      });
    const accumResolved = texture(1);
    const extraResolved = texture(1);
    t.oit = {
      accum: texture(SAMPLES),
      extra: texture(SAMPLES),
      accumResolved,
      extraResolved,
      bindGroup: device.createBindGroup({
        layout: compositeLayout,
        entries: [
          { binding: 0, resource: accumResolved.createView() },
          { binding: 1, resource: extraResolved.createView() },
        ],
      }),
    };
    return t.oit;
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
    orderIndependent,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      if (destroyed) return;
      const t = renderTargets();
      const ordered = drawOrder(items);
      const blended =
        orderIndependent && ordered.some((item) => drawRank(item) === 2);
      const encoder = device.createCommandEncoder();
      const screen = context.getCurrentTexture().createView();
      const seen = new Set<string>();
      /** Draws an item; false when it has nothing to draw */
      const draw = (
        pass: GPURenderPassEncoder,
        item: Item3D,
        chosen: GPURenderPipeline,
      ) => {
        const count = item.kind === "mesh" ? item.indices.length : item.count;
        if (count <= 0) return;
        const res = upload(item);
        if (!res.vertex) return;
        device.queue.writeBuffer(
          res.uniform,
          0,
          itemUniforms(item, frame, uniformData),
        );
        pass.setPipeline(chosen);
        pass.setBindGroup(0, res.bindGroup);
        pass.setVertexBuffer(0, res.vertex);
        if (item.kind === "mesh") {
          if (!res.index) return;
          pass.setIndexBuffer(res.index, "uint32");
          pass.drawIndexed(count);
        } else {
          pass.draw(4, count);
        }
      };

      // opaque items (every item without blended ones)
      const main = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: t.color.createView(),
            resolveTarget: blended ? undefined : screen,
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: "clear",
            storeOp: blended ? "store" : "discard",
          },
        ],
        depthStencilAttachment: {
          view: t.depth.createView(),
          depthClearValue: 1,
          depthLoadOp: "clear",
          depthStoreOp: blended ? "store" : "discard",
        },
      });
      for (const item of ordered) {
        if (blended && drawRank(item) > 1) break;
        seen.add(item.key);
        draw(main, item, pipelineOf(item));
      }
      main.end();

      if (blended) {
        // blended items, in any order, into the transparency targets
        const oit = oitTargets(t);
        const transparent = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: oit.accum.createView(),
              resolveTarget: oit.accumResolved.createView(),
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
              loadOp: "clear",
              storeOp: "discard",
            },
            {
              view: oit.extra.createView(),
              resolveTarget: oit.extraResolved.createView(),
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
              loadOp: "clear",
              storeOp: "discard",
            },
          ],
          depthStencilAttachment: {
            view: t.depth.createView(),
            depthReadOnly: true,
          },
        });
        for (const item of ordered) {
          if (drawRank(item) !== 2 || item.kind === "lines") continue;
          seen.add(item.key);
          draw(transparent, item, oitPipelines[item.kind]);
        }
        transparent.end();

        // their composite over the opaque items, then the lines
        const last = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: t.color.createView(),
              resolveTarget: screen,
              loadOp: "load",
              storeOp: "discard",
            },
          ],
          depthStencilAttachment: {
            view: t.depth.createView(),
            depthLoadOp: "load",
            depthStoreOp: "discard",
          },
        });
        last.setPipeline(oitPipelines.composite);
        last.setBindGroup(0, oit.bindGroup);
        last.draw(3);
        for (const item of ordered) {
          if (drawRank(item) < 3) continue;
          seen.add(item.key);
          draw(last, item, pipelineOf(item));
        }
        last.end();
      }
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
      destroyOit();
      targets = null;
      context.unconfigure();
      device.destroy();
    },
  };
};
