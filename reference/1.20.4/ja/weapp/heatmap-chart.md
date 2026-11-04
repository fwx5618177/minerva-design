# ヒートマップ

値に応じて色分けしたセルのグリッド。両軸ともカテゴリまたは数値を使えます。曜日×時間帯のアクティビティ、相関行列、指標の分布マップなどに。セルにホバーするとセルが浮き上がり、行と列が強調され、カラー凡例に値が示されます。

Package: minerva-design@1.20.4

Renderer: weapp

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

Grid of cells colored by value from `data` cells (categories or numbers on both axes), colorScale / valueRange / radius; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/heatmap-chart/index",
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
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "colorScale",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "valueRange",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "colorMidpoint",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "radius",
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
