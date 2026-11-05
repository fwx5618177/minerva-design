# QuadrantTaskBoard 四象限タスクボード

アイゼンハワー・マトリクスのような四象限マトリクス上のタスクボードです。象限ヘッダーの +（または象限の空白部分）でタスクを追加し、アクティブなタスクのコンパクトな編集・削除ボタン（React ではカード内の名前の横）で編集・削除します。+ ボタンやタスクのすぐ横に開くパネルでタスク名と象限を指定し、削除の前にはその場で確認が入ります。タスクはドラッグ＆ドロップまたは Shift + 矢印キーで移動でき、ダブルクリックで編集できます。ボードは制御コンポーネントです。タスクを points に渡し、onPointsChange で受け取った新しいリストを戻してください。QuadrantChart のその他の props（軸、象限のタイトル・バッジ・色、目盛り、ラベル…）も使え、組み込みのボタンとパネルはアプリの言語に従います。minerva-design/charts ではなく minerva-design からエクスポートされます。

Package: minerva-design@1.21.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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

On the native QuadrantChart (views, no SVG): add button in each quadrant header, edit / delete toolbar next to the selected (tapped) task, an inline panel anchored in the board (at the + button or the task) with a name field and a 2 x 2 quadrant radio grid, and an inline confirmation before a delete (a press outside or Android back closes it); moves by dragging a dot or the screen-reader "Move to" actions. No double tap to edit (use the toolbar)

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/QuadrantTaskBoard/QuadrantTaskBoard.tsx",
    "kind": "object",
    "typeText": "Partial<QuadrantTaskLabels> | undefined",
    "typeRef": "type:1844230c41d60923064b",
    "required": false,
    "description": "Texts of the buttons and panels (localized by default)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "crosshair",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:69bd7b8ae3861328f291",
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
    "description": "React content of the tooltip of a point"
  },
  {
    "name": "quadrantContent",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "Partial<Record<keyof QuadrantRegions, ReactNode>> | undefined",
    "typeRef": "type:771baa9ee9c2890c3c21",
    "required": false,
    "description": "React content placed over each quadrant (e.g. an add button); the content receives touches, the rest of the quadrant does not"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Exposes every point to the screen readers (VoiceOver, TalkBack) as a button over its dot, labelled with its name, quadrant and values; with `onPointDrop`, its accessibility actions (\"Move to …\") move it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
  }
]
```

### events

```json
[
  {
    "name": "onPointsChange",
    "source": "packages/native/src/components/QuadrantTaskBoard/QuadrantTaskBoard.tsx",
    "kind": "function",
    "typeText": "(points: QuadrantPoint[]) => void",
    "typeRef": "type:7837c4475bd7ac3fee23",
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
    "description": "Called with the next list of tasks after an add, an edit, a delete, a drag and drop or a \"Move to\" accessibility action (controlled: pass them back as `points`)"
  },
  {
    "name": "onHover",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
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
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:92675943891fcd1135a4",
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
    "description": "Called with the tapped point and its index"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
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
  }
]
```

## API

```json
{
  "native:QuadrantTaskBoardProps": {
    "source": "native/src/components/QuadrantTaskBoard/QuadrantTaskBoard.tsx",
    "kind": "interface",
    "extends": [
      "Omit<QuadrantChartProps, | \"onPointDrop\" | \"onQuadrantClick\" | \"renderPointActions\" | \"renderQuadrantHeader\" | \"labels\">"
    ],
    "props": [
      {
        "name": "onPointsChange",
        "type": "(points: QuadrantPoint[]) => void",
        "required": true,
        "description": "Called with the next list of tasks after an add, an edit, a delete, a drag and drop or a \"Move to\" accessibility action (controlled: pass them back as `points`)"
      },
      {
        "name": "labels",
        "type": "Partial<QuadrantTaskLabels>",
        "required": false,
        "description": "Texts of the buttons and panels (localized by default)"
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

## Example: アイゼンハワー・ボード

緊急のタスクを左（reverseX）、重要なタスクを上に配置します。+ または象限の空白部分をクリックしてタスクを追加し、タスクを選択すると編集・削除でき、ドラッグ（または Shift + 矢印キー）で別の象限へ移動できます。サンプルのタスク名は、名前を変更するまでページの言語に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-task-board/native/basic.tsx

```tsx
// Eisenhower task board: the + of a quadrant (or a tap on its empty area)
// adds a task, the buttons above the active task edit or delete it, and
// tasks move by drag and drop or the "Move to" accessibility actions.
// `onPointsChange` keeps the list; the built-in buttons and panels follow
// the language of the app.
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { QuadrantTaskBoard, type QuadrantPoint } from "minerva-design/native";

// the sample tasks keep a translation key so that their names follow the
// language until the user renames them
type Task = QuadrantPoint & { key?: string; customLabel?: string };

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

export default function Basic() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-task-board.data",
  });
  const [tasks, setTasks] = useState(initial);
  const keyName = (task: Task) =>
    task.key ? t(`tasks.${task.key}`) : undefined;
  const points: QuadrantPoint[] = tasks.map((task) => ({
    ...task,
    label: task.customLabel ?? keyName(task) ?? task.label,
  }));

  return (
    <View style={{ width: "100%" }}>
      <QuadrantTaskBoard
        points={points}
        onPointsChange={(next) =>
          setTasks(
            next.map((point) => {
              const task = point as Task;
              const named = task.key && task.label === keyName(task);
              return { ...task, customLabel: named ? undefined : task.label };
            }),
          )
        }
        quadrants={{
          topLeft: {
            label: t("doFirst"),
            color: "var(--danger-color, #ef4444)",
          },
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
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        reverseX
        showTicks={false}
        height={360}
        ariaLabel={t("boardAria")}
      />
    </View>
  );
}

```
