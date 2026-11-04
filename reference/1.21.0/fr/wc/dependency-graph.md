# Graphe de dépendances

Graphes orientés acycliques dessinés en couches : dépendances de paquets, chaînes de build, lignage de données, plans de tâches. La disposition de Sugiyama casse les cycles, affecte les couches, fait passer les longues arêtes par des nœuds fictifs, réduit les croisements et garde les longues arêtes droites ; les arêtes sont des courbes lisses ou des connecteurs orthogonaux fléchés. Survolez ou sélectionnez un nœud pour mettre en avant tout ce qui est en amont et en aval, et affichez le chemin critique d’un plan.

Package: minerva-design@1.21.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/dependency-graph",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "GraphDirection",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "criticalPath",
    "typeText": "boolean | readonly string[] | undefined",
    "attribute": "critical-path",
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

## Example: Lignée des modules

Les modules d'une application web par couche ; survoler ou cliquer sur un module met en évidence tout ce dont il dépend et tout ce qui dépend de lui, et la sélection s'affiche dessous.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/wc/modules.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-dependency-graph
    id="modules"
    highlight="lineage"
    height="460"
  ></minerva-dependency-graph>
  <output id="module-selection" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/dependency-graph/wc/modules.ts

```tsx
// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaDependencyGraph>("#modules")!;
  const output = root.querySelector<HTMLOutputElement>("#module-selection")!;
  chart.nodes = text.modules.map((label, i) => ({
    id: `m${i}`,
    label,
    group: `l${LAYER[i]}`,
  }));
  chart.edges = USES.map(([a, b]) => ({ source: `m${a}`, target: `m${b}` }));
  chart.groups = text.layers.map((name, i) => ({ id: `l${i}`, name }));
  output.textContent = text.hint;
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    output.textContent = ids.length
      ? text.selected +
        ids.map((id) => text.modules[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
  return () => chart.removeEventListener("minerva-selection-change", onSelect);
}

```

## Example: Pipeline CI et chemin critique

Les tâches de gauche à droite avec des liens orthogonaux ; la durée d'une tâche est sa valeur, donc la plus longue chaîne de tâches est mise en évidence, et l'interrupteur la désactive.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/wc/pipeline.html

```html
<div style="display: grid; gap: 12px; width: 100%">
  <minerva-switch id="critical" checked></minerva-switch>
  <minerva-dependency-graph
    id="pipeline"
    direction="LR"
    edge-style="orthogonal"
    critical-path
    height="380"
  ></minerva-dependency-graph>
</div>

```

### apps/docs/src/docs/pages/dependency-graph/wc/pipeline.ts

```tsx
// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import type { MinervaSwitch } from "minerva-design/web-components";
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const toggle = root.querySelector<MinervaSwitch>("#critical")!;
  const chart = root.querySelector<MinervaDependencyGraph>("#pipeline")!;
  toggle.label = text.critical;
  chart.nodes = text.jobs.map((label, i) => ({
    id: `j${i}`,
    label,
    subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  chart.edges = NEEDS.map(([a, b]) => ({ source: `j${a}`, target: `j${b}` }));
  const onChange = () => {
    chart.criticalPath = toggle.checked;
  };
  toggle.addEventListener("minerva-change", onChange);
  return () => toggle.removeEventListener("minerva-change", onChange);
}

```
