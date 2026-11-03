# ネットワーク図

人物、組織、サービスなどのエンティティとその関係を表すネットワーク図です。ノードは力学モデル（Barnes–Hut 法、大きなグラフは Web Worker で計算）、円形レイアウト、アークダイアグラムで配置され、ノードとエッジは GPU（WebGPU、WebGL2、WebGL、Canvas2D へのフォールバック）で描画されるため、数万ノードでも滑らかに操作できます。ノードにホバーすると隣接ノードを強調し、ドラッグ、凡例でのグループ切り替え、キーボードでの移動ができます。

Package: minerva-design@1.20.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概要

GraphChart はノード、エッジ、任意のグループを受け取ります。グループは色と凡例を決め、ノードの値は円の大きさを、エッジのラベルは関係の種類を表します。

レイアウト：力学モデル（デフォルト。リンク力、多体斥力、重力、衝突、決定的なシード）、円形（グループ順、エッジを中心に束ねる）、アークダイアグラム。dag とツリーのレイアウトも使えます（「依存関係グラフ」「ツリー図」を参照）。各レイアウトは純粋関数としてもエクスポートされ、Worker やミニプログラムで使えます。

描画は他のチャートと同じ GPU バックエンドを使い、WebGPU → WebGL2 → WebGL → Canvas2D の順に自動でフォールバックします。使用中のレンダラーは onRendererChange と data-renderer 属性で分かります。

ラベルは重ならないよう配置されます。縮小時は重要なノードのラベルだけが残り、エッジのラベルは拡大時や強調時に表示されます。

#### 操作とアクセシビリティ

背景をドラッグしてパン、Ctrl / ⌘ + ホイールまたはピンチでズーム、ノードをドラッグして移動（シミュレーションが追従）、クリックで選択（Ctrl / ⌘ + クリックで追加）、背景をダブルクリックで全体表示。隅のボタンでもズームと全体表示ができます。

チャートにフォーカスし、矢印キーでノード間を移動します。Enter で選択、+ と - でズーム、0 で全体表示、Esc で解除。フォーカスしたノードはグループとリンク数とともに読み上げられます。

組み込みテキスト（概要、読み上げ、ツールチップ、ボタン）は英語・中国語・日本語・フランス語に対応し、ページの言語に従います。色はライト / ダークテーマに追従します。

劉備

関羽

張飛

諸葛亮

趙雲

馬超

黄忠

龐統

姜維

劉禅

魏延

法正

曹操

曹丕

司馬懿

夏侯惇

夏侯淵

張遼

許褚

郭嘉

荀彧

典韋

曹植

司馬昭

鄧艾

孫権

孫策

孫堅

周瑜

魯粛

呂蒙

陸遜

甘寧

黄蓋

小喬

大喬

孫尚香

呂布

董卓

貂蝉

袁紹

献帝

王允

蜀漢

魏

呉

群雄と漢王室

義兄弟

仕える

父子

夫婦

兄弟姉妹

宿敵

師弟

義父

同盟

撃破

断金の交わり

『三国志演義』の人物相関図（勢力別）

人物や関係にホバー、クリックで選択。Ctrl / ⌘ + スクロールでズーム。

選択中：{{name}}

{{source}} → {{target}}：{{relation}}

、

メンバー {{id}}

コミュニティ {{n}}

40 のコミュニティからなる 10,000 人の生成ネットワーク

ノード {{nodes}} 個 · リンク {{edges}} 本 · レンダラー：{{renderer}} ·

Web Worker でシミュレーション中…

レイアウト完了（{{seconds}} 秒）

エッジ層

コマース

認証

データ

エッジを中心に束ねる

ドメイン別のマイクロサービス間の呼び出し

システム

関数型

オブジェクト指向

スクリプト

影響

プログラミング言語間の影響関係

力学モデル

円形

アークダイアグラム

レイアウト

人物をクリックすると中央に表示します。

{{name}}：関係 {{links}} 件

レイアウト：{{layout}}

カート

支払い待ち

支払い済み

発送済み

配達済み

返金済み

キャンセル

注文

カートを編集

支払い

支払いを再試行

タイムアウト

キャンセル

支払い取り消し

発送

返金

配送状況の更新

配達

差出人に返送

返品

レビュー

進行中

出荷処理

完了

塗りつぶした矢じり

注文の状態とその間のイベント

正常

低下

重大

p95 {{value}} ms

{{value}} 件/秒

ライブ更新

オンラインストアのサービスマップと各サービスのライブなヘルス状態

サービスをクリックするとメトリクスを表示します。

{{name}}：{{status}} · p95 {{latency}} ms · エラー率 {{errors}} · {{rps}} 件/秒。

正常 {{healthy}}・低下 {{degraded}}・重大 {{critical}} · {{time}} 更新

マリー・キュリー

ピエール・キュリー

アルベルト・アインシュタイン

マックス・プランク

ニールス・ボーア

ヴェルナー・ハイゼンベルク

リーゼ・マイトナー

オットー・ハーン

エミー・ネーター

パリ

ワルシャワ

ウィーン

ベルリン

チューリッヒ

コペンハーゲン

ソルボンヌ大学

カイザー・ヴィルヘルム協会

チューリッヒ工科大学

ニールス・ボーア研究所

放射能

相対性理論

量子論

不確定性原理

核分裂

ネーターの定理

出身地

所属

出身校

配偶者

貢献

所在地

影響を与えた

一部

共同研究者

関連

人物

場所

機関

理論

人物・場所・理論を検索…

ナレッジグラフを検索

一致するエンティティはありません。

物理学者と、関連する場所・機関・発見のナレッジグラフ

エンティティを検索するかノードをクリックすると、グラフにある事実を一覧表示します。

{{name}}：事実 {{total}} 件 — {{facts}}

→ {{name}}（{{relation}}）

← {{name}}（{{relation}}）

大学の友人

同僚

クライミングクラブ

読書会

4 つのグループに属する 24 人の友達関係

{{name}} さんの知り合いかも：{{list}}。

{{name}}（共通の友達 {{mutual}} 人）

{{name}} さんは友達の友達を全員知っています。

別の人をクリックすると候補を更新します。

端末 {{id}}

カード •••• {{last4}}

アカウント {{id}}

ログイン端末

支払いカード

アカウント

要注意アカウント

端末

カード

低

中

高

ダークテーマ

アカウント・端末・決済カードのグラフ。2 つの不正リングが端末とカードを共有しています

クラスタ：アカウント {{accounts}}・端末 {{devices}}・カード {{cards}} · リスク：{{risk}}

アカウント・端末・カードをクリックするとクラスタ全体を選択します。

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

## Example: 円形レイアウト

マイクロサービス間の呼び出しを、ドメインごとに円周上へ配置。エッジの太さは呼び出し量、edgeColor="source" で呼び出し元の色に、tension でエッジを中心へ束ねます。

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
