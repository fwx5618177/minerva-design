import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadarChart } from "minerva-design/native";

// Interview scorecard of one candidate, each skill rated out of 10
const skills = [
  "problemSolving",
  "coding",
  "systemDesign",
  "communication",
  "collaboration",
  "ownership",
] as const;
const scores = [8.5, 9, 6.5, 7, 8, 9];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.native.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const indicators = useMemo(
    () => skills.map((key) => ({ name: t(\`skills.\${key}\`), max: 10 })),
    [t],
  );
  const series = useMemo(() => [{ name: t("candidate"), values: scores }], [t]);
  return (
    <RadarChart
      indicators={indicators}
      series={series}
      height={300}
      format={(value) => t("outOf10", { value: number.format(value) })}
      ariaLabel={t("scorecardAria")}
    />
  );
}
`})))()}n();export{t as default};