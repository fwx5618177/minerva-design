import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

/** Small seeded random generator: the same readings on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Sensors of a server room: the setpoint (target), the warning and critical
// thresholds, and how much a reading can move per tick
const SENSORS: {
  key: string;
  setpoint: number;
  warning: number;
  critical: number;
  max: number;
  step: number;
}[] = [
  { key: "inlet", setpoint: 22, warning: 27, critical: 32, max: 40, step: 1.6 },
  {
    key: "humidity",
    setpoint: 45,
    warning: 60,
    critical: 70,
    max: 100,
    step: 4,
  },
  { key: "power", setpoint: 6, warning: 8, critical: 9.5, max: 12, step: 0.7 },
  { key: "fans", setpoint: 50, warning: 80, critical: 95, max: 100, step: 7 },
];
const SEED = 11;
const START = [24.5, 52, 7.1, 62];
const STATUS_COLORS = {
  ok: "var(--success-color)",
  warning: "#f59e0b",
  critical: "var(--danger-color)",
};

type Status = keyof typeof STATUS_COLORS;
const statusOf = (value: number, sensor: (typeof SENSORS)[number]): Status =>
  value >= sensor.critical
    ? "critical"
    : value >= sensor.warning
      ? "warning"
      : "ok";

export default function LiveSensorsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [readings, setReadings] = useState(START);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // a random walk with a slight upward drift, pulled back to the setpoint
      const moves = SENSORS.map(
        (sensor) => (random.current() - 0.42) * 2 * sensor.step,
      );
      setReadings((current) =>
        current.map((value, i) => {
          const sensor = SENSORS[i];
          const next = value + moves[i] + (sensor.setpoint - value) * 0.08;
          return Math.min(sensor.max, Math.max(0, next));
        }),
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, [live]);

  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const statuses = readings.map((value, i) => statusOf(value, SENSORS[i]));
  const data = useMemo(
    (): BulletDatum[] =>
      SENSORS.map((sensor, i) => ({
        name: t(`sensors.names.${sensor.key}`),
        subtitle: t(`sensors.units.${sensor.key}`),
        value: readings[i],
        target: sensor.setpoint,
        ranges: [sensor.warning, sensor.critical, sensor.max],
        max: sensor.max,
        color: STATUS_COLORS[statusOf(readings[i], sensor)],
      })),
    [readings, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("sensors.status.ok"),
      t("sensors.status.warning"),
      t("sensors.status.critical"),
    ],
    [t],
  );
  const alerts = SENSORS.filter((_, i) => statuses[i] !== "ok").map((sensor) =>
    t(`sensors.names.${sensor.key}`),
  );
  const list = new Intl.ListFormat(locale, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("sensors.live")} />
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        animation={false}
        format={(value) => number.format(value)}
        height={300}
        ariaLabel={t("sensors.aria")}
      />
      {/* only the set of sensors out of range is announced */}
      <output aria-live="polite">
        {alerts.length
          ? t("sensors.alerts", { sensors: list.format(alerts) })
          : t("sensors.allOk")}
      </output>
    </div>
  );
}
