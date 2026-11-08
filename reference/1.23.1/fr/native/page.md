# Page

Structure de page : Page, PageHeader, PageSection, StatCard et Toolbar pour des écrans cohérents.

Package: minerva-design@1.23.1

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Page

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "maxWidth",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
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

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "title",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "actions",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
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

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "icon",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "actions",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
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

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "label",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
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

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "wrap",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "density",
    "source": "packages/native/src/components/Layout/index.tsx",
    "kind": "enum",
    "values": [
      "compact",
      "default"
    ],
    "typeText": "\"compact\" | \"default\" | undefined",
    "typeRef": "type:2fdf87b08936de319694",
    "default": "default",
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

## API

```json
{
  "native:PageProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "maxWidth",
        "type": "DimensionValue",
        "required": false
      }
    ]
  },
  "native:PageHeaderProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "required": false
      }
    ]
  },
  "native:PageSectionProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "PageHeaderProps"
    ],
    "props": [
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      }
    ]
  },
  "native:StatCardProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "value",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false
      }
    ]
  },
  "native:ToolbarProps": {
    "source": "native/src/components/Layout/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "wrap",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "density",
        "type": "\"default\" | \"compact\"",
        "required": false,
        "default": "\"default\""
      }
    ]
  }
}
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

## Example: Page, en-tête et sections

PageHeader rend le h1 avec des actions ; chaque PageSection est une région nommée par son h2.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/page/native/basic.tsx

```tsx
import {
  Page,
  PageHeader,
  PageSection,
  StatCard,
  Toolbar,
  Button,
} from "minerva-design/native";
export default function Basic() {
  return (
    <Page>
      <PageHeader title="Workspace" description="Your project overview" />
      <PageSection title="Activity">
        <StatCard label="Projects" value={12} />
      </PageSection>
      <Toolbar>
        <Button>New project</Button>
      </Toolbar>
    </Page>
  );
}

```
