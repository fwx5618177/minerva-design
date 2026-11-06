# JsonField

Zone de texte JSON stricte avec bouton de formatage et retour de syntaxe accessible ; le formatage conserve nombres, échappements et ordre des clés.

Package: minerva-design@1.21.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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
