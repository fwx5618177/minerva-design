import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (\`rows\`,
// \`cols\`, \`z\` row by row), lit and colored by height, with contour lines
// projected on the floor.
import type { MinervaSurface3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: { name: "Ripple", height: "Height" },
  zh: { name: "波纹", height: "高度" },
  ja: { name: "波紋", height: "高さ" },
  fr: { name: "Onde", height: "Hauteur" },
};

// z = sin(r) / r over a 60 × 60 grid from -10 to 10
const N = 60;
const WAVE = {
  rows: N,
  cols: N,
  x: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
  y: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
  z: Array.from({ length: N * N }, (_, k) => {
    const x = -10 + (20 * (k % N)) / (N - 1);
    const y = -10 + (20 * Math.floor(k / N)) / (N - 1);
    const r = Math.hypot(x, y) || 1e-6;
    return Math.sin(r) / r;
  }),
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSurface3DChart>("#ripple")!;
  chart.series = [{ name: text.name, data: WAVE }];
  chart.contours = { count: 10, floor: true };
  chart.options = { colorScale: "viridis", zAxis: { title: text.height } };
}
`})))()}n();export{t as default};