import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup } from "minerva-design";
import { LineChart, type ChartSeries } from "minerva-design/charts";
import { probeBackends } from "../../../renderer/support";
import { useBenchFormat } from "../bench/format";
import { useBenchQueue } from "../bench/queue";
import { BACKENDS } from "../bench/score";
import { BenchStage } from "../bench/stage";
import { COUNTS, type Workload } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

/** Shorter runs: four sizes per backend */
const DURATION = 1500;

export default function ScalingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [workload, setWorkload] = useState<Workload>("line");
  const [measured, setMeasured] = useState<Workload>("line");
  const bench = useBenchQueue((kind, index) => t(`series.${kind}`, { index }));
  const { active, results, running, planned } = bench;

  const run = async () => {
    const support = await probeBackends();
    const backends = BACKENDS.filter((kind) => support[kind] !== "software");
    setMeasured(workload);
    void bench.start(
      backends.flatMap((backend) =>
        COUNTS[workload].map((count) => ({
          backend,
          workload,
          count,
          duration: DURATION,
        })),
      ),
    );
  };

  /** One line per backend, one point per size */
  const curve = (value: (fps: number, work: number) => number) =>
    BACKENDS.map((kind): ChartSeries | null => {
      const runs = results.filter(
        (r) => r.job.backend === kind && r.status !== "timeout",
      );
      if (!runs.length) return null;
      return {
        id: kind,
        name: text.renderer(kind),
        data: runs.map((r) => [r.job.count, value(r.fps, r.work)] as const),
      };
    }).filter((series): series is ChartSeries => series !== null);

  const xAxis = {
    type: "log" as const,
    title: t("pointsAxis"),
    format: (value: number) => text.compact(value),
  };

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("workload")}
          direction="horizontal"
          size="small"
          value={workload}
          disabled={running}
          onChange={(value) => setWorkload(value as Workload)}
        >
          <Radio value="line" label={t("workloads.line")} />
          <Radio value="scatter" label={t("workloads.scatter")} />
        </RadioGroup>
        <span className={styles.spacer} />
        {running ? (
          <Button size="small" variant="outline" onClick={bench.stop}>
            {t("stop")}
          </Button>
        ) : (
          <Button size="small" onClick={() => void run()}>
            {t("runScaling")}
          </Button>
        )}
      </div>

      <div className={styles.body}>
        {running && (
          <div className={styles.live} style={{ minHeight: 180 }}>
            {active ? (
              <BenchStage
                key={active.run}
                job={active.job}
                series={active.series}
                startedAt={active.startedAt}
                refresh={bench.refresh}
                height={180}
                ariaLabel={t("liveAria", {
                  backend: text.renderer(active.job.backend),
                  count: text.compact(active.job.count),
                })}
                onDone={bench.onDone}
              />
            ) : (
              <div className={styles.placeholder} style={{ height: 180 }}>
                {t("between")}
              </div>
            )}
          </div>
        )}
        {!running && results.length === 0 && (
          <div className={styles.placeholder}>{t("scalingIdle")}</div>
        )}
        {results.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            <LineChart
              series={curve((fps) => Math.round(fps))}
              renderer="canvas2d"
              xAxis={xAxis}
              yAxis={{ min: 0, title: t("fpsAxis") }}
              height={260}
              ariaLabel={t("scalingFpsAria", {
                workload: t(`workloads.${measured}`),
              })}
            />
            <LineChart
              series={curve((_, work) => Math.max(0.1, work))}
              renderer="canvas2d"
              xAxis={xAxis}
              yAxis={{
                type: "log",
                title: t("workAxis"),
                format: (value) => text.ms(value),
              }}
              height={260}
              ariaLabel={t("scalingWorkAria", {
                workload: t(`workloads.${measured}`),
              })}
            />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">
          {active
            ? t("scalingMeasuring", {
                backend: text.renderer(active.job.backend),
                count: text.compact(active.job.count),
                index: results.length + 1,
                total: planned,
              })
            : running
              ? t("preparing")
              : results.length
                ? t("scalingDone")
                : t("ready")}
        </p>
        <p className={styles.hint}>{t("scalingHint")}</p>
      </div>
    </div>
  );
}
