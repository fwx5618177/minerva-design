# カレンダーヒートマップ

日ごとの値をカレンダー上に表示します。コントリビューショングラフのように、コミット、学習の継続、運動、注文などに使えます。各日はレベルで色分けされたセルで、月名・曜日名、ツールチップの日付、週の始まりはロケールに従います。凡例でレベルの表示を切り替えられ、矢印キーで日単位・週単位に移動でき、ツールチップに日付が表示されます。

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "CalendarHeatmap"
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
    "name": "weekdayLabels",
    "typeText": "boolean | undefined",
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
    "name": "monthLabels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
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
    "typeText": "readonly CalendarDatum[]",
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
    "name": "layout",
    "typeText": "\"weeks\" | \"months\" | undefined",
    "required": false
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
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
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "weekStart",
    "typeText": "number | undefined",
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
  },
  {
    "name": "thresholds",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "maxCellSize",
    "typeText": "number | undefined",
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
