# ツリー図

整列ツリー、放射状ツリー、マインドマップ、組織図で階層構造を表します：組織、ファイルシステム、分類、計画。整列ツリー（Buchheim / Reingold–Tilford）はノードを重ねず、各親を子の中央に配置します。サブツリーはクリック、キーボード、API からアニメーション付きで折りたたみ・展開できます。

Package: minerva-design@1.22.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概要

TreeChart はノードと親 → 子のエッジを受け取ります。親を持たないノードがルートです（tree.root で指定可能）。閉路や 2 つ目の親を作るエッジは無視されます。

整列ツリーは線形時間で動作し、各ノードの大きさを考慮します。ラベルは重ならず、親は子の中央に置かれ、同じ形のサブツリーは同じように描かれます。

layout="tree"（既定は左から右、任意の向き）、"radial"（ルートを囲む同心円、ラベルは半径方向）、"mindmap"（枝を左右にバランスよく配置し、枝ごとに色分け）、"org"（タイトルとサブタイトル付きのカード、直交線、末端のチームは縦に積む）。

子を持つノードをクリックするか、Enter を押すか、expand / collapse / toggle を呼ぶと、サブツリーがアニメーションでノードに畳まれ、バッジが非表示のノード数を示します。ノードに collapsed を指定すると最初から畳まれます。

佐藤 美咲

鈴木 健太

高橋 由美

田中 誠

伊藤 彩

渡辺 翔

山本 大輔

小林 陽菜

加藤 蓮

吉田 拓海

山田 さくら

佐々木 悠斗

山口 恵

松本 亮

井上 結衣

木村 剛

林 真由

清水 達也

最高経営責任者

最高技術責任者

最高財務責任者

最高執行責任者

最高マーケティング責任者

フロントエンドリード

バックエンドリード

フロントエンドエンジニア

フロントエンドエンジニア

バックエンドエンジニア

バックエンドエンジニア

SRE

経理部長

財務アナリスト

サポートマネージャー

物流マネージャー

ブランドマネージャー

グロースマネージャー

経営陣

エンジニアリング

財務

オペレーション

マーケティング

会社の組織図

マネージャーをクリックするとチームを開閉できます。

{{name}} のチームを折りたたみました

{{name}} のチームを展開しました

製品ローンチ

目標

有料ユーザー 1 万人

ブランド認知

継続率 90%

ターゲット

プロダクトチーム

フリーランス

学生

チャネル

発表イベント

ニュースレター

パートナー

SNS

スケジュール

クローズドベータ

プレスキット

ローンチ日

リスク

遅延

価格への反応

予算

広告

イベント

製品ローンチ計画のマインドマップ

入力

ナビゲーション

フィードバック

データ表示

レイアウト

チャート

カテゴリ別のデザインシステムのコンポーネント

フォルダ

```tsx
コード
```

スタイル

データ

ドキュメント

すべて展開

すべて折りたたむ

全体表示

プロジェクトのファイル

信用スコア

収入 ≥ 返済額 × 3？

勤続 2 年以上？

返済負担率 < 35%？

承認

承認（減額）

承認（金利上乗せ）

個別審査

否決

700 以上

600〜699

600 未満

はい

いいえ

質問

承認

審査

否決

現在の申込者の経路を強調したローン審査の決定木

結論: {{outcome}}（{{questions}} 問で判定）。

すべての商品

家電・デジタル

ホーム

ファッション

スポーツ

パソコン

スマートフォン関連

オーディオ

ノートパソコン

デスクトップ

タブレット

スマートフォン

スマホケース

充電器

ヘッドホン

スピーカー

キッチン

家具

ガーデン

調理器具

コーヒーメーカー

包丁

ソファ

デスク

オフィスチェア

園芸用品

観葉植物

衣類

靴

アクセサリー

ジャケット

ワンピース

スニーカー

ブーツ

バッグ

腕時計

アウトドア

フィットネス

サイクリング

テント

登山靴

ヨガマット

ダンベル

自転車

ヘルメット

 › 

カテゴリを検索

ストアの商品カテゴリ体系

{{total}} 件のカテゴリが一致しました。Enter キーかタグで表示します。

カテゴリを検索してください（例:「ブーツ」「デスク」）。

Macintosh HD

システム

アプリケーション

メディア

書類

キャッシュとバックアップ

レイアウト

ツリー

放射状

フォルダー別のディスク使用量（ノードの大きさはバイト数）

{{name}}: {{size}} — {{parent}} の {{parentShare}}、ディスク全体の {{share}}。

{{name}}: {{size}} 使用中。

アプリ 2.0 リリース

オンボーディング

新規登録

メール認証

ソーシャルログイン

製品ツアー

ツアー画面

スキップと再開

決済

チェックアウト

カード入力フォーム

ウォレット決済

請求

請求書

返金

プラットフォーム

オフラインモード

同期キュー

競合の解決

品質

クラッシュレポート

パフォーマンス予算

{{points}} pt

{{points}} pt · {{done}} 完了

集約

完了

進行中

未着手

詳細レベル

成果物

機能

作業パッケージ

{{level}} まで表示しています。

ストーリーポイント付きのモバイルアプリリリースの作業分解構成図

{{name}} を折りたたみました: {{points}} pt、残り {{remaining}} pt。

{{name}} を展開しました: {{points}} pt、残り {{remaining}} pt。

合計 {{points}} ストーリーポイント、{{done}} 完了。項目をクリックすると折りたたみ・展開できます。

準々決勝

準決勝

決勝

未実施

{{winner}}–{{loser}}

第 {{n}} シード

未実施

勝者

勝ち残り

敗退

優勝

次のラウンド

最初から

再シミュレーション

準々決勝から決勝までのトーナメント表

{{team}} が優勝！

{{round}}の勝者: {{teams}}。

実力順にシードされた 8 チーム。次のラウンドを実施して結果を公開します。

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

## Example: マインドマップ

中心テーマを囲むローンチ計画。枝はアイデアの数で左右にバランスよく配置され、枝ごとに色が付き、線は中心から離れるほど細くなります。

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
