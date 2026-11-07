# VirtualList 仮想リスト

スクロールコンテナ内で表示されている行だけをマウントし、長いリストを効率よく描画します。

Package: minerva-design@1.23.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## VirtualList

Support: beta

Native Angular: MnVirtualList. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnVirtualList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly unknown[]",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "itemHeight",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "height",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "overscan",
    "typeText": "number",
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
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "displayWith",
    "typeText": "(item: unknown) => string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  }
]
```

## CSS variables

```json
{
  "css:VirtualList": {
    "kind": "cssVars",
    "source": "react/src/components/VirtualList",
    "vars": [
      {
        "name": "--virtual-list-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--virtual-list-shadow",
        "description": "Shadow at rest (defaults to --shadow-sm)"
      },
      {
        "name": "--virtual-list-hover-shadow",
        "description": "Shadow while hovered (defaults to --shadow-md)"
      },
      {
        "name": "--virtual-list-scrollbar-size",
        "description": "Width of the scrollbar (WebKit / Blink)"
      },
      {
        "name": "--virtual-list-loading-padding",
        "description": "Padding of the loading indicator row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Windowed data

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnVirtualList } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnVirtualList],
  template: `
<mn-virtual-list [items]="items" [height]="220" [itemHeight]="36"/>
  `,
})
export class Example {
  items = ["Record 1", "Record 2", "Record 3", "Record 4", "Record 5", "Record 6", "Record 7", "Record 8", "Record 9", "Record 10", "Record 11", "Record 12", "Record 13", "Record 14", "Record 15", "Record 16", "Record 17", "Record 18", "Record 19", "Record 20", "Record 21", "Record 22", "Record 23", "Record 24", "Record 25", "Record 26", "Record 27", "Record 28", "Record 29", "Record 30", "Record 31", "Record 32", "Record 33", "Record 34", "Record 35", "Record 36", "Record 37", "Record 38", "Record 39", "Record 40", "Record 41", "Record 42", "Record 43", "Record 44", "Record 45", "Record 46", "Record 47", "Record 48", "Record 49", "Record 50", "Record 51", "Record 52", "Record 53", "Record 54", "Record 55", "Record 56", "Record 57", "Record 58", "Record 59", "Record 60", "Record 61", "Record 62", "Record 63", "Record 64", "Record 65", "Record 66", "Record 67", "Record 68", "Record 69", "Record 70", "Record 71", "Record 72", "Record 73", "Record 74", "Record 75", "Record 76", "Record 77", "Record 78", "Record 79", "Record 80", "Record 81", "Record 82", "Record 83", "Record 84", "Record 85", "Record 86", "Record 87", "Record 88", "Record 89", "Record 90", "Record 91", "Record 92", "Record 93", "Record 94", "Record 95", "Record 96", "Record 97", "Record 98", "Record 99", "Record 100", "Record 101", "Record 102", "Record 103", "Record 104", "Record 105", "Record 106", "Record 107", "Record 108", "Record 109", "Record 110", "Record 111", "Record 112", "Record 113", "Record 114", "Record 115", "Record 116", "Record 117", "Record 118", "Record 119", "Record 120", "Record 121", "Record 122", "Record 123", "Record 124", "Record 125", "Record 126", "Record 127", "Record 128", "Record 129", "Record 130", "Record 131", "Record 132", "Record 133", "Record 134", "Record 135", "Record 136", "Record 137", "Record 138", "Record 139", "Record 140", "Record 141", "Record 142", "Record 143", "Record 144", "Record 145", "Record 146", "Record 147", "Record 148", "Record 149", "Record 150", "Record 151", "Record 152", "Record 153", "Record 154", "Record 155", "Record 156", "Record 157", "Record 158", "Record 159", "Record 160", "Record 161", "Record 162", "Record 163", "Record 164", "Record 165", "Record 166", "Record 167", "Record 168", "Record 169", "Record 170", "Record 171", "Record 172", "Record 173", "Record 174", "Record 175", "Record 176", "Record 177", "Record 178", "Record 179", "Record 180", "Record 181", "Record 182", "Record 183", "Record 184", "Record 185", "Record 186", "Record 187", "Record 188", "Record 189", "Record 190", "Record 191", "Record 192", "Record 193", "Record 194", "Record 195", "Record 196", "Record 197", "Record 198", "Record 199", "Record 200"];
}

```

## Example: Custom row template

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnVirtualList } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnVirtualList],
  template: `
<mn-virtual-list [items]="items" [height]="160"><ng-template let-item let-i="index"><strong>{{i+1}}.</strong> {{item}}</ng-template></mn-virtual-list>
  `,
})
export class Example {
  items = ["Design", "Engineering", "Research", "Operations", "Support", "Finance"];
}

```
