// Canvas2D backend: the fallback without GPU. Lines are decimated to a few
// points per pixel column and very large scatter sets are written pixel by
// pixel, so it stays usable with large data sets.

import { decimateMinMax } from "../decimate";
import { unpackColor as unpack, type Rgba } from "../color";
import {
  AREA_STRIDE,
  GAP,
  type AreaItem,
  type BarItem,
  type ChartRenderer,
  type RenderFrame,
  type RenderItem,
  type ScatterItem,
} from "./types";

/** Scatter sets above this size are rasterized through ImageData */
export const SCATTER_PIXEL_THRESHOLD = 20000;

const rgba = (c: Rgba, alpha: number) =>
  `rgba(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)},${c[3] * alpha})`;

const isGap = (v: number) => !Number.isFinite(v) || Math.abs(v) >= GAP * 0.5;

/** First point index whose relative x is >= value (sorted, interleaved) */
const lowerBoundX = (
  points: Float32Array,
  count: number,
  value: number,
  stride = 2,
) => {
  let lo = 0;
  let hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (points[mid * stride] < value) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

/**
 * Min-max decimation of area points (x, top, bottom): per pixel column the
 * first, lowest, highest and last tops are kept with their bottoms
 */
const decimateArea = (
  points: Float32Array,
  start: number,
  end: number,
  column: (x: number) => number,
): { points: Float64Array; length: number } => {
  const out = new Float64Array(Math.max(0, end - start) * AREA_STRIDE);
  let length = 0;
  const push = (i: number) => {
    out[length * 3] = points[i * 3];
    out[length * 3 + 1] = points[i * 3 + 1];
    out[length * 3 + 2] = points[i * 3 + 2];
    length++;
  };
  let col = NaN;
  let first = -1;
  let min = -1;
  let max = -1;
  let last = -1;
  const flush = () => {
    if (first < 0) return;
    const picks = [first, min, max, last].sort((a, b) => a - b);
    let prev = -1;
    for (const i of picks) {
      if (i !== prev) push(i);
      prev = i;
    }
    first = -1;
  };
  for (let i = start; i < end; i++) {
    const y = points[i * 3 + 1];
    if (isGap(points[i * 3]) || isGap(y) || isGap(points[i * 3 + 2])) {
      flush();
      col = NaN;
      push(i);
      continue;
    }
    const c = Math.floor(column(points[i * 3]));
    if (c !== col || first < 0) {
      flush();
      col = c;
      first = min = max = last = i;
    } else {
      if (y < points[min * 3 + 1]) min = i;
      if (y > points[max * 3 + 1]) max = i;
      last = i;
    }
  }
  flush();
  return { points: out, length };
};

export interface Canvas2dPainter {
  /**
   * Draws the items in a `frame.width` x `frame.height` device-pixel area
   * whose top-left corner is at (`left`, `top`) device pixels; nothing is
   * cleared
   */
  paint(
    items: readonly RenderItem[],
    frame: RenderFrame,
    left?: number,
    top?: number,
  ): void;
  destroy(): void;
}

/**
 * Data layer drawn with any 2D context (browser canvases, mini-program
 * canvases, OffscreenCanvas). `scratchCanvas` creates the canvas used to
 * rasterize very large scatter sets; without it they are drawn as one
 * square per occupied pixel cell.
 */
export const createCanvas2dPainter = (
  ctx: CanvasRenderingContext2D,
  scratchCanvas?: () => HTMLCanvasElement | null,
): Canvas2dPainter => {
  let scratch: HTMLCanvasElement | null = null;

  const mapper = (frame: RenderFrame) => {
    const { xScale, xOffset, yScale, yOffset } = frame.transform;
    const w = frame.width;
    const h = frame.height;
    return {
      px: (x: number) => ((x * xScale + xOffset) * 0.5 + 0.5) * w,
      py: (y: number) => (1 - ((y * yScale + yOffset) * 0.5 + 0.5)) * h,
      /** Visible relative x range */
      xRange: (): [number, number] => {
        const a = (-1 - xOffset) / xScale;
        const b = (1 - xOffset) / xScale;
        return a < b ? [a, b] : [b, a];
      },
    };
  };

  /** Points actually drawn: decimated when there are many per pixel */
  const visiblePoints = (
    item: Extract<RenderItem, { kind: "line" }>,
    frame: RenderFrame,
  ): { points: ArrayLike<number>; length: number } => {
    if (!item.sorted || item.count <= frame.width * 2) {
      return { points: item.points, length: item.count };
    }
    const m = mapper(frame);
    const [x0, x1] = m.xRange();
    const start = Math.max(0, lowerBoundX(item.points, item.count, x0) - 1);
    const end = Math.min(
      item.count,
      lowerBoundX(item.points, item.count, x1) + 1,
    );
    const result = decimateMinMax(item.points, start, end, m.px, GAP * 0.5);
    return { points: result.points, length: result.length };
  };

  const drawLine = (
    item: Extract<RenderItem, { kind: "line" }>,
    frame: RenderFrame,
  ) => {
    const m = mapper(frame);
    const { points, length } = visiblePoints(item, frame);
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i < length; i++) {
      const x = points[i * 2];
      const y = points[i * 2 + 1];
      if (isGap(x) || isGap(y)) {
        pen = false;
        continue;
      }
      if (pen) ctx.lineTo(m.px(x), m.py(y));
      else ctx.moveTo(m.px(x), m.py(y));
      pen = true;
    }
    ctx.lineWidth = item.width * frame.dpr;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = rgba(item.color, 1);
    ctx.stroke();
  };

  const drawArea = (item: AreaItem, frame: RenderFrame) => {
    const m = mapper(frame);
    let points: ArrayLike<number> = item.points;
    let length = item.count;
    if (item.sorted && item.count > frame.width * 2) {
      const [x0, x1] = m.xRange();
      const start = Math.max(
        0,
        lowerBoundX(item.points, item.count, x0, AREA_STRIDE) - 1,
      );
      const end = Math.min(
        item.count,
        lowerBoundX(item.points, item.count, x1, AREA_STRIDE) + 1,
      );
      ({ points, length } = decimateArea(item.points, start, end, m.px));
    }
    if (item.flat) ctx.fillStyle = rgba(item.color, item.opacity);
    else {
      const gradient = ctx.createLinearGradient(0, 0, 0, frame.height);
      gradient.addColorStop(0, rgba(item.color, item.opacity));
      gradient.addColorStop(1, rgba(item.color, item.opacity * 0.25));
      ctx.fillStyle = gradient;
    }
    ctx.beginPath();
    // each run without gaps: along the tops, back along the bottoms
    let runStart = -1;
    const close = (end: number) => {
      if (runStart < 0) return;
      for (let k = end - 1; k >= runStart; k--) {
        ctx.lineTo(m.px(points[k * 3]), m.py(points[k * 3 + 2]));
      }
      ctx.closePath();
      runStart = -1;
    };
    for (let i = 0; i < length; i++) {
      const x = points[i * 3];
      const y = points[i * 3 + 1];
      if (isGap(x) || isGap(y) || isGap(points[i * 3 + 2])) {
        close(i);
        continue;
      }
      if (runStart < 0) {
        runStart = i;
        ctx.moveTo(m.px(x), m.py(y));
      } else {
        ctx.lineTo(m.px(x), m.py(y));
      }
    }
    close(length);
    ctx.fill();
  };

  const drawBars = (item: BarItem, frame: RenderFrame) => {
    const m = mapper(frame);
    const dpr = frame.dpr;
    const minHalf = item.minHalf * dpr;
    const rawHalf =
      Math.abs(item.halfWidth * frame.transform.xScale) * 0.5 * frame.width;
    const r = item.radius * dpr;
    const f = new Float32Array(item.instances, 0, item.count * 4);
    const u = new Uint32Array(item.instances, 0, item.count * 4);
    const [x0, x1] = m.xRange();
    const pad = Math.abs(item.halfWidth);
    // one path per color
    const groups = new Map<number, number[]>();
    for (let i = 0; i < item.count; i++) {
      const x = f[i * 4];
      if (isGap(x) || isGap(f[i * 4 + 1]) || isGap(f[i * 4 + 2])) continue;
      if (x < x0 - pad || x > x1 + pad) continue;
      const packed = u[i * 4 + 3];
      let list = groups.get(packed);
      if (!list) groups.set(packed, (list = []));
      list.push(i);
    }
    const rounded = typeof ctx.roundRect === "function";
    for (const [packed, list] of groups) {
      ctx.fillStyle = rgba(unpack(packed), 1);
      ctx.beginPath();
      for (const i of list) {
        const cx = m.px(f[i * 4]);
        const a = m.py(f[i * 4 + 1]);
        const b = m.py(f[i * 4 + 2]);
        const rawHh = Math.abs(a - b) / 2;
        // the gap between cells fades out on small cells (like the shaders)
        const fade = Math.min(
          1,
          Math.max(0, (Math.min(rawHalf, rawHh) - 3 * dpr) / (2 * dpr)),
        );
        const inset =
          item.inset * dpr * fade - (item.inset > 0 ? 0.5 * (1 - fade) : 0);
        const half = Math.max(rawHalf - inset, 0.5, minHalf);
        const hh = Math.max(rawHh - inset, minHalf);
        if (hh <= 0) continue;
        const cy = (a + b) / 2;
        const radius = Math.min(r, half, hh);
        if (radius > 0.5 && rounded) {
          ctx.roundRect(cx - half, cy - hh, half * 2, hh * 2, radius);
        } else {
          ctx.rect(cx - half, cy - hh, half * 2, hh * 2);
        }
      }
      ctx.fill();
    }
  };

  /** One square per occupied cell (the last point of a cell wins, like the GPU) */
  const drawScatterCells = (item: ScatterItem, frame: RenderFrame) => {
    const m = mapper(frame);
    const w = frame.width;
    const h = frame.height;
    const f = new Float32Array(item.instances, 0, item.count * 4);
    const u = new Uint32Array(item.instances, 0, item.count * 4);
    let cell = 0;
    for (let i = 0; i < Math.min(item.count, 64); i++)
      cell = Math.max(cell, f[i * 4 + 2]);
    cell = Math.max(1, Math.round((cell || 2) * frame.dpr * 0.8));
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    const owner = new Int32Array(cols * rows).fill(-1);
    for (let i = 0; i < item.count; i++) {
      const x = f[i * 4];
      const y = f[i * 4 + 1];
      if (isGap(x) || isGap(y) || !(f[i * 4 + 2] > 0)) continue;
      const cx = Math.floor(m.px(x) / cell);
      const cy = Math.floor(m.py(y) / cell);
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
      owner[cy * cols + cx] = i;
    }
    const groups = new Map<number, number[]>();
    for (let c = 0; c < owner.length; c++) {
      const i = owner[c];
      if (i < 0) continue;
      const packed = u[i * 4 + 3];
      let list = groups.get(packed);
      if (!list) groups.set(packed, (list = []));
      list.push(c);
    }
    for (const [packed, cells] of groups) {
      ctx.fillStyle = rgba(unpack(packed), Math.max(item.opacity, 0.6));
      for (const c of cells) {
        ctx.fillRect(
          (c % cols) * cell,
          Math.floor(c / cols) * cell,
          cell,
          cell,
        );
      }
    }
  };

  const drawScatterPixels = (item: ScatterItem, frame: RenderFrame) => {
    const m = mapper(frame);
    const w = frame.width;
    const h = frame.height;
    scratch ??= scratchCanvas?.() ?? null;
    if (!scratch) {
      drawScatterCells(item, frame);
      return;
    }
    scratch.width = w;
    scratch.height = h;
    const sctx = scratch.getContext("2d");
    if (!sctx) return;
    const image = sctx.createImageData(w, h);
    const data = image.data;
    const f = new Float32Array(item.instances, 0, item.count * 4);
    const u = new Uint32Array(item.instances, 0, item.count * 4);
    for (let i = 0; i < item.count; i++) {
      const x = f[i * 4];
      const y = f[i * 4 + 1];
      const size = f[i * 4 + 2];
      if (isGap(x) || isGap(y) || !(size > 0)) continue;
      const cx = m.px(x);
      const cy = m.py(y);
      const s = Math.max(1, Math.round(size * frame.dpr * 0.8));
      const x0 = Math.round(cx - s / 2);
      const y0 = Math.round(cy - s / 2);
      const packed = u[i * 4 + 3];
      const alpha =
        (((packed >>> 24) & 0xff) / 255) * Math.max(item.opacity, 0.6);
      const r = packed & 0xff;
      const g = (packed >>> 8) & 0xff;
      const b = (packed >>> 16) & 0xff;
      for (let py = Math.max(0, y0); py < Math.min(h, y0 + s); py++) {
        for (let px = Math.max(0, x0); px < Math.min(w, x0 + s); px++) {
          const o = (py * w + px) * 4;
          const da = data[o + 3] / 255;
          const outA = alpha + da * (1 - alpha);
          // straight-alpha "over"
          data[o] = (r * alpha + data[o] * da * (1 - alpha)) / outA;
          data[o + 1] = (g * alpha + data[o + 1] * da * (1 - alpha)) / outA;
          data[o + 2] = (b * alpha + data[o + 2] * da * (1 - alpha)) / outA;
          data[o + 3] = outA * 255;
        }
      }
    }
    sctx.putImageData(image, 0, 0);
    ctx.drawImage(scratch, 0, 0);
  };

  const drawScatter = (item: ScatterItem, frame: RenderFrame) => {
    if (item.count > SCATTER_PIXEL_THRESHOLD) {
      drawScatterPixels(item, frame);
      return;
    }
    const m = mapper(frame);
    const f = new Float32Array(item.instances, 0, item.count * 4);
    const u = new Uint32Array(item.instances, 0, item.count * 4);
    const groups = new Map<number, number[]>();
    for (let i = 0; i < item.count; i++) {
      const packed = u[i * 4 + 3];
      let list = groups.get(packed);
      if (!list) groups.set(packed, (list = []));
      list.push(i);
    }
    const stroke = item.stroke * frame.dpr;
    for (const [packed, list] of groups) {
      const color = unpack(packed);
      ctx.beginPath();
      for (const i of list) {
        const x = f[i * 4];
        const y = f[i * 4 + 1];
        const size = f[i * 4 + 2];
        if (isGap(x) || isGap(y) || !(size > 0)) continue;
        const cx = m.px(x);
        const cy = m.py(y);
        const r = (size * frame.dpr) / 2;
        ctx.moveTo(cx + r, cy);
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
      }
      ctx.fillStyle = rgba(color, item.opacity);
      ctx.fill();
      if (stroke > 0) {
        ctx.beginPath();
        for (const i of list) {
          const x = f[i * 4];
          const y = f[i * 4 + 1];
          const size = f[i * 4 + 2];
          if (isGap(x) || isGap(y) || !(size > 0)) continue;
          const r = Math.max(0, (size * frame.dpr) / 2 - stroke / 2);
          const cx = m.px(x);
          const cy = m.py(y);
          ctx.moveTo(cx + r, cy);
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
        }
        ctx.lineWidth = stroke;
        ctx.strokeStyle = rgba(color, 1);
        ctx.stroke();
      }
    }
  };

  return {
    paint(items, frame, left = 0, top = 0) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, left, top);
      ctx.beginPath();
      ctx.rect(0, 0, frame.width, frame.height);
      ctx.clip();
      for (const item of items) {
        switch (item.kind) {
          case "line":
            if (item.count > 1) drawLine(item, frame);
            break;
          case "area":
            if (item.count > 1) drawArea(item, frame);
            break;
          case "bar":
            drawBars(item, frame);
            break;
          default:
            drawScatter(item, frame);
            break;
        }
      }
      ctx.restore();
    },
    destroy() {
      scratch = null;
    },
  };
};

export const createCanvas2dRenderer = (
  canvas: HTMLCanvasElement,
): ChartRenderer | null => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const painter = createCanvas2dPainter(ctx, () =>
    typeof document === "undefined" ? null : document.createElement("canvas"),
  );
  return {
    kind: "canvas2d",
    canvas,
    resize(width, height) {
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
    },
    render(items, frame) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      painter.paint(items, frame);
    },
    destroy() {
      painter.destroy();
      canvas.width = 0;
      canvas.height = 0;
    },
  };
};
