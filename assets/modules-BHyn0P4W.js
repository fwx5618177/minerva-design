import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- DependencyGraphModules.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).

import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

const outputText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartNodes = text.modules.map((label, i) => ({
  id: \`m\${i}\`,
  label,
  group: \`l\${LAYER[i]}\`,
}));
const chartEdges = USES.map(([a, b]) => ({ source: \`m\${a}\`, target: \`m\${b}\` }));
const chartGroups = text.layers.map((name, i) => ({ id: \`l\${i}\`, name }));
const onSelect = (event: Event) => {
  const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
  outputText.value = ids.length
    ? text.selected +
      ids.map((id) => text.modules[Number(id.slice(1))]).join(", ")
    : text.hint;
};

onMounted(() => {
  outputText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <minerva-dependency-graph
      id="modules"
      highlight="lineage"
      height="460"
      :nodes.prop="chartNodes"
      :edges.prop="chartEdges"
      :groups.prop="chartGroups"
      @minerva-selection-change="onSelect"
    ></minerva-dependency-graph>
    <output id="module-selection" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// dependency-graph-modules.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

@Component({
  selector: "app-dependency-graph-modules",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-dependency-graph
        id="modules"
        highlight="lineage"
        height="460"
        [nodes]="chartNodes"
        [edges]="chartEdges"
        [groups]="chartGroups"
        (minerva-selection-change)="onSelect($event)"
      ></minerva-dependency-graph>
      <output id="module-selection" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class DependencyGraphModulesComponent implements AfterViewInit {
  outputText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartNodes = this.text.modules.map((label, i) => ({
    id: \`m\${i}\`,
    label,
    group: \`l\${LAYER[i]}\`,
  }));
  chartEdges = USES.map(([a, b]) => ({ source: \`m\${a}\`, target: \`m\${b}\` }));
  chartGroups = this.text.layers.map((name, i) => ({ id: \`l\${i}\`, name }));
  onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    this.outputText = ids.length
      ? this.text.selected +
        ids.map((id) => this.text.modules[Number(id.slice(1))]).join(", ")
      : this.text.hint;
  };

  ngAfterViewInit(): void {
    this.outputText = this.text.hint;
  }
}
`,svelte:`<!-- DependencyGraphModules.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Modules of a web application, from the shared code at the top to the
  // application at the bottom: hovering or clicking a module highlights its
  // whole lineage (what it needs and what needs it).

  import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

  let outputText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartNodes = text.modules.map((label, i) => ({
    id: \`m\${i}\`,
    label,
    group: \`l\${LAYER[i]}\`,
  }));
  const chartEdges = USES.map(([a, b]) => ({ source: \`m\${a}\`, target: \`m\${b}\` }));
  const chartGroups = text.layers.map((name, i) => ({ id: \`l\${i}\`, name }));
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    outputText = ids.length
      ? text.selected +
        ids.map((id) => text.modules[Number(id.slice(1))]).join(", ")
      : text.hint;
  };

  onMount(() => {
    outputText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px; width: 100%">
  <minerva-dependency-graph
    id="modules"
    highlight="lineage"
    height="460"
    nodes={chartNodes}
    edges={chartEdges}
    groups={chartGroups}
    onminerva-selection-change={onSelect}
  ></minerva-dependency-graph>
  <output id="module-selection" aria-live="polite">{outputText}</output>
</div>
`,solid:`// DependencyGraphModules.tsx

import { createSignal, onMount } from "solid-js";

// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

export default function DependencyGraphModules() {
  const [outputText, setOutputText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartNodes = text.modules.map((label, i) => ({
    id: \`m\${i}\`,
    label,
    group: \`l\${LAYER[i]}\`,
  }));
  const chartEdges = USES.map(([a, b]) => ({
    source: \`m\${a}\`,
    target: \`m\${b}\`,
  }));
  const chartGroups = text.layers.map((name, i) => ({ id: \`l\${i}\`, name }));
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    setOutputText(
      ids.length
        ? text.selected +
            ids.map((id) => text.modules[Number(id.slice(1))]).join(", ")
        : text.hint,
    );
  };

  onMount(() => {
    setOutputText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-dependency-graph
        id="modules"
        highlight="lineage"
        height="460"
        prop:nodes={chartNodes}
        prop:edges={chartEdges}
        prop:groups={chartGroups}
        on:minerva-selection-change={onSelect}
      ></minerva-dependency-graph>
      <output id="module-selection" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px; width: 100%">
  <minerva-dependency-graph
    id="modules"
    highlight="lineage"
    height="460"
  ></minerva-dependency-graph>
  <output id="module-selection" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/graph";

  // Modules of a web application, from the shared code at the top to the
  // application at the bottom: hovering or clicking a module highlights its
  // whole lineage (what it needs and what needs it).
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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#modules");
  const output = document.querySelector("#module-selection");
  chart.nodes = text.modules.map((label, i) => ({
    id: \`m\${i}\`,
    label,
    group: \`l\${LAYER[i]}\`,
  }));
  chart.edges = USES.map(([a, b]) => ({ source: \`m\${a}\`, target: \`m\${b}\` }));
  chart.groups = text.layers.map((name, i) => ({ id: \`l\${i}\`, name }));
  output.textContent = text.hint;
  const onSelect = (event) => {
    const { ids } = event.detail;
    output.textContent = ids.length
      ? text.selected +
        ids.map((id) => text.modules[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
<\/script>
`}})))()}n();export{t as default};