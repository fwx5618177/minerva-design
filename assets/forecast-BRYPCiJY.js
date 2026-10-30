import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- RangeAreaChartForecast.vue -->

<script setup lang="ts">
// A forecast with its uncertainty: the band (\`y0\` - \`y\`) widens with the
// horizon; the actual values and the forecast are lines (\`type: "line"\`).

import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
  zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
  ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
  fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
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

const ACTUAL = [120, 132, 128, 141, 150, 158];
const FORECAST = [158, 163, 169, 172, 178, 185, 190];

const lang = document.documentElement.lang as keyof typeof TEXT;
const text = TEXT[lang] ?? TEXT.en;
const months = MONTHS[lang] ?? MONTHS.en;
const chartSeries = [
  {
    name: text.band,
    data: FORECAST.map((y, i) => ({
      x: months[5 + i],
      y0: y - 4 * i,
      y: y + 4 * i,
    })),
  },
  {
    name: text.actual,
    type: "line",
    data: ACTUAL.map((y, i) => ({ x: months[i], y })),
  },
  {
    name: text.forecast,
    type: "line",
    lineWidth: 1,
    data: FORECAST.map((y, i) => ({ x: months[5 + i], y })),
  },
];
const chartOptions = { xAxis: { type: "category", categories: months } };
<\/script>

<template>
  <minerva-range-area-chart
    id="forecast"
    height="300"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-range-area-chart>
</template>
`,angular:`// range-area-chart-forecast.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A forecast with its uncertainty: the band (\`y0\` - \`y\`) widens with the
// horizon; the actual values and the forecast are lines (\`type: "line"\`).
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
  zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
  ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
  fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
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

const ACTUAL = [120, 132, 128, 141, 150, 158];
const FORECAST = [158, 163, 169, 172, 178, 185, 190];

@Component({
  selector: "app-range-area-chart-forecast",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-range-area-chart
      id="forecast"
      height="300"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-range-area-chart>
  \`,
})
export class RangeAreaChartForecastComponent {
  lang = document.documentElement.lang as keyof typeof TEXT;
  text = TEXT[this.lang] ?? TEXT.en;
  months = MONTHS[this.lang] ?? MONTHS.en;
  chartSeries = [
    {
      name: this.text.band,
      data: FORECAST.map((y, i) => ({
        x: this.months[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: this.text.actual,
      type: "line",
      data: ACTUAL.map((y, i) => ({ x: this.months[i], y })),
    },
    {
      name: this.text.forecast,
      type: "line",
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: this.months[5 + i], y })),
    },
  ];
  chartOptions = { xAxis: { type: "category", categories: this.months } };
}
`,svelte:`<!-- RangeAreaChartForecast.svelte -->

<script lang="ts">
  // A forecast with its uncertainty: the band (\`y0\` - \`y\`) widens with the
  // horizon; the actual values and the forecast are lines (\`type: "line"\`).

  import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
    zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
    ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
    fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
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

  const ACTUAL = [120, 132, 128, 141, 150, 158];
  const FORECAST = [158, 163, 169, 172, 178, 185, 190];

  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSeries = [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line",
      data: ACTUAL.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.forecast,
      type: "line",
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months[5 + i], y })),
    },
  ];
  const chartOptions = { xAxis: { type: "category", categories: months } };
<\/script>

<minerva-range-area-chart
  id="forecast"
  height="300"
  series={chartSeries}
  options={chartOptions}
></minerva-range-area-chart>
`,solid:`// RangeAreaChartForecast.tsx

// A forecast with its uncertainty: the band (\`y0\` - \`y\`) widens with the
// horizon; the actual values and the forecast are lines (\`type: "line"\`).
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
  zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
  ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
  fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
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

const ACTUAL = [120, 132, 128, 141, 150, 158];
const FORECAST = [158, 163, 169, 172, 178, 185, 190];

export default function RangeAreaChartForecast() {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSeries = [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line",
      data: ACTUAL.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.forecast,
      type: "line",
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months[5 + i], y })),
    },
  ];
  const chartOptions = { xAxis: { type: "category", categories: months } };

  return (
    <minerva-range-area-chart
      id="forecast"
      height="300"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-range-area-chart>
  );
}
`,html:`<minerva-range-area-chart id="forecast" height="300"></minerva-range-area-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A forecast with its uncertainty: the band (\`y0\` - \`y\`) widens with the
  // horizon; the actual values and the forecast are lines (\`type: "line"\`).
  const TEXT = {
    en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
    zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
    ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
    fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
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

  const ACTUAL = [120, 132, 128, 141, 150, 158];
  const FORECAST = [158, 163, 169, 172, 178, 185, 190];

  const lang = document.documentElement.lang;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = document.querySelector("#forecast");
  chart.series = [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line",
      data: ACTUAL.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.forecast,
      type: "line",
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months[5 + i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category", categories: months } };
<\/script>
`}})))()}n();export{t as default};