# Toast

Notifications temporaires avec un titre, une description et une couleur sémantique, affichées avec toast() depuis n’importe où (aucun contexte React requis) et rendues par un ToastProvider dans l’arbre de votre application, si bien qu’elles héritent de son contexte (thème, langue). Chargement, suivi de promesse, mise à jour sur place, actions et nombre maximal sont intégrés. Compatible avec le rendu serveur.

Package: minerva-design@1.23.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Lequel choisir : useToast() ou toast()

Dans un composant, appelez useToast() : ses toasts suivent la portée du ConfigProvider le plus proche. Sous un provider imbriqué, ils sont rendus dans son conteneur de portail, avec son thème, sa palette et ses tokens, et leurs libellés intégrés utilisent sa langue. Le ToastProvider propriétaire les affiche toujours, avec sa position, son max et ses libellés.

Hors de React (bus d’événements, clients d’API, stores et autres modules non composants), importez directement toast() : aucun hook n’y est disponible, et ses toasts utilisent la portée du ToastProvider, en général le thème et la langue racines.

Tant qu'une boîte de dialogue modale est ouverte (Modal, Drawer, ConfirmDialog, Command, un Popover ou un Menu modal), son traitement hide-others couvre la zone des toasts comme le reste de la page : elle reçoit aria-hidden="true" et les technologies d'assistance ne voient que la boîte de dialogue jusqu'à sa fermeture.  se comporte de la même façon (désactivable sur une région avec data-minerva-keep-visible).

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function SaveButton() {
  const toast = useToast();
  return <Button onClick={() => toast.success("Saved")}>Save</Button>;
}

// Outside React (API client, event bus, store...): root scope
import { toast } from "minerva-design";
apiClient.onError((error) => toast.danger(error.message));
```

## ToastProvider

Support: beta

Native Angular: Inject MnToastService to show/dismiss/clear notifications and render MnToastRegion in the desired scope; Angular DI supplies the service instead of a wrapper provider.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnToastService",
    "MnToastRegion"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "messages",
    "typeText": "readonly ToastMessage[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "closed",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "action",
    "typeText": "ToastMessage",
    "required": false,
    "source": "packages/angular/src/components/application/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ToastMessage",
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
  "css:Toast": {
    "kind": "cssVars",
    "source": "react/src/components/Toast",
    "vars": [
      {
        "name": "--toast-width",
        "description": "Width of the toast stack (capped by the viewport)"
      },
      {
        "name": "--toast-gap",
        "description": "Space between stacked toasts"
      },
      {
        "name": "--toast-offset",
        "description": "Distance between the stack and the viewport edges"
      },
      {
        "name": "--toast-padding",
        "description": "Padding of a toast"
      },
      {
        "name": "--toast-radius",
        "description": "Corner radius of a toast (defaults to --radius-md)"
      },
      {
        "name": "--toast-shadow",
        "description": "Shadow of a toast (defaults to --shadow-lg)"
      },
      {
        "name": "--toast-background",
        "description": "Base background of a toast (under the color tint)"
      },
      {
        "name": "--toast-z-index",
        "description": "Stacking order of the stack (defaults to --z-toast)"
      },
      {
        "name": "--toast-icon-background",
        "description": "Background of the round chip behind the status icon (defaults to the color's accent at 14%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Show and dismiss notifications

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnToastRegion } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnToastRegion],
  template: `
<button mnButton (click)="messages=[{id:'saved',title:'Changes saved',description:'Your workspace is up to date.',color:'success',action:'Undo'}]">Save changes</button><mn-toast-region [messages]="messages" (closed)="messages=[]" (action)="messages=[];result='Changes restored'"/><output>{{result}}</output>
  `,
})
export class Example {
  messages: import('minerva-design/angular').ToastMessage[] = [];
  result = "";
}

```

## Example: Error feedback

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnButton, MnToastRegion } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnButton, MnToastRegion],
  template: `
<button mnButton variant="outline" (click)="messages=[{id:'error',title:'Unable to sync',description:'Check your connection and try again.',color:'danger'}]">Simulate error</button><mn-toast-region [messages]="messages" (closed)="messages=[]"/>
  `,
})
export class Example {
  messages: import('minerva-design/angular').ToastMessage[] = [];
}

```
