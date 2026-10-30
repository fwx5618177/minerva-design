// Contour lines of a height grid (marching squares).

/**
 * Segments where the grid crosses `level`: 4 numbers per segment
 * (column a, row a, column b, row b), in fractional grid coordinates.
 * Cells touching a non-finite height are skipped; saddles are split by the
 * average of the cell.
 */
export const contourSegments = (
  z: ArrayLike<number>,
  rows: number,
  cols: number,
  level: number,
  out: number[] = [],
): number[] => {
  const t = (a: number, b: number) => {
    const d = b - a;
    return d === 0 ? 0.5 : (level - a) / d;
  };
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const v00 = z[r * cols + c];
      const v01 = z[r * cols + c + 1];
      const v10 = z[(r + 1) * cols + c];
      const v11 = z[(r + 1) * cols + c + 1];
      if (
        !Number.isFinite(v00) ||
        !Number.isFinite(v01) ||
        !Number.isFinite(v10) ||
        !Number.isFinite(v11)
      ) {
        continue;
      }
      const code =
        (v00 >= level ? 1 : 0) |
        (v01 >= level ? 2 : 0) |
        (v11 >= level ? 4 : 0) |
        (v10 >= level ? 8 : 0);
      if (code === 0 || code === 15) continue;
      // crossing points on the edges: bottom (r), right (c + 1), top (r + 1), left (c)
      const bottom = () => [c + t(v00, v01), r] as const;
      const right = () => [c + 1, r + t(v01, v11)] as const;
      const top = () => [c + t(v10, v11), r + 1] as const;
      const left = () => [c, r + t(v00, v10)] as const;
      const push = (
        a: readonly [number, number],
        b: readonly [number, number],
      ) => out.push(a[0], a[1], b[0], b[1]);
      switch (code) {
        case 1:
        case 14:
          push(left(), bottom());
          break;
        case 2:
        case 13:
          push(bottom(), right());
          break;
        case 3:
        case 12:
          push(left(), right());
          break;
        case 4:
        case 11:
          push(right(), top());
          break;
        case 6:
        case 9:
          push(bottom(), top());
          break;
        case 7:
        case 8:
          push(left(), top());
          break;
        case 5:
        case 10: {
          const center = (v00 + v01 + v10 + v11) / 4;
          // the corners 00 / 11 (case 5) or 01 / 10 (case 10) are above
          const joined = center >= level === (code === 5);
          if (joined) {
            push(left(), top());
            push(bottom(), right());
          } else {
            push(left(), bottom());
            push(right(), top());
          }
          break;
        }
        default:
          break;
      }
    }
  }
  return out;
};
