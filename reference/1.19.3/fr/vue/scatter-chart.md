# Nuage de points

Points placés selon deux valeurs, avec taille, couleur et libellé par point. Zoom sur les deux axes.

Package: minerva-design@1.19.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Essentiel

Entreprise

Postes

Facture mensuelle

Facture mensuelle selon le nombre de postes, par offre

Pays

PIB par habitant

Espérance de vie

Espérance de vie selon le PIB par habitant ; la taille du point est la population

Groupe {{name}}

Deux groupes de 100 000 points chacun

{{points}} points · dessinés avec {{renderer}}

Durée de session selon le nombre de pages vues

Minutes

Pages

Gratuit

Pro

{{plan}} : {{minutes}} min, {{pages}} pages

Touchez un point

Campagnes

Tendance

Dépense publicitaire par semaine

Chiffre d'affaires par semaine

R² = {{r2}} · +{{slope}} de chiffre d'affaires par dollar dépensé

Chiffre d'affaires selon la dépense publicitaire de 60 campagnes, avec une droite de tendance

Manchot Adélie

Manchot à jugulaire

Manchot papou

Longueur de nageoire

Masse corporelle

Longueur de nageoire et masse corporelle de trois espèces de manchots

Requêtes

Valeur aberrante

Attendu

Taille de la charge

Temps de réponse

Temps de réponse selon la taille de la charge, valeurs aberrantes en rouge

{{slow}} requêtes sur {{total}} ont pris plus de deux fois le temps attendu.

Mesures

Nuits fraîches

Plage de culture

Après-midi chauds

Tout afficher

Température

Humidité relative

Plage de culture

Mesures de température et d'humidité des capteurs de la serre

Visible : {{t0}} – {{t1}}, humidité {{h0}} – {{h1}} · mesures affichées : {{points}}

Choisissez une région, ou zoomez avec Ctrl / ⌘ + molette

Ingénierie

Ventes

Support

Ancienneté

Note d'évaluation (1–5)

Moyenne de l'entreprise

Ancienneté et note d'évaluation de 90 employés, par service

{{id}} · {{department}} · {{tenure}} · note {{score}} · {{salary}} par an

Cliquez sur un point pour sélectionner un employé, sur la zone vide pour effacer la sélection

Joueurs

Moyenne de la ligue

Marqueurs efficaces

Gros volumes de tirs

{{value}} points par match

Taux d'utilisation : {{value}}

True shooting : {{value}}

Taux d'utilisation

True shooting (adresse réelle)

Taux d'utilisation et adresse au tir de 16 joueurs ; la taille du point est le nombre de points par match

Normal

Alarme

Dernier

{{value}} mm/s

Pause

Reprendre

Dernier échantillon : {{rpm}} tr/min, {{value}} · alarmes à l'écran : {{alarms}}

Vitesse (tr/min)

Vibration

Seuil d'alarme

Vibration en direct d'un moteur selon sa vitesse

Mammifères

Musaraigne

Souris

Rat

Lapin

Chat

Chien

Humain

Porc

Cheval

Vache

Girafe

Éléphant

Loi de puissance ajustée

{{value}} kg

{{value}} W

Masse corporelle

Métabolisme de base

Métabolisme ∝ masse^{{exponent}} (loi de Kleiber)

Métabolisme de base selon la masse corporelle de 12 mammifères, sur axes log-log

## ScatterChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ScatterChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "type": "[event: ChartHoverEvent | null]",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: clusters

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/vue/clusters.vue

```vue
<script setup lang="ts">
// Points are [x, y] pairs; Ctrl / ⌘ + wheel zooms on both axes.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { ScatterChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { teamA: "Team A", teamB: "Team B", hours: "Hours", score: "Score" },
  zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
  ja: { teamA: "チームA", teamB: "チームB", hours: "時間", score: "スコア" },
  fr: { teamA: "Équipe A", teamB: "Équipe B", hours: "Heures", score: "Score" },
};

// deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i): [number, number] => [
    Math.round((cx + 6 * Math.sin(seed + i * 2.3)) * 10) / 10,
    Math.round((cy + 9 * Math.cos(seed + i * 1.7)) * 10) / 10,
  ]);
const teamA = cluster(12, 62, 1);
const teamB = cluster(26, 80, 4);

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.teamA, data: teamA },
  { name: text.value.teamB, data: teamB },
]);
</script>

<template>
  <ScatterChart
    :series="series"
    :x-axis="{ title: text.hours }"
    :y-axis="{ title: text.score }"
    :height="300"
  />
</template>

```

## Example: point-click

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/vue/point-click.vue

```vue
<script setup lang="ts">
// @point-click reports the clicked point (series, index, x, y, label).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { ScatterChart, type ChartHoverEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    cities: "Cities",
    density: "Density (k/km²)",
    rent: "Rent (€/m²)",
    hint: "Click a city",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
  zh: {
    cities: "城市",
    density: "人口密度（千人/km²）",
    rent: "租金（欧元/m²）",
    hint: "点击一个城市",
    names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
  },
  ja: {
    cities: "都市",
    density: "人口密度（千人/km²）",
    rent: "家賃（€/m²）",
    hint: "都市をクリックします",
    names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
  },
  fr: {
    cities: "Villes",
    density: "Densité (k/km²)",
    rent: "Loyer (€/m²)",
    hint: "Cliquez sur une ville",
    names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
  },
};

const POINTS: [number, number][] = [
  [20.5, 31],
  [10.9, 17],
  [6.8, 15],
  [4.9, 15],
  [4.8, 21],
  [5.2, 16],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  {
    name: text.value.cities,
    pointSize: 12,
    data: POINTS.map(([x, y], i) => ({ x, y, label: text.value.names[i] })),
  },
]);
const selection = ref("");
const onPointClick = (event: ChartHoverEvent) => {
  const [item] = event.items;
  if (item) selection.value = `${item.label}: ${item.x} · ${item.y} €/m²`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <ScatterChart
      :series="series"
      :x-axis="{ title: text.density }"
      :y-axis="{ title: text.rent }"
      :height="280"
      @point-click="onPointClick"
    />
    <output aria-live="polite">{{ selection || text.hint }}</output>
  </div>
</template>

```
