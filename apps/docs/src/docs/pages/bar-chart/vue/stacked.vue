<script setup lang="ts">
// `stacked` piles the bars of each category (a series can still set its
// own `type`, e.g. a line).
import { computed } from "vue";
import { BarChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
  { name: text.value.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
  { name: text.value.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
]);
</script>

<template>
  <BarChart
    :series="series"
    stacked
    :x-axis="{ type: 'category', categories: text.days }"
    :height="280"
  />
</template>
