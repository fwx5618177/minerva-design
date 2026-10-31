import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SECOND = 1000;
const WINDOW = 60; // one minute of readings
const ALARM = -15; // °C

/** Freezer temperature of reading `i`: sensor noise and a door opened every 45 s */
const reading = (i: number) => {
  const phase = i % 45;
  const door = phase < 12 ? 5.6 * Math.sin((phase / 12) * Math.PI) : 0;
  const noise = (mulberry32(i * 7919)() - 0.5) * 0.6;
  return Math.round((-18.6 + 0.4 * Math.sin(i / 7) + door + noise) * 10) / 10;
};

type Point = readonly [number, number];

/** The last minute of readings, ending now */
const initial = () => {
  const now = Math.floor(Date.now() / SECOND) * SECOND;
  const points: Point[] = Array.from({ length: WINDOW }, (_, i) => [
    now - (WINDOW - 1 - i) * SECOND,
    reading(i + 20),
  ]);
  return { tick: WINDOW + 20, points };
};

export default function LiveSensorDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [running, setRunning] = useState(true);
  const [feed, setFeed] = useState(initial);

  // one reading a second; the oldest one leaves the window
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setFeed(({ tick, points }) => {
        const last = points[points.length - 1]?.[0] ?? Date.now();
        return {
          tick: tick + 1,
          points: [...points.slice(1), [last + SECOND, reading(tick)]],
        };
      });
    }, SECOND);
    return () => clearInterval(timer);
  }, [running]);

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("freezer"), data: feed.points }],
    [t, feed.points],
  );
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: ALARM,
        color: "var(--danger-color)",
        opacity: 0.08,
      },
      {
        type: "line",
        axis: "y",
        value: ALARM,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("alarmLimit", { value: celsius.format(ALARM) }),
      },
    ],
    [t, celsius],
  );

  const [lastTime, lastValue] = feed.points[feed.points.length - 1] ?? [0, 0];
  const above = feed.points.filter(([, value]) => value > ALARM).length;
  const alarm = lastValue > ALARM;

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        {/* only the state is announced, not every reading */}
        <output aria-live="polite">
          <Tag color={alarm ? "danger" : "success"} size="small">
            {alarm ? t("sensorAlarm") : t("sensorNormal")}
          </Tag>
        </output>
        <span style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
          {t("lastReading", {
            value: celsius.format(lastValue),
            time: time.format(lastTime),
          })}
          {" · "}
          {t("aboveLimit", { readings: above })}
        </span>
      </div>
      <LineChart
        series={series}
        annotations={annotations}
        curve="smooth"
        xAxis={{ type: "time", format: (value) => time.format(value) }}
        yAxis={{ min: -22, max: -10, format: (value) => celsius.format(value) }}
        legend={false}
        height={280}
        ariaLabel={t("freezerAria")}
      />
    </div>
  );
}
