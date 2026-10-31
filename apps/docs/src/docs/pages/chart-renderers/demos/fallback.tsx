import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import { Chart, type ChartRendererKind } from "minerva-design/charts";
import { useBenchFormat } from "../bench/format";
import { BACKENDS } from "../bench/score";
import { makeSeries } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const POINTS = 100_000;

interface Entry {
  id: number;
  text: string;
}

interface ConfiguredContext {
  getConfiguration?: () => { device?: { destroy(): void } } | null;
}

/**
 * Loses the GPU of the chart's data canvas the way a driver reset would:
 * WEBGL_lose_context for WebGL, destroying the device for WebGPU
 */
const loseGpu = (root: HTMLElement | null, kind: ChartRendererKind) => {
  const canvas = root?.querySelector<HTMLCanvasElement>(
    "canvas.minerva-chart-data",
  );
  if (!canvas) return false;
  if (kind === "webgpu") {
    // returns the context the chart configured (getConfiguration: recent browsers)
    const context = canvas.getContext("webgpu") as ConfiguredContext | null;
    const device = context?.getConfiguration?.()?.device;
    if (!device) return false;
    device.destroy();
    return true;
  }
  if (kind === "webgl2" || kind === "webgl") {
    const gl = canvas.getContext(kind) as WebGLRenderingContext | null;
    const ext = gl?.getExtension("WEBGL_lose_context");
    if (!ext) return false;
    ext.loseContext();
    return true;
  }
  return false;
};

export default function FallbackDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const [drawn, setDrawn] = useState<ChartRendererKind | null>(null);
  const [lost, setLost] = useState<ChartRendererKind[]>([]);
  const [log, setLog] = useState<Entry[]>([]);
  const [blocked, setBlocked] = useState(false);
  const lostAt = useRef(0);

  const series = useMemo(
    () => makeSeries("line", POINTS, (index) => t("series.line", { index })),
    [t],
  );

  const add = (line: string) =>
    setLog((previous) =>
      [{ id: (previous[0]?.id ?? 0) + 1, text: line }, ...previous].slice(0, 8),
    );

  const lose = () => {
    if (!drawn || drawn === "canvas2d") return;
    lostAt.current = performance.now();
    if (!loseGpu(rootRef.current, drawn)) {
      setBlocked(true);
      return;
    }
    setLost((previous) => [...previous, drawn]);
    add(t("lostEntry", { backend: text.renderer(drawn) }));
  };

  const restart = () => {
    setRun((value) => value + 1);
    setDrawn(null);
    setLost([]);
    setLog([]);
    setBlocked(false);
  };

  return (
    <div className={styles.stage} ref={rootRef}>
      <div className={styles.toolbar}>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {BACKENDS.map((kind) => (
            <Tag
              key={kind}
              size="small"
              color={
                kind === drawn
                  ? "success"
                  : lost.includes(kind)
                    ? "danger"
                    : "neutral"
              }
              variant={kind === drawn ? "solid" : "subtle"}
            >
              {lost.includes(kind)
                ? t("chainLost", { backend: text.renderer(kind) })
                : text.renderer(kind)}
            </Tag>
          ))}
        </span>
        <span className={styles.spacer} />
        <Button
          size="small"
          disabled={!drawn || drawn === "canvas2d"}
          onClick={lose}
        >
          {t("loseGpu")}
        </Button>
        <Button size="small" variant="outline" onClick={restart}>
          {t("restart")}
        </Button>
      </div>
      <div className={styles.body}>
        <Chart
          key={run}
          series={series}
          // forced: the chain starts at WebGPU and only moves down
          renderer="webgpu"
          onRendererChange={(kind) => {
            setDrawn(kind);
            add(
              lostAt.current
                ? t("fallbackEntry", {
                    backend: text.renderer(kind),
                    ms: text.ms(performance.now() - lostAt.current),
                  })
                : t("startEntry", { backend: text.renderer(kind) }),
            );
            lostAt.current = 0;
          }}
          legend={false}
          xAxis={{ type: "time" }}
          height={240}
          ariaLabel={t("fallbackAria", { count: text.compact(POINTS) })}
        />
        <ol className={styles.log} aria-label={t("fallbackLog")}>
          {log.map((entry) => (
            <li key={entry.id}>{entry.text}</li>
          ))}
        </ol>
      </div>
      <div className={styles.footer}>
        <p role="status">
          {blocked
            ? t("cannotLose", { backend: drawn ? text.renderer(drawn) : "" })
            : drawn === "canvas2d"
              ? t("chainEnd")
              : drawn
                ? t("fallbackStatus", { backend: text.renderer(drawn) })
                : t("starting")}
        </p>
        <p className={styles.hint}>{t("fallbackHint")}</p>
      </div>
    </div>
  );
}
