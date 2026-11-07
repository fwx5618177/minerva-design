# LoadingState 読み込み状態

ページ・ルート・セクションの読み込み表示。装飾用の ProgressIndicator スピナーと表示ラベルを 1 つの polite なステータス領域にまとめます。

Package: minerva-design@1.22.2

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## LoadingState

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "LoadingState"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/react/src/components/LoadingState/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible text, which is also what the status region announces"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/LoadingState/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "LoadingStateSize | undefined",
    "typeRef": "type:3726d1ab9f3b6eb4edaf",
    "default": "medium",
    "required": false,
    "description": "Minimum height: small for a section, medium for a page or route, large for tall content such as a calendar"
  }
]
```

## API

```json
{
  "LoadingStateProps": {
    "source": "react/src/components/LoadingState/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "\"Loading...\" (localized)",
        "description": "Visible text, which is also what the status region announces"
      },
      {
        "name": "size",
        "type": "LoadingStateSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Minimum height: small for a section, medium for a page or route, large for tall content such as a calendar"
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

### apps/docs/src/docs/pages/loading-state/demos/basic.tsx

```tsx
import { LoadingState } from "minerva-design";

export default function BasicDemo() {
  return <LoadingState />;
}

```

## Example: サイズ

small・medium・large はそれぞれ最小高さ 64・160・240 px です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/loading-state/demos/sizes.tsx

```tsx
import { LoadingState } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <LoadingState size="small" label="Loading records..." />
      <LoadingState size="large" label="Loading calendar..." />
    </div>
  );
}

```
