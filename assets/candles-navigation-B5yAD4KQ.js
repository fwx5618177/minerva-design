import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Button, Slider, useI18n, type SliderValue } from "minerva-design/vue";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapViewData,
} from "minerva-design/vue/charts";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

const { language } = useI18n();
const text = computed(() => getFrameworkLabels(language.value));
const history = createFrameworkHistory();
const heatmap = ref<OrderBookHeatmapHandle>();
const minimum = ref<SliderValue>(0);
const intensity = computed<readonly [number, number]>(() => [
  Number(minimum.value) / 100,
  1,
]);
const view = ref<OrderBookHeatmapViewData | null>(null);
function show(seconds: number) {
  heatmap.value?.setView({
    time: [history.end - seconds * 1000, history.end],
    price: [98, 102],
  });
}
onMounted(() => {
  for (const book of history.books) heatmap.value?.setBook(book);
  heatmap.value?.addTrades(history.trades);
  heatmap.value?.setBars(history.bars);
  show(30);
});
<\/script>

<template>
  <div style="display: grid; gap: 12px; width: 100%">
    <p>{{ text.source }}</p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Button size="small" variant="outline" @click="show(10)">{{
        text.latest
      }}</Button>
      <Button size="small" variant="outline" @click="show(30)">{{
        text.full
      }}</Button>
      <Button size="small" @click="heatmap?.resetView()">{{
        text.follow
      }}</Button>
    </div>
    <Slider
      v-model="minimum"
      :aria-label="text.minimum"
      :min="0"
      :max="90"
      :step="5"
      show-value
      style="max-width: 320px"
    />
    <OrderBookHeatmap
      ref="heatmap"
      :height="400"
      :interval="250"
      :window="30000"
      :history="60000"
      :intensity-range="intensity"
      :max-bars="30"
      :max-columns="240"
      @view-change="view = $event"
    />
    <output aria-live="polite"
      >{{ view?.view.follow ? text.following : text.manual }} ·
      {{ text.minimum }} {{ minimum }}% ·
      {{
        view ? Math.round((view.view.time[1] - view.view.time[0]) / 1000) : 30
      }}
      {{ text.visible }}</output
    >
  </div>
</template>
`})))()}n();export{t as default};