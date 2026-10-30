import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`layout="months"\`: a small calendar per month; \`levels\` sets the number
// of color steps above the empty days, \`thresholds\` their bounds.
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#steps")!;
  chart.data = STEPS;
  chart.range = ["2026-01-01", "2026-06-30"];
  chart.locale = text.locale;
  chart.options = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };
}
`})))()}n();export{t as default};