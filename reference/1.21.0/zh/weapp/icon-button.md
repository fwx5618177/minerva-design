# IconButton 图标按钮

仅显示图标的紧凑按钮。设置 pressed / defaultPressed 后成为切换按钮（收藏、点赞、静音等）。

Package: minerva-design@1.21.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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
