import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  AreaChart,
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

const DAY = 24 * 60 * 60 * 1000;
const HISTORY = 60;
const HORIZON = 120; // days of forecast at most
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 8, 1).getTime();
const TODAY = START + (HISTORY - 1) * DAY;

// Disk usage (GB) of three volumes over the last 60 days
const volumes = {
  database: { capacity: 500, start: 310, growth: 2.1, seed: 1 },
  logs: { capacity: 200, start: 120, growth: 0.6, seed: 2 },
  uploads: { capacity: 1000, start: 420, growth: 1.2, seed: 3 },
} as const;
type Volume = keyof typeof volumes;

const usage = (key: Volume) => {
  const { start, growth, seed } = volumes[key];
  const random = mulberry32(seed);
  return Array.from({ length: HISTORY }, (_, i) => {
    // logs are rotated every week: a sawtooth on top of the trend
    const rotation = key === "logs" ? ((i % 7) - 3) * 4 : 0;
    const value = start + growth * i + rotation + (random() - 0.5) * 6;
    return Math.round(value * 10) / 10;
  });
};

/** Least-squares line through the last 30 days */
const trend = (values: number[]) => {
  const recent = values.slice(-30);
  const n = recent.length;
  const mx = (n - 1) / 2;
  const my = recent.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  recent.forEach((y, i) => {
    num += (i - mx) * (y - my);
    den += (i - mx) ** 2;
  });
  const slope = num / den;
  // value of the line today (the last day)
  return { slope, today: my + slope * (n - 1 - mx) };
};

export default function DiskForecastDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  const [volume, setVolume] = useState<Volume>("database");
  const { capacity } = volumes[volume];

  const model = useMemo(() => {
    const used = usage(volume);
    const { slope, today } = trend(used);
    const daysLeft = slope > 0 ? (capacity - today) / slope : Infinity;
    const days = Math.min(HORIZON, Math.ceil(daysLeft));
    const forecast = Array.from({ length: days + 1 }, (_, k) => {
      const value = Math.min(capacity, today + slope * k);
      return [TODAY + k * DAY, Math.round(value * 10) / 10] as const;
    });
    return { used, forecast, daysLeft };
  }, [volume, capacity]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("diskUsed"),
        data: model.used.map((value, i) => [START + i * DAY, value] as const),
      },
      {
        name: t("diskForecast"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        data: model.forecast,
      },
    ],
    [t, model],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    return {
      gb: (value: number) => t("gb", { value: number.format(value) }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
      long: new Intl.DateTimeFormat(locale, { dateStyle: "long" }),
    };
  }, [t, locale]);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: TODAY,
        color: "var(--text-secondary-color)",
        opacity: 0.05,
      },
      {
        type: "line",
        axis: "y",
        value: capacity,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("capacity", { value: formats.gb(capacity) }),
      },
    ],
    [t, capacity, formats],
  );

  const full = model.daysLeft <= HORIZON;
  const fullDate = TODAY + Math.ceil(model.daysLeft) * DAY;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Select
          size="small"
          style={{ width: 200 }}
          aria-label={t("volume")}
          value={volume}
          onChange={(value) => setVolume(value as Volume)}
        >
          {(Object.keys(volumes) as Volume[]).map((key) => (
            <SelectItem key={key} value={key}>
              {t(`volumes.${key}`)}
            </SelectItem>
          ))}
        </Select>
        <output
          aria-live="polite"
          style={{ color: full ? "var(--danger-color)" : undefined }}
        >
          {full
            ? t("fullIn", {
                days: formats.days.format(Math.ceil(model.daysLeft)),
                date: formats.long.format(fullDate),
              })
            : t("notFull", { days: formats.days.format(HORIZON) })}
        </output>
      </div>
      <AreaChart
        series={series}
        curve="linear"
        annotations={annotations}
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ zero: true, max: capacity * 1.1, format: formats.gb }}
        height={300}
        ariaLabel={t("diskAria")}
      />
    </div>
  );
}
