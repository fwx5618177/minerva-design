import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (\`aggregate\`), small ones hidden (\`min-size\`), large ones
// highlighted; @trade-click reports the clicked row.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  TimeAndSales,
  type TimeAndSalesRowEvent,
} from "minerva-design/vue/charts";

const TEXT = {
  en: { hint: "Click a trade", size: "lots" },
  zh: { hint: "点击一笔成交", size: "手" },
  ja: { hint: "約定をクリックします", size: "ロット" },
  fr: { hint: "Cliquez sur une transaction", size: "lots" },
};

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

const trades = Array.from({ length: 2000 }, (_, i) => trade(i));
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const clicked = ref<TimeAndSalesRowEvent | null>(null);
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <TimeAndSales
      :trades="trades"
      aggregate
      :min-size="2"
      :large-trade-threshold="25"
      :columns="['time', 'side', 'price', 'size']"
      :height="300"
      @trade-click="clicked = $event"
    />
    <output aria-live="polite">
      {{
        clicked
          ? \`\${clicked.trade.price} × \${clicked.trade.size} \${text.size} (\${clicked.count})\`
          : text.hint
      }}
    </output>
  </div>
</template>
`})))()}n();export{t as default};