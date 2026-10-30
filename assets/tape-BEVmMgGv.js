import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// <TimeAndSales>: the newest trade on top (the handle's \`addTrades\`), large
// trades highlighted; hovering pauses the tape, new trades are counted.
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  TimeAndSales,
  type TimeAndSalesHandle,
} from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

const first = Array.from({ length: 40 }, (_, i) => trade(i));
const tape = ref<TimeAndSalesHandle>();
let tick = 40;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    tape.value?.addTrades(trade(tick));
  }, 250);
});
onBeforeUnmount(() => window.clearInterval(timer));
<\/script>

<template>
  <TimeAndSales
    ref="tape"
    :trades="first"
    :large-trade-threshold="20"
    :height="320"
  />
</template>
`})))()}n();export{t as default};