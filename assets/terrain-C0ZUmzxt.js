import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- Surface3dChartTerrain.vue -->

<script setup lang="ts">
// A terrain with a wireframe (\`wireframe\`, every 2nd grid line) and the
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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [{ name: text.name, data: TERRAIN }];
const chartWireframe = { step: 2 };
const chartOptions = {
  colorScale: "terrain",
  xAxis: { title: text.axes[0] },
  yAxis: { title: text.axes[1] },
  zAxis: { title: text.axes[2] },
};
<\/script>

<template>
  <minerva-surface-3d-chart
    id="terrain"
    height="420"
    :series.prop="chartSeries"
    :wireframe.prop="chartWireframe"
    :options.prop="chartOptions"
  ></minerva-surface-3d-chart>
</template>
`,angular:`// surface-3d-chart-terrain.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A terrain with a wireframe (\`wireframe\`, every 2nd grid line) and the
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

@Component({
  selector: "app-surface-3d-chart-terrain",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-surface-3d-chart
      id="terrain"
      height="420"
      [series]="chartSeries"
      [wireframe]="chartWireframe"
      [options]="chartOptions"
    ></minerva-surface-3d-chart>
  \`,
})
export class Surface3dChartTerrainComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [{ name: this.text.name, data: TERRAIN }];
  chartWireframe = { step: 2 };
  chartOptions = {
    colorScale: "terrain",
    xAxis: { title: this.text.axes[0] },
    yAxis: { title: this.text.axes[1] },
    zAxis: { title: this.text.axes[2] },
  };
}
`,svelte:`<!-- Surface3dChartTerrain.svelte -->

<script lang="ts">
  // A terrain with a wireframe (\`wireframe\`, every 2nd grid line) and the
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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.name, data: TERRAIN }];
  const chartWireframe = { step: 2 };
  const chartOptions = {
    colorScale: "terrain",
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
<\/script>

<minerva-surface-3d-chart
  id="terrain"
  height="420"
  series={chartSeries}
  wireframe={chartWireframe}
  options={chartOptions}
></minerva-surface-3d-chart>
`,solid:`// Surface3dChartTerrain.tsx

// A terrain with a wireframe (\`wireframe\`, every 2nd grid line) and the
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

export default function Surface3dChartTerrain() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.name, data: TERRAIN }];
  const chartWireframe = { step: 2 };
  const chartOptions = {
    colorScale: "terrain",
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };

  return (
    <minerva-surface-3d-chart
      id="terrain"
      height="420"
      prop:series={chartSeries}
      prop:wireframe={chartWireframe}
      prop:options={chartOptions}
    ></minerva-surface-3d-chart>
  );
}
`,html:`<minerva-surface-3d-chart id="terrain" height="420"></minerva-surface-3d-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart-3d";

  // A terrain with a wireframe (\`wireframe\`, every 2nd grid line) and the
  // "terrain" color scale; hover a cell to read its elevation.
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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#terrain");
  chart.series = [{ name: text.name, data: TERRAIN }];
  chart.wireframe = { step: 2 };
  chart.options = {
    colorScale: "terrain",
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
<\/script>
`}})))()}n();export{t as default};