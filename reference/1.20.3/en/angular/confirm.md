# Confirm

Asks the user to confirm an action: a themed replacement for window.confirm. Use the declarative ConfirmDialog or await confirm() from anywhere; with a ConfirmProvider the dialog renders inside your app tree, without one a standalone host is mounted on demand, and on the server confirm() resolves false.

Package: minerva-design@1.20.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### When to use which: useConfirm() or confirm()

Inside components, call useConfirm(): its dialogs follow the nearest ConfigProvider scope. Under a nested provider the modal portals into its host, with its theme, palette and tokens, and the default button labels use its language. A ConfirmProvider still renders them when there is one.

Outside React (event buses, API clients, router guards and other non-component modules), import confirm() directly: no hook is available there, and its dialogs use the root theme and language.

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button onClick={async () => (await confirm({ title: "Delete?" })) && remove()}>
      Delete
    </Button>
  );
}

// Outside React (API client, event bus, router guard...): root scope
import { confirm } from "minerva-design";
router.beforeLeave(() => confirm({ title: "Discard changes?" }));
```

## ConfirmDialog

Support: beta

Native Angular: MnConfirmDialog. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnConfirmDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"warning\" | \"danger\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "confirmDisabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "cancelLabel",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "confirmLabel",
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
    "name": "confirm",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
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
    "name": "cancelled",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
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

## ConfirmProvider

Support: beta

Native Angular: MnConfirmProvider. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnConfirmProvider"
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Queued confirmations

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnConfirmProvider, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnConfirmProvider, MnButton],
  template: `
<mn-confirm-provider #confirmation="mnConfirmProvider"><button mnButton (click)="confirmation.confirm({title:'Delete draft?',description:'This is the first queued request.',color:'danger'});confirmation.confirm({title:'Archive project?',description:'The second request waits for the first.'})">Queue two confirmations</button></mn-confirm-provider>
  `,
})
export class Example {

}

```

## Example: Confirm a destructive action

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnConfirmDialog } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnConfirmDialog],
  template: `
<button mnButton color="danger" (click)="open=true">Delete project</button><mn-confirm-dialog title="Delete this project?" description="This action cannot be undone." color="danger" [(open)]="open" (confirm)="deleted=true;open=false"/><output>{{deleted?'Project deleted':''}}</output>
  `,
})
export class Example {
  open = false;
  deleted = false;
}

```

## Example: Controlled loading and recovery

The declarative dialog emits confirm; the owner sets loading and completes or retries its operation. This example uses Complete request as an explicit stand-in for the server response and can be reopened.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnConfirmDialog } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnConfirmDialog],
  template: `
<button mnButton (click)="open=true;loading=false;completed=false">Preview processing</button><mn-confirm-dialog title="Processing request" description="Confirm starts the caller-owned operation; complete it below." [(open)]="open" [loading]="loading" (confirm)="loading=true"><button mnButton variant="outline" [disabled]="!loading" (click)="loading=false;open=false;completed=true">Complete request</button></mn-confirm-dialog><output>{{completed?'Request completed':loading?'Processing':'Ready'}}</output>
  `,
})
export class Example {
  open = false;
  loading = false;
  completed = false;
}

```
