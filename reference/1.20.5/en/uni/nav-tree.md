# NavTree

Sidebar navigation with sections, expandable branches, an active item and a compact icon-only mode. Arrow keys move between items and open or close branches.

Package: minerva-design@1.20.5

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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
