import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- WaterfallChartCashFlow.vue -->

<script setup lang="ts">
// Monthly cash flows from an opening balance: rows instead of
// columns (\`orientation="horizontal"\`), values in the tooltip only (\`hide-labels\`).

import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

const lang = document.documentElement.lang as keyof typeof TEXT;
const text = TEXT[lang] ?? TEXT.en;
const months = MONTHS[lang] ?? MONTHS.en;
const chartSteps = [
  { label: text.opening, value: 120 },
  ...FLOWS.map((value, i) => ({ label: months[i], value })),
  { label: text.closing, kind: "total" },
];
<\/script>

<template>
  <minerva-waterfall-chart
    id="cash"
    hide-labels
    orientation="horizontal"
    height="360"
    :steps.prop="chartSteps"
  ></minerva-waterfall-chart>
</template>
`,angular:`// waterfall-chart-cash-flow.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Monthly cash flows from an opening balance: rows instead of
// columns (\`orientation="horizontal"\`), values in the tooltip only (\`hide-labels\`).
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

@Component({
  selector: "app-waterfall-chart-cash-flow",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-waterfall-chart
      id="cash"
      hide-labels
      orientation="horizontal"
      height="360"
      [steps]="chartSteps"
    ></minerva-waterfall-chart>
  \`,
})
export class WaterfallChartCashFlowComponent {
  lang = document.documentElement.lang as keyof typeof TEXT;
  text = TEXT[this.lang] ?? TEXT.en;
  months = MONTHS[this.lang] ?? MONTHS.en;
  chartSteps = [
    { label: this.text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: this.months[i], value })),
    { label: this.text.closing, kind: "total" },
  ];
}
`,svelte:`<!-- WaterfallChartCashFlow.svelte -->

<script lang="ts">
  // Monthly cash flows from an opening balance: rows instead of
  // columns (\`orientation="horizontal"\`), values in the tooltip only (\`hide-labels\`).

  import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { opening: "Opening", closing: "Closing" },
    zh: { opening: "期初", closing: "期末" },
    ja: { opening: "期首", closing: "期末" },
    fr: { opening: "Ouverture", closing: "Clôture" },
  };
  const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
    ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
    fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  };

  const FLOWS = [18, -12, 25, -30, 14, 9];

  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSteps = [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" },
  ];
<\/script>

<minerva-waterfall-chart
  id="cash"
  hide-labels
  orientation="horizontal"
  height="360"
  steps={chartSteps}
></minerva-waterfall-chart>
`,solid:`// WaterfallChartCashFlow.tsx

// Monthly cash flows from an opening balance: rows instead of
// columns (\`orientation="horizontal"\`), values in the tooltip only (\`hide-labels\`).
import type { MinervaWaterfallChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

export default function WaterfallChartCashFlow() {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSteps = [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" },
  ];

  return (
    <minerva-waterfall-chart
      id="cash"
      hide-labels
      orientation="horizontal"
      height="360"
      prop:steps={chartSteps}
    ></minerva-waterfall-chart>
  );
}
`,html:`<minerva-waterfall-chart
  id="cash"
  hide-labels
  orientation="horizontal"
  height="360"
></minerva-waterfall-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Monthly cash flows from an opening balance: rows instead of
  // columns (\`orientation="horizontal"\`), values in the tooltip only (\`hide-labels\`).
  const TEXT = {
    en: { opening: "Opening", closing: "Closing" },
    zh: { opening: "期初", closing: "期末" },
    ja: { opening: "期首", closing: "期末" },
    fr: { opening: "Ouverture", closing: "Clôture" },
  };
  const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
    ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
    fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  };

  const FLOWS = [18, -12, 25, -30, 14, 9];

  const lang = document.documentElement.lang;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = document.querySelector("#cash");
  chart.steps = [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" },
  ];
<\/script>
`}})))()}n();export{t as default};