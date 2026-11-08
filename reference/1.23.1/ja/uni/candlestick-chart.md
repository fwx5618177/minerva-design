# ローソク足チャート

期間ごとの始値・高値・安値・終値を表すローソク足チャート。株式や暗号資産など、あらゆる OHLC データに使えます。陽線と陰線は別々の色で描かれ、移動平均などの折れ線系列を重ねられます。長い履歴でも GPU によりズームやパンがなめらかです。

Package: minerva-design@1.23.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "CandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
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
