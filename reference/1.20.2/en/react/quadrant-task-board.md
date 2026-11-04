# QuadrantTaskBoard

A task board on a four-quadrant matrix, such as an Eisenhower matrix: the + of a quadrant header (or a click on its empty area) adds a task, compact edit and delete buttons on the active task (in its card, beside its name, on React) edit or delete it, a panel opened right at the + button or at the task names it and picks its quadrant, an inline confirmation guards every delete, and tasks move by drag and drop or Shift + arrow keys (a double click edits them). The board is controlled: pass the tasks as points and set back the list received by onPointsChange. It accepts the other props of QuadrantChart (axes, quadrant titles, badges and colors, ticks, labels…) and its buttons and panels follow the language of the app. Exported by minerva-design, not minerva-design/charts.

Package: minerva-design@1.20.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Fix login outage

Quarterly planning

Book travel

Inbox zero

Do first

Schedule

Delegate

Eliminate

Important

Not important

Urgent

Not urgent

Task matrix: drag tasks between quadrants

Dark mode

Single sign-on

CSV export

Rewrite billing

Quick wins

Big bets

Fill-ins

Money pits

Effort

Impact

Roadmap by effort and impact

Add feature

Edit feature

Remove feature

Feature

“{name}” will be removed from the roadmap.

Features: {{features}} · changes: {{changes}}

## QuadrantTaskBoard

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "labels",
    "source": "packages/react/src/components/QuadrantTaskBoard/QuadrantTaskBoard.tsx",
    "kind": "object",
    "typeText": "Partial<QuadrantTaskLabels> | undefined",
    "typeRef": "type:1844230c41d60923064b",
    "required": false,
    "description": "Texts of the buttons and panels (localized by default)"
  },
  {
    "name": "draggable",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Lets the user drag the dots (`drag` / `drop` events)"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "name",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the points in the tooltip"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:9d1e0fd545bd7a9a74de",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the card of the active point, in place of its name and quadrant (the engine tooltip is not shown)"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "quadrantContent",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "Partial<Record<keyof QuadrantRegions, ReactNode>> | undefined",
    "typeRef": "type:771baa9ee9c2890c3c21",
    "required": false,
    "description": "React content placed over each quadrant (e.g. an add button); the content receives pointer events, the rest of the quadrant does not"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Visually hidden list of buttons per quadrant so keyboard and screen reader users can reach the dots: Enter / Space calls `onPointClick`, Shift + arrow keys move the point to the next quadrant (`onPointDrop` with the center of that quadrant); the focused dot gets a focus ring"
  },
  {
    "name": "getPointProps",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => Record<string, string | number | boolean | undefined>) | undefined",
    "typeRef": "type:3a38bf6f689ec1b86b9e",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "Record<string, string | number | boolean | undefined>",
      "typeRef": "type:5ce0408cbbccff4d7b83"
    },
    "required": false,
    "description": "Extra attributes of the invisible anchor placed on each dot (e.g. `data-testid`); every anchor already has `data-point-index` and `data-label` and the class `minerva-chart-quadrant-point`"
  },
  {
    "name": "points",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly QuadrantPoint[]",
    "typeRef": "type:f804470d1c73a5c2f896",
    "required": true,
    "description": "Points to place"
  },
  {
    "name": "xDomain",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "[number, number] | undefined",
    "typeRef": "type:e4bdfc457972809a67b5",
    "required": false,
    "description": "Range of the horizontal axis"
  },
  {
    "name": "yDomain",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "[number, number] | undefined",
    "typeRef": "type:e4bdfc457972809a67b5",
    "required": false,
    "description": "Range of the vertical axis"
  },
  {
    "name": "xSplit",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "X value of the vertical divider (the middle of `xDomain` by default)"
  },
  {
    "name": "ySplit",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Y value of the horizontal divider (the middle of `yDomain` by default)"
  },
  {
    "name": "quadrants",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "object",
    "typeText": "QuadrantRegions | undefined",
    "typeRef": "type:18e5fb722a72b3b97023",
    "required": false,
    "description": "Titles and colors of the quadrants"
  },
  {
    "name": "xLabel",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Title of the horizontal axis"
  },
  {
    "name": "yLabel",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Title of the vertical axis"
  },
  {
    "name": "axisLabels",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "object",
    "typeText": "QuadrantAxisLabels | undefined",
    "typeRef": "type:9074f8421ff542cd9005",
    "required": false,
    "description": "Texts at the ends of the dividers, drawn inside the plot (e.g. \"Important\" at the top)"
  },
  {
    "name": "showTicks",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the numeric ticks of the axes; `false` keeps only the matrix"
  },
  {
    "name": "reverseX",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)"
  },
  {
    "name": "showLabels",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the labels next to the dots (overlapping labels are skipped)"
  },
  {
    "name": "pointSize",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Dot diameter in pixels"
  },
  {
    "name": "showCounts",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string) | undefined",
    "typeRef": "type:887384379eb9946d9822",
    "parameters": [
      {
        "name": "count",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "points",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "readonly QuadrantPoint[]",
        "typeRef": "type:f804470d1c73a5c2f896"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "default": false,
    "required": false,
    "description": "Shows the number of points of each quadrant after its title; a function returns the text instead (e.g. `(n) => `${n} tasks``)"
  },
  {
    "name": "selectedIndex",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "required": false,
    "description": "Index of the selected point: drawn with a ring of its color (`null`: none)"
  },
  {
    "name": "selectedIndices",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Indices of the selected points (several selected points)"
  }
]
```

### events

```json
[
  {
    "name": "onPointsChange",
    "source": "packages/react/src/components/QuadrantTaskBoard/QuadrantTaskBoard.tsx",
    "kind": "function",
    "typeText": "(points: QuadrantPoint[]) => void",
    "typeRef": "type:c6ddc198f419176f5d2d",
    "parameters": [
      {
        "name": "points",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint[]",
        "typeRef": "type:6712a3cf27568e0bb468"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true,
    "description": "Called with the next list of tasks after an add, an edit, a delete, a drag and drop or a keyboard move (controlled: pass them back as `points`)"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:82bc48a4d9755f33189e",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the clicked point and its index"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  },
  {
    "name": "onPointDrag",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void) | undefined",
    "typeRef": "type:59a1e2a73779f04e20bc",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "target",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "QuadrantDropTarget",
        "typeRef": "type:205d626ac35110cd3b09"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on every move of a dragged point, with the quadrant under the pointer. A local visual preview follows every move; commit `points` in `onPointDrop` (cancellation leaves caller data unchanged)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  },
  {
    "prop": "points",
    "event": "onPointsChange",
    "syntax": "points={points} onPointsChange={handler}"
  }
]
```

## API

```json
{
  "QuadrantTaskBoardProps": {
    "source": "react/src/components/QuadrantTaskBoard/QuadrantTaskBoard.tsx",
    "kind": "interface",
    "extends": [
      "Omit<QuadrantChartProps, | \"onPointDrop\" | \"onQuadrantClick\" | \"onPointDoubleClick\" | \"renderPointActions\" | \"renderQuadrantHeader\" | \"labels\">"
    ],
    "props": [
      {
        "name": "onPointsChange",
        "type": "(points: QuadrantPoint[]) => void",
        "required": true,
        "description": "Called with the next list of tasks after an add, an edit, a delete, a drag and drop or a keyboard move (controlled: pass them back as `points`)"
      },
      {
        "name": "labels",
        "type": "Partial<QuadrantTaskLabels>",
        "required": false,
        "description": "Texts of the buttons and panels (localized by default)"
      }
    ]
  },
  "QuadrantTaskLabels": {
    "source": "charts/src/engine/quadrant-tasks.ts",
    "description": "Built-in texts of the task boards",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "add",
        "type": "string",
        "required": true,
        "description": "Add button of a quadrant and title of the add dialog"
      },
      {
        "name": "edit",
        "type": "string",
        "required": true,
        "description": "Edit button of the active point and title of the edit dialog"
      },
      {
        "name": "delete",
        "type": "string",
        "required": true,
        "description": "Delete button of the active point and title of its confirmation"
      },
      {
        "name": "deleteConfirm",
        "type": "string",
        "required": true,
        "description": "Text of the delete confirmation: `{name}` is the task"
      },
      {
        "name": "confirmDelete",
        "type": "string",
        "required": true,
        "description": "Confirm button of the delete confirmation"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Label of the name field"
      },
      {
        "name": "quadrant",
        "type": "string",
        "required": true,
        "description": "Label of the quadrant field"
      },
      {
        "name": "save",
        "type": "string",
        "required": true
      },
      {
        "name": "cancel",
        "type": "string",
        "required": true
      },
      {
        "name": "actions",
        "type": "string",
        "required": true,
        "description": "Name of the actions toolbar of the active point"
      }
    ]
  },
  "QuadrantConfig": {
    "source": "charts/src/engine/presets.ts",
    "description": "Settings of a quadrant matrix (the props of QuadrantChart)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "points",
        "type": "readonly QuadrantPoint[]",
        "required": true,
        "description": "Points to place"
      },
      {
        "name": "xDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the horizontal axis"
      },
      {
        "name": "yDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the vertical axis"
      },
      {
        "name": "xSplit",
        "type": "number",
        "required": false,
        "description": "X value of the vertical divider (the middle of `xDomain` by default)"
      },
      {
        "name": "ySplit",
        "type": "number",
        "required": false,
        "description": "Y value of the horizontal divider (the middle of `yDomain` by default)"
      },
      {
        "name": "quadrants",
        "type": "QuadrantRegions",
        "required": false,
        "description": "Titles and colors of the quadrants"
      },
      {
        "name": "xLabel",
        "type": "string",
        "required": false,
        "description": "Title of the horizontal axis"
      },
      {
        "name": "yLabel",
        "type": "string",
        "required": false,
        "description": "Title of the vertical axis"
      },
      {
        "name": "axisLabels",
        "type": "QuadrantAxisLabels",
        "required": false,
        "description": "Texts at the ends of the dividers, drawn inside the plot (e.g. \"Important\" at the top)"
      },
      {
        "name": "showTicks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the numeric ticks of the axes; `false` keeps only the matrix"
      },
      {
        "name": "reverseX",
        "type": "boolean",
        "required": false,
        "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)"
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the labels next to the dots (overlapping labels are skipped)"
      },
      {
        "name": "pointSize",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Dot diameter in pixels"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the points in the tooltip"
      },
      {
        "name": "draggable",
        "type": "boolean",
        "required": false,
        "description": "Lets the user drag the dots (`drag` / `drop` events)"
      },
      {
        "name": "showCounts",
        "type": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)",
        "required": false,
        "default": "false",
        "description": "Shows the number of points of each quadrant after its title; a function returns the text instead (e.g. `(n) => `${n} tasks``)"
      },
      {
        "name": "selectedIndex",
        "type": "number | null",
        "required": false,
        "description": "Index of the selected point: drawn with a ring of its color (`null`: none)"
      },
      {
        "name": "selectedIndices",
        "type": "readonly number[]",
        "required": false,
        "description": "Indices of the selected points (several selected points)"
      }
    ]
  }
}
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

## Example: Eisenhower board

Urgent tasks on the left (reverseX) and important ones at the top: click + or the empty area of a quadrant to add a task, select a task to edit or delete it, and drag it (or press Shift + an arrow key) to move it to another quadrant. The sample names follow the page language until you rename them.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-task-board/demos/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantTaskBoard } from "minerva-design";
import type { QuadrantPoint } from "minerva-design/charts";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left.
// Sample tasks keep a translation key until they are renamed.
type Task = QuadrantPoint & { key?: string };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data",
  });
  const [tasks, setTasks] = useState(initial);
  const points = useMemo(
    () =>
      tasks.map((task) =>
        task.key ? { ...task, label: t(`tasks.${task.key}`) } : task,
      ),
    [tasks, t],
  );
  return (
    <QuadrantTaskBoard
      points={points}
      // a renamed sample task drops its translation key
      onPointsChange={(next) =>
        setTasks(
          next.map((point) => {
            const task = point as Task;
            return task.key && task.label !== t(`tasks.${task.key}`)
              ? { ...task, key: undefined }
              : task;
          }),
        )
      }
      quadrants={{
        topLeft: { label: t("doFirst"), color: "var(--danger-color, #ef4444)" },
        topRight: {
          label: t("schedule"),
          color: "var(--primary-color, #4f46e5)",
        },
        bottomLeft: {
          label: t("delegate"),
          color: "var(--warning-color, #f59e0b)",
        },
        bottomRight: {
          label: t("eliminate"),
          color: "var(--text-secondary-color, #64748b)",
        },
      }}
      reverseX
      showTicks={false}
      axisLabels={{
        top: t("important"),
        bottom: t("notImportant"),
        left: t("urgent"),
        right: t("notUrgent"),
      }}
      height={380}
      ariaLabel={t("boardAria")}
    />
  );
}

```

## Example: Custom texts and badges

A product roadmap by effort and impact: labels renames the buttons, the name field and the delete confirmation ({name} stands for the item), quadrants gives each header a numbered badge, and every change from onPointsChange is counted.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-task-board/demos/custom-labels.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantTaskBoard } from "minerva-design";
import type { QuadrantPoint } from "minerva-design/charts";

// A product roadmap: effort on x, impact on y. `labels` renames the
// buttons and panels; every change is counted. Sample features keep a
// translation key until they are renamed.
type Feature = QuadrantPoint & { key?: string };
const initial: Feature[] = [
  { key: "darkMode", x: 2.5, y: 7.5 },
  { key: "sso", x: 7.5, y: 8.5 },
  { key: "csvExport", x: 3, y: 3 },
  { key: "rewriteBilling", x: 8.5, y: 3.5 },
];

export default function CustomLabelsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data.roadmap",
  });
  const [items, setItems] = useState(initial);
  const [changes, setChanges] = useState(0);
  const points = useMemo(
    () =>
      items.map((item) =>
        item.key ? { ...item, label: t(`features.${item.key}`) } : item,
      ),
    [items, t],
  );
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantTaskBoard
        points={points}
        // a renamed sample feature drops its translation key
        onPointsChange={(next) => {
          setItems(
            next.map((point) => {
              const item = point as Feature;
              return item.key && item.label !== t(`features.${item.key}`)
                ? { ...item, key: undefined }
                : item;
            }),
          );
          setChanges((n) => n + 1);
        }}
        labels={{
          add: t("add"),
          edit: t("edit"),
          delete: t("delete"),
          name: t("name"),
          // {name} is replaced by the board, not by i18next
          deleteConfirm: t("deleteConfirm"),
        }}
        quadrants={{
          topLeft: { label: t("quickWins"), badge: "1" },
          topRight: { label: t("bigBets"), badge: "2" },
          bottomLeft: { label: t("fillIns"), badge: "3" },
          bottomRight: { label: t("moneyPits"), badge: "4" },
        }}
        xLabel={t("effort")}
        yLabel={t("impact")}
        height={360}
        ariaLabel={t("aria")}
      />
      <small style={{ color: "var(--text-secondary-color)" }}>
        {t("summary", { features: items.length, changes })}
      </small>
    </div>
  );
}

```
