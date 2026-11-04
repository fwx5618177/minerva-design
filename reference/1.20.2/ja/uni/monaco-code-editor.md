# MonacoCodeEditor Monaco コードエディター

ローカルエンジン（CDN は使いません）で動作し、ページのテーマに追従するラベル付き Monaco エディターです。エンジンが時間内に読み込めない場合は、再試行ボタン付きの編集可能なテキストエリアに切り替わります。minerva-design/monaco からインポートします。@monaco-editor/react と monaco-editor は任意の peer 依存です。 Web Component の <minerva-code-editor> はオプションのエントリ minerva-design/web-components/code-editor として公開され（オールインワンのエントリと CDN バンドルには含まれません）、monaco-editor がオプションの peer 依存関係です。

Package: minerva-design@1.20.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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
