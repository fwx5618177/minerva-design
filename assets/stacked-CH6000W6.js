import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`stacked\` piles the bars of each category (a series can still set its
// own \`type\`, e.g. a line).
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBarChart>("#devices")!;
  chart.series = [
    { name: text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
    { name: text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
    { name: text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.days } };
}
`})))()}n();export{t as default};