<script setup lang="ts">
// `data` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HeatmapChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const cells = computed(() =>
  text.value.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  ),
);
const rows = computed(() => [...text.value.days].reverse());
</script>

<template>
  <HeatmapChart
    :data="cells"
    :x-categories="HOURS"
    :y-categories="rows"
    :name="text.commits"
    :height="300"
  />
</template>
