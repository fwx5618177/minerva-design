<script setup lang="ts">
// Slices are { name, value }; outside labels show the name and the share,
// legend clicks hide / show a slice.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { PieChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Search", "Direct", "Social", "Email", "Referral"],
  zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
};

const { language } = useI18n();
const data = computed(() =>
  [1048, 735, 580, 484, 300].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <PieChart :data="data" :height="300" />
</template>
