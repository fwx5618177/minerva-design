# ツリーマップ

値に比例した面積の入れ子の長方形で階層データを表し、どこが最も大きいかをひと目で示します（ディスク使用量、予算、ポートフォリオ）。ホバーまたは矢印キーでセルをハイライトすると、ツールチップにそのパスが表示されます。

Package: minerva-design@1.19.3

Renderer: uni

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

メディア

ビデオ

写真

ミュージック

アプリケーション

プロジェクト

システム

ライブラリ

キャッシュ

ログ

ダウンロード

インストーラー

アーカイブ

フォルダー別のディスク使用量

{{path}}：{{size}}（ディスクの {{share}}）

セルをクリックすると場所を表示します

エンジニアリング

営業

マーケティング

カスタマーサクセス

オペレーション

経理

人事

法務

部門別の年間予算

テクノロジー

金融

ヘルスケア

エネルギー

消費財

時価総額：{{value}}

セクター別・当日の騰落率で色分けした株式マーケットマップ

バンドルの {{share}}

モジュール別の JavaScript バンドルサイズ

合計 {{size}}。100 KB を超える依存関係：{{modules}}。

家電

ホーム

ファッション

スポーツ

スマートフォン

ノート PC

オーディオ

キッチン

家具

インテリア雑貨

レディース

メンズ

キッズ

アウトドア

フィットネス

カタログのパス

すべてのカテゴリ

カテゴリ・サブカテゴリ・ブランド別の四半期売上

サブカテゴリ・ブランド別の{{category}}の売上

{{path}}：{{revenue}}（カテゴリの {{share}}）。

カテゴリをクリックすると開きます。

ブランドをクリックすると売上を表示します。

コンピューティング

データベース

ストレージ

ネットワーク

オブザーバビリティ

請求の {{share}}

サービス・リソース別の月間クラウドコスト

表示中：{{visible}}（請求額 {{total}} の {{share}}）。

月間請求額：{{total}}。

すべて表示

ライブ更新

{{used}} / {{limit}}（{{share}}）

名前空間別のクラスタ Pod のメモリ使用量

メモリ上限の {{threshold}} を超えた Pod：{{pods}}

すべての Pod がメモリ上限の {{threshold}} 未満です。

ヨーロッパ

南北アメリカ

アジア太平洋

指標

売上

注文数

利益

合計の {{share}}（{{metric}}）

地域・国別の年間販売：{{metric}}

## TreemapChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TreemapChart"
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
    "name": "headers",
    "typeText": "boolean | undefined",
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
    "name": "gap",
    "typeText": "number | undefined",
    "required": false
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
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
