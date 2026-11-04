# Graphe de dépendances

Graphes orientés acycliques dessinés en couches : dépendances de paquets, chaînes de build, lignage de données, plans de tâches. La disposition de Sugiyama casse les cycles, affecte les couches, fait passer les longues arêtes par des nœuds fictifs, réduit les croisements et garde les longues arêtes droites ; les arêtes sont des courbes lisses ou des connecteurs orthogonaux fléchés. Survolez ou sélectionnez un nœud pour mettre en avant tout ce qui est en amont et en aval, et affichez le chemin critique d’un plan.

Package: minerva-design@1.20.4

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnDependencyGraph. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDependencyGraph"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "GraphDirection",
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
    "name": "criticalPath",
    "typeText": "boolean | readonly string[] | undefined",
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

## Example: Chaîne CI/CD

Une chaîne de build de gauche à droite avec des connecteurs orthogonaux. Les groupes colorent les jobs selon leur statut (la légende peut en masquer), la valeur des nœuds est leur durée, et criticalPath met en avant la plus longue chaîne de jobs, recalculée avec criticalPath() pour le résumé. Deux artefacts vont du build de l’application au job de packaging (les arêtes parallèles ont chacune leur tracé), et les tests visuels en échec se relancent eux-mêmes (une boucle).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnDependencyGraph, MnSwitch, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDependencyGraph, MnSwitch],
  template: `
@let t = text[language()];
<mn-switch [(checked)]="critical" [label]="t.critical" />
<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  direction="LR"
  edgeStyle="orthogonal"
  [criticalPath]="critical"
  [height]="380"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  critical = true;
  text = {
  "en": {
    "jobs": ["Install dependencies", "Lint", "Type check", "Unit tests", "Build", "E2E tests", "Package", "Deploy"],
    "minutes": "{n} min",
    "critical": "Critical path"
  },
  "zh": {
    "jobs": ["安装依赖", "代码检查", "类型检查", "单元测试", "构建", "端到端测试", "打包", "部署"],
    "minutes": "{n} 分钟",
    "critical": "关键路径"
  },
  "ja": {
    "jobs": ["依存関係のインストール", "Lint", "型チェック", "単体テスト", "ビルド", "E2E テスト", "パッケージ化", "デプロイ"],
    "minutes": "{n} 分",
    "critical": "クリティカルパス"
  },
  "fr": {
    "jobs": ["Installer les dépendances", "Analyse statique", "Vérification des types", "Tests unitaires", "Compilation", "Tests E2E", "Empaquetage", "Déploiement"],
    "minutes": "{n} min",
    "critical": "Chemin critique"
  }
};
  minutes = [3, 2, 3, 6, 5, 9, 2, 4];
  edges = [
  {
    "source": "j0",
    "target": "j1"
  },
  {
    "source": "j0",
    "target": "j2"
  },
  {
    "source": "j0",
    "target": "j3"
  },
  {
    "source": "j2",
    "target": "j4"
  },
  {
    "source": "j4",
    "target": "j5"
  },
  {
    "source": "j1",
    "target": "j6"
  },
  {
    "source": "j3",
    "target": "j6"
  },
  {
    "source": "j4",
    "target": "j6"
  },
  {
    "source": "j6",
    "target": "j7"
  },
  {
    "source": "j5",
    "target": "j7"
  }
];
  nodes = computed(() => {
    const t = this.text[this.language()];
    return t.jobs.map((label, i) => ({
      id: `j${i}`,
      label,
      subtitle: t.minutes.replace("{n}", String(this.minutes[i])),
      value: this.minutes[i],
    }));
  });
}

```

## Example: Module lineage

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnDependencyGraph, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDependencyGraph],
  template: `
<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  highlight="lineage"
  [locale]="language()"
  [height]="460"
  (selectionChange)="selection.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selection = signal<string[]>([]);
  text = {
  "en": {
    "modules": ["Utilities", "HTTP", "Translations", "UI components", "Charts", "API client", "Authentication", "State store", "Router", "Dashboard", "Reports", "Application"],
    "layers": ["Shared", "Core", "Features", "Application"],
    "hint": "Click a module to highlight its dependencies",
    "selected": "Selected: "
  },
  "zh": {
    "modules": ["工具函数", "HTTP", "多语言", "UI 组件", "图表", "API 客户端", "认证", "状态管理", "路由", "仪表盘", "报表", "应用"],
    "layers": ["共享", "核心", "功能", "应用"],
    "hint": "点击一个模块以高亮其依赖",
    "selected": "已选择："
  },
  "ja": {
    "modules": ["ユーティリティ", "HTTP", "翻訳", "UI コンポーネント", "チャート", "API クライアント", "認証", "状態管理", "ルーター", "ダッシュボード", "レポート", "アプリ"],
    "layers": ["共有", "コア", "機能", "アプリ"],
    "hint": "モジュールをクリックすると依存関係が強調表示されます",
    "selected": "選択中: "
  },
  "fr": {
    "modules": ["Utilitaires", "HTTP", "Traductions", "Composants UI", "Graphiques", "Client API", "Authentification", "Gestion d'état", "Routeur", "Tableau de bord", "Rapports", "Application"],
    "layers": ["Partagé", "Cœur", "Fonctionnalités", "Application"],
    "hint": "Cliquez sur un module pour mettre en évidence ses dépendances",
    "selected": "Sélection : "
  }
};
  layer = [0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
  edges = [
  {
    "source": "m0",
    "target": "m1"
  },
  {
    "source": "m1",
    "target": "m5"
  },
  {
    "source": "m5",
    "target": "m6"
  },
  {
    "source": "m5",
    "target": "m7"
  },
  {
    "source": "m6",
    "target": "m8"
  },
  {
    "source": "m0",
    "target": "m4"
  },
  {
    "source": "m2",
    "target": "m3"
  },
  {
    "source": "m3",
    "target": "m9"
  },
  {
    "source": "m3",
    "target": "m10"
  },
  {
    "source": "m4",
    "target": "m9"
  },
  {
    "source": "m4",
    "target": "m10"
  },
  {
    "source": "m5",
    "target": "m9"
  },
  {
    "source": "m5",
    "target": "m10"
  },
  {
    "source": "m7",
    "target": "m9"
  },
  {
    "source": "m7",
    "target": "m10"
  },
  {
    "source": "m8",
    "target": "m11"
  },
  {
    "source": "m9",
    "target": "m11"
  },
  {
    "source": "m10",
    "target": "m11"
  },
  {
    "source": "m6",
    "target": "m11"
  },
  {
    "source": "m2",
    "target": "m11"
  }
];
  nodes = computed(() =>
    this.text[this.language()].modules.map((label, i) => ({
      id: `m${i}`,
      label,
      group: `l${this.layer[i]}`,
    })),
  );
  groups = computed(() =>
    this.text[this.language()].layers.map((name, i) => ({ id: `l${i}`, name })),
  );
  status = computed(() => {
    const t = this.text[this.language()];
    const ids = this.selection();
    return ids.length
      ? t.selected + ids.map((id) => t.modules[Number(id.slice(1))]).join(", ")
      : t.hint;
  });
}

```
