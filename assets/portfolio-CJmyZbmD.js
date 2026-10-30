import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BubbleChartPortfolio.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.

import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

const assetText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = text.assets.map((name, i) => ({
  name,
  data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
}));
const chartOptions = {
  xAxis: { title: text.risk },
  yAxis: { title: text.return },
};
const onClick = (event: Event) => {
  const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
  if (item) assetText.value = \`\${item.seriesName}: \${item.value} %\`;
};

onMounted(() => {
  assetText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-bubble-chart
      id="portfolio"
      height="300"
      :series.prop="chartSeries"
      :options.prop="chartOptions"
      @minerva-point-click="onClick"
    ></minerva-bubble-chart>
    <output id="asset" aria-live="polite">{{ assetText }}</output>
  </div>
</template>
`,angular:`// bubble-chart-portfolio.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.
import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

@Component({
  selector: "app-bubble-chart-portfolio",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-bubble-chart
        id="portfolio"
        height="300"
        [series]="chartSeries"
        [options]="chartOptions"
        (minerva-point-click)="onClick($event)"
      ></minerva-bubble-chart>
      <output id="asset" aria-live="polite">{{ assetText }}</output>
    </div>
  \`,
})
export class BubbleChartPortfolioComponent implements AfterViewInit {
  assetText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = this.text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  chartOptions = {
    xAxis: { title: this.text.risk },
    yAxis: { title: this.text.return },
  };
  onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) this.assetText = \`\${item.seriesName}: \${item.value} %\`;
  };

  ngAfterViewInit(): void {
    this.assetText = this.text.hint;
  }
}
`,svelte:`<!-- BubbleChartPortfolio.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // A portfolio: risk against return, bubbles sized by the share of each
  // asset; minerva-point-click reports the clicked asset.

  import type {
    ChartHoverEvent,
    MinervaBubbleChart,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      risk: "Risk (volatility %)",
      return: "Expected return %",
      hint: "Click a bubble",
      assets: [
        "Bonds",
        "Index fund",
        "Real estate",
        "Tech stocks",
        "Gold",
        "Start-ups",
      ],
    },
    zh: {
      risk: "风险（波动率 %）",
      return: "预期收益 %",
      hint: "点击一个气泡",
      assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
    },
    ja: {
      risk: "リスク（ボラティリティ %）",
      return: "期待リターン %",
      hint: "バブルをクリックします",
      assets: [
        "債券",
        "インデックスファンド",
        "不動産",
        "ハイテク株",
        "金",
        "スタートアップ",
      ],
    },
    fr: {
      risk: "Risque (volatilité %)",
      return: "Rendement attendu %",
      hint: "Cliquez sur une bulle",
      assets: [
        "Obligations",
        "Fonds indiciel",
        "Immobilier",
        "Actions tech",
        "Or",
        "Start-up",
      ],
    },
  };

  // risk, return, share of the portfolio (%)
  const ASSETS = [
    [4, 3, 30],
    [15, 7, 25],
    [12, 6, 20],
    [28, 12, 15],
    [16, 4, 5],
    [45, 18, 5],
  ];

  let assetText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  const chartOptions = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  const onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) assetText = \`\${item.seriesName}: \${item.value} %\`;
  };

  onMount(() => {
    assetText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-bubble-chart
    id="portfolio"
    height="300"
    series={chartSeries}
    options={chartOptions}
    onminerva-point-click={onClick}
  ></minerva-bubble-chart>
  <output id="asset" aria-live="polite">{assetText}</output>
</div>
`,solid:`// BubbleChartPortfolio.tsx

import { createSignal, onMount } from "solid-js";

// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.
import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

export default function BubbleChartPortfolio() {
  const [assetText, setAssetText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  const chartOptions = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  const onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) setAssetText(\`\${item.seriesName}: \${item.value} %\`);
  };

  onMount(() => {
    setAssetText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-bubble-chart
        id="portfolio"
        height="300"
        prop:series={chartSeries}
        prop:options={chartOptions}
        on:minerva-point-click={onClick}
      ></minerva-bubble-chart>
      <output id="asset" aria-live="polite">
        {assetText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-bubble-chart id="portfolio" height="300"></minerva-bubble-chart>
  <output id="asset" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A portfolio: risk against return, bubbles sized by the share of each
  // asset; minerva-point-click reports the clicked asset.
  const TEXT = {
    en: {
      risk: "Risk (volatility %)",
      return: "Expected return %",
      hint: "Click a bubble",
      assets: [
        "Bonds",
        "Index fund",
        "Real estate",
        "Tech stocks",
        "Gold",
        "Start-ups",
      ],
    },
    zh: {
      risk: "风险（波动率 %）",
      return: "预期收益 %",
      hint: "点击一个气泡",
      assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
    },
    ja: {
      risk: "リスク（ボラティリティ %）",
      return: "期待リターン %",
      hint: "バブルをクリックします",
      assets: [
        "債券",
        "インデックスファンド",
        "不動産",
        "ハイテク株",
        "金",
        "スタートアップ",
      ],
    },
    fr: {
      risk: "Risque (volatilité %)",
      return: "Rendement attendu %",
      hint: "Cliquez sur une bulle",
      assets: [
        "Obligations",
        "Fonds indiciel",
        "Immobilier",
        "Actions tech",
        "Or",
        "Start-up",
      ],
    },
  };

  // risk, return, share of the portfolio (%)
  const ASSETS = [
    [4, 3, 30],
    [15, 7, 25],
    [12, 6, 20],
    [28, 12, 15],
    [16, 4, 5],
    [45, 18, 5],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#portfolio");
  const asset = document.querySelector("#asset");
  chart.series = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  chart.options = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  asset.textContent = text.hint;
  const onClick = (event) => {
    const item = event.detail.items[0];
    if (item) asset.textContent = \`\${item.seriesName}: \${item.value} %\`;
  };
  chart.addEventListener("minerva-point-click", onClick);
<\/script>
`}})))()}n();export{t as default};