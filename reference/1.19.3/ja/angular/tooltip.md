# Tooltip ツールチップ

要素にホバーまたはフォーカスしたときに表示される短いテキストラベルです。ビューポートの端では反転・シフトして表示を保ちます。

Package: minerva-design@1.19.3

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
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
