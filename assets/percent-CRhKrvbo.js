import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`percent\` scales every stack to 100%: the share of each source over time.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    solar: "Solar",
    wind: "Wind",
    hydro: "Hydro",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    solar: "太阳能",
    wind: "风能",
    hydro: "水电",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    solar: "太陽光",
    wind: "風力",
    hydro: "水力",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    solar: "Solaire",
    wind: "Éolien",
    hydro: "Hydraulique",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaAreaChart>("#mix")!;
  chart.series = [
    { name: text.solar, data: [0, 5, 40, 62, 35, 2] },
    { name: text.wind, data: [48, 52, 30, 22, 38, 55] },
    { name: text.hydro, data: [30, 30, 28, 26, 28, 30] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.hours } };
}
`})))()}n();export{t as default};