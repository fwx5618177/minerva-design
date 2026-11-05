# TagInput

Free-form tag entry with suggestions: Enter, the add button or blur add the draft, arrow keys pick a suggestion, and IME composition never commits.

Package: minerva-design@1.21.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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
