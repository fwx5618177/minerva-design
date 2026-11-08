# Grid

Grille avec commandes natives et variables de design partagées.

Package: minerva-design@1.23.1

Renderer: wc

Locale: fr

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
