import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- MixedChartClimate.vue -->

<script setup lang="ts">
// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.

import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

const lang = document.documentElement.lang as keyof typeof TEXT;
const text = TEXT[lang] ?? TEXT.en;
const months = MONTHS[lang] ?? MONTHS.en;
const chartSeries = [
  {
    name: text.rain,
    type: "bar",
    color: "var(--chart-series-2, #0ea5e9)",
    data: RAIN.map((y, i) => ({ x: months[i], y })),
  },
  {
    name: text.temperature,
    type: "line",
    curve: "smooth",
    yAxis: "right",
    color: "var(--chart-series-4, #ef4444)",
    data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
  },
];
const chartOptions = { xAxis: { type: "category" }, crosshair: true };
<\/script>

<template>
  <minerva-mixed-chart
    id="climate"
    height="300"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-mixed-chart>
</template>
`,angular:`// mixed-chart-climate.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

@Component({
  selector: "app-mixed-chart-climate",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-mixed-chart
      id="climate"
      height="300"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-mixed-chart>
  \`,
})
export class MixedChartClimateComponent {
  lang = document.documentElement.lang as keyof typeof TEXT;
  text = TEXT[this.lang] ?? TEXT.en;
  months = MONTHS[this.lang] ?? MONTHS.en;
  chartSeries = [
    {
      name: this.text.rain,
      type: "bar",
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: this.months[i], y })),
    },
    {
      name: this.text.temperature,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: this.months[i], y })),
    },
  ];
  chartOptions = { xAxis: { type: "category" }, crosshair: true };
}
`,svelte:`<!-- MixedChartClimate.svelte -->

<script lang="ts">
  // A climate chart: monthly precipitation as bars, the mean temperature as
  // a smooth line on the right axis; the crosshair reads both.

  import type { MinervaMixedChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
    zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
    ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
    fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
  };
  const MONTHS = {
    en: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    zh: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    ja: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    fr: [
      "janv.",
      "févr.",
      "mars",
      "avr.",
      "mai",
      "juin",
      "juil.",
      "août",
      "sept.",
      "oct.",
      "nov.",
      "déc.",
    ],
  };

  const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
  const TEMPERATURE = [
    3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
  ];

  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSeries = [
    {
      name: text.rain,
      type: "bar",
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
  const chartOptions = { xAxis: { type: "category" }, crosshair: true };
<\/script>

<minerva-mixed-chart
  id="climate"
  height="300"
  series={chartSeries}
  options={chartOptions}
></minerva-mixed-chart>
`,solid:`// MixedChartClimate.tsx

// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

export default function MixedChartClimate() {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSeries = [
    {
      name: text.rain,
      type: "bar",
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
  const chartOptions = { xAxis: { type: "category" }, crosshair: true };

  return (
    <minerva-mixed-chart
      id="climate"
      height="300"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-mixed-chart>
  );
}
`,html:`<minerva-mixed-chart id="climate" height="300"></minerva-mixed-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A climate chart: monthly precipitation as bars, the mean temperature as
  // a smooth line on the right axis; the crosshair reads both.
  const TEXT = {
    en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
    zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
    ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
    fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
  };
  const MONTHS = {
    en: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    zh: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    ja: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    fr: [
      "janv.",
      "févr.",
      "mars",
      "avr.",
      "mai",
      "juin",
      "juil.",
      "août",
      "sept.",
      "oct.",
      "nov.",
      "déc.",
    ],
  };

  const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
  const TEMPERATURE = [
    3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
  ];

  const lang = document.documentElement.lang;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = document.querySelector("#climate");
  chart.series = [
    {
      name: text.rain,
      type: "bar",
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" }, crosshair: true };
<\/script>
`}})))()}n();export{t as default};