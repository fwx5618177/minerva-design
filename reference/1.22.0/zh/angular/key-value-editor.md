# KeyValueEditor 键值编辑器

编辑有序的字符串键值对列表，键和值支持多行，提供添加与删除操作；行由稳定 id 跟踪。

Package: minerva-design@1.22.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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
