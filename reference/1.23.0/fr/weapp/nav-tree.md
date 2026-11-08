# NavTree

Navigation latérale avec sections, branches dépliables, élément actif et mode compact à icônes. Les flèches déplacent le focus et ouvrent ou ferment les branches.

Package: minerva-design@1.23.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## NavTree

Support: beta

React sections/id and legacy items/value schemas, active ancestor expansion, controlled/default expanded ids, collapsed/wrapped labels, descriptions/icons, query and configured filtering, guarded item selection and native page navigation. Use native page URLs for href. React router renderLink is represented by native selection events and slots; DOM link rendering is not supported. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/nav-tree/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "items",
    "typeText": "array",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "expandedKeys",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sections",
    "typeText": "array",
    "required": false
  },
  {
    "name": "activeId",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "expandedIds",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultExpandedIds",
    "typeText": "array",
    "required": false
  },
  {
    "name": "defaultExpandedKeys",
    "typeText": "array",
    "required": false
  },
  {
    "name": "collapsed",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "wrapLabels",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "query",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "searchable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "searchPlaceholder",
    "typeText": "string",
    "required": false,
    "default": "Search navigation"
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "default": "No results"
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "select",
    "typeText": "{ value: string; item: TreeItem }",
    "description": "Original tree item."
  },
  {
    "name": "expandchange",
    "typeText": "{ expandedKeys: string[]; expandedIds: string[] }",
    "description": "Requested expanded node identifiers."
  },
  {
    "name": "filterchange"
  }
]
```

### slots

```json
[
  {
    "name": "default"
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
        "description": "Color of the optional indent guide of an expanded branch (defaults to transparent)"
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
