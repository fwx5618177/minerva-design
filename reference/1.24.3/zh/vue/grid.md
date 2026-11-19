# Grid 网格

使用原生移动控件和共享设计变量构建的网格。

Package: minerva-design@1.24.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "bbcef3f0abff568d08e734ec3e117c8cd10b017e",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:aa4b50ed4e7a53906ab6f39a3da2bbb4024583714e780e0cf99a262437a2babd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Grid

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## GridItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "GridItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Spans the full row of the surrounding grid",
    "typeText": "boolean"
  },
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Merges the item attributes and classes into its single child instead of\nrendering a wrapper div",
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
