# CodeBlock

Un bloc de texte préformaté en lecture seule (journaux, charges utiles, configuration) dans une région défilante nommée et focalisable au clavier.

Package: minerva-design@1.20.2

Renderer: angular

Locale: fr

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

## CodeBlock

Support: beta

Native Angular: MnCodeBlock. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCodeBlock"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "code",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "language",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "copyable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "highlight",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "showLineNumbers",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "showLanguage",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "marks",
    "typeText": "readonly CodeMark[] | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "clickableMarks",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "markClick",
    "typeText": "CodeBlockMarkClickEvent",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "CodeBlockMarkClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "copyError",
    "typeText": "unknown",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts",
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

## CSS variables

```json
{
  "css:CodeBlock": {
    "kind": "cssVars",
    "source": "react/src/components/CodeBlock",
    "vars": [
      {
        "name": "--code-block-padding",
        "description": "Inner padding"
      },
      {
        "name": "--code-block-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--code-block-bg",
        "description": "Background color"
      },
      {
        "name": "--code-block-border-color",
        "description": "Border color"
      },
      {
        "name": "--code-block-font-size",
        "description": "Font size of the code"
      },
      {
        "name": "--code-block-max-height",
        "description": "Maximum height before the block scrolls (default: none)"
      },
      {
        "name": "--code-block-line-number-color",
        "description": "Color of the line numbers"
      },
      {
        "name": "--code-block-mark-bg",
        "description": "Default background of the marks (default: a translucent yellow)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Copyable source

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCodeBlock } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCodeBlock],
  template: `
<mn-code-block [code]="code" language="typescript" showLineNumbers showLanguage copyable/>
  `,
})
export class Example {
  code = "const message = \"Hello, Minerva\";\nconsole.log(message);";
}

```

## Example: Plain text

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCodeBlock } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCodeBlock],
  template: `
<mn-code-block code="pnpm add minerva-design" language="shell"/>
  `,
})
export class Example {

}

```

## Example: Marques (surlignages enregistrés)

marks pose des plages de caractères sur la coloration syntaxique (positions dans le code ; en cas de chevauchement, la dernière marque l'emporte). getCodeSelectionRange de minerva-design/core convertit la sélection de l'utilisateur en positions à enregistrer ; onMarkClick signale la marque cliquée (ici : elle est supprimée). La copie copie toujours le code brut.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCodeBlock } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCodeBlock],
  template: `
<mn-code-block [code]="code" language="typescript" showLineNumbers clickableMarks [marks]="marks" (markClick)="note=$event.mark.title ?? ''"/><output aria-live="polite">{{note}}</output>
  `,
})
export class Example {
  code = "const message = \"Hello, Minerva\";\nconsole.log(message);";
  marks = [
  {
    "id": "a",
    "start": 16,
    "end": 32,
    "title": "A string literal"
  },
  {
    "id": "b",
    "start": 34,
    "end": 45,
    "color": "info",
    "title": "A call"
  }
];
  note = "";
}

```
