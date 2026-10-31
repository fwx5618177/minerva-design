// Placement of the labels painted over the chart, so that they never overlap

/** A rectangle in CSS pixels */
export interface LabelBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** Whether two boxes overlap, with `pad` pixels of margin around `a` */
export const boxesOverlap = (a: LabelBox, b: LabelBox, pad = 0) =>
  a.left - pad < b.right &&
  a.right + pad > b.left &&
  a.top - pad < b.bottom &&
  a.bottom + pad > b.top;

/** A label of a vertical stack: its wished top, its height and its priority */
export interface StackedLabel {
  top: number;
  height: number;
  /** Higher is kept first when the labels do not all fit @default 0 */
  priority?: number;
}

/**
 * Lays labels out in a column (e.g. the price axis) without overlaps,
 * moving each label as little as possible from its wished position: labels
 * that would overlap are grouped and centred on their wished positions, then
 * kept between `min` and `max`. When they cannot all fit, the ones of lowest
 * priority are dropped. Returns the top of each label, `null` when dropped.
 */
export const stackLabels = (
  labels: readonly StackedLabel[],
  min: number,
  max: number,
  gap = 1,
): (number | null)[] => {
  const result: (number | null)[] = labels.map(() => null);
  const kept = labels
    .map((label, index) => ({ label, index }))
    .filter(({ label }) => Number.isFinite(label.top) && label.height > 0);
  const space = max - min;
  const needed = () =>
    kept.reduce((sum, { label }) => sum + label.height, 0) +
    gap * Math.max(0, kept.length - 1);
  while (kept.length > 1 && needed() > space) {
    let drop = 0;
    for (let k = 1; k < kept.length; k++) {
      const a = kept[k]?.label.priority ?? 0;
      const b = kept[drop]?.label.priority ?? 0;
      if (a <= b) drop = k;
    }
    kept.splice(drop, 1);
  }
  kept.sort((a, b) => a.label.top - b.label.top || a.index - b.index);

  // blocks of labels packed together; each block sits where the mean of its
  // members' wishes puts it
  interface Block {
    first: number;
    last: number;
    top: number;
    height: number;
    /** Sum of the wished tops, each minus its offset in the block */
    wish: number;
  }
  const blocks: Block[] = [];
  const place = (block: Block) => {
    const count = block.last - block.first + 1;
    block.top = Math.max(min, Math.min(max - block.height, block.wish / count));
  };
  kept.forEach(({ label }, k) => {
    const block: Block = {
      first: k,
      last: k,
      top: 0,
      height: label.height,
      wish: label.top,
    };
    place(block);
    let previous = blocks[blocks.length - 1];
    while (previous && previous.top + previous.height + gap > block.top) {
      // merge: the members of `block` move down by the height of `previous`
      previous.wish +=
        block.wish - (block.last - block.first + 1) * (previous.height + gap);
      previous.height += gap + block.height;
      previous.last = block.last;
      blocks.pop();
      block.first = previous.first;
      block.last = previous.last;
      block.height = previous.height;
      block.wish = previous.wish;
      place(block);
      previous = blocks[blocks.length - 1];
    }
    blocks.push(block);
  });
  for (const block of blocks) {
    let top = block.top;
    for (let m = block.first; m <= block.last; m++) {
      const item = kept[m];
      if (!item) continue;
      result[item.index] = top;
      top += item.label.height + gap;
    }
  }
  return result;
};

/**
 * Lays out labels anchored by their right edge on a row (e.g. the tags of
 * the order lines): a label that would overlap an earlier one (or one of
 * the `fixed` boxes) moves left of it. Returns the left of each label.
 */
export const placeTags = (
  tags: readonly {
    right: number;
    top: number;
    width: number;
    height: number;
  }[],
  fixed: readonly LabelBox[] = [],
  gap = 4,
): number[] => {
  const placed: LabelBox[] = [...fixed];
  return tags.map((tag) => {
    let left = tag.right - tag.width;
    for (let guard = 0; guard <= placed.length; guard++) {
      const box = {
        left,
        top: tag.top,
        right: left + tag.width,
        bottom: tag.top + tag.height,
      };
      const hit = placed.filter((other) => boxesOverlap(box, other, gap / 2));
      if (!hit.length) break;
      left = Math.min(...hit.map((other) => other.left)) - gap - tag.width;
    }
    placed.push({
      left,
      top: tag.top,
      right: left + tag.width,
      bottom: tag.top + tag.height,
    });
    return left;
  });
};

/** The first candidate box that overlaps none of the obstacles, or -1 */
export const firstFree = (
  candidates: readonly LabelBox[],
  obstacles: readonly LabelBox[],
  pad = 2,
) =>
  candidates.findIndex(
    (box) => !obstacles.some((other) => boxesOverlap(box, other, pad)),
  );
