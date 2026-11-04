# QuadrantTaskBoard 四象限任务看板

基于四象限矩阵（如艾森豪威尔矩阵）的任务看板：点击象限标题上的 +（或象限的空白区域）添加任务，活动任务上的紧凑编辑和删除按钮（React 中位于任务卡片内、名称旁边）可编辑或删除任务，在 + 按钮或任务旁直接弹出的面板用于填写任务名称并选择象限，删除前会就地确认；任务可通过拖放或 Shift + 方向键移动（双击即可编辑）。看板是受控的：通过 points 传入任务，并把 onPointsChange 收到的新列表回传。它还接受 QuadrantChart 的其他属性（坐标轴、象限标题、徽标和颜色、刻度、标签……），内置按钮和面板会跟随应用语言。由 minerva-design 导出，而非 minerva-design/charts。

Package: minerva-design@1.20.4

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnQuadrantTaskBoard. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnQuadrantTaskBoard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "points",
    "typeText": "readonly QuadrantPoint[]",
    "required": true,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "labels",
    "typeText": "Partial<QuadrantTaskLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "xDomain",
    "typeText": "[number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "yDomain",
    "typeText": "[number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "xSplit",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "ySplit",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "quadrants",
    "typeText": "QuadrantRegions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "xLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "yLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "axisLabels",
    "typeText": "QuadrantAxisLabels | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "showTicks",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "reverseX",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "showLabels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "pointSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "draggable",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "showCounts",
    "typeText": "ShowCounts | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "selectedIndex",
    "typeText": "number | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "selectedIndices",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  },
  {
    "name": "accessiblePoints",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointsChange",
    "typeText": "QuadrantPoint[]",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "QuadrantPoint[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "{ point: QuadrantPoint; index: number; }",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ point: QuadrantPoint; index: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDrag",
    "typeText": "QuadrantPointDrop",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "QuadrantPointDrop",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/quadrant-task-board.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
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

## Example: 艾森豪威尔看板

紧急任务在左侧（reverseX），重要任务在上方：点击 + 或象限的空白区域添加任务，选中任务后可编辑或删除，拖动任务（或按 Shift + 方向键）即可移到其他象限。示例任务名称会跟随页面语言，重命名后则保持不变。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnQuadrantTaskBoard, injectMinerva } from 'minerva-design/angular';
import { QuadrantPoint } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnQuadrantTaskBoard],
  template: `
@let t = labels[language()];
<!-- the + of a quadrant (or a click on its empty area) adds a task, the
     buttons above the active task edit or delete it, tasks move by drag and
     drop or Shift + arrows; the built-in texts follow the page language -->
<mn-quadrant-task-board
  [(points)]="tasks[language()]"
  [quadrants]="{
    topLeft: { label: t.doFirst, color: 'var(--danger-color, #ef4444)' },
    topRight: { label: t.schedule, color: 'var(--primary-color, #4f46e5)' },
    bottomLeft: { label: t.delegate, color: 'var(--warning-color, #f59e0b)' },
    bottomRight: { label: t.eliminate, color: 'var(--text-secondary-color, #64748b)' }
  }"
  [axisLabels]="{
    top: t.important,
    bottom: t.notImportant,
    left: t.urgent,
    right: t.notUrgent
  }"
  reverseX
  [showTicks]="false"
  [height]="360"
  [ariaLabel]="t.boardAria"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  tasks = {
  en: [
    { x: 9, y: 8, label: "Fix login outage" },
    { x: 3, y: 8.5, label: "Quarterly planning" },
    { x: 8, y: 3, label: "Book travel" },
    { x: 2.5, y: 2, label: "Inbox zero" },
  ],
  zh: [
    { x: 9, y: 8, label: "修复登录故障" },
    { x: 3, y: 8.5, label: "季度规划" },
    { x: 8, y: 3, label: "预订差旅" },
    { x: 2.5, y: 2, label: "清空收件箱" },
  ],
  ja: [
    { x: 9, y: 8, label: "ログイン障害の修正" },
    { x: 3, y: 8.5, label: "四半期計画" },
    { x: 8, y: 3, label: "出張の予約" },
    { x: 2.5, y: 2, label: "受信トレイの整理" },
  ],
  fr: [
    { x: 9, y: 8, label: "Réparer la connexion" },
    { x: 3, y: 8.5, label: "Planification trimestrielle" },
    { x: 8, y: 3, label: "Réserver le voyage" },
    { x: 2.5, y: 2, label: "Boîte de réception vide" },
  ],
} as Record<"en" | "zh" | "ja" | "fr", QuadrantPoint[]>;
  labels = {
  "en": {
    "doFirst": "Do first",
    "schedule": "Schedule",
    "delegate": "Delegate",
    "eliminate": "Eliminate",
    "important": "Important",
    "notImportant": "Not important",
    "urgent": "Urgent",
    "notUrgent": "Not urgent",
    "boardAria": "Task matrix: drag tasks between quadrants"
  },
  "zh": {
    "doFirst": "立即做",
    "schedule": "计划做",
    "delegate": "委派",
    "eliminate": "删除",
    "important": "重要",
    "notImportant": "不重要",
    "urgent": "紧急",
    "notUrgent": "不紧急",
    "boardAria": "任务矩阵：在象限之间拖动任务"
  },
  "ja": {
    "doFirst": "すぐやる",
    "schedule": "計画する",
    "delegate": "任せる",
    "eliminate": "やめる",
    "important": "重要",
    "notImportant": "重要でない",
    "urgent": "緊急",
    "notUrgent": "緊急でない",
    "boardAria": "タスクマトリクス：象限の間でタスクをドラッグ"
  },
  "fr": {
    "doFirst": "À faire tout de suite",
    "schedule": "À planifier",
    "delegate": "À déléguer",
    "eliminate": "À abandonner",
    "important": "Important",
    "notImportant": "Pas important",
    "urgent": "Urgent",
    "notUrgent": "Pas urgent",
    "boardAria": "Matrice des tâches : faites glisser les tâches entre les quadrants"
  }
};
}

```

## Example: 自定义文案与徽标

按投入和影响排列的产品路线图：labels 重命名了按钮、名称字段和删除确认文案（{name} 代表条目名称），quadrants 为每个标题加上编号徽标，并统计 onPointsChange 带来的每一次修改。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnQuadrantTaskBoard, injectMinerva } from 'minerva-design/angular';
import { QuadrantPoint } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnQuadrantTaskBoard],
  template: `
@let t = labels[language()];
<mn-quadrant-task-board
  [points]="ideas"
  (pointsChange)="ideas = $event; changes = changes + 1"
  [labels]="t.board"
  [quadrants]="{
    topLeft: { label: t.quickWins },
    topRight: { label: t.bigBets },
    bottomLeft: { label: t.fillIns },
    bottomRight: { label: t.timeSinks }
  }"
  [xLabel]="t.effort"
  [yLabel]="t.impact"
  [showCounts]="false"
  [height]="320"
/>
<output aria-live="polite">{{ t.changes }} {{ changes }} · {{ ideas.length }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  changes = 0;
  ideas = [
  { x: 2, y: 8, label: "Dark mode" },
  { x: 8, y: 8.5, label: "SSO" },
  { x: 3, y: 3, label: "Export" },
] as QuadrantPoint[];
  labels = {
  "en": {
    "effort": "Effort",
    "impact": "Impact",
    "quickWins": "Quick wins",
    "bigBets": "Big bets",
    "fillIns": "Fill-ins",
    "timeSinks": "Time sinks",
    "changes": "Changes:",
    "board": {
      "add": "Add idea",
      "edit": "Edit idea",
      "delete": "Drop idea",
      "name": "Idea",
      "deleteConfirm": "“{name}” leaves the backlog."
    }
  },
  "zh": {
    "effort": "投入",
    "impact": "影响",
    "quickWins": "速赢",
    "bigBets": "重点投入",
    "fillIns": "补充项",
    "timeSinks": "低效项",
    "changes": "修改次数：",
    "board": {
      "add": "添加想法",
      "edit": "编辑想法",
      "delete": "放弃想法",
      "name": "想法",
      "deleteConfirm": "“{name}”将移出待办池。"
    }
  },
  "ja": {
    "effort": "工数",
    "impact": "効果",
    "quickWins": "クイックウィン",
    "bigBets": "大型施策",
    "fillIns": "穴埋め",
    "timeSinks": "時間の浪費",
    "changes": "変更回数：",
    "board": {
      "add": "アイデアを追加",
      "edit": "アイデアを編集",
      "delete": "アイデアを外す",
      "name": "アイデア",
      "deleteConfirm": "「{name}」をバックログから外します。"
    }
  },
  "fr": {
    "effort": "Effort",
    "impact": "Impact",
    "quickWins": "Gains rapides",
    "bigBets": "Paris majeurs",
    "fillIns": "Bouche-trous",
    "timeSinks": "Pertes de temps",
    "changes": "Modifications :",
    "board": {
      "add": "Ajouter une idée",
      "edit": "Modifier l’idée",
      "delete": "Retirer l’idée",
      "name": "Idée",
      "deleteConfirm": "« {name} » quitte le backlog."
    }
  }
};
}

```
