# Page ページ

ページの骨組み：一貫した画面のための Page、PageHeader、PageSection、StatCard、Toolbar。

Package: minerva-design@1.21.1

Renderer: react

Locale: ja

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

## Page

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Maximum width: numbers are pixels, strings are CSS lengths (`style` wins)"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Heading content"
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Supporting text under the heading; omitted when empty (0 is rendered)"
  },
  {
    "name": "actions",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Actions shown next to the heading (wrap below it on narrow widths)"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Decorative icon before the title, hidden from assistive technology"
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Heading content"
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Supporting text under the heading; omitted when empty (0 is rendered)"
  },
  {
    "name": "actions",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Actions shown next to the heading (wrap below it on narrow widths)"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Metric name"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Metric value (0 is rendered)"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Decorative icon, hidden from assistive technology"
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Explanatory text under the value"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Wraps controls onto multiple lines; `false` keeps one bounded row"
  },
  {
    "name": "density",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "default"
    ],
    "typeText": "ToolbarDensity | undefined",
    "typeRef": "type:c292b996788ab5704409",
    "default": "default",
    "required": false,
    "description": "Gap between controls: `default` (space-3) or `compact` (space-1, with centered direct-child vertical dividers)"
  },
  {
    "name": "asChild",
    "source": "packages/react/src/components/Page/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Applies the toolbar props, classes and ref to its single child (e.g. a Card) instead of rendering a wrapper div"
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
  "PageProps": {
    "source": "react/src/components/Page/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the page div"
      },
      {
        "name": "maxWidth",
        "type": "string | number",
        "required": false,
        "description": "Maximum width: numbers are pixels, strings are CSS lengths (`style` wins)"
      }
    ]
  },
  "PageHeaderProps": {
    "source": "react/src/components/Page/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLElement>, \"title\">"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the header element"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": true,
        "description": "Heading content"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Supporting text under the heading; omitted when empty (0 is rendered)"
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "required": false,
        "description": "Actions shown next to the heading (wrap below it on narrow widths)"
      }
    ]
  },
  "PageSectionProps": {
    "source": "react/src/components/Page/types.ts",
    "kind": "interface",
    "extends": [
      "PageHeaderProps"
    ],
    "props": [
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Decorative icon before the title, hidden from assistive technology"
      }
    ]
  },
  "StatCardProps": {
    "source": "react/src/components/Page/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the card div"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Metric name"
      },
      {
        "name": "value",
        "type": "ReactNode",
        "required": true,
        "description": "Metric value (0 is rendered)"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Decorative icon, hidden from assistive technology"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Explanatory text under the value"
      }
    ]
  },
  "ToolbarProps": {
    "source": "react/src/components/Page/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the toolbar div (or to the slotted child with `asChild`)"
      },
      {
        "name": "wrap",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Wraps controls onto multiple lines; `false` keeps one bounded row"
      },
      {
        "name": "density",
        "type": "ToolbarDensity",
        "required": false,
        "default": "\"default\"",
        "description": "Gap between controls: `default` (space-3) or `compact` (space-1, with centered direct-child vertical dividers)"
      },
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Applies the toolbar props, classes and ref to its single child (e.g. a Card) instead of rendering a wrapper div"
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

## Example: ページ・ヘッダー・セクション

PageHeader はアクション付きの h1 を描画し、各 PageSection は h2 で名前付けされたリージョンです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/page/demos/basic.tsx

```tsx
import { Button, Page, PageHeader, PageSection } from "minerva-design";
import { LuBookOpen } from "react-icons/lu";

export default function BasicDemo() {
  return (
    <Page maxWidth={720} style={{ padding: 0 }}>
      <PageHeader
        title="Books"
        description="Every title in the catalogue."
        actions={<Button>New book</Button>}
      />
      <PageSection
        title="Recently added"
        icon={<LuBookOpen />}
        actions={
          <Button color="neutral" variant="outline">
            View all
          </Button>
        }
      >
        <p style={{ margin: 0 }}>Section content</p>
      </PageSection>
    </Page>
  );
}

```

## Example: 統計カード

StatCard はラベルと値を説明リストで組み合わせます。0 も表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/page/demos/stat-cards.tsx

```tsx
import { ResponsiveGrid, StatCard } from "minerva-design";
import { LuBook, LuStar, LuUsers } from "react-icons/lu";

export default function StatCardsDemo() {
  return (
    <ResponsiveGrid
      as="section"
      aria-label="Metrics"
      columns={{ base: 1, sm: 3 }}
    >
      <StatCard label="Books" value="1,284" icon={<LuBook />} />
      <StatCard label="Readers" value="9.6k" icon={<LuUsers />} />
      <StatCard
        label="Reviews"
        value={0}
        icon={<LuStar />}
        description="No reviews yet"
      />
    </ResponsiveGrid>
  );
}

```

## Example: ツールバー

Toolbar はコントロールを折り返し可能な行にまとめます。density="compact" と wrap={false} で詰めます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/page/demos/toolbar.tsx

```tsx
import { Button, Divider, Input, Toolbar } from "minerva-design";

export default function ToolbarDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Toolbar aria-label="Filters">
        <Input
          name="query"
          aria-label="Search books"
          placeholder="Search books"
        />
        <Button color="neutral" variant="outline">
          Reset
        </Button>
        <Button>Apply</Button>
      </Toolbar>
      <Toolbar density="compact" wrap={false} aria-label="Formatting">
        <Button size="small" color="neutral" variant="outline">
          Bold
        </Button>
        <Divider orientation="vertical" />
        <Button size="small" color="neutral" variant="outline">
          Italic
        </Button>
      </Toolbar>
    </div>
  );
}

```
