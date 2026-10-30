import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- Surface3dChartRipple.vue -->

<script setup lang="ts">
// <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (\`rows\`,
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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [{ name: text.name, data: WAVE }];
const chartContours = { count: 10, floor: true };
const chartOptions = { colorScale: "viridis", zAxis: { title: text.height } };
<\/script>

<template>
  <minerva-surface-3d-chart
    id="ripple"
    height="420"
    :series.prop="chartSeries"
    :contours.prop="chartContours"
    :options.prop="chartOptions"
  ></minerva-surface-3d-chart>
</template>
`,angular:`// surface-3d-chart-ripple.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (\`rows\`,
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

@Component({
  selector: "app-surface-3d-chart-ripple",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-surface-3d-chart
      id="ripple"
      height="420"
      [series]="chartSeries"
      [contours]="chartContours"
      [options]="chartOptions"
    ></minerva-surface-3d-chart>
  \`,
})
export class Surface3dChartRippleComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [{ name: this.text.name, data: WAVE }];
  chartContours = { count: 10, floor: true };
  chartOptions = { colorScale: "viridis", zAxis: { title: this.text.height } };
}
`,svelte:`<!-- Surface3dChartRipple.svelte -->

<script lang="ts">
  // <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (\`rows\`,
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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.name, data: WAVE }];
  const chartContours = { count: 10, floor: true };
  const chartOptions = { colorScale: "viridis", zAxis: { title: text.height } };
<\/script>

<minerva-surface-3d-chart
  id="ripple"
  height="420"
  series={chartSeries}
  contours={chartContours}
  options={chartOptions}
></minerva-surface-3d-chart>
`,solid:`// Surface3dChartRipple.tsx

// <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (\`rows\`,
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

export default function Surface3dChartRipple() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.name, data: WAVE }];
  const chartContours = { count: 10, floor: true };
  const chartOptions = { colorScale: "viridis", zAxis: { title: text.height } };

  return (
    <minerva-surface-3d-chart
      id="ripple"
      height="420"
      prop:series={chartSeries}
      prop:contours={chartContours}
      prop:options={chartOptions}
    ></minerva-surface-3d-chart>
  );
}
`,html:`<minerva-surface-3d-chart id="ripple" height="420"></minerva-surface-3d-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart-3d";

  // <minerva-surface-3d-chart>: z = f(x, y) over a regular grid (\`rows\`,
  // \`cols\`, \`z\` row by row), lit and colored by height, with contour lines
  // projected on the floor.
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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#ripple");
  chart.series = [{ name: text.name, data: WAVE }];
  chart.contours = { count: 10, floor: true };
  chart.options = { colorScale: "viridis", zAxis: { title: text.height } };
<\/script>
`}})))()}n();export{t as default};