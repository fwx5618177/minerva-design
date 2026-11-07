# Input 输入框

单行文本输入框，支持尺寸、变体、前后缀内容、清除按钮、字数统计和密码显隐切换。放在 FormField 中即可获得标签、帮助文本和错误信息。

Package: minerva-design@1.22.1

Renderer: uni

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

## Input

Support: beta

Controlled/uncontrolled text input; native password visibility; clear action; character count; prefix/suffix slots; validation styling; field inheritance in uni. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Input"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "role",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabelledby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaDescribedby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaControls",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaExpanded",
    "typeText": "boolean | \"true\" | \"false\" | undefined",
    "required": false
  },
  {
    "name": "ariaActivedescendant",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaAutocomplete",
    "typeText": "\"none\" | \"inline\" | \"list\" | \"both\" | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "password",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "maxlength",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "maxLength",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "clearable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showCharCount",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "prefix",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "suffix",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "showPasswordLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hidePasswordLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "confirm",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "clear",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "focus",
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
  },
  {
    "name": "blur",
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
    "name": "prefix",
    "typeText": "{}"
  },
  {
    "name": "suffix",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  }
]
```

## CSS variables

```json
{
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
