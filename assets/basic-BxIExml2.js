import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/native";

// Quarter-to-date sales KPIs, each on its own scale: ranges are the
// poor / fair / good bounds, the marker is the quarter's target
const KPIS = [
  { key: "revenue", value: 270, target: 250, ranges: [150, 225, 300] },
  { key: "profit", value: 22.5, target: 26, ranges: [20, 25, 30] },
  { key: "customers", value: 1650, target: 2100, ranges: [1400, 2000, 2500] },
  { key: "satisfaction", value: 4.6, target: 4.4, ranges: [3.5, 4.25, 5] },
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const data = useMemo(
    (): BulletDatum[] =>
      KPIS.map(({ key, ...kpi }) => ({
        name: t(\`sales.\${key}\`),
        subtitle: t(\`sales.\${key}Unit\`),
        ...kpi,
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );
  return (
    <BulletChart
      data={data}
      rangeLabels={rangeLabels}
      format={(value) => number.format(value)}
      ariaLabel={t("salesAria")}
    />
  );
}
`})))()}n();export{t as default};