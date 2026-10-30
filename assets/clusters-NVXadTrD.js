import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// <minerva-scatter-3d-chart>: three customer segments as point clouds
// (columns of x, y, z); drag to rotate, Ctrl / ⌘ + wheel to zoom,
// double-click to reset the camera.
import type { MinervaScatter3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    segments: ["Students", "Professionals", "Retirees"],
    axes: ["Age", "Income (k€)", "Spending (k€)"],
  },
  zh: {
    segments: ["学生", "职场人士", "退休人员"],
    axes: ["年龄", "收入（千欧元）", "消费（千欧元）"],
  },
  ja: {
    segments: ["学生", "社会人", "退職者"],
    axes: ["年齢", "収入（千ユーロ）", "支出（千ユーロ）"],
  },
  fr: {
    segments: ["Étudiants", "Actifs", "Retraités"],
    axes: ["Âge", "Revenu (k€)", "Dépenses (k€)"],
  },
};

const fraction = (value: number) => value - Math.floor(value);
// a cloud of 400 customers around a center (age, income, spending),
// generated deterministically, as columns
const cloud = (age: number, income: number, spending: number, seed: number) => {
  const noise = (i: number, k: number) =>
    fraction(Math.sin((i + seed * 1000) * (12.9898 + k)) * 43758.5453) - 0.5;
  return {
    x: Array.from({ length: 400 }, (_, i) => age + noise(i, 0) * 12),
    y: Array.from({ length: 400 }, (_, i) => income + noise(i, 1) * 20),
    z: Array.from({ length: 400 }, (_, i) => spending + noise(i, 2) * 10),
  };
};
const CLOUDS = [
  cloud(22, 18, 9, 1),
  cloud(40, 62, 24, 2),
  cloud(70, 35, 15, 3),
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaScatter3DChart>("#segments")!;
  chart.series = text.segments.map((name, i) => ({
    name,
    data: CLOUDS[i],
    pointSize: 5,
  }));
  chart.options = {
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
}
`})))()}n();export{t as default};