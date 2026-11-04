# MonacoCodeEditor Monaco コードエディター

ローカルエンジン（CDN は使いません）で動作し、ページのテーマに追従するラベル付き Monaco エディターです。エンジンが時間内に読み込めない場合は、再試行ボタン付きの編集可能なテキストエリアに切り替わります。minerva-design/monaco からインポートします。@monaco-editor/react と monaco-editor は任意の peer 依存です。 Web Component の <minerva-code-editor> はオプションのエントリ minerva-design/web-components/code-editor として公開され（オールインワンのエントリと CDN バンドルには含まれません）、monaco-editor がオプションの peer 依存関係です。

Package: minerva-design@1.20.2

Renderer: angular

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

Support: beta

Native Angular: MnMonacoCodeEditor. Optional entry minerva-design/angular/monaco; inject a locally configured Monaco engine/loader and configure workers in the host application.

### Import

```json
{
  "specifier": "minerva-design/angular/monaco",
  "exports": [
    "MnMonacoCodeEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "monaco",
    "typeText": "typeof import(\"monaco-editor\") | undefined",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "theme",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "language",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "loadingLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "retryLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "height",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "options",
    "typeText": "IStandaloneEditorConstructionOptions",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  },
  {
    "name": "loader",
    "typeText": "MonacoLoader",
    "required": false,
    "source": "packages/angular/monaco/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string",
    "required": false
  },
  {
    "name": "editorReady",
    "typeText": "IStandaloneCodeEditor",
    "required": false,
    "source": "packages/angular/monaco/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "IStandaloneCodeEditor",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "loadError",
    "typeText": "unknown",
    "required": false,
    "source": "packages/angular/monaco/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
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

## Example: Edit source

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: ./engine (Monaco worker setup in the documentation)

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMonacoCodeEditor } from 'minerva-design/angular/monaco';
// engine.ts configures MonacoEnvironment.getWorker with bundled workers.
import { monaco } from "./engine";

@Component({
  selector: 'app-example',
  imports: [MnMonacoCodeEditor],
  template: `
<mn-monaco-code-editor label="HTML source" language="html" [(value)]="value" [monaco]="monaco" height="240px"/><output>{{value.length}} characters</output>
  `,
})
export class Example {
  value = "<h1>Hello Minerva</h1>\n<p>Edit this document.</p>";
  readonly monaco = monaco;
}

```

## Example: Read-only source

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: ./engine (Monaco worker setup in the documentation)

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMonacoCodeEditor } from 'minerva-design/angular/monaco';
// engine.ts configures MonacoEnvironment.getWorker with bundled workers.
import { monaco } from "./engine";

@Component({
  selector: 'app-example',
  imports: [MnMonacoCodeEditor],
  template: `
<mn-monaco-code-editor label="Published source" language="typescript" value="const version = 1;" [monaco]="monaco" [readOnly]="true" height="180px"/>
  `,
})
export class Example {

  readonly monaco = monaco;
}

```
