# IconButton

Un bouton compact qui n'affiche qu'une icône. Avec pressed / defaultPressed, il devient un bouton bascule (favori, j'aime, muet...).

Package: minerva-design@1.20.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## IconButton

Support: beta

Semantic color/variant/size/shape, icon slot/loading guards, controlled/default pressed toggle, accessible label and configured long-press tooltip. Native long press replaces hover/focus tooltip and browser focusable loading semantics. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/icon-button/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "ghost"
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "neutral"
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": "circle"
  },
  {
    "name": "pressed",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultPressed",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "toggle",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "showTooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "{}",
    "description": "Enabled activation."
  },
  {
    "name": "pressedchange",
    "typeText": "{ pressed: boolean }",
    "description": "Requested toggle state; controlled owners retain authority."
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
  "css:IconButton": {
    "kind": "cssVars",
    "source": "react/src/components/IconButton",
    "vars": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
