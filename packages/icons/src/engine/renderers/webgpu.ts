// WebGPU backend: the same instanced meshes as WebGL, 4× MSAA resolved into
// the canvas, depth test per icon, one draw per run of identical icons
// (with firstInstance, so the instance buffer is bound once).

import { MeshAtlas, pixelSize, prepareFrame } from "./batch";
import { WGSL } from "./shaders";
import {
  INSTANCE_STRIDE,
  type BackendLostHandler,
  type IconBackend,
  type IconFrame,
} from "./types";

// lib.dom has the WebGPU interfaces but not these constant objects
const BUFFER_VERTEX = 0x20;
const BUFFER_UNIFORM = 0x40;
const BUFFER_COPY_DST = 0x08;
const TEXTURE_RENDER_ATTACHMENT = 0x10;
const STAGE_VERTEX = 0x1;

const SAMPLES = 4;

type GpuNavigator = Navigator & { gpu?: GPU };

export async function createWebGpuBackend(
  canvas: HTMLCanvasElement,
  onLost: BackendLostHandler,
  /** Refuses fallback (software) adapters */
  requireHardware: boolean,
): Promise<IconBackend | null> {
  const gpu =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as GpuNavigator).gpu;
  if (!gpu) return null;
  const adapter = await gpu.requestAdapter();
  if (!adapter) return null;
  const probe = adapter as GPUAdapter & {
    isFallbackAdapter?: boolean;
    info?: { isFallbackAdapter?: boolean };
  };
  if (
    requireHardware &&
    (probe.info?.isFallbackAdapter || probe.isFallbackAdapter)
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
    if (!destroyed) {
      destroyed = true;
      onLost();
    }
  });

  const module = device.createShaderModule({ code: WGSL });
  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: STAGE_VERTEX, buffer: { type: "uniform" } },
    ],
  });
  const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    }),
    vertex: {
      module,
      entryPoint: "vs",
      buffers: [
        {
          arrayStride: 8,
          stepMode: "vertex",
          attributes: [{ shaderLocation: 0, offset: 0, format: "float32x2" }],
        },
        {
          arrayStride: INSTANCE_STRIDE,
          stepMode: "instance",
          attributes: [
            { shaderLocation: 1, offset: 0, format: "float32x4" },
            { shaderLocation: 2, offset: 16, format: "float32x4" },
            { shaderLocation: 3, offset: 32, format: "float32" },
          ],
        },
      ],
    },
    fragment: {
      module,
      entryPoint: "fs",
      targets: [
        {
          format,
          blend: {
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
          },
        },
      ],
    },
    primitive: { topology: "triangle-list" },
    depthStencil: {
      format: "depth24plus",
      depthWriteEnabled: true,
      depthCompare: "less",
    },
    multisample: { count: SAMPLES },
  });
  const uniform = device.createBuffer({
    size: 16,
    usage: BUFFER_UNIFORM | BUFFER_COPY_DST,
  });
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: uniform } }],
  });

  const atlas = new MeshAtlas();
  let meshBuffer: GPUBuffer | null = null;
  let instanceBuffer: GPUBuffer | null = null;
  let scratch: Float32Array | undefined;
  let targets: {
    width: number;
    height: number;
    color: GPUTexture;
    depth: GPUTexture;
  } | null = null;

  const targetsFor = (width: number, height: number) => {
    if (targets && targets.width === width && targets.height === height) {
      return targets;
    }
    targets?.color.destroy();
    targets?.depth.destroy();
    targets = {
      width,
      height,
      color: device.createTexture({
        size: [width, height],
        format,
        sampleCount: SAMPLES,
        usage: TEXTURE_RENDER_ATTACHMENT,
      }),
      depth: device.createTexture({
        size: [width, height],
        format: "depth24plus",
        sampleCount: SAMPLES,
        usage: TEXTURE_RENDER_ATTACHMENT,
      }),
    };
    return targets;
  };

  const render = (frame: IconFrame) => {
    if (destroyed) return;
    const [width, height] = pixelSize(frame);
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;
    const { color, depth } = targetsFor(width, height);

    const { instances, runs } = prepareFrame(frame, atlas, scratch);
    scratch = instances;

    if (runs.length) {
      if (!meshBuffer || meshBuffer.size < atlas.data.byteLength) {
        meshBuffer?.destroy();
        meshBuffer = device.createBuffer({
          size: atlas.data.byteLength,
          usage: BUFFER_VERTEX | BUFFER_COPY_DST,
        });
        atlas.uploaded = 0;
      }
      if (atlas.uploaded < atlas.length) {
        device.queue.writeBuffer(
          meshBuffer,
          atlas.uploaded * 4,
          atlas.data,
          atlas.uploaded,
          atlas.length - atlas.uploaded,
        );
        atlas.uploaded = atlas.length;
      }
      if (!instanceBuffer || instanceBuffer.size < instances.byteLength) {
        instanceBuffer?.destroy();
        instanceBuffer = device.createBuffer({
          size: instances.byteLength,
          usage: BUFFER_VERTEX | BUFFER_COPY_DST,
        });
      }
      const used = frame.items.length * (INSTANCE_STRIDE / 4);
      device.queue.writeBuffer(instanceBuffer, 0, instances, 0, used);
      device.queue.writeBuffer(
        uniform,
        0,
        new Float32Array([frame.width, frame.height, 0, 0]),
      );
    }

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
    if (runs.length && meshBuffer && instanceBuffer) {
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.setVertexBuffer(0, meshBuffer);
      pass.setVertexBuffer(1, instanceBuffer);
      for (const run of runs) {
        pass.draw(run.count, run.instances, run.first, run.instance);
      }
    }
    pass.end();
    device.queue.submit([encoder.finish()]);
  };

  return {
    kind: "webgpu",
    canvas,
    render,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      targets?.color.destroy();
      targets?.depth.destroy();
      meshBuffer?.destroy();
      instanceBuffer?.destroy();
      uniform.destroy();
      context.unconfigure();
      device.destroy();
    },
  };
}
