// GPU items of the trading chart. Positions are baked in device pixels of
// the data canvas (one canvas under every pane): candles are snapped to
// the pixel grid so they stay crisp, and every pane clips its own items.

import {
  BAR_STRIDE,
  GAP,
  type AreaItem,
  type BarItem,
  type LineItem,
} from "../renderers/types";
import type { Rgba } from "../color";

/** Growable list of bar instances (x, y0, y1, packed color) */
export class BarBuffer {
  private f = new Float32Array(256);
  private u = new Uint32Array(this.f.buffer);
  count = 0;

  push(x: number, y0: number, y1: number, color: number): void {
    if ((this.count + 1) * 4 > this.f.length) {
      const next = new Float32Array(this.f.length * 2);
      next.set(this.f);
      this.f = next;
      this.u = new Uint32Array(next.buffer);
    }
    const o = this.count * 4;
    this.f[o] = x;
    this.f[o + 1] = y0;
    this.f[o + 2] = y1;
    this.u[o + 3] = color;
    this.count++;
  }

  item(
    key: string,
    version: number,
    halfWidth: number,
    minHalf = 0,
    radius = 0,
  ): BarItem {
    return {
      kind: "bar",
      key,
      version,
      color: [1, 1, 1, 1],
      instances: this.f.buffer.slice(0, this.count * BAR_STRIDE),
      count: this.count,
      halfWidth,
      radius,
      inset: 0,
      minHalf,
      sorted: false,
    };
  }
}

/**
 * Polyline clipped to the band `top..bottom` (device y): segments leaving
 * the band are cut at its edge, NaN values break the line
 */
export class LineBuffer {
  private p = new Float32Array(512);
  count = 0;
  private px = NaN;
  private py = NaN;
  /** The last written point is the previous point itself */
  private open = false;

  constructor(
    private readonly top: number,
    private readonly bottom: number,
  ) {}

  private write(x: number, y: number) {
    if ((this.count + 1) * 2 > this.p.length) {
      const next = new Float32Array(this.p.length * 2);
      next.set(this.p);
      this.p = next;
    }
    this.p[this.count * 2] = x;
    this.p[this.count * 2 + 1] = y;
    this.count++;
  }

  private gap() {
    if (this.count && this.p[this.count * 2 - 1] < 1e37) this.write(GAP, GAP);
  }

  /** Breaks the line */
  break(): void {
    if (this.open) this.gap();
    this.open = false;
    this.px = this.py = NaN;
  }

  push(x: number, y: number): void {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      this.break();
      return;
    }
    const { top, bottom } = this;
    if (!Number.isFinite(this.px)) {
      if (y >= top && y <= bottom) {
        this.gap();
        this.write(x, y);
        this.open = true;
      }
      this.px = x;
      this.py = y;
      return;
    }
    const x0 = this.px;
    const y0 = this.py;
    this.px = x;
    this.py = y;
    // clip the segment to the band (parametric t in 0..1)
    let t0 = 0;
    let t1 = 1;
    const dy = y - y0;
    if (dy === 0) {
      if (y0 < top || y0 > bottom) t0 = 2;
    } else {
      const ta = (top - y0) / dy;
      const tb = (bottom - y0) / dy;
      t0 = Math.max(t0, Math.min(ta, tb));
      t1 = Math.min(t1, Math.max(ta, tb));
    }
    if (t0 > t1) {
      if (this.open) this.gap();
      this.open = false;
      return;
    }
    if (!this.open || t0 > 0) {
      this.gap();
      this.write(x0 + (x - x0) * t0, y0 + dy * t0);
    }
    this.write(x0 + (x - x0) * t1, y0 + dy * t1);
    this.open = t1 >= 1;
    if (!this.open) this.gap();
  }

  item(key: string, version: number, color: Rgba, width: number): LineItem {
    return {
      kind: "line",
      key,
      version,
      color,
      points: this.p.slice(0, this.count * 2),
      count: this.count,
      width,
      sorted: false,
    };
  }
}

/** Area points (x, top, bottom), both edges clamped to a band */
export class AreaBuffer {
  private p = new Float32Array(768);
  count = 0;

  constructor(
    private readonly top: number,
    private readonly bottom: number,
  ) {}

  push(x: number, a: number, b: number): void {
    if ((this.count + 1) * 3 > this.p.length) {
      const next = new Float32Array(this.p.length * 2);
      next.set(this.p);
      this.p = next;
    }
    const o = this.count * 3;
    const ok = Number.isFinite(x) && Number.isFinite(a) && Number.isFinite(b);
    const clamp = (v: number) => Math.min(this.bottom, Math.max(this.top, v));
    this.p[o] = ok ? x : GAP;
    this.p[o + 1] = ok ? clamp(a) : GAP;
    this.p[o + 2] = ok ? clamp(b) : GAP;
    this.count++;
  }

  item(key: string, version: number, color: Rgba, opacity: number): AreaItem {
    return {
      kind: "area",
      key,
      version,
      color,
      points: this.p.slice(0, this.count * 3),
      count: this.count,
      opacity,
      sorted: false,
    };
  }
}

/** Candle metrics for a bar spacing (device px): crisp, centered wicks */
export interface CandleMetrics {
  /** Wick / outline width */
  wick: number;
  /** Body width (same parity as the wick, so the wick is centered) */
  body: number;
  /** x of a bar center snapped to the pixel grid */
  snap(x: number): number;
}

export const candleMetrics = (spacing: number, dpr: number): CandleMetrics => {
  const wick = Math.max(1, Math.round(dpr));
  let body = Math.round(spacing * 0.72);
  if (body > spacing - 1) body = Math.floor(spacing - 1);
  if (body < wick) body = wick;
  if ((body - wick) % 2) body -= 1;
  const odd = wick % 2 === 1;
  return {
    wick,
    body,
    snap: (x) => (odd ? Math.floor(x) + 0.5 : Math.round(x)),
  };
};

/** Clamps a device y range to a band; null when outside */
export const clampRange = (
  a: number,
  b: number,
  top: number,
  bottom: number,
): [number, number] | null => {
  let lo = Math.min(a, b);
  let hi = Math.max(a, b);
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return null;
  if (hi < top || lo > bottom) return null;
  lo = Math.max(top, lo);
  hi = Math.min(bottom, hi);
  return [lo, hi];
};

/** Rounds a device y range to whole pixels, at least `min` high */
export const pixelRange = (a: number, b: number, min = 1): [number, number] => {
  const lo = Math.round(Math.min(a, b));
  let hi = Math.round(Math.max(a, b));
  if (hi - lo < min) hi = lo + min;
  return [lo, hi];
};
