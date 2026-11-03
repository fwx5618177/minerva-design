# Pagination 分页

将较长的数据列表分页，并让用户在页面之间切换。

Package: minerva-design@1.19.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘支持

分页组件是由原生按钮组成的  地标；当前页带有 aria-current="page" 标记，不可用的项会被禁用。某一项获得焦点时，ArrowLeft/ArrowRight 切换到上一页/下一页，Home/End 跳到第一页/最后一页，焦点会跟随当前页。若获得焦点的按钮变为禁用，焦点会移到当前页。

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
