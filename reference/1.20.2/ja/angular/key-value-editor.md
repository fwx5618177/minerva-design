# KeyValueEditor キー・値エディター

複数行のキーと値を持つ文字列ペアの順序付きリストを編集し、追加・削除ができます。行は安定した id で追跡されます。

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
