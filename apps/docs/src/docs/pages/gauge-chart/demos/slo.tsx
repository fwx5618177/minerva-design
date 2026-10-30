import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// 30-day availability of a service against its 99.9% objective
const OBJECTIVE = 99.9;
const AVAILABILITY = 99.94;
const MINUTES = 30 * 24 * 60;
// error budget: the downtime the objective allows over 30 days
const BUDGET = MINUTES * (1 - OBJECTIVE / 100);
const DOWNTIME = MINUTES * (1 - AVAILABILITY / 100);

// a zoomed scale from 99.5% to 100%: red below the objective
const bands: GaugeBand[] = [
  { to: OBJECTIVE, color: "var(--danger-color)" },
  { to: 99.95, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function SloDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const availability = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
  });
  const minutes = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    maximumFractionDigits: 0,
  });
  const share = new Intl.NumberFormat(locale, { style: "percent" });
  const left = 1 - DOWNTIME / BUDGET;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      <GaugeChart
        value={AVAILABILITY}
        min={99.5}
        max={100}
        bands={bands}
        needle
        // the band bounds would crowd the zoomed scale
        ticks={false}
        label={t("availability")}
        format={(value) => availability.format(value / 100)}
        renderTooltip={() => (
          <span>
            {t("objective", { value: availability.format(OBJECTIVE / 100) })}
          </span>
        )}
        height={240}
        ariaLabel={t("availabilityAria")}
      />
      <GaugeChart
        value={left * 100}
        bands={[
          { to: 25, color: "var(--danger-color)" },
          { to: 50, color: "var(--warning-color)" },
          { to: 100, color: "var(--success-color)" },
        ]}
        label={t("budgetLeft")}
        format={(value) => share.format(value / 100)}
        renderTooltip={() => (
          <span>
            {t("budgetDetail", {
              used: minutes.format(DOWNTIME),
              budget: minutes.format(BUDGET),
            })}
          </span>
        )}
        height={240}
        ariaLabel={t("budgetAria")}
      />
    </div>
  );
}
