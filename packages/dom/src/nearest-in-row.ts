// Vertical arrow navigation in a wrapping row of items (no fixed columns):
// the item of the nearest row above / below whose center is the closest
// horizontally, from the rendered geometry.

/**
 * The element of `elements` in the nearest row above (`direction` -1) or
 * below (1) `from`, closest to its horizontal center; null when there is
 * none (or nothing is laid out, e.g. in jsdom).
 */
export function nearestInRow<T extends Element>(
  elements: readonly T[],
  from: Element,
  direction: 1 | -1,
): T | null {
  const origin = from.getBoundingClientRect();
  const centerX = origin.left + origin.width / 2;
  let best: T | null = null;
  let bestRow = Infinity;
  let bestDx = Infinity;
  for (const element of elements) {
    if (element === from) continue;
    const rect = element.getBoundingClientRect();
    if (!rect.width && !rect.height) continue;
    const dy = (rect.top - origin.top) * direction;
    if (dy < Math.max(1, origin.height / 2)) continue;
    const dx = Math.abs(rect.left + rect.width / 2 - centerX);
    // a nearer row wins; within the same row (1px tolerance), the closest
    if (dy < bestRow - 1 || (Math.abs(dy - bestRow) <= 1 && dx < bestDx)) {
      best = element;
      bestRow = Math.min(bestRow, dy);
      bestDx = dx;
    }
  }
  return best;
}
