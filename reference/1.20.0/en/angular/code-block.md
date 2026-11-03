# CodeBlock

A read-only block of preformatted text (logs, payloads, config) in a named, keyboard-focusable scroll region.

Package: minerva-design@1.20.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

## Example: Marks (saved highlights)

marks lays character ranges over the syntax colors (offsets into the code; overlapping marks: the later one wins). getCodeSelectionRange of minerva-design/core turns the user's selection into offsets to save; onMarkClick reports the clicked mark (here: removes it). Copy still copies the raw code.

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
