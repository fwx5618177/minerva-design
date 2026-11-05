# Pagination

Splits long lists of data into pages and lets users move between them.

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

### Keyboard support

The pagination is a  landmark made of native buttons; the current page is marked with aria-current="page" and unavailable items are disabled. When an item has focus, ArrowLeft/ArrowRight go to the previous/next page and Home/End to the first/last page, and focus follows the current page. If the focused button becomes disabled, focus moves to the current page.

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
