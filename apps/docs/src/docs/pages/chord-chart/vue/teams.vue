<script setup lang="ts">
// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import { computed } from "vue";
import { ChordChart, useI18n } from "minerva-design/vue";

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

const { language } = useI18n();
const groups = computed(() => TEAMS[language.value] ?? TEAMS.en);
</script>

<template>
  <ChordChart :groups="groups" :matrix="MATRIX" />
</template>
