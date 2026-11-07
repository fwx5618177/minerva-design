# MonacoCodeEditor Monaco コードエディター

ローカルエンジン（CDN は使いません）で動作し、ページのテーマに追従するラベル付き Monaco エディターです。エンジンが時間内に読み込めない場合は、再試行ボタン付きの編集可能なテキストエリアに切り替わります。minerva-design/monaco からインポートします。@monaco-editor/react と monaco-editor は任意の peer 依存です。 Web Component の <minerva-code-editor> はオプションのエントリ minerva-design/web-components/code-editor として公開され（オールインワンのエントリと CDN バンドルには含まれません）、monaco-editor がオプションの peer 依存関係です。

Package: minerva-design@1.23.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeEditor

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MonacoCodeEditor

Support: n/a

Optional uni/monaco H5 entry creates an injected local Monaco editor with controlled v-model, language/theme/readOnly updates, timeout/error fallback/retry and model/editor disposal. No native substitute is exported as equivalent. Monaco requires browser DOM/editor workers unavailable in native mini views. JsonField and CodeBlock are separate narrower components. Unsupported on this platform.

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
