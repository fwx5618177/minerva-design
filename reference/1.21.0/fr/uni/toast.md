# Toast

Notifications temporaires avec un titre, une description et une couleur sémantique, affichées avec toast() depuis n’importe où (aucun contexte React requis) et rendues par un ToastProvider dans l’arbre de votre application, si bien qu’elles héritent de son contexte (thème, langue). Chargement, suivi de promesse, mise à jour sur place, actions et nombre maximal sont intégrés. Compatible avec le rendu serveur.

Package: minerva-design@1.21.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Real toast host/store: upsert by id, update/dismiss, callbacks/actions, max overflow, timers, loading and promise transitions. Uni supports hover/focus pause. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ToastProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "position",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "pauseOnHover",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
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
