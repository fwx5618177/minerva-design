// Curves between the points of a line: monotone cubic (smooth, never
// overshoots the data, passes through every point) and steps. The curve is
// resampled in data space, so every backend draws it as a polyline.

import type { ChartCurve } from "./types";

/** Smooth curves are resampled with this many segments between two points */
export const SMOOTH_STEPS = 10;
/** Above this many points per series a smooth curve is drawn straight (it is invisible anyway) */
export const SMOOTH_LIMIT = 50000;

/**
 * Points of the curve through `x[i], y[i]` (`i` in `[start, end)`), as
 * interleaved x, y, plus the index of the source point each output point
 * belongs to. Gaps (non-finite y) are kept.
 */
export const curvePoints = (
  x: ArrayLike<number>,
  y: ArrayLike<number>,
  start: number,
  end: number,
  curve: ChartCurve,
): { points: Float64Array; source: Uint32Array; length: number } => {
  const n = Math.max(0, end - start);
  if (curve === "step") {
    const points = new Float64Array(n * 4);
    const source = new Uint32Array(n * 2);
    let length = 0;
    for (let i = start; i < end; i++) {
      const prevValid = i > start && Number.isFinite(y[i - 1]);
      if (prevValid && Number.isFinite(y[i])) {
        // horizontal run at the previous value, then the vertical jump
        points[length * 2] = x[i];
        points[length * 2 + 1] = y[i - 1];
        source[length++] = i - 1;
      }
      points[length * 2] = x[i];
      points[length * 2 + 1] = y[i];
      source[length++] = i;
    }
    return { points, source, length };
  }
  if (curve !== "smooth" || n < 3 || n > SMOOTH_LIMIT) {
    const points = new Float64Array(n * 2);
    const source = new Uint32Array(n);
    for (let i = start; i < end; i++) {
      points[(i - start) * 2] = x[i];
      points[(i - start) * 2 + 1] = y[i];
      source[i - start] = i;
    }
    return { points, source, length: n };
  }

  // Fritsch-Carlson tangents, per run of finite points
  const tangents = new Float64Array(n);
  const valid = (i: number) =>
    i >= start && i < end && Number.isFinite(y[i]) && Number.isFinite(x[i]);
  const slope = (i: number) => {
    const dx = x[i + 1] - x[i];
    return dx !== 0 ? (y[i + 1] - y[i]) / dx : 0;
  };
  for (let i = start; i < end; i++) {
    if (!valid(i)) continue;
    const hasPrev = valid(i - 1);
    const hasNext = valid(i + 1);
    let m: number;
    if (hasPrev && hasNext) {
      const a = slope(i - 1);
      const b = slope(i);
      if (a * b <= 0) {
        m = 0;
      } else {
        // weighted harmonic mean keeps the curve monotone between points
        const ha = x[i] - x[i - 1];
        const hb = x[i + 1] - x[i];
        const w1 = 2 * hb + ha;
        const w2 = hb + 2 * ha;
        m = (w1 + w2) / (w1 / a + w2 / b);
      }
    } else if (hasNext) {
      m = slope(i);
    } else if (hasPrev) {
      m = slope(i - 1);
    } else {
      m = 0;
    }
    tangents[i - start] = m;
  }

  const points = new Float64Array((n - 1) * SMOOTH_STEPS * 2 + 2);
  const source = new Uint32Array((n - 1) * SMOOTH_STEPS + 1);
  let length = 0;
  for (let i = start; i < end; i++) {
    points[length * 2] = x[i];
    points[length * 2 + 1] = y[i];
    source[length++] = i;
    if (!valid(i) || !valid(i + 1)) continue;
    const x0 = x[i];
    const y0 = y[i];
    const h = x[i + 1] - x0;
    const m0 = tangents[i - start] * h;
    const m1 = tangents[i + 1 - start] * h;
    const y1 = y[i + 1];
    for (let k = 1; k < SMOOTH_STEPS; k++) {
      const t = k / SMOOTH_STEPS;
      const t2 = t * t;
      const t3 = t2 * t;
      // cubic Hermite basis
      const v =
        (2 * t3 - 3 * t2 + 1) * y0 +
        (t3 - 2 * t2 + t) * m0 +
        (-2 * t3 + 3 * t2) * y1 +
        (t3 - t2) * m1;
      points[length * 2] = x0 + h * t;
      points[length * 2 + 1] = v;
      source[length++] = i;
    }
  }
  return { points, source, length };
};
