# CodeBlock

Un bloc de texte préformaté en lecture seule (journaux, charges utiles, configuration) dans une région défilante nommée et focalisable au clavier.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
