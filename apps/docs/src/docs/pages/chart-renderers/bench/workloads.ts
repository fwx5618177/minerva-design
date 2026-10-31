// Workloads of the renderer benchmarks: seeded typed-array columns (every
// visit draws the same picture) and the camera path that zooms in and out
// of them while the frames are measured.
import type { ChartSeries, ChartView } from "minerva-design/charts";

export type Workload = "line" | "scatter" | "bars";

export const WORKLOADS: readonly Workload[] = ["line", "scatter", "bars"];

/** Point counts offered per workload (bars stay lower: one shape each) */
export const COUNTS: Record<Workload, readonly number[]> = {
  line: [10_000, 100_000, 1_000_000, 2_000_000],
  scatter: [10_000, 100_000, 1_000_000, 2_000_000],
  bars: [1_000, 10_000, 100_000, 200_000],
};

/** Seeded PRNG (mulberry32): uniform numbers in [0, 1) */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINES = 4;
const CLUSTERS = 8;
const START = Date.UTC(2026, 0, 1);

/** Four signals sharing one x column (one sample per second) */
const lineSeries = (count: number, name: (index: number) => string) => {
  const length = Math.max(2, Math.round(count / LINES));
  const random = mulberry32(11);
  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) x[i] = START + i * 1000;
  return Array.from({ length: LINES }, (_, s): ChartSeries => {
    const y = new Float64Array(length);
    let walk = 0;
    for (let i = 0; i < length; i++) {
      walk += (random() - 0.5) * 0.6;
      walk *= 0.999;
      y[i] = 20 + s * 12 + walk + 4 * Math.sin((i / length) * 18 + s);
    }
    return {
      id: `signal-${s}`,
      name: name(s + 1),
      data: { x, y },
      lineWidth: 1,
    };
  });
};

/** Eight Gaussian clusters */
const scatterSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(23);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const per = Math.max(1, Math.round(count / CLUSTERS));
  const pointSize = count > 200_000 ? 2 : count > 20_000 ? 3 : 5;
  return Array.from({ length: CLUSTERS }, (_, c): ChartSeries => {
    const angle = (c / CLUSTERS) * 2 * Math.PI;
    const cx = 50 + 28 * Math.cos(angle);
    const cy = 50 + 28 * Math.sin(angle);
    const spread = 4 + (c % 3) * 2;
    const x = new Float64Array(per);
    const y = new Float64Array(per);
    for (let i = 0; i < per; i++) {
      x[i] = cx + normal() * spread;
      y[i] = cy + normal() * spread;
    }
    return {
      id: `cluster-${c}`,
      name: name(c + 1),
      type: "scatter",
      data: { x, y },
      pointSize,
      opacity: 0.6,
    };
  });
};

/** One bar per index */
const barSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(37);
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    x[i] = i;
    y[i] = 40 + 30 * Math.sin((i / count) * 12) + random() * 25;
  }
  return [
    { id: "bars", name: name(1), type: "bar", data: { x, y } },
  ] as ChartSeries[];
};

/** The series of a workload; `name` labels series `index` (from 1) */
export const makeSeries = (
  workload: Workload,
  count: number,
  name: (index: number) => string,
): ChartSeries[] =>
  workload === "line"
    ? lineSeries(count, name)
    : workload === "scatter"
      ? scatterSeries(count, name)
      : barSeries(count, name);

/** Deepest zoom of the camera path, per workload */
const ZOOM: Record<Workload, number> = { line: 200, scatter: 20, bars: 100 };

/**
 * The view at `seconds` into a run of `period` seconds: from the whole data
 * set (the hardest frame) down to the deepest zoom and back, drifting
 * sideways so that new data enters the window on every frame.
 */
export const cameraAt = (
  workload: Workload,
  seconds: number,
  period: number,
  base: ChartView,
): ChartView => {
  const phase = (seconds / period) * 2 * Math.PI;
  const zoom = 1 + ((ZOOM[workload] - 1) * (1 - Math.cos(phase))) / 2;
  const axis = (
    [from, to]: [number, number],
    drift: number,
  ): [number, number] => {
    const width = (to - from) / zoom;
    const room = (to - from - width) / 2;
    const center = (from + to) / 2 + room * 0.8 * drift;
    return [center - width / 2, center + width / 2];
  };
  return {
    x: axis(base.x, Math.sin(phase * 1.5)),
    y: workload === "scatter" ? axis(base.y, Math.cos(phase * 1.5)) : base.y,
  };
};
