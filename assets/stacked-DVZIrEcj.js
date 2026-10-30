import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- Bar3dChartStacked.vue -->

<script setup lang="ts">
// Two series on the same cells are stacked: sales in stores and online per
// product and year; \`bar-width\` thins the bars, the legend toggles a channel.

import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    channels: ["Stores", "Online"],
    years: ["2023", "2024", "2025"],
    products: ["Shoes", "Bags", "Watches"],
  },
  zh: {
    channels: ["门店", "线上"],
    years: ["2023", "2024", "2025"],
    products: ["鞋子", "包袋", "手表"],
  },
  ja: {
    channels: ["店舗", "オンライン"],
    years: ["2023", "2024", "2025"],
    products: ["靴", "バッグ", "時計"],
  },
  fr: {
    channels: ["Magasins", "En ligne"],
    years: ["2023", "2024", "2025"],
    products: ["Chaussures", "Sacs", "Montres"],
  },
};

// per channel: products (rows) × years (columns), k units
const CHANNELS = [
  [
    [40, 38, 35],
    [22, 24, 20],
    [15, 14, 12],
  ],
  [
    [18, 27, 36],
    [9, 14, 21],
    [6, 9, 13],
  ],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = text.channels.map((name, c) => ({
  name,
  data: CHANNELS[c].flatMap((row, i) => row.map((z, j) => ({ x: i, y: j, z }))),
}));
const chartOptions = {
  xAxis: { categories: text.products },
  yAxis: { categories: text.years },
};
<\/script>

<template>
  <minerva-bar-3d-chart
    id="channels"
    bar-width="0.55"
    height="420"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-bar-3d-chart>
</template>
`,angular:`// bar-3d-chart-stacked.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Two series on the same cells are stacked: sales in stores and online per
// product and year; \`bar-width\` thins the bars, the legend toggles a channel.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    channels: ["Stores", "Online"],
    years: ["2023", "2024", "2025"],
    products: ["Shoes", "Bags", "Watches"],
  },
  zh: {
    channels: ["门店", "线上"],
    years: ["2023", "2024", "2025"],
    products: ["鞋子", "包袋", "手表"],
  },
  ja: {
    channels: ["店舗", "オンライン"],
    years: ["2023", "2024", "2025"],
    products: ["靴", "バッグ", "時計"],
  },
  fr: {
    channels: ["Magasins", "En ligne"],
    years: ["2023", "2024", "2025"],
    products: ["Chaussures", "Sacs", "Montres"],
  },
};

// per channel: products (rows) × years (columns), k units
const CHANNELS = [
  [
    [40, 38, 35],
    [22, 24, 20],
    [15, 14, 12],
  ],
  [
    [18, 27, 36],
    [9, 14, 21],
    [6, 9, 13],
  ],
];

@Component({
  selector: "app-bar-3d-chart-stacked",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-bar-3d-chart
      id="channels"
      bar-width="0.55"
      height="420"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-bar-3d-chart>
  \`,
})
export class Bar3dChartStackedComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = this.text.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) =>
      row.map((z, j) => ({ x: i, y: j, z })),
    ),
  }));
  chartOptions = {
    xAxis: { categories: this.text.products },
    yAxis: { categories: this.text.years },
  };
}
`,svelte:`<!-- Bar3dChartStacked.svelte -->

<script lang="ts">
  // Two series on the same cells are stacked: sales in stores and online per
  // product and year; \`bar-width\` thins the bars, the legend toggles a channel.

  import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

  const TEXT = {
    en: {
      channels: ["Stores", "Online"],
      years: ["2023", "2024", "2025"],
      products: ["Shoes", "Bags", "Watches"],
    },
    zh: {
      channels: ["门店", "线上"],
      years: ["2023", "2024", "2025"],
      products: ["鞋子", "包袋", "手表"],
    },
    ja: {
      channels: ["店舗", "オンライン"],
      years: ["2023", "2024", "2025"],
      products: ["靴", "バッグ", "時計"],
    },
    fr: {
      channels: ["Magasins", "En ligne"],
      years: ["2023", "2024", "2025"],
      products: ["Chaussures", "Sacs", "Montres"],
    },
  };

  // per channel: products (rows) × years (columns), k units
  const CHANNELS = [
    [
      [40, 38, 35],
      [22, 24, 20],
      [15, 14, 12],
    ],
    [
      [18, 27, 36],
      [9, 14, 21],
      [6, 9, 13],
    ],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = text.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) => row.map((z, j) => ({ x: i, y: j, z }))),
  }));
  const chartOptions = {
    xAxis: { categories: text.products },
    yAxis: { categories: text.years },
  };
<\/script>

<minerva-bar-3d-chart
  id="channels"
  bar-width="0.55"
  height="420"
  series={chartSeries}
  options={chartOptions}
></minerva-bar-3d-chart>
`,solid:`// Bar3dChartStacked.tsx

// Two series on the same cells are stacked: sales in stores and online per
// product and year; \`bar-width\` thins the bars, the legend toggles a channel.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    channels: ["Stores", "Online"],
    years: ["2023", "2024", "2025"],
    products: ["Shoes", "Bags", "Watches"],
  },
  zh: {
    channels: ["门店", "线上"],
    years: ["2023", "2024", "2025"],
    products: ["鞋子", "包袋", "手表"],
  },
  ja: {
    channels: ["店舗", "オンライン"],
    years: ["2023", "2024", "2025"],
    products: ["靴", "バッグ", "時計"],
  },
  fr: {
    channels: ["Magasins", "En ligne"],
    years: ["2023", "2024", "2025"],
    products: ["Chaussures", "Sacs", "Montres"],
  },
};

// per channel: products (rows) × years (columns), k units
const CHANNELS = [
  [
    [40, 38, 35],
    [22, 24, 20],
    [15, 14, 12],
  ],
  [
    [18, 27, 36],
    [9, 14, 21],
    [6, 9, 13],
  ],
];

export default function Bar3dChartStacked() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = text.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) =>
      row.map((z, j) => ({ x: i, y: j, z })),
    ),
  }));
  const chartOptions = {
    xAxis: { categories: text.products },
    yAxis: { categories: text.years },
  };

  return (
    <minerva-bar-3d-chart
      id="channels"
      bar-width="0.55"
      height="420"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-bar-3d-chart>
  );
}
`,html:`<minerva-bar-3d-chart
  id="channels"
  bar-width="0.55"
  height="420"
></minerva-bar-3d-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart-3d";

  // Two series on the same cells are stacked: sales in stores and online per
  // product and year; \`bar-width\` thins the bars, the legend toggles a channel.
  const TEXT = {
    en: {
      channels: ["Stores", "Online"],
      years: ["2023", "2024", "2025"],
      products: ["Shoes", "Bags", "Watches"],
    },
    zh: {
      channels: ["门店", "线上"],
      years: ["2023", "2024", "2025"],
      products: ["鞋子", "包袋", "手表"],
    },
    ja: {
      channels: ["店舗", "オンライン"],
      years: ["2023", "2024", "2025"],
      products: ["靴", "バッグ", "時計"],
    },
    fr: {
      channels: ["Magasins", "En ligne"],
      years: ["2023", "2024", "2025"],
      products: ["Chaussures", "Sacs", "Montres"],
    },
  };

  // per channel: products (rows) × years (columns), k units
  const CHANNELS = [
    [
      [40, 38, 35],
      [22, 24, 20],
      [15, 14, 12],
    ],
    [
      [18, 27, 36],
      [9, 14, 21],
      [6, 9, 13],
    ],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#channels");
  chart.series = text.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) => row.map((z, j) => ({ x: i, y: j, z }))),
  }));
  chart.options = {
    xAxis: { categories: text.products },
    yAxis: { categories: text.years },
  };
<\/script>
`}})))()}n();export{t as default};