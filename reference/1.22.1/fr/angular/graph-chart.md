# Graphe de relations

Réseaux de relations : personnes, organisations, services ou toute entité et les liens qui les unissent. Une disposition par forces (Barnes–Hut, dans un Web Worker pour les grands graphes), un cercle ou un diagramme en arcs place les nœuds ; nœuds et arêtes sont dessinés par le GPU (WebGPU, WebGL2, WebGL, repli Canvas2D), si bien que des dizaines de milliers de nœuds restent fluides. Survolez un nœud pour mettre en avant ses voisins, déplacez-le, masquez des groupes depuis la légende et parcourez le graphe au clavier.

Package: minerva-design@1.22.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnGraphChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnGraphChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "GraphLayoutType",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "direction",
    "typeText": "GraphDirection | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "force",
    "typeText": "GraphForceOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "circular",
    "typeText": "GraphCircularOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "dag",
    "typeText": "GraphDagOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "tree",
    "typeText": "GraphTreeOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeSize",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeWidth",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeLabels",
    "typeText": "boolean | \"auto\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeLabels",
    "typeText": "boolean | \"auto\" | \"hover\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "highlight",
    "typeText": "\"none\" | \"neighbors\" | \"lineage\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "animation",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "fitPadding",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "controls",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | GraphLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | GraphTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | GraphInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "labels",
    "typeText": "Partial<GraphChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "GraphHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "GraphHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "typeText": "string[]",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "nodeToggle",
    "typeText": "GraphToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "groupToggle",
    "typeText": "GraphGroupToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphGroupToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "layoutEnd",
    "typeText": "GraphLayoutEndEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphLayoutEndEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Air routes between hubs

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnGraphChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGraphChart],
  template: `
<mn-graph-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  [nodeSize]="[10, 34]"
  [locale]="language()"
  [height]="440"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  cities = {
  "en": ["Beijing", "Shanghai", "Tokyo", "Seoul", "Singapore", "Dubai", "Sydney", "London", "Paris", "Frankfurt", "New York", "Chicago", "Los Angeles", "São Paulo"],
  "zh": ["北京", "上海", "东京", "首尔", "新加坡", "迪拜", "悉尼", "伦敦", "巴黎", "法兰克福", "纽约", "芝加哥", "洛杉矶", "圣保罗"],
  "ja": ["北京", "上海", "東京", "ソウル", "シンガポール", "ドバイ", "シドニー", "ロンドン", "パリ", "フランクフルト", "ニューヨーク", "シカゴ", "ロサンゼルス", "サンパウロ"],
  "fr": ["Pékin", "Shanghai", "Tokyo", "Séoul", "Singapour", "Dubaï", "Sydney", "Londres", "Paris", "Francfort", "New York", "Chicago", "Los Angeles", "São Paulo"]
};
  regions = {
  "en": ["Asia", "Oceania", "Europe", "Americas"],
  "zh": ["亚洲", "大洋洲", "欧洲", "美洲"],
  "ja": ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  "fr": ["Asie", "Océanie", "Europe", "Amériques"]
};
  hubs = [
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
  [3, 5]
];
  edges = [
  {
    "source": "c0",
    "target": "c1",
    "value": 120
  },
  {
    "source": "c0",
    "target": "c2",
    "value": 40
  },
  {
    "source": "c1",
    "target": "c2",
    "value": 55
  },
  {
    "source": "c2",
    "target": "c3",
    "value": 60
  },
  {
    "source": "c1",
    "target": "c3",
    "value": 35
  },
  {
    "source": "c1",
    "target": "c4",
    "value": 30
  },
  {
    "source": "c4",
    "target": "c6",
    "value": 28
  },
  {
    "source": "c2",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c4",
    "target": "c5",
    "value": 25
  },
  {
    "source": "c5",
    "target": "c7",
    "value": 42
  },
  {
    "source": "c5",
    "target": "c8",
    "value": 21
  },
  {
    "source": "c5",
    "target": "c9",
    "value": 20
  },
  {
    "source": "c7",
    "target": "c8",
    "value": 70
  },
  {
    "source": "c7",
    "target": "c9",
    "value": 50
  },
  {
    "source": "c8",
    "target": "c9",
    "value": 35
  },
  {
    "source": "c7",
    "target": "c10",
    "value": 80
  },
  {
    "source": "c8",
    "target": "c10",
    "value": 40
  },
  {
    "source": "c9",
    "target": "c11",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c11",
    "value": 90
  },
  {
    "source": "c10",
    "target": "c12",
    "value": 85
  },
  {
    "source": "c11",
    "target": "c12",
    "value": 60
  },
  {
    "source": "c12",
    "target": "c2",
    "value": 28
  },
  {
    "source": "c12",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c13",
    "value": 21
  },
  {
    "source": "c12",
    "target": "c1",
    "value": 18
  },
  {
    "source": "c0",
    "target": "c9",
    "value": 12
  },
  {
    "source": "c4",
    "target": "c7",
    "value": 21
  }
];
  nodes = computed(() =>
    this.cities[this.language()].map((label, i) => ({
      id: `c${i}`,
      label,
      group: `r${this.hubs[i][0]}`,
      value: this.hubs[i][1],
    })),
  );
  groups = computed(() =>
    this.regions[this.language()].map((name, i) => ({ id: `r${i}`, name })),
  );
}

```

## Example: Disposition circulaire

Appels entre microservices, regroupés par domaine autour d’un cercle. L’épaisseur suit le volume d’appels, edgeColor="source" teinte chaque arête de la couleur de l’appelant, et la tension regroupe les arêtes vers le centre.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnGraphChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGraphChart],
  template: `
<mn-graph-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  layout="circular"
  edgeColor="source"
  [locale]="language()"
  [height]="440"
  (selectionChange)="selection.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selection = signal<string[]>([]);
  cities = {
  "en": ["Beijing", "Shanghai", "Tokyo", "Seoul", "Singapore", "Dubai", "Sydney", "London", "Paris", "Frankfurt", "New York", "Chicago", "Los Angeles", "São Paulo"],
  "zh": ["北京", "上海", "东京", "首尔", "新加坡", "迪拜", "悉尼", "伦敦", "巴黎", "法兰克福", "纽约", "芝加哥", "洛杉矶", "圣保罗"],
  "ja": ["北京", "上海", "東京", "ソウル", "シンガポール", "ドバイ", "シドニー", "ロンドン", "パリ", "フランクフルト", "ニューヨーク", "シカゴ", "ロサンゼルス", "サンパウロ"],
  "fr": ["Pékin", "Shanghai", "Tokyo", "Séoul", "Singapour", "Dubaï", "Sydney", "Londres", "Paris", "Francfort", "New York", "Chicago", "Los Angeles", "São Paulo"]
};
  regions = {
  "en": ["Asia", "Oceania", "Europe", "Americas"],
  "zh": ["亚洲", "大洋洲", "欧洲", "美洲"],
  "ja": ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  "fr": ["Asie", "Océanie", "Europe", "Amériques"]
};
  hubs = [
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
  [3, 5]
];
  edges = [
  {
    "source": "c0",
    "target": "c1",
    "value": 120
  },
  {
    "source": "c0",
    "target": "c2",
    "value": 40
  },
  {
    "source": "c1",
    "target": "c2",
    "value": 55
  },
  {
    "source": "c2",
    "target": "c3",
    "value": 60
  },
  {
    "source": "c1",
    "target": "c3",
    "value": 35
  },
  {
    "source": "c1",
    "target": "c4",
    "value": 30
  },
  {
    "source": "c4",
    "target": "c6",
    "value": 28
  },
  {
    "source": "c2",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c4",
    "target": "c5",
    "value": 25
  },
  {
    "source": "c5",
    "target": "c7",
    "value": 42
  },
  {
    "source": "c5",
    "target": "c8",
    "value": 21
  },
  {
    "source": "c5",
    "target": "c9",
    "value": 20
  },
  {
    "source": "c7",
    "target": "c8",
    "value": 70
  },
  {
    "source": "c7",
    "target": "c9",
    "value": 50
  },
  {
    "source": "c8",
    "target": "c9",
    "value": 35
  },
  {
    "source": "c7",
    "target": "c10",
    "value": 80
  },
  {
    "source": "c8",
    "target": "c10",
    "value": 40
  },
  {
    "source": "c9",
    "target": "c11",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c11",
    "value": 90
  },
  {
    "source": "c10",
    "target": "c12",
    "value": 85
  },
  {
    "source": "c11",
    "target": "c12",
    "value": 60
  },
  {
    "source": "c12",
    "target": "c2",
    "value": 28
  },
  {
    "source": "c12",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c13",
    "value": 21
  },
  {
    "source": "c12",
    "target": "c1",
    "value": 18
  },
  {
    "source": "c0",
    "target": "c9",
    "value": 12
  },
  {
    "source": "c4",
    "target": "c7",
    "value": 21
  }
];
  labels = {
  "en": {
    "hint": "Click a city to see its routes",
    "selected": "Selected: "
  },
  "zh": {
    "hint": "点击一个城市查看其航线",
    "selected": "已选择："
  },
  "ja": {
    "hint": "都市をクリックすると路線が表示されます",
    "selected": "選択中: "
  },
  "fr": {
    "hint": "Cliquez sur une ville pour voir ses liaisons",
    "selected": "Sélection : "
  }
};
  nodes = computed(() =>
    this.cities[this.language()].map((label, i) => ({
      id: `c${i}`,
      label,
      group: `r${this.hubs[i][0]}`,
    })),
  );
  groups = computed(() =>
    this.regions[this.language()].map((name, i) => ({ id: `r${i}`, name })),
  );
  status = computed(() => {
    const t = this.labels[this.language()];
    const names = this.cities[this.language()];
    const ids = this.selection();
    return ids.length
      ? t.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : t.hint;
  });
}

```
