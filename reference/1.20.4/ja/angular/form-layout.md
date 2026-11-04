# FormLayout フォームレイアウト

フィールドをレスポンシブグリッドに配置するネイティブ form。送信・リセット・検証はネイティブの挙動のままです。

Package: minerva-design@1.20.4

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormLayout

Support: beta

Native Angular: MnFormLayout. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFormLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columns",
    "typeText": "FormLayoutColumns",
    "required": false,
    "source": "packages/angular/src/components/form-layout/form-layout.ts"
  },
  {
    "name": "gap",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/form-layout/form-layout.ts"
  },
  {
    "name": "rowGap",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-layout/form-layout.ts"
  },
  {
    "name": "columnGap",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/form-layout/form-layout.ts"
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

## CSS variables

```json
{
  "css:FormLayout": {
    "kind": "cssVars",
    "source": "react/src/components/FormLayout",
    "vars": [
      {
        "name": "--form-layout-max-width",
        "description": "Maximum width of the form (none by default)"
      },
      {
        "name": "--form-layout-margin-inline",
        "description": "Inline margin of the form (set auto with a max width to center it)"
      },
      {
        "name": "--form-layout-padding",
        "description": "Inner padding of the form"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Submit a form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFormLayout, MnFormControl, MnInput, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFormLayout, MnFormControl, MnInput, MnButton],
  template: `
<form mnFormLayout (submit)="$event.preventDefault();saved=true"><mn-form-control label="Project name" required><mn-input [(value)]="value" required/></mn-form-control><button mnButton type="submit">Create project</button></form><output>{{saved?'Created '+value:''}}</output>
  `,
})
export class Example {
  value = "New project";
  saved = false;
}

```

## Example: Settings form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFormLayout, MnCheckbox, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFormLayout, MnCheckbox, MnButton],
  template: `
<form mnFormLayout (submit)="$event.preventDefault();saved=true"><mn-checkbox label="Receive product updates" [(checked)]="enabled"/><button mnButton type="submit" variant="outline">Save preferences</button></form><output>{{saved?'Preferences saved':''}}</output>
  `,
})
export class Example {
  enabled = true;
  saved = false;
}

```
