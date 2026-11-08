# QuadrantTaskBoard 四象限任务看板

基于四象限矩阵（如艾森豪威尔矩阵）的任务看板：点击象限标题上的 +（或象限的空白区域）添加任务，活动任务上的紧凑编辑和删除按钮（React 中位于任务卡片内、名称旁边）可编辑或删除任务，在 + 按钮或任务旁直接弹出的面板用于填写任务名称并选择象限，删除前会就地确认；任务可通过拖放或 Shift + 方向键移动（双击即可编辑）。看板是受控的：通过 points 传入任务，并把 onPointsChange 收到的新列表回传。它还接受 QuadrantChart 的其他属性（坐标轴、象限标题、徽标和颜色、刻度、标签……），内置按钮和面板会跟随应用语言。由 minerva-design 导出，而非 minerva-design/charts。

Package: minerva-design@1.23.2

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

## Example: 艾森豪威尔看板

紧急任务在左侧（reverseX），重要任务在上方：点击 + 或象限的空白区域添加任务，选中任务后可编辑或删除，拖动任务（或按 Shift + 方向键）即可移到其他象限。示例任务名称会跟随页面语言，重命名后则保持不变。

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
