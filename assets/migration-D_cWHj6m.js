import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ChordChartMigration.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; minerva-hover reads both directions of a
// ribbon (\`value\` and \`reverseValue\`).

import type {
  MinervaChordChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    regions: ["North", "South", "East", "West", "Center"],
    hint: "Hover a ribbon to compare both directions",
    flow: "{source} → {target}: {value}k · back: {reverse}k",
    group: "{name}: {value}k",
  },
  zh: {
    regions: ["北部", "南部", "东部", "西部", "中部"],
    hint: "悬停在流带上以比较两个方向",
    flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    group: "{name}：{value} 千人",
  },
  ja: {
    regions: ["北部", "南部", "東部", "西部", "中部"],
    hint: "リボンにカーソルを合わせると両方向を比較できます",
    flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    group: "{name}: {value} 千人",
  },
  fr: {
    regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
    hint: "Survolez un ruban pour comparer les deux sens",
    flow: "{source} → {target} : {value} k · retour : {reverse} k",
    group: "{name} : {value} k",
  },
};
// from, to (indexes in TEXT.regions), thousands of people
const MOVES = [
  [0, 1, 32],
  [1, 0, 18],
  [0, 4, 45],
  [4, 0, 22],
  [1, 4, 38],
  [4, 1, 30],
  [2, 4, 51],
  [4, 2, 26],
  [3, 4, 29],
  [4, 3, 35],
  [2, 3, 14],
  [3, 2, 21],
  [1, 2, 12],
  [2, 1, 9],
];

const outputText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartGroups = text.regions;
const chartLinks = MOVES.map(([from, to, value]) => ({
  source: from,
  target: to,
  value,
}));
const onHover = (event: Event) => {
  const hovered = (event as CustomEvent<ShapeHoverEvent | null>).detail;
  if (!hovered) outputText.value = text.hint;
  else if (hovered.source === undefined)
    outputText.value = text.group
      .replace("{name}", hovered.name)
      .replace("{value}", String(hovered.value));
  else
    outputText.value = text.flow
      .replace("{source}", hovered.source)
      .replace("{target}", hovered.target ?? "")
      .replace("{value}", String(hovered.value))
      .replace("{reverse}", String(hovered.reverseValue ?? 0));
};

onMounted(() => {
  outputText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <minerva-chord-chart
      id="migration"
      directed
      ribbon-color="source"
      :groups.prop="chartGroups"
      :links.prop="chartLinks"
      @minerva-hover="onHover"
    ></minerva-chord-chart>
    <output id="flow" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// chord-chart-migration.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; minerva-hover reads both directions of a
// ribbon (\`value\` and \`reverseValue\`).
import type {
  MinervaChordChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    regions: ["North", "South", "East", "West", "Center"],
    hint: "Hover a ribbon to compare both directions",
    flow: "{source} → {target}: {value}k · back: {reverse}k",
    group: "{name}: {value}k",
  },
  zh: {
    regions: ["北部", "南部", "东部", "西部", "中部"],
    hint: "悬停在流带上以比较两个方向",
    flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    group: "{name}：{value} 千人",
  },
  ja: {
    regions: ["北部", "南部", "東部", "西部", "中部"],
    hint: "リボンにカーソルを合わせると両方向を比較できます",
    flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    group: "{name}: {value} 千人",
  },
  fr: {
    regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
    hint: "Survolez un ruban pour comparer les deux sens",
    flow: "{source} → {target} : {value} k · retour : {reverse} k",
    group: "{name} : {value} k",
  },
};
// from, to (indexes in TEXT.regions), thousands of people
const MOVES = [
  [0, 1, 32],
  [1, 0, 18],
  [0, 4, 45],
  [4, 0, 22],
  [1, 4, 38],
  [4, 1, 30],
  [2, 4, 51],
  [4, 2, 26],
  [3, 4, 29],
  [4, 3, 35],
  [2, 3, 14],
  [3, 2, 21],
  [1, 2, 12],
  [2, 1, 9],
];

@Component({
  selector: "app-chord-chart-migration",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-chord-chart
        id="migration"
        directed
        ribbon-color="source"
        [groups]="chartGroups"
        [links]="chartLinks"
        (minerva-hover)="onHover($event)"
      ></minerva-chord-chart>
      <output id="flow" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class ChordChartMigrationComponent implements AfterViewInit {
  outputText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartGroups = this.text.regions;
  chartLinks = MOVES.map(([from, to, value]) => ({
    source: from,
    target: to,
    value,
  }));
  onHover = (event: Event) => {
    const hovered = (event as CustomEvent<ShapeHoverEvent | null>).detail;
    if (!hovered) this.outputText = this.text.hint;
    else if (hovered.source === undefined)
      this.outputText = this.text.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    else
      this.outputText = this.text.flow
        .replace("{source}", hovered.source)
        .replace("{target}", hovered.target ?? "")
        .replace("{value}", String(hovered.value))
        .replace("{reverse}", String(hovered.reverseValue ?? 0));
  };

  ngAfterViewInit(): void {
    this.outputText = this.text.hint;
  }
}
`,svelte:`<!-- ChordChartMigration.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Moves between regions in a year (thousands of people), one ribbon per
  // direction with arrowheads; minerva-hover reads both directions of a
  // ribbon (\`value\` and \`reverseValue\`).

  import type {
    MinervaChordChart,
    ShapeHoverEvent,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      regions: ["North", "South", "East", "West", "Center"],
      hint: "Hover a ribbon to compare both directions",
      flow: "{source} → {target}: {value}k · back: {reverse}k",
      group: "{name}: {value}k",
    },
    zh: {
      regions: ["北部", "南部", "东部", "西部", "中部"],
      hint: "悬停在流带上以比较两个方向",
      flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
      group: "{name}：{value} 千人",
    },
    ja: {
      regions: ["北部", "南部", "東部", "西部", "中部"],
      hint: "リボンにカーソルを合わせると両方向を比較できます",
      flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
      group: "{name}: {value} 千人",
    },
    fr: {
      regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
      hint: "Survolez un ruban pour comparer les deux sens",
      flow: "{source} → {target} : {value} k · retour : {reverse} k",
      group: "{name} : {value} k",
    },
  };
  // from, to (indexes in TEXT.regions), thousands of people
  const MOVES = [
    [0, 1, 32],
    [1, 0, 18],
    [0, 4, 45],
    [4, 0, 22],
    [1, 4, 38],
    [4, 1, 30],
    [2, 4, 51],
    [4, 2, 26],
    [3, 4, 29],
    [4, 3, 35],
    [2, 3, 14],
    [3, 2, 21],
    [1, 2, 12],
    [2, 1, 9],
  ];

  let outputText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartGroups = text.regions;
  const chartLinks = MOVES.map(([from, to, value]) => ({
    source: from,
    target: to,
    value,
  }));
  const onHover = (event: Event) => {
    const hovered = (event as CustomEvent<ShapeHoverEvent | null>).detail;
    if (!hovered) outputText = text.hint;
    else if (hovered.source === undefined)
      outputText = text.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    else
      outputText = text.flow
        .replace("{source}", hovered.source)
        .replace("{target}", hovered.target ?? "")
        .replace("{value}", String(hovered.value))
        .replace("{reverse}", String(hovered.reverseValue ?? 0));
  };

  onMount(() => {
    outputText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px; width: 100%">
  <minerva-chord-chart
    id="migration"
    directed
    ribbon-color="source"
    groups={chartGroups}
    links={chartLinks}
    onminerva-hover={onHover}
  ></minerva-chord-chart>
  <output id="flow" aria-live="polite">{outputText}</output>
</div>
`,solid:`// ChordChartMigration.tsx

import { createSignal, onMount } from "solid-js";

// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; minerva-hover reads both directions of a
// ribbon (\`value\` and \`reverseValue\`).
import type {
  MinervaChordChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    regions: ["North", "South", "East", "West", "Center"],
    hint: "Hover a ribbon to compare both directions",
    flow: "{source} → {target}: {value}k · back: {reverse}k",
    group: "{name}: {value}k",
  },
  zh: {
    regions: ["北部", "南部", "东部", "西部", "中部"],
    hint: "悬停在流带上以比较两个方向",
    flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    group: "{name}：{value} 千人",
  },
  ja: {
    regions: ["北部", "南部", "東部", "西部", "中部"],
    hint: "リボンにカーソルを合わせると両方向を比較できます",
    flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    group: "{name}: {value} 千人",
  },
  fr: {
    regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
    hint: "Survolez un ruban pour comparer les deux sens",
    flow: "{source} → {target} : {value} k · retour : {reverse} k",
    group: "{name} : {value} k",
  },
};
// from, to (indexes in TEXT.regions), thousands of people
const MOVES = [
  [0, 1, 32],
  [1, 0, 18],
  [0, 4, 45],
  [4, 0, 22],
  [1, 4, 38],
  [4, 1, 30],
  [2, 4, 51],
  [4, 2, 26],
  [3, 4, 29],
  [4, 3, 35],
  [2, 3, 14],
  [3, 2, 21],
  [1, 2, 12],
  [2, 1, 9],
];

export default function ChordChartMigration() {
  const [outputText, setOutputText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartGroups = text.regions;
  const chartLinks = MOVES.map(([from, to, value]) => ({
    source: from,
    target: to,
    value,
  }));
  const onHover = (event: Event) => {
    const hovered = (event as CustomEvent<ShapeHoverEvent | null>).detail;
    if (!hovered) setOutputText(text.hint);
    else if (hovered.source === undefined)
      setOutputText(
        text.group
          .replace("{name}", hovered.name)
          .replace("{value}", String(hovered.value)),
      );
    else
      setOutputText(
        text.flow
          .replace("{source}", hovered.source)
          .replace("{target}", hovered.target ?? "")
          .replace("{value}", String(hovered.value))
          .replace("{reverse}", String(hovered.reverseValue ?? 0)),
      );
  };

  onMount(() => {
    setOutputText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px; width: 100%">
      <minerva-chord-chart
        id="migration"
        directed
        ribbon-color="source"
        prop:groups={chartGroups}
        prop:links={chartLinks}
        on:minerva-hover={onHover}
      ></minerva-chord-chart>
      <output id="flow" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px; width: 100%">
  <minerva-chord-chart
    id="migration"
    directed
    ribbon-color="source"
  ></minerva-chord-chart>
  <output id="flow" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Moves between regions in a year (thousands of people), one ribbon per
  // direction with arrowheads; minerva-hover reads both directions of a
  // ribbon (\`value\` and \`reverseValue\`).
  const TEXT = {
    en: {
      regions: ["North", "South", "East", "West", "Center"],
      hint: "Hover a ribbon to compare both directions",
      flow: "{source} → {target}: {value}k · back: {reverse}k",
      group: "{name}: {value}k",
    },
    zh: {
      regions: ["北部", "南部", "东部", "西部", "中部"],
      hint: "悬停在流带上以比较两个方向",
      flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
      group: "{name}：{value} 千人",
    },
    ja: {
      regions: ["北部", "南部", "東部", "西部", "中部"],
      hint: "リボンにカーソルを合わせると両方向を比較できます",
      flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
      group: "{name}: {value} 千人",
    },
    fr: {
      regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
      hint: "Survolez un ruban pour comparer les deux sens",
      flow: "{source} → {target} : {value} k · retour : {reverse} k",
      group: "{name} : {value} k",
    },
  };
  // from, to (indexes in TEXT.regions), thousands of people
  const MOVES = [
    [0, 1, 32],
    [1, 0, 18],
    [0, 4, 45],
    [4, 0, 22],
    [1, 4, 38],
    [4, 1, 30],
    [2, 4, 51],
    [4, 2, 26],
    [3, 4, 29],
    [4, 3, 35],
    [2, 3, 14],
    [3, 2, 21],
    [1, 2, 12],
    [2, 1, 9],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#migration");
  const output = document.querySelector("#flow");
  chart.groups = text.regions;
  chart.links = MOVES.map(([from, to, value]) => ({
    source: from,
    target: to,
    value,
  }));
  output.textContent = text.hint;
  const onHover = (event) => {
    const hovered = event.detail;
    if (!hovered) output.textContent = text.hint;
    else if (hovered.source === undefined)
      output.textContent = text.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    else
      output.textContent = text.flow
        .replace("{source}", hovered.source)
        .replace("{target}", hovered.target ?? "")
        .replace("{value}", String(hovered.value))
        .replace("{reverse}", String(hovered.reverseValue ?? 0));
  };
  chart.addEventListener("minerva-hover", onHover);
<\/script>
`}})))()}n();export{t as default};