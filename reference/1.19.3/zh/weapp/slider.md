# Slider 滑块

沿轨道拖动选择一个数值，或用两个滑块选择区间：支持步长或刻度、数值标签和提示气泡，并在用户松手时单独触发事件。

Package: minerva-design@1.19.3

Renderer: weapp

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

Custom touch slider (not the host slider) with one or two non-crossing thumbs, min/max/step or marks-only snapping, step or labelled marks, controlled/default value with change { value } while dragging and changeend { value } on release, five colors, three sizes, value label, drag tooltip, formatValue/getAriaValueText through configure(), hidden named inputs and form context disabled/readOnly/invalid. The track is measured with createSelectorQuery on touch start (cached afterwards). Horizontal sliders are left-to-right only; orientation vertical runs the track bottom (min) to top (max). There is no keyboard or adjustable screen-reader gesture on native views (stepThumb(key, index) steps programmatically). A range submits two inputs with the same name, which native forms collapse to one value. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/slider/index",
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
    "name": "invalid",
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
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "range",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "min",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "default": 100
  },
  {
    "name": "step",
    "typeText": "unknown",
    "required": false,
    "default": 1
  },
  {
    "name": "marks",
    "typeText": "unknown",
    "required": false,
    "default": false
  },
  {
    "name": "snapToMarks",
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
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "primary"
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": "horizontal"
  },
  {
    "name": "showValue",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
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
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "changeend",
    "typeText": "{ value: number | [number, number] }",
    "description": "Final value when the touch ends: save here."
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
