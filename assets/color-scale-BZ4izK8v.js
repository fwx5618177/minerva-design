import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- HeatmapChartColorScale.vue -->

<script setup lang="ts">
// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.

import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = MATRIX.flatMap((row, r) =>
  row.map((value, c) => ({
    x: text.metrics[c],
    y: text.metrics[r],
    value,
  })),
);
const chartColorScale = ["#2563eb", "#f8fafc", "#dc2626"];
const chartValueRange = [-1, 1];
const chartValueName = text.correlation;
const chartFormat = (value) => value.toFixed(2);
<\/script>

<template>
  <minerva-heatmap-chart
    id="correlation"
    radius="4"
    height="320"
    :data.prop="chartData"
    :colorScale.prop="chartColorScale"
    :valueRange.prop="chartValueRange"
    :valueName.prop="chartValueName"
    :format.prop="chartFormat"
  ></minerva-heatmap-chart>
</template>
`,angular:`// heatmap-chart-color-scale.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

@Component({
  selector: "app-heatmap-chart-color-scale",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-heatmap-chart
      id="correlation"
      radius="4"
      height="320"
      [data]="chartData"
      [colorScale]="chartColorScale"
      [valueRange]="chartValueRange"
      [valueName]="chartValueName"
      [format]="chartFormat"
    ></minerva-heatmap-chart>
  \`,
})
export class HeatmapChartColorScaleComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: this.text.metrics[c],
      y: this.text.metrics[r],
      value,
    })),
  );
  chartColorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  chartValueRange = [-1, 1];
  chartValueName = this.text.correlation;
  chartFormat = (value) => value.toFixed(2);
}
`,svelte:`<!-- HeatmapChartColorScale.svelte -->

<script lang="ts">
  // A diverging color scale over a fixed value range (-1 to 1): negative
  // correlations in blue, positive ones in red.

  import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      correlation: "Correlation",
      metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
    },
    zh: {
      correlation: "相关系数",
      metrics: ["价格", "评分", "配送", "退货", "销量"],
    },
    ja: {
      correlation: "相関係数",
      metrics: ["価格", "評価", "配送", "返品", "売上"],
    },
    fr: {
      correlation: "Corrélation",
      metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
    },
  };

  const MATRIX = [
    [1, -0.32, 0.12, 0.41, -0.58],
    [-0.32, 1, -0.44, -0.61, 0.72],
    [0.12, -0.44, 1, 0.35, -0.27],
    [0.41, -0.61, 0.35, 1, -0.49],
    [-0.58, 0.72, -0.27, -0.49, 1],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.metrics[c],
      y: text.metrics[r],
      value,
    })),
  );
  const chartColorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  const chartValueRange = [-1, 1];
  const chartValueName = text.correlation;
  const chartFormat = (value) => value.toFixed(2);
<\/script>

<minerva-heatmap-chart
  id="correlation"
  radius="4"
  height="320"
  data={chartData}
  colorScale={chartColorScale}
  valueRange={chartValueRange}
  valueName={chartValueName}
  format={chartFormat}
></minerva-heatmap-chart>
`,solid:`// HeatmapChartColorScale.tsx

// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

export default function HeatmapChartColorScale() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.metrics[c],
      y: text.metrics[r],
      value,
    })),
  );
  const chartColorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  const chartValueRange = [-1, 1];
  const chartValueName = text.correlation;
  const chartFormat = (value) => value.toFixed(2);

  return (
    <minerva-heatmap-chart
      id="correlation"
      radius="4"
      height="320"
      prop:data={chartData}
      prop:colorScale={chartColorScale}
      prop:valueRange={chartValueRange}
      prop:valueName={chartValueName}
      prop:format={chartFormat}
    ></minerva-heatmap-chart>
  );
}
`,html:`<minerva-heatmap-chart
  id="correlation"
  radius="4"
  height="320"
></minerva-heatmap-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A diverging color scale over a fixed value range (-1 to 1): negative
  // correlations in blue, positive ones in red.
  const TEXT = {
    en: {
      correlation: "Correlation",
      metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
    },
    zh: {
      correlation: "相关系数",
      metrics: ["价格", "评分", "配送", "退货", "销量"],
    },
    ja: {
      correlation: "相関係数",
      metrics: ["価格", "評価", "配送", "返品", "売上"],
    },
    fr: {
      correlation: "Corrélation",
      metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
    },
  };

  const MATRIX = [
    [1, -0.32, 0.12, 0.41, -0.58],
    [-0.32, 1, -0.44, -0.61, 0.72],
    [0.12, -0.44, 1, 0.35, -0.27],
    [0.41, -0.61, 0.35, 1, -0.49],
    [-0.58, 0.72, -0.27, -0.49, 1],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#correlation");
  chart.data = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.metrics[c],
      y: text.metrics[r],
      value,
    })),
  );
  chart.colorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  chart.valueRange = [-1, 1];
  chart.valueName = text.correlation;
  chart.format = (value) => value.toFixed(2);
<\/script>
`}})))()}n();export{t as default};