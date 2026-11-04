# Graphe de relations

Réseaux de relations : personnes, organisations, services ou toute entité et les liens qui les unissent. Une disposition par forces (Barnes–Hut, dans un Web Worker pour les grands graphes), un cercle ou un diagramme en arcs place les nœuds ; nœuds et arêtes sont dessinés par le GPU (WebGPU, WebGL2, WebGL, repli Canvas2D), si bien que des dizaines de milliers de nœuds restent fluides. Survolez un nœud pour mettre en avant ses voisins, déplacez-le, masquez des groupes depuis la légende et parcourez le graphe au clavier.

Package: minerva-design@1.20.6

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/graph-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "GraphLayoutType",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "GraphDirection | undefined",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "attribute": "node-shape",
    "required": false
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "attribute": "edge-style",
    "required": false
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\"",
    "attribute": "edge-color",
    "required": false
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\"",
    "attribute": "arrow-style",
    "required": false
  },
  {
    "name": "highlight",
    "typeText": "\"neighbors\" | \"lineage\" | \"none\" | undefined",
    "attribute": "highlight",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[] | undefined",
    "required": false
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[] | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "GraphBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) node / edge changed; detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-item-click",
    "typeText": "CustomEvent",
    "description": "A node or an edge was clicked (or a node activated with Enter); detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }"
  },
  {
    "name": "minerva-selection-change",
    "typeText": "CustomEvent",
    "description": "The selection changed; detail: { ids }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A tree node was collapsed or expanded; detail: { id, collapsed }"
  },
  {
    "name": "minerva-group-toggle",
    "typeText": "CustomEvent",
    "description": "The legend showed / hid a group; detail: { group, hidden }"
  },
  {
    "name": "minerva-layout-end",
    "typeText": "CustomEvent",
    "description": "The layout is done (the force simulation cooled down); detail: { layout }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Disposition circulaire et sélection

Les mêmes liaisons sur un cercle, groupées par région, les liens teintés de la couleur de leur source ; cliquer sur des villes (Ctrl / ⌘ + clic pour ajouter) signale la sélection.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/wc/circular.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-graph-chart
    id="circle"
    layout="circular"
    edge-color="source"
    height="440"
  ></minerva-graph-chart>
  <output id="selection" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/graph-chart/wc/circular.ts

```tsx
// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// minerva-selection-change lists the selection.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const text = TEXT[lang] ?? TEXT.en;
  const chart = root.querySelector<MinervaGraphChart>("#circle")!;
  const output = root.querySelector<HTMLOutputElement>("#selection")!;
  chart.nodes = names.map((label, i) => ({
    id: `c${i}`,
    label,
    group: `r${REGION_OF[i]}`,
  }));
  chart.edges = ROUTES.map(([a, b, flights]) => ({
    source: `c${a}`,
    target: `c${b}`,
    value: flights,
  }));
  chart.groups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  }));
  output.textContent = text.hint;
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    output.textContent = ids.length
      ? text.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
  return () => chart.removeEventListener("minerva-selection-change", onSelect);
}

```

## Example: Liaisons aériennes entre hubs

Réseau à forces des villes hubs : taille des nœuds selon la taille du hub, épaisseur des liens selon les vols hebdomadaires, couleurs par région ; les noms suivent la langue de la page.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/wc/routes.html

```html
<minerva-graph-chart id="routes" height="440"></minerva-graph-chart>

```

### apps/docs/src/docs/pages/graph-chart/wc/routes.ts

```tsx
// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const chart = root.querySelector<MinervaGraphChart>("#routes")!;
  chart.nodes = HUBS.map(([region, size], i) => ({
    id: `c${i}`,
    label: names[i],
    group: `r${region}`,
    value: size,
  }));
  chart.edges = ROUTES.map(([a, b, flights]) => ({
    source: `c${a}`,
    target: `c${b}`,
    value: flights,
  }));
  chart.groups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  }));
  chart.options = { nodeSize: [10, 34] };
}

```
