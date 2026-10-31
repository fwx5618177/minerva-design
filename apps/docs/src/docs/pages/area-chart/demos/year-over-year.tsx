import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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

const DAYS = 61; // November and December
const day = (i: number) => new Date(2026, 10, 1 + i).getTime();
const LAST_SHIPPING = 47; // December 18

/**
 * Daily orders of an online shop during the holiday season: Black Friday
 * and Cyber Monday spikes, then a drop after the last shipping day
 */
const season = (seed: number, scale: number, blackFriday: number) => {
  const random = mulberry32(seed);
  return Array.from({ length: DAYS }, (_, i) => {
    const spike = (at: number, height: number) =>
      height * Math.exp(-Math.abs(i - at) / 1.2);
    const lift =
      1 + i / 90 + spike(blackFriday, 2.4) + spike(blackFriday + 3, 1.5);
    const after = i > LAST_SHIPPING ? 0.45 : 1;
    const noise = 0.92 + random() * 0.16;
    return Math.round(1800 * scale * lift * after * noise);
  });
};
// both years on the same calendar days: Black Friday moves by one day
const thisYear = season(26, 1.14, 26);
const lastYear = season(25, 1, 27);
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

export default function YearOverYearDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("lastYear"),
        color: "var(--text-secondary-color)",
        opacity: 0.15,
        lineWidth: 1,
        data: lastYear.map((value, i) => [day(i), value] as const),
      },
      {
        name: t("thisYear"),
        opacity: 0.3,
        data: thisYear.map((value, i) => [day(i), value] as const),
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "text",
        x: day(26),
        y: thisYear[26],
        text: t("blackFriday"),
        anchor: "right",
        color: "var(--text-color)",
      },
      {
        type: "text",
        x: day(29),
        y: thisYear[29],
        text: t("cyberMonday"),
        anchor: "left",
        color: "var(--text-color)",
      },
      {
        type: "line",
        axis: "x",
        value: day(LAST_SHIPPING),
        dash: [4, 4],
        color: "var(--danger-color)",
        label: t("lastShipping"),
      },
    ],
    [t],
  );
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      compact: new Intl.NumberFormat(locale, { notation: "compact" }),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );
  const total = sum(thisYear);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <AreaChart
        series={series}
        annotations={annotations}
        curve="linear"
        crosshair
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: (y) => formats.compact.format(y) }}
        height={320}
        ariaLabel={t("seasonAria")}
      />
      <p style={{ margin: 0 }}>
        {t("seasonSummary", {
          total: formats.number.format(total),
          change: formats.change.format(total / sum(lastYear) - 1),
        })}
      </p>
    </div>
  );
}
