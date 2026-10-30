import { useTranslation } from "react-i18next";
import { GaugeChart } from "minerva-design/charts";

// Resource usage of a server, in percent
const metrics = [
  { key: "cpu", value: 68, color: "var(--primary-color)" },
  { key: "memory", value: 82, color: "var(--warning-color)" },
  { key: "disk", value: 41, color: "var(--success-color)" },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  // "68%", "68 %"...: the values are percents, Intl expects ratios
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
  const format = (value: number) => percent.format(value / 100);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {metrics.map((metric) => (
        <GaugeChart
          key={metric.key}
          value={metric.value}
          label={t(`metrics.${metric.key}`)}
          color={metric.color}
          format={format}
          renderTooltip={(event) => (
            <span>
              {t(`metrics.${metric.key}`)} · {format(event.value)}
            </span>
          )}
          height={200}
          ariaLabel={t("usageAria", { metric: t(`metrics.${metric.key}`) })}
        />
      ))}
    </div>
  );
}
