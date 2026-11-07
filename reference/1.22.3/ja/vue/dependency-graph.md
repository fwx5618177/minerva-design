# 依存関係グラフ

階層状に描く有向非巡回グラフ：パッケージの依存関係、ビルドパイプライン、データリネージ、作業計画。Sugiyama レイアウトが閉路を解消し、層を割り当て、長いエッジにダミーノードを挿入し、交差を減らして長いエッジをまっすぐに保ちます。エッジは滑らかなスプラインまたは矢印付きの直交線です。ノードにホバーまたは選択すると上流と下流をすべて強調し、計画のクリティカルパスも表示できます。

Package: minerva-design@1.22.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### レイアウトの仕組み

DependencyGraph は layout="dag" の GraphChart です。ボックスはラベルに合わせた大きさで、すべてのエッジに矢印が付き、リネージを強調します。同じレイアウトは純粋関数 dagLayout としても使えます。

深さ優先探索の後退辺を反転して閉路を解消し、最長経路で層を決めたあと、ソースを後続ノードの近くへ、入出力の数が等しいノードを空いた層へ移動します。

複数の層にまたがるエッジにはダミーノードを挿入し、重心法と中央値法のスイープで各層を並べ替えて最良の順序を残し、最後に隣接ノードの入れ替えで交差を減らします。

層内の位置は隣接ノードに向けた重み付き単調回帰で決まり、長いエッジには大きな重みを与えてまっすぐ保ちます。TB、LR、BT、RL の向きに対応します。

highlight="lineage"（ここでの既定値）はホバー・フォーカス・選択したノードのすべての祖先と子孫を強調し、criticalPath は所要時間（ノードの value）の合計が最大の経路を強調します。

アプリケーション

フレームワーク

ライブラリ

ツール

開発依存

循環依存

モノレポのパッケージ間の依存関係

インストール

Lint

型チェック

単体テスト

セキュリティスキャン

アプリのビルド

ドキュメントのビルド

E2E テスト

ビジュアルテスト

パッケージ化

ステージングへデプロイ

本番へデプロイ

成功

実行中

失敗

待機中

{{status}} · {{minutes}} 分

Web バンドル

型定義

リトライ

クリティカルパスを強調

CI/CD パイプライン：ジョブ、依存関係、状態

クリティカルパス：{{minutes}} 分 — {{path}}

 → 

売上ダッシュボード

継続率ダッシュボード

成長ダッシュボード

生データ

ステージング

データマート

ダッシュボード

生テーブルからダッシュボードまでのデータリネージ

{{name}}：上流 {{upstream}} 件、下流 {{downstream}} 件

テーブルやダッシュボードをクリックするとリネージを強調します。

完了

実行中

待機中

{{percent}} 完了

{{seconds}} 秒

ワーカー数

ワーカー × {{n}}

一時停止

実行

リセット

スケジューラーの実行状態で色分けした monorepo のビルドタスク

ワーカー × {{workers}} でビルドが {{seconds}} 秒で完了しました。

{{elapsed}} / {{seconds}} 秒 — 実行中: {{running}}。

なし

どのスケジュールもクリティカルパスより速くはなりません: {{seconds}} 秒。

企画概要

ユーザー調査

サイトマップ

ワイヤーフレーム

ビジュアルデザイン

コピーライティング

API とホスティング

CMS 設定

フロントエンド実装

コンテンツ入稿

QA と修正

SEO レビュー

公開

調査

設計

開発

公開

Web サイト公開計画: タスク、依存関係、クリティカルパス

{{name}}: {{range}}、{{days}} 営業日。公開を遅らせずに {{slack}} 営業日ずらせます。

{{name}}: {{range}}、{{days}} 営業日。クリティカルパス上にあり、遅れはそのまま公開日に影響します。

全 {{days}} 営業日、{{date}} に公開。タスクをクリックすると日程と余裕日数を表示します。

成功

失敗

上流が失敗

失敗するタスク

夜間 ETL のタスクと、失敗したタスクおよびそれがブロックするタスク

{{task}} が失敗: {{total}} タスク中 {{blocked}} がブロックされ、{{sinks}} は配信されません。

{{task}} が失敗しましたが、依存するタスクはありません。

プログラミング入門

離散数学

微分積分

データ構造

コンピュータアーキテクチャ

線形代数

確率論

アルゴリズム

オペレーティングシステム

データベース

ネットワーク

機械学習

コンパイラ

分散システム

セキュリティ

深層学習

卒業研究

{{n}} 年次

流れの方向

上から下

左から右

下から上

右から左

情報科学の科目と前提科目

{{course}} の前に {{total}} 科目: {{list}}。

{{course}} に前提科目はありません。

単価

数量

割引 (%)

税率

小計

割引額

正味

税額

送料

合計

単位あたり費用

入力

数式

注文シートのセルと、数式が参照するセル

{{cell}} を変更: {{total}} セルを再計算しました（{{list}}）。合計: {{value}}。

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
