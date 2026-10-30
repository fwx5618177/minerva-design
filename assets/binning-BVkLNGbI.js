import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// The same samples in fewer or more bins: \`bins\` takes a count or a rule
// (\`sturges\`, \`freedman-diaconis\`, \`auto\`); two groups appear with enough bins.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#ages")!;
  const label = root.querySelector<HTMLSpanElement>("#label")!;
  const sturges = root.querySelector<HTMLButtonElement>("#sturges")!;
  const ten = root.querySelector<HTMLButtonElement>("#ten")!;
  const forty = root.querySelector<HTMLButtonElement>("#forty")!;
  chart.values = AGES;
  chart.valueName = text.count;
  chart.options = { xAxis: { title: text.age } };
  label.textContent = text.bins;
  const useSturges = () => {
    chart.bins = "sturges";
  };
  const useTen = () => {
    chart.bins = 10;
  };
  const useForty = () => {
    chart.bins = 40;
  };
  sturges.addEventListener("click", useSturges);
  ten.addEventListener("click", useTen);
  forty.addEventListener("click", useForty);
  return () => {
    sturges.removeEventListener("click", useSturges);
    ten.removeEventListener("click", useTen);
    forty.removeEventListener("click", useForty);
  };
}
`})))()}n();export{t as default};