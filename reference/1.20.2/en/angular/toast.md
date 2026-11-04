# Toast

Temporary notifications with a title, a description and a semantic color, shown with toast() from anywhere (no React context needed) and rendered by a ToastProvider inside your app tree, so they inherit your app's context (theme, locale). Loading toasts, promise tracking, in-place updates, actions and a maximum count are built in. Server rendering is safe.

Package: minerva-design@1.20.2

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### When to use which: useToast() or toast()

Inside components, call useToast(): the toasts it shows follow the nearest ConfigProvider scope. Under a nested provider they are rendered into its portal host, with its theme, palette and tokens, and their built-in labels use its language. The owning ToastProvider still renders them, with its position, max and labels.

Outside React (event buses, API clients, stores and other non-component modules), import toast() directly: no hook is available there, and its toasts use the scope of the ToastProvider, usually the root theme and language.

While a modal dialog is open (Modal, Drawer, ConfirmDialog, Command, a modal Popover or Menu), its hide-others treatment covers the toast viewport like the rest of the page: the viewport gets aria-hidden="true" and assistive technologies only see the dialog until it closes.  behaves the same way (opt out on a region with data-minerva-keep-visible).

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
