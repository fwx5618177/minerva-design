# Arbre

Hiérarchies dessinées en arbres ordonnés, arbres radiaux, cartes mentales et organigrammes : organisations, systèmes de fichiers, taxonomies, plans. L’arbre ordonné (Buchheim / Reingold–Tilford) ne superpose jamais les nœuds et centre chaque parent au-dessus de ses enfants ; les sous-arbres se replient et se déplient avec une animation, au clic, au clavier ou par l’API.

Package: minerva-design@1.21.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnTreeChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTreeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"radial\" | \"tree\" | \"mindmap\" | \"org\"",
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

## Example: Org chart with collapsible teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnTreeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreeChart],
  template: `
<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  layout="org"
  [locale]="language()"
  [height]="460"
  (nodeToggle)="toggled.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  toggled = signal<{ id: string; collapsed: boolean } | null>(null);
  text = {
  "en": {
    "roles": ["Chief executive", "Technology", "Finance", "Operations", "Web team", "Mobile team", "Platform team", "Accounting", "Treasury", "Customer support", "Logistics"],
    "departments": ["Executive", "Engineering", "Finance", "Operations"],
    "hint": "Click a manager to collapse or expand the team",
    "collapsed": "{name}: collapsed",
    "expanded": "{name}: expanded"
  },
  "zh": {
    "roles": ["首席执行官", "技术", "财务", "运营", "Web 团队", "移动团队", "平台团队", "会计", "资金管理", "客户支持", "物流"],
    "departments": ["管理层", "研发", "财务", "运营"],
    "hint": "点击管理者以折叠或展开团队",
    "collapsed": "{name}：已折叠",
    "expanded": "{name}：已展开"
  },
  "ja": {
    "roles": ["最高経営責任者", "技術", "財務", "運営", "Web チーム", "モバイルチーム", "プラットフォームチーム", "経理", "資金管理", "カスタマーサポート", "物流"],
    "departments": ["経営", "エンジニアリング", "財務", "運営"],
    "hint": "マネージャーをクリックするとチームを折りたたみ / 展開します",
    "collapsed": "{name}: 折りたたみ",
    "expanded": "{name}: 展開"
  },
  "fr": {
    "roles": ["Direction générale", "Technique", "Finance", "Opérations", "Équipe web", "Équipe mobile", "Équipe plateforme", "Comptabilité", "Trésorerie", "Support client", "Logistique"],
    "departments": ["Direction", "Ingénierie", "Finance", "Opérations"],
    "hint": "Cliquez sur un responsable pour replier ou déplier l'équipe",
    "collapsed": "{name} : replié",
    "expanded": "{name} : déplié"
  }
};
  people = [
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
  [3, 3]
];
  edges = [
  {
    "source": "p0",
    "target": "p1"
  },
  {
    "source": "p0",
    "target": "p2"
  },
  {
    "source": "p0",
    "target": "p3"
  },
  {
    "source": "p1",
    "target": "p4"
  },
  {
    "source": "p1",
    "target": "p5"
  },
  {
    "source": "p1",
    "target": "p6"
  },
  {
    "source": "p2",
    "target": "p7"
  },
  {
    "source": "p2",
    "target": "p8"
  },
  {
    "source": "p3",
    "target": "p9"
  },
  {
    "source": "p3",
    "target": "p10"
  }
];
  nodes = computed(() =>
    this.text[this.language()].roles.map((label, i) => ({
      id: `p${i}`,
      label,
      group: `d${this.people[i][1]}`,
    })),
  );
  groups = computed(() =>
    this.text[this.language()].departments.map((name, i) => ({ id: `d${i}`, name })),
  );
  status = computed(() => {
    const t = this.text[this.language()];
    const toggled = this.toggled();
    return toggled
      ? (toggled.collapsed ? t.collapsed : t.expanded).replace(
          "{name}",
          t.roles[Number(toggled.id.slice(1))],
        )
      : t.hint;
  });
}

```

## Example: Carte mentale

Un plan de lancement autour de son sujet central. Les branches sont réparties des deux côtés selon leur nombre d’idées, chaque branche a sa couleur et les traits s’affinent en s’éloignant du centre.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnTreeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreeChart],
  template: `
<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  layout="mindmap"
  [legend]="false"
  [locale]="language()"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  topics = {
  "en": ["Product launch", "Research", "User interviews", "Market analysis", "Design", "Prototype", "Usability tests", "Development", "Web app", "Mobile app", "Marketing", "Ad campaign", "Press release"],
  "zh": ["产品发布", "调研", "用户访谈", "市场分析", "设计", "原型", "可用性测试", "开发", "网页应用", "移动应用", "市场营销", "广告投放", "新闻稿"],
  "ja": ["製品ローンチ", "リサーチ", "ユーザーインタビュー", "市場分析", "デザイン", "プロトタイプ", "ユーザビリティテスト", "開発", "Web アプリ", "モバイルアプリ", "マーケティング", "広告キャンペーン", "プレスリリース"],
  "fr": ["Lancement produit", "Recherche", "Entretiens utilisateurs", "Analyse du marché", "Conception", "Prototype", "Tests d'utilisabilité", "Développement", "Application web", "Application mobile", "Marketing", "Campagne publicitaire", "Communiqué de presse"]
};
  branch = [0, 1, 1, 1, 4, 4, 4, 7, 7, 7, 10, 10, 10];
  edges = [
  {
    "source": "t0",
    "target": "t1"
  },
  {
    "source": "t1",
    "target": "t2"
  },
  {
    "source": "t1",
    "target": "t3"
  },
  {
    "source": "t0",
    "target": "t4"
  },
  {
    "source": "t4",
    "target": "t5"
  },
  {
    "source": "t4",
    "target": "t6"
  },
  {
    "source": "t0",
    "target": "t7"
  },
  {
    "source": "t7",
    "target": "t8"
  },
  {
    "source": "t7",
    "target": "t9"
  },
  {
    "source": "t0",
    "target": "t10"
  },
  {
    "source": "t10",
    "target": "t11"
  },
  {
    "source": "t10",
    "target": "t12"
  }
];
  nodes = computed(() =>
    this.topics[this.language()].map((label, i) => ({
      id: `t${i}`,
      label,
      group: `b${this.branch[i]}`,
    })),
  );
}

```
