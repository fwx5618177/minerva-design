# Switch スイッチ

単一の設定をオン／オフで切り替え、即座に反映します。

Package: minerva-design@1.24.2

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.2",
  "sourceCommit": "2d9157080afa96d568e1ab5dd5ebf85bbe169957",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:35a4364a093ce8ba3112a6866b1ac14e75de4497c8a2778617ef119cb4e030b2"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Switch

Support: beta

Native Angular: MnSwitch. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSwitch"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "defaultChecked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "size",
    "typeText": "SwitchSize",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "color",
    "typeText": "SwitchColor",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "shape",
    "typeText": "\"square\" | \"round\"",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "variant",
    "typeText": "\"slider\" | \"segmented\"",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "label",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "offLabel",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "onLabel",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "labelPlacement",
    "typeText": "SwitchLabelPlacement",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "ripple",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "icon",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  },
  {
    "name": "iconPlacement",
    "typeText": "\"start\" | \"end\"",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts"
  }
]
```

### events

```json
[
  {
    "name": "checkedChange",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/switch/switch.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## CSS variables

```json
{
  "css:Switch": {
    "kind": "cssVars",
    "source": "react/src/components/Switch",
    "vars": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Settings

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSwitch } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSwitch],
  template: `
<mn-switch label="Email notifications" [(checked)]="enabled"/><output>{{enabled?'Notifications on':'Notifications off'}}</output>
  `,
})
export class Example {
  enabled = true;
}

```

## Example: Sizes and disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSwitch, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSwitch, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-switch label="Small" size="small"/><mn-switch label="Large" size="large" [checked]="true"/><mn-switch label="Locked" disabled/></mn-stack>
  `,
})
export class Example {

}

```
