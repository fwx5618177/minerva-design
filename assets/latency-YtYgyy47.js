import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// <minerva-histogram-chart> bins raw samples itself (\`bins="auto"\`:
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#latency")!;
  chart.values = LATENCY;
  chart.valueName = text.requests;
  chart.options = { xAxis: { title: text.ms } };
}
`})))()}n();export{t as default};