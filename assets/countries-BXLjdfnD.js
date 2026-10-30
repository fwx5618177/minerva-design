import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BubbleChartCountries.vue -->

<script setup lang="ts">
// Three values per point: wealth (x), life expectancy (y) and population
// (\`value\`, the area of the bubble); the country is the point label.

import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    gdp: "GDP per capita (k$)",
    life: "Life expectancy",
    names: [
      "Japan",
      "France",
      "China",
      "Brazil",
      "India",
      "Nigeria",
      "Germany",
      "Mexico",
    ],
  },
  zh: {
    gdp: "人均 GDP（千美元）",
    life: "预期寿命",
    names: [
      "日本",
      "法国",
      "中国",
      "巴西",
      "印度",
      "尼日利亚",
      "德国",
      "墨西哥",
    ],
  },
  ja: {
    gdp: "1 人あたり GDP（千ドル）",
    life: "平均寿命",
    names: [
      "日本",
      "フランス",
      "中国",
      "ブラジル",
      "インド",
      "ナイジェリア",
      "ドイツ",
      "メキシコ",
    ],
  },
  fr: {
    gdp: "PIB par habitant (k$)",
    life: "Espérance de vie",
    names: [
      "Japon",
      "France",
      "Chine",
      "Brésil",
      "Inde",
      "Nigeria",
      "Allemagne",
      "Mexique",
    ],
  },
};

// GDP per capita (k$), life expectancy (years), population (millions)
const COUNTRIES = [
  [34, 84.5, 124],
  [44, 82.5, 68],
  [12.6, 78.6, 1410],
  [9, 75.9, 216],
  [2.5, 70.8, 1430],
  [2.2, 53.6, 224],
  [52, 81.2, 84],
  [11.5, 75, 128],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  {
    name: text.life,
    showLabels: true,
    data: COUNTRIES.map(([x, y, value], i) => ({
      x,
      y,
      value,
      label: text.names[i],
    })),
  },
];
const chartOptions = {
  xAxis: { title: text.gdp },
  yAxis: { title: text.life, min: 50 },
};
<\/script>

<template>
  <minerva-bubble-chart
    id="countries"
    max-size="64"
    height="320"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-bubble-chart>
</template>
`,angular:`// bubble-chart-countries.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Three values per point: wealth (x), life expectancy (y) and population
// (\`value\`, the area of the bubble); the country is the point label.
import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    gdp: "GDP per capita (k$)",
    life: "Life expectancy",
    names: [
      "Japan",
      "France",
      "China",
      "Brazil",
      "India",
      "Nigeria",
      "Germany",
      "Mexico",
    ],
  },
  zh: {
    gdp: "人均 GDP（千美元）",
    life: "预期寿命",
    names: [
      "日本",
      "法国",
      "中国",
      "巴西",
      "印度",
      "尼日利亚",
      "德国",
      "墨西哥",
    ],
  },
  ja: {
    gdp: "1 人あたり GDP（千ドル）",
    life: "平均寿命",
    names: [
      "日本",
      "フランス",
      "中国",
      "ブラジル",
      "インド",
      "ナイジェリア",
      "ドイツ",
      "メキシコ",
    ],
  },
  fr: {
    gdp: "PIB par habitant (k$)",
    life: "Espérance de vie",
    names: [
      "Japon",
      "France",
      "Chine",
      "Brésil",
      "Inde",
      "Nigeria",
      "Allemagne",
      "Mexique",
    ],
  },
};

// GDP per capita (k$), life expectancy (years), population (millions)
const COUNTRIES = [
  [34, 84.5, 124],
  [44, 82.5, 68],
  [12.6, 78.6, 1410],
  [9, 75.9, 216],
  [2.5, 70.8, 1430],
  [2.2, 53.6, 224],
  [52, 81.2, 84],
  [11.5, 75, 128],
];

@Component({
  selector: "app-bubble-chart-countries",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-bubble-chart
      id="countries"
      max-size="64"
      height="320"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-bubble-chart>
  \`,
})
export class BubbleChartCountriesComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    {
      name: this.text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: this.text.names[i],
      })),
    },
  ];
  chartOptions = {
    xAxis: { title: this.text.gdp },
    yAxis: { title: this.text.life, min: 50 },
  };
}
`,svelte:`<!-- BubbleChartCountries.svelte -->

<script lang="ts">
  // Three values per point: wealth (x), life expectancy (y) and population
  // (\`value\`, the area of the bubble); the country is the point label.

  import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      gdp: "GDP per capita (k$)",
      life: "Life expectancy",
      names: [
        "Japan",
        "France",
        "China",
        "Brazil",
        "India",
        "Nigeria",
        "Germany",
        "Mexico",
      ],
    },
    zh: {
      gdp: "人均 GDP（千美元）",
      life: "预期寿命",
      names: [
        "日本",
        "法国",
        "中国",
        "巴西",
        "印度",
        "尼日利亚",
        "德国",
        "墨西哥",
      ],
    },
    ja: {
      gdp: "1 人あたり GDP（千ドル）",
      life: "平均寿命",
      names: [
        "日本",
        "フランス",
        "中国",
        "ブラジル",
        "インド",
        "ナイジェリア",
        "ドイツ",
        "メキシコ",
      ],
    },
    fr: {
      gdp: "PIB par habitant (k$)",
      life: "Espérance de vie",
      names: [
        "Japon",
        "France",
        "Chine",
        "Brésil",
        "Inde",
        "Nigeria",
        "Allemagne",
        "Mexique",
      ],
    },
  };

  // GDP per capita (k$), life expectancy (years), population (millions)
  const COUNTRIES = [
    [34, 84.5, 124],
    [44, 82.5, 68],
    [12.6, 78.6, 1410],
    [9, 75.9, 216],
    [2.5, 70.8, 1430],
    [2.2, 53.6, 224],
    [52, 81.2, 84],
    [11.5, 75, 128],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: text.names[i],
      })),
    },
  ];
  const chartOptions = {
    xAxis: { title: text.gdp },
    yAxis: { title: text.life, min: 50 },
  };
<\/script>

<minerva-bubble-chart
  id="countries"
  max-size="64"
  height="320"
  series={chartSeries}
  options={chartOptions}
></minerva-bubble-chart>
`,solid:`// BubbleChartCountries.tsx

// Three values per point: wealth (x), life expectancy (y) and population
// (\`value\`, the area of the bubble); the country is the point label.
import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    gdp: "GDP per capita (k$)",
    life: "Life expectancy",
    names: [
      "Japan",
      "France",
      "China",
      "Brazil",
      "India",
      "Nigeria",
      "Germany",
      "Mexico",
    ],
  },
  zh: {
    gdp: "人均 GDP（千美元）",
    life: "预期寿命",
    names: [
      "日本",
      "法国",
      "中国",
      "巴西",
      "印度",
      "尼日利亚",
      "德国",
      "墨西哥",
    ],
  },
  ja: {
    gdp: "1 人あたり GDP（千ドル）",
    life: "平均寿命",
    names: [
      "日本",
      "フランス",
      "中国",
      "ブラジル",
      "インド",
      "ナイジェリア",
      "ドイツ",
      "メキシコ",
    ],
  },
  fr: {
    gdp: "PIB par habitant (k$)",
    life: "Espérance de vie",
    names: [
      "Japon",
      "France",
      "Chine",
      "Brésil",
      "Inde",
      "Nigeria",
      "Allemagne",
      "Mexique",
    ],
  },
};

// GDP per capita (k$), life expectancy (years), population (millions)
const COUNTRIES = [
  [34, 84.5, 124],
  [44, 82.5, 68],
  [12.6, 78.6, 1410],
  [9, 75.9, 216],
  [2.5, 70.8, 1430],
  [2.2, 53.6, 224],
  [52, 81.2, 84],
  [11.5, 75, 128],
];

export default function BubbleChartCountries() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: text.names[i],
      })),
    },
  ];
  const chartOptions = {
    xAxis: { title: text.gdp },
    yAxis: { title: text.life, min: 50 },
  };

  return (
    <minerva-bubble-chart
      id="countries"
      max-size="64"
      height="320"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-bubble-chart>
  );
}
`,html:`<minerva-bubble-chart
  id="countries"
  max-size="64"
  height="320"
></minerva-bubble-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Three values per point: wealth (x), life expectancy (y) and population
  // (\`value\`, the area of the bubble); the country is the point label.
  const TEXT = {
    en: {
      gdp: "GDP per capita (k$)",
      life: "Life expectancy",
      names: [
        "Japan",
        "France",
        "China",
        "Brazil",
        "India",
        "Nigeria",
        "Germany",
        "Mexico",
      ],
    },
    zh: {
      gdp: "人均 GDP（千美元）",
      life: "预期寿命",
      names: [
        "日本",
        "法国",
        "中国",
        "巴西",
        "印度",
        "尼日利亚",
        "德国",
        "墨西哥",
      ],
    },
    ja: {
      gdp: "1 人あたり GDP（千ドル）",
      life: "平均寿命",
      names: [
        "日本",
        "フランス",
        "中国",
        "ブラジル",
        "インド",
        "ナイジェリア",
        "ドイツ",
        "メキシコ",
      ],
    },
    fr: {
      gdp: "PIB par habitant (k$)",
      life: "Espérance de vie",
      names: [
        "Japon",
        "France",
        "Chine",
        "Brésil",
        "Inde",
        "Nigeria",
        "Allemagne",
        "Mexique",
      ],
    },
  };

  // GDP per capita (k$), life expectancy (years), population (millions)
  const COUNTRIES = [
    [34, 84.5, 124],
    [44, 82.5, 68],
    [12.6, 78.6, 1410],
    [9, 75.9, 216],
    [2.5, 70.8, 1430],
    [2.2, 53.6, 224],
    [52, 81.2, 84],
    [11.5, 75, 128],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#countries");
  chart.series = [
    {
      name: text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: text.names[i],
      })),
    },
  ];
  chart.options = {
    xAxis: { title: text.gdp },
    yAxis: { title: text.life, min: 50 },
  };
<\/script>
`}})))()}n();export{t as default};