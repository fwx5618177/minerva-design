import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ChordChartTeams.vue -->

<script setup lang="ts">
// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.

import type { MinervaChordChart } from "minerva-design/web-components/chart";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

const chartGroups =
  TEAMS[document.documentElement.lang as keyof typeof TEAMS] ?? TEAMS.en;
const chartMatrix = MATRIX;
<\/script>

<template>
  <minerva-chord-chart
    id="teams"
    :groups.prop="chartGroups"
    :matrix.prop="chartMatrix"
  ></minerva-chord-chart>
</template>
`,angular:`// chord-chart-teams.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import type { MinervaChordChart } from "minerva-design/web-components/chart";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

@Component({
  selector: "app-chord-chart-teams",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-chord-chart
      id="teams"
      [groups]="chartGroups"
      [matrix]="chartMatrix"
    ></minerva-chord-chart>
  \`,
})
export class ChordChartTeamsComponent {
  chartGroups =
    TEAMS[document.documentElement.lang as keyof typeof TEAMS] ?? TEAMS.en;
  chartMatrix = MATRIX;
}
`,svelte:`<!-- ChordChartTeams.svelte -->

<script lang="ts">
  // Messages sent between teams in a week, from a square matrix (row: the
  // sender, column: the recipient); hovering a team highlights its ribbons.

  import type { MinervaChordChart } from "minerva-design/web-components/chart";

  const TEAMS = {
    en: ["Design", "Engineering", "Product", "Marketing"],
    zh: ["设计", "研发", "产品", "市场"],
    ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
    fr: ["Design", "Ingénierie", "Produit", "Marketing"],
  };
  const MATRIX = [
    [0, 42, 28, 14],
    [36, 0, 54, 8],
    [30, 48, 0, 22],
    [12, 6, 26, 0],
  ];

  const chartGroups =
    TEAMS[document.documentElement.lang as keyof typeof TEAMS] ?? TEAMS.en;
  const chartMatrix = MATRIX;
<\/script>

<minerva-chord-chart id="teams" groups={chartGroups} matrix={chartMatrix}></minerva-chord-chart>
`,solid:`// ChordChartTeams.tsx

// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import type { MinervaChordChart } from "minerva-design/web-components/chart";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export default function ChordChartTeams() {
  const chartGroups =
    TEAMS[document.documentElement.lang as keyof typeof TEAMS] ?? TEAMS.en;
  const chartMatrix = MATRIX;

  return (
    <minerva-chord-chart
      id="teams"
      prop:groups={chartGroups}
      prop:matrix={chartMatrix}
    ></minerva-chord-chart>
  );
}
`,html:`<minerva-chord-chart id="teams"></minerva-chord-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Messages sent between teams in a week, from a square matrix (row: the
  // sender, column: the recipient); hovering a team highlights its ribbons.
  const TEAMS = {
    en: ["Design", "Engineering", "Product", "Marketing"],
    zh: ["设计", "研发", "产品", "市场"],
    ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
    fr: ["Design", "Ingénierie", "Produit", "Marketing"],
  };
  const MATRIX = [
    [0, 42, 28, 14],
    [36, 0, 54, 8],
    [30, 48, 0, 22],
    [12, 6, 26, 0],
  ];

  const chart = document.querySelector("#teams");
  chart.groups = TEAMS[document.documentElement.lang] ?? TEAMS.en;
  chart.matrix = MATRIX;
<\/script>
`}})))()}n();export{t as default};