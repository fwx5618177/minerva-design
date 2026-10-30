import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import { computed, ref } from "vue";
import { DependencyGraph, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    modules: [
      "Utilities",
      "HTTP",
      "Translations",
      "UI components",
      "Charts",
      "API client",
      "Authentication",
      "State store",
      "Router",
      "Dashboard",
      "Reports",
      "Application",
    ],
    layers: ["Shared", "Core", "Features", "Application"],
    hint: "Click a module to highlight its dependencies",
    selected: "Selected: ",
  },
  zh: {
    modules: [
      "工具函数",
      "HTTP",
      "多语言",
      "UI 组件",
      "图表",
      "API 客户端",
      "认证",
      "状态管理",
      "路由",
      "仪表盘",
      "报表",
      "应用",
    ],
    layers: ["共享", "核心", "功能", "应用"],
    hint: "点击一个模块以高亮其依赖",
    selected: "已选择：",
  },
  ja: {
    modules: [
      "ユーティリティ",
      "HTTP",
      "翻訳",
      "UI コンポーネント",
      "チャート",
      "API クライアント",
      "認証",
      "状態管理",
      "ルーター",
      "ダッシュボード",
      "レポート",
      "アプリ",
    ],
    layers: ["共有", "コア", "機能", "アプリ"],
    hint: "モジュールをクリックすると依存関係が強調表示されます",
    selected: "選択中: ",
  },
  fr: {
    modules: [
      "Utilitaires",
      "HTTP",
      "Traductions",
      "Composants UI",
      "Graphiques",
      "Client API",
      "Authentification",
      "Gestion d'état",
      "Routeur",
      "Tableau de bord",
      "Rapports",
      "Application",
    ],
    layers: ["Partagé", "Cœur", "Fonctionnalités", "Application"],
    hint: "Cliquez sur un module pour mettre en évidence ses dépendances",
    selected: "Sélection : ",
  },
};
// layer (index in TEXT.layers) of each module of TEXT.modules
const LAYER = [0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
// dependency → dependent (indexes in TEXT.modules)
const USES = [
  [0, 1],
  [1, 5],
  [5, 6],
  [5, 7],
  [6, 8],
  [0, 4],
  [2, 3],
  [3, 9],
  [3, 10],
  [4, 9],
  [4, 10],
  [5, 9],
  [5, 10],
  [7, 9],
  [7, 10],
  [8, 11],
  [9, 11],
  [10, 11],
  [6, 11],
  [2, 11],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.modules.map((label, i) => ({
    id: \`m\${i}\`,
    label,
    group: \`l\${LAYER[i]}\`,
  })),
);
const groups = computed(() =>
  text.value.layers.map((name, i) => ({ id: \`l\${i}\`, name })),
);
const edges = USES.map(([a, b]) => ({ source: \`m\${a}\`, target: \`m\${b}\` }));
const selection = ref<string[]>([]);
const status = computed(() =>
  selection.value.length
    ? text.value.selected +
      selection.value
        .map((id) => text.value.modules[Number(id.slice(1))])
        .join(", ")
    : text.value.hint,
);
<\/script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <DependencyGraph
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      highlight="lineage"
      :height="460"
      @selection-change="selection = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>
`})))()}n();export{t as default};