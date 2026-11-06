# Graphique linéaire

Lignes ou aires remplies sur des nombres, des dates ou des catégories. Gère des millions de points sur le GPU.

Package: minerva-design@1.21.1

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Cette semaine

Semaine dernière

Visiteurs par jour, cette semaine et la semaine dernière

Stockage utilisé

Jour

Stockage utilisé sur 60 jours

Lisbonne

Oslo

Courbe

Linéaire

Lissée

En escalier

Températures mensuelles moyennes à Lisbonne et à Oslo

Calcul

Stockage

Réseau

Bases de données

Mode d'empilement

Empilé

Dépenses cloud mensuelles par service, empilées

Pages vues

Sessions

Pages vues et sessions quotidiennes, premier semestre 2026

Capteur

Un million de relevés de capteur

{{points}} points · dessinés avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Visiteurs

Lancement du produit

Panne

Visiteurs quotidiens sur 90 jours avec un lancement de produit et une panne

Intérieur

Extérieur

Températures horaires intérieures et extérieures avec des relevés manquants

Les capteurs ont été hors ligne quelques heures : la ligne s'interrompt au lieu de deviner.

Médiane

95e centile

Critique

Objectif {{value}}

Latence de l'API sur six heures, médiane et 95e centile

Clôture

Période

1 M

3 M

6 M

1 A

Tout

Cours de clôture quotidien sur deux ans

Pas

Pas par jour

{{day}} : {{steps}} pas

Touchez ou parcourez la ligne

Processeur

Mémoire

{{hour}} h

Utilisation du processeur et de la mémoire au cours de la journée

Pincez pour zoomer, touchez deux fois pour réinitialiser ; touchez la légende pour masquer une série.

Température du congélateur

Alarme au-dessus de {{value}}

Pause

Reprendre

Alarme : porte ouverte ?

Normal

Dernière mesure {{value}} à {{time}}

Au-dessus du seuil sur la dernière minute : {{readings}}

Température du congélateur sur la dernière minute, mise à jour chaque seconde

Souche sauvage

Mutant

Avec antibiotique

Phase exponentielle

Échelle logarithmique

Temps depuis l'inoculation

UFC / mL

Courbes de croissance de trois cultures bactériennes sur 24 heures

Les segments droits indiquent un taux de croissance constant : la souche sauvage double environ toutes les {{minutes}}.

Sur une échelle linéaire, les petites cultures paraissent plates : revenez à l'échelle logarithmique pour les comparer.

Valeur du portefeuille

Cliquez sur un point pour commencer une mesure, puis sur un second.

Depuis le {{date}} ({{value}}) : cliquez sur un second point.

{{from}} → {{to}} : {{change}} ({{percent}}) en {{days}}

Effacer

Valeur quotidienne d'un portefeuille en 2026 ; cliquez sur deux points pour mesurer la variation

Actions

Obligations

Or

Immobilier

Base 100

Performance de quatre classes d'actifs en base 100, de 2021 à 2026

{{value}} µg/m³

Delhi

Pékin

Paris

Mexico

Tokyo

São Paulo

Moyenne journalière des particules fines (PM2,5) en novembre ; la ligne en pointillés est le seuil de l'OMS, {{value}}.

{{days}}/{{total}} jours au-dessus

PM2,5 quotidiennes à {{city}} sur 30 jours

## LineChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "LineChart"
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
    "name": "stacked",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Stacks the series on top of each other (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "percent",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Scales the stacks to 100% (implies `stacked`; default `false`)",
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
    "name": "area",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Fills the area under the lines (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "curve",
    "type": "ChartCurve",
    "required": false,
    "description": "Shape of the lines: straight, smooth (monotone) or steps",
    "typeText": "ChartCurve"
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

## Example: reset-zoom

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/vue/reset-zoom.vue

```vue
<script setup lang="ts">
// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the template ref exposes
// resetZoom, getView, setView and the engine instance.
import { computed, ref } from "vue";
import { Button, useI18n } from "minerva-design/vue";
import { LineChart, type ChartHandle } from "minerva-design/vue/charts";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = Array.from({ length: 2000 }, (_, i) =>
  Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
);
const series = computed(() => [{ name: text.value.sensor, data }]);
const chart = ref<ChartHandle>();
</script>

<template>
  <div style="display: grid; gap: 8px; justify-items: start">
    <LineChart
      ref="chart"
      :series="series"
      crosshair
      :interaction="{ zoom: 'x' }"
      :height="260"
    />
    <Button variant="outline" size="small" @click="chart?.resetZoom()">{{
      text.reset
    }}</Button>
  </div>
</template>

```

## Example: trend

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/vue/trend.vue

```vue
<script setup lang="ts">
// The labels follow the language of the closest ConfigProvider.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { LineChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
  { name: text.value.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
]);
</script>

<template>
  <LineChart
    :series="series"
    curve="smooth"
    :x-axis="{ type: 'category', categories: text.days }"
    :height="280"
  />
</template>

```
