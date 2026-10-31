// Scores of the renderer benchmarks: what a run measures and how it turns
// into a score out of 100, relative to the display refresh rate.
import type { ChartRendererKind } from "minerva-design/charts";
import type { Workload } from "./workloads";

export const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export interface BenchJob {
  backend: ChartRendererKind;
  workload: Workload;
  count: number;
  /** Measured part of the run, in ms */
  duration: number;
}

export interface Measures {
  /** From mounting the chart to its first painted frame, in ms */
  startup: number;
  /** Frames per second over the run */
  fps: number;
  /** Median interval between two frames, in ms */
  p50: number;
  /** 95th percentile of the frame intervals, in ms */
  p95: number;
  /** Average main-thread time of a frame, in ms */
  work: number;
  frames: number;
}

/** Each part between 0 and 1, `total` out of 100 */
export interface Score {
  smooth: number;
  stability: number;
  headroom: number;
  startup: number;
  total: number;
}

export interface BenchResult extends Measures {
  job: BenchJob;
  /** Backend that drew the chart (another one after a fallback) */
  drawn: ChartRendererKind | null;
  /** `slow`: a frame took over 2 s, `timeout`: the backend never started */
  status: "ok" | "slow" | "timeout";
  /** Display refresh rate the score is relative to, in Hz */
  refresh: number;
  score: Score;
}

/** Weights of the score (they add up to 1) */
export const WEIGHTS = {
  smooth: 0.4,
  stability: 0.2,
  headroom: 0.25,
  startup: 0.15,
} as const;

/** A startup at or above this scores 0, in ms */
export const STARTUP_LIMIT = 1000;

const clamp = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/**
 * - smooth: frame rate / refresh rate
 * - stability: frame budget / 95th percentile frame interval
 * - headroom: 1 - main-thread time per frame / frame budget
 * - startup: 1 - time to first frame / 1 s
 */
export const scoreOf = (measures: Measures, refresh: number): Score => {
  const budget = 1000 / refresh;
  const parts = {
    smooth: clamp(measures.fps / refresh),
    stability: clamp(budget / measures.p95),
    headroom: clamp(1 - measures.work / budget),
    startup: clamp(1 - measures.startup / STARTUP_LIMIT),
  };
  const total =
    parts.smooth * WEIGHTS.smooth +
    parts.stability * WEIGHTS.stability +
    parts.headroom * WEIGHTS.headroom +
    parts.startup * WEIGHTS.startup;
  return { ...parts, total: Math.round(total * 100) };
};

export type Grade = "excellent" | "good" | "fair" | "poor";

export const gradeOf = (score: number): Grade =>
  score >= 85
    ? "excellent"
    : score >= 65
      ? "good"
      : score >= 40
        ? "fair"
        : "poor";

/** Display refresh rate: median of 24 idle animation-frame intervals, in Hz */
export const measureRefresh = (): Promise<number> =>
  new Promise((resolve) => {
    const times: number[] = [];
    const step = (time: number) => {
      times.push(time);
      if (times.length < 25) {
        requestAnimationFrame(step);
        return;
      }
      const deltas = times
        .slice(1)
        .map((t, i) => t - times[i]!)
        .sort((a, b) => a - b);
      const median = deltas[deltas.length >> 1] ?? 1000 / 60;
      resolve(Math.min(240, Math.max(30, Math.round(1000 / median))));
    };
    requestAnimationFrame(step);
  });

export const percentile = (sorted: readonly number[], p: number) =>
  sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] ?? 0;
