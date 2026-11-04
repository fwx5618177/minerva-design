# 円グラフ / ドーナツグラフ

全体に対する各部分の割合を示します：円グラフ、ドーナツグラフ（中央に合計を表示可能）、ナイチンゲールのローズチャート。正確な比較よりも構成比が重要な、少数（目安として 8 個まで）のカテゴリに適しています。ホバーまたは矢印キーでスライスをハイライトし、Esc で解除します。凡例の項目をクリックするとスライスを非表示にできます。

Package: minerva-design@1.20.4

Renderer: weapp

Locale: ja

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

自然検索

ダイレクト

ソーシャル

有料広告

参照元サイト

メール

{{sessions}} セッション · {{share}}

過去 30 日間の流入元別ウェブサイトセッション

{{source}}：{{sessions}} セッション（トラフィックの {{share}}）

スライスをクリック（またはチャートにフォーカスして Enter）して流入元を選択してください

エンタープライズ

ビジネス

プロ

スターター

月間売上

プラン別の月間経常収益

メール

ライブチャット

Web フォーム

電話

SNS

コミュニティ

ラベルの位置

外側

内側

なし

ラベルの内容

名前

値

割合

{{tickets}} 件 · {{share}}

チャネル別のサポートチケット

月平均降水量

その他

出荷台数

{{units}} 台 · {{share}}

ベンダー別のスマートフォン市場シェア

住居

食費

交通

娯楽

家賃

光熱費

保険

食料品

外食

公共交通

自動車

旅行

サブスクリプション

スポーツ

項目別の月間予算

カテゴリ別の月間予算

{{name}}：{{amount}}（{{share}}）

リングにホバーしてカテゴリや項目を表示します

アジア太平洋

ヨーロッパ

北米

中南米

モバイル

デスクトップ

タブレット

{{region}}のデバイス別セッション

米国株式

外国株式

債券

不動産

コモディティ

現金

表示する資産クラス

すべて表示

選択中

評価額合計

ポートフォリオの {{share}}

資産クラス別の投資ポートフォリオ

{{total}} 資産クラス中 {{shown}} を表示：{{value}}（ポートフォリオの {{share}}）。

ダークモード

オフラインモード

公開 API

連携の追加

カスタムレポート

次に開発すべき機能はどれですか？

票

{{votes}} 票 · {{share}}

回答別のライブ投票結果

一時停止

再開

リセット

首位：{{answer}}

コンピューティング

データベース

ストレージ

ネットワーク

仮想マシン

Kubernetes

サーバーレス関数

SQL データベース

NoSQL データベース

インメモリキャッシュ

オブジェクトストレージ

ブロックストレージ

バックアップ

データ転送

CDN

ロードバランサー

クラウド請求

すべてのカテゴリ

クリックしてサービスを表示

サービス別の{{category}}費用

カテゴリ別の月間クラウド請求

{{service}}：{{amount}}（{{category}}の {{share}}）。

{{category}}：{{amount}}（請求の {{share}}）。サービスをクリックすると割合を表示します。

月間請求額：{{total}}。カテゴリをクリックするとサービスを表示します。

とても不満

不満

どちらでもない

満足

とても満足

第{{n}}四半期

四半期

CSAT

{{answers}} 件の回答 · {{share}}

{{quarter}}の顧客満足度の回答

CSAT {{csat}}（回答者 {{respondents}} 人）。

CSAT {{csat}}、{{previous}}から {{delta}} ポイント（回答者 {{respondents}} 人）。

## DonutChart

Support: beta

PieChart with a hole (innerRadius 0.62) and centerValue / centerLabel. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/donut-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "cornerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rose",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## PieChart

Support: beta

Pie / rose chart on a <canvas type="2d"> (DOM-free shape engine): slices with gaps and corners, outside / inside labels, legend with tap-to-toggle (hidden for controlled visibility), canvas tooltip, tap highlight with pop-out, entry and update animations, Minerva theme tokens from the nearest provider. Properties are serialized by setData (JSON data only); function options (format, percentFormat, tooltip text) use configure(). Tooltips are canvas text (no renderTooltip node); no keyboard navigation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/pie-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "cornerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rose",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
