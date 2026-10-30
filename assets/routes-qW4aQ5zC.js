import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- GraphChartRoutes.vue -->

<script setup lang="ts">
// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.

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
// region (index in REGIONS) and size of the hub, in the order of CITIES
const HUBS = [
  [0, 8],
  [0, 9],
  [0, 9],
  [0, 6],
  [0, 8],
  [0, 7],
  [1, 5],
  [2, 9],
  [2, 8],
  [2, 7],
  [3, 9],
  [3, 6],
  [3, 7],
  [3, 5],
];
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

const lang = document.documentElement.lang as keyof typeof CITIES;
const names = CITIES[lang] ?? CITIES.en;
const chartNodes = HUBS.map(([region, size], i) => ({
  id: \`c\${i}\`,
  label: names[i],
  group: \`r\${region}\`,
  value: size,
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
const chartOptions = { nodeSize: [10, 34] };
<\/script>

<template>
  <minerva-graph-chart
    id="routes"
    height="440"
    :nodes.prop="chartNodes"
    :edges.prop="chartEdges"
    :groups.prop="chartGroups"
    :options.prop="chartOptions"
  ></minerva-graph-chart>
</template>
`,angular:`// graph-chart-routes.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.
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
// region (index in REGIONS) and size of the hub, in the order of CITIES
const HUBS = [
  [0, 8],
  [0, 9],
  [0, 9],
  [0, 6],
  [0, 8],
  [0, 7],
  [1, 5],
  [2, 9],
  [2, 8],
  [2, 7],
  [3, 9],
  [3, 6],
  [3, 7],
  [3, 5],
];
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
  selector: "app-graph-chart-routes",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-graph-chart
      id="routes"
      height="440"
      [nodes]="chartNodes"
      [edges]="chartEdges"
      [groups]="chartGroups"
      [options]="chartOptions"
    ></minerva-graph-chart>
  \`,
})
export class GraphChartRoutesComponent {
  lang = document.documentElement.lang as keyof typeof CITIES;
  names = CITIES[this.lang] ?? CITIES.en;
  chartNodes = HUBS.map(([region, size], i) => ({
    id: \`c\${i}\`,
    label: this.names[i],
    group: \`r\${region}\`,
    value: size,
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
  chartOptions = { nodeSize: [10, 34] };
}
`,svelte:`<!-- GraphChartRoutes.svelte -->

<script lang="ts">
  // Air routes between hub cities: a force-directed network, node size from
  // the size of the hub, edge width from the weekly flights, colored by region.

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
  // region (index in REGIONS) and size of the hub, in the order of CITIES
  const HUBS = [
    [0, 8],
    [0, 9],
    [0, 9],
    [0, 6],
    [0, 8],
    [0, 7],
    [1, 5],
    [2, 9],
    [2, 8],
    [2, 7],
    [3, 9],
    [3, 6],
    [3, 7],
    [3, 5],
  ];
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

  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const chartNodes = HUBS.map(([region, size], i) => ({
    id: \`c\${i}\`,
    label: names[i],
    group: \`r\${region}\`,
    value: size,
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
  const chartOptions = { nodeSize: [10, 34] };
<\/script>

<minerva-graph-chart
  id="routes"
  height="440"
  nodes={chartNodes}
  edges={chartEdges}
  groups={chartGroups}
  options={chartOptions}
></minerva-graph-chart>
`,solid:`// GraphChartRoutes.tsx

// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.
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
// region (index in REGIONS) and size of the hub, in the order of CITIES
const HUBS = [
  [0, 8],
  [0, 9],
  [0, 9],
  [0, 6],
  [0, 8],
  [0, 7],
  [1, 5],
  [2, 9],
  [2, 8],
  [2, 7],
  [3, 9],
  [3, 6],
  [3, 7],
  [3, 5],
];
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

export default function GraphChartRoutes() {
  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const chartNodes = HUBS.map(([region, size], i) => ({
    id: \`c\${i}\`,
    label: names[i],
    group: \`r\${region}\`,
    value: size,
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
  const chartOptions = { nodeSize: [10, 34] };

  return (
    <minerva-graph-chart
      id="routes"
      height="440"
      prop:nodes={chartNodes}
      prop:edges={chartEdges}
      prop:groups={chartGroups}
      prop:options={chartOptions}
    ></minerva-graph-chart>
  );
}
`,html:`<minerva-graph-chart id="routes" height="440"></minerva-graph-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/graph";

  // Air routes between hub cities: a force-directed network, node size from
  // the size of the hub, edge width from the weekly flights, colored by region.
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
  // region (index in REGIONS) and size of the hub, in the order of CITIES
  const HUBS = [
    [0, 8],
    [0, 9],
    [0, 9],
    [0, 6],
    [0, 8],
    [0, 7],
    [1, 5],
    [2, 9],
    [2, 8],
    [2, 7],
    [3, 9],
    [3, 6],
    [3, 7],
    [3, 5],
  ];
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
  const chart = document.querySelector("#routes");
  chart.nodes = HUBS.map(([region, size], i) => ({
    id: \`c\${i}\`,
    label: names[i],
    group: \`r\${region}\`,
    value: size,
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
  chart.options = { nodeSize: [10, 34] };
<\/script>
`}})))()}n();export{t as default};