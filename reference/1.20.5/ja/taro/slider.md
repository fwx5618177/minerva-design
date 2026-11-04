# Slider スライダー

トラックに沿ってドラッグして数値を、または 2 つのつまみで範囲を選択します。ステップや目盛り、値ラベルとツールチップに対応し、ユーザーが指を離したときに別のイベントを発火します。

Package: minerva-design@1.20.5

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Slider

Support: beta

Custom touch slider (not the host slider) with one or two non-crossing thumbs, min/max/step or marks-only snapping, step or labelled marks, controlled/uncontrolled value, onChange while dragging and onChangeEnd on release, five colors, three sizes, value label, drag tooltip, hidden named inputs and FormControl disabled/readOnly/invalid. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. The track is measured with createSelectorQuery on touch start (cached afterwards; a layout change is picked up on the next touch). Horizontal sliders are left-to-right only; orientation vertical runs the track bottom (min) to top (max). H5 supports arrow/PageUp/PageDown/Home/End keys on the focusable thumbs; native hosts use touch only and expose no adjustable accessibility actions. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "value",
    "source": "packages/taro/src/slider.tsx",
    "kind": "union",
    "typeText": "SliderValue | undefined",
    "typeRef": "type:57afcfaa304ddfd6ee22",
    "required": false,
    "description": "Value (controlled): a number, or `[start, end]` with `range`"
  },
  {
    "name": "defaultValue",
    "source": "packages/taro/src/slider.tsx",
    "kind": "union",
    "typeText": "SliderValue | undefined",
    "typeRef": "type:57afcfaa304ddfd6ee22",
    "required": false,
    "description": "Initial value (uncontrolled); defaults to min, or [min, max] with range"
  },
  {
    "name": "range",
    "source": "packages/taro/src/slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Two thumbs selecting `[start, end]` (default false)"
  },
  {
    "name": "min",
    "source": "packages/taro/src/slider.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Smallest value (default 0)"
  },
  {
    "name": "max",
    "source": "packages/taro/src/slider.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Largest value (default 100)"
  },
  {
    "name": "step",
    "source": "packages/taro/src/slider.tsx",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "required": false,
    "description": "Step between two values; `null` snaps to the marks only (default 1)"
  },
  {
    "name": "marks",
    "source": "packages/taro/src/slider.tsx",
    "kind": "union",
    "typeText": "boolean | SliderMark[] | undefined",
    "typeRef": "type:3b548a81416903c4a3b0",
    "required": false,
    "description": "Ticks: `{ value, label? }[]`, or `true` for one tick per step"
  },
  {
    "name": "snapToMarks",
    "source": "packages/taro/src/slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Snaps to the closest mark instead of the step (default false)"
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Blocks interaction (inherited from FormControl)"
  },
  {
    "name": "readOnly",
    "source": "packages/taro/src/slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value but blocks changes (inherited from FormControl)"
  },
  {
    "name": "size",
    "source": "packages/taro/src/slider.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false,
    "description": "Thumb and track size (default \"medium\")"
  },
  {
    "name": "color",
    "source": "packages/taro/src/slider.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "\"primary\" | \"success\" | \"info\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:c25c34698332c2581f51",
    "required": false,
    "description": "Accent of the filled track and the thumbs (default \"primary\")"
  },
  {
    "name": "showValue",
    "source": "packages/taro/src/slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value after the track (default false)"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value above the thumb while it is dragged (default false)"
  },
  {
    "name": "formatValue",
    "source": "packages/taro/src/slider.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:5e8152ed314b5a340403",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats a value for the labels and aria-valuetext"
  },
  {
    "name": "orientation",
    "source": "packages/taro/src/slider.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "typeRef": "type:4e4ac2a46972f482e8a6",
    "required": false,
    "description": "Direction of the track (default \"horizontal\"). A vertical track runs from min (bottom) to max (top); its length is `--slider-length` (default 160px)"
  },
  {
    "name": "name",
    "source": "packages/taro/src/slider.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the hidden form input(s) (H5 and native forms)"
  },
  {
    "name": "getAriaValueText",
    "source": "packages/taro/src/slider.tsx",
    "kind": "function",
    "typeText": "((value: number, index: number) => string) | undefined",
    "typeRef": "type:b0e7a2b263e3cddc3a36",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "aria-valuetext of a thumb (index 0, or 1 for the end thumb)"
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/taro/src/slider.tsx",
    "kind": "function",
    "typeText": "((value: SliderValue) => void) | undefined",
    "typeRef": "type:edafa8e822b9467dc2a3",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "SliderValue",
        "typeRef": "type:35ce1d2f89f8eab1e586"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new value while dragging and on each key press"
  },
  {
    "name": "onChangeEnd",
    "source": "packages/taro/src/slider.tsx",
    "kind": "function",
    "typeText": "((value: SliderValue) => void) | undefined",
    "typeRef": "type:198c8d54ca0df76e193b",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "SliderValue",
        "typeRef": "type:35ce1d2f89f8eab1e586"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the final value on touch release (or key press on H5)"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
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
