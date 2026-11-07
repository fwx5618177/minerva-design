# Arbre

Hiérarchies dessinées en arbres ordonnés, arbres radiaux, cartes mentales et organigrammes : organisations, systèmes de fichiers, taxonomies, plans. L’arbre ordonné (Buchheim / Reingold–Tilford) ne superpose jamais les nœuds et centre chaque parent au-dessus de ses enfants ; les sous-arbres se replient et se déplient avec une animation, au clic, au clavier ou par l’API.

Package: minerva-design@1.22.0

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tree-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"tree\" | \"radial\" | \"mindmap\" | \"org\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "GraphDirection",
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

## Example: Carte mentale

Un plan de lancement produit : les branches s'étendent des deux côtés du sujet central, chacune dans sa couleur ; les sujets suivent la langue de la page.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.html

```html
<minerva-tree-chart
  id="launch"
  layout="mindmap"
  height="420"
></minerva-tree-chart>

```

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.ts

```tsx
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import type { MinervaTreeChart } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const topics =
    TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
  const chart = root.querySelector<MinervaTreeChart>("#launch")!;
  chart.nodes = topics.map((label, i) => ({
    id: `t${i}`,
    label,
    group: `b${branchOf(i)}`,
  }));
  chart.edges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: `t${parent}`, target: `t${i}` }],
  );
  chart.options = { legend: false };
}

```

## Example: Organigramme aux équipes repliables

Des cartes par département, les équipes finales empilées sous leur responsable ; cliquer sur un responsable replie ou déplie l'équipe, et l'événement s'affiche dessous.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/org.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-tree-chart id="org" layout="org" height="460"></minerva-tree-chart>
  <output id="org-status" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/tree-chart/wc/org.ts

```tsx
// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// minerva-toggle reports it.
import type {
  GraphToggleEvent,
  MinervaTreeChart,
} from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreeChart>("#org")!;
  const output = root.querySelector<HTMLOutputElement>("#org-status")!;
  chart.nodes = text.roles.map((label, i) => ({
    id: `p${i}`,
    label,
    group: `d${PEOPLE[i][1]}`,
  }));
  chart.edges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: `p${manager}`, target: `p${i}` }],
  );
  chart.groups = text.departments.map((name, i) => ({ id: `d${i}`, name }));
  output.textContent = text.hint;
  const onToggle = (event: Event) => {
    const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
    output.textContent = text[collapsed ? "collapsed" : "expanded"].replace(
      "{name}",
      text.roles[Number(id.slice(1))],
    );
  };
  chart.addEventListener("minerva-toggle", onToggle);
  return () => chart.removeEventListener("minerva-toggle", onToggle);
}

```
