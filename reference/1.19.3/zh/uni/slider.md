# Slider 滑块

沿轨道拖动选择一个数值，或用两个滑块选择区间：支持步长或刻度、数值标签和提示气泡，并在用户松手时单独触发事件。

Package: minerva-design@1.19.3

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Slider

Support: beta

Custom touch slider (not the built-in slider) with one or two non-crossing thumbs, min/max/step or marks-only snapping, step or labelled marks, controlled/default value (v-model) with change while dragging and changeEnd on release, five colors, three sizes, value label, drag tooltip, hidden named inputs, field inheritance and RTL mirroring. The track is measured with uni.createSelectorQuery on touch start (cached afterwards). Horizontal (RTL-mirrored) or vertical orientation (bottom = min, top = max). H5 supports arrow/PageUp/PageDown/Home/End keys on the focusable thumbs; native hosts use touch only. A range submits two inputs with the same name, which native forms collapse to one value. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Slider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "typeText": "SliderValue | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "SliderValue | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "SliderValue | undefined",
    "required": false
  },
  {
    "name": "range",
    "typeText": "boolean | undefined",
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
    "typeText": "number | null | undefined",
    "required": false
  },
  {
    "name": "marks",
    "typeText": "boolean | SliderMark[] | undefined",
    "required": false
  },
  {
    "name": "snapToMarks",
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
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"info\" | \"success\" | \"warning\" | \"danger\" | \"primary\" | undefined",
    "required": false
  },
  {
    "name": "showValue",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "formatValue",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\" | undefined",
    "required": false
  },
  {
    "name": "name",
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
    "name": "getAriaValueText",
    "typeText": "((value: number, index: number) => string) | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: SliderValue]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "SliderValue",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: SliderValue]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "SliderValue",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "changeEnd",
    "typeText": "[value: SliderValue]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "SliderValue",
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
  "css:Slider": {
    "kind": "cssVars",
    "source": "react/src/components/Slider",
    "vars": [
      {
        "name": "--slider-accent",
        "description": "Color of the filled track and of the thumb border (defaults to the color prop's accent)"
      },
      {
        "name": "--slider-rail-color",
        "description": "Background of the empty track"
      },
      {
        "name": "--slider-thumb-color",
        "description": "Background of the thumbs"
      },
      {
        "name": "--slider-track-height",
        "description": "Thickness of the track (every size)"
      },
      {
        "name": "--slider-thumb-size",
        "description": "Width and height of the thumbs (every size)"
      },
      {
        "name": "--slider-length",
        "description": "Length of a vertical slider"
      },
      {
        "name": "--slider-min-length",
        "description": "Smallest length of a horizontal track, like the intrinsic size of a native range input (defaults to 10rem)"
      },
      {
        "name": "--slider-gap",
        "description": "Space between the track and the value label"
      },
      {
        "name": "--slider-value-font-size",
        "description": "Font size of the value label and of the mark labels"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
