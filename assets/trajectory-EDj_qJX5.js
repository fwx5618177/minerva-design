import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- Scatter3dChartTrajectory.vue -->

<script setup lang="ts">
// <minerva-line-3d-chart>: a trajectory colored along its height
// (\`colorBy: "z"\` with the color scale, shown in the color bar); the camera
// turns slowly around it (\`autoRotate\`).

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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.path, data: PATH, colorBy: "z", lineWidth: 3 },
];
const chartOptions = {
  colorScale: "turbo",
  autoRotate: true,
  xAxis: { title: text.axes[0] },
  yAxis: { title: text.axes[1] },
  zAxis: { title: text.axes[2] },
};
<\/script>

<template>
  <minerva-line-3d-chart
    id="flight"
    height="420"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-line-3d-chart>
</template>
`,angular:`// scatter-3d-chart-trajectory.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// <minerva-line-3d-chart>: a trajectory colored along its height
// (\`colorBy: "z"\` with the color scale, shown in the color bar); the camera
// turns slowly around it (\`autoRotate\`).
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

@Component({
  selector: "app-scatter-3d-chart-trajectory",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-line-3d-chart
      id="flight"
      height="420"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-line-3d-chart>
  \`,
})
export class Scatter3dChartTrajectoryComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.path, data: PATH, colorBy: "z", lineWidth: 3 },
  ];
  chartOptions = {
    colorScale: "turbo",
    autoRotate: true,
    xAxis: { title: this.text.axes[0] },
    yAxis: { title: this.text.axes[1] },
    zAxis: { title: this.text.axes[2] },
  };
}
`,svelte:`<!-- Scatter3dChartTrajectory.svelte -->

<script lang="ts">
  // <minerva-line-3d-chart>: a trajectory colored along its height
  // (\`colorBy: "z"\` with the color scale, shown in the color bar); the camera
  // turns slowly around it (\`autoRotate\`).

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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.path, data: PATH, colorBy: "z", lineWidth: 3 },
  ];
  const chartOptions = {
    colorScale: "turbo",
    autoRotate: true,
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
<\/script>

<minerva-line-3d-chart
  id="flight"
  height="420"
  series={chartSeries}
  options={chartOptions}
></minerva-line-3d-chart>
`,solid:`// Scatter3dChartTrajectory.tsx

// <minerva-line-3d-chart>: a trajectory colored along its height
// (\`colorBy: "z"\` with the color scale, shown in the color bar); the camera
// turns slowly around it (\`autoRotate\`).
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

export default function Scatter3dChartTrajectory() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.path, data: PATH, colorBy: "z", lineWidth: 3 },
  ];
  const chartOptions = {
    colorScale: "turbo",
    autoRotate: true,
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };

  return (
    <minerva-line-3d-chart
      id="flight"
      height="420"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-line-3d-chart>
  );
}
`,html:`<minerva-line-3d-chart id="flight" height="420"></minerva-line-3d-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart-3d";

  // <minerva-line-3d-chart>: a trajectory colored along its height
  // (\`colorBy: "z"\` with the color scale, shown in the color bar); the camera
  // turns slowly around it (\`autoRotate\`).
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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#flight");
  chart.series = [{ name: text.path, data: PATH, colorBy: "z", lineWidth: 3 }];
  chart.options = {
    colorScale: "turbo",
    autoRotate: true,
    xAxis: { title: text.axes[0] },
    yAxis: { title: text.axes[1] },
    zAxis: { title: text.axes[2] },
  };
<\/script>
`}})))()}n();export{t as default};