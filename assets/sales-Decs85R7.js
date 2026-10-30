import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- Bar3dChartSales.vue -->

<script setup lang="ts">
// <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
// height (\`colorBy: "z"\`); the axes name the categories.

import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  {
    name: text.sales,
    colorBy: "z",
    data: SALES.flatMap((row, i) =>
      row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
    ),
  },
];
const chartOptions = {
  xAxis: { categories: text.regions },
  yAxis: { categories: text.quarters },
  zAxis: { title: text.sales },
};
<\/script>

<template>
  <minerva-bar-3d-chart
    id="sales"
    height="420"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-bar-3d-chart>
</template>
`,angular:`// bar-3d-chart-sales.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
// height (\`colorBy: "z"\`); the axes name the categories.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

@Component({
  selector: "app-bar-3d-chart-sales",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-bar-3d-chart
      id="sales"
      height="420"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-bar-3d-chart>
  \`,
})
export class Bar3dChartSalesComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    {
      name: this.text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({
          x: this.text.regions[i],
          y: this.text.quarters[j],
          z,
        })),
      ),
    },
  ];
  chartOptions = {
    xAxis: { categories: this.text.regions },
    yAxis: { categories: this.text.quarters },
    zAxis: { title: this.text.sales },
  };
}
`,svelte:`<!-- Bar3dChartSales.svelte -->

<script lang="ts">
  // <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
  // height (\`colorBy: "z"\`); the axes name the categories.

  import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

  const TEXT = {
    en: {
      sales: "Sales (k€)",
      regions: ["North", "South", "East", "West"],
      quarters: ["Q1", "Q2", "Q3", "Q4"],
    },
    zh: {
      sales: "销售额（千欧元）",
      regions: ["华北", "华南", "华东", "华西"],
      quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
    },
    ja: {
      sales: "売上（千ユーロ）",
      regions: ["北部", "南部", "東部", "西部"],
      quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
    },
    fr: {
      sales: "Ventes (k€)",
      regions: ["Nord", "Sud", "Est", "Ouest"],
      quarters: ["T1", "T2", "T3", "T4"],
    },
  };

  // sales per region (rows) and quarter (columns), k€
  const SALES = [
    [120, 135, 150, 180],
    [90, 110, 105, 130],
    [160, 170, 190, 220],
    [70, 85, 95, 100],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
      ),
    },
  ];
  const chartOptions = {
    xAxis: { categories: text.regions },
    yAxis: { categories: text.quarters },
    zAxis: { title: text.sales },
  };
<\/script>

<minerva-bar-3d-chart
  id="sales"
  height="420"
  series={chartSeries}
  options={chartOptions}
></minerva-bar-3d-chart>
`,solid:`// Bar3dChartSales.tsx

// <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
// height (\`colorBy: "z"\`); the axes name the categories.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

export default function Bar3dChartSales() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
      ),
    },
  ];
  const chartOptions = {
    xAxis: { categories: text.regions },
    yAxis: { categories: text.quarters },
    zAxis: { title: text.sales },
  };

  return (
    <minerva-bar-3d-chart
      id="sales"
      height="420"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-bar-3d-chart>
  );
}
`,html:`<minerva-bar-3d-chart id="sales" height="420"></minerva-bar-3d-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart-3d";

  // <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
  // height (\`colorBy: "z"\`); the axes name the categories.
  const TEXT = {
    en: {
      sales: "Sales (k€)",
      regions: ["North", "South", "East", "West"],
      quarters: ["Q1", "Q2", "Q3", "Q4"],
    },
    zh: {
      sales: "销售额（千欧元）",
      regions: ["华北", "华南", "华东", "华西"],
      quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
    },
    ja: {
      sales: "売上（千ユーロ）",
      regions: ["北部", "南部", "東部", "西部"],
      quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
    },
    fr: {
      sales: "Ventes (k€)",
      regions: ["Nord", "Sud", "Est", "Ouest"],
      quarters: ["T1", "T2", "T3", "T4"],
    },
  };

  // sales per region (rows) and quarter (columns), k€
  const SALES = [
    [120, 135, 150, 180],
    [90, 110, 105, 130],
    [160, 170, 190, 220],
    [70, 85, 95, 100],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#sales");
  chart.series = [
    {
      name: text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
      ),
    },
  ];
  chart.options = {
    xAxis: { categories: text.regions },
    yAxis: { categories: text.quarters },
    zAxis: { title: text.sales },
  };
<\/script>
`}})))()}n();export{t as default};