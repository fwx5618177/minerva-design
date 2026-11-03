# AnswerSheet 答题卡

练习与考试场景中的题号导航：按题型分组的编号胶囊，标示每题未作答、已作答、正确、错误或已跳过，支持标记待复查，并高亮当前题目。

Package: minerva-design@1.20.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## AnswerSheet

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "AnswerSheet"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "array",
    "typeText": "readonly AnswerSheetItem[]",
    "typeRef": "type:4e191edabeae0da103e4",
    "required": true,
    "description": "The questions, in order"
  },
  {
    "name": "groups",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "array",
    "typeText": "readonly AnswerSheetGroup[] | undefined",
    "typeRef": "type:e005b0e1a4d4bb7ebca9",
    "required": false,
    "description": "Titled sections, in display order; items render under the group whose key matches `item.group`"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the current question (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the initially current question (uncontrolled)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "AnswerSheetSize | undefined",
    "typeRef": "type:345531373672f1843ddb",
    "default": "medium",
    "required": false,
    "description": "Density of the pills"
  },
  {
    "name": "layout",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "enum",
    "values": [
      "scroll",
      "wrap"
    ],
    "typeText": "AnswerSheetLayout | undefined",
    "typeRef": "type:26401bff64a3d0ea3cb6",
    "default": "wrap",
    "required": false,
    "description": "\"wrap\" wraps the pills on several rows; \"scroll\" keeps a single horizontally scrolling row"
  },
  {
    "name": "columns",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Fixed number of columns (a grid; ArrowUp / ArrowDown move by a row). Ignored with layout=\"scroll\"."
  },
  {
    "name": "showLegend",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a legend of the statuses present (and of the flag)"
  },
  {
    "name": "showSummary",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the number of answered questions (\"12 / 20 answered\")"
  },
  {
    "name": "getItemLabel",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "function",
    "typeText": "((item: AnswerSheetItem, index: number) => string) | undefined",
    "typeRef": "type:473bf24d86dfb2768431",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AnswerSheetItem",
        "typeRef": "type:ae814d4c4b7cca8c6692"
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
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible name of a pill; receives the item and its display index"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the whole sheet"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the navigation landmark"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/AnswerSheet/types.ts",
    "kind": "function",
    "typeText": "((key: string) => void) | undefined",
    "typeRef": "type:b24349bbf469420253c4",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the key of the selected question"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "AnswerSheetProps": {
    "source": "react/src/components/AnswerSheet/types.ts",
    "description": "Props of the AnswerSheet component: a grid of numbered pills to jump between the questions of a practice or exam session, grouped by section, each with a status",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "items",
        "type": "readonly AnswerSheetItem[]",
        "required": true,
        "description": "The questions, in order"
      },
      {
        "name": "groups",
        "type": "readonly AnswerSheetGroup[]",
        "required": false,
        "description": "Titled sections, in display order; items render under the group whose key matches `item.group`"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Key of the current question (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Key of the initially current question (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(key: string) => void",
        "required": false,
        "description": "Called with the key of the selected question"
      },
      {
        "name": "size",
        "type": "AnswerSheetSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Density of the pills"
      },
      {
        "name": "layout",
        "type": "AnswerSheetLayout",
        "required": false,
        "default": "\"wrap\"",
        "description": "\"wrap\" wraps the pills on several rows; \"scroll\" keeps a single horizontally scrolling row"
      },
      {
        "name": "columns",
        "type": "number",
        "required": false,
        "description": "Fixed number of columns (a grid; ArrowUp / ArrowDown move by a row). Ignored with layout=\"scroll\"."
      },
      {
        "name": "showLegend",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a legend of the statuses present (and of the flag)"
      },
      {
        "name": "showSummary",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the number of answered questions (\"12 / 20 answered\")"
      },
      {
        "name": "getItemLabel",
        "type": "(item: AnswerSheetItem, index: number) => string",
        "required": false,
        "default": "\"Question <n>, <status>\" (translated)",
        "description": "Accessible name of a pill; receives the item and its display index"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the whole sheet"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Questions\" (translated)",
        "description": "Accessible name of the navigation landmark"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class of the root element"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root `nav` element"
      }
    ]
  },
  "AnswerSheetItem": {
    "source": "react/src/components/AnswerSheet/types.ts",
    "description": "A question of an AnswerSheet",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the question (the value of the sheet)"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "its number across all the groups (index + 1)",
        "description": "Visible label of the pill"
      },
      {
        "name": "status",
        "type": "AnswerSheetStatus",
        "required": false,
        "default": "\"unanswered\"",
        "description": "Status of the question"
      },
      {
        "name": "flagged",
        "type": "boolean",
        "required": false,
        "description": "Flags the question for review (a warning dot in a corner)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "The question can't be selected"
      },
      {
        "name": "group",
        "type": "string",
        "required": false,
        "description": "Key of its group (see `groups`); items without a known group render first, in an untitled section"
      }
    ]
  },
  "AnswerSheetGroup": {
    "source": "react/src/components/AnswerSheet/types.ts",
    "description": "A titled section of an AnswerSheet",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Key matched by `item.group`"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Visible title of the section"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:AnswerSheet": {
    "kind": "cssVars",
    "source": "react/src/components/AnswerSheet",
    "vars": [
      {
        "name": "--answer-sheet-gap",
        "description": "Space between the pills (defaults to --space-2; --space-1-5 with size=\"small\")"
      },
      {
        "name": "--answer-sheet-item-size",
        "description": "Minimum width and height of a pill (defaults to 2rem; 1.75rem with size=\"small\")"
      },
      {
        "name": "--answer-sheet-radius",
        "description": "Corner radius of the pills (defaults to --radius-md)"
      },
      {
        "name": "--answer-sheet-item-background",
        "description": "Background of an unanswered pill"
      },
      {
        "name": "--answer-sheet-answered-background",
        "description": "Background of an answered pill (defaults to --primary-color-subtle)"
      },
      {
        "name": "--answer-sheet-answered-color",
        "description": "Text color of an answered pill"
      },
      {
        "name": "--answer-sheet-correct-background",
        "description": "Background of a correct pill (defaults to --success-color-subtle)"
      },
      {
        "name": "--answer-sheet-correct-color",
        "description": "Text color of a correct pill"
      },
      {
        "name": "--answer-sheet-wrong-background",
        "description": "Background of a wrong pill (defaults to --danger-color-subtle)"
      },
      {
        "name": "--answer-sheet-wrong-color",
        "description": "Text color of a wrong pill"
      },
      {
        "name": "--answer-sheet-current-background",
        "description": "Background of the current pill (defaults to --primary-color)"
      },
      {
        "name": "--answer-sheet-current-color",
        "description": "Text color of the current pill"
      },
      {
        "name": "--answer-sheet-flag-color",
        "description": "Color of the flag dot (defaults to --warning-color)"
      },
      {
        "name": "--answer-sheet-title-color",
        "description": "Text color of the group titles and the summary"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

受控的当前题目（value / onChange）。答题卡是由按钮组成的 nav 地标，当前题目带 aria-current="step"。只有一个 Tab 停靠点：方向键与 Home / End 移动焦点，Enter / 空格选中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/demos/basic.tsx

```tsx
import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 5 ? "answered" : "unanswered",
}));

export default function BasicDemo() {
  const [value, setValue] = useState("q6");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet items={items} value={value} onChange={setValue} />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}

```

## Example: 分组、状态与图例

groups 为各分组设置标题（题目按 item.group 归入对应分组，题号跨分组连续编号）。状态：answered、correct、wrong、skipped；flagged 显示警示圆点。showSummary 统计已答题数，showLegend 说明出现过的状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/demos/groups.tsx

```tsx
import { useState } from "react";
import {
  AnswerSheet,
  type AnswerSheetGroup,
  type AnswerSheetItem,
} from "minerva-design";

const groups: AnswerSheetGroup[] = [
  { key: "single", title: "Single choice" },
  { key: "multiple", title: "Multiple choice" },
  { key: "short", title: "Short answer" },
];

const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "correct" },
  { key: "s3", group: "single", status: "wrong", flagged: true },
  { key: "s4", group: "single", status: "correct" },
  { key: "s5", group: "single", status: "skipped" },
  { key: "s6", group: "single", status: "correct" },
  { key: "m1", group: "multiple", status: "wrong" },
  { key: "m2", group: "multiple", status: "correct" },
  { key: "m3", group: "multiple", status: "answered", flagged: true },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short", disabled: true },
];

export default function GroupsDemo() {
  const [value, setValue] = useState("s3");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        groups={groups}
        value={value}
        onChange={setValue}
        showSummary
        showLegend
        aria-label="Review questions"
      />
      <p style={{ margin: 0 }}>Reviewing: {value}</p>
    </div>
  );
}

```

## Example: 横向滚动

layout="scroll" 保持单行横向滚动，适合放在题目上方作为紧凑导航。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/demos/scroll.tsx

```tsx
import { useState } from "react";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 40 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
  flagged: i === 8,
}));

export default function ScrollDemo() {
  const [value, setValue] = useState("q16");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 360 }}>
      <AnswerSheet
        items={items}
        value={value}
        onChange={setValue}
        layout="scroll"
        size="small"
      />
      <p style={{ margin: 0 }}>Current question: {value.slice(1)}</p>
    </div>
  );
}

```

## Example: 尺寸、列数与禁用

两种胶囊尺寸；columns 固定列数（ArrowUp / ArrowDown 按行移动；未设置时移动到上一行 / 下一行中最近的题号）；以及禁用的答题卡。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/demos/sizes.tsx

```tsx
import { AnswerSheet, type AnswerSheetItem } from "minerva-design";

const items: AnswerSheetItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: `q${i + 1}`,
  status: i < 4 ? "answered" : "unanswered",
}));

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 420 }}>
      <AnswerSheet
        items={items}
        size="small"
        defaultValue="q5"
        aria-label="Small sheet"
      />
      <AnswerSheet
        items={items}
        columns={5}
        defaultValue="q5"
        aria-label="Five columns"
      />
      <AnswerSheet items={items} disabled aria-label="Disabled sheet" />
    </div>
  );
}

```
