import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartRendererKind,
  type ChartRendererPreference,
} from "minerva-design/charts";
import { useBenchFormat } from "../bench/format";
import { makeSeries } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const PREFERENCES: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
const POINTS = 200_000;

interface Entry {
  id: number;
  requested: ChartRendererPreference;
  drawn: ChartRendererKind;
  ms: number;
}

export default function SwitchingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [preference, setPreference] = useState<ChartRendererPreference>("auto");
  const [drawn, setDrawn] = useState<ChartRendererKind | null>(null);
  const [log, setLog] = useState<Entry[]>([]);
  // when the current preference was asked for (performance.now())
  const asked = useRef<{ requested: ChartRendererPreference; at: number }>({
    requested: "auto",
    at: 0,
  });

  const series = useMemo(
    () => makeSeries("line", POINTS, (index) => t("series.line", { index })),
    [t],
  );
  // the first backend is timed from the mount (renderers start asynchronously)
  useEffect(() => {
    asked.current.at = performance.now();
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("preference")}
          direction="horizontal"
          size="small"
          value={preference}
          onChange={(value) => {
            const next = value as ChartRendererPreference;
            asked.current = { requested: next, at: performance.now() };
            setPreference(next);
          }}
        >
          {PREFERENCES.map((kind) => (
            <Radio key={kind} value={kind} label={text.renderer(kind)} />
          ))}
        </RadioGroup>
      </div>
      <div className={styles.body}>
        <Chart
          series={series}
          renderer={preference}
          onRendererChange={(kind) => {
            const { requested, at } = asked.current;
            setDrawn(kind);
            setLog((previous) =>
              [
                {
                  id: (previous[0]?.id ?? 0) + 1,
                  requested,
                  drawn: kind,
                  ms: performance.now() - at,
                },
                ...previous,
              ].slice(0, 8),
            );
          }}
          legend={false}
          xAxis={{ type: "time" }}
          height={240}
          ariaLabel={t("switchAria", { count: text.compact(POINTS) })}
        />
        <ol className={styles.log} aria-label={t("switchLog")}>
          {log.map((entry) => (
            <li key={entry.id}>
              {entry.requested === entry.drawn
                ? t("switchEntry", {
                    backend: text.renderer(entry.drawn),
                    ms: text.ms(entry.ms),
                  })
                : t("switchEntryOther", {
                    requested: text.renderer(entry.requested),
                    backend: text.renderer(entry.drawn),
                    ms: text.ms(entry.ms),
                  })}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.footer}>
        <p role="status">
          {drawn
            ? t("switchStatus", { backend: text.renderer(drawn) })
            : t("starting")}
        </p>
        <p className={styles.hint}>{t("switchHint")}</p>
      </div>
    </div>
  );
}
