import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/native";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const START = new Date(2026, 3, 1).getTime();

// Daily active users of an app over 90 days
export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(21);
    const data: [number, number][] = [];
    let level = 18_000;
    for (let i = 0; i < 90; i++) {
      level *= 1.004 + (random() - 0.5) * 0.01;
      const seasonal = 1 + 0.04 * Math.sin(i / 9);
      data.push([
        START + i * DAY,
        Math.round(level * seasonal * (0.985 + random() * 0.03)),
      ]);
    }
    return [{ name: t("dau"), data }];
  }, [t]);
  return (
    <AreaChart
      series={series}
      locale={locale}
      xAxis={{ type: "time" }}
      height={260}
      ariaLabel={t("dauAria")}
    />
  );
}
`})))()}n();export{t as default};