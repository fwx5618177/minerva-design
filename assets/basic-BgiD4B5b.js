import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useTranslation } from "react-i18next";
import { HistogramChart } from "minerva-design/native";

// Ages of 5,000 customers (a deterministic pseudo-random sample)
const ages = (() => {
  let seed = 21;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Int32Array.from({ length: 5000 }, () =>
    Math.round(
      random() < 0.6 ? 22 + random() * 18 + random() * 6 : 35 + random() * 40,
    ),
  );
})();

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  return (
    <HistogramChart
      height={260}
      locale={i18n.language}
      values={ages}
      domain={[15, 85]}
      bins={14}
      name={t("customers")}
      color="var(--chart-series-2, #10b981)"
      xAxis={{ title: t("age") }}
      ariaLabel={t("agesAria")}
    />
  );
}
`})))()}n();export{t as default};