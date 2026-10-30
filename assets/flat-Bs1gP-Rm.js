import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TreemapChartFlat.vue -->

<script setup lang="ts">
// A flat list: one rectangle per node, its area proportional to the value.

import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

const regions =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
  name: regions[i],
  value,
}));
const chartOptions = { format: (millions) => \`\${millions}M\` };
<\/script>

<template>
  <minerva-treemap-chart
    id="markets"
    gap="4"
    height="300"
    :data.prop="chartData"
    :options.prop="chartOptions"
  ></minerva-treemap-chart>
</template>
`,angular:`// treemap-chart-flat.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A flat list: one rectangle per node, its area proportional to the value.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

@Component({
  selector: "app-treemap-chart-flat",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-treemap-chart
      id="markets"
      gap="4"
      height="300"
      [data]="chartData"
      [options]="chartOptions"
    ></minerva-treemap-chart>
  \`,
})
export class TreemapChartFlatComponent {
  regions = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: this.regions[i],
    value,
  }));
  chartOptions = { format: (millions) => \`\${millions}M\` };
}
`,svelte:`<!-- TreemapChartFlat.svelte -->

<script lang="ts">
  // A flat list: one rectangle per node, its area proportional to the value.

  import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
    zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
    ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
    fr: [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud",
      "Afrique",
      "Océanie",
    ],
  };

  const regions =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: regions[i],
    value,
  }));
  const chartOptions = { format: (millions) => \`\${millions}M\` };
<\/script>

<minerva-treemap-chart
  id="markets"
  gap="4"
  height="300"
  data={chartData}
  options={chartOptions}
></minerva-treemap-chart>
`,solid:`// TreemapChartFlat.tsx

// A flat list: one rectangle per node, its area proportional to the value.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

export default function TreemapChartFlat() {
  const regions =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: regions[i],
    value,
  }));
  const chartOptions = { format: (millions) => \`\${millions}M\` };

  return (
    <minerva-treemap-chart
      id="markets"
      gap="4"
      height="300"
      prop:data={chartData}
      prop:options={chartOptions}
    ></minerva-treemap-chart>
  );
}
`,html:`<minerva-treemap-chart
  id="markets"
  gap="4"
  height="300"
></minerva-treemap-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A flat list: one rectangle per node, its area proportional to the value.
  const TEXT = {
    en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
    zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
    ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
    fr: [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud",
      "Afrique",
      "Océanie",
    ],
  };

  const regions = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#markets");
  chart.data = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: regions[i],
    value,
  }));
  chart.options = { format: (millions) => \`\${millions}M\` };
<\/script>
`}})))()}n();export{t as default};