# ゲージ

1 つの値を範囲とともに円弧上に表示し、色付きのしきい値も設定できます：KPI、使用率、スコアなど。value を変えると、円弧（と針）が現在の位置からアニメーションします。

Package: minerva-design@1.20.5

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Gauge: value arc on a track, min / max, sweep, thickness, colored bands, needle, end / band ticks; animates to new values. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/gauge-chart/index",
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
    "name": "value",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "min",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "max",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "sweep",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "thickness",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "bands",
    "typeText": "array",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "needle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ticks",
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
