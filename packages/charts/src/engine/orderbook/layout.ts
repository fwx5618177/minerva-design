// Pure layout helpers of the order book widgets: price-axis label collision
// resolution and the view fitting of the liquidity heatmap.

/** A label on a vertical axis: center and height, in pixels */
export interface AxisLabel {
  y: number;
  h: number;
}

/** Result of `layoutAxisLabels` */
export interface AxisLabelLayout {
  /** Centers of the pinned labels (moved apart), `null` when hidden by the hover label */
  pinned: (number | null)[];
  /** Whether each tick label stays visible */
  ticks: boolean[];
}

/**
 * Resolves the collisions of the labels of a price axis. Priority: the
 * hover label stays where it is and hides the pinned labels it covers;
 * pinned labels (best bid / ask, last trade) never overlap each other: a
 * group of overlapping ones is stacked, in order, around their desired
 * positions and kept within `bounds`; tick labels under any of them are
 * hidden.
 */
export const layoutAxisLabels = (
  pinned: readonly AxisLabel[],
  hover: AxisLabel | null,
  ticks: readonly number[],
  tickHeight: number,
  bounds: readonly [number, number],
  gap = 2,
): AxisLabelLayout => {
  const [top, bottom] = bounds;
  // blocks of stacked labels, top to bottom
  interface Block {
    items: number[];
    /** Offset of each item's center from the block's top */
    offsets: number[];
    height: number;
    top: number;
  }
  const order = pinned
    .map((label, i) => ({ label, i }))
    .filter(({ label }) => Number.isFinite(label.y))
    .sort((a, b) => a.label.y - b.label.y || a.i - b.i);
  const place = (block: Block) => {
    let sum = 0;
    block.items.forEach((item, k) => {
      sum += pinned[item]!.y - block.offsets[k]!;
    });
    const ideal = sum / block.items.length;
    block.top = Math.max(top, Math.min(ideal, bottom - block.height));
  };
  const blocks: Block[] = [];
  for (const { label, i } of order) {
    const block: Block = {
      items: [i],
      offsets: [label.h / 2],
      height: label.h,
      top: label.y - label.h / 2,
    };
    place(block);
    blocks.push(block);
    // merge with the blocks above while they overlap
    while (blocks.length > 1) {
      const last = blocks[blocks.length - 1]!;
      const previous = blocks[blocks.length - 2]!;
      if (previous.top + previous.height + gap <= last.top) break;
      const shift = previous.height + gap;
      previous.items.push(...last.items);
      previous.offsets.push(...last.offsets.map((o) => o + shift));
      previous.height += gap + last.height;
      blocks.pop();
      place(previous);
    }
  }
  const centers: (number | null)[] = pinned.map(() => null);
  for (const block of blocks) {
    block.items.forEach((item, k) => {
      centers[item] = block.top + block.offsets[k]!;
    });
  }
  const overlaps = (a: number, ah: number, b: number, bh: number) =>
    Math.abs(a - b) < (ah + bh) / 2 + gap;
  if (hover) {
    centers.forEach((y, i) => {
      if (y !== null && overlaps(y, pinned[i]!.h, hover.y, hover.h))
        centers[i] = null;
    });
  }
  const shown: AxisLabel[] = [];
  centers.forEach((y, i) => {
    if (y !== null) shown.push({ y, h: pinned[i]!.h });
  });
  if (hover) shown.push(hover);
  return {
    pinned: centers,
    ticks: ticks.map(
      (y) =>
        y - tickHeight / 2 >= top &&
        y + tickHeight / 2 <= bottom &&
        !shown.some((label) => overlaps(y, tickHeight, label.y, label.h)),
    ),
  };
};

/**
 * Price range of a following heatmap view, with hysteresis: the current
 * range is kept while the traded prices (`lo` – `hi`, best bid / ask of the
 * window) stay inside its inner part and it is not much too wide; otherwise
 * a range centered on them, `minSpan` or 1.6 × their spread high. With
 * `fixedSpan` (the user zoomed the prices) only the center moves.
 */
export const fitPriceRange = (
  current: readonly [number, number] | null,
  lo: number,
  hi: number,
  minSpan: number,
  fixedSpan?: number,
): [number, number] => {
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) {
    return current ? [current[0], current[1]] : [NaN, NaN];
  }
  const want =
    fixedSpan !== undefined && fixedSpan > 0
      ? fixedSpan
      : Math.max(minSpan, (hi - lo) * 1.6);
  if (current && Number.isFinite(current[0]) && Number.isFinite(current[1])) {
    const span = current[1] - current[0];
    const margin = span * 0.12;
    const inside = lo >= current[0] + margin && hi <= current[1] - margin;
    const sized =
      fixedSpan !== undefined && fixedSpan > 0
        ? Math.abs(span / fixedSpan - 1) < 1e-6
        : span <= want * 1.8;
    if (inside && sized) return [current[0], current[1]];
  }
  const center = (lo + hi) / 2;
  return [center - want / 2, center + want / 2];
};

/**
 * Time range of a following heatmap view ending at `right`: `window` wide
 * once the data covers it; before that, the span of the data (at least
 * `minSpan`), so a short history fills the plot from the left.
 */
export const fitTimeRange = (
  first: number,
  right: number,
  window: number,
  minSpan: number,
): [number, number] => {
  const span = Number.isFinite(first)
    ? Math.max(Math.min(minSpan, window), Math.min(window, right - first))
    : window;
  return [right - span, right];
};

/** Smallest "nice" number (1, 2, 2.5, 5 × 10ⁿ) at least `value` */
export const niceCeil = (value: number): number => {
  if (!(value > 0) || !Number.isFinite(value)) return 0;
  const power = 10 ** Math.floor(Math.log10(value));
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (m * power >= value * (1 - 1e-9)) return m * power;
  }
  return 10 * power;
};

/**
 * Smallest number of a fine "nice" series (1, 1.2, 1.5, 2, 2.5, 3, 4, 5,
 * 6, 8 × 10ⁿ) at least `value`: a scale at most a third above the value
 */
export const fineCeil = (value: number): number => {
  if (!(value > 0) || !Number.isFinite(value)) return 0;
  const power = 10 ** Math.floor(Math.log10(value));
  for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (m * power >= value * (1 - 1e-9)) return +(m * power).toPrecision(12);
  }
  return 10 * power;
};
