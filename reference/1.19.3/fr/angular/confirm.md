# Confirm

Demande à l'utilisateur de confirmer une action : un remplaçant thématisé de window.confirm. Utilisez le ConfirmDialog déclaratif ou attendez confirm() depuis n'importe où ; avec un ConfirmProvider la boîte s'affiche dans l'arbre de l'application, sans lui un hôte autonome est monté à la demande, et côté serveur confirm() renvoie false.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Lequel choisir : useConfirm() ou confirm()

Dans un composant, appelez useConfirm() : ses boîtes de dialogue suivent la portée du ConfigProvider le plus proche. Sous un provider imbriqué, la modale est rendue dans son conteneur de portail, avec son thème, sa palette et ses tokens, et les libellés par défaut des boutons utilisent sa langue. Un ConfirmProvider les affiche toujours s’il y en a un.

Hors de React (bus d’événements, clients d’API, gardes de routeur et autres modules non composants), importez directement confirm() : aucun hook n’y est disponible, et ses boîtes utilisent le thème et la langue racines.

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
