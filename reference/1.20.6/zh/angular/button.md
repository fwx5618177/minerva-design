# Button 按钮

用于触发一个操作或事件，例如提交表单或打开对话框。

Package: minerva-design@1.20.6

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## Button

Support: beta

Native Angular: MnButton. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnButton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "type",
    "typeText": "\"button\" | \"submit\" | \"reset\"",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "color",
    "typeText": "ColorScheme",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "variant",
    "typeText": "ButtonVariant",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "size",
    "typeText": "ButtonSize",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "loadingText",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "startIcon",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "endIcon",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "fullWidth",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "active",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "shape",
    "typeText": "ButtonShape | undefined",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
  },
  {
    "name": "borderRadius",
    "typeText": "ButtonRadius | undefined",
    "required": false,
    "source": "packages/angular/src/components/button/button.ts"
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
  "css:Button": {
    "kind": "cssVars",
    "source": "react/src/components/Button",
    "vars": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Actions and feedback

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><button mnButton (click)="count=count+1">Click me</button><output aria-live="polite">Clicked {{count}} times</output></mn-stack>
  `,
})
export class Example {
  count = 0;
}

```

## Example: Variants and loading

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><button mnButton variant="outline">Outline</button><button mnButton variant="ghost">Ghost</button><button mnButton color="danger">Delete</button><button mnButton loading loadingText="Saving">Save</button><button mnButton disabled>Disabled</button></mn-stack>
  `,
})
export class Example {

}

```

## Example: Sizes and shapes

size controls density; shape and borderRadius choose preset or pixel radii. Icon-only buttons require an accessible name.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><button mnButton size="xsmall">XSmall</button><button mnButton size="small">Small</button><button mnButton size="medium">Medium</button><button mnButton size="large">Large</button><button mnButton size="xlarge">XLarge</button><button mnButton shape="square">Square</button><button mnButton shape="rounded">Rounded</button><button mnButton shape="circle" aria-label="Add">+</button><button mnButton borderRadius="none">No radius</button><button mnButton [borderRadius]="12">12px radius</button></mn-stack>
  `,
})
export class Example {

}

```

## Example: Template icons links and width

startIcon/endIcon accept Angular TemplateRef content. Apply mnButton directly to a native anchor for navigation; fullWidth fills the available container.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnStack],
  template: `
<ng-template #plus><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></ng-template><ng-template #arrow><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></ng-template><mn-stack direction="row" wrap gap="3" align="center"><button mnButton [startIcon]="plus" (click)="count=count+1">Add</button><button mnButton [endIcon]="arrow" variant="outline" (click)="count=count+1">Continue</button><a mnButton variant="link" href="#/button?framework=angular">Button documentation</a><output>{{count}} actions</output></mn-stack><button mnButton fullWidth (click)="count=0">Reset full-width action</button>
  `,
})
export class Example {
  count = 0;
}

```

## Example: Native form buttons

mnButton defaults to type=button. Native submit and reset buttons retain form behavior; the reset handler also restores the controlled Angular model.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnInput, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnInput, MnStack],
  template: `
<form (submit)="$event.preventDefault();result='Submitted '+title" (reset)="title='Draft';result='Reset'"><mn-stack direction="row" wrap gap="3" align="center"><mn-input name="title" aria-label="Title" [(value)]="title"/><button mnButton color="neutral" variant="outline" (click)="result='Preview opened (form not submitted)'">Preview</button><button mnButton type="reset" color="neutral" variant="ghost">Reset</button><button mnButton type="submit">Save</button></mn-stack></form><output aria-live="polite">{{result}}</output>
  `,
})
export class Example {
  title = "Draft";
  result = "Nothing yet";
}

```
