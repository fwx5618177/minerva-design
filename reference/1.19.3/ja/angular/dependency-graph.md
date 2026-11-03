# 依存関係グラフ

階層状に描く有向非巡回グラフ：パッケージの依存関係、ビルドパイプライン、データリネージ、作業計画。Sugiyama レイアウトが閉路を解消し、層を割り当て、長いエッジにダミーノードを挿入し、交差を減らして長いエッジをまっすぐに保ちます。エッジは滑らかなスプラインまたは矢印付きの直交線です。ノードにホバーまたは選択すると上流と下流をすべて強調し、計画のクリティカルパスも表示できます。

Package: minerva-design@1.19.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

## Example: CI/CD パイプライン

左から右へ流れるビルドパイプライン（直交線）。グループでジョブを状態別に色分けし（凡例で非表示可能）、ノードの value は所要時間、criticalPath は最長のジョブの連なりを強調します。下の概要は criticalPath() で再計算しています。アプリのビルドからパッケージへ 2 つの成果物が渡り（平行エッジはそれぞれ別のルート）、失敗したビジュアルテストは自身をリトライします（自己ループ）。

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
