import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Table,
  type TableColumn,
} from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";
import { probeBackends, type BackendsSupport } from "../../../renderer/support";
import { fpsClass, scoreClass, useBenchFormat } from "../bench/format";
import { useBenchQueue } from "../bench/queue";
import { BACKENDS, WEIGHTS, gradeOf, type BenchResult } from "../bench/score";
import { BenchStage } from "../bench/stage";
import { COUNTS, WORKLOADS, type Workload } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const DURATIONS = [2000, 3000, 5000];
const PARTS = ["smooth", "stability", "headroom", "startup"] as const;

export default function BenchmarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [workload, setWorkload] = useState<Workload>("line");
  const [count, setCount] = useState(1_000_000);
  const [duration, setDuration] = useState(3000);
  const [software, setSoftware] = useState(false);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const bench = useBenchQueue((kind, index) => t(`series.${kind}`, { index }));
  const { active, results, refresh, running, planned } = bench;

  const run = async () => {
    const support: BackendsSupport = await probeBackends();
    const skip = software
      ? []
      : BACKENDS.filter((kind) => support[kind] === "software");
    setSkipped(skip.map(text.renderer));
    setCopied(false);
    void bench.start(
      BACKENDS.filter((kind) => !skip.includes(kind)).map((backend) => ({
        backend,
        workload,
        count,
        duration,
      })),
    );
  };

  const name = (result: BenchResult) =>
    result.drawn && result.drawn !== result.job.backend
      ? t("fellBack", {
          requested: text.renderer(result.job.backend),
          backend: text.renderer(result.drawn),
        })
      : text.renderer(result.job.backend);

  const best = results.reduce<BenchResult | null>(
    (top, result) =>
      !top || result.score.total > top.score.total ? result : top,
    null,
  );
  const canvas = results.find(
    (result) => result.job.backend === "canvas2d" && result.status === "ok",
  );

  const columns: TableColumn<BenchResult>[] = [
    { key: "backend", header: t("col.backend"), render: (r) => name(r) },
    {
      key: "score",
      header: t("col.score"),
      align: "right",
      render: (r) => (
        <span className={`${styles.mono} ${scoreClass(r.score.total)}`}>
          {r.score.total}
        </span>
      ),
    },
    {
      key: "fps",
      header: t("col.fps"),
      align: "right",
      render: (r) => (
        <span className={`${styles.mono} ${fpsClass(r.fps)}`}>
          {text.count(r.fps)}
        </span>
      ),
    },
    {
      key: "p50",
      header: t("col.p50"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.p50)}</span>,
    },
    {
      key: "p95",
      header: t("col.p95"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.p95)}</span>,
    },
    {
      key: "work",
      header: t("col.work"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.work)}</span>,
    },
    {
      key: "startup",
      header: t("col.startup"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.startup)}</span>,
    },
    {
      key: "status",
      header: t("col.status"),
      render: (r) => t(`status.${r.status}`),
    },
  ];

  // the score of each backend, split into its weighted parts
  const breakdown: ChartSeries[] = PARTS.map((part) => ({
    name: t(`parts.${part}`, { weight: WEIGHTS[part] * 100 }),
    data: results.map(
      (r) =>
        [
          name(r),
          Math.round(r.score[part] * WEIGHTS[part] * 1000) / 10,
        ] as const,
    ),
  }));

  const copy = () => {
    const header = `| ${columns.map((c) => c.header).join(" | ")} |`;
    const rule = `|${columns.map(() => " --- |").join("")}`;
    const lines = results.map(
      (r) =>
        `| ${name(r)} | ${r.score.total} | ${text.count(r.fps)} | ${text.ms(r.p50)} | ${text.ms(r.p95)} | ${text.ms(r.work)} | ${text.ms(r.startup)} | ${t(`status.${r.status}`)} |`,
    );
    const title = t("copyTitle", {
      workload: t(`workloads.${workload}`),
      count: text.compact(count),
      refresh,
    });
    void navigator.clipboard
      ?.writeText([title, "", header, rule, ...lines].join("\n"))
      .then(() => setCopied(true));
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
          onChange={(value) => {
            const next = value as Workload;
            setWorkload(next);
            setCount(COUNTS[next][2] ?? COUNTS[next][0]!);
          }}
        >
          {WORKLOADS.map((kind) => (
            <Radio key={kind} value={kind} label={t(`workloads.${kind}`)} />
          ))}
        </RadioGroup>
        <Select
          size="small"
          style={{ width: 150 }}
          aria-label={t("points")}
          value={String(count)}
          disabled={running}
          onChange={(value) => setCount(Number(value))}
        >
          {COUNTS[workload].map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("pointsValue", { value: text.compact(value) })}
            </SelectItem>
          ))}
        </Select>
        <Select
          size="small"
          style={{ width: 120 }}
          aria-label={t("duration")}
          value={String(duration)}
          disabled={running}
          onChange={(value) => setDuration(Number(value))}
        >
          {DURATIONS.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("seconds", { value: value / 1000 })}
            </SelectItem>
          ))}
        </Select>
        <Switch
          size="small"
          checked={software}
          disabled={running}
          onChange={setSoftware}
          label={t("includeSoftware")}
        />
        <span className={styles.spacer} />
        {running ? (
          <Button size="small" variant="outline" onClick={bench.stop}>
            {t("stop")}
          </Button>
        ) : (
          <Button size="small" onClick={() => void run()}>
            {t("runAll")}
          </Button>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.live}>
          {active ? (
            <BenchStage
              key={active.run}
              job={active.job}
              series={active.series}
              startedAt={active.startedAt}
              refresh={refresh}
              height={260}
              ariaLabel={t("liveAria", {
                backend: text.renderer(active.job.backend),
                count: text.compact(active.job.count),
              })}
              onDone={bench.onDone}
            />
          ) : (
            <div className={styles.placeholder}>
              {running
                ? t("between")
                : results.length
                  ? t("doneHint")
                  : t("idle")}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <>
            <dl className={styles.cards}>
              {results.map((r) => (
                <div
                  key={r.job.backend}
                  className={`${styles.card} ${!running && r === best ? styles.cardBest : ""}`}
                >
                  <dt>{name(r)}</dt>
                  <dd className={scoreClass(r.score.total)}>
                    {t("scoreValue", { value: r.score.total })}
                  </dd>
                  <small>
                    {t(`grades.${gradeOf(r.score.total)}`)}
                    {canvas && r !== canvas && r.work > 0
                      ? ` · ${t("vsCanvas", { value: text.percent(r.work / canvas.work) })}`
                      : ""}
                  </small>
                </div>
              ))}
            </dl>
            <Table
              aria-label={t("tableAria")}
              size="small"
              columns={columns}
              data={results}
              rowKey={(r) => r.job.backend}
            />
            {!running && (
              <HorizontalBarChart
                series={breakdown}
                stacked
                renderer="canvas2d"
                yAxis={{ min: 0, max: 100 }}
                height={60 + results.length * 44}
                ariaLabel={t("breakdownAria")}
              />
            )}
          </>
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">
          {active
            ? t("measuring", {
                backend: text.renderer(active.job.backend),
                index: results.length + 1,
                total: planned,
              })
            : running
              ? t("preparing")
              : results.length
                ? copied
                  ? t("copied")
                  : t("done")
                : t("ready")}
          {skipped.length > 0 &&
            ` ${t("skippedNote", { backends: skipped.join(", ") })}`}
        </p>
        <p className={styles.hint}>
          {t("refreshNote", {
            value: refresh,
            budget: text.decimal(1000 / refresh),
          })}
        </p>
        {!running && results.length > 0 && (
          <Button size="xsmall" variant="outline" onClick={copy}>
            {t("copy")}
          </Button>
        )}
      </div>
    </div>
  );
}
