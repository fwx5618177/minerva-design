# Entonnoir

Les étapes d’un processus qui perd du volume en chemin (inscriptions, pipeline commercial, paiement), avec le taux de conversion d’une étape à la suivante. Survolez ou utilisez les flèches pour mettre une étape en évidence ; un clic sur la légende la masque.

Package: minerva-design@1.22.2

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Page des tarifs

Inscription commencée

E-mail vérifié

Projet créé

Collègue invité

Passage à l'offre payante

{{users}} utilisateurs

{{share}} des visiteurs

{{users}} perdus depuis « {{stage}} »

Entonnoir d'inscription

Alertes

Tableaux de bord

Intégrations

Rapports

API publique

Ordre de tri

Décroissant

Croissant

Ordre des données

{{users}} utilisateurs par semaine

Utilisateurs actifs hebdomadaires par fonctionnalité

Visites

Fiche produit

Ajout au panier

Commande

Paiement

Commande validée

Étape

Visiteurs

Abandon

{{share}} de la première étape

Tunnel de commande d'une boutique en ligne

Abandon entre les étapes

Candidature

Présélection

Entretien technique

Entretien sur site

Offre

Embauche

{{candidates}} candidats

Durée habituelle de l'étape : {{days}}

Processus de recrutement d'un poste d'ingénieur

{{stage}} : {{candidates}} candidats ({{share}} des candidatures)

{{rate}} des candidats sont embauchés, en {{days}} en moyenne

Ordinateur

Mobile

{{rate}} de conversion

Tunnel de commande : {{device}}

Impressions

Clics

Prospects

Prospects qualifiés

Clients

Tous les canaux

Annonces de recherche

Réseaux sociaux

E-mail

Partenaires

Canal

{{share}} de l’étape précédente

Coût par résultat : {{cost}}

Entonnoir marketing du mois : {{channel}}

Dépenses : {{spend}} · Clients : {{customers}} · Coût d’acquisition : {{cac}} par client

Visites

Ajouts au panier

Paiement

Commandes payées

Entonnoir de paiement mensuel calculé à partir des taux de conversion

{{from}} → {{to}}

Baisser la conversion de {{step}}

Augmenter la conversion de {{step}}

Revenir aux taux actuels

{{orders}} commandes ({{ordersDelta}}) · {{revenue}} de chiffre d’affaires ({{revenueDelta}}) par mois

Visiteurs

Offre consultée

Ajouts au panier

Paiement

Commandes

Entonnoir de la vente flash, mis à jour en direct

Pause

Reprendre

Recommencer

{{time}} · {{orders}} commandes · {{rate}} des visiteurs

La vente est terminée : {{orders}} commandes.

Prospect

Qualifié

Démo

Proposition

Négociation

{{deals}} affaires · {{amount}}

Probabilité de gain : {{share}}

Affaires en cours par étape du pipeline, en montant

{{stage}} : {{deals}} affaires en cours

Prévision pondérée : {{amount}}

Cliquez sur une étape pour lister ses affaires.

## FunnelChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FunnelChart"
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
    "name": "conversion",
    "type": "boolean",
    "required": false,
    "description": "Shows the conversion rate from the previous stage (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "sort",
    "type": "\"none\" | \"ascending\" | \"descending\"",
    "required": false,
    "description": "Order of the stages (default `none`: the data order)",
    "typeText": "\"none\" | \"ascending\" | \"descending\""
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
    "type": "\"bar\" | \"trapezoid\"",
    "required": false,
    "description": "Shape of the stages: trapezoids narrowing to the next stage, or centered bars (default `trapezoid`)",
    "typeText": "\"bar\" | \"trapezoid\""
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
    "name": "data",
    "type": "readonly ShapeDatum[]",
    "required": true,
    "description": "Stages: a name, a value and an optional color",
    "typeText": "readonly ShapeDatum[]"
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
    "name": "gap",
    "type": "number",
    "required": false,
    "description": "Vertical gap between the stages, in pixels (default 4)",
    "typeText": "number"
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

## Example: bars

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/vue/bars.vue

```vue
<script setup lang="ts">
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

const { language } = useI18n();
const data = computed(() =>
  [180, 940, 42, 410, 31].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <FunnelChart :data="data" shape="bar" sort="descending" :height="300" />
</template>

```

## Example: conversion

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/vue/conversion.vue

```vue
<script setup lang="ts">
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

const { language } = useI18n();
const data = computed(() =>
  [12000, 4800, 2100, 860].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <FunnelChart :data="data" :height="300" />
</template>

```
