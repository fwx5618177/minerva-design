# Diagramme de Sankey

Des flux entre étapes : bilans énergétiques, parcours utilisateurs, répartitions budgétaires. Les nœuds sont rangés en colonnes, l'épaisseur d'un lien est proportionnelle à son flux, et l'ordre des nœuds est relaxé pour redresser les flux et limiter les croisements. Survolez un nœud pour mettre en avant tous ses flux, ou un lien pour voir sa part dans sa source ; les flèches du clavier parcourent les nœuds et les liens.

Package: minerva-design@1.22.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Solaire

Éolien

Hydraulique

Nucléaire

Gaz naturel

Charbon

Pétrole

Électricité

Réseaux de chaleur

Carburants

Résidentiel

Industrie

Tertiaire

Transports

Pertes

{{value}} TWh

Bilan énergétique : sources primaires, vecteurs et usages finaux, en térawattheures par an

Annonces

Recherche naturelle

Newsletter

Réseaux sociaux

Accueil

Page tarifs

Blog

Inscription

Départ du site

Essai démarré

Abandon

Offre payante

Essai expiré

Sessions d'une semaine, du canal d'acquisition à l'abonnement

{{source}} → {{target}} : {{value}} sessions ({{share}} % de {{source}})

{{name}} : {{value}} sessions

Cliquez sur une étape ou un chemin (ou donnez le focus au graphique et appuyez sur Entrée) pour le sélectionner

Licences

Abonnements

Services

Subventions

Budget annuel

R&D

Ventes et marketing

Opérations

Administration

Plateforme

Applications mobiles

Recherche en IA

Campagnes

Équipe commerciale

Infrastructure

Support client

Finance et juridique

Bureaux

Budget annuel : sources de revenus, départements et programmes

E-mail

Chat

Téléphone

Chatbot

Niveau 1

Niveau 2

Ingénierie

Résolu

Remboursé

Bug signalé

Tickets de support d'un mois, du canal au résultat

Alignement des nœuds

Justifié

Gauche

Droite

Centré

Couleur des liens

Dégradé

Source

Cible

Neutre

Valeurs dans les étiquettes

Cloud

Licences

Matériel

Services

Chiffre d'affaires

Coût des ventes

Marge brute

R&D

Ventes et marketing

Frais généraux

Résultat d'exploitation

Impôt sur les sociétés

Résultat net

Compte de résultat trimestriel : segments de chiffre d'affaires, coûts et marges

Marge brute {{gross}} · marge d'exploitation {{operating}} · marge nette {{net}}

Brésil

Colombie

Éthiopie

Viêt Nam

Torréfaction de Hambourg

Torréfaction de Rotterdam

Entrepôt Nord

Entrepôt Centre

Entrepôt Sud

Cafés

Supermarchés

Boutique en ligne

{{value}} t

Café expédié en un mois, des pays d'origine aux canaux de vente en passant par les torréfactions et les entrepôts

Cliquez sur un site pour suivre tout ce qui le traverse, ou sur une expédition pour la sélectionner

{{name}} : {{inbound}} reçues de {{from}} sites, {{outbound}} envoyées vers {{to}} sites

{{source}} → {{target}} : {{value}} ({{share}} des envois de {{source}})

Effacer la sélection

Cooptation

Sites d'emploi

Réseaux professionnels

Cabinets

Écoles

Candidatures

Refusés sur CV

Entretien téléphonique

Non retenus après l'appel

Entretiens

Non retenus après les entretiens

Offres

Offre déclinée

Embauchés

Afficher les abandons

Entonnoir de recrutement d'une année, de la source du candidat à l'embauche

{{applied}} candidatures, {{hired}} embauches ({{rate}}). {{interview}} des candidats appelés passent les entretiens et {{accepted}} des offres sont acceptées.

Application web

Application iOS

Application Android

API partenaires

Passerelle API

Authentification

Catalogue

Recherche

Paiement

2xx succès

4xx erreur client

5xx erreur serveur

{{value}} req/s

Total : {{total}}.

Erreurs serveur : {{rate}}

Erreurs serveur : {{rate}}, incident sur le paiement

Pause

Reprendre

Trafic d'API en direct, en requêtes par seconde, des clients vers les services et leurs codes de statut

Bouteilles et barquettes PET

Flacons PEHD

Pots et bouchons PP

Films PEBD

Autres polymères

Emballages mis sur le marché

Collectés pour recyclage

Incinérés

Mis en décharge

Rejetés dans la nature

Recyclés

Refus de tri

Nouveaux emballages

Produits de moindre qualité

{{value}} Mt

{{share}} de « {{source}} »

{{share}} de l'ensemble des emballages

Emballages plastiques d'une année en mégatonnes : polymères, filières de fin de vie et recyclage

## SankeyChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SankeyChart"
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
    "name": "labels",
    "type": "boolean",
    "required": false,
    "description": "Node labels (name and value; default `true`)",
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
    "name": "labelValues",
    "type": "boolean",
    "required": false,
    "description": "Shows the value after the name in the labels (default `true`)",
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
    "name": "links",
    "type": "readonly SankeyLink[]",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored",
    "typeText": "readonly SankeyLink[]"
  },
  {
    "name": "nodes",
    "type": "readonly SankeyNode[]",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended",
    "typeText": "readonly SankeyNode[]"
  },
  {
    "name": "align",
    "type": "\"left\" | \"right\" | \"center\" | \"justify\"",
    "required": false,
    "description": "Column of the nodes without a `column` (default `justify`)",
    "typeText": "\"left\" | \"right\" | \"center\" | \"justify\""
  },
  {
    "name": "nodeWidth",
    "type": "number",
    "required": false,
    "description": "Width of the node bars, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "nodePadding",
    "type": "number",
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "iterations",
    "type": "number",
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings (default 32)",
    "typeText": "number"
  },
  {
    "name": "linkOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the links, 0-1 (default 0.4)",
    "typeText": "number"
  },
  {
    "name": "linkColor",
    "type": "\"neutral\" | \"target\" | \"gradient\" | \"source\"",
    "required": false,
    "description": "Color of the links without `color` (default `gradient`)",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\""
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

## Example: energy

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/energy.vue

```vue
<script setup lang="ts">
// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (NODES[language.value] ?? NODES.en).map((name) => ({ name })),
);
const format = (value: number) => `${value} TWh`;
</script>

<template>
  <SankeyChart :nodes="nodes" :links="LINKS" :format="format" />
</template>

```

## Example: journey

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/journey.vue

```vue
<script setup lang="ts">
// A user journey with drop-offs: `align="left"` keeps every step in its
// column, `link-color="source"` colors a flow like the page it leaves.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (STEPS[language.value] ?? STEPS.en).map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  })),
);
</script>

<template>
  <SankeyChart :nodes="nodes" :links="FLOWS" align="left" link-color="source" />
</template>

```
