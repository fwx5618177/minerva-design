# List

Quiet operational lists on native ul / li elements with primary and secondary text, a decorative icon and trailing actions.

Package: minerva-design@1.24.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.0",
  "sourceCommit": "db705542be0061d51c135e72566fe0abba4dd3d4",
  "sourceDigest": "sha256:ddf24b058620a47363c171d7a5d941ded5095e4c61225ecdcd3c9a4f29932128",
  "referenceSourceDigest": "sha256:868994bef86fb46d4fdff6c4dc3922a69254cd143c59b0400b1091300bf56a2b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Cell

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## CellGroup

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## List

Support: beta

Density, border/dividers, semantic list rows with primary/secondary/icon/actions including zero values, native per-row action slots and guarded itemclick. Serializable row values and slots replace arbitrary React children. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/list/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "array",
    "required": false
  },
  {
    "name": "divided",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "density",
    "typeText": "string",
    "required": false,
    "default": "default"
  },
  {
    "name": "bordered",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "dividers",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "role",
    "typeText": "string",
    "required": false,
    "default": "list"
  }
]
```

### events

```json
[
  {
    "name": "itemclick"
  }
]
```

### slots

```json
[
  {
    "name": "{{"
  },
  {
    "name": "default"
  }
]
```

## ListItem

Support: n/a

Native composition uses List: items[].primary/secondary/icon/actions/disabled; title/description aliases and per-row action slots. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use List props/slots for the native equivalent.

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
