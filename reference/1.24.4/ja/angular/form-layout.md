# FormLayout フォームレイアウト

フィールドをレスポンシブグリッドに配置するネイティブ form。送信・リセット・検証はネイティブの挙動のままです。

Package: minerva-design@1.24.4

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

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
