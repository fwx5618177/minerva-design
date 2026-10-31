// Measures one backend at a time: mounts a chart forced onto the backend,
// waits for its first frame, warms up, then moves the camera on every
// animation frame for a fixed time and records the frame intervals and the
// main-thread time of each frame.
import { useEffect, useRef } from "react";
import {
  Chart,
  type ChartHandle,
  type ChartRendererKind,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";
import {
  percentile,
  scoreOf,
  type BenchJob,
  type BenchResult,
  type Measures,
} from "./score";
import { cameraAt } from "./workloads";

/** A started backend gets this long to draw its first frame, in ms */
const START_TIMEOUT = 15_000;
/** Frames skipped after the first one (uploads, shader compilation) */
const WARMUP = 5;
/** A frame interval above this ends the run (the backend is too slow), in ms */
const SLOW_FRAME = 2000;

interface StageProps {
  job: BenchJob;
  series: ChartSeries[];
  /** performance.now() when the job was mounted */
  startedAt: number;
  refresh: number;
  height: number;
  ariaLabel: string;
  onDrawn?: (backend: ChartRendererKind) => void;
  onDone: (result: BenchResult) => void;
}

/** The chart under test; reports once, then the host unmounts it */
export function BenchStage({
  job,
  series,
  startedAt,
  refresh,
  height,
  ariaLabel,
  onDrawn,
  onDone,
}: StageProps) {
  const handle = useRef<ChartHandle>(null);
  const drawn = useRef<ChartRendererKind | null>(null);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    let id = 0;
    let finished = false;
    let firstFrame = 0;
    let warmup = 0;
    let base: ChartView | null = null;
    let start = 0;
    let last = 0;
    const intervals: number[] = [];
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    // messages run once the frame they were posted in is rendered
    channel.port1.onmessage = (event: MessageEvent<[number, boolean]>) => {
      const [posted, first] = event.data;
      const now = performance.now();
      if (first) firstFrame = now - startedAt;
      else {
        work += now - posted;
        works++;
      }
    };

    const finish = (status: BenchResult["status"]) => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(id);
      const elapsed = last - start;
      const sorted = [...intervals].sort((a, b) => a - b);
      const measures: Measures = {
        startup: firstFrame,
        fps: elapsed > 0 ? (intervals.length * 1000) / elapsed : 0,
        p50: percentile(sorted, 0.5),
        p95: percentile(sorted, 0.95),
        work: works ? work / works : 0,
        frames: intervals.length,
      };
      // the last work message arrives after this frame
      setTimeout(() => {
        done.current({
          ...measures,
          job,
          drawn: drawn.current,
          status,
          refresh,
          score:
            status === "timeout"
              ? { smooth: 0, stability: 0, headroom: 0, startup: 0, total: 0 }
              : scoreOf(measures, refresh),
        });
      }, 0);
    };

    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      const instance = handle.current?.getInstance();
      if (!drawn.current || !instance) {
        if (performance.now() - startedAt > START_TIMEOUT) finish("timeout");
        return;
      }
      if (!firstFrame && warmup === 0) {
        channel.port2.postMessage([time, true]);
        warmup++;
        return;
      }
      if (warmup < WARMUP) {
        warmup++;
        return;
      }
      if (!base) {
        instance.resetZoom();
        base = instance.getView();
        start = time;
        last = time;
        return;
      }
      intervals.push(time - last);
      const slow = time - last > SLOW_FRAME;
      last = time;
      channel.port2.postMessage([time, false]);
      instance.setView(
        cameraAt(
          job.workload,
          (time - start) / 1000,
          job.duration / 1000,
          base,
        ),
      );
      if (slow) finish("slow");
      else if (time - start >= job.duration) finish("ok");
    };
    id = requestAnimationFrame(loop);
    return () => {
      finished = true;
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [job, startedAt, refresh]);

  return (
    <Chart
      ref={handle}
      series={series}
      renderer={job.backend}
      onRendererChange={(kind) => {
        drawn.current = kind;
        onDrawn?.(kind);
      }}
      legend={false}
      tooltip={false}
      interaction={false}
      xAxis={job.workload === "line" ? { type: "time" } : undefined}
      height={height}
      ariaLabel={ariaLabel}
    />
  );
}
