<script setup lang="ts">
// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Sparkline } from "minerva-design/vue/charts";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    "
  >
    <div style="display: grid; gap: 4px">
      <span>{{ text.orders }}</span>
      <strong>1,284</strong>
      <Sparkline
        :data="[32, 41, 38, 52, 49, 61, 58, 70, 66, 74]"
        :name="text.orders"
      />
    </div>
    <div style="display: grid; gap: 4px">
      <span>{{ text.revenue }}</span>
      <strong>€48.2k</strong>
      <Sparkline
        type="area"
        :data="[3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9]"
        :name="text.revenue"
      />
    </div>
    <div style="display: grid; gap: 4px">
      <span>{{ text.signups }}</span>
      <strong>312</strong>
      <Sparkline
        type="bar"
        :data="[12, 18, 9, 22, 30, 25, 19, 28, 33, 31]"
        :name="text.signups"
      />
    </div>
  </div>
</template>
