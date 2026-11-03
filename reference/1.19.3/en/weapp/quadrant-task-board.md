# QuadrantTaskBoard

A task board on a four-quadrant matrix, such as an Eisenhower matrix: the + of a quadrant header (or a click on its empty area) adds a task, compact edit and delete buttons on the active task (in its card, beside its name, on React) edit or delete it, a panel opened right at the + button or at the task names it and picks its quadrant, an inline confirmation guards every delete, and tasks move by drag and drop or Shift + arrow keys (a double click edits them). The board is controlled: pass the tasks as points and set back the list received by onPointsChange. It accepts the other props of QuadrantChart (axes, quadrant titles, badges and colors, ticks, labels…) and its buttons and panels follow the language of the app. Exported by minerva-design, not minerva-design/charts.

Package: minerva-design@1.19.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
