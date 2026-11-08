# List

Quiet operational lists on native ul / li elements with primary and secondary text, a decorative icon and trailing actions.

Package: minerva-design@1.23.2

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Cell

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## CellGroup

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## List

Support: beta

Native Angular: MnList. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "bordered",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "dividers",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "density",
    "typeText": "\"compact\" | \"comfortable\"",
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

## ListItem

Support: beta

Native Angular: MnListItem. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnListItem"
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
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "icon",
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
  },
  {
    "name": "[mnActions]"
  }
]
```

## CSS variables

```json
{
  "css:List": {
    "kind": "cssVars",
    "source": "react/src/components/List",
    "vars": [
      {
        "name": "--list-item-min-height",
        "description": "Minimum height of an item (follows the density; compact lists are shorter)"
      },
      {
        "name": "--list-item-padding-y",
        "description": "Vertical padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-padding-x",
        "description": "Horizontal padding of an item (follows the density's row padding)"
      },
      {
        "name": "--list-item-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--list-divider-color",
        "description": "Color of the dividers between items"
      },
      {
        "name": "--list-icon-size",
        "description": "Size of the leading icon slot"
      },
      {
        "name": "--list-border-color",
        "description": "Border color of a bordered list (defaults to --border-color)"
      },
      {
        "name": "--list-radius",
        "description": "Corner radius of a bordered list (defaults to --radius-lg)"
      },
      {
        "name": "--list-background",
        "description": "Background of a bordered list (defaults to --surface-color)"
      },
      {
        "name": "--list-item-hover-background",
        "description": "Background of a row of a bordered list on hover / while a control inside it has the focus"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Operational rows

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnList, MnListItem, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnList, MnListItem, MnButton],
  template: `
<ul mnList dividers><li mnListItem label="Design review" description="Today at 14:00" icon="◷"><button mnButton mnActions size="small" variant="ghost" (click)="result='Review opened'">Open</button></li><li mnListItem label="Release notes" description="Updated yesterday" icon="▤"></li></ul><output>{{result}}</output>
  `,
})
export class Example {
  result = "";
}

```

## Example: Compact list

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnList, MnListItem } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnList, MnListItem],
  template: `
<ul mnList density="compact" bordered><li mnListItem label="Engineering"></li><li mnListItem label="Research"></li><li mnListItem label="Support"></li></ul>
  `,
})
export class Example {

}

```
