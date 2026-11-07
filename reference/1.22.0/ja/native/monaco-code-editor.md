# MonacoCodeEditor Monaco コードエディター

ローカルエンジン（CDN は使いません）で動作し、ページのテーマに追従するラベル付き Monaco エディターです。エンジンが時間内に読み込めない場合は、再試行ボタン付きの編集可能なテキストエリアに切り替わります。minerva-design/monaco からインポートします。@monaco-editor/react と monaco-editor は任意の peer 依存です。 Web Component の <minerva-code-editor> はオプションのエントリ minerva-design/web-components/code-editor として公開され（オールインワンのエントリと CDN バンドルには含まれません）、monaco-editor がオプションの peer 依存関係です。

Package: minerva-design@1.22.0

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeEditor

Support: beta

Native multiline source editor with caller formatter; Monaco remains a DOM engine.

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CodeEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "language",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "format",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((source: string) => string | Promise<string>) | undefined",
    "typeRef": "type:152f0b4a771ee5092b8d",
    "parameters": [
      {
        "name": "source",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string | Promise<string>",
      "typeRef": "type:f7ebaca209ff4fcc8445"
    },
    "required": false
  },
  {
    "name": "formatLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the field"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the field (controlled)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false,
    "description": "Initial text (uncontrolled)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Font size and minimum height"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Focusable and selectable, but the text cannot be edited"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state: danger border (`aria-invalid` on the web)"
  },
  {
    "name": "inputStyle",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the TextInput"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "enum",
    "values": [
      "filled",
      "outline",
      "unstyled"
    ],
    "typeText": "FieldVariant | undefined",
    "typeRef": "type:65f0913f5320331d7c25",
    "default": "outline",
    "required": false,
    "description": "Visual style: `outline` (bordered), `filled` (tinted background) or `unstyled` (no frame)"
  },
  {
    "name": "showCharCount",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the number of characters (and `maxLength`, when set) under the text"
  },
  {
    "name": "wrapperStyle",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the frame around the text"
  },
  {
    "name": "rows",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 3,
    "required": false,
    "description": "Visible text rows (the height of the field)"
  },
  {
    "name": "autoSize",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "union",
    "typeText": "boolean | TextareaAutoSize | undefined",
    "typeRef": "type:2102a802ba0c13e1f29a",
    "default": false,
    "required": false,
    "description": "Grows with the text: `true` (from `rows`, unbounded) or row bounds"
  }
]
```

### events

```json
[
  {
    "name": "onFormatError",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((error: unknown) => void) | undefined",
    "typeRef": "type:45ee1fdd35b458af497d",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "unknown",
        "typeRef": "type:dc96c0cac9f2d6c9a926"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onChange",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:a3edd2ec8651a9e57222",
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
    "required": false,
    "description": "Called with the new text on every edit"
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

## MonacoCodeEditor

Support: n/a

Monaco requires a browser DOM and is not embedded on iOS or Android. Native CodeEditor provides an accessible multiline source editor with an optional formatter; it does not claim Monaco language-service or DOM-editor behavior.

## API

```json
{
  "native:CodeEditorProps": {
    "source": "native/src/components/Editors/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<TextareaProps, \"label\">"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "language",
        "type": "string",
        "required": false
      },
      {
        "name": "format",
        "type": "(source: string) => string | Promise<string>",
        "required": false
      },
      {
        "name": "formatLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "onFormatError",
        "type": "(error: unknown) => void",
        "required": false
      }
    ]
  }
}
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

## Example: 遅延読み込みのエディター

エディターとローカルエンジン（ワーカーはホスト側で設定）は必要時に読み込まれます。エンジンがない場合はテキストエリアにフォールバックします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/monaco-code-editor/native/basic.tsx

```tsx
import { CodeEditor } from "minerva-design/native";
export default function Basic() {
  return (
    <CodeEditor
      label="Source code"
      defaultValue={'const name = "Minerva";'}
      format={(source) => source.trim()}
    />
  );
}

```
