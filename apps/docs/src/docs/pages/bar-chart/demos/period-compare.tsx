import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Hires per department, last year and this year
const hires = {
  engineering: [64, 81],
  product: [12, 15],
  design: [9, 7],
  sales: [38, 52],
  marketing: [17, 13],
  support: [26, 31],
} as const;
type Department = keyof typeof hires;
const keys = Object.keys(hires) as Department[];

export default function PeriodCompareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [compare, setCompare] = useState(true);

  const series = useMemo((): ChartSeries[] => {
    const names = keys.map((key) => t(`hiringDepartments.${key}`));
    return [
      {
        id: "previous",
        name: t("previousYear"),
        color: "var(--border-strong-color)",
        // hidden series keep their place in the legend and come back as is
        hidden: !compare,
        data: keys.map((key, i) => [names[i] ?? key, hires[key][0]] as const),
      },
      {
        id: "current",
        name: t("currentYear"),
        color: "var(--primary-color)",
        data: keys.map((key, i) => [names[i] ?? key, hires[key][1]] as const),
      },
    ];
  }, [t, compare]);
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }),
    }),
    [locale],
  );

  // both years of the hovered department and the change between them
  const renderTooltip = (event: ChartHoverEvent) => {
    const department = keys[event.items[0]?.index ?? -1];
    if (!department) return null;
    const [previous, current] = hires[department];
    const change = current / previous - 1;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2px 16px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        <span>{t("currentYear")}</span>
        <strong style={{ textAlign: "end" }}>
          {formats.number.format(current)}
        </strong>
        <span>{t("previousYear")}</span>
        <span style={{ textAlign: "end" }}>
          {formats.number.format(previous)}
        </span>
        <span>{t("change")}</span>
        <span
          style={{
            textAlign: "end",
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {formats.change.format(change)}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={compare}
        onChange={setCompare}
        label={t("compareLastYear")}
      />
      <BarChart
        series={series}
        renderTooltip={renderTooltip}
        yAxis={{ format: (y) => formats.number.format(y) }}
        height={300}
        ariaLabel={t("hiresAria")}
      />
    </div>
  );
}
