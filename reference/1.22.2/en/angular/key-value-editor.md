# KeyValueEditor

Edits an ordered list of string pairs with multi-line keys and values, add and remove actions; rows are tracked by a stable id.

Package: minerva-design@1.22.2

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## KeyValueEditor

Support: beta

Native Angular: MnKeyValueEditor. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnKeyValueEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "readonly KeyValueEntry[]",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "readOnly",
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
    "name": "valueChange",
    "typeText": "readonly KeyValueEntry[]",
    "required": false
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
  "css:KeyValueEditor": {
    "kind": "cssVars",
    "source": "react/src/components/KeyValueEditor",
    "vars": [
      {
        "name": "--key-value-editor-gap",
        "description": "Space between the rows and the add button"
      },
      {
        "name": "--key-value-editor-column-gap",
        "description": "Space between the key, the value and the remove button of a row"
      },
      {
        "name": "--key-value-editor-control-height",
        "description": "Size of the remove button and minimum height of the key field and of the add button (defaults to the density's small control height)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Edit environment values

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnKeyValueEditor } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnKeyValueEditor],
  template: `
<mn-key-value-editor [(value)]="value"/><output>{{value.length}} entries</output>
  `,
})
export class Example {
  value = [
  {
    "key": "REGION",
    "value": "eu-west"
  },
  {
    "key": "MODE",
    "value": "production"
  }
];
}

```

## Example: Disabled data

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnKeyValueEditor } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnKeyValueEditor],
  template: `
<mn-key-value-editor [value]="value" disabled/>
  `,
})
export class Example {
  value = [
  {
    "key": "VERSION",
    "value": "1.0"
  }
];
}

```
