import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

const MONTHS = 24;
const month = (i: number) => new Date(2025, i, 1).getTime();

// Headcount per department at the start of every month of a growing company
const departments = [
  {
    key: "engineering",
    color: "var(--chart-series-1, #4f46e5)",
    start: 48,
    hires: 2.6,
  },
  {
    key: "sales",
    color: "var(--chart-series-2, #10b981)",
    start: 22,
    hires: 1.4,
  },
  {
    key: "support",
    color: "var(--chart-series-3, #f59e0b)",
    start: 14,
    hires: 0.9,
  },
  {
    key: "operations",
    color: "var(--chart-series-4, #ef4444)",
    start: 9,
    hires: 0.5,
  },
  {
    key: "admin",
    color: "var(--chart-series-5, #0ea5e9)",
    start: 7,
    hires: 0.25,
  },
] as const;
const headcount = departments.map(({ start, hires }, d) =>
  Array.from({ length: MONTHS }, (_, i) =>
    // hiring slows down during a freeze in the summer of 2025
    Math.round(start + hires * i - (i > 5 && i < 9 ? (i - 5) * hires : 0) + d),
  ),
);

interface Row {
  name: string;
  color: string;
  value: number;
}

export default function HoverPanelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  // the hovered month, `null` shows the latest one
  const [hovered, setHovered] = useState<ChartHoverEvent | null>(null);

  const series = useMemo(
    (): ChartSeries[] =>
      departments.map(({ key, color }, d) => ({
        name: t(`departments.${key}`),
        color,
        data: (headcount[d] ?? []).map(
          (value, i) => [month(i), value] as const,
        ),
      })),
    [t],
  );
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
      month: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
      }),
      tick: new Intl.DateTimeFormat(locale, {
        year: "2-digit",
        month: "short",
      }),
    }),
    [locale],
  );

  // the panel lists every department of the month, largest first
  const last = MONTHS - 1;
  const time = hovered?.x ?? month(last);
  const rows: Row[] = hovered
    ? hovered.items.map((item) => ({
        name: item.seriesName,
        color: item.color,
        value: item.y,
      }))
    : series.map((s, d) => ({
        name: s.name ?? "",
        color: s.color ?? "",
        value: headcount[d]?.[last] ?? 0,
      }));
  rows.sort((a, b) => b.value - a.value);
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        width: "100%",
      }}
    >
      <div style={{ flex: "1 1 420px", minWidth: 0 }}>
        <AreaChart
          series={series}
          stacked
          curve="step"
          tooltip={false}
          crosshair
          onHover={setHovered}
          xAxis={{ type: "time", format: (x) => formats.tick.format(x) }}
          legend={false}
          height={300}
          ariaLabel={t("headcountAria")}
        />
      </div>
      <section
        aria-label={t("headcountPanel")}
        style={{
          display: "grid",
          alignContent: "start",
          gap: 8,
          flex: "0 1 240px",
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
            {formats.month.format(time)}
          </div>
          <strong style={{ fontSize: 22 }}>
            {t("employees", { value: formats.number.format(total) })}
          </strong>
        </div>
        {rows.map((row) => (
          <div
            key={row.name}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: row.color,
              }}
            />
            <span>{row.name}</span>
            <strong>{formats.number.format(row.value)}</strong>
            <span style={{ color: "var(--text-secondary-color)" }}>
              {formats.percent.format(row.value / total)}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
