# Tooltip 文字提示

当用户悬停或聚焦某个元素时显示的简短文字提示。靠近视口边缘时会翻转和平移以保持可见。

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

## Tooltip

Support: beta

Native Angular: MnTooltip. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTooltip"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "enterDelay",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "leaveDelay",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "text",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"success\" | \"warning\" | \"danger\" | \"info\" | \"neutral\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "shape",
    "typeText": "\"square\" | \"rounded\" | \"default\" | \"thought\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"solid\" | \"glass\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
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

### bindings

```json
[
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## TooltipProvider

Support: beta

Native Angular: MnTooltipProvider. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTooltipProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "enterDelay",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/overlays/tooltip-provider.ts"
  },
  {
    "name": "leaveDelay",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/overlays/tooltip-provider.ts"
  },
  {
    "name": "skipDelay",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/overlays/tooltip-provider.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/tooltip-provider.ts"
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
  "css:Tooltip": {
    "kind": "cssVars",
    "source": "react/src/components/Tooltip",
    "vars": [
      {
        "name": "--tooltip-max-width",
        "description": "Maximum width (capped by the viewport)"
      },
      {
        "name": "--tooltip-padding",
        "description": "Padding (every shape)"
      },
      {
        "name": "--tooltip-radius",
        "description": "Corner radius (defaults to the radius of the shape)"
      },
      {
        "name": "--tooltip-font-size",
        "description": "Font size"
      },
      {
        "name": "--tooltip-bg",
        "description": "Background (gradients allowed; every variant)"
      },
      {
        "name": "--tooltip-color",
        "description": "Text color (every variant)"
      },
      {
        "name": "--tooltip-shadow",
        "description": "Shadow (defaults to --shadow-md, --shadow-lg for the glass variant)"
      },
      {
        "name": "--tooltip-z-index",
        "description": "Stacking order (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Shared tooltip delays

Provider delays are shared between hints; the disabled scope closes active hints and cancels pending timers. Move between Save and Export to observe skipDelay.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTooltipProvider, MnTooltip, MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTooltipProvider, MnTooltip, MnButton, MnStack],
  template: `
<button mnButton variant="outline" (click)="disabled=!disabled">{{disabled?'Enable hints':'Disable hints'}}</button><mn-tooltip-provider [disabled]="disabled" [enterDelay]="500" [leaveDelay]="100" [skipDelay]="600"><mn-stack direction="row" wrap gap="3" align="center"><mn-tooltip text="Save changes"><button mnButton>Save</button></mn-tooltip><mn-tooltip text="Export report"><button mnButton variant="outline">Export</button></mn-tooltip></mn-stack></mn-tooltip-provider>
  `,
})
export class Example {
  disabled = false;
}

```

## Example: Hover and focus

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTooltip, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTooltip, MnButton],
  template: `
<mn-tooltip text="Save your work before leaving"><button mnButton>Save</button></mn-tooltip>
  `,
})
export class Example {

}

```

## Example: Placement and tone

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTooltip, MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTooltip, MnButton, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><mn-tooltip text="An important action" color="warning" placement="top"><button mnButton variant="outline">Above</button></mn-tooltip><mn-tooltip text="More information" variant="subtle" shape="rounded"><button mnButton variant="ghost">Details</button></mn-tooltip></mn-stack>
  `,
})
export class Example {

}

```
