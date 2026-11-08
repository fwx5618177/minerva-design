# PageTabs

A strip of open application pages (route navigation, not an ARIA tablist): the application owns routes, closing and unsaved-change guards. Items are flat rounded surfaces; long titles are truncated and shown in full in a tooltip; the current page stays in view and scroll buttons appear when the list overflows.

Package: minerva-design@1.23.2

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## PageTab

Support: n/a

Native composition uses PageTabs items[].value/label/disabled/icon/closable/action/actionDisabled and select/close events. Native serialized data replaces authored React compound children. Use PageTabs props/slots for the native equivalent.

## PageTabs

Support: beta

Selected native page items, select/change and independent action events, disabled labels/actionDisabled, icons, measured overflow controls, active scroll-into-view and global actions slot. Native scroll-view replaces DOM scrolling and hover tooltips; serializable item content replaces ReactNode children. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/page-tabs/index",
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
    "name": "activeValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": "Open pages"
  },
  {
    "name": "scrollLeftLabel",
    "typeText": "string",
    "required": false,
    "default": "Scroll pages left"
  },
  {
    "name": "scrollRightLabel",
    "typeText": "string",
    "required": false,
    "default": "Scroll pages right"
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
    "typeText": "{ value: string }",
    "description": "Page label activation."
  },
  {
    "name": "close",
    "typeText": "{ value: string }",
    "description": "Separate action activation; item.disabled disables the label, item.actionDisabled disables the action."
  }
]
```

### slots

```json
[
  {
    "name": "actions"
  },
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:PageTabs": {
    "kind": "cssVars",
    "source": "react/src/components/PageTabs",
    "vars": [
      {
        "name": "--page-tabs-height",
        "description": "Height of the tab bar"
      },
      {
        "name": "--page-tabs-background",
        "description": "Background of the tab bar"
      },
      {
        "name": "--page-tabs-gap",
        "description": "Space between the tabs"
      },
      {
        "name": "--page-tabs-item-height",
        "description": "Height of a tab"
      },
      {
        "name": "--page-tabs-item-min-width",
        "description": "Minimum width of a tab"
      },
      {
        "name": "--page-tabs-item-max-width",
        "description": "Maximum width of a tab (the label truncates)"
      },
      {
        "name": "--page-tabs-item-radius",
        "description": "Corner radius of a tab (defaults to --radius-lg)"
      },
      {
        "name": "--page-tabs-selected-background",
        "description": "Background of the active tab"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
