# Checkbox チェックボックス

1 つ以上の選択肢を選べるようにします。中間状態、エラー状態、カスタムスタイルに対応しています。

Package: minerva-design@1.23.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Checkbox

Support: beta

Controlled/uncontrolled checked and indeterminate states, owner rejection, semantic colors, size, shape, label placement, custom icon, helper/error text and required state. Browser form serialization is not provided by native view-based choices. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Checkbox"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultChecked",
    "typeText": "boolean | undefined",
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
    "name": "indeterminate",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
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
    "name": "color",
    "typeText": "\"info\" | \"success\" | \"warning\" | \"danger\" | \"primary\" | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"rounded\" | \"circle\" | \"square\" | undefined",
    "required": false
  },
  {
    "name": "labelPlacement",
    "typeText": "\"bottom\" | \"top\" | \"start\" | \"end\" | undefined",
    "required": false
  },
  {
    "name": "helperText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "error",
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
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "any[]"
  },
  {
    "name": "update:checked",
    "typeText": "any[]"
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
  },
  {
    "name": "errorIcon",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "checked",
    "event": "update:checked",
    "syntax": "v-model:checked"
  }
]
```

## CSS variables

```json
{
  "css:Checkbox": {
    "kind": "cssVars",
    "source": "react/src/components/Checkbox",
    "vars": [
      {
        "name": "--checkbox-checked-color",
        "description": "Background / border of the checked or indeterminate box (defaults to the color prop's accent)"
      },
      {
        "name": "--checkbox-checkmark-color",
        "description": "Color of the checkmark / indeterminate dash"
      },
      {
        "name": "--checkbox-box-color",
        "description": "Background of the unchecked box"
      },
      {
        "name": "--checkbox-border-color",
        "description": "Border of the unchecked box"
      },
      {
        "name": "--checkbox-size",
        "description": "Width and height of the box (every size)"
      },
      {
        "name": "--checkbox-radius",
        "description": "Corner radius of the box for the square and rounded shapes"
      },
      {
        "name": "--checkbox-gap",
        "description": "Space between the box and the label"
      },
      {
        "name": "--checkbox-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
