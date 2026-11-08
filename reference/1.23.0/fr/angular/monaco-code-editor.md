# MonacoCodeEditor

Éditeur Monaco étiqueté utilisant un moteur local (jamais de CDN) et suivant le thème de la page. Si le moteur ne se charge pas à temps, il se replie sur une zone de texte modifiable avec un bouton Réessayer. Importez-le depuis minerva-design/monaco ; @monaco-editor/react et monaco-editor sont des dépendances pairs optionnelles. Le Web Component <minerva-code-editor> est publié comme entrée optionnelle minerva-design/web-components/code-editor (hors de l'entrée tout-en-un et du bundle CDN), avec monaco-editor comme dépendance pair optionnelle.

Package: minerva-design@1.23.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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
