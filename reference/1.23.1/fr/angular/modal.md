# Modal

Une boîte de dialogue qui interrompt la page pour une tâche ciblée. Le focus reste à l'intérieur, Échap et un clic sur le fond la ferment, puis le focus revient à l'élément d'ouverture. Sur petit écran elle devient une feuille en bas de page.

Package: minerva-design@1.23.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Modal

Support: beta

Native Angular: MnModal. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModal"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "description",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "size",
    "typeText": "ModalSize",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "panelClass",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
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

## ModalBody

Support: beta

Native Angular: MnModalBody. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModalBody"
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

## ModalClose

Support: beta

Native Angular: MnModalClose. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModalClose"
  ],
  "kind": "named"
}
```

## ModalContent

Support: n/a

Native Angular: MnModal renders its portalled, labelled dialog panel and projects Angular content. Panel sizing, class and focus/dismissal events are configured on MnModal.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModal"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "description",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "size",
    "typeText": "ModalSize",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "panelClass",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
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

## ModalFooter

Support: beta

Native Angular: MnModalFooter. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModalFooter"
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

## ModalHeader

Support: beta

Native Angular: MnModalHeader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModalHeader"
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

## ModalRoot

Support: n/a

Native Angular: MnModal owns the open lifecycle and dialog context; projected header/body/footer and mnModalTrigger/mnModalClose compose with it.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModal"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "description",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "size",
    "typeText": "ModalSize",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "panelClass",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/modal/modal.ts"
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

## ModalTrigger

Support: beta

Native Angular: MnModalTrigger. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnModalTrigger"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "mnModalTrigger",
    "typeText": "DialogContext",
    "required": true,
    "source": "packages/angular/src/components/modal/modal.ts"
  }
]
```

## CSS variables

```json
{
  "css:Modal": {
    "kind": "cssVars",
    "source": "react/src/components/Modal",
    "vars": [
      {
        "name": "--modal-width",
        "description": "Width of the panel (every size; defaults to the width of the size, capped by the viewport)"
      },
      {
        "name": "--modal-max-height",
        "description": "Maximum height of the panel (the body scrolls beyond)"
      },
      {
        "name": "--modal-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--modal-radius",
        "description": "Corner radius of the panel (defaults to --radius-xl)"
      },
      {
        "name": "--modal-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--modal-background",
        "description": "Background of the panel"
      },
      {
        "name": "--modal-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Dialog actions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnModal, MnModalBody, MnModalFooter } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnModal, MnModalBody, MnModalFooter],
  template: `
<button mnButton (click)="open=true">Edit profile</button><mn-modal title="Edit profile" description="Update your public information." [(open)]="open"><mn-modal-body>Changes are saved to your workspace.</mn-modal-body><mn-modal-footer><button mnButton (click)="saved=true;open=false">Save profile</button></mn-modal-footer></mn-modal><output>{{saved?'Profile saved':''}}</output>
  `,
})
export class Example {
  open = false;
  saved = false;
}

```

## Example: Dialog sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnModal } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnModal],
  template: `
<button mnButton variant="outline" (click)="open=true">Open large dialog</button><mn-modal title="Details" size="large" [(open)]="open">A wider content area.</mn-modal>
  `,
})
export class Example {
  open = false;
}

```
