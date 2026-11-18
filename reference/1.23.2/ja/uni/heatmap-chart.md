# ヒートマップ

値に応じて色分けしたセルのグリッド。両軸ともカテゴリまたは数値を使えます。曜日×時間帯のアクティビティ、相関行列、指標の分布マップなどに。セルにホバーするとセルが浮き上がり、行と列が強調され、カラー凡例に値が示されます。

Package: minerva-design@1.23.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

セッション

曜日と時間帯別のセッション数

偏差

1995〜2024 年の月別気温偏差

信号強度

200 × 100 m のフロアの Wi-Fi 信号強度

{{cells}} セル · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

コントリビューション

1 年間の日別コントリビューション数

過去 1 年間で {{total}} 件のコントリビューション

セッション

ページビュー

登録数

売上

解約

サポートチケット

相関係数

6 つの製品指標の相関行列

{{n}} か月目

継続率

月別登録コホートの継続率

デスクトップ

モバイル

タブレット

自然検索

有料検索

ソーシャル

メール

参照元サイト

直接

{{source}} × {{device}}: {{sessions}} セッションから {{orders}} 件の注文、{{rate}}:

平均 {{value}} を上回る

平均 {{value}} を下回る

セルをクリックすると、セッション数と注文数を表示します。

コンバージョン率

流入元とデバイス別のコンバージョン率

ラック {{n}}

センサー {{n}}

一時停止

再開

最高温: {{rack}} の {{sensor}}、{{value}} · {{limit}} 超えのセンサー {{alarms}} 個

吸気温度

10 台のサーバーラックのセンサーのライブ吸気温度

猫

犬

鳥

乗用車

トラック

実際: {{actual}}、予測: {{predicted}}

{{value}} 枚（クラスの {{share}}）

再現率: {{value}}

適合率: {{value}}

誤分類

正解率: テスト画像 {{images}} 枚中 {{value}}

クラス内の割合

予測クラス

実際のクラス

5 クラスの画像分類器の混同行列

北部

南部

東部

西部

中部

第 {{n}} 四半期

指標

売上

2025 年比の成長率

粗利益率

{{region}}・{{quarter}}

最高: {{best}}（{{bestValue}}）· 最低: {{worst}}（{{worstValue}}）

地域と四半期別の 2026 年の販売指標

## HeatmapChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HeatmapChart"
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
    "name": "name",
    "typeText": "string | undefined",
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
    "name": "radius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly HeatmapCell[]",
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
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "colorScale",
    "typeText": "readonly string[] | ChartColorScheme | undefined",
    "required": false
  },
  {
    "name": "valueRange",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "colorMidpoint",
    "typeText": "number | undefined",
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
