# Slider

Pick a number, or a range with two thumbs, by dragging along a track: steps or marks, a value label and tooltip, and a separate event when the user lets go.

Package: minerva-design@1.20.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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
