// Heat field of the order book heatmap. The liquidity of the visible
// window is rasterized on the CPU into a small image, one texel per column
// (sampling interval) and price row (tick, or a bucket of rows whose sizes
// are summed when rows get thinner than the screen allows), and drawn as
// ONE textured quad
// with nearest filtering over a clear of the coldest color:
// - rows and columns abut by construction (every device pixel samples
//   exactly one texel), so there are no anti-aliased seams between cells;
// - a column fills until the next snapshot (gaps repeat the last book) and
//   the live one fills to the right edge;
// - empty cells are the cold end of the ramp, never a transparent hole;
// - the output is opaque (no blending), the same on every backend.
// The backends mirror the chart engine's (WebGPU -> WebGL2 -> WebGL ->
// Canvas2D, software GPUs skipped with `auto`), but with their own tiny
// pipelines: a canvas only ever holds one context type.

import { resolveRendererPreference } from "../defaults";
import type { Rgba } from "../color";
import { rendererCandidates } from "../renderers/detect";
import {
  compileProgram,
  glContextAttributes,
  isSoftwareRenderer,
  type GlContext,
} from "../renderers/gl";
import { claimGlSlot } from "../renderers/gl-budget";
import type { ChartRendererKind, ChartRendererPreference } from "../types";

/** One sampled book: price rows (price / tick) and their resting sizes */
export interface HeatSource {
  /** Start time of the column */
  time: number;
  bins: ArrayLike<number>;
  sizes: ArrayLike<number>;
}

/** The rasterized field: packed RGBA texels, row 0 at the top (highest prices) */
export interface HeatGrid {
  width: number;
  height: number;
  pixels: Uint32Array;
  /**
   * Resting size of every texel, same layout as `pixels`: the sizes of the
   * price rows of a texel are summed, its columns max-pooled
   */
  cells: Float32Array;
  /** Price rows (ticks) per texel row; texel rows start at multiples of it */
  rowBins: number;
  /** Times at the left / right edges of the image */
  t0: number;
  t1: number;
  /** Prices at the bottom / top edges of the image */
  p0: number;
  p1: number;
  /** Bumped on every rebuild (uploads are skipped while unchanged) */
  version: number;
}

export interface HeatGridInput {
  /** Columns sorted by time (the live book last) */
  sources: readonly HeatSource[];
  /** Sampling interval (ms) */
  step: number;
  /** Price row height */
  tick: number;
  /** Visible time / price ranges */
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  /** End of the data (the live time): texels starting later stay cold */
  end: number;
  /**
   * Largest image (texels). Denser columns are max-pooled (walls stay
   * visible); denser price rows are summed into buckets
   */
  maxWidth: number;
  maxHeight: number;
  /**
   * Smallest number of price rows per texel row (price aggregation, e.g.
   * when a tick is under 2 px); default 1
   */
  rowBins?: number;
}

/** Entries of a heat table (resolution of the size → color mapping) */
export const HEAT_TABLE_SIZE = 1024;

/**
 * Size → color table of a ramp: entry `j` is the color of the relative size
 * `j / HEAT_TABLE_SIZE` through `curve` (0-1 → 0-1). Entry 0 is the cold end.
 */
export const heatTable = (
  lut: Uint32Array,
  curve: (r: number) => number,
): Uint32Array => {
  const table = new Uint32Array(HEAT_TABLE_SIZE + 1);
  const last = lut.length - 1;
  for (let j = 0; j <= HEAT_TABLE_SIZE; j++) {
    const t = Math.min(1, Math.max(0, curve(j / HEAT_TABLE_SIZE)));
    table[j] = lut[Math.round(t * last)] ?? 0;
  }
  return table;
};

/**
 * `q`-quantile (0-1) of the positive values, NaN without any. Arrays longer
 * than `limit` are sampled (a prime stride, so a grid's rows and columns
 * are both covered).
 */
export const percentile = (
  values: ArrayLike<number>,
  q: number,
  limit = 16384,
): number => {
  const len = values.length;
  const m = Math.min(len, Math.max(1, limit));
  const prime = len % 7919 ? 7919 : 7907;
  const value = (j: number) => values[m === len ? j : (j * prime) % len]!;
  let n = 0;
  for (let j = 0; j < m; j++) if (value(j) > 0) n++;
  if (!n) return NaN;
  const sorted = new Float64Array(n);
  let k = 0;
  for (let j = 0; j < m; j++) {
    const v = value(j);
    if (v > 0) sorted[k++] = v;
  }
  sorted.sort();
  const at = Math.min(n - 1, Math.max(0, q * (n - 1)));
  const lo = Math.floor(at);
  const hi = Math.min(n - 1, lo + 1);
  return sorted[lo]! + (sorted[hi]! - sorted[lo]!) * (at - lo);
};

/**
 * Rasterizes the visible liquidity into `cells` (the colors are set by
 * `paintHeatGrid`). Pass the previous grid as `reuse` to recycle its
 * buffers. Returns `null` without a valid range.
 */
export const buildHeatGrid = (
  input: HeatGridInput,
  reuse?: HeatGrid | null,
): HeatGrid | null => {
  const { sources, step, tick, x0, x1, y0, y1, end } = input;
  if (
    !(step > 0) ||
    !(tick > 0) ||
    !(x1 > x0) ||
    !(y1 > y0) ||
    !Number.isFinite(x0 + x1 + y0 + y1)
  )
    return null;
  // time texels: `cx` columns each
  const cx = Math.max(
    1,
    Math.ceil((x1 - x0) / step / Math.max(1, input.maxWidth)),
  );
  const g = step * cx;
  const gs = Math.floor(x0 / g) * g;
  const width = Math.max(1, Math.ceil((x1 - gs) / g));
  // price texels: buckets of `ry` rows (aligned on multiples of `ry`); a
  // row covers [bin - ½, bin + ½) × tick
  const binLo = Math.round(y0 / tick);
  const binHi = Math.round(y1 / tick);
  const ry = Math.max(
    1,
    Math.round(input.rowBins ?? 1) || 1,
    Math.ceil((binHi - binLo + 1) / Math.max(1, input.maxHeight)),
  );
  const base = Math.floor(binLo / ry) * ry;
  const height = Math.max(1, Math.ceil((binHi + 1 - base) / ry));
  const count = width * height;

  const cells =
    reuse && reuse.cells.length === count
      ? reuse.cells.fill(0)
      : new Float32Array(count);
  // a source's rows are summed per bucket first (scratch), then the
  // sources sharing a time texel are max-pooled
  const sums = ry > 1 ? new Float32Array(height) : null;
  const hits: number[] = [];
  const plot = (source: HeatSource, i: number) => {
    const { bins, sizes } = source;
    for (let k = 0; k < sizes.length; k++) {
      const s = sizes[k]!;
      if (!(s > 0)) continue;
      const r = Math.floor((bins[k]! - base) / ry);
      if (r < 0 || r >= height) continue;
      if (sums) {
        if (!sums[r]) hits.push(r);
        sums[r] += s;
        continue;
      }
      const idx = (height - 1 - r) * width + i;
      if (s > cells[idx]!) cells[idx] = s;
    }
    if (!sums) return;
    for (const r of hits) {
      const idx = (height - 1 - r) * width + i;
      if (sums[r]! > cells[idx]!) cells[idx] = sums[r]!;
      sums[r] = 0;
    }
    hits.length = 0;
  };
  const repeat = (i: number) => {
    for (let r = 0, idx = i; r < height; r++, idx += width)
      cells[idx] = cells[idx - 1]!;
  };

  // first source inside the image, and the one before (filled forward)
  let lo = 0;
  let hi = sources.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (sources[mid]!.time < gs) lo = mid + 1;
    else hi = mid;
  }
  let s = lo;
  let previous: HeatSource | null = lo > 0 ? sources[lo - 1]! : null;
  for (let i = 0; i < width; i++) {
    const start = gs + i * g;
    if (start >= end) break;
    const stop = start + g;
    let hit = false;
    while (s < sources.length && sources[s]!.time < stop) {
      plot(sources[s]!, i);
      previous = sources[s]!;
      hit = true;
      s++;
    }
    if (hit || !previous) continue;
    if (i === 0) plot(previous, 0);
    else repeat(i);
  }

  const pixels =
    reuse && reuse.pixels.length === count
      ? reuse.pixels
      : new Uint32Array(count);
  return {
    width,
    height,
    pixels,
    cells,
    rowBins: ry,
    t0: gs,
    t1: gs + width * g,
    p0: (base - 0.5) * tick,
    p1: (base + height * ry - 0.5) * tick,
    version: (reuse?.version ?? 0) + 1,
  };
};

/**
 * Colors the cells of a grid: `table[min(last, floor(size × scale))]`
 * (see `heatTable`), empty cells the cold end. Bumps the version.
 */
export const paintHeatGrid = (
  grid: HeatGrid,
  table: Uint32Array,
  scale: number,
): void => {
  const { cells, pixels } = grid;
  const last = table.length - 1;
  const cold = table[0] ?? 0;
  const k = scale > 0 && Number.isFinite(scale) ? scale : 0;
  for (let idx = 0; idx < cells.length; idx++) {
    const v = cells[idx]! * k;
    pixels[idx] = v > 0 ? table[v >= last ? last : v | 0]! : cold;
  }
  grid.version++;
};

// ------------------------------------------------------------- renderers

/** Draws heat grids on its own canvas (sized and placed by the caller) */
export interface HeatFieldRenderer {
  readonly kind: ChartRendererKind;
  readonly canvas: HTMLCanvasElement;
  /** Sets the size of the drawing buffer (device pixels) */
  resize(width: number, height: number): void;
  /**
   * Clears to `clear` (opaque) and draws `grid` stretched over `rect`
   * ([left, top, right, bottom] in device pixels, y down)
   */
  render(
    grid: HeatGrid | null,
    rect: readonly [number, number, number, number],
    clear: Rgba,
  ): void;
  destroy(): void;
}

const GLSL_VERTEX = `
attribute vec2 a_corner;
uniform vec4 u_rect;
varying vec2 v_uv;
void main() {
  v_uv = a_corner;
  gl_Position = vec4(mix(u_rect.x, u_rect.z, a_corner.x), mix(u_rect.y, u_rect.w, a_corner.y), 0.0, 1.0);
}`;
const GLSL_FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D u_texture;
varying vec2 v_uv;
void main() {
  gl_FragColor = vec4(texture2D(u_texture, v_uv).rgb, 1.0);
}`;

/** Clip-space rectangle of a pixel rectangle (y up) */
const clipRect = (
  rect: readonly [number, number, number, number],
  width: number,
  height: number,
): [number, number, number, number] => [
  (rect[0] / width) * 2 - 1,
  1 - (rect[1] / height) * 2,
  (rect[2] / width) * 2 - 1,
  1 - (rect[3] / height) * 2,
];

const bytesOf = (grid: HeatGrid) =>
  new Uint8Array(
    grid.pixels.buffer,
    grid.pixels.byteOffset,
    grid.width * grid.height * 4,
  );

/** WebGL2 / WebGL backend (GLSL ES 1.00 runs on both) */
export const createGlHeatField = (
  canvas: HTMLCanvasElement,
  kind: "webgl2" | "webgl",
  onLost: () => void,
  requireHardware = false,
): HeatFieldRenderer | null => {
  const attributes: WebGLContextAttributes = {
    ...glContextAttributes(requireHardware),
    alpha: false,
    premultipliedAlpha: false,
  };
  const gl = canvas.getContext(kind, attributes) as GlContext | null;
  if (!gl) return null;
  // a rejected context is freed now, not at garbage collection
  const reject = () => {
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return null;
  };
  if (requireHardware && isSoftwareRenderer(gl)) return reject();

  /** Program, quad and texture: built again when a suspended context returns */
  const setup = () => {
    const program = compileProgram(
      gl,
      { vertex: GLSL_VERTEX, fragment: GLSL_FRAGMENT },
      ["a_corner"],
    );
    if (!program) return null;
    const corners = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return {
      program,
      rectAt: gl.getUniformLocation(program.program, "u_rect"),
      textureAt: gl.getUniformLocation(program.program, "u_texture"),
      corners,
      texture,
    };
  };
  let objects = setup();
  if (!objects) return reject();
  let uploaded: HeatGrid | null = null;
  let uploadedVersion = -1;
  let size = [0, 0];
  let destroyed = false;
  let lost = false;
  let last: {
    grid: HeatGrid | null;
    rect: readonly [number, number, number, number];
    clear: Rgba;
  } | null = null;

  const forget = () => {
    objects = null;
    uploaded = null;
    uploadedVersion = -1;
    size = [0, 0];
  };
  // past the page-wide context budget the context may be suspended while
  // off-screen: its GPU objects go, and come back (with the last frame)
  // when it is restored
  const slot = claimGlSlot(canvas, gl, {
    suspend: forget,
    restore: () => {
      forget();
      objects = setup();
      if (!objects) {
        lost = true;
        if (!destroyed) onLost();
      } else if (last) draw(last.grid, last.rect, last.clear);
    },
    lost: () => {
      lost = true;
      if (!destroyed) onLost();
    },
  });

  const draw = (
    grid: HeatGrid | null,
    rect: readonly [number, number, number, number],
    clear: Rgba,
  ) => {
    if (!objects) return;
    const { program, rectAt, textureAt, corners, texture } = objects;
    const w = canvas.width;
    const h = canvas.height;
    gl.viewport(0, 0, w, h);
    gl.disable(gl.BLEND);
    gl.clearColor(clear[0], clear[1], clear[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (!grid) return;
    gl.useProgram(program.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    if (grid !== uploaded || grid.version !== uploadedVersion) {
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      if (size[0] === grid.width && size[1] === grid.height) {
        gl.texSubImage2D(
          gl.TEXTURE_2D,
          0,
          0,
          0,
          grid.width,
          grid.height,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          bytesOf(grid),
        );
      } else {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          grid.width,
          grid.height,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          bytesOf(grid),
        );
        size = [grid.width, grid.height];
      }
      uploaded = grid;
      uploadedVersion = grid.version;
    }
    gl.uniform1i(textureAt, 0);
    gl.uniform4fv(rectAt, clipRect(rect, w, h));
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  return {
    kind,
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(grid, rect, clear) {
      if (destroyed) return;
      last = { grid, rect, clear };
      if (lost || !slot.use() || gl.isContextLost()) return;
      draw(grid, rect, clear);
    },
    destroy() {
      destroyed = true;
      last = null;
      slot.release();
      if (objects && !gl.isContextLost()) {
        gl.deleteTexture(objects.texture);
        gl.deleteBuffer(objects.corners);
        gl.deleteProgram(objects.program.program);
        // frees the context now instead of at garbage collection
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      objects = null;
    },
  };
};

const WGSL = `
struct Uniforms { rect: vec4f };
@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var heat: texture_2d<f32>;
@group(0) @binding(2) var nearest: sampler;
struct Varyings {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};
@vertex fn vs(@builtin(vertex_index) i: u32) -> Varyings {
  let c = vec2f(f32(i & 1u), f32(i >> 1u));
  var out: Varyings;
  out.position = vec4f(mix(u.rect.x, u.rect.z, c.x), mix(u.rect.y, u.rect.w, c.y), 0.0, 1.0);
  out.uv = c;
  return out;
}
@fragment fn fs(v: Varyings) -> @location(0) vec4f {
  return vec4f(textureSample(heat, nearest, v.uv).rgb, 1.0);
}`;

type GpuNavigator = Navigator & { gpu?: GPU };

// lib.dom has the WebGPU interfaces but not these constant objects
const BUFFER_UNIFORM = 0x40;
const BUFFER_COPY_DST = 0x08;
const TEXTURE_COPY_DST = 0x02;
const TEXTURE_BINDING = 0x04;
const STAGE_VERTEX = 0x1;
const STAGE_FRAGMENT = 0x2;

/** WebGPU backend */
export const createWebGpuHeatField = async (
  canvas: HTMLCanvasElement,
  onLost: () => void,
  requireHardware = false,
): Promise<HeatFieldRenderer | null> => {
  const gpu =
    typeof navigator !== "undefined"
      ? (navigator as GpuNavigator).gpu
      : undefined;
  if (!gpu) return null;
  const adapter = await gpu.requestAdapter();
  if (!adapter) return null;
  const info = adapter as GPUAdapter & {
    isFallbackAdapter?: boolean;
    info?: { isFallbackAdapter?: boolean };
  };
  if (
    requireHardware &&
    (info.info?.isFallbackAdapter || info.isFallbackAdapter)
  )
    return null;
  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu") as GPUCanvasContext | null;
  if (!context) {
    device.destroy();
    return null;
  }
  const format = gpu.getPreferredCanvasFormat();
  context.configure({ device, format, alphaMode: "opaque" });
  let destroyed = false;
  void device.lost.then(() => {
    if (!destroyed) onLost();
  });

  const layout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: STAGE_VERTEX, buffer: { type: "uniform" } },
      { binding: 1, visibility: STAGE_FRAGMENT, texture: {} },
      { binding: 2, visibility: STAGE_FRAGMENT, sampler: {} },
    ],
  });
  const module = device.createShaderModule({ code: WGSL });
  const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout] }),
    vertex: { module, entryPoint: "vs" },
    fragment: { module, entryPoint: "fs", targets: [{ format }] },
    primitive: { topology: "triangle-strip" },
  });
  const sampler = device.createSampler({
    magFilter: "nearest",
    minFilter: "nearest",
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge",
  });
  const uniform = device.createBuffer({
    size: 16,
    usage: BUFFER_UNIFORM | BUFFER_COPY_DST,
  });
  let texture: GPUTexture | null = null;
  let bindGroup: GPUBindGroup | null = null;
  let uploaded: HeatGrid | null = null;
  let uploadedVersion = -1;

  return {
    kind: "webgpu",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(grid, rect, clear) {
      if (destroyed) return;
      if (grid && (grid !== uploaded || grid.version !== uploadedVersion)) {
        if (
          !texture ||
          texture.width !== grid.width ||
          texture.height !== grid.height
        ) {
          texture?.destroy();
          texture = device.createTexture({
            size: { width: grid.width, height: grid.height },
            format: "rgba8unorm",
            usage: TEXTURE_COPY_DST | TEXTURE_BINDING,
          });
          bindGroup = device.createBindGroup({
            layout,
            entries: [
              { binding: 0, resource: { buffer: uniform } },
              { binding: 1, resource: texture.createView() },
              { binding: 2, resource: sampler },
            ],
          });
        }
        device.queue.writeTexture(
          { texture },
          bytesOf(grid),
          { bytesPerRow: grid.width * 4, rowsPerImage: grid.height },
          { width: grid.width, height: grid.height },
        );
        uploaded = grid;
        uploadedVersion = grid.version;
      }
      device.queue.writeBuffer(
        uniform,
        0,
        new Float32Array(clipRect(rect, canvas.width, canvas.height)),
      );
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: context.getCurrentTexture().createView(),
            clearValue: { r: clear[0], g: clear[1], b: clear[2], a: 1 },
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      });
      if (grid && bindGroup) {
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.draw(4);
      }
      pass.end();
      device.queue.submit([encoder.finish()]);
    },
    destroy() {
      destroyed = true;
      texture?.destroy();
      uniform.destroy();
      context.unconfigure();
      device.destroy();
    },
  };
};

/** Canvas2D backend: the image drawn with nearest-neighbour scaling */
export const createCanvasHeatField = (
  canvas: HTMLCanvasElement,
): HeatFieldRenderer | null => {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;
  const image = canvas.ownerDocument.createElement("canvas");
  const imageCtx = image.getContext("2d");
  let uploaded: HeatGrid | null = null;
  let uploadedVersion = -1;
  return {
    kind: "canvas2d",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(grid, rect, clear) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = `rgb(${Math.round(clear[0] * 255)}, ${Math.round(clear[1] * 255)}, ${Math.round(clear[2] * 255)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (!grid || !imageCtx) return;
      if (grid !== uploaded || grid.version !== uploadedVersion) {
        if (image.width !== grid.width) image.width = grid.width;
        if (image.height !== grid.height) image.height = grid.height;
        const data = imageCtx.createImageData?.(grid.width, grid.height);
        if (!data?.data) return;
        data.data.set(bytesOf(grid));
        imageCtx.putImageData(data, 0, 0);
        uploaded = grid;
        uploadedVersion = grid.version;
      }
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        image,
        rect[0],
        rect[1],
        rect[2] - rect[0],
        rect[3] - rect[1],
      );
    },
    destroy() {
      uploaded = null;
    },
  };
};

/**
 * Creates the first heat field backend that works, in the chart engine's
 * order and with its preference rules (`auto` follows the global default
 * and skips software GPUs). Every attempt gets a fresh canvas.
 */
export const createHeatFieldRenderer = async (
  requested: ChartRendererPreference,
  makeCanvas: () => HTMLCanvasElement,
  onLost: (kind: ChartRendererKind) => void,
  exclude?: ReadonlySet<ChartRendererKind>,
): Promise<HeatFieldRenderer | null> => {
  const preference = resolveRendererPreference(requested);
  for (const kind of rendererCandidates(preference, exclude)) {
    const requireHardware = preference === "auto" || preference !== kind;
    let field: HeatFieldRenderer | null;
    try {
      const canvas = makeCanvas();
      const lost = () => onLost(kind);
      field =
        kind === "webgpu"
          ? await createWebGpuHeatField(canvas, lost, requireHardware)
          : kind === "canvas2d"
            ? createCanvasHeatField(canvas)
            : createGlHeatField(canvas, kind, lost, requireHardware);
    } catch {
      field = null;
    }
    if (field) return field;
  }
  return null;
};
