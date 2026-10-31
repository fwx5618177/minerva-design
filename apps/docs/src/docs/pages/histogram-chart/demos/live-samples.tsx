import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { HistogramChart, quantiles } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WINDOW = 600; // calls kept in the histogram
const PER_TICK = 12; // calls answered every tick
const TARGET = 5; // minutes, the service level target

/**
 * Wait (minutes) of the call number `n` of a support line: exponential, its
 * mean rising and falling with the waves of callers. Derived from `n` alone,
 * so the stream is deterministic.
 */
const waitOf = (n: number) => {
  const random = mulberry32(n * 7919 + 1);
  const mean = 3.5 + 1.5 * Math.sin(n / 400);
  return -mean * Math.log(1 - random());
};

export default function LiveSamplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  // 12 new calls every 500 ms, the oldest ones leave the window
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 500);
    return () => clearInterval(timer);
  }, [running]);

  // the last WINDOW calls
  const waits = useMemo(() => {
    const last = WINDOW + tick * PER_TICK;
    const values = new Float64Array(WINDOW);
    for (let i = 0; i < WINDOW; i++) values[i] = waitOf(last - WINDOW + i);
    return values;
  }, [tick]);
  const [p90 = 0] = useMemo(() => quantiles(waits, [0.9]), [waits]);
  const withinTarget =
    waits.reduce((n, value) => n + (value <= TARGET ? 1 : 0), 0) / WINDOW;

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const met = withinTarget >= 0.8;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={() => setTick(0)}>
          {t("reset")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("serviceLevel", {
            share: percent.format(withinTarget),
            target: minutes(TARGET),
            p90: minutes(p90),
          })}{" "}
          <strong
            style={{
              color: met ? "var(--success-color)" : "var(--danger-color)",
            }}
          >
            {met ? t("targetMet") : t("targetMissed")}
          </strong>
        </output>
      </div>
      <HistogramChart
        values={waits}
        // fixed bins and y range: the bars move, the axes stay still
        domain={[0, 20]}
        bins={40}
        nice={false}
        name={t("calls")}
        formatBin={minutes}
        xAxis={{ title: t("waitTime"), format: minutes }}
        yAxis={{ min: 0, max: 160 }}
        annotations={[
          {
            type: "line",
            axis: "x",
            value: TARGET,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("target"),
          },
          {
            type: "line",
            axis: "x",
            value: p90,
            color: "var(--warning-color)",
            label: t("p90"),
          },
        ]}
        height={300}
        ariaLabel={t("callsAria")}
      />
    </div>
  );
}
