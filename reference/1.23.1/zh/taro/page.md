# Page 页面

页面骨架：Page、PageHeader、PageSection、StatCard 和 Toolbar，构建一致的页面。

Package: minerva-design@1.23.1

Renderer: taro

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

## Page

Support: beta

Native view layouts, token-aware Box background/radius/shadow and numeric size resolution, spacing and attached controls, container-measured responsive grids/SplitLayout, sections/actions, compact/expanded/floating AppShell navigation and mobile drawer with route-change dismissal. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. CSS as/asChild polymorphism is not native. Floating AppShell expands by touch rather than hover. Measurements initially use window width until the native selector query returns. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Page"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "maxWidth",
    "source": "packages/taro/src/display.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false
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

## PageHeader

Support: beta

Native view layouts, token-aware Box background/radius/shadow and numeric size resolution, spacing and attached controls, container-measured responsive grids/SplitLayout, sections/actions, compact/expanded/floating AppShell navigation and mobile drawer with route-change dismissal. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. CSS as/asChild polymorphism is not native. Floating AppShell expands by touch rather than hover. Measurements initially use window width until the native selector query returns. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "PageHeader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "title",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "actions",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
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

## PageSection

Support: beta

Native view layouts, token-aware Box background/radius/shadow and numeric size resolution, spacing and attached controls, container-measured responsive grids/SplitLayout, sections/actions, compact/expanded/floating AppShell navigation and mobile drawer with route-change dismissal. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. CSS as/asChild polymorphism is not native. Floating AppShell expands by touch rather than hover. Measurements initially use window width until the native selector query returns. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "PageSection"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "title",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "actions",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "icon",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
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

## StatCard

Support: beta

Native card sections/preset padding/content animations, interactive disabled cards, safe native navigation, statistics, icon actions/uncontrolled toggles and configured native tooltip integration. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser as/asChild and download/target/rel are not native navigation equivalents; tooltips use native tap/long press. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "StatCard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": true
  },
  {
    "name": "value",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": true
  },
  {
    "name": "icon",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
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

## Toolbar

Support: beta

Native view layouts, token-aware Box background/radius/shadow and numeric size resolution, spacing and attached controls, container-measured responsive grids/SplitLayout, sections/actions, compact/expanded/floating AppShell navigation and mobile drawer with route-change dismissal. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. CSS as/asChild polymorphism is not native. Floating AppShell expands by touch rather than hover. Measurements initially use window width until the native selector query returns. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Toolbar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "wrap",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "density",
    "source": "packages/taro/src/display.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
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

## CSS variables

```json
{
  "css:Page": {
    "kind": "cssVars",
    "source": "react/src/components/Page",
    "vars": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-max-width",
        "description": "Maximum readable page width (defaults to 90rem)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-section-padding",
        "description": "Inner spacing of a framed page section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
