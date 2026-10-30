import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CalendarHeatmapMonths.vue -->

<script setup lang="ts">
// \`layout="months"\`: a small calendar per month; \`levels\` sets the number
// of color steps above the empty days, \`thresholds\` their bounds.

import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = STEPS;
const chartRange = ["2026-01-01", "2026-06-30"];
const chartLocale = text.locale;
const chartOptions = {
  thresholds: [4000, 6000, 8000, 10000],
  color: "var(--success-color, #16a34a)",
};
<\/script>

<template>
  <minerva-calendar-heatmap
    id="steps"
    layout="months"
    levels="5"
    height="420"
    :data.prop="chartData"
    :range.prop="chartRange"
    :locale.prop="chartLocale"
    :options.prop="chartOptions"
  ></minerva-calendar-heatmap>
</template>
`,angular:`// calendar-heatmap-months.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`layout="months"\`: a small calendar per month; \`levels\` sets the number
// of color steps above the empty days, \`thresholds\` their bounds.
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

@Component({
  selector: "app-calendar-heatmap-months",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-calendar-heatmap
      id="steps"
      layout="months"
      levels="5"
      height="420"
      [data]="chartData"
      [range]="chartRange"
      [locale]="chartLocale"
      [options]="chartOptions"
    ></minerva-calendar-heatmap>
  \`,
})
export class CalendarHeatmapMonthsComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = STEPS;
  chartRange = ["2026-01-01", "2026-06-30"];
  chartLocale = this.text.locale;
  chartOptions = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };
}
`,svelte:`<!-- CalendarHeatmapMonths.svelte -->

<script lang="ts">
  // \`layout="months"\`: a small calendar per month; \`levels\` sets the number
  // of color steps above the empty days, \`thresholds\` their bounds.

  import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { locale: "en-US" },
    zh: { locale: "zh-CN" },
    ja: { locale: "ja-JP" },
    fr: { locale: "fr-FR" },
  };

  // steps walked every day of the first half of 2026, deterministic
  const fraction = (value: number) => value - Math.floor(value);
  const STEPS = Array.from({ length: 181 }, (_, i) => ({
    date: Date.UTC(2026, 0, 1 + i),
    value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
  }));

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = STEPS;
  const chartRange = ["2026-01-01", "2026-06-30"];
  const chartLocale = text.locale;
  const chartOptions = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };
<\/script>

<minerva-calendar-heatmap
  id="steps"
  layout="months"
  levels="5"
  height="420"
  data={chartData}
  range={chartRange}
  locale={chartLocale}
  options={chartOptions}
></minerva-calendar-heatmap>
`,solid:`// CalendarHeatmapMonths.tsx

// \`layout="months"\`: a small calendar per month; \`levels\` sets the number
// of color steps above the empty days, \`thresholds\` their bounds.
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

export default function CalendarHeatmapMonths() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = STEPS;
  const chartRange = ["2026-01-01", "2026-06-30"];
  const chartLocale = text.locale;
  const chartOptions = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };

  return (
    <minerva-calendar-heatmap
      id="steps"
      layout="months"
      levels="5"
      height="420"
      prop:data={chartData}
      prop:range={chartRange}
      prop:locale={chartLocale}
      prop:options={chartOptions}
    ></minerva-calendar-heatmap>
  );
}
`,html:`<minerva-calendar-heatmap
  id="steps"
  layout="months"
  levels="5"
  height="420"
></minerva-calendar-heatmap>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`layout="months"\`: a small calendar per month; \`levels\` sets the number
  // of color steps above the empty days, \`thresholds\` their bounds.
  const TEXT = {
    en: { locale: "en-US" },
    zh: { locale: "zh-CN" },
    ja: { locale: "ja-JP" },
    fr: { locale: "fr-FR" },
  };

  // steps walked every day of the first half of 2026, deterministic
  const fraction = (value) => value - Math.floor(value);
  const STEPS = Array.from({ length: 181 }, (_, i) => ({
    date: Date.UTC(2026, 0, 1 + i),
    value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
  }));

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#steps");
  chart.data = STEPS;
  chart.range = ["2026-01-01", "2026-06-30"];
  chart.locale = text.locale;
  chart.options = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };
<\/script>
`}})))()}n();export{t as default};