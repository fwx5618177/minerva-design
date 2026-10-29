// WebGPU backend: one instanced draw per series.

import type { ChartRendererKind } from "../types";
import { instanceRange } from "./range";
import { WGSL_AREA, WGSL_BAR, WGSL_LINE, WGSL_SCATTER } from "./shaders";
import {
  AREA_STRIDE,
  BAR_STRIDE,
  SCATTER_STRIDE,
  type ChartRenderer,
  type RenderFrame,
  type RenderItem,
  type RendererLostHandler,
} from "./types";

// lib.dom has the WebGPU interfaces but not these constant objects
const BUFFER_VERTEX = 0x20;
const BUFFER_UNIFORM = 0x40;
const BUFFER_COPY_DST = 0x08;
const STAGE_VERTEX = 0x1;
const STAGE_FRAGMENT = 0x2;

const UNIFORM_SIZE = 64;

interface ItemResources {
  version: number;
  kind: RenderItem["kind"];
  vertex: GPUBuffer | null;
  uniform: GPUBuffer;
  bindGroup: GPUBindGroup;
}

type GpuNavigator = Navigator & { gpu?: GPU };

/** Whether `navigator.gpu` exists (an adapter may still be unavailable) */
export const hasWebGpu = (): boolean =>
  typeof navigator !== "undefined" && !!(navigator as GpuNavigator).gpu;

export const createWebGpuRenderer = async (
  canvas: HTMLCanvasElement,
  onLost: RendererLostHandler,
  /** Refuses fallback (software) adapters */
  requireHardware = false,
): Promise<ChartRenderer | null> => {
  const gpu = (navigator as GpuNavigator).gpu;
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
  const pipeline = (code: string, buffers: GPUVertexBufferLayout[]) => {
    const module = device.createShaderModule({ code });
    return device.createRenderPipeline({
      layout,
      vertex: { module, entryPoint: "vs", buffers },
      fragment: {
        module,
        entryPoint: "fs",
        targets: [{ format, blend }],
      },
      primitive: { topology: "triangle-strip" },
    });
  };
  const segment = (
    stride: number,
    format: GPUVertexFormat,
  ): GPUVertexBufferLayout[] => [
    {
      arrayStride: stride,
      stepMode: "instance",
      attributes: [{ shaderLocation: 0, offset: 0, format }],
    },
    {
      arrayStride: stride,
      stepMode: "instance",
      attributes: [{ shaderLocation: 1, offset: 0, format }],
    },
  ];
  const pipelines = {
    line: pipeline(WGSL_LINE, segment(8, "float32x2")),
    area: pipeline(WGSL_AREA, segment(AREA_STRIDE * 4, "float32x3")),
    bar: pipeline(WGSL_BAR, [
      {
        arrayStride: BAR_STRIDE,
        stepMode: "instance",
        attributes: [
          { shaderLocation: 0, offset: 0, format: "float32x3" },
          { shaderLocation: 1, offset: 12, format: "unorm8x4" },
        ],
      },
    ]),
    scatter: pipeline(WGSL_SCATTER, [
      {
        arrayStride: SCATTER_STRIDE,
        stepMode: "instance",
        attributes: [
          { shaderLocation: 0, offset: 0, format: "float32x2" },
          { shaderLocation: 1, offset: 8, format: "float32" },
          { shaderLocation: 2, offset: 12, format: "unorm8x4" },
        ],
      },
    ]),
  };

  const resources = new Map<string, ItemResources>();
  const uniformData = new Float32Array(UNIFORM_SIZE / 4);

  const vertexData = (item: RenderItem): ArrayBuffer | Float32Array => {
    switch (item.kind) {
      case "line":
        return item.points.subarray(0, item.count * 2);
      case "area":
        return item.points.subarray(0, item.count * AREA_STRIDE);
      default:
        return item.instances;
    }
  };

  const upload = (item: RenderItem): ItemResources => {
    let res = resources.get(item.key);
    if (res && res.version === item.version && res.kind === item.kind) {
      return res;
    }
    res?.vertex?.destroy();
    const data = vertexData(item);
    const size = Math.max(16, Math.ceil(data.byteLength / 4) * 4);
    const vertex =
      data.byteLength > 0
        ? device.createBuffer({ size, usage: BUFFER_VERTEX | BUFFER_COPY_DST })
        : null;
    if (vertex) {
      if (data instanceof Float32Array) {
        device.queue.writeBuffer(
          vertex,
          0,
          data.buffer,
          data.byteOffset,
          data.byteLength,
        );
      } else {
        device.queue.writeBuffer(vertex, 0, data);
      }
    }
    if (!res) {
      const uniform = device.createBuffer({
        size: UNIFORM_SIZE,
        usage: BUFFER_UNIFORM | BUFFER_COPY_DST,
      });
      res = {
        version: item.version,
        kind: item.kind,
        vertex,
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
    }
    return res;
  };

  const params = (item: RenderItem, frame: RenderFrame): number[] => {
    switch (item.kind) {
      case "line":
        return [(item.width * frame.dpr) / 2, 0, 0, 0];
      case "area":
        return [0, item.opacity, 0, 0];
      case "bar":
        return [item.halfWidth, item.radius, item.inset, item.minHalf];
      default:
        return [item.opacity, item.stroke, 0, 0];
    }
  };

  const renderer: ChartRenderer = {
    kind: "webgpu" satisfies ChartRendererKind,
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      if (destroyed) return;
      const seen = new Set<string>();
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: context.getCurrentTexture().createView(),
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      });
      const t = frame.transform;
      for (const item of items) {
        seen.add(item.key);
        const [first, instances] = instanceRange(item, frame);
        if (instances <= 0) continue;
        const res = upload(item);
        if (!res.vertex) continue;
        uniformData.set(
          [
            t.xScale,
            t.xOffset,
            t.yScale,
            t.yOffset,
            frame.width,
            frame.height,
            frame.dpr,
            0,
            ...item.color,
            ...params(item, frame),
          ],
          0,
        );
        device.queue.writeBuffer(res.uniform, 0, uniformData);
        pass.setPipeline(pipelines[item.kind]);
        pass.setBindGroup(0, res.bindGroup);
        pass.setVertexBuffer(0, res.vertex);
        if (item.kind === "line") {
          pass.setVertexBuffer(1, res.vertex, 8);
        } else if (item.kind === "area") {
          pass.setVertexBuffer(1, res.vertex, AREA_STRIDE * 4);
        }
        pass.draw(4, instances, 0, first);
      }
      pass.end();
      device.queue.submit([encoder.finish()]);
      for (const [key, res] of resources) {
        if (!seen.has(key)) {
          res.vertex?.destroy();
          res.uniform.destroy();
          resources.delete(key);
        }
      }
    },
    destroy() {
      destroyed = true;
      for (const res of resources.values()) {
        res.vertex?.destroy();
        res.uniform.destroy();
      }
      resources.clear();
      context.unconfigure();
      device.destroy();
    },
  };
  return renderer;
};
