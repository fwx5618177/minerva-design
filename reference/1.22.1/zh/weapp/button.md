# Button 按钮

用于触发一个操作或事件，例如提交表单或打开对话框。

Package: minerva-design@1.22.1

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Button

Support: beta

Five sizes; solid/outline/ghost/link; semantic colors; loading text; leading/trailing icon slots; native submit/reset; disabled; active; full width; shape/radius. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/button/index",
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
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "solid"
  },
  {
    "name": "formType",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "primary"
  },
  {
    "name": "fullWidth",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "active",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": "rounded"
  },
  {
    "name": "borderRadius",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "loadingText",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "startIcon",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "endIcon",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "click"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  },
  {
    "name": "default"
  },
  {
    "name": "default"
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
