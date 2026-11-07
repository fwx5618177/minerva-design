# Switch 开关

用于在开启和关闭两种状态之间切换，操作即时生效。

Package: minerva-design@1.23.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Switch

Support: beta

Native checked widget with controlled rejection rollback, real size/shape/semantic-color track and thumb, custom styles and icons, bilateral or segmented labels, loading/disabled/readOnly, labels and original native change event, Enter/Space interaction and a named native switch even in segmented mode. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Switch"
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
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
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
    "typeText": "\"square\" | \"round\" | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"slider\" | \"segmented\" | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "offLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "onLabel",
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
    "name": "labelPlacement",
    "typeText": "\"bottom\" | \"top\" | \"start\" | \"end\" | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ripple",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "trackStyle",
    "typeText": "CSSProperties | undefined",
    "required": false
  },
  {
    "name": "thumbStyle",
    "typeText": "CSSProperties | undefined",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "iconPlacement",
    "typeText": "\"start\" | \"end\" | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[checked: boolean, event?: unknown]",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      },
      {
        "name": "event",
        "position": 1,
        "typeText": "unknown",
        "required": false,
        "rest": false
      }
    ]
  },
  {
    "name": "update:checked",
    "typeText": "[checked: boolean]",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
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
    "name": "offLabel",
    "typeText": "{}"
  },
  {
    "name": "onLabel",
    "typeText": "{}"
  },
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
    "prop": "checked",
    "event": "update:checked",
    "syntax": "v-model:checked"
  }
]
```

## CSS variables

```json
{
  "css:Switch": {
    "kind": "cssVars",
    "source": "react/src/components/Switch",
    "vars": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
