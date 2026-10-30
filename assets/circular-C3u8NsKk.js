import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- GraphChartCircular.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// minerva-selection-change lists the selection.

import type { MinervaGraphChart } from "minerva-design/web-components/graph";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
const TEXT = {
  en: { hint: "Click a city to see its routes", selected: "Selected: " },
  zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
  ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
  fr: {
    hint: "Cliquez sur une ville pour voir ses liaisons",
    selected: "Sélection : ",
  },
};
// region (index in REGIONS) of each city of CITIES
const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

const outputText = ref("");

const lang = document.documentElement.lang as keyof typeof CITIES;
const names = CITIES[lang] ?? CITIES.en;
const text = TEXT[lang] ?? TEXT.en;
const chartNodes = names.map((label, i) => ({
  id: \`c\${i}\`,
  label,
  group: \`r\${REGION_OF[i]}\`,
}));
const chartEdges = ROUTES.map(([a, b, flights]) => ({
  source: \`c\${a}\`,
  target: \`c\${b}\`,
  value: flights,
}));
const chartGroups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
  id: \`r\${i}\`,
  name,
}));
const onSelect = (event: Event) => {
  const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
  outputText.value = ids.length
    ? text.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
    : text.hint;
};

onMounted(() => {
  outputText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <minerva-graph-chart
      id="circle"
      layout="circular"
      edge-color="source"
      height="440"
      :nodes.prop="chartNodes"
      :edges.prop="chartEdges"
      :groups.prop="chartGroups"
      @minerva-selection-change="onSelect"
    ></minerva-graph-chart>
    <output id="selection" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// graph-chart-circular.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// minerva-selection-change lists the selection.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
const TEXT = {
  en: { hint: "Click a city to see its routes", selected: "Selected: " },
  zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
  ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
  fr: {
    hint: "Cliquez sur une ville pour voir ses liaisons",
    selected: "Sélection : ",
  },
};
// region (index in REGIONS) of each city of CITIES
const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

@Component({
  selector: "app-graph-chart-circular",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-graph-chart
        id="circle"
        layout="circular"
        edge-color="source"
        height="440"
        [nodes]="chartNodes"
        [edges]="chartEdges"
        [groups]="chartGroups"
        (minerva-selection-change)="onSelect($event)"
      ></minerva-graph-chart>
      <output id="selection" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class GraphChartCircularComponent implements AfterViewInit {
  outputText = "";

  lang = document.documentElement.lang as keyof typeof CITIES;
  names = CITIES[this.lang] ?? CITIES.en;
  text = TEXT[this.lang] ?? TEXT.en;
  chartNodes = this.names.map((label, i) => ({
    id: \`c\${i}\`,
    label,
    group: \`r\${REGION_OF[i]}\`,
  }));
  chartEdges = ROUTES.map(([a, b, flights]) => ({
    source: \`c\${a}\`,
    target: \`c\${b}\`,
    value: flights,
  }));
  chartGroups = (REGIONS[this.lang] ?? REGIONS.en).map((name, i) => ({
    id: \`r\${i}\`,
    name,
  }));
  onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    this.outputText = ids.length
      ? this.text.selected +
        ids.map((id) => this.names[Number(id.slice(1))]).join(", ")
      : this.text.hint;
  };

  ngAfterViewInit(): void {
    this.outputText = this.text.hint;
  }
}
`,svelte:`<!-- GraphChartCircular.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // The same routes on a circle, grouped by region, edges tinted with the
  // color of their source; click cities (Ctrl / ⌘ + click to add) and
  // minerva-selection-change lists the selection.

  import type { MinervaGraphChart } from "minerva-design/web-components/graph";

  const CITIES = {
    en: [
      "Beijing",
      "Shanghai",
      "Tokyo",
      "Seoul",
      "Singapore",
      "Dubai",
      "Sydney",
      "London",
      "Paris",
      "Frankfurt",
      "New York",
      "Chicago",
      "Los Angeles",
      "São Paulo",
    ],
    zh: [
      "北京",
      "上海",
      "东京",
      "首尔",
      "新加坡",
      "迪拜",
      "悉尼",
      "伦敦",
      "巴黎",
      "法兰克福",
      "纽约",
      "芝加哥",
      "洛杉矶",
      "圣保罗",
    ],
    ja: [
      "北京",
      "上海",
      "東京",
      "ソウル",
      "シンガポール",
      "ドバイ",
      "シドニー",
      "ロンドン",
      "パリ",
      "フランクフルト",
      "ニューヨーク",
      "シカゴ",
      "ロサンゼルス",
      "サンパウロ",
    ],
    fr: [
      "Pékin",
      "Shanghai",
      "Tokyo",
      "Séoul",
      "Singapour",
      "Dubaï",
      "Sydney",
      "Londres",
      "Paris",
      "Francfort",
      "New York",
      "Chicago",
      "Los Angeles",
      "São Paulo",
    ],
  };
  const REGIONS = {
    en: ["Asia", "Oceania", "Europe", "Americas"],
    zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
    ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
    fr: ["Asie", "Océanie", "Europe", "Amériques"],
  };
  const TEXT = {
    en: { hint: "Click a city to see its routes", selected: "Selected: " },
    zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
    ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
    fr: {
      hint: "Cliquez sur une ville pour voir ses liaisons",
      selected: "Sélection : ",
    },
  };
  // region (index in REGIONS) of each city of CITIES
  const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
  // weekly flights between two cities (indexes in CITIES)
  const ROUTES = [
    [0, 1, 120],
    [0, 2, 40],
    [1, 2, 55],
    [2, 3, 60],
    [1, 3, 35],
    [1, 4, 30],
    [4, 6, 28],
    [2, 6, 14],
    [4, 5, 25],
    [5, 7, 42],
    [5, 8, 21],
    [5, 9, 20],
    [7, 8, 70],
    [7, 9, 50],
    [8, 9, 35],
    [7, 10, 80],
    [8, 10, 40],
    [9, 11, 14],
    [10, 11, 90],
    [10, 12, 85],
    [11, 12, 60],
    [12, 2, 28],
    [12, 6, 14],
    [10, 13, 21],
    [12, 1, 18],
    [0, 9, 12],
    [4, 7, 21],
  ];

  let outputText = $state("");

  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const text = TEXT[lang] ?? TEXT.en;
  const chartNodes = names.map((label, i) => ({
    id: \`c\${i}\`,
    label,
    group: \`r\${REGION_OF[i]}\`,
  }));
  const chartEdges = ROUTES.map(([a, b, flights]) => ({
    source: \`c\${a}\`,
    target: \`c\${b}\`,
    value: flights,
  }));
  const chartGroups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: \`r\${i}\`,
    name,
  }));
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    outputText = ids.length
      ? text.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : text.hint;
  };

  onMount(() => {
    outputText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px; width: 100%">
  <minerva-graph-chart
    id="circle"
    layout="circular"
    edge-color="source"
    height="440"
    nodes={chartNodes}
    edges={chartEdges}
    groups={chartGroups}
    onminerva-selection-change={onSelect}
  ></minerva-graph-chart>
  <output id="selection" aria-live="polite">{outputText}</output>
</div>
`,solid:`// GraphChartCircular.tsx

import { createSignal, onMount } from "solid-js";

// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// minerva-selection-change lists the selection.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
const TEXT = {
  en: { hint: "Click a city to see its routes", selected: "Selected: " },
  zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
  ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
  fr: {
    hint: "Cliquez sur une ville pour voir ses liaisons",
    selected: "Sélection : ",
  },
};
// region (index in REGIONS) of each city of CITIES
const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

export default function GraphChartCircular() {
  const [outputText, setOutputText] = createSignal("");

  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const text = TEXT[lang] ?? TEXT.en;
  const chartNodes = names.map((label, i) => ({
    id: \`c\${i}\`,
    label,
    group: \`r\${REGION_OF[i]}\`,
  }));
  const chartEdges = ROUTES.map(([a, b, flights]) => ({
    source: \`c\${a}\`,
    target: \`c\${b}\`,
    value: flights,
  }));
  const chartGroups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: \`r\${i}\`,
    name,
  }));
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    setOutputText(
      ids.length
        ? text.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
        : text.hint,
    );
  };

  onMount(() => {
    setOutputText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-graph-chart
        id="circle"
        layout="circular"
        edge-color="source"
        height="440"
        prop:nodes={chartNodes}
        prop:edges={chartEdges}
        prop:groups={chartGroups}
        on:minerva-selection-change={onSelect}
      ></minerva-graph-chart>
      <output id="selection" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px; width: 100%">
  <minerva-graph-chart
    id="circle"
    layout="circular"
    edge-color="source"
    height="440"
  ></minerva-graph-chart>
  <output id="selection" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/graph";

  // The same routes on a circle, grouped by region, edges tinted with the
  // color of their source; click cities (Ctrl / ⌘ + click to add) and
  // minerva-selection-change lists the selection.
  const CITIES = {
    en: [
      "Beijing",
      "Shanghai",
      "Tokyo",
      "Seoul",
      "Singapore",
      "Dubai",
      "Sydney",
      "London",
      "Paris",
      "Frankfurt",
      "New York",
      "Chicago",
      "Los Angeles",
      "São Paulo",
    ],
    zh: [
      "北京",
      "上海",
      "东京",
      "首尔",
      "新加坡",
      "迪拜",
      "悉尼",
      "伦敦",
      "巴黎",
      "法兰克福",
      "纽约",
      "芝加哥",
      "洛杉矶",
      "圣保罗",
    ],
    ja: [
      "北京",
      "上海",
      "東京",
      "ソウル",
      "シンガポール",
      "ドバイ",
      "シドニー",
      "ロンドン",
      "パリ",
      "フランクフルト",
      "ニューヨーク",
      "シカゴ",
      "ロサンゼルス",
      "サンパウロ",
    ],
    fr: [
      "Pékin",
      "Shanghai",
      "Tokyo",
      "Séoul",
      "Singapour",
      "Dubaï",
      "Sydney",
      "Londres",
      "Paris",
      "Francfort",
      "New York",
      "Chicago",
      "Los Angeles",
      "São Paulo",
    ],
  };
  const REGIONS = {
    en: ["Asia", "Oceania", "Europe", "Americas"],
    zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
    ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
    fr: ["Asie", "Océanie", "Europe", "Amériques"],
  };
  const TEXT = {
    en: { hint: "Click a city to see its routes", selected: "Selected: " },
    zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
    ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
    fr: {
      hint: "Cliquez sur une ville pour voir ses liaisons",
      selected: "Sélection : ",
    },
  };
  // region (index in REGIONS) of each city of CITIES
  const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
  // weekly flights between two cities (indexes in CITIES)
  const ROUTES = [
    [0, 1, 120],
    [0, 2, 40],
    [1, 2, 55],
    [2, 3, 60],
    [1, 3, 35],
    [1, 4, 30],
    [4, 6, 28],
    [2, 6, 14],
    [4, 5, 25],
    [5, 7, 42],
    [5, 8, 21],
    [5, 9, 20],
    [7, 8, 70],
    [7, 9, 50],
    [8, 9, 35],
    [7, 10, 80],
    [8, 10, 40],
    [9, 11, 14],
    [10, 11, 90],
    [10, 12, 85],
    [11, 12, 60],
    [12, 2, 28],
    [12, 6, 14],
    [10, 13, 21],
    [12, 1, 18],
    [0, 9, 12],
    [4, 7, 21],
  ];

  const lang = document.documentElement.lang;
  const names = CITIES[lang] ?? CITIES.en;
  const text = TEXT[lang] ?? TEXT.en;
  const chart = document.querySelector("#circle");
  const output = document.querySelector("#selection");
  chart.nodes = names.map((label, i) => ({
    id: \`c\${i}\`,
    label,
    group: \`r\${REGION_OF[i]}\`,
  }));
  chart.edges = ROUTES.map(([a, b, flights]) => ({
    source: \`c\${a}\`,
    target: \`c\${b}\`,
    value: flights,
  }));
  chart.groups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: \`r\${i}\`,
    name,
  }));
  output.textContent = text.hint;
  const onSelect = (event) => {
    const { ids } = event.detail;
    output.textContent = ids.length
      ? text.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
<\/script>
`}})))()}n();export{t as default};