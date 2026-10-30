import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow \`locale\` (the page language here).
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#contributions")!;
  chart.data = DAYS;
  chart.range = 2025;
  chart.locale = text.locale;
  chart.options = { format: (value) => \`\${value} \${text.unit}\` };
}
`})))()}n();export{t as default};