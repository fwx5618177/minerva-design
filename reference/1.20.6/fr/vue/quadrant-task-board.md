# QuadrantTaskBoard

Un tableau de tâches sur une matrice à quatre quadrants, comme une matrice d’Eisenhower : le + de l’en-tête d’un quadrant (ou un clic dans sa zone vide) ajoute une tâche, les boutons compacts modifier et supprimer de la tâche active (dans sa fiche, à côté de son nom, avec React) la modifient ou la suppriment, un panneau ouvert à côté du bouton + ou de la tâche la nomme et choisit son quadrant, chaque suppression est confirmée sur place, et les tâches se déplacent par glisser-déposer ou avec Maj + flèches (un double-clic les modifie). Le tableau est contrôlé : passez les tâches dans points et renvoyez la liste reçue par onPointsChange. Il accepte les autres props de QuadrantChart (axes, titres, pastilles et couleurs des quadrants, graduations, étiquettes…), et ses boutons et panneaux suivent la langue de l’application. Exporté par minerva-design, et non par minerva-design/charts.

Package: minerva-design@1.20.6

Renderer: vue

Locale: fr

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

Réparer la connexion

Planification trimestrielle

Réserver le voyage

Boîte de réception vide

À faire tout de suite

À planifier

À déléguer

À abandonner

Important

Pas important

Urgent

Pas urgent

Matrice des tâches : faites glisser les tâches entre les quadrants

Mode sombre

Authentification unique

Export CSV

Refonte de la facturation

Gains rapides

Paris ambitieux

Bouche-trous

Gouffres financiers

Effort

Impact

Feuille de route selon l’effort et l’impact

Ajouter une fonctionnalité

Modifier la fonctionnalité

Retirer la fonctionnalité

Fonctionnalité

« {name} » sera retirée de la feuille de route.

Fonctionnalités : {{features}} · modifications : {{changes}}

## QuadrantTaskBoard

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "draggable",
    "type": "boolean",
    "required": false,
    "description": "Lets the user drag the dots (default: when a `pointDrop` listener is set)",
    "typeText": "boolean"
  },
  {
    "name": "showCounts",
    "type": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)",
    "required": false,
    "description": "Shows the number of points of each quadrant after its title; a function returns the text",
    "typeText": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)"
  },
  {
    "name": "showTicks",
    "type": "boolean",
    "required": false,
    "description": "Shows the numeric ticks of the axes (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "reverseX",
    "type": "boolean",
    "required": false,
    "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)",
    "typeText": "boolean"
  },
  {
    "name": "showLabels",
    "type": "boolean",
    "required": false,
    "description": "Draws the labels next to the dots (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "selectedIndex",
    "type": "number | null",
    "required": false,
    "description": "Index of the selected point, drawn with a ring (`null`: none)",
    "typeText": "number | null"
  },
  {
    "name": "accessiblePoints",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Renders a visually hidden list of the points per quadrant: screen\nreaders can reach every point; arrows move between them, Enter clicks\nand Shift + arrows move the focused point to the neighbouring quadrant\n(`pointDrop`, with a `pointDrop` listener)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<QuadrantTaskLabels>",
    "required": false,
    "description": "Texts of the buttons and panels (localized by default)",
    "typeText": "Partial<QuadrantTaskLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the points in the tooltip",
    "typeText": "string"
  },
  {
    "name": "points",
    "type": "readonly QuadrantPoint[]",
    "required": true,
    "description": "Points to place (replace the array to update the chart)",
    "typeText": "readonly QuadrantPoint[]"
  },
  {
    "name": "xDomain",
    "type": "[number, number]",
    "required": false,
    "description": "Range of the horizontal axis (default `[0, 10]`)",
    "typeText": "[number, number]"
  },
  {
    "name": "yDomain",
    "type": "[number, number]",
    "required": false,
    "description": "Range of the vertical axis (default `[0, 10]`)",
    "typeText": "[number, number]"
  },
  {
    "name": "xSplit",
    "type": "number",
    "required": false,
    "description": "X value of the vertical divider (the middle of `xDomain` by default)",
    "typeText": "number"
  },
  {
    "name": "ySplit",
    "type": "number",
    "required": false,
    "description": "Y value of the horizontal divider (the middle of `yDomain` by default)",
    "typeText": "number"
  },
  {
    "name": "quadrants",
    "type": "QuadrantRegions",
    "required": false,
    "description": "Titles and colors of the quadrants",
    "typeText": "QuadrantRegions"
  },
  {
    "name": "xLabel",
    "type": "string",
    "required": false,
    "description": "Title of the horizontal axis",
    "typeText": "string"
  },
  {
    "name": "yLabel",
    "type": "string",
    "required": false,
    "description": "Title of the vertical axis",
    "typeText": "string"
  },
  {
    "name": "axisLabels",
    "type": "QuadrantAxisLabels",
    "required": false,
    "description": "Texts at the ends of the dividers, drawn inside the plot",
    "typeText": "QuadrantAxisLabels"
  },
  {
    "name": "pointSize",
    "type": "number",
    "required": false,
    "description": "Dot diameter in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "selectedIndices",
    "type": "readonly number[]",
    "required": false,
    "description": "Indices of the selected points",
    "typeText": "readonly number[]"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
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
    "type": "[event: ChartHoverEvent | null]",
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
    "type": "[point: QuadrantPoint, index: number]",
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
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDrag",
    "type": "[point: QuadrantPoint, index: number, target: QuadrantDropTarget]",
    "typeText": "[point: QuadrantPoint, index: number, target: QuadrantDropTarget]",
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
      },
      {
        "name": "target",
        "position": 2,
        "typeText": "QuadrantDropTarget",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:points",
    "type": "[points: QuadrantPoint[]]",
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
    "type": "[points: QuadrantPoint[]]",
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-task-board/vue/basic.vue

```vue
<script setup lang="ts">
// Eisenhower task board: the + of a quadrant (or a click on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or Shift + arrows. `v-model:points` keeps the
// list; the built-in buttons and panels follow the page language.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  QuadrantTaskBoard,
  type QuadrantPoint,
} from "minerva-design/vue/charts";

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
type TaskKey = keyof (typeof TEXT)["en"]["tasks"];
// the sample tasks keep a key so that their names follow the language
// until the user renames them
type Task = QuadrantPoint & { key?: TaskKey; customLabel?: string };

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const tasks = ref<Task[]>([
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
]);
const nameOf = (task: Task) =>
  task.customLabel ?? (task.key ? text.value.tasks[task.key] : task.label);
const points = computed<QuadrantPoint[]>({
  get: () => tasks.value.map((task) => ({ ...task, label: nameOf(task) })),
  set: (next) => {
    tasks.value = next.map((point) => {
      const task = point as Task;
      const named = task.key && task.label === text.value.tasks[task.key];
      return { ...task, customLabel: named ? undefined : task.label };
    });
  },
});
const quadrants = computed(() => ({
  topLeft: { label: text.value.doFirst, color: "var(--danger-color, #ef4444)" },
  topRight: {
    label: text.value.schedule,
    color: "var(--primary-color, #4f46e5)",
  },
  bottomLeft: {
    label: text.value.delegate,
    color: "var(--warning-color, #f59e0b)",
  },
  bottomRight: {
    label: text.value.eliminate,
    color: "var(--text-secondary-color, #64748b)",
  },
}));
const axisLabels = computed(() => ({
  top: text.value.important,
  bottom: text.value.notImportant,
  left: text.value.urgent,
  right: text.value.notUrgent,
}));
</script>

<template>
  <QuadrantTaskBoard
    v-model:points="points"
    :quadrants="quadrants"
    :axis-labels="axisLabels"
    reverse-x
    :show-ticks="false"
    :height="360"
    :aria-label="text.boardAria"
  />
</template>

```
