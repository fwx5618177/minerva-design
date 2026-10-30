import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`shape="bar"\` draws centered bars, \`sort="descending"\` orders the stages
// by value.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#hiring")!;
  chart.data = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));
}
`})))()}n();export{t as default};