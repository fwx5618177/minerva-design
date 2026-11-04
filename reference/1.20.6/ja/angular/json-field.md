# JsonField JSON フィールド

整形ボタンとアクセシブルな構文フィードバックを持つ厳密な JSON テキストエリア。整形は数値・エスケープ・キー順を保持します。

Package: minerva-design@1.20.6

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## JsonField

Support: beta

Native Angular: MnJsonField. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnJsonField"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
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
    "name": "rows",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "indent",
    "typeText": "number",
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
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
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
    "typeText": "string",
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
  "css:JsonField": {
    "kind": "cssVars",
    "source": "react/src/components/JsonField",
    "vars": [
      {
        "name": "--json-field-gap",
        "description": "Space between the toolbar, the editor and the status line"
      },
      {
        "name": "--json-field-font-family",
        "description": "Font family of the editor (defaults to the monospace stack)"
      },
      {
        "name": "--json-field-font-size",
        "description": "Font size of the editor"
      },
      {
        "name": "--json-field-tab-size",
        "description": "Rendered width of a tab character in the editor"
      },
      {
        "name": "--json-field-status-font-size",
        "description": "Font size of the validation status line"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Validate and format

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnJsonField } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnJsonField],
  template: `
<mn-json-field label="Configuration" [(value)]="value"/><pre>{{value}}</pre>
  `,
})
export class Example {
  value = "{\"name\":\"Minerva\",\"enabled\":true}";
}

```

## Example: Invalid JSON

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnJsonField } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnJsonField],
  template: `
<mn-json-field label="Invalid configuration" value="invalid JSON" required/>
  `,
})
export class Example {

}

```
