# SegmentedControl

Un sélecteur segmenté à choix unique pour les modes et les filtres, avec un curseur qui glisse sous le segment sélectionné. Utilisez Tabs lorsque chaque choix a son propre panneau de contenu.

Package: minerva-design@1.19.3

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
    "typeRef": "type:f97e2be0214c0f21c3dc",
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
