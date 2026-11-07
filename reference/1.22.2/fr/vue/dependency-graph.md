# Graphe de dépendances

Graphes orientés acycliques dessinés en couches : dépendances de paquets, chaînes de build, lignage de données, plans de tâches. La disposition de Sugiyama casse les cycles, affecte les couches, fait passer les longues arêtes par des nœuds fictifs, réduit les croisements et garde les longues arêtes droites ; les arêtes sont des courbes lisses ou des connecteurs orthogonaux fléchés. Survolez ou sélectionnez un nœud pour mettre en avant tout ce qui est en amont et en aval, et affichez le chemin critique d’un plan.

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

#### Fonctionnement de la disposition

DependencyGraph est un GraphChart avec layout="dag" : boîtes ajustées à leur libellé, flèches sur chaque arête et mise en avant du lignage. La même disposition existe sous forme de fonction pure, dagLayout.

Les cycles sont cassés en inversant les arêtes arrière d’un parcours en profondeur ; les couches viennent du plus long chemin, puis les sources se rapprochent de leurs successeurs et les nœuds équilibrés rejoignent les couches moins remplies.

Les arêtes qui traversent plusieurs couches reçoivent des nœuds fictifs ; des passes barycentre et médiane réordonnent ensuite chaque couche en gardant le meilleur ordre, puis une passe de transposition échange des voisins tant que cela supprime des croisements.

Les positions dans une couche viennent d’une régression isotone pondérée vers les voisins, les longues arêtes ayant un poids élevé pour rester droites. Les sens TB, LR, BT et RL sont pris en charge.

highlight="lineage" (par défaut ici) met en avant tous les ancêtres et descendants des nœuds survolés, actifs ou sélectionnés ; criticalPath met en avant la chaîne de plus grande durée totale (valeur des nœuds).

Applications

Paquets de framework

Bibliothèques

Outillage

dépendance de développement

dépendance circulaire

Dépendances entre les paquets d’un monorepo

Installation

Lint

Vérification des types

Tests unitaires

Analyse de sécurité

Build de l’app

Build de la doc

Tests E2E

Tests visuels

Empaquetage

Déploiement préprod

Déploiement prod

Réussi

En cours

Échoué

En attente

{{status}} · {{minutes}} min

bundle web

déclarations de types

nouvel essai

Mettre en avant le chemin critique

Chaîne CI/CD : jobs, dépendances et statuts

Chemin critique : {{minutes}} min — {{path}}

 → 

Tableau des revenus

Tableau de rétention

Tableau de croissance

Sources brutes

Préparation

Magasins de données

Tableaux de bord

Lignage des données, des tables brutes aux tableaux de bord

{{name}} : {{upstream}} en amont, {{downstream}} en aval

Cliquez sur une table ou un tableau de bord pour mettre en avant son lignage.

Terminée

En cours

En attente

{{percent}} effectué

{{seconds}} s

Workers

{{n}} × worker

Pause

Lancer

Réinitialiser

Tâches de build d'un monorepo, colorées selon leur état pendant l'exécution

Build terminé en {{seconds}} s avec {{workers}} × worker.

{{elapsed}} s sur {{seconds}} s — en cours : {{running}}.

rien

Aucun ordonnancement ne fait mieux que le chemin critique : {{seconds}} s.

Cahier des charges

Recherche utilisateur

Arborescence

Maquettes fil de fer

Design graphique

Rédaction

API et hébergement

Configuration du CMS

Intégration front-end

Saisie des contenus

Recette et correctifs

Audit SEO

Mise en ligne

Cadrage

Conception

Réalisation

Lancement

Planning du lancement d'un site : tâches, dépendances et chemin critique

{{name}} : {{range}}, {{days}} jours ouvrés, peut glisser de {{slack}} jours ouvrés sans retarder le lancement.

{{name}} : {{range}}, {{days}} jours ouvrés, sur le chemin critique — tout retard décale le lancement.

{{days}} jours ouvrés, mise en ligne le {{date}}. Cliquez sur une tâche pour voir ses dates et sa marge.

Réussie

Échouée

Amont en échec

Tâche en échec

Tâches ETL nocturnes, avec la tâche en échec et les tâches qu'elle bloque

{{task}} a échoué et bloque {{blocked}} des {{total}} tâches : {{sinks}} ne seront pas livrés.

{{task}} a échoué, mais aucune autre tâche n'en dépend.

Initiation à la programmation

Mathématiques discrètes

Analyse

Structures de données

Architecture des ordinateurs

Algèbre linéaire

Probabilités

Algorithmique

Systèmes d'exploitation

Bases de données

Réseaux

Apprentissage automatique

Compilation

Systèmes répartis

Sécurité

Apprentissage profond

Projet de fin d'études

Année {{n}}

Direction du flux

De haut en bas

De gauche à droite

De bas en haut

De droite à gauche

Cours d'informatique et leurs prérequis

Prérequis de « {{course}} » ({{total}}) : {{list}}.

« {{course}} » n'a aucun prérequis.

Prix unitaire

Quantité

Remise (%)

Taux de TVA

Sous-total

Remise

Net

TVA

Livraison

Total

Coût unitaire

Saisies

Formules

Cellules d'un bon de commande et cellules référencées par leurs formules

{{cell}} modifié : {{total}} cellules recalculées ({{list}}). Total : {{value}}.

## DependencyGraph

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DependencyGraph"
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
    "name": "direction",
    "type": "GraphDirection",
    "default": "\"TB\"",
    "required": false,
    "description": "Flow direction (default `TB`)",
    "typeText": "GraphDirection"
  },
  {
    "name": "criticalPath",
    "type": "boolean | readonly string[]",
    "required": false,
    "description": "Highlights the longest path (node `value` = duration); `true` computes it, a list of ids sets it (default `false`)",
    "typeText": "boolean | readonly string[]"
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
    "name": "dag",
    "type": "GraphDagOptions",
    "required": false,
    "description": "Layer / node spacing, crossing reduction sweeps",
    "typeText": "GraphDagOptions"
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

## Example: modules

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/vue/modules.vue

```vue
<script setup lang="ts">
// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { DependencyGraph } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    modules: [
      "Utilities",
      "HTTP",
      "Translations",
      "UI components",
      "Charts",
      "API client",
      "Authentication",
      "State store",
      "Router",
      "Dashboard",
      "Reports",
      "Application",
    ],
    layers: ["Shared", "Core", "Features", "Application"],
    hint: "Click a module to highlight its dependencies",
    selected: "Selected: ",
  },
  zh: {
    modules: [
      "工具函数",
      "HTTP",
      "多语言",
      "UI 组件",
      "图表",
      "API 客户端",
      "认证",
      "状态管理",
      "路由",
      "仪表盘",
      "报表",
      "应用",
    ],
    layers: ["共享", "核心", "功能", "应用"],
    hint: "点击一个模块以高亮其依赖",
    selected: "已选择：",
  },
  ja: {
    modules: [
      "ユーティリティ",
      "HTTP",
      "翻訳",
      "UI コンポーネント",
      "チャート",
      "API クライアント",
      "認証",
      "状態管理",
      "ルーター",
      "ダッシュボード",
      "レポート",
      "アプリ",
    ],
    layers: ["共有", "コア", "機能", "アプリ"],
    hint: "モジュールをクリックすると依存関係が強調表示されます",
    selected: "選択中: ",
  },
  fr: {
    modules: [
      "Utilitaires",
      "HTTP",
      "Traductions",
      "Composants UI",
      "Graphiques",
      "Client API",
      "Authentification",
      "Gestion d'état",
      "Routeur",
      "Tableau de bord",
      "Rapports",
      "Application",
    ],
    layers: ["Partagé", "Cœur", "Fonctionnalités", "Application"],
    hint: "Cliquez sur un module pour mettre en évidence ses dépendances",
    selected: "Sélection : ",
  },
};
// layer (index in TEXT.layers) of each module of TEXT.modules
const LAYER = [0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
// dependency → dependent (indexes in TEXT.modules)
const USES = [
  [0, 1],
  [1, 5],
  [5, 6],
  [5, 7],
  [6, 8],
  [0, 4],
  [2, 3],
  [3, 9],
  [3, 10],
  [4, 9],
  [4, 10],
  [5, 9],
  [5, 10],
  [7, 9],
  [7, 10],
  [8, 11],
  [9, 11],
  [10, 11],
  [6, 11],
  [2, 11],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.modules.map((label, i) => ({
    id: `m${i}`,
    label,
    group: `l${LAYER[i]}`,
  })),
);
const groups = computed(() =>
  text.value.layers.map((name, i) => ({ id: `l${i}`, name })),
);
const edges = USES.map(([a, b]) => ({ source: `m${a}`, target: `m${b}` }));
const selection = ref<string[]>([]);
const status = computed(() =>
  selection.value.length
    ? text.value.selected +
      selection.value
        .map((id) => text.value.modules[Number(id.slice(1))])
        .join(", ")
    : text.value.hint,
);
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <DependencyGraph
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      highlight="lineage"
      :height="460"
      @selection-change="selection = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```

## Example: pipeline

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/vue/pipeline.vue

```vue
<script setup lang="ts">
// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import { computed, ref } from "vue";
import { Switch, useI18n } from "minerva-design/vue";
import { DependencyGraph } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    jobs: [
      "Install dependencies",
      "Lint",
      "Type check",
      "Unit tests",
      "Build",
      "E2E tests",
      "Package",
      "Deploy",
    ],
    minutes: "{n} min",
    critical: "Critical path",
  },
  zh: {
    jobs: [
      "安装依赖",
      "代码检查",
      "类型检查",
      "单元测试",
      "构建",
      "端到端测试",
      "打包",
      "部署",
    ],
    minutes: "{n} 分钟",
    critical: "关键路径",
  },
  ja: {
    jobs: [
      "依存関係のインストール",
      "Lint",
      "型チェック",
      "単体テスト",
      "ビルド",
      "E2E テスト",
      "パッケージ化",
      "デプロイ",
    ],
    minutes: "{n} 分",
    critical: "クリティカルパス",
  },
  fr: {
    jobs: [
      "Installer les dépendances",
      "Analyse statique",
      "Vérification des types",
      "Tests unitaires",
      "Compilation",
      "Tests E2E",
      "Empaquetage",
      "Déploiement",
    ],
    minutes: "{n} min",
    critical: "Chemin critique",
  },
};
// duration of each job of TEXT.jobs, in minutes
const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
// job → the jobs that need it (indexes in TEXT.jobs)
const NEEDS = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [1, 6],
  [3, 6],
  [4, 6],
  [6, 7],
  [5, 7],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.jobs.map((label, i) => ({
    id: `j${i}`,
    label,
    subtitle: text.value.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  })),
);
const edges = NEEDS.map(([a, b]) => ({ source: `j${a}`, target: `j${b}` }));
const critical = ref(true);
</script>

<template>
  <div style="display: grid; gap: 12px; width: 100%">
    <Switch v-model="critical" :label="text.critical" />
    <DependencyGraph
      :nodes="nodes"
      :edges="edges"
      direction="LR"
      edge-style="orthogonal"
      :critical-path="critical"
      :height="380"
    />
  </div>
</template>

```
