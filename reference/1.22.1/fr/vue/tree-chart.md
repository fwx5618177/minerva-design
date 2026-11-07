# Arbre

Hiérarchies dessinées en arbres ordonnés, arbres radiaux, cartes mentales et organigrammes : organisations, systèmes de fichiers, taxonomies, plans. L’arbre ordonné (Buchheim / Reingold–Tilford) ne superpose jamais les nœuds et centre chaque parent au-dessus de ses enfants ; les sous-arbres se replient et se déplient avec une animation, au clic, au clavier ou par l’API.

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

#### Vue d’ensemble

TreeChart reçoit des nœuds et des arêtes parent → enfant ; les nœuds sans parent sont des racines (tree.root en choisit une). Les arêtes qui créeraient un cycle ou un second parent sont ignorées.

L’arbre ordonné se calcule en temps linéaire et tient compte de la taille de chaque nœud : les libellés ne se chevauchent pas, les parents sont centrés sur leurs enfants et des sous-arbres identiques se dessinent de la même façon.

layout="tree" (de gauche à droite par défaut, tout sens possible), "radial" (anneaux autour de la racine, libellés le long du rayon), "mindmap" (branches équilibrées des deux côtés, une couleur par branche) et "org" (cartes avec titre et sous-titre, connecteurs orthogonaux, équipes terminales empilées en colonnes).

Cliquez sur un nœud qui a des enfants, appuyez sur Entrée ou appelez expand / collapse / toggle : son sous-arbre se replie dans le nœud avec une animation et un badge compte les nœuds masqués. collapsed sur un nœud le replie au départ.

Claire Dubois

Thomas Martin

Sophie Laurent

Marc Lefèvre

Camille Moreau

Hugo Bernard

Lucas Petit

Léa Fournier

Nathan Girard

Julien Faure

Manon Blanc

Antoine Mercier

Isabelle Garnier

Paul Chevalier

Julie Lambert

Nicolas Robin

Chloé Henry

Maxime Perrin

Présidente-directrice générale

Directeur technique

Directrice financière

Directeur des opérations

Directrice marketing

Responsable front-end

Responsable back-end

Ingénieure front-end

Ingénieur front-end

Ingénieur back-end

Ingénieure back-end

Ingénieur fiabilité

Contrôleuse de gestion

Analyste financier

Responsable support

Responsable logistique

Responsable de marque

Responsable croissance

Direction

Ingénierie

Finance

Opérations

Marketing

Organigramme de l’entreprise

Cliquez sur un responsable pour replier ou déplier son équipe.

Équipe de {{name}} repliée

Équipe de {{name}} dépliée

Lancement produit

Objectifs

10 000 clients payants

Notoriété

90 % de rétention

Public

Équipes produit

Indépendants

Étudiants

Canaux

Événement de lancement

Lettre d’information

Partenaires

Réseaux sociaux

Calendrier

Bêta privée

Dossier de presse

Jour J

Risques

Retards

Retours sur le prix

Budget

Publicité

Événements

Carte mentale d’un plan de lancement produit

Saisie

Navigation

Retour

Affichage de données

Mise en page

Graphiques

Composants du design system par catégorie

Dossiers

```tsx
Code
```

Styles

Données

Docs

Tout déplier

Tout replier

Tout afficher

Fichiers d’un projet

Score de crédit

Revenu ≥ 3 × mensualité ?

En poste depuis 2 ans ou plus ?

Taux d'endettement < 35 % ?

Accordé

Accordé, montant réduit

Accordé, taux majoré

Étude manuelle

Refusé

700 ou plus

600–699

Moins de 600

Oui

Non

Question

Accordé

Étude

Refusé

Arbre de décision d'octroi de prêt, avec le chemin du demandeur actuel en évidence

Décision : {{outcome}} (questions posées : {{questions}}).

Tous les produits

High-tech

Maison

Mode

Sport

Informatique

Téléphonie

Audio

Ordinateurs portables

Ordinateurs de bureau

Tablettes

Smartphones

Coques

Chargeurs

Casques

Enceintes

Cuisine

Mobilier

Jardin

Ustensiles de cuisson

Machines à café

Couteaux

Canapés

Bureaux

Chaises de bureau

Outils de jardin

Plantes

Vêtements

Chaussures

Accessoires

Vestes

Robes

Baskets

Bottes

Sacs

Montres

Plein air

Fitness

Vélo

Tentes

Chaussures de randonnée

Tapis de yoga

Haltères

Vélos

Casques de vélo

 › 

Rechercher une catégorie

Taxonomie des catégories de produits d'une boutique

Catégories correspondantes : {{total}}. Appuyez sur Entrée ou choisissez une étiquette pour en afficher une.

Recherchez une catégorie, par exemple « bottes » ou « bureau ».

Macintosh HD

Système

Applications

Médias

Documents

Caches et sauvegardes

Disposition

Arbre

Radiale

Occupation du disque par dossier, proportionnelle aux octets

{{name}} : {{size}} — {{parentShare}} de {{parent}}, {{share}} du disque.

{{name}} : {{size}} utilisés.

Version 2.0 de l'app

Accueil des nouveaux

Inscription

Vérification de l'e-mail

Connexion sociale

Visite guidée

Écrans de la visite

Passer et reprendre

Paiements

Commande

Formulaire de carte

Paiement par portefeuille

Facturation

Factures

Remboursements

Plateforme

Mode hors ligne

File de synchronisation

Résolution des conflits

Qualité

Rapports de plantage

Budget de performance

{{points}} pts

{{points}} pts · {{done}} faits

Synthèse

Terminé

En cours

À faire

Niveau de détail

Livrables

Fonctionnalités

Lots de travail

Plan affiché jusqu'au niveau : {{level}}.

Organigramme des tâches d'une version d'application mobile, avec les points

{{name}} replié : {{points}} points, {{remaining}} restants.

{{name}} déplié : {{points}} points, {{remaining}} restants.

{{points}} points au total, {{done}} faits. Cliquez sur un élément pour le replier ou le déplier.

Quart de finale

Demi-finale

Finale

À jouer

{{winner}}–{{loser}}

Tête de série {{n}}

Non joué

Vainqueur

En lice

Éliminée

Champion

Tour suivant

Recommencer

Nouvelle simulation

Tableau à élimination directe, des quarts de finale à la finale

{{team}} remporte le tournoi !

Vainqueurs ({{round}}) : {{teams}}.

Huit équipes classées selon leur niveau. Jouez le tour suivant pour révéler les résultats.

## TreeChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TreeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "number | boolean",
    "required": false,
    "description": "Animates layout and data changes; a number is the duration in ms (default `true`)",
    "typeText": "number | boolean"
  },
  {
    "name": "layout",
    "type": "\"radial\" | \"tree\" | \"mindmap\" | \"org\"",
    "default": "\"tree\"",
    "required": false,
    "description": "Kind of tree: tidy tree, radial tree, two-sided mind map or org chart (default `tree`)",
    "typeText": "\"radial\" | \"tree\" | \"mindmap\" | \"org\""
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
    "type": "boolean | GraphLegendOptions",
    "required": false,
    "description": "Legend of the groups; shown by default with several groups",
    "typeText": "boolean | GraphLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | GraphTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | GraphTooltipOptions"
  },
  {
    "name": "interaction",
    "type": "boolean | GraphInteractionOptions",
    "required": false,
    "description": "Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged, click selects, arrow keys move; `false` makes the chart static (default `true`)",
    "typeText": "boolean | GraphInteractionOptions"
  },
  {
    "name": "arrows",
    "type": "boolean",
    "required": false,
    "description": "Arrowheads on the edges without `directed` (on for DAGs)",
    "typeText": "boolean"
  },
  {
    "name": "nodeLabels",
    "type": "boolean | \"auto\"",
    "required": false,
    "description": "Node labels; `auto` hides minor and overlapping labels when zoomed out (default `auto`)",
    "typeText": "boolean | \"auto\""
  },
  {
    "name": "edgeLabels",
    "type": "boolean | \"auto\" | \"hover\"",
    "required": false,
    "description": "Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never (default `auto`)",
    "typeText": "boolean | \"auto\" | \"hover\""
  },
  {
    "name": "controls",
    "type": "boolean",
    "required": false,
    "description": "Zoom buttons (zoom in, zoom out, fit; default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "groups",
    "type": "readonly GraphGroup[]",
    "required": false,
    "description": "Groups: legend order, names and colors",
    "typeText": "readonly GraphGroup[]"
  },
  {
    "name": "labels",
    "type": "Partial<GraphChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<GraphChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
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
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
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
    "description": "Language of the built-in texts (summary, announcements, tooltip, buttons); the page language by default",
    "typeText": "string"
  },
  {
    "name": "highlight",
    "type": "\"none\" | \"neighbors\" | \"lineage\"",
    "required": false,
    "description": "What hovering / selecting a node highlights",
    "typeText": "\"none\" | \"neighbors\" | \"lineage\""
  },
  {
    "name": "direction",
    "type": "GraphDirection",
    "required": false,
    "description": "Direction of `layout=\"tree\"` (default `LR`)",
    "typeText": "GraphDirection"
  },
  {
    "name": "nodes",
    "type": "readonly GraphNode[]",
    "required": true,
    "description": "The nodes (a new array re-runs the layout; an array rebuilt with the same node objects does not)",
    "typeText": "readonly GraphNode[]"
  },
  {
    "name": "edges",
    "type": "readonly GraphEdge[]",
    "required": true,
    "description": "The edges (parent → child in trees, prerequisite → dependent in DAGs)",
    "typeText": "readonly GraphEdge[]"
  },
  {
    "name": "nodeShape",
    "type": "GraphNodeShape",
    "required": false,
    "description": "Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise)",
    "typeText": "GraphNodeShape"
  },
  {
    "name": "nodeSize",
    "type": "number | readonly [number, number]",
    "required": false,
    "description": "Circle diameter in layout units, or `[min, max]` scaled by the node `value`",
    "typeText": "number | readonly [number, number]"
  },
  {
    "name": "edgeStyle",
    "type": "GraphEdgeStyle",
    "required": false,
    "description": "Edge shape; depends on the layout when omitted",
    "typeText": "GraphEdgeStyle"
  },
  {
    "name": "edgeWidth",
    "type": "number | readonly [number, number]",
    "required": false,
    "description": "Edge width in CSS pixels, or `[min, max]` scaled by the edge `value`",
    "typeText": "number | readonly [number, number]"
  },
  {
    "name": "edgeColor",
    "type": "\"neutral\" | \"target\" | \"source\"",
    "required": false,
    "description": "Edge colors: neutral or tinted with the source / target node (default `neutral`)",
    "typeText": "\"neutral\" | \"target\" | \"source\""
  },
  {
    "name": "arrowStyle",
    "type": "\"open\" | \"filled\"",
    "required": false,
    "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color; default `open`)",
    "typeText": "\"open\" | \"filled\""
  },
  {
    "name": "selected",
    "type": "readonly string[]",
    "required": false,
    "description": "Ids of the selected nodes (changing it updates the selection)",
    "typeText": "readonly string[]"
  },
  {
    "name": "fitPadding",
    "type": "number",
    "required": false,
    "description": "Padding around the graph when fitting it, in CSS pixels (default 24)",
    "typeText": "number"
  },
  {
    "name": "tree",
    "type": "GraphTreeOptions",
    "required": false,
    "description": "Root, spacing, collapsing, card size",
    "typeText": "GraphTreeOptions"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: GraphHoverEvent | null]",
    "typeText": "[event: GraphHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphHoverEvent | null",
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
  },
  {
    "name": "toggle",
    "type": "[event: GraphToggleEvent]",
    "typeText": "[event: GraphToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "type": "[ids: string[]]",
    "typeText": "[ids: string[]]",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "groupToggle",
    "type": "[event: GraphGroupToggleEvent]",
    "typeText": "[event: GraphGroupToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphGroupToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "layoutEnd",
    "type": "[event: GraphLayoutEndEvent]",
    "typeText": "[event: GraphLayoutEndEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphLayoutEndEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "type": "[event: GraphHoverEvent]",
    "typeText": "[event: GraphHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: mind-map

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/vue/mind-map.vue

```vue
<script setup lang="ts">
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreeChart } from "minerva-design/vue/charts";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

const { language } = useI18n();
const nodes = computed(() =>
  (TOPICS[language.value] ?? TOPICS.en).map((label, i) => ({
    id: `t${i}`,
    label,
    group: `b${branchOf(i)}`,
  })),
);
const edges = PARENT.flatMap((parent, i) =>
  parent < 0 ? [] : [{ source: `t${parent}`, target: `t${i}` }],
);
</script>

<template>
  <TreeChart
    :nodes="nodes"
    :edges="edges"
    layout="mindmap"
    :legend="false"
    :height="420"
  />
</template>

```

## Example: org

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/vue/org.vue

```vue
<script setup lang="ts">
// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// @toggle reports it.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreeChart, type GraphToggleEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.roles.map((label, i) => ({
    id: `p${i}`,
    label,
    group: `d${PEOPLE[i][1]}`,
  })),
);
const groups = computed(() =>
  text.value.departments.map((name, i) => ({ id: `d${i}`, name })),
);
const edges = PEOPLE.flatMap(([manager], i) =>
  manager < 0 ? [] : [{ source: `p${manager}`, target: `p${i}` }],
);
const toggled = ref<GraphToggleEvent | null>(null);
const status = computed(() =>
  toggled.value
    ? text.value[toggled.value.collapsed ? "collapsed" : "expanded"].replace(
        "{name}",
        text.value.roles[Number(toggled.value.id.slice(1))],
      )
    : text.value.hint,
);
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <TreeChart
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      layout="org"
      :height="460"
      @toggle="toggled = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```
