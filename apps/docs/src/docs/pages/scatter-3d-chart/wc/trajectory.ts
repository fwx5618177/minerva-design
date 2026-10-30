// <minerva-line-3d-chart>: a trajectory colored along its height
// (`colorBy: "z"` with the color scale, shown in the color bar); the camera
// turns slowly around it (`autoRotate`).
import type { MinervaLine3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    path: "Flight path",
    axes: ["East (km)", "North (km)", "Altitude (km)"],
  },
  zh: { path: "飞行轨迹", axes: ["东（公里）", "北（公里）", "高度（公里）"] },
  ja: { path: "飛行経路", axes: ["東（km）", "北（km）", "高度（km）"] },
  fr: { path: "Trajectoire", axes: ["Est (km)", "Nord (km)", "Altitude (km)"] },
};

// a climbing spiral of 600 points, as columns
const t = Array.from({ length: 600 }, (_, i) => i / 30);
const PATH = {
  x: t.map((a) => Math.cos(a) * (4 + a / 4)),
  y: t.map((a) => Math.sin(a) * (4 + a / 4)),
  z: t.map((a) => a / 2),
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaLine3DChart>("#flight")!;
  chart.series = [{ name: text.path, data: PATH, colorBy: "z", lineWidth: 3 }];
  chart.options = {
    colorScale: "turbo",
    autoRotate: true,
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
}
