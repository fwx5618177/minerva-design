import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SankeyChartEnergy.vue -->

<script setup lang="ts">
// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.

import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
];

const names =
  NODES[document.documentElement.lang as keyof typeof NODES] ?? NODES.en;
const chartNodes = names.map((name) => ({ name }));
const chartLinks = LINKS.map(([source, target, value]) => ({
  source,
  target,
  value,
}));
const chartOptions = { format: (value) => \`\${value} TWh\` };
<\/script>

<template>
  <minerva-sankey-chart
    id="energy"
    :nodes.prop="chartNodes"
    :links.prop="chartLinks"
    :options.prop="chartOptions"
  ></minerva-sankey-chart>
</template>
`,angular:`// sankey-chart-energy.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
];

@Component({
  selector: "app-sankey-chart-energy",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-sankey-chart
      id="energy"
      [nodes]="chartNodes"
      [links]="chartLinks"
      [options]="chartOptions"
    ></minerva-sankey-chart>
  \`,
})
export class SankeyChartEnergyComponent {
  names =
    NODES[document.documentElement.lang as keyof typeof NODES] ?? NODES.en;
  chartNodes = this.names.map((name) => ({ name }));
  chartLinks = LINKS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
  chartOptions = { format: (value) => \`\${value} TWh\` };
}
`,svelte:`<!-- SankeyChartEnergy.svelte -->

<script lang="ts">
  // Energy flows from the sources to the uses through the grid: link
  // thickness is the flow, colored from the source to the target.

  import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

  const NODES = {
    en: [
      "Solar",
      "Wind",
      "Gas",
      "Grid",
      "Homes",
      "Industry",
      "Transport",
      "Losses",
    ],
    zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
    ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
    fr: [
      "Solaire",
      "Éolien",
      "Gaz",
      "Réseau",
      "Foyers",
      "Industrie",
      "Transports",
      "Pertes",
    ],
  };

  // source, target (node indexes), TWh
  const LINKS = [
    [0, 3, 32],
    [1, 3, 48],
    [2, 3, 70],
    [3, 4, 52],
    [3, 5, 61],
    [3, 6, 22],
    [3, 7, 15],
  ];

  const names =
    NODES[document.documentElement.lang as keyof typeof NODES] ?? NODES.en;
  const chartNodes = names.map((name) => ({ name }));
  const chartLinks = LINKS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
  const chartOptions = { format: (value) => \`\${value} TWh\` };
<\/script>

<minerva-sankey-chart
  id="energy"
  nodes={chartNodes}
  links={chartLinks}
  options={chartOptions}
></minerva-sankey-chart>
`,solid:`// SankeyChartEnergy.tsx

// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
];

export default function SankeyChartEnergy() {
  const names =
    NODES[document.documentElement.lang as keyof typeof NODES] ?? NODES.en;
  const chartNodes = names.map((name) => ({ name }));
  const chartLinks = LINKS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
  const chartOptions = { format: (value) => \`\${value} TWh\` };

  return (
    <minerva-sankey-chart
      id="energy"
      prop:nodes={chartNodes}
      prop:links={chartLinks}
      prop:options={chartOptions}
    ></minerva-sankey-chart>
  );
}
`,html:`<minerva-sankey-chart id="energy"></minerva-sankey-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Energy flows from the sources to the uses through the grid: link
  // thickness is the flow, colored from the source to the target.
  const NODES = {
    en: [
      "Solar",
      "Wind",
      "Gas",
      "Grid",
      "Homes",
      "Industry",
      "Transport",
      "Losses",
    ],
    zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
    ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
    fr: [
      "Solaire",
      "Éolien",
      "Gaz",
      "Réseau",
      "Foyers",
      "Industrie",
      "Transports",
      "Pertes",
    ],
  };

  // source, target (node indexes), TWh
  const LINKS = [
    [0, 3, 32],
    [1, 3, 48],
    [2, 3, 70],
    [3, 4, 52],
    [3, 5, 61],
    [3, 6, 22],
    [3, 7, 15],
  ];

  const names = NODES[document.documentElement.lang] ?? NODES.en;
  const chart = document.querySelector("#energy");
  chart.nodes = names.map((name) => ({ name }));
  chart.links = LINKS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
  chart.options = { format: (value) => \`\${value} TWh\` };
<\/script>
`}})))()}n();export{t as default};