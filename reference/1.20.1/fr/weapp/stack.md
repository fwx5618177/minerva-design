# Stack

Primitives de mise en page flex (Stack, HStack, VStack) avec des espacements par jetons, des séparateurs et des groupes accolés. Les enfants ne sont pas enveloppés.

Package: minerva-design@1.20.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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
