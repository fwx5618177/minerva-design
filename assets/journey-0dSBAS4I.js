import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SankeyChartJourney.vue -->

<script setup lang="ts">
// A user journey with drop-offs: \`align="left"\` keeps every step in its
// column, \`link-color="source"\` colors a flow like the page it leaves.

import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
];

const steps =
  STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
const chartNodes = steps.map((name, i) => ({
  name,
  ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
}));
const chartLinks = FLOWS.map(([source, target, value]) => ({
  source,
  target,
  value,
}));
<\/script>

<template>
  <minerva-sankey-chart
    id="journey"
    align="left"
    link-color="source"
    :nodes.prop="chartNodes"
    :links.prop="chartLinks"
  ></minerva-sankey-chart>
</template>
`,angular:`// sankey-chart-journey.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A user journey with drop-offs: \`align="left"\` keeps every step in its
// column, \`link-color="source"\` colors a flow like the page it leaves.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
];

@Component({
  selector: "app-sankey-chart-journey",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-sankey-chart
      id="journey"
      align="left"
      link-color="source"
      [nodes]="chartNodes"
      [links]="chartLinks"
    ></minerva-sankey-chart>
  \`,
})
export class SankeyChartJourneyComponent {
  steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  chartNodes = this.steps.map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  }));
  chartLinks = FLOWS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
}
`,svelte:`<!-- SankeyChartJourney.svelte -->

<script lang="ts">
  // A user journey with drop-offs: \`align="left"\` keeps every step in its
  // column, \`link-color="source"\` colors a flow like the page it leaves.

  import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

  const STEPS = {
    en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
    zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
    ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
    fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
  };

  // from, to (step indexes), visitors
  const FLOWS = [
    [0, 1, 420],
    [0, 2, 310],
    [0, 5, 270],
    [1, 2, 330],
    [1, 5, 90],
    [2, 3, 380],
    [2, 5, 260],
    [3, 4, 240],
    [3, 5, 140],
  ];

  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chartNodes = steps.map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  }));
  const chartLinks = FLOWS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
<\/script>

<minerva-sankey-chart
  id="journey"
  align="left"
  link-color="source"
  nodes={chartNodes}
  links={chartLinks}
></minerva-sankey-chart>
`,solid:`// SankeyChartJourney.tsx

// A user journey with drop-offs: \`align="left"\` keeps every step in its
// column, \`link-color="source"\` colors a flow like the page it leaves.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
];

export default function SankeyChartJourney() {
  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chartNodes = steps.map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  }));
  const chartLinks = FLOWS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));

  return (
    <minerva-sankey-chart
      id="journey"
      align="left"
      link-color="source"
      prop:nodes={chartNodes}
      prop:links={chartLinks}
    ></minerva-sankey-chart>
  );
}
`,html:`<minerva-sankey-chart
  id="journey"
  align="left"
  link-color="source"
></minerva-sankey-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A user journey with drop-offs: \`align="left"\` keeps every step in its
  // column, \`link-color="source"\` colors a flow like the page it leaves.
  const STEPS = {
    en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
    zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
    ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
    fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
  };

  // from, to (step indexes), visitors
  const FLOWS = [
    [0, 1, 420],
    [0, 2, 310],
    [0, 5, 270],
    [1, 2, 330],
    [1, 5, 90],
    [2, 3, 380],
    [2, 5, 260],
    [3, 4, 240],
    [3, 5, 140],
  ];

  const steps = STEPS[document.documentElement.lang] ?? STEPS.en;
  const chart = document.querySelector("#journey");
  chart.nodes = steps.map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  }));
  chart.links = FLOWS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
<\/script>
`}})))()}n();export{t as default};