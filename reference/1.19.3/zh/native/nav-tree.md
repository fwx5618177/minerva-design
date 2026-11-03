# NavTree 导航树

侧边栏导航：分组、可展开分支、当前项高亮以及仅图标的紧凑模式。方向键可在项目间移动并展开或收起分支。

Package: minerva-design@1.19.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## NavTree

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "NavTree"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "sections",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "array",
    "typeText": "NavTreeSection[]",
    "typeRef": "type:943aea703494b8e2aa25",
    "required": true
  },
  {
    "name": "activeId",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "collapsed",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "wrapLabels",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "defaultExpandedIds",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "array",
    "typeText": "string[] | undefined",
    "typeRef": "type:2f7bd52d63b79232027d",
    "required": false
  },
  {
    "name": "expandedIds",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "array",
    "typeText": "string[] | undefined",
    "typeRef": "type:2f7bd52d63b79232027d",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onExpandedChange",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "function",
    "typeText": "((ids: string[]) => void) | undefined",
    "typeRef": "type:494ddba62e2823c2abdd",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onItemSelect",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "function",
    "typeText": "((item: NavTreeItem) => void) | undefined",
    "typeRef": "type:d6b6289963c0bd2c3741",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "NavTreeItem",
        "typeRef": "type:bb1d7cce440a0bb4c5dd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenError",
    "source": "packages/native/src/components/NavTree/index.tsx",
    "kind": "function",
    "typeText": "((error: unknown) => void) | undefined",
    "typeRef": "type:5083c1afabd76e2f5f3c",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "unknown",
        "typeRef": "type:dc96c0cac9f2d6c9a926"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
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
  "native:NavTreeProps": {
    "source": "native/src/components/NavTree/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "sections",
        "type": "NavTreeSection[]",
        "required": true
      },
      {
        "name": "activeId",
        "type": "string",
        "required": false
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "wrapLabels",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "defaultExpandedIds",
        "type": "string[]",
        "required": false
      },
      {
        "name": "expandedIds",
        "type": "string[]",
        "required": false
      },
      {
        "name": "onExpandedChange",
        "type": "(ids: string[]) => void",
        "required": false
      },
      {
        "name": "onItemSelect",
        "type": "(item: NavTreeItem) => void",
        "required": false
      },
      {
        "name": "onOpenError",
        "type": "(error: unknown) => void",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:NavTree": {
    "kind": "cssVars",
    "source": "react/src/components/NavTree",
    "vars": [
      {
        "name": "--nav-tree-gap",
        "description": "Space between the sections"
      },
      {
        "name": "--nav-tree-item-height",
        "description": "Minimum height of a top-level row (defaults to the density's control height)"
      },
      {
        "name": "--nav-tree-item-padding-x",
        "description": "Horizontal padding of a row (follows the density's row padding)"
      },
      {
        "name": "--nav-tree-item-radius",
        "description": "Corner radius of a row (defaults to --radius-md)"
      },
      {
        "name": "--nav-tree-indent",
        "description": "Indentation of nested rows"
      },
      {
        "name": "--nav-tree-active-background",
        "description": "Background of the active row"
      },
      {
        "name": "--nav-tree-active-color",
        "description": "Accent color of the active row's icon"
      },
      {
        "name": "--nav-tree-hover-background",
        "description": "Background of a hovered row (defaults to --hover-color)"
      },
      {
        "name": "--nav-tree-guide-color",
        "description": "Color of the indent guide of an expanded branch (defaults to --border-color)"
      },
      {
        "name": "--nav-tree-guide-active-color",
        "description": "Color of the indent guide of the branch holding the active row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

包含当前项的分支会自动展开，手动收起后会被记住。项目可带图标、描述和尾部内容。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/native/basic.tsx

```tsx
import { useState } from "react";
import { NavTree } from "minerva-design/native";
export default function Basic() {
  const [active, setActive] = useState("overview");
  return (
    <NavTree
      activeId={active}
      onItemSelect={(item) => setActive(item.id)}
      sections={[
        {
          id: "workspace",
          title: "Workspace",
          items: [
            {
              id: "pages",
              label: "Pages",
              children: [
                { id: "overview", label: "Overview" },
                { id: "settings", label: "Settings" },
              ],
            },
          ],
        },
      ]}
    />
  );
}

```
