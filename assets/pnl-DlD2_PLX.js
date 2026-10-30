import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- WaterfallChartPnl.vue -->

<script setup lang="ts">
// A profit and loss bridge: changes float from the running total,
// \`subtotal\` / \`total\` steps start from zero; the values are written on the bars.

import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

const steps =
  STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
const chartSteps = [
  { label: steps[0], value: 420 },
  { label: steps[1], value: -180 },
  { label: steps[2], kind: "subtotal" },
  { label: steps[3], value: -130 },
  { label: steps[4], value: 25 },
  { label: steps[5], value: -34 },
  { label: steps[6], kind: "total" },
];
const chartFormat = (value) => \`\${value} k€\`;
<\/script>

<template>
  <minerva-waterfall-chart
    id="pnl"
    height="320"
    :steps.prop="chartSteps"
    :format.prop="chartFormat"
  ></minerva-waterfall-chart>
</template>
`,angular:`// waterfall-chart-pnl.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A profit and loss bridge: changes float from the running total,
// \`subtotal\` / \`total\` steps start from zero; the values are written on the bars.
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

@Component({
  selector: "app-waterfall-chart-pnl",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-waterfall-chart
      id="pnl"
      height="320"
      [steps]="chartSteps"
      [format]="chartFormat"
    ></minerva-waterfall-chart>
  \`,
})
export class WaterfallChartPnlComponent {
  steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  chartSteps = [
    { label: this.steps[0], value: 420 },
    { label: this.steps[1], value: -180 },
    { label: this.steps[2], kind: "subtotal" },
    { label: this.steps[3], value: -130 },
    { label: this.steps[4], value: 25 },
    { label: this.steps[5], value: -34 },
    { label: this.steps[6], kind: "total" },
  ];
  chartFormat = (value) => \`\${value} k€\`;
}
`,svelte:`<!-- WaterfallChartPnl.svelte -->

<script lang="ts">
  // A profit and loss bridge: changes float from the running total,
  // \`subtotal\` / \`total\` steps start from zero; the values are written on the bars.

  import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

  const STEPS = {
    en: [
      "Revenue",
      "Cost of sales",
      "Gross profit",
      "Operating costs",
      "Other income",
      "Taxes",
      "Net income",
    ],
    zh: [
      "营业收入",
      "销售成本",
      "毛利润",
      "运营费用",
      "其他收入",
      "税费",
      "净利润",
    ],
    ja: [
      "売上高",
      "売上原価",
      "売上総利益",
      "営業費用",
      "その他収益",
      "税金",
      "純利益",
    ],
    fr: [
      "Chiffre d’affaires",
      "Coût des ventes",
      "Marge brute",
      "Charges d’exploitation",
      "Autres produits",
      "Impôts",
      "Résultat net",
    ],
  };

  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chartSteps = [
    { label: steps[0], value: 420 },
    { label: steps[1], value: -180 },
    { label: steps[2], kind: "subtotal" },
    { label: steps[3], value: -130 },
    { label: steps[4], value: 25 },
    { label: steps[5], value: -34 },
    { label: steps[6], kind: "total" },
  ];
  const chartFormat = (value) => \`\${value} k€\`;
<\/script>

<minerva-waterfall-chart
  id="pnl"
  height="320"
  steps={chartSteps}
  format={chartFormat}
></minerva-waterfall-chart>
`,solid:`// WaterfallChartPnl.tsx

// A profit and loss bridge: changes float from the running total,
// \`subtotal\` / \`total\` steps start from zero; the values are written on the bars.
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

export default function WaterfallChartPnl() {
  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chartSteps = [
    { label: steps[0], value: 420 },
    { label: steps[1], value: -180 },
    { label: steps[2], kind: "subtotal" },
    { label: steps[3], value: -130 },
    { label: steps[4], value: 25 },
    { label: steps[5], value: -34 },
    { label: steps[6], kind: "total" },
  ];
  const chartFormat = (value) => \`\${value} k€\`;

  return (
    <minerva-waterfall-chart
      id="pnl"
      height="320"
      prop:steps={chartSteps}
      prop:format={chartFormat}
    ></minerva-waterfall-chart>
  );
}
`,html:`<minerva-waterfall-chart id="pnl" height="320"></minerva-waterfall-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A profit and loss bridge: changes float from the running total,
  // \`subtotal\` / \`total\` steps start from zero; the values are written on the bars.
  const STEPS = {
    en: [
      "Revenue",
      "Cost of sales",
      "Gross profit",
      "Operating costs",
      "Other income",
      "Taxes",
      "Net income",
    ],
    zh: [
      "营业收入",
      "销售成本",
      "毛利润",
      "运营费用",
      "其他收入",
      "税费",
      "净利润",
    ],
    ja: [
      "売上高",
      "売上原価",
      "売上総利益",
      "営業費用",
      "その他収益",
      "税金",
      "純利益",
    ],
    fr: [
      "Chiffre d’affaires",
      "Coût des ventes",
      "Marge brute",
      "Charges d’exploitation",
      "Autres produits",
      "Impôts",
      "Résultat net",
    ],
  };

  const steps = STEPS[document.documentElement.lang] ?? STEPS.en;
  const chart = document.querySelector("#pnl");
  chart.steps = [
    { label: steps[0], value: 420 },
    { label: steps[1], value: -180 },
    { label: steps[2], kind: "subtotal" },
    { label: steps[3], value: -130 },
    { label: steps[4], value: 25 },
    { label: steps[5], value: -34 },
    { label: steps[6], kind: "total" },
  ];
  chart.format = (value) => \`\${value} k€\`;
<\/script>
`}})))()}n();export{t as default};