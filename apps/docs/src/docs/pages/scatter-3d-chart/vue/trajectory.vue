<script setup lang="ts">
// <Line3DChart>: a trajectory colored along its height (`colorBy: "z"` with
// the color scale, shown in the color bar); the camera turns slowly around
// it (`auto-rotate`).
import { computed } from "vue";
import { Line3DChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    path: "Flight path",
    axes: ["East (km)", "North (km)", "Altitude (km)"],
  },
  zh: { path: "飞行轨迹", axes: ["东（公里）", "北（公里）", "高度（公里）"] },
  ja: { path: "飛行経路", axes: ["東（km）", "北（km）", "高度（km）"] },
  fr: { path: "Trajectoire", axes: ["Est (km)", "Nord (km)", "Altitude (km)"] },
};

// a climbing spiral of 600 points, as columns
const t = Array.from({ length: 600 }, (_, i) => i / 30);
const PATH = {
  x: t.map((a) => Math.cos(a) * (4 + a / 4)),
  y: t.map((a) => Math.sin(a) * (4 + a / 4)),
  z: t.map((a) => a / 2),
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.path, data: PATH, colorBy: "z" as const, lineWidth: 3 },
]);
</script>

<template>
  <Line3DChart
    :series="series"
    color-scale="turbo"
    auto-rotate
    :x-axis="{ title: text.axes[0] }"
    :y-axis="{ title: text.axes[1] }"
    :z-axis="{ title: text.axes[2] }"
    :height="420"
  />
</template>
