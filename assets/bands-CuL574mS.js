import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- GaugeChartBands.vue -->

<script setup lang="ts">
// Colored bands split the track; the value arc takes the color of its band.

import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

const gaugeLabel =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const gaugeBands = [
  { to: 60, color: "var(--success-color, #16a34a)" },
  { to: 85, color: "var(--warning-color, #f59e0b)" },
  { to: 100, color: "var(--danger-color, #dc2626)" },
];
const gaugeOptions = { format: (value) => \`\${value}%\` };
<\/script>

<template>
  <minerva-gauge-chart
    id="cpu"
    value="72"
    :label.prop="gaugeLabel"
    :bands.prop="gaugeBands"
    :options.prop="gaugeOptions"
  ></minerva-gauge-chart>
</template>
`,angular:`// gauge-chart-bands.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Colored bands split the track; the value arc takes the color of its band.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

@Component({
  selector: "app-gauge-chart-bands",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-gauge-chart
      id="cpu"
      value="72"
      [label]="gaugeLabel"
      [bands]="gaugeBands"
      [options]="gaugeOptions"
    ></minerva-gauge-chart>
  \`,
})
export class GaugeChartBandsComponent {
  gaugeLabel =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gaugeBands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  gaugeOptions = { format: (value) => \`\${value}%\` };
}
`,svelte:`<!-- GaugeChartBands.svelte -->

<script lang="ts">
  // Colored bands split the track; the value arc takes the color of its band.

  import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: "CPU load",
    zh: "CPU 负载",
    ja: "CPU 負荷",
    fr: "Charge CPU",
  };

  const gaugeLabel =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const gaugeBands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  const gaugeOptions = { format: (value) => \`\${value}%\` };
<\/script>

<minerva-gauge-chart
  id="cpu"
  value="72"
  label={gaugeLabel}
  bands={gaugeBands}
  options={gaugeOptions}
></minerva-gauge-chart>
`,solid:`// GaugeChartBands.tsx

// Colored bands split the track; the value arc takes the color of its band.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

export default function GaugeChartBands() {
  const gaugeLabel =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const gaugeBands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  const gaugeOptions = { format: (value) => \`\${value}%\` };

  return (
    <minerva-gauge-chart
      id="cpu"
      value="72"
      prop:label={gaugeLabel}
      prop:bands={gaugeBands}
      prop:options={gaugeOptions}
    ></minerva-gauge-chart>
  );
}
`,html:`<minerva-gauge-chart id="cpu" value="72"></minerva-gauge-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Colored bands split the track; the value arc takes the color of its band.
  const TEXT = {
    en: "CPU load",
    zh: "CPU 负载",
    ja: "CPU 負荷",
    fr: "Charge CPU",
  };

  const gauge = document.querySelector("#cpu");
  gauge.label = TEXT[document.documentElement.lang] ?? TEXT.en;
  gauge.bands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  gauge.options = { format: (value) => \`\${value}%\` };
<\/script>
`}})))()}n();export{t as default};