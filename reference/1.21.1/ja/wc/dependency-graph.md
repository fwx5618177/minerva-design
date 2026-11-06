# 依存関係グラフ

階層状に描く有向非巡回グラフ：パッケージの依存関係、ビルドパイプライン、データリネージ、作業計画。Sugiyama レイアウトが閉路を解消し、層を割り当て、長いエッジにダミーノードを挿入し、交差を減らして長いエッジをまっすぐに保ちます。エッジは滑らかなスプラインまたは矢印付きの直交線です。ノードにホバーまたは選択すると上流と下流をすべて強調し、計画のクリティカルパスも表示できます。

Package: minerva-design@1.21.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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

## Example: モジュールの依存系統

レイヤーごとに並べた Web アプリのモジュール。モジュールにカーソルを合わせるかクリックすると、そのモジュールが依存するものと依存されるものがすべて強調表示され、選択内容が下に表示されます。

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

## Example: CI パイプラインとクリティカルパス

ジョブを左から右へ直角のエッジで配置します。ジョブの所要時間を値とするため、最長のジョブの連鎖が強調表示され、スイッチでオフにできます。

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
