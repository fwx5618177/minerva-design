# Popover 气泡卡片

点击触发、锚定在触发器上的浮层面板，用于筛选器、账户菜单等可交互内容。与 Tooltip 不同，它可以包含可聚焦内容，并自行管理焦点、Escape 和外部点击；在 Modal 中会先于 Modal 关闭。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Popover

Support: beta

Native Angular: MnPopover. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPopover"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## PopoverAnchor

Support: beta

Native Angular: MnPopoverAnchor. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPopoverAnchor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "mnPopoverAnchor",
    "typeText": "\"\" | MnPopover",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

## PopoverClose

Support: beta

Native Angular: MnPopoverClose. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPopoverClose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "mnPopoverClose",
    "typeText": "\"\" | MnPopover",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

## PopoverContent

Support: n/a

Native Angular: MnPopover renders a labelled portalled dialog around projected content; placement, forceMount and the open model configure it.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPopover"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## PopoverTrigger

Support: n/a

Native Angular: MnPopover renders its native trigger button using label, disabled and the open model; it owns aria-expanded/controls and focus restoration.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPopover"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## CSS variables

```json
{
  "css:Popover": {
    "kind": "cssVars",
    "source": "react/src/components/Popover",
    "vars": [
      {
        "name": "--popover-min-width",
        "description": "Minimum width of the panel"
      },
      {
        "name": "--popover-max-width",
        "description": "Maximum width of the panel"
      },
      {
        "name": "--popover-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--popover-radius",
        "description": "Corner radius of the panel (defaults to --radius-lg)"
      },
      {
        "name": "--popover-background",
        "description": "Background of the panel and its arrow"
      },
      {
        "name": "--popover-border-color",
        "description": "Border color of the panel and its arrow"
      },
      {
        "name": "--popover-shadow",
        "description": "Shadow of the panel (defaults to --shadow-lg, --shadow-xl in dark themes)"
      },
      {
        "name": "--popover-z-index",
        "description": "Stacking order of the panel (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Separate anchor and close action

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPopover, MnPopoverAnchor, MnPopoverClose, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPopover, MnPopoverAnchor, MnPopoverClose, MnButton],
  template: `
<p [mnPopoverAnchor]="details">The panel is positioned relative to this text.</p><mn-popover #details="mnPopover" label="Open anchored panel" placement="top"><p>Projected content may close the popover.</p><button mnButton mnPopoverClose>Done</button></mn-popover>
  `,
})
export class Example {

}

```

## Example: Interactive content

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPopover, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPopover, MnButton],
  template: `
<mn-popover label="Project details"><p>12 active members</p><button mnButton size="small" (click)="invited=true">Invite member</button><output>{{invited?'Invitation prepared':''}}</output></mn-popover>
  `,
})
export class Example {
  invited = false;
}

```

## Example: 位置

side、align 和 sideOffset 决定面板位置；空间不足时会翻转并平移以保持可见。arrow 显示指向触发器的箭头。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPopover } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPopover],
  template: `
<mn-popover label="Show above" placement="top">A floating panel positioned above its trigger.</mn-popover>
  `,
})
export class Example {

}

```

## Example: Controlled open and disabled trigger

Bind [(open)] for parent control. MnPopover owns its native trigger; Angular does not expose React asChild. Use mnPopoverAnchor for a separate positioning element and mnPopoverClose for a projected close button. disabled applies to the built-in trigger.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPopover, MnPopoverClose, MnButton, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPopover, MnPopoverClose, MnButton, MnStack],
  template: `
<mn-stack direction="row" wrap gap="3" align="center"><button mnButton variant="outline" (click)="open=!open">{{open?'Close from parent':'Open from parent'}}</button><button mnButton variant="ghost" (click)="disabled=!disabled">{{disabled?'Enable trigger':'Disable trigger'}}</button><output>Panel: {{open?'open':'closed'}} · Trigger: {{disabled?'disabled':'enabled'}}</output></mn-stack><mn-popover label="Controlled details" [(open)]="open" [disabled]="disabled" placement="bottom-end"><p>The parent owns visibility.</p><button mnButton mnPopoverClose>Close details</button></mn-popover>
  `,
})
export class Example {
  open = false;
  disabled = false;
}

```
