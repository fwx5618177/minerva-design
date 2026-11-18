# Stack 堆叠

弹性布局基础组件（Stack、HStack、VStack），支持基于令牌的间距、分隔符和相连组。子元素不会被额外包裹。

Package: minerva-design@1.23.2

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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
