import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart } from "minerva-design/native";

// 500 response times (ms) of each service, log-normally distributed
const services = [
  ["gateway", 18, 0.35],
  ["auth", 32, 0.3],
  ["search", 95, 0.45],
  ["checkout", 140, 0.38],
] as const;
const samples = services.map(([, median, spread], s) => {
  let seed = 100 + s;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Float64Array.from({ length: 500 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  // the tooltip rows (max, Q3, median...) come in the locale's language
  const groups = useMemo(
    () =>
      services.map(([key], i) => ({
        x: t(\`services.\${key}\`),
        values: samples[i] ?? [],
      })),
    [t],
  );
  return (
    <BoxPlotChart
      height={280}
      locale={i18n.language}
      groups={groups}
      name={t("responseTime")}
      ariaLabel={t("servicesAria")}
    />
  );
}
`})))()}n();export{t as default};