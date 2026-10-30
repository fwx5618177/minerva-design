<script setup lang="ts">
// @point-click reports the clicked point (series, index, x, y, label).
import { computed, ref } from "vue";
import {
  ScatterChart,
  useI18n,
  type ChartHoverEvent,
} from "minerva-design/vue";

const TEXT = {
  en: {
    cities: "Cities",
    density: "Density (k/km²)",
    rent: "Rent (€/m²)",
    hint: "Click a city",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
  zh: {
    cities: "城市",
    density: "人口密度（千人/km²）",
    rent: "租金（欧元/m²）",
    hint: "点击一个城市",
    names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
  },
  ja: {
    cities: "都市",
    density: "人口密度（千人/km²）",
    rent: "家賃（€/m²）",
    hint: "都市をクリックします",
    names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
  },
  fr: {
    cities: "Villes",
    density: "Densité (k/km²)",
    rent: "Loyer (€/m²)",
    hint: "Cliquez sur une ville",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
};

const POINTS: [number, number][] = [
  [20.5, 31],
  [10.9, 17],
  [6.8, 15],
  [4.9, 15],
  [4.8, 21],
  [5.2, 16],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  {
    name: text.value.cities,
    pointSize: 12,
    data: POINTS.map(([x, y], i) => ({ x, y, label: text.value.names[i] })),
  },
]);
const selection = ref("");
const onPointClick = (event: ChartHoverEvent) => {
  const [item] = event.items;
  if (item) selection.value = `${item.label}: ${item.x} · ${item.y} €/m²`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <ScatterChart
      :series="series"
      :x-axis="{ title: text.density }"
      :y-axis="{ title: text.rent }"
      :height="280"
      @point-click="onPointClick"
    />
    <output aria-live="polite">{{ selection || text.hint }}</output>
  </div>
</template>
