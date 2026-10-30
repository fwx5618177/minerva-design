<script setup lang="ts">
// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import { computed } from "vue";
import { WaterfallChart, useI18n } from "minerva-design/vue";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

const { language } = useI18n();
const steps = computed(() => {
  const label = STEPS[language.value] ?? STEPS.en;
  return [
    { label: label[0], value: 420 },
    { label: label[1], value: -180 },
    { label: label[2], kind: "subtotal" as const },
    { label: label[3], value: -130 },
    { label: label[4], value: 25 },
    { label: label[5], value: -34 },
    { label: label[6], kind: "total" as const },
  ];
});
const format = (value: number) => `${value} k€`;
</script>

<template>
  <WaterfallChart :steps="steps" :format="format" :height="320" />
</template>
