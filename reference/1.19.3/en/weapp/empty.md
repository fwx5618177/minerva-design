# Empty

Placeholder shown when there is no data to display.

Package: minerva-design@1.19.3

Renderer: weapp

Locale: en

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

## Empty

Support: beta

Native empty state with title/description, icon/action/secondaryAction/default slots, classic and three sized layouts, explicit geometry and shadow. useSvg renders a token-styled native geometric illustration; custom SVG/ReactNode content uses the icon slot. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/empty/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "default": "No data"
  },
  {
    "name": "description",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "showShadow",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "icon",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "useSvg",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### slots

```json
[
  {
    "name": "icon"
  },
  {
    "name": "action"
  },
  {
    "name": "secondaryAction"
  },
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:Empty": {
    "kind": "cssVars",
    "source": "react/src/components/Empty",
    "vars": [
      {
        "name": "--empty-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--empty-gap",
        "description": "Space between the icon, title, description and actions (sized layout)"
      },
      {
        "name": "--empty-icon-size",
        "description": "Size of the illustration icon (every size)"
      },
      {
        "name": "--empty-color",
        "description": "Text color of the description"
      },
      {
        "name": "--empty-background",
        "description": "Background of the framed (unsized) layout"
      },
      {
        "name": "--empty-radius",
        "description": "Corner radius of the framed (unsized) layout (defaults to --radius-sm)"
      },
      {
        "name": "--empty-description-max-width",
        "description": "Maximum width of the description (sized layout)"
      },
      {
        "name": "--empty-icon-background",
        "description": "Background of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-border-color",
        "description": "Ring color of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-radius",
        "description": "Corner radius of the icon tile (sized layout; defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
