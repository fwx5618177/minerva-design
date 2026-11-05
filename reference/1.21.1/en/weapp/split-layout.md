# SplitLayout

Main content with an optional aside that splits beside it once the layout's own width reaches a breakpoint.

Package: minerva-design@1.21.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## SplitLayout

Support: beta

Main/aside slots, finite positive asideWidth capped to half container, md/lg container stacking, token/CSS gap and optional aside. Native slot presence is declared with hasAside; non-window host size changes call measure(width). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/split-layout/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "sidebarWidth",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": 6
  },
  {
    "name": "reverse",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "asideWidth",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "collapseBelow",
    "typeText": "string",
    "required": false,
    "default": "md"
  },
  {
    "name": "hasAside",
    "typeText": "boolean",
    "required": false,
    "default": true
  }
]
```

### slots

```json
[
  {
    "name": "default"
  },
  {
    "name": "aside"
  },
  {
    "name": "sidebar"
  }
]
```

## CSS variables

```json
{
  "css:SplitLayout": {
    "kind": "cssVars",
    "source": "react/src/components/SplitLayout",
    "vars": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
