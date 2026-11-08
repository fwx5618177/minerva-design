# Slider スライダー

トラックに沿ってドラッグして数値を、または 2 つのつまみで範囲を選択します。ステップや目盛り、値ラベルとツールチップに対応し、ユーザーが指を離したときに別のイベントを発火します。

Package: minerva-design@1.23.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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
