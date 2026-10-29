// Min-max decimation: keeps the shape of a sorted line with at most four
// points per pixel column (first, min, max, last).

export interface DecimatedLine {
  /** Interleaved x, y; NaN y marks a gap */
  points: Float64Array;
  /** Number of points */
  length: number;
}

/**
 * Decimates the points `[start, end)` of a line with sorted x, given as
 * interleaved `x, y` values. `column` maps an x value to its pixel column.
 * Missing values (NaN or `gap`) are kept as a single NaN point so the
 * gaps survive.
 */
export const decimateMinMax = (
  points: ArrayLike<number>,
  start: number,
  end: number,
  column: (x: number) => number,
  gap = Infinity,
): DecimatedLine => {
  const out = new Float64Array(Math.max(0, end - start) * 2);
  let length = 0;
  let col = NaN;
  let first = -1;
  let min = -1;
  let max = -1;
  let last = -1;

  const push = (i: number) => {
    out[length * 2] = points[i * 2];
    out[length * 2 + 1] = points[i * 2 + 1];
    length++;
  };
  const flush = () => {
    if (first < 0) return;
    push(first);
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    if (lo !== first) push(lo);
    if (hi !== lo && hi !== first) push(hi);
    if (last !== hi && last !== lo && last !== first) push(last);
    first = -1;
  };
  const valid = (v: number) => Number.isFinite(v) && Math.abs(v) < gap;

  for (let i = start; i < end; i++) {
    const x = points[i * 2];
    const y = points[i * 2 + 1];
    if (!valid(x) || !valid(y)) {
      flush();
      col = NaN;
      if (length > 0 && !Number.isNaN(out[length * 2 - 1])) {
        out[length * 2] = x;
        out[length * 2 + 1] = NaN;
        length++;
      }
      continue;
    }
    const c = Math.floor(column(x));
    if (c !== col || first < 0) {
      flush();
      col = c;
      first = min = max = last = i;
    } else {
      if (y < points[min * 2 + 1]) min = i;
      if (y > points[max * 2 + 1]) max = i;
      last = i;
    }
  }
  flush();
  return { points: out, length };
};
