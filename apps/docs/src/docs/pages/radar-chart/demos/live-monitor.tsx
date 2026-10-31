import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

/** Small seeded random generator: the same "load" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Load of a service, in percent of its capacity (latency and errors: of
// their objective); the baseline is the average of the last hour
const METRICS = ["cpu", "memory", "diskIo", "network", "latency", "errors"];
const BASELINE = [46, 58, 32, 41, 38, 22];
const ALERT = 85;

export default function LiveMonitorDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const [live, setLive] = useState(true);
  const [current, setCurrent] = useState(BASELINE);
  const random = useRef(mulberry32(11));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // a random walk per metric that drifts back toward its baseline
      const steps = METRICS.map(() => (random.current() - 0.45) * 18);
      setCurrent((values) =>
        values.map((value, i) =>
          Math.min(
            100,
            Math.max(0, value + steps[i] + (BASELINE[i] - value) * 0.15),
          ),
        ),
      );
    }, 1500);
    return () => window.clearInterval(timer);
  }, [live]);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      METRICS.map((key) => ({ name: t(`monitor.metrics.${key}`), max: 100 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("monitor.baseline"),
        values: BASELINE,
        color: "var(--text-secondary-color)",
        opacity: 0.04,
      },
      {
        name: t("monitor.now"),
        values: current,
        color:
          Math.max(...current) >= ALERT
            ? "var(--danger-color)"
            : "var(--primary-color)",
        opacity: 0.22,
      },
    ],
    [current, t],
  );
  const format = useMemo(() => {
    const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
    return (value: number) => percent.format(value / 100);
  }, [i18n.language]);

  const peak = current.indexOf(Math.max(...current));
  const alert = current[peak] >= ALERT;
  // no value in the message: it is announced when the busiest metric or
  // the alert state changes, not on every tick
  const status = alert
    ? t("monitor.alert", {
        metric: indicators[peak].name,
        threshold: format(ALERT),
      })
    : t("monitor.peak", { metric: indicators[peak].name });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("monitor.live")} />
      <RadarChart
        indicators={indicators}
        series={series}
        levels={4}
        format={format}
        height={360}
        ariaLabel={t("monitor.aria")}
      />
      <output
        aria-live="polite"
        style={{ color: alert ? "var(--danger-color)" : undefined }}
      >
        {status}
      </output>
    </div>
  );
}
