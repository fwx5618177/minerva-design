// WebGL2 backend: same instanced primitives as WebGPU, in GLSL ES 3.0.

import { instanceRange } from "./range";
import { GLSL_AREA, GLSL_BAR, GLSL_LINE, GLSL_SCATTER } from "./shaders";
import {
  SCATTER_STRIDE,
  type ChartRenderer,
  type RenderFrame,
  type RenderItem,
  type RendererLostHandler,
} from "./types";

interface Program {
  program: WebGLProgram;
  xform: WebGLUniformLocation | null;
  viewport: WebGLUniformLocation | null;
  color: WebGLUniformLocation | null;
  params: WebGLUniformLocation | null;
}

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
  bar: ["a_inst"],
  scatter: ["a_pos", "a_size", "a_color"],
};

const compile = (
  gl: WebGL2RenderingContext,
  source: { vertex: string; fragment: string },
  attributes: string[],
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
const isSoftwareRenderer = (gl: WebGL2RenderingContext): boolean => {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  return SOFTWARE_RENDERER.test(String(name ?? ""));
};

export const createWebGl2Renderer = (
  canvas: HTMLCanvasElement,
  onLost: RendererLostHandler,
  /** Refuses software rendering (SwiftShader, blocklisted GPUs): Canvas2D with decimation is faster there */
  requireHardware = false,
): ChartRenderer | null => {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: requireHardware,
  });
  if (!gl) return null;
  if (requireHardware && isSoftwareRenderer(gl)) {
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return null;
  }

  const line = compile(gl, GLSL_LINE, ATTRIBUTES.line);
  const area = compile(gl, GLSL_AREA, ATTRIBUTES.area);
  const bar = compile(gl, GLSL_BAR, ATTRIBUTES.bar);
  const scatter = compile(gl, GLSL_SCATTER, ATTRIBUTES.scatter);
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
      case "area":
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, F, false, 8, first * 8);
        gl.vertexAttribDivisor(0, 1);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 2, F, false, 8, first * 8 + 8);
        gl.vertexAttribDivisor(1, 1);
        break;
      case "bar":
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, F, false, 12, first * 12);
        gl.vertexAttribDivisor(0, 1);
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
      case "area":
        gl.bufferData(
          gl.ARRAY_BUFFER,
          item.points,
          gl.STATIC_DRAW,
          0,
          item.count * 2,
        );
        break;
      case "bar":
        gl.bufferData(
          gl.ARRAY_BUFFER,
          item.instances,
          gl.STATIC_DRAW,
          0,
          item.count * 3,
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

  const params = (item: RenderItem, frame: RenderFrame): [number, number] => {
    switch (item.kind) {
      case "line":
        return [(item.width * frame.dpr) / 2, 0];
      case "area":
        return [item.baseline, item.opacity];
      case "bar":
        return [item.halfWidth, item.radius];
      default:
        return [item.opacity, item.stroke];
    }
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
        const [p0, p1] = params(item, frame);
        gl.uniform4f(program.params, p0, p1, 0, 0);
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
