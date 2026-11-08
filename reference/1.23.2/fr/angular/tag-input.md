# TagInput

Saisie libre d’étiquettes avec suggestions : Entrée, le bouton d’ajout ou la perte du focus ajoutent la saisie, les flèches choisissent une suggestion et la composition IME ne valide jamais.

Package: minerva-design@1.23.2

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## TagInput

Support: beta

Native Angular: MnTagInput. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTagInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "options",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "commitOnBlur",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "separators",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "size",
    "typeText": "TagInputSize",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "addLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "removeLabel",
    "typeText": "((tag: string) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  },
  {
    "name": "createLabel",
    "typeText": "((tag: string) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string[] | undefined",
    "required": false
  },
  {
    "name": "draftChange",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "clear",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/tag-input/tag-input.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
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
  "css:TagInput": {
    "kind": "cssVars",
    "source": "react/src/components/TagInput",
    "vars": [
      {
        "name": "--tag-input-gap",
        "description": "Space between the tags and between the tags and the entry row"
      },
      {
        "name": "--tag-input-tag-min-height",
        "description": "Minimum height of a tag (defaults to the density's small control height)"
      },
      {
        "name": "--tag-input-list-max-height",
        "description": "Maximum height of the suggestion list before it scrolls"
      },
      {
        "name": "--tag-input-list-radius",
        "description": "Corner radius of the suggestion list (defaults to --radius-md)"
      },
      {
        "name": "--tag-input-option-padding-y",
        "description": "Vertical padding of a suggestion (follows the density's row padding)"
      },
      {
        "name": "--tag-input-option-padding-x",
        "description": "Horizontal padding of a suggestion (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Add and remove labels

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTagInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTagInput],
  template: `
<mn-tag-input aria-label="Labels" [(value)]="value"/><output>{{value.join(', ')}}</output>
  `,
})
export class Example {
  value = ["Design", "Frontend"];
}

```

## Example: Suggested labels

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTagInput } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTagInput],
  template: `
<mn-tag-input aria-label="Skills" [options]="options" [(value)]="value"/>
  `,
})
export class Example {
  options = ["TypeScript", "Angular", "React", "Vue"];
  value: string[] = [];
}

```
