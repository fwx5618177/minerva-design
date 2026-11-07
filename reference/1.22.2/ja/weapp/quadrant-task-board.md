# QuadrantTaskBoard 四象限タスクボード

アイゼンハワー・マトリクスのような四象限マトリクス上のタスクボードです。象限ヘッダーの +（または象限の空白部分）でタスクを追加し、アクティブなタスクのコンパクトな編集・削除ボタン（React ではカード内の名前の横）で編集・削除します。+ ボタンやタスクのすぐ横に開くパネルでタスク名と象限を指定し、削除の前にはその場で確認が入ります。タスクはドラッグ＆ドロップまたは Shift + 矢印キーで移動でき、ダブルクリックで編集できます。ボードは制御コンポーネントです。タスクを points に渡し、onPointsChange で受け取った新しいリストを戻してください。QuadrantChart のその他の props（軸、象限のタイトル・バッジ・色、目盛り、ラベル…）も使え、組み込みのボタンとパネルはアプリの言語に従います。minerva-design/charts ではなく minerva-design からエクスポートされます。

Package: minerva-design@1.22.2

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

ログイン障害の修正

四半期計画

出張の予約

受信トレイの整理

すぐやる

計画する

任せる

やめる

重要

重要でない

緊急

緊急でない

タスクマトリクス：象限の間でタスクをドラッグ

ダークモード

シングルサインオン

CSV エクスポート

課金システムの再構築

クイックウィン

大きな賭け

すき間作業

金食い虫

工数

効果

工数と効果で並べたロードマップ

機能を追加

機能を編集

機能を削除

機能名

「{name}」をロードマップから削除します。

機能：{{features}} · 変更：{{changes}} 回

## QuadrantTaskBoard

Support: beta

quadrant-task-board: controlled task board composing the native quadrant-chart, button and icon-button components (usingComponents in its JSON). points in, pointschange { points } out; every quadrant-chart property is forwarded except the chart's own labels (labels are the board texts, partial overrides of the localized defaults). A 2 x 2 grid of quadrant headers above the chart (badge, title, count unless showCounts is false, plus-icon add button), a toolbar for the selected task (name, Edit and Delete buttons; selection is internal or the controlled selectedIndex), an inline panel opened under the headers or the actions toolbar (a caret points at its opener) with a name input (the keyboard confirm key saves) and a 2 x 2 quadrant radio grid with Cancel / Save (Save disabled while the name is blank), an inline danger confirmation before a delete, tapping an empty quadrant area adds a task there, and draggable dots (default true) or the chart's accessible Move to buttons move a task. Add/edit/move/delete/selection logic and texts come from the shared minerva-design/charts quadrant task helpers. Chart methods (configure, resize, resetZoom, getView, setView, getPlotRect, toPixel, fromPixel) are forwarded to the inner chart; pointclick, pointdrag, hover, zoom and layout are re-emitted. Beta: needs device validation. The canvas has no view overlays: the quadrant headers are a grid above the chart (the chart still draws its own quadrant titles) and the actions toolbar sits under the chart instead of floating on the selected dot. No double-tap to edit and no keyboard moves (Shift + arrow keys): mini-program views take no focus; use the Edit button and the Move to actions. The add buttons draw the plus icon as an SVG data URI image; Edit and Delete keep text glyphs (✎, ✕). Layout styles are inline (no dedicated stylesheet yet). The inner components are in the board's shadow tree: the config-provider / theme-provider relation across that boundary (theme tokens and messages of the inline panel) needs device validation; the board's locale is forwarded to the chart explicitly. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/quadrant-task-board/index",
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
    "name": "disableScroll",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "points",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xDomain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yDomain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "xSplit",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ySplit",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "quadrants",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "xLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "yLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "axisLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "showTicks",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "reverseX",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showLabels",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "pointSize",
    "typeText": "number",
    "required": false,
    "default": 12
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "draggable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "showCounts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "selectedIndex",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "selectedIndices",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "accessiblePoints",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "labels",
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
    "name": "pointschange",
    "typeText": "{ points: NativeQuadrantPoint[] }",
    "description": "Tasks after an add, an edit, a delete or a move (controlled: update points)."
  },
  {
    "name": "pointclick",
    "typeText": "{ point: NativeQuadrantPoint; index: number }",
    "description": "A task dot was tapped (it becomes the selected task)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ point: NativeQuadrantPoint; index: number; target: NativeQuadrantDropTarget }",
    "description": "A task dot is dragged (draggable)."
  },
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
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
  }
]
```

## CSS variables

```json
{
  "css:QuadrantTaskBoard": {
    "kind": "cssVars",
    "source": "react/src/components/QuadrantTaskBoard",
    "vars": [
      {
        "name": "--quadrant-task-board-header-color",
        "description": "Text color of the quadrant titles (defaults to --text-color)"
      },
      {
        "name": "--quadrant-task-board-header-background",
        "description": "Background of the quadrant headers (defaults to a translucent surface)"
      },
      {
        "name": "--quadrant-task-board-count-background",
        "description": "Background of the task count chips (defaults to --surface-muted-color)"
      },
      {
        "name": "--quadrant-task-board-count-color",
        "description": "Text color of the task count chips (defaults to --text-secondary-color)"
      },
      {
        "name": "--quadrant-task-board-actions-background",
        "description": "Background of the toolbar of the active task (defaults to --surface-elevated-color)"
      },
      {
        "name": "--quadrant-task-board-actions-radius",
        "description": "Corner radius of the toolbar of the active task (defaults to --radius-md)"
      },
      {
        "name": "--quadrant-task-board-panel-background",
        "description": "Background of the inline add / edit / delete panel (defaults to a translucent elevated surface)"
      },
      {
        "name": "--quadrant-task-board-panel-border",
        "description": "Border color of the inline panel (defaults to a translucent --border-color)"
      },
      {
        "name": "--quadrant-task-board-panel-radius",
        "description": "Corner radius of the inline panel (defaults to --radius-lg)"
      },
      {
        "name": "--quadrant-task-board-panel-width",
        "description": "Width of the inline panel (defaults to 288px)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
