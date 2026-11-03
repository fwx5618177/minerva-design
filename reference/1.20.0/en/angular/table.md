# Table

Displays rows of data. Use Table with columns and data for the common case, TableRoot and its parts for custom headers or merged cells, and DataTable for pagination, loading and error states.

Package: minerva-design@1.20.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## DataTable

Support: beta

Native Angular: MnDataTable. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDataTable"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "rows",
    "typeText": "readonly Record<string, unknown>[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "columns",
    "typeText": "readonly TableColumn[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "keyField",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "caption",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"simple\" | \"striped\" | \"bordered\"",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "error",
    "typeText": "string | null",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "selectable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "selection",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "sort",
    "typeText": "TableSort | null",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selectionChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "sortChange",
    "typeText": "TableSort | null",
    "required": false
  },
  {
    "name": "retry",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
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
    "prop": "selection",
    "event": "selectionChange",
    "syntax": "[(selection)]"
  },
  {
    "prop": "sort",
    "event": "sortChange",
    "syntax": "[(sort)]"
  }
]
```

## Table

Support: beta

Native Angular: MnDataTable: declarative columns + rows, sort/selection models, loading/error/empty states. Use MnTableRoot and native table directives for custom headers or merged cells.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDataTable"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "rows",
    "typeText": "readonly Record<string, unknown>[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "columns",
    "typeText": "readonly TableColumn[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "keyField",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "caption",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"simple\" | \"striped\" | \"bordered\"",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "error",
    "typeText": "string | null",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "selectable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "selection",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "sort",
    "typeText": "TableSort | null",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selectionChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "sortChange",
    "typeText": "TableSort | null",
    "required": false
  },
  {
    "name": "retry",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
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
    "prop": "selection",
    "event": "selectionChange",
    "syntax": "[(selection)]"
  },
  {
    "prop": "sort",
    "event": "sortChange",
    "syntax": "[(sort)]"
  }
]
```

## TableBody

Support: beta

Native Angular: MnTableBody. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTableBody"
  ],
  "kind": "named"
}
```

## TableCell

Support: beta

Native Angular: MnTableCell. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTableCell"
  ],
  "kind": "named"
}
```

## TableCellContent

Support: beta

Native Angular: MnTableCellContent. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTableCellContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "primary",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "secondary",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "monospace",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "maxWidth",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## TableHead

Support: beta

Native Angular: MnTableHead. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTableHead"
  ],
  "kind": "named"
}
```

## TableHeader

Support: beta

Native Angular: MnTableHeader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTableHeader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "sort",
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/table/index.ts"
  }
]
```

## TableRoot

Support: beta

Native Angular: MnTableRoot. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTableRoot"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/table/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/table/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"simple\" | \"striped\" | \"bordered\"",
    "required": false,
    "source": "packages/angular/src/components/table/index.ts"
  },
  {
    "name": "hoverable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/table/index.ts"
  },
  {
    "name": "scroll",
    "typeText": "{ x?: string | number | undefined; y?: string | number | undefined; } | undefined",
    "required": false,
    "source": "packages/angular/src/components/table/index.ts"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## TableRow

Support: beta

Native Angular: MnTableRow. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTableRow"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "selected",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/table/index.ts"
  }
]
```

## CSS variables

```json
{
  "css:Table": {
    "kind": "cssVars",
    "source": "react/src/components/Table",
    "vars": [
      {
        "name": "--table-cell-padding-y",
        "description": "Vertical padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-cell-padding-x",
        "description": "Horizontal padding of the cells (every size; follows the density by default)"
      },
      {
        "name": "--table-font-size",
        "description": "Font size of the body cells (every size)"
      },
      {
        "name": "--table-header-bg",
        "description": "Background color of the header row"
      },
      {
        "name": "--table-border-color",
        "description": "Color of the row separators"
      },
      {
        "name": "--table-radius",
        "description": "Corner radius of the wrapper (defaults to --radius-lg)"
      },
      {
        "name": "--table-stripe-bg",
        "description": "Background color of the odd rows of a striped table"
      },
      {
        "name": "--table-hover-bg",
        "description": "Background color of the hovered row of a hoverable table"
      },
      {
        "name": "--table-selected-bg",
        "description": "Background color of the selected rows (row selection)"
      },
      {
        "name": "--table-sort-icon-color",
        "description": "Color of the sort indicator of an unsorted sortable column"
      },
      {
        "name": "--table-focus-ring-color",
        "description": "Outline color of the focused scroll region"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Semantic composition and merged cells

Native table directives preserve colspan/rowspan and custom interactive headers. Bind sort to expose aria-sort and styling state; the owner applies its own data ordering for a custom table.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTableRoot, MnTableHead, MnTableBody, MnTableRow, MnTableHeader, MnTableCell, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTableRoot, MnTableHead, MnTableBody, MnTableRow, MnTableHeader, MnTableCell, MnButton],
  template: `
<mn-table-root label="Project summary" variant="bordered" [scroll]="{x:480}"><thead mnTableHead><tr mnTableRow><th mnTableHeader scope="col" [sort]="order"><button mnButton variant="ghost" size="small" (click)="order=order==='ascending'?'descending':'ascending'">Project</button></th><th mnTableHeader scope="col">Action</th></tr></thead><tbody mnTableBody><tr mnTableRow [selected]="selected"><td mnTableCell>Minerva</td><td mnTableCell><button mnButton size="small" (click)="selected=!selected">{{selected?'Deselect':'Select'}}</button></td></tr><tr mnTableRow><td mnTableCell colspan="2">Custom content spans both columns.</td></tr></tbody></mn-table-root>
  `,
})
export class Example {
  selected = false;
  order: 'ascending' | 'descending' = "ascending";
}

```

## Example: Sort and select rows

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDataTable } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDataTable],
  template: `
<mn-data-table caption="Team members" [columns]="columns" [rows]="rows" selectable [(selection)]="selection" [(sort)]="sort"/><output>{{selection.length}} selected · Sort: {{sort?.key || 'none'}} {{sort?.direction || ''}}</output>
  `,
})
export class Example {
  columns = [
  {
    "key": "name",
    "header": "Name",
    "sortable": true
  },
  {
    "key": "role",
    "header": "Role"
  }
];
  rows = [
  {
    "id": "1",
    "name": "Grace",
    "role": "Engineer"
  },
  {
    "id": "2",
    "name": "Ada",
    "role": "Designer"
  },
  {
    "id": "3",
    "name": "Alan",
    "role": "Researcher"
  }
];
  selection: string[] = [];
  sort: import('minerva-design/angular').TableSort | null = null;
}

```

## Example: Empty and error states

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDataTable } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDataTable],
  template: `
<mn-data-table caption="Empty results" [columns]="columns"/><mn-data-table caption="Network error" [columns]="columns" [error]="error" (retry)="error=''"/>
  `,
})
export class Example {
  columns = [
  {
    "key": "name",
    "header": "Name"
  }
];
  error = "Unable to load records";
}

```

## Example: Density appearance and loading

size and variant style the same data; loading temporarily replaces rows. Reload/Finish loading lets you inspect and restore the loading state without a network dependency.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDataTable, MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDataTable, MnButton, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><button mnButton variant="outline" (click)="compact=!compact">Toggle density</button><button mnButton variant="outline" (click)="striped=!striped">Toggle stripes</button><button mnButton (click)="loading=!loading">{{loading?'Finish loading':'Reload'}}</button></mn-stack><mn-data-table caption="Project inventory" [columns]="columns" [rows]="rows" [size]="compact?'small':'large'" [variant]="striped?'striped':'bordered'" [loading]="loading"/><output>{{loading?'Loading records':compact?'Compact density':'Comfortable density'}}</output>
  `,
})
export class Example {
  compact = true;
  striped = true;
  loading = false;
  columns = [
  {
    "key": "name",
    "header": "Project"
  },
  {
    "key": "status",
    "header": "Status"
  }
];
  rows = [
  {
    "id": "one",
    "name": "Minerva",
    "status": "Active"
  }
];
}

```
