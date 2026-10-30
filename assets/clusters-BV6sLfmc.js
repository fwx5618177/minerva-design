import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.
import { computed } from "vue";
import { ScatterChart, useI18n } from "minerva-design/vue";

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
const teamA = cluster(12, 62, 1);
const teamB = cluster(26, 80, 4);

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.teamA, data: teamA },
  { name: text.value.teamB, data: teamB },
]);
<\/script>

<template>
  <ScatterChart
    :series="series"
    :x-axis="{ title: text.hours }"
    :y-axis="{ title: text.score }"
    :height="300"
  />
</template>
`})))()}n();export{t as default};