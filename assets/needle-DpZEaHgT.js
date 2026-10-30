import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- GaugeChartNeedle.vue -->

<script setup lang="ts">
// \`needle\` adds a pointer to the arc; \`min\` / \`max\` set the scale and the
// options a wider sweep and thinner arc.

import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

const gaugeLabel =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const gaugeOptions = { sweep: 270, thickness: 0.1 };
<\/script>

<template>
  <minerva-gauge-chart
    id="speed"
    value="128"
    max="200"
    needle
    height="260"
    :label.prop="gaugeLabel"
    :options.prop="gaugeOptions"
  ></minerva-gauge-chart>
</template>
`,angular:`// gauge-chart-needle.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`needle\` adds a pointer to the arc; \`min\` / \`max\` set the scale and the
// options a wider sweep and thinner arc.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

@Component({
  selector: "app-gauge-chart-needle",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-gauge-chart
      id="speed"
      value="128"
      max="200"
      needle
      height="260"
      [label]="gaugeLabel"
      [options]="gaugeOptions"
    ></minerva-gauge-chart>
  \`,
})
export class GaugeChartNeedleComponent {
  gaugeLabel =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gaugeOptions = { sweep: 270, thickness: 0.1 };
}
`,svelte:`<!-- GaugeChartNeedle.svelte -->

<script lang="ts">
  // \`needle\` adds a pointer to the arc; \`min\` / \`max\` set the scale and the
  // options a wider sweep and thinner arc.

  import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: "Speed (km/h)",
    zh: "速度（公里/小时）",
    ja: "速度（km/h）",
    fr: "Vitesse (km/h)",
  };

  const gaugeLabel =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const gaugeOptions = { sweep: 270, thickness: 0.1 };
<\/script>

<minerva-gauge-chart
  id="speed"
  value="128"
  max="200"
  needle
  height="260"
  label={gaugeLabel}
  options={gaugeOptions}
></minerva-gauge-chart>
`,solid:`// GaugeChartNeedle.tsx

// \`needle\` adds a pointer to the arc; \`min\` / \`max\` set the scale and the
// options a wider sweep and thinner arc.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

export default function GaugeChartNeedle() {
  const gaugeLabel =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const gaugeOptions = { sweep: 270, thickness: 0.1 };

  return (
    <minerva-gauge-chart
      id="speed"
      value="128"
      max="200"
      needle
      height="260"
      prop:label={gaugeLabel}
      prop:options={gaugeOptions}
    ></minerva-gauge-chart>
  );
}
`,html:`<minerva-gauge-chart
  id="speed"
  value="128"
  max="200"
  needle
  height="260"
></minerva-gauge-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`needle\` adds a pointer to the arc; \`min\` / \`max\` set the scale and the
  // options a wider sweep and thinner arc.
  const TEXT = {
    en: "Speed (km/h)",
    zh: "速度（公里/小时）",
    ja: "速度（km/h）",
    fr: "Vitesse (km/h)",
  };

  const gauge = document.querySelector("#speed");
  gauge.label = TEXT[document.documentElement.lang] ?? TEXT.en;
  gauge.options = { sweep: 270, thickness: 0.1 };
<\/script>
`}})))()}n();export{t as default};