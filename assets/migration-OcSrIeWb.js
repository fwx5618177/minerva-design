import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; @hover reads both directions of a ribbon
// (\`value\` and \`reverseValue\`).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { ChordChart, type ShapeHoverEvent } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const links = MOVES.map(([from, to, value]) => ({
  source: from,
  target: to,
  value,
}));
const hovered = ref<ShapeHoverEvent | null>(null);
const status = computed(() => {
  const event = hovered.value;
  if (!event) return text.value.hint;
  if (event.source === undefined)
    return text.value.group
      .replace("{name}", event.name)
      .replace("{value}", String(event.value));
  return text.value.flow
    .replace("{source}", event.source)
    .replace("{target}", event.target ?? "")
    .replace("{value}", String(event.value))
    .replace("{reverse}", String(event.reverseValue ?? 0));
});
<\/script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <ChordChart
      :groups="text.regions"
      :links="links"
      directed
      ribbon-color="source"
      @hover="hovered = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>
`})))()}n();export{t as default};