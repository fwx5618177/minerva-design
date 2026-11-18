# Button 按钮

用于触发一个操作或事件，例如提交表单或打开对话框。

Package: minerva-design@1.24.0

Renderer: uni

Locale: zh

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

## Button

Support: beta

Five sizes; solid/outline/ghost/link; semantic colors; loading text; leading/trailing icon slots; native submit/reset; disabled; active; full width; shape/radius. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Button"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "loadingText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"xsmall\" | \"xlarge\" | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"outline\" | \"solid\" | \"link\" | \"ghost\" | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "fullWidth",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "active",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "borderRadius",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"submit\" | \"button\" | \"reset\" | undefined",
    "required": false
  },
  {
    "name": "startIcon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "endIcon",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: unknown]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "unknown",
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
    "name": "startIcon",
    "typeText": "{}"
  },
  {
    "name": "default",
    "typeText": "{}"
  },
  {
    "name": "endIcon",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:Button": {
    "kind": "cssVars",
    "source": "react/src/components/Button",
    "vars": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
