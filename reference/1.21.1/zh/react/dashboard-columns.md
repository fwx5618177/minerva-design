# DashboardColumns 分栏面板

在仪表盘上按列排布卡片的分栏面板，每列对应一个工作流阶段、流水线环节或状态（待办 / 进行中 / 已完成）：等宽的列带有标题、计数和强调色，卡片纵向堆叠，整个面板可横向滚动。开启 draggable 后，DashboardCard 可以用鼠标、触摸或键盘在列之间和列内移动；面板保持受控（onCardMove）。

Package: minerva-design@1.21.1

Renderer: react

Locale: zh

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

## DashboardCard

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DashboardCard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Key of the card, reported as `cardKey` by a draggable board"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the card in the drag announcements and, when draggable, its accessible name"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the card"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## DashboardColumn

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DashboardColumn"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Title of the column (also its accessible name)"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the column, reported as `fromColumn` / `toColumn` by a draggable board (columns without one take no cards)"
  },
  {
    "name": "count",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of items shown as a badge next to the title (and announced with the title); omit to hide the badge"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "union",
    "typeText": "DashboardColumnColor | undefined",
    "typeRef": "type:346e893bb2fab5bfdbfb",
    "required": false,
    "description": "Accent of the column (a dot before the title): a theme color or any CSS color"
  },
  {
    "name": "description",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Supporting text under the header"
  },
  {
    "name": "actions",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Header controls on the end side (e.g. an add button)"
  },
  {
    "name": "empty",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content shown when the column has no cards"
  },
  {
    "name": "footer",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Footer below the cards (e.g. an \"Add card\" button)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the column"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the column"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## DashboardColumns

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DashboardColumns"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columnWidth",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "default": "18rem",
    "required": false,
    "description": "Width of every column (a number is pixels). With `fill` it is the minimum width: columns stretch equally when they fit"
  },
  {
    "name": "fill",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stretches the columns equally to fill the board when they fit (they keep `columnWidth` as their minimum width and scroll otherwise)"
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "default": "0.75rem",
    "required": false,
    "description": "Space between the columns (a number is pixels)"
  },
  {
    "name": "height",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "required": false,
    "description": "Height of the board: the column bodies scroll vertically within it (a number is pixels)"
  },
  {
    "name": "maxHeight",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "union",
    "typeText": "DashboardLength | undefined",
    "typeRef": "type:f599dfc479dbce7e0d00",
    "required": false,
    "description": "Maximum height of the board: the column bodies scroll vertically within it (a number is pixels)"
  },
  {
    "name": "draggable",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Lets the DashboardCard children of keyed columns (`value`) be dragged between and within columns: with the mouse, a long press on touch screens, or the keyboard (Space / Enter picks a focused card up, the arrows move it, Space / Enter drops it, Escape cancels). The board is controlled: it reports the move (`onCardMove`) and the app moves the card in its data."
  },
  {
    "name": "canDrop",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "function",
    "typeText": "((move: DashboardCardMove) => boolean) | undefined",
    "typeRef": "type:8d0b0741c169cc33043e",
    "parameters": [
      {
        "name": "move",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "DashboardCardMove",
        "typeRef": "type:fd9302cfc7d74ff2894a"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false,
    "description": "Whether a card may be dropped at a position: refused positions show no drop indicator and the keyboard skips them (its original position is always allowed)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the board region"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of an element naming the board (instead of aria-label)"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the board"
  }
]
```

### events

```json
[
  {
    "name": "onCardMove",
    "source": "packages/react/src/components/DashboardColumns/types.ts",
    "kind": "function",
    "typeText": "((move: DashboardCardMove) => void) | undefined",
    "typeRef": "type:d0fc2970e5124e57e3d2",
    "parameters": [
      {
        "name": "move",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "DashboardCardMove",
        "typeRef": "type:fd9302cfc7d74ff2894a"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a card is dropped at a new position (not when it is put back where it was): move the card in your data (`moveDashboardCard` from `minerva-design/core` does it for plain lists)"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "DashboardColumnsProps": {
    "source": "react/src/components/DashboardColumns/types.ts",
    "description": "Props of the DashboardColumns component: a horizontally scrolling row of DashboardColumn",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "The columns (DashboardColumn)"
      },
      {
        "name": "columnWidth",
        "type": "DashboardLength",
        "required": false,
        "default": "\"18rem\"",
        "description": "Width of every column (a number is pixels). With `fill` it is the minimum width: columns stretch equally when they fit"
      },
      {
        "name": "fill",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stretches the columns equally to fill the board when they fit (they keep `columnWidth` as their minimum width and scroll otherwise)"
      },
      {
        "name": "gap",
        "type": "DashboardLength",
        "required": false,
        "default": "\"0.75rem\"",
        "description": "Space between the columns (a number is pixels)"
      },
      {
        "name": "height",
        "type": "DashboardLength",
        "required": false,
        "description": "Height of the board: the column bodies scroll vertically within it (a number is pixels)"
      },
      {
        "name": "maxHeight",
        "type": "DashboardLength",
        "required": false,
        "description": "Maximum height of the board: the column bodies scroll vertically within it (a number is pixels)"
      },
      {
        "name": "draggable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Lets the DashboardCard children of keyed columns (`value`) be dragged between and within columns: with the mouse, a long press on touch screens, or the keyboard (Space / Enter picks a focused card up, the arrows move it, Space / Enter drops it, Escape cancels). The board is controlled: it reports the move (`onCardMove`) and the app moves the card in its data."
      },
      {
        "name": "onCardMove",
        "type": "(move: DashboardCardMove) => void",
        "required": false,
        "description": "Called when a card is dropped at a new position (not when it is put back where it was): move the card in your data (`moveDashboardCard` from `minerva-design/core` does it for plain lists)"
      },
      {
        "name": "canDrop",
        "type": "(move: DashboardCardMove) => boolean",
        "required": false,
        "description": "Whether a card may be dropped at a position: refused positions show no drop indicator and the keyboard skips them (its original position is always allowed)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Board\" (translated)",
        "description": "Accessible name of the board region"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id of an element naming the board (instead of aria-label)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline style of the board"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the board"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div>"
      }
    ]
  },
  "DashboardColumnProps": {
    "source": "react/src/components/DashboardColumns/types.ts",
    "description": "Props of the DashboardColumn component: a status column of a DashboardColumns",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": true,
        "description": "Title of the column (also its accessible name)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Key of the column, reported as `fromColumn` / `toColumn` by a draggable board (columns without one take no cards)"
      },
      {
        "name": "count",
        "type": "number",
        "required": false,
        "description": "Number of items shown as a badge next to the title (and announced with the title); omit to hide the badge"
      },
      {
        "name": "color",
        "type": "DashboardColumnColor",
        "required": false,
        "description": "Accent of the column (a dot before the title): a theme color or any CSS color"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Supporting text under the header"
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "required": false,
        "description": "Header controls on the end side (e.g. an add button)"
      },
      {
        "name": "empty",
        "type": "ReactNode",
        "required": false,
        "default": "\"No items\" (translated)",
        "description": "Content shown when the column has no cards"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Footer below the cards (e.g. an \"Add card\" button)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "The cards: each child is wrapped in a role=\"listitem\""
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "the title with the count (\"To do, 3 items\", translated)",
        "description": "Accessible name of the column"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline style of the column"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the column"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root <section>"
      }
    ]
  },
  "DashboardCardProps": {
    "source": "react/src/components/DashboardColumns/types.ts",
    "description": "Props of the DashboardCard component: a card of a DashboardColumn that a draggable board can move",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Key of the card, reported as `cardKey` by a draggable board"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "its text content",
        "description": "Name of the card in the drag announcements and, when draggable, its accessible name"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Content of the card"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline style of the card"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the card"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div>"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:DashboardColumns": {
    "kind": "cssVars",
    "source": "react/src/components/DashboardColumns",
    "vars": [
      {
        "name": "--dashboard-column-width",
        "description": "Width of the columns (defaults to 18rem; the columnWidth prop sets it; with fill it is the minimum width)"
      },
      {
        "name": "--dashboard-gap",
        "description": "Space between the columns (defaults to 0.75rem; the gap prop sets it)"
      },
      {
        "name": "--dashboard-column-background",
        "description": "Background of a column (defaults to --surface-muted-color)"
      },
      {
        "name": "--dashboard-column-border-color",
        "description": "Border color of a column (defaults to --border-color)"
      },
      {
        "name": "--dashboard-column-radius",
        "description": "Corner radius of a column (defaults to --radius-lg)"
      },
      {
        "name": "--dashboard-column-color",
        "description": "Accent of a column: the dot before the title (the color prop sets it for a custom CSS color)"
      },
      {
        "name": "--dashboard-card-gap",
        "description": "Space between the cards of a column (defaults to --space-2)"
      },
      {
        "name": "--dashboard-count-background",
        "description": "Background of the count badge (defaults to --surface-color)"
      },
      {
        "name": "--dashboard-count-color",
        "description": "Text color of the count badge (defaults to --text-secondary-color)"
      },
      {
        "name": "--dashboard-drop-indicator-color",
        "description": "Color of the drop line and of the column a dragged card would land in (defaults to --primary-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

DashboardColumns 是一个带标签、可用键盘滚动的区域，内含 DashboardColumn；每一列是以标题和计数命名的分组，列中的卡片（这里使用 minerva Card）构成一个列表。这里卡片通过自己的操作（按钮或菜单）移动；可拖放的面板见“拖放”示例。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/demos/basic.tsx

```tsx
import { useState } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  DashboardColumns,
  DashboardColumn,
  Tag,
} from "minerva-design";

type Status = "todo" | "doing" | "done";
interface Task {
  id: number;
  title: string;
  owner: string;
  status: Status;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
const NEXT: Record<Status, Status | undefined> = {
  todo: "doing",
  doing: "done",
  done: undefined,
};
const titleOf = (status: Status) =>
  COLUMNS.find((column) => column.status === status)!.title;

export default function BasicDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Write the onboarding guide",
      owner: "Ada",
      status: "todo",
    },
    { id: 2, title: "Audit color contrast", owner: "Lin", status: "todo" },
    { id: 3, title: "Ship the billing page", owner: "Sam", status: "doing" },
    { id: 4, title: "Set up error tracking", owner: "Ada", status: "done" },
  ]);
  // Cards move with their own actions here (draggable boards: drag-drop demo).
  const advance = (id: number) =>
    setTasks((all) =>
      all.map((task) =>
        task.id === id && NEXT[task.status]
          ? { ...task, status: NEXT[task.status]! }
          : task,
      ),
    );

  return (
    <DashboardColumns aria-label="Sprint 12">
      {COLUMNS.map((column) => {
        const items = tasks.filter((task) => task.status === column.status);
        return (
          <DashboardColumn
            key={column.status}
            title={column.title}
            count={items.length}
          >
            {items.map((task) => (
              <Card key={task.id} padding="small">
                <CardTitle as="h4">{task.title}</CardTitle>
                <CardDescription>
                  <Tag size="small">{task.owner}</Tag>
                </CardDescription>
                {NEXT[task.status] ? (
                  <Button
                    size="small"
                    variant="ghost"
                    onClick={() => advance(task.id)}
                    aria-label={`Move to ${titleOf(NEXT[task.status]!)}: ${task.title}`}
                  >
                    Move to {titleOf(NEXT[task.status]!)}
                  </Button>
                ) : null}
              </Card>
            ))}
          </DashboardColumn>
        );
      })}
    </DashboardColumns>
  );
}

```

## Example: 颜色与计数

color 在标题前显示一个强调色圆点：可以是主题色（primary、success、warning、danger、info、neutral）或任意 CSS 颜色。count 显示一个徽标，并随标题一同朗读。columnWidth 和 gap 控制列的尺寸；在窄屏上列保持宽度，面板滚动时按列吸附。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/demos/colors.tsx

```tsx
import { Card, DashboardColumns, DashboardColumn } from "minerva-design";

const columns = [
  { title: "Backlog", color: "neutral", cards: ["Collect feedback"] },
  { title: "Ready", color: "info", cards: ["Pricing page copy"] },
  { title: "In progress", color: "primary", cards: ["Search API", "Avatars"] },
  { title: "Review", color: "warning", cards: ["Dark mode"] },
  { title: "Blocked", color: "danger", cards: ["SSO with Okta"] },
  { title: "Done", color: "success", cards: ["Release 2.4"] },
  { title: "Research", color: "#7c3aed", cards: ["Interview users"] },
];

export default function ColorsDemo() {
  return (
    <DashboardColumns aria-label="Product roadmap" columnWidth={220} gap={8}>
      {columns.map((column) => (
        <DashboardColumn
          key={column.title}
          title={column.title}
          count={column.cards.length}
          color={column.color}
        >
          {column.cards.map((card) => (
            <Card key={card} padding="small">
              {card}
            </Card>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}

```

## Example: 拖放

draggable 让带键（value）列中的 DashboardCard 可以拖动：使用鼠标、在触摸屏上长按，或使用键盘（在聚焦的卡片上按空格键或回车键拿起，方向键移动，再按空格键或回车键放下，Esc 取消；每一步都会播报）。面板从不自行重排：onCardMove 报告 { cardKey, fromColumn, fromIndex, toColumn, toIndex }，由 moveDashboardCard（minerva-design/core）应用到你的列表。canDrop 可拒绝某些位置：这里“进行中”最多 2 张卡片。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/demos/drag-drop.tsx

```tsx
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  Tag,
  type DashboardCardMove,
} from "minerva-design";
import { moveDashboardCard } from "minerva-design/core";

type Status = "todo" | "doing" | "done";
interface Task {
  id: string;
  title: string;
  owner: string;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];
/** Work in progress limit of "Doing" */
const LIMIT = 2;

export default function DragDropDemo() {
  const [lists, setLists] = useState<Record<Status, Task[]>>({
    todo: [
      { id: "guide", title: "Write the onboarding guide", owner: "Ada" },
      { id: "contrast", title: "Audit color contrast", owner: "Lin" },
      { id: "search", title: "Index the docs search", owner: "Sam" },
    ],
    doing: [{ id: "billing", title: "Ship the billing page", owner: "Sam" }],
    done: [{ id: "errors", title: "Set up error tracking", owner: "Ada" }],
  });

  // The board is controlled: it reports the move, the app applies it.
  const onCardMove = (move: DashboardCardMove) =>
    setLists(
      (current) =>
        moveDashboardCard(current, move, (task) => task.id) as Record<
          Status,
          Task[]
        >,
    );
  // A full "Doing" column takes no more cards (it can still be reordered).
  const canDrop = (move: DashboardCardMove) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    lists.doing.length < LIMIT;

  return (
    <DashboardColumns
      aria-label="Sprint 12"
      draggable
      onCardMove={onCardMove}
      canDrop={canDrop}
    >
      {COLUMNS.map((column) => (
        <DashboardColumn
          key={column.status}
          value={column.status}
          title={column.title}
          count={lists[column.status].length}
          description={
            column.status === "doing" ? `At most ${LIMIT} cards` : undefined
          }
        >
          {lists[column.status].map((task) => (
            <DashboardCard key={task.id} value={task.id} label={task.title}>
              <Card padding="small">
                <CardTitle as="h4">{task.title}</CardTitle>
                <CardDescription>
                  <Tag size="small">{task.owner}</Tag>
                </CardDescription>
              </Card>
            </DashboardCard>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}

```

## Example: 空状态、操作与页脚

actions 位于列头末端（例如添加按钮），description 位于列头下方，footer 位于卡片下方。没有卡片的列显示 empty（默认是已翻译的“暂无项目”）。fill 会在列放得下时等分拉伸它们。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/demos/empty-actions.tsx

```tsx
import { useState } from "react";
import {
  Button,
  Card,
  DashboardColumns,
  DashboardColumn,
} from "minerva-design";

export default function EmptyActionsDemo() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const add = () => setIdeas((all) => [...all, `Idea ${all.length + 1}`]);

  return (
    <DashboardColumns aria-label="Ideas" fill>
      <DashboardColumn
        title="Ideas"
        count={ideas.length}
        description="Anything worth exploring"
        actions={
          <Button size="small" variant="ghost" onClick={add}>
            Add
          </Button>
        }
        empty="No ideas yet: use Add to create one."
        footer={
          ideas.length > 0 ? (
            <Button
              size="small"
              variant="outline"
              color="neutral"
              onClick={() => setIdeas([])}
            >
              Clear column
            </Button>
          ) : null
        }
      >
        {ideas.map((idea) => (
          <Card key={idea} padding="small">
            {idea}
          </Card>
        ))}
      </DashboardColumn>
      <DashboardColumn title="Archived" count={0} />
    </DashboardColumns>
  );
}

```

## Example: 固定高度

height 或 maxHeight 限制面板高度：面板横向滚动的同时，每一列的内容区纵向滚动。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/demos/fixed-height.tsx

```tsx
import { Card, DashboardColumns, DashboardColumn } from "minerva-design";

const cards = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix} ${index + 1}`);

const columns = [
  { title: "Inbox", color: "info", cards: cards("Ticket", 12) },
  { title: "Triaged", color: "warning", cards: cards("Bug", 5) },
  { title: "Fixed", color: "success", cards: cards("Fix", 8) },
];

export default function FixedHeightDemo() {
  return (
    <DashboardColumns aria-label="Support queue" height={320}>
      {columns.map((column) => (
        <DashboardColumn
          key={column.title}
          title={column.title}
          count={column.cards.length}
          color={column.color}
        >
          {column.cards.map((card) => (
            <Card key={card} padding="small">
              {card}
            </Card>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}

```
