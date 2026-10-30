import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Usage of the plan's quotas this month
const quotas = [
  { key: "storage", used: 412, limit: 500, unit: "gigabyte" },
  { key: "apiCalls", used: 1_840_000, limit: 5_000_000 },
  { key: "seats", used: 48, limit: 50 },
  { key: "minutes", used: 2_310, limit: 3_000, unit: "minute" },
];

// the arc turns orange at 75% and red at 90% of the quota
const bandsFor = (limit: number): GaugeBand[] => [
  { to: limit * 0.75, color: "var(--success-color)" },
  { to: limit * 0.9, color: "var(--warning-color)" },
  { to: limit, color: "var(--danger-color)" },
];

export default function QuotaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {quotas.map((quota) => {
        // "412 GB", "1.8M", "2.3K min"...
        const amount = quota.unit
          ? new Intl.NumberFormat(locale, {
              style: "unit",
              unit: quota.unit,
              notation: "compact",
            })
          : new Intl.NumberFormat(locale, { notation: "compact" });
        const label = t(`quotas.${quota.key}`);
        return (
          <figure key={quota.key} style={{ margin: 0, textAlign: "center" }}>
            <GaugeChart
              value={quota.used}
              max={quota.limit}
              bands={bandsFor(quota.limit)}
              label={label}
              // the center shows the share of the quota
              format={(value) => percent.format(value / quota.limit)}
              ticks={false}
              renderTooltip={() => (
                <span>
                  {t("quotaUsed", {
                    used: amount.format(quota.used),
                    limit: amount.format(quota.limit),
                  })}
                </span>
              )}
              height={180}
              ariaLabel={t("quotaAria", {
                quota: label,
                share: percent.format(quota.used / quota.limit),
              })}
            />
            <figcaption
              style={{ fontSize: 12, color: "var(--text-secondary-color)" }}
            >
              {t("quotaUsed", {
                used: amount.format(quota.used),
                limit: amount.format(quota.limit),
              })}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
