import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// A terrain with a wireframe (\`wireframe\`, every 2nd grid line) and the
// "terrain" color scale; hover a cell to read its elevation.
import type { MinervaSurface3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: { name: "Terrain", axes: ["East (km)", "North (km)", "Elevation (m)"] },
  zh: { name: "地形", axes: ["东（公里）", "北（公里）", "海拔（米）"] },
  ja: { name: "地形", axes: ["東（km）", "北（km）", "標高（m）"] },
  fr: { name: "Relief", axes: ["Est (km)", "Nord (km)", "Altitude (m)"] },
};

// two hills and a valley on a 40 × 40 grid (heights in meters)
const N = 40;
const TERRAIN = {
  rows: N,
  cols: N,
  z: Array.from({ length: N * N }, (_, k) => {
    const x = (k % N) / 4;
    const y = Math.floor(k / N) / 4;
    return Math.round(
      900 * Math.exp(-((x - 3) ** 2 + (y - 4) ** 2) / 6) +
        600 * Math.exp(-((x - 7) ** 2 + (y - 7) ** 2) / 4) -
        200 * Math.exp(-((x - 6) ** 2 + (y - 2) ** 2) / 3) +
        300,
    );
  }),
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSurface3DChart>("#terrain")!;
  chart.series = [{ name: text.name, data: TERRAIN }];
  chart.wireframe = { step: 2 };
  chart.options = {
    colorScale: "terrain",
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
}
`})))()}n();export{t as default};