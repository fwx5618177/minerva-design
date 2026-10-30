import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

// Average rainfall per month (January to December), in millimeters
const rainfall = [78, 61, 72, 58, 49, 37, 28, 34, 52, 86, 97, 92];

// One color per season (Dec-Feb, Mar-May, Jun-Aug, Sep-Nov)
const seasons = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

const labelContent = ["name"] as const;

export default function RoseDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const month = new Intl.DateTimeFormat(locale, { month: "short" });
    return rainfall.map((value, i) => ({
      name: month.format(new Date(2026, i, 1)),
      value,
      color: seasons[Math.floor(((i + 1) % 12) / 3)],
    }));
  }, [locale]);
  const millimeters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );

  return (
    <PieChart
      data={data}
      rose
      innerRadius={0.18}
      padAngle={2}
      cornerRadius={4}
      labelContent={labelContent}
      legend={false}
      format={(value) => millimeters.format(value)}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>{millimeters.format(slice.value)}</span>
        </div>
      )}
      height={360}
      ariaLabel={t("rainfallAria")}
    />
  );
}
