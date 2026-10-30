<script setup lang="ts">
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import { computed } from "vue";
import { FunnelChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

const { language } = useI18n();
const data = computed(() =>
  [180, 940, 42, 410, 31].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <FunnelChart :data="data" shape="bar" sort="descending" :height="300" />
</template>
