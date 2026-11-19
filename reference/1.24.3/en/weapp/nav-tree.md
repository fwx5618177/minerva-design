# NavTree

Sidebar navigation with sections, expandable branches, an active item and a compact icon-only mode. Arrow keys move between items and open or close branches.

Package: minerva-design@1.24.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "bbcef3f0abff568d08e734ec3e117c8cd10b017e",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:aa4b50ed4e7a53906ab6f39a3da2bbb4024583714e780e0cf99a262437a2babd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

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
