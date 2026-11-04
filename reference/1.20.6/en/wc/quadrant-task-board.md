# QuadrantTaskBoard

A task board on a four-quadrant matrix, such as an Eisenhower matrix: the + of a quadrant header (or a click on its empty area) adds a task, compact edit and delete buttons on the active task (in its card, beside its name, on React) edit or delete it, a panel opened right at the + button or at the task names it and picks its quadrant, an inline confirmation guards every delete, and tasks move by drag and drop or Shift + arrow keys (a double click edits them). The board is controlled: pass the tasks as points and set back the list received by onPointsChange. It accepts the other props of QuadrantChart (axes, quadrant titles, badges and colors, ticks, labels…) and its buttons and panels follow the language of the app. Exported by minerva-design, not minerva-design/charts.

Package: minerva-design@1.20.6

Renderer: wc

Locale: en

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
  "specifier": "minerva-design/web-components/quadrant-task-board",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "xLabel",
    "typeText": "string | undefined",
    "attribute": "x-label",
    "required": false
  },
  {
    "name": "yLabel",
    "typeText": "string | undefined",
    "attribute": "y-label",
    "required": false
  },
  {
    "name": "xSplit",
    "typeText": "number | undefined",
    "attribute": "x-split",
    "required": false
  },
  {
    "name": "ySplit",
    "typeText": "number | undefined",
    "attribute": "y-split",
    "required": false
  },
  {
    "name": "reverseX",
    "typeText": "boolean",
    "attribute": "reverse-x",
    "required": false
  },
  {
    "name": "hideTicks",
    "typeText": "boolean",
    "attribute": "hide-ticks",
    "required": false
  },
  {
    "name": "hideLabels",
    "typeText": "boolean",
    "attribute": "hide-labels",
    "required": false
  },
  {
    "name": "hideCounts",
    "typeText": "boolean",
    "attribute": "hide-counts",
    "required": false
  },
  {
    "name": "pointSize",
    "typeText": "number",
    "attribute": "point-size",
    "required": false
  },
  {
    "name": "selectedIndex",
    "typeText": "number | null | undefined",
    "attribute": "selected-index",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "noAccessiblePoints",
    "typeText": "boolean",
    "attribute": "no-accessible-points",
    "required": false
  },
  {
    "name": "points",
    "typeText": "readonly QuadrantPoint[] | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<QuadrantTaskLabels> | undefined",
    "required": false
  },
  {
    "name": "quadrants",
    "typeText": "QuadrantRegions | undefined",
    "required": false
  },
  {
    "name": "axisLabels",
    "typeText": "QuadrantAxisLabels | undefined",
    "required": false
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
    "name": "options",
    "typeText": "Omit<ChartOptions, \"series\"> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-points-change",
    "typeText": "CustomEvent",
    "description": "The tasks changed (add, edit, delete, drag and drop, keyboard move); `detail: { points }`, the next list to set back as `points`"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A task was clicked (it becomes the selected one); `detail: { point, index }`"
  },
  {
    "name": "minerva-point-drag",
    "typeText": "CustomEvent",
    "description": "A task is being dragged (on every move); `detail: { point, index, x, y, quadrant }`"
  },
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) task changed; `detail: { x, xLabel, items }`, `null` when nothing is hovered"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned the chart; `detail`: the view"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The chart backend is ready (or fell back after a GPU loss); `detail`: the renderer"
  }
]
```

## API

```json
{
  "wc:minerva-quadrant-task-board": {
    "kind": "element",
    "source": "web-components/src/components/quadrant-task-board/quadrant-task-board.ts",
    "className": "MinervaQuadrantTaskBoard",
    "summary": "Four-quadrant task board: add, edit, delete and drag tasks between quadrants.",
    "description": "Task board on a four-quadrant matrix (`<QuadrantTaskBoard>` of React), built on `<minerva-quadrant-chart>`: each quadrant header shows its title, the number of tasks and an add button; the point card of the active task (hovered, keyboard-focused or selected) shows edit and delete buttons beside its name; an inline panel, anchored inside the board at the button or the task, names a task and picks its quadrant, or confirms a delete (Escape or a press outside closes it). Tasks can be dragged to another quadrant, or moved with Shift + arrows once focused; a double click edits a task, a click on an empty area adds one there. Controlled, like `<minerva-dashboard-columns>`: the board never changes its own `points`. It fires `minerva-points-change` with the next list after an add, an edit, a delete, a drag and drop or a keyboard move; set it back as `points` to apply it (or keep the old list to refuse it). Texts are localized (the `locale` attribute, else the library language) and can be overridden with `labels`. The host's `aria-label` names the chart. Published as the optional entry `minerva-design/web-components/quadrant-task-board` (it loads the chart engine, minerva-design/charts/core).",
    "properties": [
      {
        "name": "xLabel",
        "attribute": "x-label",
        "type": "string | undefined",
        "description": "Title of the horizontal axis"
      },
      {
        "name": "yLabel",
        "attribute": "y-label",
        "type": "string | undefined",
        "description": "Title of the vertical axis"
      },
      {
        "name": "xSplit",
        "attribute": "x-split",
        "type": "number | undefined",
        "description": "X value of the vertical divider (the middle of the x domain by default)"
      },
      {
        "name": "ySplit",
        "attribute": "y-split",
        "type": "number | undefined",
        "description": "Y value of the horizontal divider (the middle of the y domain by default)"
      },
      {
        "name": "reverseX",
        "attribute": "reverse-x",
        "type": "boolean",
        "default": "false",
        "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)"
      },
      {
        "name": "hideTicks",
        "attribute": "hide-ticks",
        "type": "boolean",
        "default": "false",
        "description": "Hides the numeric ticks of the axes (only the matrix remains)"
      },
      {
        "name": "hideLabels",
        "attribute": "hide-labels",
        "type": "boolean",
        "default": "false",
        "description": "Hides the labels next to the tasks"
      },
      {
        "name": "hideCounts",
        "attribute": "hide-counts",
        "type": "boolean",
        "default": "false",
        "description": "Hides the number of tasks in the quadrant headers"
      },
      {
        "name": "pointSize",
        "attribute": "point-size",
        "type": "number",
        "default": "12",
        "description": "Dot diameter in pixels"
      },
      {
        "name": "selectedIndex",
        "attribute": "selected-index",
        "type": "number | null | undefined",
        "description": "Index of the selected task, drawn with a ring (`null`: none); by default the board selects the last clicked, moved or saved task"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "string | number | undefined",
        "description": "Height of the chart: pixels or any CSS length (default 320)"
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "string | undefined",
        "description": "Language of the built-in texts, quadrant titles and numbers (e.g. \"fr\"); the library language by default"
      },
      {
        "name": "noAccessiblePoints",
        "attribute": "no-accessible-points",
        "type": "boolean",
        "default": "false",
        "description": "Leaves out the visually hidden list of the tasks (keyboard and screen reader access, keyboard moves)"
      },
      {
        "name": "points",
        "type": "readonly QuadrantPoint[] | undefined",
        "description": "Tasks `{ x, y, label, color, size }`; replace the array to update the board (controlled); property only"
      },
      {
        "name": "labels",
        "type": "Partial<QuadrantTaskLabels> | undefined",
        "description": "Texts of the buttons and panels (`add`, `edit`, `delete`, `deleteConfirm`, `confirmDelete`, `name`, `quadrant`, `save`, `cancel`, `actions`), localized by default; property only"
      },
      {
        "name": "quadrants",
        "type": "QuadrantRegions | undefined",
        "description": "Titles, badges and colors of the quadrants (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`); property only"
      },
      {
        "name": "axisLabels",
        "type": "QuadrantAxisLabels | undefined",
        "description": "Texts at the ends of the dividers, drawn inside the plot (`top`, `bottom`, `left`, `right`); property only"
      },
      {
        "name": "xDomain",
        "type": "[number, number] | undefined",
        "description": "Range of the horizontal axis (default [0, 10]); property only"
      },
      {
        "name": "yDomain",
        "type": "[number, number] | undefined",
        "description": "Range of the vertical axis (default [0, 10]); property only"
      },
      {
        "name": "options",
        "type": "Omit<ChartOptions, \"series\"> | undefined",
        "description": "Other engine options of the chart (legend, tooltip, padding, palette...); property only"
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-points-change",
        "description": "The tasks changed (add, edit, delete, drag and drop, keyboard move); `detail: { points }`, the next list to set back as `points`"
      },
      {
        "name": "minerva-point-click",
        "description": "A task was clicked (it becomes the selected one); `detail: { point, index }`"
      },
      {
        "name": "minerva-point-drag",
        "description": "A task is being dragged (on every move); `detail: { point, index, x, y, quadrant }`"
      },
      {
        "name": "minerva-hover",
        "description": "The hovered (or keyboard-focused) task changed; `detail: { x, xLabel, items }`, `null` when nothing is hovered"
      },
      {
        "name": "minerva-zoom",
        "description": "The user zoomed or panned the chart; `detail`: the view"
      },
      {
        "name": "minerva-renderer-change",
        "description": "The chart backend is ready (or fell back after a GPU loss); `detail`: the renderer"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The box around the chart and the inline panel"
      },
      {
        "name": "chart",
        "description": "The inner `<minerva-quadrant-chart>`"
      },
      {
        "name": "panel",
        "description": "The inline add / edit / delete panel, positioned next to its anchor"
      }
    ],
    "cssProperties": [
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

points, quadrants and axisLabels are set as properties, reverse-x, hide-ticks and height as attributes; the minerva-points-change listener sets the next list back as points.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-task-board/wc/basic.html

```html
<minerva-quadrant-task-board
  id="board"
  reverse-x
  hide-ticks
  height="360"
></minerva-quadrant-task-board>

```

### apps/docs/src/docs/pages/quadrant-task-board/wc/basic.ts

```tsx
// Eisenhower task board: the + of a quadrant (or a click on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or Shift + arrows. The board is controlled:
// minerva-points-change gives the next list, set it back as `points`. The
// built-in buttons and panels follow the page language.
import type {
  MinervaQuadrantTaskBoard,
  QuadrantPoint,
} from "minerva-design/web-components/quadrant-task-board";

const TEXT = {
  en: {
    doFirst: "Do first",
    schedule: "Schedule",
    delegate: "Delegate",
    eliminate: "Eliminate",
    important: "Important",
    notImportant: "Not important",
    urgent: "Urgent",
    notUrgent: "Not urgent",
    boardAria: "Task matrix: drag tasks between quadrants",
    tasks: {
      loginOutage: "Fix login outage",
      quarterlyPlanning: "Quarterly planning",
      bookTravel: "Book travel",
      inboxZero: "Inbox zero",
    },
  },
  zh: {
    doFirst: "立即做",
    schedule: "计划做",
    delegate: "委派",
    eliminate: "删除",
    important: "重要",
    notImportant: "不重要",
    urgent: "紧急",
    notUrgent: "不紧急",
    boardAria: "任务矩阵：在象限之间拖动任务",
    tasks: {
      loginOutage: "修复登录故障",
      quarterlyPlanning: "季度规划",
      bookTravel: "预订差旅",
      inboxZero: "清空收件箱",
    },
  },
  ja: {
    doFirst: "すぐやる",
    schedule: "計画する",
    delegate: "任せる",
    eliminate: "やめる",
    important: "重要",
    notImportant: "重要でない",
    urgent: "緊急",
    notUrgent: "緊急でない",
    boardAria: "タスクマトリクス：象限の間でタスクをドラッグ",
    tasks: {
      loginOutage: "ログイン障害の修正",
      quarterlyPlanning: "四半期計画",
      bookTravel: "出張の予約",
      inboxZero: "受信トレイの整理",
    },
  },
  fr: {
    doFirst: "À faire tout de suite",
    schedule: "À planifier",
    delegate: "À déléguer",
    eliminate: "À abandonner",
    important: "Important",
    notImportant: "Pas important",
    urgent: "Urgent",
    notUrgent: "Pas urgent",
    boardAria:
      "Matrice des tâches : faites glisser les tâches entre les quadrants",
    tasks: {
      loginOutage: "Réparer la connexion",
      quarterlyPlanning: "Planification trimestrielle",
      bookTravel: "Réserver le voyage",
      inboxZero: "Boîte de réception vide",
    },
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const board = root.querySelector<MinervaQuadrantTaskBoard>("#board")!;
  board.points = [
    { x: 9, y: 8, label: text.tasks.loginOutage },
    { x: 3, y: 8.5, label: text.tasks.quarterlyPlanning },
    { x: 8, y: 3, label: text.tasks.bookTravel },
    { x: 2.5, y: 2, label: text.tasks.inboxZero },
  ];
  board.quadrants = {
    topLeft: { label: text.doFirst, color: "var(--danger-color, #ef4444)" },
    topRight: { label: text.schedule, color: "var(--primary-color, #4f46e5)" },
    bottomLeft: {
      label: text.delegate,
      color: "var(--warning-color, #f59e0b)",
    },
    bottomRight: {
      label: text.eliminate,
      color: "var(--text-secondary-color, #64748b)",
    },
  };
  board.axisLabels = {
    top: text.important,
    bottom: text.notImportant,
    left: text.urgent,
    right: text.notUrgent,
  };
  board.setAttribute("aria-label", text.boardAria);
  const onPointsChange = (event: Event) => {
    board.points = (
      event as CustomEvent<{ points: QuadrantPoint[] }>
    ).detail.points;
  };
  board.addEventListener("minerva-points-change", onPointsChange);
  return () => {
    board.removeEventListener("minerva-points-change", onPointsChange);
  };
}

```
