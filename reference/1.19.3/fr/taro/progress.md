# ProgressIndicator

Indique une progression : une progressbar indéterminée dessinée en spinner, cercle, vague, barre ou barre pointillée, ou — avec value — une barre ou un cercle déterminés.

Package: minerva-design@1.19.3

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## ProgressIndicator

Support: beta

Axis-aware separators with length/spacing/text/elevation, Empty dimensions/shadow/accessible description/illustration/footer/actions, decorative or announced skeleton shapes/avatar/title/paragraph/pulse/wave, and five distinct themed progress variants/full width, plus determinate bar/circle value/max/showValue/format with clamped aria-valuenow. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Illustration is a token-colored SVG native image; image decoding and decorative animations require device validation. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "ProgressIndicator"
  ],
  "kind": "named"
}
```

### props

```json
[
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
  },
  {
    "name": "label",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/display.tsx",
    "kind": "enum",
    "values": [
      "bar",
      "circle",
      "dottedBar",
      "spinner",
      "wave"
    ],
    "typeText": "\"circle\" | \"wave\" | \"spinner\" | \"bar\" | \"dottedBar\" | undefined",
    "typeRef": "type:f8051e6644b4350d9ba0",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/display.tsx",
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
    "name": "color",
    "source": "packages/taro/src/display.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "decorative",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "icon",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "full",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "width",
    "source": "packages/taro/src/display.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/taro/src/display.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Current progress (bar / circle): switches to determinate mode"
  },
  {
    "name": "max",
    "source": "packages/taro/src/display.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Value that represents completion; non-positive falls back to 100"
  },
  {
    "name": "showValue",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the formatted value (a percentage by default)"
  },
  {
    "name": "format",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "((value: number, max: number) => ReactNode) | undefined",
    "typeRef": "type:2d535f595825ee36febb",
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
        "name": "max",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false,
    "description": "Formats the shown value; a string result is also the aria-valuetext"
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
  "css:ProgressIndicator": {
    "kind": "cssVars",
    "source": "react/src/components/ProgressIndicator",
    "vars": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
