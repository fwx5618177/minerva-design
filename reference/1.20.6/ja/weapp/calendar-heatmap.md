# カレンダーヒートマップ

日ごとの値をカレンダー上に表示します。コントリビューショングラフのように、コミット、学習の継続、運動、注文などに使えます。各日はレベルで色分けされたセルで、月名・曜日名、ツールチップの日付、週の始まりはロケールに従います。凡例でレベルの表示を切り替えられ、矢印キーで日単位・週単位に移動でき、ツールチップに日付が表示されます。

Package: minerva-design@1.20.6

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

過去 1 年間のコミット数：{{total}}

過去 1 年間の日ごとのコミット数

{{date}}：{{value}} コミット

日をクリック（またはチャートにフォーカスし、矢印キーで移動して Enter）すると選択できます

{{value}} 分

現在の連続記録：{{current}} 日 · 最長記録：{{longest}} 日

2026 年の日ごとの語学学習時間（分）

{{date}}：{{value}} 学習

{{date}}：学習なし

日をクリックすると学習時間を表示します

{{value}} km

2024〜2026 年の日ごとのランニング距離

{{year}} 年：{{value}}

週の始まり

ロケールに従う

2026 年の日ごとのオンライン注文数（月別）

ロケール

2026 年上半期の日ごとのデプロイ回数

{{value}} kWh

使用量の多い日のみ

すべて表示

2025 年の毎日の電力使用量

{{days}} 日を表示、合計 {{value}}（年間の {{share}}）

記録なし

目標 {{goal}} に対して {{value}}

1 晩平均 {{average}} · {{nights}} 晩中 {{reached}} 晩で目標 {{goal}} を達成

2026 年 5 月から 10 月までの毎晩の睡眠時間

年

{{year}} 年: 障害 {{total}} 件、障害のない日 {{quiet}} 日

{{value}} 件の障害

{{year}} 年の 1 日あたりの本番障害

{{date}}: 障害 {{value}} 件

{{date}}: 障害なし

{{date}}: これから

日にホバーすると障害件数を表示します

運動 {{done}} 回（日数の {{share}}）· 現在の連続記録: {{streak}} 日

リセット

実施

未実施

2026 年 8 月から 10 月までの毎日の運動記録

{{date}} を実施済みにしました

{{date}} を未実施にしました

日をクリック（またはその日で Enter キー）して運動を記録・取り消しします

## CalendarHeatmap

Support: beta

Calendar heatmap: daily values in weeks or months layouts, color levels / thresholds, month and weekday labels, locale. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/calendar-heatmap/index",
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
    "name": "range",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "layout",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "weekStart",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "colors",
    "typeText": "array",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "thresholds",
    "typeText": "array",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "radius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxCellSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "monthLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "weekdayLabels",
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
