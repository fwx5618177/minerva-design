# Pagination

Découpe de longues listes de données en pages et permet de naviguer entre elles.

Package: minerva-design@1.20.2

Renderer: angular

Locale: fr

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

### Prise en charge du clavier

La pagination est un repère  composé de boutons natifs ; la page courante est marquée avec aria-current="page" et les éléments indisponibles sont désactivés. Lorsqu’un élément a le focus, ArrowLeft/ArrowRight passent à la page précédente/suivante et Home/End à la première/dernière page, et le focus suit la page courante. Si le bouton focalisé devient désactivé, le focus passe à la page courante.

## Pagination

Support: beta

Native Angular: MnPagination. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPagination"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "page",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "pageSize",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "total",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "simple",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "showJumper",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "showSizeChanger",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "pageSizeOptions",
    "typeText": "readonly number[]",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"square\" | \"rounded\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"outline\" | \"solid\" | \"ghost\"",
    "required": false,
    "source": "packages/angular/src/components/navigation/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "pageChange",
    "typeText": "number",
    "required": false
  },
  {
    "name": "pageSizeChange",
    "typeText": "number",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "page",
    "event": "pageChange",
    "syntax": "[(page)]"
  },
  {
    "prop": "pageSize",
    "event": "pageSizeChange",
    "syntax": "[(pageSize)]"
  }
]
```

## CSS variables

```json
{
  "css:Pagination": {
    "kind": "cssVars",
    "source": "react/src/components/Pagination",
    "vars": [
      {
        "name": "--pagination-item-size",
        "description": "Height and minimum width of the page buttons (every size; defaults to the density's control height)"
      },
      {
        "name": "--pagination-item-radius",
        "description": "Corner radius of the page buttons (defaults to --radius-md; the shape prop wins)"
      },
      {
        "name": "--pagination-gap",
        "description": "Space between the items"
      },
      {
        "name": "--pagination-font-size",
        "description": "Font size"
      },
      {
        "name": "--pagination-active-background",
        "description": "Background of the current page (solid variant)"
      },
      {
        "name": "--pagination-active-color",
        "description": "Text color of the current page (solid variant)"
      },
      {
        "name": "--pagination-hover-background",
        "description": "Background of a hovered page button (defaults to --hover-color)"
      },
      {
        "name": "--pagination-subtle-background",
        "description": "Background of the current page of the ghost variant (defaults to --primary-color-subtle)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Page and page size

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPagination } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPagination],
  template: `
<mn-pagination [total]="128" [(page)]="page" [(pageSize)]="pageSize" showSizeChanger showJumper/><output>Page {{page}} · {{pageSize}} per page</output>
  `,
})
export class Example {
  page = 1;
  pageSize = 10;
}

```

## Example: Simple pagination

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPagination } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPagination],
  template: `
<mn-pagination [total]="65" simple/><mn-pagination [total]="100" disabled/>
  `,
})
export class Example {

}

```
