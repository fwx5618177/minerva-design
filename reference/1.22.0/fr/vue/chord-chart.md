# Diagramme d’accords

Flux entre des groupes disposés en cercle : chaque groupe est un arc dimensionné par ses flux, chaque flux un ruban entre deux arcs. Non orienté, un ruban relie une paire de groupes et sa largeur est la somme des flux dans les deux sens (une matrice symétrique compte chaque relation une seule fois), si bien qu’un groupe qui ne fait que recevoir garde son arc ; orienté, chaque sens a son propre ruban, terminé par une flèche. Survolez un groupe pour mettre ses rubans en avant, un ruban pour lire les deux sens ; la légende masque / affiche les groupes et les flèches du clavier parcourent les groupes puis les rubans.

Package: minerva-design@1.22.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Design

Ingénierie

Produit

Marketing

Messages échangés entre quatre équipes en une semaine

Amérique du Nord

Amérique latine

Europe

Afrique

Asie occidentale

Asie du Sud

Asie de l’Est

Océanie

{{value}} M de personnes

Flux migratoires entre les régions du monde sur cinq ans

app

router

store

ui-kit

api-client

auth

i18n

utils

Imports entre les modules d’une base de code

États-Unis

Chine

Union européenne

Mexique

Canada

Japon

Corée du Sud

Commerce de marchandises entre grandes économies sur un an

Accueil

Recherche

Catégorie

Produit

Panier

Paiement

{{value}} k visites

Survolez une page ou un ruban

{{source}} → {{target}} : {{value}} (dans l’autre sens : {{reverse}})

{{name}} : {{value}} en entrée et en sortie

Navigation entre les pages d’une application de boutique en une journée

États-Unis Est

États-Unis Ouest

Europe centrale

Asie-Pacifique SE

Asie-Pacifique NE

Amérique du Sud

{{value}} Gbit/s

Trafic de réplication entre centres de données

Libellés

Auto

Tangentiels

Radiaux

Aucun

Ordre des groupes

Ordre des données

Du plus grand

Du plus petit

Couleur des rubans

Dégradé

Source

Cible

Neutre

Orienté

Graduations

Autres opérateurs

Année

{{year}}

{{name}} {{value}}

{{name}} a gagné le plus d'abonnés ({{value}} en net). Solde net : {{list}}.

Abonnés changeant d'opérateur mobile en {{year}}

Physique

Chimie

Biologie

Médecine

Informatique

Mathématiques

Économie

Ingénierie

Cliquez sur une faculté pour voir ses collaborations, ou sur un ruban pour voir une paire

{{name}} : {{total}} articles co-écrits, surtout avec {{partners}}

{{name}} ({{value}})

{{a}} et {{b}} : {{value}} articles co-écrits

Effacer

Articles co-écrits par les facultés d'une université sur cinq ans

Café

Lait

Pain

Viennoiseries

Fruits

Céréales

Yaourts

Jus

{{a}} + {{b}}

Achetés ensemble dans {{value}} paniers ({{share}} de tous les paniers)

{{value}} associations avec d'autres catégories

Catégories de produits achetées ensemble dans un même panier sur un mois

Passerelle

Utilisateurs

Commandes

Stocks

Paiements

Notifications

{{value}} appels/s

Total : {{total}}. Le plus chargé : {{from}} → {{to}} ({{value}})

Pause

Reprendre

Appels par seconde entre microservices, en direct

Londres

Paris

Francfort

Istanbul

Dubaï

Singapour

Tokyo

New York

{{value}} M de passagers

Afficher toutes les plateformes

Plateformes de l'Est

Plateformes de l'Ouest

Affichez au moins deux plateformes pour voir les liaisons entre elles

{{shown}} plateformes sur {{total}} affichées : {{routes}} liaisons, {{passengers}} par an

Passagers annuels entre les grandes plateformes aéroportuaires

## ChordChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ChordChart"
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
    "name": "ticks",
    "type": "number | boolean",
    "required": false,
    "description": "Value ticks outside the arcs; a number sets the step between ticks (default `true` when large enough)",
    "typeText": "number | boolean"
  },
  {
    "name": "directed",
    "type": "boolean",
    "required": false,
    "description": "One ribbon per direction, arcs sized by the outgoing plus the incoming flows (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "arrows",
    "type": "boolean",
    "required": false,
    "description": "Arrowheads at the target end of the ribbons (default `true` when `directed`)",
    "typeText": "boolean"
  },
  {
    "name": "groups",
    "type": "readonly (string | ChordGroup)[]",
    "required": false,
    "description": "Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended",
    "typeText": "readonly (string | ChordGroup)[]"
  },
  {
    "name": "labels",
    "type": "\"auto\" | \"none\" | \"tangential\" | \"radial\"",
    "required": false,
    "description": "Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks the one that fits (default `auto`)",
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
    "name": "padAngle",
    "type": "number",
    "required": false,
    "description": "Gap between the groups, in degrees (default 2)",
    "typeText": "number"
  },
  {
    "name": "startAngle",
    "type": "number",
    "required": false,
    "description": "Angle of the first group, degrees clockwise from 12 o'clock (default 0)",
    "typeText": "number"
  },
  {
    "name": "ribbonOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the ribbons, 0-1 (default 0.65)",
    "typeText": "number"
  },
  {
    "name": "arcWidth",
    "type": "number",
    "required": false,
    "description": "Thickness of the group arcs, in pixels (default 6% of the radius)",
    "typeText": "number"
  },
  {
    "name": "matrix",
    "type": "readonly (readonly number[])[]",
    "required": false,
    "description": "Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent)",
    "typeText": "readonly (readonly number[])[]"
  },
  {
    "name": "links",
    "type": "readonly ChordLink[]",
    "required": false,
    "description": "Flows as a list (by group name or index); takes precedence over `matrix`",
    "typeText": "readonly ChordLink[]"
  },
  {
    "name": "sortGroups",
    "type": "\"none\" | \"ascending\" | \"descending\"",
    "required": false,
    "description": "Order of the groups around the circle (default `none`: data order)",
    "typeText": "\"none\" | \"ascending\" | \"descending\""
  },
  {
    "name": "sortSubgroups",
    "type": "\"auto\" | \"none\" | \"ascending\" | \"descending\"",
    "required": false,
    "description": "Order of the ribbon ends along an arc: `auto` minimizes the crossings (default `auto`)",
    "typeText": "\"auto\" | \"none\" | \"ascending\" | \"descending\""
  },
  {
    "name": "ribbonColor",
    "type": "\"neutral\" | \"target\" | \"gradient\" | \"source\"",
    "required": false,
    "description": "Color of the ribbons without `color` (default `gradient`)",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\""
  },
  {
    "name": "tickFormat",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the tick labels (default: compact numbers of the `locale`)",
    "typeText": "((value: number) => string)"
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

## Example: migration

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/vue/migration.vue

```vue
<script setup lang="ts">
// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; @hover reads both directions of a ribbon
// (`value` and `reverseValue`).
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
</script>

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

```

## Example: teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/vue/teams.vue

```vue
<script setup lang="ts">
// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { ChordChart } from "minerva-design/vue/charts";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

const { language } = useI18n();
const groups = computed(() => TEAMS[language.value] ?? TEAMS.en);
</script>

<template>
  <ChordChart :groups="groups" :matrix="MATRIX" />
</template>

```
