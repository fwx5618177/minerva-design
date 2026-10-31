// Runs benchmark jobs one after the other, one mounted chart at a time.
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChartSeries } from "minerva-design/charts";
import { measureRefresh, type BenchJob, type BenchResult } from "./score";
import { makeSeries, type Workload } from "./workloads";

interface Active {
  job: BenchJob;
  series: ChartSeries[];
  startedAt: number;
  run: number;
}

/**
 * Runs jobs one after the other. The data of a workload is generated once
 * (before the clock starts) and shared by the backends.
 */
export function useBenchQueue(
  name: (workload: Workload, index: number) => string,
) {
  const [active, setActive] = useState<Active | null>(null);
  const [results, setResults] = useState<BenchResult[]>([]);
  const [refresh, setRefresh] = useState(60);
  const [running, setRunning] = useState(false);
  const [planned, setPlanned] = useState(0);
  const queue = useRef<BenchJob[]>([]);
  const cache = useRef(new Map<string, ChartSeries[]>());
  const runs = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nameRef = useRef(name);
  useEffect(() => {
    nameRef.current = name;
  });
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      queue.current = [];
    },
    [],
  );

  const next = useCallback(() => {
    const job = queue.current.shift();
    if (!job) {
      setActive(null);
      setRunning(false);
      return;
    }
    const key = `${job.workload}:${job.count}`;
    let series = cache.current.get(key);
    if (!series) {
      series = makeSeries(job.workload, job.count, (index) =>
        nameRef.current(job.workload, index),
      );
      cache.current.set(key, series);
    }
    setActive({
      job,
      series,
      startedAt: performance.now(),
      run: ++runs.current,
    });
  }, []);

  const start = useCallback(
    async (jobs: BenchJob[]) => {
      clearTimeout(timer.current);
      setResults([]);
      setRunning(true);
      setPlanned(jobs.length);
      queue.current = [...jobs];
      setRefresh(await measureRefresh());
      next();
    },
    [next],
  );

  const stop = useCallback(() => {
    clearTimeout(timer.current);
    queue.current = [];
    setActive(null);
    setRunning(false);
  }, []);

  /** Unmounts the chart, lets the GPU release it, then starts the next job */
  const onDone = useCallback(
    (result: BenchResult) => {
      setResults((previous) => [...previous, result]);
      setActive(null);
      timer.current = setTimeout(next, 300);
    },
    [next],
  );

  return {
    active,
    results,
    refresh,
    running,
    planned,
    start,
    stop,
    onDone,
  };
}
