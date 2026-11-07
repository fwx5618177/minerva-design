# ローソク足チャート

期間ごとの始値・高値・安値・終値を表すローソク足チャート。株式や暗号資産など、あらゆる OHLC データに使えます。陽線と陰線は別々の色で描かれ、移動平均などの折れ線系列を重ねられます。長い履歴でも GPU によりズームやパンがなめらかです。

Package: minerva-design@1.22.0

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

始値

高値

安値

終値

騰落率

ローソク足の色

上昇は緑、下落は赤

上昇は赤、下落は緑

ACME の 60 営業日の日足

MA{{days}}

NOVA の 120 営業日の日足と 5 日・20 日移動平均

50,000 本の 1 分足

{{candles}} 本 · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

出来高

ORBT の 90 営業日の日足

ORBT の日次出来高

VWAP

業績見通しの下方修正

ORBT の 1 セッションの 5 分足と VWAP

日足のバーチャート

日足のローソク足

日足の中抜きローソク足

バーチャート

ローソク足

中抜きローソク足

始値と終値を横線で

始値から終値までの実体

終値が高いと中抜き

ETH/USDT

8 本の指数移動平均付き ETH/USDT 4 時間足チャート

出来高の表示

専用ペイン

価格の下に重ねる

BTC/USDT

ローソク足の色の出来高付き BTC/USDT 1 時間足チャート

CATL 300750

陽線が赤の CATL 日足チャート

決

配

分

予↓

決算

配当

株式分割

業績予想の下方修正

ORBT

決算・配当・株式分割付きの ORBT 日足チャート

一時停止

再開

リアルタイム：毎秒 10 件の約定

一時停止中

ADA/USDT

5 秒

リアルタイムで更新される ADA/USDT 5 秒足

ナスダック 100

ダークテーマのナスダック 100 30 分足（中抜きローソク足）

パターン

すべて

十字線

カラカサ

流れ星

包み足

十

カ

流

包↑

包↓

十字線

カラカサ

流れ星

陽の包み足

陰の包み足

始値と終値がほぼ同じ、迷い

下落後の長い下ヒゲ、買いが入った

上昇後の長い上ヒゲ、売りが入った

陽線の実体が前の陰線を包む

陰線の実体が前の陽線を包む

{{name}}：{{value}}

{{date}} の{{name}}：{{meaning}}。

マークの付いた足にカーソルを合わせるとパターン名を表示します。

ローソク足パターンを示した ORBT の日足チャート

BTC/USD

AAPL

EUR/USD

金 (XAU/USD)

48 時間

30 日

{{name}} のローソク足、期間の騰落率 {{change}}

R1

P

S1

EUR/USD

日次ピボットを示した EUR/USD の1時間足

{{time}} · 値幅 {{range}} pips · 実体 {{body}} pips · 変化 {{change}} pips · カーソルは現在値から {{distance}} pips

金曜日のピボット：P {{pivot}}、R1 {{r1}}、S1 {{s1}}。足にカーソルを合わせると pips で測ります。

## CandlestickChart

Support: beta

Chart whose untyped series are OHLC candles (`open`, `high`, `low`, `y`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/candlestick-chart/index",
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
    "default": 320
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
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
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
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "labels",
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
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
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
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
