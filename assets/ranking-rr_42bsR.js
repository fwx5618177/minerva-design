import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- HorizontalBarChartRanking.vue -->

<script setup lang="ts">
// <minerva-horizontal-bar-chart>: categories down the left side, long names
// stay readable; \`labels\` writes the value at the end of every bar.

import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    views: "Page views",
    pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
  },
  zh: {
    views: "浏览量",
    pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
  },
  ja: {
    views: "ページビュー",
    pages: [
      "ホーム",
      "料金",
      "ドキュメント",
      "ブログ",
      "採用情報",
      "お問い合わせ",
    ],
  },
  fr: {
    views: "Pages vues",
    pages: [
      "Accueil",
      "Tarifs",
      "Documentation",
      "Blog",
      "Carrières",
      "Contact",
    ],
  },
};

const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  {
    name: text.views,
    data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
  },
];
const chartOptions = { xAxis: { type: "category" } };
<\/script>

<template>
  <minerva-horizontal-bar-chart
    id="pages"
    labels
    height="300"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-horizontal-bar-chart>
</template>
`,angular:`// horizontal-bar-chart-ranking.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// <minerva-horizontal-bar-chart>: categories down the left side, long names
// stay readable; \`labels\` writes the value at the end of every bar.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    views: "Page views",
    pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
  },
  zh: {
    views: "浏览量",
    pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
  },
  ja: {
    views: "ページビュー",
    pages: [
      "ホーム",
      "料金",
      "ドキュメント",
      "ブログ",
      "採用情報",
      "お問い合わせ",
    ],
  },
  fr: {
    views: "Pages vues",
    pages: [
      "Accueil",
      "Tarifs",
      "Documentation",
      "Blog",
      "Carrières",
      "Contact",
    ],
  },
};

const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

@Component({
  selector: "app-horizontal-bar-chart-ranking",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-horizontal-bar-chart
      id="pages"
      labels
      height="300"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-horizontal-bar-chart>
  \`,
})
export class HorizontalBarChartRankingComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    {
      name: this.text.views,
      data: VIEWS.map((y, i) => ({ x: this.text.pages[i], y })),
    },
  ];
  chartOptions = { xAxis: { type: "category" } };
}
`,svelte:`<!-- HorizontalBarChartRanking.svelte -->

<script lang="ts">
  // <minerva-horizontal-bar-chart>: categories down the left side, long names
  // stay readable; \`labels\` writes the value at the end of every bar.

  import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      views: "Page views",
      pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
    },
    zh: {
      views: "浏览量",
      pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
    },
    ja: {
      views: "ページビュー",
      pages: [
        "ホーム",
        "料金",
        "ドキュメント",
        "ブログ",
        "採用情報",
        "お問い合わせ",
      ],
    },
    fr: {
      views: "Pages vues",
      pages: [
        "Accueil",
        "Tarifs",
        "Documentation",
        "Blog",
        "Carrières",
        "Contact",
      ],
    },
  };

  const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
  const chartOptions = { xAxis: { type: "category" } };
<\/script>

<minerva-horizontal-bar-chart
  id="pages"
  labels
  height="300"
  series={chartSeries}
  options={chartOptions}
></minerva-horizontal-bar-chart>
`,solid:`// HorizontalBarChartRanking.tsx

// <minerva-horizontal-bar-chart>: categories down the left side, long names
// stay readable; \`labels\` writes the value at the end of every bar.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    views: "Page views",
    pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
  },
  zh: {
    views: "浏览量",
    pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
  },
  ja: {
    views: "ページビュー",
    pages: [
      "ホーム",
      "料金",
      "ドキュメント",
      "ブログ",
      "採用情報",
      "お問い合わせ",
    ],
  },
  fr: {
    views: "Pages vues",
    pages: [
      "Accueil",
      "Tarifs",
      "Documentation",
      "Blog",
      "Carrières",
      "Contact",
    ],
  },
};

const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

export default function HorizontalBarChartRanking() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
  const chartOptions = { xAxis: { type: "category" } };

  return (
    <minerva-horizontal-bar-chart
      id="pages"
      labels
      height="300"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-horizontal-bar-chart>
  );
}
`,html:`<minerva-horizontal-bar-chart
  id="pages"
  labels
  height="300"
></minerva-horizontal-bar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // <minerva-horizontal-bar-chart>: categories down the left side, long names
  // stay readable; \`labels\` writes the value at the end of every bar.
  const TEXT = {
    en: {
      views: "Page views",
      pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
    },
    zh: {
      views: "浏览量",
      pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
    },
    ja: {
      views: "ページビュー",
      pages: [
        "ホーム",
        "料金",
        "ドキュメント",
        "ブログ",
        "採用情報",
        "お問い合わせ",
      ],
    },
    fr: {
      views: "Pages vues",
      pages: [
        "Accueil",
        "Tarifs",
        "Documentation",
        "Blog",
        "Carrières",
        "Contact",
      ],
    },
  };

  const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#pages");
  chart.series = [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" } };
<\/script>
`}})))()}n();export{t as default};