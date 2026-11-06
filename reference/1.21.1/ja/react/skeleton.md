# Skeleton スケルトン

コンテンツの読み込み中に表示されるプレースホルダーの図形です。

Package: minerva-design@1.21.1

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Skeleton

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Skeleton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "enum",
    "values": [
      "button",
      "card",
      "circular",
      "image",
      "rectangular",
      "rounded",
      "text"
    ],
    "typeText": "SkeletonVariant | undefined",
    "typeRef": "type:577fa921a0bf943c32ee",
    "default": "text",
    "required": false,
    "description": "Shape of the placeholder"
  },
  {
    "name": "animation",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "enum",
    "values": [
      "false",
      "pulse",
      "wave"
    ],
    "typeText": "SkeletonAnimation | undefined",
    "typeRef": "type:06717216ff9dea9e6ffe",
    "default": "pulse",
    "required": false,
    "description": "Loading animation; \"false\" disables it"
  },
  {
    "name": "decorative",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders one bare decorative placeholder (`<span aria-hidden>`) instead of the announced loading region. Use it to compose your own skeleton layout inside a container that already exposes the busy state"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 32,
    "required": false,
    "description": "Edge length of a decorative circular placeholder (numbers are pixels); wins over width/height"
  },
  {
    "name": "width",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Width of each line (numbers are pixels)"
  },
  {
    "name": "height",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of each line (numbers are pixels)"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the placeholder; set to false to render children"
  },
  {
    "name": "borderRadius",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Custom corner radius of each line"
  },
  {
    "name": "lines",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Number of lines to render"
  },
  {
    "name": "avatar",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows an avatar placeholder"
  },
  {
    "name": "avatarSize",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 40,
    "required": false,
    "description": "Avatar size (numbers are pixels)"
  },
  {
    "name": "avatarShape",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "square"
    ],
    "typeText": "\"circle\" | \"square\" | undefined",
    "typeRef": "type:53f830419be13b669ce8",
    "default": "circle",
    "required": false,
    "description": "Avatar shape"
  },
  {
    "name": "active",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Highlights the card variant as active"
  },
  {
    "name": "paragraph",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a paragraph placeholder (replaces the lines)"
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a title placeholder (replaces the lines)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the loading placeholder (rendered as a busy status region)"
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

## SkeletonText

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "SkeletonText"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "lines",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 3,
    "required": false,
    "description": "Number of text lines"
  },
  {
    "name": "lineHeight",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "1em",
    "required": false,
    "description": "Height of each line (numbers are pixels)"
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 2,
    "required": false,
    "description": "Space between lines: a spacing-scale step (2 -> var(--space-2)) or any CSS length"
  },
  {
    "name": "shrinkLast",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shrinks the last line to 70% width so the block reads like real text"
  },
  {
    "name": "animation",
    "source": "packages/react/src/components/Skeleton/types.ts",
    "kind": "enum",
    "values": [
      "false",
      "pulse",
      "wave"
    ],
    "typeText": "SkeletonAnimation | undefined",
    "typeRef": "type:06717216ff9dea9e6ffe",
    "default": "pulse",
    "required": false,
    "description": "Loading animation; \"false\" disables it"
  }
]
```

## API

```json
{
  "SkeletonProps": {
    "source": "react/src/components/Skeleton/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLElement>, \"children\" | \"title\" | \"style\" | \"className\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "SkeletonVariant",
        "required": false,
        "default": "\"text\"",
        "description": "Shape of the placeholder"
      },
      {
        "name": "animation",
        "type": "SkeletonAnimation",
        "required": false,
        "default": "\"pulse\"",
        "description": "Loading animation; \"false\" disables it"
      },
      {
        "name": "decorative",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders one bare decorative placeholder (`<span aria-hidden>`) instead of the announced loading region. Use it to compose your own skeleton layout inside a container that already exposes the busy state"
      },
      {
        "name": "size",
        "type": "number | string",
        "required": false,
        "default": "32",
        "description": "Edge length of a decorative circular placeholder (numbers are pixels); wins over width/height"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "description": "Width of each line (numbers are pixels)"
      },
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "description": "Height of each line (numbers are pixels)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Real content, rendered once loading is false"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the placeholder; set to false to render children"
      },
      {
        "name": "borderRadius",
        "type": "number | string",
        "required": false,
        "description": "Custom corner radius of each line"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles applied to each line"
      },
      {
        "name": "lines",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Number of lines to render"
      },
      {
        "name": "avatar",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows an avatar placeholder"
      },
      {
        "name": "avatarSize",
        "type": "number | string",
        "required": false,
        "default": "40",
        "description": "Avatar size (numbers are pixels)"
      },
      {
        "name": "avatarShape",
        "type": "\"circle\" | \"square\"",
        "required": false,
        "default": "\"circle\"",
        "description": "Avatar shape"
      },
      {
        "name": "active",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Highlights the card variant as active"
      },
      {
        "name": "paragraph",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a paragraph placeholder (replaces the lines)"
      },
      {
        "name": "title",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a title placeholder (replaces the lines)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Loading\" (localized)",
        "description": "Accessible name of the loading placeholder (rendered as a busy status region)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root element (<div>, or the <span> when decorative); only attached while loading (children are rendered as-is otherwise)"
      }
    ]
  },
  "SkeletonTextProps": {
    "source": "react/src/components/Skeleton/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "lines",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Number of text lines"
      },
      {
        "name": "lineHeight",
        "type": "number | string",
        "required": false,
        "default": "\"1em\"",
        "description": "Height of each line (numbers are pixels)"
      },
      {
        "name": "gap",
        "type": "number | string",
        "required": false,
        "default": "2",
        "description": "Space between lines: a spacing-scale step (2 -> var(--space-2)) or any CSS length"
      },
      {
        "name": "shrinkLast",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shrinks the last line to 70% width so the block reads like real text"
      },
      {
        "name": "animation",
        "type": "SkeletonAnimation",
        "required": false,
        "default": "\"pulse\"",
        "description": "Loading animation; \"false\" disables it"
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
  "css:Skeleton": {
    "kind": "cssVars",
    "source": "react/src/components/Skeleton",
    "vars": [
      {
        "name": "--skeleton-color",
        "description": "Base color of the placeholder blocks"
      },
      {
        "name": "--skeleton-highlight-color",
        "description": "Color of the moving highlight (wave animation)"
      },
      {
        "name": "--skeleton-radius",
        "description": "Corner radius of the lines and blocks (circles stay round, rectangular blocks square)"
      },
      {
        "name": "--skeleton-text-height",
        "description": "Height of a text line"
      },
      {
        "name": "--skeleton-gap",
        "description": "Space between the lines of a paragraph and next to the avatar"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: アニメーション

パルス（デフォルト）、ウェーブ、またはアニメーションなしの "false"。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/animations.tsx

```tsx
import { Skeleton } from "minerva-design";

export default function AnimationsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      <Skeleton animation="pulse" lines={2} />
      <Skeleton animation="wave" lines={2} />
      <Skeleton animation="false" lines={2} />
    </div>
  );
}

```

## Example: 基本的な使い方

テキスト行。lines で行数を指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/basic.tsx

```tsx
import { Skeleton } from "minerva-design";

export default function BasicDemo() {
  return <Skeleton lines={3} />;
}

```

## Example: カード

card バリアントはアバター、タイトル、段落をレイアウトします。active で強調表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/card.tsx

```tsx
import { Skeleton } from "minerva-design";

export default function CardDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Skeleton variant="card" avatar title paragraph />
      <Skeleton variant="card" avatar title paragraph active animation="wave" />
    </div>
  );
}

```

## Example: アバター、タイトル、段落

アバターをタイトルと段落、または通常の行と組み合わせます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/composition.tsx

```tsx
import { Skeleton } from "minerva-design";

export default function CompositionDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: "100%" }}>
      <Skeleton avatar title paragraph />
      <Skeleton avatar avatarShape="square" avatarSize={56} lines={2} />
    </div>
  );
}

```

## Example: 装飾用ブロック

decorative は aria-hidden のプレースホルダーを 1 つだけ描画し、ビジー状態を示すコンテナ内で独自のレイアウトを組めます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/decorative.tsx

```tsx
import { Skeleton } from "minerva-design";

export default function DecorativeDemo() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading profile"
      style={{ display: "flex", gap: 12, alignItems: "center", width: 320 }}
    >
      <Skeleton decorative variant="circular" size={40} animation="wave" />
      <div style={{ flex: 1, display: "grid", gap: 8 }}>
        <Skeleton decorative width="60%" animation="wave" />
        <Skeleton decorative width="90%" animation="wave" />
      </div>
    </div>
  );
}

```

## Example: 読み込み状態

実際のコンテンツをラップし、loading が false になったら表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/loading.tsx

```tsx
import { useState } from "react";
import { Button, Skeleton } from "minerva-design";

export default function LoadingDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Button size="small" onClick={() => setLoading((prev) => !prev)}>
        {loading ? "Show content" : "Show skeleton"}
      </Button>
      <Skeleton loading={loading} avatar title paragraph>
        <article>
          <h4 style={{ margin: "0 0 8px" }}>Minerva UI</h4>
          <p style={{ margin: 0 }}>
            The content is rendered as soon as loading becomes false.
          </p>
        </article>
      </Skeleton>
    </div>
  );
}

```

## Example: SkeletonText

最終行を短くして本物のテキストのように見せる複数行のプレースホルダーです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/skeleton-text.tsx

```tsx
import { SkeletonText } from "minerva-design";

export default function SkeletonTextDemo() {
  return (
    <div style={{ display: "grid", gap: 24, width: 360 }}>
      <SkeletonText />
      <SkeletonText lines={5} lineHeight={12} gap={3} animation="wave" />
    </div>
  );
}

```

## Example: バリアント

テキスト、円形、長方形、角丸長方形、ボタン、画像の形状。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/demos/variants.tsx

```tsx
import { Skeleton } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Skeleton variant="text" width={120} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rectangular" width={120} height={60} />
      <Skeleton variant="rounded" width={120} height={60} />
      <Skeleton variant="button" />
      <Skeleton variant="image" width={120} height={80} />
    </div>
  );
}

```
