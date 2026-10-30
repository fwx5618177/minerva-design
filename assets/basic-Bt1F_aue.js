import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useTranslation } from "react-i18next";
import { BubbleChart } from "minerva-design/native";

// GDP per capita (k$), life expectancy (years) and population (millions)
const countries = {
  asia: [
    ["CN", 23.3, 78.6, 1410],
    ["IN", 9.2, 70.8, 1430],
    ["JP", 47.0, 84.7, 124],
  ],
  europe: [
    ["DE", 66.0, 81.0, 84],
    ["FR", 58.0, 82.8, 68],
  ],
  americas: [
    ["US", 80.0, 77.5, 335],
    ["BR", 20.0, 75.9, 216],
  ],
  africa: [
    ["NG", 5.9, 54.5, 224],
    ["EG", 17.0, 71.6, 113],
  ],
} as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const names = new Intl.DisplayNames([locale], { type: "region" });
  return (
    <BubbleChart
      height={300}
      locale={locale}
      maxSize={44}
      ariaLabel={t("countriesAria")}
      xAxis={{ title: t("gdp"), min: 0, max: 90 }}
      yAxis={{ title: t("lifeExpectancy") }}
      legend={{ position: "bottom" }}
      series={(Object.keys(countries) as (keyof typeof countries)[]).map(
        (c) => ({
          name: t(\`continents.\${c}\`),
          valueName: t("population"),
          data: countries[c].map(([code, gdp, life, population]) => ({
            x: gdp,
            y: life,
            value: population * 1e6,
            label: names.of(code) ?? code,
          })),
        }),
      )}
    />
  );
}
`})))()}n();export{t as default};