# List 列表

基于原生 ul / li 的简洁操作列表，包含主次文本、装饰图标和尾部操作。

Package: minerva-design@1.22.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Cell

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## CellGroup

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## List

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "List"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "density",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "default"
    ],
    "typeText": "ListDensity | undefined",
    "typeRef": "type:a6dbabc2f84a66e7026d",
    "default": "default",
    "required": false,
    "description": "Minimum row height and vertical padding (56px / 12px, 40px / 8px or 72px / 16px)"
  },
  {
    "name": "bordered",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Frames the list as a card (full border, rounded corners, surface background) whose rows are tinted on hover and while a control inside them has the focus"
  },
  {
    "name": "dividers",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws token-colored separators between adjacent rows"
  },
  {
    "name": "role",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "union",
    "typeText": "AriaRole | undefined",
    "typeRef": "type:40806c1dba45f4ea6730",
    "default": "list",
    "required": false,
    "description": "List role; kept explicit so Safari / VoiceOver keep list semantics after the markers are removed"
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

## ListItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ListItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "primary",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Main content (medium weight)"
  },
  {
    "name": "secondary",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Supporting content, muted and smaller (0 is rendered)"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Decorative leading slot, hidden from assistive technologies"
  },
  {
    "name": "actions",
    "source": "packages/react/src/components/List/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Trailing controls, owned by the caller (bounded to 50% of the row)"
  }
]
```

## API

```json
{
  "ListProps": {
    "source": "react/src/components/List/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLUListElement>"
    ],
    "props": [
      {
        "name": "density",
        "type": "ListDensity",
        "required": false,
        "default": "\"default\"",
        "description": "Minimum row height and vertical padding (56px / 12px, 40px / 8px or 72px / 16px)"
      },
      {
        "name": "bordered",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Frames the list as a card (full border, rounded corners, surface background) whose rows are tinted on hover and while a control inside them has the focus"
      },
      {
        "name": "dividers",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws token-colored separators between adjacent rows"
      },
      {
        "name": "role",
        "type": "React.AriaRole",
        "required": false,
        "default": "\"list\"",
        "description": "List role; kept explicit so Safari / VoiceOver keep list semantics after the markers are removed"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLUListElement>",
        "required": false,
        "description": "Ref to the <ul> element"
      }
    ]
  },
  "ListItemProps": {
    "source": "react/src/components/List/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<LiHTMLAttributes<HTMLLIElement>, \"children\">"
    ],
    "props": [
      {
        "name": "primary",
        "type": "React.ReactNode",
        "required": true,
        "description": "Main content (medium weight)"
      },
      {
        "name": "secondary",
        "type": "React.ReactNode",
        "required": false,
        "description": "Supporting content, muted and smaller (0 is rendered)"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Decorative leading slot, hidden from assistive technologies"
      },
      {
        "name": "actions",
        "type": "React.ReactNode",
        "required": false,
        "description": "Trailing controls, owned by the caller (bounded to 50% of the row)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLLIElement>",
        "required": false,
        "description": "Ref to the <li> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:List": {
    "kind": "cssVars",
    "source": "react/src/components/List",
    "vars": [
      {
        "name": "--list-item-min-height",
        "description": "Minimum height of an item (follows the density; compact lists are shorter)"
      },
      {
        "name": "--list-item-padding-y",
        "description": "Vertical padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-padding-x",
        "description": "Horizontal padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--list-divider-color",
        "description": "Color of the dividers between items"
      },
      {
        "name": "--list-icon-size",
        "description": "Size of the leading icon slot"
      },
      {
        "name": "--list-border-color",
        "description": "Border color of a bordered list (defaults to --border-color)"
      },
      {
        "name": "--list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--list-item-hover-background",
        "description": "Background of a row of a bordered list on hover / while a control inside it has the focus"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

列表包含 iPhone 16 与 MacBook Air。每个 Delete 操作只删除对应设备。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/list/demos/basic.tsx

```tsx
import { useState } from "react";
import { IconButton, List, ListItem } from "minerva-design";
import { LuSmartphone, LuTrash2 } from "react-icons/lu";

const initialDevices = [
  { id: "phone", name: "iPhone 16", lastUsed: "Used 2 hours ago" },
  { id: "laptop", name: "MacBook Air", lastUsed: "Used yesterday" },
];

export default function BasicDemo() {
  const [devices, setDevices] = useState(initialDevices);
  return (
    <List aria-label="Registered devices" style={{ width: "100%" }}>
      {devices.map((device) => (
        <ListItem
          key={device.id}
          icon={<LuSmartphone />}
          primary={<span id={`device-${device.id}`}>{device.name}</span>}
          secondary={device.lastUsed}
          actions={
            <IconButton
              aria-label={`Delete ${device.name}`}
              onClick={() =>
                setDevices((prev) => prev.filter((d) => d.id !== device.id))
              }
              aria-describedby={`device-${device.id}`}
            >
              <LuTrash2 />
            </IconButton>
          }
        />
      ))}
    </List>
  );
}

```

## Example: 带边框卡片

bordered 将列表包装为卡片，行在悬停或内部控件获得焦点时着色；density="comfortable" 让行更高。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/list/demos/bordered.tsx

```tsx
import { Button, List, ListItem } from "minerva-design";
import { LuGitBranch } from "react-icons/lu";

const branches = [
  { id: "main", name: "main", meta: "Production · deployed 3 min ago" },
  { id: "preview", name: "feat/checkout", meta: "Preview · 2 commits ahead" },
  { id: "docs", name: "docs/install", meta: "Preview · building" },
];

export default function BorderedDemo() {
  return (
    <List
      bordered
      density="comfortable"
      aria-label="Branches"
      style={{ maxWidth: 560 }}
    >
      {branches.map((branch) => (
        <ListItem
          key={branch.id}
          icon={<LuGitBranch />}
          primary={<span id={`branch-${branch.id}`}>{branch.name}</span>}
          secondary={branch.meta}
          actions={
            <Button
              size="small"
              variant="outline"
              aria-describedby={`branch-${branch.id}`}
            >
              Visit
            </Button>
          }
        />
      ))}
    </List>
  );
}

```

## Example: 紧凑密度

density="compact" 降低行最小高度；也可以关闭分隔线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/list/demos/compact.tsx

```tsx
import { List, ListItem } from "minerva-design";

export default function CompactDemo() {
  return (
    <List density="compact" dividers={false} aria-label="Queue totals">
      <ListItem primary="Pending" secondary={0} />
      <ListItem primary="Completed" secondary={24} />
    </List>
  );
}

```
