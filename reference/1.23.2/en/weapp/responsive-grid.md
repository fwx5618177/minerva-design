# ResponsiveGrid

An equal-column grid whose column count follows its own width (container queries), not the viewport.

Package: minerva-design@1.23.2

Renderer: weapp

Locale: en

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

## GridItem

Support: beta

Native grid child with full row and optional column/row spans. Native wrapper replaces DOM asChild cloning. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/grid-item/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "columnSpan",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "rowSpan",
    "typeText": "number",
    "required": false,
    "default": 0
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

## ResponsiveGrid

Support: beta

Container-measured 1–12 columns with base/sm/md/lg inheritance, token/CSS gaps and row/column overrides; measure(width) for host layout updates. Automatic measurement runs on ready/window resize; non-window host size changes call measure(width). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/responsive-grid/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "columns",
    "typeText": "unknown",
    "required": false,
    "default": 1
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": 4
  },
  {
    "name": "rowGap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "columnGap",
    "typeText": "unknown",
    "required": false,
    "default": null
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

## CSS variables

```json
{
  "css:ResponsiveGrid": {
    "kind": "cssVars",
    "source": "react/src/components/ResponsiveGrid",
    "vars": [
      {
        "name": "--responsive-grid-align-items",
        "description": "Vertical alignment of the items in their row (default: stretch)"
      },
      {
        "name": "--responsive-grid-justify-items",
        "description": "Horizontal alignment of the items in their column (default: stretch)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
