import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HorizontalBarChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Availability target (SLO) and measured availability of each service over
// the last 30 days; service names are identifiers and stay untranslated
const services = [
  { name: "checkout-api", slo: 0.999, availability: 0.99962 },
  { name: "auth", slo: 0.9995, availability: 0.99971 },
  { name: "search", slo: 0.995, availability: 0.99712 },
  { name: "payments", slo: 0.9999, availability: 0.99984 },
  { name: "notifications", slo: 0.99, availability: 0.99581 },
  { name: "inventory", slo: 0.999, availability: 0.99915 },
  { name: "recommendations", slo: 0.99, availability: 0.98874 },
  { name: "media-cdn", slo: 0.9995, availability: 0.99988 },
] as const;
const WINDOW_MINUTES = 30 * 24 * 60;
const FREEZE = 20; // below this share of budget left, releases are frozen

// share of the allowed downtime that is still left (negative: overspent)
const budgetLeft = (s: (typeof services)[number]) =>
  (1 - (1 - s.availability) / (1 - s.slo)) * 100;
const rows = services
  .map((service) => ({ ...service, left: budgetLeft(service) }))
  .sort((a, b) => a.left - b.left);

export default function ErrorBudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const formats = useMemo(
    () => ({
      percent: (value: number) =>
        new Intl.NumberFormat(locale, {
          style: "percent",
          maximumFractionDigits: 0,
        }).format(value / 100),
      precise: new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }),
      minutes: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "minute",
        unitDisplay: "long",
        maximumFractionDigits: 0,
      }),
    }),
    [locale],
  );

  // worst first; the color follows the remaining budget
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("budgetLeft"),
        data: rows.map((row) => ({
          x: row.name,
          y: row.left,
          color:
            row.left < 0
              ? "var(--danger-color)"
              : row.left < FREEZE
                ? "var(--warning-color)"
                : "var(--success-color)",
        })),
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: FREEZE,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("releaseFreeze"),
      },
    ],
    [t],
  );

  const onPointClick = (event: ChartHoverEvent) => {
    const index = event.items[0]?.index;
    if (index !== undefined) setSelected(index);
  };

  const row = selected === null ? undefined : rows[selected];
  const allowed = row ? (1 - row.slo) * WINDOW_MINUTES : 0;
  const used = row ? (1 - row.availability) * WINDOW_MINUTES : 0;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setSelected(null)}
        yAxis={{ format: formats.percent }}
        height={320}
        ariaLabel={t("budgetAriaSlo")}
      />
      <output aria-live="polite" style={{ minHeight: "3em" }}>
        {row ? (
          <>
            <strong>{row.name}</strong>
            {" · "}
            {t("budgetDetails", {
              slo: formats.precise.format(row.slo),
              availability: formats.precise.format(row.availability),
            })}
            <br />
            <span
              style={{
                color:
                  allowed - used < 0
                    ? "var(--danger-color)"
                    : "var(--text-secondary-color)",
              }}
            >
              {allowed - used < 0
                ? t("budgetOverspent", {
                    minutes: formats.minutes.format(used - allowed),
                  })
                : t("budgetMinutesLeft", {
                    minutes: formats.minutes.format(allowed - used),
                    allowed: formats.minutes.format(allowed),
                  })}
            </span>
          </>
        ) : (
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("clickService")}
          </span>
        )}
      </output>
    </div>
  );
}
