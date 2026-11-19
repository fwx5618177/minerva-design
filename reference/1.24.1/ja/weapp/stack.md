# Stack スタック

トークンベースの間隔、区切り、連結グループを備えたフレックスレイアウトの基本コンポーネント（Stack、HStack、VStack）。子要素はラッパーで包まれません。

Package: minerva-design@1.24.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.1",
  "sourceCommit": "047f9c5959d145a99ef0fc64e0f45b2576a52272",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:6b85000d2c44f8f86c14aa56a8104e251bc0f90185b40c286ffbdc93cc63c2f6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.1/types.json) or getType() from minerva-design/contracts.

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
