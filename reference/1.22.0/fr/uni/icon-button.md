# IconButton

Un bouton compact qui n'affiche qu'une icône. Avec pressed / defaultPressed, il devient un bouton bascule (favori, j'aime, muet...).

Package: minerva-design@1.22.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## IconButton

Support: beta

Native labeled icon button with four sizes, semantic colors/variants/shapes, controlled/uncontrolled pressed, loading focusability and guards, icon slot and automatic/custom tooltip. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "IconButton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"outline\" | \"solid\" | \"ghost\" | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"xsmall\" | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"square\" | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "pressed",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultPressed",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showTooltip",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "{ content?: string | undefined; color?: \"info\" | \"success\" | \"warning\" | \"danger\" | \"neutral\" | undefined; variant?: \"subtle\" | \"solid\" | \"glass\" | undefined; shape?: \"rounded\" | \"default\" | \"square\" | \"thought\" | undefined; arrow?: boolean | undefined; } | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"submit\" | \"button\" | \"reset\" | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pressedChange",
    "typeText": "[pressed: boolean]",
    "parameters": [
      {
        "name": "pressed",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:pressed",
    "typeText": "[pressed: boolean]",
    "parameters": [
      {
        "name": "pressed",
        "position": 0,
        "typeText": "boolean",
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
    "name": "icon",
    "typeText": "{}"
  },
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "pressed",
    "event": "update:pressed",
    "syntax": "v-model:pressed"
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
