<script setup lang="ts">
// <HorizontalBarChart>: categories down the left side, long names stay
// readable; `labels` writes the value at the end of every bar.
import { computed } from "vue";
import { HorizontalBarChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    views: "Page views",
    pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
  },
  zh: {
    views: "浏览量",
    pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
  },
  ja: {
    views: "ページビュー",
    pages: [
      "ホーム",
      "料金",
      "ドキュメント",
      "ブログ",
      "採用情報",
      "お問い合わせ",
    ],
  },
  fr: {
    views: "Pages vues",
    pages: [
      "Accueil",
      "Tarifs",
      "Documentation",
      "Blog",
      "Carrières",
      "Contact",
    ],
  },
};

const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
});
</script>

<template>
  <HorizontalBarChart
    :series="series"
    :x-axis="{ type: 'category' }"
    labels
    :height="300"
  />
</template>
