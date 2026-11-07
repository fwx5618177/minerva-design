# DashboardColumns ダッシュボード列

ダッシュボード上にカードを列で並べるボード。ワークフローの段階、パイプラインの工程、ステータス（未着手 / 進行中 / 完了）ごとに 1 列：タイトル・件数・アクセントカラーを持つ同じ幅の列、縦に並ぶカード、ボード全体の横スクロール。draggable を指定すると、DashboardCard をマウス・タッチ・キーボードで列間および列内で移動できます。ボードは制御されたままです（onCardMove）。

Package: minerva-design@1.22.2

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## DashboardCard

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Key of the card, reported as `cardKey` by a draggable board"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the card in the announcements and, when draggable, its accessible name"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Title of the column (also its accessible name)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the column, reported as `fromColumn` / `toColumn` by a draggable board (columns without one take no cards)"
  },
  {
    "name": "count",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Number of items shown as a badge next to the title (and announced with the title); omit to hide the badge"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "union",
    "typeText": "DashboardColumnColor | undefined",
    "typeRef": "type:346e893bb2fab5bfdbfb",
    "required": false,
    "description": "Accent of the column (a dot before the title): a theme color or any color"
  },
  {
    "name": "description",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Supporting text under the header"
  },
  {
    "name": "actions",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Header controls on the end side (e.g. an add button)"
  },
  {
    "name": "empty",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content shown when the column has no cards"
  },
  {
    "name": "footer",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Footer below the cards (e.g. an \"Add card\" button)"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 288,
    "required": false,
    "description": "Width of every column, in device-independent pixels. With `fill` it is the minimum width: columns stretch equally when they fit"
  },
  {
    "name": "fill",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stretches the columns equally to fill the board when they fit (they keep `columnWidth` as their minimum width and scroll otherwise)"
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Space between the columns, in device-independent pixels"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Height of the board: the column bodies scroll vertically within it"
  },
  {
    "name": "maxHeight",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Maximum height of the board: the column bodies scroll vertically within it"
  },
  {
    "name": "draggable",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Lets the DashboardCard children of keyed columns (`value`) be dragged between and within columns: a long press picks a card up (the board stops scrolling), lifting the finger drops it; screen readers get \"Move up\" / \"Move down\" / \"Move to <column>\" actions on each card. The board is controlled: it reports the move (`onCardMove`) and the app moves the card in its data."
  },
  {
    "name": "canDrop",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "function",
    "typeText": "((move: DashboardCardMove) => boolean) | undefined",
    "typeRef": "type:c398137161d5c8728e9d",
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
    "description": "Whether a card may be dropped at a position: refused positions show no drop indicator and get no accessibility action"
  }
]
```

### events

```json
[
  {
    "name": "onCardMove",
    "source": "packages/native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "function",
    "typeText": "((move: DashboardCardMove) => void) | undefined",
    "typeRef": "type:ccd571d791bb090aea91",
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
  "native:DashboardColumnsProps": {
    "source": "native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "The columns (DashboardColumn)"
      },
      {
        "name": "columnWidth",
        "type": "number",
        "required": false,
        "default": "288",
        "description": "Width of every column, in device-independent pixels. With `fill` it is the minimum width: columns stretch equally when they fit"
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
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Space between the columns, in device-independent pixels"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "description": "Height of the board: the column bodies scroll vertically within it"
      },
      {
        "name": "maxHeight",
        "type": "number",
        "required": false,
        "description": "Maximum height of the board: the column bodies scroll vertically within it"
      },
      {
        "name": "draggable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Lets the DashboardCard children of keyed columns (`value`) be dragged between and within columns: a long press picks a card up (the board stops scrolling), lifting the finger drops it; screen readers get \"Move up\" / \"Move down\" / \"Move to <column>\" actions on each card. The board is controlled: it reports the move (`onCardMove`) and the app moves the card in its data."
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
        "description": "Whether a card may be dropped at a position: refused positions show no drop indicator and get no accessibility action"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the board (the horizontal ScrollView)"
      }
    ]
  },
  "native:DashboardColumnProps": {
    "source": "native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
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
        "description": "Accent of the column (a dot before the title): a theme color or any color"
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
        "description": "The cards: each child is wrapped in a role=\"listitem\" view"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the column"
      }
    ]
  },
  "native:DashboardCardProps": {
    "source": "native/src/components/DashboardColumns/DashboardColumns.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
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
        "default": "its text when it is a string, else `value`",
        "description": "Name of the card in the announcements and, when draggable, its accessible name"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Content of the card"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the card"
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

## Example: 基本的な使い方

DashboardColumns は DashboardColumn を含む、ラベル付きでキーボードでスクロールできる領域です。各列はタイトルと件数で名前が付いたグループで、カード（ここでは minerva の Card）はリストになります。ここではカードを独自の操作（ボタンやメニュー）で移動します。ドラッグできるボードは「ドラッグ＆ドロップ」を参照してください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/native/basic.tsx

```tsx
import { useState } from "react";
import { Text } from "react-native";
import {
  Button,
  Card,
  DashboardColumns,
  DashboardColumn,
} from "minerva-design/native";

type Status = "todo" | "doing" | "done";
const COLUMNS: { status: Status; title: string; color: string }[] = [
  { status: "todo", title: "To do", color: "neutral" },
  { status: "doing", title: "Doing", color: "primary" },
  { status: "done", title: "Done", color: "success" },
];
const NEXT: Record<Status, Status | undefined> = {
  todo: "doing",
  doing: "done",
  done: undefined,
};

export default function Basic() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Write the onboarding guide", status: "todo" as Status },
    { id: 2, title: "Ship the billing page", status: "doing" as Status },
    { id: 3, title: "Set up error tracking", status: "done" as Status },
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
    <DashboardColumns columnWidth={240} height={360}>
      {COLUMNS.map((column) => {
        const items = tasks.filter((task) => task.status === column.status);
        return (
          <DashboardColumn
            key={column.status}
            title={column.title}
            count={items.length}
            color={column.color}
          >
            {items.map((task) => (
              <Card key={task.id} padding="small">
                <Text>{task.title}</Text>
                {NEXT[task.status] ? (
                  <Button
                    size="small"
                    variant="ghost"
                    onPress={() => advance(task.id)}
                  >
                    Move on
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

## Example: ドラッグ＆ドロップ

draggable は、キー（value）付きの列にある DashboardCard をドラッグ可能にします。マウス、タッチ画面での長押し、またはキーボード（フォーカスしたカードで Space か Enter で持ち上げ、矢印キーで移動、Space か Enter で置き、Escape で取り消し。各操作は読み上げられます）で操作できます。ボード自身は並べ替えません。onCardMove が { cardKey, fromColumn, fromIndex, toColumn, toIndex } を通知し、moveDashboardCard（minerva-design/core）でリストに適用します。canDrop で位置を拒否できます。ここでは「進行中」は最大 2 枚です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/dashboard-columns/native/drag-drop.tsx

```tsx
import { useState } from "react";
import { Text } from "react-native";
import {
  Card,
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  type DashboardCardMove,
} from "minerva-design/native";
import { moveDashboardCard } from "minerva-design/core";

type Status = "todo" | "doing" | "done";
interface Task {
  id: string;
  title: string;
}

const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];

export default function DragDrop() {
  const [lists, setLists] = useState<Record<Status, Task[]>>({
    todo: [
      { id: "guide", title: "Write the onboarding guide" },
      { id: "contrast", title: "Audit color contrast" },
    ],
    doing: [{ id: "billing", title: "Ship the billing page" }],
    done: [{ id: "errors", title: "Set up error tracking" }],
  });
  // Long press a card, drag it and lift the finger; screen readers get
  // "Move up / Move down / Move to <column>" actions on each card.
  const onCardMove = (move: DashboardCardMove) =>
    setLists(
      (current) =>
        moveDashboardCard(current, move, (task) => task.id) as Record<
          Status,
          Task[]
        >,
    );
  return (
    <DashboardColumns
      columnWidth={240}
      height={360}
      draggable
      onCardMove={onCardMove}
    >
      {COLUMNS.map((column) => (
        <DashboardColumn
          key={column.status}
          value={column.status}
          title={column.title}
          count={lists[column.status].length}
        >
          {lists[column.status].map((task) => (
            <DashboardCard key={task.id} value={task.id} label={task.title}>
              <Card padding="small">
                <Text>{task.title}</Text>
              </Card>
            </DashboardCard>
          ))}
        </DashboardColumn>
      ))}
    </DashboardColumns>
  );
}

```
