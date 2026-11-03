# ツリー図

整列ツリー、放射状ツリー、マインドマップ、組織図で階層構造を表します：組織、ファイルシステム、分類、計画。整列ツリー（Buchheim / Reingold–Tilford）はノードを重ねず、各親を子の中央に配置します。サブツリーはクリック、キーボード、API からアニメーション付きで折りたたみ・展開できます。

Package: minerva-design@1.19.3

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "TreeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "layout",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "mindmap",
      "org",
      "radial",
      "tree"
    ],
    "typeText": "\"tree\" | \"radial\" | \"mindmap\" | \"org\" | undefined",
    "typeRef": "type:1f957bc192830118b32b",
    "default": "tree",
    "required": false,
    "description": "Kind of tree: tidy tree, radial tree, two-sided mind map or org chart"
  },
  {
    "name": "direction",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "BT",
      "LR",
      "RL",
      "TB"
    ],
    "typeText": "GraphDirection | undefined",
    "typeRef": "type:e2282a023de588fdd830",
    "default": "LR",
    "required": false,
    "description": "Direction of `layout=\"tree\"`"
  },
  {
    "name": "tree",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "GraphTreeOptions | undefined",
    "typeRef": "type:8786e91b2b5f9ba54696",
    "required": false,
    "description": "Root, spacing, collapsing, card size"
  },
  {
    "name": "nodes",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphNode[]",
    "typeRef": "type:d043e153cf195b5b2e2b",
    "required": true,
    "description": "The nodes"
  },
  {
    "name": "edges",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphEdge[]",
    "typeRef": "type:75a5208fa228dd1e0528",
    "required": true,
    "description": "The edges (parent → child in trees, prerequisite → dependent in DAGs)"
  },
  {
    "name": "groups",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphGroup[] | undefined",
    "typeRef": "type:b8f1cf5e37f0c33f5bad",
    "required": false,
    "description": "Groups: legend order, names and colors"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 480,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "nodeShape",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "box",
      "circle"
    ],
    "typeText": "GraphNodeShape | undefined",
    "typeRef": "type:1091b2c2c15e447b147f",
    "required": false,
    "description": "Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise)"
  },
  {
    "name": "nodeSize",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | readonly [number, number] | undefined",
    "typeRef": "type:750314f5aee769294737",
    "required": false,
    "description": "Circle diameter in layout units, or `[min, max]` scaled by the node `value`"
  },
  {
    "name": "edgeStyle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "curve",
      "orthogonal",
      "spline",
      "straight"
    ],
    "typeText": "GraphEdgeStyle | undefined",
    "typeRef": "type:8c4d9692eea81edaa9b2",
    "required": false,
    "description": "Edge shape; depends on the layout when omitted"
  },
  {
    "name": "edgeWidth",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | readonly [number, number] | undefined",
    "typeRef": "type:750314f5aee769294737",
    "required": false,
    "description": "Edge width in CSS pixels, or `[min, max]` scaled by the edge `value`"
  },
  {
    "name": "edgeColor",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"source\" | undefined",
    "typeRef": "type:12fe953650573b302791",
    "default": "neutral",
    "required": false,
    "description": "Edge colors: neutral or tinted with the source / target node"
  },
  {
    "name": "arrows",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Arrowheads on the edges without `directed`"
  },
  {
    "name": "arrowStyle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "filled",
      "open"
    ],
    "typeText": "\"filled\" | \"open\" | undefined",
    "typeRef": "type:d74ec6d9774e9b198b93",
    "default": "open",
    "required": false,
    "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color, which follows the theme and the highlight)"
  },
  {
    "name": "nodeLabels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | \"auto\" | undefined",
    "typeRef": "type:54793a2f0bb416543bfd",
    "default": "auto",
    "required": false,
    "description": "Node labels; `auto` hides minor and overlapping labels when zoomed out. Text inside boxes keeps a readable minimum size and is shortened with an ellipsis; it is hidden only when the box is too small for any text, or with `false`"
  },
  {
    "name": "edgeLabels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | \"hover\" | \"auto\" | undefined",
    "typeRef": "type:266dfa648b484f073d6f",
    "default": "auto",
    "required": false,
    "description": "Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never"
  },
  {
    "name": "highlight",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "lineage",
      "neighbors",
      "none"
    ],
    "typeText": "\"none\" | \"neighbors\" | \"lineage\" | undefined",
    "typeRef": "type:b5de00c7c3625629f010",
    "required": false,
    "description": "What hovering / selecting a node highlights"
  },
  {
    "name": "selected",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Ids of the selected nodes (changing it updates the selection)"
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | boolean | undefined",
    "typeRef": "type:11d9d08024b0b84c460e",
    "default": true,
    "required": false,
    "description": "Animates layout and data changes; a number is the duration in ms"
  },
  {
    "name": "fitPadding",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 24,
    "required": false,
    "description": "Padding around the graph when fitting it, in CSS pixels"
  },
  {
    "name": "controls",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Zoom buttons (zoom in, zoom out, fit)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphLegendOptions | undefined",
    "typeRef": "type:a6752c0a6f36341f0589",
    "required": false,
    "description": "Legend of the groups; shown by default with several groups"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphTooltipOptions | undefined",
    "typeRef": "type:43b64af2877567c9edca",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphInteractionOptions | undefined",
    "typeRef": "type:a8c334ec55cb37fe3733",
    "default": true,
    "required": false,
    "description": "Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged (force, circular), click selects, arrow keys move between nodes; `false` makes the chart static"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Language of the built-in texts (summary, announcements, tooltip, buttons); built-in texts in English, Chinese, Japanese and French"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "Partial<GraphChartLabels> | undefined",
    "typeRef": "type:dae2a71254652403a618",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphHoverEvent | null) => void) | undefined",
    "typeRef": "type:ac5e1baf28ad49ba06c3",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphHoverEvent | null",
        "typeRef": "type:888c98d6309fe4d4eaed"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) node / edge changes"
  },
  {
    "name": "onItemClick",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphHoverEvent) => void) | undefined",
    "typeRef": "type:51acd588b4a8583a3df7",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphHoverEvent",
        "typeRef": "type:a459780626c7d631683c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a node or an edge is clicked (or a node activated with Enter)"
  },
  {
    "name": "onSelectionChange",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((ids: string[]) => void) | undefined",
    "typeRef": "type:e21311d79e7bf99e04a2",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the ids of the selected nodes when the selection changes"
  },
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphToggleEvent) => void) | undefined",
    "typeRef": "type:5637f42cbc0ffe182065",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphToggleEvent",
        "typeRef": "type:f64c00a6c651b3baee92"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a tree node is collapsed or expanded"
  },
  {
    "name": "onGroupToggle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphGroupToggleEvent) => void) | undefined",
    "typeRef": "type:19db777e1f40d3438872",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphGroupToggleEvent",
        "typeRef": "type:530e796c884bafc1408c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the legend shows / hides a group"
  },
  {
    "name": "onLayoutEnd",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphLayoutEndEvent) => void) | undefined",
    "typeRef": "type:def0e4d2c65fe68907cf",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphLayoutEndEvent",
        "typeRef": "type:55967c5fef8c1466ed7d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the layout is done (the force simulation cooled down)"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:5797a13f9f213080fe55",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and after a fallback)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "TreeChartProps": {
    "source": "charts/src/react/graph.tsx",
    "description": "Props of `TreeChart`",
    "kind": "interface",
    "extends": [
      "GraphCommonProps"
    ],
    "props": [
      {
        "name": "layout",
        "type": "\"tree\" | \"radial\" | \"mindmap\" | \"org\"",
        "required": false,
        "default": "\"tree\"",
        "description": "Kind of tree: tidy tree, radial tree, two-sided mind map or org chart"
      },
      {
        "name": "direction",
        "type": "GraphDirection",
        "required": false,
        "default": "\"LR\"",
        "description": "Direction of `layout=\"tree\"`"
      },
      {
        "name": "tree",
        "type": "GraphTreeOptions",
        "required": false,
        "description": "Root, spacing, collapsing, card size"
      }
    ]
  },
  "GraphTreeOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Settings of the tree layouts (`tree`, `radial`, `mindmap`, `org`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "root",
        "type": "string",
        "required": false,
        "description": "Id of the root; nodes without a parent are roots when omitted"
      },
      {
        "name": "levelGap",
        "type": "number",
        "required": false,
        "description": "Space between two levels, in layout units; depends on the layout when omitted"
      },
      {
        "name": "siblingGap",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Space between two neighboring nodes, in layout units"
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clicking a node with children collapses / expands it"
      },
      {
        "name": "compact",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Org charts: the cards of the leaf children of a node form a column under it instead of a row"
      },
      {
        "name": "cardSize",
        "type": "readonly [number, number]",
        "required": false,
        "default": "[168, 60]",
        "description": "Org chart cards: width and height in layout units"
      }
    ]
  },
  "GraphToggleEvent": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "A tree node was collapsed or expanded",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Node id"
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "required": true,
        "description": "New state"
      }
    ]
  },
  "GraphTreeLayoutOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Options of `treeLayout`",
    "kind": "interface",
    "extends": [
      "Omit<GraphTreeOptions, \"collapsible\">"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"tree\" | \"radial\" | \"mindmap\" | \"org\"",
        "required": false,
        "default": "\"tree\"",
        "description": "Kind of tree"
      },
      {
        "name": "direction",
        "type": "GraphDirection",
        "required": false,
        "default": "\"LR\"",
        "description": "Direction of `tree`"
      },
      {
        "name": "size",
        "type": "(node: GraphNode, index: number) => readonly [number, number]",
        "required": false,
        "description": "Width and height of each node in layout units"
      },
      {
        "name": "collapsed",
        "type": "ReadonlySet<number>",
        "required": false,
        "description": "Indices of the collapsed nodes (their descendants are hidden)"
      }
    ]
  },
  "GraphTreeLayoutResult": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Result of `treeLayout`",
    "kind": "interface",
    "extends": [
      "GraphLayoutResult"
    ],
    "props": [
      {
        "name": "parent",
        "type": "Int32Array",
        "required": true,
        "description": "Parent index of each node (-1 for roots)"
      },
      {
        "name": "depth",
        "type": "Int32Array",
        "required": true,
        "description": "Depth of each node (0 = root)"
      },
      {
        "name": "visible",
        "type": "Uint8Array",
        "required": true,
        "description": "1 when the node is shown (not below a collapsed node)"
      },
      {
        "name": "side",
        "type": "Float64Array",
        "required": true,
        "description": "Mind map: -1 on the left side, 1 on the right side; radial: angle in radians"
      },
      {
        "name": "children",
        "type": "number[][]",
        "required": true,
        "description": "Children of each node, in order"
      },
      {
        "name": "stacked",
        "type": "Uint8Array",
        "required": true,
        "description": "1 when the node is a card of a compact column under its parent (org charts)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: トーナメント表

右から左（direction="RL"）へのトーナメント表で、ボックス型ノードと直角のエッジを使います。決勝がルート、チームが葉で、チーム名は Intl.DisplayNames で表示します。「次のラウンド」でシード付き乱数によるシミュレーション結果を公開し、グループが勝ち残り・敗退・優勝チームを色分けします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/bracket.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type State = "pending" | "played" | "alive" | "out" | "champion";
type Round = "quarterFinal" | "semiFinal" | "final";

/** Small seeded PRNG so the results are the same on every render */
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
  return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
};

// region code and rating, in bracket order (seeds 1 v 8, 4 v 5, 2 v 7, 3 v 6)
const TEAMS: [string, number, number][] = [
  ["AR", 1, 92],
  ["MA", 8, 78],
  ["ES", 4, 85],
  ["NL", 5, 83],
  ["FR", 2, 90],
  ["JP", 7, 79],
  ["BR", 3, 88],
  ["DE", 6, 82],
];

// match, round, the two nodes it is played between
const MATCHES: [string, Round, string, string][] = [
  ["qf0", "quarterFinal", "AR", "MA"],
  ["qf1", "quarterFinal", "ES", "NL"],
  ["qf2", "quarterFinal", "FR", "JP"],
  ["qf3", "quarterFinal", "BR", "DE"],
  ["sf0", "semiFinal", "qf0", "qf1"],
  ["sf1", "semiFinal", "qf2", "qf3"],
  ["final", "final", "sf0", "sf1"],
];
const ROUNDS: Round[] = ["quarterFinal", "semiFinal", "final"];
const RATING = new Map(TEAMS.map(([code, , rating]) => [code, rating]));
const STATES: State[] = ["pending", "played", "alive", "out", "champion"];
const COLORS: Record<State, string> = {
  pending: "var(--text-secondary-color, #9ca3af)",
  played: "var(--primary-color, #4f46e5)",
  alive: "var(--success-color, #16a34a)",
  out: "var(--danger-color, #dc2626)",
  champion: "var(--warning-color, #d97706)",
};

interface Result {
  winner: string;
  loser: string;
  goals: [number, number];
}

/** Plays the whole tournament with a seed: the better rating wins more often */
const play = (seed: number) => {
  const random = mulberry32(seed);
  const results = new Map<string, Result>();
  const teamOf = (id: string) => results.get(id)?.winner ?? id;
  for (const [id, , a, b] of MATCHES) {
    const [home, away] = [teamOf(a), teamOf(b)];
    const odds = RATING.get(home)! / (RATING.get(home)! + RATING.get(away)!);
    const homeWins = random() < odds;
    const loserGoals = Math.floor(random() * 3);
    const winnerGoals = loserGoals + 1 + Math.floor(random() * 2);
    results.set(id, {
      winner: homeWins ? home : away,
      loser: homeWins ? away : home,
      goals: [winnerGoals, loserGoals],
    });
  }
  return results;
};

export default function BracketDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [seed, setSeed] = useState(2026);
  const [played, setPlayed] = useState(0);
  const results = useMemo(() => play(seed), [seed]);
  const names = useMemo(
    () => new Intl.DisplayNames(i18n.language, { type: "region" }),
    [i18n.language],
  );
  const integer = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const country = (code: string) => names.of(code) ?? code;

  const nodes = useMemo((): GraphNode[] => {
    const isPlayed = (round: Round) => ROUNDS.indexOf(round) < played;
    const nameOf = (code: string) => names.of(code) ?? code;
    const out = new Set(
      MATCHES.filter(([, round]) => isPlayed(round)).map(
        ([id]) => results.get(id)!.loser,
      ),
    );
    return [
      ...MATCHES.map(([id, round]): GraphNode => {
        const result = results.get(id)!;
        if (!isPlayed(round)) {
          return {
            id,
            label: t(`rounds.${round}`),
            subtitle: t("tbd"),
            group: "pending",
          };
        }
        return {
          id,
          label: nameOf(result.winner),
          subtitle: t("score", {
            winner: integer.format(result.goals[0]),
            loser: integer.format(result.goals[1]),
          }),
          group: round === "final" ? "champion" : "played",
        };
      }),
      ...TEAMS.map(([code, seedNumber]): GraphNode => ({
        id: code,
        label: nameOf(code),
        subtitle: t("seed", { n: seedNumber }),
        group: out.has(code) ? "out" : "alive",
      })),
    ];
  }, [t, results, played, names, integer]);
  const edges = useMemo(
    (): GraphEdge[] =>
      MATCHES.flatMap(([id, , a, b]) => [
        { source: id, target: a },
        { source: id, target: b },
      ]),
    [],
  );
  const groups = useMemo(
    () =>
      STATES.map((id) => ({
        id,
        name: t(`bracketStates.${id}`),
        color: COLORS[id],
      })),
    [t],
  );

  const lastRound = played > 0 ? ROUNDS[played - 1] : null;
  const list = new Intl.ListFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap>
        <Button
          size="small"
          disabled={played === ROUNDS.length}
          onClick={() => setPlayed(played + 1)}
        >
          {t("nextRound")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setPlayed(0)}
        >
          {t("restart")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => {
            setSeed(seed + 1);
            setPlayed(0);
          }}
        >
          {t("newSimulation")}
        </Button>
      </HStack>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="RL"
        nodeShape="box"
        edgeStyle="orthogonal"
        tree={{ collapsible: false }}
        height={440}
        ariaLabel={t("bracketAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {lastRound === "final"
          ? t("championResult", {
              team: country(results.get("final")!.winner),
            })
          : lastRound
            ? t("roundResult", {
                round: t(`rounds.${lastRound}`),
                teams: list.format(
                  MATCHES.filter(([, round]) => round === lastRound).map(
                    ([id]) => country(results.get(id)!.winner),
                  ),
                ),
              })
            : t("bracketHint")}
      </output>
    </div>
  );
}

```

## Example: 決定木

ローン審査のポリシーを、ラベル付きの分岐（edgeLabels）を持つ org レイアウトで表示します。ラジオボタンで質問に答えると、たどり着いた結論が selected に渡され、highlight="lineage" がルートからの経路を強調します。tree.collapsible を無効にしているので、クリックしても質問は折りたたまれません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/decision-tree.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "question" | "approved" | "review" | "declined";
type Credit = "high" | "fair" | "poor";
type Answer = "yes" | "no";

interface Applicant {
  credit: Credit;
  income: Answer;
  /** debt-to-income ratio below 35% */
  debt: Answer;
  employment: Answer;
}

// node, kind, translation key of its text
const NODES: [string, Kind, string][] = [
  ["credit", "question", "credit"],
  ["income", "question", "income"],
  ["employment", "question", "employment"],
  ["debtA", "question", "debt"],
  ["debtB", "question", "debt"],
  ["approve", "approved", "approved"],
  ["approveLower", "approved", "approvedLower"],
  ["approveRate", "approved", "approvedRate"],
  ["reviewA", "review", "review"],
  ["reviewB", "review", "review"],
  ["declineA", "declined", "declined"],
  ["declineB", "declined", "declined"],
];

// parent, child, translation key of the branch label
const BRANCHES: [string, string, string][] = [
  ["credit", "income", "creditHigh"],
  ["credit", "employment", "creditFair"],
  ["credit", "declineB", "creditPoor"],
  ["income", "approve", "yes"],
  ["income", "debtA", "no"],
  ["debtA", "approveLower", "yes"],
  ["debtA", "reviewA", "no"],
  ["employment", "debtB", "yes"],
  ["employment", "reviewB", "no"],
  ["debtB", "approveRate", "yes"],
  ["debtB", "declineA", "no"],
];

const CREDIT_BRANCH: Record<Credit, string> = {
  high: "creditHigh",
  fair: "creditFair",
  poor: "creditPoor",
};
const KINDS: Kind[] = ["question", "approved", "review", "declined"];
const COLORS: Record<Kind, string> = {
  question: "var(--chart-series-1, #4f46e5)",
  approved: "var(--success-color, #16a34a)",
  review: "var(--warning-color, #d97706)",
  declined: "var(--danger-color, #dc2626)",
};

/** Follows the branches that match the applicant, from the root to a leaf */
const decide = (applicant: Applicant) => {
  const answer: Record<string, string> = {
    credit: CREDIT_BRANCH[applicant.credit],
    income: applicant.income,
    debtA: applicant.debt,
    debtB: applicant.debt,
    employment: applicant.employment,
  };
  const path = ["credit"];
  for (;;) {
    const current = path[path.length - 1];
    const next = BRANCHES.find(
      ([parent, , label]) => parent === current && label === answer[current],
    );
    if (!next) return path;
    path.push(next[1]);
  }
};

export default function DecisionTreeDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [applicant, setApplicant] = useState<Applicant>({
    credit: "fair",
    income: "yes",
    debt: "yes",
    employment: "yes",
  });
  const path = decide(applicant);
  const leaf = path[path.length - 1];

  const nodes = useMemo(
    (): GraphNode[] =>
      NODES.map(([id, kind, text]) => ({
        id,
        label: t(`decision.${text}`),
        group: kind,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      BRANCHES.map(([source, target, label]) => ({
        source,
        target,
        label: t(`branches.${label}`),
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      KINDS.map((id) => ({
        id,
        name: t(`decisionKinds.${id}`),
        color: COLORS[id],
      })),
    [t],
  );
  const set = <K extends keyof Applicant>(key: K, value: Applicant[K]) =>
    setApplicant({ ...applicant, [key]: value });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <HStack gap={8} align="center">
          <span>{t("decision.credit")}</span>
          <RadioGroup
            aria-label={t("decision.credit")}
            direction="horizontal"
            value={applicant.credit}
            onChange={(value) => set("credit", value as Credit)}
          >
            {(Object.keys(CREDIT_BRANCH) as Credit[]).map((id) => (
              <Radio
                key={id}
                value={id}
                label={t(`branches.${CREDIT_BRANCH[id]}`)}
              />
            ))}
          </RadioGroup>
        </HStack>
        {(["income", "debt", "employment"] as const).map((key) => (
          <HStack key={key} gap={8} align="center">
            <span>{t(`decision.${key}`)}</span>
            <RadioGroup
              aria-label={t(`decision.${key}`)}
              direction="horizontal"
              value={applicant[key]}
              onChange={(value) => set(key, value as Answer)}
            >
              <Radio value="yes" label={t("branches.yes")} />
              <Radio value="no" label={t("branches.no")} />
            </RadioGroup>
          </HStack>
        ))}
      </HStack>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        tree={{ collapsible: false, compact: false, cardSize: [150, 52] }}
        edgeLabels
        highlight="lineage"
        selected={[leaf]}
        interaction={{ select: false }}
        height={460}
        ariaLabel={t("decisionAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("decisionResult", {
          outcome: t(`decision.${NODES.find(([id]) => id === leaf)![2]}`),
          questions: path.length - 1,
        })}
      </output>
    </div>
  );
}

```

## Example: ディスク使用量

各ノードの value をフォルダーのサイズにしたファイルシステムで、[min, max] 形式の nodeSize により円がバイト数に応じて拡大縮小します。サイズは Intl.NumberFormat の単位で整形し、ラジオボタンでツリーと放射状のレイアウトを切り替え、クリックで親フォルダーとディスク全体に対する割合を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/disk-usage.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "system" | "apps" | "media" | "documents" | "cache";
type Layout = "tree" | "radial";

const GB = 1e9;
const MB = 1e6;

// path, kind, size in bytes for files (folders add up their content)
const ENTRIES: [string, Kind, number?][] = [
  ["/", "system"],
  ["/System", "system", 14.2 * GB],
  ["/Applications", "apps"],
  ["/Applications/Xcode.app", "apps", 11.8 * GB],
  ["/Applications/Photoshop.app", "apps", 4.6 * GB],
  ["/Applications/Chrome.app", "apps", 1.3 * GB],
  ["/Applications/Slack.app", "apps", 540 * MB],
  ["/Applications/Spotify.app", "apps", 320 * MB],
  ["/Users", "documents"],
  ["/Users/alex", "documents"],
  ["/Users/alex/Movies", "media"],
  ["/Users/alex/Movies/trip-2025.mov", "media", 18.4 * GB],
  ["/Users/alex/Movies/screencasts", "media", 6.2 * GB],
  ["/Users/alex/Pictures", "media"],
  ["/Users/alex/Pictures/Photos Library", "media", 42.7 * GB],
  ["/Users/alex/Pictures/exports", "media", 3.1 * GB],
  ["/Users/alex/Music", "media", 9.4 * GB],
  ["/Users/alex/Documents", "documents"],
  ["/Users/alex/Documents/invoices", "documents", 210 * MB],
  ["/Users/alex/Documents/thesis", "documents", 1.7 * GB],
  ["/Users/alex/Documents/scans", "documents", 2.4 * GB],
  ["/Users/alex/Developer", "documents"],
  ["/Users/alex/Developer/node_modules", "cache", 7.9 * GB],
  ["/Users/alex/Developer/docker", "cache", 22.5 * GB],
  ["/Users/alex/Developer/repos", "documents", 5.3 * GB],
  ["/Users/alex/Library", "cache"],
  ["/Users/alex/Library/Caches", "cache", 8.8 * GB],
  ["/Users/alex/Library/Mail", "documents", 4.2 * GB],
  ["/Users/alex/Library/iOS Backups", "cache", 16.1 * GB],
];

const KINDS: Kind[] = ["system", "apps", "media", "documents", "cache"];
const parentOf = (path: string) =>
  path === "/" ? null : path.slice(0, path.lastIndexOf("/")) || "/";

/** Size of every entry, folders included */
const SIZES = (() => {
  const sizes = new Map<string, number>(ENTRIES.map(([path]) => [path, 0]));
  for (const [path, , bytes] of ENTRIES) {
    if (!bytes) continue;
    for (let at: string | null = path; at; at = parentOf(at)) {
      sizes.set(at, sizes.get(at)! + bytes);
    }
  }
  return sizes;
})();
const TOTAL = SIZES.get("/")!;

export default function DiskUsageDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [layout, setLayout] = useState<Layout>("tree");
  const [current, setCurrent] = useState("/Users/alex/Pictures");

  const formatBytes = useMemo(() => {
    const units = ["byte", "kilobyte", "megabyte", "gigabyte"] as const;
    const formats = units.map(
      (unit) =>
        new Intl.NumberFormat(i18n.language, {
          style: "unit",
          unit,
          unitDisplay: "short",
          maximumFractionDigits: 1,
        }),
    );
    return (bytes: number) => {
      const step = Math.min(
        3,
        Math.max(0, Math.floor(Math.log10(Math.max(bytes, 1)) / 3)),
      );
      return formats[step].format(bytes / 1000 ** step);
    };
  }, [i18n.language]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): GraphNode[] =>
      ENTRIES.map(([path, kind]) => ({
        id: path,
        label: path === "/" ? t("diskRoot") : path.split("/").pop(),
        subtitle: formatBytes(SIZES.get(path)!),
        value: SIZES.get(path),
        group: kind,
        // big folders of the home directory start collapsed
        collapsed:
          path === "/Users/alex/Developer" || path === "/Users/alex/Library",
      })),
    [t, formatBytes],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      ENTRIES.filter(([path]) => parentOf(path)).map(([path]) => ({
        source: parentOf(path)!,
        target: path,
      })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`diskKinds.${id}`) })),
    [t],
  );
  const size = SIZES.get(current)!;
  const parent = parentOf(current);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("diskLayout")}
        direction="horizontal"
        value={layout}
        onChange={(value) => setLayout(value as Layout)}
      >
        <Radio value="tree" label={t("diskLayouts.tree")} />
        <Radio value="radial" label={t("diskLayouts.radial")} />
      </RadioGroup>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout={layout}
        direction="LR"
        nodeSize={[5, 22]}
        highlight="lineage"
        selected={[current]}
        interaction={{ select: false }}
        height={500}
        ariaLabel={t("diskAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setCurrent(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t(parent ? "diskShare" : "diskTotal", {
          name: current,
          size: formatBytes(size),
          share: percent.format(size / TOTAL),
          parentShare: parent
            ? percent.format(size / SIZES.get(parent)!)
            : undefined,
          parent,
        })}
      </output>
    </div>
  );
}

```

## Example: 折りたたみ可能なファイルツリー

左から右へのプロジェクトツリーをファイルの種類で色分け。深いフォルダは最初は畳まれています。フォルダをクリックして開くか、ref の expand()、collapse()、fit() を呼ぶボタンを使います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/file-tree.tsx

```tsx
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "folder" | "code" | "style" | "data" | "doc";

// path → kind; folders end with "/"
const FILES: string[] = [
  "minerva-design/",
  "minerva-design/packages/",
  "minerva-design/packages/charts/",
  "minerva-design/packages/charts/src/",
  "minerva-design/packages/charts/src/core.ts",
  "minerva-design/packages/charts/src/index.ts",
  "minerva-design/packages/charts/src/engine/",
  "minerva-design/packages/charts/src/engine/chart.ts",
  "minerva-design/packages/charts/src/engine/theme.ts",
  "minerva-design/packages/charts/src/engine/graph/",
  "minerva-design/packages/charts/src/engine/graph/force.ts",
  "minerva-design/packages/charts/src/engine/graph/dag.ts",
  "minerva-design/packages/charts/src/engine/graph/tree.ts",
  "minerva-design/packages/charts/package.json",
  "minerva-design/packages/react/",
  "minerva-design/packages/react/src/",
  "minerva-design/packages/react/src/Button.tsx",
  "minerva-design/packages/react/src/Button.module.scss",
  "minerva-design/packages/react/src/Tree.tsx",
  "minerva-design/packages/react/package.json",
  "minerva-design/apps/",
  "minerva-design/apps/docs/",
  "minerva-design/apps/docs/src/",
  "minerva-design/apps/docs/src/main.tsx",
  "minerva-design/apps/docs/src/styles.css",
  "minerva-design/apps/docs/README.md",
  "minerva-design/package.json",
  "minerva-design/README.md",
];

const kindOf = (path: string): Kind =>
  path.endsWith("/")
    ? "folder"
    : /\.(tsx?|js)$/.test(path)
      ? "code"
      : /\.(s?css)$/.test(path)
        ? "style"
        : path.endsWith(".json")
          ? "data"
          : "doc";

const parentOf = (path: string) => {
  const trimmed = path.replace(/\/$/, "");
  const cut = trimmed.lastIndexOf("/");
  return cut < 0 ? null : `${trimmed.slice(0, cut)}/`;
};

const KINDS: Kind[] = ["folder", "code", "style", "data", "doc"];

export default function FileTreeDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const nodes = useMemo(
    (): GraphNode[] =>
      FILES.map((path) => ({
        id: path,
        label: path.replace(/\/$/, "").split("/").pop(),
        group: kindOf(path),
        // deep folders start collapsed
        collapsed: path.endsWith("/") && path.split("/").length > 4,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      FILES.filter((path) => parentOf(path)).map((path) => ({
        source: parentOf(path)!,
        target: path,
      })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`fileKinds.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.expand()}
        >
          {t("expandAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.collapse()}
        >
          {t("collapseAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => ref.current?.fit()}
        >
          {t("fit")}
        </Button>
      </HStack>
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="LR"
        nodeSize={9}
        height={480}
        ariaLabel={t("filesAria")}
      />
    </div>
  );
}

```

## Example: マインドマップ

中心テーマを囲むローンチ計画。枝はアイデアの数で左右にバランスよく配置され、枝ごとに色が付き、線は中心から離れるほど細くなります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/mind-map.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// branch → ideas (keys of the locale file)
const MAP: Record<string, string[]> = {
  goals: ["revenue", "awareness", "retention"],
  audience: ["teams", "freelancers", "students"],
  channels: ["launchEvent", "newsletter", "partners", "social"],
  timeline: ["beta", "pressKit", "launchDay"],
  risks: ["delays", "pricing"],
  budget: ["ads", "events"],
};

export default function MindMapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "launch", label: t("mind.launch") }];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ id: branch, label: t(`mind.${branch}`) });
      for (const idea of ideas)
        list.push({ id: idea, label: t(`mind.${idea}`) });
    }
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ source: "launch", target: branch });
      for (const idea of ideas) list.push({ source: branch, target: idea });
    }
    return list;
  }, []);

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      layout="mindmap"
      height={460}
      ariaLabel={t("mindAria")}
    />
  );
}

```

## Example: 組織図

名前と役職を記したカードを部署ごとに色分けし、直交線で結びます。部下のいないチームは縦に積んで幅を抑えます。バックエンドチームは最初は畳まれています。マネージャーをクリックするとチームを開閉できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/org-chart.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Department =
  "executive" | "engineering" | "finance" | "operations" | "marketing";

// person, department, manager
const PEOPLE: [string, Department, string | null][] = [
  ["ceo", "executive", null],
  ["cto", "engineering", "ceo"],
  ["cfo", "finance", "ceo"],
  ["coo", "operations", "ceo"],
  ["cmo", "marketing", "ceo"],
  ["frontend", "engineering", "cto"],
  ["backend", "engineering", "cto"],
  ["web1", "engineering", "frontend"],
  ["web2", "engineering", "frontend"],
  ["api1", "engineering", "backend"],
  ["api2", "engineering", "backend"],
  ["api3", "engineering", "backend"],
  ["controller", "finance", "cfo"],
  ["analyst", "finance", "cfo"],
  ["support", "operations", "coo"],
  ["logistics", "operations", "coo"],
  ["brand", "marketing", "cmo"],
  ["growth", "marketing", "cmo"],
];

const DEPARTMENTS: Department[] = [
  "executive",
  "engineering",
  "finance",
  "operations",
  "marketing",
];

export default function OrgChartDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [status, setStatus] = useState("");
  const nodes = useMemo(
    (): GraphNode[] =>
      PEOPLE.map(([id, department]) => ({
        id,
        label: t(`people.${id}`),
        subtitle: t(`roles.${id}`),
        group: department,
        // the backend team starts collapsed
        collapsed: id === "backend",
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      PEOPLE.filter(([, , manager]) => manager).map(([id, , manager]) => ({
        source: manager!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => DEPARTMENTS.map((id) => ({ id, name: t(`departments.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        height={560}
        ariaLabel={t("orgAria")}
        onToggle={(event) =>
          setStatus(
            t(event.collapsed ? "teamCollapsed" : "teamExpanded", {
              name: t(`people.${event.id}`),
            }),
          )
        }
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {status || t("orgHint")}
      </span>
    </div>
  );
}

```

## Example: 放射状ツリー

ライブラリ名を中心にデザインシステムのコンポーネントを配置し、ラベルは半径方向に並びます。葉の数に応じて半径が広がり、ラベルが重なりません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/radial.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// the components of the library, by category
const CATEGORIES: Record<string, string[]> = {
  inputs: [
    "Button",
    "Input",
    "Select",
    "Checkbox",
    "Radio",
    "Switch",
    "Slider",
    "DatePicker",
    "Upload",
  ],
  navigation: ["Tabs", "Menu", "Breadcrumb", "Pagination", "Steps"],
  feedback: ["Alert", "Toast", "Modal", "Drawer", "Progress", "Skeleton"],
  display: [
    "Table",
    "List",
    "Card",
    "Avatar",
    "Badge",
    "Tag",
    "Tooltip",
    "Tree",
  ],
  layout: ["Grid", "Stack", "Divider", "AppShell"],
  charts: [
    "LineChart",
    "BarChart",
    "PieChart",
    "SankeyChart",
    "TradingChart",
    "GraphChart",
    "TreeChart",
  ],
};

const CATEGORY_COLORS = [
  "var(--chart-series-1, #4f46e5)",
  "var(--chart-series-2, #10b981)",
  "var(--chart-series-3, #f59e0b)",
  "var(--chart-series-4, #ef4444)",
  "var(--chart-series-5, #0ea5e9)",
  "var(--chart-series-6, #8b5cf6)",
];

export default function RadialDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "root", label: "Minerva", size: 16 }];
    Object.entries(CATEGORIES).forEach(([category, components]) => {
      list.push({
        id: category,
        label: t(`categories.${category}`),
        group: category,
        size: 12,
      });
      for (const name of components)
        list.push({ id: name, label: name, group: category });
    });
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [category, components] of Object.entries(CATEGORIES)) {
      list.push({ source: "root", target: category });
      for (const name of components)
        list.push({ source: category, target: name });
    }
    return list;
  }, []);
  const groups = useMemo(
    () =>
      Object.keys(CATEGORIES).map((id, i) => ({
        id,
        name: t(`categories.${id}`),
        color: CATEGORY_COLORS[i],
      })),
    [t],
  );

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      groups={groups}
      layout="radial"
      nodeSize={8}
      legend={false}
      height={560}
      ariaLabel={t("radialAria")}
    />
  );
}

```

## Example: カテゴリ検索

ストアの商品カテゴリ体系で、第 2 階層は折りたたまれています。入力すると一致するカテゴリがすべて選択され、Enter またはタグで ref の focusNode() を呼び出します。折りたたまれた祖先を展開してからノードを中央に表示し、カテゴリのパンくずを下に表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/taxonomy-search.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input, Tag } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// category → parent; "catalog" is the root
const CATEGORIES: [string, string | null][] = [
  ["catalog", null],
  ["electronics", "catalog"],
  ["home", "catalog"],
  ["fashion", "catalog"],
  ["sports", "catalog"],
  ["computers", "electronics"],
  ["phones", "electronics"],
  ["audio", "electronics"],
  ["laptops", "computers"],
  ["desktops", "computers"],
  ["tablets", "computers"],
  ["smartphones", "phones"],
  ["phoneCases", "phones"],
  ["chargers", "phones"],
  ["headphones", "audio"],
  ["speakers", "audio"],
  ["kitchen", "home"],
  ["furniture", "home"],
  ["garden", "home"],
  ["cookware", "kitchen"],
  ["coffeeMachines", "kitchen"],
  ["knives", "kitchen"],
  ["sofas", "furniture"],
  ["desks", "furniture"],
  ["officeChairs", "furniture"],
  ["gardenTools", "garden"],
  ["plants", "garden"],
  ["clothing", "fashion"],
  ["shoes", "fashion"],
  ["accessories", "fashion"],
  ["jackets", "clothing"],
  ["dresses", "clothing"],
  ["sneakers", "shoes"],
  ["boots", "shoes"],
  ["bags", "accessories"],
  ["watches", "accessories"],
  ["outdoor", "sports"],
  ["fitness", "sports"],
  ["cycling", "sports"],
  ["tents", "outdoor"],
  ["hikingBoots", "outdoor"],
  ["yogaMats", "fitness"],
  ["dumbbells", "fitness"],
  ["bikes", "cycling"],
  ["helmets", "cycling"],
];

const PARENT = new Map(CATEGORIES);
const DEPARTMENTS = CATEGORIES.filter(([, parent]) => parent === "catalog").map(
  ([id]) => id,
);
const HAS_CHILDREN = new Set(CATEGORIES.map(([, parent]) => parent));

/** The category and its ancestors, from the root down */
const pathTo = (id: string) => {
  const path: string[] = [];
  for (let at: string | null | undefined = id; at; at = PARENT.get(at)) {
    path.unshift(at);
  }
  return path;
};
const departmentOf = (id: string) => pathTo(id)[1] ?? "catalog";

export default function TaxonomySearchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const nodes = useMemo(
    (): GraphNode[] =>
      CATEGORIES.map(([id]) => ({
        id,
        label: t(`taxonomy.${id}`),
        group: departmentOf(id),
        // second-level categories start collapsed
        collapsed: HAS_CHILDREN.has(id) && pathTo(id).length === 3,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      CATEGORIES.filter(([, parent]) => parent).map(([id, parent]) => ({
        source: parent!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => [
      { id: "catalog", name: t("taxonomy.catalog") },
      ...DEPARTMENTS.map((id) => ({ id, name: t(`taxonomy.${id}`) })),
    ],
    [t],
  );

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(i18n.language);
    if (!needle) return [];
    return nodes.filter((node) =>
      String(node.label).toLocaleLowerCase(i18n.language).includes(needle),
    );
  }, [nodes, query, i18n.language]);
  const selected = useMemo(() => matches.map((node) => node.id), [matches]);

  const reveal = (id: string) => {
    setActive(id);
    // focusNode expands the collapsed ancestors before centering the node
    ref.current?.focusNode(id, { zoom: 1.2 });
  };
  const breadcrumb = (id: string) =>
    pathTo(id)
      .map((at) => t(`taxonomy.${at}`))
      .join(t("breadcrumbSeparator"));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Input
        value={query}
        clearable
        aria-label={t("taxonomySearch")}
        placeholder={t("taxonomySearch")}
        onClear={() => {
          setQuery("");
          setActive(null);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && matches[0]) reveal(matches[0].id);
        }}
      />
      {matches.length > 0 && (
        <HStack gap={6} wrap>
          {matches.map((node) => (
            <Tag
              key={node.id}
              size="small"
              clickable
              pressed={node.id === active}
              onClick={() => reveal(node.id)}
            >
              {node.label}
            </Tag>
          ))}
        </HStack>
      )}
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="LR"
        nodeSize={10}
        highlight="lineage"
        selected={selected}
        interaction={{ select: false }}
        height={460}
        ariaLabel={t("taxonomyAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setActive(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {active
          ? breadcrumb(active)
          : query.trim()
            ? t("taxonomyMatches", { total: matches.length })
            : t("taxonomyHint")}
      </output>
    </div>
  );
}

```

## Example: 作業分解構成図

モバイルアプリのリリース計画です。作業パッケージはストーリーポイントと状態を持ち、集約項目はサブタイトルでポイントと進捗を積み上げます。詳細レベルは ref の expand() と collapse() を呼び出し、onToggle が折りたたみ・展開した項目のポイントを報告します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/demos/wbs.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "done" | "doing" | "todo";

// work item, parent, story points and status of the work packages
const ITEMS: [string, string | null, number?, Status?][] = [
  ["release", null],
  ["onboarding", "release"],
  ["signup", "onboarding"],
  ["emailVerify", "signup", 3, "done"],
  ["socialLogin", "signup", 5, "doing"],
  ["tour", "onboarding"],
  ["tourScreens", "tour", 3, "done"],
  ["tourSkip", "tour", 1, "done"],
  ["payments", "release"],
  ["checkout", "payments"],
  ["cardForm", "checkout", 5, "doing"],
  ["applePay", "checkout", 8, "todo"],
  ["billing", "payments"],
  ["invoices", "billing", 3, "todo"],
  ["refunds", "billing", 5, "todo"],
  ["platform", "release"],
  ["offline", "platform"],
  ["syncQueue", "offline", 8, "doing"],
  ["conflicts", "offline", 5, "todo"],
  ["quality", "platform"],
  ["crashReports", "quality", 2, "done"],
  ["perfBudget", "quality", 3, "todo"],
];

const STATUSES: Status[] = ["done", "doing", "todo"];
const LEVELS = ["deliverables", "features", "packages"];
const COLORS: Record<Status, string> = {
  done: "var(--success-color, #16a34a)",
  doing: "var(--primary-color, #4f46e5)",
  todo: "var(--text-secondary-color, #9ca3af)",
};

const PARENT = new Map(ITEMS.map(([id, parent]) => [id, parent]));

const depthOf = (id: string): number => {
  const parent = PARENT.get(id);
  return parent ? depthOf(parent) + 1 : 0;
};

/** Total and done story points of every item, rolled up from the packages */
const ROLLUP = (() => {
  const points = new Map<string, { total: number; done: number }>(
    ITEMS.map(([id]) => [id, { total: 0, done: 0 }]),
  );
  for (const [id, , value, status] of ITEMS) {
    if (!value) continue;
    for (let at = id as string | null | undefined; at; at = PARENT.get(at)) {
      const sum = points.get(at)!;
      sum.total += value;
      if (status === "done") sum.done += value;
    }
  }
  return points;
})();
const PARENTS = new Set(ITEMS.map(([, parent]) => parent));

export default function WbsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const [depth, setDepth] = useState("1");
  const [status, setStatus] = useState("");
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): GraphNode[] =>
      ITEMS.map(([id, , points, state]) => {
        const sum = ROLLUP.get(id)!;
        return {
          id,
          label: t(`wbsItems.${id}`),
          subtitle: points
            ? t("wbsPoints", { points })
            : t("wbsRollup", {
                points: sum.total,
                done: percent.format(sum.done / sum.total),
              }),
          group: state ?? "summary",
          // the plan opens on its three deliverables
          collapsed: PARENTS.has(id) && depthOf(id) === 1,
        };
      }),
    [t, percent],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      ITEMS.filter(([, parent]) => parent).map(([id, parent]) => ({
        source: parent!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => [
      { id: "summary", name: t("wbsStatuses.summary") },
      ...STATUSES.map((id) => ({
        id,
        name: t(`wbsStatuses.${id}`),
        color: COLORS[id],
      })),
    ],
    [t],
  );

  const showDepth = (value: string) => {
    setDepth(value);
    const level = Number(value);
    ref.current?.expand();
    for (const [id] of ITEMS) {
      if (PARENTS.has(id) && depthOf(id) === level) ref.current?.collapse(id);
    }
    setStatus(
      t("wbsDepthStatus", { level: t(`wbsLevels.${LEVELS[level - 1]}`) }),
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("wbsDepth")}
        direction="horizontal"
        value={depth}
        onChange={(value) => showDepth(String(value))}
      >
        {LEVELS.map((id, i) => (
          <Radio key={id} value={String(i + 1)} label={t(`wbsLevels.${id}`)} />
        ))}
      </RadioGroup>
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        height={480}
        ariaLabel={t("wbsAria")}
        onToggle={(event) => {
          const sum = ROLLUP.get(event.id)!;
          setStatus(
            t(event.collapsed ? "wbsCollapsed" : "wbsExpanded", {
              name: t(`wbsItems.${event.id}`),
              points: sum.total,
              remaining: sum.total - sum.done,
            }),
          );
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {status ||
          t("wbsSummary", {
            points: ROLLUP.get("release")!.total,
            done: percent.format(
              ROLLUP.get("release")!.done / ROLLUP.get("release")!.total,
            ),
          })}
      </output>
    </div>
  );
}

```
