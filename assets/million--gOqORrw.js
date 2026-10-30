import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// One million points in a typed array (\`data: { y }\`: the x values are the
// indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
// pinch to zoom down to single samples.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { signal: "Sensor (1,000,000 samples)" },
  zh: { signal: "传感器（1,000,000 个采样点）" },
  ja: { signal: "センサー（1,000,000 サンプル）" },
  fr: { signal: "Capteur (1 000 000 d’échantillons)" },
};

// a million samples as typed-array columns: no objects, no copies
const COUNT = 1_000_000;
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  y[i] =
    50 +
    30 * Math.sin(i / 20_000) +
    8 * Math.sin(i / 700) +
    3 * Math.sin(i * 1.7);
}
const SAMPLES = { y };

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLineChart>("#million")!;
  chart.series = [{ name: text.signal, data: SAMPLES }];
  chart.options = { interaction: { zoom: "x" }, crosshair: true };
}
`})))()}n();export{t as default};