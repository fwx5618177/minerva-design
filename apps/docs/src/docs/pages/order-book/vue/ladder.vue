<script setup lang="ts">
// <OrderBook>: asks above the spread row, bids below, depth bars and a
// large order highlight; @level-click reports the clicked row (e.g. to fill
// a price in an order form).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { OrderBook, type OrderBookLevelEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: { price: "Price", size: "Size", hint: "Click a row" },
  zh: { price: "价格", size: "数量", hint: "点击一行" },
  ja: { price: "価格", size: "数量", hint: "行をクリックします" },
  fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
};

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

const book = { bids: side(-1, 1), asks: side(1, 2) };
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const clicked = ref<OrderBookLevelEvent | null>(null);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <OrderBook
      :book="book"
      :last-price="100.02"
      :large-order-threshold="50"
      :height="380"
      @level-click="clicked = $event"
    />
    <output aria-live="polite">
      {{
        clicked
          ? `${text.price} ${clicked.price} · ${text.size} ${clicked.size}`
          : text.hint
      }}
    </output>
  </div>
</template>
