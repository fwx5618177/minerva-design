# QuadrantTaskBoard 四象限タスクボード

アイゼンハワー・マトリクスのような四象限マトリクス上のタスクボードです。象限ヘッダーの +（または象限の空白部分）でタスクを追加し、アクティブなタスクのコンパクトな編集・削除ボタン（React ではカード内の名前の横）で編集・削除します。+ ボタンやタスクのすぐ横に開くパネルでタスク名と象限を指定し、削除の前にはその場で確認が入ります。タスクはドラッグ＆ドロップまたは Shift + 矢印キーで移動でき、ダブルクリックで編集できます。ボードは制御コンポーネントです。タスクを points に渡し、onPointsChange で受け取った新しいリストを戻してください。QuadrantChart のその他の props（軸、象限のタイトル・バッジ・色、目盛り、ラベル…）も使え、組み込みのボタンとパネルはアプリの言語に従います。minerva-design/charts ではなく minerva-design からエクスポートされます。

Package: minerva-design@1.21.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Controlled task board on top of the uni QuadrantChart (points in; update:points for v-model:points and pointsChange out; every other QuadrantChart prop is forwarded, the chart labels excepted; hover, pointClick and zoom are re-emitted and the chart handle is exposed): a row of quadrant headers under the chart (badge, quadrant title, count unless showCounts is false, plus-icon add button), an actions toolbar for the selected task (task name, Edit and Delete text buttons; selection is internal or the controlled selectedIndex), an inline panel opened under the headers or the actions toolbar (a caret points at its opener) with a required name Input (the keyboard confirm key saves) and a 2 x 2 quadrant radio grid with Cancel / Save (Save disabled until the name is not blank), an inline danger confirmation before a delete, tapping an empty quadrant area to add a task there, drag and drop of the dots and the chart's accessible move-to actions. Add/edit/move/delete/selection logic and the localized texts (labels overrides) come from the shared minerva-design/charts quadrant task helpers. No keyboard moves (Shift + arrow keys) or double-tap to edit: mini-program views take no focus and the chart has no double tap; use the Edit button and the move-to actions. The actions toolbar sits under the chart instead of floating on the selected dot, and the quadrant headers are a row under the chart instead of over the quadrants. The add buttons draw the plus icon as an SVG data URI image; Edit and Delete are text buttons. Screen readers get aria-role / aria-label where the host supports them; device behavior still requires validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "QuadrantTaskBoard"
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
    "name": "draggable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showTicks",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "reverseX",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showLabels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showCounts",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "selectedIndex",
    "typeText": "number | null | undefined",
    "required": false
  },
  {
    "name": "accessiblePoints",
    "typeText": "boolean | undefined",
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
    "typeText": "Partial<QuadrantTaskLabels> | undefined",
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
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "points",
    "typeText": "readonly QuadrantPoint[]",
    "required": true
  },
  {
    "name": "xDomain",
    "typeText": "[number, number] | undefined",
    "required": false
  },
  {
    "name": "yDomain",
    "typeText": "[number, number] | undefined",
    "required": false
  },
  {
    "name": "xSplit",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "ySplit",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "quadrants",
    "typeText": "QuadrantRegions | undefined",
    "required": false
  },
  {
    "name": "xLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "yLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "axisLabels",
    "typeText": "QuadrantAxisLabels | undefined",
    "required": false
  },
  {
    "name": "pointSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "selectedIndices",
    "typeText": "readonly number[] | undefined",
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
    "name": "update:points",
    "typeText": "[points: QuadrantPoint[]]",
    "parameters": [
      {
        "name": "points",
        "position": 0,
        "typeText": "QuadrantPoint[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointsChange",
    "typeText": "[points: QuadrantPoint[]]",
    "parameters": [
      {
        "name": "points",
        "position": 0,
        "typeText": "QuadrantPoint[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[point: QuadrantPoint, index: number]",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "typeText": "QuadrantPoint",
        "required": true,
        "rest": false
      },
      {
        "name": "index",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### bindings

```json
[
  {
    "prop": "points",
    "event": "update:points",
    "syntax": "v-model:points"
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
