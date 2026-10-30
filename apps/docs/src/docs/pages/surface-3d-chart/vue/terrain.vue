<script setup lang="ts">
// A terrain with a wireframe (`wireframe`, every 2nd grid line) and the
// "terrain" color scale; hover a cell to read its elevation.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Surface3DChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { name: "Terrain", axes: ["East (km)", "North (km)", "Elevation (m)"] },
  zh: { name: "地形", axes: ["东（公里）", "北（公里）", "海拔（米）"] },
  ja: { name: "地形", axes: ["東（km）", "北（km）", "標高（m）"] },
  fr: { name: "Relief", axes: ["Est (km)", "Nord (km)", "Altitude (m)"] },
};

// two hills and a valley on a 40 × 40 grid (heights in meters)
const N = 40;
const TERRAIN = {
  rows: N,
  cols: N,
  z: Array.from({ length: N * N }, (_, k) => {
    const x = (k % N) / 4;
    const y = Math.floor(k / N) / 4;
    return Math.round(
      900 * Math.exp(-((x - 3) ** 2 + (y - 4) ** 2) / 6) +
        600 * Math.exp(-((x - 7) ** 2 + (y - 7) ** 2) / 4) -
        200 * Math.exp(-((x - 6) ** 2 + (y - 2) ** 2) / 3) +
        300,
    );
  }),
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [{ name: text.value.name, data: TERRAIN }]);
</script>

<template>
  <Surface3DChart
    :series="series"
    :wireframe="{ step: 2 }"
    color-scale="terrain"
    :x-axis="{ title: text.axes[0] }"
    :y-axis="{ title: text.axes[1] }"
    :z-axis="{ title: text.axes[2] }"
    :height="420"
  />
</template>
