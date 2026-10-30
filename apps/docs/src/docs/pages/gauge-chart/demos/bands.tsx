import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Net Promoter Score: -100 (everyone detracts) to +100 (everyone promotes)
const bands: GaugeBand[] = [
  { to: 0, color: "var(--danger-color)" },
  { to: 30, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function BandsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  // "+42", "−12"...
  const signed = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  });
  const format = (value: number) => signed.format(value);

  return (
    <GaugeChart
      value={42}
      min={-100}
      max={100}
      bands={bands}
      needle
      label={t("nps")}
      format={format}
      renderTooltip={(event) => (
        <span>
          {t("nps")} · {format(event.value)}
        </span>
      )}
      height={280}
      ariaLabel={t("nps")}
    />
  );
}
