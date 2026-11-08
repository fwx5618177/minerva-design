# Skeleton スケルトン

コンテンツの読み込み中に表示されるプレースホルダーの図形です。

Package: minerva-design@1.23.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Skeleton

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "enum",
    "values": [
      "button",
      "circular",
      "image",
      "rectangular",
      "rounded",
      "text"
    ],
    "typeText": "SkeletonVariant | undefined",
    "typeRef": "type:ffa55090cfd24bbc3dbb",
    "default": "text",
    "required": false,
    "description": "Shape of each placeholder block"
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "union",
    "typeText": "SkeletonAnimation | undefined",
    "typeRef": "type:3cdc4ed75647b5a4d351",
    "default": "pulse",
    "required": false,
    "description": "Loading animation (`false`: static; always static under reduced motion)"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the placeholder; `false` renders the children instead"
  },
  {
    "name": "decorative",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "One bare placeholder block hidden from accessibility (no busy region), for composing custom layouts"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Edge length of a circular placeholder (wins over width / height)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Width of each block (dp or percentage)"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of each block (dp or percentage)"
  },
  {
    "name": "borderRadius",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Corner radius of each block, overriding the variant's"
  },
  {
    "name": "lines",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Number of blocks (lines) rendered"
  },
  {
    "name": "avatar",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows an avatar placeholder before the lines"
  },
  {
    "name": "avatarSize",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 40,
    "required": false,
    "description": "Avatar edge length in dp"
  },
  {
    "name": "avatarShape",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "square"
    ],
    "typeText": "\"square\" | \"circle\" | undefined",
    "typeRef": "type:6568d4f489eff6b497cd",
    "default": "circle",
    "required": false,
    "description": "Avatar shape"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a title placeholder (replaces the lines)"
  },
  {
    "name": "paragraph",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a four-line paragraph placeholder (replaces the lines)"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the busy region"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Parts/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 3,
    "required": false,
    "description": "Number of blocks (lines) rendered"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "enum",
    "values": [
      "button",
      "circular",
      "image",
      "rectangular",
      "rounded",
      "text"
    ],
    "typeText": "SkeletonVariant | undefined",
    "typeRef": "type:ffa55090cfd24bbc3dbb",
    "default": "text",
    "required": false,
    "description": "Shape of each placeholder block"
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "union",
    "typeText": "SkeletonAnimation | undefined",
    "typeRef": "type:3cdc4ed75647b5a4d351",
    "default": "pulse",
    "required": false,
    "description": "Loading animation (`false`: static; always static under reduced motion)"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the placeholder; `false` renders the children instead"
  },
  {
    "name": "decorative",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "One bare placeholder block hidden from accessibility (no busy region), for composing custom layouts"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Edge length of a circular placeholder (wins over width / height)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Width of each block (dp or percentage)"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of each block (dp or percentage)"
  },
  {
    "name": "borderRadius",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Corner radius of each block, overriding the variant's"
  },
  {
    "name": "avatar",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows an avatar placeholder before the lines"
  },
  {
    "name": "avatarSize",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 40,
    "required": false,
    "description": "Avatar edge length in dp"
  },
  {
    "name": "avatarShape",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "square"
    ],
    "typeText": "\"square\" | \"circle\" | undefined",
    "typeRef": "type:6568d4f489eff6b497cd",
    "default": "circle",
    "required": false,
    "description": "Avatar shape"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a title placeholder (replaces the lines)"
  },
  {
    "name": "paragraph",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a four-line paragraph placeholder (replaces the lines)"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Skeleton/Skeleton.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the busy region"
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
  "native:SkeletonProps": {
    "source": "native/src/components/Skeleton/Skeleton.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "SkeletonVariant",
        "required": false,
        "default": "\"text\"",
        "description": "Shape of each placeholder block"
      },
      {
        "name": "animation",
        "type": "SkeletonAnimation",
        "required": false,
        "default": "\"pulse\"",
        "description": "Loading animation (`false`: static; always static under reduced motion)"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the placeholder; `false` renders the children instead"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Content shown once `loading` is false"
      },
      {
        "name": "decorative",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "One bare placeholder block hidden from accessibility (no busy region), for composing custom layouts"
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "description": "Edge length of a circular placeholder (wins over width / height)"
      },
      {
        "name": "width",
        "type": "DimensionValue",
        "required": false,
        "description": "Width of each block (dp or percentage)"
      },
      {
        "name": "height",
        "type": "DimensionValue",
        "required": false,
        "description": "Height of each block (dp or percentage)"
      },
      {
        "name": "borderRadius",
        "type": "number",
        "required": false,
        "description": "Corner radius of each block, overriding the variant's"
      },
      {
        "name": "lines",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Number of blocks (lines) rendered"
      },
      {
        "name": "avatar",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows an avatar placeholder before the lines"
      },
      {
        "name": "avatarSize",
        "type": "number",
        "required": false,
        "default": "40",
        "description": "Avatar edge length in dp"
      },
      {
        "name": "avatarShape",
        "type": "\"circle\" | \"square\"",
        "required": false,
        "default": "\"circle\"",
        "description": "Avatar shape"
      },
      {
        "name": "title",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a title placeholder (replaces the lines)"
      },
      {
        "name": "paragraph",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a four-line paragraph placeholder (replaces the lines)"
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false,
        "default": "the \"common.loading\" message",
        "description": "Accessible name of the busy region"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      }
    ]
  },
  "native:SkeletonTextProps": {
    "source": "native/src/components/Parts/index.tsx",
    "kind": "interface",
    "extends": [
      "SkeletonProps"
    ],
    "props": [
      {
        "name": "lines",
        "type": "number",
        "required": false,
        "default": "3"
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

## Example: 基本的な使い方

テキスト行。lines で行数を指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/skeleton/native/basic.tsx

```tsx
import { View } from "react-native";
import { Skeleton, SkeletonText } from "minerva-design/native";
export default function Basic() {
  return (
    <View style={{ gap: 12 }}>
      <Skeleton width={80} height={80} />
      <SkeletonText lines={3} />
    </View>
  );
}

```
