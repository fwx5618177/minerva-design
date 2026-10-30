import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CalendarHeatmapContributions.vue -->

<script setup lang="ts">
// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow \`locale\` (the page language here).

import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = DAYS;
const chartRange = 2025;
const chartLocale = text.locale;
const chartOptions = { format: (value) => \`\${value} \${text.unit}\` };
<\/script>

<template>
  <minerva-calendar-heatmap
    id="contributions"
    :data.prop="chartData"
    :range.prop="chartRange"
    :locale.prop="chartLocale"
    :options.prop="chartOptions"
  ></minerva-calendar-heatmap>
</template>
`,angular:`// calendar-heatmap-contributions.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow \`locale\` (the page language here).
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

@Component({
  selector: "app-calendar-heatmap-contributions",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-calendar-heatmap
      id="contributions"
      [data]="chartData"
      [range]="chartRange"
      [locale]="chartLocale"
      [options]="chartOptions"
    ></minerva-calendar-heatmap>
  \`,
})
export class CalendarHeatmapContributionsComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = DAYS;
  chartRange = 2025;
  chartLocale = this.text.locale;
  chartOptions = { format: (value) => \`\${value} \${this.text.unit}\` };
}
`,svelte:`<!-- CalendarHeatmapContributions.svelte -->

<script lang="ts">
  // A year of daily values, contributions-style: the month and weekday names
  // and the first day of the week follow \`locale\` (the page language here).

  import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { locale: "en-US", unit: "contributions" },
    zh: { locale: "zh-CN", unit: "次贡献" },
    ja: { locale: "ja-JP", unit: "件のコントリビューション" },
    fr: { locale: "fr-FR", unit: "contributions" },
  };

  // one value per day of 2025: busier on weekdays, deterministic
  const fraction = (value: number) => value - Math.floor(value);
  const DAYS = Array.from({ length: 365 }, (_, i) => ({
    date: Date.UTC(2025, 0, 1 + i),
    value: Math.floor(
      fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
    ),
  }));

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = DAYS;
  const chartRange = 2025;
  const chartLocale = text.locale;
  const chartOptions = { format: (value) => \`\${value} \${text.unit}\` };
<\/script>

<minerva-calendar-heatmap
  id="contributions"
  data={chartData}
  range={chartRange}
  locale={chartLocale}
  options={chartOptions}
></minerva-calendar-heatmap>
`,solid:`// CalendarHeatmapContributions.tsx

// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow \`locale\` (the page language here).
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

export default function CalendarHeatmapContributions() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = DAYS;
  const chartRange = 2025;
  const chartLocale = text.locale;
  const chartOptions = { format: (value) => \`\${value} \${text.unit}\` };

  return (
    <minerva-calendar-heatmap
      id="contributions"
      prop:data={chartData}
      prop:range={chartRange}
      prop:locale={chartLocale}
      prop:options={chartOptions}
    ></minerva-calendar-heatmap>
  );
}
`,html:`<minerva-calendar-heatmap id="contributions"></minerva-calendar-heatmap>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A year of daily values, contributions-style: the month and weekday names
  // and the first day of the week follow \`locale\` (the page language here).
  const TEXT = {
    en: { locale: "en-US", unit: "contributions" },
    zh: { locale: "zh-CN", unit: "次贡献" },
    ja: { locale: "ja-JP", unit: "件のコントリビューション" },
    fr: { locale: "fr-FR", unit: "contributions" },
  };

  // one value per day of 2025: busier on weekdays, deterministic
  const fraction = (value) => value - Math.floor(value);
  const DAYS = Array.from({ length: 365 }, (_, i) => ({
    date: Date.UTC(2025, 0, 1 + i),
    value: Math.floor(
      fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
    ),
  }));

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#contributions");
  chart.data = DAYS;
  chart.range = 2025;
  chart.locale = text.locale;
  chart.options = { format: (value) => \`\${value} \${text.unit}\` };
<\/script>
`}})))()}n();export{t as default};