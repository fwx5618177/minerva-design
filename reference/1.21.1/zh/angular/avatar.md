# Avatar 头像

以图片表示用户；没有图片时显示名字的首字母。

Package: minerva-design@1.21.1

Renderer: angular

Locale: zh

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

## Avatar

Support: beta

Native Angular: MnAvatar. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAvatar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "src",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\" | \"xsmall\" | \"xlarge\" | \"xxlarge\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"square\" | \"rounded\"",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  }
]
```

## AvatarGroup

Support: beta

Native Angular: MnAvatarGroup. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAvatarGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly AvatarItem[]",
    "required": false,
    "source": "packages/angular/src/components/foundations/index.ts"
  },
  {
    "name": "max",
    "typeText": "number",
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

## CSS variables

```json
{
  "css:Avatar": {
    "kind": "cssVars",
    "source": "react/src/components/Avatar",
    "vars": [
      {
        "name": "--avatar-size",
        "description": "Width and height of every avatar (overrides the size presets; a numeric size prop wins)"
      },
      {
        "name": "--avatar-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--avatar-bg-color",
        "description": "Background color when no color is set (defaults to --info-color)"
      },
      {
        "name": "--avatar-text-color",
        "description": "Color of the initials"
      },
      {
        "name": "--avatar-border-color",
        "description": "Border color"
      },
      {
        "name": "--avatar-stacked-overlap",
        "description": "How far a stacked avatar overlaps the previous one"
      },
      {
        "name": "--avatar-group-overlap",
        "description": "How far each avatar overlaps the previous one"
      },
      {
        "name": "--avatar-group-count-bg-color",
        "description": "Background color of the \"+N\" counter"
      },
      {
        "name": "--avatar-group-count-text-color",
        "description": "Text color of the \"+N\" counter"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Initials and groups

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAvatar, MnAvatarGroup, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAvatar, MnAvatarGroup, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-avatar name="Ada Lovelace"/><mn-avatar name="Grace Hopper" shape="rounded"/><mn-avatar-group [items]="people" [max]="2"/></mn-stack>
  `,
})
export class Example {
  people = [
  {
    "name": "Ada Lovelace"
  },
  {
    "name": "Grace Hopper"
  },
  {
    "name": "Alan Turing"
  },
  {
    "name": "Katherine Johnson"
  }
];
}

```

## Example: 尺寸

提供 small、medium（默认）和 large 三种尺寸。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAvatar, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAvatar, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-avatar name="Small" size="small"/><mn-avatar name="Medium"/><mn-avatar name="Large" size="large"/><mn-avatar name="Extra Large" size="xlarge"/></mn-stack>
  `,
})
export class Example {

}

```
