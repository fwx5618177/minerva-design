# LoadingState 読み込み状態

ページ・ルート・セクションの読み込み表示。装飾用の ProgressIndicator スピナーと表示ラベルを 1 つの polite なステータス領域にまとめます。

Package: minerva-design@1.22.2

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## LoadingState

Support: beta

Loading (alias Spinner)

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Loading"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/native/src/components/Loading/Loading.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible text next to the spinner, also its accessible name; `null` shows the spinner alone (named by the \"common.loading\" message)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Loading/Loading.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "LoadingSize | undefined",
    "typeRef": "type:d1a73d4d23b2c65f7573",
    "default": "medium",
    "required": false,
    "description": "Spinner and text size"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Loading/Loading.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "NativeColor | undefined",
    "typeRef": "type:c1c4fb1afcf9f8ec5869",
    "default": "primary",
    "required": false,
    "description": "Color of the spinner (`neutral`: the secondary text color)"
  },
  {
    "name": "vertical",
    "source": "packages/native/src/components/Loading/Loading.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the label under the spinner instead of beside it"
  },
  {
    "name": "overlay",
    "source": "packages/native/src/components/Loading/Loading.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Covers its container (or the screen, at the root) with a translucent mask and centers the indicator on it"
  }
]
```

## API

```json
{
  "native:LoadingProps": {
    "source": "native/src/components/Loading/Loading.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "label",
        "type": "ReactNode | null",
        "required": false,
        "default": "the \"loadingState.label\" message",
        "description": "Visible text next to the spinner, also its accessible name; `null` shows the spinner alone (named by the \"common.loading\" message)"
      },
      {
        "name": "size",
        "type": "LoadingSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Spinner and text size"
      },
      {
        "name": "color",
        "type": "NativeColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Color of the spinner (`neutral`: the secondary text color)"
      },
      {
        "name": "vertical",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stacks the label under the spinner instead of beside it"
      },
      {
        "name": "overlay",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Covers its container (or the screen, at the root) with a translucent mask and centers the indicator on it"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:LoadingState": {
    "kind": "cssVars",
    "source": "react/src/components/LoadingState",
    "vars": [
      {
        "name": "--loading-state-gap",
        "description": "Space between the spinner and the label"
      },
      {
        "name": "--loading-state-padding",
        "description": "Padding"
      },
      {
        "name": "--loading-state-min-height",
        "description": "Minimum height (every size; defaults to the height of the size)"
      },
      {
        "name": "--loading-state-color",
        "description": "Color of the label and the spinner"
      },
      {
        "name": "--loading-state-font-size",
        "description": "Font size of the label"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

既定のラベルはローカライズされ、表示テキストがそのまま読み上げられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/native/basic.tsx

```tsx
import { LoadingState } from "minerva-design/native";
export default function Basic() {
  return <LoadingState label="Loading records" />;
}

```
