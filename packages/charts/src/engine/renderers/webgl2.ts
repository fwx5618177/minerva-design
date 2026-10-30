// WebGL2 backend: same instanced primitives as WebGPU, in GLSL ES 3.0.

import {
  compileProgram,
  glContextAttributes,
  isSoftwareRenderer,
  itemParams,
} from "./gl";
import { instanceRange } from "./range";
import { GLSL_AREA, GLSL_BAR, GLSL_LINE, GLSL_SCATTER } from "./shaders";
import {
  AREA_STRIDE,
  BAR_STRIDE,
  SCATTER_STRIDE,
  type ChartRenderer,
  type RenderItem,
  type RendererLostHandler,
} from "./types";

interface ItemResources {
  version: number;
  kind: RenderItem["kind"];
  buffer: WebGLBuffer;
  vao: WebGLVertexArrayObject;
  /** First instance the attribute pointers start at */
  first: number;
}

const ATTRIBUTES: Record<RenderItem["kind"], string[]> = {
  line: ["a_a", "a_b"],
  area: ["a_a", "a_b"],
  bar: ["a_inst", "a_color"],
  scatter: ["a_pos", "a_size", "a_color"],
};

export const createWebGl2Renderer = (
  canvas: HTMLCanvasElement,
  onLost: RendererLostHandler,
  /** Refuses software rendering (SwiftShader, blocklisted GPUs): Canvas2D with decimation is faster there */
  requireHardware = false,
): ChartRenderer | null => {
  const gl = canvas.getContext("webgl2", glContextAttributes(requireHardware));
  if (!gl) return null;
  if (requireHardware && isSoftwareRenderer(gl)) {
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return null;
  }

  const line = compileProgram(gl, GLSL_LINE, ATTRIBUTES.line);
  const area = compileProgram(gl, GLSL_AREA, ATTRIBUTES.area);
  const bar = compileProgram(gl, GLSL_BAR, ATTRIBUTES.bar);
  const scatter = compileProgram(gl, GLSL_SCATTER, ATTRIBUTES.scatter);
  if (!line || !area || !bar || !scatter) return null;
  const programs = { line, area, bar, scatter };

  let lost = false;
  const handleLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    onLost();
  };
  canvas.addEventListener("webglcontextlost", handleLost);

  const resources = new Map<string, ItemResources>();

  /** WebGL2 has no base instance: the pointers start at the first instance */
  const setupAttributes = (item: RenderItem, first: number) => {
    const F = gl.FLOAT;
    switch (item.kind) {
      case "line":
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, F, false, 8, first * 8);
        gl.vertexAttribDivisor(0, 1);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 2, F, false, 8, first * 8 + 8);
        gl.vertexAttribDivisor(1, 1);
        break;
      case "area": {
        const stride = AREA_STRIDE * 4;
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, F, false, stride, first * stride);
        gl.vertexAttribDivisor(0, 1);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 3, F, false, stride, (first + 1) * stride);
        gl.vertexAttribDivisor(1, 1);
        break;
      }
      case "bar":
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, F, false, BAR_STRIDE, first * BAR_STRIDE);
        gl.vertexAttribDivisor(0, 1);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(
          1,
          4,
          gl.UNSIGNED_BYTE,
          true,
          BAR_STRIDE,
          first * BAR_STRIDE + 12,
        );
        gl.vertexAttribDivisor(1, 1);
        break;
      default:
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, F, false, SCATTER_STRIDE, 0);
        gl.vertexAttribDivisor(0, 1);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 1, F, false, SCATTER_STRIDE, 8);
        gl.vertexAttribDivisor(1, 1);
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer(
          2,
          4,
          gl.UNSIGNED_BYTE,
          true,
          SCATTER_STRIDE,
          12,
        );
        gl.vertexAttribDivisor(2, 1);
        break;
    }
  };

  const release = (res: ItemResources) => {
    gl.deleteBuffer(res.buffer);
    gl.deleteVertexArray(res.vao);
  };

  const upload = (item: RenderItem): ItemResources | null => {
    const existing = resources.get(item.key);
    if (
      existing &&
      existing.version === item.version &&
      existing.kind === item.kind
    ) {
      return existing;
    }
    if (existing) release(existing);
    const buffer = gl.createBuffer();
    const vao = gl.createVertexArray();
    if (!buffer || !vao) return null;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    switch (item.kind) {
      case "line":
        gl.bufferData(
          gl.ARRAY_BUFFER,
          item.points,
          gl.STATIC_DRAW,
          0,
          item.count * 2,
        );
        break;
      case "area":
        gl.bufferData(
          gl.ARRAY_BUFFER,
          item.points,
          gl.STATIC_DRAW,
          0,
          item.count * AREA_STRIDE,
        );
        break;
      default:
        gl.bufferData(gl.ARRAY_BUFFER, item.instances, gl.STATIC_DRAW);
        break;
    }
    setupAttributes(item, 0);
    gl.bindVertexArray(null);
    const res = {
      version: item.version,
      kind: item.kind,
      buffer,
      vao,
      first: 0,
    };
    resources.set(item.key, res);
    return res;
  };

  return {
    kind: "webgl2",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      if (lost || gl.isContextLost()) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      const t = frame.transform;
      const seen = new Set<string>();
      for (const item of items) {
        seen.add(item.key);
        const [first, instances] = instanceRange(item, frame);
        if (instances <= 0) continue;
        const res = upload(item);
        if (!res) continue;
        const program = programs[item.kind];
        gl.useProgram(program.program);
        gl.uniform4f(program.xform, t.xScale, t.xOffset, t.yScale, t.yOffset);
        gl.uniform4f(program.viewport, frame.width, frame.height, frame.dpr, 0);
        gl.uniform4f(
          program.color,
          item.color[0],
          item.color[1],
          item.color[2],
          item.color[3],
        );
        const [p0, p1, p2, p3] = itemParams(item, frame);
        gl.uniform4f(program.params, p0, p1, p2, p3);
        gl.bindVertexArray(res.vao);
        if (res.first !== first) {
          gl.bindBuffer(gl.ARRAY_BUFFER, res.buffer);
          setupAttributes(item, first);
          res.first = first;
        }
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, instances);
      }
      gl.bindVertexArray(null);
      for (const [key, res] of resources) {
        if (!seen.has(key)) {
          release(res);
          resources.delete(key);
        }
      }
    },
    destroy() {
      canvas.removeEventListener("webglcontextlost", handleLost);
      if (!gl.isContextLost()) {
        for (const res of resources.values()) release(res);
        for (const p of Object.values(programs)) gl.deleteProgram(p.program);
      }
      resources.clear();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
};
