# Diagramme en rayons de soleil

Une hiérarchie dessinée en anneaux concentriques : chaque anneau est un niveau, chaque secteur une part de son parent. Cliquez sur un parent (ou appuyez sur Entrée) pour zoomer, sur le centre (ou Retour arrière) pour remonter ; la transition anime les angles et les anneaux. Survoler un secteur met en avant ses ancêtres et ses descendants, et les étiquettes suivent l'arc ou le rayon, selon la place.

Package: minerva-design@1.22.1

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Macintosh HD

Applications

Documents

Projets

Archives

PDF

Tableurs

Photos

Développement

Caches de paquets

Simulateurs

Système

Musique

Autres applications

{{value}} Go

Espace disque par dossier, en gigaoctets

Affichage de {{path}}. Cliquez sur le centre pour remonter.

Cliquez sur un dossier pour zoomer dessus.

Ingénierie

Plateforme

Infrastructure

Sécurité

Outils développeurs

Ingénierie produit

Web

Mobile

Paiements

Données

Analyse

Apprentissage automatique

Ventes

EMEA

Amériques

APAC

Succès client

Support

Intégration

Marketing

Marque

Croissance

Contenu

Opérations

Finance

RH

Juridique

Informatique

{{value}} personnes

Effectifs par département, groupe et équipe

Tous les produits

Électronique

Téléphones

Haut de gamme

Milieu de gamme

Accessoires

Ordinateurs portables

Audio

Casques

Enceintes

Maison

Cuisine

Mobilier

Décoration

Mode

Homme

Femme

Enfant

Sport

Plein air

Fitness

Chemin de la catégorie

Chiffre d'affaires trimestriel par catégorie de produits

Asie

Afrique

Europe

Amériques

Océanie

Autres pays

{{value}} M

Mode des étiquettes

Auto

Le long de l'arc

Le long du rayon

Aucune

Population mondiale par continent et par pays, en millions

Éducation

Santé

Transports

Sécurité publique

Environnement

Administration

Écoles

Universités

Bibliothèques

Hôpitaux

Prévention

Transports en commun

Voirie

Pistes cyclables

Police

Pompiers

Parcs

Collecte des déchets

Eau

{{path}} : {{amount}}, soit {{share}} du budget et {{areaShare}} du domaine {{area}}.

{{path}} : {{amount}}, soit {{share}} du budget.

Budget annuel de la ville par domaine et par programme

Budget annuel : {{total}}. Cliquez sur un secteur pour lire sa part.

Chaîne de boulangeries

Cabinet dentaire

École de langues

Interne

Site web

Identité visuelle

Système de réservation

Application mobile

Administration

Formation

Design

Développement

Réunions

Relecture

Support

Apprentissage

Période

Cette semaine

Ce mois-ci

{{hours}} · {{share}} du temps saisi

Heures saisies par client, projet et activité ({{period}})

Facturable : {{billable}} sur {{total}} ({{share}}).

Paiement

Recherche

Comptes

Catalogue

Panier

Règlement

Livraison

Requêtes

Suggestions

Connexion

Profil

Fiches produit

Avis

{{value}} req./min

Requêtes d’API par minute, par service et par endpoint, mises à jour en direct

Pause

Reprendre

Total : {{value}}

Service le plus sollicité : {{service}}

Renouvelables

Nucléaire

Fossiles

Éolien

Solaire

Hydraulique

Biomasse

Gaz naturel

Charbon

Pétrole

{{value}} TWh

Masquer les énergies fossiles

Production annuelle d’électricité par source et par combustible

Renouvelables masquées : {{total}} affichés.

Renouvelables : {{share}} des {{total}} affichés.

## SunburstChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SunburstChart"
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
    "name": "drill",
    "type": "boolean",
    "required": false,
    "description": "Clicking (or Enter on) a parent zooms into it; clicking the center goes back up (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "\"auto\" | \"none\" | \"tangential\" | \"radial\"",
    "required": false,
    "description": "Sector labels along the arc or the radius, whichever fits best (`auto`), or none (default `auto`)",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\""
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
    "type": "readonly TreemapNode[]",
    "required": true,
    "description": "Nodes: leaves carry a value, parents sum their children",
    "typeText": "readonly TreemapNode[]"
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
    "description": "Rings shown at once below the focused node (default: every level)",
    "typeText": "number"
  },
  {
    "name": "padAngle",
    "type": "number",
    "required": false,
    "description": "Gap between the sectors, in pixels (default 1)",
    "typeText": "number"
  },
  {
    "name": "startAngle",
    "type": "number",
    "required": false,
    "description": "Angle of the first node, degrees clockwise from 12 o'clock (default 0)",
    "typeText": "number"
  },
  {
    "name": "innerRadius",
    "type": "number",
    "required": false,
    "description": "Radius of the center circle as a fraction of the outer radius (default 0.26)",
    "typeText": "number"
  },
  {
    "name": "cornerRadius",
    "type": "number",
    "required": false,
    "description": "Corner radius of the sectors, in pixels (default 2)",
    "typeText": "number"
  },
  {
    "name": "drillPath",
    "type": "readonly string[]",
    "required": false,
    "description": "Names from the root to the focused node (`[]` = the root); makes the drill-down controlled (clicks only emit `drill`)",
    "typeText": "readonly string[]"
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
  },
  {
    "name": "drill",
    "type": "[event: ShapeDrillEvent]",
    "typeText": "[event: ShapeDrillEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: disk-usage

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/vue/disk-usage.vue

```vue
<script setup lang="ts">
// Disk usage as rings: folders inside, their content outside; click a
// folder to zoom into it, the center to go back up.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SunburstChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    folders: ["Documents", "Photos", "Music", "Apps"],
    files: [
      "Work",
      "Taxes",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Tools",
      "Games",
    ],
  },
  zh: {
    folders: ["文档", "照片", "音乐", "应用"],
    files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
  },
  ja: {
    folders: ["書類", "写真", "ミュージック", "アプリ"],
    files: [
      "仕事",
      "税金",
      "2025",
      "2026",
      "アルバム",
      "ポッドキャスト",
      "ツール",
      "ゲーム",
    ],
  },
  fr: {
    folders: ["Documents", "Photos", "Musique", "Applications"],
    files: [
      "Travail",
      "Impôts",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Outils",
      "Jeux",
    ],
  },
};

const { language } = useI18n();
const data = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.folders[0],
      children: [
        { name: text.files[0], value: 12 },
        { name: text.files[1], value: 3 },
      ],
    },
    {
      name: text.folders[1],
      children: [
        { name: text.files[2], value: 46 },
        { name: text.files[3], value: 21 },
      ],
    },
    {
      name: text.folders[2],
      children: [
        { name: text.files[4], value: 18 },
        { name: text.files[5], value: 7 },
      ],
    },
    {
      name: text.folders[3],
      children: [
        { name: text.files[6], value: 9 },
        { name: text.files[7], value: 32 },
      ],
    },
  ];
});
const format = (value: number) => `${value} GB`;
</script>

<template>
  <SunburstChart :data="data" :format="format" />
</template>

```

## Example: drill-down

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/vue/drill-down.vue

```vue
<script setup lang="ts">
// @drill reports the path from the root to the focused node: a breadcrumb
// outside of the chart.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { SunburstChart, type ShapeDrillEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
});
const path = ref<string[] | null>(null);
const onDrill = (event: ShapeDrillEvent) => {
  path.value = event.path;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <SunburstChart :data="data" :inner-radius="0.32" @drill="onDrill" />
    <output aria-live="polite">
      {{
        path ? [text.root, ...path].join(" › ") : `${text.root} · ${text.hint}`
      }}
    </output>
  </div>
</template>

```
