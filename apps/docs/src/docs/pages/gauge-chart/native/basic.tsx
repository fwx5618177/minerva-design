import { useTranslation } from "react-i18next";
import { GaugeChart } from "minerva-design/native";

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.native.data",
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return (
    <GaugeChart
      value={72}
      label={t("storage")}
      format={(value) => percent.format(value / 100)}
      height={220}
      ariaLabel={t("storageAria")}
    />
  );
}
