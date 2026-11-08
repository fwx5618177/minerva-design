# Graphique en cascade

Comment une suite de hausses et de baisses mène une valeur d'un début à une fin, avec sous-totaux et totaux : passages de résultat, trésorerie, écarts. De fins tirets relient chaque barre à la suivante.

Package: minerva-design@1.23.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Chiffre d'affaires

Coût des ventes

Marge brute

R&D

Marketing

Frais généraux

Résultat d'exploitation

Intérêts

Impôts

Résultat net

Montant

Compte de résultat du chiffre d'affaires au résultat net

Ouverture

Clôture

Flux net

Flux de trésorerie mensuels du solde d'ouverture au solde de clôture

Budget

Réel

Volume

Prix

Mix produit

Change

Matières premières

Économies

Écart

Facteurs de l'écart entre la marge budgétée et la marge réelle

Début d'année

Fin d'année

Recrutements

Mutations entrantes

Démissions

Mutations sortantes

Départs en retraite

Personnes

Évolution des effectifs sur l'année

ARR d'ouverture

Nouvelles affaires

Expansion

Contraction

Attrition

ARR de clôture

ARR

Trimestre

T{{n}}

{{quarter}} : ARR net ajouté {{net}} · rétention nette du revenu {{nrr}}

Pont d'ARR du {{quarter}}

Prix catalogue

Remise distributeur

Promotions

Prix facturé

Conditions de paiement

Transport

Ristournes

Prix de poche

Prix unitaire

Cliquez sur une barre pour la comparer au prix catalogue

{{step}} : {{value}}, {{share}} du prix catalogue

Cascade de prix, du prix catalogue au prix de poche

Référence 2019

Croissance de l'activité

Efficacité énergétique

Électricité renouvelable

Flotte électrique

Réfrigérants

Acquisition

2025

Objectif 2030

{{value}} kt CO₂e

Émissions

Variation : {{value}}

De {{from}} à {{to}}

{{value}} au-dessus de l'objectif 2030

Pont des émissions, de la référence 2019 à 2025

Saisie de la commande

Contrôle de crédit

Préparation

Contrôle qualité

Attente du transporteur

Transport

Douane

Délai

Durée

Travail

Attente

le travail occupe {{work}} sur {{total}} ({{share}})

Délai d'une commande par étape

Avant

Maintenant

Solde

Paiement client

Facture fournisseur

Paie

Frais de carte

Remboursement

Dernière : {{time}} · {{kind}} {{amount}}

Pause

Reprendre

Trésorerie de la journée, mise à jour en direct

Engagé

Ajouté

Retiré

Réestimé

Reporté

Terminé

Points d'effort

Orientation

Verticale

Horizontale

Étiquettes

Connecteurs

Périmètre du sprint, des points engagés aux points terminés

## WaterfallChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "WaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Writes the change (or the total) at the end of every bar",
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
    "name": "connector",
    "type": "boolean | ChartConnectorOptions",
    "required": false,
    "description": "Thin lines from the end of every bar to the next one; an object styles them (default `true`: dashed, secondary text color)",
    "typeText": "boolean | ChartConnectorOptions"
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
  },
  {
    "name": "start",
    "type": "number",
    "required": false,
    "description": "Value the first change starts from (default 0)",
    "typeText": "number"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the series (tooltip; default \"Change\")",
    "typeText": "string"
  },
  {
    "name": "orientation",
    "type": "ChartOrientation",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom (default `vertical`)",
    "typeText": "ChartOrientation"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values (labels, tooltip)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of the increases (the success color by default)",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of the decreases (the danger color by default)",
    "typeText": "string"
  },
  {
    "name": "totalColor",
    "type": "string",
    "required": false,
    "description": "Color of the totals and subtotals (the primary color by default)",
    "typeText": "string"
  },
  {
    "name": "steps",
    "type": "readonly WaterfallStep[]",
    "required": true,
    "description": "Changes, subtotals and totals, in order",
    "typeText": "readonly WaterfallStep[]"
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

## Example: cash-flow

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/cash-flow.vue

```vue
<script setup lang="ts">
// Monthly cash flows from an opening balance: rows instead of
// columns (`orientation="horizontal"`), values in the tooltip only.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

const { language } = useI18n();
const steps = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" as const },
  ];
});
</script>

<template>
  <WaterfallChart
    :steps="steps"
    :labels="false"
    orientation="horizontal"
    :height="360"
  />
</template>

```

## Example: pnl

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/pnl.vue

```vue
<script setup lang="ts">
// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

const { language } = useI18n();
const steps = computed(() => {
  const label = STEPS[language.value] ?? STEPS.en;
  return [
    { label: label[0], value: 420 },
    { label: label[1], value: -180 },
    { label: label[2], kind: "subtotal" as const },
    { label: label[3], value: -130 },
    { label: label[4], value: 25 },
    { label: label[5], value: -34 },
    { label: label[6], kind: "total" as const },
  ];
});
const format = (value: number) => `${value} k€`;
</script>

<template>
  <WaterfallChart :steps="steps" :format="format" :height="320" />
</template>

```
