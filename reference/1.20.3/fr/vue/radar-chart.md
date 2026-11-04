# Graphique radar

Compare un ou quelques éléments selon plusieurs indicateurs aux échelles différentes (compétences, tests de produits, profils aromatiques). Survolez un polygone pour le mettre en évidence avec l’indicateur le plus proche ; les flèches passent d’une série ou d’un indicateur à l’autre, Échap efface ; un clic sur la légende masque une série.

Package: minerva-design@1.20.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Résolution de problèmes

Programmation

Conception de systèmes

Communication

Collaboration

Responsabilité

Candidat

{{value}} / {{max}}

Grille d'entretien d'un candidat

Arôme

Acidité

Douceur

Corps

Amertume

Persistance

Éthiopie Yirgacheffe

Sumatra Mandheling

Profils aromatiques de deux cafés

Performances

Autonomie

Appareil photo

Écran

Rapport qualité-prix

Finition

Notes de test de trois téléphones

Survolez un polygone ou utilisez les flèches pour comparer les téléphones

Vitesse

Tir

Passe

Dribble

Défense

Physique

Attributs de deux footballeurs

Sécurité

Intégrations

Rapports

Mobile

Automatisation

Support

Prix

Notre produit

Principal concurrent

Moyenne du marché

Produits à comparer

Notes des capacités de notre produit, d'un concurrent et du marché

Protéines

Fibres

Sucres

Lipides

Sodium

Calcium

Porridge aux fruits

Œufs sur toast

Yaourt et granola

{{value}} VQ

{{meal}} : {{amount}} ({{share}})

Nutriments de trois petits-déjeuners, en pourcentage de la valeur quotidienne

CPU

Mémoire

E/S disque

Réseau

Latence

Erreurs

Moyenne de la dernière heure

Maintenant

Mises à jour en direct

Alerte : {{metric}} dépasse {{threshold}} de sa capacité.

Métrique la plus chargée : {{metric}}.

Charge actuelle du service comparée à la moyenne de la dernière heure

Communication

Livraison

Expertise

Collaboration

Mentorat

Initiative

Moyenne de l’équipe

Personne

Notes de l’évaluation à 360° de {{name}} comparées à la moyenne de l’équipe

Point fort : {{strength}} ({{strengthGap}} par rapport à l’équipe). À développer : {{growth}} ({{growthGap}}).

Chiffre d’affaires

Affaires gagnées

Taux de réussite

Montant moyen

Appels

NPS

Objectif

Réel

{{kpi}} : {{actual}} pour un objectif de {{target}} ({{attainment}}).

KPI trimestriels d’un commercial comparés à ses objectifs

Cliquez près d’un axe pour lire son KPI.

## RadarChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "RadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "boolean",
    "required": false,
    "description": "Entry and update animations, skipped when the user prefers reduced motion (default `true`)",
    "typeText": "boolean"
  },
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
    "type": "boolean | ShapeLegendOptions",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage or series (shown by default for pie, donut, funnel and multi-series radar charts)",
    "typeText": "boolean | ShapeLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ShapeTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it (default `true`)",
    "typeText": "boolean | ShapeTooltipOptions"
  },
  {
    "name": "dots",
    "type": "boolean",
    "required": false,
    "description": "Dots on the vertices (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D (default `auto`, see `setDefaultChartRenderer`)",
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
    "type": "readonly RadarSeries[]",
    "required": true,
    "description": "Polygons `{ name, values }`: one value per indicator",
    "typeText": "readonly RadarSeries[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the drawing, in pixels (default 8 on every side)",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart (default: the chart type, e.g. \"Donut chart\")",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the page language by default",
    "typeText": "string"
  },
  {
    "name": "shape",
    "type": "\"circle\" | \"polygon\"",
    "required": false,
    "description": "Grid shape (default `polygon`)",
    "typeText": "\"circle\" | \"polygon\""
  },
  {
    "name": "hidden",
    "type": "readonly number[]",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap nodes, by\nindex. Makes the visibility controlled: legend clicks then only emit\n`toggle`, whose `hiddenIndexes` should be stored and passed back.",
    "typeText": "readonly number[]"
  },
  {
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values of the labels and the tooltip (default: compact numbers, 1.2k, 3.4M)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "percentFormat",
    "type": "((share: number) => string)",
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 (default: one decimal, \"40.0%\")",
    "typeText": "((share: number) => string)"
  },
  {
    "name": "levels",
    "type": "number",
    "required": false,
    "description": "Number of grid rings (default 4)",
    "typeText": "number"
  },
  {
    "name": "indicators",
    "type": "readonly RadarIndicator[]",
    "required": true,
    "description": "Axes of the chart `{ name, max }`, clockwise from 12 o'clock",
    "typeText": "readonly RadarIndicator[]"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: ShapeHoverEvent | null]",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: ShapeHoverEvent]",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "type": "[event: ShapeToggleEvent]",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: circle

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/vue/circle.vue

```vue
<script setup lang="ts">
// `shape="circle"` draws round grid rings, `levels` sets how many.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    profile: "Profile",
    skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
  },
  zh: {
    profile: "能力画像",
    skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
  },
  ja: {
    profile: "プロフィール",
    skills: [
      "フロントエンド",
      "バックエンド",
      "デザイン",
      "テスト",
      "DevOps",
      "データ",
    ],
  },
  fr: {
    profile: "Profil",
    skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const indicators = computed(() =>
  text.value.skills.map((name) => ({ name, max: 10 })),
);
const series = computed(() => [
  { name: text.value.profile, values: [9, 6, 7, 8, 5, 6] },
]);
</script>

<template>
  <RadarChart
    :indicators="indicators"
    :series="series"
    shape="circle"
    :levels="5"
    :height="320"
  />
</template>

```

## Example: compare

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/vue/compare.vue

```vue
<script setup lang="ts">
// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const indicators = computed(() =>
  text.value.axes.map((name) => ({ name, max: 100 })),
);
const series = computed(() => [
  { name: text.value.current, values: [72, 85, 64, 90, 58] },
  { name: text.value.next, values: [88, 80, 78, 92, 81] },
]);
</script>

<template>
  <RadarChart :indicators="indicators" :series="series" :height="320" />
</template>

```
