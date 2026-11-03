# NavTree ナビゲーションツリー

セクション、展開できる分岐、アクティブ項目、アイコンのみのコンパクトモードを備えたサイドバーナビゲーションです。矢印キーで項目間を移動し、分岐を開閉できます。

Package: minerva-design@1.19.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## NavTree

Support: beta

Section and item data, active ancestor expansion, controlled/default expandedIds, collapse intent, filtering, item/link scoped slots, disabled guards and native route navigation. External navigation uses consumer link slots/platform routing configuration. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "Section[] | undefined",
    "required": false
  },
  {
    "name": "items",
    "typeText": "Node[] | undefined",
    "required": false
  },
  {
    "name": "activeId",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "expandedIds",
    "typeText": "string[] | undefined",
    "required": false
  },
  {
    "name": "expandedKeys",
    "typeText": "string[] | undefined",
    "required": false
  },
  {
    "name": "defaultExpandedIds",
    "typeText": "string[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "collapsed",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "wrapLabels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "filter",
    "typeText": "string | ((node: Node) => boolean) | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[id: string]",
    "parameters": [
      {
        "name": "id",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "select",
    "typeText": "[id: string]",
    "parameters": [
      {
        "name": "id",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemSelect",
    "typeText": "[item: Node]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "Node",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "[ids: string[]]",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandChange",
    "typeText": "[ids: string[]]",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:expandedIds",
    "typeText": "[ids: string[]]",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "link",
    "typeText": "{ item: Node; state: { active: boolean; ancestorActive: boolean; expanded: boolean; depth: number; collapsed: boolean; hasChildren: boolean; disabled: boolean; className: string; }; select: () => void; }"
  },
  {
    "name": "item",
    "typeText": "{ item: Node; state: { active: boolean; ancestorActive: boolean; expanded: boolean; depth: number; collapsed: boolean; hasChildren: boolean; disabled: boolean; className: string; }; select: () => void; }"
  }
]
```

### bindings

```json
[
  {
    "prop": "expandedIds",
    "event": "update:expandedIds",
    "syntax": "v-model:expandedIds"
  }
]
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
