# Textarea

Saisie multiligne partageant les tailles et variantes d’Input ; le redimensionnement manuel est désactivé, utilisez rows.

Package: minerva-design@1.21.0

Renderer: angular

Locale: fr

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

## Textarea

Support: beta

Native Angular: MnTextarea. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTextarea"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "variant",
    "typeText": "TextareaVariant",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "size",
    "typeText": "TextareaSize",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/textarea/textarea.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | undefined",
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
  "css:Textarea": {
    "kind": "cssVars",
    "source": "react/src/components/Textarea",
    "vars": [
      {
        "name": "--textarea-min-height",
        "description": "Minimum height (every size)"
      },
      {
        "name": "--textarea-padding-y",
        "description": "Vertical padding of the text"
      },
      {
        "name": "--textarea-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--textarea-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--textarea-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--textarea-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--textarea-border-color",
        "description": "Border color at rest"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Message input

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTextarea } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTextarea],
  template: `
<textarea mnTextarea aria-label="Message" [(value)]="value" rows="4" placeholder="Write a message"></textarea><output>{{value.length}} characters</output>
  `,
})
export class Example {
  value = "";
}

```

## Example: Read-only content

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTextarea } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTextarea],
  template: `
<textarea mnTextarea aria-label="Terms" value="Your published message appears here." readOnly rows="3"></textarea>
  `,
})
export class Example {

}

```
