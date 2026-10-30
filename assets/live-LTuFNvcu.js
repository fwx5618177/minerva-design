import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// A live ladder: the handle's \`applyDeltas\` changes levels (the changed
// sizes flash), \`last-price\` moves the spread row (colored by its last
// move); levels grouped by 0.1 (\`grouping\`).
import { onBeforeUnmount, onMounted, ref } from "vue";
import { OrderBook, type OrderBookHandle } from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

// every 400 ms, new sizes for a level of each side (size 0 would remove it)
const delta = (tick: number) => ({
  bids: {
    price: [round(100 - 0.05 * (1 + (tick % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
  },
  asks: {
    price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
  },
});

const book = { bids: side(-1, 3), asks: side(1, 4) };
const ladder = ref<OrderBookHandle>();
const lastPrice = ref(100);
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    ladder.value?.applyDeltas(delta(tick));
    lastPrice.value = round(100 + Math.sin(tick / 5) / 20);
  }, 400);
});
onBeforeUnmount(() => window.clearInterval(timer));
<\/script>

<template>
  <OrderBook
    ref="ladder"
    :book="book"
    :last-price="lastPrice"
    :grouping="0.1"
    :height="380"
  />
</template>
`})))()}n();export{t as default};