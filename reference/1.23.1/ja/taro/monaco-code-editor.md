# MonacoCodeEditor Monaco コードエディター

ローカルエンジン（CDN は使いません）で動作し、ページのテーマに追従するラベル付き Monaco エディターです。エンジンが時間内に読み込めない場合は、再試行ボタン付きの編集可能なテキストエリアに切り替わります。minerva-design/monaco からインポートします。@monaco-editor/react と monaco-editor は任意の peer 依存です。 Web Component の <minerva-code-editor> はオプションのエントリ minerva-design/web-components/code-editor として公開され（オールインワンのエントリと CDN バンドルには含まれません）、monaco-editor がオプションの peer 依存関係です。

Package: minerva-design@1.23.1

Renderer: taro

Locale: ja

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

## CodeEditor

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MonacoCodeEditor

Support: n/a

Optional taro/monaco H5 entry creates a supplied local Monaco engine, synchronizes controlled text/language/theme/readOnly, releases the model/editor, and exposes timeout/error fallback with retry. Native Monaco remains unsupported. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Use the separately named Textarea or JsonField to edit source text. They do not provide Monaco loading, syntax highlighting, language services, diagnostics, minimap or editor instance APIs. Unsupported on this platform.

### Import

```json
{
  "specifier": "minerva-design/taro/monaco",
  "exports": [
    "MonacoCodeEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "monaco",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "object",
    "typeText": "typeof import(\"monaco-editor\") | undefined",
    "typeRef": "type:f20441df009b824b223d",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "label",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "language",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "height",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "minHeight",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "maxHeight",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "theme",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "enum",
    "values": [
      "dark",
      "light"
    ],
    "typeText": "\"light\" | \"dark\" | undefined",
    "typeRef": "type:32b5dc82c68b1745f68a",
    "required": false
  },
  {
    "name": "loadTimeout",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "unavailableText",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "retryText",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "retryLabel",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "loadingLabel",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/taro/src/monaco.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:cc92c0fe44610e847d1a",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## CSS variables

```json
{
  "css:MonacoCodeEditor": {
    "kind": "cssVars",
    "source": "react/src/components/MonacoCodeEditor",
    "vars": [
      {
        "name": "--monaco-code-editor-radius",
        "description": "Corner radius of the editor surface (defaults to --radius-md)"
      },
      {
        "name": "--monaco-code-editor-border-color",
        "description": "Border color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-bg",
        "description": "Background color of the editor surface"
      },
      {
        "name": "--monaco-code-editor-label-gap",
        "description": "Space between the label and the editor"
      },
      {
        "name": "--monaco-code-editor-font-size",
        "description": "Font size of the label, the messages and the plain-text fallback"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
