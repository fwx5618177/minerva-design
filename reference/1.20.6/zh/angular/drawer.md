# Drawer 抽屉

从视口边缘滑出的面板，用于筛选、详情等次要任务。行为与模态框一致：锁定焦点、Escape、点击遮罩关闭并归还焦点。

Package: minerva-design@1.20.6

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## Drawer

Support: beta

Native Angular: MnDrawer. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawer"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "side",
    "typeText": "DrawerSide",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "size",
    "typeText": "DrawerSize",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "title",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "description",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "panelClass",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  }
]
```

### events

```json
[
  {
    "name": "afterOpen",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "afterClose",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
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

## DrawerBody

Support: beta

Native Angular: MnDrawerBody. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawerBody"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## DrawerClose

Support: beta

Native Angular: MnDrawerClose. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawerClose"
  ],
  "kind": "named"
}
```

## DrawerContent

Support: n/a

Native Angular: MnDrawer renders its portalled panel and projects Angular content; side, size and focus/dismissal events are configured on MnDrawer.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawer"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "side",
    "typeText": "DrawerSide",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "size",
    "typeText": "DrawerSize",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "title",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "description",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "panelClass",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  }
]
```

### events

```json
[
  {
    "name": "afterOpen",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "afterClose",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
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

## DrawerFooter

Support: beta

Native Angular: MnDrawerFooter. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawerFooter"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## DrawerHeader

Support: beta

Native Angular: MnDrawerHeader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawerHeader"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## DrawerRoot

Support: n/a

Native Angular: MnDrawer owns the open lifecycle and dialog context; projected header/body/footer and mnDrawerTrigger/mnDrawerClose compose with it.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawer"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "side",
    "typeText": "DrawerSide",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "size",
    "typeText": "DrawerSize",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "title",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "description",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "panelClass",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  }
]
```

### events

```json
[
  {
    "name": "afterOpen",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "afterClose",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/drawer/drawer.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
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

## DrawerTrigger

Support: beta

Native Angular: MnDrawerTrigger. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDrawerTrigger"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "mnDrawerTrigger",
    "typeText": "DialogContext",
    "required": true,
    "source": "packages/angular/src/components/drawer/drawer.ts"
  }
]
```

## CSS variables

```json
{
  "css:Drawer": {
    "kind": "cssVars",
    "source": "react/src/components/Drawer",
    "vars": [
      {
        "name": "--drawer-width",
        "description": "Width of a left / right drawer (every size; defaults to the width of the size)"
      },
      {
        "name": "--drawer-height",
        "description": "Height of a top / bottom drawer (every size; defaults to the height of the size)"
      },
      {
        "name": "--drawer-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--drawer-radius",
        "description": "Corner radius of the inner edge (defaults to --radius-lg)"
      },
      {
        "name": "--drawer-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--drawer-background",
        "description": "Background of the panel"
      },
      {
        "name": "--drawer-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Side panel

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnDrawer, MnDrawerBody, MnDrawerFooter } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnDrawer, MnDrawerBody, MnDrawerFooter],
  template: `
<button mnButton (click)="open=true">Open details</button><mn-drawer title="Project details" description="Review the latest information" [(open)]="open"><mn-drawer-body>Updated today by your team.</mn-drawer-body><mn-drawer-footer><button mnButton (click)="open=false">Done</button></mn-drawer-footer></mn-drawer>
  `,
})
export class Example {
  open = false;
}

```

## Example: Bottom sheet

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnDrawer } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnDrawer],
  template: `
<button mnButton variant="outline" (click)="open=true">Open bottom sheet</button><mn-drawer title="Quick actions" side="bottom" [(open)]="open">Choose an action.</mn-drawer>
  `,
})
export class Example {
  open = false;
}

```
