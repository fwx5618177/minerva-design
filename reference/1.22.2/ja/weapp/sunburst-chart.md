# サンバースト図

階層を同心円のリングで描きます：リングが階層、扇形が親に対する割合です。親をクリック（または Enter）するとズームインし、中心をクリック（または Backspace）すると 1 つ上に戻ります。切り替え時は角度とリングがアニメーションします。扇形にホバーすると祖先と子孫が強調され、ラベルは円弧方向か半径方向のうち収まる方で描かれます。

Package: minerva-design@1.22.2

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Sunburst: hierarchy as rings, sector labels, tap a parent to drill in and the center to go back (`drill` event, drill() / getDrillPath(), controlled drillPath). Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/sunburst-chart/index",
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
    "name": "levels",
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
    "name": "labels",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "drill",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "drillPath",
    "typeText": "unknown",
    "required": false,
    "default": null
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
