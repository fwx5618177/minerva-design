# QuadrantTaskBoard 四象限タスクボード

アイゼンハワー・マトリクスのような四象限マトリクス上のタスクボードです。象限ヘッダーの +（または象限の空白部分）でタスクを追加し、アクティブなタスクのコンパクトな編集・削除ボタン（React ではカード内の名前の横）で編集・削除します。+ ボタンやタスクのすぐ横に開くパネルでタスク名と象限を指定し、削除の前にはその場で確認が入ります。タスクはドラッグ＆ドロップまたは Shift + 矢印キーで移動でき、ダブルクリックで編集できます。ボードは制御コンポーネントです。タスクを points に渡し、onPointsChange で受け取った新しいリストを戻してください。QuadrantChart のその他の props（軸、象限のタイトル・バッジ・色、目盛り、ラベル…）も使え、組み込みのボタンとパネルはアプリの言語に従います。minerva-design/charts ではなく minerva-design からエクスポートされます。

Package: minerva-design@1.20.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

## Example: アイゼンハワー・ボード

緊急のタスクを左（reverseX）、重要なタスクを上に配置します。+ または象限の空白部分をクリックしてタスクを追加し、タスクを選択すると編集・削除でき、ドラッグ（または Shift + 矢印キー）で別の象限へ移動できます。サンプルのタスク名は、名前を変更するまでページの言語に従います。

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

## Example: テキストとバッジのカスタマイズ

工数と効果で並べたプロダクトのロードマップです。labels でボタン、名前フィールド、削除確認の文言（{name} は項目名）を変更し、quadrants で各ヘッダーに番号バッジを付け、onPointsChange による変更を数えます。

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
