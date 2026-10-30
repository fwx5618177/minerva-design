// WebGL (1) backend: the WebGL2 primitives in GLSL ES 1.0 for browsers and
// GPUs without WebGL2. Instancing comes from ANGLE_instanced_arrays (exposed
// virtually everywhere); without it the chain moves on to Canvas2D. Vertex
// array objects are optional in WebGL 1, so the attributes are bound for
// every draw (a handful of calls per series).

import {
  compileProgram,
  glContextAttributes,
  isSoftwareRenderer,
  itemParams,
  type GlProgram,
} from "./gl";
import { claimGlSlot } from "./gl-budget";
import { instanceRange } from "./range";
import { GLSL1_AREA, GLSL1_BAR, GLSL1_LINE, GLSL1_SCATTER } from "./shaders";
import {
  AREA_STRIDE,
  BAR_STRIDE,
  SCATTER_STRIDE,
  type ChartRenderer,
  type RenderFrame,
  type RenderItem,
  type RendererLostHandler,
} from "./types";

interface ItemResources {
  version: number;
  kind: RenderItem["kind"];
  buffer: WebGLBuffer;
}

/** Location 0 is the per-vertex corner, the others are per instance */
const ATTRIBUTES: Record<RenderItem["kind"], string[]> = {
  line: ["a_corner", "a_a", "a_b"],
  area: ["a_corner", "a_a", "a_b"],
  bar: ["a_corner", "a_inst", "a_color"],
  scatter: ["a_corner", "a_pos", "a_size", "a_color"],
};

const MAX_LOCATIONS = 4;

/** Corners of the triangle strip, as gl_VertexID gives them in WebGL2: (vi & 1, vi >> 1) */
const CORNERS = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);

export const createWebGlRenderer = (
  canvas: HTMLCanvasElement,
  onLost: RendererLostHandler,
  /** Refuses software rendering (SwiftShader, blocklisted GPUs): Canvas2D with decimation is faster there */
  requireHardware = false,
): ChartRenderer | null => {
  const gl = canvas.getContext(
    "webgl",
    glContextAttributes(requireHardware),
  ) as WebGLRenderingContext | null;
  if (!gl) return null;
  const loseContext = () =>
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  const firstInstancing = gl.getExtension("ANGLE_instanced_arrays");
  if (!firstInstancing || (requireHardware && isSoftwareRenderer(gl))) {
    loseContext();
    return null;
  }
  let instancing: ANGLE_instanced_arrays = firstInstancing;

  /** Programs and the shared corner buffer (built again after a restore) */
  const build = () => {
    // extension objects don't survive a context restore
    const ext = gl.getExtension("ANGLE_instanced_arrays");
    if (!ext) return null;
    instancing = ext;
    const line = compileProgram(gl, GLSL1_LINE, ATTRIBUTES.line);
    const area = compileProgram(gl, GLSL1_AREA, ATTRIBUTES.area);
    const bar = compileProgram(gl, GLSL1_BAR, ATTRIBUTES.bar);
    const scatter = compileProgram(gl, GLSL1_SCATTER, ATTRIBUTES.scatter);
    const corners = gl.createBuffer();
    if (!line || !area || !bar || !scatter || !corners) return null;
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.bufferData(gl.ARRAY_BUFFER, CORNERS, gl.STATIC_DRAW);
    const programs: Record<RenderItem["kind"], GlProgram> = {
      line,
      area,
      bar,
      scatter,
    };
    return { programs, corners };
  };
  let built = build();
  if (!built) {
    loseContext();
    return null;
  }

  let lost = false;
  let last: { items: readonly RenderItem[]; frame: RenderFrame } | null = null;
  const resources = new Map<string, ItemResources>();
  // past the page-wide context budget, the context may be suspended while
  // off-screen: its GPU objects go, and come back with the context
  const slot = claimGlSlot(canvas, gl, {
    suspend: () => resources.clear(),
    restore: () => {
      built = build();
      if (!built) {
        lost = true;
        onLost();
      } else if (last) draw(last.items, last.frame);
    },
    lost: () => {
      lost = true;
      onLost();
    },
  });

  /** Float or normalized unorm8x4 attribute advancing once per instance */
  const instanced = (
    location: number,
    size: number,
    type: number,
    stride: number,
    offset: number,
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
    instancing.vertexAttribDivisorANGLE(location, 1);
  };

  /** Binds the corner and the instance attributes starting at instance `first` */
  const bindAttributes = (
    item: RenderItem,
    buffer: WebGLBuffer,
    first: number,
    corners: WebGLBuffer,
  ) => {
    const F = gl.FLOAT;
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, F, false, 0, 0);
    instancing.vertexAttribDivisorANGLE(0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    switch (item.kind) {
      case "line":
        instanced(1, 2, F, 8, first * 8);
        instanced(2, 2, F, 8, first * 8 + 8);
        break;
      case "area": {
        const stride = AREA_STRIDE * 4;
        instanced(1, 3, F, stride, first * stride);
        instanced(2, 3, F, stride, (first + 1) * stride);
        break;
      }
      case "bar":
        instanced(1, 3, F, BAR_STRIDE, first * BAR_STRIDE);
        instanced(2, 4, gl.UNSIGNED_BYTE, BAR_STRIDE, first * BAR_STRIDE + 12);
        break;
      default: {
        const offset = first * SCATTER_STRIDE;
        instanced(1, 2, F, SCATTER_STRIDE, offset);
        instanced(2, 1, F, SCATTER_STRIDE, offset + 8);
        instanced(3, 4, gl.UNSIGNED_BYTE, SCATTER_STRIDE, offset + 12);
        break;
      }
    }
    // attribute state is global without vertex array objects
    for (let i = ATTRIBUTES[item.kind].length; i < MAX_LOCATIONS; i++) {
      gl.disableVertexAttribArray(i);
      instancing.vertexAttribDivisorANGLE(i, 0);
    }
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
    if (existing) gl.deleteBuffer(existing.buffer);
    const buffer = gl.createBuffer();
    if (!buffer) return null;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    switch (item.kind) {
      case "line":
        gl.bufferData(
          gl.ARRAY_BUFFER,
          item.points.subarray(0, item.count * 2),
          gl.STATIC_DRAW,
        );
        break;
      case "area":
        gl.bufferData(
          gl.ARRAY_BUFFER,
          item.points.subarray(0, item.count * AREA_STRIDE),
          gl.STATIC_DRAW,
        );
        break;
      default:
        gl.bufferData(gl.ARRAY_BUFFER, item.instances, gl.STATIC_DRAW);
        break;
    }
    const res = { version: item.version, kind: item.kind, buffer };
    resources.set(item.key, res);
    return res;
  };

  const draw = (items: readonly RenderItem[], frame: RenderFrame) => {
    if (!built) return;
    const { programs, corners } = built;
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
      bindAttributes(item, res.buffer, first, corners);
      instancing.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, 4, instances);
    }
    for (const [key, res] of resources) {
      if (!seen.has(key)) {
        gl.deleteBuffer(res.buffer);
        resources.delete(key);
      }
    }
  };

  return {
    kind: "webgl",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      last = { items, frame };
      if (lost || !slot.use() || gl.isContextLost()) return;
      draw(items, frame);
    },
    destroy() {
      slot.release();
      last = null;
      if (!gl.isContextLost()) {
        for (const res of resources.values()) gl.deleteBuffer(res.buffer);
        if (built) {
          for (const p of Object.values(built.programs)) {
            gl.deleteProgram(p.program);
          }
          gl.deleteBuffer(built.corners);
        }
        loseContext();
      }
      resources.clear();
    },
  };
};
