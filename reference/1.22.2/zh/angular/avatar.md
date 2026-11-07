# Avatar 头像

以图片表示用户；没有图片时显示名字的首字母。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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
