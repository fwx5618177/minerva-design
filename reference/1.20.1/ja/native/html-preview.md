# HtmlPreview HTML プレビュー

メールテンプレートなどの信頼できない HTML を、完全にサンドボックス化された iframe でプレビューします。マークアップは DOMPurify で無害化され（失敗時は空）、スクリプトとネットワークを遮断する CSP の下で描画されます。

Package: minerva-design@1.20.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## HtmlPreview

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "HtmlPreview"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "html",
    "source": "packages/native/src/components/HtmlPreview/index.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "title",
    "source": "packages/native/src/components/HtmlPreview/index.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "viewport",
    "source": "packages/native/src/components/HtmlPreview/index.tsx",
    "kind": "enum",
    "values": [
      "desktop",
      "mobile"
    ],
    "typeText": "\"desktop\" | \"mobile\" | undefined",
    "typeRef": "type:97ff2e6edc17a159e346",
    "default": "desktop",
    "required": false
  },
  {
    "name": "mobileWidth",
    "source": "packages/native/src/components/HtmlPreview/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 375,
    "required": false
  },
  {
    "name": "height",
    "source": "packages/native/src/components/HtmlPreview/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 600,
    "required": false
  },
  {
    "name": "renderDocument",
    "source": "packages/native/src/components/HtmlPreview/index.tsx",
    "kind": "union",
    "typeText": "ComponentType<HtmlPreviewDocumentProps>",
    "typeRef": "type:5f9c3006722cfe3a17dd",
    "parameters": [
      {
        "name": "props",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "HtmlPreviewDocumentProps",
        "typeRef": "type:6531af4797f787f7c62f"
      }
    ],
    "returnType": {
      "typeText": "ReactNode | Promise<ReactNode>",
      "typeRef": "type:5a2caedc46496617e609"
    },
    "required": true,
    "description": "Platform host (react-native-webview on iOS/Android, sandboxed iframe on web)."
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
  "native:HtmlPreviewProps": {
    "source": "native/src/components/HtmlPreview/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "html",
        "type": "string",
        "required": true
      },
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "viewport",
        "type": "\"desktop\" | \"mobile\"",
        "required": false,
        "default": "\"desktop\""
      },
      {
        "name": "mobileWidth",
        "type": "number",
        "required": false,
        "default": "375"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "default": "600"
      },
      {
        "name": "renderDocument",
        "type": "ComponentType<HtmlPreviewDocumentProps>",
        "required": true,
        "description": "Platform host (react-native-webview on iOS/Android, sandboxed iframe on web)."
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:HtmlPreview": {
    "kind": "cssVars",
    "source": "react/src/components/HtmlPreview",
    "vars": [
      {
        "name": "--html-preview-bg",
        "description": "Background color around the frame"
      },
      {
        "name": "--html-preview-frame-bg",
        "description": "Background color of the frame"
      },
      {
        "name": "--html-preview-frame-border-color",
        "description": "Border color of the frame"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

インラインスタイルと data: 画像は残り、スクリプト・フォーム・リンク・外部画像は削除されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/html-preview/native/basic.tsx

```tsx
import { useMemo, useSyncExternalStore } from "react";
import { previewDocument } from "minerva-design/utils";
import {
  HtmlPreview,
  type HtmlPreviewDocumentProps,
} from "minerva-design/native";
export default function Basic() {
  return (
    <HtmlPreview
      title="Document preview"
      height={200}
      html="<h1>Preview</h1><p>Isolated HTML document.</p>"
      renderDocument={BrowserDocument}
    />
  );
}
const subscribe = () => () => {};
const serverDocument = () => previewDocument();
// Browser documentation host. For iOS/Android use the react-native-webview adapter in apps/expo-example.
function BrowserDocument({ source, title, style }: HtmlPreviewDocumentProps) {
  const sanitized = useMemo(() => previewDocument(source.html), [source.html]);
  const document = useSyncExternalStore(
    subscribe,
    () => sanitized,
    serverDocument,
  );
  return (
    <iframe
      key={document}
      title={title}
      srcDoc={document}
      sandbox=""
      referrerPolicy="no-referrer"
      style={{ ...style, border: 0 }}
    />
  );
}

```
