import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ScatterChartClusters.vue -->

<script setup lang="ts">
// Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.

import type { MinervaScatterChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { teamA: "Team A", teamB: "Team B", hours: "Hours", score: "Score" },
  zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
  ja: { teamA: "チームA", teamB: "チームB", hours: "時間", score: "スコア" },
  fr: { teamA: "Équipe A", teamB: "Équipe B", hours: "Heures", score: "Score" },
};

// deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i): [number, number] => [
    Math.round((cx + 6 * Math.sin(seed + i * 2.3)) * 10) / 10,
    Math.round((cy + 9 * Math.cos(seed + i * 1.7)) * 10) / 10,
  ]);

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.teamA, data: cluster(12, 62, 1) },
  { name: text.teamB, data: cluster(26, 80, 4) },
];
const chartOptions = {
  xAxis: { title: text.hours },
  yAxis: { title: text.score },
};
<\/script>

<template>
  <minerva-scatter-chart
    id="clusters"
    height="300"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-scatter-chart>
</template>
`,angular:`// scatter-chart-clusters.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.
import type { MinervaScatterChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { teamA: "Team A", teamB: "Team B", hours: "Hours", score: "Score" },
  zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
  ja: { teamA: "チームA", teamB: "チームB", hours: "時間", score: "スコア" },
  fr: { teamA: "Équipe A", teamB: "Équipe B", hours: "Heures", score: "Score" },
};

// deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i): [number, number] => [
    Math.round((cx + 6 * Math.sin(seed + i * 2.3)) * 10) / 10,
    Math.round((cy + 9 * Math.cos(seed + i * 1.7)) * 10) / 10,
  ]);

@Component({
  selector: "app-scatter-chart-clusters",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-scatter-chart
      id="clusters"
      height="300"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-scatter-chart>
  \`,
})
export class ScatterChartClustersComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.teamA, data: cluster(12, 62, 1) },
    { name: this.text.teamB, data: cluster(26, 80, 4) },
  ];
  chartOptions = {
    xAxis: { title: this.text.hours },
    yAxis: { title: this.text.score },
  };
}
`,svelte:`<!-- ScatterChartClusters.svelte -->

<script lang="ts">
  // Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.

  import type { MinervaScatterChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { teamA: "Team A", teamB: "Team B", hours: "Hours", score: "Score" },
    zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
    ja: { teamA: "チームA", teamB: "チームB", hours: "時間", score: "スコア" },
    fr: { teamA: "Équipe A", teamB: "Équipe B", hours: "Heures", score: "Score" },
  };

  // deterministic pseudo-random clusters
  const cluster = (cx: number, cy: number, seed: number) =>
    Array.from({ length: 40 }, (_, i): [number, number] => [
      Math.round((cx + 6 * Math.sin(seed + i * 2.3)) * 10) / 10,
      Math.round((cy + 9 * Math.cos(seed + i * 1.7)) * 10) / 10,
    ]);

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.teamA, data: cluster(12, 62, 1) },
    { name: text.teamB, data: cluster(26, 80, 4) },
  ];
  const chartOptions = {
    xAxis: { title: text.hours },
    yAxis: { title: text.score },
  };
<\/script>

<minerva-scatter-chart
  id="clusters"
  height="300"
  series={chartSeries}
  options={chartOptions}
></minerva-scatter-chart>
`,solid:`// ScatterChartClusters.tsx

// Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.
import type { MinervaScatterChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { teamA: "Team A", teamB: "Team B", hours: "Hours", score: "Score" },
  zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
  ja: { teamA: "チームA", teamB: "チームB", hours: "時間", score: "スコア" },
  fr: { teamA: "Équipe A", teamB: "Équipe B", hours: "Heures", score: "Score" },
};

// deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i): [number, number] => [
    Math.round((cx + 6 * Math.sin(seed + i * 2.3)) * 10) / 10,
    Math.round((cy + 9 * Math.cos(seed + i * 1.7)) * 10) / 10,
  ]);

export default function ScatterChartClusters() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.teamA, data: cluster(12, 62, 1) },
    { name: text.teamB, data: cluster(26, 80, 4) },
  ];
  const chartOptions = {
    xAxis: { title: text.hours },
    yAxis: { title: text.score },
  };

  return (
    <minerva-scatter-chart
      id="clusters"
      height="300"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-scatter-chart>
  );
}
`,html:`<minerva-scatter-chart id="clusters" height="300"></minerva-scatter-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.
  const TEXT = {
    en: { teamA: "Team A", teamB: "Team B", hours: "Hours", score: "Score" },
    zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
    ja: { teamA: "チームA", teamB: "チームB", hours: "時間", score: "スコア" },
    fr: { teamA: "Équipe A", teamB: "Équipe B", hours: "Heures", score: "Score" },
  };

  // deterministic pseudo-random clusters
  const cluster = (cx, cy, seed) =>
    Array.from({ length: 40 }, (_, i) => [
      Math.round((cx + 6 * Math.sin(seed + i * 2.3)) * 10) / 10,
      Math.round((cy + 9 * Math.cos(seed + i * 1.7)) * 10) / 10,
    ]);

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#clusters");
  chart.series = [
    { name: text.teamA, data: cluster(12, 62, 1) },
    { name: text.teamB, data: cluster(26, 80, 4) },
  ];
  chart.options = {
    xAxis: { title: text.hours },
    yAxis: { title: text.score },
  };
<\/script>
`}})))()}n();export{t as default};