import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`needle\` adds a pointer to the arc; \`min\` / \`max\` set the scale and the
// options a wider sweep and thinner arc.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#speed")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.options = { sweep: 270, thickness: 0.1 };
}
`})))()}n();export{t as default};