// Data sets of the performance showcases: typed-array columns generated once
// (seeded, so every visit draws the same picture) and shared by the demos of
// the page, plus the camera "tours" that zoom in and out of them.
import type { ChartView } from "minerva-design/charts";

export type Range = [number, number];

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

/** Standard normal numbers (Box-Muller, both values of a pair are used) */
export function gaussian(random: () => number) {
  let spare = NaN;
  return () => {
    if (!Number.isNaN(spare)) {
      const value = spare;
      spare = NaN;
      return value;
    }
    const r = Math.sqrt(-2 * Math.log(1 - random()));
    const a = 2 * Math.PI * random();
    spare = r * Math.sin(a);
    return r * Math.cos(a);
  };
}

/**
 * Generates a data set on first use, one frame later so that a loading
 * state paints first; later calls share the result.
 */
const cached = <T>(generate: () => T) => {
  let promise: Promise<T> | null = null;
  return (): Promise<T> => {
    if (!promise) {
      promise = new Promise<T>((resolve) => {
        const run = () => setTimeout(() => resolve(generate()), 0);
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(run);
        else run();
      });
    }
    return promise;
  };
};

const BLOCK = 512;

/**
 * Min / max of index ranges over several columns in O(BLOCK + n / BLOCK):
 * used to fit the y axis to the visible x range on every frame.
 */
export function rangeIndex(
  lows: readonly Float64Array[],
  highs: readonly Float64Array[],
) {
  const n = lows[0]?.length ?? 0;
  const blocks = Math.ceil(n / BLOCK);
  const blockMin = new Float64Array(blocks).fill(Infinity);
  const blockMax = new Float64Array(blocks).fill(-Infinity);
  for (const column of lows) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] < blockMin[b]) blockMin[b] = column[i];
    }
  }
  for (const column of highs) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] > blockMax[b]) blockMax[b] = column[i];
    }
  }
  return (from: number, to: number): Range | null => {
    let i = Math.max(0, Math.floor(from));
    const end = Math.min(n - 1, Math.ceil(to));
    if (i > end) return null;
    let lo = Infinity;
    let hi = -Infinity;
    const scan = (index: number) => {
      for (const column of lows) if (column[index] < lo) lo = column[index];
      for (const column of highs) if (column[index] > hi) hi = column[index];
    };
    for (; i <= end && i % BLOCK; i++) scan(i);
    for (; i + BLOCK - 1 <= end; i += BLOCK) {
      const b = i / BLOCK;
      if (blockMin[b] < lo) lo = blockMin[b];
      if (blockMax[b] > hi) hi = blockMax[b];
    }
    for (; i <= end; i++) scan(i);
    return lo <= hi ? [lo, hi] : null;
  };
}

/** Evenly sampled columns: the y range of the samples inside an x range */
export interface Sampled {
  start: number;
  step: number;
  range: (from: number, to: number) => Range | null;
}

/** The y range to show for an x range, with some padding */
export const fitY = (data: Sampled, x: Range): Range | null => {
  const r = data.range(
    (x[0] - data.start) / data.step - 1,
    (x[1] - data.start) / data.step + 1,
  );
  if (!r) return null;
  const pad = (r[1] - r[0]) * 0.08 || 1;
  return [r[0] - pad, r[1] + pad];
};

export interface TourOptions {
  /** Deepest magnification */
  zoom: number;
  /** Seconds of one zoom in / zoom out cycle */
  period?: number;
  /** Data positions to zoom into, one per cycle */
  targets: readonly (readonly [number, number])[];
  /** Zooms the y axis too (scatter, heatmap) */
  y?: boolean;
}

/**
 * A camera path for `setView`: zooms from the whole data set into a target,
 * drifts a little there and zooms out again, then moves to the next target.
 */
export const tour =
  ({ zoom, period = 12, targets, y = false }: TourOptions) =>
  (time: number, base: ChartView): Partial<ChartView> => {
    const cycle = Math.floor(time / period);
    const phase = (time % period) / period;
    const p = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    const target = targets[cycle % targets.length] ?? [NaN, NaN];
    const scale = Math.pow(1 / zoom, p);
    const axis = (range: Range, to: number, drift: number): Range => {
      const full = range[1] - range[0];
      const width = full * scale;
      const mid = (range[0] + range[1]) / 2;
      const goal = Number.isFinite(to) ? to : mid;
      const center = mid + (goal - mid) * p + width * 0.25 * drift * p;
      const start = Math.min(
        Math.max(center - width / 2, range[0]),
        range[1] - width,
      );
      return [start, start + width];
    };
    const x = axis(base.x, target[0], Math.sin(time * 0.7));
    return y ? { x, y: axis(base.y, target[1], Math.cos(time * 0.6)) } : { x };
  };

// ------------------------------------------------------------------ line

export const SIGNAL_SERIES = 4;
export const SIGNAL_LENGTH = 250_000;
const SIGNAL_START = Date.UTC(2026, 0, 1);
const SIGNAL_STEP = 1000;

export interface Signals extends Sampled {
  /** Timestamps, one per second */
  x: Float64Array;
  /** One column per sensor */
  y: Float64Array[];
}

/** 4 sensors × 250,000 samples: daily cycles, drift and noise */
export const loadSignals = cached((): Signals => {
  const normal = gaussian(mulberry32(2026));
  const x = new Float64Array(SIGNAL_LENGTH);
  for (let i = 0; i < SIGNAL_LENGTH; i++) x[i] = SIGNAL_START + i * SIGNAL_STEP;
  const y: Float64Array[] = [];
  for (let s = 0; s < SIGNAL_SERIES; s++) {
    const column = new Float64Array(SIGNAL_LENGTH);
    const level = 18 + s * 14;
    const swing = 3 + s * 1.5;
    let drift = 0;
    for (let i = 0; i < SIGNAL_LENGTH; i++) {
      drift = drift * 0.9995 + normal() * 0.06;
      const day = Math.sin((2 * Math.PI * i) / 86_400 + s * 1.3);
      const fast = Math.sin((2 * Math.PI * i) / (600 + s * 170));
      column[i] = level + day * swing + fast * 0.6 + drift + normal() * 0.25;
    }
    y.push(column);
  }
  return {
    x,
    y,
    start: SIGNAL_START,
    step: SIGNAL_STEP,
    range: rangeIndex(y, y),
  };
});

/** Moments of the signals worth zooming into */
export const SIGNAL_TARGETS: readonly (readonly [number, number])[] = [
  0.22, 0.68, 0.41, 0.87,
].map((f) => [SIGNAL_START + f * SIGNAL_LENGTH * SIGNAL_STEP, NaN] as const);

// --------------------------------------------------------------- scatter

export const CLUSTER_COUNT = 10;
export const CLUSTER_SIZE = 100_000;

export interface Clusters {
  clusters: { x: Float64Array; y: Float64Array }[];
  /** Centers of the clusters (tour targets) */
  centers: (readonly [number, number])[];
}

/** 10 clusters × 100,000 points: blobs, rings and spiral arms */
export const loadClusters = cached((): Clusters => {
  const random = mulberry32(42);
  const normal = gaussian(random);
  const clusters: Clusters["clusters"] = [];
  const centers: Clusters["centers"] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const angle = (2 * Math.PI * c) / CLUSTER_COUNT + random() * 0.4;
    const radius = c % 3 === 0 ? 14 : 34;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    const sx = 2 + random() * 4;
    const sy = 1.5 + random() * 3;
    const rotation = random() * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x = new Float64Array(CLUSTER_SIZE);
    const y = new Float64Array(CLUSTER_SIZE);
    for (let i = 0; i < CLUSTER_SIZE; i++) {
      let u: number;
      let v: number;
      if (c % 3 === 1) {
        // ring
        const a = random() * 2 * Math.PI;
        const r = 5 + normal() * 0.6;
        u = Math.cos(a) * r;
        v = Math.sin(a) * r;
      } else if (c % 3 === 2) {
        // spiral arm
        const t = random() * 3 * Math.PI;
        u = Math.cos(t) * t * 0.9 + normal() * 0.35;
        v = Math.sin(t) * t * 0.9 + normal() * 0.35;
      } else {
        u = normal() * sx;
        v = normal() * sy;
      }
      x[i] = cx + u * cos - v * sin;
      y[i] = cy + u * sin + v * cos;
    }
    clusters.push({ x, y });
    centers.push([cx, cy]);
  }
  return { clusters, centers };
});

// --------------------------------------------------------------- candles

export const CANDLE_COUNT = 200_000;
const CANDLE_START = Date.UTC(2026, 0, 5);
const CANDLE_STEP = 60_000;

export interface Candles extends Sampled {
  x: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
}

/** 200,000 one-minute candles: a random walk with changing volatility */
export const loadCandles = cached((): Candles => {
  const random = mulberry32(7);
  const normal = gaussian(random);
  const x = new Float64Array(CANDLE_COUNT);
  const open = new Float64Array(CANDLE_COUNT);
  const high = new Float64Array(CANDLE_COUNT);
  const low = new Float64Array(CANDLE_COUNT);
  const close = new Float64Array(CANDLE_COUNT);
  let price = 120;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const sigma = 0.0012 * (1 + 0.7 * Math.sin(i / 9000) ** 2);
    const o = price;
    const c = o * Math.exp(normal() * sigma + 0.000002);
    x[i] = CANDLE_START + i * CANDLE_STEP;
    open[i] = o;
    close[i] = c;
    high[i] = Math.max(o, c) * (1 + Math.abs(normal()) * sigma * 0.7);
    low[i] = Math.min(o, c) * (1 - Math.abs(normal()) * sigma * 0.7);
    price = c;
  }
  return {
    x,
    open,
    high,
    low,
    close,
    start: CANDLE_START,
    step: CANDLE_STEP,
    range: rangeIndex([low], [high]),
  };
});

export const CANDLE_TARGETS: readonly (readonly [number, number])[] = [
  0.31, 0.74, 0.12, 0.55,
].map((f) => [CANDLE_START + f * CANDLE_COUNT * CANDLE_STEP, NaN] as const);

// --------------------------------------------------------------- heatmap

export const SPECTRUM_STEPS = 1000;
export const SPECTRUM_BINS = 1000;
/** Seconds per time step */
const DT = 0.02;
/** Hz per frequency bin */
const DF = 8;

export interface Spectrogram {
  /** Time of each cell (sorted: the cells go column by column) */
  x: Float64Array;
  /** Frequency of each cell */
  y: Float64Array;
  /** Level in dB */
  value: Float64Array;
}

/**
 * 1,000 time steps × 1,000 frequency bins: a chirp and its harmonics, a
 * warbling tone, periodic clicks and a pink noise floor
 */
export const loadSpectrogram = cached((): Spectrogram => {
  const normal = gaussian(mulberry32(1000));
  const n = SPECTRUM_STEPS * SPECTRUM_BINS;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const value = new Float64Array(n);
  const duration = SPECTRUM_STEPS * DT;
  const tones: [number, number, number][] = [];
  for (let step = 0; step < SPECTRUM_STEPS; step++) {
    const t = step * DT;
    const chirp = 400 + 1500 * (t / duration) + 250 * Math.sin(t * 0.9);
    tones.length = 0;
    for (let h = 1; h <= 4; h++) tones.push([chirp * h, 40 * h, 1 / h ** 1.6]);
    tones.push([5200 + 700 * Math.sin((2 * Math.PI * t) / 4), 60, 0.35]);
    const click = Math.exp(-(((t % 2.5) - 1.2) ** 2) / 0.002) * 0.08;
    for (let bin = 0; bin < SPECTRUM_BINS; bin++) {
      const f = bin * DF;
      let power = 1e-7 / (1 + f / 300) + click / (1 + f / 4000);
      for (const [fc, width, amp] of tones) {
        const d = (f - fc) / width;
        if (d > -5 && d < 5) power += amp * Math.exp(-d * d);
      }
      const i = step * SPECTRUM_BINS + bin;
      x[i] = t;
      y[i] = f;
      value[i] = 10 * Math.log10(power) + normal() * 1.5;
    }
  }
  return { x, y, value };
});

export const SPECTRUM_TARGETS: readonly (readonly [number, number])[] = [
  [6, 1200],
  [3, 5200],
  [12.2, 2500],
  [17, 3900],
];
