# サンバースト図

階層を同心円のリングで描きます：リングが階層、扇形が親に対する割合です。親をクリック（または Enter）するとズームインし、中心をクリック（または Backspace）すると 1 つ上に戻ります。切り替え時は角度とリングがアニメーションします。扇形にホバーすると祖先と子孫が強調され、ラベルは円弧方向か半径方向のうち収まる方で描かれます。

Package: minerva-design@1.20.4

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Macintosh HD

アプリケーション

書類

プロジェクト

アーカイブ

PDF

スプレッドシート

写真

開発

パッケージキャッシュ

シミュレータ

システム

ミュージック

その他のアプリ

{{value}} GB

フォルダ別のディスク使用量（GB）

{{path}} を表示中。中心をクリックすると戻ります。

フォルダをクリックするとズームインします。

エンジニアリング

プラットフォーム

インフラ

セキュリティ

開発者ツール

プロダクト開発

Web

モバイル

決済

データ

分析

機械学習

営業

EMEA

米州

アジア太平洋

カスタマーサクセス

サポート

オンボーディング

マーケティング

ブランド

グロース

コンテンツ

管理

経理

人事

法務

情報システム

{{value}} 人

部門・グループ・チームごとの人数

すべての商品

家電・デジタル

スマートフォン

ハイエンド

ミドルレンジ

アクセサリ

ノートパソコン

オーディオ

ヘッドホン

スピーカー

ホーム

キッチン

家具

インテリア小物

ファッション

メンズ

レディース

キッズ

スポーツ

アウトドア

フィットネス

カテゴリのパス

商品カテゴリ別の四半期売上

アジア

アフリカ

ヨーロッパ

南北アメリカ

オセアニア

その他の国

{{value}} 百万人

ラベルの方式

自動

円弧方向

半径方向

なし

大陸・国別の世界人口（百万人）

教育

保健医療

交通

治安・防災

環境

行政

学校

大学

図書館

病院

予防

公共交通

道路

自転車道

警察

消防

公園

ごみ収集

水道

{{path}}：{{amount}}（予算の {{share}}、{{area}}の {{areaShare}}）。

{{path}}：{{amount}}（予算の {{share}}）。

政策分野・事業別の市の年間予算

年間予算：{{total}}。セクターをクリックすると割合を表示します。

ベーカリーチェーン

歯科医院

語学学校

社内

ウェブサイト

ブランディング

予約システム

モバイルアプリ

事務

研修

デザイン

開発

会議

レビュー

サポート

学習

期間

今週

今月

{{hours}} · 記録時間の {{share}}

クライアント・プロジェクト・作業別の記録時間（{{period}}）

請求可能：{{total}} 中 {{billable}}（{{share}}）。

購入手続き

検索

アカウント

カタログ

カート

決済

配送

検索クエリ

候補表示

ログイン

プロフィール

商品ページ

レビュー

{{value}} 件/分

サービス・エンドポイント別の毎分 API リクエスト数（ライブ更新）

一時停止

再開

合計：{{value}}

最も負荷の高いサービス：{{service}}

再生可能エネルギー

原子力

化石燃料

風力

太陽光

水力

バイオマス

天然ガス

石炭

石油

{{value}} TWh

化石燃料を非表示

電源・燃料別の年間発電量

再生可能エネルギーは非表示：{{total}} を表示中。

再生可能エネルギー：表示中の {{total}} の {{share}}。

## SunburstChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events and the sunburst drill event; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SunburstChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "drill",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly TreemapNode[]",
    "required": true
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drill",
    "typeText": "[event: ShapeDrillEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
