import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, LoadingState, Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartHandle,
  type ChartRendererKind,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";
import {
  fitY,
  loadClusters,
  loadSignals,
  tour,
  type Clusters,
  type Signals,
} from "../showcase/data";
import { probeBackends, type BackendsSupport } from "../../../renderer/support";
import { useFrameLoop, useInView } from "../showcase/meter";
import { fpsClass, useShowcaseFormat } from "../showcase/text";
import styles from "../showcase/showcase.module.scss";

const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
/** Duration of the run of each backend, in ms */
const RUN = 3000;
/** A backend that has not started after this long is given up, in ms */
const START_TIMEOUT = 15_000;
/** The previews draw one sample out of PREVIEW_STRIDE */
const PREVIEW_STRIDE = 100;

type Dataset = "line" | "scatter";

interface Result {
  fps: number;
  work: number;
}

interface Run {
  /** Backends of this run, in order */
  queue: readonly ChartRendererKind[];
  index: number;
  /** The chart under test has started its renderer */
  ready: boolean;
  /** Frames skipped after the start (the first draw uploads the data) */
  warmup: number;
  created: number;
  start: number;
  frames: number;
  work: number;
  works: number;
  base: ChartView | null;
}

const newRun = (queue: readonly ChartRendererKind[], index = 0): Run => ({
  queue,
  index,
  ready: false,
  warmup: 0,
  created: 0,
  start: 0,
  frames: 0,
  work: 0,
  works: 0,
  base: null,
});

/** One zoom in / zoom out per run, into the middle of the data */
const runTour = (dataset: Dataset, signals: Signals | null) =>
  dataset === "line"
    ? tour({
        zoom: 400,
        period: RUN / 1000,
        targets: [[signals?.x[signals.x.length >> 1] ?? NaN, NaN]],
      })
    : tour({ zoom: 20, period: RUN / 1000, targets: [[50, 50]], y: true });

/** Every PREVIEW_STRIDE-th value of a column */
const decimate = (column: Float64Array) => {
  const out = new Float64Array(Math.ceil(column.length / PREVIEW_STRIDE));
  for (let i = 0, j = 0; i < column.length; i += PREVIEW_STRIDE, j++)
    out[j] = column[i] ?? NaN;
  return out;
};

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const resultsId = useId();
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [dataset, setDataset] = useState<Dataset>("line");
  const [signals, setSignals] = useState<Signals | null>(null);
  const [clusters, setClusters] = useState<Clusters | null>(null);
  const [support, setSupport] = useState<BackendsSupport | null>(null);
  const [actual, setActual] = useState<
    Partial<Record<ChartRendererKind, ChartRendererKind>>
  >({});
  const [results, setResults] = useState<
    Partial<Record<ChartRendererKind, Result>>
  >({});
  const [skipped, setSkipped] = useState<readonly ChartRendererKind[]>([]);
  const [testing, setTesting] = useState<ChartRendererKind | null>(null);
  const handles = useRef<Partial<Record<ChartRendererKind, ChartHandle>>>({});
  const runRef = useRef<Run | null>(null);

  // the same arrays as the demos above: generated once for the page
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    if (dataset === "line")
      void loadSignals().then((data) => !cancelled && setSignals(data));
    else void loadClusters().then((data) => !cancelled && setClusters(data));
    return () => {
      cancelled = true;
    };
  }, [near, dataset]);

  // which GPU backends would run in software (and block the page)
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    void probeBackends().then((probed) => !cancelled && setSupport(probed));
    return () => {
      cancelled = true;
    };
  }, [near]);

  const [series, preview] = useMemo(() => {
    const make = (light: boolean): ChartSeries[] | null => {
      const column = light ? decimate : (c: Float64Array) => c;
      if (dataset === "line")
        return (
          signals?.y.map((y, index) => ({
            id: `sensor-${index}`,
            name: t("sensor", { index: index + 1 }),
            data: { x: column(signals.x), y: column(y) },
            lineWidth: 1,
          })) ?? null
        );
      return (
        clusters?.clusters.map(({ x, y }, index) => ({
          id: `cluster-${index}`,
          name: t("cluster", { index: index + 1 }),
          type: "scatter",
          data: { x: column(x), y: column(y) },
          pointSize: 2,
          opacity: light ? 0.7 : 0.55,
        })) ?? null
      );
    };
    // the previews are a light copy, drawn with Canvas2D until a run
    return [make(false), make(true)];
  }, [dataset, signals, clusters, t]);
  const previewPoints =
    dataset === "line"
      ? (signals?.y.length ?? 0) *
        Math.ceil((signals?.x.length ?? 0) / PREVIEW_STRIDE)
      : (clusters?.clusters ?? []).reduce(
          (sum, { x }) => sum + Math.ceil(x.length / PREVIEW_STRIDE),
          0,
        );

  const finish = (run: Run, kind: ChartRendererKind, result: Result | null) => {
    if (result) setResults((previous) => ({ ...previous, [kind]: result }));
    const next = run.queue[run.index + 1];
    runRef.current = next ? newRun(run.queue, run.index + 1) : null;
    setTesting(next ?? null);
  };

  /** Every backend in turn: the same camera path for RUN ms */
  useFrameLoop(visible && testing !== null, {
    onFrame: (time) => {
      const run = runRef.current;
      const kind = run?.queue[run.index];
      if (!run || !kind) return;
      if (!run.created) run.created = time;
      const instance = handles.current[kind]?.getInstance();
      if (!run.ready || !instance) {
        if (time - run.created > START_TIMEOUT) finish(run, kind, null);
        return;
      }
      if (run.warmup < 1) {
        run.warmup++;
        return;
      }
      if (!run.base) {
        instance.resetZoom();
        run.base = instance.getView();
        run.start = time;
        return;
      }
      const elapsed = time - run.start;
      run.frames++;
      const view = runTour(dataset, signals)(elapsed / 1000, run.base);
      if (dataset === "line" && signals && view.x) {
        const y = fitY(signals, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
      if (elapsed < RUN) return;
      finish(run, kind, {
        fps: (run.frames * 1000) / elapsed,
        work: run.works ? run.work / run.works : 0,
      });
    },
    onWork: (ms) => {
      const run = runRef.current;
      if (run?.base) {
        run.work += ms;
        run.works++;
      }
    },
  });

  /** Runs the backends that have a hardware GPU (or none: they fall back) */
  const start = () => {
    if (!support) return;
    const queue = BACKENDS.filter((kind) => support[kind] !== "software");
    setSkipped(BACKENDS.filter((kind) => support[kind] === "software"));
    setResults({});
    runRef.current = newRun(queue);
    setTesting(queue[0] ?? null);
  };

  /** Runs a single backend, even on a software GPU */
  const runAnyway = (kind: ChartRendererKind) => {
    setSkipped((previous) => previous.filter((k) => k !== kind));
    runRef.current = newRun([kind]);
    setTesting(kind);
  };

  /** Bars are relative to the slowest backend (main-thread time) */
  const slowest = Math.max(1, ...Object.values(results).map((r) => r.work));
  const label = (kind: ChartRendererKind) => {
    const drawn = actual[kind];
    return drawn && drawn !== kind
      ? t("compare.fellBack", {
          requested: text.renderer(kind),
          backend: text.renderer(drawn),
        })
      : text.renderer(kind);
  };
  const ran = Object.keys(results).length > 0 || skipped.length > 0;

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("compare.dataset")}
          direction="horizontal"
          size="small"
          value={dataset}
          disabled={testing !== null}
          onChange={(value) => {
            setDataset(value as Dataset);
            setResults({});
            setSkipped([]);
          }}
        >
          <Radio value="line" label={t("compare.line")} />
          <Radio value="scatter" label={t("compare.scatter")} />
        </RadioGroup>
        <Button
          size="small"
          disabled={!series || !support || testing !== null}
          onClick={start}
        >
          {t("compare.run")}
        </Button>
      </div>

      {series && preview ? (
        <div className={styles.compareGrid}>
          {BACKENDS.map((kind) => {
            const result = results[kind];
            const drawn = actual[kind];
            const software = support?.[kind] === "software";
            return (
              <div
                key={kind}
                className={`${styles.panel} ${testing === kind ? styles.panelActive : ""}`}
              >
                <div className={styles.panelHeader}>
                  <span>
                    <strong>{text.renderer(kind)}</strong>
                    {drawn && drawn !== kind && (
                      <span className={styles.fallback}>
                        {" "}
                        {t("compare.fallback", {
                          backend: text.renderer(drawn),
                        })}
                      </span>
                    )}
                  </span>
                  <span className={styles.result}>
                    {result ? (
                      <>
                        <span className={fpsClass(result.fps)}>
                          {t("fps", { value: text.count(result.fps) })}
                        </span>
                        {" · "}
                        {text.ms(result.work)}
                      </>
                    ) : testing === kind ? (
                      t("compare.measuring")
                    ) : skipped.includes(kind) ? (
                      t("compare.skipped")
                    ) : (
                      "–"
                    )}
                  </span>
                </div>
                {testing === kind ? (
                  // the full data set, only for the run of this backend
                  <Chart
                    key="run"
                    ref={(handle) => {
                      if (handle) handles.current[kind] = handle;
                      else delete handles.current[kind];
                    }}
                    series={series}
                    renderer={kind}
                    onRendererChange={(drawnWith) => {
                      const run = runRef.current;
                      if (run && run.queue[run.index] === kind)
                        run.ready = true;
                      setActual((previous) => ({
                        ...previous,
                        [kind]: drawnWith,
                      }));
                    }}
                    legend={false}
                    xAxis={dataset === "line" ? { type: "time" } : undefined}
                    height={220}
                    ariaLabel={t("compareAria", {
                      backend: text.renderer(kind),
                    })}
                  />
                ) : (
                  <Chart
                    key="preview"
                    series={preview}
                    renderer="canvas2d"
                    legend={false}
                    xAxis={dataset === "line" ? { type: "time" } : undefined}
                    height={220}
                    ariaLabel={t("compare.previewAria", {
                      backend: text.renderer(kind),
                    })}
                  />
                )}
                <div className={styles.panelNote}>
                  {testing === kind ? (
                    <span>
                      {t("compare.live", {
                        backend: text.renderer(drawn ?? kind),
                        value: text.compact(1_000_000),
                      })}
                    </span>
                  ) : software && !result ? (
                    <>
                      <span className={styles.fallback}>
                        {t("compare.software")}
                      </span>
                      <Button
                        size="xsmall"
                        variant="outline"
                        disabled={testing !== null}
                        onClick={() => runAnyway(kind)}
                      >
                        {t("compare.runAnyway")}
                      </Button>
                    </>
                  ) : (
                    <span className={styles.hint}>
                      {t("compare.preview", {
                        value: text.compact(previewPoints),
                      })}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingState
          className={styles.loading}
          style={{ height: 480 }}
          size="small"
          label={t("loading", { value: text.count(1_000_000) })}
        />
      )}

      {Object.keys(results).length > 0 && (
        <div className={styles.results}>
          <p className={styles.barsTitle} id={resultsId}>
            {t("compare.results")}
          </p>
          <ol className={styles.bars} aria-labelledby={resultsId}>
            {BACKENDS.map((kind) => {
              const result = results[kind];
              if (!result) return null;
              return (
                <li key={kind} className={styles.bar}>
                  <span>{label(kind)}</span>
                  <span className={styles.barTrack}>
                    <span
                      className={styles.barFill}
                      style={{ width: `${(result.work / slowest) * 100}%` }}
                    />
                  </span>
                  <span className={styles.result}>
                    {text.ms(result.work)} ·{" "}
                    <span className={fpsClass(result.fps)}>
                      {t("fps", { value: text.count(result.fps) })}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className={styles.footer}>
        <p role="status">
          {testing
            ? t("compare.running", { backend: text.renderer(testing) })
            : ran
              ? skipped.length
                ? `${t("compare.done")} ${t("compare.skippedNote", {
                    backends: skipped.map(text.renderer).join(", "),
                  })}`
                : t("compare.done")
              : t("compare.idle")}
        </p>
        <p className={styles.hint}>{t("compare.hint")}</p>
      </div>
    </div>
  );
}
