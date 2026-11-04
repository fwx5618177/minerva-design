# Stack 堆叠

弹性布局基础组件（Stack、HStack、VStack），支持基于令牌的间距、分隔符和相连组。子元素不会被额外包裹。

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

## HStack

Support: beta

Native Stack semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "align",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## Stack

Support: beta

Horizontal/vertical flex, gap, alignment, justification and wrap; uni HStack/VStack. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Stack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"vertical\" | \"horizontal\" | undefined",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "align",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## VStack

Support: beta

Native Stack semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "VStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "align",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:Stack": {
    "kind": "cssVars",
    "source": "react/src/components/Stack",
    "vars": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
