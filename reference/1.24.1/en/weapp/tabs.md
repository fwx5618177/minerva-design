# Tabs

Organizes content into panels shown one at a time. Accessible tabs with arrow-key navigation, line / enclosed / soft / pills variants, semantic colors and vertical orientation.

Package: minerva-design@1.24.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.1",
  "sourceCommit": "047f9c5959d145a99ef0fc64e0f45b2576a52272",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:6b85000d2c44f8f86c14aa56a8104e251bc0f90185b40c286ffbdc93cc63c2f6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tab

Support: n/a

Native composition uses Tabs: items[].value/label/disabled. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Tabs props/slots for the native equivalent.

## TabList

Support: n/a

Native composition uses Tabs: items list. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Tabs props/slots for the native equivalent.

## TabPanel

Support: n/a

Native composition uses Tabs: items[].content and parent-controlled default content slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Tabs props/slots for the native equivalent.

## Tabs

Support: beta

Controlled/default active value, four variants, semantic group/per-tab color, vertical/horizontal direction, disabled items, content/forceMount panels and named panel slots. Native tap replaces browser roving tab index and automatic/manual focus activation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/tabs/index",
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
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": "horizontal"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "line"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "primary"
  },
  {
    "name": "dir",
    "typeText": "string",
    "required": false,
    "default": "ltr"
  },
  {
    "name": "activationMode",
    "typeText": "string",
    "required": false,
    "default": "automatic"
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
    "name": "close"
  }
]
```

### slots

```json
[
  {
    "name": "{{item.value}}"
  },
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:Tabs": {
    "kind": "cssVars",
    "source": "react/src/components/Tabs",
    "vars": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
