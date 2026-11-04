# SegmentedControl 分段控制器

用于切换模式和筛选条件的单选分段开关，滑块会滑动到选中的分段下方。若每个选项都有各自的内容面板，请使用 Tabs。

Package: minerva-design@1.20.3

Renderer: uni

Locale: zh

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

## SegmentedControl

Support: beta

Single-choice segmented switch from string/object options (text icon, label, disabled, aria-label); controlled/default value (v-model) with change events; three sizes, neutral/primary thumb, fullWidth and disabled; radiogroup/radio semantics with an equal-width sliding thumb, arrow keys that move and select (skipping disabled segments, RTL-aware) and Home/End. Icons are text only and there is no hidden form input; keyboard metadata and native touch actions are implemented; device focus/geometry still require validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SegmentedControl"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "typeText": "readonly SegmentedControlOption[] | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"neutral\" | undefined",
    "required": false
  },
  {
    "name": "fullWidth",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
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
  "css:SegmentedControl": {
    "kind": "cssVars",
    "source": "react/src/components/SegmentedControl",
    "vars": [
      {
        "name": "--segmented-control-height",
        "description": "Height of the control (defaults to the density's control height)"
      },
      {
        "name": "--segmented-control-padding",
        "description": "Space between the track and the segments (defaults to 2px)"
      },
      {
        "name": "--segmented-control-radius",
        "description": "Corner radius of the track (defaults to --radius-md); the thumb follows it"
      },
      {
        "name": "--segmented-control-background",
        "description": "Background of the track (defaults to --surface-muted-color)"
      },
      {
        "name": "--segmented-control-color",
        "description": "Text color of the unselected segments"
      },
      {
        "name": "--segmented-control-item-padding-x",
        "description": "Inline padding of a segment"
      },
      {
        "name": "--segmented-control-thumb-background",
        "description": "Background of the thumb (defaults to --surface-elevated-color; --primary-color with color=\"primary\")"
      },
      {
        "name": "--segmented-control-thumb-shadow",
        "description": "Shadow of the thumb (defaults to --shadow-sm; none with color=\"primary\")"
      },
      {
        "name": "--segmented-control-selected-color",
        "description": "Text color of the selected segment"
      },
      {
        "name": "--segmented-control-duration",
        "description": "Duration of the thumb slide (defaults to --transition-base)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
