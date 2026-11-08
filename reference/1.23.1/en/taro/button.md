# Button

Triggers an action or event, such as submitting a form or opening a dialog.

Package: minerva-design@1.23.1

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Button

Support: beta

Native button activation, disabled/loading guards, loading replacement, icons, semantic color, five sizes, variants, formType and shape. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Button"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "role",
    "source": "packages/taro/src/components.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/components.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/components.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "type",
    "source": "packages/taro/src/components.tsx",
    "kind": "enum",
    "values": [
      "button",
      "reset",
      "submit"
    ],
    "typeText": "\"button\" | \"submit\" | \"reset\" | undefined",
    "typeRef": "type:212fa332b39b336d0842",
    "required": false
  },
  {
    "name": "color",
    "source": "packages/taro/src/components.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/components.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xlarge",
      "xsmall"
    ],
    "typeText": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | \"xlarge\" | undefined",
    "typeRef": "type:39b57548678a1a395d43",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/components.tsx",
    "kind": "enum",
    "values": [
      "ghost",
      "link",
      "outline",
      "solid"
    ],
    "typeText": "\"solid\" | \"outline\" | \"ghost\" | \"link\" | undefined",
    "typeRef": "type:84a49802a939e0b70267",
    "required": false
  },
  {
    "name": "loadingText",
    "source": "packages/taro/src/components.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "startIcon",
    "source": "packages/taro/src/components.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "endIcon",
    "source": "packages/taro/src/components.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "fullWidth",
    "source": "packages/taro/src/components.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "active",
    "source": "packages/taro/src/components.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "shape",
    "source": "packages/taro/src/components.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "typeRef": "type:bc311df462bffff00236",
    "required": false
  },
  {
    "name": "borderRadius",
    "source": "packages/taro/src/components.tsx",
    "kind": "union",
    "typeText": "number | \"small\" | \"medium\" | \"large\" | \"square\" | \"circle\" | \"none\" | undefined",
    "typeRef": "type:bd65ca5756e74f0524fd",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## CSS variables

```json
{
  "css:Button": {
    "kind": "cssVars",
    "source": "react/src/components/Button",
    "vars": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
