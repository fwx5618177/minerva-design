# ゲージ

1 つの値を範囲とともに円弧上に表示し、色付きのしきい値も設定できます：KPI、使用率、スコアなど。value を変えると、円弧（と針）が現在の位置からアニメーションします。

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

CPU

メモリ

ディスク

{{metric}}の使用率

ネットプロモータースコア

リクエスト / 秒

ライブ更新される毎秒リクエスト数

更新を一時停止

更新を再開

速度

スピードメーター：{{speed}}

ブレーキ

アクセル

ストレージ

API 呼び出し

シート

ビルド時間

{{used}} / {{limit}}

{{quota}}：クォータの {{share}} を使用

30 日間の可用性

目標：{{value}}

目標に対する 30 日間の可用性

残りのエラーバジェット

許容 {{budget}} のうち停止 {{used}}

今月の残りのエラーバジェット

温度の単位

°C

°F

目標

室温：{{value}}

サーモスタットの目標温度

目標温度を下げる

目標温度を上げる

{{target}} まで暖房中（室温：{{room}}）

{{target}} まで冷房中（室温：{{room}}）

{{target}} を維持（室温：{{room}}）

申請者

クレジットスコア

低い

やや低い

良好

とても良好

非常に優秀

範囲の {{share}} の位置

{{name}} のクレジットスコア

{{name}}：{{score}}。{{advice}}

ほとんどの金融機関で審査に通りません。

承認の可能性はありますが、金利は高めです。

ほとんどのローンを標準金利で利用できます。

平均より有利な金利を利用できます。

最も有利な金利を利用できます。

充電済み

航続距離：{{range}}

車のバッテリー残量

接続中

リセット

満充電

未接続

急速充電中

80 % 以上は低速充電中

80 % まであと{{minutes}}

{{value}} rpm

{{value}} MW

ダークパネル

ローター回転数

出力

ナセル温度

風力タービンの{{reading}}：{{value}}

## GaugeChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "GaugeChart"
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
    "name": "needle",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ticks",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "number",
    "required": true
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "thickness",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number | undefined",
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
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
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
