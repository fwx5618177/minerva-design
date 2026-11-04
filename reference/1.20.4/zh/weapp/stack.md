# Stack 堆叠

弹性布局基础组件（Stack、HStack、VStack），支持基于令牌的间距、分隔符和相连组。子元素不会被额外包裹。

Package: minerva-design@1.20.4

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## HStack

Support: n/a

Native composition uses Stack: direction=horizontal. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Stack props/slots for the native equivalent.

## Stack

Support: beta

Horizontal/vertical flex, gap, alignment, justification and wrap; uni HStack/VStack. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/stack/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "string",
    "required": false,
    "default": "vertical"
  },
  {
    "name": "gap",
    "typeText": "number",
    "required": false,
    "default": 12
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "default": "stretch"
  },
  {
    "name": "justify",
    "typeText": "string",
    "required": false,
    "default": "flex-start"
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## VStack

Support: n/a

Native composition uses Stack: direction=vertical. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Stack props/slots for the native equivalent.

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
