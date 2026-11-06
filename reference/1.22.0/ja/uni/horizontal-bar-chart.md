# 横棒グラフ

カテゴリを左側に並べ、左から伸びる横棒：ランキング、長い名前、発散型アンケート、進捗に最適です。

Package: minerva-design@1.22.0

Renderer: uni

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

開発者

各プログラミング言語を使う開発者の割合

ここでのキャリアパスが見える

仕事量は適切だ

必要なツールがそろっている

上司が支えてくれる

給与は公正だ

強く反対

反対

賛成

強く賛成

従業員アンケートの回答（左が反対、右が賛成）

完了

レビュー中

未着手

プラットフォーム

決済

モバイル

グロース

デザイン

各チームのマイルストーン課題の状態

票数

すべてのページとメールでダークモード

モバイル端末でのオフラインモード

グラフ付きレポートの PDF 出力

SAML と OIDC によるシングルサインオン

カレンダーの双方向同期

複数レコードの一括編集

すべてのオブジェクトにカスタム項目

要望の多い機能の票数

予算

実績

開発

マーケティング

営業

サポート

経理

部門ごとの予算と実績

増減

北米

ヨーロッパ

アジア太平洋

中南米

中東

アフリカ

地域ごとの月間アクティブユーザーの増減

ユーザー

メッセージ

写真

マップ

ミュージック

メモ

アプリごとの月間アクティブユーザー

{{app}}：{{users}} 百万ユーザー

棒をタップしてください

売上

販売数

ワイヤレスヘッドホン

スマートウォッチ

Bluetooth スピーカー

メカニカルキーボード

急速充電器

HD ウェブカメラ

ワイヤレスマウス

タブレット

USB-C ケーブル

ノートパソコンスタンド

ランキング基準

表示件数

上位 {{n}} 件

すべての商品

先月の売れ筋商品（多い順）

この {{n}} 商品で全体の {{share}} を占めます。

{{value}} GW

太陽光発電容量

再生

一時停止

もう一度再生

最初に戻る

{{year}} 年末時点で太陽光発電の設備容量が多い国

給与レンジ

ジュニア

ミドル

シニア

スタッフ

プリンシパル

ディレクター

オファー

最低額

中央値

最高額

オファー / 中央値

オファー −{{step}}

オファー +{{step}}

{{offer}} のオファーは {{levels}} のレンジに収まります。

{{offer}} のオファーはどのレンジにも収まりません。

各職位の年間給与レンジ。オファー額を縦線で表示

残りエラーバジェット

リリース凍結

過去 30 日間の各サービスの残りエラーバジェット（悪い順）

SLO {{slo}}、実測の可用性 {{availability}}

許容される {{allowed}} のうち、残りのダウンタイムは {{minutes}} です。

バジェットを {{minutes}} 超過しています。

サービスをクリックするとバジェットを表示します。

## HorizontalBarChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HorizontalBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "stacked",
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
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "percent",
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
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
