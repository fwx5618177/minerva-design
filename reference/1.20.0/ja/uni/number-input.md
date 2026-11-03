# NumberInput 数値入力

矢印キーでのステップ、任意のステッパー、min / max の制限、固定精度を備えた数値フィールド（spinbutton）。値はフォーカス喪失または Enter で確定します。

Package: minerva-design@1.20.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## NumberInput

Support: beta

Shared core number parsing/formatting/clamping; intermediate drafts; blur/confirm-only commit; nullable empty value; precision from step; optional steppers; controlled rejection; disabled/readonly. Uni additionally H5 keyboard stepping. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "NumberInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number | null | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "number | null | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "number | null | undefined",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "step",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "precision",
    "typeText": "number | undefined",
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
    "name": "showStepper",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "allowEmpty",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "incrementLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "decrementLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "notANumberMessage",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "belowMinMessage",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "aboveMaxMessage",
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
    "typeText": "any[]"
  },
  {
    "name": "update:modelValue",
    "typeText": "any[]"
  },
  {
    "name": "blur",
    "typeText": "any[]"
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
  "css:NumberInput": {
    "kind": "cssVars",
    "source": "react/src/components/NumberInput",
    "vars": [
      {
        "name": "--number-input-height",
        "description": "Height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--number-input-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--number-input-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--number-input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--number-input-background",
        "description": "Background color"
      },
      {
        "name": "--number-input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--number-input-stepper-width",
        "description": "Width of the increment / decrement column"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
