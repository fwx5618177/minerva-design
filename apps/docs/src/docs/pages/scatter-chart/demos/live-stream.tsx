import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WINDOW = 160; // samples kept on screen
const LIMIT = 7.1; // mm/s, the alarm limit of the vibration velocity

/**
 * Sample number `tick` of a motor's sensor: speed (rpm) and vibration (mm/s).
 * Derived from the tick alone, so the stream is deterministic.
 */
const sampleAt = (tick: number) => {
  const random = mulberry32(tick * 7919);
  const rpm = 2100 + 800 * Math.sin(tick / 23) + (random() - 0.5) * 300;
  // a worn bearing: bursts of strong vibration every 90 samples
  const fault = tick % 90 > 80 ? 4 + random() * 3 : 0;
  const vibration = 0.8 + (rpm / 1000) * 1.4 + (random() - 0.5) * 1.6 + fault;
  return { rpm: Math.round(rpm), vibration: Math.round(vibration * 100) / 100 };
};

export default function LiveStreamDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(WINDOW);
  const [running, setRunning] = useState(true);

  // a new sample every 400 ms, the oldest one drops out
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 400);
    return () => clearInterval(timer);
  }, [running]);

  const samples = useMemo(
    () => Array.from({ length: WINDOW }, (_, i) => sampleAt(tick - WINDOW + i)),
    [tick],
  );
  const latest = samples[samples.length - 1];
  const alarms = samples.filter((s) => s.vibration > LIMIT).length;

  const series = useMemo((): ChartSeries[] => {
    const point = (s: { rpm: number; vibration: number }) =>
      [s.rpm, s.vibration] as const;
    return [
      {
        name: t("normal"),
        data: samples.filter((s) => s.vibration <= LIMIT).map(point),
        pointSize: 6,
        opacity: 0.55,
      },
      {
        name: t("alarm"),
        data: samples.filter((s) => s.vibration > LIMIT).map(point),
        color: "var(--danger-color)",
        pointSize: 8,
      },
      {
        // the newest sample, ringed by a bigger dot
        name: t("latest"),
        data: latest ? [point(latest)] : [],
        color: "var(--text-color)",
        pointSize: 12,
        opacity: 0.35,
      },
    ];
  }, [t, samples, latest]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const velocity = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("mmPerSecond", { value: format.format(value) });
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {latest &&
            t("vibrationStatus", {
              rpm: number.format(latest.rpm),
              value: velocity(latest.vibration),
              alarms: number.format(alarms),
            })}
        </output>
      </div>
      <ScatterChart
        series={series}
        // fixed ranges: the axes do not jump while the data streams in
        xAxis={{
          title: t("speed"),
          min: 1000,
          max: 3200,
          format: (value) => number.format(value),
        }}
        yAxis={{ title: t("vibration"), min: 0, max: 14, format: velocity }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: LIMIT,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("alarmLimit"),
          },
        ]}
        height={320}
        ariaLabel={t("vibrationAria")}
      />
    </div>
  );
}
