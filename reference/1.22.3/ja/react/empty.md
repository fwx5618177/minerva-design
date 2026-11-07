# Empty 空の状態

表示するデータがないときに表示されるプレースホルダーです。

Package: minerva-design@1.22.3

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Empty

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Empty"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom icon, replacing the default one. Pass `null` or `false` to render no icon at all"
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Heading of the empty state; also becomes its accessible name"
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Description text; `null` hides it"
  },
  {
    "name": "action",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Primary call to action (a Button, a link or a group of them)"
  },
  {
    "name": "secondaryAction",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Secondary action rendered after `action`"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "EmptySize | undefined",
    "typeRef": "type:23508df583e2352f6f11",
    "required": false,
    "description": "Switches to the unframed sized layout (transparent background, size-based padding, icon and font sizes). Omit it for the classic surface layout"
  },
  {
    "name": "useSvg",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Uses the built-in SVG illustration instead of the default icon"
  },
  {
    "name": "width",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Width of the container"
  },
  {
    "name": "height",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the container"
  },
  {
    "name": "showShadow",
    "source": "packages/react/src/components/Empty/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a drop shadow"
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
  "EmptyProps": {
    "source": "react/src/components/Empty/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"title\" | \"color\">"
    ],
    "props": [
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Custom icon, replacing the default one. Pass `null` or `false` to render no icon at all"
      },
      {
        "name": "title",
        "type": "React.ReactNode",
        "required": false,
        "description": "Heading of the empty state; also becomes its accessible name"
      },
      {
        "name": "description",
        "type": "React.ReactNode",
        "required": false,
        "default": "\"No Data\" (localized)",
        "description": "Description text; `null` hides it"
      },
      {
        "name": "action",
        "type": "React.ReactNode",
        "required": false,
        "description": "Primary call to action (a Button, a link or a group of them)"
      },
      {
        "name": "secondaryAction",
        "type": "React.ReactNode",
        "required": false,
        "description": "Secondary action rendered after `action`"
      },
      {
        "name": "size",
        "type": "EmptySize",
        "required": false,
        "description": "Switches to the unframed sized layout (transparent background, size-based padding, icon and font sizes). Omit it for the classic surface layout"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Footer content, e.g. an action button"
      },
      {
        "name": "useSvg",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Uses the built-in SVG illustration instead of the default icon"
      },
      {
        "name": "width",
        "type": "string | number",
        "required": false,
        "description": "Width of the container"
      },
      {
        "name": "height",
        "type": "string | number",
        "required": false,
        "description": "Height of the container"
      },
      {
        "name": "showShadow",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds a drop shadow"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Empty": {
    "kind": "cssVars",
    "source": "react/src/components/Empty",
    "vars": [
      {
        "name": "--empty-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--empty-gap",
        "description": "Space between the icon, title, description and actions (sized layout)"
      },
      {
        "name": "--empty-icon-size",
        "description": "Size of the illustration icon (every size)"
      },
      {
        "name": "--empty-color",
        "description": "Text color of the description"
      },
      {
        "name": "--empty-background",
        "description": "Background of the framed (unsized) layout"
      },
      {
        "name": "--empty-radius",
        "description": "Corner radius of the framed (unsized) layout (defaults to --radius-sm)"
      },
      {
        "name": "--empty-description-max-width",
        "description": "Maximum width of the description (sized layout)"
      },
      {
        "name": "--empty-icon-background",
        "description": "Background of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-border-color",
        "description": "Ring color of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-radius",
        "description": "Corner radius of the icon tile (sized layout; defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

デフォルトのアイコンと "No Data" の説明文。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/demos/basic.tsx

```tsx
import { Empty } from "minerva-design";

export default function BasicDemo() {
  return <Empty />;
}

```

## Example: カスタムアイコンと説明文

icon と description には任意の React ノードを指定できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/empty/demos/custom-icon.tsx

```tsx
import { Empty } from "minerva-design";
import { FiSearch } from "react-icons/fi";

export default function CustomIconDemo() {
  return (
    <Empty
      icon={<FiSearch size={36} />}
      description={
        <span>
          No matches for <strong>“minerva”</strong>
        </span>
      }
    />
  );
}

```

## Example: タイトル・アクション・サイズ

size で枠なしレイアウトに切り替わります。title が状態の名前になり、action / secondaryAction に操作を置きます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/demos/sizes.tsx

```tsx
import { Button, Empty } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Empty
        size="small"
        title="No results"
        description="Try another keyword."
      />
      <Empty
        size="medium"
        title="No reviews yet"
        description="The first reader to write one will be featured here."
        action={<Button size="small">Write a review</Button>}
        secondaryAction={
          <Button size="small" color="neutral" variant="outline">
            Browse books
          </Button>
        }
      />
    </div>
  );
}

```

## Example: カスタム外観

サイズと影は専用のプロパティで指定し、背景色と文字色は style または className で指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/demos/styled.tsx

```tsx
import { Empty } from "minerva-design";

export default function StyledDemo() {
  return (
    <Empty
      useSvg
      showShadow
      width={320}
      height={200}
      style={{ backgroundColor: "#f0f7ff", color: "#1d4ed8" }}
      description="Inbox zero"
    />
  );
}

```

## Example: SVG イラスト

useSvg で組み込みのイラストに切り替えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/demos/svg.tsx

```tsx
import { Empty } from "minerva-design";

export default function SvgDemo() {
  return <Empty useSvg description="No results found" />;
}

```

## Example: アクション付き

children はフッターに表示されます（例：行動を促すボタン）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/demos/with-action.tsx

```tsx
import { Button, Empty } from "minerva-design";

export default function WithActionDemo() {
  return (
    <Empty description="You have no projects yet">
      <Button size="small">Create project</Button>
    </Empty>
  );
}

```
