# PageTabs

Une barre des pages ouvertes de l’application (navigation entre routes, pas une tablist ARIA) : l’application gère les routes, la fermeture et la protection des modifications non enregistrées. Les éléments sont des surfaces plates arrondies ; les titres longs sont tronqués et affichés en entier dans une infobulle ; la page courante reste visible et des boutons de défilement apparaissent quand la liste déborde.

Package: minerva-design@1.20.4

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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
