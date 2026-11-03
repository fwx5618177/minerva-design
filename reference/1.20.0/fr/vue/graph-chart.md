# Graphe de relations

Réseaux de relations : personnes, organisations, services ou toute entité et les liens qui les unissent. Une disposition par forces (Barnes–Hut, dans un Web Worker pour les grands graphes), un cercle ou un diagramme en arcs place les nœuds ; nœuds et arêtes sont dessinés par le GPU (WebGPU, WebGL2, WebGL, repli Canvas2D), si bien que des dizaines de milliers de nœuds restent fluides. Survolez un nœud pour mettre en avant ses voisins, déplacez-le, masquez des groupes depuis la légende et parcourez le graphe au clavier.

Package: minerva-design@1.20.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Vue d’ensemble

GraphChart reçoit des nœuds, des arêtes et éventuellement des groupes. Les groupes donnent les couleurs et la légende, la valeur des nœuds leur taille, et les libellés des arêtes nomment les relations.

Dispositions : forces (par défaut) avec liens, répulsion, gravité, collisions et graine déterministe ; cercle (par groupe, arêtes regroupées vers le centre) ; diagramme en arcs ; les dispositions dag et arbre sont aussi disponibles (voir Graphe de dépendances et Arbre). Les algorithmes sont exportés comme fonctions pures, utilisables dans des workers et des mini-programmes.

Le rendu passe par les mêmes moteurs GPU que les autres graphiques, avec un repli automatique WebGPU → WebGL2 → WebGL → Canvas2D ; le moteur utilisé est indiqué par onRendererChange et l’attribut data-renderer.

Les libellés s’évitent : en vue éloignée, seuls les nœuds les plus importants gardent leur libellé, et ceux des arêtes apparaissent en zoomant ou quand une arête est mise en avant.

#### Interaction et accessibilité

Faites glisser le fond pour déplacer la vue, Ctrl / ⌘ + molette ou pincement pour zoomer, faites glisser un nœud pour le déplacer (la simulation suit), cliquez pour sélectionner (Ctrl / ⌘ + clic pour ajouter), double-cliquez sur le fond pour tout afficher. Les boutons du coin zooment et recadrent.

Donnez le focus au graphique puis utilisez les flèches pour passer de nœud en nœud ; Entrée sélectionne, + et - zooment, 0 recadre, Échap efface. Le nœud actif est annoncé avec son groupe et son nombre de liens.

Les textes intégrés (résumé, annonces, infobulle, boutons) existent en anglais, chinois, japonais et français et suivent la langue de la page ; les couleurs suivent les thèmes clair et sombre.

Liu Bei

Guan Yu

Zhang Fei

Zhuge Liang

Zhao Yun

Ma Chao

Huang Zhong

Pang Tong

Jiang Wei

Liu Shan

Wei Yan

Fa Zheng

Cao Cao

Cao Pi

Sima Yi

Xiahou Dun

Xiahou Yuan

Zhang Liao

Xu Chu

Guo Jia

Xun Yu

Dian Wei

Cao Zhi

Sima Zhao

Deng Ai

Sun Quan

Sun Ce

Sun Jian

Zhou Yu

Lu Su

Lü Meng

Lu Xun

Gan Ning

Huang Gai

Xiao Qiao

Da Qiao

Sun Shangxiang

Lü Bu

Dong Zhuo

Diaochan

Yuan Shao

Empereur Xian

Wang Yun

Shu Han

Wei

Wu oriental

Seigneurs de guerre et cour Han

Frères jurés

Sert

Père et fils

Mariés

Fratrie

Rivaux

Maître

Père adoptif

Alliance

A vaincu

Amis jurés

Relations entre les personnages du Roman des Trois Royaumes, par faction

Survolez un personnage ou une relation, cliquez pour sélectionner ; Ctrl / ⌘ + molette pour zoomer.

Sélection : {{name}}

{{source}} → {{target}} : {{relation}}

, 

Membre {{id}}

Communauté {{n}}

Réseau généré de 10 000 membres répartis en 40 communautés

{{nodes}} nœuds · {{edges}} liens · rendu : {{renderer}} ·

simulation dans un Web Worker…

disposition terminée en {{seconds}} s

Périphérie

Commerce

Identité

Données

Regrouper les arêtes vers le centre

Appels entre microservices, regroupés par domaine

Système

Fonctionnel

Orienté objet

Script

A influencé

Influences entre langages de programmation

Forces

Cercle

Diagramme en arcs

Disposition

Cliquez sur un personnage pour le centrer.

{{name}} : {{links}} relations

Disposition : {{layout}}

Panier

En attente de paiement

Payée

Expédiée

Livrée

Remboursée

Annulée

commande

modifier le panier

paiement

nouvel essai de paiement

délai dépassé

annulation

paiement annulé

expédition

remboursement

suivi mis à jour

livraison

retour à l’expéditeur

retour

avis

En cours

Traitement

Terminée

Pointes pleines

États d’une commande et événements qui les relient

Sain

Dégradé

Critique

p95 {{value}} ms

{{value}} req/s

Mises à jour en direct

Carte des services d'une boutique en ligne avec la santé de chaque service en direct

Cliquez sur un service pour lire ses métriques.

{{name}} : {{status}} · p95 {{latency}} ms · erreurs {{errors}} · {{rps}} req/s.

{{healthy}} sains, {{degraded}} dégradés, {{critical}} critiques · mis à jour à {{time}}

Marie Curie

Pierre Curie

Albert Einstein

Max Planck

Niels Bohr

Werner Heisenberg

Lise Meitner

Otto Hahn

Emmy Noether

Paris

Varsovie

Vienne

Berlin

Zurich

Copenhague

Sorbonne

Société Kaiser-Wilhelm

ETH Zurich

Institut Niels-Bohr

Radioactivité

Relativité

Théorie quantique

Principe d'incertitude

Fission nucléaire

Théorème de Noether

né(e) à

a travaillé à

a étudié à

marié(e) à

a contribué à

situé(e) à

a influencé

fait partie de

a collaboré avec

lié(e) à

Personnes

Lieux

Institutions

Idées

Chercher une personne, un lieu ou une idée…

Rechercher dans le graphe de connaissances

Aucune entité ne correspond à cette recherche.

Graphe de connaissances de physiciens, des lieux et institutions qui leur sont liés et de leurs découvertes

Cherchez une entité ou cliquez sur un nœud pour lister ce que le graphe sait d'elle.

{{name}} : {{total}} faits — {{facts}}

→ {{name}} ({{relation}})

← {{name}} ({{relation}})

Amis de fac

Collègues

Club d'escalade

Club de lecture

Amitiés entre 24 personnes réparties en quatre cercles

Personnes que {{name}} connaît peut-être : {{list}}.

{{name}} (amis en commun : {{mutual}})

{{name}} connaît déjà tous les amis de ses amis.

Cliquez sur une autre personne pour mettre à jour les suggestions.

Appareil {{id}}

Carte •••• {{last4}}

Compte {{id}}

connecté depuis

a payé avec

Comptes

Comptes signalés

Appareils

Cartes

faible

moyen

élevé

Thème sombre

Comptes, appareils et cartes de paiement, avec deux réseaux de fraude qui partagent des appareils et des cartes

Groupe : {{accounts}} comptes, {{devices}} appareils, {{cards}} cartes · risque : {{risk}}

Cliquez sur un compte, un appareil ou une carte pour sélectionner tout son groupe.

## GraphChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "GraphChart"
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
    "type": "GraphLayoutType",
    "default": "\"force\"",
    "required": false,
    "description": "Placement of the nodes (default `force`)",
    "typeText": "GraphLayoutType"
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
    "description": "Direction of the `dag` and `tree` layouts",
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
    "name": "dag",
    "type": "GraphDagOptions",
    "required": false,
    "description": "Layered layout settings (`layout=\"dag\"`)",
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
  },
  {
    "name": "tree",
    "type": "GraphTreeOptions",
    "required": false,
    "description": "Tree layout settings (tree layouts)",
    "typeText": "GraphTreeOptions"
  },
  {
    "name": "force",
    "type": "GraphForceOptions",
    "required": false,
    "description": "Force layout settings (Barnes–Hut, worker for large graphs)",
    "typeText": "GraphForceOptions"
  },
  {
    "name": "circular",
    "type": "GraphCircularOptions",
    "required": false,
    "description": "Circular / arc layout settings",
    "typeText": "GraphCircularOptions"
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

## Example: circular

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/vue/circular.vue

```vue
<script setup lang="ts">
// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// @selection-change lists the selection.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { GraphChart } from "minerva-design/vue/charts";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
const TEXT = {
  en: { hint: "Click a city to see its routes", selected: "Selected: " },
  zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
  ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
  fr: {
    hint: "Cliquez sur une ville pour voir ses liaisons",
    selected: "Sélection : ",
  },
};
// region (index in REGIONS) of each city of CITIES
const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

const { language } = useI18n();
const names = computed(() => CITIES[language.value] ?? CITIES.en);
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  names.value.map((label, i) => ({
    id: `c${i}`,
    label,
    group: `r${REGION_OF[i]}`,
  })),
);
const groups = computed(() =>
  (REGIONS[language.value] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  })),
);
const edges = ROUTES.map(([a, b, flights]) => ({
  source: `c${a}`,
  target: `c${b}`,
  value: flights,
}));
const selection = ref<string[]>([]);
const status = computed(() =>
  selection.value.length
    ? text.value.selected +
      selection.value.map((id) => names.value[Number(id.slice(1))]).join(", ")
    : text.value.hint,
);
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <GraphChart
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      layout="circular"
      edge-color="source"
      :height="440"
      @selection-change="selection = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```

## Example: routes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/vue/routes.vue

```vue
<script setup lang="ts">
// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GraphChart } from "minerva-design/vue/charts";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
// region (index in REGIONS) and size of the hub, in the order of CITIES
const HUBS = [
  [0, 8],
  [0, 9],
  [0, 9],
  [0, 6],
  [0, 8],
  [0, 7],
  [1, 5],
  [2, 9],
  [2, 8],
  [2, 7],
  [3, 9],
  [3, 6],
  [3, 7],
  [3, 5],
];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

const { language } = useI18n();
const nodes = computed(() => {
  const names = CITIES[language.value] ?? CITIES.en;
  return HUBS.map(([region, size], i) => ({
    id: `c${i}`,
    label: names[i],
    group: `r${region}`,
    value: size,
  }));
});
const groups = computed(() =>
  (REGIONS[language.value] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  })),
);
const edges = ROUTES.map(([a, b, flights]) => ({
  source: `c${a}`,
  target: `c${b}`,
  value: flights,
}));
</script>

<template>
  <GraphChart
    :nodes="nodes"
    :edges="edges"
    :groups="groups"
    :node-size="[10, 34]"
    :height="440"
  />
</template>

```
