# SegmentedControl

A single-choice segmented switch for modes and filters, with a thumb sliding under the selected segment. Use Tabs when each choice has its own content panel.

Package: minerva-design@1.23.2

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## SegmentedControl

Support: beta

Single-choice segmented switch from string/object options (icon, label, disabled, aria-label), controlled/uncontrolled value, three sizes, neutral/primary thumb, fullWidth, disabled and an equal-width sliding thumb. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports roving arrows (left-to-right only) and Home/End selection; native hosts use touch selection. Segments always share the width equally. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "array",
    "typeText": "readonly SegmentedControlOption<NoInfer<T>>[]",
    "typeRef": "type:6fc9fecba63c58a9657e",
    "required": true,
    "description": "The segments: strings or option objects"
  },
  {
    "name": "value",
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "object",
    "typeText": "NoInfer<T> | undefined",
    "typeRef": "type:0a3cd3e425b13b6714df",
    "required": false,
    "description": "Selected value (controlled)"
  },
  {
    "name": "defaultValue",
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "object",
    "typeText": "NoInfer<T> | undefined",
    "typeRef": "type:0a3cd3e425b13b6714df",
    "required": false,
    "description": "Initially selected value (uncontrolled)"
  },
  {
    "name": "size",
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false,
    "description": "Segment density (default \"medium\")"
  },
  {
    "name": "color",
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "enum",
    "values": [
      "neutral",
      "primary"
    ],
    "typeText": "\"neutral\" | \"primary\" | undefined",
    "typeRef": "type:955270a64c25290976a0",
    "required": false,
    "description": "Thumb color (default \"neutral\")"
  },
  {
    "name": "fullWidth",
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Fills the width of the container (default false)"
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Blocks every segment (default false)"
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
    "source": "packages/taro/src/segmented-control.tsx",
    "kind": "function",
    "typeText": "((value: T) => void) | undefined",
    "typeRef": "type:43cbb9556e0acb62513d",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "T",
        "typeRef": "type:5d582ce9628cfd6fd060"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the selected value"
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
