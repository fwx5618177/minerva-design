// Uniform grid index of scattered points: hit testing among millions of
// points only looks at the cells around the pointer.

export class GridIndex {
  readonly cols: number;
  readonly rows: number;
  private readonly x0: number;
  private readonly y0: number;
  private readonly cellW: number;
  private readonly cellH: number;
  /** Start of each cell in `order` (length cols * rows + 1) */
  private readonly starts: Uint32Array;
  /** Point indices grouped by cell */
  private readonly order: Uint32Array;

  constructor(
    x: ArrayLike<number>,
    y: ArrayLike<number>,
    count: number,
    pointsPerCell = 4,
  ) {
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;
    let valid = 0;
    for (let i = 0; i < count; i++) {
      const xi = x[i];
      const yi = y[i];
      if (!Number.isFinite(xi) || !Number.isFinite(yi)) continue;
      valid++;
      if (xi < xMin) xMin = xi;
      if (xi > xMax) xMax = xi;
      if (yi < yMin) yMin = yi;
      if (yi > yMax) yMax = yi;
    }
    const side = Math.min(
      1024,
      Math.max(1, Math.ceil(Math.sqrt(valid / pointsPerCell))),
    );
    this.cols = side;
    this.rows = side;
    this.x0 = valid ? xMin : 0;
    this.y0 = valid ? yMin : 0;
    this.cellW = valid && xMax > xMin ? (xMax - xMin) / side : 1;
    this.cellH = valid && yMax > yMin ? (yMax - yMin) / side : 1;

    const cells = new Int32Array(count);
    const counts = new Uint32Array(side * side + 1);
    for (let i = 0; i < count; i++) {
      const xi = x[i];
      const yi = y[i];
      if (!Number.isFinite(xi) || !Number.isFinite(yi)) {
        cells[i] = -1;
        continue;
      }
      const cell = this.cellOf(xi, yi);
      cells[i] = cell;
      counts[cell + 1]++;
    }
    for (let c = 1; c < counts.length; c++) counts[c] += counts[c - 1];
    this.starts = counts.slice();
    const cursor = counts;
    this.order = new Uint32Array(valid);
    for (let i = 0; i < count; i++) {
      const cell = cells[i];
      if (cell >= 0) this.order[cursor[cell]++] = i;
    }
  }

  private column(xi: number) {
    const c = Math.floor((xi - this.x0) / this.cellW);
    return c < 0 ? 0 : c >= this.cols ? this.cols - 1 : c;
  }

  private row(yi: number) {
    const r = Math.floor((yi - this.y0) / this.cellH);
    return r < 0 ? 0 : r >= this.rows ? this.rows - 1 : r;
  }

  private cellOf(xi: number, yi: number) {
    return this.row(yi) * this.cols + this.column(xi);
  }

  /** Calls `visit` with every point that may lie inside the box */
  query(
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
    visit: (index: number) => void,
  ): void {
    if (this.order.length === 0) return;
    const c0 = this.column(Math.min(xMin, xMax));
    const c1 = this.column(Math.max(xMin, xMax));
    const r0 = this.row(Math.min(yMin, yMax));
    const r1 = this.row(Math.max(yMin, yMax));
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const cell = r * this.cols + c;
        for (let k = this.starts[cell]; k < this.starts[cell + 1]; k++) {
          visit(this.order[k]);
        }
      }
    }
  }
}
