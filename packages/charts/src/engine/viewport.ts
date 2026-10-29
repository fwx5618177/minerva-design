// Zoom / pan math on [min, max] ranges.

export type Range = [number, number];

/**
 * Keeps a range inside `bounds` with a span between `minSpan` and the
 * span of the bounds (shifts it back instead of shrinking it).
 */
export const clampRange = (
  range: Range,
  bounds: Range,
  minSpan: number,
): Range => {
  const maxSpan = bounds[1] - bounds[0];
  const span = Math.min(Math.max(range[1] - range[0], minSpan), maxSpan);
  const center = (range[0] + range[1]) / 2;
  let a = center - span / 2;
  let b = a + span;
  if (a < bounds[0]) {
    a = bounds[0];
    b = a + span;
  }
  if (b > bounds[1]) {
    b = bounds[1];
    a = b - span;
  }
  return [a, b];
};

/** Scales a range around `anchor` (factor < 1 zooms in) */
export const zoomRange = (
  range: Range,
  anchor: number,
  factor: number,
): Range => [
  anchor - (anchor - range[0]) * factor,
  anchor + (range[1] - anchor) * factor,
];

export const panRange = (range: Range, delta: number): Range => [
  range[0] + delta,
  range[1] + delta,
];

export const sameRange = (a: Range, b: Range, epsilon = 1e-9): boolean => {
  const span = Math.max(Math.abs(b[1] - b[0]), 1e-300);
  return (
    Math.abs(a[0] - b[0]) <= span * epsilon &&
    Math.abs(a[1] - b[1]) <= span * epsilon
  );
};

/** Wheel delta -> zoom factor (trackpad pinches arrive as ctrl + small deltas) */
export const wheelFactor = (
  deltaY: number,
  deltaMode: number,
  pinch: boolean,
): number => {
  const pixels =
    deltaMode === 1 ? deltaY * 16 : deltaMode === 2 ? deltaY * 400 : deltaY;
  const speed = pinch ? 0.01 : 0.0025;
  return Math.exp(Math.max(-1, Math.min(1, pixels * speed)));
};
