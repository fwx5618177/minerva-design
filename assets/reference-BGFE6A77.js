import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// \`reference\` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).
import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const latency = root.querySelector<MinervaSparkline>("#latency")!;
  const value = root.querySelector<HTMLOutputElement>("#value")!;
  latency.data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  latency.valueName = text.latency;
  latency.format = (ms) => \`\${ms} ms\`;
  value.textContent = text.hint;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    value.textContent =
      y === undefined ? text.hint : \`\${text.latency}: \${y} ms (\${text.target})\`;
  };
  latency.addEventListener("minerva-hover", onHover);
  return () => latency.removeEventListener("minerva-hover", onHover);
}
`})))()}n();export{t as default};