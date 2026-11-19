# Grid グリッド

ネイティブの操作と共通デザイントークンを使うグリッド。

Package: minerva-design@1.24.2

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.2",
  "sourceCommit": "2d9157080afa96d568e1ab5dd5ebf85bbe169957",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:35a4364a093ce8ba3112a6866b1ac14e75de4497c8a2778617ef119cb4e030b2"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Grid

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## GridItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/grid-item",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "typeText": "boolean",
    "attribute": "full-width",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Content"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
