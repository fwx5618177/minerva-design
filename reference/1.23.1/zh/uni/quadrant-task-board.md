# QuadrantTaskBoard 四象限任务看板

基于四象限矩阵（如艾森豪威尔矩阵）的任务看板：点击象限标题上的 +（或象限的空白区域）添加任务，活动任务上的紧凑编辑和删除按钮（React 中位于任务卡片内、名称旁边）可编辑或删除任务，在 + 按钮或任务旁直接弹出的面板用于填写任务名称并选择象限，删除前会就地确认；任务可通过拖放或 Shift + 方向键移动（双击即可编辑）。看板是受控的：通过 points 传入任务，并把 onPointsChange 收到的新列表回传。它还接受 QuadrantChart 的其他属性（坐标轴、象限标题、徽标和颜色、刻度、标签……），内置按钮和面板会跟随应用语言。由 minerva-design 导出，而非 minerva-design/charts。

Package: minerva-design@1.23.1

Renderer: uni

Locale: zh

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

修复登录故障

季度规划

预订差旅

清空收件箱

立即做

计划做

委派

删除

重要

不重要

紧急

不紧急

任务矩阵：在象限之间拖动任务

深色模式

单点登录

CSV 导出

重写计费系统

速赢

重点投入

有空再做

无底洞

投入

影响

按投入和影响排列的路线图

添加功能

编辑功能

移除功能

功能名称

将从路线图中移除“{name}”。

功能：{{features}} · 修改：{{changes}} 次

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
