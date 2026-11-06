# JsonField JSON 字段

严格 JSON 文本域，带格式化按钮和无障碍语法反馈；格式化会保留数字、转义和键顺序。

Package: minerva-design@1.22.0

Renderer: weapp

Locale: zh

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

## JsonField

Support: beta

Controlled/default JSON text with every-edit change, syntax status/parser error, clamped indent formatting, toolbar/labels and Textarea visual props; legacy object mode retained. Native textarea keyboard and readonly differ from DOM textarea. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/json-field/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
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
    "name": "indent",
    "typeText": "number",
    "required": false,
    "default": 2
  },
  {
    "name": "hideToolbar",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "formatLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "validLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "invalidLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "rows",
    "typeText": "number",
    "required": false,
    "default": 8
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
    "default": "outline"
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "maxlength",
    "typeText": "number",
    "required": false,
    "default": -1
  },
  {
    "name": "required",
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
    "name": "change",
    "typeText": "{ value: string | Record<string, unknown> }",
    "description": "Every edit/format emits text; legacy object value mode emits parsed valid JSON only."
  },
  {
    "name": "error",
    "typeText": "{ message: string }",
    "description": "JSON syntax feedback."
  }
]
```

## CSS variables

```json
{
  "css:JsonField": {
    "kind": "cssVars",
    "source": "react/src/components/JsonField",
    "vars": [
      {
        "name": "--json-field-gap",
        "description": "Space between the toolbar, the editor and the status line"
      },
      {
        "name": "--json-field-font-family",
        "description": "Font family of the editor (defaults to the monospace stack)"
      },
      {
        "name": "--json-field-font-size",
        "description": "Font size of the editor"
      },
      {
        "name": "--json-field-tab-size",
        "description": "Rendered width of a tab character in the editor"
      },
      {
        "name": "--json-field-status-font-size",
        "description": "Font size of the validation status line"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
