<script setup lang="ts">
// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow `locale` (the page language here).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { CalendarHeatmap } from "minerva-design/vue/charts";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const format = (value: number) => `${value} ${text.value.unit}`;
</script>

<template>
  <CalendarHeatmap
    :data="DAYS"
    :range="2025"
    :locale="text.locale"
    :format="format"
  />
</template>
