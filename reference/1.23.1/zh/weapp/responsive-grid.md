# ResponsiveGrid 响应式网格

等宽列网格，列数随自身宽度（容器查询）而非视口变化。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: zh

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
