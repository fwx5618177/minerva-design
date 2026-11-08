# Grid

Grille avec commandes natives et variables de design partagées.

Package: minerva-design@1.23.2

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Grid

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## GridItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Spans the full row of the surrounding grid"
  },
  {
    "name": "asChild",
    "source": "packages/react/src/components/ResponsiveGrid/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the item props, classes and ref into its single child instead of rendering a wrapper div"
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
